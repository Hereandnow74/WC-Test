<template>
  <div class="">
    <Desc :desc="talents.rideDesc" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <div class="flex flex-wrap justify-between">
      <div
        v-for="ride in talents.rides"
        :key="ride.title"
        class="bg-light-200 dark:bg-dark-500 p-2 mb-2 inline-block max-w-min"
      >
        <h3 class="text-center text-xl min-w-48">
          {{ ride.title }} <span text="gray-600 dark:gray-400">(Cost: {{ ride.cost }})</span>
        </h3>
        <div>From: {{ ride.Source }}</div>
        <Desc :desc="ride.desc" />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import * as talents from '~/data/talents'
import { useTooltips } from '~/logic/misc'

export default defineComponent({
  setup() {
    onMounted(() => useTooltips())
    return {
      talents,
    }
  },
})
</script>
