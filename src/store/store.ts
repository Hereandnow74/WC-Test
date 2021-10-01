interface World {
  worldName?: string
  rating?: number
  condition?: string | any[]
}

const baseBudget = ref(55)
const budget = ref(55)
const startingWorld = ref({} as World)

const allEffects = ref([] as string[])

export function useStore() {
  return {
    budget,
    baseBudget,
    allEffects,
    startingWorld,
  }
}
