
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
    <div class="flex flex-wrap gap-1 overflow-y-auto pb-8">
      <div
        v-for="{item: world} in worldsFiltered"
        :key="world.worldName + (world.condition || 'none')"
        class="rounded cursor-pointer flex-grow text-gray-100 text-shadow flex flex-col gap-2"
        border="2 gray-400 hover:orange-600"
        :class="WORLD_COLORS[world.rating - 1]"
        @click="pickWorld(world)"
      >
        <h3 class="text-xl text-center bg-black bg-opacity-10">
          {{ world.worldName }}
        </h3>
        <div class="flex justify-between font-medium px-2">
          <div>
            Rating: <span class="text-amber-200">{{ world.rating }}</span>
          </div>
          <div>
            Budget: <span class="text-green-200">{{ WORLD_RATINGS[world.rating - 1].budget }}</span>
          </div>
        </div>
        <Foldable v-if="world.additional" title="Setting Specific Rules" class="px-2">
          {{ world.additional }}
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
          <div v-else>
            {{ world.condition }}
          </div>
        </template>
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
import Foldable from '~/components/basic/Foldable.vue'

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
