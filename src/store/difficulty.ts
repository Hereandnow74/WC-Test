import { clamp } from 'lodash-es'
import { useStore } from './store'
import { CHAR_COSTS, CHAR_COSTS_FULL, WORLD_RATINGS_DF } from '~/data/constants'

const { difficultyRating, captureKoeff, sellKoeff } = useStore()

const worldDifficultyRow = computed(() => {
  const budgetRow = WORLD_RATINGS_DF.slice(1).map(w => Math.round(w * (2.5 / (clamp(difficultyRating.value, 0, 10) + 1.5)) / 5) * 5)
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

export function useDifficulty() {
  return {
    worldDifficultyRow,
    captureRow,
    captureExtraRow,
    sellRow,
    IMGcaptureRow,
    IMGsellRow,
    IMGcaptureRowT,
    IMGsellRowT,
    combinedIMGCapture,
    combinedIMGSell,
  }
}
