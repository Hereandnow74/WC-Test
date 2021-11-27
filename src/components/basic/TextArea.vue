<template>
  <label v-if="label" :for="label">{{ label }}</label>
  <textarea
    :id="label"
    :name="label"
    cols="30"
    :rows="rows"
    :value="modelValue"
    class="w-full text-gray-800 p-1"
    :placeholder="placeHolder"
    @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
  ></textarea>
  <div v-if="errorMessage" class="text-xs text-red-600 dark:text-red-300">
    {{ errorMessage }}
  </div>
</template>

<script lang='ts' setup>
defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  placeHolder: {
    type: String,
    default: 'Type here',
  },
  rows: {
    type: String,
    default: '10',
  },
  errorMessage: {
    type: String,
    default: '',
  },
})

defineEmits(['update:modelValue'])
</script>
