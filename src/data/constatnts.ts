import { intensity } from '~/data/intensity'
import { origin } from '~/data/origin'
import { bindings } from '~/data/binding'
import { heritages } from '~/data/heritage'
import { rides, homes, defenses, talents, perks } from '~/data/talents'

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
  // { rating: 11, title: 'One', budget: 'Tier 11 ticket' },
]

export const CHAR_COSTS = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000]

export const TOOLTIPS = {
  // 'Exit Stage Left': 'Travel Perk. Cost: 5',
  'Chargen': 'Only during character generation stage',
  // 'Rainbow Bridge': 'Home Perk. Cost: 30',
  // 'Donut Steel': 'Meta Talent. Cost 10 per use. Let you copy powers.',
  // 'Template Stacking': 'Meta Talent. Cost 10 per use. Let you copy generic powers.',
  // 'Warranty Plan': 'desc',
  // 'Conjunction': 'desc',
  // 'Apportation': 'desc',
  // 'Everlasting': 'Basic Talent. Cost: 10. Weak immortality',
  // 'Body': 'Basic Talent. Cost: 10. Fitness and health',
  // 'Martial': 'Basic Talent. Cost: 10. Fighting ability',
  // 'Wild': 'Basic Talent. Cost: 5. Living in wilderness',
  // 'Science': 'Basic Talent. Cost: 20. All sorts of Knowledge',
  // 'Engineering': 'Basic Talent. Cost: 30. Apply knowledge to practice',
  // 'Aesthetic': 'Basic Talent. Cost: 10. Design stuff',
  // 'Communication': 'Basic Talent. Cost: 10. Social mastery',
  // 'Performance': 'Basic Talent. Cost: 10. Acting, dancing, music',
  // 'Soul': 'Basic Talent. Cost: 10. Ki and other Mystic arts',
  // 'Blessed': 'Basic Talent. Cost: 30. Higher powers',
  // 'Psychic': 'Basic Talent. Cost: 20. Telepathy, telekinesis etc.',
  // 'Covert': 'Basic Talent. Cost: 10. Lie, cheat, steal mastery',
  // 'Inexhaustible': 'Basic Talent. Cost: 140. Infinite energy',
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

export const LINKS = computed(() => {
  const links = {} as Record<string, string>
  const allCats = {
    intensity,
    origin,
    'binding': bindings,
    'heritage': heritages,
    'talents/ride': rides,
    'talents/home': homes,
    'talents/defense': defenses,
    'talents/talent': talents,
    'talents/perks': perks,
  }
  for (const category of Object.entries(allCats)) {
    for (const entry of category[1])
      links[entry.title] = category[0]
  }
  return links
})

const str = Object.keys(TOOLTIPS).sort((a, b) => b.length - a.length).join('|')
export const TOOLTIPS_REG = new RegExp(str, 'g')
export const LINKS_REG = new RegExp(Object.keys(LINKS.value).join('|'), 'g')
