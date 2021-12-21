import { isArray } from 'lodash-es'
import { DLCgenericPerks, DLChomes, DLCperks, DLCtalents, DLCheritages, DLClureExpansions, DLCbindings, DLClures, DLCotherControls } from './DLCs'
import { intensity } from '~/data/intensity'
import { origin } from '~/data/origin'
import { bindings, lures, lureExpansions, otherControls } from '~/data/binding'
import { heritages } from '~/data/heritage'
import { rides, homes, defenses, talents, perks, genericPerks } from '~/data/talents'
import { waifu_perks } from '~/data/waifu_perks'

import { useStore } from '~/store/store'

export const WORLD_COLORS = ['bg-green-600', 'bg-teal-600', 'bg-cyan-600',
  'bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-amber-600',
  'bg-orange-500', 'bg-red-500', 'bg-true-gray-700']

export const WORLD_RATINGS = [
  { rating: 1, title: 'Sad But True', budget: 35 },
  { rating: 2, title: 'Turn the Page', budget: 55 },
  { rating: 3, title: 'No Remorse', budget: 85 },
  { rating: 4, title: 'Hit the Lights', budget: 140 },
  { rating: 5, title: 'Moth Into Flame', budget: 225 },
  { rating: 6, title: 'Trapped Under Ice', budget: 365 },
  { rating: 7, title: 'Disposable Heroes', budget: 590 },
  { rating: 8, title: 'All Nightmare Long', budget: 955 },
  { rating: 9, title: 'Frayed Ends of Sanity', budget: 1545 },
  { rating: 10, title: 'To Live is to Die', budget: 2500 },
  { rating: 11, title: 'One', budget: 11111 },
]

export const CHAR_COSTS = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 11111]
export const heritageTiers = [[4, 4], [16, 5], [38, 6], [80, 7], [160, 8], [380, 9], [800, 10]]

export const TOOLTIPS = {
  'Chargen': 'Only during character generation stage',
  'Rule 63': 'Genderbend',
  'Stamp': 'Binding.',
  'Choker': 'Binding.',
  '104.45 AU': '1 AU equals distance between the Sun and Earth',
  'AU': 'Alternative Universe or Astronomical Unit(distance between the Sun and Earth)',
  'blue': 'T1-T3',
  'copper': 'T4-T6',
  'silver': 'T7-T9',
  'gold': 'T10',
  'T1': 'Cost: 1',
  'T2': 'Cost: 2',
  'T3': 'Cost: 5',
  'T4': 'Cost: 10',
  'T5': 'Cost: 20',
  'T6': 'Cost: 50',
  'T7': 'Cost: 100',
  'T8': 'Cost: 200',
  'T9': 'Cost: 500',
  'T10': 'Cost: 100',
  'T11': 'Cost: T11 Ticket',
  'Negotiable': 'Negotiables - people you can negotiate with, for lack of a better term. While they may have an agenda that runs counter to yours, they will not become hostile unless provoked by some means: competition over the same capture target, a breach of ethical standards, manipulation by local parties, or just self-defense against your aggression. Negotiable contractors count as defeated once they’re either killed or permanently accommodated.',
  'Rival': 'Rivals they don’t have an issue with you in particular, but you will stand directly in the way of their goals: their list of local capture targets overlaps with yours, you and they want a member of each other’s retinue and aren’t willing to back off or trade, members of your retinues know each other and want their counterpart to join them, etc. If you leave for another world, your rival will connect to that world too and have objectives there that are incompatible with your own. Rivals are defeated when they are no longer capable and/or willing to pursue their goals.',
  'Enemy': 'Enemies - when you and an enemy are first connected to the same world, your smart devices will receive alerts with each other’s name and face: as you look at that moment, minus any makeup. Like rivals, enemies will also pursue you across worlds. Assume that every enemy you encounter seeks to stripmine your visited worlds of all credit value, claim your retinue as their own, or even sell them off for credits. The only choice is to kill or be killed.',
}

export const rulesList = [
  { title: 'starting', title2: 'Creating Your Build' },
  { title: 'captures', title2: 'Extending Your Build: Captures' },
  { title: 'familiars', title2: 'Familiars' },
  { title: 'purchases', title2: 'Extending Your Build: Purchases' },
  { title: 'sales', title2: 'Extending Your Build: Sales' },
  { title: 'waifu11', title2: 'These Waifus Go Up to 11' },
  { title: 'danger11', title2: 'Danger Rating 11 Build Rules' },
  { title: 'pvp', title2: 'Gauntlet(Continuous PvP)' },
  { title: 'services', title2: 'Company Services' },
  { title: 'salary', title2: 'Contractor Salary' },
  { title: 'helpDesk', title2: 'Help Desk Hotline' },
  { title: 'Loans and Credit Debt', title2: 'Loans and Credit Debt' },
  { title: 'Missions', title2: 'Missions' },
  { title: 'refund', title2: 'Refund and Return Policy' },
  { title: 'arranged', title2: 'Come Out and Play (Arranged PvP)' },
  { title: 'arrangedConditions', title2: 'Arranged Match Wagers, Victory Conditions, and Risk' },
  { title: 'arrangedTeam', title2: 'Arranged Team Matches and Prizes' },
  { title: 'arrangedSpecial', title2: 'Special Arranged Match Rules' },
  { title: 'NasuDLC', title2: 'Nasuverse DLC rules' },
]

export const waifuTags = {
  F: { tag: 'Female', short: 'F', effect: '', desc: '', color: 'bg-pink-500' },
  M: { tag: 'Male', short: 'M', effect: '', desc: '', color: 'bg-blue-500' },
  O: { tag: 'Other', short: 'O', effect: '', desc: '', color: 'bg-fuchsia-700' },
  U: { tag: 'By User', short: 'U', effect: '', desc: '', color: 'bg-warm-gray-600' },
  C: { tag: 'Canon', short: 'C', effect: '', desc: 'From canon spreadsheet', color: 'bg-yellow-400 text-black' },
  P: { tag: 'Perk', short: 'P', effect: '', desc: 'Have a specific waifu perk', color: 'bg-amber-200 text-black' },
  dm: { tag: 'Demon', short: 'dm', effect: '', desc: '' },
  dv: { tag: 'Devil', short: 'dv', effect: '', desc: '' },
  an: { tag: 'Angel', short: 'an', effect: '', desc: '' },
  mr: { tag: 'Monster', short: 'mr', effect: '', desc: '' },
  dg: { tag: 'Dragon', short: 'dg', effect: '', desc: '' },
  gd: { tag: 'God', short: 'gd', effect: '', desc: '' },
  rs: { tag: 'Resurrection', short: 'rs', effect: '', desc: '' },
  mu: { tag: 'Mutant', short: 'mu', effect: '', desc: '' },
  dh: { tag: 'Demi-human', short: 'dh', effect: '', desc: '' },
  md: { tag: 'Maid', short: 'md', effect: '', desc: '' },
  en: { tag: 'Engineer', short: 'en', effect: '', desc: '' },
  sn: { tag: 'Scientist', short: 'sn', effect: '', desc: '' },
  sd: { tag: 'Student', short: 'sd', effect: '', desc: '' },
  wh: { tag: 'Witch', short: 'wh', effect: '', desc: '' },
  ai: { tag: 'AI', short: 'ai', effect: '', desc: '' },
  me: { tag: 'Mage', short: 'me', effect: '', desc: '' },
  cf: { tag: 'Chef', short: 'cf', effect: '', desc: '' },
  pi: { tag: 'Pirate', short: 'pi', effect: '', desc: '' },
  tc: { tag: 'Teacher', short: 'tc', effect: '', desc: '' },
  ad: { tag: 'Android', short: 'ad', effect: '', desc: '' },
  cb: { tag: 'Cyborg', short: 'cb', effect: '', desc: '' },
  nn: { tag: 'Nun', short: 'nn', effect: '', desc: '' },
  un: { tag: 'Undead', short: 'un', effect: '', desc: '' },
  sp: { tag: 'Superhero', short: 'sp', effect: '', desc: '' },
  pc: { tag: 'Princess', short: 'pc', effect: '', desc: '' },
  az: { tag: 'Amazon', short: 'az', effect: '', desc: '' },
  hp: { tag: 'Hopper', short: 'hp', effect: '', desc: 'Have a world hopping power' },
  dc: { tag: 'Doctor', short: 'dc', effect: '', desc: 'Trained in medicine' },
  hl: { tag: 'Healer', short: 'hl', effect: '', desc: 'Supernatural healing ability' },
  st: { tag: 'Sturdy', short: 'st', effect: '', desc: 'is known for handling disease, chemical medicine, or poisons.' },
  hr: { tag: 'Harsh', short: 'hr', effect: '', desc: 'hails from a harsh climate.' },
  hz: { tag: 'Hazard', short: 'hz', effect: '', desc: 'can ignore hazardous environments.' },
  mt: { tag: 'Monster Tamer', short: 'mt', effect: '', desc: 'is known as a monster-tamer or otherwise being good with animals.' },
  cl: { tag: 'Cool', short: 'cl', effect: '', desc: 'is known for keeping a cool head or having great willpower.' },
  ml: { tag: 'Materialist', short: 'ml', effect: '', desc: 'known for having a material vice.' },
  ps: { tag: 'Psychic', short: 'ps', effect: '', desc: 'is known as a psychic or mind-manipulator.' },
  mp: { tag: 'Mind Powers', short: 'mp', effect: '', desc: 'is known as a psychic or mind-manipulator.' },
  bj: { tag: 'Bodyjack', short: 'bj', effect: '', desc: 'is known for bodyjacking others.' },
  dr: { tag: 'Drain HP/MP/SP', short: 'dr', effect: '', desc: 'can drain or feed on life, mana, or souls.' },
  id: { tag: 'Instant Death', short: 'id', effect: '', desc: 'is known for inflicting instant death or not dying even when killed.' },
  im: { tag: 'Immortality', short: 'im', effect: '', desc: 'is known for inflicting instant death or not dying even when killed.' },
  pl: { tag: 'Polymorph', short: 'pl', effect: '', desc: 'is known for polymorphing others.' },
  ur: { tag: 'Unstable Reality', short: 'ur', effect: '', desc: 'hails from a region where the local reality is unstable.' },
  cr: { tag: 'Corrupting', short: 'cr', effect: '', desc: 'is known for forcibly bringing out others’ dark sides.' },
  sc: { tag: 'Social', short: 'sc', effect: '', desc: 'is known for their ability to read or sense people.' },
  di: { tag: 'Divination', short: 'di', effect: '', desc: 'is known for using divination or other non-technological remote viewing.' },
  fm: { tag: 'Fate manipulation', short: 'fm', effect: '', desc: 'is known as a fate- or luck-manipulator.' },
  lm: { tag: 'Luck manipulation', short: 'lm', effect: '', desc: 'is known as a fate- or luck-manipulator.' },
  tm: { tag: 'Time manipulation', short: 'tm', effect: '', desc: 'is known as a time-manipulator.' },
}

export const waifuTagsByTag = Object.values(waifuTags).reduce((a, x) => (a[x.tag] = x, a), {})

function addTitles(res: any, perks: any) {
  perks.forEach(x => res[x.title] = x)
}

export const ALL_PERK_TITLES = computed(() => {
  const result = {}
  const all = [intensity, bindings, lures, lureExpansions, otherControls, heritages, homes, defenses, talents, perks,
    genericPerks, waifu_perks, DLCperks, DLChomes, DLCgenericPerks, DLCheritages, DLCtalents, DLClureExpansions,
    DLCbindings, DLClures, DLCotherControls]
  all.forEach(p => addTitles(result, p))
  return result
})

export const LINKS = computed(() => {
  const links = {} as Record<string, string>
  const allCats = {
    intensity,
    origin,
    'binding': [...bindings, ...lures, ...lureExpansions, ...otherControls],
    'heritage': heritages,
    'talents/ride': rides,
    'talents/home': homes,
    'talents/defense': defenses,
    'talents/talent': talents,
    'talents/perks': perks,
    'talents/specific': [...genericPerks, ...waifu_perks],
  }
  for (const category of Object.entries(allCats)) {
    for (const entry of category[1])
      links[entry.title] = category[0]
  }
  links['Directly in Companions'] = 'companions'
  links.Offspring = ''
  links.Missions = ''
  links['Loans and Credit Debt'] = ''
  links.familiar = ''
  return links
})

export const QUERIES = computed(() => {
  const links = {} as Record<string, string>
  const allCats = {
    binding: bindings,
    heritage: heritages,
  }
  for (const category of Object.entries(allCats)) {
    for (const entry of category[1])
      links[entry.title] = entry?.tree || entry?.type
  }
  return links
})

let chars: any = null
let userChars: any = null

export async function getChars() {
  if (!chars)
    chars = (await import('~/data/characters.json')).default // chars = Object.values(await getCharsObject())
  return chars
}

export async function getUserChars() {
  if (!userChars)
    userChars = (await import('~/data/userCharacters.json')).default.reverse()
  return userChars
}

const worlds = ref([])
const subWorlds = ref([])

async function getWorlds() {
  worlds.value = (await import('~/data/worlds.json')).default
  subWorlds.value = (await import('~/data/userWorlds.json')).default
}

getWorlds()

export const allWorlds = computed(() => {
  const { userWorlds, localUserWorlds } = useStore()
  return Array.prototype.concat(userWorlds.value, localUserWorlds.value, worlds.value, subWorlds.value)
})

export const allWorldsNoCondition = computed(() => {
  const worlds: any[] = []

  const addConditions = (x) => {
    x.condition.forEach(c => worlds.push({ worldName: x.worldName, condition: c.name, rating: c.rating }))
  }

  allWorlds.value.forEach((x) => {
    if (isArray(x.condition))
      addConditions(x)

    delete x.condition
    worlds.push(x)
  })
  return worlds
})

const str = Object.keys(TOOLTIPS).sort((a, b) => b.length - a.length).join('|')
export const TOOLTIPS_REG = new RegExp(str, 'g')
export const LINKS_REG = new RegExp(Object.keys(LINKS.value)
  .map((x) => { x = x.replace('(', '\\('); x = x.replace(')', '\\)'); return x })
  .sort((a, b) => b.length - a.length)
  .join('|'), 'g')
