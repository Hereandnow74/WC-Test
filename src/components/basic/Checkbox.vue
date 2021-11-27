<template>
  <div class="flex gap-2">
    <label v-if="label" class="w-max whitespace-nowrap self-center" :for="label">{{ label }}</label>
    <input
      type="checkbox"
      :name="label"
      class="px-2 self-center"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event?.target?.checked)"
    >
  </div>
</template>

<script lang='ts' setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
})

defineEmits(['update:modelValue'])
</script>
