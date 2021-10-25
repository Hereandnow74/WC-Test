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
        <template v-if="homePerk.multiple" #title>
          <NumberInput v-model="count" :min="0" :max="25" class="text-base ml-2" />
        </template>
      </PerkCard>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { findIndex, intersection } from 'lodash-es'
import { homes, homeDesc, HomePerk } from '~/data/talents'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'

const { allEffects, homePerks, flags } = useStore()

function isAvailable(home: HomePerk): boolean {
  if (home.whitelist) {
    // TODO: Do it better
    if (home.whitelist[0].match(/\(\d+x\)/) && findIndex(homePerks.value, { count: 25 }) !== -1)
      return true
    if (intersection(home.whitelist, allEffects.value).length >= (home.needed || home.whitelist.length))
      return true
    if (home.flag) return flags[home.flag]
    return false
  }
  return true
}

const count = ref(0)

function pickHome(home: HomePerk) {
  if (isAvailable(home)) {
    const ind = findIndex(homePerks.value, { title: home.title })
    if (ind !== -1) {
      if (home.multiple && count.value !== 0) {
        homePerks.value[ind].count = count.value
        homePerks.value[ind].cost = home.cost * count.value
      }
      else {
        const toDel = homePerks.value.splice(ind)
        toDel.forEach(x => allEffects.value.splice(allEffects.value.indexOf(x.title), 1))
      }
    }
    else {
      allEffects.value.push(home.title)
      homePerks.value.push({ title: home.title, cost: home.cost, count: count.value })
    }
  }
}

onMounted(() => useTooltips())

</script>
