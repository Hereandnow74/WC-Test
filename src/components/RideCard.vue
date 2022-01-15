<template>
  <div
    class="p-2 inline-block max-w-md flex-grow border rounded dark:border-gray-600 cursor-pointer"
  >
    <h3 class="relative text-center text-base sm:text-xl">
      {{ ride.title }} <span text="gray-500 dark:gray-400 base">
        (Cost: <span class="text-green-500 dark:text-green-300 font-semibold">
          {{ ride.cost >= 11111 ? 'Tier 11 ticket' : active ? selectedRide.cost : ride.cost }}
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
      <span class="font-semibold">From:</span> {{ ride.source }}
    </div>
    <div v-if="ride.category && ride.size" class="flex justify-between px-2">
      <span><span class="font-semibold">Category:</span> {{ ride.category }}</span>
      <span><span class="font-semibold">Size:</span> {{ ride.size }}</span>
    </div>
    <div v-if="ride.addons" class="px-2">
      <span class="font-semibold">Addons:</span>
      <ul class="list-disc list-inside">
        <li v-for="addon in ride.addons" :key="addon[0]" class="mb-1">
          {{ addon[0] }} <Button
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
      <span class="font-semibold">Variants:</span>
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
</template>

<script lang="ts" setup>

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

</script>
