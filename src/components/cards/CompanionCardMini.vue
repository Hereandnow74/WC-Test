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
        class="rounded object-cover max-h-[140px] max-w-[90px] object-top border border-gray-600"
      >
      <div class="flex flex-col w-full">
        <div class="flex">
          <div v-if="index !== -1" class="font-semibold mr-1">
            {{ index }}.
          </div>
          <Input v-if="editMode" v-model="char.name" placeholder="Character name" />
          <router-link v-else :to="`/companions/?name=${char.name}`" class="hover:underline">
            {{ char.name }}<span class="text-gray-500 text-sm"> ({{ methods[char.method] }})</span>
          </router-link>
          <span v-if="char.sold" class="text-red-500 ml-1">SOLD</span>
          <span class="text-gray-500 ml-auto whitespace-nowrap"> Tier: <TierDisplay :tier="char.perk?.tier || char.swap?.tier || char.tier" /></span>
          <span
            v-if="char.tier !== char.priceTier && char.priceTier && (!char.perk?.tier && !char.swap?.tier)"
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
            v-model="sex"
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
            :link="tag.tag === 'Perk' ? {path: '/talents/specific', hash: `#${waifusThatHasPerk[char.uid] || waifusThatHasPerk[char?.swap?.uid || 0] }`} : ''"
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
        :title="`Sell for ${charCost}`"
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
      <div v-if="editMode">
        <Select :options="companions.map((_, i) => i + 1)" :model-value="index" @update:modelValue="changeIndex" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from '@vue/runtime-core'
import { findIndex, intersection } from 'lodash-es'
import TextArea from '../basic/TextArea.vue'
import { CHAR_COSTS, CHAR_COSTS_TICKET, waifusThatHasPerk, waifuTags, useAllChars } from '~/data/constants'
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
  index: {
    type: Number,
    default: -1,
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

const sex = ref(props.char.tags ? intersection(['F', 'M', 'O'], props.char.tags)[0] || 'F' : 'F')
watch(sex, (val, oldVal) => {
  const ind = props.char.tags.indexOf(oldVal)
  if (ind !== -1)
    props.char.tags[ind] = val
})

const { flags, settings, companions, difficultyAdjustedSell, difficultyAdjustedSellT } = useStore()

const image = computed(() => props.char.image || (props.char.perk && waifuPerksObject[props.char.perk.uid] && waifuPerksObject[props.char.perk.uid].image ? waifuPerksObject[props.char.perk.uid].image || '' : imageLink(props.char.originUID || props.char.uid)))
watch(image, () => imageEl.value ? lazyLoadSingleImg(imageEl.value) : null, { flush: 'post' })

const tags = computed(() => {
  let t = [] as string[]
  if (props.char.tags) t = props.char.tags
  if (props.char?.swap?.tags) t = props.char.swap.tags
  if (props.char.perk?.charUID) {
    const { allCharsObject } = useAllChars()
    t = [...allCharsObject.value[props.char.perk?.charUID].b]
  }
  // else {
  //   if (props.char.swap)
  //     t.push(...allCharsObject.value[props.char.swap.uid].b)
  //   else
  //     t.push(...(allCharsObject.value[props.char.originUID || props.char.uid]?.b || []))
  // }
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

const charCost = computed(() => difficultyAdjustedSellT.value[props.char.tier] > 0 && props.char.tier > 10 ? ` ${difficultyAdjustedSell.value[props.char.tier]}c ${difficultyAdjustedSellT.value[props.char.tier]}t` : ` ${difficultyAdjustedSell.value[props.char.tier]}c`)

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

function changeIndex(i: number) {
  if (props.index !== -1) {
    const companion = companions.value.splice(props.index - 1, 1)
    if (companion.length)
      companions.value.splice(i - 1, 0, companion[0])
  }
}

</script>
