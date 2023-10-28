<template>
  <div class="flex flex-col">
    <div class="flex gap-2">
      <label v-if="label" :for="idd">{{ label }}</label>
      <Input
        :id="idd"
        v-model="value"
        :disabled="disabled"
        :placeholder="placeholder"
        :error-message="errorMessage"
        class="flex-grow"
      />
    </div>
    <div ref="listEl" hidden class="z-40">
      <div
        v-for="name in searchResult"
        :key="name.item"
        class="hover:bg-gray-600 cursor-pointer"
        @click="optionClicked(name.item)"
      >
        {{ name.item }}
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import Fuse from 'fuse.js'
import tippy from 'tippy.js'
import type { PropType } from 'vue'

const props = defineProps({
  idd: {
    type: String,
    default: 'search',
  },
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  errorMessage: {
    type: String,
    default: '',
  },
  list: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const options = {
  findAllMatches: true,
  threshold: 0.2,
}
const fuse = new Fuse(props.list, options)
const listEl = ref<HTMLElement|null>(null)
const value = ref(props.modelValue)

const searchResult = computed(() => fuse.search(value.value, { limit: 10 }))

watch(props, () => {
  fuse.setCollection(props.list)
  value.value = props.modelValue
})

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
      placement: 'bottom-start',
    })[0]
    list.show()
  }
})

const emit = defineEmits(['update:modelValue', 'optionClicked'])

watch(value, () => emit('update:modelValue', value.value))

function optionClicked(val: string) {
  value.value = val
  emit('optionClicked', val)
}
</script>
