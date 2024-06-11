<template>
  <div class="flex w-full">
    <div class="max-w-screen-md lg:pl-0">
      <h1 class="text-xl font-bold text-center pb-2">
        Index of Everything (Number of perks including DLC: <span class="text-green-500">{{ all.length }}</span>)
      </h1>
      <div class="flex items-center">
        <Input v-model="filter" placeholder="Filter" />
        <clarity:eraser-solid class="icon-btn w-8" @click="filter = ''" />
      </div>
      <Enum v-if="filtered.length" :list="filtered.map(x => x.item)" :color="color" />
      <div class="flex flex-col gap-4 pb-8">
        <div>
          <h3 class="text-lg font-semibold text-lime-700 dark:text-lime-400">
            Rules
          </h3>
          <Enum :list="rulesList" path="/" :color="color" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-lime-700 dark:text-lime-400">
            CYOA Modes and Other Contractors (Intensity)
          </h3>
          <Enum :list="intensity" :color="color" />
          <h4 class="text-sm font-semibold text-lime-700 dark:text-lime-400">
            DLC
          </h4>
          <Enum :list="DLCintensity" :color="DLCColor" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-lime-700 dark:text-lime-400">
            Origin
          </h3>
          <Enum :list="origin" :color="color" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-lime-700 dark:text-lime-400">
            Bindings
          </h3>
          <Enum :list="bindings" :color="color" />
          <h4 class="text-sm font-semibold text-lime-700 dark:text-lime-400">
            DLC
          </h4>
          <Enum :list="DLCbindings" :color="DLCColor" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-lime-700 dark:text-lime-400">
            Lures
          </h3>
          <Enum :list="[...lures, ...lureExpansions]" :color="color" />
          <h4 class="text-sm font-semibold text-lime-700 dark:text-lime-400">
            DLC
          </h4>
          <Enum :list="[...DLClures, ...DLClureExpansions]" :color="DLCColor" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-lime-700 dark:text-lime-400">
            Other Controls
          </h3>
          <Enum :list="otherControls" :color="color" />
          <h4 class="text-sm font-semibold text-lime-700 dark:text-lime-400">
            DLC
          </h4>
          <Enum :list="DLCotherControls" :color="DLCColor" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-lime-700 dark:text-lime-400">
            Heritages
          </h3>
          <Enum :list="heritages" :color="color" />
          <h4 class="text-sm font-semibold text-lime-700 dark:text-lime-400">
            DLC
          </h4>
          <Enum :list="DLCheritages" :color="DLCColor" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-lime-700 dark:text-lime-400">
            Catch-A-Ride
          </h3>
          <Enum :list="[...rides, ...ridePerksFull]" :color="color" />
          <h4 class="text-sm font-semibold text-lime-700 dark:text-lime-400">
            DLC
          </h4>
          <Enum :list="[...DLCRides, ...DLCridePerks]" :color="DLCColor" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-lime-700 dark:text-lime-400">
            Demiplanes & Dungeons
          </h3>
          <Enum :list="[...homes, ...demiplane, ...dungeon]" :color="color" />
          <h4 class="text-sm font-semibold text-lime-700 dark:text-lime-400">
            DLC
          </h4>
          <Enum :list="DLChomes" :color="DLCColor" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-lime-700 dark:text-lime-400">
            Talents and Defenses
          </h3>
          <Enum :list="[...talents, ...defenses]" :color="color" />
          <h4 class="text-sm font-semibold text-lime-700 dark:text-lime-400">
            DLC
          </h4>
          <Enum :list="DLCtalents" :color="DLCColor" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-lime-700 dark:text-lime-400">
            Other Perks
          </h3>
          <Enum :list="perks" :color="color" />
          <h4 class="text-sm font-semibold text-lime-700 dark:text-lime-400">
            DLC
          </h4>
          <Enum :list="DLCperks" :color="DLCColor" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-lime-700 dark:text-lime-400">
            Specific Waifu Perks
          </h3>
          <Enum :list="[...genericPerks,...waifu_perks]" :color="color" />
          <h4 class="text-sm font-semibold text-lime-700 dark:text-lime-400">
            DLC
          </h4>
          <Enum :list="[...DLCgenericPerks, ...DLCwaifu_perks]" :color="DLCColor" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import Fuse from 'fuse.js'
import { heritages } from '~/data/heritage'
import { bindings, lures, lureExpansions, otherControls } from '~/data/binding'
import { intensity, intensityPvP, invasionPvP } from '~/data/intensity'
import { origin } from '~/data/origin'
import { defenses, perks, ridePerksFull, genericPerks, talents } from '~/data/talents'
import { DLCwaifu_perks, waifu_perks } from '~/data/waifu_perks'
import { homes, dungeon, demiplane } from '~/data/demdun'

import { rulesList } from '~/data/constants'
import { DLCRides, rides } from '~/data/rides'
import { DLCbindings, DLChomes, DLCgenericPerks, DLCheritages, DLCintensity, DLClureExpansions, DLClures, DLCotherControls, DLCperks, DLCridePerks, DLCtalents } from '~/data/DLCs'
import { patrons } from '~/data/patronsDLC'
import { symBuildings, symbioteBinding, synUnits } from '~/data/symbiote'
import { difficultyOptions } from '~/data/difficulty'

const filter = ref('')

const options = {
  includeScore: true,
  findAllMatches: true,
  threshold: 0.1,
  keys: ['title'],
}

const color = 'odd:text-gray-500 even:text-gray-900 dark:(odd:text-gray-200 even:text-gray-400) font-medium'
const DLCColor = 'odd:text-true-gray-600 even:text-true-gray-900 dark:(odd:text-true-gray-100 even:text-true-gray-400) font-medium'

const all = [...heritages, ...bindings, ...lures, ...lureExpansions, ...otherControls, ...intensity, ...origin,
  ...defenses, ...homes, ...perks, ...rides, ...genericPerks, ...talents, ...waifu_perks, ...ridePerksFull,
  ...DLCbindings, ...DLChomes, ...DLCgenericPerks, ...DLCheritages, ...DLCintensity, ...DLClureExpansions, ...DLClures, ...DLCotherControls, ...DLCperks, ...DLCridePerks, ...DLCtalents, ...patrons, ...DLCRides, ...DLCwaifu_perks, ...dungeon, ...demiplane, ...symbioteBinding, ...symBuildings, ...synUnits, ...difficultyOptions, ...intensityPvP, ...invasionPvP]

const fuse = computed(() => new Fuse(all, options))

const filtered = computed(() => {
  return fuse.value.search(filter.value, { limit: 5 })
})

</script>
