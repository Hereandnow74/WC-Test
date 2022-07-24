<template>
  <div
    class="py-1 w-full text-gray-200 bg-warm-gray-700 rounded"
  >
    <div class="border border-gray-800 h-full flex flex-col" :class="[isUserChar ? 'bg-warm-gray-800': 'bg-gray-800']">
      <div ref="cardEl" class="flex-grow relative">
        <img
          v-show="withImage"
          ref="companionEl"
          class="rounded absolute object-cover h-full w-full object-top"
          :data-src="imageLink"
          :alt="charData.name"
        >
        <icon-park-outline:full-screen-one
          class="absolute top-1 right-1 hover:text-blue-400 cursor-pointer mix-blend-difference"
          @click="() => (showModal = true, modalImage=(nsfw ? charData.image_nsfw || imageLink : imageLink))"
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
            <Button
              v-if="flags.chargen"
              size="Small"
              bg-color="bg-orange-500"
              label="yoink"
              @click="yoinkCompanion"
            />
            <Button v-if="charData.tier !== 11" size="Small" bg-color="bg-violet-600" label="used" @click="usedModal = true" />
            <Button size="Small" :label="`capture${charCost}`" @click="captureCompanion" />
          </template>
          <Button v-else-if="flags.chargen" size="Small" label="undo" @click="undoBuying(charData.uid)" />
        </div>
      </div>
      <div class="py-1 h-max">
        <h4 id="title" class="flex px-1 leading-none relative" :class="fontSize">
          <span class="flex-grow text-center" :class="isUserChar ? 'text-green-200': ''">{{ charData.name }}</span>
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
        <div v-if="charData.nickname" class="ml-2 mb-1 text-xs text-gray-400 leading-none">
          by @{{ charData.nickname }}
        </div>
        <div v-if="showTiers" class="flex justify-between px-4">
          <div class="text-gray-400">
            Tier: <span class="text-amber-300">{{ (charData.tier) }}</span>
          </div>
          <div class="text-gray-400">
            Cost: <span class="text-amber-300">{{ charData.tier === 11 ? 'Tier X ticket' : CHAR_COSTS[charData.tier] }}</span>
            <span
              v-if="flags.noBindings && (charData.tier) !== 11 && (charData.tier) !== 1"
              title="Discount from No Binding"
            >({{ CHAR_COSTS[(charData.tier) - 1] }})</span>
          </div>
        </div>
        <div v-if="showTags" class="flex flex-wrap gap-1 text-sm justify-center">
          <Tag
            v-for="tag in tags"
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
        <img class="object-contain max-h-screen" :src="modalImageCmp" alt="full image">
        <span
          v-if="charData.image_nsfw"
          class="absolute top-1 right-4 hover:text-blue-400 cursor-pointer mix-blend-difference"
          @click.stop="(nsfw = !nsfw, modalImage=(nsfw ? charData.image_nsfw || imageLink : imageLink))"
        >{{ nsfw ? 'NSFW' : 'SFW' }}</span>
      </div>
    </div>
    <teleport to="#app">
      <SlightlyUsed v-if="usedModal" :char="charData" class="z-20" @click="usedModal = false" @buyUsed="slightlyCompanion" />
    </teleport>
  </div>
</template>

<script lang='ts' setup>
import { findIndex, intersection, random } from 'lodash-es'
import { CHAR_COSTS, waifusThatHasPerk, waifuTags } from '~/data/constants'
import { lazyLoadSingleImg, tagToggles } from '~/logic'
import { confirmDialog } from '~/logic/dialog'
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
  fullStartingBudget, settings, favoritesObject, csr, baseBudget,
} = useStore()

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

const cardEl = ref<HTMLImageElement| null>(null)
const companionEl = ref<HTMLImageElement| null>(null)
const inFocus = useElementHover(cardEl)

const charData = computed(() => {
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
      return 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22500%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20500%22%20preserveAspectRatio%3D%22none%22%3E%0A%20%20%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%20%20%3Cstyle%20type%3D%22text%2Fcss%22%3E%0A%20%20%20%20%20%20%20%20%20%20%23holder%20text%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20fill%3A%20%23ffffff%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20font-family%3A%20sans-serif%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20font-size%3A%2050px%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20font-weight%3A%20400%3B%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%3C%2Fstyle%3E%0A%20%20%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%20%20%3Cg%20id%3D%22holder%22%3E%0A%20%20%20%20%20%20%20%20%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23888%22%3E%3C%2Frect%3E%0A%20%20%20%20%20%20%20%20%3Cg%3E%0A%20%20%20%20%20%20%20%20%20%20%3Ctext%20text-anchor%3D%22middle%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20dy%3D%22.3em%22%3Eno%20image%3C%2Ftext%3E%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C%2Fsvg%3E'
    }
  }
})

const priceTier = (t: number): number => flags.value.noBindings && t !== 11 && t !== 1 ? t - 1 : t

watch(settings.value, () => nsfw.value = settings.value.nsfw)

function buyCompanion() {
  const char = charData.value
  const sex = intersection(char.tags, ['F', 'M', 'O'])[0] || 'F'
  companions.value.push({ uid: char.uid, name: char.name, world: char.world, sex, tier: char.tier, priceTier: priceTier(char.tier), method: 'buy' })
}

function captureCompanion() {
  const char = charData.value
  // let price = 0
  const sex = intersection(char.tags, ['F', 'M', 'O'])[0] || 'F'
  const res = { uid: char.uid, name: char.name, world: char.world, sex, tier: char.tier, priceTier: char.tier, method: 'capture' }
  // if (underLoan.value && char.tier !== 11) {
  //   price = Math.ceil(CHAR_COSTS[char.tier] * captureKoeff.value)
  //   const half = Math.round(price / 2)
  //   if (half <= loan.value.owed) {
  //     loan.value.owed -= half
  //     price -= half
  //     trHistory.value.push(`Captured ${char.name} +${half}`)
  //   }
  //   else {
  //     price -= loan.value.owed
  //     trHistory.value.push(`Captured ${char.name} +${loan.value.owed}`)
  //     loan.value.owed = 0
  //   }
  //   res.price = price
  // }

  companions.value.push(res)
}

function yoinkCompanion() {
  const char = charData.value
  if ((!csr.value && fullStartingBudget.value * 0.2 >= CHAR_COSTS[char.tier]) || (csr.value && (baseBudget.value + fullStartingBudget.value) * 0.2 >= CHAR_COSTS[char.tier])) {
    const sex = intersection(char.tags, ['F', 'M', 'O'])[0] || 'F'
    companions.value.push({ uid: char.uid, name: char.name, world: char.world, sex, tier: char.tier, priceTier: priceTier(char.tier), method: 'yoink' })
  }
  else {
    confirmDialog(`20% of your current budget is <span class='text-green-500'>${fullStartingBudget.value * 0.2}</span> which is less than ${CHAR_COSTS[char.tier]} needed to Yoink this character.`, 'info')
  }
}

function slightlyCompanion(slightlyUsedData: any) {
  const char = charData.value
  const tier = charData.value.tier + slightlyUsedData.tier
  const pt = priceTier(charData.value.tier + slightlyUsedData.tier - slightlyUsedData.traumaTier)
  const sex = intersection(char.tags, ['F', 'M', 'O'])[0] || 'F'
  companions.value.push({ uid: char.uid, name: char.name, world: char.world, sex, tier, priceTier: pt, method: 'used' })
}

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
