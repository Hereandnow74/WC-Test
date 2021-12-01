import { useStore, World } from './store'

const { startingWorld } = useStore()

const jumpChain = useStorage<World[]>('jumpChain', [])
const currentWorld = useStorage('currentWorld', startingWorld.value)
const rdnWorld = useStorage<any[]>('rdnWorld', [])

export function usePlayStore() {
  return {
    jumpChain,
    currentWorld,
    rdnWorld,
  }
}
