export interface World {
  worldName: string
  rating: number
  condition?: string | any[]
  additional?: string
  image?: string
}

const baseBudget = ref(55)
const budget = ref(55)
const startingWorld = ref({} as World)

const allEffects = ref([] as string[])

const userWorlds = ref([] as World[])

export function useStore() {
  return {
    budget,
    baseBudget,
    allEffects,
    startingWorld,
    userWorlds,
  }
}
