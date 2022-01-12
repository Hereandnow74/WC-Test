<template>
  <div class="sm:p-2 text-sm sm:text-base">
    <Desc :desc="rideDesc" class="p-2 mb-2 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <Button label="Create A Ride" class="mx-auto mb-2 block" bg-color="bg-blue-500" @click="toggleShowAddRide" />
    <div class="flex flex-wrap gap-2 mx-auto justify-center pb-8">
      <div
        v-for="ride in allRides"
        :id="ride.title"
        :key="ride.title"
        class="p-2 inline-block max-w-md flex-grow border rounded dark:border-gray-600 cursor-pointer"
        :bg="rideAvailable(ride) ? 'light-200 dark:dark-500 hover:(light-700 dark:dark-700)' : 'gray-300 dark:gray-500'"
        @click="selectRide(ride)"
      >
        <h3 class="relative text-center text-base sm:text-xl">
          {{ ride.title }} <span text="gray-500 dark:gray-400 base">
            (Cost: <span class="text-green-500 dark:text-green-300 font-semibold">
              {{ ride.cost >= 11111 ? 'Tier 11 ticket' : selectedRide.title === ride.title ? selectedRide.cost : ride.cost }}
            </span>)
          </span>
          <Button
            v-if="selectedRide.title === ride.title"
            class="text-base ml-2"
            :label="findIndex(ridePerks, {title: ride.title}) !== -1 ? 'sell' : 'buy'"
            size="Small"
            bg-color="bg-blue-500"
            @click.stop="pickRide(ride)"
          />
          <Button
            v-if="findIndex(localUserRides, {title: ride.title}) !== -1"
            class="text-base ml-2"
            label="delete"
            size="Small"
            bg-color="bg-red-500"
            @click.stop="deleteRide(ride)"
          />
          <fa-solid:check v-if="findIndex(ridePerks, {title: ride.title}) !== -1" class="absolute top-1 right-1 text-green-500" />
        </h3>
        <div v-if="ride.source" class="px-2">
          <span class="font-semibold">From:</span> {{ ride.source }}
        </div>
        <div class="flex justify-between px-2">
          <span><span class="font-semibold">Category:</span> {{ ride.category }}</span>
          <span><span class="font-semibold">Size:</span> {{ ride.size }}</span>
        </div>
        <div v-if="ride.addons" class="px-2">
          <span class="font-semibold">Addons:</span>
          <ul class="list-disc list-inside">
            <li v-for="addon in ride.addons" :key="addon[0]" class="mb-1">
              {{ addon[0] }} <Button
                v-if="selectedRide.title === ride.title"
                :label="selectedRide.addons.includes(addon[0] as string) ? 'uninstall' : 'install'"
                size="Small"
                bg-color="bg-amber-500"
                @click.stop="installAddon(addon)"
              />
            </li>
          </ul>
        </div>
        <div v-if="ride.variants" class="px-2">
          <span class="font-semibold">Variants:</span>
          <ul class="list-disc list-inside">
            <li v-for="variant in ride.variants" :key="variant[0]" class="mb-1">
              {{ variant[0] }} <Button
                v-if="selectedRide.title === ride.title && (selectedRide.variant === '' || selectedRide.variant === variant[0])"
                :label="selectedRide.variant === variant[0] ? 'reset': 'choose'"
                size="Small"
                bg-color="bg-violet-500"
                @click="pickRideVariant(variant)"
              />
            </li>
          </ul>
        </div>
        <Desc :desc="ride.desc" class="mx-auto" />
        <div v-if="ride.example" class="px-2">
          <span class="font-semibold">Example: </span> {{ ride.example }}
        </div>
        <div v-if="ride.requires || ride.whitelist" class="px-2">
          <span class="font-semibold">Requiers: </span>
          <span v-if="ride.requires" class="text-cyan-700 dark:text-cyan-300">
            {{ ride.requires }}
          </span>
          <Enum v-if="ride.whitelist" :list="ride.whitelist.map(x => ({title: x}))" empty-message="" />
        </div>
      </div>
    </div>
    <h3 class="text-lg text-center">
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
import { Ride, rides } from '~/data/rides'
import { Perk } from '~/store/chargen'

const { ridePerks, userRides, localUserRides } = useStore()
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

function deleteRide(ride: Ride) {
  const ind = findIndex(localUserRides.value, { title: ride.title })
  localUserRides.value.splice(ind, 1)
}

function pickRidePerk(perk: PerkFull, saveData: Perk) {
  pickSimplePerk(perk, saveData, rideAvailable, ridePerks.value)
}

onMounted(() => useTooltips())

</script>
