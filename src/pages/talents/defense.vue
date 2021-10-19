<template>
  <div class="md:p-2">
    <Desc :desc="defenceDesc" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <div class="md:column-count-2 lg:column-count-3 pb-8">
      <PerkCard
        v-for="defense in defenses"
        :key="defense.title"
        :perk="defense"
        :bg="isAvailable(defense) ? 'rose-200 dark:rose-900 hover:(rose-100 dark:rose-800)'
          : 'gray-200 dark:gray-600'"
        :is-available="isAvailable(defense)"
        :is-active="findIndex(defensePerks, {title: defense.title}) !== -1"
        :max="2"
        :calculated-cost="defense.cost*count"
        @pickPerk="pickDefense(defense)"
      >
        <template #title>
          <Select placeholder="For whom" class="inline-block text-base ml-2" :options="targetList" @click.stop />
          <NumberInput v-model="count" :min="0" :max="2" class="text-base ml-2" />
        </template>
      </PerkCard>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { findIndex, intersection } from 'lodash-es'
import { defenses, defenceDesc, Defense } from '~/data/talents'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'

const targetList = ref([{ name: 'You', value: 'You' }])
const count = ref(0)

const { allEffects, defensePerks, companions } = useStore()
companions.value.forEach(x => targetList.value.push({ name: x.name, value: x.name }))

function isAvailable(def: Defense): boolean {
  if (!def.whitelist) { return true }
  else {
    if (intersection(def.whitelist, allEffects.value).length === (def.needed || def.whitelist.length))
      return true
  }
  return false
}

function pickDefense(def: Defense) {
  if (isAvailable(def)) {
    const ind = findIndex(defensePerks.value, { title: def.title })
    if (ind !== -1) {
      if (count.value !== 0) {
        defensePerks.value[ind].count = count.value
        defensePerks.value[ind].cost = def.cost * count.value
      }
      else {
        const heritageToDelete = defensePerks.value.splice(findIndex(defensePerks.value, { title: def.title }))
        heritageToDelete.forEach(x => allEffects.value.splice(allEffects.value.indexOf(x.title), 1))
      }
    }
    else {
      if (count.value > 0) {
        allEffects.value.push(def.title)
        defensePerks.value.push({ title: def.title, cost: def.cost, count: count.value })
      }
    }
  }
}

onMounted(() => useTooltips())

</script>
