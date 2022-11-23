<template>
  <div>
    <div class="inline-flex w-min h-max" :class="{'dark': theme === 'dark'}">
      <label v-if="label && !labelInside" for="" class="mr-2">{{ label }}</label>
      <div
        ref="minusButton"
        class="rounded-l-lg hover:bg-orange-500 w-4 text-center cursor-pointer select-none bg-warm-gray-300 text-gray-800 dark:(bg-warm-gray-700 text-gray-400)"
        @click="minus"
      >
        -
      </div>
      <input
        type="text"
        class="focus:outline-none text-center text-gray-800 dark:(text-gray-200 bg-warm-gray-600)"
        :style="width"
        :value="newValue"
        @input="numberInput"
      >
      <div
        ref="plusButton"
        class="rounded-r-lg hover:bg-orange-500 w-4 text-center cursor-pointer select-none bg-warm-gray-300 text-gray-800 dark:(bg-warm-gray-700 text-gray-400)"
        @click="plus"
      >
        +
      </div>
    </div>
    <div v-if="errorMessage" class="text-xs text-red-600 dark:text-red-300 leading-none">
      {{ errorMessage }}
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
    default: Infinity,
  },
  min: {
    type: Number,
    default: 1,
  },
  theme: {
    type: String as PropType<'light' | 'dark' | 'auto'>,
    default: 'auto',
  },
  increment: {
    type: Number,
    default: 1,
  },
  labelInside: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: '',
  },
})

const value = ref(props.modelValue || props.min)

const emit = defineEmits(['update:modelValue'])

const newValue = computed(() => props.labelInside ? `${props.label}${value.value}` : value.value)
const width = computed(() => `width: ${`${newValue.value}`.length + 1}ch`)

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

function numberInput(e) {
  const n = parseInt(e.target.value)
  if (n >= props.min && n <= props.max) {
    value.value = n
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
