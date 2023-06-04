<template>
  <div class="p-0.5 sm:p-2 w-full">
    <Desc class="max-w-screen-md mx-auto dark:bg-gray-800 bg-blue-gray-300 rounded" :desc="difficultyRules" />

    <h3 class="text-center text-lg font-bold mt-4">
      Values affected by Intensity
    </h3>

    <div class="overflow-x-auto max-w-min mx-auto mb-4">
      <table class="border-collapse w-max bg-amber-200 text-gray-600 min-w-0">
        <thead>
          <th v-for="header in ['', 'Tier 1', 'Tier 2', 'Tier 3', 'Tier 4', 'Tier 5', 'Tier 6', 'Tier 7', 'Tier 8', 'Tier 9', 'Tier 10' ]" :key="header" class="border border-gray-600 px-2 font-bold">
            {{ header }}
          </th>
        </thead>
        <tbody>
          <tr v-for="row in [captureRow, sellRow, captureExtraRow]" :key="row[0]" class="odd:(bg-black bg-opacity-5)">
            <td
              v-for="value in row"
              :key="value"
              class="border border-gray-600 px-2 first:(font-bold)"
              :class="typeof value === 'object' ? value[1] : ''"
            >
              {{ typeof value === 'object' ? value[0] : value }}
            </td>
          </tr>
          <tr class="odd:(bg-black bg-opacity-5)">
            <td
              v-for="value in ['', 'TX', 'TY', 'TZ']"
              :key="value"
              colspan="2"
              class="border border-gray-600 px-2 font-bold"
              :class="typeof value === 'object' ? value[1] : ''"
            >
              {{ typeof value === 'object' ? value[0] : value }}
            </td>
          </tr>
          <tr v-for="row in [combinedIMGCapture, combinedIMGSell]" :key="row[0]" class="odd:(bg-black bg-opacity-5)">
            <td
              v-for="value in row"
              :key="value"
              colspan="2"
              class="border border-gray-600 px-2 first:(font-bold)"
              :class="typeof value === 'object' ? value[1] : ''"
            >
              {{ typeof value === 'object' ? value[0] : value }}
            </td>
          </tr>
          <tr class="odd:(bg-black bg-opacity-5)">
            <td
              v-for="value in ['', 'DR 1', 'DR 2', 'DR 3', 'DR 4', 'DR 5', 'DR 6', 'DR 7', 'DR 8', 'DR 9', 'DR 10']"
              :key="value"
              class="border border-gray-600 px-2 font-bold"
              :class="typeof value === 'object' ? value[1] : ''"
            >
              {{ typeof value === 'object' ? value[0] : value }}
            </td>
          </tr>
          <tr class="odd:(bg-black bg-opacity-5)">
            <td
              v-for="value in worldDifficultyRow"
              :key="value"
              class="border border-gray-600 px-2 first:(font-bold)"
              :class="typeof value === 'object' ? value[1] : ''"
            >
              {{ typeof value === 'object' ? value[0] : value }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="mt-4 column-gap"
      :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
    >
      <div v-for="rule in difficultyOptions. slice(0, -1)" :key="rule.uid" class="column-block">
        <div class="text-lg text-center font-semibold leading-loose">
          {{ displayTitle(rule) }}
        </div>
        <DifficultyCard
          :id="rule.title"
          :perk="rule"
          :is-active="difficulties.findIndex((x) => x.uid === rule.uid) !== -1"
        />
      </div>
      <!-- <div class="text-lg text-center font-semibold leading-loose">
        Utility
      </div>
      <PerkCard
        :perk="difficultyOptions. slice(-1)[0]"
        :is-active="difficulties.findIndex((x) => x.uid === difficultyOptions. slice(-1)[0].uid) !== -1"
        :bg="difficultyAvailable(difficultyOptions. slice(-1)[0]) ? 'blue-100 dark:gray-700 hover:blue-200 dark:hover:gray-800' : 'gray-200 dark:gray-500'"
        @pickPerk="chooseDifficulty(difficultyOptions. slice(-1)[0])"
      /> -->
    </div>
  </div>
</template>

<script lang='ts' setup>
import { clamp } from 'lodash-es'
import { CHAR_COSTS, CHAR_COSTS_FULL, WORLD_RATINGS } from '~/data/constants'
import { difficultyOptions, difficultyRules } from '~/data/difficulty'
import { useTooltips } from '~/logic/misc'
import { difficultyAvailable, chooseDifficulty } from '~/logic/perksLogic'
import { useStore } from '~/store/store'

const { settings, difficultyRating, captureKoeff, sellKoeff, difficulties } = useStore()

let savedType = ''
const typeTitles = {
  legacy: 'Legacy',
  team: 'Team',
  payment: 'Payment',
  binding: 'Bindings',
  template: 'Template',
  defenses: 'Defenses',
  leveling: 'Leveling',
  worlds: 'Worlds',
  warranty: 'Warranty',
  death: 'Death',
  random: 'Random',
  other: 'Misc',
}

const worldDifficultyRow = computed(() => {
  const budgetRow = WORLD_RATINGS.slice(1, -1).map(w => Math.round(Math.round(w.budget * ((1 + 1.5) / (clamp(difficultyRating.value, 0, 10) + 1.5)) / 5) * 5))
  return ['Budget', ...budgetRow]
})

const captureRow = computed(() => {
  return ['Capture', ...CHAR_COSTS.slice(1, -3).map(cost => Math.floor(cost * clamp(difficultyRating.value, 0, 10) * captureKoeff.value * 0.16))]
})
const captureExtraRow = computed(() => {
  return ['Capture Extra', ...CHAR_COSTS.slice(1, -3).map(cost => Math.min(Math.floor(cost * clamp(difficultyRating.value, 0, 10) * captureKoeff.value * 0.16), Math.floor(cost * 0.05)))]
})

const sellRow = computed(() => {
  return ['Sell', ...CHAR_COSTS.slice(1, -3).map(cost => Math.floor(cost * clamp(difficultyRating.value, 0, 10) * sellKoeff.value * 0.16))]
})

const IMGcaptureRow = computed(() => {
  return CHAR_COSTS_FULL.slice(11).map(cost => Math.floor(cost * clamp(difficultyRating.value, 0, 10) * captureKoeff.value * 0.16) % 1000)
})

const IMGsellRow = computed(() => {
  return CHAR_COSTS_FULL.slice(11).map(cost => Math.floor(cost * clamp(difficultyRating.value, 0, 10) * sellKoeff.value * 0.16) % 1000)
})

const IMGcaptureRowT = computed(() => {
  return CHAR_COSTS_FULL.slice(11).map(cost => Math.floor(cost * clamp(difficultyRating.value, 0, 10) * captureKoeff.value * 0.16 / 1000))
})
const IMGsellRowT = computed(() => {
  return CHAR_COSTS_FULL.slice(11).map(cost => Math.floor(cost * clamp(difficultyRating.value, 0, 10) * sellKoeff.value * 0.16 / 1000) + (difficultyRating.value > 0 ? 1 : 0))
})

const combinedIMGCapture = computed(() => {
  return ['Capture', ...IMGcaptureRow.value.map((x, i) => `${x}${IMGcaptureRowT.value[i] > 0 ? ` + ${IMGcaptureRowT.value[i]}` + ' IMG' : ''}`)]
})
const combinedIMGSell = computed(() => {
  return ['Sell', ...IMGsellRow.value.map((x, i) => `${x}${IMGsellRowT.value[i] > 0 ? ` + ${IMGsellRowT.value[i]}` + ' IMG' : ''}`)]
})

function displayTitle(rule) {
  if (rule.type !== savedType && rule.type.slice(0, -1) !== savedType.slice(0, -1)) {
    savedType = rule.type
    return typeTitles[rule.type] || typeTitles[rule.type.slice(0, -1)]
  }
  else { return '' }
}

onMounted(() => {
  useTooltips()
})

</script>
