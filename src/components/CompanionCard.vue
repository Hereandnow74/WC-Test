<template>
  <div
    class="py-1 w-full text-gray-200"
  >
    <div class="bg-gray-800 border border-gray-800 h-full flex flex-col rounded">
      <div ref="cardEl" class="flex-grow relative">
        <img
          ref="companionEl"
          class="rounded absolute object-cover h-full w-full object-top"
          :data-src="imageLink"
          :alt="charData.name"
        >
        <icon-park-outline:full-screen-one
          class="absolute top-1 right-1 hover:text-blue-400 cursor-pointer mix-blend-difference"
          @click="() => (showModal = true, modalImage=(nsfw ? charData.image_nsfw : imageLink))"
        />
        <span
          v-if="charData.image_nsfw"
          class="absolute top-1 right-8 hover:text-blue-400 cursor-pointer mix-blend-difference"
          @click="nsfw = !nsfw"
        >{{ nsfw ? 'NSFW' : 'SFW' }}</span>
        <div
          class="absolute bottom-0 py-1 w-full flex justify-center gap-4 transition-opacity duration-500 opacity-0 bg-black bg-opacity-25"
          :class="{'opacity-100': inFocus}"
        >
          <template v-if="!isAlredyBought(charData.uid)">
            <Button size="Small" bg-color="bg-red-500" label="buy" @click="buyCompanion" />
            <Button size="Small" bg-color="bg-orange-500" label="yoink" @click="yoinkCompanion" />
            <Button v-if="charData.tier !== 11" size="Small" bg-color="bg-violet-600" label="used" @click="usedModal = true" />
            <Button size="Small" label="capture" @click="captureCompanion" />
          </template>
          <Button v-else size="Small" label="undo" @click="undoBuying(charData.uid)" />
        </div>
      </div>
      <div class="py-2 h-max">
        <h4 class="justify-center flex items-center px-1" :class="fontSize">
          <span>{{ charData.name }} (<span class="text-blue-200">{{ charData.world }}</span>)</span>
          <div v-if="showTiers" class="flex items-center ml-auto">
            <a
              v-if="charData.sourceImage"
              class="flex items-center"
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
        <div v-if="charData.nickname" class="ml-2 mb-1 text-xs text-gray-400 leading-none">
          by @{{ charData.nickname }}
        </div>
        <div v-if="showTiers" class="flex justify-between px-4">
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
        <div v-if="showTags" class="flex gap-1 justify-center">
          <span
            v-for="tag in charData.tags"
            :key="tag"
            class="px-1 rounded-md"
            :class="tagColors[tag]"
          >{{ tagNames[tag] }}</span>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="absolute inset-0 bg-black bg-opacity-10 flex place-content-center z-20" @click="showModal = false">
      <div class="overflow-auto h-screen w-max flex place-content-center items-center">
        <img class="object-contain max-h-screen" :src="modalImageCmp" alt="full image">
      </div>
    </div>
    <teleport to="#app">
      <SlightlyUsed v-if="usedModal" :char="charData" class="z-20" @click="usedModal = false" @buyUsed="slightlyCompanion" />
    </teleport>
  </div>
</template>

<script lang='ts' setup>
import { findIndex, random } from 'lodash-es'
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
  showTiers: {
    type: Boolean,
    default: true,
  },
  showTags: {
    type: Boolean,
    default: true,
  },
  fontSize: {
    type: String,
    default: 'text-lg',
  },
})

const modalImage = ref('')
const showModal = ref(false)
const usedModal = ref(false)
const nsfw = ref(false)

const cardEl = ref<HTMLImageElement| null>(null)
const companionEl = ref<HTMLImageElement| null>(null)
const inFocus = useElementHover(cardEl)

const charData = computed(() => {
  const res = props.char.t
    ? {
      uid: props.char.u,
      name: props.char.n,
      world: props.char.w,
      tier: props.char.t,
      image: props.char.i,
      image_nsfw: props.char.in,
      sourceImage: props.char.s,
      tags: props.char.b,
      nickname: props.char.k,
    }
    : props.char
  if (!res.uid) res.uid = random(10000000, 99999999)
  return res
})

const tagNames = { F: 'Female', M: 'Male', O: 'Other', C: 'Canon', U: 'By User' }
const tagColors = { F: 'bg-pink-500', M: 'bg-blue-500', C: 'bg-yellow-400', O: 'bg-fuchsia-700', U: 'bg-warm-gray-600' }

const { flags, companions, localUserCharacters } = useStore()

const modalImageCmp = computed(() => {
  if (modalImage.value.includes('imgur') && modalImage.value.split('.').slice(-2, -1)[0].slice(-1) === 'm') {
    const pcs = modalImage.value.split('m')
    const lastPc = pcs.pop()
    return pcs.join('m') + lastPc
  }

  return modalImage.value
})

const imageLink = computed(() => {
  if (charData.value.image) {
    if (charData.value.image.startsWith('http')) { return charData.value.image }
    else {
      if (charData.value?.tags?.includes('U'))
        return `https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/${charData.value.image}`
      return `https://cdn.statically.io/gh/klassekatze/waifucatimg/master/imagecache_thumb/${charData.value.image}`
    }
  }
  else {
    return '/img/placeholder.jpg'
  }
},
)

const priceTier = (t: number): number => flags.value.noBindings && t !== 11 && t !== 1 ? t - 1 : t

watch(nsfw, () => companionEl.value.src = nsfw.value ? charData.value.image_nsfw : imageLink.value)

function buyCompanion() {
  const char = charData.value
  companions.value.push({ uid: char.uid, name: char.name, world: char.world, tier: char.tier, priceTier: priceTier(char.tier), method: 'buy' })
}

function captureCompanion() {
  const char = charData.value
  companions.value.push({ uid: char.uid, name: char.name, world: char.world, tier: char.tier, priceTier: priceTier(char.tier), method: 'capture' })
}

function yoinkCompanion() {
  const char = charData.value
  companions.value.push({ uid: char.uid, name: char.name, world: char.world, tier: char.tier, priceTier: priceTier(char.tier), method: 'yoink' })
}

function slightlyCompanion(slightlyUsedData: any) {
  const char = charData.value
  const tier = charData.value.tier + slightlyUsedData.tier
  const pt = priceTier(charData.value.tier + slightlyUsedData.tier - slightlyUsedData.traumaTier)
  companions.value.push({ uid: char.uid, name: char.name, world: char.world, tier, priceTier: pt, method: 'used' })
}

function undoBuying(uid: number) {
  companions.value.splice(findIndex(companions.value, { uid }), 1)
}

function isAlredyBought(uid: number): boolean {
  return findIndex(companions.value, { uid }) > -1
}

function deleteCharacter() {
  const ind = findIndex(localUserCharacters.value, { uid: charData.value.uid })
  if (ind !== -1)
    localUserCharacters.value.splice(ind, 1)
}

onMounted(() => {
  if (!props.lazy && companionEl.value)
    companionEl.value.src = imageLink.value
})

watch(imageLink, () => companionEl.value ? companionEl.value.src = imageLink.value : null)

</script>
