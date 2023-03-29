<template>
  <div class="sm:p-2 text-sm sm:text-base flex flex-col items-center background">
    <Desc :desc="rideDesc" class="p-2 mb-2 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <Button label="Create A Ride" class="mx-auto mb-2 block" bg-color="bg-blue-500" @click="toggleShowAddRide" />
    <div class="flex flex-wrap gap-2 mx-auto justify-center pb-8">
      <RideCard
        v-for="ride in allRides"
        :id="ride.title"
        :key="ride.title"
        :bg="rideAvailable(ride) ? 'light-200 dark:dark-500 hover:(light-700 dark:dark-700)' : 'gray-300 dark:gray-500'"
        :ride="ride"
        :bought="findIndex(ridePerks, {title: ride.title}) !== -1"
        :local="findIndex(localUserRides, {title: ride.title}) !== -1"
        :active="activeRide === ride.title"
        @click="activeRide = ride.title"
        @pick="chooseRide"
        @delete="deleteRide"
      />
    </div>
    <h3 class="text-xl pb-2 text-center">
      DLC Rides
    </h3>
    <div class="flex flex-wrap gap-2 mx-auto justify-center pb-8">
      <RideCard
        v-for="ride in DLCRides"
        :id="ride.title"
        :key="ride.title"
        :bg="rideAvailable(ride) ? 'light-200 dark:dark-500 hover:(light-700 dark:dark-700)' : 'gray-300 dark:gray-500'"
        :ride="ride"
        :bought="findIndex(ridePerks, {title: ride.title}) !== -1"
        :local="findIndex(localUserRides, {title: ride.title}) !== -1"
        :active="activeRide === ride.title"
        @click="activeRide = ride.title"
        @pick="chooseRide"
      />
    </div>
    <h3 class="text-xl pb-2 text-center">
      Ride Perks
    </h3>
    <div
      class="column-gap pb-8"
      :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
    >
      <PerkCard
        v-for="ridePerk in ridePerksWithDLC"
        :key="ridePerk.title"
        :perk="ridePerk"
        :bg="rideAvailable(ridePerk) ? 'true-gray-100 dark:true-gray-900 hover:(true-gray-200 dark:true-gray-800)'
          : 'gray-200 dark:gray-600'"
        :is-active="findIndex(ridePerks, {title: ridePerk.title}) !== -1"
        @pickPerk="pickRidePerk"
      >
      </PerkCard>
    </div>
    <AddRide v-if="showAddRide" @click="showAddRide = false" />
  </div>
</template>

<script lang='ts' setup>
import { findIndex } from 'lodash-es'
import { PerkFull } from 'global'
import { ridePerksFull, rideDesc } from '~/data/talents'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'
import { toggleShowAddRide, showAddRide, pickSimplePerk, chooseRide, rideAvailable } from '~/logic'
import { DLCridePerks } from '~/data/DLCs'
import { rides, DLCRides } from '~/data/rides'
import { Perk } from '~/store/chargen'

const { ridePerks, userRides, localUserRides, settings } = useStore()

const activeRide = ref('')

const allRides = computed(() => Array.prototype.concat(userRides.value, localUserRides.value, rides))

const ridePerksWithDLC = computed(() => !settings.value.allChosenAuthors[0]
  ? ridePerksFull
    .concat(DLCridePerks
      .filter(perk => !settings.value.allChosenAuthors.includes(perk.dlc)))
  : ridePerksFull)

function deleteRide(title: String) {
  const ind = findIndex(localUserRides.value, ride => ride.title === title)
  localUserRides.value.splice(ind, 1)
}

function pickRidePerk(perk: PerkFull, saveData: Perk) {
  pickSimplePerk(perk, saveData, rideAvailable, ridePerks.value)
}

onMounted(() => useTooltips())

</script>
