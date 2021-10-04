
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
      <Select v-model="tier" />
      <Input v-model.number="limit" class="w-16" />
      <div>Characters in database - {{ charArr.length }}</div>
    </div>
    <div v-else class="">
      Loading... <span class="inline-block text-xl"><eos-icons:bubble-loading /></span>
    </div>
    <div class="flex flex-wrap flex-grow overflow-y-auto text-gray-200 pb-8">
      <div
        v-for="{ item: char } in filteredCharacters"
        :key="char.uid"
        class="p-1 border rouded w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5  h-2/5 bg-black bg-opacity-20"
        :style="`background-image: url(${char.image})`"
        bg="center no-repeat contain"
        @click="showInfo(char)"
      >
        <h4 class="text-xl bg-opacity-50 bg-black">
          {{ char.name }} (<span class="text-blue-200">{{ char.world[0] }}</span>)
        </h4>
        <!-- <div>World: {{ char.world[0] }}</div>
        <div v-if="char.world.length === 5">
          Type: {{ char.world[1] }}
        </div>
        <div>Tier: {{ char.tier }}</div>
        <div>Cost: {{ char.cost }}</div>-->
        <!-- <mdi-light-alert /> -->
        <!-- <img class="object-cover mx-auto relative" :src="char.image" :alt="char.name" w="full"> -->
      </div>
    </div>
    <aside
      v-if="showSidebar"
      class="absolute h-full w-full md:w-[400px] bg-gray-800 right-0 text-gray-200"
      @click="showSidebar = false"
    >
      <h4 class="text-xl">
        {{ charToShow.name }}
      </h4>
      <div>World: {{ charToShow.world[0] }}</div>
      <div v-if="charToShow.world.length === 5">
        Type: {{ charToShow.world[1] }}
      </div>
      <div>Tier: {{ charToShow.tier }}</div>
      <div>Cost: {{ charToShow.cost }}</div>
      <img
        class="object-cover mx-auto relative"
        :src="charToShow.image"
        :alt="charToShow.name"
        w="full"
      />
    </aside>
  </div>
</template>

<script lang="ts">
import Fuse from 'fuse.js'
// import characters from '~/data/characters.json'

export default defineComponent({
  setup() {
    const search = ref('')
    const limit = ref(10)
    const tier = ref('0')
    const showSidebar = ref(false)
    const charToShow = ref()

    const characters = ref({})
    const loading = ref(true)
    const loadChars = () => import('~/data/characters.json')
    const charArr = ref([] as any[])

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
      if (tier.value === '0') return fuse.value.search(search.value, { limit: limit.value })
      else return charArr.value.filter(char => char.tier === tier.value).slice(0, limit.value).map(x => ({ item: x }))
    })

    function showInfo(char: typeof charArr.value[number]) {
      showSidebar.value = true
      charToShow.value = char
    }

    return {
      search,
      limit,
      tier,
      loading,
      filteredCharacters,
      charToShow,
      showSidebar,
      charArr,
      showInfo,
    }
  },
})
</script>
