
<template>
  <div class="flex flex-col sm:p-2">
    <div v-if="!loading" class="flex items-center justify-center flex-wrap gap-x-4 gap-y-1 mb-1 md:mb-2">
      <div class="flex items-center">
        <Input
          v-model="search"
          placeholder="Name or World"
        />
        <clarity:eraser-solid class="icon-btn w-8" @click="search = ''" />
      </div>
      <Select v-model.number="tier" :options="tierOptions" />
      <Input v-model.number="limit" class="px-1" :style="`width: ${(''+limit).length + 3}ch`" />
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
          :class="image==='' ? 'bg-gray-700':''"
          class="hover:bg-gray-700 text-green-300 px-2 rounded-l"
          @click="image=''"
        >
          all
        </div>
        <div
          :class="image==='!cvxz' ? 'bg-gray-700':''"
          class="border-l px-2 hover:bg-gray-700 text-gray-200 rounded-r"
          @click="image='!cvxz'"
        >
          img
        </div>
      </div>
      <Checkbox
        v-if="startingWorld.worldName !== 'Current world'"
        v-model="isLimited"
        :label="`Limit to ${startingWorld.worldName}`"
        class="border rounded px-1 border-gray-300 dark:border-gray-500"
      />
      <div class="hidden md:block">
        Characters in database - {{ charArr.length }}
      </div>
      <Button label="Add Character" size="Small" @click="() => (editMode = false, toggleShowAddCharacter())" />
    </div>
    <div v-else class="">
      Loading... <span class="inline-block text-xl"><eos-icons:bubble-loading /></span>
    </div>
    <Foldable v-if="allUserCharacters.length" class="text-lg mb-2" title="User Characters">
      <div class="mb-4 grid sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 overflow-y-auto text-base">
        <CompanionCard
          v-for="char in allUserCharacters"
          :key="char.uid"
          :char="char"
          :is-user-char="true"
          :lazy="false"
          class="h-[500px]"
          @edit-companion="editCompanion"
        />
      </div>
    </Foldable>
    <div
      ref="waifuList"
      class="grid sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 overflow-y-auto pb-8"
    >
      <CompanionCard
        v-for="{ item: char } in filteredCharacters"
        :key="char.u"
        :char="char"
        class="h-[500px]"
        @edit-companion="editCompanion"
      />
      <div v-if="!filteredCharacters.length" class="text-center flex-grow">
        <p v-if="search !== ''">
          No characters found.
        </p>
      </div>
    </div>
    <AddCharacter v-if="showAddCharacter" :character="characterToEdit" :edit-mode="editMode" @click="toggleShowAddCharacter" />
  </div>
</template>

<script lang="ts" setup>
import Fuse from 'fuse.js'
import { useStore } from '~/store/store'

import { toggleShowAddCharacter, showAddCharacter, lazyLoadImg } from '~/logic'
import CompanionCard from '~/components/CompanionCard.vue'
import Checkbox from '~/components/basic/Checkbox.vue'
import { getChars, getUserChars } from '~/data/constatnts'

interface Character {
  u: number
  n: string
  t: number
  c?: number
  i?: string
  in?: string
  s?: string
  w?: string[]
}

const search = ref(' ')
const limit = ref(10)
const tier = ref(0)
const isLimited = ref(false)

const gender = ref('')
const image = ref('')

// const characters = ref({})
const loading = ref(true)

const charArr = ref([] as Character[])

const editMode = ref(false)
const characterToEdit = ref({})
const waifuList = ref<HTMLElement|null>(null)

const tierOptions = [
  { label: 'Any', value: 0 },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
  { label: '6', value: 6 },
  { label: '7', value: 7 },
  { label: '8', value: 8 },
  { label: '9', value: 9 },
  { label: '10', value: 10 },
  { label: '11', value: 11 },
]

const { localUserCharacters, userCharacters, startingWorld } = useStore()

const options = {
  findAllMatches: true,
  useExtendedSearch: true,
  threshold: 0.4,
  keys: ['n', 'w', 't', 'b', 'i', 'd'],
}

const fuse = new Fuse(charArr.value, options)
const options2 = { useExtendedSearch: true, findAllMatches: true, keys: ['n'], shouldSort: false }
const fuseNoSort = new Fuse(charArr.value, options2)
const params = useUrlSearchParams('history')
const route = useRoute()

onMounted(async() => {
  const userChars = await getUserChars()
  if (userChars[0].b) {
    if (!userChars[0].b.includes('U'))
      userChars.forEach(x => x.b.push('U'))
  }
  else { userChars.forEach(x => x.b = ['U']) }

  charArr.value = Array.prototype.concat(userChars, (await getChars()))
  fuse.setCollection(charArr.value)
  fuseNoSort.setCollection(charArr.value)
  loading.value = false
  if (params.name)
    nextTick(() => search.value = params.name)
  else search.value = ''
})

watch(route, x => search.value = x.query.name || '')

const worldNameDict = {
  'Xenoblade Chronicles 2': '(Monolith) Xeno-',
  'Xenoblade Chronicles 1': '(Monolith) Xeno-',
  'Overlord (LN)': 'Overlord',
  'Avatar: The Last Airbender': 'Avatar',
  'Avatar: Legend of Korra': 'Avatar',
  'Game of Thrones': 'A Song Of Ice And Fire',
  'Monogatari Series': 'Monogatari',
  'Magi Series': 'Magi',
  'Tales Series': 'Tales of',
  'Prisma Illya': 'Nasuverse',
  'Fate/Extra': 'Nasuverse',
  'Precure': 'Pretty Cure',
}

const filteredCharacters = computed(() => {
  const sr = search.value
  const worldName = worldNameDict[startingWorld.value.worldName] || startingWorld.value.worldName
  let sopt: any = {}
  if (isLimited.value) {
    sopt = {
      $and: [
        { t: tier.value !== 0 ? `${tier.value}` : '!z' },
        { n: sr },
        {
          $or: [
            { w: `^${worldName}` }, { d: `^${worldName}` }],
        },
      ],
    }
  }
  else {
    sopt = {
      $and: [
        { t: tier.value !== 0 ? `=${tier.value}` : '!z' },
        {
          $or: [
            { w: sr }, { n: sr }, { d: sr }],
        },
      ],
    }
  }
  if (gender.value) sopt.$and.push({ b: gender.value })
  if (image.value) sopt.$and.push({ i: image.value })

  if (search.value.length === 0)
    return fuseNoSort.search('!^xxx', { limit: limit.value })

  return fuse.search(sopt, { limit: limit.value })
})

watch(filteredCharacters, () => nextTick(() => lazyLoadImg(waifuList.value)))

const allUserCharacters = computed(() => userCharacters.value.concat(localUserCharacters.value))

const handleScroll = () => {
  if (waifuList.value) {
    const element = waifuList.value
    if (element.scrollHeight - element.scrollTop - 50 <= element.clientHeight)
      limit.value += 10
  }
}

onMounted(() => {
  waifuList?.value?.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  waifuList?.value?.removeEventListener('scroll', handleScroll)
})

function editCompanion(char: any) {
  characterToEdit.value = char
  editMode.value = true
  toggleShowAddCharacter()
}
</script>
