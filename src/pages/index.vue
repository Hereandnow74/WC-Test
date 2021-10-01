
<template>
  <div>
    <div>
      <Input v-model="search" label="Search" />
    </div>
    <div class="flex flex-wrap gap-1 overflow-y-auto text-center">
      <div
        v-for="{item: world} in worldsFiltered"
        :key="world.rating + (world.worldName || 'none')"
        class="p-2 rounded cursor-pointer flex-grow text-gray-100 text-shadow"
        border="2 gray-400 hover:orange-600"
        :class="WORLD_COLORS[world.rating - 1]"
      >
        <h3>{{ world.worldName }}</h3>
        <div>Rating: {{ world.rating }} Budget: {{ WORLD_RATINGS[world.rating - 1].budget }}</div>
        <div v-if="world.condition">
          {{ world.condition }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Fuse from 'fuse.js'
import { WORLD_COLORS, WORLD_RATINGS } from '~/data/constatnts'
import worlds from '~/data/worlds.json'

export default defineComponent({
  setup() {
    const router = useRouter()
    const search = ref('')

    const options = {
      findAllMatches: true,
      threshold: 0.1,
      keys: ['worldName'],
    }

    const fuse = new Fuse(worlds, options)

    const worldsFiltered = computed(() => {
      return fuse.search(search.value)
    })

    const worldsSorted = worlds.sort((a, b) => a.rating - b.rating)
    return {
      router,
      search,
      worldsSorted,
      worldsFiltered,
      WORLD_COLORS,
      WORLD_RATINGS,
    }
  },
})
</script>
