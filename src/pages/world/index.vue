
<template>
  <div class="p-2">
    <div class="max-w-4xl p-2 mx-auto flex gap-4">
      <Input
        v-model=" search"
        label="Search"
        placeholder="World name"
        class="w-full"
      />
      <span class="whitespace-nowrap">Worlds in database: {{ worldsCount }}</span>
    </div>
    <div v-if="userWorlds.length">
      <div v-for="world in userWorlds" :key="world.worldName">
        {{ world }}
      </div>
    </div>
    <div class="flex flex-wrap gap-1 overflow-y-auto pb-8">
      <WorldCard
        v-for="{item: world} in worldsFiltered"
        :key="world.worldName + (world.condition || 'none')"
        :world="world"
      />
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
    const search = ref('')
    const worldsReac = ref(worlds)

    const { budget, baseBudget, startingWorld, userWorlds } = useStore()
    const [showAddWorld, toggleShowAddWorld] = useToggle()

    const options = {
      findAllMatches: true,
      threshold: 0.1,
      keys: ['worldName', 'condition.name'],
    }

    const fuse = new Fuse(worldsReac.value, options)

    const worldsCount = computed(() => worlds.length)

    const worldsFiltered = computed(() => {
      return fuse.search(search.value)
    })

    function pickWorld(world: typeof worlds[number]) {
      startingWorld.value = world
      budget.value = WORLD_RATINGS[world.rating - 1].budget || 0
      baseBudget.value = budget.value
    }

    return {
      search,
      worldsCount,
      worldsFiltered,
      WORLD_COLORS,
      WORLD_RATINGS,
      userWorlds,
      pickWorld,
      showAddWorld,
      toggleShowAddWorld,
    }
  },
})
</script>
