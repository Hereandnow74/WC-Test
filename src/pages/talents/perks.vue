<template>
  <div class="">
    <Desc :desc="genericDesc" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <div class="md:column-count-2 lg:column-count-3 pb-8">
      <div
        v-for="perk in perks"
        :id="perk.title"
        :key="perk.title"
        class="bg-light-blue-200 dark:bg-light-blue-900 p-2 mb-2 inline-block"
        @click="pickPerk(perk)"
      >
        <h3 class="relative text-center text-xl">
          {{ perk.title }} <span text="gray-600 dark:gray-400">(Cost: {{ perk.cost }})</span>
          <bi:check-lg v-if="findIndex(miscPerks, {title: perk.title}) !== -1" class="absolute top-1 right-1" />
        </h3>
        <Desc :desc="perk.desc" />
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { findIndex, intersection } from 'lodash-es'
import { perks, genericDesc, Perk } from '~/data/talents'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'

const { allEffects, miscPerks } = useStore()

function isAvailable(perk: Perk): boolean {
  if (!perk.whitelist) { return true }
  else {
    if (intersection(perk.whitelist, allEffects.value).length === perk?.whitelist?.length)
      return true
  }

  return true
}

function pickPerk(perk: Perk) {
  if (isAvailable(perk)) {
    if (allEffects.value.includes(perk.title)) {
      const heritageToDelete = miscPerks.value.splice(findIndex(miscPerks.value, { title: perk.title }))
      heritageToDelete.forEach(x => allEffects.value.splice(allEffects.value.indexOf(x.title), 1))
    }
    else {
      allEffects.value.push(perk.title)
      miscPerks.value.push({ title: perk.title, cost: perk.cost })
    }
  }
}

onMounted(() => useTooltips())

</script>
