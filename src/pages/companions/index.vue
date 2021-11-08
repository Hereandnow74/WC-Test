
<template>
  <div class="flex flex-col sm:p-2">
    <h3 class="text-xl">
      Choose your companions
    </h3>
    <div v-if="!loading" class="flex items-center flex-wrap gap-4 my-2">
      <Input
        v-model="search"
        label="Search"
        placeholder="Name or World"
      />
      <clarity:eraser-solid class="icon-btn w-8" @click="search = ''" />
      <Select v-model.number="tier" :options="tierOptions" />
      <Input v-model.number="limit" class="px-1" :style="`width: ${(''+limit).length + 3}ch`" />
      <div class="flex rounded bg-gray-600 cursor-pointer">
        <div
          :class="gender==='F' ? 'bg-gray-700':''"
          class="hover:bg-gray-700 text-pink-300 px-2 rounded-l"
          @click="gender='F'"
        >
          F
        </div>
        <div
          :class="gender==='M' ? 'bg-gray-700':''"
          class="border-l border-r px-2 hover:bg-gray-700 text-blue-400"
          @click="gender='M'"
        >
          M
        </div>
        <div
          :class="gender==='' ? 'bg-gray-700':''"
          class="hover:bg-gray-700 px-2 text-gray-200 rounded-r"
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
          :class="image==='^h' ? 'bg-gray-700':''"
          class="border-l px-2 hover:bg-gray-700 text-gray-200 rounded-r"
          @click="image='^h'"
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
      <Button label="Add Character" @click="() => (editMode = false, toggleShowAddCharacter())" />
    </div>
    <div v-else class="">
      Loading... <span class="inline-block text-xl"><eos-icons:bubble-loading /></span>
    </div>
    <Foldable v-if="allUserCharacters.length" class="text-lg mb-2" title="User Characters">
      <div class="mb-4 flex flex-wrap overflow-y-auto text-base">
        <CompanionCard
          v-for="char in allUserCharacters"
          :key="char.name"
          :char="char"
          :is-user-char="true"
          :lazy="false"
          @edit-companion="editCompanion"
        />
      </div>
    </Foldable>
    <div ref="waifuList" class="flex flex-wrap flex-grow overflow-y-auto pb-8">
      <CompanionCard
        v-for="{ item: char } in filteredCharacters"
        :key="char.u"
        :char="char"
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
const loadChars = () => import('~/data/characters.json')
const loadUsersChars = () => import('~/data/userCharacters.json')
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

const { localUserCharacters, userCharacters, startingWorld, params } = useStore()

const options = {
  includeScore: true,
  findAllMatches: true,
  useExtendedSearch: true,
  threshold: 0.4,
  keys: ['n', 'w', 't', 'b', 'i'],
}

const fuse = new Fuse(charArr.value, options)

onMounted(async() => {
  // characters.value = (await loadChars()).default
  charArr.value.push(...Object.values((await loadUsersChars()).default).map(x => ((x.b ? x.b.push('U') : x.b = ['U']), x)))
  charArr.value.push(...Object.values((await loadChars()).default))
  fuse.setCollection(charArr.value)
  loading.value = false
  if (params.name)
    search.value = params.name
  else
    search.value = ''
})

const filteredCharacters = computed(() => {
  const sr = search.value || '!^xcv'
  let sopt: any = {}
  if (isLimited.value) {
    sopt = {
      $and: [
        { t: tier.value !== 0 ? `${tier.value}` : '!z' },
        { n: sr },
        { w: startingWorld.value.worldName },
      ],
    }
  }
  else {
    sopt = {
      $and: [
        { t: tier.value !== 0 ? `${tier.value}` : '!z' },
        {
          $or: [
            { w: sr }, { n: sr }],
        },
      ],
    }
  }
  if (gender.value) sopt.$and.push({ b: gender.value })
  if (image.value) sopt.$and.push({ i: image.value })
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
