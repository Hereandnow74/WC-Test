<template>
  <div
    class="p-2 inline-block max-w-md flex-grow border rounded dark:border-gray-600 cursor-pointer"
  >
    <img
      v-if="ride.image && settings.perkImages"
      ref="rideImg"
      class="rounded"
      src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22576%22%20height%3D%22288%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20576%20288%22%20preserveAspectRatio%3D%22none%22%3E%0A%20%20%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%20%20%3Cstyle%20type%3D%22text%2Fcss%22%3E%0A%20%20%20%20%20%20%20%20%20%20%23holder%20text%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20fill%3A%20%23ffffff%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20font-family%3A%20sans-serif%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20font-size%3A%2040px%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20font-weight%3A%20400%3B%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%3C%2Fstyle%3E%0A%20%20%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%20%20%3Cg%20id%3D%22holder%22%3E%0A%20%20%20%20%20%20%20%20%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23cccccc%22%3E%3C%2Frect%3E%0A%20%20%20%20%20%20%20%20%3Cg%3E%0A%20%20%20%20%20%20%20%20%20%20%3Ctext%20text-anchor%3D%22middle%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20dy%3D%22.3em%22%3E576%20x%20288%3C%2Ftext%3E%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C%2Fsvg%3E"
      :data-src="ride.image"
      :alt="ride.title"
    >
    <h3 class="relative text-center text-base sm:text-xl">
      {{ ride.title }} <span text="gray-500 dark:gray-400 base">
        (Cost: <span class="text-green-500 dark:text-green-300 font-semibold">
          {{ ride.cost >= 11111 ? 'Tier X ticket' : active ? selectedRide.cost : ride.cost }}
        </span>)
      </span>
      <Button
        v-if="active"
        class="text-base ml-2"
        :label="bought ? 'sell' : 'buy'"
        size="Small"
        bg-color="bg-blue-500"
        @click.stop="pickRide"
      />
      <Button
        v-if="local"
        class="text-base ml-2"
        label="delete"
        size="Small"
        bg-color="bg-red-500"
        @click.stop="deleteRide"
      />
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
      <span class="font-semibold text-gray-600 dark:text-gray-400">Requiers: </span>
      <span v-if="ride.requires" class="text-cyan-700 dark:text-cyan-300">
        {{ ride.requires }}
      </span>
      <Enum v-if="ride.whitelist" :list="ride.whitelist.map(x => ({title: x}))" empty-message="" />
    </div>
  </div>
</template>

<script lang="ts" setup>
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
  cost: props.ride.cost,
  addons: [] as string[],
  variant: '',
})

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

function pickRide() {
  emit('pick', props.ride, selectedRide)
}

function deleteRide() {
  emit('delete', props.ride.title)
}

onMounted(() => { if (rideImg.value) lazyLoadSingleImg(rideImg.value) })
watch(settings.value, () => { if (rideImg.value) lazyLoadSingleImg(rideImg.value) }, { flush: 'post' })
</script>
