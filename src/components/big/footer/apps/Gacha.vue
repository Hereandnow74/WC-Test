<template>
  <div class="p-1 flex flex-col gap-2 justify-between items-center h-full overflow-hidden">
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
    <!-- <div>
      <div v-for="roll, key in randomD" :key="key">
        {{ parseInt(key) + 1 }} : {{ roll }}
      </div>
      totalCost: {{ Object.values(randomD).reduce((a,x,i) => a += CHAR_COSTS[i] * x, 0) }}
    </div> -->
    <div class="flex gap-2 self-center">
      <Button label="Roll for 3c" size="Small" bg-color="bg-orange-400" @click="onePull" />
      <!-- <Button label="Roll for 3c" size="Small" bg-color="bg-orange-400" @click="testRandom" /> -->
      <Button v-if="orientation" label="10 pull for 30c" size="Small" bg-color="bg-purple-500" @click="tenPull" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { intersection } from 'lodash-es'
import { orientation, randomChar } from '~/logic'
import { CHAR_COSTS } from '~/data/constants'
import { useStore } from '~/store/store'

const { companions, fee } = useStore()

const chars = ref<any[]>([])

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

async function getRandomChar(fixedTier = 0) {
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
  const val = CHAR_COSTS[tier + 1] || 0
  const x = await randomChar(true, val, 1)
  if (companionsUIDs.value.has(x.u))
    return getRandomChar(fixedTier)
  chars.value.push(x)
  isRolling.value = true
  const sex = (intersection(x.b, ['F', 'M', 'O'])[0] || 'F') as 'F' | 'M' | 'O'
  companions.value.push({ uid: x.u, name: x.n, world: x.w, sex, tier: x.t, priceTier: 0, method: 'buy' })
  if (fee.value)
    fee.value += 3
  else
    fee.value = 3
  setTimeout(() => {
    isRolling.value = false
    isRevealing.value = true
  }, 3000)
  return tier
}

const randomD = ref({})

function testRandom() {
  for (let i = 0; i < 10000; i++) {
    let tier = 0
    const roll = Math.random()
    chances.forEach((x, i) => {
      if (roll <= x)
        tier = i
    })
    if (randomD.value[tier])
      randomD.value[tier] += 1
    else
      randomD.value[tier] = 1
  }
}

async function tenPull() {
  chars.value.splice(0)
  isTenPull.value = true
  let maxTier = 0
  for (let i = 0; i < 9; i++)
    maxTier = Math.max(await getRandomChar(), maxTier)
  if (maxTier < 4)
    maxTier = Math.max(await getRandomChar(3), maxTier)
  else
    maxTier = Math.max(await getRandomChar(), maxTier)
}

</script>
