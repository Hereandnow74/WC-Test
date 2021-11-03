
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
      <div class="mb-4 flex flex-wrap overflow-y-auto">
        <CompanionCard v-for="char in allUserCharacters" :key="char.name" :char="char" :is-user-char="true" :lazy="false" />
      </div>
    </Foldable>
    <div ref="waifuList" class="flex flex-wrap flex-grow overflow-y-auto pb-8" @edit-companion="editCompanion">
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

// const characters = ref({})
const loading = ref(true)
const loadChars = () => import('~/data/characters.json')
const loadUsersChars = () => import('~/data/userCharacters.json')
const charArr = ref([] as Character[])

const editMode = ref(false)
const characterToEdit = ref({})
const waifuList = ref<HTMLElement|null>(null)

const tierOptions = [
  { name: 'Any', value: 0 },
  { name: '1', value: 1 },
  { name: '2', value: 2 },
  { name: '3', value: 3 },
  { name: '4', value: 4 },
  { name: '5', value: 5 },
  { name: '6', value: 6 },
  { name: '7', value: 7 },
  { name: '8', value: 8 },
  { name: '9', value: 9 },
  { name: '10', value: 10 },
  { name: '11', value: 11 },
]

const { localUserCharacters, userCharacters, startingWorld, params } = useStore()

const options = {
  includeScore: true,
  findAllMatches: true,
  useExtendedSearch: true,
  threshold: 0.1,
  keys: ['n', 'w', 't'],
}

const fuse = new Fuse(charArr.value, options)

onMounted(async() => {
  // characters.value = (await loadChars()).default
  charArr.value.push(...Object.values((await loadUsersChars()).default))
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
  if (isLimited.value)
    sopt = { $and: [{ t: tier.value !== 0 ? `${tier.value}` : '!z' }, { w: startingWorld.value.worldName }, { n: sr }] }
  else
    sopt = { $and: [{ t: tier.value !== 0 ? `${tier.value}` : '!z' }, { $or: [{ n: sr }, { w: sr }] }] }
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
