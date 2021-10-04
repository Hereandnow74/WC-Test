<template>
  <div
    class="rounded cursor-pointer flex-grow text-gray-100 text-shadow flex flex-col gap-2"
    border="2 gray-400 hover:orange-600"
    :class="WORLD_COLORS[world.rating - 1] ||'bg-gray-600'"
    @click="pickWorld(world)"
  >
    <h3 class="text-xl text-center bg-black bg-opacity-10">
      {{ world.worldName }}
    </h3>
    <div class="flex justify-between font-medium px-2">
      <div>
        Rating: <span class="text-amber-200">{{ world.rating || 'Unknown' }}</span>
      </div>
      <div>
        Budget: <span class="text-green-200">{{ WORLD_RATINGS[world.rating - 1]?.budget || 'None' }}</span>
      </div>
    </div>
    <Foldable v-if="world.additional" title="Setting Specific Rules" class="px-2">
      <Desc :desc="world.additional" />
    </Foldable>
    <template v-if="world.condition">
      <div v-if="typeof world.condition === 'object'" class="px-2 pb-2">
        Condition:
        <select
          id="condition"
          v-model="world.rating"
          name="condition"
          class="text-gray-800 w-40"
        >
          <option v-for="cnd in world.condition" :key="cnd.name" :value="cnd.rating">
            {{ cnd.name }} ({{ cnd.rating }})
          </option>
        </select>
      </div>
      <div v-else class="px-2 pb-2">
        {{ world.condition }}
      </div>
    </template>
  </div>
</template>

<script lang='ts'>
import type { PropType } from 'vue'
import { WORLD_COLORS, WORLD_RATINGS } from '~/data/constatnts'
import { useStore, World } from '~/store/store'

export default defineComponent({
  name: 'WorldCard',

  props: {
    world: {
      type: Object as PropType<World>,
      default: () => {},
    },
  },

  setup() {
    const { budget, baseBudget, startingWorld } = useStore()

    function pickWorld(world: World) {
      startingWorld.value = world
      budget.value = WORLD_RATINGS[world.rating - 1]?.budget || 0
      baseBudget.value = budget.value
    }

    return {
      WORLD_COLORS,
      WORLD_RATINGS,
      pickWorld,
    }
  },
})
</script>
