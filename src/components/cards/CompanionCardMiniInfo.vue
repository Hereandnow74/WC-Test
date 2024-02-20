<template>
  <div
    class="flex justify-between border border-gray-400 rounded p-1 bg-gray-800 rounded"
    :class="char.sold ? 'text-gray-600': ''"
  >
    <div class="flex gap-2 w-full">
      <img
        v-if="(char.image || image) && showImage"
        :src="char.image || image"
        :alt="char.name"
        class="rounded w-[33%] max-h-[120px] object-cover object-top self-center"
      >
      <div class="flex flex-col w-full">
        <div class="flex flex-wrap gap-x-1 items-center">
          {{ char.name }}
          <span class="text-green-500 text-sm"> [T<TierDisplay :tier="char.perk?.tier || char.swap?.tier || char.tier" />]
            <span v-if="charCost !== ''" class="text-purple-400">[{{ charCost }}]</span>
          </span>
          <span class="text-gray-400 text-sm"> ({{ methods[char.method] }})</span>
          <span v-if="char.sold" class="text-red-500 ml-1">SOLD</span>
        </div>
        <span v-if="char.role" class="text-gray-500">Status: <span class="text-orange-200">{{ char.role }}</span></span>
        <span v-if="char.world" class="text-gray-500">From: <span class="text-gray-400">{{ char.world }}</span></span>
        <span
          v-if="char.swap"
          class="text-gray-400"
        >
          Power Swap to: <span class="text-gray-200">{{ char.swap.name }}</span> [<span class="text-green-400">T<TierDisplay :tier="char.swap.tier" /></span>] <span class="text-purple-400">[{{ (char.swap.cost - char.swap.refund) * -1 }}]</span>
        </span>
        <span
          v-if="char.perk"
          class="text-gray-400"
        >
          Specific Waifu Perk: <span class="text-gray-200">{{ char.perk.title }}</span> [<span class="text-green-400">T<TierDisplay :tier="char.perk.tier" /></span>] <span class="text-purple-400">[{{ (char.perk.cost - char.perk.refund) * -1 }}]</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from '@vue/runtime-core'
import { CHAR_COSTS, CHAR_COSTS_TICKET } from '~/data/constants'
import { SavedChar } from '~/store/chargen'
import { useStore } from '~/store/store'

const props = defineProps({
  char: {
    type: Object as PropType<SavedChar>,
    default: () => {},
  },
  image: {
    type: String,
    default: '',
  },
  showImage: {
    type: Boolean,
    default: true,
  },
})

const { difficultyAdjustedCapture, difficultyAdjustedCaptureT } = useStore()

const methods = {
  buy: 'Bought',
  capture: 'Captured',
  used: 'Used',
  yoink: 'Yoinked',
  unbound: 'Unbound',
  steal: 'Stolen',
  you: 'It\'s you',
}

const charCost = computed(() => {
  let cost = ''
  const tier = props.char.priceTier
  switch (props.char.method) {
    case 'buy':
      cost = tier >= 11 ? `${CHAR_COSTS_TICKET[props.char.priceTier]} IMG` : `${CHAR_COSTS[props.char.priceTier]}`
      break
    case 'capture':
      cost = difficultyAdjustedCaptureT.value[props.char.priceTier] > 0 ? `+${difficultyAdjustedCapture.value[props.char.priceTier]}c ${difficultyAdjustedCaptureT.value[props.char.priceTier]}t` : `+${difficultyAdjustedCapture.value[props.char.priceTier]}c`
      break
    case 'used':
      cost = tier >= 11 ? `${CHAR_COSTS_TICKET[props.char.priceTier]} IMG` : `${CHAR_COSTS[props.char.priceTier]}`
      break
    case 'yoink':
      cost = `${CHAR_COSTS[props.char.priceTier] * 1.2}`
      break
  }
  return cost
})
</script>
