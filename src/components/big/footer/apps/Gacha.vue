<template>
  <GachaSettings v-if="showSettings" @close="showSettings = false" />
  <div v-else class="p-1 flex flex-col gap-2 justify-between items-center h-full overflow-hidden">
    <TransitionGroup v-if="isTenPull" class="grid grid-cols-5 my-auto gap-0.5 w-full h-full flex-grow" name="list" tag="div">
      <GachaCard
        v-for="char, i in chars"
        :key="char.u"
        :char="char"
        :is-rolling="isRolling"
        :is-revealing="isRevealing"
        :show-tags="false"
        text="xs"
        class="max-h-[300px] cursor-pointer"
        @click="(companions.splice(companions.length - chars.length + i , 1), chars.splice(i, 1))"
      />
    </TransitionGroup>
    <GachaCard
      v-else
      class="p-2 max-w-[350px] max-h-[600px] cursor-pointer"
      :char="chars[0]"
      :is-rolling="isRolling"
      :is-revealing="isRevealing"
      @click="(companions.splice(companions.length - 1, 1), chars.splice(0))"
    />
    <div class="flex gap-2 self-center items-center">
      <Button label="Roll for 3c" size="Small" bg-color="bg-orange-400" @click="onePull" />
      <Button v-if="orientation" label="10 pull for 30c" size="Small" bg-color="bg-purple-500" @click="tenPull" />
      <bi:gear-fill class="icon-btn" @click="showSettings = true" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { groupBy, intersection, sample } from 'lodash-es'
import { orientation, randomChar } from '~/logic'
import { CHAR_COSTS, useAllChars } from '~/data/constants'
import { useStore } from '~/store/store'
import { usePlayStore } from '~/store/play'

const { companions, fee } = useStore()
const { gachaSettings } = usePlayStore()
const { allCharsComp } = useAllChars()

const chars = ref<any[]>([])
const showSettings = ref(false)

const chances = [
  1,
  0.5,
  0.2428,
  0.1114,
  0.04,
  0.0166,
  0.0081,
  0.00408,
  0.00163,
  0.000757,
  0.00009,
]

const isRolling = ref(false)
const isRevealing = ref(false)
const isTenPull = ref(false)

function onePull() {
  chars.value.splice(0)
  isTenPull.value = false
  getRandomChar()
}

const companionsUIDs = computed(() => new Set(companions.value.map(x => x.uid)))

const suitableChars = computed(() => {
  return allCharsComp.value.filter(char => char.i && char.i.length && (gachaSettings.value.useWhiltelist && gachaSettings.value.whitelist.length ? gachaSettings.value.whitelist.includes(char.w) || gachaSettings.value.whitelist.includes(char.d) : true) && (gachaSettings.value.whitelist && gachaSettings.value.tagList.length ? intersection(gachaSettings.value.tagList, char.b).length : true))
})

const charsByTier = computed(() => groupBy(suitableChars.value, 't'))

function emptyRoll() {
  chars.value.push({
    u: 999999,
    n: 'Nothing',
    t: 1,
    i: 'http://placehold.jp/525356/ffffff/400x600.png?text=Nothing',
    s: '',
    w: 'Nowhere',
    b: [],
    d: '',
  })
  isRolling.value = true
  if (fee.value)
    fee.value += gachaSettings.value.rollCost
  else
    fee.value = gachaSettings.value.rollCost
  setTimeout(() => {
    isRolling.value = false
    isRevealing.value = true
  }, 3000)
  return 0
}

async function getRandomChar(fixedTier = 0): Promise<number> {
  isRevealing.value = false
  let tier = 0
  if (fixedTier === 0) {
    const roll = Math.random()
    chances.forEach((x, i) => {
      if (roll <= x)
        tier = i
    })
  }
  else { tier = fixedTier }
  const x = sample(charsByTier.value[tier + 1])
  if (!x) {
    return emptyRoll()
  }
  else {
    if (companionsUIDs.value.has(x.u))
      return emptyRoll()
    chars.value.push(x)
    isRolling.value = true
    const sex = (intersection(x.b, ['F', 'M', 'O'])[0] || 'F') as 'F' | 'M' | 'O'
    companions.value.push({ uid: x.u, name: x.n, world: x.w, sex, tier: x.t, priceTier: 0, method: 'buy' })
    if (fee.value)
      fee.value += gachaSettings.value.rollCost
    else
      fee.value = gachaSettings.value.rollCost
    setTimeout(() => {
      isRolling.value = false
      isRevealing.value = true
    }, 3000)
  }
  return tier
}

async function tenPull() {
  chars.value.splice(0)
  isTenPull.value = true
  let maxTier = 0
  for (let i = 0; i < 9; i++)
    maxTier = Math.max(await getRandomChar(), maxTier)
  if (maxTier < gachaSettings.value.minTierForTen)
    maxTier = Math.max(await getRandomChar(gachaSettings.value.minTierForTen - 1), maxTier)
  else
    maxTier = Math.max(await getRandomChar(), maxTier)
}

</script>
