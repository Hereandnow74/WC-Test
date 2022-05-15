import { countBy, isArray, uniq } from 'lodash-es'
import { DBCharacter, DBWorld, PerkFull } from 'global'
import { DLCgenericPerks, DLChomes, DLCperks, DLCtalents, DLCheritages, DLClureExpansions, DLCbindings, DLClures, DLCotherControls, DLCridePerks, DLCintensity } from './DLCs'
import { DLCRides, rides } from './rides'
import { homes, demiplane, dungeon } from './demdun'
import { patrons } from './patronsDLC'
import { intensity } from '~/data/intensity'
import { origin } from '~/data/origin'
import { bindings, lures, lureExpansions, otherControls } from '~/data/binding'
import { heritages } from '~/data/heritage'
import { ridePerksFull, defenses, talents, perks, genericPerks } from '~/data/talents'
import { DLCwaifu_perks, waifu_perks } from '~/data/waifu_perks'

import { useStore } from '~/store/store'

const { userWorlds, localUserWorlds, localUserCharacters } = useStore()

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
  { rating: 11, title: 'One', budget: 0 },
]

export const CHAR_COSTS = [0, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 11111]
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
  'isekai': 'Another world',
  'Classical Heroics': 'You now have a certain objective you need to obtain before you can progress from this setting.',
  'Transcendental': 'Your existence is now perpetual, meaning you hold the conceptual authority to exist forever, recovering completely from anything which doesn’t instantly annihilate you and reincarnating absolutely from even true death in a new world of your choosing; should you ever reincarnate your waifus will all follow you through the cycle of rebirth and be reborn alongside you still bound to you; if any of your waifus should die you will be able to reverse their deaths and return them to you; you can control your own age as easily as willing it to change, and shift around the ages of any of your waifus with just as much effort; you can selectively reverse time on a micro or macro scale, allowing you to revert injuries and repair damage, and as you become accustomed to your new power you will eventually be able to slow or even halt time for yourself and your waifus, or even travel across timelines within your local setting to visit different eras or points of interest; as you now exist partially outside of time you are inherently immune to having anything about you altered by an external force and your actions cannot be predicted; and as an acausal being your actions will not cause a recursion paradox or a temporal collapse; this counts as a Warranty; grants you and your waifus All Defenses, cost discounted as applicable for prior Defense and Warranty purchases',
}

export const rulesList = [
  { title: 'starting', title2: 'Creating Your Build' },
  { title: 'captures', title2: 'Extending Your Build: Captures' },
  { title: 'familiars', title2: 'Familiars' },
  { title: 'purchases', title2: 'Extending Your Build: Purchases' },
  { title: 'sales', title2: 'Extending Your Build: Sales' },
  { title: 'waifu11', title2: 'These Waifus Go Up to 11' },
  { title: 'danger11', title2: 'Danger Rating 11 Build Rules' },
  { title: 'pvp', title2: 'Other Contractors' },
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
  { title: 'specific', title2: 'Setting Specific Rules' },
]

export const waifusThatHasPerk = [...waifu_perks, ...DLCwaifu_perks]
  .reduce((a, x) => {
    if (!x.uid) return a
    isArray(x.uid) ? x.uid.forEach(u => a[u] = x.title) : a[x.uid] = x.title
    return a
  }, {} as Record<number, string>)

export const waifuTags = {
  F: { tag: 'Female', short: 'F', effect: '', desc: '', color: 'bg-pink-500' },
  M: { tag: 'Male', short: 'M', effect: '', desc: '', color: 'bg-blue-500' },
  O: { tag: 'Other', short: 'O', effect: '', desc: '', color: 'bg-fuchsia-700' },
  C: { tag: 'Official WC', short: 'C', effect: '', desc: 'From official/canon spreadsheet', color: 'bg-yellow-400 text-black' },
  P: { tag: 'Perk', short: 'P', effect: '', desc: 'Have a specific waifu perk', color: 'bg-amber-200 text-black' },

  hp: { tag: 'Hopper', short: 'hp', effect: '', desc: 'Have a world hopping power', color: 'bg-[#b600e9]' },
  dc: { tag: 'Doctor', short: 'dc', effect: '', desc: 'Trained in medicine', color: 'bg-[#dd1919]' },
  hl: { tag: 'Healer', short: 'hl', effect: '', desc: 'Supernatural healing ability', color: 'bg-[#dd1919]' },
  st: { tag: 'Sturdy', short: 'st', effect: '', desc: 'is known for handling disease, chemical medicine, or poisons.', color: 'bg-[#612e13]' },
  hr: { tag: 'Harsh', short: 'hr', effect: '', desc: 'hails from a harsh climate.', color: 'bg-gradient-to-t to-blue-300 from-gray-100 text-black' },
  hz: { tag: 'Hazard', short: 'hz', effect: '', desc: 'can ignore hazardous environments.', color: 'bg-[#28cd22] text-black' },
  mt: { tag: 'Monster Tamer', short: 'mt', effect: '', desc: 'is known as a monster-tamer or otherwise being good with animals.', color: 'bg-gradient-to-t to-red-600 from-gray-100 text-black' },
  cl: { tag: 'Cool', short: 'cl', effect: '', desc: 'is known for keeping a cool head or having great willpower.', color: 'bg-[#72c7cd] text-black' },
  ml: { tag: 'Materialist', short: 'ml', effect: '', desc: 'known for having a material vice.', color: 'bg-[#4a8108]' },
  ps: { tag: 'Psychic', short: 'ps', effect: '', desc: 'is known as a psychic or mind-manipulator.', color: 'bg-[#61457d]' },
  mp: { tag: 'Mind Powers', short: 'mp', effect: '', desc: 'is known as a psychic or mind-manipulator.', color: 'bg-[#61457d]' },
  bj: { tag: 'Bodyjack', short: 'bj', effect: '', desc: 'is known for bodyjacking others.', color: 'bg-[#631900]' },
  dr: { tag: 'Drain HP/MP/SP', short: 'dr', effect: '', desc: 'can drain or feed on life, mana, or souls.', color: 'bg-gradient-to-r to-red-500 from-blue-500' },
  id: { tag: 'Instant Death', short: 'id', effect: '', desc: 'is known for inflicting instant death or not dying even when killed.', color: 'bg-gradient-to-r to-green-500 from-dark-500' },
  im: { tag: 'Immortality', short: 'im', effect: '', desc: 'is known for inflicting instant death or not dying even when killed.', color: 'bg-gradient-to-r to-red-300 from-yellow-300 text-black' },
  pl: { tag: 'Polymorph', short: 'pl', effect: '', desc: 'is known for polymorphing others.', color: 'bg-[#464d6d]' },
  ur: { tag: 'Unstable Reality', short: 'ur', effect: '', desc: 'hails from a region where the local reality is unstable.', color: 'bg-gradient-to-r to-dark-300 via-purple-700 from-dark-300' },
  cr: { tag: 'Corrupting', short: 'cr', effect: '', desc: 'is known for forcibly bringing out others’ dark sides.', color: 'bg-gradient-to-r to-dark-900 from-gray-500' },
  sc: { tag: 'Social', short: 'sc', effect: '', desc: 'is known for their ability to read or sense people.', color: 'bg-[#f9ca94] text-black' },
  di: { tag: 'Divination', short: 'di', effect: '', desc: 'is known for using divination or other non-technological remote viewing.', color: 'bg-gradient-to-r to-blue-200 via-white from-blue-200 text-black' },
  fm: { tag: 'Fate manipulation', short: 'fm', effect: '', desc: 'is known as a fate- or luck-manipulator.', color: 'bg-gradient-to-t to-red-900 via-red-500 from-red-900' },
  lm: { tag: 'Luck manipulation', short: 'lm', effect: '', desc: 'is known as a fate- or luck-manipulator.', color: 'bg-gradient-to-t to-yellow-900 via-yellow-400 from-yellow-900' },
  tm: { tag: 'Time manipulation', short: 'tm', effect: '', desc: 'is known as a time-manipulator.', color: 'bg-gradient-to-t to-blue-900 via-blue-400 from-blue-900' },
  lv: { tag: 'Leveling', short: 'lv', effect: '', desc: 'Give access to a leveling/class/job system', color: 'bg-[#FFD700] text-black' },

  dm: { tag: 'Demon', short: 'dm', effect: '', desc: '', color: 'bg-[#e92929]' },
  dv: { tag: 'Devil', short: 'dv', effect: '', desc: '', color: 'bg-[#e92929]' },
  an: { tag: 'Angel', short: 'an', effect: '', desc: '', color: 'bg-[#ffffff] text-black' },
  mr: { tag: 'Monster', short: 'mr', effect: '', desc: '', color: 'bg-[#754141]' },
  dg: { tag: 'Dragon', short: 'dg', effect: '', desc: '', color: 'bg-[#cd2952]' },
  th: { tag: 'Transhuman', short: 'th', effect: '', desc: '', color: 'bg-[#315be5]' },
  ot: { tag: 'Outsider', short: 'ot', effect: '', desc: '', color: 'bg-[#5a3c68]' },
  gd: { tag: 'Deity', short: 'gd', effect: '', desc: 'God or Goddess', color: 'bg-[#ffffff] text-black' },
  rs: { tag: 'Resurrection', short: 'rs', effect: '', desc: '', color: 'bg-[#ffffff] text-black' },
  mu: { tag: 'Mutant', short: 'mu', effect: '', desc: '', color: 'bg-[#315be5]' },
  dh: { tag: 'Demi-human', short: 'dh', effect: '', desc: '', color: 'bg-[#8d4127]' },
  md: { tag: 'Maid', short: 'md', effect: '', desc: '', color: 'bg-gradient-to-t to-gray-400 from-black' },
  en: { tag: 'Engineer', short: 'en', effect: '', desc: '', color: 'bg-[#676767]' },
  sn: { tag: 'Scientist', short: 'sn', effect: '', desc: '', color: 'bg-[#2b548d]' },
  sd: { tag: 'Student', short: 'sd', effect: '', desc: '', color: 'bg-[#e9d5ab] text-black' },
  wh: { tag: 'Witch', short: 'wh', effect: '', desc: '', color: 'bg-[#0d7703]' },
  ai: { tag: 'AI', short: 'ai', effect: '', desc: '', color: 'bg-gradient-to-t to-gray-400 from-gray-200 text-black' },
  me: { tag: 'Mage', short: 'me', effect: '', desc: '', color: 'bg-teal-500 text-black' },
  cf: { tag: 'Chef', short: 'cf', effect: '', desc: '', color: 'bg-[#dd8812]' },
  pi: { tag: 'Pirate', short: 'pi', effect: '', desc: '', color: 'bg-teal-500 text-black' },
  tc: { tag: 'Teacher', short: 'tc', effect: '', desc: '', color: 'bg-teal-500 text-black' },
  ad: { tag: 'Android', short: 'ad', effect: '', desc: '', color: 'bg-gradient-to-t to-gray-400 from-gray-200 text-black' },
  cb: { tag: 'Cyborg', short: 'cb', effect: '', desc: '', color: 'bg-gradient-to-t to-gray-400 from-gray-200 text-black' },
  nn: { tag: 'Nun', short: 'nn', effect: '', desc: '', color: 'bg-gradient-to-t to-gray-400 from-black' },
  un: { tag: 'Undead', short: 'un', effect: '', desc: '', color: 'bg-[#2c5332]' },
  sp: { tag: 'Superhero', short: 'sp', effect: '', desc: '', color: 'bg-teal-500 text-black' },
  pc: { tag: 'Princess', short: 'pc', effect: '', desc: '', color: 'bg-[#dd12db]' },
  az: { tag: 'Amazon', short: 'az', effect: '', desc: '', color: 'bg-[#fdb978] text-black' },
  de: { tag: 'Demigod', short: 'de', effect: '', desc: '', color: 'bg-teal-500 text-black' },
  el: { tag: 'Elf', short: 'el', effect: '', desc: '', color: 'bg-[#308418]' },
  ct: { tag: 'Catgirl', short: 'ct', effect: '', desc: '', color: 'bg-[#de7b0a]' },
  vp: { tag: 'Vampire', short: 'vp', effect: '', desc: '', color: 'bg-[#b52865]' },
  pt: { tag: 'Priest', short: 'pt', effect: '', desc: '', color: 'bg-[#ffffff] text-black' },
  nj: { tag: 'Ninja', short: 'nj', effect: '', desc: '', color: 'bg-teal-500 text-black' },
  sr: { tag: 'Shifter', short: 'sr', effect: '', desc: 'is able to take more than one form', color: 'bg-teal-500 text-black' },
  ev: { tag: 'Evil', short: 'ev', effect: '', desc: '', color: 'bg-teal-500 text-black' },
  gn: { tag: 'Genius', short: 'gn', effect: '', desc: '', color: 'bg-teal-500 text-black' },
  rl: { tag: 'Ruler', short: 'rl', effect: '', desc: 'rule over a country or region or even just a tribe', color: 'bg-[#FFD700] text-black' },
  tp: { tag: 'Trap', short: 'tp', effect: '', desc: 'oh, she is cute, but its a boy!', color: 'bg-teal-500 text-black' },
  mi: { tag: 'Multiple', short: 'mi', effect: '', desc: 'Package deal', color: 'bg-teal-500 text-black' },
  tw: { tag: 'Twins', short: 'tw', effect: '', desc: 'Twins / Triplets / Quadruplets / etc.', color: 'bg-teal-500 text-black' },
  cc: { tag: 'Crafter', short: 'cc', effect: '', desc: 'Any producing profession blacksmith/alchemist/artificer/tailor/etc.', color: 'bg-teal-500 text-black' },
  mm: { tag: 'Magical Girl', short: 'mm', effect: '', desc: '', color: 'bg-teal-500 text-black' },
  al: { tag: 'Alien', short: 'al', effect: '', desc: '', color: 'bg-teal-500 text-black' },
  mg: { tag: 'Monster-girl', short: 'mg', effect: '', desc: '', color: 'bg-teal-500 text-black' },
  nd: { tag: 'Nerd', short: 'nd', effect: '', desc: '', color: 'bg-teal-500 text-black' },
  ar: { tag: 'Artist', short: 'ar', effect: '', desc: 'Any artistic talent', color: 'bg-teal-500 text-black' },
  sa: { tag: 'Strategist', short: 'sa', effect: '', desc: '', color: 'bg-teal-500 text-black' },
  fw: { tag: 'Fanwork', short: 'fw', effect: '', desc: 'Character is a fan creation (only established ones)', color: 'bg-teal-500 text-black' },
  vn: { tag: 'Villain', short: 'vn', effect: '', desc: '', color: 'bg-teal-500 text-black' },
  sy: { tag: 'Symbiote Theme', short: 'sy', effect: '', desc: 'Will qualiqy you to recieve specific symbiote theme', color: 'bg-teal-500 text-black' },
  rg: { tag: 'Regenerator', short: 'rg', effect: '', desc: '', color: 'bg-teal-500 text-black' },
  pr: { tag: 'Protagonist', short: 'pr', effect: '', desc: '', color: 'bg-teal-500 text-black' },

  U: { tag: 'By User', short: 'U', effect: '', desc: 'Characters that were added to Interactive by users, applied automatically to all submitted characters', color: 'bg-warm-gray-600' },
} as const

type Keys = keyof typeof waifuTags
type Names = typeof waifuTags[Keys]['tag']

export const waifuTagsByTag = Object.values(waifuTags).reduce(
  (a, x) => { a[x.tag] = x; return a }, {} as Record<Names, typeof waifuTags[Keys]>,
)

function addTitles<T>(res: any, perks: T[]) {
  perks.forEach((x: T) => res[x.title] = x)
}

export const ALL_OFF_PERK_TITLES = computed(() => {
  const result = {} as Record<string, PerkFull>
  const all = [intensity, bindings, lures, lureExpansions, otherControls, heritages, homes, demiplane, dungeon, defenses, talents, perks, genericPerks, waifu_perks]
  all.forEach(p => addTitles<typeof p[0]>(result, p))
  return result
})

export const ALL_DLC_PERK_TITLES = computed(() => {
  const result = {} as Record<string, PerkFull>
  const all = [DLCperks, DLChomes, DLCgenericPerks, DLCheritages, DLCtalents, DLClureExpansions, DLCbindings, DLClures, DLCotherControls, DLCridePerks]
  all.forEach(p => addTitles<typeof p[0]>(result, p))
  return result
})

export const ALL_PERK_TITLES = computed(() => {
  const result = {} as Record<string, PerkFull>
  const all = [intensity, bindings, lures, lureExpansions, otherControls, heritages, homes, demiplane, dungeon, defenses, talents, perks, genericPerks, waifu_perks, DLCperks, DLChomes, DLCgenericPerks, DLCheritages, DLCtalents, DLClureExpansions, DLCbindings, DLClures, DLCotherControls, DLCridePerks]
  all.forEach(p => addTitles<typeof p[0]>(result, p))
  return result
})

export const LINKS = computed(() => {
  const links = {} as Record<string, string>
  const allCats = {
    'intensity': [...intensity, ...DLCintensity],
    'origin': [...origin, ...patrons],
    'bindings/bindings': [...bindings, ...DLCbindings],
    'bindings/lures': [...lures, ...lureExpansions, ...DLClures, ...DLClureExpansions],
    'bindings/controls': [...otherControls, ...DLCotherControls],
    'heritage': [...heritages, ...DLCheritages],
    'talents/ride': [...rides, ...ridePerksFull, ...DLCridePerks, ...DLCRides],
    'talents/home': [...homes, ...demiplane, ...dungeon, ...DLChomes],
    'talents/defense': defenses,
    'talents/talent': [...talents, ...DLCtalents],
    'talents/perks': [...perks, ...DLCperks],
    'talents/generic': [...genericPerks, ...DLCgenericPerks],
    'talents/specific': [...waifu_perks, ...DLCwaifu_perks],
  }
  for (const category of Object.entries(allCats)) {
    for (const entry of category[1])
      links[entry.title] = category[0]
  }
  links['Directly in Companions'] = 'companions'
  links.Offspring = ''
  links.Missions = ''
  links['Loans and Credit Debt'] = ''
  links['Soul Defense (2x)'] = 'talents/defense'
  links.familiar = ''
  return links
})

// export const names = computed(() => {
//   const links = {} as Record<string, string>
//   const allCats = {
//     'Intensity': intensity,
//     'Origin': origin,
//     'Binding': bindings,
//     'DLC Binding': DLCbindings,
//     'Lure': [...lures, ...lureExpansions],
//     'DLC Lure': [...DLClures, ...DLClureExpansions],
//     'Other Control': otherControls,
//     'DLC Other Control': DLCotherControls,
//     'Heritage': heritages,
//     'Ride': [...rides, ...ridePerksFull],
//     'DLC Ride Perk': DLCridePerks,
//     'Home': [...homes, ...demiplane, ...dungeon],
//     'DLC Home': DLChomes,
//     'Defense': defenses,
//     'Talent': talents,
//     'DLC Talent': DLCtalents,
//     'Misc Perk': perks,
//     'DLC Misc Perk': DLCperks,
//     'Waifu Perk': [...genericPerks, ...waifu_perks],
//     'DLC Generic Waifu Perk': DLCgenericPerks,
//   }
//   for (const category of Object.entries(allCats)) {
//     for (const entry of category[1])
//       links[entry.title] = category[0]
//   }
//   return links
// })

// navigator.clipboard.writeText(JSON.stringify(names.value, null, 2))

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

export async function getChars(): Promise<DBCharacter[]> {
  if (!chars)
    chars = (await import('~/data/characters.json')).default // chars = Object.values(await getCharsObject())
  return chars
}

export async function getUserChars(): Promise<DBCharacter[]> {
  if (!userChars)
    userChars = (await import('~/data/userCharacters.json')).default
  return userChars
}

const allChars = ref<DBCharacter[]>([])
let running = false
export const getAllChars = async() => {
  if (running) return allChars.value
  if (!allChars.value.length) {
    running = true
    allChars.value.push(...(await getChars()), ...(await getUserChars()))
    running = false
    if (localUserCharacters.value.length)
      allChars.value.push(...localUserCharacters.value.map(x => ({ u: x.uid, n: x.name, w: x.world, t: x.tier, d: x.sub, b: x.tags, i: x.image, in: x.image_nsfw })))
  }

  return allChars.value
}

getAllChars()

const allCharsObject = {} as Record<number, DBCharacter>
export const getAllCharsObject = async() => {
  if (!allCharsObject[0])
    [...(await getAllChars())].forEach(x => allCharsObject[x.u] = x)
  return allCharsObject
}

const worlds = ref<DBWorld[]>([])
const subWorlds = ref<DBWorld[]>([])

async function getWorlds() {
  worlds.value = (await import('~/data/worlds.json')).default
  subWorlds.value = (await import('~/data/userWorlds.json')).default
}

const allWorldNames = computed(() => uniq(allChars.value.map(x => x.w)))
const allSubs = computed(() => uniq(allChars.value.filter(x => x.d).map(x => x.d)))
const allWorldTargets = computed(() => countBy(allChars.value.map(x => x.w)))

export function useWorlds() {
  return {
    worlds,
    subWorlds,
    allWorldNames,
    allSubs,
    allWorldTargets,
  }
}

getWorlds()

export const allCompanionsWorlds = computed(() => Array.from(new Set(allChars.value.map(x => x.w))))

export const allWorlds = computed(() => {
  return Array.prototype.concat(userWorlds.value, localUserWorlds.value, worlds.value.map((x) => { x.type = 'canon'; return x }), subWorlds.value)
})

export const allWorldsNoCondition = computed(() => {
  const worlds: DBWorld[] = []

  const addConditions = (x: DBWorld) => {
    if (x.condition)
      x.condition.forEach(c => worlds.push({ worldName: x.worldName, condition: c.name, rating: c.rating, type: x.type ? 'canon' : 'user' }))
  }

  allWorlds.value.forEach((x) => {
    if (isArray(x.condition))
      addConditions(x)

    worlds.push({ worldName: x.worldName, rating: x.rating, type: x.type ? 'canon' : 'user' })
  })
  return worlds
})

const str = Object.keys(TOOLTIPS).sort((a, b) => b.length - a.length).join('|')
export const TOOLTIPS_REG = new RegExp(str, 'g')
export const LINKS_REG = new RegExp(Object.keys(LINKS.value)
  .map((x) => { x = x.replace('(', '\\('); x = x.replace(')', '\\)'); return x })
  .sort((a, b) => b.length - a.length)
  .join('|'), 'g')
