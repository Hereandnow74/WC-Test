<template>
  <div class="sm:p-2">
    <Desc :desc="talentsDesc" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <div class="md:column-count-2 lg:column-count-3 pb-8">
      <PerkCard
        v-for="perk in perks"
        :key="perk.title"
        :perk="perk"
        :bg="miscAvailable(perk) ? 'light-blue-200 dark:light-blue-900 hover:(light-blue-100 dark:light-blue-800)'
          : 'gray-200 dark:gray-600'"
        :is-active="findIndex(miscPerks, {title: perk.title}) !== -1"
        @pickPerk="choosePerk"
      ></PerkCard>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { findIndex } from 'lodash-es'
import { perks, talentsDesc } from '~/data/talents'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'

import PerkCard from '~/components/PerkCard.vue'
import { choosePerk, miscAvailable } from '~/logic'

const { miscPerks } = useStore()

onMounted(() => useTooltips())

</script>
