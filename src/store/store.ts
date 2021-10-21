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
  waifu?: string
  freebies?: object
}

export interface Origin {
  title: string
  cost: number
  character?: string
  tier?: number
}

const baseBudget = ref(55)

const startingWorld = ref<World>({
  worldName: 'Current world',
  rating: 2,
})

const startingOrigin = ref<Origin>({
  title: '',
  cost: 0,
})

const intensities = ref([] as {
  title: string
  intensity: number
}[])

const binding = ref<Perk[]>([])

const luresBought = ref<Perk[]>([])

const heritage = ref<Perk[]>([])

const ridePerks = ref<Perk[]>([])

const homePerks = ref<Perk[]>([])

const talentPerks = ref<Perk[]>([])

const defensePerks = ref<Perk[]>([])

const miscPerks = ref<Perk[]>([])

const genericWaifuPerks = ref<Perk[]>([])

const waifuPerks = ref<Perk[]>([])

const companions = ref([] as {
  uid: number
  name: string
  world: string
  tier: number
  method: 'buy' | 'capture' | 'steal' | 'yoink'
}[])

const allForSave = {
  talentPerks,
  defensePerks,
}

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

// Give all the freebies
watchEffect(() => {
  binding.value.forEach((x) => {
    if (x.freebies) {
      for (const [key, perk] of Object.entries(x.freebies))
        perk.forEach(n => allForSave[key].value.push({ title: n, cost: 0 }))
    }
  })
})

const bindingCost = computed(() => binding.value.reduce((a, x) => a += x.cost, 0))
const heritageCost = computed(() => heritage.value.reduce((a, x) => a += x.cost === 11111 ? 0 : x.cost, 0))

const ridePerksCost = computed(() => ridePerks.value.reduce((a, x) => a += x.cost === 11111 ? 0 : x.cost, 0))
const homePerksCost = computed(() => homePerks.value.reduce((a, x) => a += x.cost === 11111 ? 0 : x.cost, 0))
const talentsCost = computed(() => talentPerks.value.reduce((a, x) => a += x.cost === 11111 ? 0 : x.cost, 0))
const defensesCost = computed(() => defensePerks.value.reduce((a, x) => a += x.cost === 11111 ? 0 : x.cost, 0))
const miscPerksCost = computed(() => miscPerks.value.reduce((a, x) => a += x.cost === 11111 ? 0 : x.cost, 0))
const waifuPerksCost = computed(() => waifuPerks.value.reduce((a, x) => a += x.cost === 11111 ? 0 : x.cost, 0))
const genericWaifuPerksCost = computed(() => genericWaifuPerks.value.reduce((a, x) => a += x.cost === 11111 ? 0 : x.cost, 0))
const luresCost = computed(() => luresBought.value.reduce((a, x) => a += x.cost === 11111 ? 0 : x.cost, 0))

const companionsCost = computed(() => {
  const tierMod = flags.noBindings ? 2 : 1
  return companions.value.reduce((a, x) => {
    if (x.method === 'capture') return x.tier === 11 ? a += 0 : a -= CHAR_COSTS[x.tier - 1] * 0.6 || 1
    return x.tier === 11 ? a += 0 : a += CHAR_COSTS[x.tier - tierMod] || 1
  }, 0)
})

const budget = computed(() => {
  let intensityFlat = 0
  const intenMultiplier = intensities.value
    .reduce((a, x) => x.intensity < 1 ? a += x.intensity : (intensityFlat += x.intensity, a), 0)

  let bd = baseBudget.value
  if (bd === 11111) {
    bd = 0
    flags.danger11Start = true
  }

  return (bd + intensityFlat) * (1 + intenMultiplier) - startingOrigin.value.cost
      - bindingCost.value - heritageCost.value - luresCost.value - ridePerksCost.value - homePerksCost.value
      - talentsCost.value - defensesCost.value - miscPerksCost.value - waifuPerksCost.value
      - genericWaifuPerksCost.value - companionsCost.value
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
  const companionsCost = companions.value.reduce((a, x) => {
    if (x.method === 'capture') return x.tier === 11 ? a -= 1 : a || 1
    return x.tier === 11 ? a += 1 : a
  }, 0)

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
  }
}
