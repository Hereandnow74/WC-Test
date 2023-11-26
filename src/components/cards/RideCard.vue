<template>
  <div
    class="p-2 inline-block max-w-md flex-grow border rounded dark:border-gray-600 cursor-pointer"
  >
    <img
      v-if="ride.image && settings.perkImages"
      ref="rideImg"
      class="rounded"
      :src="PLACEHOLDER_IMAGE"
      :data-src="ride.image"
      :alt="ride.title"
    >
    <h3 class="relative text-center text-base sm:text-xl">
      {{ ride.title }} <span text="gray-500 dark:gray-400 base">
        (Cost: <span class="text-green-500 dark:text-green-300 font-semibold">
          {{ ride.costT ? 'IMG' : active ? displayedCost : ride.cost }}
        </span>)
      </span>
      <div class="flex gap-1">
        <Button
          v-if="active && !selectedRide.claimed"
          class="text-base ml-2"
          label="buy"
          size="Small"
          bg-color="bg-blue-500"
          @click.stop="buyRide"
        />
        <Button
          v-if="active"
          class="text-base ml-2"
          label="claim"
          size="Small"
          bg-color="bg-orange-500"
          @click.stop="claimRide"
        />
        <Button
          v-if="active && bought"
          class="text-base ml-2"
          label="sell"
          size="Small"
          bg-color="bg-blue-500"
          @click.stop="sellRide"
        />
        <Button
          v-if="local"
          class="text-base ml-2"
          label="delete"
          size="Small"
          bg-color="bg-red-500"
          @click.stop="deleteRide"
        />
      </div>
      <fa-solid:check v-if="bought" class="absolute top-1 right-1 text-green-500" />
    </h3>
    <div v-if="ride.source" class="px-2">
      <span class="font-semibold text-gray-600 dark:text-gray-400">From:</span> {{ ride.source }}
    </div>
    <div v-if="ride.category && ride.size" class="flex justify-between px-2">
      <span><span class="font-semibold text-gray-600 dark:text-gray-400">Category:</span> {{ ride.category }}</span>
      <span><span class="font-semibold text-gray-600 dark:text-gray-400">Size:</span> {{ ride.size }}</span>
    </div>
    <div v-if="ride.capacity" class="px-2">
      <span class="font-semibold text-gray-600 dark:text-gray-400">Capacity:</span> {{ ride.capacity }}
    </div>
    <div v-if="ride.addons" class="px-2">
      <span class="font-semibold text-gray-600 dark:text-gray-400">Addons:</span>
      <ul class="list-disc list-inside">
        <li v-for="addon in ride.addons" :key="addon[0]" class="mb-1">
          {{ addon[0] }} (+{{ addon[1] }}) <Button
            v-if="active"
            :label="selectedRide.addons.includes(addon[0] as string) ? 'uninstall' : 'install'"
            size="Small"
            bg-color="bg-amber-500"
            @click.stop="installAddon(addon)"
          />
        </li>
      </ul>
    </div>
    <div v-if="ride.variants" class="px-2">
      <span class="font-semibold text-gray-600 dark:text-gray-400">Variants:</span>
      <ul class="list-disc list-inside">
        <li v-for="variant in ride.variants" :key="variant[0]" class="mb-1">
          {{ variant[0] }} <Button
            v-if="active && (selectedRide.variant === '' || selectedRide.variant === variant[0])"
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
      <span class="font-semibold text-gray-600 dark:text-gray-400">Example: </span> {{ ride.example }}
    </div>
    <div v-if="ride.requires || ride.whitelist" class="px-2">
      <span class="font-semibold text-gray-600 dark:text-gray-400">Require: </span>
      <span v-if="ride.requires" class="text-cyan-700 dark:text-cyan-300">
        {{ ride.requires }}
      </span>
      <Enum v-if="ride.whitelist" :list="ride.whitelist.map(x => ({title: x}))" empty-message="" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PLACEHOLDER_IMAGE } from '~/data/constants'
import { lazyLoadSingleImg } from '~/logic'
import { useStore } from '~/store/store'

const props = defineProps({
  ride: {
    type: Object,
    default: {},
  },
  bought: {
    type: Boolean,
    default: false,
  },
  local: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['pick', 'delete'])
const { settings } = useStore()
const rideImg = ref<HTMLImageElement | null>(null)

const selectedRide = reactive({
  title: props.ride.title,
  cost: 0,
  count: 0,
  addonsCost: 0,
  addons: [] as string[],
  variant: '',
  claimed: false,
})

const displayedCost = computed(() => selectedRide.cost + props.ride.cost + selectedRide.addonsCost)

function installAddon(addon: any[]) {
  const ind = selectedRide.addons.indexOf(addon[0])
  if (ind === -1) {
    selectedRide.addons.push(addon[0])
    selectedRide.addonsCost += addon[1]
  }
  else {
    selectedRide.addons.splice(ind, 1)
    selectedRide.addonsCost -= addon[1]
  }
}

function pickRideVariant(variant: any[]) {
  if (selectedRide.variant === variant[0]) {
    selectedRide.variant = ''
    selectedRide.addonsCost -= variant[1]
  }
  else {
    selectedRide.variant = variant[0]
    selectedRide.addonsCost += variant[1]
  }
}

function buyRide() {
  selectedRide.count += 1
  if (selectedRide.claimed)
    selectedRide.claimed = false
  selectedRide.cost += props.ride.cost + selectedRide.addonsCost
  pickRide()
}

function claimRide() {
  selectedRide.count += 1
  selectedRide.claimed = true
  selectedRide.cost = 0
  // selectedRide.cost += props.ride.cost + selectedRide.addonsCost
  pickRide()
}

function sellRide() {
  selectedRide.count -= 1
  if (!selectedRide.claimed)
    selectedRide.cost -= props.ride.cost + selectedRide.addonsCost
  if (selectedRide.count === 0 && selectedRide.claimed)
    selectedRide.claimed = false
  pickRide()
}

function pickRide() {
  emit('pick', props.ride, selectedRide)
}

function deleteRide() {
  emit('delete', props.ride.title)
}

onMounted(() => { if (rideImg.value) lazyLoadSingleImg(rideImg.value) })
watch(settings.value, () => { if (rideImg.value) lazyLoadSingleImg(rideImg.value) }, { flush: 'post' })
</script>
