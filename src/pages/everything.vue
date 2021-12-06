<template>
  <div class="max-w-screen-md mx-auto">
    <h1 class="text-xl font-bold text-center">
      Index of Everything
    </h1>
    <div class="flex items-center">
      <Input v-model="filter" placeholder="Filter" />
      <clarity:eraser-solid class="icon-btn w-8" @click="filter = ''" />
    </div>
    <Enum v-if="filtered.length" :list="filtered.map(x => x.item)" :color="color" />
    <div class="flex flex-col gap-4 pb-8">
      <div>
        <h3 class="text-lg font-semibold">
          Rules
        </h3>
        <Enum :list="rulesList" path="/" :color="color" />
      </div>

      <div>
        <h3 class="text-lg font-semibold">
          CYOA Modes and Other Contractors (Intensity)
        </h3>
        <Enum :list="intensity" :color="color" />
      </div>

      <div>
        <h3 class="text-lg font-semibold">
          Origin
        </h3>
        <Enum :list="origin" :color="color" />
      </div>

      <div>
        <h3 class="text-lg font-semibold">
          Bindings
        </h3>
        <Enum :list="bindings" :color="color" />
      </div>

      <div>
        <h3 class="text-lg font-semibold">
          Lures
        </h3>
        <Enum :list="[...lures, ...lureExpansions]" :color="color" />
      </div>

      <div>
        <h3 class="text-lg font-semibold">
          Other Controls
        </h3>
        <Enum :list="otherControls" :color="color" />
      </div>

      <div>
        <h3 class="text-lg font-semibold">
          Heritages
        </h3>
        <Enum :list="heritages" :color="color" />
      </div>

      <div>
        <h3 class="text-lg font-semibold">
          Catch-A-Ride
        </h3>
        <Enum :list="rides" :color="color" />
      </div>

      <div>
        <h3 class="text-lg font-semibold">
          Demiplanes & Dungeons
        </h3>
        <Enum :list="homes" :color="color" />
      </div>

      <div>
        <h3 class="text-lg font-semibold">
          Talents and Defenses
        </h3>
        <Enum :list="[...talents, ...defenses]" :color="color" />
      </div>

      <div>
        <h3 class="text-lg font-semibold">
          Other Perks
        </h3>
        <Enum :list="perks" :color="color" />
      </div>

      <div>
        <h3 class="text-lg font-semibold">
          Specific Waifu Perks
        </h3>
        <Enum :list="[...genericPerks,...waifu_perks]" :color="color" />
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import Fuse from 'fuse.js'
import { heritages } from '~/data/heritage'
import { bindings, lures, lureExpansions, otherControls } from '~/data/binding'
import { intensity } from '~/data/intensity'
import { origin } from '~/data/origin'
import { defenses, homes, perks, rides, genericPerks, talents } from '~/data/talents'
import { waifu_perks } from '~/data/waifu_perks'

import { rulesList } from '~/data/constatnts'

const filter = ref('')

const options = {
  includeScore: true,
  findAllMatches: true,
  threshold: 0.1,
  keys: ['title'],
}

const color = 'odd:text-gray-500 even:text-gray-900 dark:(odd:text-gray-200 even:text-gray-400) font-medium'

const all = [...heritages, ...bindings, ...lures, ...lureExpansions, ...otherControls, ...intensity, ...origin,
  ...defenses, ...homes, ...perks, ...rides, ...genericPerks, ...talents, ...waifu_perks]

const fuse = computed(() => new Fuse(all, options))

const filtered = computed(() => {
  return fuse.value.search(filter.value, { limit: 5 })
})

</script>
