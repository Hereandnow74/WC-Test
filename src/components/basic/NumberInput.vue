<template>
  <div class="inline-flex w-min h-max">
    <label v-if="label" for="" class="mr-2">{{ label }}</label>
    <div
      class="rounded-l-lg hover:bg-orange-500 w-4 cursor-pointer"
      :class="buttonThemes[theme]"
      @click="minus"
    />
    <input
      id=""
      type="text"
      name=""
      class="focus:outline-none text-center"
      :style="width"
      :value="value"
      :class="themes[theme]"
    >
    <div
      class="rounded-r-lg hover:bg-orange-500 w-4 cursor-pointer"
      :class="buttonThemes[theme]"
      @click="plus"
    />
  </div>
</template>

<script lang='ts' setup>
import type { PropType } from '@vue/runtime-core'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  label: {
    type: String,
    default: '',
  },
  max: {
    type: Number,
    default: 100,
  },
  min: {
    type: Number,
    default: 1,
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
  light: 'bg-blue-500',
  dark: 'bg-blue-700',
}

const value = ref(props.modelValue || props.min)

const emit = defineEmits(['update:modelValue'])

const width = computed(() => `width: ${`${value.value}`.length + 1}ch`)

watch(props, () => value.value = props.modelValue)

function plus() {
  if (value.value < props.max) {
    value.value++
    emit('update:modelValue', value.value)
  }
}

function minus() {
  if (value.value > props.min) {
    value.value--
    emit('update:modelValue', value.value)
  }
}
</script>
