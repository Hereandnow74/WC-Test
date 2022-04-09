<template>
  <div class="flex flex-col">
    <Input
      :id="idd"
      v-model="value"
      placeholder="Char name"
      @click="showTip"
    />
    <div v-if="errorMessage" class="text-sm text-red-600 dark:text-red-300">
      {{ errorMessage }}
    </div>
    <div ref="listEl" hidden>
      <div
        v-for="name in searchResult"
        :key="name.item.u"
        class="hover:bg-gray-600 cursor-pointer"
        @click="chooseChar(name)"
      >
        {{ name.item.n }} (<span class="text-green-400">T{{ name.item.t }}</span>) (<span class="text-gray-400">{{ name.item.w }}</span>)
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import tippy from 'tippy.js'
import { charSearch } from '~/logic'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  errorMessage: {
    type: String,
    default: 'Error',
  },
  idd: {
    type: String,
    default: 'chars',
  },

})

const listEl = ref<HTMLElement|null>(null)
const value = ref(props.modelValue)
const gotResult = ref(false)

const searchResult = ref([] as any[])

let fuse = null
charSearch().then(res => fuse = res)

watch(value, () => { if (fuse) searchResult.value = fuse.search(value.value, { limit: 10 }) })

let list = null
watch(searchResult, () => {
  if (list) list.destroy()
  if (searchResult.value.length > 0 && listEl.value) {
    listEl.value.hidden = false
    list = tippy(`#${props.idd}`, {
      content: listEl.value,
      allowHTML: true,
      trigger: 'manual',
      arrow: false,
      interactive: true,
      placement: 'bottom',
      appendTo: () => document.body,
    })[0]
    if (!gotResult.value)
      list.show()
  }
  gotResult.value = false
})

const emit = defineEmits(['update:modelValue', 'updateTier', 'updateUID'])

watch(value, () => emit('update:modelValue', value.value))

function chooseChar(char: any) {
  gotResult.value = true
  if (list) list.hide()
  value.value = char.item.n
  emit('updateTier', char.item.t)
  emit('updateUID', char.item.u)
}

function showTip() {
  if (list) list.show()
}
</script>
