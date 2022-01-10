<template>
  <div class="inline-flex w-min h-max">
    <label v-if="label" for="" class="mr-2">{{ label }}</label>
    <div
      class="rounded-l-lg hover:bg-gray-500 cursor-pointer px-0.5"
      :class="buttonThemes[theme]"
      @click="minus"
    >
      &lt;
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
      class="rounded-r-lg hover:bg-gray-500 w-4 cursor-pointer"
      :class="buttonThemes[theme]"
      @click="plus"
    >
      >
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
  dark: 'text-gray-200 bg-white bg-opacity-5',
}
const buttonThemes = {
  light: 'bg-gray-300 text-gray-800',
  dark: 'bg-gray-700 text-gray-400',
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
