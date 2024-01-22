import { Character, DBWorld, Perk } from 'global'

interface Condition {
  rating: number
  name: string
}

export interface World {
  worldName: string
  rating: number
  condition?: Condition[]
  additional?: string
  image?: string
}

export interface Swap {
  uid: number
  name: string
  tier: number
  cost: number
  refund: number
  tags: string[]
}

export interface SWP {
  uid: string
  charUID: number
  title: string
  tier: number
  cost: number
  costT?: number
  refund: number
}

export interface Origin {
  title: string
  cost: number
  character?: string
  hr?: 'dr' | 'th' | 'ou'
  tier?: number
  sex?: 'F' | 'M' | 'O'
  uid?: number
  swap?: Swap
  perk?: SWP
  image?: string
}

const params = useUrlSearchParams('history')
const mode = ref<('local' | 'remote' | 'done')>('local')
if (params.load?.length)
  mode.value = 'remote'

function storeType<T>(name: string, value: T) {
  return mode.value === 'local' ? useStorage<T>(name, value) : ref<T>(value)
}
const baseBudget = storeType('baseBudget', 0)

const startingWorld = storeType<World>('startingWorld', {
  worldName: 'No World',
  rating: 0,
})

const currentWorld = useStorage('currentWorld', startingWorld.value)

const startingOrigin = storeType<Origin>('startingOrigin', {
  title: '',
  cost: 0,
  tier: 1,
})

const coupleOrigin = storeType<Origin>('coupleOrigin', {
  title: '',
  character: 'Significant Other',
  sex: 'F',
  tier: 1,
  cost: 0,
})

const intensities = storeType('intensities', [] as {
  uid: string
  title: string
  intensity: number
  count?: number
  cost?: number
}[])

const difficulties = storeType('difficulties', [] as {
  uid: string
  title: string
  type: string
  intensity: number
  cost?: number
}[])

const pvpPerks = storeType<Perk[]>('pvpPerks', [])

const binding = storeType<Perk[]>('binding', [
  { uid: 'XnYV4', title: 'Company Stamp', count: 1, cost: 0, type: 'Stamp' },
])

const luresBought = storeType<Perk[]>('luresBought', [])

const otherPerks = storeType<Perk[]>('otherPerks', [])

const heritage = storeType<Perk[]>('heritage', [])

const ridePerks = storeType<Perk[]>('ridePerks', [])

const homePerks = storeType<Perk[]>('homePerks', [])

const talentPerks = storeType<Perk[]>('talentPerks', [])

const defensePerks = storeType<Perk[]>('defensePerks', [])

const miscPerks = storeType<Perk[]>('miscPerks', [])

const genericWaifuPerks = storeType<Perk[]>('genericWaifuPerks', [])

const waifuPerks = storeType<Perk[]>('waifuPerks', [])

const patron = storeType<Perk[]>('patron', [])

export interface SavedChar {
  uid: number
  originUID?: number
  name: string
  tags: string[]
  world: string
  tier: number
  priceTier: number
  sold?: boolean
  method: 'buy' | 'capture' | 'steal' | 'yoink' | 'used' | 'unbound'
  price?: number
  soldPrice?: number
  role?: 'Companion' | 'Familiar' | 'Unbound' | 'Devotee' | 'Dead'
  swap?: Swap
  perk?: SWP
  image?: string
  note?: string
}

const companions = storeType('companions', [] as SavedChar[])

const allEffects = storeType('allEffects', ['Company Stamp'] as string[])

const budgetMods = storeType('budgetMods', {
  plus: 0,
  minus: 0,
  plus11: 0,
  minus11: 0,
  sell11: 0,
})

// Temporary hack to prevent NaN error
if (budgetMods.value.sell11 === undefined)
  budgetMods.value.sell11 = 0

const specificMods = storeType('spMod', [] as {desc: string; mod: number}[])

const fee = storeType('fee', 0)

const flags = storeType('flags', {
  noBindings: false,
  noHeritage: false,
  danger11Start: false,
  pvpEnabled: false,
  chargen: true,
  hasARide: false,
  skipUsed: null,
  isTranshuman: false,
  transhumanType: null,
})

const allForSave = {
  talentPerks,
  defensePerks,
  miscPerks,
  homePerks,
  genericWaifuPerks,
}

const localUserWorlds = useStorage<DBWorld[]>('localUserWorlds', [])

const userCharacters = ref([] as Character[])
const localUserCharacters = useStorage<Character[]>('localUserCharacters', [])

const userRides = ref([] as Perk[])
const localUserRides = useStorage<Perk[]>('localUserRides', [])

export function useChargenStore() {
  return {
    baseBudget,
    allEffects,
    startingWorld,
    startingOrigin,
    coupleOrigin,
    localUserWorlds,
    intensities,
    difficulties,
    pvpPerks,
    binding,
    luresBought,
    otherPerks,
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
    budgetMods,
    allForSave,
    mode,
    params,
    userRides,
    localUserRides,
    fee,
    specificMods,
    patron,
    currentWorld,
  }
}
