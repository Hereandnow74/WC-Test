<template>
  <div
    class="py-1 w-full dark:text-gray-200 bg-warm-gray-300 dark:bg-warm-gray-700 rounded border border-gray-500"
  >
    <div class="h-full flex flex-col" :class="[isUserChar ? 'bg-lime-50 dark:bg-warm-gray-800': 'bg-gray-300 dark:bg-gray-800']">
      <div ref="cardEl" class="relative flex-grow">
        <img
          v-if="withImage"
          ref="companionEl"
          class="rounded absolute object-cover h-full w-full object-top border border-gray-400 rounded dark:border-gray-700"
          :data-src="image"
          :alt="charData.name"
        />
        <div v-else class="h-16"></div>
        <div ref="likeHover" class="absolute top-7 right-0.5 cursor-pointer flex items-center gap-1 text-lg leading-none" @click="throttledLike">
          <span class="text-red-400 flex items-center gap-0.5" :style="{'text-shadow': '-1px 0 2px black, 0 1px 2px black, 1px 0 2px black, 0 -1px 2px black'}">
            <span v-if="charLikes || charData.likes" class="font-semibold">{{ charLikes || charData.likes }}</span>
            <ci:heart-fill
              v-if="(favoritesObject[charData.uid] !== undefined && !isLikeHovered) || (favoritesObject[charData.uid] === undefined && isLikeHovered)"
              :style="{'filter': 'drop-shadow(black 1px 1px 1px) drop-shadow(black 0px 1px 1px)'}"
            />
            <ci:heart-outline v-if="(!favoritesObject[charData.uid] && !isLikeHovered) || (favoritesObject[charData.uid] !== undefined && isLikeHovered)" :style="{'filter': 'drop-shadow(black 1px 1px 1px) drop-shadow(black 0px 1px 1px)'}" />
          </span>
        </div>
        <icon-park-outline:full-screen-one
          class="text-light-400  absolute top-1 right-1 hover:text-blue-400 cursor-pointer mix-blend-difference"
          @click="() => (showModal = true, modalImage=(nsfw ? charData.image_nsfw || image : charData.sourceImage || image))"
        />
        <span
          v-if="charData.image_nsfw"
          class="text-light-400 absolute top-1 right-8 hover:text-blue-400 cursor-pointer mix-blend-difference"
          @click="nsfw = !nsfw"
        >{{ nsfw ? 'NSFW' : 'SFW' }}</span>
        <div v-if="changes[charData.uid]" class="absolute top-1 left-0 text-sm flex flex-col justify-start items-start gap-1 cursor-pointer text-gray-200" @click="showChange = true">
          <div v-if="changes[charData.uid].image !== undefined" class="bg-green-600 rounded-r-lg px-2 shadow-md">
            new image
          </div>
          <div v-if="changes[charData.uid].nsfw !== undefined" class="bg-pink-500 rounded-r-lg px-2 shadow-md">
            new nsfw image
          </div>
          <div v-if="changes[charData.uid].world" class="bg-blue-700 rounded-r-lg px-2 shadow-md">
            new world
          </div>
          <div v-if="changes[charData.uid].sub !== undefined" class="bg-blue-600 rounded-r-lg px-2 shadow-md">
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
        <div v-if="showChange" class="absolute z-30 inset-0 flex gap-1 bg-blue-200 dark:bg-gray-800 p-1 rounded h-full w-full">
          <div class="h-full hover:bg-gray-700 rounded text-center flex items-center cursor-pointer" @click="showChange = false">
            <akar-icons:arrow-back-thick-fill />
          </div>
          <div>
            <div v-if="changes[charData.uid].source !== undefined" class="">
              <strong>Old image</strong>: <a class="text-blue-500 underline" :href="changes[charData.uid].source" target="_blank" rel="noopener noreferrer">link</a>
            </div>
            <div v-if="changes[charData.uid].nsfw !== undefined" class="">
              <strong>Old nsfw image</strong>:
              <a v-if="changes[charData.uid].nsfw !== 'None'" class="text-blue-500 underline" :href="changes[charData.uid].nsfw" target="_blank" rel="noopener noreferrer">link</a>
              <span v-else>None</span>
            </div>
            <div v-if="changes[charData.uid].world" class="">
              <strong>Old World</strong>: {{ changes[charData.uid].world }}
            </div>
            <div v-if="changes[charData.uid].sub !== undefined" class="">
              <strong>Old subcategory</strong>: {{ changes[charData.uid].sub || 'None' }}
            </div>
            <div v-if="changes[charData.uid].name" class="">
              <strong>Old name</strong>: {{ changes[charData.uid].name }}
            </div>
            <div v-if="changes[charData.uid].tier" class="">
              <strong>Old tier</strong>: {{ changes[charData.uid].tier }}
              <div v-if="changes[charData.uid].arg">
                <strong>Argument for change</strong>: {{ changes[charData.uid].arg }}
              </div>
            </div>
            <div v-if="changes[charData.uid].tags" class="whitespace-nowrap">
              <div class="flex flex-wrap gap-1 text-sm">
                <strong>Changed tags:</strong>
                <div v-for="tag in changes[charData.uid].tags" :key="tag" class="bg-gray-700 rounded px-0.5" :class="[charData.tags.includes(tag) ? 'text-green-500' : 'text-red-500']">
                  {{ waifuTags[tag]?.tag || tag }}
                </div>
              </div>
              <!-- <div v-if="difference(allCharsObject[charData.uid].b, charData.tags).length" class="flex flex-wrap gap-1 text-sm">
                <strong>Difference with global:</strong>
                <div v-for="tag in difference(allCharsObject[charData.uid].b, charData.tags)" :key="tag" class="bg-gray-700 rounded px-0.5" :class="[charData.tags.includes(tag) ? 'text-green-500' : 'text-red-500']" @click="charData.tags.includes(tag) ? char.b.splice((char.b.findIndex(tag) - 1), 1) : char.b.push(tag)">
                  {{ waifuTags[tag]?.tag || tag }}
                </div>
              </div> -->
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
          <template v-if="!isAlreadyBought(charData.uid)">
            <Button v-if="canPurchase" size="Small" bg-color="bg-red-500" label="buy" @click="buyAnyCompanion(charData.uid)" />
            <Button
              v-if="(flags.chargen && canPurchase)"
              size="Small"
              bg-color="bg-orange-500"
              label="yoink"
              @click="yoinkCompanion(charData.uid)"
            />
            <Button v-if="canPurchase" size="Small" bg-color="bg-violet-600" label="used" @click="usedModal = true" />
            <Button class="whitespace-nowrap" size="Small" :label="`capture${charCost}`" @click="captureCompanion(charData.uid)" />
          </template>
          <template v-else>
            <Button v-if="flags.chargen" size="Small" label="undo" @click="undoBuying(charData.uid)" />
            <Button size="Small" :label="`capture copy ${copyCount ? `#${copyCount + 1}` : ''}`" bg-color="bg-orange-500" @click="{captureCopyCompanion(charData.uid); copyCount += 1}" />
          </template>
        </div>
      </div>
      <div class="py-1 h-max">
        <h4 id="title" class="flex px-1 leading-none relative" :class="fontSize">
          <span class="flex-grow text-center" :class="isUserChar ? 'text-green-800 dark:text-green-200': ''">{{ charData.name }}</span>
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
            <div v-show="showTiers && (isTouchpad ? showMenu : isInfoHovered || isMenuHovered)" ref="editMenu" class="w-max flex flex-col gap-3 md:gap-1 absolute right-0 -top-8 edit-icons bg-gray-700 text-gray-200 p-1" @click="isTouchpad ? showMenu = false : null">
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
              <div v-if="isUserChar" class="hover:(text-gray-300 bg-gray-600) cursor-pointer flex items-center gap-1" @click="deleteLocalCharacter(charData.uid)">
                <fluent:delete-20-filled />
                Delete
              </div>
              <div class="hover:(text-gray-300 bg-gray-600) cursor-pointer flex items-center gap-1" @click="$emit('editCompanion', charData)">
                <bx:bxs-edit />
                Edit
              </div>
              <div v-if="!isUserChar" class="hover:(text-gray-300 bg-gray-600) cursor-pointer flex items-center gap-1" @click="$emit('reportCompanion', charData)">
                <ic:outline-report />
                Report errors
              </div>
            </div>
          </div>
        </h4>
        <div class="text-center leading-none text-blue-900 dark:text-blue-300">
          <span>{{ charData.world }}</span>
          <span v-if="charData.sub && charData.sub!== 'Will be deleted.'" class="text-ble-800 dark:text-blue-200"> - {{ charData.sub }}</span>
        </div>
        <div v-if="charData.nickname" class="ml-2 mb-1 text-xs text-gray-600 dark:text-gray-400 leading-none" :title="nicknames.includes(charData.nickname) ? 'Supporter' : ''">
          by <span :class="{'text-red-400 cursor-help font-semibold': nicknames.includes(charData.nickname)}">{{ charData.nickname }}</span>
        </div>
        <div v-if="showTiers" class="flex justify-between px-2">
          <div class="text-gray-600 dark:text-gray-400 justify-self-start">
            Tier: <TierDisplay class="text-amber-600 dark:text-amber-300" :tier="charData.tier" />
          </div>
          <div class="text-gray-600 dark:text-gray-400 whitespace-nowrap text-right">
            Cost: <span class="text-amber-600 dark:text-amber-300">{{ CHAR_COSTS[charData.tier] || `${CHAR_COSTS_TICKET[charData.tier]} IMG` }}</span>
            <span
              v-if="noBindings && legacyMode && (charData.tier) <= 10 && (charData.tier) !== 1"
              title="Discount from No Binding"
            >({{ CHAR_COSTS[(charData.tier) - 1] }})</span>
          </div>
        </div>
        <div v-if="showTags" class="flex flex-wrap gap-1 text-sm justify-center text-gray-200">
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
        <div v-else class="bg-gray-700 text-gray-200 rounded p-2">
          Full image link leads to a different site
          <a :href="modalImageCmp" target="_blank" rel="noopener noreferrer" class="underline">{{ modalImageCmp }}</a>
        </div>
        <span
          v-if="charData.image_nsfw"
          class="absolute top-1 right-4 hover:text-blue-400 cursor-pointer mix-blend-difference"
          @click.stop="(nsfw = !nsfw, modalImage=(nsfw ? charData.image_nsfw || imageLink(charData.uid) : imageLink(charData.uid)))"
        >{{ nsfw ? 'NSFW' : 'SFW' }}</span>
      </div>
    </div>
    <teleport to="#app">
      <SlightlyUsed v-if="usedModal" :char="charData" class="z-20" @click="usedModal = false" @buyUsed="data => slightlyCompanion(data, charData)" />
    </teleport>
  </div>
</template>

<script lang='ts' setup>
import type { PropType } from '@vue/runtime-core'
import { Character, DBCharacter } from 'global'
import { random, throttle, difference } from 'lodash-es'
import { CHAR_COSTS, defTags, PLACEHOLDER_NO_IMAGE, useAllChars, waifusThatHasPerk, waifuTags, nicknames, CHAR_COSTS_TICKET } from '~/data/constants'
import { lazyLoadSingleImg, tagToggles, showDefenseTags, imageLink } from '~/logic'
import { confirmDialog } from '~/logic/dialog'
import { getLikesByUid, updateUserLikes } from '~/logic/server/'
import { captureCopyCompanion, captureCompanion, yoinkCompanion, slightlyCompanion, deleteLocalCharacter, buyAnyCompanion, undoBuying, isAlreadyBought } from '~/logic/waifuLogic'
import { usePlayStore } from '~/store/play'
import { useGlobalSettings } from '~/store/settings'
import { useStore } from '~/store/store'
import { useUser } from '~/store/user'

const props = defineProps({
  char: {
    type: Object as PropType<DBCharacter>,
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
  charLikes: {
    type: Number,
    default: 0,
  },
})

const {
  flags, settings, difficultyAdjustedCapture, difficultyAdjustedCaptureT, legacyMode, noBindings,
} = useStore()
const { canPurchase, favoritesObject, favorites } = useGlobalSettings()
const { likes, likesMessageSeen } = usePlayStore()
const { changes, allCharsObject } = useAllChars()
const { user } = useUser()

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
const likeHover = ref<HTMLImageElement| null>(null)
const inFocus = useElementHover(cardEl)

const copyCount = ref(0)

const isLikeHovered = useElementHover(likeHover)

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
      likes: props.char.likes,
      type: props.char.type,
    }
    : props.char
  if (!res.uid) res.uid = random(10000000, 99999999)
  return res as Character
})

const charCost = computed(() => difficultyAdjustedCaptureT.value[charData.value.tier] > 0 ? ` ${difficultyAdjustedCapture.value[charData.value.tier]}c ${difficultyAdjustedCaptureT.value[charData.value.tier]}t` : ` ${difficultyAdjustedCapture.value[charData.value.tier]}c`)

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

const image = computed(() => {
  if (nsfw.value && charData.value.image_nsfw) {
    return charData.value.image_nsfw
  }
  else {
    if (charData.value.image) {
      if (charData.value.image.startsWith('http')) return charData.value.image
      return imageLink(charData.value.uid, charData.value.image)
    }
    else {
      return PLACEHOLDER_NO_IMAGE
    }
  }
})

watch(settings.value, () => nsfw.value = settings.value.nsfw)

onMounted(() => {
  if ((!props.lazy || settings.value.nsfw) && companionEl.value)
    companionEl.value.src = image.value
  else if (companionEl.value)
    lazyLoadSingleImg(companionEl.value)
})

watch(image, () => companionEl.value ? companionEl.value.src = image.value : null)

function likeChar() {
  if (favoritesObject.value[charData.value.uid] !== undefined) {
    if (user.value.id) {
      // likes.value[charData.value.uid] -= 1
      updateUserLikes(false, { characterUid: charData.value.uid, liked: false }).then(() => getLikesByUid([charData.value.uid]).then(result => likes.value[charData.value.uid] = result[charData.value.uid]))
    }
    else {
      // likes.value[charData.value.uid] -= 1
      favorites.value.splice(favorites.value.indexOf(charData.value.uid), 1)
    }
  }
  else {
    if (user.value.id) {
      if (user.value.role === 'guest' && likesMessageSeen.value === false) {
        confirmDialog('You need to confirm your email to make your likes count, otherwise they will behave just like your favorite list.', 'info')
        likesMessageSeen.value = true
        if (favoritesObject.value[charData.value.uid] !== undefined)
          favorites.value.splice(favorites.value.indexOf(charData.value.uid), 1)
        else
          favorites.value.push(charData.value.uid)
        return
      }
      // if (likes.value[charData.value.uid] !== undefined)
      //   likes.value[charData.value.uid] += 1
      // else
      //   likes.value[charData.value.uid] = 1

      updateUserLikes(false, { characterUid: charData.value.uid, liked: true }).then(() => getLikesByUid([charData.value.uid]).then(result => likes.value[charData.value.uid] = result[charData.value.uid]))
    }
    else {
      favorites.value.push(charData.value.uid)
    }
  }
}

const throttledLike = throttle(likeChar, 1000)
</script>
