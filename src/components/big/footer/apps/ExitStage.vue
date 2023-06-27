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
    <div v-if="tabIndex === 0 && findIndex(miscPerks, {title: 'Exit Stage Left'}) != -1" class="min-h-0 overflow-y-auto scrollbar pb-2">
      <div
        class="flex flex-col gap-2"
      >
        <template v-if="progress < 100">
          <EditableProgressbar v-model="progress" />
          <Button class="self-center px-2" size="Small" label="fill" bg-color="bg-teal-600" @click="progress = 100" />
        </template>
        <div v-else class="flex flex-col gap-2">
          <div class="flex justify-center gap-2">
            <span>Choose your next world</span>
            <Button size="Small" label="Reroll" bg-color="bg-amber-500" @click="reroll" />
          </div>
          <div v-for="world, i in rdnWorld" :key="world.worldName" class="flex gap-1 px-1">
            <WorldCard :world="world" :pick-able="false" :type="world.type === 'canon' ? 'canon' : 'user'" @click="chooseWorld(world, i)" />
            <div v-if="isBear" class="flex flex-col justify-between bg-gray-700 rounded-xl py-2">
              <fluent:save-24-regular
                v-if="(world.save || !areSaved) && !world.remove"
                class="hover:text-green-500 cursor-pointer"
                :class="{'text-green-500': world.save}"
                @click="world.save = !world.save"
              />
              <fluent:delete-20-filled
                v-if="(world.remove || !areRemoved) && !world.save"
                class="hover:text-red-500 cursor-pointer"
                :class="{'text-red-500': world.remove}"
                @click="world.remove = !world.remove"
              />
            </div>
          </div>
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
import { findIndex, some } from 'lodash-es'
import { randomWorld } from '~/logic'
import { usePlayStore } from '~/store/play'
import { useStore } from '~/store/store'

import { confirmDialog } from '~/logic/dialog'
import { useChargenStore, World } from '~/store/chargen'
import { allWorldsNoCondition } from '~/data/constants'

const tabIndex = ref(0)

const { jumpChain, rdnWorld } = usePlayStore()
const { currentWorld } = useChargenStore()
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

const isBear = computed(() => findIndex(miscPerks.value, { title: 'Pursued by a Bear' }) !== -1)

const areSaved = computed(() => some(rdnWorld.value, { save: true }))
const areRemoved = computed(() => some(rdnWorld.value, { remove: true }))

const numberOfChoices = computed(() => {
  let val = 1
  if (isBear.value)
    val = 7
  return val
})

const plus = computed(() => {
  let val = 1
  if (isBear.value)
    val = 11
  return val
})

const minus = computed(() => {
  let val = 1
  if (isBear.value)
    val = 11
  return val
})

function jumpToNextWorld() {
  rdnWorld.value = randomWorld(currentWorld.value.rating, minus.value, plus.value, numberOfChoices.value)
}

async function chooseWorld(world: World, i: number) {
  if (!(await confirmDialog('Jump to the next world?'))) return
  progress.value = 0
  const saveWorld = { worldName: world.worldName, rating: world.rating }
  if (world.condition) saveWorld.condition = world.condition
  jumpChain.value.push(saveWorld)
  currentWorld.value = saveWorld
  rdnWorld.value.splice(i, 1)
  rdnWorld.value.forEach((x) => {
    if (x.save) {
      x.n = 1
      return
    }
    if (x.n)
      x.n += 1
    else
      x.n = 1
    if (x.remove) x.n = 3
  })
  rdnWorld.value = rdnWorld.value.filter(x => x.n <= 2)
  rdnWorld.value.push(...randomWorld(currentWorld.value.rating, minus.value, plus.value, numberOfChoices.value - rdnWorld.value.length, jumpChain.value))
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

async function reroll() {
  if (await confirmDialog('You can\'t reroll by the catalog rules, this function was created for your convenience in the case when you don\'t know any of the suggested worlds.'))
    rdnWorld.value = randomWorld(currentWorld.value.rating, minus.value, plus.value, numberOfChoices.value, jumpChain.value)
}
</script>
