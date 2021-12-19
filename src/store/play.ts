import { useChargenStore, World } from './chargen'

const { startingWorld } = useChargenStore()

const jumpChain = useStorage<World[]>('jumpChain', [])
const currentWorld = useStorage('currentWorld', startingWorld.value)
const rdnWorld = useStorage<any[]>('rdnWorld', [])

interface Loan {
  owed: number
  gained: number
}
const loan = useStorage<Loan>('loan', { owed: 0, gained: 0 })
const trHistory = useStorage<any[]>('trHistory', [])

export function usePlayStore() {
  return {
    jumpChain,
    currentWorld,
    rdnWorld,
    loan,
    trHistory,
  }
}
