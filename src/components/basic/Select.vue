<template>
  <div>
    <label class="flex gap-2">
      <span v-if="label">{{ label }}</span>
      <select
        class="rounded text-gray-800 px-2 w-full"
        outline="dark:(none active:none)"
        border="~ gray-800"
        :placeholder="placeholder"
        :value="modelValue"
        @change="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      >
        <option value="0">Any</option>
        <option v-for="tier in 11" :key="tier" :value="tier">{{ tier }}</option>
      </select>
    </label>
    <span v-if="errorMessage" class="text-xs text-red-600 dark:text-red-300">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Input',
  props: {
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
  },
  emits: ['update:modelValue'],
})
</script>
