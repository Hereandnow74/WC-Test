<template>
  <div class="sm:p-2">
    <Desc class="max-w-screen-md mx-auto dark:bg-gray-800 bg-blue-gray-300 rounded" :desc="desc" />
    <div
      class="mt-4 column-gap"
      :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
    >
      <component
        :is="rule.title ==='DRX start' ? DR11 : IntensityCard"
        v-for="rule in intensity"
        :id="rule.title"
        :key="rule.title"
        :perk="rule"
        :is-active="allEffects.includes(rule.title)"
        @chooseIntensity="chooseIntensity"
      />
    </div>
    <template v-if="intensityDLC.length">
      <h2 class="text-2xl text-center">
        DLC Intensity
      </h2>
      <DLCNote />
      <div
        class="column-gap pb-8"
        :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
      >
        <IntensityCard
          v-for="rule in intensityDLC"
          :id="rule.title"
          :key="rule.title"
          :perk="rule"
          :is-active="allEffects.includes(rule.title)"
          @chooseIntensity="chooseIntensity"
        >
        </IntensityCard>
      </div>
    </template>
  </div>
</template>

<script lang='ts' setup>
import { DLCintensity } from '~/data/DLCs'
import { desc, intensity } from '~/data/intensity'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'

import { chooseIntensity } from '~/logic/'
import DR11 from '~/components/cards/perkCards/DR11.vue'
import IntensityCard from '~/components/cards/perkCards/IntensityCard.vue'

const { allEffects, settings } = useStore()

const intensityDLC = computed(() => !settings.value.allChosenAuthors[0]
  ? DLCintensity.filter(perk => !settings.value.allChosenAuthors.includes(perk.dlc))
  : [])

onMounted(() => {
  useTooltips()
})

</script>
