
<template>
  <div class="flex flex-col sm:p-2">
    <h3 class="text-xl">
      Choose your companions
    </h3>
    <div v-if="!loading" class="flex items-center gap-4 my-2">
      <Input
        v-model="search"
        label="Search"
        placeholder="Name or World"
      />
      <clarity:eraser-solid class="icon-btn w-8" @click="search = ''" />
      <Select v-model.number="tier" :options="tierOptions" />
      <Input v-model.number="limit" class="w-16" />
      <div class="hidden md:block">
        Characters in database - {{ charArr.length }}
      </div>
    </div>
    <div v-else class="">
      Loading... <span class="inline-block text-xl"><eos-icons:bubble-loading /></span>
    </div>
    <Foldable v-if="allUserCharacters.length" class="text-lg mb-2" title="User Characters">
      <div class="mb-4 flex flex-wrap overflow-y-auto">
        <CompanionCard v-for="char in allUserCharacters" :key="char.name" :char="char" :is-user-char="true" />
      </div>
    </Foldable>
    <div class="flex flex-wrap flex-grow overflow-y-auto pb-8">
      <CompanionCard
        v-for="{ item: char } in filteredCharacters"
        :key="char.uid"
        :char="char"
      />
      <div v-if="!filteredCharacters.length" class="text-center flex-grow">
        <p>No characters found.</p>
        <Button label="Add Character" @click="() => (editMode = false, toggleShowAddCharacter())" />
      </div>
    </div>
    <AddCharacter v-if="showAddCharacter" :world="characterToEdit" :edit-mode="editMode" @click="toggleShowAddCharacter" />
  </div>
</template>

<script lang="ts" setup>
import Fuse from 'fuse.js'
import { useStore } from '~/store/store'

import { toggleShowAddCharacter, showAddCharacter } from '~/logic'
import CompanionCard from '~/components/CompanionCard.vue'

interface Character {
  uid: number
  name: string
  tier: number
  cost: number
  image: string
  sourceImage: string
  world: string[]
}

const search = ref('')
const limit = ref(10)
const tier = ref(0)

const characters = ref({})
const loading = ref(true)
const loadChars = () => import('~/data/characters.json')
const charArr = ref([] as Character[])

const editMode = ref(false)
const characterToEdit = ref({})

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

const { localUserCharacters, userCharacters } = useStore()

onMounted(async() => {
  characters.value = (await loadChars()).default
  charArr.value = Object.values(characters.value)
  loading.value = false
})

const options = {
  includeScore: true,
  findAllMatches: true,
  threshold: 0.1,
  keys: ['name', 'world'],
}

// const charArr = computed(() => Object.values(characters))
const fuse = computed(() => new Fuse(charArr.value, options))

const filteredCharacters = computed(() => {
  if (tier.value === 0) return fuse.value.search(search.value, { limit: limit.value })
  else return charArr.value.filter(char => char.tier === tier.value).slice(0, limit.value).map(x => ({ item: x }))
})

const allUserCharacters = computed(() => userCharacters.value.concat(localUserCharacters.value))

</script>
