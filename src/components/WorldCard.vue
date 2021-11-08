<template>
  <div
    class="rounded cursor-pointer flex-grow text-gray-100 text-shadow flex flex-col gap-2"
    border="2 gray-400 hover:orange-600"
    :class="world.worldName === startingWorld.worldName || startingWorld.worldName === 'Current world' ?
      WORLD_COLORS[world.rating - 1] || 'bg-gray-600' : 'bg-gray-600'"
    @click="pickWorld(world)"
  >
    <div v-if="world.image" class="flex-grow relative">
      <img
        ref="companionEl"
        class="rounded absolute object-cover h-full w-full object-center"
        :src="world.image"
        :alt="world.worldName"
      >
    </div>
    <h3 class="text-xl text-center bg-black bg-opacity-10 flex items-center px-2">
      {{ world.worldName }}
      <bx:bxs-edit class="ml-auto hover:text-yellow-600" @click="$emit('editWorld', world)" />
      <fluent:delete-20-filled v-if="isUserWorld" class="hover:text-red-500 ml-2" @click="deleteWorld" />
    </h3>
    <div class="flex justify-between font-medium px-2">
      <div>
        Rating: <span class="text-amber-200">{{ world.rating || 'Unknown' }}</span>
      </div>
      <div>
        Budget: <span class="text-green-200">{{ WORLD_RATINGS[world.rating - 1]?.budget || 'None' }}</span>
      </div>
    </div>
    <Foldable v-if="world.additional" title="Setting Specific Rules" class="px-2" @click.stop>
      <Desc :desc="world.additional" class="p-0" />
    </Foldable>
    <template v-if="world.condition">
      <div v-if="typeof world.condition === 'object' && world.condition.length" class="px-2 pb-2">
        Condition:
        <select
          id="condition"
          name="condition"
          class="text-gray-800 w-40 rounded"
          value="No condition"
          @change="changeCondition"
          @click.stop
        >
          <option value="No condition">
            No condition
          </option>
          <option v-for="cnd in world.condition" :key="cnd.name" :value="cnd.name">
            {{ cnd.name }} ({{ cnd.rating }})
          </option>
        </select>
      </div>
      <div v-else-if="world.condition.length" class="px-2 pb-2">
        {{ world.condition }}
      </div>
    </template>
  </div>
</template>

<script lang='ts' setup>
import { findIndex } from 'lodash-es'
import type { PropType } from 'vue'
import { WORLD_COLORS, WORLD_RATINGS } from '~/data/constatnts'
import { useStore, World } from '~/store/store'

const props = defineProps({
  world: {
    type: Object as PropType<World>,
    default: () => {},
  },
  isUserWorld: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['editWorld'])

const { baseBudget, startingWorld, localUserWorlds } = useStore()

const condition = reactive({
  name: undefined,
  rating: 0,
})

function pickWorld(world: World) {
  if (startingWorld.value.worldName === world.worldName && startingWorld.value.condition === condition.name) {
    startingWorld.value = { worldName: 'Current world', rating: 2 }
    baseBudget.value = 55
  }
  else {
    const rating = condition.rating || world.rating
    startingWorld.value = { worldName: world.worldName, rating }
    if (condition.name) startingWorld.value.condition = condition.name
    baseBudget.value = WORLD_RATINGS[world.rating - 1]?.budget || 0
  }
}

function deleteWorld() {
  if (localUserWorlds.value.includes(props.world))
    localUserWorlds.value.splice(localUserWorlds.value.indexOf(props.world), 1)
}

function changeCondition(event: any) {
  const name = event.target.value
  const ind = findIndex(props.world.condition, { name })
  if (ind !== -1) {
    condition.name = name
    condition.rating = props.world.condition[ind].rating
    props.world.rating = condition.rating
  }
}

</script>
