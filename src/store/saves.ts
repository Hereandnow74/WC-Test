import { useChallenges } from './challenges'
import { useStore } from './store'

interface SaveListItem {
  uid: number
  name: string
  worldName: string
  rating: number
  totalCost: number
  date: string
}

const {
  startingWorld, startingOrigin, intensities, binding, homePerks, defensePerks,
  companions, heritage, talentPerks, waifuPerks, ridePerks, miscPerks, luresBought, genericWaifuPerks,
  budgetMods, baseBudget, allEffects, flags, otherPerks,
} = useStore()

const { activeChallenges } = useChallenges()

const savesList = useStorage<SaveListItem[]>('savesList', [])

const buildList = ref([])

export function useSaves() {
  return {
    savesList,
    buildList,
  }
}

export function writeBuildValues(build: any) {
  baseBudget.value = build.baseBudget || 0
  startingWorld.value = build.startingWorld
  startingOrigin.value = build.startingOrigin
  intensities.value = build.intensities.length ? build.intensities : []
  binding.value = build.binding.length ? build.binding : []
  otherPerks.value = build.otherPerks.length ? build.otherPerks : []
  luresBought.value = build.luresBought.length ? build.luresBought : []
  heritage.value = build.heritage.length ? build.heritage : []
  ridePerks.value = build.ridePerks.length ? build.ridePerks : []
  homePerks.value = build.homePerks.length ? build.homePerks : []
  talentPerks.value = build.talentPerks.length ? build.talentPerks : []
  defensePerks.value = build.defensePerks.length ? build.defensePerks : []
  miscPerks.value = build.miscPerks.length ? build.miscPerks : []
  genericWaifuPerks.value = build.genericWaifuPerks.length ? build.genericWaifuPerks : []
  waifuPerks.value = build.waifuPerks.length ? build.waifuPerks : []
  companions.value = build.companions.length ? build.companions : []
  allEffects.value = build.allEffects.length ? build.allEffects : []
  flags.value = build.flags
  budgetMods.value = build.budgetMods
  activeChallenges.value = build.activeChallenges.length ? build.activeChallenges : []
}

export function getSaveObject() {
  return {
    baseBudget: baseBudget.value,
    startingWorld: startingWorld.value,
    startingOrigin: startingOrigin.value,
    intensities: intensities.value,
    binding: binding.value,
    luresBought: luresBought.value,
    otherPerks: otherPerks.value,
    heritage: heritage.value,
    ridePerks: ridePerks.value,
    homePerks: homePerks.value,
    talentPerks: talentPerks.value,
    defensePerks: defensePerks.value,
    miscPerks: miscPerks.value,
    genericWaifuPerks: genericWaifuPerks.value,
    waifuPerks: waifuPerks.value,
    companions: companions.value,
    allEffects: allEffects.value,
    flags: flags.value,
    budgetMods: budgetMods.value,
    activeChallenges: activeChallenges.value,
  }
}
