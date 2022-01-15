<template>
  <div class="sm:p-2 text-sm sm:text-base">
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
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 pb-8">
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
    <AddRide v-if="showAddRide" @click="toggleShowAddRide" />
  </div>
</template>

<script lang='ts' setup>
import { findIndex } from 'lodash-es'
import { ridePerksFull, rideDesc, PerkFull } from '~/data/talents'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'
import { toggleShowAddRide, showAddRide, pickSimplePerk, chooseRide, rideAvailable, isDLC } from '~/logic'
import { DLCridePerks } from '~/data/DLCs'
import { Ride, rides, DLCRides } from '~/data/rides'
import { Perk } from '~/store/chargen'

const { ridePerks, userRides, localUserRides } = useStore()

const activeRide = ref('')

const selectedRide = reactive({
  title: '',
  cost: 0,
  addons: [] as string[],
  variant: '',
})

const allRides = computed(() => Array.prototype.concat(userRides.value, localUserRides.value, rides))

const ridePerksWithDLC = computed(() => isDLC.value ? ridePerksFull.concat(DLCridePerks) : ridePerksFull)

function selectRide(perk: Ride) {
  if (selectedRide.title !== perk.title) {
    selectedRide.title = perk.title
    selectedRide.cost = perk.cost
    selectedRide.addons = []
    selectedRide.variant = ''
  }
}

function installAddon(addon: any[]) {
  const ind = selectedRide.addons.indexOf(addon[0])
  if (ind === -1) {
    selectedRide.addons.push(addon[0])
    selectedRide.cost += addon[1]
  }
  else {
    selectedRide.addons.splice(ind, 1)
    selectedRide.cost -= addon[1]
  }
}

function pickRideVariant(variant: any[]) {
  if (selectedRide.variant === variant[0]) {
    selectedRide.variant = ''
    selectedRide.cost -= variant[1]
  }
  else {
    selectedRide.variant = variant[0]
    selectedRide.cost += variant[1]
  }
}

function pickRide(perk: Ride) {
  chooseRide(perk, selectedRide)
}

function deleteRide(title: String) {
  const ind = findIndex(localUserRides.value, { title })
  localUserRides.value.splice(ind, 1)
}

function pickRidePerk(perk: PerkFull, saveData: Perk) {
  pickSimplePerk(perk, saveData, rideAvailable, ridePerks.value)
}

onMounted(() => useTooltips())

</script>
