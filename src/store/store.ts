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

const allEffects = ref([] as string[])

const userWorlds = ref([] as World[])
const localUserWorlds = useStorage<World[]>('localUserWorlds', [])

const budget = computed(() => baseBudget.value - startingOrigin.value.cost)

export function useStore() {
  return {
    budget,
    baseBudget,
    allEffects,
    startingWorld,
    startingOrigin,
    userWorlds,
    localUserWorlds,
  }
}
