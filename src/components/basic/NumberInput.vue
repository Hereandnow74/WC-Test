<template>
  <div class="inline-flex w-min">
    <label v-if="label" for="" class="mr-2">{{ label }}</label>
    <div class="rounded-l-lg bg-blue-500 hover:bg-orange-500 w-4 cursor-pointer" @click="minus" />
    <input
      id=""
      type="text"
      name=""
      class="focus:outline-none text-center text-gray-800"
      :style="width"
      :value="value"
    >
    <div class="rounded-r-lg bg-blue-500 hover:bg-orange-500 w-4 cursor-pointer" @click="plus" />
  </div>
</template>

<script lang='ts' setup>
const props = defineProps({
  modelValue: {
    type: Number,
    default: 1,
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
})

const value = ref(props.modelValue || props.min)

const emit = defineEmits(['update:modelValue'])

const width = computed(() => `width: ${`${value.value}`.length + 1}ch`)

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
