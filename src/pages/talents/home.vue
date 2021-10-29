<template>
  <div class="">
    <Desc :desc="homeDesc" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <div class="md:column-count-2 lg:column-count-3 pb-8">
      <PerkCard
        v-for="homePerk in homes"
        :key="homePerk.title"
        :perk="homePerk"
        :bg="isAvailable(homePerk) ? 'yellow-200 dark:yellow-900 hover:(yellow-100 dark:yellow-800)'
          : 'gray-200 dark:gray-600'"
        :is-available="isAvailable(homePerk)"
        :is-active="findIndex(homePerks, {title: homePerk.title}) !== -1"
        @pickPerk="pickHome"
      >
      </PerkCard>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { findIndex, intersection } from 'lodash-es'
import { homes, homeDesc, PerkFull } from '~/data/talents'
import { useTooltips } from '~/logic/misc'
import { Perk, useStore } from '~/store/store'

const { allEffects, homePerks, flags } = useStore()

function isAvailable(home: PerkFull): boolean {
  if (home.whitelist) {
    // TODO: Do it better
    if (home.whitelist[0].match(/\(\d+x\)/) && findIndex(homePerks.value, { count: 25 }) !== -1)
      return true
    if (intersection(home.whitelist, allEffects.value).length >= (home.needed || home.whitelist.length))
      return true
    if (home.flag) return flags.value[home.flag]
    return false
  }
  return true
}

function pickHome(home: PerkFull, saveData: Perk) {
  if (isAvailable(home)) {
    const ind = findIndex(homePerks.value, { title: home.title })
    if (ind !== -1) {
      if (home.multiple && saveData.count !== 0) {
        homePerks.value[ind].count = saveData.count
        homePerks.value[ind].cost = home.cost * saveData.count
      }
      else {
        const toDel = homePerks.value.splice(ind)
        toDel.forEach(x => allEffects.value.splice(allEffects.value.indexOf(x.title), 1))
      }
    }
    else {
      allEffects.value.push(home.title)
      homePerks.value.push(saveData)
    }
  }
}

onMounted(() => useTooltips())

</script>
