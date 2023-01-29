<template>
  <div class="p-2">
    <template v-if="settings.allChosenAuthors[0] !=='all' && !settings.allChosenAuthors.includes('Despin')">
      <Note class="my-4 max-w-screen-md mx-auto" type="info" title="Info">
        This is a DLC made by <a class="font-bold hover:underline" href="https://docs.google.com/document/d/1Bdg1DMZcIk6FRgOkWWjnxCDHNsgjFAqOcNVM2uKxUtk/edit#" target="_blank" rel="noopener noreferrer">Despin</a>.
      </Note>

      <h3 class="text-center text-xl pb-2">
        Despin’s Tournament PvP
      </h3>

      <div class="max-w-screen-md mx-auto">
        <Table :headers="['Class Allowed', 'Tiers', 'Asset Cap']" :rows="weighTable" class="mt-4 mx-2 float-right text-sm md:text-base" />
        <Desc class="dark:bg-gray-800 bg-blue-gray-300 rounded" :desc="tournamentRules" />
      </div>

      <Desc
        class="mt-2 max-w-screen-md mx-auto dark:bg-gray-800 bg-blue-gray-300 rounded"
        :desc="`
      <h3 class='text-center text-lg pb-2'>Tournament Conditions</h3>
      You may personalize the difficulty of your Tournament PvP experience with the following options. Reward increases are additive.
      `"
      />

      <h3 class="text-center text-xl mt-4">
        Reward Table
      </h3>
      <Table :headers="['Round', 'Flyweight', 'Lightweight', 'Middleweight', 'Heavyweight','Anything Goes']" :rows="rewardRows" class="mx-auto text-sm md:text-base" />

      <div
        class="column-gap pb-8 mt-4"
        :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
      >
        <PerkCard
          v-for="other in tournamentPerks"
          :key="other.title"
          :perk="other"
          :bg="genericAvailable(other) ? 'gray-100 dark:gray-900 hover:(gray-200 dark:gray-800)'
            : 'gray-200 dark:gray-600'"
          :is-active="allEffects.includes(other.title)"
          @pickPerk="chooseOrb"
        >
        </PerkCard>
      </div>
    </template>
  </div>
</template>

<script lang='ts' setup>
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'

import { pickSimplePerk, genericAvailable } from '~/logic/'
import { tournamentRules, weighTable, tournamentPerks } from '~/data/tournamentDLC'

const { allEffects, settings, pvpPerks } = useStore()

onMounted(() => {
  useTooltips()
})

function chooseOrb(perk: PerkFull, saveData: Perk) {
  saveData = { ...saveData, reward: perk.reward }
  if (genericAvailable(perk))
    pickSimplePerk(perk, saveData, () => true, pvpPerks.value)
}

const rewardRows = computed(() => {
  const rewardCoefficient = pvpPerks.value.reduce((a, x) => a += (x.reward || 0), 0) + 1
  return [0, 0, 0, 0, 0].map((p, i) => [i * 2 + 2, ...[0, 0, 0, 0, 0].map((j, k) => ((k + 1) * 50 * rewardCoefficient) * Math.pow(2, i))])
})

</script>
