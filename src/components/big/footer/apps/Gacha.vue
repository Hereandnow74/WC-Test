<template>
  <GachaSettings v-if="showSettings" @close="showSettings = false" />
  <div v-else class="p-1 flex flex-col gap-2 justify-between items-center h-full overflow-hidden">
    <div v-if="isTenPull" class="flex flex-col items-center h-full w-full overflow-y-auto scrollbar">
      <TransitionGroup class="grid grid-cols-5 my-auto gap-0.5 w-full min-h-0 h-max overflow-hidden" name="list" tag="div">
        <GachaCard
          v-for="char in chars"
          :key="char.u"
          :char="char"
          :is-rolling="isRolling"
          :is-revealing="isRevealing"
          :show-tags="false"
          text="xs"
          class="h-[300px] cursor-pointer"
        />
      </TransitionGroup>
    </div>
    <GachaCard
      v-else
      class="p-2 max-w-[350px] max-h-[600px] cursor-pointer"
      :char="chars[0]"
      :is-rolling="isRolling"
      :is-revealing="isRevealing"
    />
    <div class="flex gap-2 self-center items-center">
      <Button label="Roll for 3c" size="Small" bg-color="bg-orange-400" @click="onePull" />
      <Button v-if="orientation" label="10 pull for 30c" size="Small" bg-color="bg-purple-500" @click="tenPull" />
      <bi:gear-fill class="icon-btn" @click="showSettings = true" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { groupBy, intersection, random, sample } from 'lodash-es'
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
  0.00002,
  0.00001,
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

const randomLocations = [
  'Your Imagination',
  'Outer Space',
  'Outer World',
  'Ancient World',
  'Medieval World',
  'Prehistoric Time',
  'Different Planet',
  'Hidden Community',
  'Far Far Away',
  'Neverland',
  'A Place Behind Space',
  'Future Society',
]

interface CharacterInfo {
  firstName: string
  lastName: string
  gender: string
}

async function getCharacterInfo(): Promise<CharacterInfo> {
  try {
    const response = await fetch('https://randomuser.me/api/')
    const data = await response.json()

    if (data.results.length > 0) {
      const user = data.results[0]
      const characterInfo: CharacterInfo = {
        firstName: user.name.first,
        lastName: user.name.last,
        gender: user.gender,
      }
      return characterInfo
    }
    else {
      throw new Error('No character data available')
    }
  }
  catch (error) {
    throw new Error(`Failed to fetch character data: ${error.message}`)
  }
}

async function emptyRoll() {
  const randomPerson = await getCharacterInfo()
  chars.value.push({
    u: 999999,
    n: (`${randomPerson.firstName} ${randomPerson.lastName}`) || 'Nothing',
    t: random(100) > 75 ? 2 : 1,
    i: 'http://placehold.jp/525356/ffffff/400x600.png?text=Consolation%20Prize',
    s: '',
    w: randomLocations[random(randomLocations.length)] || 'Nowhere',
    b: [randomPerson.gender === 'male' ? 'M' : 'F'],
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
  if (gachaSettings.value.justRandom) {
    tier = random(0, 10)
  }
  else {
    if (fixedTier === 0) {
      const roll = Math.random()
      chances.forEach((x, i) => {
        if (roll <= x)
          tier = i
      })
    }
    else { tier = fixedTier }
  }
  const x = sample(charsByTier.value[tier + 1])
  if (!x) {
    return await emptyRoll()
  }
  else {
    if (companionsUIDs.value.has(x.u))
      return await emptyRoll()
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
