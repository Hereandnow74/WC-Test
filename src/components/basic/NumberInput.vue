<template>
  <div class="inline-flex w-min h-max">
    <label v-if="label" for="" class="mr-2">{{ label }}</label>
    <div
      ref="minusButton"
      class="rounded-l-lg hover:bg-orange-500 w-4 text-center cursor-pointer"
      :class="buttonThemes[theme]"
      @click="minus"
    >
      -
    </div>
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
      ref="plusButton"
      class="rounded-r-lg hover:bg-orange-500 w-4 text-center cursor-pointer"
      :class="buttonThemes[theme]"
      @click="plus"
    >
      +
    </div>
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
  increment: {
    type: Number,
    default: 1,
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

const value = ref(props.modelValue || props.min)

const emit = defineEmits(['update:modelValue'])

const width = computed(() => `width: ${`${value.value}`.length + 1}ch`)

watch(props, () => value.value = props.modelValue)

function plus() {
  if (value.value + props.increment <= props.max) {
    value.value += props.increment
    emit('update:modelValue', value.value)
  }
}

function minus() {
  if (value.value - props.increment >= props.min) {
    value.value -= props.increment
    emit('update:modelValue', value.value)
  }
}

const plusButton = ref(null)
const minusButton = ref(null)

const { pressed: plusPressed } = useMousePressed({ target: plusButton })
const { pressed: minusPressed } = useMousePressed({ target: minusButton })

let timer: any = null
let delay: any = null
watch(plusPressed, () => {
  if (plusPressed.value) { delay = setTimeout(() => timer = setInterval(plus, 15), 200) }
  else {
    clearTimeout(delay)
    clearInterval(timer)
  }
})

watch(minusPressed, () => {
  if (minusPressed.value) { delay = setTimeout(() => timer = setInterval(minus, 15), 200) }
  else {
    clearTimeout(delay)
    clearInterval(timer)
  }
})

</script>
