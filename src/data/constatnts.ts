import { intensity } from '~/data/intensity'
import { origin } from '~/data/origin'
import { bindings, lures, lureExpansions } from '~/data/binding'
import { heritages } from '~/data/heritage'
import { rides, homes, defenses, talents, perks, genericPerks } from '~/data/talents'
import { waifu_perks } from '~/data/waifu_perks'

export const WORLD_COLORS = ['bg-green-600', 'bg-teal-600', 'bg-cyan-600',
  'bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-amber-600',
  'bg-orange-500', 'bg-red-500', 'bg-true-gray-700']

export const WORLD_RATINGS = [
  { rating: 1, title: 'Sad But True', budget: 35 },
  { rating: 2, title: 'Turn the Page', budget: 55 },
  { rating: 3, title: 'No Remorse', budget: 85 },
  { rating: 4, title: 'Hit the Lights', budget: 140 },
  { rating: 5, title: 'Moth Into Flame', budget: 224 },
  { rating: 6, title: 'Trapped Under Ice', budget: 365 },
  { rating: 7, title: 'Disposable Heroes', budget: 590 },
  { rating: 8, title: 'All Nightmare Long', budget: 955 },
  { rating: 9, title: 'Frayed Ends of Sanity', budget: 1545 },
  { rating: 10, title: 'To Live is to Die', budget: 2500 },
  { rating: 11, title: 'One', budget: 11111 },
]

export const CHAR_COSTS = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 11111]

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
  { title: 'loans', title2: 'Loans and Credit Debt' },
  { title: 'missions', title2: 'Missions' },
  { title: 'refund', title2: 'Refund and Return Policy' },
  { title: 'arranged', title2: 'Come Out and Play (Arranged PvP)' },
  { title: 'arrangedConditions', title2: 'Arranged Match Wagers, Victory Conditions, and Risk' },
  { title: 'arrangedTeam', title2: 'Arranged Team Matches and Prizes' },
  { title: 'arrangedSpecial', title2: 'Special Arranged Match Rules' },
]

export const LINKS = computed(() => {
  const links = {} as Record<string, string>
  // const outside = {}
  const allCats = {
    intensity,
    origin,
    'binding': [...bindings, ...lures, ...lureExpansions],
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
      // if (outside[category[0]])
      //   outside[category[0]].push(...(entry?.whitelist || []))
      // else
      //   outside[category[0]] = [...(entry?.whitelist || [])]
  }
  // console.log(outside)
  // for (const key in outside) {
  //   if (Object.prototype.hasOwnProperty.call(outside, key))
  //     console.log(outside[key].filter(x => !links[x]))
  // }
  return links
})

let chars = null

export async function getChars() {
  if (!chars)
    chars = Object.values((await import('~/data/characters.json')).default)
  return chars
}

const str = Object.keys(TOOLTIPS).sort((a, b) => b.length - a.length).join('|')
export const TOOLTIPS_REG = new RegExp(str, 'g')
export const LINKS_REG = new RegExp(Object.keys(LINKS.value).sort((a, b) => b.length - a.length).join('|'), 'g')
