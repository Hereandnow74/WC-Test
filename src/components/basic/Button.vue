<template>
  <button
    class="text-gray-100 font-medium rounded filter hover:hue-rotate-15 transition-colors"
    :class="[bgColor, sizes[size]]"
  >
    {{ label }}
  </button>
</template>

<script lang='ts' setup>
import type { PropType } from '@vue/runtime-core'

defineProps({
  label: {
    type: String,
    default: 'Default',
  },
  bgColor: {
    type: String,
    default: 'bg-green-700',
  },
  size: {
    type: String as PropType<'Normal' | 'Small' | 'Big'>,
    default: 'Normal',
  },
})

const sizes = {
  Normal: 'px-2 py-1',
  Small: 'px-1',
  Big: 'p-2',
}

</script>
