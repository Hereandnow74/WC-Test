<template>
  <div class="p-2 flex flex-col gap-2 h-full">
    <div v-if="totalPoints" class="flex flex-col gap-2">
      <div class="flex justify-between">
        <div>
          Total / left points: <span class="text-green-500 text-lg">{{ totalPoints }}</span>
          / <span class="text-red-500 text-lg">{{ leftPoints }}</span>
        </div>
        <Button label="Reset" size="Small" @click="resetPoints" />
      </div>
      <div class="flex flex-wrap gap-2 justify-between">
        <NumberInput v-model="investedSize" label="Diameter:" :min="0" :max="investedSize + leftPoints" />
        <NumberInput v-model="investedRequirement" label="Requirement:" :min="0" :max="leftPoints + investedRequirement" />
        <NumberInput v-model="investedTrigger" label="Trigger:" :min="0" :max="Math.min(leftPoints + investedTrigger, 5)" />
        <NumberInput v-model="investedTier" label="Tier:" :min="0" :max="Math.min(leftPoints + investedTier, 5)" />
        <NumberInput v-model="investedEffect" label="Effect:" :min="0" :max="Math.min(leftPoints + investedEffect, 8)" />
        <NumberInput v-model="investedNetwork" label="Network:" :min="0" :max="leftPoints + investedNetwork" />
      </div>
      <div>
        You can make circle <span class="text-green-500 text-lg">{{ diameter.toLocaleString() }}</span>m in diameter
        that will take <span class="text-green-500 text-lg">{{ toReadableTime(time) }}</span> to capture and need to be
        triggered by <span class="text-amber-500">{{ trigger }}</span> to capture
        <span :class="tier.cl">{{ tier.val }}</span> targets and it will be undetectable to
        <span :class="hidden.cl">{{ hidden.val }}</span> characters.
      </div>
      <div>Specialty circles effect last <span class="text-green-500 text-lg">{{ effect }}</span></div>
    </div>
    <Desc v-else desc="You don't have a Ritual Circle perk, so no rituals for you buddy." />
    <Button label="Back" icon="akar-icons:arrow-back-thick" size="Small" class="self-center" @click="toggleAppMode" />
  </div>
</template>

<script lang="ts" setup>
import { findIndex } from 'lodash-es'
import { toggleAppMode, toReadableTime } from '~/logic'
import { useStore } from '~/store/store'
const { binding } = useStore()

const investedSize = ref(0)
const investedRequirement = ref(0)
const investedTrigger = ref(0)
const investedTier = ref(0)
const investedEffect = ref(0)
const investedNetwork = ref(0)

const totalPoints = computed(() => {
  let points = 0
  if (findIndex(binding.value, { title: 'Ritual Circle' }) !== -1) points += 6
  const ind = findIndex(binding.value, { title: 'Greater Bandwidth' })
  if (ind !== -1) points += binding.value[ind].count || 0
  return points
})

const leftPoints = computed(() => totalPoints.value - investedSize.value - investedRequirement.value
- investedTrigger.value - investedTier.value - investedEffect.value - investedNetwork.value)

const diameter = computed(() => Math.pow(3, investedSize.value) || 1)
const time = computed(() => Math.round(10 * 24 * 60 * 60 * (Math.pow(3, -investedRequirement.value) || 1)))
const trigger = computed(() => {
  switch (investedTrigger.value) {
    case 0:
      return 'Constant Incantation'
    case 1:
      return 'Activation Incantation'
    case 2:
      return 'Extended Duration'
    case 3:
      return 'Indefinite Duration'
    case 4:
      return 'Always On'
    case 5:
      return 'App Trigger'

    default:
      return 'App Trigger'
  }
})
const tier = computed(() => {
  switch (investedTier.value) {
    case 0:
      return { val: 'Blue-star', cl: 'text-blue-400' }
    case 1:
      return { val: 'Copper-star', cl: 'text-red-400' }
    case 2:
      return { val: 'Silver-star', cl: 'text-gray-300' }
    case 3:
      return { val: 'Gold-star', cl: 'text-yellow-400' }
    case 4:
      return { val: 'All', cl: 'text-green-500 font-semibold' }
    default:
      return { val: 'All', cl: 'text-green-500 font-semibold' }
  }
})
const hidden = computed(() => {
  switch (investedTier.value) {
    case 0:
      return { val: 'None', cl: 'text-gray-400' }
    case 1:
      return { val: 'Blue-star', cl: 'text-blue-400' }
    case 2:
      return { val: 'Copper-star', cl: 'text-red-400' }
    case 3:
      return { val: 'Silver-star', cl: 'text-gray-300' }
    case 4:
      return { val: 'Gold-star', cl: 'text-yellow-400' }
    case 5:
      return { val: 'All', cl: 'text-green-500 font-semibold' }
    default:
      return { val: 'All', cl: 'text-green-500 font-semibold' }
  }
})

const effect = computed(() => {
  switch (investedEffect.value) {
    case 0:
      return '10 minutes'
    case 1:
      return '1 hour'
    case 2:
      return '8 hours'
    case 3:
      return '24 hours'
    case 4:
      return '1 week'
    case 5:
      return '1 month'
    case 6:
      return '3 months'
    case 7:
      return '1 year'
    case 8:
      return 'Indefinite'

    default:
      return 'Indefinite'
  }
})

function resetPoints() {
  investedSize.value = 0
  investedRequirement.value = 0
  investedTrigger.value = 0
  investedTier.value = 0
  investedEffect.value = 0
  investedNetwork.value = 0
}
</script>
