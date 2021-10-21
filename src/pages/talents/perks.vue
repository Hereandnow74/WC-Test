<template>
  <div class="">
    <Desc :desc="talentsDesc" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <div class="md:column-count-2 lg:column-count-3 pb-8">
      <PerkCard
        v-for="perk in perks"
        :key="perk.title"
        :perk="perk"
        :bg="isAvailable(perk) ? 'light-blue-200 dark:light-blue-900 hover:(light-blue-100 dark:light-blue-800)'
          : 'gray-200 dark:gray-600'"
        :is-available="isAvailable(perk)"
        :is-active="findIndex(miscPerks, {title: perk.title}) !== -1"
        @pickPerk="pickPerk(perk)"
      ></PerkCard>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { findIndex, intersection } from 'lodash-es'
import { perks, talentsDesc, Perk } from '~/data/talents'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'

import PerkCard from '~/components/PerkCard.vue'

const { allEffects, miscPerks } = useStore()

function isAvailable(perk: Perk): boolean {
  if (!perk.whitelist) { return true }
  else {
    if (intersection(perk.whitelist, allEffects.value).length === (perk.needed || perk.whitelist.length))
      return true
  }

  return false
}

const count = ref(0)

function pickPerk(perk: Perk) {
  if (isAvailable(perk)) {
    const ind = findIndex(miscPerks.value, { title: perk.title })
    if (ind !== -1) {
      if (count.value !== 0) {
        miscPerks.value[ind].count = count.value
        miscPerks.value[ind].cost = perk.cost * count.value
      }
      else {
        const toDel = miscPerks.value.splice(findIndex(miscPerks.value, { title: perk.title }))
        toDel.forEach(x => allEffects.value.splice(allEffects.value.indexOf(x.title), 1))
      }
    }
    else {
      if (count.value === 0) {
        allEffects.value.push(perk.title)
        miscPerks.value.push({ title: perk.title, cost: perk.cost })
      }
    }
  }
}

onMounted(() => useTooltips())

</script>
