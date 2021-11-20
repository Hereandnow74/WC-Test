import { useStore, World } from './store'

const { startingWorld } = useStore()

const jumpChain = ref<World[]>([])
const currentWorld = ref(startingWorld.value)

export function usePlayStore() {
  return {
    jumpChain,
    currentWorld,
  }
}
