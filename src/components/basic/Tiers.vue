<template>
  <div :class="dark ? 'dark' : ''">
    <div class="inline-flex w-min h-max">
      <label v-if="label" for="tiersInput" class="mr-2 select-none">{{ label }}</label>
      <div
        class="rounded-l-lg hover:bg-gray-500 cursor-pointer select-none flex items-center bg-warm-gray-300 text-gray-800 dark:(bg-warm-gray-700 text-gray-400)"
        @click="minus"
      >
        <akar-icons:chevron-left />
      </div>
      <input
        id="tiersInput"
        type="text"
        name="tiersInput"
        class="focus:outline-none text-center text-gray-800 dark:(text-gray-200 bg-warm-gray-600)"
        :style="width"
        :value="shownValue[index]"
        readonly
      >
      <div
        class="rounded-r-lg hover:bg-gray-500 cursor-pointer select-none flex items-center bg-warm-gray-300 text-gray-800 dark:(bg-warm-gray-700 text-gray-400)"
        @click="plus"
      >
        <akar-icons:chevron-right />
      </div>
    </div>
    <div v-if="errorMessage" class="text-xs text-red-600 dark:text-red-300 leading-none">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script lang='ts' setup>
import { shownValue } from '~/data/constants'

const props = defineProps({
  modelValue: {
    type: Number,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  dark: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: '',
  },
})

const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

const value = ref(props.modelValue || list[0] || 0)
const index = ref(list.indexOf(value.value))

watch(props, () => {
  value.value = props.modelValue
  index.value = list.indexOf(value.value)
})

const emit = defineEmits(['update:modelValue'])

const width = computed(() => `width: ${`${value.value}`.length + 2}ch`)

function plus() {
  if (index.value >= list.length - 1) return
  index.value++
  value.value = list[index.value]
  emit('update:modelValue', value.value)
}

function minus() {
  if (index.value <= 0) return
  index.value--
  value.value = list[index.value]
  emit('update:modelValue', value.value)
}
</script>
