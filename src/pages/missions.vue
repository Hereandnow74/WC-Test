<template>
  <div class="rounded p-2 flex flex-col gap-2">
    <div ref="topElement" class="text-sm md:text-base transition-all flex flex-col gap-2" :style="isTopVisible ? '' : `margin-top: -${topHeight + 8}px`">
      <h3 class="text-center flex gap-2 flex-wrap ">
        <Button
          :class="page === 0 ? 'bg-blue-800': ''"
          class="bg-purple-700 text-gray-100 rounded cursor-pointer hover:bg-purple-800 px-2"
          label="User submitted Missions"
          size="Small"
          icon="carbon:user-avatar-filled-alt"
          @click="page = 0"
        />
        <Button
          :class="page === 1 ? 'bg-blue-800': ''"
          class="bg-purple-700 text-gray-100 rounded cursor-pointer hover:bg-purple-800 px-2"
          label="Generated Missions"
          size="Small"
          icon="icon-park-solid:robot-one"
          @click="page = 1"
        />
        <Button
          :class="page === 2 ? 'bg-blue-800': ''"
          class="bg-purple-700 text-gray-100 rounded cursor-pointer hover:bg-purple-800 px-2"
          label="3 random missions"
          size="Small"
          icon="bi:patch-question-fill"
          @click="page = 2"
        />
        <Button
          class="text-base"
          icon="fluent:book-question-mark-24-regular"
          label="Propose a Mission"
          size="Small"
          bg-color="bg-amber-600"
          @click="() => toggleShowAddMission()"
        />
      </h3>
      <div v-if="page === 0" class="flex gap-2 justify-center flex-wrap">
        <Input v-model="search" placeholder="Search" class="flex-grow" />
        <div>
          <Select v-model="author" :options="authorOptions" label="Author" />
        </div>
        <div>
          <InputWithSearch v-model="world" :list="worldOptions" placeholder="World name" class="max-w-68" />
        </div>
        <div>
          <Select v-model="scope" :options="scopeOptions" label="Scope" />
        </div>
        <div class="hover:(text-red-400) text-lg cursor-pointer flex items-center gap-1" title="Filter by favorites" @click="(filterByFavorites = !filterByFavorites)">
          <span class="text-red-500">
            <ci:heart-fill
              v-if="filterByFavorites"
            />
            <ci:heart-outline v-else />
          </span>
        </div>
        <Button v-if="Object.values(missionRewards).length" size="Small" label="Delete all rewards" bg-color="bg-red-600" @click="missionRewards = {}" />
      </div>
    </div>
    <Note v-if="page === 1" type="warning" title="Work in progress">
      This section is in WIP stage, you can suggest simple missions/conditions/objectives for random mission generation on Discord
    </Note>
    <div ref="missionWrapper" class="w-full grid 2xl:grid-cols-[auto,auto,auto] lg:grid-cols-[auto,auto] gap-4 pb-8 justify-center overflow-y-auto scrollbar">
      <MissionCard v-for="mission in displayedMissions" :key="mission.uid" class="max-w-[600px]" :mission="mission" />
      <div v-if="!displayedMissions.length">
        No results matching your filter settings
      </div>
    </div>
    <div class="h-8"></div>
    <component :is="addMissionComponent" v-if="showAddMission" :missions="missions" @click="toggleShowAddMission()" />
  </div>
</template>

<script lang="ts" setup>
import Fuse from 'fuse.js'
import { Mission } from 'global'
import { find, groupBy, sample } from 'lodash-es'
import { onBeforeRouteUpdate } from 'vue-router'

import { toggleShowAddMission, showAddMission } from '~/logic'
import { MissionGenerator } from '~/logic/missionsGen'
import { usePlayStore } from '~/store/play'
import { useSaves } from '~/store/saves'

const { currentWorld, missionRewards } = usePlayStore()
const { missionFavorites } = useSaves()

const addMissionComponent = computed(() => defineAsyncComponent(() => import('../components/modals/AddMission.vue')))

const filterByFavorites = ref(false)

const missions = ref<Mission[]>([])

const missionWrapper = ref<HTMLElement>(null)

const search = ref('')

const { directions } = useScroll(missionWrapper)
const isTopVisible = ref(true)
const topElement = ref<HTMLElement>(null)
const { height: topHeight } = useElementSize(topElement)

watch(directions, () => {
  if (directions.top)
    isTopVisible.value = true
  if (directions.bottom)
    isTopVisible.value = false
})

async function getMissions() {
  missions.value = (await import('~/data/json/missions.json')).default
}

getMissions()

const authorOptions = computed(() => {
  const authors = Object.keys(groupBy(missions.value, 'author')).sort((a, b) => a.localeCompare(b))
  authors.unshift('Any')
  return authors
})
const worldOptions = computed(() => Object.keys(groupBy(missions.value, 'loca')))
const scopeOptions = ['Any', 'Quick', 'Standard', 'Grand']

const author = ref('Any')
const world = ref('')
const scope = ref('Any')

const page = ref(0)

const options = reactive({
  findAllMatches: true,
  useExtendedSearch: true,
  threshold: 0.4,
  ignoreLocation: true,
  keys: ['loca', 'scope', 'author', 'desc', 'conditions.value', 'objectives.value', 'objectives.reward', 'reward'],
  shouldSort: false,
})

const fuse = computed(() => new Fuse(missions.value, options))

const searchedMissions = computed(() => {
  const sr = world.value || '!^xxx'
  const sopt: any = {
    $and: [
      { loca: sr },
    ],
  }
  if (search.value) {
    sopt.$and.push({
      $or: [
        { desc: `'"${search.value}"` },
        { reward: `'"${search.value}"` },
        { 'conditions.value': `'"${search.value}"` },
        { 'objectives.value': `'"${search.value}"` },
        { 'objectives.reward': `'"${search.value}"` }],
    })
  }
  if (scope.value !== 'Any') sopt.$and.push({ scope: `=${scope.value}` })
  if (author.value !== 'Any') sopt.$and.push({ author: `="${author.value}"` })
  return fuse.value.search(sopt)
})

watch([world, scope, author], () => {
  if (world.value || (author.value && author.value !== 'Any') || (scope.value && scope.value !== 'Any'))
    options.shouldSort = true
  else
    options.shouldSort = false
})

const filteredMissions = computed(() => searchedMissions.value.map(x => x.item).filter(x => filterByFavorites.value ? missionFavorites.value.includes(x.uid) : true))

const gen = new MissionGenerator()
const gen2 = new MissionGenerator()
const generatedMissions = computed(() => {
  const arr = []
  for (let i = 0; i < 10; i++)
    arr.push(gen.generateRandom().getObject())
  return arr
})

const missionUID = ref('')
const params = useUrlSearchParams('history')
if (params.q) {
  missionUID.value = `${params.q}`
  page.value = 3
}

const singleMission = computed(() => {
  if (missionUID.value) {
    page.value = 3
    const mission = find(missions.value, { uid: missionUID.value })
    return mission ? [mission] : []
  }
  else {
    page.value = 0
  }
  return []
})

onBeforeRouteUpdate((to, from, next) => {
  if (to.query.q) {
    missionUID.value = `${to.query.q}`
    page.value = 3
  }
  else { page.value = 0 }
  setTimeout(next, 1)
})

const threeMission = computed(() => [sample(missions.value), sample(missions.value), gen2.generateRandom(currentWorld.value.worldName).getObject()])

const startingMissionsCount = 10
const infiniteMissions = ref(filteredMissions.value.slice(0, startingMissionsCount))
watch(filteredMissions, () => infiniteMissions.value = filteredMissions.value.slice(0, startingMissionsCount))

useInfiniteScroll(
  missionWrapper,
  () => {
    infiniteMissions.value.push(...filteredMissions.value.slice(infiniteMissions.value.length, infiniteMissions.value.length + startingMissionsCount))
  },
  { distance: 10 },
)

const displayedMissions = computed(() => {
  switch (page.value) {
    case 0:
      return infiniteMissions.value
    case 1:
      return generatedMissions.value
    case 2:
      return threeMission.value
    case 3:
      return singleMission.value
  }
  return infiniteMissions.value
})

</script>
