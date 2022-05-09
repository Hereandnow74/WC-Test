<template>
  <div class="inline-flex w-min h-max">
    <label v-if="label" for="" class="mr-2">{{ label }}</label>
    <div
      class="rounded-l-lg hover:bg-gray-500 cursor-pointer select-none flex items-center"
      :class="buttonThemes[theme]"
      @click="minus"
    >
      <akar-icons:chevron-left />
    </div>
    <input
      id=""
      type="text"
      name=""
      class="focus:outline-none text-center"
      :class="themes[theme]"
      :style="width"
      :value="value"
    >
    <div
      class="rounded-r-lg hover:bg-gray-500 cursor-pointer select-none flex items-center"
      :class="buttonThemes[theme]"
      @click="plus"
    >
      <akar-icons:chevron-right />
    </div>
  </div>
</template>

<script lang='ts' setup>
import type { PropType } from '@vue/runtime-core'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  list: {
    type: Array,
    default: () => [],
  },
  theme: {
    type: String as PropType<'light' | 'dark'>,
    default: 'light',
  },
})

const themes = {
  light: 'text-gray-800',
  dark: 'text-gray-200 bg-warm-gray-600',
}
const buttonThemes = {
  light: 'bg-warm-gray-300 text-gray-800',
  dark: 'bg-warm-gray-700 text-gray-400',
}

const value = ref(props.modelValue || props.list[0] || '')
const index = ref(0)

watch(props, () => value.value = props.modelValue)

const emit = defineEmits(['update:modelValue'])

const width = computed(() => `width: ${`${value.value}`.length + 2}ch`)

function plus() {
  index.value++
  value.value = props.list[index.value % props.list.length]
  emit('update:modelValue', value.value)
}

function minus() {
  index.value--
  value.value = props.list[Math.abs(index.value % props.list.length)]
  emit('update:modelValue', value.value)
}
</script>
