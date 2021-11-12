<template>
  <span v-if="condition" class="text-green-500">valid</span>
  <span v-else class="text-red-500">invalid</span>
</template>

<script lang="ts" setup>
defineProps({
  condition: {
    type: Boolean,
    default: false,
  },
})
</script>
