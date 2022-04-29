<template>
  <div class="p-2 h-full scrollbar overflow-y-auto">
    <div v-if="boughtPerks['Dungeons']" class="flex flex-col gap-2">
      <div>
        <div class="flex items-center gap-1">
          List of devotees <span>(Total DP: <span class="font-semibold text-violet-400">{{ totalDevotionPoints }}</span>)</span> <fluent:wrench-16-filled class="cursor-pointer hover:text-green-400" @click="manualDevEdit = !manualDevEdit" />
        </div>
        <div class="grid gap-1" :class="orientation ? 'grid-cols-10':'grid-cols-5'">
          <div v-for="val, key in listDevoteesFull" :key="key" class="flex gap-1">
            <span>T{{ key }}: </span>
            <NumberInput v-if="manualDevEdit" :min="listDevotees[key]" :max="9999" :model-value="val" @update:modelValue="(e:number) => changeDevCount(e, key)" />
            <div v-else>
              <span class="text-blue-400">{{ val }}</span><span v-if="usedDevotees[10 - key]"> [<span text="red-500">-{{ usedDevotees[10 - key] }}</span>]</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex gap-1 items-center">
        <Select v-model="activeDungeonInd" class="flex-grow" :options="dungeonList" :placeholder="dungeonList.length ? '': 'You don\'t have dungeons yet'" />
        <Button v-if="activeDungeonInd !== ''" title="Remove Dungeon" icon="fluent:delete-20-filled" @click="deleteDungeon(activeDungeonInd)" />
        <Button title="Add Dungeon" icon="fluent:add-circle-16-regular" @click="addDungeon" />
      </div>
      <div v-if="activeDungeonInd !== ''">
        <div class="flex gap-1">
          <Input v-model="dungeons[activeDungeonInd].name" class="pb-2 flex-grow" label="Name" />
          <span v-if="usedDP">{{ usedDP }} / {{ availableDP }}</span>
        </div>
        <Foldable title="Floors" :is-open="true" class="flex flex-col gap-1" title-style="text-amber-400">
          <div class="flex gap-2">
            <NumberInput v-model="dungeons[activeDungeonInd].numFloors" class="whitespace-nowrap" :min="0" label="Number of floors" />
            <NumberInput v-model="dungeons[activeDungeonInd].floorSize" class="whitespace-nowrap" :min="0" label="Floor size" />
          </div>
          <div class="flex gap-2">
            <div>Floor size: {{ dungeons[activeDungeonInd].floorSize * 10 }}m²</div>
            <div>Total area: {{ dungeons[activeDungeonInd].floorSize * 10 * dungeons[activeDungeonInd].numFloors }}m²</div>
          </div>
          <div class="flex gap-1">
            Create a portal of tier:<NumberInput v-model="portalTier" :max="10" /><Button :disabled="true" title="Create Portal" icon="fluent:add-circle-16-regular" @click="createPortal" />
          </div>
          <div class="flex gap-1">
            Create trap <Select v-model="trapRank" :options="['Blue', 'Copper', 'Silver', 'Gold']" /><Button :disabled="true" title="Create Trap" icon="fluent:add-circle-16-regular" @click="createTrap" />
          </div>
        </Foldable>
        <Foldable v-if="boughtPerks['Spawning Room: Breeding Pits']" title="Spawning Room: Breeding Pits" title-style="text-amber-400" :is-open="true">
          <div class="flex gap-1">
            Create a monster of tier: <NumberInput v-model="monsterTier" :max="10" /><Toggle v-model="monsterUseBinding" label="Use Binding" /><Button :disabled="true" title="Create Portal" icon="fluent:add-circle-16-regular" @click="createMonster" />
          </div>
        </Foldable>
        <Foldable v-if="boughtPerks['Commerce Room: Hotel California']" title="Commerce Room: Hotel California" title-style="text-amber-400" :is-open="true">
          <div class="flex gap-1">
            Encourage tier: <NumberInput v-model="dungeons[activeDungeonInd].encourage" :min="0" :max="10" /> to enter
          </div>
        </Foldable>
        <Foldable v-if="boughtPerks['Broadcast Room: Eye of Sauron']" title="Broadcast Room: Eye of Sauron" title-style="text-amber-400" :is-open="true">
          <div class="flex gap-1">
            Invested DP in scrying <NumberInput v-model="dungeons[activeDungeonInd].scry" :min="0" :max="9999" />
          </div>
          <div v-if="dungeons[activeDungeonInd].scry >=5">
            Range of scrying is {{ Math.pow(2, Math.floor((dungeons[activeDungeonInd].scry - 5) / 5)).toLocaleString() }} km.
          </div>
        </Foldable>
        <Foldable v-if="boughtPerks['Lure Room: My Precious']" title="Lure Room: My Precious" title-style="text-amber-400" :is-open="true" class="flex flex-col gap-1">
          <div class="flex gap-1">
            Draw adventurers of <Select v-model="dungeons[activeDungeonInd].draw" :options="['No one', 'Blue', 'Copper', 'Silver', 'Gold']" />
          </div>
          <div class="flex gap-1">
            Range <Select v-model="dungeons[activeDungeonInd].range" :options="['Aware', 'Nearby', 'Region', 'Country', 'Continent', 'Planet', 'Infinite']" />
          </div>
          <div class="flex gap-1">
            Intensity of a draw <Select v-model="dungeons[activeDungeonInd].intensity" :options="['Curiosity','Strong', 'Risky', 'Suicidal']" />
          </div>
        </Foldable>
      </div>
    </div>
    <Desc v-else desc="You need to have a Dungeons perk to access this app." />
  </div>
</template>

<script lang="ts" setup>
import { orientation } from '~/logic'
import { useStore } from '~/store/store'
import { usePlayStore } from '~/store/play'
import { CHAR_COSTS } from '~/data/constants'

const { homePerks, companions } = useStore()
const { dungeons, manualDevotees } = usePlayStore()

const activeDungeonInd = ref<number>(dungeons.value.length ? 0 : '')
const manualDevEdit = ref(false)

const portalTier = ref(1)
const trapRank = ref('Blue')
const monsterTier = ref(1)
const monsterUseBinding = ref(false)

const listDevotees = computed(() => {
  const list = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0 } as Record<number, number>
  companions.value.forEach((companion) => {
    if (companion.role && companion.role === 'Devotee') list[companion.tier as keyof typeof list] += 1
  })
  return list
})

const listDevoteesFull = computed(() => {
  const list = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0 } as Record<number, number>
  for (let i = 1; i < 11; i++)
    list[i] = manualDevotees[i] + listDevotees.value[i]
  return list
})

const totalDevotionPoints = computed(() => Object.entries(listDevoteesFull.value).reduce((a, x) => a += CHAR_COSTS[x[0]] * x[1], 0))

const dungeonList = computed(() => dungeons.value.map((dungeon, i) => ({ label: dungeon.name, value: i })))

const drawCost = {
  'No one': 0,
  'Blue': 5,
  'Copper': 25,
  'Silver': 250,
  'Gold': 1000,
} as Record<string, number>

const rangeCost = {
  Aware: 0,
  Nearby: 5,
  Region: 10,
  Country: 15,
  Continent: 20,
  Planet: 30,
  Infinite: 50,
} as Record<string, number>

const intensityCost = {
  Curiosity: 0,
  Strong: 25,
  Risky: 75,
  Suicidal: 150,
} as Record<string, number>

const usedDP = computed(() => {
  let DP = 0
  DP += dungeons.value[activeDungeonInd.value].numFloors * 10
  DP += dungeons.value[activeDungeonInd.value].floorSize
  DP += CHAR_COSTS[dungeons.value[activeDungeonInd.value].encourage]
  DP += dungeons.value[activeDungeonInd.value].scry
  DP += drawCost[dungeons.value[activeDungeonInd.value].draw]
  DP += rangeCost[dungeons.value[activeDungeonInd.value].range]
  DP += intensityCost[dungeons.value[activeDungeonInd.value].intensity]
  return DP
})

const availableDP = computed(() => {
  dungeons.value[activeDungeonInd.value].used = Array(10).fill(0)
  const dev = minDevotees(usedDP.value)
  dungeons.value[activeDungeonInd.value].used = dev
  return dev.reduce((a, x, i) => a += CHAR_COSTS[10 - i] * x, 0)
})

const usedDevotees = computed(() => dungeons.value?.[activeDungeonInd.value]?.used ? dungeons.value[activeDungeonInd.value].used : Array(10).fill(0))

const boughtPerks = computed(() => {
  const perks = {
    'Dungeons': false,
    'Spawning Room: Breeding Pits': false,
    'Commerce Room: Hotel California': false,
    'Broadcast Room: Eye of Sauron': false,
    'Lure Room: My Precious': false,
  }
  homePerks.value.forEach((perk) => {
    if (Object.keys(perks).includes(perk.title))
      perks[perk.title as keyof typeof perks] = true
  })
  return perks
})

function addDungeon() {
  const name = `Dungeon #${dungeons.value.length + 1}`
  dungeons.value.push({
    name,
    floorSize: 0,
    numFloors: 0,
    encourage: 0,
    portals: [],
    traps: [],
    scry: 0,
    used: Array(10).fill(0),
    draw: 'No one',
    range: 'Aware',
    intensity: 'Curiosity',
  })
  activeDungeonInd.value = dungeons.value.length - 1
}

function deleteDungeon(ind: number) {
  dungeons.value.splice(ind, 1)
  dungeons.value.length ? activeDungeonInd.value = 0 : activeDungeonInd.value = ''
}

function changeDevCount(e: number, key: number) {
  manualDevotees[key] = e - listDevotees.value[key]
}

function minDevotees(dp: number) {
  const costs = [1000, 500, 200, 100, 50, 20, 10, 5, 2, 1]
  const availableDevotees = Object.values(listDevoteesFull.value).map((x, i) => x - usedDevotees.value[10 - i - 1])
  const devoteeNumber = Array(10).fill(0)
  const minDvF = (dp: number) => {
    if (!dp || dp === 0)
      return devoteeNumber
    for (let i = 0; i < 10; i++) {
      if (costs[i] <= dp && availableDevotees[10 - i - 1] > 0) {
        availableDevotees[10 - i - 1] -= 1
        devoteeNumber[i] += 1
        minDvF(dp - costs[i])
        // devoteeNumber = devoteeNumber.map((a, i) => a + sub_res[i])
        break
      }
    }
    return devoteeNumber
  }
  minDvF(dp)
  return devoteeNumber
}

function createPortal() {
  //
}

function createMonster() {
  //
}

function createTrap() {
  //
}
</script>
