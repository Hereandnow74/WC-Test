import { assign, countBy, isArray, isEmpty, uniq } from 'lodash-es'
import { DBCharacter, DBWorld, PerkFull } from 'global'
import { DLCgenericPerks, DLChomes, DLCperks, DLCtalents, DLCheritages, DLClureExpansions, DLCbindings, DLClures, DLCotherControls, DLCridePerks, DLCintensity } from './DLCs'
import { DLCRides, rides } from './rides'
import { homes, demiplane, dungeon } from './demdun'
import { patrons } from './patronsDLC'
import { intensity, intensityPvP, invasionPvP } from '~/data/intensity'
import { origin } from '~/data/origin'
import { bindings, lures, lureExpansions, otherControls } from '~/data/binding'
import { heritages } from '~/data/heritage'
import { ridePerksFull, defenses, talents, perks, genericPerks } from '~/data/talents'
import { DLCwaifu_perks, waifu_perks } from '~/data/waifu_perks'
import { symbioteBinding, symBuildings, synUnits } from '~/data/symbiote'

import { useStore } from '~/store/store'
import { useChargenStore } from '~/store/chargen'

const { userWorlds, localUserWorlds, localUserCharacters } = useStore()

export const VERSION = '0.8'

export const nicknames = [
  'Definitely not Dio',
  'Darin E.',
  'cameron ngo',
  'Despin',
  'Templar9999',
  'Cyrus',
  'Alex W.',
  'TaiGambol',
  'Bryce C.',
  'Bobnewland',
  'BenFang322',
  'Jason C.',
  'Cole',
  'KatzSmile',
  'Just_A_Knight',
  'Kevin S.',
  'Beatrix',
  'Joe T.',
  'Cynicalto',
  'Zerlestes',
]

export const WORLD_COLORS = ['bg-green-600', 'bg-teal-600', 'bg-cyan-600',
  'bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-amber-600',
  'bg-orange-500', 'bg-red-500', 'bg-true-gray-700']

export const PLACEHOLDER_IMAGE = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22576%22%20height%3D%22288%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20576%20288%22%20preserveAspectRatio%3D%22none%22%3E%0A%20%20%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%20%20%3Cstyle%20type%3D%22text%2Fcss%22%3E%0A%20%20%20%20%20%20%20%20%20%20%23holder%20text%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20fill%3A%20%23ffffff%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20font-family%3A%20sans-serif%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20font-size%3A%2040px%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20font-weight%3A%20400%3B%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%3C%2Fstyle%3E%0A%20%20%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%20%20%3Cg%20id%3D%22holder%22%3E%0A%20%20%20%20%20%20%20%20%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23cccccc%22%3E%3C%2Frect%3E%0A%20%20%20%20%20%20%20%20%3Cg%3E%0A%20%20%20%20%20%20%20%20%20%20%3Ctext%20text-anchor%3D%22middle%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20dy%3D%22.3em%22%3E576%20x%20288%3C%2Ftext%3E%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C%2Fsvg%3E'

export const PLACEHOLDER_NO_IMAGE = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22576%22%20height%3D%22288%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20576%20288%22%20preserveAspectRatio%3D%22none%22%3E%0A%20%20%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%20%20%3Cstyle%20type%3D%22text%2Fcss%22%3E%0A%20%20%20%20%20%20%20%20%20%20%23holder%20text%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20fill%3A%20%23ffffff%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20font-family%3A%20sans-serif%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20font-size%3A%2040px%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20font-weight%3A%20400%3B%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%3C%2Fstyle%3E%0A%20%20%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%20%20%3Cg%20id%3D%22holder%22%3E%0A%20%20%20%20%20%20%20%20%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23cccccc%22%3E%3C%2Frect%3E%0A%20%20%20%20%20%20%20%20%3Cg%3E%0A%20%20%20%20%20%20%20%20%20%20%3Ctext%20text-anchor%3D%22middle%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20dy%3D%22.3em%22%3Eno%20image%3C%2Ftext%3E%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C%2Fsvg%3E'

export const WORLD_RATINGS = [
  { rating: 0, title: 'None', budget: 0 },
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
  'Stamp': 'Company Stamp binding',
  'Stamped': 'Applied Company Stamp binding',
  'Choker': 'Tempest Jewelry Binding',
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
  'T10': 'Cost: 1000',
  'TX': 'Cost: TX Ticket',
  'TΧ': 'Cost: TX Ticket',
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
  { title: 'familiar', title2: 'Familiars' },
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
    if (!x.waifuUID) return a
    isArray(x.waifuUID) ? x.waifuUID.forEach(u => a[u] = x.title) : a[x.waifuUID] = x.title
    return a
  }, {} as Record<number, string>)

export const waifuTags = {
  F: { tag: 'Female', short: 'F', effect: '', desc: '', color: 'bg-pink-500' },
  M: { tag: 'Male', short: 'M', effect: '', desc: '', color: 'bg-blue-500' },
  O: { tag: 'Other', short: 'O', effect: '', desc: '', color: 'bg-fuchsia-700' },
  C: { tag: 'Official WC', short: 'C', effect: '', desc: 'From official/canon spreadsheet', color: 'bg-yellow-400 text-black' },
  P: { tag: 'Perk', short: 'P', effect: '', desc: 'Have a specific waifu perk', color: 'bg-amber-200 text-black' },

  st: { tag: 'Body Defense', short: 'st', effect: '', desc: 'Is known for working with diseases, chemical medicine, or poisons.', color: 'bg-[#612e13]' },
  hr: { tag: 'Wild Defense', short: 'hr', effect: '', desc: 'Hails from a harsh climate.', color: 'bg-gradient-to-t to-blue-300 from-gray-100 text-black' },
  hz: { tag: 'Environmental Defense', short: 'hz', effect: '', desc: 'Can ignore hazardous environments.', style: { background: 'linear-gradient(0deg, rgba(79,123,2,1) 0%, rgba(163,255,0,1) 70%)', color: '#000' } },
  mt: { tag: 'Creature Defense', short: 'mt', effect: '', desc: 'Is known as a monster-tamer or otherwise being good with animals.', color: 'bg-gradient-to-t to-red-600 from-gray-100 text-black' },
  cl: { tag: 'Stress Defense', short: 'cl', effect: '', desc: 'Is known for keeping a cool head or having great willpower.', color: 'bg-[#72c7cd] text-black' },
  ml: { tag: 'Addiction Defense', short: 'ml', effect: '', desc: 'Is known for having a material vice.', color: 'bg-[#4a8108]' },
  ps: { tag: 'Mind Defense', short: 'ps', effect: '', desc: 'Is known as a psychic or mind-manipulator.', style: { 'background-image': 'url("/img/defenseBack.png")', 'background-size': 'cover', 'color': '#fff', 'font-weight': '600', 'border': '1px solid #777' } },
  bj: { tag: 'Possession Defense', short: 'bj', effect: '', desc: 'Is known for bodyjacking others.', color: 'bg-[#631900]' },
  dr: { tag: 'Soul Defense', short: 'dr', effect: '', desc: 'Can drain or feed on life, mana, or souls.', color: 'bg-gradient-to-r to-red-500 from-blue-500' },
  id: { tag: 'Fatality Defense', short: 'id', effect: '', desc: 'Is known for inflicting instant death or not dying even when killed.', color: 'bg-gradient-to-r to-green-500 from-dark-500' },
  pl: { tag: 'Polymorph Defense', short: 'pl', effect: '', desc: 'Is known for polymorphing others.', color: 'bg-[#464d6d]' },
  ur: { tag: 'Wyldscape Defense', short: 'ur', effect: '', desc: 'Hails from a region where the local reality is unstable.', color: 'bg-gradient-to-r to-dark-300 via-purple-700 from-dark-300' },
  cr: { tag: 'Corruption Defense', short: 'cr', effect: '', desc: 'Is known for forcibly bringing out others’ dark sides.', color: 'bg-gradient-to-r to-dark-900 from-gray-500' },
  sc: { tag: 'Information Defense', short: 'sc', effect: '', desc: 'Is known for their ability to read or sense people.', color: 'bg-[#f9ca94] text-black' },
  di: { tag: 'Trace Defense', short: 'di', effect: '', desc: 'Is known for using divination or other non-technological remote viewing.', color: 'bg-gradient-to-r to-blue-200 via-white from-blue-200 text-black' },
  fm: { tag: 'Destiny Defense', short: 'fm', effect: '', desc: 'Is known as a fate- or luck-manipulator.', color: 'bg-gradient-to-t to-red-900 via-red-500 from-red-900' },
  tm: { tag: 'Paradox Defense', short: 'tm', effect: '', desc: 'Is known as a time-manipulator.', color: 'bg-gradient-to-t to-blue-900 via-blue-400 from-blue-900' },

  mo: { tag: 'Monster Tamer', short: 'mo', effect: '', desc: 'Is known as a monster-tamer or otherwise being good with animals.', color: 'bg-gradient-to-t to-red-600 from-gray-100 text-black' },
  py: { tag: 'Psychic', short: 'py', effect: '', desc: 'Have Psychic powers.', style: { background: 'linear-gradient(0deg, rgba(124,0,255,1) 0%, rgba(248,0,255,1) 70%)', color: '#fff' } },
  ip: { tag: 'Mind Manipulator', short: 'ip', effect: '', desc: 'Have superpower that can manipulate minds.', color: 'bg-[#61457d]' },
  bk: { tag: 'Bodyjack', short: 'bk', effect: '', desc: 'Has power to bodyjacking others.', color: 'bg-[#631900]' },
  ih: { tag: 'Instant Death', short: 'ih', effect: '', desc: 'Is known for inflicting instant death (conceptual one)', color: 'bg-gradient-to-r to-green-500 from-dark-500' },
  sl: { tag: 'Social', short: 'sl', effect: '', desc: 'Is known to be good with people.', color: 'bg-[#f9ca94] text-black' },
  dn: { tag: 'Divination', short: 'dn', effect: '', desc: 'Is known for using divination or other non-technological remote viewing.', color: 'bg-gradient-to-r to-blue-200 via-white from-blue-200 text-black' },
  fn: { tag: 'Fate Manipulation', short: 'fn', effect: '', desc: 'Is known as a fate-manipulator.', color: 'bg-gradient-to-t to-red-900 via-red-500 from-red-900' },
  lm: { tag: 'Luck Manipulation', short: 'lm', effect: '', desc: 'Is known as a luck-manipulator.', color: 'bg-gradient-to-t to-yellow-900 via-yellow-400 from-yellow-900 text-black' },
  tn: { tag: 'Time Manipulation', short: 'tn', effect: '', desc: 'Is known as a time-manipulator.', color: 'bg-gradient-to-t to-blue-900 via-blue-400 from-blue-900' },

  hp: { tag: 'Hopper', short: 'hp', effect: '', desc: 'Have a world hopping power', color: 'bg-[#b600e9]' },
  dc: { tag: 'Doctor', short: 'dc', effect: '', desc: 'Trained in medicine', color: 'bg-[#dd1919]' },
  hl: { tag: 'Healer', short: 'hl', effect: '', desc: 'Supernatural healing ability', color: 'bg-[#dd1919]' },
  lv: { tag: 'Leveling', short: 'lv', effect: '', desc: 'Give access to a leveling/class/job system', style: { background: 'linear-gradient(0deg, rgba(182,159,2,1) 0%, rgba(255,222,0,1) 70%)', color: '#000' } },
  dm: { tag: 'Demon', short: 'dm', effect: '', desc: 'Include devils as well', style: { background: 'linear-gradient(90deg, rgba(148,1,1,1) 0%, rgba(255,0,0,1) 50%, rgba(148,1,1,1) 100%)', color: '#000' } },
  an: { tag: 'Angel', short: 'an', effect: '', desc: '', color: 'bg-[#ffffff] text-black' },
  mr: { tag: 'Monster', short: 'mr', effect: '', desc: '', color: 'bg-[#754141]' },
  dg: { tag: 'Dragon', short: 'dg', effect: '', desc: '', style: { background: 'linear-gradient(0deg, rgba(255,201,0,1) 0%, rgba(233,83,28,1) 70%)', color: '#fff' } },
  th: { tag: 'Transhuman', short: 'th', effect: '', desc: '', style: { background: 'linear-gradient(0deg, rgba(167,0,255,1) 0%, rgba(28,0,245,1) 100%)', color: '#fff' } },
  ot: { tag: 'Outsider', short: 'ot', effect: '', desc: '', style: { background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(83,0,214,1) 100%)', color: '#fff' } },
  gd: { tag: 'Deity', short: 'gd', effect: '', desc: 'A God or Goddess', color: 'bg-[#ffffff] text-black' },
  rs: { tag: 'Resurrection', short: 'rs', effect: '', desc: 'Capable of ressurecting others', color: 'bg-[#ffffff] text-black' },
  mu: { tag: 'Mutant', short: 'mu', effect: '', desc: '', color: 'bg-[#315be5]' },
  dh: { tag: 'Demi-human', short: 'dh', effect: '', desc: '', color: 'bg-[#8d4127]' },
  md: { tag: 'Maid', short: 'md', effect: '', desc: '', color: 'bg-gradient-to-t to-gray-400 from-black' },
  en: { tag: 'Engineer', short: 'en', effect: '', desc: '', color: 'bg-[#676767]' },
  sn: { tag: 'Scientist', short: 'sn', effect: '', desc: '', color: 'bg-[#2b548d]' },
  sd: { tag: 'Student', short: 'sd', effect: '', desc: '', color: 'bg-[#e9d5ab] text-black' },
  wh: { tag: 'Witch', short: 'wh', effect: '', desc: '', color: 'bg-[#0d7703]' },
  ai: { tag: 'AI', short: 'ai', effect: '', desc: 'An artificial intelligence', color: 'bg-gradient-to-t to-gray-400 from-gray-200 text-black' },
  me: { tag: 'Mage', short: 'me', effect: '', desc: '', color: 'bg-teal-500 text-black' },
  cf: { tag: 'Chef', short: 'cf', effect: '', desc: '', color: 'bg-[#dd8812]' },
  pi: { tag: 'Pirate', short: 'pi', effect: '', desc: '', style: { background: 'linear-gradient(0deg, rgba(4,21,149,1) 0%, rgba(0,120,255,1) 100%)', color: '#fff' } },
  tc: { tag: 'Teacher', short: 'tc', effect: '', desc: '', style: { background: 'linear-gradient(90deg, rgba(154,134,102,1) 0%, rgba(250,214,156,1) 50%, rgba(154,134,102,1) 100%)', color: '#000' } },
  ad: { tag: 'Android', short: 'ad', effect: '', desc: '', color: 'bg-gradient-to-t to-gray-400 from-gray-200 text-black' },
  cb: { tag: 'Cyborg', short: 'cb', effect: '', desc: '', style: { background: 'linear-gradient(90deg, rgba(238,202,178,1) 0%, rgba(168,168,168,1) 100%)', color: '#000' } },
  nn: { tag: 'Nun', short: 'nn', effect: '', desc: '', color: 'bg-gradient-to-t to-gray-400 from-black' },
  un: { tag: 'Undead', short: 'un', effect: '', desc: '', color: 'bg-[#2c5332]' },
  sp: { tag: 'Superhero', short: 'sp', effect: '', desc: '', style: { background: 'linear-gradient(90deg, rgba(52,141,255,1) 0%, rgba(255,58,58,1) 50%, rgba(244,255,71,1) 100%)', color: '#000' } },
  pc: { tag: 'Princess', short: 'pc', effect: '', desc: '', color: 'bg-[#dd12db]' },
  az: { tag: 'Amazon', short: 'az', effect: '', desc: '', color: 'bg-[#fdb978] text-black' },
  de: { tag: 'Demigod', short: 'de', effect: '', desc: '', style: { background: 'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,192,0,1) 70%)', color: '#000' } },
  el: { tag: 'Elf', short: 'el', effect: '', desc: '', style: { background: 'linear-gradient(0deg, rgba(4,202,31,1) 0%, rgba(0,123,17,1) 70%)', color: '#fff' } },
  ct: { tag: 'Catgirl', short: 'ct', effect: '', desc: '', style: { background: 'linear-gradient(0deg, rgba(215,138,12,1) 20%, rgba(240,240,240,1) 100%)', color: '#000' } },
  vp: { tag: 'Vampire', short: 'vp', effect: '', desc: '', style: { background: 'linear-gradient(0deg, rgba(196,2,2,1) 0%, rgba(99,5,5,1) 70%)', color: '#fff' } },
  pt: { tag: 'Priest', short: 'pt', effect: '', desc: '', color: 'bg-[#ffffff] text-black' },
  nj: { tag: 'Ninja', short: 'nj', effect: '', desc: '', style: { background: 'linear-gradient(0deg, rgba(70,77,81,1) 0%, rgba(154,177,190,1) 70%)', color: '#fff' } },
  sr: { tag: 'Shifter', short: 'sr', effect: '', desc: 'is able to take more than one form', color: 'bg-teal-500 text-black' },
  ev: { tag: 'Evil', short: 'ev', effect: '', desc: '', style: { background: 'linear-gradient(0deg, rgba(255,0,0,1) 42%, rgba(134,60,60,1) 100%)', color: '#000' } },
  gn: { tag: 'Genius', short: 'gn', effect: '', desc: '', style: { background: 'linear-gradient(0deg, rgba(128,0,255,1) 0%, rgba(0,150,255,1) 100%)', color: '#fff' } },
  rl: { tag: 'Ruler', short: 'rl', effect: '', desc: 'rule over a country or region or even just a tribe', color: 'bg-[#FFD700] text-black' },
  tp: { tag: 'Trap', short: 'tp', effect: '', desc: 'Oh, she is cute, but its a boy!', style: { background: 'linear-gradient(0deg, rgba(227,125,255,1) 0%, rgba(132,194,255,1) 100%)', color: '#000' } },
  mi: { tag: 'Multiple', short: 'mi', effect: '', desc: 'Package deal', color: 'bg-teal-[#0ac781] text-black' },
  tw: { tag: 'Twins', short: 'tw', effect: '', desc: 'Twins / Triplets / Quadruplets / etc.', color: 'bg-teal-500 text-black' },
  cc: { tag: 'Crafter', short: 'cc', effect: '', desc: 'Any producing profession blacksmith/alchemist/artificer/tailor/etc.', style: { background: 'linear-gradient(0deg, rgb(160 97 33) 0%, rgba(225,141,55,1) 70%)', color: '#000' } },
  mm: { tag: 'Magical Girl', short: 'mm', effect: '', desc: '', style: { background: 'linear-gradient(0deg, rgba(244,84,84,1) 0%, rgba(255,89,229,1) 70%)', color: '#fff' } },
  al: { tag: 'Alien', short: 'al', effect: '', desc: '', style: { background: 'linear-gradient(90deg, rgba(12,94,243,1) 0%, rgba(5,227,31,1) 100%)', color: '#fff' } },
  mg: { tag: 'Monster-girl', short: 'mg', effect: '', desc: '', style: { background: 'linear-gradient(0deg, rgba(255,62,169,1) 0%, rgba(74,129,255,1) 100%)', color: '#fff' } },
  nd: { tag: 'Nerd', short: 'nd', effect: '', desc: '', style: { background: 'linear-gradient(0deg, rgba(129,125,255,1) 0%, rgba(132,194,255,1) 100%)', color: '#fff' } },
  ar: { tag: 'Artist', short: 'ar', effect: '', desc: 'Any artistic talent', color: 'bg-teal-500 text-black' },
  sa: { tag: 'Strategist', short: 'sa', effect: '', desc: '', style: { background: 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(0,163,255,1) 80%)', color: '#fff' } },
  fw: { tag: 'Fanwork', short: 'fw', effect: '', desc: 'Character is a fan creation (only established ones)', style: { background: 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(219,255,0,1) 80%)', color: '#000' } },
  vn: { tag: 'Villain', short: 'vn', effect: '', desc: '', style: { background: 'linear-gradient(0deg, rgba(202,4,51,1) 0%, rgba(109,3,85,1) 100%)', color: '#fff' } },
  sy: { tag: 'Symbiote Theme', short: 'sy', effect: '', desc: 'Will qualify you to recieve specific symbiote theme', style: { background: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(129,129,129,1) 50%, rgba(0,0,0,1) 100%)', color: '#fff' } },
  rg: { tag: 'Regenerator', short: 'rg', effect: '', desc: '', style: { background: 'linear-gradient(0deg, rgba(149,4,48,1) 0%, rgba(255,0,77,1) 100%)', color: '#000' } },
  pr: { tag: 'Protagonist', short: 'pr', effect: '', desc: '', style: { background: 'linear-gradient(0deg, rgba(245,70,0,1) 0%, rgba(243,233,0,1) 70%)', color: '#000' } },
  su: { tag: 'Succubus', short: 'su', effect: '', desc: 'Include Incubus as well', style: { background: 'linear-gradient(0deg, rgba(51,0,95,1) 0%, rgba(214,0,137,1) 70%)', color: '#fff' } },
  cm: { tag: 'Combatant', short: 'cm', effect: '', desc: 'have a combat expirience / have a combat oriented powerset', style: { background: 'linear-gradient(0deg, rgba(255,90,0,1) 0%, rgba(255,0,26,1) 70%)', color: '#fff' } },
  is: { tag: 'Insane', short: 'is', effect: '', desc: '', style: { background: 'linear-gradient(90deg, rgba(165,5,199,1) 0%, rgba(243,104,245,1) 50%, rgba(165,5,199,1) 100%)', color: '#fff' } },
  rw: { tag: 'Reality Warper', short: 'rw', effect: '', desc: '', style: { background: 'linear-gradient(90deg, rgba(132,4,185,1) 0%, rgba(255,15,153,1) 50%, rgba(132,4,185,1) 100%)', color: '#fff' } },
  ha: { tag: 'Hacker', short: 'ha', effect: '', desc: '', style: { background: 'linear-gradient(0deg, rgba(71,107,77,1) 0%, rgba(0,255,29,1) 70%)', color: '#000' } },
  im: { tag: 'Immortality', short: 'im', effect: '', desc: 'Any kind of immortality', color: 'bg-gradient-to-r to-red-300 from-yellow-300 text-black' },
  ir: { tag: 'Spirit', short: 'ir', effect: '', desc: 'Includes Ghosts, Shades, Wraiths, and Yokai as well', style: { background: 'linear-gradient(0deg, rgba(233,220,255,1) 0%, rgba(125,50,245,1) 100%)', color: '#000' } },
  cu: { tag: 'Cultivator', short: 'cu', effect: '', desc: '', style: { background: 'radial-gradient(circle, rgba(251,148,63,1) 0%, rgba(255,248,0,1) 100%)', color: '#000' } },
  sh: { tag: 'Stealth', short: 'sh', effect: '', desc: 'Has experience sneaking around or committing hidden actions.', color: 'bg-teal-500 text-black' },
  pm: { tag: 'Power Manipulation', short: 'pm', effect: '', desc: '', color: 'bg-teal-500 text-black' },

  te: { tag: 'Tsundere', short: 'te', effect: '', desc: '', color: 'bg-teal-500 text-black' },
  ke: { tag: 'Kuudere', short: 'ke', effect: '', desc: '', color: 'bg-teal-500 text-black' },
  ye: { tag: 'Yandere', short: 'ye', effect: '', desc: '', color: 'bg-teal-500 text-black' },
  os: { tag: 'Onee-san', short: 'os', effect: '', desc: 'Personality type that always takes care of others', color: 'bg-teal-500 text-black' },
  ci: { tag: 'Chuuni', short: 'ci', effect: '', desc: '', color: 'bg-teal-500 text-black' },
  gi: { tag: 'Genki', short: 'gi', effect: '', desc: '', color: 'bg-teal-500 text-black' },
  ge: { tag: 'Generic', short: 'ge', effect: '', desc: 'For generic entries like pokemons, MGE monster girls, etc.', color: 'bg-teal-500 text-black' },
  nc: { tag: 'Necromancer', short: 'nc', effect: '', desc: '', color: 'bg-teal-500 text-black' },
  cs: { tag: 'Custom', short: 'cs', effect: '', desc: 'This character looks and gender can be customized at a purchase. (Ussualy RPG protagonists)', color: 'bg-teal-500 text-black' },

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
  const all = [DLCperks, DLChomes, DLCgenericPerks, DLCheritages, DLCtalents, DLClureExpansions, DLCbindings, DLClures, DLCotherControls, DLCridePerks, DLCintensity, DLCRides]
  all.forEach(p => addTitles<typeof p[0]>(result, p))
  return result
})

export const ALL_PERK_TITLES = computed(() => {
  const result = {} as Record<string, PerkFull>
  const all = [intensity, bindings, lures, lureExpansions, otherControls, heritages, homes, demiplane, dungeon, defenses, talents, perks, genericPerks, waifu_perks, DLCperks, DLChomes, DLCgenericPerks, DLCheritages, DLCtalents, DLClureExpansions, DLCbindings, DLClures, DLCotherControls, DLCridePerks]
  all.forEach(p => addTitles<typeof p[0]>(result, p))
  return result
})

const { binding, luresBought, heritage, ridePerks, homePerks, talentPerks, defensePerks, otherPerks, miscPerks, waifuPerks, genericWaifuPerks } = useChargenStore()

export const ALL_PERK_STORES = {
  Binding: binding.value,
  Lure: luresBought.value,
  Heritage: heritage.value,
  RidePerk: ridePerks.value,
  Home: homePerks.value,
  Talent: talentPerks.value,
  Defense: defensePerks.value,
  Other: otherPerks.value,
  Misc: miscPerks.value,
  Waifu: waifuPerks.value,
  Generic: genericWaifuPerks.value,
}

export const LINKS = computed(() => {
  const links = {} as Record<string, string>
  const allCats = {
    'intensity/intensity': [...intensity, ...DLCintensity],
    'intensity/pvp': intensityPvP,
    'intensity/orbs': invasionPvP,
    'origin': [...origin, ...patrons],
    'bindings/bindings': [...bindings, ...DLCbindings],
    'bindings/lures': [...lures, ...lureExpansions, ...DLClures, ...DLClureExpansions],
    'bindings/controls': [...otherControls.filter(perk => perk.type !== 'space'), ...DLCotherControls],
    'bindings/space': otherControls.filter(perk => perk.type === 'space'),
    'bindings/symbiote': [...symbioteBinding, ...symBuildings, ...synUnits],
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
  // links.familiars = ''
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
const changes = ref({})

export async function getChars(): Promise<DBCharacter[]> {
  if (!chars)
    chars = (await import('~/data/characters.json')).default
  return chars
}

export async function getChanges() {
  if (isEmpty(changes.value))
    changes.value = (await import('~/data/whatChanged/newChanges.json')).default
}

getChanges()

export async function getUserChars(): Promise<DBCharacter[]> {
  if (!userChars) {
    userChars = (await import('~/data/userCharacters.json')).default.map((char) => {
      char.type = 'sub'
      if (!char.b.includes('U'))
        char.b.push('U')
      return char
    })
  }
  return userChars
}

const allChars = ref<DBCharacter[]>([])
let running = false
export const getAllChars = async() => {
  if (running) return allChars.value
  if (!allChars.value.length) {
    running = true
    allChars.value.push(...(await getUserChars()).reverse(), ...(await getChars()))
    running = false
  }

  return allChars.value
}

const allCharsComp = computed(() => {
  return [...localUserCharacters.value.map(x => ({ u: x.uid, n: x.name, w: x.world, t: x.tier, d: x.sub, b: x.tags, i: x.image, in: x.image_nsfw, type: 'local' }))].concat(allChars.value)
})

const allCharsObject = computed(() => {
  const res = {} as Record<number, DBCharacter>
  allCharsComp.value.forEach(x => res[x.u] ? null : res[x.u] = x)
  return res
})

const tagsCount = computed(() => {
  return allCharsComp.value.reduce((obj, char) => {
    char.b.forEach((tag: string) => obj[tag] === undefined ? obj[tag] = 1 : obj[tag] += 1)
    return obj
  }, {} as Record<string, number>)
})

getAllChars()

export function useAllChars() {
  return {
    allChars,
    allCharsObject,
    allCharsComp,
    tagsCount,
    changes,
  }
}

const worlds = ref<DBWorld[]>([])
const subWorlds = ref<DBWorld[]>([])

async function getWorlds() {
  worlds.value = (await import('~/data/worlds.json')).default
  subWorlds.value = (await import('~/data/userWorlds.json')).default
}

const allWorldNames = computed(() => uniq(allChars.value.map(x => x.w)))
const allSubs = computed(() => uniq(allChars.value.filter(x => x.d).map(x => x.d)))
const allWorldTargets = computed(() => assign(countBy(allChars.value.map(x => x.w)), countBy(allChars.value.map(x => x.d))))

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

// const str = Object.keys(TOOLTIPS).map(x => `[^-]?(${x})`).sort((a, b) => b.length - a.length).join('|')
// export const TOOLTIPS_REG = new RegExp(str, 'g')

export const LINKS_REG = new RegExp([...Object.keys(LINKS.value), ...Object.keys(TOOLTIPS)]
  .filter(x => !['Eternal', 'Resonance'].includes(x))
  .map((x) => { x = x.replace('(', '\\('); x = x.replace(')', '\\)'); return `(${x})` })
  .sort((a, b) => b.length - a.length)
  .join('(?:s|’s|ing)?|'), 'g')

export const defTags = [
  'st',
  'hr',
  'hz',
  'mt',
  'cl',
  'ml',
  'ps',
  'bj',
  'dr',
  'id',
  'pl',
  'ur',
  'cr',
  'sc',
  'di',
  'fm',
  'tm',
]

export const defTagsFull = [
  'Body Defense',
  'Wild Defense',
  'Environmental Defense',
  'Creature Defense',
  'Stress Defense',
  'Addiction Defense',
  'Mind Defense',
  'Possession Defense',
  'Soul Defense',
  'Fatality Defense',
  'Polymorph Defense',
  'Wyldscape Defense',
  'Corruption Defense',
  'Information Defense',
  'Trace Defense',
  'Destiny Defense',
  'Paradox Defense',
]
