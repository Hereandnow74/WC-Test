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
  cost?: number
  image: string
  image_nsfw?: string
}

export interface Perk {
  title: string
  cost: number
  count?: number
  tree?: string
  addons?: any[]
  variant?: string
  target?: string[]
  freebies?: object
  refund?: number
  anything?: string
}

export interface Origin {
  title: string
  cost: number
  character?: string
  tier?: number
}

const params = useUrlSearchParams('history')
const mode = ref<('local' | 'remote' | 'done')>('local')
if (params.load?.length)
  mode.value = 'remote'

function storeType<T>(name: string, value: T) {
  return mode.value === 'local' ? useStorage<T>(name, value) : ref<T>(value)
}
const baseBudget = storeType('baseBudget', 55)

const startingWorld = storeType<World>('startingWorld', {
  worldName: 'Current world',
  rating: 2,
})

const startingOrigin = storeType<Origin>('startingOrigin', {
  title: '',
  cost: 0,
})

const intensities = storeType('intensities', [] as {
  title: string
  intensity: number
  count: number
}[])

const binding = storeType<Perk[]>('binding', [])

const luresBought = storeType<Perk[]>('luresBought', [])

const heritage = storeType<Perk[]>('heritage', [])

const ridePerks = storeType<Perk[]>('ridePerks', [])

const homePerks = storeType<Perk[]>('homePerks', [])

const talentPerks = storeType<Perk[]>('talentPerks', [])

const defensePerks = storeType<Perk[]>('defensePerks', [])

const miscPerks = storeType<Perk[]>('miscPerks', [])

const genericWaifuPerks = storeType<Perk[]>('genericWaifuPerks', [])

const waifuPerks = storeType<Perk[]>('waifuPerks', [])

const companions = storeType('companions', [] as {
  uid: number
  name: string
  world: string
  tier: number
  priceTier: number
  sold?: boolean
  method: 'buy' | 'capture' | 'steal' | 'yoink' | 'used'
}[])

const allEffects = storeType('allEffects', [] as string[])

const budgetMods = storeType('budgetMods', {
  plus: 0,
  minus: 0,
  plus11: 0,
  minus11: 0,
})

const flags = storeType('flags', {
  noBindings: true,
  noHeritage: true,
  danger11Start: false,
  pvpEnabled: false,
  chargen: true,
  hasARide: false,
  skipUsed: undefined,
  isTranshuman: false,
  transhumanType: undefined,
})

const allForSave = {
  talentPerks,
  defensePerks,
  miscPerks,
}

const userWorlds = ref([] as World[])
const localUserWorlds = useStorage<World[]>('localUserWorlds', [])

const userCharacters = ref([] as Character[])
const localUserCharacters = useStorage<Character[]>('localUserCharacters', [])

const baseBudgetAfter = computed(
  () => baseBudget.value + intensities.value.reduce((a, x) => x.intensity > 1 ? a + x.intensity : a, 0),
)

const bindingCost = computed(() => binding.value.reduce((a, x) => a += x.cost, 0))
const heritageCost = computed(() => heritage.value.reduce((a, x) => a += x.cost >= 11111 ? 0 : x.cost, 0))

const ridePerksCost = computed(() => ridePerks.value.reduce((a, x) => a += x.cost === 11111 ? 0 : x.cost, 0))
const homePerksCost = computed(() => homePerks.value.reduce((a, x) => a += x.cost === 11111 ? 0 : x.cost, 0))
const talentsCost = computed(() => talentPerks.value.reduce((a, x) => a += x.cost === 11111 ? 0 : x.cost, 0))
const defensesCost = computed(() => defensePerks.value.reduce((a, x) => a += x.cost === 11111 ? 0 : x.cost, 0))
const miscPerksCost = computed(() => miscPerks.value.reduce((a, x) => a += x.cost === 11111 ? 0 : x.cost, 0))
const waifuPerksCost = computed(() => waifuPerks.value.reduce((a, x) => a += x.cost === 11111 ? -(x.refund || 0) : x.cost - (x.refund || 0), 0))
const genericWaifuPerksCost = computed(() => genericWaifuPerks.value.reduce((a, x) => a += x.cost === 11111 ? 0 : x.cost, 0))
const luresCost = computed(() => luresBought.value.reduce((a, x) => a += x.cost === 11111 ? 0 : x.cost, 0))

const companionsCost = computed(() => {
  return companions.value.reduce((a, x) => {
    if (x.method === 'buy' && x.tier !== 11)
      return a += CHAR_COSTS[x.priceTier - 1] || 1
    if (x.method === 'yoink' && x.tier !== 11)
      return a += (x.tier - 1) <= 1 ? 2 : (CHAR_COSTS[x.priceTier - 1] || 1) * 1.2
    if (x.method === 'used' && x.priceTier !== 11)
      return a += CHAR_COSTS[x.priceTier - 1] || 1
    return a
  }, 0)
})

const companionProfit = computed(() => {
  return companions.value.reduce((a, x) => {
    if (x.method === 'capture' && x.tier !== 11) {
      let captureCost = Math.ceil(CHAR_COSTS[x.tier - 1] * 0.6)
      captureCost = captureCost < 1 ? 1 : captureCost
      return a += captureCost
    }
    return a
  }, 0)
})

const companionProfitSold = computed(() => {
  return companions.value.reduce((a, x) => {
    if (x.sold && x.tier !== 11)
      return a += Math.round(CHAR_COSTS[x.tier - 1] * 0.2)
    return a
  }, 0)
})

const budget = computed(() => {
  let intensityFlat = 0
  const intenMultiplier = intensities.value
    .reduce((a, x) => x.intensity < 10 ? a += x.intensity : (intensityFlat += x.intensity, a), 0)

  let bd = baseBudget.value
  if (bd === 11111) {
    bd = 0
    flags.value.danger11Start = true
  }

  return Math.round((bd + intensityFlat) * (1 + intenMultiplier)) - startingOrigin.value.cost
      - bindingCost.value - heritageCost.value - luresCost.value - ridePerksCost.value - homePerksCost.value
      - talentsCost.value - defensesCost.value - miscPerksCost.value - waifuPerksCost.value
      - genericWaifuPerksCost.value - companionsCost.value
      - budgetMods.value.minus + budgetMods.value.plus + companionProfit.value + companionProfitSold.value
})

const companionTicketProfit = computed(() => {
  return companions.value.reduce((a, x) => {
    return x.priceTier === 11 && x.method === 'capture' ? a += 1 : a
  }, 0)
})

const tier11tickets = computed(() => {
  let ticket = 0
  if (baseBudget.value === 11111) ticket += 1

  const heritageCost = heritage.value.reduce((a, x) => a += x.cost >= 11111 ? x.cost / 11111 : 0, 0)

  const ridePerksCost = ridePerks.value.reduce((a, x) => a += x.cost === 11111 ? 1 : 0, 0)
  const homePerksCost = homePerks.value.reduce((a, x) => a += x.cost === 11111 ? 1 : 0, 0)
  const talentsCost = talentPerks.value.reduce((a, x) => a += x.cost === 11111 ? 1 : 0, 0)
  const defensesCost = defensePerks.value.reduce((a, x) => a += x.cost === 11111 ? 1 : 0, 0)
  const miscPerksCost = miscPerks.value.reduce((a, x) => a += x.cost === 11111 ? 1 : 0, 0)
  const waifuPerksCost = waifuPerks.value.reduce((a, x) => a += x.cost === 11111 ? 1 : 0, 0)
  const genericWaifuPerksCost = genericWaifuPerks.value.reduce((a, x) => a += x.cost === 11111 ? 1 : 0, 0)
  const luresCost = luresBought.value.reduce((a, x) => a += x.cost === 11111 ? 1 : 0, 0)
  const companionsCost = companions.value.reduce((a, x) => {
    return x.priceTier === 11 && x.method !== 'capture' ? a += 1 : a
  }, 0)

  return ticket - heritageCost - ridePerksCost - homePerksCost - talentsCost - defensesCost - miscPerksCost
    - waifuPerksCost - genericWaifuPerksCost - luresCost - companionsCost
    - budgetMods.value.minus11 + budgetMods.value.plus11 + companionTicketProfit.value
})

const totalCost = computed(() => startingOrigin.value.cost + heritageCost.value + bindingCost.value + ridePerksCost.value + homePerksCost.value + talentsCost.value + defensesCost.value + miscPerksCost.value + waifuPerksCost.value + genericWaifuPerksCost.value + luresCost.value + companionsCost.value)

const targetList = computed(() => {
  let comps = companions.value.map(x => (x.name))
  if (['Substitute', 'Possess'].includes(startingOrigin.value.title))
    comps = ['You', ...comps]
  return comps
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
    bindingCost,
    heritageCost,
    ridePerksCost,
    homePerksCost,
    talentsCost,
    defensesCost,
    miscPerksCost,
    waifuPerksCost,
    genericWaifuPerksCost,
    luresCost,
    companionsCost,
    budgetMods,
    allForSave,
    targetList,
    companionProfit,
    companionProfitSold,
    totalCost,
    mode,
    params,
  }
}
