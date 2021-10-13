<template>
  <div class="">
    <Desc :desc="defenceDesc" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <div class="md:column-count-2 lg:column-count-3 pb-8">
      <div
        v-for="defense in defenses"
        :id="defense.title"
        :key="defense.title"
        class="bg-rose-200 dark:bg-rose-900 p-2 mb-2 inline-block"
        @click="pickDefense(defense)"
      >
        <h3 class="relative text-center text-xl">
          {{ defense.title }} <span text="gray-600 dark:gray-400">(Cost: {{ defense.cost }})</span>
          <bi:check-lg v-if="findIndex(defensePerks, {title: defense.title}) !== -1" class="absolute top-1 right-1" />
        </h3>
        <Desc :desc="defense.desc" />
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { findIndex, intersection } from 'lodash-es'
import { defenses, defenceDesc, Defense } from '~/data/talents'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'

const { allEffects, defensePerks } = useStore()

function isAvailable(def: Defense): boolean {
  if (!def.whitelist) { return true }
  else {
    if (intersection(def.whitelist, allEffects.value).length === def?.whitelist?.length)
      return true
  }

  return true
}

function pickDefense(def: Defense) {
  if (isAvailable(def)) {
    if (allEffects.value.includes(def.title)) {
      const heritageToDelete = defensePerks.value.splice(findIndex(defensePerks.value, { title: def.title }))
      heritageToDelete.forEach(x => allEffects.value.splice(allEffects.value.indexOf(x.title), 1))
    }
    else {
      allEffects.value.push(def.title)
      defensePerks.value.push({ title: def.title, cost: def.cost, count: 1 })
    }
  }
}

onMounted(() => useTooltips())

</script>
