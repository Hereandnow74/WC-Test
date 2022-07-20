import { Perk } from 'global'

export interface World {
  worldName: string
  rating: number
  condition?: string | any[]
  additional?: string
  image?: string
}

export interface Character {
  uid: number
  name: string
  world: string
  tier: number
  cost?: number
  image: string
  image_nsfw?: string
}

export interface Origin {
  title: string
  cost: number
  character?: string
  hr?: 'dr' | 'th' | 'ou'
  tier?: number
  uid?: number
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
  count?: number
  cost?: number
}[])

const pvpPerks = storeType<Perk[]>('pvpPerks', [])

const binding = storeType<Perk[]>('binding', [
  {
    title: 'Company Stamp',
    cost: 0,
  },
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
  name: string
  sex: 'F' | 'M' | 'O'
  world: string
  tier: number
  priceTier: number
  sold?: boolean
  method: 'buy' | 'capture' | 'steal' | 'yoink' | 'used' | 'unbound'
  price?: number
  soldPrice?: number
  role?: 'Companion' | 'Familiar' | 'Unbound' | 'Devotee' | 'Dead'
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
  noBindings: true,
  noHeritage: false,
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
  homePerks,
}

const userWorlds = ref([] as World[])
const localUserWorlds = useStorage<World[]>('localUserWorlds', [])

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
    userWorlds,
    localUserWorlds,
    intensities,
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
  }
}
