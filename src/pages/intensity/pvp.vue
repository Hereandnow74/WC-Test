<template>
  <div class="sm:p-2">
    <Desc class="max-w-screen-md mx-auto dark:bg-gray-800 bg-blue-gray-300 rounded" :desc="contractors" />
    <div
      class="pb-8 column-gap"
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
  </div>
</template>

<script lang='ts' setup>
import { intensityPvP, contractors } from '~/data/intensity'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'

import { chooseIntensity } from '~/logic/'
import IntensityCard from '~/components/cards/perkCards/IntensityCard.vue'

const { allEffects, settings } = useStore()

onMounted(() => {
  useTooltips()
})

</script>
