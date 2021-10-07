<template>
  <div class="md:p-2">
    <Desc :desc="talents.rideDesc" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <div class="flex flex-wrap gap-2 mx-auto justify-center">
      <div
        v-for="ride in talents.rides"
        :id="ride.title"
        :key="ride.title"
        class="bg-light-200 dark:bg-dark-500 p-2 inline-block max-w-sm flex-grow"
      >
        <h3 class="text-center text-xl">
          {{ ride.title }} <span text="gray-600 dark:gray-400">(Cost: {{ ride.cost }})</span>
        </h3>
        <div v-if="ride.Source">
          From: {{ ride.Source }}
        </div>
        <Desc :desc="ride.desc" class="min-w-sm mx-auto" />
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
