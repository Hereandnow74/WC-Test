<template>
  <div class="p-1 h-full flex flex-col gap-2 min-h-0 scrollbar">
    <div class="flex gap-2 justify-center">
      <div border="t l r gray-500" class="rounded-t px-1 cursor-pointer hover:text-green-500" @click="tabIndex = 0">
        Main
      </div>
      <div border="t l r gray-500" class="rounded-t px-1 cursor-pointer hover:text-green-500" @click="tabIndex = 1">
        Jump log
      </div>
    </div>
    <div v-if="tabIndex === 0 && findIndex(miscPerks, {title: 'Exit Stage Left'}) != -1" class="min-h-0 overflow-y-auto scrollbar">
      <div
        class="flex flex-col gap-2"
      >
        <EditableProgressbar v-if="progress < 100" v-model="progress" />
        <div v-else class="flex flex-col gap-2">
          <div class="text-center">
            Choose your next world
          </div>
          <WorldCard v-for="world, i in rdnWorld" :key="world.worldName" :world="world" :pick-able="false" @click="chooseWorld(world, i)" />
        </div>
        <Button v-if="progress >= 100 && !rdnWorld.length" label="Jump To Next World" size="Small" @click="jumpToNextWorld" />
      </div>
    </div>
    <div v-if="tabIndex === 1" class="flex flex-col gap-4 overflow-y-auto scrollbar">
      <div>
        Manual Jumps
        <div class="flex gap-1">
          <InputWithSearch
            v-model="worldText"
            :list="Object.keys(worldObject)"
            placeholder="World Name"
            class="flex-grow"
          />
          <Checkbox v-model="jumplogAdd" label="Add to jump chain" />
          <Button size="Small" label="Jump" @click="jumpToManual" />
        </div>
      </div>
      <div>
        Current world
        <MiniWorldCard :world="currentWorld" />
      </div>
      <div class="flex flex-col gap-1 min-h-0">
        <div>Jump chain</div>
        <MiniWorldCard :world="startingWorld" />
        <MiniWorldCard v-for="world in jumpChain" :key="world.worldName" :world="world" />
      </div>
    </div>
    <Desc v-if="findIndex(miscPerks, {title: 'Exit Stage Left'}) === -1" :desc="`You don't have access to this app, you need to buy Exit Stage Left first`" />
    <div class="flex gap-2">
      <Button label="Back" icon="akar-icons:arrow-back-thick" size="Small" class="mx-auto" @click="toggleAppMode" />
      <Button
        v-if="tabIndex === 1"
        label="Clear Jump Chain"
        bg-color="bg-orange-500"
        size="Small"
        class="mx-auto"
        @click="clearJumpLog"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { findIndex } from 'lodash'
import { randomWorld, toggleAppMode } from '~/logic'
import { usePlayStore } from '~/store/play'
import { useStore } from '~/store/store'

import WorldCard from '~/components/WorldCard.vue'
import { confirmDialog } from '~/logic/dialog'
import { World } from '~/store/chargen'
import { allWorldsNoCondition } from '~/data/constatnts'
import Button from '~/components/basic/Button.vue'

const tabIndex = ref(0)

const { currentWorld, jumpChain, rdnWorld } = usePlayStore()
const { miscPerks, startingWorld } = useStore()

const progress = ref(0)
const jumplogAdd = ref(true)
const worldText = ref('')

const worldObject = {}
allWorldsNoCondition.value.forEach((x) => {
  const name = `${x.worldName} ${x.condition ? `(${x.condition})` : ''} DR${x.rating}`
  worldObject[name] = x
})

const manualWorld = computed(() => worldObject[worldText.value] || {})

const numberOfChoices = computed(() => {
  let val = 1
  if (findIndex(miscPerks.value, { title: 'Pursued by a Bear' }) !== -1)
    val = 3
  if (findIndex(miscPerks.value, { title: 'The Bigger Fish' }) !== -1)
    val = 7
  return val
})

const plus = computed(() => {
  let val = 1
  if (findIndex(miscPerks.value, { title: 'Pursued by a Bear' }) !== -1)
    val = 4
  if (findIndex(miscPerks.value, { title: 'The Bigger Fish' }) !== -1)
    val = 11
  return val
})
const minus = computed(() => {
  let val = 1
  if (findIndex(miscPerks.value, { title: 'The Bigger Fish' }) !== -1)
    val = 11
  return val
})

function jumpToNextWorld() {
  rdnWorld.value.splice(0)

  for (let i = 0; i < numberOfChoices.value; i++) {
    const wrd = randomWorld(currentWorld.value.rating, minus.value, plus.value)
    wrd.n = 0
    rdnWorld.value.push(wrd)
  }
}

async function chooseWorld(world: World, i: number) {
  if (!(await confirmDialog('Jump to the next world?'))) return
  progress.value = 0
  const saveWorld = { worldName: world.worldName, rating: world.rating }
  if (world.condition) saveWorld.condition = world.condition
  jumpChain.value.push(saveWorld)
  currentWorld.value = saveWorld
  rdnWorld.value.splice(i, 1)
  rdnWorld.value.forEach(x => x.n += 1)
  rdnWorld.value = rdnWorld.value.filter(x => x.n <= 2)
  while (rdnWorld.value.length < numberOfChoices.value) {
    const wrd = randomWorld(currentWorld.value.rating, minus.value, plus.value)
    wrd.n = 0
    rdnWorld.value.push(wrd)
  }
}

async function clearJumpLog() {
  if (!(await confirmDialog('If you clear the jump log credits lost due to Loan rules will not be refunded, continue?'))) return
  const saveWorld = { worldName: startingWorld.value.worldName, rating: startingWorld.value.rating }
  if (startingWorld.value.condition) saveWorld.condition = startingWorld.value.condition
  currentWorld.value = saveWorld
  jumpChain.value = []
}

function jumpToManual() {
  if (manualWorld.value.worldName) {
    currentWorld.value = manualWorld.value
    if (jumplogAdd.value)
      jumpChain.value.push(manualWorld.value)
    worldText.value = ''
  }
}
</script>
