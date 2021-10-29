<template>
  <div
    class="py-1 sm:p-1 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 h-[500px] text-gray-200"
  >
    <div class="bg-gray-800 border border-gray-800 h-full flex flex-col rounded">
      <div class="flex-grow relative">
        <img ref="companionEl" class="rounded absolute object-cover h-full w-full object-top" :data-src="charData.image || 'img/placeholder.jpg'" :alt="charData.name">
        <icon-park-outline:full-screen-one
          class="absolute top-1 right-1 hover:text-blue-400 cursor-pointer mix-blend-difference"
          @click="() => (showModal = true, modalImage=charData.image)"
        />
      </div>
      <div class="py-2 h-max">
        <h4 class="text-xl justify-center flex items-center px-1">
          <span>{{ charData.name }} (<span class="text-blue-200">{{ charData.world }}</span>)</span>
          <div class="flex items-center ml-auto">
            <a
              v-if="charData.sourceImage"
              class="block h-6"
              :href="charData.sourceImage"
              target="_blank"
              rel="noopener noreferrer"
              title="Source"
            >
              <eva:external-link-fill class="hover:text-blue-600 cursor-pointer" />
            </a>
            <bx:bxs-edit class="hover:text-yellow-600 cursor-pointer" @click="$emit('editCompanion', charData)" />
            <fluent:delete-20-filled v-if="isUserChar" class="hover:text-red-500 ml-2 cursor-pointer" @click="deleteCharacter" />
          </div>
        </h4>
        <div class="flex justify-between px-4">
          <div class="text-gray-400">
            Tier: <span class="text-amber-300">{{ (charData.tier) }}</span>
          </div>
          <div class="text-gray-400">
            Cost: <span class="text-amber-300">{{ charData.tier === 11 ? 'Tier 11 ticket' : CHAR_COSTS[charData.tier - 1] }}</span>
            <span
              v-if="flags.noBindings && (charData.tier) !== 11 && (charData.tier) !== 1"
              title="Discount from No Binding"
            >({{ CHAR_COSTS[(charData.tier) - 2] }})</span>
          </div>
        </div>
        <div class="flex justify-center gap-4">
          <template v-if="!isAlredyBought(charData.uid)">
            <Button size="Small" bg-color="bg-red-500" label="buy" @click="buyCompanion" />
            <Button size="Small" bg-color="bg-orange-500" label="yoink" @click="yoinkCompanion" />
            <Button v-if="charData.tier !== 11" size="Small" bg-color="bg-violet-600" label="used" @click="usedModal = true" />
            <Button size="Small" label="capture" @click="captureCompanion" />
          </template>
          <Button v-else size="Small" label="undo" @click="undoBuying(charData.uid)" />
        </div>
      </div>
    </div>
    <div v-if="showModal" class="absolute inset-0 bg-black bg-opacity-10 flex place-content-center" @click="showModal = false">
      <div class="overflow-auto max-h-screen max-w-screen flex place-content-center">
        <img class="object-none" :src="modalImage" alt="full image">
      </div>
    </div>
    <teleport to="#app">
      <SlightlyUsed v-if="usedModal" :char="charData" @click="usedModal = false" @buyUsed="slightlyCompanion" />
    </teleport>
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
  lazy: {
    type: Boolean,
    default: true,
  },
})

const modalImage = ref('')
const showModal = ref(false)
const usedModal = ref(false)
const companionEl = ref<HTMLImageElement| null>(null)
const charData = props.char.t ? { uid: props.char.u, name: props.char.n, world: props.char.w, tier: props.char.t, image: props.char.i, sourceImage: props.char.s } : props.char

const { flags, companions, localUserCharacters } = useStore()

const priceTier = (t: number): number => flags.value.noBindings && t !== 11 && t !== 1 ? t - 1 : t

function buyCompanion() {
  const char = charData
  companions.value.push({ uid: char.uid, name: char.name, world: char.world, tier: char.tier, priceTier: priceTier(char.tier), method: 'buy' })
}

function captureCompanion() {
  const char = charData
  companions.value.push({ uid: char.uid, name: char.name, world: char.world, tier: char.tier, priceTier: priceTier(char.tier), method: 'capture' })
}

function yoinkCompanion() {
  const char = charData
  companions.value.push({ uid: char.uid, name: char.name, world: char.world, tier: char.tier, priceTier: priceTier(char.tier), method: 'yoink' })
}

function slightlyCompanion(slightlyUsedData: any) {
  const char = charData
  const tier = charData.tier + slightlyUsedData.tier
  const pt = priceTier(charData.tier + slightlyUsedData.tier - slightlyUsedData.traumaTier)
  companions.value.push({ uid: char.uid, name: char.name, world: char.world, tier, priceTier: pt, method: 'used' })
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

onMounted(() => {
  if (!props.lazy && companionEl.value)
    companionEl.value.src = companionEl.value?.dataset.src || 'img/placeholder.jpg'
})

</script>
