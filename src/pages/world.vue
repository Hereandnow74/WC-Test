
<template>
  <div class="px-2 !block grid grid-cols-1 grid-rows-[1fr,100%] h-full !overflow-hidden">
    <div class="max-w-4xl pb-1 mx-auto flex gap-2 flex-wrap md:flex-nowrap">
      <div class="flex items-center flex-grow">
        <Input
          v-model="search"
          placeholder="World name"
          class="w-full min-w-[160px]"
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
        <div
          class="flex items-center bg-gray-200 dark:bg-gray-700 px-1 rounded cursor-pointer"
          :class="sortAdded ? 'border border-red-500' : ''"
          title="Show new worlds first"
          @click="sortAdded = !sortAdded"
        >
          <bi:calendar2-date class="inline-block rounded" />
        </div>
      </div>
      <div class="flex gap-1">
        <NumberInput v-model="minDR" :min="1" :max="maxDR" />
        -
        <NumberInput v-model="maxDR" :min="minDR" :max="10" />
      </div>
      <div class="flex gap-1 px-0.5 items-center border rounded border-gray-600 dark:border-gray-300 whitespace-nowrap text-sm">
        <div class="flex gap-1 px-1 rounded items-center cursor-pointer hover:(bg-green-500 bg-opacity-60)" :class="filterUserWorlds === 5 ? 'bg-green-500 bg-opacity-60' : ''" @click="filterUserWorlds = filterUserWorlds ? 0 : 5">
          <div class="border border-gray-700 bg-yellow-300 w-4 h-4"></div>
          <div title="World or Condition from official WC spreadsheet">
            - Official DR
          </div>
        </div>
        <div class="h-4 w-[1px] bg-gray-400"></div>
        <div class="flex gap-1 px-1 rounded items-center cursor-pointer hover:(bg-green-500 bg-opacity-60)" :class="filterUserWorlds === 6 ? 'bg-green-500 bg-opacity-60' : ''" @click="filterUserWorlds = filterUserWorlds ? 0: 6">
          <div class="border border-gray-700 bg-gray-300 w-4 h-4"></div>
          <div title="World or Condition submitted by user">
            - User DR
          </div>
        </div>
        <div class="h-4 w-[1px] bg-gray-400"></div>
        <div class="flex gap-1 px-1 rounded items-center cursor-pointer hover:(bg-green-500 bg-opacity-60)" :class="filterFav ? 'bg-green-500 bg-opacity-60' : ''" @click="filterFav = !filterFav">
          <div class="text-red-500 flex items-center">
            <ci:heart-fill
              class="filter drop-shadow"
            />
          </div>
          <div title="World or Condition submitted by user">
            - Fav
          </div>
        </div>
      </div>
      <span class="hidden md:block whitespace-nowrap">Results: <span class="text-blue-500">{{ worldsFiltered.length }}</span></span>
      <Button size="Small" label="Add World" class="whitespace-nowrap" @click="() => (worldToEdit = {}, editMode = false, toggleShowAddWorld())" />
    </div>
    <div
      ref="worldWrapper"
      class="grid grid-cols-1 grid-flow-row-dense 4xl:grid-cols-6 5xl:grid-cols-7 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-1 h-full pb-16 min-h-0 overflow-y-auto scrollbar"
    >
      <WorldCard
        v-for="world in infiniteWorlds"
        :key="world.uid"
        :world="world"
        :targets="allWorldsTargets[world.worldName]"
        :class="{'row-span-2 min-h-72': world.image && !settings.hideWorldImg, 'sm:col-span-2': world.additional, 'sm:row-span-4': world.image && world.additional && !settings.hideWorldImg}"
        class="w-full"
        :min="minDR"
        :max="maxDR"
        @edit-world="editWorld"
        @showWorldInfo="worldInfo"
      />
      <Button v-if="worldWrapper && worldWrapper.clientHeight >= worldWrapper.scrollHeight && worldsFiltered.length > infiniteWorlds.length" bg-color="bg-orange-500" class="self-center justify-self-center" label="Load More" @click="infiniteWorlds.push(...worldsFiltered.slice(infiniteWorlds.length, infiniteWorlds.length + 10))" />
      <div v-if="!worldsFiltered.length" class="text-center flex-grow">
        <p>No worlds found.</p>
      </div>
    </div>
    <component :is="AddWorld" v-if="showAddWorld" :world="worldToEdit" :edit-mode="editMode" @click="toggleShowAddWorld()" />
    <component :is="WorldInfoModal" v-if="showWorldInfo" :world="worldToEdit" @click="showWorldInfo = false" />
  </div>
</template>

<script lang="ts" setup>
import Fuse from 'fuse.js'
import { isArray, some } from 'lodash-es'
import { DBWorld } from 'global'
import { useStore } from '~/store/store'
import { toggleShowAddWorld, showAddWorld, threeToggle } from '~/logic'
import { useWorlds } from '~/data/constants'
import { useGlobalSettings } from '~/store/settings'

const AddWorld = computed(() => defineAsyncComponent(() => import('../components/modals/AddWorld.vue')))
const WorldInfoModal = computed(() => defineAsyncComponent(() => import('../components/modals/WorldInfoModal.vue')))

const search = ref('')
const { worlds: worldsReac, subWorlds: worldsSubReac, allWorldTargets } = useWorlds()
const { favoriteWorldsObject } = useGlobalSettings()
const worldToEdit = ref({})
const editMode = ref(false)
const showWorldInfo = ref(false)

const { localUserWorlds, settings } = useStore()
const sortAlpha = ref(0)
const sortRating = ref(1)
const sortTargets = ref(0)
const sortAdded = ref(false)

const filterUserWorlds = ref(0)
const filterFav = ref(false)

const maxDR = ref(10)
const minDR = ref(1)

const options = {
  findAllMatches: true,
  threshold: 0.3,
  keys: [{ name: 'worldName', weight: 1.2 }, 'condition.name'],
}

const worldWrapper = ref<HTMLElement>(null)

// const subFuse = new Fuse(worldsSubReac.value, options)

const allUserWorlds = computed(() => localUserWorlds.value)

const allWorlds = computed(() => {
  return [...allUserWorlds.value, ...worldsReac.value, ...worldsSubReac.value]
})

const allWorldsTargets = computed(() => {
  return allWorlds.value.reduce((a, x) => (a[x.worldName] = calcTargets(x), a), {} as Record<string, number>)
},
)

const sortingFunc = (a: any, b: any) =>
  (sortRating.value !== 0 ? (a.rating - b.rating) * sortRating.value : 0)
|| (sortTargets.value !== 0 ? (allWorldsTargets.value[a.worldName] - allWorldsTargets.value[b.worldName]) * sortTargets.value : 0)
|| (sortAlpha.value !== 0 ? a.worldName.localeCompare(b.worldName) * sortAlpha.value : 0)

const fuse = new Fuse(allWorlds.value, options)
watch(allWorlds, () => fuse.setCollection(allWorlds.value))

function checkConditions(conditions: any[] | undefined): boolean {
  if (conditions === undefined)
    return false
  return some(conditions, x => x.rating >= minDR.value && x.rating <= maxDR.value)
}

const worldsFiltered = computed(() => {
  if (search.value) {
    return fuse.search(search.value).map(x => x.item)
      .filter(x => (x.rating >= minDR.value && x.rating <= maxDR.value) || checkConditions(x.condition))
      .filter(x => filterUserWorlds.value ? x.uid.length === filterUserWorlds.value : true)
      .filter(x => filterFav.value ? favoriteWorldsObject.value[x.uid] : true)
  }
  else {
    return sortAdded.value
      ? [...allWorlds.value].reverse()
      : [...allWorlds.value].sort(sortingFunc)
        .filter(x => (x.rating >= minDR.value && x.rating <= maxDR.value) || checkConditions(x.condition))
        .filter(x => filterUserWorlds.value ? x.uid.length === filterUserWorlds.value : true)
        .filter(x => filterFav.value ? favoriteWorldsObject.value[x.uid] : true)
  }
})

const startingWorldCount = settings.value.hideWorldImg ? 60 : 30

const infiniteWorlds = ref(worldsFiltered.value.slice(0, startingWorldCount))
watch(worldsFiltered, () => {
  infiniteWorlds.value = worldsFiltered.value.slice(0, startingWorldCount)
})

useInfiniteScroll(
  worldWrapper,
  () => {
    infiniteWorlds.value.push(...worldsFiltered.value.slice(infiniteWorlds.value.length, infiniteWorlds.value.length + 20))
  },
  { distance: 10 },
)

// const userWorldsFiltered = computed(() => {
//   if (search.value)
//     return subFuse.search(search.value).map(x => x.item).sort(sortingFunc)
//   else
//     return [...worldsSubReac.value].sort(sortingFunc)
// })

function editWorld(world: DBWorld) {
  worldToEdit.value = world
  editMode.value = true
  toggleShowAddWorld()
}

function worldInfo(world: DBWorld) {
  worldToEdit.value = world
  showWorldInfo.value = true
}

function calcTargets(world: DBWorld) {
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
