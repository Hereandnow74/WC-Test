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
  b?: string[]
}

interface PerkFull {
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

declare global {
}
export {
  DBCharacter,
  PerkFull,
}
