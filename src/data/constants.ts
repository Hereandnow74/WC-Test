import { assign, countBy, isArray, isEmpty, uniq, uniqWith } from 'lodash-es'
import { DBCharacter, DBWorld, PerkFull } from 'global'
import { intensity, intensityPvP, invasionPvP } from '../data/intensity'
import { origin } from '../data/origin'
import { bindings, lures, lureExpansions, otherControls } from '../data/binding'
import { heritages } from '../data/heritage'
import { ridePerksFull, defenses, talents, perks, genericPerks } from '../data/talents'
import { DLCwaifu_perks, waifu_perks } from '../data/waifu_perks'
import { symbioteBinding, symBuildings, synUnits, phases } from '../data/symbiote'

import { useStore } from '../store/store'
import { useChargenStore } from '../store/chargen'
import { tournamentPerks } from './tournamentDLC'
import { fullHeritagesDLC } from './heritageDLC'
import { patrons } from './patronsRework'
import { homes, demiplane, dungeon } from './demdun'
import { DLCRides, rides } from './rides'
import { DLCgenericPerks, DLChomes, DLCperks, DLCtalents, DLCheritages, DLClureExpansions, DLCbindings, DLClures, DLCotherControls, DLCridePerks, DLCintensity } from './DLCs'
import { difficultyOptions } from './difficulty'

export const VERSION = '0.8'

export const nicknames = [
  'Definitely not Dio',
  'Despin',
  'Roger M.',
  'zediekiel',
  'Darin E.',
  'cameron ngo',
  'ClayUndead',
  'Templar9999',
  'Cyrus',
  'TaiGambol',
  'the_taken',
  'Alex W.',
  'Bobnewland',
  'Vandalvagabond',
  'Bryce C.',
  'Dragonace6489',
  'BenFang322',
  'Jason C.',
  'Llamore',
  'Cole',
  'Just_A_Knight',
  'Kevin S.',
  'Joe T.',
  'Kaleb',
  'Halfrican',
  'John C. F.',
  'KatzSmile',
  'Cynicalto',
  'Beatrix',
  'Zerlestes',
  'Darkarma',
  'Kirron 999',
  'Gregory B.',
  'ProtagNeptune',
  'AfterAll',
  'Chris R.',
  'Eerie Sharp',
  'Exactingspoon',
  'DragonBoy.EXE',
  'Michael L.',
  'xydra22',
  'Titus Landis',
]

export const WORLD_COLORS = ['bg-green-600', 'bg-teal-600', 'bg-cyan-600',
  'bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-600',
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
const temp: number[] = []
for (let i = 0; i < 9; i++)
  temp.push((temp[i - 1] || 2500) / ((Math.sqrt(5) + 1) / 2))
temp.unshift(2500)
temp.push(0)
temp.reverse()
export const WORLD_RATINGS_DF = temp

// export const WORLD_RATINGS_DF = [0, 33, 55, 86, 140, 225, 365, 590, 955, 1545, 2500]

export const CHAR_COSTS = [0, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 0, 0, 0]
export const CHAR_COSTS_FULL = [0, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000]
export const CHAR_COSTS_IMG = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2000, 5000, 10000]
export const CHAR_COSTS_TICKET = { 11: 2, 12: 5, 13: 10 } as Record<number, number>
export const shownValue = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'X', 'Y', 'Z']

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
  'TX': 'Cost: 2 IMG',
  'TY': 'Cost: 5 IMG',
  'TZ': 'Cost: 10 IMG',
  'Negotiable': 'Negotiables - people you can negotiate with, for lack of a better term. While they may have an agenda that runs counter to yours, they will not become hostile unless provoked by some means: competition over the same capture target, a breach of ethical standards, manipulation by local parties, or just self-defense against your aggression. Negotiable contractors count as defeated once they’re either killed or permanently accommodated.',
  'Rival': 'Rivals they don’t have an issue with you in particular, but you will stand directly in the way of their goals: their list of local capture targets overlaps with yours, you and they want a member of each other’s retinue and aren’t willing to back off or trade, members of your retinues know each other and want their counterpart to join them, etc. If you leave for another world, your rival will connect to that world too and have objectives there that are incompatible with your own. Rivals are defeated when they are no longer capable and/or willing to pursue their goals.',
  'Enemy': 'Enemies - when you and an enemy are first connected to the same world, your smart devices will receive alerts with each other’s name and face: as you look at that moment, minus any makeup. Like rivals, enemies will also pursue you across worlds. Assume that every enemy you encounter seeks to stripmine your visited worlds of all credit value, claim your retinue as their own, or even sell them off for credits. The only choice is to kill or be killed.',
  'isekai': 'Another world',
  'Classical Heroics': 'You now have a certain objective you need to obtain before you can progress from this setting.',
  'Transcendental': 'Your existence is now perpetual, meaning you hold the conceptual authority to exist forever, recovering completely from anything which doesn’t instantly annihilate you and reincarnating absolutely from even true death in a new world of your choosing; should you ever reincarnate your waifus will all follow you through the cycle of rebirth and be reborn alongside you still bound to you; if any of your waifus should die you will be able to reverse their deaths and return them to you; you can control your own age as easily as willing it to change, and shift around the ages of any of your waifus with just as much effort; you can selectively reverse time on a micro or macro scale, allowing you to revert injuries and repair damage, and as you become accustomed to your new power you will eventually be able to slow or even halt time for yourself and your waifus, or even travel across timelines within your local setting to visit different eras or points of interest; as you now exist partially outside of time you are inherently immune to having anything about you altered by an external force and your actions cannot be predicted; and as an acausal being your actions will not cause a recursion paradox or a temporal collapse; this counts as a Warranty; grants you and your waifus All Defenses, cost discounted as applicable for prior Defense and Warranty purchases',
}

export const rulesList = [
  { title: 'starting', title2: 'Creating Your Build' },
  { title: 'device', title2: 'Your Contractor Smart Device' },
  { title: 'purchases', title2: 'Purchases' },
  { title: 'familiar', title2: 'Familiars' },
  { title: 'captures', title2: 'Captures' },
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
  { title: 'additional', title2: 'Additional Rules' },
  { title: 'NasuDLC', title2: 'Nasuverse DLC rules' },
  { title: 'specific', title2: 'Setting Specific Rules' },

]

export const waifusThatHasPerk = [...waifu_perks, ...DLCwaifu_perks]
  .reduce((a, x) => {
    if (!x.waifuUID) return a
    isArray(x.waifuUID) ? x.waifuUID.forEach(u => a[u] = x.title) : a[x.waifuUID] = x.title
    return a
  }, {} as Record<number, string>)

// 1. Gender
// 2. Occupation (Doctor, etc)
// 3. Race
// 4. Defense
// 5. Powers (Regenerator, etc)
// 6. Personality (Genki, etc)
// 7. Utility (Perk, Multiple, Official WC)
// 8. Other
export const waifuTags = {
  F: { tag: 'Female', category: 'Gender', short: 'F', effect: '', desc: '', color: 'bg-pink-500 text-white' },
  M: { tag: 'Male', category: 'Gender', short: 'M', effect: '', desc: '', color: 'bg-blue-500 text-white' },
  O: { tag: 'Other', category: 'Gender', short: 'O', effect: '', desc: 'Genderless or someone whose gender cannot be identified.', color: 'bg-fuchsia-700' },
  Ft: { tag: 'Futanari', category: 'Gender', short: 'Ft', effect: '', desc: '', style: { background: 'linear-gradient(90deg, rgba(254,100,255,1) 0%, rgba(255,77,179,1) 50%, rgba(254,100,255,1) 100%)', color: '#000' } },

  C: { tag: 'Official WC', category: 'Utility', short: 'C', effect: '', desc: 'From official/canon spreadsheet.', color: 'bg-yellow-400 text-black' },
  P: { tag: 'Perk', category: 'Utility', short: 'P', effect: '', desc: 'Has a specific waifu perk.', color: 'bg-amber-200 text-black' },

  st: { tag: 'Body Defense', category: 'Defense', short: 'st', effect: '', desc: 'Known for working with diseases, chemical medicine, or poisons.', style: { 'background-image': 'url("https://i.imgur.com/yjUZyU0m.png")', 'background-size': 'cover', 'color': '#fff', 'font-weight': '600', 'border': '1px solid #777' } },
  hr: { tag: 'Wild Defense', category: 'Defense', short: 'hr', effect: '', desc: 'Hails from a harsh climate.', style: { 'background-image': 'url("https://i.imgur.com/bQuAIdAm.png")', 'background-size': 'cover', 'color': '#fff', 'font-weight': '600', 'border': '1px solid #777' } },
  hz: { tag: 'Environmental Defense', category: 'Defense', short: 'hz', effect: '', desc: 'Can ignore hazardous environments.', style: { 'background-image': 'url("https://i.imgur.com/6OgxggSm.png")', 'background-size': 'cover', 'color': '#000', 'font-weight': '600', 'border': '1px solid #777' } },
  mt: { tag: 'Creature Defense', category: 'Defense', short: 'mt', effect: '', desc: 'Known as a monster-tamer or otherwise being good with animals.', style: { 'background-image': 'url("https://i.imgur.com/pSN5gOXm.png")', 'background-size': 'cover', 'color': '#000', 'font-weight': '600', 'border': '1px solid #777' } },
  cl: { tag: 'Stress Defense', category: 'Defense', short: 'cl', effect: '', desc: 'Known for keeping a cool head or having great willpower.', style: { 'background-image': 'url("https://i.imgur.com/gDUGBdum.png")', 'background-size': 'cover', 'color': '#000', 'font-weight': '600', 'border': '1px solid #777' } },
  ml: { tag: 'Addiction Defense', category: 'Defense', short: 'ml', effect: '', desc: 'Known for having a material vice.', style: { 'background-image': 'url("https://i.imgur.com/BR5FZgEm.png")', 'background-size': 'cover', 'color': '#fff', 'font-weight': '600', 'border': '1px solid #777' } },
  ps: { tag: 'Mind Defense', category: 'Defense', short: 'ps', effect: '', desc: 'Known as a psychic or mind-manipulator.', style: { 'background-image': 'url("/img/defenseBack.png")', 'background-size': 'cover', 'color': '#fff', 'font-weight': '600', 'border': '1px solid #777' } },
  bj: { tag: 'Possession Defense', category: 'Defense', short: 'bj', effect: '', desc: 'Known for bodyjacking others.', style: { 'background-image': 'url("https://i.imgur.com/30QzIimm.png")', 'background-size': 'cover', 'color': '#fff', 'font-weight': '600', 'border': '1px solid #777' } },
  dr: { tag: 'Drain Defense', category: 'Defense', short: 'dr', effect: '', desc: 'Can drain or feed on life, mana, or souls.', style: { 'background-image': 'url("https://i.imgur.com/gjojdPam.png")', 'background-size': 'cover', 'color': '#fff', 'font-weight': '600', 'border': '1px solid #777' } },
  id: { tag: 'Fatality Defense', category: 'Defense', short: 'id', effect: '', desc: 'Known for inflicting instant death or not dying even when killed.', style: { 'background-image': 'url("https://i.imgur.com/zn4Ll9Sm.png")', 'background-size': 'cover', 'color': '#fff', 'font-weight': '600', 'border': '1px solid #777' } },
  pl: { tag: 'Polymorph Defense', category: 'Defense', short: 'pl', effect: '', desc: 'Known for polymorphing others.', style: { 'background-image': 'url("https://i.imgur.com/krRzC16m.png")', 'background-size': 'cover', 'color': '#fff', 'font-weight': '600', 'border': '1px solid #777' } },
  ur: { tag: 'Wyldscape Defense', category: 'Defense', short: 'ur', effect: '', desc: 'Hails from a region where the local reality is unstable.', style: { 'background-image': 'url("https://i.imgur.com/y2yXAcEm.png")', 'background-size': 'cover', 'color': '#fff', 'font-weight': '600', 'border': '1px solid #777' } },
  cr: { tag: 'Corruption Defense', category: 'Defense', short: 'cr', effect: '', desc: 'Known for forcibly bringing out others’ dark sides.', style: { 'background-image': 'url("https://i.imgur.com/V4NuMiHm.png")', 'background-size': 'cover', 'color': '#fff', 'font-weight': '600', 'border': '1px solid #777' } },
  sc: { tag: 'Information Defense', category: 'Defense', short: 'sc', effect: '', desc: 'Known for their ability to read or sense people.', style: { 'background-image': 'url("https://i.imgur.com/GXc7ovSm.png")', 'background-size': 'cover', 'color': '#000', 'font-weight': '600', 'border': '1px solid #777' } },
  di: { tag: 'Trace Defense', category: 'Defense', short: 'di', effect: '', desc: 'Known for using divination or other non-technological remote viewing.', style: { 'background-image': 'url("https://i.imgur.com/ImuTdsPm.png")', 'background-size': 'cover', 'color': '#000', 'font-weight': '600', 'border': '1px solid #777' } },
  fm: { tag: 'Destiny Defense', category: 'Defense', short: 'fm', effect: '', desc: 'Known as a fate- or luck-manipulator.', style: { 'background-image': 'url("https://i.imgur.com/6dTGTBQm.png")', 'background-size': 'cover', 'color': '#fff', 'font-weight': '600', 'border': '1px solid #777' } },
  tm: { tag: 'Paradox Defense', category: 'Defense', short: 'tm', effect: '', desc: 'Known as a time-manipulator.', style: { 'background-image': 'url("https://i.imgur.com/qDdxPu7m.png")', 'background-size': 'cover', 'color': '#fff', 'font-weight': '600', 'border': '1px solid #777' } },

  mo: { tag: 'Monster Tamer', category: 'Occupation', short: 'mo', effect: '', desc: 'Known as a monster-tamer or otherwise being good with animals.', color: 'bg-gradient-to-t to-red-600 from-gray-100 text-black' },
  py: { tag: 'Psychic', category: 'Powers', short: 'py', effect: '', desc: 'Is a known psychic and/or is able to telepathically read minds.', style: { background: 'linear-gradient(0deg, rgba(124,0,255,1) 0%, rgba(248,0,255,1) 70%)', color: '#fff' } },
  ip: { tag: 'Mind Manipulator', category: 'Powers', short: 'ip', effect: '', desc: 'Has a power that can manipulate minds.', color: 'bg-[#61457d] text-white' },
  bk: { tag: 'Bodyjack', category: 'Powers', short: 'bk', effect: '', desc: 'Has a power that can bodyjack others.', color: 'bg-[#631900]' },
  ih: { tag: 'Instant Death', category: 'Powers', short: 'ih', effect: '', desc: 'Known for inflicting instant (conceptual) death.', color: 'bg-gradient-to-r to-green-500 from-dark-500' },
  sl: { tag: 'Social', category: 'Other', short: 'sl', effect: '', desc: 'Known to be good with people or experienced in interacting/communicating with others.', color: 'bg-[#f9ca94] text-black' },
  dn: { tag: 'Divination', category: 'Powers', short: 'dn', effect: '', desc: 'Known for using divination or other non-technological remote viewing.', color: 'bg-gradient-to-r to-blue-200 via-white from-blue-200 text-black' },
  fn: { tag: 'Fate Manipulation', category: 'Powers', short: 'fn', effect: '', desc: 'Known as a fate-manipulator.', color: 'bg-gradient-to-t to-red-900 via-red-500 from-red-900' },
  lm: { tag: 'Luck Manipulation', category: 'Powers', short: 'lm', effect: '', desc: 'Known as a luck-manipulator.', color: 'bg-gradient-to-t to-yellow-900 via-yellow-400 from-yellow-900 text-black' },
  tn: { tag: 'Time Manipulation', category: 'Powers', short: 'tn', effect: '', desc: 'Known as a time-manipulator.', color: 'bg-gradient-to-t to-blue-900 via-blue-400 from-blue-900' },

  hp: { tag: 'Hopper', category: 'Other', short: 'hp', effect: '', desc: 'Possesses the ability to travel to other worlds/dimensions by any means, including enabling others to travel to other worlds/dimensions from the Hopper\'s current world/dimension.', color: 'bg-[#b600e9]' },
  dc: { tag: 'Doctor', category: 'Occupation', short: 'dc', effect: '', desc: 'Trained in medicine.', color: 'bg-[#dd1919]' },
  hl: { tag: 'Healer', category: 'Powers', short: 'hl', effect: '', desc: 'Has a supernatural healing ability that can be used on others.', color: 'bg-[#dd1919]' },
  lv: { tag: 'Leveling', category: 'Utility', short: 'lv', effect: '', desc: 'Can give others access to a leveling/class/job system.', style: { background: 'linear-gradient(0deg, rgba(182,159,2,1) 0%, rgba(255,222,0,1) 70%)', color: '#000' } },
  dm: { tag: 'Demon', category: 'Race', short: 'dm', effect: '', desc: 'Include devils as well.', style: { background: 'linear-gradient(90deg, rgba(148,1,1,1) 0%, rgba(255,0,0,1) 50%, rgba(148,1,1,1) 100%)', color: '#000' } },
  an: { tag: 'Angel', category: 'Race', short: 'an', effect: '', desc: 'A servant of a God, usually with wings though may be abstract figures of Lovecraftian form with countless eyes and on fire.', color: 'bg-[#ffffff] text-black' },
  mr: { tag: 'Monster', category: 'Race', short: 'mr', effect: '', desc: '', color: 'bg-[#754141]' },

  dg: { tag: 'Dragon', category: 'Race', short: 'dg', effect: '', desc: '', style: { background: 'linear-gradient(0deg, rgba(255,201,0,1) 0%, rgba(233,83,28,1) 70%)', color: '#fff' } },
  th: { tag: 'Transhuman', category: 'Personality', short: 'th', effect: '', desc: 'Strives to surpass their current limitations and achieve transcendence.', style: { background: 'linear-gradient(0deg, rgba(167,0,255,1) 0%, rgba(28,0,245,1) 100%)', color: '#fff' } },
  ot: { tag: 'Outsider', category: 'Other', short: 'ot', effect: '', desc: '', style: { background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(83,0,214,1) 100%)', color: '#fff' } },
  pp: { tag: 'Psychopomp', category: 'Other', short: 'pp', effect: '', desc: 'Any death-alligned entity that claims souls as a function of their role; Reapers, soul shepherds, judges of the dead.', color: 'bg-[#444] text-white' },

  gd: { tag: 'Deity', category: 'Race', short: 'gd', effect: '', desc: 'A God or Goddess.', color: 'bg-[#ffffff] text-black' },
  rs: { tag: 'Resurrection', category: 'Powers', short: 'rs', effect: '', desc: 'Capable of fully resurrecting others.', color: 'bg-[#ffffff] text-black' },
  mu: { tag: 'Mutant', category: 'Race', short: 'mu', effect: '', desc: 'Biologically different from the majority of their species in their world.', color: 'bg-[#315be5]' },
  dh: { tag: 'Demi-human', category: 'Race', short: 'dh', effect: '', desc: 'A human or human-like species with minor animal or beast-like traits.', color: 'bg-[#8d4127]' },
  md: { tag: 'Maid', category: 'Occupation', short: 'md', effect: '', desc: '', color: 'bg-gradient-to-t to-gray-400 from-black' },
  en: { tag: 'Engineer', category: 'Occupation', short: 'en', effect: '', desc: 'Specializes in practical applications of science, often also a Scientist.', color: 'bg-[#676767]' },
  sn: { tag: 'Scientist', category: 'Occupation', short: 'sn', effect: '', desc: 'Uses hypothesizing and testing to form conclusions and understand the world.', color: 'bg-[#2b548d]' },
  sd: { tag: 'Student', category: 'Occupation', short: 'sd', effect: '', desc: '', color: 'bg-[#e9d5ab] text-black' },
  wh: { tag: 'Witch', category: 'Occupation', short: 'wh', effect: '', desc: '', color: 'bg-[#0d7703]' },
  ai: { tag: 'AI', category: 'Race', short: 'ai', effect: '', desc: 'An artificial intelligence.', color: 'bg-gradient-to-t to-gray-400 from-gray-200 text-black' },
  me: { tag: 'Mage', category: 'Powers', short: 'me', effect: '', desc: 'Experienced in the magical arts.', style: { background: 'linear-gradient(0deg, rgba(60,75,189,1) 0%, rgba(1,18,183,1) 100%)', color: '#fff' } },
  cf: { tag: 'Chef', category: 'Occupation', short: 'cf', effect: '', desc: 'Skilled or specializes in culinary arts.', color: 'bg-[#dd8812]' },
  pi: { tag: 'Pirate', category: 'Occupation', short: 'pi', effect: '', desc: '', style: { background: 'linear-gradient(0deg, rgba(4,21,149,1) 0%, rgba(0,120,255,1) 100%)', color: '#fff' } },
  tc: { tag: 'Teacher', category: 'Occupation', short: 'tc', effect: '', desc: 'Known for teaching or mentoring others in a professional capacity.', style: { background: 'linear-gradient(90deg, rgba(154,134,102,1) 0%, rgba(250,214,156,1) 50%, rgba(154,134,102,1) 100%)', color: '#000' } },
  ad: { tag: 'Android', category: 'Race', short: 'ad', effect: '', desc: 'An artificially created sapient with a non-biological humanlike body.', color: 'bg-gradient-to-t to-gray-400 from-gray-200 text-black' },
  cb: { tag: 'Cyborg', category: 'Race', short: 'cb', effect: '', desc: 'Largely cybernetic in regards to their body, usually being visibly altered.', style: { background: 'linear-gradient(90deg, rgba(238,202,178,1) 0%, rgba(168,168,168,1) 100%)', color: '#000' } },
  un: { tag: 'Undead', category: 'Race', short: 'un', effect: '', desc: 'Technically dead but still animate.', color: 'bg-[#2c5332]' },
  sp: { tag: 'Superhero', category: 'Occupation', short: 'sp', effect: '', desc: '', style: { background: 'linear-gradient(90deg, rgba(52,141,255,1) 0%, rgba(255,58,58,1) 50%, rgba(244,255,71,1) 100%)', color: '#000' } },
  pc: { tag: 'Princess', category: 'Occupation', short: 'pc', effect: '', desc: 'A daughter of a Ruler. Is not mutually exclusive with Ruler, due to the existence of Queen Incumbents.', color: 'bg-[#dd12db]' },
  az: { tag: 'Warranty', category: 'Utility', short: 'az', effect: '', desc: 'See Warranty Plan for qualifiers.', color: 'bg-[#fdb978] text-black' },
  de: { tag: 'Demigod', category: 'Race', short: 'de', effect: '', desc: 'The child or champion of a Deity.', style: { background: 'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,192,0,1) 70%)', color: '#000' } },
  el: { tag: 'Elf', category: 'Race', short: 'el', effect: '', desc: '', style: { background: 'linear-gradient(0deg, rgba(4,202,31,1) 0%, rgba(0,123,17,1) 70%)', color: '#fff' } },
  ct: { tag: 'Catgirl', category: 'Race', short: 'ct', effect: '', desc: 'Human or of a similar humanoid race with catlike features.', style: { background: 'linear-gradient(0deg, rgba(215,138,12,1) 20%, rgba(240,240,240,1) 100%)', color: '#000' } },
  vp: { tag: 'Vampire', category: 'Race', short: 'vp', effect: '', desc: '', style: { background: 'linear-gradient(0deg, rgba(196,2,2,1) 0%, rgba(99,5,5,1) 70%)', color: '#fff' } },
  pt: { tag: 'Clergy', category: 'Occupation', short: 'pt', effect: '', desc: '', color: 'bg-[#ffffff] text-black' },
  nj: { tag: 'Ninja', category: 'Occupation', short: 'nj', effect: '', desc: '', style: { background: 'linear-gradient(0deg, rgba(70,77,81,1) 0%, rgba(154,177,190,1) 70%)', color: '#fff' } },
  sr: { tag: 'Shifter', category: 'Powers', short: 'sr', effect: '', desc: 'Able to take more than one form.', color: 'bg-[#8fbc8f] text-black' },
  ev: { tag: 'Evil', category: 'Personality', short: 'ev', effect: '', desc: '', style: { background: 'linear-gradient(0deg, rgba(255,0,0,1) 42%, rgba(134,60,60,1) 100%)', color: '#000' } },
  gn: { tag: 'Genius', category: 'Personality', short: 'gn', effect: '', desc: '', style: { background: 'linear-gradient(0deg, rgba(128,0,255,1) 0%, rgba(0,150,255,1) 100%)', color: '#fff' } },
  rl: { tag: 'Ruler', category: 'Occupation', short: 'rl', effect: '', desc: 'Rules over a country or region, need to have significant political power.', color: 'bg-[#FFD700] text-black' },
  tp: { tag: 'Trap', category: 'Personality', short: 'tp', effect: '', desc: 'Oh, she is cute, but its a boy!', style: { background: 'linear-gradient(0deg, rgba(227,125,255,1) 0%, rgba(132,194,255,1) 100%)', color: '#000' } },
  mf: { tag: 'MILF', category: 'Other', short: 'mf', effect: '', desc: 'Mother I\'d Like to Fuck.', style: { background: 'linear-gradient(90deg, rgba(248,148,6,1) 0%, rgba(255,191,100,1) 50%, rgba(248,148,6,1) 100%)', color: '#000' } },
  mi: { tag: 'Multiple', category: 'Utility', short: 'mi', effect: '', desc: 'Package deal.', color: 'bg-teal-[#0ac781] text-black' },
  tw: { tag: 'Twins', category: 'Other', short: 'tw', effect: '', desc: 'Twins / Triplets / Quadruplets / etc.', color: 'bg-[#48d1cc] text-black' },
  cc: { tag: 'Crafter', category: 'Occupation', short: 'cc', effect: '', desc: 'Any producing profession - blacksmith/alchemist/artificer/tailor/etc.', style: { background: 'linear-gradient(0deg, rgb(160 97 33) 0%, rgba(225,141,55,1) 70%)', color: '#000' } },
  mm: { tag: 'Magical Girl', category: 'Occupation', short: 'mm', effect: '', desc: '', style: { background: 'linear-gradient(0deg, rgba(244,84,84,1) 0%, rgba(255,89,229,1) 70%)', color: '#fff' } },
  al: { tag: 'Alien', category: 'Race', short: 'al', effect: '', desc: 'From a planet or dimension other than the setting\'s primary planet or dimension.', style: { background: 'linear-gradient(90deg, rgba(12,94,243,1) 0%, rgba(5,227,31,1) 100%)', color: '#fff' } },
  mg: { tag: 'Monster-girl', category: 'Race', short: 'mg', effect: '', desc: 'A Female who is partially a humanoid Monster, often portrayed as having perverse intentions rather than lethal with their prey.', style: { background: 'linear-gradient(0deg, rgba(255,62,169,1) 0%, rgba(74,129,255,1) 100%)', color: '#fff' } },
  nd: { tag: 'Nerd', category: 'Personality', short: 'nd', effect: '', desc: 'Extremely enthusiastic and knowledgeable about a particular subject, especially one of specialist or niche interest.', style: { background: 'linear-gradient(0deg, rgba(129,125,255,1) 0%, rgba(132,194,255,1) 100%)', color: '#fff' } },
  ar: { tag: 'Artist', category: 'Occupation', short: 'ar', effect: '', desc: 'Has artistic talent(s).', style: { 'background-image': 'url("https://i.imgur.com/bpLmuYhm.jpg")', 'background-size': 'cover', 'color': '#000' } },
  sa: { tag: 'Strategist', category: 'Occupation', short: 'sa', effect: '', desc: 'A focused, analytical mind, devising well-planned tactics, optimizing resources, and leading teams to achieve success in various domains with a competitive edge.', style: { background: 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(0,163,255,1) 80%)', color: '#fff' } },
  sm: { tag: 'Schemer', category: 'Occupation', short: 'sm', effect: '', desc: 'A crafty and cunning individual adept at devising manipulative and secretive plans to advance personal interests, often at the expense of others.', style: { background: 'linear-gradient(0deg, rgba(180,120,255,1) 22%, rgba(140,45,253,1) 100%)', color: '#fff' } },
  fw: { tag: 'Fanwork', category: 'Utility', short: 'fw', effect: '', desc: 'An established fan creation.', style: { background: 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(219,255,0,1) 80%)', color: '#000' } },
  vn: { tag: 'Villain', category: 'Occupation', short: 'vn', effect: '', desc: '', style: { background: 'linear-gradient(0deg, rgba(202,4,51,1) 0%, rgba(109,3,85,1) 100%)', color: '#fff' } },
  // sy: { tag: 'Symbiote Theme', category: 'Utility', short: 'sy', effect: '', desc: 'Associated with metaphysical corruption or purification, or are canonically known for polymorphing others or spawning or controlling large numbers of mooks.', style: { background: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(129,129,129,1) 50%, rgba(0,0,0,1) 100%)', color: '#fff' } },
  rg: { tag: 'Regenerator', category: 'Powers', short: 'rg', effect: '', desc: 'Able to subconsciously heal themselves from wounds and injuries.', style: { background: 'linear-gradient(0deg, rgba(149,4,48,1) 0%, rgba(255,0,77,1) 100%)', color: '#000' } },
  pr: { tag: 'Protagonist', category: 'Other', short: 'pr', effect: '', desc: 'The leading character(s) in a world.', style: { background: 'linear-gradient(0deg, rgba(245,70,0,1) 0%, rgba(243,233,0,1) 70%)', color: '#000' } },
  su: { tag: 'Succubus', category: 'Race', short: 'su', effect: '', desc: 'Include Incubus as well.', style: { background: 'linear-gradient(0deg, rgba(51,0,95,1) 0%, rgba(214,0,137,1) 70%)', color: '#fff' } },
  cm: { tag: 'Combatant', category: 'Other', short: 'cm', effect: '', desc: 'Has a lot of first-hand combat experience or a combat oriented powerset.', style: { background: 'linear-gradient(0deg, rgba(255,90,0,1) 0%, rgba(255,0,26,1) 70%)', color: '#fff' } },
  is: { tag: 'Insane', category: 'Personality', short: 'is', effect: '', desc: '', style: { background: 'linear-gradient(90deg, rgba(165,5,199,1) 0%, rgba(243,104,245,1) 50%, rgba(165,5,199,1) 100%)', color: '#fff' } },
  rw: { tag: 'Reality Warper', category: 'Powers', short: 'rw', effect: '', desc: 'Able to manipulate, change or alter reality in any way, shape, or form.', style: { background: 'linear-gradient(90deg, rgba(132,4,185,1) 0%, rgba(255,15,153,1) 50%, rgba(132,4,185,1) 100%)', color: '#fff' } },
  ha: { tag: 'Hacker', category: 'Occupation', short: 'ha', effect: '', desc: 'Specializes in reverse engineering, finding loopholes, and exploiting programs and digital systems in general.', style: { background: 'linear-gradient(0deg, rgba(71,107,77,1) 0%, rgba(0,255,29,1) 70%)', color: '#000' } },
  im: { tag: 'Immortality', category: 'Powers', short: 'im', effect: '', desc: 'Has some kind of immortality.', color: 'bg-gradient-to-r to-red-300 from-yellow-300 text-black' },
  ir: { tag: 'Spirit', category: 'Race', short: 'ir', effect: '', desc: 'Includes Ghosts, Shades, Wraiths, and Yokai as well.', style: { background: 'linear-gradient(0deg, rgba(233,220,255,1) 0%, rgba(125,50,245,1) 100%)', color: '#000' } },
  cu: { tag: 'Cultivator', category: 'Occupation', short: 'cu', effect: '', desc: 'Seeks to achieve power and often immortality through focused efforts in martial or mystic arts. Usually aligned with Taoism or Buddhism. Almost always qualifies for transhuman.', style: { background: 'radial-gradient(circle, rgba(251,148,63,1) 0%, rgba(255,248,0,1) 100%)', color: '#000' } },
  sh: { tag: 'Stealth', category: 'Powers', short: 'sh', effect: '', desc: 'Experienced in sneaking around or committing hidden actions.', style: { background: 'linear-gradient(90deg, rgba(26,24,59,1) 0%, rgba(108,98,139,1) 50%, rgba(26,24,59,1) 100%)', color: '#fff' } },
  pm: { tag: 'Power Manipulation', category: 'Powers', short: 'pm', effect: '', desc: 'Known to control, alter, or manipulate powers and abilities in any way or form.', style: { background: 'linear-gradient(0deg, rgba(74,0,143,1) 0%, rgba(157,86,222,1) 52%, rgba(74,0,143,1) 100%)', color: '#fff' } },

  te: { tag: 'Tsundere', category: 'Personality', short: 'te', effect: '', desc: 'A cute, friendly fluffball underneath all those cold glares and angry shouting.', style: { background: 'linear-gradient(90deg, rgba(255,84,85,1) 0%, rgba(255,71,140,1) 50%, rgba(255,84,85,1) 100%)', color: '#fff' } },
  ke: { tag: 'Kuudere', category: 'Personality', short: 'ke', effect: '', desc: 'Presents a cold appearance and personality to all but those they love most.', style: { background: 'linear-gradient(90deg, rgba(134,235,255,1) 0%, rgba(191,244,255,1) 50%, rgba(134,235,255,1) 100%)', color: '#000' } },
  ye: { tag: 'Yandere', category: 'Personality', short: 'ye', effect: '', desc: 'Obsessive and possessive when it comes to crushes. Careful or they might get violent.', style: { background: 'linear-gradient(0deg, rgba(191,113,255,1) 0%, rgba(255,45,45,1) 100%)', color: '#000' } },
  os: { tag: 'Onee-san', category: 'Personality', short: 'os', effect: '', desc: 'Personality type that always takes care of others.', style: { background: 'linear-gradient(90deg, rgba(255,170,202,1) 0%, rgba(254,190,214,1) 50%, rgba(255,170,202,1) 100%)', color: '#000' } },
  ci: { tag: 'Chuuni', category: 'Personality', short: 'ci', effect: '', desc: 'Early teens who have grandiose delusions and desperately want to stand out, convincing themselves they have hidden knowledge or secret powers.', color: 'bg-teal-500 text-black' },
  gi: { tag: 'Genki', category: 'Personality', short: 'gi', effect: '', desc: 'A lively, energetic and almost uncontrollable personality.', style: { background: 'linear-gradient(90deg, rgba(254,168,88,1) 0%, rgba(255,250,29,1) 50%, rgba(254,168,88,1) 100%)', color: '#000' } },
  ge: { tag: 'Generic', category: 'Utility', short: 'ge', effect: '', desc: 'For generic entries like pokemons, MGE monster girls, etc. Should have the same gender tag as on image.', color: 'bg-[#d3d3d3] text-black' },
  nc: { tag: 'Necromancer', category: 'Occupation', short: 'nc', effect: '', desc: 'Able to reanimate but not technically resurrect the dead.', style: { background: 'linear-gradient(90deg, rgba(10,23,13,1) 0%, rgba(48,109,63,1) 50%, rgba(10,23,13,1) 100%)', color: '#fff' } },
  cs: { tag: 'Custom', category: 'Utility', short: 'cs', effect: '', desc: 'Looks and gender can be customized at purchase. (Usually RPG protagonists)', color: 'bg-[#7656de] text-white' },
  sg: { tag: 'Ship-girl', category: 'Race', short: 'sg', effect: '', desc: 'Female Waifu featuring design elements of a ride/anthropomorphization of a ride.', style: { background: 'linear-gradient(0deg, rgba(125,103,233,1) 0%, rgba(41,248,236,1) 100%)', color: '#000' } },
  fa: { tag: 'Familiars', category: 'Utility', short: 'fa', effect: '', desc: 'Their familiar(s) are included with a purchase, and are factored into their tier.', color: 'bg-[#f0e68c] text-black' },
  ff: { tag: 'Fairy', category: 'Race', short: 'ff', effect: '', desc: '', style: { 'background-image': 'url("https://i.imgur.com/S8QdbONm.jpg")', 'background-size': 'cover', 'color': '#000' } },
  vt: { tag: 'VTuber', category: 'Occupation', short: 'vt', effect: '', desc: 'An avatar not related to the real-world actor in any way.', style: { background: 'linear-gradient(90deg, rgba(184,161,255,1) 0%, rgba(250,178,205,1) 50%, rgba(184,161,255,1) 100%)', color: '#000' } },
} as const

export const tagCategories = uniqWith(Object.values(waifuTags), (tagA, tagB) => tagA.category === tagB.category).map(tag => tag.category)
export const tagsRating = Object.values(waifuTags).reduce((a, x, i) => (a[x.short] = i + 1, a), {}) as Record<keyof typeof waifuTags, number>

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
  const all = [DLCperks, DLChomes, DLCgenericPerks, DLCheritages, DLCtalents, DLClureExpansions, DLCbindings, DLClures, DLCotherControls, DLCridePerks, DLCintensity, DLCRides, fullHeritagesDLC]
  all.forEach(p => addTitles<typeof p[0]>(result, p))
  return result
})

export const ALL_PERK_TITLES = computed(() => {
  const result = {} as Record<string, PerkFull>
  const all = [origin, intensity, bindings, lures, lureExpansions, otherControls, heritages, homes, demiplane, dungeon, defenses, talents, perks, genericPerks, waifu_perks, DLCperks, DLChomes, DLCgenericPerks, DLCheritages, DLCtalents, DLClureExpansions, DLCbindings, DLClures, DLCotherControls, DLCridePerks, fullHeritagesDLC, invasionPvP]
  all.forEach(p => addTitles<typeof p[0]>(result, p))
  return result
})

const { binding, luresBought, heritage, ridePerks, homePerks, talentPerks, defensePerks, otherPerks, miscPerks, waifuPerks, genericWaifuPerks, pvpPerks, intensities, difficulties } = useChargenStore()

export const ALL_PERK_STORES = computed(() => {
  return {
    'Intensity': intensities.value,
    'Difficulty': difficulties.value,
    'Binding': binding.value,
    'Lure': luresBought.value,
    'Heritage': heritage.value,
    'RidePerk': ridePerks.value,
    'Home': homePerks.value,
    'Talent': talentPerks.value,
    'Defense': defensePerks.value,
    'Other': otherPerks.value,
    'Misc': miscPerks.value,
    'Waifu': waifuPerks.value,
    'Generic': genericWaifuPerks.value,
    'Invasion': pvpPerks.value,
    'Other Control': otherPerks.value,
  }
})

export const LINKS = computed(() => {
  const links = {} as Record<string, string>
  const allCats = {
    'intensity/intensity': [...intensity, ...DLCintensity],
    'intensity/difficulty': difficultyOptions,
    'intensity/pvp': intensityPvP,
    'intensity/orbs': invasionPvP,
    'intensity/tournament': tournamentPerks,
    'origin/origin': origin,
    'origin/patron': patrons,
    'bindings/bindings': [...bindings, ...DLCbindings],
    'bindings/lures': [...lures, ...lureExpansions, ...DLClures, ...DLClureExpansions],
    'bindings/controls': [...otherControls.filter(perk => perk.type !== 'space'), ...DLCotherControls],
    'bindings/space': otherControls.filter(perk => perk.type === 'space'),
    'bindings/symbiote': [...symbioteBinding, ...symBuildings, ...synUnits, ...phases],
    'heritage': [...heritages, ...DLCheritages, ...fullHeritagesDLC],
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
  links['Drain Defense (2x)'] = 'talents/defense'
  links.familiar = ''
  // links.familiars = ''
  return links
})

const LINKSWITHOUTDLC = computed(() => {
  const links = {} as Record<string, string>
  const allCats = {
    'intensity/difficulty': difficultyOptions,
    'intensity/pvp': intensityPvP,
    'intensity/orbs': invasionPvP,
    'origin/origin': origin,
    'bindings/bindings': bindings,
    'bindings/lures': lures,
    'bindings/controls': otherControls.filter(perk => perk.type !== 'space'),
    'bindings/symbiote': symbioteBinding,
    'heritage': heritages,
    'talents/home': homes,
    'talents/defense': defenses,
    'talents/talent': talents,
    'talents/perks': perks,
    'talents/generic': genericPerks,
  }
  for (const category of Object.entries(allCats)) {
    for (const entry of category[1])
      links[entry.title] = category[0]
  }
  links['Directly in Companions'] = 'companions'
  links.Offspring = ''
  links.Missions = ''
  links['Loans and Credit Debt'] = ''
  links['Drain Defense (2x)'] = 'talents/defense'
  links.familiar = ''
  // links.familiars = ''
  return links
})

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

interface Changes {
  u: number
  nickname: string
  tags?: string[]
  tier?: number
  arg?: string
  source?: string
  nsfw?: string
  image?: string
  world?: string
  sub?: string
  name?: string
}
const changes = ref<Record<number | string, Changes>>({})

export async function getChars(): Promise<DBCharacter[]> {
  if (!chars)
    chars = (await import('~/data/json/characters.json')).default
  return chars
}

export async function getChanges() {
  if (isEmpty(changes.value))
    changes.value = (await import('~/data/whatChanged/newChanges.json')).default
}

getChanges()

export async function getUserChars(): Promise<DBCharacter[]> {
  if (!userChars)
    userChars = (await import('~/data/json/userCharacters.json')).default
  return userChars
}

const allChars = ref<DBCharacter[]>([])
let running = false
export const getAllChars = async() => {
  if (running) return allChars.value
  if (!allChars.value.length) {
    running = true
    const userChars = (await getUserChars()).reverse()
    const spreadheetChars = (await getChars())
    allChars.value.push(...userChars, ...spreadheetChars)
    allChars.value.map(char => char.c ? char : (char.c = 'none', char))
    running = false
  }

  return allChars.value
}

const allCharsComp = computed(() => {
  const { localUserCharacters } = useStore()
  return [].concat(localUserCharacters.value.map(x => ({ u: x.uid, n: x.name, w: x.world, t: x.tier, d: x.sub, b: x.tags, i: x.image, in: x.image_nsfw, type: 'local', c: 'none' })), allChars.value) as DBCharacter[]
})

// Search for UID duplicates
// export const dupsX = computed(() => {
//   const UIDs = allCharsComp.value.map(x => x.u)
//   const setU = {}
//   UIDs.forEach((x) => {
//     if (setU[x])
//       console.log(x)
//     setU[x] = 1
//   })
// })

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
  worlds.value = (await import('~/data/json/worlds.json')).default
  subWorlds.value = (await import('~/data/json/userWorlds.json')).default
}

const allWorldNames = computed(() => uniq(allChars.value.map(x => x.w)))
const allSubs = computed(() => uniq(allChars.value.filter(x => x.d).map(x => x.d)))
const allWorldTargets = computed(() => assign(countBy(allChars.value.map(x => x.d)), countBy(allChars.value.map(x => x.w))))

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

const missions = ref<Mission[]>([])
async function getMissions() {
  missions.value = (await import('~/data/json/missions.json')).default
}

getMissions()

export const allCompanionsWorlds = computed(() => Array.from(new Set(allChars.value.map(x => x.w))))

export const allWorlds = computed(() => {
  const { localUserWorlds } = useStore()
  return Array.prototype.concat(localUserWorlds.value, worlds.value, subWorlds.value)
})

// export async function getAllDiscord() {
//   function wait(ms: number) {
//     return new Promise(resolve => setTimeout(resolve, ms))
//   }

//   const token = 'L0GmBrnuM2pX5orFipKCv1I3Wfm2kVYpO5V8u6gCcd0ff81f'
//   // const suit = subWorlds.value.filter(x => x => /.*discordapp.*/.(x.image))

//   async function preloadImagesFromUrls(imageUrls: string[]): Promise<HTMLImageElement[]> {
//     const imagePromises: Promise<HTMLImageElement>[] = imageUrls.map((url) => {
//       return new Promise<HTMLImageElement>((resolve, reject) => {
//         const img = new Image()
//         img.src = url
//         img.onload = () => resolve(img)
//         img.onerror = () => reject(new Error(`Failed to load image from URL: ${url}`))
//       })
//     })

//     return Promise.all(imagePromises)
//   }

//   console.log('Starting')
//   for (const [i, world] of missions.value.entries()) {
//     if (!(/.*discordapp.*/.test(world.image || ''))) continue
//     const imagesToUpload = []
//     const preloadedImages = await preloadImagesFromUrls([world.image])

//     for (const preloadedImage of preloadedImages) {
//       // Convert preloaded images to File objects for upload
//       const blob = await fetch(preloadedImage.src).then(response => response.blob())
//       const file = new File([blob], 'preloaded-image.png', { type: 'image/png' })
//       imagesToUpload.push(file)
//     }

//     const formData = new FormData()
//     for (const image of imagesToUpload) {
//       formData.append('title', world.title)
//       formData.append('images[]', image) // Use 'images[]' to indicate an array of images
//     }

//     console.log('Wait')
//     await wait(1000)
//     const response = await fetch('https://api.imgchest.com/v1/post', {
//       method: 'POST',
//       body: formData,
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })

//     if (response.ok) {
//       const responseData = await response.json()
//       console.log(responseData.data)
//       missions.value[i].image = responseData.data.images[0].link
//     }
//   }

//   navigator.clipboard.writeText(JSON.stringify(missions.value, null, 2))
//   console.log('Finished')
//   // console.log(suit)
// }

// export function copyWorldsTo() {
//   navigator.clipboard.writeText(JSON.stringify(missions.value, null, 2))
//   console.log('Copied')
// }

export const allWorldsNoCondition = computed(() => {
  const worlds: DBWorld[] = []

  const addConditions = (x: DBWorld) => {
    if (x.condition)
      x.condition.forEach((c, i) => worlds.push({ uid: x.uid.slice(0, -1) + i, worldName: x.worldName, condition: c.name, rating: c.rating }))
  }

  allWorlds.value.forEach((x) => {
    if (isArray(x.condition))
      addConditions(x)

    worlds.push({ uid: x.uid, worldName: x.worldName, rating: x.rating })
  })
  return worlds
})

// const str = Object.keys(TOOLTIPS).map(x => `[^-]?(${x})`).sort((a, b) => b.length - a.length).join('|')
// export const TOOLTIPS_REG = new RegExp(str, 'g')

export const LINKS_REG = new RegExp([...Object.keys(LINKSWITHOUTDLC.value), ...Object.keys(TOOLTIPS)]
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
  'Drain Defense',
  'Fatality Defense',
  'Polymorph Defense',
  'Wyldscape Defense',
  'Corruption Defense',
  'Information Defense',
  'Trace Defense',
  'Destiny Defense',
  'Paradox Defense',
]
