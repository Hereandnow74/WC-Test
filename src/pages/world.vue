
<template>
  <div class="p-2 !block">
    <div class="max-w-4xl pb-1 md:p-2 mx-auto flex gap-2 flex-wrap md:flex-nowrap">
      <div class="flex items-center flex-grow">
        <Input
          v-model="search"
          placeholder="World name"
          class="w-full"
        />
        <clarity:eraser-solid class="icon-btn w-8" @click="search = ''" />
      </div>
      <div class="flex gap-1 border rounded px-1 select-none">
        <span class="whitespace-nowrap font-bold">Sort By:</span>
        <div
          class="flex items-center bg-gray-200 dark:bg-gray-700 px-1 rounded cursor-pointer"
          :class="sortAlpha !== 0 ? 'border border-green-500' : ''"
          title="Sort by Name"
          @click="toggleAlpha()"
        >
          <fa-solid:sort-alpha-down v-if="sortAlpha === 1" class="inline-block rounded" />
          <fa-solid:sort-alpha-up v-else class="inline-block rounded" />
        </div>
        <div
          class="flex items-center bg-gray-200 dark:bg-gray-700 px-1 rounded cursor-pointer"
          :class="sortRating !== 0 ? 'border border-green-500' : ''"
          title="Sort by Rating"
          @click="toggleRating()"
        >
          <fa-solid:sort-numeric-down v-if="sortRating === 1" class="inline-block rounded" />
          <fa-solid:sort-numeric-up v-else class="inline-block rounded" />
        </div>
        <div
          class="flex items-center bg-gray-200 dark:bg-gray-700 px-1 rounded cursor-pointer"
          :class="sortTargets !== 0 ? 'border border-green-500' : ''"
          title="Sort by Targets"
          @click="toggleTargets()"
        >
          <fluent:target-20-filled class="inline-block rounded" />
        </div>
      </div>
      <div class="flex gap-1">
        <NumberInput v-model="minDR" :min="1" :max="maxDR" />
        -
        <NumberInput v-model="maxDR" :min="minDR" :max="10" />
      </div>
      <span class="hidden md:block whitespace-nowrap">Results: {{ worldsFiltered.length }}</span>
      <div class="flex gap-1 items-center border rounded border-gray-600 dark:border-gray-300 px-2 whitespace-nowrap text-sm">
        <div class="border border-gray-700 bg-yellow-300 w-4 h-4"></div>
        <div title="World or Condition from official WC spreadsheet">
          - Official DR
        </div>
        <div class="h-4 w-[1px] bg-gray-400"></div>
        <div class="border border-gray-700 bg-gray-300 w-4 h-4"></div>
        <div title="World or Condition submitted by user">
          - User DR
        </div>
      </div>
      <Button size="Small" label="Add World" class="whitespace-nowrap" @click="() => (editMode = false, toggleShowAddWorld())" />
    </div>
    <div class="grid grid-cols-1 grid-flow-row-dense 4xl:grid-cols-6 5xl:grid-cols-7 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-1 overflow-y-auto pb-8">
      <WorldCard
        v-for="world in worldsFiltered"
        :key="world.key"
        :world="world"
        :type="world.type"
        :class="{'row-span-2 min-h-72': world.image && !settings.hideWorldImg, 'sm:col-span-2': world.additional, 'sm:row-span-4': world.image && world.additional && !settings.hideWorldImg}"
        class="w-full"
        @edit-world="editWorld"
      />
      <div v-if="!worldsFiltered.length" class="text-center flex-grow">
        <p>No worlds found.</p>
      </div>
    </div>
    <AddWorld v-if="showAddWorld" :world="worldToEdit" :edit-mode="editMode" @click="toggleShowAddWorld()" />
  </div>
</template>

<script lang="ts" setup>
import Fuse from 'fuse.js'
import { isArray } from 'lodash'
import { useStore } from '~/store/store'
import { toggleShowAddWorld, showAddWorld, threeToggle } from '~/logic'
import { useWorlds } from '~/data/constants'
import { World } from '~/store/chargen'

const search = ref('')
const { worlds: worldsReac, subWorlds: worldsSubReac, allWorldTargets } = useWorlds()
const worldToEdit = ref({})
const editMode = ref(false)

const { userWorlds, localUserWorlds, settings } = useStore()
const sortAlpha = ref(0)
const sortRating = ref(1)
const sortTargets = ref(0)

const maxDR = ref(10)
const minDR = ref(1)

const options = {
  findAllMatches: true,
  threshold: 0.3,
  keys: ['worldName', 'condition.name'],
}

// const subFuse = new Fuse(worldsSubReac.value, options)

const allUserWorlds = computed(() => userWorlds.value.concat(localUserWorlds.value))

const sortingFunc = (a: any, b: any) =>
  (sortRating.value !== 0 ? (a.rating - b.rating) * sortRating.value : 0)
|| (sortTargets.value !== 0 ? (a.targets - b.targets) * sortTargets.value : 0)
|| (sortAlpha.value !== 0 ? a.worldName.localeCompare(b.worldName) * sortAlpha.value : 0)

const allWorlds = computed(() => {
  return [...allUserWorlds.value.map(x => (x.type = 'local', x.key = x.worldName + x.type, x)), ...worldsReac.value.map(x => (x.type = 'canon', x.key = x.worldName + x.type, x)), ...worldsSubReac.value.map(x => (x.type = 'user', x.key = x.worldName + x.type, x))].map(world => calcTargets(world) ? (world.targets = calcTargets(world), world) : (world.targets = 0, world))
})

const fuse = new Fuse(allWorlds.value, options)
watch(allWorlds, () => fuse.setCollection(allWorlds.value))

const worldsFiltered = computed(() => {
  if (search.value)
    return fuse.search(search.value).map(x => x.item).sort(sortingFunc).filter(x => x.rating >= minDR.value && x.rating <= maxDR.value)
  else
    return [...allWorlds.value].sort(sortingFunc).filter(x => x.rating >= minDR.value && x.rating <= maxDR.value)
})

// const userWorldsFiltered = computed(() => {
//   if (search.value)
//     return subFuse.search(search.value).map(x => x.item).sort(sortingFunc)
//   else
//     return [...worldsSubReac.value].sort(sortingFunc)
// })

function editWorld(world: typeof worlds[number]) {
  worldToEdit.value = world
  editMode.value = true
  toggleShowAddWorld()
}

function calcTargets(world: World) {
  let count = 0
  count += allWorldTargets.value[world.worldName] || 0
  if (isArray(world.condition))
    world.condition.forEach(condition => count += allWorldTargets.value[condition.name] || 0)
  return count
}

function toggleRating() {
  sortRating.value = threeToggle(sortRating.value)
}

function toggleAlpha() {
  sortAlpha.value = threeToggle(sortAlpha.value)
}
function toggleTargets() {
  sortTargets.value = threeToggle(sortTargets.value)
}

</script>
