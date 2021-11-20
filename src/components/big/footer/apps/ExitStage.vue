<template>
  <div class="p-2 h-full min-h-0 overflow-y-auto scrollbar">
    <div
      v-if="findIndex(miscPerks, {title: 'Exit Stage Left'}) !== -1"
      class="flex flex-col gap-2"
    >
      <div class="text-center">
        Plot progress
      </div>
      <div class="flex gap-1">
        <Button
          ref="minusButton"
          label=""
          icon="akar-icons:minus"
          bg-color="bg-transparent hover:(bg-opacity-10 bg-white)"
          class="!text-red-500"
        />
        <ProgressBar class="w-full" :percent="progress" />
        <Button
          ref="plusButton"
          label=""
          icon="akar-icons:plus"
          bg-color="bg-transparent hover:(bg-opacity-10 bg-white)"
          class="!text-green-500"
        />
      </div>
      <div v-if="rdnWorld.length" class="flex flex-col gap-2">
        <div class="text-center">
          Your next World is
        </div>
        <WorldCard v-for="world in rdnWorld" :key="world.worldName" :world="world" :pick-able="false" />
      </div>
      <Button v-if="progress >= 100" label="Jump To Next World" size="Small" @click="jumpToNextWorld" />
    </div>
    <Desc v-else :desc="`You don't have access to this app, you need to buy Exit Stage Left first`" />
    <Button label="Back" icon="akar-icons:arrow-back-thick" size="Small" class="mt-4 mx-auto" @click="toggleAppMode" />
  </div>
</template>

<script lang="ts" setup>
import { findIndex } from 'lodash'
import { randomWorld, toggleAppMode } from '~/logic'
import { usePlayStore } from '~/store/play'
import { useStore } from '~/store/store'

import WorldCard from '~/components/WorldCard.vue'

const plusButton = ref(null)
const minusButton = ref(null)
const { pressed: plusPressed } = useMousePressed({ target: plusButton })
const { pressed: minusPressed } = useMousePressed({ target: minusButton })

const { currentWorld, jumpChain } = usePlayStore()
const { miscPerks, companions } = useStore()
const rdnWorld = ref<any[]>([])

const progress = ref(companions.value.filter(x => x.method === 'capture').length * 10)

let timer: any = null

watch(plusPressed, () => {
  if (plusPressed.value) timer = setInterval(() => progress.value += 1, 25)
  else
    clearInterval(timer)
})

watch(minusPressed, () => {
  if (minusPressed.value) timer = setInterval(() => progress.value -= 1, 25)
  else
    clearInterval(timer)
})

function jumpToNextWorld() {
  progress.value = 0
  rdnWorld.value.splice(0)

  let numberOfChoices = 1
  let plus = 1
  let minus = 1
  if (findIndex(miscPerks.value, { title: 'Pursued by a Bear' }) !== -1) {
    numberOfChoices = 3
    plus = 4
  }
  if (findIndex(miscPerks.value, { title: 'The Bigger Fish' }) !== -1) {
    numberOfChoices = 7
    plus = 11
    minus = 11
  }

  for (let i = 0; i < numberOfChoices; i++)
    rdnWorld.value.push(randomWorld(currentWorld.value.rating, minus, plus))

  // currentWorld.value = { worldName: rdnWorld.value.worldName, rating: rdnWorld.value.rating }
  // jumpChain.value.push({ worldName: rdnWorld.value.worldName, rating: rdnWorld.value.rating })
}
</script>
