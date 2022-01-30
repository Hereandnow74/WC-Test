<template>
  <div>
    <label class="flex gap-2">
      <span v-if="label" class="whitespace-nowrap">{{ label }}</span>
      <input
        :type="type"
        :name="name"
        class="rounded text-gray-800 px-2 w-full"
        outline="dark:(none active:none)"
        border="~ gray-800"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      >
    </label>
    <span v-if="errorMessage" class="text-xs text-red-600 dark:text-red-300 leading-none">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script lang='ts' setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  errorMessage: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  name: {
    type: String,
    default: '',
  },
})

defineEmits(['update:modelValue'])
</script>
