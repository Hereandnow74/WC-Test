
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
            :class="image==='' && nsfw==='' ? 'bg-gray-700':''"
            class="hover:bg-gray-700 text-green-300 px-2 rounded-l"
            @click="(image='', nsfw='', favorite=false)"
          >
            all
          </div>
          <div
            :class="image==='!cvxz' ? 'bg-gray-700':''"
            class="border-l px-2 hover:bg-gray-700 text-gray-200 rounded-r"
            title="Have Image"
            @click="image === ''? image='!cvxz' : image=''"
          >
            img
          </div>
          <div
            :class="nsfw==='!cvxz' ? 'bg-gray-700':''"
            class="border-l px-2 hover:bg-gray-700 text-gray-200 rounded-r"
            title="Have NSFW Image"
            @click="nsfw === ''? nsfw='!cvxz' : nsfw=''"
          >
            nsfw
          </div>
          <div
            :class="favorite ? 'bg-red-600':''"
            class="border-l px-2 hover:bg-gray-700 text-gray-200 rounded-r"
            title="Favorites"
            @click="() => favorite = !favorite"
          >
            fav
          </div>
          <div
            :class="retinue ? 'bg-green-600':''"
            class="border-l px-2 hover:bg-gray-700 text-gray-200 rounded-r"
            title="Retinue"
            @click="() => retinue = !retinue"
          >
            ret
          </div>
        </div>
        <bi:gear-fill class="icon-btn" @click="toggleSearchSetting" />
        <div class="hidden md:block">
          {{ secondFilter.length }} results
        </div>
        <Button label="Add Character" size="Small" @click="() => (editMode = false, toggleShowAddCharacter())" />
      </div>
      <div v-else class="">
        Loading... <span class="inline-block text-xl"><eos-icons:bubble-loading /></span>
      </div>
      <div class="flex gap-4 justify-center pt-1">
        <div v-if="tagsInclude.length" class="flex gap-1">
          Include:
          <div
            v-for="tag in tagsInclude"
            :key="tag"
            class="rounded-md cursor-pointer select-none px-1 hover:bg-red-500 whitespace-nowrap"
            :class="waifuTags[tag] ? waifuTags[tag].color : 'text-black bg-teal-500'"
            @click="tagToggles[tag] = 0"
          >
            {{ waifuTags[tag] ? waifuTags[tag].tag : tag }}
          </div>
        </div>
        <div v-if="tagsExclude.length" class="flex gap-1">
          Exclude:
          <div
            v-for="tag in tagsExclude"
            :key="tag"
            class="rounded-md cursor-pointer select-none px-1 hover:bg-red-500 whitespace-nowrap"
            :class="waifuTags[tag].color"
            @click="tagToggles[tag] = 0"
          >
            {{ waifuTags[tag].tag }}
          </div>
        </div>
      </div>
    </div>
    <div ref="companionsList" class="overflow-y-auto w-full relative">
      <Foldable v-if="allUserCharacters.length" ref="userWaifuList" :is-open="userCharactersShown" class="text-lg mb-2" title="User Characters">
        <div
          class="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
          4xl:grid-cols-6 5xl:grid-cols-7 gap-1 text-base"
        >
          <CompanionCard
            v-for="char in allUserCharacters"
            :key="char.uid"
            :char="char"
            :is-user-char="true"
            :with-image="!settings.allImg"
            :class="!settings.allImg ? 'h-[500px]' : 'pt-[32px]'"
            @edit-companion="editCompanion"
          />
        </div>
      </Foldable>
      <div
        ref="waifuList"
        class="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
          4xl:grid-cols-6 5xl:grid-cols-7 gap-1 pb-8"
        :style="`top: ${topPosition}px`"
      >
        <CompanionCard
          v-for="{ item: char } in slicedChars"
          :key="char.u"
          :char="char"
          :with-image="!settings.allImg"
          :class="!settings.allImg ? 'h-[500px]' : 'pt-[32px]'"
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
import { intersection, some } from 'lodash-es'
import { useStore } from '~/store/store'

import { toggleShowAddCharacter, showAddCharacter, toggleShowFilterTags, showFilterTags, tagToggles, userCharactersShown, threeToggle, toggleShowReport, showReport, showSearchSettings, toggleSearchSetting } from '~/logic'
import { getChars, getUserChars, waifuTags } from '~/data/constants'
import { usePlayStore } from '~/store/play'
import { useSearchSettings } from '~/logic/searchSettings'

interface Character {
  u: number
  n: string
  t: number
  i?: string
  in?: string
  s?: string
  w?: string
  d?: string
  b?: string[]
}

const { localUserCharacters, userCharacters, startingWorld, favorites, settings, companionsUIDs } = useStore()
const { jumpChain } = usePlayStore()
const { minTier, maxTier, worldName, blockedWorlds } = useSearchSettings()

const search = ref(' ')
const position = ref(0)

const gender = ref('')
const image = ref('')
const nsfw = ref('')
const favorite = ref(false)
const retinue = ref(false)

const sortAlpha = ref(0)
const sortRating = ref(0)

// const characters = ref({})
const loading = ref(true)

const charArr = ref([] as Character[])

const editMode = ref(false)
const characterToEdit = ref({})
const waifuList = ref<HTMLElement|null>(null)
const userWaifuList = ref<HTMLElement|null>(null)
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

const cardRowCount = (() => {
  const wd = document.body.clientWidth || 0
  if (wd >= 2300) return 7
  if (wd >= 2000) return 6
  if (wd >= 1280) return 5
  if (wd >= 1024) return 4
  if (wd >= 768) return 3
  if (wd >= 640) return 2
  return 1
})()

const cardColumnCount = computed(() => {
  if (companionsList.value) {
    const wd = (document.body.clientHeight - companionsList.value?.offsetTop) || 0
    return Math.floor(wd / (settings.value.allImg ? 180 : 504)) + (settings.value.allImg ? 6 : 4)
  }
  return 5
})

const limit = computed(() => {
  return cardRowCount * cardColumnCount.value
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

const fuse = new Fuse(charArr.value, options)
const fuseNoSort = new Fuse(charArr.value, options2)

const params = useUrlSearchParams('history')
const route = useRoute()

onMounted(async() => {
  const userChars = await getUserChars()
  userChars.forEach((x) => {
    if (x.b) {
      if (!x.b.includes('U'))
        x.b.push('U')
    }
    else { x.b = ['U'] }
  })
  const oldChars = await getChars()
  charArr.value = Array.prototype.concat(userChars, oldChars)

  fuse.setCollection(charArr.value)
  fuseNoSort.setCollection(charArr.value)
  loading.value = false
  if (params.name)
    nextTick(() => search.value = params.name as string)
  else search.value = ''
})

watch(route, x => search.value = x.query.name as string || '')

type tagKeys = keyof typeof waifuTags
const tagsInclude = computed(() => Object.keys(tagToggles).filter(key => tagToggles[key] === 1) as tagKeys[])
const tagsExclude = computed(() => Object.keys(tagToggles).filter(key => tagToggles[key] === -1) as tagKeys[])

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
      sopt.$and.push({ k: sr.slice(1) })
      break
    // Search by name
    case sr.startsWith('#'):
      sopt.$and.push({ n: sr.slice(1) })
      break
    // Search by world
    case sr.startsWith('%'):
      sopt.$and.push({ w: sr.slice(1) })
      break
    // Search by subworld
    case sr.startsWith('$'):
      sopt.$and.push({ d: sr.slice(1) })
      break
    // Search by name with locked world
    case !!worldName.value:
      sopt.$and.push(
        { n: sr },
        {
          $or: [
            { w: `^"${worldName.value}"` }, { d: `^"${worldName.value}"` },
          ],
        },
      )
      break
    // Search by World or Name or Subworld
    // case !worldName.value:
    //   sopt.$and.push(
    //     {
    //       $or: [
    //         { w: sr }, { n: sr }, { d: sr }],
    //     },
    //   )
    //   break
  }
  if (gender.value) sopt.$and.push({ b: `=${gender.value}` })

  if (image.value) sopt.$and.push({ i: image.value })
  if (nsfw.value) sopt.$and.push({ in: nsfw.value })
  if (favorite.value) sopt.$and.push({ u: `=${favorites.value.join('|=')}` })
  if (retinue.value) sopt.$and.push({ u: `=${Object.keys(companionsUIDs.value).join('|=')}` })

  if (search.value.length === 0)
    return fuseNoSort.search(sopt)
  return fuse.search(sopt)
})

const secondFilter = computed(() => {
  return filteredCharacters.value.filter((x) => {
    return intersection(x.item.b, tagsInclude.value).length === tagsInclude.value.length
        && !some(x.item.b, x => tagsExclude.value.includes(x))
        && x.item.t >= minTier.value && x.item.t <= maxTier.value
        && !blockedWorlds.value.includes(x.item.w)
  })
})

const sortingFunc = (a: any, b: any) => (sortRating.value !== 0 ? (a.item.t - b.item.t) * sortRating.value : 0) || (sortAlpha.value !== 0 ? a.item.n.localeCompare(b.item.n) * sortAlpha.value : 0)

const sortedResults = computed(() => {
  return (sortRating.value || sortAlpha.value) ? [...secondFilter.value].sort(sortingFunc) : secondFilter.value
})

const slicedChars = computed(() => {
  // const groupped = groupBy(filteredCharacters.value, (n) => { return n.item.u })
  // const result = uniq(flatten(filter(groupped, (n) => { return n.length > 1 })))
  // return result.slice(limit.value > 100 ? limit.value - 100 : 0, limit.value)
  return sortedResults.value.slice(position.value, position.value + limit.value)
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
    position.value += cardRowCount
    return
  }

  if (entry.target.id === 'first' && entry.isIntersecting && position.value >= cardRowCount)
    position.value -= cardRowCount
}

const topPosition = computed(() => position.value / cardRowCount * ((firstCard.value?.clientHeight || 0) || 500))

const allUserCharacters = computed(() => userCharacters.value.concat(localUserCharacters.value).filter(x => worldName.value ? x.world === worldName.value : true))

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
