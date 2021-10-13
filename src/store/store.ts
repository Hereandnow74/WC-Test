import { CHAR_COSTS } from '~/data/constatnts'

export interface World {
  worldName: string
  rating: number
  condition?: string | any[]
  additional?: string
  image?: string
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

const heritage = ref([] as {
  title: string
  cost: number
  tree: string
}[])

const ridePerks = ref([] as {
  title: string
  cost: number
}[])

const homePerks = ref([] as {
  title: string
  cost: number
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

const baseBudgetAfter = computed(
  () => baseBudget.value + intensities.value.reduce((a, x) => x.intensity > 1 ? a + x.intensity : a, 0),
)

const flags = reactive({
  noBindings: true,
  noHeritage: true,
})

const budget = computed(() => {
  let intensityFlat = 0
  const intenMultiplier = intensities.value
    .reduce((a, x) => x.intensity < 1 ? a += x.intensity : (intensityFlat += x.intensity, a), 0)

  const bindingCost = binding.value.reduce((a, x) => a += x.cost, 0)
  const heritageCost = heritage.value.reduce((a, x) => a += x.cost, 0)

  const ridePerksCost = ridePerks.value.reduce((a, x) => a += x.cost, 0)
  const homePerksCost = homePerks.value.reduce((a, x) => a += x.cost, 0)
  const talentsCost = talentPerks.value.reduce((a, x) => a += x.cost, 0)
  const defensesCost = defensePerks.value.reduce((a, x) => a += x.cost, 0)
  const miscPerksCost = miscPerks.value.reduce((a, x) => a += x.cost, 0)
  const waifuPerksCost = waifuPerks.value.reduce((a, x) => a += x.cost, 0)

  const tierMod = flags.noBindings ? 2 : 1
  const companionsCost = companions.value.reduce((a, x) => a += CHAR_COSTS[x.tier - tierMod] || 1, 0)

  return (baseBudget.value + intensityFlat) * (1 + intenMultiplier) - startingOrigin.value.cost
         - bindingCost - heritageCost - ridePerksCost - homePerksCost - talentsCost - defensesCost
         - miscPerksCost - waifuPerksCost - companionsCost
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
    heritage,
    ridePerks,
    homePerks,
    talentPerks,
    defensePerks,
    miscPerks,
    waifuPerks,
    companions,
    flags,
  }
}
