<template>
  <div
    class="flex flex-col justify-between border border-gray-400 rounded p-1"
    :class="char.sold ? 'text-gray-600': ''"
  >
    <div class="flex gap-2 w-full">
      <img
        v-if="image && !settings.allImg"
        ref="imageEl"
        :data-src="image"
        :alt="char.name"
        class="rounded object-cover max-h-[140px] max-w-[90px] object-top"
      >
      <div class="flex flex-col w-full">
        <div class="flex">
          <Input v-if="editMode" v-model="char.name" placeholder="Character name" />
          <router-link v-else :to="`/companions/?name=${char.name}`" class="hover:underline">
            {{ char.name }}<span class="text-gray-500 text-sm"> ({{ methods[char.method] }})</span>
          </router-link>
          <span v-if="char.sold" class="text-red-500 ml-1">SOLD</span>
          <span class="text-gray-500 ml-auto whitespace-nowrap"> Tier: <TierDisplay :tier="char.perk?.tier || char.swap?.tier || char.tier" /></span>
          <span
            v-if="char.tier !== char.priceTier && char.priceTier"
            class="text-gray-500 ml-2 whitespace-nowrap"
          > Original: <TierDisplay :tier="char.priceTier" /></span>
        </div>
        <span class="text-gray-500">From: <span class="text-gray-400">{{ char.world }}</span></span>
        <div class="flex flex-wrap gap-2 mb-1 text-sm">
          <Tiers
            v-if="!char.sold"
            v-model="char.tier"
            :dark="true"
            class="whitespace-nowrap"
          />
          <Tiers
            v-if="!char.sold && editMode"
            v-model="char.priceTier"
            :dark="true"
            label="Original Tier"
            class="whitespace-nowrap"
          />
          <Variants
            v-if="!char.sold && char.method !== 'unbound'"
            v-model="char.sex"
            theme="dark"
            label="Sex"
            :list="['F', 'M', 'O']"
          />
          <VariantsRetinue
            v-if="!char.sold && char.method !== 'unbound'"
            v-model="char.role"
            theme="dark"
          />
        </div>

        <div v-if="editMode">
          <Input v-model="char.image" class="w-full" placeholder="Direct link to an image" />
        </div>
        <div>
          <span
            v-if="char.swap"
            class="text-gray-400"
          >
            Power Swap to: <span class="text-gray-200">{{ char.swap.name }}</span> [<span class="text-green-400">T{{ char.swap.tier }}</span>]
          </span>
          <span
            v-if="char.perk"
            class="text-gray-400"
          >
            Specific Waifu Perk: <span class="text-gray-200">{{ char.perk.title }}</span> [<span class="text-green-400">T{{ char.perk.tier }}</span>]
          </span>
          <span
            v-if="talentsList.length > 0"
            class="text-gray-500"
          >Talents:
            <Enum
              color="text-blue-400 hover:text-blue-300"
              class="text-gray-100"
              :list="talentsList"
              empty-message="No Talents"
            />
          </span>
          <span
            v-if="perksList.length > 0"
            class="text-gray-500"
          >Perks:
            <Enum
              color="text-blue-400 hover:text-blue-300"
              class="text-gray-100"
              :list="perksList"
              empty-message="No Perks"
            />
          </span>
          <span
            v-if="specificList.length > 0"
            class="text-gray-500"
          >Specific:
            <Enum
              color="text-blue-400 hover:text-blue-300"
              class="text-gray-100"
              :list="specificList"
              empty-message="No Waifu Perks"
            />
          </span>
        </div>

        <div class="flex flex-wrap gap-1 text-xs mb-2 mt-1">
          <Tag
            v-for="tag in tags"
            :key="tag.tag"
            :tag="tag"
            :link="tag.tag === 'Perk' ? {path: '/talents/specific', hash: `#${waifusThatHasPerk[fullChar.u]}`} : ''"
          />
        </div>
      </div>
    </div>
    <TextArea v-if="showNote" v-model="char.note" class="my-2" placeholder="Character notes" rows="4" />
    <div class="flex gap-2 bg-dark-200 text-gray-200 rounded self-end px-2 select-none">
      <div
        class="cursor-pointer hover:(bg-gray-600 text-amber-400) rounded-xl p-1 pr-4"
        :class="{'text-green-500' : char.note}"
        title="Make a note"
        @click="showNote = !showNote"
      >
        <fluent:notepad-edit-16-filled />
      </div>
      <div
        v-if="flags.chargen && !char.sold"
        class="cursor-pointer hover:(bg-gray-600 text-amber-400) rounded-xl p-1"
        title="Undo"
        @click="$emit('undo', char.uid)"
      >
        <ion:arrow-undo />
      </div>
      <div
        v-if="flags.chargen && char.sold"
        class="cursor-pointer hover:(bg-gray-600 text-amber-400) rounded-xl p-1"
        title="Undo Sell"
        @click="$emit('undoSell', char.uid)"
      >
        <ion:arrow-undo />
      </div>
      <div
        v-if="char.method !== 'unbound' && settings.ableSell && !char.sold"
        class="cursor-pointer hover:(bg-gray-600 text-amber-400) rounded-xl p-1"
        title="Free"
        @click="freeCompanion(char.uid)"
      >
        <mdi:bird />
      </div>
      <div
        v-if="['capture'].includes(char.method) && !char.sold"
        class="cursor-pointer hover:(bg-gray-600 text-amber-400) rounded-xl p-1"
        :title="`Sell for ${char.tier >= 11 ? Math.floor(CHAR_COSTS_TICKET[char.tier] * sellKoeff)+' IMG' : Math.floor(CHAR_COSTS[char.tier] * sellKoeff) + 'c'}`"
        @click="sellCompanion(char.uid)"
      >
        <healthicons:money-bag />
      </div>
      <div
        v-if="['buy', 'used', 'yoink'].includes(char.method) && !char.sold"
        class="cursor-pointer hover:(bg-gray-600 text-amber-400) rounded-xl p-1"
        :title="`Return for ${char.priceTier >= 11 ? Math.floor(CHAR_COSTS_TICKET[char.priceTier] * 0.8) + ' IMG' : Math.floor(CHAR_COSTS[char.priceTier] * 0.8) + 'c'}`"
        @click="sellCompanion(char.uid)"
      >
        <ic:baseline-assignment-return />
      </div>
      <div class="flex gap-1 items-center pl-4">
        <div class="cursor-pointer hover:bg-gray-500 rounded-xl p-1" title="Move Up" @click="moveRetinue(-1)">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" /></svg>
        </div>
        <div class="cursor-pointer hover:bg-gray-500 rounded-xl p-1" title="Move Down" @click="moveRetinue(1)">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" /></svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from '@vue/runtime-core'
import { findIndex, isNumber } from 'lodash-es'
import TextArea from '../basic/TextArea.vue'
import { CHAR_COSTS, CHAR_COSTS_TICKET, useAllChars, waifusThatHasPerk, waifuTags } from '~/data/constants'
import { waifuPerksObject } from '~/data/waifu_perks'
import { imageLink, lazyLoadSingleImg } from '~/logic'
import { SavedChar } from '~/store/chargen'
import { useStore } from '~/store/store'

const props = defineProps({
  char: {
    type: Object as PropType<SavedChar>,
    default: () => {},
  },
  editMode: {
    type: Boolean,
    default: false,
  },
  perks: {
    type: Object,
    default: () => ({}),
  },
})

const imageEl = ref<null|HTMLImageElement>(null)

const methods = {
  buy: 'Bought',
  capture: 'Captured',
  used: 'Used',
  yoink: 'Yoinked',
  unbound: 'Unbound',
  steal: 'Stolen',
  you: 'It\'s you',
}

const emit = defineEmits(['sell', 'undo', 'free'])

const showNote = ref(false)

const { flags, settings, sellKoeff, companions } = useStore()
const { allCharsObject } = useAllChars()

const fullChar = computed(() => {
  if (isNumber(props.char.uid))
    return allCharsObject.value[props.char.originUID || props.char.uid] || { i: '', b: [] }
  else
    return { i: waifuPerksObject[props.char.uid].image, b: [] }
})

const image = computed(() => props.char.image || (props.char.perk && waifuPerksObject[props.char.perk.uid] && waifuPerksObject[props.char.perk.uid].image ? waifuPerksObject[props.char.perk.uid].image || '' : imageLink(props.char.originUID || props.char.uid)))
watch(image, () => imageEl.value ? lazyLoadSingleImg(imageEl.value) : null, { flush: 'post' })

const tags = computed(() => {
  const t = []
  if (props.char.swap)
    t.push(...allCharsObject.value[props.char.swap.uid].b)
  else
    t.push(...(allCharsObject.value[props.char.originUID || props.char.uid]?.b || []))
  return t.map(x => waifuTags[x] ? waifuTags[x] : { tag: x, color: 'bg-teal-600', desc: '' })
})

const talentsList = computed(() => {
  return props.perks.talents || []
})
const perksList = computed(() => {
  return props.perks.perks || []
})
const specificList = computed(() => {
  return props.perks.specific || []
})

function sellCompanion(uid: number) {
  emit('sell', uid)
}

function freeCompanion(uid: number) {
  emit('free', uid)
}

function moveRetinue(n: number) {
  const startIndex = findIndex(companions.value, { uid: props.char.uid })
  const saveChar = companions.value[startIndex]
  if ((startIndex + n) >= 0 && (startIndex + n) < companions.value.length) {
    companions.value[startIndex] = companions.value[startIndex + n]
    companions.value[startIndex + n] = saveChar
  }
}

</script>
