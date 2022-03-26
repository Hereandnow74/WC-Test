<template>
  <div
    class="flex justify-between border border-gray-400 rounded p-1"
    :class="char.sold ? 'text-gray-600': ''"
  >
    <div class="flex gap-2 w-full">
      <img
        v-if="image"
        :src="image"
        :alt="char.name"
        class="rounded w-[80px] object-cover object-top"
      >
      <div class="flex flex-col w-full">
        <div class="flex flex-wrap gap-x-1 items-center">
          {{ char.name }}
          <span class="text-green-500 text-sm"> [T{{ char.tier }}]
            <span class="text-purple-400">[{{ charCost }}]</span>
          </span>
          <span class="text-gray-400 text-sm"> ({{ methods[char.method] }})</span>
          <span v-if="char.sold" class="text-red-500 ml-1">SOLD</span>
        </div>
        <span class="text-gray-500">From: <span class="text-gray-400">{{ char.world }}</span></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from '@vue/runtime-core'
import { CHAR_COSTS } from '~/data/constants'
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
})

const { captureKoeff } = useStore()

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
  let cost = 0
  switch (props.char.method) {
    case 'buy':
      cost = CHAR_COSTS[props.char.priceTier]
      break
    case 'capture':
      cost = Math.round(CHAR_COSTS[props.char.priceTier] * captureKoeff.value) * (-1)
      break
    case 'used':
      cost = CHAR_COSTS[props.char.priceTier]
      break
    case 'yoink':
      cost = CHAR_COSTS[props.char.priceTier] * 1.2
      break
  }
  return cost * (-1)
})
</script>
