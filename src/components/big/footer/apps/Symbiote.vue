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
        <Button v-if="activeDungeonInd !== undefined" title="Remove Base" icon="fluent:delete-20-filled" @click="deleteDungeon(activeDungeonInd)" />
        <Button title="Add Base" icon="fluent:add-circle-16-regular" @click="addBase" />
      </div>
      <div v-if="activeDungeonInd !== undefined">
        <div class="flex gap-1">
          <Input v-model="symbiotes[activeDungeonInd].name" class="pb-2 flex-grow" label="Name" />
          <span v-if="usedDP" :class="usedDP > availableDP ? 'text-red-400' : 'text-green-400'">{{ usedDP }} / {{ availableDP }}</span>
        </div>
        <Foldable title="Your army" title-style="text-amber-400">
          <div class="text-green-500 flex flex-wrap gap-x-2 gap-y-1">
            <NumberInput v-model="symbiotes[activeDungeonInd].buzzers" label="Buzzers" :min="0" :increment="24" />
            <NumberInput v-model="symbiotes[activeDungeonInd].floater" label="Floaters" :min="0" :increment="4" />
            <NumberInput v-model="symbiotes[activeDungeonInd].globsters" label="Globsters" :min="0" :increment="16" />
            <NumberInput v-model="symbiotes[activeDungeonInd].skitterers" label="Skitterers" :min="0" :increment="8" />
            <NumberInput v-model="symbiotes[activeDungeonInd].Lingoth" label="Lingoth" :min="0" :increment="1" />
            <NumberInput v-model="symbiotes[activeDungeonInd].Linkor" label="Linkor" :min="0" :increment="1" />
            <NumberInput v-model="symbiotes[activeDungeonInd].Linguu" label="Linguu" :min="0" :increment="1" />
            <NumberInput v-model="symbiotes[activeDungeonInd].Ailgoth" label="Ailgoth" :min="0" :increment="1" />
            <NumberInput v-model="symbiotes[activeDungeonInd].Ailkor" label="Ailkor" :min="0" :increment="1" />
          </div>
        </Foldable>
        <div v-if="boughtPerks['Hatchery']" title="" class="flex flex-col gap-1">
          <Button
            v-if="boughtPerks['Lair']"
            label="Add new Creep zone"
            title=""
            size="Small"
            class="mt-2 self-start px-4"
            bg-color="bg-purple-700"
            @click="addZone"
          />
          <div class="flex flex-col gap-4">
            <Foldable
              v-for="base, i in symbiotes[activeDungeonInd].bases"
              :key="i"
              v-auto-animate
              :title="`Creep Zone #${ i+1 } [<span class='text-green-300'>${totalCreepZone[i]}km²</span>/<span class='text-red-300'>${usedFootprint[i] >= 1000000 ? (usedFootprint[i] / 1000000).toFixed(1) + 'km²' : usedFootprint[i] + 'm²'}</span>]`"
              :is-open="true"
              class="flex flex-col gap-2"
              title-style="text-amber-400 text-xl"
            >
              <template #buttons>
                <fluent:delete-20-filled class="text-gray-400 hover:text-red-500 cursor-pointer" @click="deleteZone(i)" />
              </template>
              <Foldable v-auto-animate :title="`Larva maturation time is <span class='text-pink-300'>${Math.floor(maturationTimeBonus[i] * 100000) / 1000}%</span> from the base`" title-style="text-amber-400">
                <table class="unitsTable">
                  <thead>
                    <th>Name</th>
                    <th>Base</th>
                    <th>Usable</th>
                    <th>Adult</th>
                    <th>Elder</th>
                  </thead>
                  <tbody>
                    <tr v-for="info, unit in unitsInfo" :key="unit">
                      <td class="text-green-500">
                        {{ unit }}
                      </td>
                      <td><span class="text-blue-300">{{ toReadableTime(info.junior) }}</span></td>
                      <td><span class="text-blue-300">{{ toReadableTime(info.junior * maturationTimeBonus[i]) }}</span></td>
                      <td>
                        <span v-if="info.adult">
                          <span class="text-blue-300">{{ toReadableTime(info.adult * maturationTimeBonus[i]) }}</span>
                        </span>
                      </td>
                      <td>
                        <span v-if="info.elder">
                          <span class="text-blue-300">{{ toReadableTime(info.elder * maturationTimeBonus[i]) }}</span>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Foldable>
              <Foldable v-auto-animate :title="`Units production estimates`" title-style="text-amber-400">
                <div class="bg-gray-700 p-1 flex flex-col gap-1">
                  <div>Total clutch production capacity: <span class="text-teal-200">{{ totalClutchCapacity[i] }}</span></div>
                  <div></div>
                  <table class="unitsTable">
                    <thead>
                      <th>Name</th>
                      <th>Max produced at once</th>
                    </thead>
                    <tbody>
                      <tr v-for="info, unit in unitsInfo" :key="unit">
                        <td class="text-green-500">
                          {{ unit }}
                        </td>
                        <td>
                          <span class="text-green-300">{{ info.clutch * totalClutchCapacity[i] }}</span> in
                          <span class="text-blue-300">{{ toReadableTime(twoWeeks * incubationTimeBonus[i]) }}</span> +
                          <span class="text-blue-300">{{ toReadableTime(info.junior * maturationTimeBonus[i]) }}</span> =
                          <span class="text-violet-300">{{ toReadableTime(info.junior * maturationTimeBonus[i] + twoWeeks * incubationTimeBonus[i]) }}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div>If you have a Lair and focus all your production towards Globsters or/and Skitterers you can generate up to <span class="text-violet-400">{{ Math.floor(((unitsInfo.Skitterers.clutch * totalClutchCapacity[i] / 4)) * (86400 / (twoWeeks * incubationTimeBonus[i]))) }}</span> DP on average in a day.</div>
                </div>
              </Foldable>
              <div class="flex gap-2">
                {{ base.type }}
                [ DP: <span class="text-violet-400">{{ baseCost[i] }}</span> Footprint: <span class="text-blue-300">{{ basePrint[i] }}m²</span>]
                <Button
                  v-if="base.type === 'Hatchery' && boughtPerks['Lair'] && (!isLair || isColony)"
                  label="Upgrade"
                  title="Upgrade to Lair"
                  size="Small"
                  @click="base.type = 'Lair'"
                />
                <Button
                  v-if="base.type === 'Lair' && boughtPerks['Colony'] && (!isColony || isHive)"
                  label="Upgrade"
                  title="Upgrade to Colony"
                  size="Small"
                  @click="base.type = 'Colony'"
                />
                <Button
                  v-if="base.type === 'Colony' && boughtPerks['Hive'] && (!isHive)"
                  label="Upgrade"
                  title="Upgrade to Hive"
                  size="Small"
                  @click="base.type = 'Hive'"
                />
              </div>
              <div v-if="boughtPerks['Nursery']" class="whitespace-nowrap flex gap-x-2 flex-wrap">
                <NumberInput v-model="base['Nursery'].count" label="Nurseries" :min="0" />
                DP: <span class="text-violet-400">{{ nurseryCost[i] }}</span> Footprint: <span class="text-blue-300">{{ nurseryPrint[i] }}m²</span>
                <div>
                  Incubation time is <span class="text-pink-300">{{ Math.floor(incubationTimeBonus[i] * 100000) / 1000 }}%</span> from base <span class="text-pink-500">[{{ Math.floor(336 * incubationTimeBonus[i] * 1000) / 1000 }} hours]</span>
                </div>
              </div>
              <Desc v-else desc="You don't have a Nursery unlocked" class="p-0 indent-0em" />
              <div v-if="boughtPerks['Grove']" class="whitespace-nowrap flex gap-2">
                <NumberInput v-model="base['Grove'].count" label="Groves" :min="0" />
                DP: <span class="text-violet-400">{{ groveCost[i] }}</span> Footprint: <span class="text-blue-300">{{ grovePrint[i] }}m²</span>
              </div>
              <Desc v-else desc="You don't have a Grove unlocked" class="p-0 indent-0em" />
              <Foldable
                v-if="boughtPerks['Den']"
                v-auto-animate
                title="Dens and its upgrades"
                :is-open="true"
                title-style="text-amber-400"
                class="flex flex-col gap-1"
              >
                <div v-for="den, key in base['Dens']" :key="key" class="flex gap-1 whitespace-nowrap">
                  <NumberInput v-if="boughtPerks[key]" v-model="base['Dens'][key]" :label="`${key}s`" :min="0" />
                  <Desc v-else :desc="`You don't have a ${key} unlocked`" class="p-0 indent-0em" />
                </div>
                <div>Total DP: <span class="text-violet-400">{{ densCost[i] }}</span> Total Footprint: <span class="text-blue-300">{{ densPrint[i] }}m²</span></div>
              </Foldable>
              <Desc v-else desc="You don't have a Den unlocked" class="p-0 indent-0em" />

              <Foldable v-auto-animate title="Miscellaneous buildings" :is-open="true" title-style="text-amber-400" class="flex flex-col gap-1">
                <div v-if="boughtPerks['Evolution Chamber']" class="whitespace-nowrap flex gap-2">
                  <NumberInput v-model="base['Evolution Chamber'].count" label="Evolution Chambers" :min="0" />
                  DP: <span class="text-violet-400">{{ evolutionCost[i] }}</span> Footprint: <span class="text-blue-300">{{ evolutionPrint[i] }}m²</span>
                </div>
                <Desc v-else desc="You don't have a Evolution Chamber unlocked" class="p-0 indent-0em" />
                <div v-if="boughtPerks['Guard Spire']" class="whitespace-nowrap flex gap-2">
                  <NumberInput v-model="base['Guard Spire'].count" label="Guard Spire's" :min="0" />
                  DP: <span class="text-violet-400">{{ spireCost[i] }}</span> Footprint: <span class="text-blue-300">{{ spirePrint[i] }}m²</span>
                </div>
                <Desc v-else desc="You don't have a Guard Spire unlocked" class="p-0 indent-0em" />
                <div v-if="boughtPerks['Nexus']" class="whitespace-nowrap flex gap-2">
                  <NumberInput v-model="base['Nexus'].count" label="Nexuses" :min="0" />
                  DP: <span class="text-violet-400">{{ nexusCost[i] }}</span> Footprint: <span class="text-blue-300">{{ nexusPrint[i] }}m²</span>
                </div>
                <Desc v-else desc="You don't have a Nexus unlocked" class="p-0 indent-0em" />
                <div v-if="boughtPerks['Fortress']" class="whitespace-nowrap flex gap-2">
                  <NumberInput v-model="base['Fortress'].count" label="Fortresses" :min="0" />
                  DP: <span class="text-violet-400">{{ fortressCost[i] }}</span> Footprint: <span class="text-blue-300">{{ fortressPrint[i] }}m²</span>
                </div>
                <Desc v-else desc="You don't have a Fortress unlocked" class="p-0 indent-0em" />
              </Foldable>
            </Foldable>
          </div>
        </div>
        <Desc v-else desc="You don't have Hatchery unlocked" class="p-0 indent-0em" />
      </div>
      <div class="text-center text-sm text-gray-500">
        Symbiote App was commissioned by <b>ClayUndead</b>
      </div>
    </div>
    <Desc v-else desc="You need to have a Alterzelu Symbiote perk to access this app." />
  </div>
</template>

<script lang="ts" setup>
import { sum } from 'lodash-es'
import { orientation, randomString, toReadableTime } from '~/logic'
import { useStore } from '~/store/store'
import { usePlayStore } from '~/store/play'
import { CHAR_COSTS } from '~/data/constants'
import { symbioteBuildingsObject } from '~/data/symbiote'

const { binding, companions } = useStore()
const { symbiotes, manualDevotees } = usePlayStore()

const maxCreep = {
  Hatchery: 1,
  Lair: 5,
  Colony: 25,
  Hive: 125,
  Fortress: 20,
}

const footprint = {
  'Hatchery': 2000,
  'Nursery': 250,
  'Grove': 40000,
  'Den': 500,
  'Lair': 10000,
  'Burrow': 4500,
  'Nest': 2100,
  'Reef': 5250,
  'Evolution Chamber': 6000,
  'Guard Spire': 250,
  'Colony': 50000,
  'Nexus': 24000,
  'Fortress': 24500,
  'Hive': 250000,
}

const twoWeeks = 86400 * 14

const unitsInfo = {
  Buzzers: { clutch: 24, junior: 259200 },
  Floaters: { clutch: 4, junior: 1209600 },
  Globsters: { clutch: 16, junior: 604800 },
  Skitterers: { clutch: 8, junior: 604800 },
  Lingoth: { clutch: 1, junior: 2592000 * 6, adult: 63072000, elder: 315360000 },
  Linkor: { clutch: 1, junior: 2592000 * 6, adult: 63072000, elder: 315360000 },
  Linguu: { clutch: 1, junior: 2592000 * 5, adult: 49932000, elder: 315360000 },
  Ailgoth: { clutch: 1, junior: 2592000 * 8, adult: 84096000, elder: 409968000 },
  Ailkor: { clutch: 1, junior: 31536000, adult: 126144000, elder: 630720000 },
}

const activeDungeonInd = ref<number| undefined>(symbiotes.value.length ? 0 : undefined)
const manualDevEdit = ref(false)

const clutchCapacity = {
  Hatchery: 20,
  Lair: 40,
  Colony: 60,
  Hive: 80,
}
const clutchCapacityBase = {
  Hatchery: 160,
  Lair: 1600,
  Colony: 12000,
  Hive: 80000,
}
const totalClutchCapacity = computed(() => symbiotes.value[activeDungeonInd.value].bases.map(base => clutchCapacity[base.type] * base.Nursery.count + clutchCapacityBase[base.type]))

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

const baseCost = computed(() => {
  if (activeDungeonInd.value !== undefined)
    return symbiotes.value[activeDungeonInd.value].bases.map(base => symbioteBuildingsObject[base.type].dCost)
  return [0]
})
const basePrint = computed(() => {
  if (activeDungeonInd.value !== undefined)
    return symbiotes.value[activeDungeonInd.value].bases.map(base => footprint[base.type])
  return [0]
})

const nurseryCost = computed(() => {
  if (activeDungeonInd.value !== undefined)
    return symbiotes.value[activeDungeonInd.value].bases.map(base => symbioteBuildingsObject.Nursery.dCost * base.Nursery.count)
  return [0]
})
const nurseryPrint = computed(() => {
  if (activeDungeonInd.value !== undefined)
    return symbiotes.value[activeDungeonInd.value].bases.map(base => footprint.Nursery * base.Nursery.count)
  return [0]
})

const groveCost = computed(() => {
  if (activeDungeonInd.value !== undefined)
    return symbiotes.value[activeDungeonInd.value].bases.map(base => symbioteBuildingsObject.Grove.dCost * base.Grove.count)
  return [0]
})
const grovePrint = computed(() => {
  if (activeDungeonInd.value !== undefined)
    return symbiotes.value[activeDungeonInd.value].bases.map(base => footprint.Grove * base.Grove.count)
  return [0]
})

const densCost = computed(() => {
  if (activeDungeonInd.value !== undefined) {
    return symbiotes.value[activeDungeonInd.value].bases.map(base =>
      symbioteBuildingsObject.Den.dCost * base.Dens.Den
    + symbioteBuildingsObject.Burrow.dCost * base.Dens.Burrow
    + symbioteBuildingsObject.Nest.dCost * base.Dens.Nest
    + symbioteBuildingsObject.Reef.dCost * base.Dens.Reef)
  }
  return [0]
})
const densPrint = computed(() => {
  if (activeDungeonInd.value !== undefined) {
    return symbiotes.value[activeDungeonInd.value].bases.map(base =>
      footprint.Den * base.Dens.Den
    + footprint.Burrow * base.Dens.Burrow
    + footprint.Nest * base.Dens.Nest
    + footprint.Reef * base.Dens.Reef)
  }
  return [0]
})

const evolutionCost = computed(() => {
  if (activeDungeonInd.value !== undefined)
    return symbiotes.value[activeDungeonInd.value].bases.map(base => symbioteBuildingsObject['Evolution Chamber'].dCost * base['Evolution Chamber'].count)
  return [0]
})
const evolutionPrint = computed(() => {
  if (activeDungeonInd.value !== undefined)
    return symbiotes.value[activeDungeonInd.value].bases.map(base => footprint['Evolution Chamber'] * base['Evolution Chamber'].count)
  return [0]
})

const spireCost = computed(() => {
  if (activeDungeonInd.value !== undefined)
    return symbiotes.value[activeDungeonInd.value].bases.map(base => symbioteBuildingsObject['Guard Spire'].dCost * base['Guard Spire'].count)
  return [0]
})
const spirePrint = computed(() => {
  if (activeDungeonInd.value !== undefined)
    return symbiotes.value[activeDungeonInd.value].bases.map(base => footprint['Guard Spire'] * base['Guard Spire'].count)
  return [0]
})

const nexusCost = computed(() => {
  if (activeDungeonInd.value !== undefined)
    return symbiotes.value[activeDungeonInd.value].bases.map(base => symbioteBuildingsObject.Nexus.dCost * base.Nexus.count)
  return [0]
})
const nexusPrint = computed(() => {
  if (activeDungeonInd.value !== undefined)
    return symbiotes.value[activeDungeonInd.value].bases.map(base => footprint.Nexus * base.Nexus.count)
  return [0]
})

const fortressCost = computed(() => {
  if (activeDungeonInd.value !== undefined)
    return symbiotes.value[activeDungeonInd.value].bases.map(base => symbioteBuildingsObject.Fortress.dCost * base.Fortress.count)
  return [0]
})
const fortressPrint = computed(() => {
  if (activeDungeonInd.value !== undefined)
    return symbiotes.value[activeDungeonInd.value].bases.map(base => footprint.Fortress * base.Fortress.count)
  return [0]
})

const usedFootprint = computed(() => {
  let FP = [0]

  if (activeDungeonInd.value !== undefined)
    FP = basePrint.value.map((n, i) => n + nurseryPrint.value[i] + densPrint.value[i] + grovePrint.value[i] + evolutionPrint.value[i] + spirePrint.value[i] + nexusPrint.value[i] + fortressPrint.value[i])

  return FP
})

const totalCreepZone = computed(() => {
  let CZ = [0]

  if (activeDungeonInd.value !== undefined)
    CZ = symbiotes.value[activeDungeonInd.value].bases.map(base => Math.floor((Math.pow(maxCreep[base.type], 2)) * Math.PI) + Math.floor(((Math.pow(maxCreep.Fortress, 2)) * Math.PI) / 2) * base.Fortress.count)

  return CZ
})

const usedDP = computed(() => {
  let DP = 0

  if (activeDungeonInd.value !== undefined) {
    DP += sum(baseCost.value)
    DP += sum(nurseryCost.value)
    DP += sum(densCost.value)
    DP += sum(groveCost.value)
    DP += sum(evolutionCost.value)
    DP += sum(spireCost.value)
    DP += sum(nexusCost.value)
    DP += sum(fortressCost.value)
  }

  return DP
})

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

const incubationTimeBonus = computed(() => {
  const r = 0.025
  const s = 1
  const d = 1 / 2
  return symbiotes.value?.[activeDungeonInd.value]?.bases.map(
    base => (1 - (Math.min(base.Nursery.count * r, d) + (1 - (1 - d) / (Math.max(base.Nursery.count * r, d) - (d - (1 - d)))) * (1 - d))) * s)
})

// (1-(MIN(n*r,d)+(1-(1-d)/(MAX(n*r,d)-(d-(1-d))))*(1-d)))*s
const maturationTimeBonus = computed(() => {
  const r = 0.025
  const s = 1
  const d = 1 / 2
  return symbiotes.value?.[activeDungeonInd.value]?.bases.map(
    base => (1 - (Math.min(base.Grove.count * r, d) + (1 - (1 - d) / (Math.max(base.Grove.count * r, d) - (d - (1 - d)))) * (1 - d))) * s)
})

const isLair = computed(() => symbiotes.value?.[activeDungeonInd.value]?.bases.some(base => base.type === 'Lair'))
const isColony = computed(() => symbiotes.value?.[activeDungeonInd.value]?.bases.some(base => base.type === 'Colony'))
const isHive = computed(() => symbiotes.value?.[activeDungeonInd.value]?.bases.some(base => base.type === 'Hive'))

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

const basicCreepZone
  = {
    'uid': randomString(5),
    'type': 'Hatchery',
    'buzzers': 0,
    'floater': 0,
    'globsters': 0,
    'skitterers': 0,
    'Lingoth': 0,
    'Linkor': 0,
    'Linguu': 0,
    'Ailgoth': 0,
    'Ailkor': 0,
    'Nursery': { name: 'Nursery', count: 0 },
    'Grove': { name: 'Grove', count: 0 },
    'Dens': {
      Den: 0,
      Burrow: 0,
      Nest: 0,
      Reef: 0,
    },
    'Evolution Chamber': { name: 'Evolution Chamber', count: 0 },
    'Guard Spire': { name: 'Guard Spire', count: 0 },
    'Nexus': { name: 'Nexus', count: 0 },
    'Fortress': { name: 'Fortress', count: 0 },
  }

function addBase() {
  const name = `Base #${Math.floor(Math.random() * 1000)}`
  symbiotes.value.push({
    name,
    used: Array(10).fill(0),
    bases: [
      { ...basicCreepZone },
    ],
  })
  activeDungeonInd.value = symbiotes.value.length - 1
}

function addZone() {
  symbiotes.value[activeDungeonInd.value].bases.push({ ...basicCreepZone })
}

function deleteZone(i: number) {
  symbiotes.value[activeDungeonInd.value].bases.splice(i, 1)
}

function deleteDungeon(ind: number) {
  symbiotes.value.splice(ind, 1)
  symbiotes.value.length ? activeDungeonInd.value = 0 : activeDungeonInd.value = undefined
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

<style>
.unitsTable {
  @apply border-collapse bg-gray-700 text-gray-300;
}

.unitsTable tr{
 @apply odd:(bg-black bg-opacity-15);
}

.unitsTable th,td{
 @apply border border-gray-600 px-2;
}

</style>
