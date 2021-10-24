
<template>
  <div class="p-2">
    <div class="max-w-4xl md:p-2 mx-auto flex gap-2 items-center">
      <Input
        v-model="search"
        label="Search"
        placeholder="World name"
        class="w-full"
      />
      <clarity:eraser-solid class="icon-btn w-8" @click="search = ''" />
      <span class="hidden md:block pl-4 whitespace-nowrap">Worlds in database: {{ worldsCount }}</span>
      <div class="flex gap-1 border rounded px-1 select-none">
        <span class="whitespace-nowrap font-bold">Sort By:</span>
        <div
          class="flex items-center bg-gray-200 dark:bg-gray-700 px-1 rounded cursor-pointer"
          :class="sortAlpha !== 0 ? 'border border-green-500' : ''"
          title="Sort by Name"
          @click="toggleAlpha()"
        >
          <fa-solid:sort-alpha-down v-if="sortAlpha" class="inline-block rounded" />
          <fa-solid:sort-alpha-up v-else class="inline-block rounded" />
        </div>
        <div
          class="flex items-center bg-gray-200 dark:bg-gray-700 px-1 rounded cursor-pointer"
          :class="sortRating !== 0 ? 'border border-green-500' : ''"
          title="Sort by Rating"
          @click="toggleRating()"
        >
          <fa-solid:sort-numeric-down v-if="sortRating" class="inline-block rounded" />
          <fa-solid:sort-numeric-up v-else class="inline-block rounded" />
        </div>
      </div>
      <Button size="Small" label="Add World" class="whitespace-nowrap" @click="() => (editMode = false, toggleShowAddWorld())" />
    </div>
    <Foldable v-if="allUserWorlds.length" class="text-lg mb-2" title="User Worlds">
      <div class="mb-4 flex flex-wrap gap-1 overflow-y-auto">
        <WorldCard v-for="world in allUserWorlds" :key="world.worldName" :world="world" :is-user-world="true" />
      </div>
    </Foldable>
    <Foldable v-if="worldsFiltered.length" class="text-lg mb-2" title="Canon Worlds" :is-open="true">
      <div class="flex flex-wrap gap-1 overflow-y-auto pb-8">
        <WorldCard
          v-for="world in worldsFiltered"
          :key="world.worldName + (world.condition || 'none')"
          :world="world"
          @edit-world="editWorld"
        />
        <div v-if="!worldsFiltered.length" class="text-center flex-grow">
          <p>No worlds found.</p>
        </div>
      </div>
    </Foldable>
    <AddWorld v-if="showAddWorld" :world="worldToEdit" :edit-mode="editMode" @click="toggleShowAddWorld" />
  </div>
</template>

<script lang="ts" setup>
import Fuse from 'fuse.js'
import worlds from '~/data/worlds.json'
import { useStore } from '~/store/store'
import { toggleShowAddWorld, showAddWorld, threeToggle } from '~/logic'

const search = ref('')
const worldsReac = ref(worlds)
const worldToEdit = ref({})
const editMode = ref(false)

const { userWorlds, localUserWorlds } = useStore()
const sortAlpha = ref<number>(0)
const sortRating = ref<number>(0)

const options = {
  findAllMatches: true,
  threshold: 0.1,
  keys: ['worldName', 'condition.name'],
}

const fuse = new Fuse(worldsReac.value, options)

const worldsCount = computed(() => worlds.length)
const allUserWorlds = computed(() => userWorlds.value.concat(localUserWorlds.value))

const sortingFunc = (a: any, b: any) => (sortRating.value !== 0 ? (a.rating - b.rating) * sortRating.value : 0) || (sortAlpha.value !== 0 ? a.worldName.localeCompare(b.worldName) * sortAlpha.value : 0)

const worldsFiltered = computed(() => {
  if (search.value)
    return fuse.search(search.value).map(x => x.item).sort(sortingFunc)
  else
    return [...worldsReac.value].sort(sortingFunc)
})

function editWorld(world: typeof worlds[number]) {
  worldToEdit.value = world
  editMode.value = true
  toggleShowAddWorld()
}

function toggleRating() {
  sortRating.value = threeToggle(sortRating.value)
}

function toggleAlpha() {
  sortAlpha.value = threeToggle(sortAlpha.value)
}

</script>
