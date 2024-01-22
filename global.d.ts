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

interface Character {
  uid: number
  name: string
  world: string
  sub?: string
  tier: number
  image: string
  sourceImage: string
  image_nsfw?: string
  nickname?: string
  tags: string[]
}

interface DBWorld {
  uid: string
  worldName: string
  rating: number
  additional?: string
  condition?: {
    name: string
    rating: number
  }[]
  image?: string
}

interface Freebie {
  title: string
  cost: 0
  count: number
  complex?: any[]
}

interface PerkFull {
  uid: string
  title: string
  cost: number
  costT?: number
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
  freebies?: {
    talentPerks?: Freebie[]
    defensePerks?: Freebie[]
    binding?: Freebie[]
    genericWaifuPerks?: Freebie[]
  }
  complex?: string
  chargen?: boolean
  increment?: boolean
  tree?: string
  type?: string
  legacy?: boolean
  dCost?: number
  dlc?: string
  dlclink?: string
}

interface DLCPerk extends PerkFull {
  dlc: string
  dlclink?: string
}

interface Heritage extends PerkFull {
  tree: 'Dragon' | 'Transhuman' | 'Outsider' | 'None'
  typeFreebies?: any
  types?: Record<'Biomorph' | 'Cybermorph' | 'Aethermorph', string>
}

interface Challenge {
  title: string
  cost: number
}

interface Mission {
  uid: string
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
  uid: string
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
  type?: string
}

interface SearchRequest {
  name?: string
  world?: string
  tier?: {
    min: number
    max: number
  }
  tags?: {
    tag: string
    include: boolean
  }[]
  hasNsfw?: boolean
  newerThan?: Date
  sortBy?: string // Example: likes:desc or likes:asc
  limit?: number
  page?: number
}

interface ServerBuild {
  id?: string
  title: string
  name: string
  author: string
  desc: string
  published: boolean
  build: object
  bindingName: string
  originName: string
  characterName: string
  intensity: string[]
  loan: boolean
  creditBalance: number
  creditsSpent: number
  customImages: boolean
  dlc: boolean
  retinue: {
    name: string
    tier: number
    tags: string[]
    state: string
  }[]
  retinueNotes: boolean
  challenges: string[]
  tags: string[]
  likes?: number
  createdAt?: string
  updatedAt?: string
}

interface SearchBuild extends Partial<ServerBuild> {
  sortBy?: string // Example: likes:desc or likes:asc
  limit?: number
  page?: number
}

declare global {
}
export {
  DBCharacter,
  Character,
  DBWorld,
  PerkFull,
  Challenge,
  Mission,
  DLCPerk,
  Perk,
  Freebie,
  Heritage,
  SearchRequest,
  ServerBuild,
  SearchBuild,
}
