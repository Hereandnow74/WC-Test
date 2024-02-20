import { buyCompanionDialog } from '../dialog'
import { buyAnyPerk, removeAnyPerk } from '../perksLogic'
import { useStore } from '~/store/store'
import { useGlobalSettings } from '~/store/settings'

const { companions } = useStore()
const { canPurchase, slightlyUsedTierDiscount, bindingDiscount, luresDiscount } = useGlobalSettings()

export const patronEffects = {
  'First Contractor': {
    add: () => {
      buyCompanionDialog().catch(error => console.log(error.message))
    },
    remove: () => {
      companions.value.splice(0, 1)
    },
  },
  'Isekai Genie': {
    add: () => {
      canPurchase.value = false
    },
    remove: () => {
      canPurchase.value = true
    },
  },
  'The Devil': {
    add: () => {
      buyAnyPerk('White Eye Orb')
      buyAnyPerk('Red Eye Orb')
    },
    remove: () => {
      removeAnyPerk('', 'White Eye Orb')
      removeAnyPerk('', 'Red Eye Orb')
    },
  },
  'Great Old One': {
    add: () => {
      buyAnyPerk('Lurking On The Threshold')
      buyAnyPerk('Ancestral Diversity')
    },
    remove: () => {
      removeAnyPerk('', 'Lurking On The Threshold')
      removeAnyPerk('', 'Ancestral Diversity')
    },
  },
  'The Merchant': {
    add: () => {
      buyAnyPerk('Green Eye Orb')
      buyAnyPerk('Communication Talent')
    },
    remove: () => {
      removeAnyPerk('', 'Green Eye Orb')
      removeAnyPerk('', 'Communication Talent')
    },
  },
  'The Fallen Legion': {
    add: () => {
      buyAnyPerk('Conjunction')
      buyAnyPerk('Communication Talent')
    },
    remove: () => {
      removeAnyPerk('', 'Conjunction')
      removeAnyPerk('', 'Communication Talent')
    },
  },
  'Truck-kun': {
    add: () => {
      buyAnyPerk('Space Truckin’')
    },
    remove: () => {
      removeAnyPerk('', 'Space Truckin’')
    },
  },
  'Archangel of Benevolence': {
    add: () => {
      slightlyUsedTierDiscount.value = 1
      bindingDiscount.value = 0.5
      luresDiscount.value = 0.5
    },
    remove: () => {
      slightlyUsedTierDiscount.value = 0
      bindingDiscount.value = 1
      luresDiscount.value = 1
    },
  },
  'Nice Guy': {
    add: () => {
      luresDiscount.value = 0.8
    },
    remove: () => {
      luresDiscount.value = 1
    },
  },
} as Record<string, {add: () => void; remove: () => void}>
