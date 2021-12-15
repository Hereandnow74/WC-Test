import { useStore, World } from './store'
import { WORLD_RATINGS } from '~/data/constatnts'

const { startingWorld } = useStore()

const jumpChain = useStorage<World[]>('jumpChain', [])
const currentWorld = useStorage('currentWorld', startingWorld.value)
const rdnWorld = useStorage<any[]>('rdnWorld', [])

const creditLimit = computed(() =>
  Math.max(500,
    WORLD_RATINGS[startingWorld.value.rating - 1].budget,
    jumpChain.value.reduce((a, x) => Math.max(a, WORLD_RATINGS[x.rating - 1].budget), 0),
  ))

watch(startingWorld, () => currentWorld.value = startingWorld.value)

export function usePlayStore() {
  return {
    jumpChain,
    currentWorld,
    rdnWorld,
    creditLimit,
  }
}
