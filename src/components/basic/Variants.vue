<template>
  <div class="inline-flex w-min h-max">
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
})

const value = ref(props.modelValue || props.list[0] || '')
const index = ref(0)

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
