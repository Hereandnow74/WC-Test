<template>
  <Modal label="Slightly used" class="z-10 text-gray-800 dark:text-gray-200" @click="$emit('click')">
    <h3
      class="text-xl text-center text-gray-500 dark:text-gray-400 flex gap-2 justify-center items-center px-2"
      title="Information for author"
      @click="author = !author"
    >
      Slightly used <span class="text-gray-800 dark:text-gray-200 font-semibold">{{ char.name }}</span>
      <akar-icons:eye-open v-if="author" class="cursor-pointer hover:text-green-500" />
      <akar-icons:eye-slashed v-else class="cursor-pointer hover:text-green-500" />
    </h3>
    <div class="p-2 text-lg flex flex-col gap-4 w-min">
      <div v-if="author && !bought" class="border-2 border-red-500 p-1 rounded text-sm">
        Rolls information are only for the author, contractor only see the cost. If you don't take the deal and close the window, you won't be able to see even the cost as a contractor for 24 hours.
      </div>
      <div v-for="data, i in usedWaifus" :key="data.ability" class="flex gap-4 items-center transition-opacity duration-300" :class="{'opacity-0': !visibility[i]}">
        <div class="">
          <div class="flex gap-4 justify-between">
            <div>Ability roll: <span class="text-green-500">{{ author ? data.ability : '??' }}</span></div>
            <div>Trauma roll: <span class="text-green-500">{{ author ? data.trauma : '??' }}</span></div>
          </div>
          <div class="flex gap-4 justify-between">
            <div class="whitespace-nowrap">
              Ability tier: <span class="text-green-500">+{{ author ? data.tier : '??' }}</span>
            </div>
            <div class="whitespace-nowrap">
              Trauma tier: <span class="text-green-500">-{{ author ? data.traumaTier : '??' }}</span>
            </div>
          </div>
          <div class="flex gap-4 justify-between">
            <div>Effective tier: <span class="text-orange-400">{{ author ? data.effectiveTier : '??' }}</span></div>
          </div>
        </div>
        <Button :disabled="bought" size="Small" bg-color="bg-violet-600 mx-auto my-4 whitespace-nowrap" :label="`buy for ${data.cost}`" @click="buyUsed(data, i)" />
      </div>
    </div>
  </Modal>
</template>

<script lang='ts' setup>
import { random } from 'lodash-es'
import { CHAR_COSTS } from '~/data/constants'

const props = defineProps({
  char: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['buyUsed', 'click'])

const author = ref(false)
const bought = ref(false)
const visibility = ref([true, true, true])

function slightlyTier(n: number, tier: number, isTrauma: boolean): number {
  const plus = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [3, 2, 1, 0, 0, 0, 0, 0, 0, 0],
    [4, 3, 2, 1, 0, 0, 0, 0, 0, 0],
    [5, 4, 3, 2, 1, 0, 0, 0, 0, 0],
    [6, 5, 4, 3, 2, 1, 0, 0, 0, 0],
    [7, 6, 5, 4, 3, 2, 1, 0, 0, 0],
    [8, 7, 6, 5, 4, 3, 2, 1, 0, 0],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
  ]
  if (n < 8) return isTrauma ? 0 : 0
  if (n >= 9 && n <= 11) return isTrauma ? 0 : plus[1][tier - 1]
  if (n >= 12 && n <= 14) return isTrauma ? 0 : plus[2][tier - 1]
  if (n >= 15 && n <= 17) return isTrauma ? 0 : plus[3][tier - 1]
  if (n >= 18 && n <= 20) return isTrauma ? 0 : plus[4][tier - 1]
  if (n >= 21 && n <= 23) return isTrauma ? 1 : plus[5][tier - 1]
  if (n >= 24 && n <= 26) return isTrauma ? 1 : plus[6][tier - 1]
  if (n >= 27 && n <= 29) return isTrauma ? 2 : plus[7][tier - 1]
  if (n >= 30 && n <= 32) return isTrauma ? 2 : plus[8][tier - 1]
  if (n >= 33 && n <= 35) return isTrauma ? 3 : plus[9][tier - 1]
  return isTrauma ? 3 : plus[10][tier - 1]
}

function slightlyUsed(char: any) {
  const ability = random(1, 6) + random(1, 6) + random(1, 6) + random(1, 6) + random(1, 6) + random(1, 6)
  const trauma = random(1, 6) + random(1, 6) + random(1, 6) + random(1, 6) + random(1, 6) + random(1, 6)
  return {
    ability,
    trauma,
    tier: slightlyTier(ability, char.tier, false),
    traumaTier: slightlyTier(trauma, char.tier, true),
  }
}

const usedWaifus = computed(() => {
  let res = []
  res.push(slightlyUsed(props.char))
  res.push(slightlyUsed(props.char))
  res.push(slightlyUsed(props.char))
  res = res.map(x => ({
    ...x,
    cost: props.char.tier + x.tier - x.traumaTier === 11 ? 'T11 ticket' : CHAR_COSTS[props.char.tier + x.tier - x.traumaTier] || 1,
    effectiveTier: props.char.tier + x.tier,
  }))
  return res
})

function buyUsed(data: typeof usedWaifus.value[0], index: number) {
  if (bought.value) return
  visibility.value = visibility.value.map((_, i) => i === index)
  bought.value = true
  author.value = true
  emit('buyUsed', data)
}

</script>
