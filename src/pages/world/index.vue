
<template>
  <div class="p-2">
    <div class="max-w-4xl p-2 mx-auto">
      <Input
        v-model="
          search"
        label="Search"
        placeholder="World name"
      />
    </div>
    <div class="flex flex-wrap gap-1 overflow-y-auto text-center">
      <div
        v-for="{item: world} in worldsFiltered"
        :key="world.worldName + (world.condition || 'none')"
        class="p-2 rounded cursor-pointer flex-grow text-gray-100 text-shadow"
        border="2 gray-400 hover:orange-600"
        :class="WORLD_COLORS[world.rating - 1]"
        @click="pickWorld(world)"
      >
        <h3 class="text-xl">
          {{ world.worldName }}
        </h3>
        <div>
          Rating: <span class="text-amber-200">{{ world.rating }}</span>
          Budget: <span class="text-green-200">{{ WORLD_RATINGS[world.rating - 1].budget }}</span>
        </div>
        <template v-if="world.condition">
          <div v-if="typeof world.condition === 'object'">
            Condition:
            <select
              id="condition"
              v-model="world.rating"
              name="condition"
              class="text-gray-800 w-32"
            >
              <option v-for="cnd in world.condition" :key="cnd.name" :value="cnd.rating">
                {{ cnd.name }} ({{ cnd.rating }})
              </option>
            </select>
          </div>
          <div v-else>
            {{ world.condition }}
          </div>
        </template>
        <div v-if="world.additional">
          {{ world.additional }}
        </div>
      </div>
      <div v-if="!worldsFiltered.length" class="text-center flex-grow">
        <p>No worlds found.</p>
        <Button label="Add World" @click="toggleShowAddWorld" />
      </div>
    </div>
    <AddWorld v-if="showAddWorld" @click="toggleShowAddWorld" />
  </div>
</template>

<script lang="ts">
import Fuse from 'fuse.js'
import { WORLD_COLORS, WORLD_RATINGS } from '~/data/constatnts'
import worlds from '~/data/worlds.json'
import { useStore } from '~/store/store'

export default defineComponent({
  setup() {
    const router = useRouter()
    const search = ref('')
    const worldsReac = ref(worlds)

    const { budget, baseBudget, startingWorld } = useStore()
    const [showAddWorld, toggleShowAddWorld] = useToggle()

    const options = {
      findAllMatches: true,
      threshold: 0.1,
      keys: ['worldName', 'condition.name'],
    }

    const fuse = new Fuse(worldsReac.value, options)

    const worldsFiltered = computed(() => {
      return fuse.search(search.value)
    })

    function pickWorld(world: typeof worlds[number]) {
      startingWorld.value = world
      budget.value = WORLD_RATINGS[world.rating - 1].budget || 0
      baseBudget.value = budget.value
    }

    return {
      router,
      search,
      worldsFiltered,
      WORLD_COLORS,
      WORLD_RATINGS,
      pickWorld,
      showAddWorld,
      toggleShowAddWorld,
    }
  },
})
</script>
