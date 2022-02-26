<template>
  <div
    class="rounded flex-grow text-gray-100 text-shadow flex flex-col gap-1 cursor-pointer"
    border="2 gray-400 hover:orange-600 cursor-pointer"
    @click="chooseWorld"
  >
    <div class="flex gap-4 justify-between text-gray-200 px-2">
      <div>
        {{ world.worldName }}
        <span v-if="world.condition">(<span class="text-gray-400">{{ world.condition }}</span>)</span>
      </div>
      <div class="whitespace-nowrap">
        Rating: <span class="text-amber-200 font-medium">{{ world.rating || 'Unknown' }}</span>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import type { PropType } from 'vue'
import { World } from '~/store/store'
import { usePlayStore } from '~/store/play'

const props = defineProps({
  world: {
    type: Object as PropType<World>,
    default: () => {},
  },
})

const { currentWorld } = usePlayStore()

function chooseWorld() {
  const world = { worldName: props.world.worldName, rating: props.world.rating }
  if (props.world.condition) world.condition = props.world.condition
  currentWorld.value = world
}
</script>
