
<template>
  <div class="flex flex-col background">
    <div ref="topElement" class="mb-1 md:mb-2 transition-all" :style="isTopVisible ? '' : `margin-top: -${topHeight + 6}px`">
      <div
        v-if="!loading"
        class="flex items-center md:justify-center flex-wrap gap-x-2 gap-y-1 px-1"
      >
        <div class="flex items-center w-full md:w-auto">
          <Input
            v-model="search"
            placeholder="Character name"
            class="flex-grow md:flex-grow-0"
          />
          <clarity:eraser-solid class="icon-btn w-8" @click="clearAndReset" />
        </div>
        <div class="flex items-center w-full md:w-auto">
          <AnythingInput
            v-model="worldName"
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
            <!-- <div
              class="flex items-center bg-gray-200 dark:bg-gray-700 px-0.5 rounded cursor-pointer"
              :class="imgur ? 'border border-green-500' : ''"
              title="Shuffle"
              @click="imgur = !imgur"
            >
              <fad:shuffle class="inline-block rounded" />
            </div> -->
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
              :class="nsfw==='' ? 'bg-gray-700':''"
              class="hover:bg-gray-700 text-green-300 px-2 rounded-l"
              @click="(nsfw='', favorite=0)"
            >
              all
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
              :class="{'bg-red-600': swp === -1, 'bg-green-600': swp === 1}"
              class="border-l px-2 hover:bg-gray-700 text-gray-200 rounded-r"
              title="Specific Waifu Perks"
              @click="swp = threeToggle(swp)"
            >
              swp
            </div>
            <div
              ref="newChangesButton"
              :class="{'bg-green-600': newChanges}"
              class="relative border-l px-2 hover:bg-gray-700 text-gray-200 rounded-r"
              @click="newChanges = !newChanges"
            >
              new
              <div ref="newChangesElement" class="flex flex-col gap-2">
                <div
                  :class="{'bg-green-600': newChangesTiers}"
                  class="hover:bg-gray-700 text-gray-200 px-2 rounded"
                  title="New Changes"
                  @click="newChangesTiers = !newChangesTiers"
                >
                  Tiers
                </div>
                <div
                  :class="{'bg-green-600': newChangesTags}"
                  class="hover:bg-gray-700 text-gray-200 px-2 rounded"
                  title="New Changes"
                  @click="newChangesTags = !newChangesTags"
                >
                  Tags
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="px-2 hover:bg-gray-700 text-gray-200 rounded bg-gray-600 cursor-pointer"
          title="Tags filtering"
          @click="top100 = !top100"
        >
          Top 100
        </div>
        <bi:gear-fill class="icon-btn" @click="toggleSearchSetting" />
        <div class="hidden md:block">
          {{ sortedResults.length }} results
        </div>
        <Button class="ml-auto md:ml-0" label="Add Character" size="Small" @click="addNewChar" />
      </div>
      <div v-else class="">
        Loading... <span class="inline-block text-xl"><eos-icons:bubble-loading /></span>
      </div>
      <div class="flex gap-4 justify-center pt-1 text-sm">
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
        <Button v-if="tagsInclude.length || tagsExclude.length" size="Small" label="Clear All" bg-color="bg-blue-500" @click="tagToggles = {}" />
      </div>
    </div>
    <div ref="companionsList" class="overflow-y-auto w-full relative scrollbar overflow-x-hidden">
      <div
        ref="waifuList"
        class="relative grid gap-1 pb-8"
        :style="{top: `${topPosition}px`, 'grid-template-columns': `repeat(${cardRowCount}, 1fr)`}"
        :class="cardWidth !== 284 ? '' : 'w-max mx-auto'"
      >
        <component
          :is="char.c && char.c==='swp' ? CompanionSWPCard : CompanionCard"
          v-for="char in slicedChars"
          :key="char.type === 'local' ? `l${char.u}` : char.u"
          :char="char"
          :with-image="!settings.allImg"
          :is-user-char="char.type === 'local'"
          :char-likes="likes[char.u] || 0"

          :class="[!settings.allImg ? 'h-[500px]' : '']"
          :style="{width: `${cardWidth}px`}"
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
    <SearchSettings v-if="showSearchSettings" @click="showSearchSettings = false" />
  </div>
</template>

<script lang="ts" setup>
import { every, intersection, some, shuffle, throttle } from 'lodash-es'
import { DBCharacter } from 'global'
import tippy from 'tippy.js'
import { useStore } from '~/store/store'
import CompanionCard from '~/components/cards/CompanionCard.vue'
import CompanionSWPCard from '~/components/cards/CompanionSWPCard.vue'

import { toggleShowAddCharacter, showAddCharacter, toggleShowFilterTags, showFilterTags, tagToggles, threeToggle, toggleShowReport, showReport, showSearchSettings, toggleSearchSetting, blackWhite, blackWhiteDisabled, andOr, showFilters } from '~/logic'
import { waifuTags, useAllChars } from '~/data/constants'
import { usePlayStore } from '~/store/play'
import { useSettings } from '~/logic/searchSettings'
import { useCompanionsLogic } from '~/logic/pagesLogic/companionsLogic'
import { getLikesByUid, searchForCharacters } from '~/logic/server/'
import { useGlobalSettings } from '~/store/settings'
import { useUser } from '~/store/user'

const { startingWorld, settings, companionsUIDs } = useStore()
const { jumpChain, likes } = usePlayStore()
const { minTier, maxTier, worldName, blockedWorlds } = useSettings()
const { favorites } = useGlobalSettings()
const { user } = useUser()

const filteredFavorites = computed(() => user.value.likedCharacters && user.value.likedCharacters.length ? user.value.likedCharacters : favorites.value)

const search = ref('')
const position = ref(0)

const top100 = ref(false)

const gender = ref('')
const nsfw = ref('')
const favorite = ref(0)
const local = ref(0)
const retinue = ref(0)
const newChanges = ref(false)
const newChangesTiers = ref(false)
const newChangesTags = ref(false)
const swp = ref(-1)

const sortAlpha = ref(0)
const sortRating = ref(0)
const sortWorld = ref(0)
const shuffleOn = ref(false)
const imgur = ref(false)

// const characters = ref({})
const loading = ref(true)

const { changes } = useAllChars()
const { fuse, fuseNoSort } = useCompanionsLogic()

const editMode = ref(false)
const characterToEdit = ref({})
const waifuList = ref<HTMLElement|null>(null)
const companionsList = ref<HTMLElement|null>(null)

const { directions } = useScroll(companionsList)
const isTopVisible = ref(true)
const topElement = ref<HTMLElement|null>(null)
const { height: topHeight } = useElementSize(topElement)

const newChangesElement = ref<HTMLElement|null>(null)
const newChangesButton = ref<HTMLElement|null>(null)

watch(newChangesElement, () => {
  if (newChangesButton.value && newChangesElement.value) {
    tippy(newChangesButton.value, {
      content: newChangesElement.value,
      allowHTML: true,
      arrow: false,
      interactive: true,
      placement: 'bottom',
      delay: [0, 500],
    })
  }
})

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
const tagsInclude = computed(() => Object.keys(tagToggles.value).filter(key => tagToggles.value[key] === 1) as tagKeys[])
const tagsExclude = computed(() => Object.keys(tagToggles.value).filter(key => tagToggles.value[key] === -1) as tagKeys[])

const blockedSet = computed(() => new Set(blockedWorlds.value))

const onlyTierChanges = computed(() => {
  return Object.values(changes.value).filter(x => x.tier)
    .map(x => x.u)
})

const onlyTagChanges = computed(() => {
  return Object.values(changes.value).filter(x => x.tags)
    .map(x => x.u)
})

// watch([secondFilter, charArr], () => {
//   fuse.setCollection(secondFilter.value)
//   fuseNoSort.setCollection(secondFilter.value)
// })

const filteredCharacters = computed(() => {
  const sr = search.value
  const sopt: any = {
    $and: [
    ],
  }
  if (!sr && !worldName.value)
    sopt.$and.push({ n: '!^xxx' })
  else if (sr)
    sopt.$and.push({ n: sr })

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
    {
      let searchPrefix = '\''
      let searchString = worldName.value
      if (worldName.value.startsWith('=')) {
        searchString = worldName.value.slice(1)
        searchPrefix = '='
      }
      sopt.$and.push(
        {
          $or: [
            { w: `${searchPrefix}"${searchString}"` }, { d: `${searchPrefix}"${searchString}"` },
          ],
        },
      )
      break }
  }

  if (gender.value) sopt.$and.push({ b: `=${gender.value}` })

  if (nsfw.value) sopt.$and.push({ in: nsfw.value })
  if (favorite.value === 1) sopt.$and.push({ u: `=${filteredFavorites.value.join('|=')}` })
  if (favorite.value === -1) sopt.$and.push({ u: `!^${filteredFavorites.value.join(' !^')}` })
  if (swp.value === 1) sopt.$and.push({ c: '=swp' })
  if (swp.value === -1) sopt.$and.push({ c: '=none' })
  // console.log(changes.value)
  if (newChanges.value) sopt.$and.push({ u: `=${Object.keys(changes.value).join('|=')}` })
  if (newChangesTiers.value) sopt.$and.push({ u: `=${onlyTierChanges.value.join('|=')}` })
  if (newChangesTags.value) sopt.$and.push({ u: `=${onlyTagChanges.value.join('|=')}` })
  if (imgur.value) sopt.$and.push({ i: '^https://i.imgur.com/' })
  if (retinue.value === 1) sopt.$and.push({ u: `=${Object.keys(companionsUIDs.value).join('|=')}` })
  if (retinue.value === -1) sopt.$and.push({ u: `!^${Object.keys(companionsUIDs.value).join(' !^')}` })
  if (search.value.length === 0 && worldName.value.length === 0)
    return fuseNoSort.value.search(sopt)
  return fuse.value.search(sopt)
})

const secondFilter = computed(() => {
  console.log('secondFilter')
  const tagsI = (x: DBCharacter) => andOr.value ? intersection(x.b, tagsInclude.value).length >= 1 : intersection(x.b, tagsInclude.value).length === tagsInclude.value.length
  const tagsE = (x: DBCharacter) => !some(x.b, x => tagsExclude.value.includes(x))
  const tier = (x: DBCharacter) => x.t >= minTier.value && x.t <= maxTier.value
  const blocked = (x: DBCharacter) => blackWhite.value ? blockedSet.value.has(x.w) : !blockedSet.value.has(x.w)
  const localF = (x: DBCharacter) => local.value === 1 ? x.type === 'local' : x.type !== 'local'

  const allFilters = [] as ((arg0: DBCharacter) => boolean)[]

  if (tagsInclude.value.length)
    allFilters.push(tagsI)
  if (tagsExclude.value.length)
    allFilters.push(tagsE)
  if (minTier.value !== 1 || maxTier.value !== 13)
    allFilters.push(tier)
  if (blockedSet.value.size && !blackWhiteDisabled.value)
    allFilters.push(blocked)
  if (local.value !== 0)
    allFilters.push(localF)

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
  console.log('sortedResults')
  if (shuffleOn.value)
    return shuffle(secondFilter.value).map(x => x.item)
  if (sortRating.value || sortAlpha.value || sortWorld.value)
    return [...secondFilter.value].sort(sortingFunc).map(x => x.item)
  return secondFilter.value.map(x => x.item)
})

const top100chars = ref<DBCharacter[]>([])
watch(top100, () => top100.value ? searchForCharacters({ sortBy: 'likes:desc', limit: 100 }).then(x => top100chars.value = x.results.map(char => (console.log(char), { u: char.uid, n: char.name, w: char.world, t: char.tier, b: char.tags, i: char.image, s: char.sourceImage, d: char.subWorld, in: char.image_nsfw }))) : null)

const slicedChars = computed(() => {
  return top100.value ? top100chars.value : sortedResults.value.slice(position.value, position.value + limit.value)
})

async function getLikes() {
  likes.value = await getLikesByUid(slicedChars.value.map(x => x.u))
}

const throttledLikes = throttle(getLikes, 200)

watch(slicedChars, async() => {
  if (slicedChars.value.length)
    throttledLikes()
})

watch([sortedResults, top100], () => {
  if (companionsList.value)
    companionsList.value.scrollTop = 0
  position.value = 0
})

const firstCard = ref<Element|null>(null)
const lastCard = ref<Element|null>(null)

const opt = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1,
}
const observer = new IntersectionObserver(visibilityChanged, opt)

watch(slicedChars, () => {
  if (sortedResults.value.length <= limit.value || slicedChars.value.length === 100) return
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
  maxTier.value = 13
  if (companionsList.value)
    companionsList.value.scrollTop = 0
}

function clearAndResetWorld() {
  worldName.value = ''
  position.value = 0
  minTier.value = 1
  maxTier.value = 13
  if (companionsList.value)
    companionsList.value.scrollTop = 0
}

function addNewChar() {
  editMode.value = false
  characterToEdit.value = {}
  toggleShowAddCharacter()
}

</script>
