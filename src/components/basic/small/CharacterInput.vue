<template>
  <div class="flex flex-col">
    <Input
      :id="idd"
      v-model="value"
      :placeholder="placeholder"
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
import { useCharSearch } from '~/logic'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  errorMessage: {
    type: String,
    default: '',
  },
  idd: {
    type: String,
    default: 'chars',
  },
  placeholder: {
    type: String,
    default: 'Char Name',
  },
})

const listEl = ref<HTMLElement|null>(null)
const value = ref(props.modelValue)
const gotResult = ref(false)
const alreadySent = ref(false)

const searchResult = ref([] as any[])

const { charSearch } = useCharSearch()

watch(value, () => { if (charSearch.value && value.value.length <= 10) searchResult.value = charSearch.value.search(value.value, { limit: 10 }) })

const charTippy = computed(() => {
  listEl.value.hidden = false
  const list = tippy(`#${props.idd}`, {
    content: listEl.value,
    allowHTML: true,
    trigger: 'manual',
    arrow: false,
    interactive: true,
    placement: 'bottom',
    appendTo: () => document.body,
  })[0]
  return list
})

watch(searchResult, () => {
  if (searchResult.value.length > 0 && listEl.value && !gotResult.value) {
    charTippy.value.setContent(listEl.value)
    charTippy.value.show()
  }
  else { charTippy.value.hide() }
  gotResult.value = false
})

const emit = defineEmits(['update:modelValue', 'updateTier', 'updateUID', 'onChar'])

watch(value, () => {
  if (!alreadySent.value)
    emit('update:modelValue', value.value)
  alreadySent.value = false
})

function chooseChar(char: any) {
  gotResult.value = true
  alreadySent.value = true
  if (charTippy.value) charTippy.value.hide()
  value.value = char.item.n
  emit('updateTier', char.item.t)
  emit('updateUID', char.item.u)
  emit('onChar', char.item)
}

function showTip() {
  if (charTippy.value) charTippy.value.show()
}
</script>
