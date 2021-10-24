<template>
  <div
    class="py-1 sm:p-1 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 h-[500px] text-gray-200"
  >
    <div class="bg-gray-800 border border-gray-800 h-full flex flex-col rounded">
      <div class="flex-grow relative">
        <img class="rounded absolute object-cover h-full w-full object-top" :data-src="char.image" :alt="char.name">
        <icon-park-outline:full-screen-one
          class="absolute top-1 right-1 hover:text-blue-400 cursor-pointer mix-blend-difference"
          @click="() => (showModal = true, modalImage=char.image)"
        />
      </div>
      <div class="py-2 h-max">
        <h4 class="text-xl justify-center flex items-center px-1">
          <span>{{ char.name }} (<span class="text-blue-200">{{ char.world }}</span>)</span>
          <fluent:delete-20-filled v-if="isUserChar" class="hover:text-red-500 ml-2 cursor-pointer" @click="deleteCharacter" />
        </h4>
        <div class="flex justify-between px-4">
          <div class="text-gray-400">
            Tier: <span class="text-amber-300">{{ char.tier }}</span>
          </div>
          <div class="text-gray-400">
            Cost: <span class="text-amber-300">{{ CHAR_COSTS[char.tier - 1] }}</span>
            <span
              v-if="flags.noBindings && char.tier !== 11 && char.tier !== 1"
              title="Discount from No Binding"
            >({{ CHAR_COSTS[char.tier - 2] }})</span>
          </div>
        </div>
        <div class="flex justify-center gap-4">
          <template v-if="!isAlredyBought(char.uid)">
            <Button size="Small" label="buy" @click="buyCompanion(char)" />
            <Button size="Small" label="capture" @click="captureCompanion(char)" />
          </template>
          <Button v-else size="Small" label="undo" @click="undoBuying(char.uid)" />
          <a v-if="char.sourceImage" class="px-1 rounded bg-blue-600" :href="char.sourceImage" target="_blank" rel="noopener noreferrer">Image Source</a>
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

<script lang='ts' setup>
import { findIndex } from 'lodash-es'
import { CHAR_COSTS } from '~/data/constatnts'
import { useStore } from '~/store/store'

const props = defineProps({
  char: {
    type: Object,
    default: () => ({}),
  },
  isUserChar: {
    type: Boolean,
    default: false,
  },
})

const modalImage = ref('')
const showModal = ref(false)

const { flags, companions, localUserCharacters } = useStore()

function buyCompanion(char: any) {
  companions.value.push({ uid: char.uid, name: char.name, world: char.world, tier: char.tier, method: 'buy' })
}

function captureCompanion(char: any) {
  companions.value.push({ uid: char.uid, name: char.name, world: char.world, tier: char.tier, method: 'capture' })
}

function undoBuying(uid: number) {
  companions.value.splice(findIndex(companions.value, { uid }), 1)
}

function isAlredyBought(uid: number): boolean {
  return findIndex(companions.value, { uid }) > -1
}

function deleteCharacter() {
  const ind = findIndex(localUserCharacters.value, { name: props.char.name })
  if (ind !== -1)
    localUserCharacters.value.splice(ind, 1)
}

</script>
