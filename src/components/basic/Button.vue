<template>
  <button
    class="text-gray-100 font-medium rounded filter hover:hue-rotate-15 transition-colors flex items-center
    justify-center gap-1 shadow shadow-light-50"
    :class="[bgColor, sizes[size]]"
  >
    <span v-if="icon" class="iconify" :data-icon="icon"></span>
    <span v-if="label">{{ label }}</span>
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
  icon: {
    type: String,
    default: '',
  },
})

const sizes = {
  Normal: 'px-2 py-1',
  Small: 'px-1',
  Big: 'p-2',
}

</script>
