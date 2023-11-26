<template>
  <div class="p-2">
    <template v-if="settings.allChosenAuthors[0] !=='all' && !settings.allChosenAuthors.includes('Mortaegus’s Mod')">
      <h3 class="text-2xl text-center flex flex-col">
        <a class="hover:underline" href="https://docs.google.com/document/d/1ETbNQt4mcekIh1VWPEJ6K2vbVguAzZmgkGaxQjMuQ2s/edit#" target="_blank" rel="noopener noreferrer"><span class="font-semibold">Patron Overhaul DLC v.1.0</span></a>
        <span class="text-base">By Rhivan, DepressedAlucard, and Despin</span>
      </h3>
      <Note class="my-4 max-w-screen-md mx-auto" type="info" title="Info">
        This is a rework of the original Patrons DLC idea by Mortaegus that can be found <router-link class="text-blue-700 dark:text-blue-300 underline" to="/origin/patronOld">
          here
        </router-link>
      </Note>

      <Desc class="p-2 bg-gray-200 dark:bg-teal-900 max-w-4xl mx-auto my-4 italic" :desc="patronIntro" />

      <div class="mb-4 max-w-4xl mx-auto">
        <Desc class="bg-amber-200 text-gray-800 text-sm w-2/5 float-right mt-4 mx-2 border-3 border-gray-900" :desc="patronNote" />
        <Desc class="p-2 bg-gray-200 dark:bg-teal-900 max-w-4xl mx-auto my-4" :desc="intro" />
      </div>

      <div
        class="column-gap pb-8"
        :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
      >
        <PatronCard
          v-for="pt in patrons"
          :key="pt.uid"
          :perk="pt"
          :bg="patronAvailable(pt) ? 'purple-100 dark:(purple-400 opacity-15) hover:(light-300 dark:purple-600 dark:opacity-15)'
            : 'gray-200 dark:gray-600'"
          :is-active="findIndex(patron, { title: pt.title }) !== -1"
          @pickPerk="choosePatron"
        />
      </div>
    </template>
  </div>
</template>

<script lang='ts' setup>
import { findIndex } from 'lodash-es'

import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'

import { intro, patrons, patronNote, patronIntro } from '~/data/patronsRework'
import { patronEffects } from '~/logic/pagesLogic/patronsLogic'

const { settings, patron } = useStore()

onMounted(() => useTooltips())

function choosePatron(pt: typeof patrons[0], saveInfo: {uid: string; title: string; cost: number}) {
  if (!patronAvailable(pt)) return
  const ind = findIndex(patron.value, { title: pt.title })
  if (ind !== -1) {
    if (patronEffects[pt.title])
      patronEffects[pt.title].remove()
    patron.value.splice(ind, 1)
  }
  else {
    if (patronEffects[pt.title])
      patronEffects[pt.title].add()

    patron.value.push(saveInfo)
  }
}

function patronAvailable(pt: typeof patrons[0]) {
  return (patron.value.length < 1) || (findIndex(patron.value, { title: pt.title }) !== -1)
}

</script>
