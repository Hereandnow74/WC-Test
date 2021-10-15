<template>
  <div class="md:p-2">
    <Desc :desc="rideDesc" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <div class="flex flex-wrap gap-2 mx-auto justify-center pb-8">
      <div
        v-for="ride in rides"
        :id="ride.title"
        :key="ride.title"
        class="p-2 inline-block max-w-md flex-grow border rounded dark:border-gray-600 cursor-pointer"
        :bg="isAvailable(ride) ? 'light-200 dark:dark-500 hover:(light-700 dark:dark-700)' : 'gray-300 dark:gray-500'"
        @click="selectRide(ride)"
      >
        <h3 class="relative text-center text-xl">
          {{ ride.title }} <span text="gray-500 dark:gray-400 base">
            (Cost: <span class="text-green-500 dark:text-green-300 font-semibold">
              {{ selectedRide.title === ride.title ? selectedRide.cost : ride.cost }}
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
          <bi:check-lg v-if="findIndex(ridePerks, {title: ride.title}) !== -1" class="absolute top-1 right-1 text-green-500" />
        </h3>
        <div v-if="ride.source" class="px-2">
          <span class="font-semibold">From:</span> {{ ride.source }}
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
        <Desc :desc="ride.desc" class="min-w-sm mx-auto" />
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
  </div>
</template>

<script lang='ts' setup>
import { findIndex, intersection } from 'lodash-es'
import { rides, rideDesc, Ride } from '~/data/talents'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'
import Enum from '~/components/basic/Enum.vue'

const { allEffects, ridePerks, flags } = useStore()

const selectedRide = reactive({
  title: '',
  cost: 0,
  addons: [] as string[],
  variant: '',
})

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

function isAvailable(perk: Ride): boolean {
  if (perk.whitelist) {
    if (intersection(perk.whitelist, allEffects.value).length === perk.whitelist.length) return true
    else return false
  }
  if (perk.flag) return flags[perk.flag]
  return true
}

function pickRide(ride: Ride) {
  if (isAvailable(ride)) {
    const ind = findIndex(ridePerks.value, { title: selectedRide.title })
    if (ind === -1) {
      allEffects.value.push(selectedRide.title)
      ridePerks.value.push({ ...selectedRide })
      flags.hasARide = true
    }
    else {
      const del = ridePerks.value.splice(ind)
      del.forEach(x => allEffects.value.splice(allEffects.value.indexOf(x.title), 1))
      flags.hasARide = !!ridePerks.value.length
    }
  }
}

onMounted(() => useTooltips())

</script>
