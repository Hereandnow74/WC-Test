<template>
  <div class="p-2 h-full scrollbar overflow-y-auto">
    <div v-if="boughtPerks['Alterzelu Symbiote']" class="flex flex-col gap-2">
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
        <Select v-model="activeDungeonInd" class="flex-grow" :options="dungeonList" :placeholder="dungeonList.length ? '': 'You don\'t have any symbiote bases yet'" />
        <Button v-if="activeDungeonInd !== ''" title="Remove Base" icon="fluent:delete-20-filled" @click="deleteDungeon(activeDungeonInd)" />
        <Button title="Add Base" icon="fluent:add-circle-16-regular" @click="addBase" />
      </div>
      <div v-if="activeDungeonInd !== ''">
        <div>Larva maturation time bonus: {{ 0 }}</div>
        <div>All units incubation time bonus: {{ 0 }}</div> (1 + 0,5) ^ N buildings / 20 + Leftover * 2.5
        <Foldable v-if="boughtPerks['Hatchery']" title="Hatcheries" :is-open="true" class="flex flex-col gap-1" title-style="text-amber-400">
          <div v-for="hatch, i in symbiotes[activeDungeonInd].Hatchery" :key="i">
            {{ hatch }}
          </div>
        </Foldable>
      </div>
    </div>
    <Desc v-else desc="You need to have a Alterzelu Symbiote perk to access this app." />
  </div>
</template>

<script lang="ts" setup>
import { orientation } from '~/logic'
import { useStore } from '~/store/store'
import { usePlayStore } from '~/store/play'
import { CHAR_COSTS } from '~/data/constants'

const { binding, companions } = useStore()
const { symbiotes, manualDevotees } = usePlayStore()

const activeDungeonInd = ref<number>(symbiotes.value.length ? 0 : '')
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

const dungeonList = computed(() => symbiotes.value.map((dungeon, i) => ({ label: dungeon.name, value: i })))

const availableDP = computed(() => {
  symbiotes.value[activeDungeonInd.value].used = Array(10).fill(0)
  const dev = minDevotees(usedDP.value)
  symbiotes.value[activeDungeonInd.value].used = dev
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

const usedDevotees = computed(() => symbiotes.value?.[activeDungeonInd.value]?.used ? arraySum(symbiotes.value) : Array(10).fill(0))

const boughtPerks = computed(() => {
  const perks = {
    'Alterzelu Symbiote': false,
    'Buzzers': false,
    'Floaters': false,
    'Globsters': false,
    'Skitterers': false,
    'Lingoth': false,
    'Linkor': false,
    'Linguu': false,
    'Ailgoth': false,
    'Ailkor': false,
    'Hatchery': false,
    'Nursery': false,
    'Grove': false,
    'Den': false,
    'Lair': false,
    'Burrow': false,
    'Nest': false,
    'Reef': false,
    'Evolution Chamber': false,
    'Guard Spire': false,
    'Colony': false,
    'Nexus': false,
    'Fortress': false,
    'Hive': false,
  }
  binding.value.forEach((perk) => {
    if (perks[perk.title] !== undefined)
      perks[perk.title as keyof typeof perks] = true
  })
  return perks
})

function addBase() {
  const name = `Base #${Math.floor(Math.random() * 1000)}`
  symbiotes.value.push({
    name,
    'used': Array(10).fill(0),
    'Hatchery': [{ name: 'Hatchery', count: 0, baseProduction: 160, nurseries: 0, bonusProduction: 0 }],
    'Nursery': [{ name: 'Nursery', count: 0 }],
    'Grove': [{ name: 'Grove', count: 0 }],
    'Den': [{ name: 'Den', count: 0 }],
    'Lair': [{ name: 'Lair', count: 0 }],
    'Burrow': [{ name: 'Burrow', count: 0 }],
    'Nest': [{ name: 'Nest', count: 0 }],
    'Reef': [{ name: 'Reef', count: 0 }],
    'Evolution Chamber': [{ name: 'Evolution Chamber', count: 0 }],
    'Guard Spire': [{ name: 'Guard Spire', count: 0 }],
    'Colony': [{ name: 'Colony', count: 0 }],
    'Nexus': [{ name: 'Nexus', count: 0 }],
    'Fortress': [{ name: 'Fortress', count: 0 }],
    'Hive': [{ name: 'Hive', count: 0 }],
  })
  activeDungeonInd.value = symbiotes.value.length - 1
}

function deleteDungeon(ind: number) {
  symbiotes.value.splice(ind, 1)
  symbiotes.value.length ? activeDungeonInd.value = 0 : activeDungeonInd.value = ''
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

function deleteAll() {
  symbiotes.value = []
  manualDevotees.value = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0 }
}
</script>
