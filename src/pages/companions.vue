
<template>
  <div class="flex flex-col">
    <div ref="topElement" class="mb-1 md:mb-2 transition-all" :style="isTopVisible ? '' : `margin-top: -${topHeight + 6}px`">
      <div
        v-if="!loading"
        class="flex items-center justify-center flex-wrap gap-x-2 gap-y-1"
      >
        <div class="flex items-center">
          <Input
            v-model="search"
            placeholder="Character name"
          />
          <clarity:eraser-solid class="icon-btn w-8" @click="clearAndReset" />
        </div>
        <div class="flex items-center">
          <AnythingInput
            v-model="worldName"
            placeholder="World name"
            :list="[startingWorld.worldName, ...jumpChain.map(x => x.worldName)]"
          />
          <clarity:eraser-solid class="icon-btn w-8" @click="clearAndResetWorld" />
        </div>
        <Button size="Small" label="Tags" bg-color="bg-gray-600 hover:bg-teal-600" @click="toggleShowFilterTags()" />
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
            title="Sort by Rating"
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
            :class="image===0 && nsfw==='' ? 'bg-gray-700':''"
            class="hover:bg-gray-700 text-green-300 px-2 rounded-l"
            @click="(image=0, nsfw='', favorite=0)"
          >
            all
          </div>
          <div
            :class="{'bg-red-600': image === -1, 'bg-green-600': image === 1}"
            class="border-l px-2 hover:bg-gray-700 text-gray-200"
            title="Have Image"
            @click="image = threeToggle(image)"
          >
            img
          </div>
          <div
            :class="nsfw==='!cvxz' ? 'bg-gray-700':''"
            class="border-l px-2 hover:bg-gray-700 text-gray-200"
            title="Have NSFW Image"
            @click="nsfw === ''? nsfw='!cvxz' : nsfw=''"
          >
            nsfw
          </div>
          <div
            :class="{'bg-red-600': favorite === -1, 'bg-green-600': favorite === 1}"
            class="border-l px-2 hover:bg-gray-700 text-gray-200"
            title="Favorites"
            @click="favorite = threeToggle(favorite)"
          >
            fav
          </div>
          <div
            :class="{'bg-red-600': local === -1, 'bg-green-600': local === 1}"
            class="border-l px-2 hover:bg-gray-700 text-gray-200"
            title="Local"
            @click="local = threeToggle(local)"
          >
            loc
          </div>
          <div
            :class="{'bg-red-600': retinue === -1, 'bg-green-600': retinue === 1}"
            class="border-l px-2 hover:bg-gray-700 text-gray-200 rounded-r"
            title="Retinue"
            @click="retinue = threeToggle(retinue)"
          >
            ret
          </div>
          <div
            :class="{'bg-green-600': newChanges}"
            class="border-l px-2 hover:bg-gray-700 text-gray-200 rounded-r"
            title="New Changes"
            @click="newChanges = !newChanges"
          >
            new
          </div>
        </div>
        <bi:gear-fill class="icon-btn" @click="toggleSearchSetting" />
        <div class="hidden md:block">
          {{ sortedResults.length }} results
        </div>
        <Button label="Add Character" size="Small" @click="() => (editMode = false, toggleShowAddCharacter())" />
      </div>
      <div v-else class="">
        Loading... <span class="inline-block text-xl"><eos-icons:bubble-loading /></span>
      </div>
      <div class="flex gap-4 justify-center pt-1">
        <div v-if="tagsInclude.length" class="flex gap-1">
          Include:
          <Tag
            v-for="tag in tagsInclude"
            :key="tag"
            class="hover:bg-red-500"
            :tag="waifuTags[tag] || tag"
            @click="tagToggles[tag] = 0"
          />
        </div>
        <div v-if="tagsExclude.length" class="flex gap-1">
          Exclude:
          <Tag
            v-for="tag in tagsExclude"
            :key="tag"
            class="hover:bg-red-500"
            :tag="waifuTags[tag] || tag"
            @click="tagToggles[tag] = 0"
          />
        </div>
      </div>
    </div>
    <div ref="companionsList" class="overflow-y-auto w-full relative scrollbar">
      <div
        ref="waifuList"
        class="relative grid gap-1 pb-8"
        :style="{top: `${topPosition}px`, 'grid-template-columns': `repeat(${cardRowCount}, 1fr)`}"
      >
        <CompanionCard
          v-for="{ item: char } in slicedChars"
          :key="char.type === 'local' ? `l${char.u}` : char.u"
          :char="char"
          :with-image="!settings.allImg"
          :is-user-char="char.type === 'local'"
          :class="!settings.allImg ? 'h-[500px]' : ''"
          @edit-companion="editCompanion"
          @reportCompanion="reportCompanion"
        />
        <div v-if="!slicedChars.length" class="text-center flex-grow">
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
    <SearchSettings v-if="showSearchSettings" @click="toggleSearchSetting()" />
  </div>
</template>

<script lang="ts" setup>
import Fuse from 'fuse.js'
import { every, intersection, some, shuffle, repeat, remove, groupBy, flatten } from 'lodash-es'
import { DBCharacter } from 'global'
import { useStore } from '~/store/store'

import { toggleShowAddCharacter, showAddCharacter, toggleShowFilterTags, showFilterTags, tagToggles, threeToggle, toggleShowReport, showReport, showSearchSettings, toggleSearchSetting, blackWhite, blackWhiteDisabled, andOr } from '~/logic'
import { waifuTags, useAllChars } from '~/data/constants'
import { usePlayStore } from '~/store/play'
import { useSettings } from '~/logic/searchSettings'

const { startingWorld, favorites, settings, companionsUIDs, defenseRetinueDiscountAuto } = useStore()
const { jumpChain } = usePlayStore()
const { minTier, maxTier, worldName, blockedWorlds } = useSettings()

const search = ref('')
const position = ref(0)

const gender = ref('')
const image = ref(0)
const nsfw = ref('')
const favorite = ref(0)
const local = ref(0)
const retinue = ref(0)
const newChanges = ref(false)

const sortAlpha = ref(0)
const sortRating = ref(0)
const sortWorld = ref(0)
const shuffleOn = ref(false)

// const characters = ref({})
const loading = ref(true)

const { allCharsComp: allChars, changes } = useAllChars()

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

const cardRowCount = computed(() => {
  if (companionsList.value) {
    const wd = companionsList.value.clientWidth || 0
    if (wd >= 2300) return 7
    if (wd >= 2000) return 6
    if (wd >= 1280) return 5
    if (wd >= 1024) return 4
    if (wd >= 768) return 3
    if (wd >= 640) return 2
  }
  return 1
})

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

const options = {
  findAllMatches: true,
  useExtendedSearch: true,
  threshold: 0.4,
  ignoreLocation: true,
  keys: [{ name: 'n', weight: 1.1 }, 'w', 'b', 'i', 'd', 'in', 'u', 'k'],
}

const options2 = {
  useExtendedSearch: true,
  findAllMatches: true,
  threshold: 0.4,
  keys: ['n', 'w', 'b', 'i', 'd', 'in', 'u', 'k'],
  shouldSort: false,
}

const fuse = computed(() => new Fuse(allChars.value, options))
const fuseNoSort = computed(() => new Fuse(allChars.value, options2))

const params = useUrlSearchParams('history')

onMounted(async() => {
  loading.value = false
  if (params.name)
    nextTick(() => search.value = params.name as string)
  if (params.world)
    worldName.value = params.world as string
})

type tagKeys = keyof typeof waifuTags
const tagsInclude = computed(() => Object.keys(tagToggles).filter(key => tagToggles[key] === 1) as tagKeys[])
const tagsExclude = computed(() => Object.keys(tagToggles).filter(key => tagToggles[key] === -1) as tagKeys[])

const blockedSet = computed(() => new Set(blockedWorlds.value))

// watch([secondFilter, charArr], () => {
//   fuse.setCollection(secondFilter.value)
//   fuseNoSort.setCollection(secondFilter.value)
// })

const filteredCharacters = computed(() => {
  const sr = search.value || '!^xxx'
  const sopt: any = {
    $and: [
      { n: sr },
    ],
  }
  switch (true) {
    // Search by nickname
    case sr.startsWith('@'):
      sopt.$and.pop()
      sopt.$and.push({ k: sr.slice(1) })
      break
    // Search by name
    case sr.startsWith('#'):
      sopt.$and.pop()
      sopt.$and.push({ n: sr.slice(1) })
      break
    // Search by world
    case sr.startsWith('%'):
      sopt.$and.pop()
      sopt.$and.push({ w: sr.slice(1) })
      break
    // Search by subworld
    case sr.startsWith('$'):
      sopt.$and.pop()
      sopt.$and.push({ d: sr.slice(1) })
      break
    // Search by name with locked world
    case !!worldName.value:
      sopt.$and.push(
        {
          $or: [
            { w: `'"${worldName.value}"` }, { d: `'"${worldName.value}"` },
          ],
        },
      )
      break
  }
  if (gender.value) sopt.$and.push({ b: `=${gender.value}` })

  if (image.value === 1) sopt.$and.push({ i: '!fsdg' })
  if (nsfw.value) sopt.$and.push({ in: nsfw.value })
  if (favorite.value === 1) sopt.$and.push({ u: `=${favorites.value.join('|=')}` })
  if (favorite.value === -1) sopt.$and.push({ u: `!^${favorites.value.join(' !^')}` })
  if (newChanges.value) sopt.$and.push({ u: `=${Object.keys(changes.value).join('|=')}` })
  if (retinue.value === 1) sopt.$and.push({ u: `=${Object.keys(companionsUIDs.value).join('|=')}` })
  if (retinue.value === -1) sopt.$and.push({ u: `!^${Object.keys(companionsUIDs.value).join(' !^')}` })
  if (search.value.length === 0)
    return fuseNoSort.value.search(sopt)
  return fuse.value.search(sopt)
})

const secondFilter = computed(() => {
  const tagsI = (x: DBCharacter) => andOr.value ? intersection(x.b, tagsInclude.value).length >= 1 : intersection(x.b, tagsInclude.value).length === tagsInclude.value.length
  const tagsE = (x: DBCharacter) => !some(x.b, x => tagsExclude.value.includes(x))
  const tier = (x: DBCharacter) => x.t >= minTier.value && x.t <= maxTier.value
  const blocked = (x: DBCharacter) => blackWhite.value ? blockedSet.value.has(x.w) : !blockedSet.value.has(x.w)
  const localF = (x: DBCharacter) => local.value === 1 ? x.type === 'local' : x.type !== 'local'
  const emptyImg = (x: DBCharacter) => x.i === ''

  const allFilters = [] as ((arg0: DBCharacter) => boolean)[]

  if (tagsInclude.value.length)
    allFilters.push(tagsI)
  if (tagsExclude.value.length)
    allFilters.push(tagsE)
  if (minTier.value !== 1 || maxTier.value !== 11)
    allFilters.push(tier)
  if (blockedSet.value.size && !blackWhiteDisabled.value)
    allFilters.push(blocked)
  if (local.value !== 0)
    allFilters.push(localF)
  if (image.value === -1)
    allFilters.push(emptyImg)

  return allFilters.length
    ? filteredCharacters.value.filter((x) => {
      return every(allFilters, val => val(x.item))
    })
    : filteredCharacters.value
})

const sortingFunc = (a: any, b: any) =>
  (sortRating.value !== 0 ? (a.item.t - b.item.t) * sortRating.value : 0)
|| (sortWorld.value !== 0 ? `${a.item.w}${a.item.d}`.localeCompare(`${b.item.w}${b.item.d}`) * sortWorld.value : 0)
|| (sortAlpha.value !== 0 ? a.item.n.localeCompare(b.item.n) * sortAlpha.value : 0)

const sortedResults = computed(() => {
  if (shuffleOn.value)
    return shuffle(secondFilter.value)
  if (sortRating.value || sortAlpha.value || sortWorld.value)
    return [...secondFilter.value].sort(sortingFunc)
  return secondFilter.value
})

const slicedChars = computed(() => {
  // const groupped = groupBy(filteredCharacters.value, (n) => { return n.item.n.toLowerCase() })
  // const moreThan2 = Object.values(groupped).filter(x => x.length >= 2)
  // const result = flatten(moreThan2)
  // const result = uniq(flatten(filter(groupped, (n) => { return n.length > 1 })))
  // return result.slice(limit.value > 100 ? limit.value - 100 : 0, limit.value)
  return sortedResults.value.slice(position.value, position.value + limit.value)
  // return result.slice(position.value, position.value + limit.value)
})

watch(sortedResults, () => {
  if (companionsList.value)
    companionsList.value.scrollTop = 0
  position.value = 0
})

// const allCredits = computed(() => charArr.value.reduce((a, b) => b.t !== 11 ? a += CHAR_COSTS[b.t] : a, 0))

const firstCard = ref<Element|null>(null)
const lastCard = ref<Element|null>(null)

const opt = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1,
}
const observer = new IntersectionObserver(visibilityChanged, opt)

watch(slicedChars, () => {
  if (sortedResults.value.length <= limit.value) return
  observer.disconnect()
  if (firstCard.value && lastCard.value) {
    firstCard.value.id = ''
    lastCard.value.id = ''
  }
  if (waifuList.value && waifuList.value.children.length > 1) {
    firstCard.value = waifuList.value.children[0]
    lastCard.value = waifuList.value.children[waifuList.value.children.length - 1]
    firstCard.value.id = 'first'
    lastCard.value.id = 'last'
    observer.observe(firstCard.value)
    observer.observe(lastCard.value)
  }
}, { flush: 'post' })

function visibilityChanged(entries: IntersectionObserverEntry[]) {
  // Both card are visible
  if (entries.length >= 2 && entries[0].isIntersecting && entries[1].isIntersecting)
    return

  const entry = entries[0]
  if (entry.target.id === 'last' && entry.isIntersecting && position.value + limit.value <= secondFilter.value.length) {
    position.value += cardRowCount.value
    return
  }

  if (entry.target.id === 'first' && entry.isIntersecting && position.value >= cardRowCount.value)
    position.value -= cardRowCount.value
}

const topPosition = computed(() => position.value / cardRowCount.value * ((firstCard.value?.clientHeight || 0) || 500))

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

function clearAndReset() {
  search.value = ''
  position.value = 0
  minTier.value = 1
  maxTier.value = 11
  if (companionsList.value)
    companionsList.value.scrollTop = 0
}

function clearAndResetWorld() {
  worldName.value = ''
  position.value = 0
  minTier.value = 1
  maxTier.value = 11
  if (companionsList.value)
    companionsList.value.scrollTop = 0
}

</script>
