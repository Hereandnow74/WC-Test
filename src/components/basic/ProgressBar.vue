<template>
  <div class="relative">
    <div class="bg-gray-500 rounded-full w-full h-6"></div>
    <div class="absolute top-0 bg-red-500 rounded-full w-full h-6" :style="`width: ${progressPercent}%`"></div>
    <div class="absolute z-10 top-0 w-full text-center">
      {{ percent }}%
    </div>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  percent: {
    type: Number,
    default: 50,
  },
})

const progressPercent = computed(() => {
  if (props.percent > 100) return 100
  if (props.percent < 0) return 0
  return props.percent
})

</script>
