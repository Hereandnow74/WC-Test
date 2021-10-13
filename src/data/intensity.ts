export const desc
= `The company is a multiversal organization. You are hardly their only contractor, though the multiverse is certainly
expansive enough that you can live many lifetimes and never once meet one of your peers. The perks in this section
will… adjust the odds of an encounter, so to speak. In this section and all others, “Chargen only” refers to the
starting build: your <b>char</b>acter <b>gen</b>eration, not your retinue members’ or anyone else’s.`

export interface Intensity {
  title: string
  intensity: number
  special?: string
  blacklist?: string[]
  whitelist?: string[]
  desc: string
  requires?: string
  needed?: number
}
export const intensity: Intensity[] = []

intensity.push({
  title: 'Me and My Girlfriend(s)(PvE)',
  intensity: 0,
  special: 'Chargen only',
  desc: 'Proceed directly to the Origins section. You may still encounter other contractors, but the multiverse is big, really big. You just won\'t believe how vastly, hugely, mind-bogglingly big it is. I mean, you may think it\'s a long way down the road to the chemist, but that\'s just peanuts to the multiverse. You can easily go entire lifetimes without meeting even one.',
})
intensity.push({
  title: 'With A Little Help From My Friends(Cooperative)',
  intensity: 0.2,
  special: 'Chargen only',
  desc: `You aren’t the only player in your game. Another contractor walks alongside you, visiting the same worlds in the same order. Your progress meters for Exit Stage Left and Rainbow Bridge are synchronized and charged by both of your activities.
The intensity bonus for this mode applies additively for each additional contractor on your team: +20 % each for a party of two, + 40 % each for a party of three, +60 % each for a party of four, etc. Your budgets are increased to offset the limited supply of targets in each world versus the additional demand.`,
})
intensity.push({
  title: 'Couple’s Account(Cooperative)',
  intensity: 0,
  special: 'Chargen only. May not be taken on DR11.',
  blacklist: ['DR11'],
  desc: `Your spouse or significant other is a contractor like you, but the two of you are tied much more closely than the friends option above. The two of you share full access to a joint account tied to both of your smart devices. A member of your retinue may be a waifu or husbando to one of you and merely a familiar to the other.
You will only pay for the more expensive of your two Origins. The chosen binding method treats you as equal masters, ensuring that your love never fades. (If you have the Symbiote, one of you will usually, but not necessarily, be the queen.) Heritages are purchased separately, but the other of you can buy any Heritage that one of you has at half - price, after all discounts and ignoring the usual discount cap. The control aspects of Bindings, Lures, and any Heritage hierarchy mechanics will only affect your relationship if the two of you are into that. OC Donut Steel, Template Stacking, and relevant waifu perks are purchased individually. All other items need only be purchased once to benefit the both of you equally. Your shared retinue will not enter R. I. P. mode unless you both perish.`,
})
intensity.push({
  title: 'Cash Still Rules',
  intensity: 0,
  blacklist: ['DR11'],
  special: 'Chargen only. May not be taken on DR11.',
  desc: 'Your signing bonus… isn’t. Whatever you spend from it will instead be a loan, subject to the rules in Loans and Credit Debt. Your starting world will not necessarily have enough available credits to pay back your loan or even the interest from unlocking the first new world, but Missions can help cover that. If this is taken, all Captures will be valued at 80 % of their list price, instead of the base 60 %.',
})
intensity.push({
  title: 'Calming Up',
  intensity: 0,
  special: 'Chargen only.',
  desc: 'Things will not calm down, contractor. The Danger Rating of every world you visit will always be equal to the highest Danger Rating of any world your retinue has visited(while they were in your retinue). This even applies to worlds you’ve already been to since your contract began, but not different eras of the same world, and may manifest as a new plot development, incursion from one of your other worlds, or reveal of a new element that was “always” there. People from each adjusted world will maintain their former roles in the new circumstances, with appropriate increases to their tier ratings and list prices - and, in turn, the corresponding effects on capture and other values - as necessary. Waifu perks may still be applied to captures or Yoinks from these worlds, with no change to their list prices. Tier changes from waifu perks may or may not apply in these cases.',
})
intensity.push({
  title: 'One In Ten',
  intensity: 50,
  special: 'Gauntlet only, mutually exclusive with Fight For Your Right',
  blacklist: ['Fight For Your Right'],
  desc: 'This is the most basic option. You are only locked into PvP for 10 rounds. Negotiable opponents will  appear from round 1 to round 9 and you will face a Rival in round 10. You will not face any Enemies. Members of your retinue rated T11 may not directly participate. Your prize for survival is 200 credits.',
})
intensity.push({
  title: 'Fight For Your Right',
  intensity: 0.2,
  special: 'Gauntlet only, mutually exclusive with One In Ten',
  blacklist: ['One In Ten'],
  desc: `This is the default option. You are locked into PVP for 20 rounds. Negotiable opponents may appear from round 1 to round 15, Rivals may appear from round 11 to round 19, and you will always face an Enemy on round 20. Members of your retinue rated T11 may not directly participate. Your prize for survival is one T11 ticket.
You may transition to this challenge after completing One In Ten. If you do so, you must choose between giving up the prize for the previous challenge and accepting 1800 credits instead of the normal prize for this one. The additional budget increase will be applied according to the highest - danger world you’ve visited.`,
})
intensity.push({
  title: 'Survivalism',
  intensity: 0.2,
  requires: 'Fight For Your Right',
  whitelist: ['Fight For Your Right'],
  desc: `You are locked into PVP for 50 rounds. Negotiable opponents may appear from round 1 to round 25, Rivals may appear from round 16 to round 40, and Enemies may appear starting on round 36. This scaling overrides the effect of the previous challenge. Members of your retinue rated T11 may not directly participate before round 46. Your prize for survival is three additional T11 tickets, on top of the reward for the previous challenge.
You may transition to this challenge after completing Fight For Your Right. The additional budget increase will be applied according to the highest - danger world you’ve visited.`,
})
intensity.push({
  title: 'Marathon',
  intensity: 0.4,
  requires: 'Survivalism',
  whitelist: ['Survivalism'],
  desc: `You are locked into PVP for 100 rounds. Negotiable opponents may appear from round 1 to round 40, Rivals may appear from round 31 to round 70, and Enemies may appear starting on round 61. This scaling overrides the effects of the previous two challenges. Members of your retinue rated T11 may not directly participate before round 91. Your prize for survival is six additional T11 tickets, on top of the rewards for the previous challenges, plus the dimensional coordinates to your original homeworld in a format compatible with Rainbow Bridge or your other travel methods.
You may transition to this challenge after completing Survivalism, or together with Survivalism after completing Fight For Your Right. If you choose the latter, the reward for completing Survivalism will be added to this challenge’s reward, so the total prize is still 10 T11 tickets. The additional budget increase will be applied according to the highest - danger world you’ve visited.`,
})
intensity.push({
  title: 'Come At Me Bro',
  intensity: 0.2,
  requires: 'Fight For Your Right',
  special: 'Mutually exclusive with Arena',
  whitelist: ['Fight For Your Right'],
  blacklist: ['Arena I'],
  desc: 'A new opponent will appear every time you enter a new world after your first, even if your current opponent is still active, allowing you to face multiple other opponents simultaneously. The other opponents will be as hostile(or not) to each other as they are to you. The additional opponents you trigger this way will continue to scale as if you had defeated your current opposition first. Rest periods will begin when you have no more active opponents remaining. Warranty Plan resurrections and the sale of stolen captures may also only occur when you have zero active opponents.',
})
intensity.push({
  title: 'Arena I',
  intensity: 0.2,
  requires: 'One In Ten or Fight For Your Right',
  special: 'Mutually exclusive with Come At Me Bro',
  whitelist: ['One In Ten', 'Fight For Your Right'],
  needed: 1,
  blacklist: ['Come At Me Bro'],
  desc: 'You will face three opponents at a time instead of just one. Their budgets are determined by the number of defeated opponents, regardless of who eliminated them. The rest period timer will trigger whenever the number of active contestants, including you, ever falls below four or the number of remaining rounds(whichever is lower). Dimensional travel for your retinue is disabled if you have at least one active opponent; any retinue members who are offworld when a rest period ends are stuck there until you are back down to zero active opponents. Warranty Plan resurrections and the sale of stolen captures may also only occur when you have zero active opponents. You may not leave for another world until the challenge ends.',
})
intensity.push({
  title: 'Arena II',
  intensity: 0.2,
  requires: 'Arena, Fight For Your Right',
  whitelist: ['Arena I', 'Fight For Your Right'],
  desc: 'You will face five opponents at a time instead of three. Their budgets are determined by the number of defeated opponents, regardless of who eliminated them. The rest period timer will trigger whenever the number of active contestants, including you, ever falls below six or the number of remaining rounds(whichever is lower).',
})
intensity.push({
  title: 'Arena III',
  intensity: 0.2,
  requires: 'Arena II, Survivalism',
  whitelist: ['Arena II', 'Survivalism'],
  desc: 'You will face seven opponents at a time instead of five. Their budgets are determined by the number of defeated opponents, regardless of who eliminated them. The rest period timer will trigger whenever the number of active contestants, including you, ever falls below eight or the number of remaining rounds(whichever is lower).',
})
intensity.push({
  title: 'Arena IV',
  intensity: 0.2,
  requires: 'Arena III',
  whitelist: ['Arena III'],
  desc: 'You will face nine opponents at a time instead of seven. Their budgets are determined by the number of defeated opponents, regardless of who eliminated them. The rest period timer will trigger whenever the number of active contestants, including you, ever falls below ten or the number of remaining rounds(whichever is lower).',
})
intensity.push({
  title: 'Arena V',
  intensity: 0.2,
  requires: 'Arena IV, Marathon',
  whitelist: ['Arena IV', 'Marathon'],
  desc: 'You will face eleven opponents at a time instead of nine. Their budgets are determined by the number of defeated opponents, regardless of who eliminated them. The rest period timer will trigger whenever the number of active contestants, including you, ever falls below twelve or the number of remaining rounds(whichever is lower).',
})
intensity.push({
  title: 'Deathmatch',
  intensity: 0.4,
  requires: 'Fight For Your Right',
  whitelist: ['Fight For Your Right'],
  desc: 'Negotiable opponents are disabled. Rivals will appear from round 1 to round 15(Fight For Your Right), 35(Survivalism), or 75(Marathon). Enemies will appear starting on round 11(Fight For Your Right), 26(Survivalism), or 51(Marathon). Retinue members rated T11 may not directly participate before round 16(Fight For Your Right), 36(Survivalism), or 76(Marathon). The cap on your opponents’ experience and skill is removed.',
})
intensity.push({
  title: 'No Future',
  intensity: 0.4,
  requires: 'Deathmatch',
  whitelist: ['Deathmatch'],
  desc: 'Rivals are disabled. Every opponent you encounter will be an enemy. Retinue members rated T11 may participate in any round. Your opponents’ experience and skill will increase more quickly, hitting the original cap at round 20, the equivalent of round 100 on Deathmatch at round 50, and beyond.',
})
intensity.push({
  title: 'Non - Stop Infinite Climax',
  intensity: 0.4,
  requires: 'Fight For Your Right',
  whitelist: ['Fight For Your Right'],
  desc: `You no longer benefit from rest periods. New opponents, including your first, will enter your present world immediately after the last is defeated, though not necessarily in a location near you.
If taken with Arena, this will completely disable d - travel for the duration of the PVP challenge. Warranty Plan resurrections will occur when you or your retinue defeat an opponent, even if others are still active; you do not need to defeat every active opponent simultaneously. Unwanted thefts may not be sold until the challenge is over.`,
})
