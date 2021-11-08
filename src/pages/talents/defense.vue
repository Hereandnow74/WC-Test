<template>
  <div class="md:p-2">
    <div class=" mb-4 max-w-4xl mx-auto">
      <Desc :desc="additionalDefenseDesc" class="bg-amber-200 text-gray-800 text-sm md:text-base w-3/5 float-right mt-8 mx-2 border-3 border-gray-900" />
      <Desc :desc="defenceDesc" class="p-2 bg-violet-200 dark:bg-violet-900" />
    </div>
    <div class="md:column-count-2 lg:column-count-3 pb-8">
      <PerkCard
        v-for="defense in defenses"
        :key="defense.title"
        :perk="defense"
        :bg="isAvailable(defense) ? 'rose-200 dark:rose-900 hover:(rose-100 dark:rose-800)'
          : 'gray-200 dark:gray-600'"
        :is-available="isAvailable(defense)"
        :is-active="!!allDefenses[defense.title]"
        :saved-perk="allDefenses[defense.title]"
        :is-multiple="true"
        :max="2"
        @pickPerk="pickDefense"
      >
      </PerkCard>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { findIndex, intersection } from 'lodash-es'
import { defenses, defenceDesc, additionalDefenseDesc, PerkFull } from '~/data/talents'
import { useTooltips } from '~/logic/misc'
import { Perk, useStore } from '~/store/store'

const { allEffects, defensePerks } = useStore()

const allDefenses = computed(() => {
  const res: any = {}
  defensePerks.value.forEach(x => res[x.title] = x)
  return res
})

function isAvailable(def: PerkFull): boolean {
  if (!def.whitelist) { return true }
  else {
    if (intersection(def.whitelist, allEffects.value).length >= (def.needed || def.whitelist.length))
      return true
  }
  return false
}

function pickDefense(def: PerkFull, saveData: Perk) {
  if (isAvailable(def)) {
    const ind = findIndex(defensePerks.value, { title: def.title })
    if (ind !== -1) {
      if (saveData.count && saveData.count > 0) {
        defensePerks.value[ind].count = saveData.count
        defensePerks.value[ind].cost = saveData.cost
      }
      else {
        const toDel = defensePerks.value.splice(ind)
        toDel.forEach(x => allEffects.value.splice(allEffects.value.indexOf(x.title), 1))
      }
    }
    else {
      if (saveData.count && saveData.count > 0) {
        allEffects.value.push(def.title)
        defensePerks.value.push(saveData)
      }
    }
  }
}

onMounted(() => useTooltips())

</script>
