<template>
  <div :class="[style]" class="px-4 py-2 rounded-sm flex gap-4 border dark:bg-opacity-25">
    <div class="self-center flex">
      <slot name="icon">
        <span class="iconify w-8 h-8" :data-icon="icon" :class="[iconStyle]"></span>
      </slot>
    </div>
    <div>
      <h6 class="font-semibold text-lg">
        {{ props.title }}
      </h6>
      <div>
        <slot>
          Some note
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Title',
  },
  type: {
    type: String as PropType<'default' | 'info' | 'success' | 'warning' | 'error'>,
    default: 'default',
  },
})

const style = computed(() => {
  const styles = {
    default: 'bg-gray-100 border-gray-600 dark:bg-warm-gray-800',
    info: 'bg-blue-100 border-blue-600 dark:bg-blue-500',
    success: 'bg-green-100 border-green-600 dark:bg-green-500',
    warning: 'bg-yellow-100 border-yellow-600 dark:bg-yellow-500',
    error: 'bg-red-100 border-red-600 dark:bg-red-500',
  }
  return styles[props.type]
})

const iconStyle = computed(() => {
  const styles = {
    default: 'text-gray-600 dark:text-warm-gray-500',
    info: 'text-blue-600 dark:text-blue-400',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-500 dark:text-yellow-400',
    error: 'text-red-600 dark:text-red-400',
  }
  return styles[props.type]
})

const icon = computed(() => {
  const icons = {
    default: 'bi:exclamation-circle-fill',
    info: 'bi:info-circle-fill',
    success: 'bi:check-circle-fill',
    warning: 'bi:exclamation-circle-fill',
    error: 'bi:x-circle-fill',
  }
  return icons[props.type]
})

</script>
