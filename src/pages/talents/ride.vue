<template>
  <div class="md:p-2">
    <Desc :desc="rideDesc" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <div class="flex flex-wrap gap-2 mx-auto justify-center">
      <div
        v-for="ride in rides"
        :id="ride.title"
        :key="ride.title"
        class="bg-light-200 dark:bg-dark-500 p-2 inline-block max-w-sm flex-grow"
        @click="pickRide(ride)"
      >
        <h3 class="relative text-center text-xl">
          {{ ride.title }} <span text="gray-600 dark:gray-400">(Cost: {{ ride.cost }})</span>
          <bi:check-lg v-if="findIndex(ridePerks, {title: ride.title}) !== -1" class="absolute top-1 right-1" />
        </h3>
        <div v-if="ride.Source">
          From: {{ ride.Source }}
        </div>
        <Desc :desc="ride.desc" class="min-w-sm mx-auto" />
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { findIndex } from 'lodash-es'
import { rides, rideDesc, Ride } from '~/data/talents'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'

const { allEffects, ridePerks } = useStore()

function isAvailable(perk: Ride): boolean {
  if (allEffects.value.includes(perk.title)) return false
  return true
}

function pickRide(perk: Ride) {
  if (isAvailable(perk)) {
    if (allEffects.value.includes(perk.title)) {
      const heritageToDelete = ridePerks.value.splice(findIndex(ridePerks.value, { title: perk.title }))
      heritageToDelete.forEach(x => allEffects.value.splice(allEffects.value.indexOf(x.title), 1))
    }
    else {
      allEffects.value.push(perk.title)
      ridePerks.value.push({ title: perk.title, cost: perk.cost })
    }
  }
}

onMounted(() => useTooltips())

</script>
