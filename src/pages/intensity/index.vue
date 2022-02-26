<template>
  <div class="sm:p-2">
    <Desc class="max-w-screen-md mx-auto dark:bg-gray-800 bg-blue-gray-300 rounded" :desc="desc" />
    <div
      class="mt-4 column-gap"
      :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
    >
      <component
        :is="rule.title ==='DR11 start' ? DR11 : IntensityCard"
        v-for="rule in intensityDLC"
        :id="rule.title"
        :key="rule.title"
        :perk="rule"
        :is-active="allEffects.includes(rule.title)"
        @chooseIntensity="chooseIntensity"
      />
    </div>
    <h3 class="text-center text-xl py-2">
      Other Contractors
    </h3>
    <Desc class="max-w-screen-md mx-auto dark:bg-gray-800 bg-blue-gray-300 rounded" :desc="contractors" />
    <div
      class="mt-4 pb-8 column-gap"
      :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
    >
      <IntensityCard
        v-for="rule in intensityPvP"
        :id="rule.title"
        :key="rule.title"
        :perk="rule"
        :is-active="allEffects.includes(rule.title)"
        @chooseIntensity="chooseIntensity"
      />
    </div>
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
import { PerkFull } from 'global'
import { DLCintensity } from '~/data/DLCs'
import { desc, intensity, intensityPvP, contractors, invasion, invasionPvP } from '~/data/intensity'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'

import { pickSimplePerk, chooseIntensity } from '~/logic/'
import { Perk } from '~/store/chargen'
import DR11 from '~/components/cards/perkCards/DR11.vue'
import IntensityCard from '~/components/cards/perkCards/IntensityCard.vue'

const { allEffects, settings, pvpPerks } = useStore()

const intensityDLC = computed(() => !settings.value.allChosenAuthors[0]
  ? intensity
    .concat(DLCintensity
      .filter(perk => !settings.value.allChosenAuthors.includes(perk.dlc)))
  : intensity)

onMounted(() => {
  useTooltips()
})

function chooseOrb(perk: PerkFull, saveData: Perk) {
  pickSimplePerk(perk, saveData, () => true, pvpPerks.value)
}

</script>
