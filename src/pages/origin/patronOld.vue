<template>
  <div class="p-2">
    <template v-if="settings.allChosenAuthors[0] !=='all' && !settings.allChosenAuthors.includes('Mortaegus’s Mod')">
      <h2 class="text-2xl text-center">
        Patrons
      </h2>
      <Note class="my-4 max-w-screen-md mx-auto" type="error" title="Outdated">
        These are no longer supported and can break your build, they still there only for reference.
      </Note>
      <Note class="my-4 max-w-screen-md mx-auto" type="info" title="Info">
        Patrons are not a part of Official Waifu Catalog and come from DLC by Mortaegus - <a target="_blank" rel="noopener noreferrer" href="https://forum.questionablequesting.com/threads/r34-economy-cyoa-thread.11289/page-568#post-3866836" class="underline text-blue-800 dark:text-blue-400">link</a>.
      </Note>
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

import { patrons } from '~/data/patronsDLC'

const { settings, patron } = useStore()

onMounted(() => useTooltips())

function choosePatron(pt: typeof patrons[0], saveInfo: {title: string; cost: number}) {
  if (!patronAvailable(pt)) return
  const ind = findIndex(patron.value, { title: pt.title })
  if (ind !== -1) {
    if (pt.effect && saveInfo.anything !== 'Invincibility') pt.effect.remove()
    patron.value.splice(ind, 1)
  }
  else {
    if (pt.effect && saveInfo.anything !== 'Invincibility') pt.effect.set()
    patron.value.push(saveInfo)
  }
}

function patronAvailable(pt: typeof patrons[0]) {
  let numOfPatrons = 1
  if (patron.value.length && patron.value[0].title === 'Archdeity of Eternity')
    numOfPatrons = 2

  return (patron.value.length < numOfPatrons) || (findIndex(patron.value, { title: pt.title }) !== -1)
}

</script>
