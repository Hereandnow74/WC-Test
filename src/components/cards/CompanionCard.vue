<template>
  <div
    class="py-1 w-full text-gray-200 bg-warm-gray-700 rounded"
  >
    <div class="border border-gray-800 h-full flex flex-col" :class="[isUserChar ? 'bg-warm-gray-800': 'bg-gray-800']">
      <div ref="cardEl" class="relative flex-grow">
        <img
          v-if="withImage"
          ref="companionEl"
          class="rounded absolute object-cover h-full w-full object-top"
          :data-src="imageLink"
          :alt="charData.name"
        >
        <div v-else class="h-16"></div>
        <icon-park-outline:full-screen-one
          class="absolute top-1 right-1 hover:text-blue-400 cursor-pointer mix-blend-difference"
          @click="() => (showModal = true, modalImage=(nsfw ? charData.image_nsfw || imageLink : charData.sourceImage || imageLink))"
        />
        <span
          v-if="charData.image_nsfw"
          class="absolute top-1 right-8 hover:text-blue-400 cursor-pointer mix-blend-difference"
          @click="nsfw = !nsfw"
        >{{ nsfw ? 'NSFW' : 'SFW' }}</span>
        <div v-if="changes[charData.uid]" class="absolute top-1 left-0 text-sm flex flex-col justify-start items-start gap-1 cursor-pointer" @click="showChange = true">
          <div v-if="changes[charData.uid].image !== undefined" class="bg-green-600 rounded-r-lg px-2 shadow-md">
            new image
          </div>
          <div v-if="changes[charData.uid].world" class="bg-blue-700 rounded-r-lg px-2 shadow-md">
            new world
          </div>
          <div v-if="changes[charData.uid].sub" class="bg-blue-600 rounded-r-lg px-2 shadow-md">
            new subcategory
          </div>
          <div v-if="changes[charData.uid].name" class="bg-gray-800 rounded-r-lg px-2 shadow-md">
            new name
          </div>
          <div v-if="changes[charData.uid].tier" class="bg-orange-600 rounded-r-lg px-2 shadow-md">
            new tier
          </div>
          <div v-if="changes[charData.uid].tags" class="bg-amber-400 text-gray-800 rounded-r-lg px-2 shadow-md">
            changed tags
          </div>
          <div v-if="changes[charData.uid].nickname" class="bg-gray-600 rounded-r-lg px-2 shadow-md">
            by {{ changes[charData.uid].nickname }}
          </div>
        </div>
        <div v-if="showChange" class="absolute z-30 inset-0 flex gap-1 bg-gray-800 p-1 rounded h-full w-full">
          <div class="h-full hover:bg-gray-700 rounded text-center flex items-center cursor-pointer" @click="showChange = false">
            <akar-icons:arrow-back-thick-fill />
          </div>
          <div>
            <div v-if="changes[charData.uid].source !== undefined" class="">
              <strong>Old image</strong>: <a class="text-blue-500 underline" :href="changes[charData.uid].source" target="_blank" rel="noopener noreferrer">link</a>
            </div>
            <div v-if="changes[charData.uid].world" class="">
              <strong>Old World</strong>: {{ changes[charData.uid].world }}
            </div>
            <div v-if="changes[charData.uid].sub" class="">
              <strong>Old subcategory</strong>: {{ changes[charData.uid].sub }}
            </div>
            <div v-if="changes[charData.uid].name" class="">
              <strong>Old name</strong>: {{ changes[charData.uid].name }}
            </div>
            <div v-if="changes[charData.uid].tier" class="">
              <strong>Old tier</strong>: {{ changes[charData.uid].tier }}
            </div>
            <div v-if="changes[charData.uid].tags" class="whitespace-nowrap">
              <div class="flex flex-wrap gap-1 text-sm">
                <strong>Changed tags:</strong>
                <div v-for="tag in changes[charData.uid].tags" :key="tag" class="bg-gray-700 rounded px-0.5" :class="[charData.tags.includes(tag) ? 'text-green-500' : 'text-red-500']">
                  {{ waifuTags[tag].tag }}
                </div>
              </div>
            </div>
            <div v-if="changes[charData.uid].nickname" class="">
              by {{ changes[charData.uid].nickname }}
            </div>
          </div>
        </div>
        <div
          class="absolute bottom-0 py-1 w-full flex justify-center gap-4 transition-opacity duration-500 opacity-0 bg-black bg-opacity-25"
          :class="{'opacity-100': inFocus}"
        >
          <template v-if="!isAlredyBought(charData.uid)">
            <Button size="Small" bg-color="bg-red-500" label="buy" @click="buyCompanion(charData)" />
            <Button
              v-if="flags.chargen"
              size="Small"
              bg-color="bg-orange-500"
              label="yoink"
              @click="yoinkCompanion(charData)"
            />
            <Button size="Small" bg-color="bg-violet-600" label="used" @click="usedModal = true" />
            <Button class="whitespace-nowrap" size="Small" :label="`capture${charCost}`" @click="captureCompanion(charData)" />
          </template>
          <Button v-else-if="flags.chargen" size="Small" label="undo" @click="undoBuying(charData.uid)" />
        </div>
      </div>
      <div class="py-1 h-max">
        <h4 id="title" class="flex px-1 leading-none relative" :class="fontSize">
          <span class="flex-grow text-center" :class="isUserChar ? 'text-green-200': ''">{{ charData.name }}</span>
          <div
            class="text-base text-gray-400 hover:text-orange-500 cursor-pointer absolute left-1"
            :class="{'opacity-0': !defenseTags.length}"
            :title="showDefenseTags ? 'Show Tags' : 'Show Defense Tags'"
            @click="showDefenseTags = !showDefenseTags"
          >
            <carbon:tag-group
              v-if="showDefenseTags"
            />
            <charm:shield-tick
              v-else
            />
          </div>
          <div id="companionMenu" class="h-5 absolute right-0 text-right">
            <div ref="infoIcon" class="pr-1 text-gray-500 text-2xl md:text-base" @click="isTouchpad ? showMenu = true : null">
              <ic:outline-report />
            </div>
            <div v-show="showTiers && (isTouchpad ? showMenu : isInfoHovered || isMenuHovered)" ref="editMenu" class="w-max flex flex-col gap-3 md:gap-1 absolute right-0 -top-8 edit-icons bg-gray-700 p-1" @click="isTouchpad ? showMenu = false : null">
              <a
                v-if="charData.sourceImage"
                class="hover:(text-gray-300 bg-gray-600) cursor-pointer flex items-center gap-1"
                :href="charData.sourceImage"
                target="_blank"
                rel="noopener noreferrer"
                title="Source"
              >
                <eva:external-link-fill />
                Image source
              </a>
              <div class="hover:(text-gray-300 bg-gray-600) cursor-pointer flex items-center gap-1" @click="$emit('editCompanion', charData)">
                <bx:bxs-edit />
                Edit
              </div>
              <div v-if="!isUserChar" class="hover:(text-gray-300 bg-gray-600) cursor-pointer flex items-center gap-1" @click="$emit('reportCompanion', charData)">
                <ic:outline-report />
                Report errors
              </div>
              <div v-if="isUserChar" class="hover:(text-gray-300 bg-gray-600) cursor-pointer flex items-center gap-1" @click="deleteCharacter">
                <fluent:delete-20-filled />
                Delete
              </div>
              <div class="hover:(text-gray-300 bg-gray-600) cursor-pointer flex items-center gap-1" @click="favoritesObject[charData.uid] !== undefined ? favorites.splice(favorites.indexOf(charData.uid), 1) : favorites.push(charData.uid)">
                <span class="text-red-500" title="Add to Favorites">
                  <ci:heart-fill
                    v-if="favoritesObject[charData.uid] !== undefined"
                  />
                  <ci:heart-outline v-else />
                </span>
                Favorite
              </div>
            </div>
          </div>
        </h4>
        <div class="text-center leading-none text-blue-300">
          <span>{{ charData.world }}</span>
          <span v-if="charData.sub" class="text-blue-200"> - {{ charData.sub }}</span>
        </div>
        <div v-if="charData.nickname" class="ml-2 mb-1 text-xs text-gray-400 leading-none" :title="nicknames.includes(charData.nickname) ? 'Patron' : ''">
          by <span :class="{'text-red-400 cursor-help font-semibold': nicknames.includes(charData.nickname)}">{{ charData.nickname }}</span>
        </div>
        <div v-if="showTiers" class="flex justify-between px-2">
          <div class="text-gray-400 justify-self-start">
            Tier: <span class="text-amber-300">{{ (charData.tier) }}</span>
          </div>
          <div class="text-gray-400 whitespace-nowrap text-right">
            Cost: <span class="text-amber-300">{{ charData.tier === 11 ? 'Tier X ticket' : CHAR_COSTS[charData.tier] }}</span>
            <span
              v-if="flags.noBindings && (charData.tier) !== 11 && (charData.tier) !== 1"
              title="Discount from No Binding"
            >({{ CHAR_COSTS[(charData.tier) - 1] }})</span>
          </div>
        </div>
        <div v-if="showTags" class="flex flex-wrap gap-1 text-sm justify-center">
          <Tag
            v-for="tag in showDefenseTags && defenseTags.length ? defenseTags : normalTags"
            :key="tag.tag"
            :tag="tag"
            :link="tag.tag === 'Perk' ? {path: '/talents/specific', hash: `#${waifusThatHasPerk[charData.uid]}`} : ''"
            @click="() => tag.short ? tagToggles[tag.short] = 1 : tagToggles[tag.tag] = 1"
          />
        </div>
      </div>
    </div>
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-10 flex place-content-center items-center z-20" @click="showModal = false">
      <div class="relative overflow-auto w-max flex place-content-center items-center">
        <img v-if="/[^ \!@\$\^&\(\)\+\=]+(\.png|\.jpeg|\.gif|\.jpg|\.webp)$/.test(modalImageCmp)" class="object-contain max-h-screen" :src="modalImageCmp" alt="full image">
        <div v-else class="bg-gray-700 rounded p-2">
          Full image link leads to a different site
          <a :href="modalImageCmp" target="_blank" rel="noopener noreferrer" class="underline">{{ modalImageCmp }}</a>
        </div>
        <span
          v-if="charData.image_nsfw"
          class="absolute top-1 right-4 hover:text-blue-400 cursor-pointer mix-blend-difference"
          @click.stop="(nsfw = !nsfw, modalImage=(nsfw ? charData.image_nsfw || imageLink : imageLink))"
        >{{ nsfw ? 'NSFW' : 'SFW' }}</span>
      </div>
    </div>
    <teleport to="#app">
      <SlightlyUsed v-if="usedModal" :char="charData" class="z-20" @click="usedModal = false" @buyUsed="data => slightlyCompanion(data, charData)" />
    </teleport>
  </div>
</template>

<script lang='ts' setup>
import { Character } from 'global'
import { findIndex, random } from 'lodash-es'
import { CHAR_COSTS, defTags, PLACEHOLDER_NO_IMAGE, useAllChars, waifusThatHasPerk, waifuTags, nicknames } from '~/data/constants'
import { lazyLoadSingleImg, tagToggles, showDefenseTags } from '~/logic'
import { buyCompanion, captureCompanion, yoinkCompanion, slightlyCompanion } from '~/logic/waifuLogic'
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
  withImage: {
    type: Boolean,
    default: true,
  },
  fontSize: {
    type: String,
    default: 'text-lg',
  },
})

const {
  flags, companions, localUserCharacters, companionsUIDs, captureKoeff, favorites,
  settings, favoritesObject,
} = useStore()

const { changes } = useAllChars()

const infoIcon = ref<EventTarget | null>(null)
const editMenu = ref<EventTarget | null>(null)
const showMenu = ref(false)
const isInfoHovered = useElementHover(infoIcon)
const isMenuHovered = useElementHover(editMenu)

const isTouchpad = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)

const modalImage = ref('')
const showModal = ref(false)
const usedModal = ref(false)
const nsfw = ref(settings.value.nsfw)
const showChange = ref(false)

const cardEl = ref<HTMLImageElement| null>(null)
const companionEl = ref<HTMLImageElement| null>(null)
const inFocus = useElementHover(cardEl)

const charData = computed<Character>(() => {
  const res = props.char.t
    ? {
      uid: props.char.u,
      name: props.char.n,
      world: props.char.w,
      sub: props.char.d,
      tier: props.char.t,
      image: props.char.i,
      image_nsfw: props.char.in,
      sourceImage: props.char.s,
      tags: props.char.b || [],
      nickname: props.char.k,
    }
    : props.char
  if (!res.uid) res.uid = random(10000000, 99999999)
  return res
})

const charCost = computed(() => charData.value.tier === 11 ? '' : ` ${Math.ceil(CHAR_COSTS[charData.value.tier] * captureKoeff.value)}c`)

const tags = computed(() => {
  return charData.value.tags.map(x => waifuTags[x] ? waifuTags[x] : { tag: x, color: 'bg-teal-600', desc: '' })
})

const normalTags = computed(() => tags.value.filter(tag => !defTags.includes(tag.short)))
const defenseTags = computed(() => tags.value.filter(tag => defTags.includes(tag.short)))

const modalImageCmp = computed(() => {
  if (modalImage.value.includes('imgur') && modalImage.value.split('.').slice(-2, -1)[0].slice(-1) === 'l') {
    const pcs = modalImage.value.split('l')
    const lastPc = pcs.pop()
    return pcs.join('l') + lastPc
  }

  return modalImage.value
})

const imageLink = computed(() => {
  if (nsfw.value && charData.value.image_nsfw) {
    return charData.value.image_nsfw
  }
  else {
    if (charData.value.image) {
      if (charData.value.image.startsWith('http')) { return charData.value.image }
      else {
        if (charData.value.uid >= 100000)
          return `https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/${charData.value.image}`
        if (charData.value.image.startsWith('[n]'))
          return `https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/${charData.value.image.slice(3)}`
        return `https://cdn.statically.io/gh/klassekatze/waifucatimg/master/imagecache_thumb/${charData.value.image}`
      }
    }
    else {
      return PLACEHOLDER_NO_IMAGE
    }
  }
})

watch(settings.value, () => nsfw.value = settings.value.nsfw)

function undoBuying(uid: number) {
  companions.value.splice(findIndex(companions.value, { uid }), 1)
}

function isAlredyBought(uid: number): boolean {
  return companionsUIDs.value[uid]
}

function deleteCharacter() {
  const ind = findIndex(localUserCharacters.value, { uid: charData.value.uid })
  if (ind !== -1)
    localUserCharacters.value.splice(ind, 1)
}

onMounted(() => {
  if ((!props.lazy || settings.value.nsfw) && companionEl.value)
    companionEl.value.src = imageLink.value
  else if (companionEl.value)
    lazyLoadSingleImg(companionEl.value)
})

watch(imageLink, () => companionEl.value ? companionEl.value.src = imageLink.value : null)
</script>
