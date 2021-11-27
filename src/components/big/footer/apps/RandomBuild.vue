<template>
  <div class="p-1">
    <div class="text-blue-200">
      Basic and stupid build generator. May be improved in the future if users will find it useful.
    </div>
    <div class="flex gap-4 flex-wrap my-2">
      <Input v-model.number="targetBudget" label="Target budget" class="w-44" />
      <Button label="Generate" bg-color="bg-amber-500" size="Small" @click="generateRandomBuild" />
    </div>
    <Button class="mx-auto" label="Back" icon="akar-icons:arrow-back-thick" size="Small" @click="toggleAppMode" />
  </div>
</template>

<script lang="ts" setup>
import { findIndex, random, sample } from 'lodash'
import { clamp } from 'lodash-es'
import {
  activeTab, bindingAvailable, chooseBinding, chooseDefense, chooseGenericPerk, chooseHeritage, chooseHome, chooseLure, chooseOther, choosePerk, chooseRide, chooseTalent, chooseWaifuPerk, clearAll, defenseAvailable, genericAvailable, heritageAvailable, homeAvailable, lureAvailable, miscAvailable, randomChar,
  rideAvailable,
  specificAvailable,
  talentAvailable,
  toggleAppMode,
} from '~/logic'

import { heritages } from '~/data/heritage'
import { bindings, lures, lureExpansions, otherControls } from '~/data/binding'
import { intensity } from '~/data/intensity'
import { origin } from '~/data/origin'
import { defenses, homes, perks, rides, genericPerks, talents } from '~/data/talents'
import { waifu_perks } from '~/data/waifu_perks'
import { useStore } from '~/store/store'
import worlds from '~/data/worlds.json'
import subWorlds from '~/data/userWorlds.json'
import { allWorldsNoCondition, CHAR_COSTS, WORLD_RATINGS } from '~/data/constatnts'

const allCats = ['World', 'Intensity', 'Origin', 'Heritage', 'Bindings', 'Lures', 'Rides', 'Home',
  'Talents', 'Defenses', 'Generic', 'Waifu Perks']

const targetBudget = ref(55)

const {
  userWorlds, localUserWorlds, budget, startingWorld, startingOrigin, intensities, binding, homePerks, defensePerks,
  companions, heritage, talentPerks, waifuPerks, ridePerks, miscPerks, luresBought, genericWaifuPerks,
  tier11tickets, companionsCost, budgetMods, baseBudget, allEffects, flags, companionProfit, otherPerks,
} = useStore()

async function randomWorld(maxPrice: number) {
  const allWorlds = allWorldsNoCondition.value.filter(x => (WORLD_RATINGS[x.rating - 1]?.budget || 0) <= maxPrice)
  return allWorlds[random(0, allWorlds.length)]
}

async function randomOrigin(startBudget: number) {
  const ind = random(0, 4)
  if (ind < 2) return { title: origin[ind].title, cost: 0 }
  if (ind === 2) return { title: origin[ind].title, cost: sample([0, 10]) }
  if (ind === 3) {
    const char = await randomChar(false, startBudget * 0.2)
    return { title: origin[ind].title, cost: (CHAR_COSTS[char.t - 1] || 0), character: char.n, tier: char.t }
  }
  if (ind === 4) {
    const char = await randomChar(false, startBudget)
    return { title: origin[ind].title, cost: (CHAR_COSTS[char.t - 1] || 0), character: char.n, tier: char.t }
  }
  return { title: origin[0].title, cost: 0 }
}

async function randomBinding(max: number) {
  const perk = sample(bindings)
  if (perk.cost > max) return
  if (bindingAvailable(perk) && findIndex(binding.value, { title: perk.title }) === -1)
    chooseBinding(perk, { title: perk?.title, cost: perk?.cost, count: 1 })
}

async function randomLure(max: number) {
  const perk = sample(lures)
  if (perk.cost > max) return
  if (lureAvailable(perk) && findIndex(luresBought.value, { title: perk.title }) === -1)
    chooseLure(perk)
}

async function randomLureExpansion(max: number) {
  const perk = sample(lureExpansions)
  if (perk.cost > max) return
  if (lureAvailable(perk) && findIndex(luresBought.value, { title: perk.title }) === -1)
    chooseLure(perk)
}

async function randomControl(max: number) {
  const perk = sample(otherControls)
  if (perk.cost > max) return
  if (lureAvailable(perk) && findIndex(otherPerks.value, { title: perk.title }) === -1)
    chooseOther(perk, { title: perk?.title, cost: perk?.cost })
}

async function randomHeritage(max: number) {
  const perk = sample(heritages)
  if (perk.cost > max) return
  if (heritageAvailable(perk) && findIndex(heritage.value, { title: perk.title }) === -1)
    chooseHeritage(perk, { title: perk?.title, cost: perk?.cost })
}

async function randomRide(max: number) {
  const perk = sample(rides)
  if (perk.cost > max) return
  if (rideAvailable(perk) && findIndex(ridePerks.value, { title: perk.title }) === -1)
    chooseRide(perk, { title: perk?.title, cost: perk?.cost })
}

async function randomHome(max: number) {
  const perk = sample(homes)
  if (perk.cost > max) return
  if (homeAvailable(perk) && findIndex(homePerks.value, { title: perk.title }) === -1)
    chooseHome(perk, { title: perk?.title, cost: perk?.cost })
}

async function randomTalent(max: number) {
  const perk = sample(talents)
  if (perk.cost > max) return
  if (talentAvailable(perk) && findIndex(talentPerks.value, { title: perk.title }) === -1)
    chooseTalent(perk, { title: perk?.title, cost: perk?.cost })
}

async function randomDefense(max: number) {
  const perk = sample(defenses)
  if (perk.cost > max) return
  if (defenseAvailable(perk)) {
    const ind = findIndex(defensePerks.value, { title: perk.title })
    if (ind === -1) { chooseDefense(perk, { title: perk?.title, cost: perk?.cost, count: 1 }) }
    else if (defensePerks.value[ind].count === 1) {
      defensePerks.value[ind].count = 2
      defensePerks.value[ind].cost *= 2
    }
  }
}

async function randomMisc(max: number) {
  const perk = sample(perks)
  if (perk.cost > max) return
  if (miscAvailable(perk) && findIndex(miscPerks.value, { title: perk.title }) === -1)
    choosePerk(perk, { title: perk?.title, cost: perk?.cost })
}

async function randomGeneral(max: number) {
  const perk = sample(genericPerks)
  if (perk.cost > max) return
  if (genericAvailable(perk) && findIndex(genericWaifuPerks.value, { title: perk.title }) === -1)
    chooseGenericPerk(perk, { title: perk?.title, cost: perk?.cost })
}

async function randomSpecific(max: number) {
  const perk = sample(waifu_perks)
  if (perk.cost > max) return
  if (specificAvailable(perk) && findIndex(waifuPerks.value, { title: perk.title }) === -1)
    chooseWaifuPerk(perk)
}

async function randomCompanion(max: number) {
  const char = await randomChar(false, max)
  if (char.u)
    companions.value.push({ uid: char.u, name: char.n, world: char.w, tier: char.t, priceTier: char.t, method: 'buy' })
}

async function generateRandomBuild() {
  clearAll()
  const clampedTarget = clamp(targetBudget.value, 10, 10000)
  activeTab.value = 0
  // Random world
  const world = await randomWorld(clampedTarget)
  await new Promise(resolve => setTimeout(resolve, 500))
  startingWorld.value = { worldName: world.worldName, rating: world.rating }
  if (world.condition) startingWorld.value.condition = world.condition
  baseBudget.value = WORLD_RATINGS[world.rating - 1]?.budget || 0
  budgetMods.value.plus = clampedTarget - (WORLD_RATINGS[world.rating - 1]?.budget || 0)
  // Intensity
  await new Promise(resolve => setTimeout(resolve, 500))
  intensities.value.push({ title: intensity[0].title, intensity: 0, count: 1 })
  // Origin
  await new Promise(resolve => setTimeout(resolve, 500))
  startingOrigin.value = await randomOrigin(baseBudget.value)
  while (budget.value > 0) {
    const startCost = budget.value
    await new Promise(resolve => setTimeout(resolve, 10))
    await randomBinding(budget.value)

    await new Promise(resolve => setTimeout(resolve, 10))
    await randomLure(budget.value)

    await new Promise(resolve => setTimeout(resolve, 10))
    await randomLureExpansion(budget.value)

    await new Promise(resolve => setTimeout(resolve, 10))
    await randomControl(budget.value)

    await new Promise(resolve => setTimeout(resolve, 10))
    for (let i = 0; i < 5; i++)
      await randomHeritage(budget.value)

    await new Promise(resolve => setTimeout(resolve, 10))
    if (random(0, 8) === 3) await randomRide(budget.value)

    await new Promise(resolve => setTimeout(resolve, 10))
    await randomHome(budget.value)

    await new Promise(resolve => setTimeout(resolve, 10))
    await randomTalent(budget.value)

    await new Promise(resolve => setTimeout(resolve, 10))
    await randomDefense(budget.value)

    await new Promise(resolve => setTimeout(resolve, 10))
    await randomGeneral(budget.value)

    await new Promise(resolve => setTimeout(resolve, 10))
    await randomMisc(budget.value)

    await new Promise(resolve => setTimeout(resolve, 10))
    if (random(0, 3) === 3) await randomCompanion(budget.value)

    await new Promise(resolve => setTimeout(resolve, 10))
    await randomSpecific(budget.value)

    await new Promise(resolve => setTimeout(resolve, 10))
    if (startCost === budget.value) {
      if (budget.value > 10)
        await randomCompanion(budget.value)
      else
        break
    }
  }
  console.log('End')
}
</script>
