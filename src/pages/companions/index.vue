
<template>
  <div class="flex flex-col">
    <h3 class="text-xl">
      Choose your companions
    </h3>
    <div class="flex gap-4 my-2">
      <Input
        v-model="search"
        label="Search"
        placeholder="Name or World"
      />
      <Input v-model.number="limit" />
    </div>
    <div class="flex flex-wrap flex-grow overflow-y-auto">
      <div
        v-for="{ item: char } in filteredCharacters"
        :key="char.uid"
        class="p-1 border rouded w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5  h-2/5"
        :style="`background-image: url(${char.image2})`"
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
      class="absolute h-full w-full md:w-[400px] bg-gray-800 right-0"
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
      <mdi-light-alert />
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
import characters from '~/data/characters.json'

export default defineComponent({
  setup() {
    const router = useRouter()
    // const chars = Object.values(characters).slice(0, 30)
    const search = ref('')
    const limit = ref(10)
    const showSidebar = ref(false)
    const charToShow = ref()

    const options = {
      includeScore: true,
      findAllMatches: true,
      threshold: 0.1,
      keys: ['name', 'world'],
    }

    const charArr = Object.values(characters)
    const fuse = new Fuse(charArr, options)

    const filteredCharacters = computed(() => {
      return fuse.search(search.value, { limit: limit.value })
      // return Object.values(characters).filter(char => char.sourceImage).slice(0, 30)
    })

    function showInfo(char: typeof charArr[number]) {
      showSidebar.value = true
      charToShow.value = char
    }

    return {
      search,
      limit,
      router,
      filteredCharacters,
      charToShow,
      showSidebar,
      showInfo,
    }
  },
})
</script>
