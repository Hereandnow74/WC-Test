<template>
  <button
    class="text-gray-100 font-medium rounded px-2 py-1 filter hover:hue-rotate-15 transition-colors"
    :class="bgColor"
  >
    {{ label }}
  </button>
</template>

<script lang='ts'>

export default defineComponent({
  name: 'Button',

  props: {
    label: {
      type: String,
      default: 'Default',
    },
    bgColor: {
      type: String,
      default: 'bg-green-700',
    },
  },
})
</script>
