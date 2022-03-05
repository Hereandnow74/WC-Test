<template>
  <label v-if="label" :for="label">{{ label }}</label>
  <textarea
    :id="label"
    :name="label"
    cols="30"
    :rows="rows"
    :value="modelValue"
    class="w-full text-gray-800 dark:(text-gray-200 bg-warm-gray-700 border border-warm-gray-500) rounded p-1 px-2"
    :placeholder="placeholder"
    :class="$attrs.class"
    @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
  ></textarea>
  <div v-if="errorMessage" class="text-xs text-red-600 dark:text-red-300 leading-none">
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
  placeholder: {
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
