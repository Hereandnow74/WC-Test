<template>
  <button
    class="text-gray-100 font-medium rounded hover:text-gray-200 transform flex items-center
    justify-center gap-1 shadow shadow-dark-50"
    :class="[bgColor, sizes[size], {'!bg-gray-500 cursor-not-allowed': disabled}]"
  >
    <span v-if="icon" class="flex items-center" :class="{'text-xl': size !== 'Small'}"><span class="iconify" :data-icon="icon"></span></span>
    <span v-if="label">{{ label }}</span>
  </button>
</template>

<script lang='ts' setup>
import type { PropType } from '@vue/runtime-core'

defineProps({
  label: {
    type: String,
    default: '',
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
  disabled: {
    type: Boolean,
    default: false,
  },
})

const sizes = {
  Normal: 'px-2 py-1',
  Small: 'px-1',
  Big: 'p-2',
}

</script>
