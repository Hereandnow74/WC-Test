<template>
  <div class="sm:p-2">
    <Desc :desc="lureDesc" class="bg-gray-200 dark:bg-gray-600 max-w-screen-md my-4 mx-auto" />
    <div
      class="column-gap"
      :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
    >
      <PerkCard
        v-for="lr in luresDLC"
        :key="lr.title"
        :perk="lr"
        :bg="lureAvailable(lr) ? 'pink-100 dark:pink-900 hover:(pink-200 dark:rose-800)'
          : 'gray-200 dark:gray-600'"
        :is-active="!!allLures[lr.title]"
        @pickPerk="chooseLure"
      >
      </PerkCard>
    </div>

    <h3 id="expansions" class="text-2xl text-center">
      Lure Expansions
    </h3>
    <Desc :desc="lureExpansionDesc" class="bg-gray-200 dark:bg-gray-600 max-w-screen-md my-4 mx-auto" />
    <div
      class="column-gap"
      :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
    >
      <PerkCard
        v-for="lr in lureExpansionsDLC"
        :key="lr.title"
        :perk="lr"
        :bg="lureAvailable(lr) ? 'pink-100 dark:pink-900 hover:(pink-200 dark:rose-800)'
          : 'gray-200 dark:gray-600'"
        :is-active="!!allLures[lr.title]"
        @pickPerk="chooseLure"
      >
      </PerkCard>
    </div>
  </div>
</template>

<script lang='ts' setup>
import {
  lureDesc, lures, lureExpansionDesc, lureExpansions,
} from '~/data/binding'
import { useTooltips } from '~/logic/misc'
import { chooseLure, lureAvailable } from '~/logic'
import { useStore } from '~/store/store'
import { DLClureExpansions, DLClures } from '~/data/DLCs'
import PerkCard from '~/components/PerkCard.vue'

const { luresBought, settings } = useStore()

const lureExpansionsDLC = computed(() => !settings.value.allChosenAuthors[0]
  ? lureExpansions
    .concat(DLClureExpansions
      .filter(perk => !settings.value.allChosenAuthors.includes(perk.dlc)))
  : lureExpansions)
const luresDLC = computed(() => !settings.value.allChosenAuthors[0]
  ? lures
    .concat(DLClures
      .filter(perk => !settings.value.allChosenAuthors.includes(perk.dlc)))
  : lures)

onMounted(() => useTooltips())

const allLures = computed(() => {
  const res: any = {}
  luresBought.value.forEach(x => res[x.title] = x)
  return res
})
</script>
