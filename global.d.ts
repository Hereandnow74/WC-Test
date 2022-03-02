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
  costVariants?: number[]
  freebies?: any
  complex?: string
  chargen?: boolean
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
}

declare global {
}
export {
  DBCharacter,
  DBWorld,
  PerkFull,
  Challenge,
  Mission,
}
