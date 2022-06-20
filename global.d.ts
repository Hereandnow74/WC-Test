interface DBCharacter {
  u: number
  n: string
  w: string
  d?: string
  t: number
  i: string
  s?: string
  in?: string
  k?: string
  b: string[]
}

interface DBWorld {
  worldName: string
  rating: number
  additional?: string
  condition?: {
    name: string
    rating: number
  }[]
  image?: string
}

interface PerkFull {
  uid: string
  title: string
  cost: number
  desc: string
  category: string
  whitelist?: string[]
  special?: string
  target?: string
  blacklist?: string[]
  needed?: number
  requires?: string
  multiple?: boolean
  additionalDesc?: string
  flag?: string
  power?: string
  image?: string
  max?: number
  waifu?: string
  anything?: string
  table?: string[][]
  costVariants?: number[]
  freebies?: any
  complex?: string
  chargen?: boolean
  increment?: boolean
  tree?: string
  type?: string
  old?: string
  oldLink?: string
}

interface DLCPerk extends PerkFull {
  dlc: string
  dlclink?: string
}

interface Challenge {
  title: string
  cost: number
}

interface Mission {
  title: string
  author: string
  source: string
  desc: string
  loca: string
  scope: string
  conditions: { value: string }[]
  objectives: {
    value: string
    reward: string
  }[]
  reward: string
  image: string
  budget: number
}

export interface Perk {
  title: string
  cost: number
  count?: number
  tree?: string
  addons?: any[]
  variant?: string
  target?: string[]
  freebies?: object
  refund?: number
  anything?: string
  complex?: any
}

declare global {
}
export {
  DBCharacter,
  DBWorld,
  PerkFull,
  Challenge,
  Mission,
  DLCPerk,
  Perk,
}
