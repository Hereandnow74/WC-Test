
<template>
  <div class="flex flex-col p-2">
    <h3 class="text-xl">
      Choose your companions
    </h3>
    <div v-if="!loading" class="flex gap-4 my-2">
      <Input
        v-model="search"
        label="Search"
        placeholder="Name or World"
      />
      <Select v-model.number="tier" />
      <Input v-model.number="limit" class="w-16" />
      <div class="hidden md:block">
        Characters in database - {{ charArr.length }}
      </div>
    </div>
    <div v-else class="">
      Loading... <span class="inline-block text-xl"><eos-icons:bubble-loading /></span>
    </div>
    <div class="flex flex-wrap flex-grow overflow-y-auto text-gray-200 pb-8">
      <div
        v-for="{ item: char } in filteredCharacters"
        :key="char.uid"
        class="py-1 md:p-1 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 h-[500px]"
      >
        <div class="bg-gray-800 h-full flex flex-col rounded">
          <div class="flex-grow relative">
            <img class="rounded absolute object-cover h-full w-full object-top" :src="char.image" :alt="char.name">
            <icon-park-outline:full-screen-one
              class="absolute top-1 right-1 hover:text-blue-400 cursor-pointer mix-blend-difference"
              @click="() => (showModal = true, modalImage=char.image)"
            />
          </div>
          <div class="py-2 h-max">
            <h4 class="text-xl text-center ">
              {{ char.name }} (<span class="text-blue-200">{{ char.world[0] }}</span>)
            </h4>
            <div class="flex justify-between px-4">
              <div class="text-gray-400">
                Tier: <span class="text-amber-300">{{ char.tier }}</span>
              </div>
              <div class="text-gray-400">
                Cost: <span class="text-amber-300">{{ char.cost }}</span>
                <span v-if="flags.noBindings" title="Discount from No Binding">({{ CHAR_COSTS[char.tier - 2] }})</span>
              </div>
            </div>
            <div class="flex justify-center gap-4">
              <Button v-if="!isAlredyBought(char.uid)" size="Small" label="buy" @click="buyCompanion(char)" />
              <Button v-else size="Small" label="undo" @click="undoBuying(char.uid)" />
              <a v-if="char.sourceImage" class="px-1 rounded bg-blue-600" :href="char.sourceImage" target="_blank" rel="noopener noreferrer">Image Source</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="absolute inset-0 bg-black bg-opacity-10 flex place-content-center" @click="showModal = false">
      <div class="overflow-auto max-h-screen max-w-screen flex place-content-center">
        <img class="object-none" :src="modalImage" alt="full image">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Fuse from 'fuse.js'
import { findIndex } from 'lodash'
import { useStore } from '~/store/store'
import { CHAR_COSTS } from '~/data/constatnts'

interface Character {
  uid: number
  name: string
  tier: number
  cost: number
  image: string
  sourceImage: string
  world: string[]
}

export default defineComponent({
  setup() {
    const search = ref('')
    const limit = ref(10)
    const tier = ref(0)
    const modalImage = ref('')
    const showModal = ref(false)

    const characters = ref({})
    const loading = ref(true)
    const loadChars = () => import('~/data/characters.json')
    const charArr = ref([] as Character[])

    const { flags, companions } = useStore()

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

    function buyCompanion(char: Character) {
      companions.value.push({ uid: char.uid, name: char.name, world: char.world[0], tier: char.tier })
    }

    function undoBuying(uid: number) {
      companions.value.splice(findIndex(companions.value, { uid }), 1)
    }

    function isAlredyBought(uid: number): boolean {
      return findIndex(companions.value, { uid }) > -1
    }

    return {
      CHAR_COSTS,
      search,
      limit,
      tier,
      loading,
      filteredCharacters,
      charArr,
      buyCompanion,
      undoBuying,
      isAlredyBought,
      flags,
      modalImage,
      showModal,
    }
  },
})
</script>
