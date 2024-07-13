
import { PerkFull } from 'global'
import { findIndex } from 'lodash-es'
import { bindings, lures, otherControls } from '../data/binding'
import { homes } from '../data/demdun'
import { heritages } from '../data/heritage'
import { defenses, genericPerks, perks, talents } from '../data/talents'
import { waifu_perks } from '../data/waifu_perks'
import { useStore } from '~/store/store'

interface PerkStorage {
  'Challenge': PerkFull[]
  'Origin': PerkFull[]
  'Intensity': PerkFull[]
  'Binding': PerkFull[]
  'Lure': PerkFull[]
  'Other control': PerkFull[]
  'Heritage': PerkFull[]
  'Demiplane & Dungeons': PerkFull[]
  'Talent': PerkFull[]
  'Defense': PerkFull[]
  'Other': PerkFull[]
  'Generic waifu perk': PerkFull[]
  'Specific waifu perk': PerkFull[]
}

export const localPerks = useStorage('localPerks', {} as PerkStorage)

const fullBindings = computed(() => localPerks.value.Binding ? bindings.concat(localPerks.value.Binding) : bindings)
const fullLures = computed(() => localPerks.value.Lure ? lures.concat(localPerks.value.Lure) : lures)
const fullOtherControls = computed(() => localPerks.value['Other control'] ? otherControls.concat(localPerks.value['Other control']) : otherControls)
const fullHeritages = computed(() => localPerks.value.Heritage ? heritages.concat(localPerks.value.Heritage) : heritages)
const fullHomes = computed(() => localPerks.value['Demiplane & Dungeons'] ? homes.concat(localPerks.value['Demiplane & Dungeons']) : homes)
const fullTalents = computed(() => localPerks.value.Talent ? talents.concat(localPerks.value.Talent) : talents)
const fullDefenses = computed(() => localPerks.value.Defense ? defenses.concat(localPerks.value.Defense) : defenses)
const fullOtherPerks = computed(() => {
  // If À la carte difficulty is chosen, replace Warranty perk with other version
  const { allEffects } = useStore()
  const otherPerks = [...perks]
  if (allEffects.value.includes('À la carte'))
    otherPerks.splice(findIndex(otherPerks, { uid: '4qh4k' }), 1)
  else
    otherPerks.splice(findIndex(otherPerks, { uid: '4qh5k' }), 1)
  return localPerks.value.Other ? otherPerks.concat(localPerks.value.Other) : otherPerks
})
const fullGeneric = computed(() => localPerks.value['Generic waifu perk'] ? genericPerks.concat(localPerks.value['Generic waifu perk']) : genericPerks)
const fullSpecific = computed(() => localPerks.value['Specific waifu perk'] ? waifu_perks.concat(localPerks.value['Specific waifu perk']) : waifu_perks)

export function useFullPerks() {
  return {
    bindings: fullBindings,
    lures: fullLures,
    otherControls: fullOtherControls,
    heritages: fullHeritages,
    homes: fullHomes,
    talents: fullTalents,
    defenses: fullDefenses,
    perks: fullOtherPerks,
    genericPerks: fullGeneric,
    waifu_perks: fullSpecific,
  }
}
