<template>
  <div class="sm:p-2">
    <h3 class="text-center text-xl pb-2">
      Other Contractors
    </h3>
    <Desc class="max-w-screen-md mx-auto dark:bg-gray-800 bg-blue-gray-300 rounded" :desc="invasion" />
    <div
      class="mt-4 pb-8 column-gap md:column-count-2"
    >
      <GenericPerkCard
        v-for="rule in invasionPvP"
        :id="rule.title"
        :key="rule.title"
        :perk="rule"
        :is-active="allEffects.includes(rule.title)"
        bg="blue-100 dark:gray-700 hover:blue-200 dark:hover:gray-800"
        @pickPerk="chooseOrb"
      />
    </div>
  </div>
</template>

<script lang='ts' setup>
import { Perk, PerkFull } from 'global'
import { invasion, invasionPvP } from '~/data/intensity'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'

import { pickSimplePerk } from '~/logic/'

const { allEffects, pvpPerks } = useStore()

onMounted(() => {
  useTooltips()
})

function chooseOrb(perk: PerkFull, saveData: Perk) {
  pickSimplePerk(perk, saveData, () => true, pvpPerks.value)
}

</script>
