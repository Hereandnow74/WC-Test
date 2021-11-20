<template>
  <div>Under construction</div>
  <Button label="Back" icon="akar-icons:arrow-back-thick" size="Small" @click="toggleAppMode" />
</template>

<script lang="ts" setup>
import { random } from 'lodash'
import { toggleAppMode } from '~/logic'

import { heritages } from '~/data/heritage'
import { bindings, lures, lureExpansions } from '~/data/binding'
import { intensity } from '~/data/intensity'
import { origin } from '~/data/origin'
import { defenses, homes, perks, rides, genericPerks, talents } from '~/data/talents'
import { waifu_perks } from '~/data/waifu_perks'
import { useStore } from '~/store/store'
import worlds from '~/data/worlds.json'
import subWorlds from '~/data/userWorlds.json'

const allCats = ['World', 'Intensity', 'Origin', 'Heritage', 'Bindings', 'Lures', 'Rides', 'Home',
  'Talents', 'Defenses', 'Generic', 'Waifu Perks']

const {
  userWorlds, localUserWorlds, budget, startingWorld, startingOrigin, intensities, binding, homePerks, defensePerks,
  companions, heritage, talentPerks, waifuPerks, ridePerks, miscPerks, luresBought, genericWaifuPerks,
  tier11tickets, companionsCost, budgetMods, baseBudget, allEffects, flags, companionProfit,
} = useStore()

const allWorlds = computed(() => Array.prototype.concat(userWorlds.value, localUserWorlds.value, worlds, subWorlds))

function randomWorld() {
  return allWorlds.value[random(0, allWorlds.value.length)]
}

function randomIntensity() {
  return intensity[random(0, intensity.length)]
}

function randomBuild() {
//
}
</script>
