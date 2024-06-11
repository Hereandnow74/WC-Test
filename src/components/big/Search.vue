<template>
  <div class="hidden lg:block fixed top-0 right-0 z-20">
    <div v-if="searchOpen" class="flex flex-col gap-2 max-h-screen bg-true-gray-100 dark:bg-true-gray-800 p-1 border-l border-gray-400 dark:border-gray-500">
      <div class="flex gap-2 px-1">
        <div class="flex items-center text-lg" title="Search">
          <bi:search />
        </div>
        <Input v-model="searchString" v-focus name="search" class="flex-grow" />
        <div class="hover:text-red-500 flex items-center cursor-pointer" @click="searchOpen = false">
          <fontisto:close-a />
        </div>
      </div>
      <div v-if="filtered.length" class="flex-grow flex flex-col gap-2 max-w-md overflow-y-auto scrollbar" @click="searchOpen = false">
        <div v-for="res, i in filtered" :key="res.item.uid" class="rounded bg-true-gray-200 dark:bg-true-gray-900 p-1">
          <router-link
            :to="{path: `/${LINKS[res.item.title]}`, hash:'#'+res.item.title, query: {q: QUERIES[res.item.title]}}"
            class="text-lg text-blue-700 dark:text-blue-500"
          >
            {{ res.item.title }}
          </router-link>
          <div v-html="highlightedResult[i]" />
        </div>
      </div>
    </div>
    <div v-else class="p-1 text-lg rounded hover:text-green-500 cursor-pointer" @click="searchOpen = true">
      <bi:search />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Fuse from 'fuse.js'
import { heritages } from '~/data/heritage'
import { bindings, lures, lureExpansions, otherControls } from '~/data/binding'
import { intensity, intensityPvP, invasionPvP } from '~/data/intensity'
import { origin } from '~/data/origin'
import { defenses, perks, ridePerksFull, genericPerks, talents } from '~/data/talents'
import { DLCwaifu_perks, waifu_perks } from '~/data/waifu_perks'
import { homes, dungeon, demiplane } from '~/data/demdun'
import { symbioteBinding, symBuildings, synUnits } from '~/data/symbiote'
import { difficultyOptions } from '~/data/difficulty'

import { LINKS, QUERIES } from '~/data/constants'

import { DLCRides, rides } from '~/data/rides'
import { DLCbindings, DLChomes, DLCgenericPerks, DLCheritages, DLCintensity, DLClureExpansions, DLClures, DLCotherControls, DLCperks, DLCridePerks, DLCtalents } from '~/data/DLCs'
import { patrons } from '~/data/patronsDLC'

const searchOpen = ref(false)

const searchString = ref('')

const vFocus = {
  mounted: (el: HTMLElement) => (el.children[0].children[0] as HTMLElement).focus(),
}

const options = {
  includeScore: false,
  findAllMatches: true,
  includeMatches: true,
  minMatchCharLength: 3,
  ignoreLocation: true,
  threshold: 0,
  useExtendedSearch: true,
  keys: ['title', 'desc'],
}

const all = [...heritages, ...bindings, ...lures, ...lureExpansions, ...otherControls, ...intensity, ...origin,
  ...defenses, ...homes, ...perks, ...rides, ...genericPerks, ...talents, ...waifu_perks, ...ridePerksFull,
  ...DLCbindings, ...DLChomes, ...DLCgenericPerks, ...DLCheritages, ...DLCintensity, ...DLClureExpansions, ...DLClures, ...DLCotherControls, ...DLCperks, ...DLCridePerks, ...DLCtalents, ...patrons, ...DLCRides, ...DLCwaifu_perks, ...dungeon, ...demiplane, ...symbioteBinding, ...symBuildings, ...synUnits, ...difficultyOptions, ...intensityPvP, ...invasionPvP]

const fuse = new Fuse(all, options)

const filtered = computed(() => {
  return searchString.value.length >= 3 ? fuse.search(`'${searchString.value}`) : []
})

const highlightedResult = computed(() => filtered.value.map(res => res.matches ? hightlightedDesc(res.matches) : 'No Matches'))

function hightlightedDesc(matches: readonly Fuse.FuseResultMatch[]) {
  const start = '<span class="bg-orange-300 dark:bg-orange-700">'
  const end = '</span>'
  const offset = start.length + end.length
  let res = ''
  matches.forEach((match) => {
    if (match.key === 'desc' && match.value) {
      let desc = match.value
      match.indices.forEach((ind, i: number) => desc = desc.replace(desc.slice(ind[0] + (offset * i), ind[1] + 1 + (offset * i)), `${start}${desc.slice(ind[0] + (offset * i), ind[1] + 1 + (offset * i))}${end}`))
      res = desc
    }
  })
  return res
}
</script>
