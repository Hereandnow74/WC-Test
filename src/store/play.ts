
import { DBWorld } from 'global'

const jumpChain = useStorage<DBWorld[]>('jumpChain', [])
const rdnWorld = useStorage<any[]>('rdnWorld', [])

interface Loan {
  owed: number
  gained: number
}
const loan = useStorage<Loan>('loan', { owed: 0, gained: 0 })
const trHistory = useStorage<any[]>('trHistory', [])

const investedSize = ref(0)
const investedRequirement = ref(0)
const investedTrigger = ref(0)
const investedTier = ref(0)
const investedEffect = ref(0)
const investedNetwork = ref(0)

interface Dungeon {
  name: string
  numFloors: number
  floorSize: number
  encourage: number
  scry: number
  used: number[]
  portals: any[]
  traps: any[]
  monsters: any[]
  draw: string
  range: string
  intensity: string
}

const dungeons = useStorage<Dungeon[]>('dungeons', [])
const symbiotes = useStorage<SymBase[]>('symbiotes', [])
const manualDevotees = useStorage<Record<number, number>>('manualDevotees', { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0 })

const gachaSettings = useStorage('gachaSettings', {
  whitelist: [] as string[],
  tagList: [] as string[],
  defaultChances: true,
  justRandom: false,
  useWhiltelist: false,
  chances: [],
  rollCost: 3,
  tenRollCost: 30,
  minTierForTen: 4,
})

interface MissionsReward {
  [key: string]: {uid: string
    title: string
    location: string
    desc: string
    rewards: {
      type: string
      value: string | number
    }[]}
}

const missionRewards = useStorage<MissionsReward>('missionRewards', {})

const likes = ref<Record<number, number>>({})
const likesMessageSeen = ref(false)

export function usePlayStore() {
  return {
    jumpChain,
    rdnWorld,
    loan,
    trHistory,
    investedSize,
    investedRequirement,
    investedTrigger,
    investedTier,
    investedEffect,
    investedNetwork,
    dungeons,
    symbiotes,
    manualDevotees,
    gachaSettings,
    missionRewards,
    likes,
    likesMessageSeen,
  }
}
