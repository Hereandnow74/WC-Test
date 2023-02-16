<template>
  <span class="">
    {{ displayedTier }}
  </span>
</template>

<script lang="ts" setup>import { shownValue } from '~/data/constants'

const props = defineProps({
  tier: {
    type: Number,
    default: 0,
  },
})

const displayedTier = computed(() => shownValue[props.tier])
</script>
