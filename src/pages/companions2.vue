
<template>
  <div class="flex flex-col background">
    <div ref="topElement" class="mb-1 md:mb-2 transition-all" :style="isTopVisible ? '' : `margin-top: -${topHeight + 6}px`">
      <div
        v-if="!loading"
        class="flex items-center md:justify-center flex-wrap gap-x-2 gap-y-1 px-1"
      >
        <div class="flex items-center w-full md:w-auto">
          <Input
            v-model.lazy="search"
            placeholder="Character name"
            class="flex-grow md:flex-grow-0"
          />
          <clarity:eraser-solid class="icon-btn w-8" @click="clearAndReset" />
        </div>
        <div class="flex items-center w-full md:w-auto">
          <AnythingInput
            v-model.lazy="worldName"
            placeholder="World name"
            class="flex-grow md:flex-grow-0"
            :list="[startingWorld.worldName, ...jumpChain.map(x => x.worldName)]"
          />
          <clarity:eraser-solid class="icon-btn w-8" @click="clearAndResetWorld" />
        </div>
        <div
          :class="{'bg-green-600': top100}"
          class="px-2 hover:bg-gray-700 text-gray-200 rounded bg-gray-600 cursor-pointer"
          title="New Changes"
          @click="toggleShowFilterTags()"
        >
          Tags
        </div>
        <!-- <Button size="Small" label="Tags" bg-color="bg-gray-600 hover:bg-teal-600" @click="toggleShowFilterTags()" /> -->
        <ic:baseline-filter-alt-off v-if="showFilters" class="icon-btn w-8 h-6" @click="showFilters = !showFilters" />
        <ic:baseline-filter-alt v-else class="icon-btn w-8 h-6" @click="showFilters = !showFilters" />
        <div v-if="showFilters" class="flex gap-2 flex-wrap">
          <div class="flex gap-1 border border-gray-700 dark:border-gray-500 rounded px-1 select-none">
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
              title="Sort by Tier"
              @click="toggleRating()"
            >
              <fa-solid:sort-numeric-down v-if="sortRating === 1" class="inline-block rounded" />
              <fa-solid:sort-numeric-up v-else class="inline-block rounded" />
            </div>
            <div
              class="flex items-center bg-gray-200 dark:bg-gray-700 px-1 rounded cursor-pointer"
              :class="sortWorld !== 0 ? 'border border-green-500' : ''"
              title="Sort by World name"
              @click="toggleWorld()"
            >
              <fa-solid:sort-alpha-down v-if="sortWorld === 1" class="inline-block rounded" />
              <fa-solid:sort-alpha-up v-else class="inline-block rounded" />
            </div>
            <div
              class="flex items-center bg-gray-200 dark:bg-gray-700 px-1 rounded cursor-pointer"
              :class="sortLikes !== 0 ? 'border border-green-500' : ''"
              title="Sort by World name"
              @click="toggleLikes()"
            >
              <mdi:heart-plus v-if="sortLikes === 1" class="inline-block rounded" />
              <mdi:heart-minus v-else class="inline-block rounded" />
            </div>
            <div
              class="flex items-center bg-gray-200 dark:bg-gray-700 px-0.5 rounded cursor-pointer"
              :class="shuffleOn ? 'border border-green-500' : ''"
              title="Shuffle"
              @click="shuffleOn = !shuffleOn"
            >
              <fad:shuffle class="inline-block rounded" />
            </div>
          </div>
          <div class="flex rounded bg-gray-600 cursor-pointer">
            <div
              :class="gender==='F' ? 'bg-gray-700':''"
              class="hover:bg-gray-700 text-pink-300 px-2 rounded-l"
              title="Female"
              @click="gender='F'"
            >
              F
            </div>
            <div
              :class="gender==='M' ? 'bg-gray-700':''"
              class="border-l border-r px-2 hover:bg-gray-700 text-blue-400"
              title="Male"
              @click="gender='M'"
            >
              M
            </div>
            <div
              :class="gender==='O' ? 'bg-gray-700':''"
              class="border-l border-r px-2 hover:bg-gray-700 text-violet-400"
              title="Other"
              @click="gender='O'"
            >
              O
            </div>
            <div
              :class="gender==='' ? 'bg-gray-700':''"
              class="hover:bg-gray-700 px-2 text-gray-200 rounded-r"
              title="All"
              @click="gender=''"
            >
              A
            </div>
          </div>
          <div class="flex rounded bg-gray-600 cursor-pointer">
            <div
              :class="!nsfw ? 'bg-gray-700':''"
              class="hover:bg-gray-700 text-green-300 px-2 rounded-l"
              @click="nsfw = false"
            >
              all
            </div>
            <div
              :class="nsfw ? 'bg-gray-700':''"
              class="border-l px-2 hover:bg-gray-700 text-gray-200"
              title="Have NSFW Image"
              @click="nsfw = !nsfw"
            >
              nsfw
            </div>
          </div>
        </div>
        <bi:gear-fill class="icon-btn" @click="toggleSearchSetting" />
        <!-- <div class="hidden md:block">
          {{ sortedResults.length }} results
        </div> -->
        <Button class="ml-auto md:ml-0" label="Add Character" size="Small" @click="() => (editMode = false, toggleShowAddCharacter())" />
      </div>
      <div v-else class="">
        Loading... <span class="inline-block text-xl"><eos-icons:bubble-loading /></span>
      </div>
      <div class="flex gap-4 justify-center pt-1 text-sm">
        <div v-if="tags.length" class="flex gap-1">
          Include:
          <Tag
            v-for="tag in tags"
            :key="tag.tag"
            class="hover:bg-red-500"
            :tag="waifuTags[tag.tag] || tag.tag"
            @click="tagToggles[tag.tag] = 0"
          />
        </div>
        <!-- <div v-if="tagsExclude.length" class="flex gap-1">
          Exclude:
          <Tag
            v-for="tag in tagsExclude"
            :key="tag"
            class="hover:bg-red-500"
            :tag="waifuTags[tag] || tag"
            @click="tagToggles[tag] = 0"
          />
        </div> -->
        <Button v-if="tags.length" size="Small" label="Clear All" bg-color="bg-blue-500" @click="tagToggles = {}" />
      </div>
    </div>
    <div ref="companionsList" class="overflow-y-auto w-full relative scrollbar overflow-x-hidden">
      <div
        ref="waifuList"
        class="relative grid gap-1 pb-8"
        :style="{'grid-template-columns': `repeat(${cardRowCount}, 1fr)`}"
        :class="cardWidth !== 284 ? '' : 'w-max mx-auto'"
      >
        <CompanionCard
          v-for="char in filteredCharacters"
          :key="char.uid"
          :char="char"
          :with-image="!settings.allImg"
          :is-user-char="char.type === 'local'"
          :char-likes="likes[char.u] || 0"

          :class="[!settings.allImg ? 'h-[500px]' : '']"
          :style="{width: `${cardWidth}px`}"
          @edit-companion="editCompanion"
          @reportCompanion="reportCompanion"
        />
        <div v-if="!filteredCharacters.length" class="text-center flex-grow">
          <p>
            No characters found.
          </p>
        </div>
      </div>
    </div>
    <AddCharacter
      v-if="showAddCharacter"
      :character="characterToEdit"
      :edit-mode="editMode"
      @click="toggleShowAddCharacter()"
    />
    <Report v-if="showReport" :character="characterToEdit" @click="toggleShowReport()" />
    <Tags v-if="showFilterTags" @click="toggleShowFilterTags()" />
    <SearchSettings v-if="showSearchSettings" @click="showSearchSettings = false" />
  </div>
</template>

<script lang="ts" setup>
import { DBCharacter, SearchRequest } from 'global'
import { useStore } from '~/store/store'

import { toggleShowAddCharacter, showAddCharacter, toggleShowFilterTags, showFilterTags, tagToggles, threeToggle, toggleShowReport, showReport, showSearchSettings, toggleSearchSetting, blackWhite, blackWhiteDisabled, andOr, showFilters } from '~/logic'
import { waifuTags, useAllChars } from '~/data/constants'
import { usePlayStore } from '~/store/play'
import { useSettings } from '~/logic/searchSettings'
import { getLikesByUid, searchForCharacters } from '~/logic/server/'
import { useGlobalSettings } from '~/store/settings'

const { startingWorld, settings, companionsUIDs } = useStore()
const { jumpChain, likes } = usePlayStore()
const { minTier, maxTier, worldName, blockedWorlds } = useSettings()
const { favorites } = useGlobalSettings()

const search = ref('')
const position = ref(0)
const page = ref(1)

const top100 = ref(false)

const gender = ref('')
const nsfw = ref(false)

const sortAlpha = ref(0)
const sortRating = ref(0)
const sortWorld = ref(0)
const shuffleOn = ref(false)
const sortLikes = ref(0)

// const characters = ref({})
const loading = ref(true)

const { changes } = useAllChars()

const editMode = ref(false)
const characterToEdit = ref({})
const waifuList = ref<HTMLElement|null>(null)
const companionsList = ref<HTMLElement|null>(null)

const { directions } = useScroll(companionsList)
const isTopVisible = ref(true)
const topElement = ref<HTMLElement|null>(null)
const { height: topHeight } = useElementSize(topElement)

watch(directions, () => {
  if (directions.top)
    isTopVisible.value = true
  if (directions.bottom)
    isTopVisible.value = false
})

const { width } = useElementSize(companionsList)
const cardRowCount = computed(() => {
  if (settings.value.columnsCompanions !== 0 && settings.value.columnsCompanions !== undefined)
    return settings.value.columnsCompanions
  if (companionsList.value) {
    // const wd = companionsList.value.clientWidth || 0
    return Math.floor(width.value / 285)
  }
  return 1
})

const cardWidth = computed(() => settings.value.columnsCompanions ? Math.floor(width.value / settings.value.columnsCompanions) - 3 : 284)

const cardColumnCount = computed(() => {
  if (companionsList.value) {
    const wd = (document.body.clientHeight - companionsList.value?.offsetTop) || 0
    return Math.floor(wd / (settings.value.allImg ? 180 : 504)) + (settings.value.allImg ? 6 : 4)
  }
  return 5
})

const limit = computed(() => {
  return cardRowCount.value * cardColumnCount.value
})

const params = useUrlSearchParams('history')

onMounted(async() => {
  loading.value = false
  if (params.name)
    nextTick(() => search.value = params.name as string)
  if (params.world)
    worldName.value = params.world as string
})

type tagKeys = keyof typeof waifuTags
const tags = computed(() => Object.keys(tagToggles.value).filter(key => tagToggles.value[key] !== 0).map(key => ({ tag: key, include: tagToggles.value[key] === 1 })) as any[])
// const tagsExclude = computed(() => Object.keys(tagToggles.value).filter(key => tagToggles.value[key] === -1) as tagKeys[])

const blockedSet = computed(() => new Set(blockedWorlds.value))

// interface SearchRequest {
//   tier?: {
//     minTier: number
//     maxTier: number
//   }
//   tags?: {
//     tag: string
//     include: boolean
//   }[]
//   hasNsfw?: boolean
//   newerThan?: Date
//   sortBy?: string // Example: likes:desc or likes:asc
//   limit?: number
//   page?: number
// }
const filteredCharacters = ref<DBCharacter[]>([])
const options = computed(() => {
  const opt = {} as SearchRequest

  if (search.value)
    opt.name = search.value
  if (worldName.value)
    opt.world = worldName.value
  if (tags.value.length)
    opt.tags = tags.value
  if (gender.value) {
    if (opt.tags)
      opt.tags.push({ tag: gender.value, include: true })
    else
      opt.tags = [{ tag: gender.value, include: true }]
  }
  if (minTier.value || maxTier.value)
    opt.tier = { min: minTier.value, max: maxTier.value }

  opt.sortBy = '_id:desc'
  if (sortAlpha.value !== 0)
    opt.sortBy = `name:${sortAlpha.value === -1 ? 'desc' : 'asc'}`
  if (sortRating.value !== 0)
    opt.sortBy = `tier:${sortRating.value === -1 ? 'desc' : 'asc'}`
  if (sortWorld.value !== 0)
    opt.sortBy = `world:${sortWorld.value === -1 ? 'desc' : 'asc'}`
  if (sortLikes.value !== 0)
    opt.sortBy = `likes:${sortLikes.value === 1 ? 'desc' : 'asc'}`
  if (nsfw.value)
    opt.hasNsfw = true
  return opt
})

searchForCharacters({ page: 1, limit: 25, ...options.value }).then((characters) => {
  filteredCharacters.value = characters.results
})

watch(options, () => searchForCharacters({ page: 1, limit: 25, ...options.value }).then((characters) => {
  filteredCharacters.value = characters.results
}))

useInfiniteScroll(
  companionsList,
  () => {
    page.value += 1
    searchForCharacters({ page: page.value, limit: limit.value, ...options.value }).then((characters) => {
      filteredCharacters.value.push(...characters.results)
    })
  },
  { distance: limit.value },
)

function editCompanion(char: any) {
  characterToEdit.value = char
  editMode.value = true
  toggleShowAddCharacter()
}

function reportCompanion(char: any) {
  characterToEdit.value = char
  toggleShowReport()
}

function toggleRating() {
  sortRating.value = threeToggle(sortRating.value)
}

function toggleAlpha() {
  sortAlpha.value = threeToggle(sortAlpha.value)
}

function toggleWorld() {
  sortWorld.value = threeToggle(sortWorld.value)
}

function toggleLikes() {
  sortLikes.value = threeToggle(sortLikes.value)
}

function clearAndReset() {
  searchForCharacters({ page: 1, limit: limit.value, ...options.value }).then((characters) => {
    filteredCharacters.value = characters.results
  })
  search.value = ''
  position.value = 0
  minTier.value = 1
  maxTier.value = 13
  if (companionsList.value)
    companionsList.value.scrollTop = 0
}

function clearAndResetWorld() {
  searchForCharacters({ page: 1, limit: limit.value, ...options.value }).then((characters) => {
    filteredCharacters.value = characters.results
  })
  worldName.value = ''
  position.value = 0
  minTier.value = 1
  maxTier.value = 13
  if (companionsList.value)
    companionsList.value.scrollTop = 0
}

</script>
