import { CHAR_COSTS } from '~/data/constatnts'

export interface World {
  worldName: string
  rating: number
  condition?: string | any[]
  additional?: string
  image?: string
}

export interface Character {
  name: string
  world: string
  tier: number
  image: string
  image_nsfw?: string
}

const baseBudget = ref(55)

const startingWorld = ref({} as World)

const startingOrigin = ref({
  title: '',
  cost: 0,
} as {
  title: string
  cost: number
  character?: string
  tier?: number
})

const intensities = ref([] as {
  title: string
  intensity: number
}[])

const binding = ref([] as {
  title: string
  cost: number
}[])

const luresBought = ref([] as {
  title: string
  cost: number
}[])

const heritage = ref([] as {
  title: string
  cost: number
  tree: string
}[])

const ridePerks = ref([] as {
  title: string
  cost: number
  addons?: any[]
  variant?: string
}[])

const homePerks = ref([] as {
  title: string
  cost: number
  count: number
}[])

const talentPerks = ref([] as {
  title: string
  cost: number
}[])

const defensePerks = ref([] as {
  title: string
  cost: number
  count: number
}[])

const miscPerks = ref([] as {
  title: string
  cost: number
}[])

const genericWaifuPerks = ref([] as {
  title: string
  waifu: string
  cost: number
}[])

const waifuPerks = ref([] as {
  title: string
  waifu: string
  cost: number
}[])

const companions = ref([] as {
  uid: number
  name: string
  world: string
  tier: number
}[])

const allEffects = ref([] as string[])

const userWorlds = ref([] as World[])
const localUserWorlds = useStorage<World[]>('localUserWorlds', [])

const userCharacters = ref([] as Character[])
const localUserCharacters = useStorage<Character[]>('localUserCharacters', [])

const baseBudgetAfter = computed(
  () => baseBudget.value + intensities.value.reduce((a, x) => x.intensity > 1 ? a + x.intensity : a, 0),
)

const flags = reactive({
  noBindings: true,
  noHeritage: true,
  danger11Start: false,
  pvpEnabled: false,
  chargen: true,
  hasARide: false,
})

const budget = computed(() => {
  let intensityFlat = 0
  const intenMultiplier = intensities.value
    .reduce((a, x) => x.intensity < 1 ? a += x.intensity : (intensityFlat += x.intensity, a), 0)

  const bindingCost = binding.value.reduce((a, x) => a += x.cost, 0)
  const heritageCost = heritage.value.reduce((a, x) => a += x.cost === 11111 ? 0 : x.cost, 0)

  const ridePerksCost = ridePerks.value.reduce((a, x) => a += x.cost === 11111 ? 0 : x.cost, 0)
  const homePerksCost = homePerks.value.reduce((a, x) => a += x.cost === 11111 ? 0 : x.cost, 0)
  const talentsCost = talentPerks.value.reduce((a, x) => a += x.cost === 11111 ? 0 : x.cost, 0)
  const defensesCost = defensePerks.value.reduce((a, x) => a += x.cost === 11111 ? 0 : x.cost, 0)
  const miscPerksCost = miscPerks.value.reduce((a, x) => a += x.cost === 11111 ? 0 : x.cost, 0)
  const waifuPerksCost = waifuPerks.value.reduce((a, x) => a += x.cost === 11111 ? 0 : x.cost, 0)
  const genericWaifuPerksCost = genericWaifuPerks.value.reduce((a, x) => a += x.cost === 11111 ? 0 : x.cost, 0)
  const luresCost = luresBought.value.reduce((a, x) => a += x.cost === 11111 ? 0 : x.cost, 0)

  const tierMod = flags.noBindings ? 2 : 1
  const companionsCost = companions.value.reduce((a, x) => x.tier === 11 ? a += 0 : a += CHAR_COSTS[x.tier - tierMod] || 1, 0)

  let bd = baseBudget.value
  if (bd === 11111) {
    bd = 0
    flags.danger11Start = true
  }

  return (bd + intensityFlat) * (1 + intenMultiplier) - startingOrigin.value.cost
         - bindingCost - heritageCost - luresCost - ridePerksCost - homePerksCost - talentsCost - defensesCost
         - miscPerksCost - waifuPerksCost - genericWaifuPerksCost - companionsCost
})

const tier11tickets = computed(() => {
  let ticket = 0
  if (baseBudget.value === 11111) ticket += 1

  const heritageCost = heritage.value.reduce((a, x) => a += x.cost === 11111 ? 1 : 0, 0)

  const ridePerksCost = ridePerks.value.reduce((a, x) => a += x.cost === 11111 ? 1 : 0, 0)
  const homePerksCost = homePerks.value.reduce((a, x) => a += x.cost === 11111 ? 1 : 0, 0)
  const talentsCost = talentPerks.value.reduce((a, x) => a += x.cost === 11111 ? 1 : 0, 0)
  const defensesCost = defensePerks.value.reduce((a, x) => a += x.cost === 11111 ? 1 : 0, 0)
  const miscPerksCost = miscPerks.value.reduce((a, x) => a += x.cost === 11111 ? 1 : 0, 0)
  const waifuPerksCost = waifuPerks.value.reduce((a, x) => a += x.cost === 11111 ? 1 : 0, 0)
  const genericWaifuPerksCost = genericWaifuPerks.value.reduce((a, x) => a += x.cost === 11111 ? 1 : 0, 0)
  const luresCost = luresBought.value.reduce((a, x) => a += x.cost === 11111 ? 1 : 0, 0)
  const companionsCost = companions.value.reduce((a, x) => x.tier === 11 ? a += 1 : a += 0, 0)

  return ticket - heritageCost - ridePerksCost - homePerksCost - talentsCost - defensesCost - miscPerksCost
    - waifuPerksCost - genericWaifuPerksCost - luresCost - companionsCost
})

export function useStore() {
  return {
    budget,
    baseBudget,
    baseBudgetAfter,
    allEffects,
    startingWorld,
    startingOrigin,
    userWorlds,
    localUserWorlds,
    intensities,
    binding,
    luresBought,
    heritage,
    ridePerks,
    homePerks,
    talentPerks,
    defensePerks,
    miscPerks,
    waifuPerks,
    genericWaifuPerks,
    companions,
    userCharacters,
    localUserCharacters,
    flags,
    tier11tickets,
  }
}
