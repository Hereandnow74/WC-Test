<template>
  <div class="p-2 h-full scrollbar overflow-y-auto">
    <div v-if="boughtPerks['Dungeons']" class="flex flex-col gap-2">
      <div>
        <div class="flex items-center gap-1">
          List of devotees <span>(Total DP: <span class="font-semibold text-violet-400">{{ totalDevotionPoints }}</span>)</span>
          <fluent:wrench-16-filled class="cursor-pointer hover:text-green-400" @click="manualDevEdit = !manualDevEdit" />
          <fluent:delete-20-filled class="cursor-pointer hover:text-red-400" title="Delete all dungeons" @click="deleteAll()" />
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
          <span v-if="usedDP" :class="usedDP > availableDP ? 'text-red-400' : 'text-green-400'">{{ usedDP }} / {{ availableDP }}</span>
        </div>
        <Foldable :title="`Floors [-${floorsDP}]`" :is-open="true" class="flex flex-col gap-1" title-style="text-amber-400">
          <div class="flex gap-2">
            <NumberInput v-model="dungeons[activeDungeonInd].numFloors" class="whitespace-nowrap" :min="0" label="Number of floors" />
            <NumberInput v-model="dungeons[activeDungeonInd].floorSize" class="whitespace-nowrap" :min="0" label="Floor size" />
          </div>
          <div class="flex gap-2">
            <div>Floor size: {{ dungeons[activeDungeonInd].floorSize * 10 }}m²</div>
            <div>Total area: {{ dungeons[activeDungeonInd].floorSize * 10 * dungeons[activeDungeonInd].numFloors }}m²</div>
          </div>
          <div class="flex gap-1 text-violet-400">
            Create a portal of tier:<NumberInput v-model="portalTier" :max="10" /><Button title="Create Portal" icon="fluent:add-circle-16-regular" @click="createPortal" />
          </div>
          <div class="flex flex-col gap-1">
            <div v-for="portal, i in dungeons[activeDungeonInd].portals" :key="i" class="flex gap-1">
              <Input v-model="portal.name" class="flex-grow" />
              <NumberInput v-model="portal.tier" :max="10" label="Tier" />
              <Button title="Delete Portal" icon="fluent:delete-20-filled" @click="dungeons[activeDungeonInd].portals.splice(i, 1)" />
            </div>
          </div>
          <div class="flex gap-1 text-violet-400">
            Create a trap <Select v-model="trapRank" :options="['Blue', 'Copper', 'Silver', 'Gold']" /><Button title="Create Trap" icon="fluent:add-circle-16-regular" @click="createTrap" />
          </div>
          <div class="flex flex-col gap-1">
            <div v-for="trap, i in dungeons[activeDungeonInd].traps" :key="i" class="flex gap-1">
              <Input v-model="trap.name" class="flex-grow" />
              Rank: {{ trap.rank }}
              <Button title="Delete Trap" icon="fluent:delete-20-filled" @click="dungeons[activeDungeonInd].traps.splice(i, 1)" />
            </div>
          </div>
        </Foldable>
        <Foldable v-if="boughtPerks['Spawning Room: Breeding Pits']" :title="`Spawning Room: Breeding Pits [-${pitsDP}]`" title-style="text-amber-400" :is-open="true">
          <div class="flex gap-1 text-violet-400">
            Create a monster of tier: <NumberInput v-model="monsterTier" :max="10" /><Toggle v-model="monsterUseBinding" label="Use Binding" /><Button title="Create Portal" icon="fluent:add-circle-16-regular" @click="createMonster" />
          </div>
          <div class="flex flex-col gap-1 pt-1">
            <div v-for="monster, i in dungeons[activeDungeonInd].monsters" :key="i" class="flex gap-1">
              <Input v-model="monster.name" class="flex-grow" />
              <NumberInput v-model="monster.tier" :max="10" label="Tier" />
              <span v-if="monster.binding">Can Bind</span>
              <Button title="Delete Monster" icon="fluent:delete-20-filled" @click="dungeons[activeDungeonInd].monsters.splice(i, 1)" />
            </div>
          </div>
        </Foldable>
        <Foldable v-if="boughtPerks['Commerce Room: Hotel California']" :title="`Commerce Room: Hotel California [-${hotelDP}]`" title-style="text-amber-400" :is-open="true">
          <div class="flex gap-1">
            Encourage tier: <NumberInput v-model="dungeons[activeDungeonInd].encourage" :min="0" :max="10" /> to enter
          </div>
        </Foldable>
        <Foldable v-if="boughtPerks['Broadcast Room: Eye of Sauron']" :title="`Broadcast Room: Eye of Sauron [-${eyeDP}]`" title-style="text-amber-400" :is-open="true">
          <div class="flex gap-1">
            Invested DP in scrying <NumberInput v-model="dungeons[activeDungeonInd].scry" :increment="5" :min="0" :max="9999" />
          </div>
          <div v-if="dungeons[activeDungeonInd].scry >=5">
            Range of scrying is {{ Math.pow(2, Math.floor((dungeons[activeDungeonInd].scry - 5) / 5)).toLocaleString() }} km.
          </div>
        </Foldable>
        <Foldable v-if="boughtPerks['Lure Room: My Precious']" :title="`Lure Room: My Precious [-${lureDP}]`" title-style="text-amber-400" :is-open="true" class="flex flex-col gap-1">
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
    list[i] = manualDevotees.value[i] + listDevotees.value[i]
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

const trapCost = {
  Blue: 5,
  Copper: 25,
  Silver: 250,
  Gold: 1000,
} as Record<string, number>

const floorsDP = computed(() => {
  let DP = 0
  DP += dungeons.value[activeDungeonInd.value].numFloors * 10
  DP += dungeons.value[activeDungeonInd.value].floorSize
  dungeons.value[activeDungeonInd.value].portals.forEach(x => DP += CHAR_COSTS[x.tier])
  dungeons.value[activeDungeonInd.value].traps.forEach(x => DP += trapCost[x.rank])
  return DP
})
const pitsDP = computed(() => {
  let DP = 0
  dungeons.value[activeDungeonInd.value].monsters.forEach(x => DP += CHAR_COSTS[x.tier] * (x.binding ? 1.5 : 1))
  return DP
})
const hotelDP = computed(() => {
  let DP = 0
  DP += CHAR_COSTS[dungeons.value[activeDungeonInd.value].encourage]
  return DP
})
const eyeDP = computed(() => {
  let DP = 0
  DP += dungeons.value[activeDungeonInd.value].scry
  return DP
})
const lureDP = computed(() => {
  let DP = 0
  DP += drawCost[dungeons.value[activeDungeonInd.value].draw]
  DP += rangeCost[dungeons.value[activeDungeonInd.value].range]
  DP += intensityCost[dungeons.value[activeDungeonInd.value].intensity]
  return DP
})

const usedDP = computed(() => {
  let DP = 0

  DP += floorsDP.value
  DP += pitsDP.value
  DP += hotelDP.value
  DP += eyeDP.value
  DP += lureDP.value

  return DP
})

const availableDP = computed(() => {
  dungeons.value[activeDungeonInd.value].used = Array(10).fill(0)
  const dev = minDevotees(usedDP.value)
  dungeons.value[activeDungeonInd.value].used = dev
  return dev.reduce((a, x, i) => a += CHAR_COSTS[10 - i] * x, 0)
})

function arraySum(array: any[]) {
  const res = Array(10).fill(0)
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < 10; j++)
      res[j] += array[i].used[j]
  }
  return res
}

const usedDevotees = computed(() => dungeons.value?.[activeDungeonInd.value]?.used ? arraySum(dungeons.value) : Array(10).fill(0))

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
  const name = `Dungeon #${Math.floor(Math.random() * 1000)}`
  dungeons.value.push({
    name,
    floorSize: 0,
    numFloors: 0,
    encourage: 0,
    portals: [],
    traps: [],
    monsters: [],
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
  manualDevotees.value[key] = e - listDevotees.value[key]
}

function minDevotees(dp: number) {
  const costs = [1000, 500, 200, 100, 50, 20, 10, 5, 2, 1]
  const availableDevotees = Object.values(listDevoteesFull.value).map((x, i) => x - usedDevotees.value[10 - i - 1])
  const devoteeNumber = Array(10).fill(0)
  const minDvF = (dp: number) => {
    if (!dp || dp === 0)
      return devoteeNumber
    for (let i = 0; i < 10; i++) {
      if (availableDevotees[10 - i - 1] > 0 && costs[i] <= dp) {
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
  dungeons.value[activeDungeonInd.value].portals.push({
    name: `Portal ${dungeons.value[activeDungeonInd.value].portals.length + 1}`,
    tier: portalTier.value,
  })
}

function createMonster() {
  dungeons.value[activeDungeonInd.value].monsters.push({
    name: `Monster ${dungeons.value[activeDungeonInd.value].monsters.length + 1}`,
    tier: monsterTier.value,
    binding: monsterUseBinding.value,
  })
}

function createTrap() {
  dungeons.value[activeDungeonInd.value].traps.push({
    name: `Trap ${dungeons.value[activeDungeonInd.value].traps.length + 1}`,
    rank: trapRank.value,
  })
}

function deleteAll() {
  dungeons.value = []
  manualDevotees.value = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0 }
}
</script>
