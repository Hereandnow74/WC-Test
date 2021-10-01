<template>
  <div class="flex gap-2">
    <label v-if="label" class="w-max whitespace-nowrap self-center" :for="label">{{ label }}</label>
    <input
      type="checkbox"
      :name="label"
      class="px-2 self-center"
      :value="modelValue"
      @change="$emit('update:modelValue', $event?.target?.value)"
    >
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Checkbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
})
</script>
