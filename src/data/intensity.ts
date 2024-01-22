export const desc
= `These options will alter your contract, drastically changing your employment experience with the company. In this section and all others, “Chargen only” refers to the
starting build: your <b>char</b>acter <b>gen</b>eration, not your retinue members’ or anyone else’s.`

export interface Intensity {
  uid: string
  title: string
  intensity: number
  image?: string
  special?: string
  blacklist?: string[]
  whitelist?: string[]
  desc: string
  needed?: number
  chargen?: boolean
}

export interface IntensityPvP extends Intensity{
  pvp?: boolean
}
export const intensity: Intensity[] = []

intensity.push({
  uid: 'k5YNK',
  title: 'Me and My Girlfriend(s)(PvE)',
  image: 'https://i.imgur.com/Hlj01dK.jpg',
  intensity: 0,
  special: 'Chargen only',
  chargen: true,
  desc: 'Proceed directly to the Origins section. You may still encounter other contractors, but the multiverse is big, really big. You just won\'t believe how vastly, hugely, mind-bogglingly big it is. I mean, you may think it\'s a long way down the road to the chemist, but that\'s just peanuts to the multiverse. You can easily go entire lifetimes without meeting even one.',
})
intensity.push({
  uid: '02cmy',
  title: 'With A Little Help From My Friends(Cooperative)',
  image: 'https://i.ibb.co/37md39J/With-ALittle-Help-From-My-Friends.jpg',
  intensity: -0.2,
  special: 'Chargen only',
  blacklist: ['DRX start'],
  chargen: true,
  desc: 'You aren’t the only player in your game. Another contractor walks alongside you, visiting the same worlds in the same order. Your progress meters for Exit Stage Left and Rainbow Bridge are synchronized and charged by both of your activities. No matter how many teammates you have, the budget adjustment remains the same. Note that “friendly” fire isn’t, so try not to antagonize your teammates too much.',
})
intensity.push({
  uid: 'IpXK4',
  title: 'Couple’s Account (Cooperative)',
  image: 'https://i.imgur.com/oSOVjZI.png',
  intensity: 0,
  special: 'Chargen only. May not be taken on DRX.',
  blacklist: ['DRX start'],
  chargen: true,
  desc: `Your spouse or significant other is a contractor like you, but the two of you are tied much more closely than the friends option below. Your partner must be someone from your homeworld that you know personally. The two of you share full access to a joint account tied to both of your smart devices. You and your partner cannot sell each other. A member of your retinue may be a companion to one of you and merely a familiar to the other.
<p>You will only pay for the more expensive of your two Origins. The chosen binding method treats you as equal masters, ensuring that your love never fades. (If you have the Symbiote, one of you will usually, but not necessarily, be the queen.) Heritages are purchased separately, but the other of you can buy any Heritage that one of you has at half-price, after all discounts and ignoring the usual discount cap. This does not apply to the IMG costs of Heritage capstones.
</p>
<p>The control aspects of Bindings, Lures, and any Heritage hierarchy mechanics will only affect your relationship if the two of you are into that. Template Stacking and relevant waifu perks are purchased individually. All other items need only be purchased once to benefit the both of you equally. Your shared retinue will not enter R.I.P. mode unless you both perish.
</p>
`,
})

intensity.push({
  uid: 'jUgfP',
  title: 'DRX start',
  image: 'https://i.ibb.co/XVm9GqG/DRX-Start2.jpg',
  intensity: 0,
  special: 'Chargen only',
  chargen: true,
  blacklist: ['Cash Still Rules', 'Wage Slave', 'Couple’s Account (Cooperative)'],
  desc: `Danger Rating 11 build's have special <a @click.stop href="/#danger11" class="text-cyan-500 hover:text-cyan-600 underline">rules</a>
  <p>This perk does not modify starting world in any way all the danger comes from mandatory TX or TY companion of your choice, while Company guarantee that they will not kill you outright, how obedient they are completely depends on chosen companion and your perks.</p>
  `,
})

intensity.push({
  uid: 'vDDFM',
  title: 'Cash Still Rules',
  image: 'https://i.ibb.co/3yVkg19/Cash-Still-Rules.jpg',
  intensity: 0,
  special: 'Chargen only. May not be taken on DRX.',
  blacklist: ['DRX start'],
  chargen: true,
  desc: `Your signing bonus… isn’t. Whatever you spend from it will instead be a loan, subject to the rules in Loans and Credit Debt. Your starting world will not necessarily have enough available credits to pay back your loan or even the interest, but Missions and Invasion PvP can help cover that. If this is taken, all Captures will be valued at 80% of their list price, instead of the base 60%.
  <p>Budgets below 500, from a Danger Rating of 6 or below, will experience an effective increase to 500 using the Loan rules, while budgets above 500 will be overcapped until you’ve paid enough of the principal and/or visited enough new worlds to fall beneath the cap.</p>
  <p>Note that the budget-based caps on Substitute, Yoink, and other options will follow the original budgets for each Danger Rating and intensity.</p>
  `,
})

intensity.push({
  uid: 'zKams',
  title: 'Calming Up',
  image: 'https://i.ibb.co/Tt1b55t/Calming-Up.jpg',
  intensity: 0,
  special: 'Chargen only.',
  chargen: true,
  desc: 'Things will not calm down, contractor. The Danger Rating of every world you visit will always be equal to the highest Danger Rating of any world your retinue has visited(while they were in your retinue). This even applies to worlds you’ve already been to since your contract began, but not different eras of the same world, and may manifest as a new plot development, incursion from one of your other worlds, or reveal of a new element that was “always” there. People from each adjusted world will maintain their former roles in the new circumstances, with appropriate increases to their tier ratings and list prices - and, in turn, the corresponding effects on capture and other values - as necessary. Waifu perks may still be applied to captures or Yoinks from these worlds, with no change to their list prices. Tier changes from waifu perks may or may not apply in these cases.',
})
intensity.push({
  uid: 'vnsnY',
  title: 'Wage Slave',
  image: 'https://i.ibb.co/By4QXkR/Wage-Slave.jpg',
  intensity: 0.6,
  special: 'Chargen only. May not be taken on DRX.',
  chargen: true,
  blacklist: ['Fight For Your Right', 'One In Ten', 'DRX start'],
  desc: 'We aren\'t a charity, Contractor. We\'ve decided you need to put in some more effort to earn your keep. While your starting budget is not negatively impacted, from here on out, you can only gain credits for completing missions, winning arranged PvP matches, or by completing other similar activities on behalf of the Company. Captures and sales will provide no inherent value beyond the targets themselves and any discounts they might provide retroactively. However, captures will still provide a bonus to Contractor salary. We do not advise taking Cash Still Rules with this, as that mode provides no benefits with this mode active. However, if you wish to start heavily indebted to us, without any easy ways of paying us back… we won’t stop you.',
})

export const contractors = `
<h3 >Gauntlet Conditions</h3>
<p>You may personalize the difficulty of your Gauntlet PvP experience with the following options. Budget increases are additive and are determined based on your starting budget, before any purchases, except where noted. If taken with a Danger 11 start, the extra funds are calculated relative to a starting budget of 4,045 and will become available immediately after character generation. All selections are made at chargen and cannot be changed, unless otherwise specified.</p>

`

export const intensityPvP: IntensityPvP[] = []

intensityPvP.push({
  uid: 'xkHxF',
  title: 'One In Ten',
  image: 'https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/q8COq.jpg',
  intensity: 50,
  pvp: true,
  special: 'Gauntlet only, mutually exclusive with Fight For Your Right',
  blacklist: ['Fight For Your Right', 'Wage Slave'],
  desc: 'This is the most basic option. You are only locked into PvP for 10 rounds. Negotiable opponents will  appear from round 1 to round 9 and you will face a Rival in round 10. You will not face any Enemies. Members of your retinue rated TX or above may not directly participate. Your prize for survival is 200 credits.',
})
intensityPvP.push({
  uid: 'axa7F',
  title: 'Fight For Your Right',
  image: 'https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/gcrkF.jpg',
  intensity: 0.2,
  pvp: true,
  special: 'Gauntlet only, mutually exclusive with One In Ten',
  blacklist: ['One In Ten', 'Wage Slave'],
  desc: `This is the default option. You are locked into PVP for 20 rounds. Negotiable opponents may appear from round 1 to round 15, Rivals may appear from round 11 to round 19, and you will always face an Enemy on round 20. Members of your retinue rated TX or above may not directly participate. Your prize for survival is one IMG
<p>You may transition to this challenge after completing One In Ten. If you do so, you must choose between giving up the prize for the previous challenge and accepting 1800 credits instead of the normal prize for this one. The additional budget increase will be applied according to the highest - danger world you’ve visited.</p>`,
})
intensityPvP.push({
  uid: 'yLrU0',
  title: 'Survivalism',
  image: 'https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/mptDc.jpeg',
  intensity: 0.2,
  pvp: true,
  whitelist: ['Fight For Your Right'],
  desc: `You are locked into PVP for 50 rounds. Negotiable opponents may appear from round 1 to round 25, Rivals may appear from round 16 to round 40, and Enemies may appear starting on round 36. This scaling overrides the effect of the previous challenge. Members of your retinue rated TX or above may not directly participate before round 46. Your prize for survival is three additional IMG, on top of the reward for the previous challenge.
<p>You may transition to this challenge after completing Fight For Your Right. The additional budget increase will be applied according to the highest - danger world you’ve visited.</p>`,
})
intensityPvP.push({
  uid: '0etBT',
  title: 'Marathon',
  image: 'https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/XFRm6.jpg',
  intensity: 0.4,
  pvp: true,
  whitelist: ['Survivalism'],
  desc: `You are locked into PVP for 100 rounds. Negotiable opponents may appear from round 1 to round 40, Rivals may appear from round 31 to round 70, and Enemies may appear starting on round 61. This scaling overrides the effects of the previous two challenges. Members of your retinue rated TX or above may not directly participate before round 91. Your prize for survival is six additional IMG, on top of the rewards for the previous challenges, plus the dimensional coordinates to your original homeworld in a format compatible with Rainbow Bridge or your other travel methods.
<p>You may transition to this challenge after completing Survivalism, or together with Survivalism after completing Fight For Your Right. If you choose the latter, the reward for completing Survivalism will be added to this challenge’s reward, so the total prize is still 10 IMG. The additional budget increase will be applied according to the highest-danger world you’ve visited.</p>`,
})
intensityPvP.push({
  uid: 'tPoBA',
  title: 'Come At Me Bro',
  image: 'https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/EpZ0x.jpg',
  intensity: 0.2,
  pvp: true,
  special: 'Mutually exclusive with Arena',
  whitelist: ['Fight For Your Right'],
  blacklist: ['Arena I'],
  desc: 'A new opponent will appear every time you enter a new world after your first, even if your current opponent is still active, allowing you to face multiple other opponents simultaneously. The other opponents will be as hostile(or not) to each other as they are to you. The additional opponents you trigger this way will continue to scale as if you had defeated your current opposition first. Rest periods will begin when you have no more active opponents remaining. Warranty Plan resurrections and the sale of stolen captures may also only occur when you have zero active opponents.',
})
intensityPvP.push({
  uid: 'B41Sr',
  title: 'Arena I',
  image: 'https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/kNzF7.jpg',
  intensity: 0.2,
  pvp: true,
  special: 'Mutually exclusive with Come At Me Bro',
  whitelist: ['One In Ten', 'Fight For Your Right'],
  needed: 1,
  blacklist: ['Come At Me Bro'],
  desc: 'You will face three opponents at a time instead of just one. Their budgets are determined by the number of defeated opponents, regardless of who eliminated them. The rest period timer will trigger whenever the number of active contestants, including you, ever falls below four or the number of remaining rounds(whichever is lower). Dimensional travel for your retinue is disabled if you have at least one active opponent; any retinue members who are offworld when a rest period ends are stuck there until you are back down to zero active opponents. Warranty Plan resurrections and the sale of stolen captures may also only occur when you have zero active opponents. You may not leave for another world until the challenge ends.',
})
intensityPvP.push({
  uid: '3oIyV',
  title: 'Arena II',
  image: 'https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/WAF1s.jpg',
  intensity: 0.2,
  pvp: true,
  whitelist: ['Arena I', 'Fight For Your Right'],
  desc: 'You will face five opponents at a time instead of three. Their budgets are determined by the number of defeated opponents, regardless of who eliminated them. The rest period timer will trigger whenever the number of active contestants, including you, ever falls below six or the number of remaining rounds(whichever is lower).',
})
intensityPvP.push({
  uid: 'hcJWu',
  title: 'Arena III',
  image: 'https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/b3L0v.jpg',
  intensity: 0.2,
  pvp: true,
  whitelist: ['Arena II', 'Survivalism'],
  desc: 'You will face seven opponents at a time instead of five. Their budgets are determined by the number of defeated opponents, regardless of who eliminated them. The rest period timer will trigger whenever the number of active contestants, including you, ever falls below eight or the number of remaining rounds(whichever is lower).',
})
intensityPvP.push({
  uid: 'Q4Ux8',
  title: 'Arena IV',
  image: 'https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/SV6JC.jpg',
  intensity: 0.2,
  pvp: true,
  whitelist: ['Arena III'],
  desc: 'You will face nine opponents at a time instead of seven. Their budgets are determined by the number of defeated opponents, regardless of who eliminated them. The rest period timer will trigger whenever the number of active contestants, including you, ever falls below ten or the number of remaining rounds(whichever is lower).',
})
intensityPvP.push({
  uid: 'xeVoO',
  title: 'Arena V',
  image: 'https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/GOL4j.jpg',
  intensity: 0.2,
  pvp: true,
  whitelist: ['Arena IV', 'Marathon'],
  desc: 'You will face eleven opponents at a time instead of nine. Their budgets are determined by the number of defeated opponents, regardless of who eliminated them. The rest period timer will trigger whenever the number of active contestants, including you, ever falls below twelve or the number of remaining rounds(whichever is lower).',
})
intensityPvP.push({
  uid: 'iY17R',
  title: 'Deathmatch',
  image: 'https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/RLEIb.jpg',
  intensity: 0.4,
  pvp: true,
  whitelist: ['Fight For Your Right'],
  desc: 'Negotiable opponents are disabled. Rivals will appear from round 1 to round 15 (Fight For Your Right), 35 (Survivalism), or 75 (Marathon). Enemies will appear starting on round 11 (Fight For Your Right), 26 (Survivalism), or 51 (Marathon). Retinue members rated TX or above may not directly participate before round 16 (Fight For Your Right), 36 (Survivalism), or 76 (Marathon). The cap on your opponents’ experience and skill is removed.',
})
intensityPvP.push({
  uid: 'JVOYA',
  title: 'No Future',
  image: 'https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/mOjkd.jpg',
  intensity: 0.4,
  pvp: true,
  whitelist: ['Deathmatch'],
  desc: 'Rivals are disabled. Every opponent you encounter will be an enemy. Retinue members rated TX or above may participate in any round. Your opponents’ experience and skill will increase more quickly, hitting the original cap at round 20, the equivalent of round 100 on Deathmatch at round 50, and beyond.',
})
intensityPvP.push({
  uid: 'ktxBZ',
  title: 'Non - Stop Infinite Climax',
  image: 'https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/0uF96.jpg',
  intensity: 0.4,
  pvp: true,
  whitelist: ['Fight For Your Right'],
  desc: `You no longer benefit from rest periods. New opponents, including your first, will enter your present world immediately after the last is defeated, though not necessarily in a location near you.
<p>If taken with Arena, this will completely disable d - travel for the duration of the PVP challenge. Warranty Plan resurrections will occur when you or your retinue defeat an opponent, even if others are still active; you do not need to defeat every active opponent simultaneously. Unwanted thefts may not be sold until the challenge is over.</p>`,
})

export const invasion = `<h3 class="text-lg font-semibold">Shores in Flames: Invasion PvP</h3>
<p>
Invasions are the only form of PvP that occur in the “wild,” outside of dedicated arena realms. Any contractor who owns a Red Eye Orb may participate, as either the invader or the defender, or a White Eye Orb, as an ally of the defender.</p>
  <p>In an invasion, any member of the invading force or non-local forces allied to the defender will appear as a translucent phantasm. Invaders have a dark red tint, while allies glow white or gold. Red Phantasms cannot harm any local forces that are not part of the defender’s retinue, even the defender’s local allies; White and Gold Phantasms can only harm Red Phantasms. All harm done to phantasms is temporary: a “slain” phantasm will dissolve into motes of the same color, be sent back to their contractor’s home world, and return to active duty after a solid week (168 hours) of recuperation. All Phantasms that remain in a battle zone at the end of an invasion, regardless of the outcome, will automatically return home.</p>

  <h3 class="text-lg mt-4 font-semibold">Invasion Victory Conditions and Prizes</h3>
  <p>As an invader: You win by regicide (killing the enemy contractor) even if the target doesn’t remain dead long enough for their retinue to dissolve. A self- resurrector’s temporary death still counts.
  As a defender or ally: You win if the invading force retreats or is annihilated. Mutual kills default to the defender.</p>
  <p>The winner of an invasion attempt will always earn 25% of the sum of all Phantasmal forces’ PvP asset value and the defender’s PvP credit value, rounded up to the nearest whole number. If the defending side wins, this will be split evenly between the defender and each ally - each additional ally called reduces every defender’s share of the pool.</p>
  <p>There are no financial penalties for losing an invasion. Phantasms are immune to capture, but may still be detained and their Defenses disabled. Captured members of the defender’s retinue will not become phantasms and may be recaptured by the defender’s forces, or on the defender’s behalf by their phantasm allies. However, if an invader captures any of the defender’s forces and goes on to win the overall battle, they may keep those captures permanently. Otherwise, the captures will be returned to their owner.</p>

  <h3 class="text-lg mt-4 font-semibold">Counter-Invasions</h3>
  <p>A successful defender has seven days (168 hours) to mount a counter-invasion, following much the same rules but with the roles reversed. Red Eye Orbs may not be refunded while any counter-invasion timer is still active. The target of a counter-invasion may not call for aid from White Eye Orb owners. Counter-invasions cannot themselves be retaliated against, unless the invader is lucky enough to get the same target twice in a row.</p>

`

export const invasionPvP: IntensityPvP[] = []

invasionPvP.push({
  uid: 'G8xXT',
  title: 'White Eye Orb',
  image: 'https://i.imgur.com/Z5VUmdFl.png',
  cost: 75,
  category: 'Invasion',
  pvp: true,
  /* html */
  desc: `When the defending side of an invasion calls for help, this orb allows you to answer, and demonstrate the value of Jolly Cooperation. The PvP asset value of the force you send must be within the same range as the defender and attacker: between 80% of the higher value and 125% of the lower value. Similarly to the invading force, your strike force will appear as shining White Phantasms in the invaded world.
  <p>The defender may call up to three allied forces if they want, though this will affect their prize payout if they win (see below). Answering calls to arms is optional; White Eye Orbs have a Do Not Disturb function that can make refusals automatic. You do not need to have visited your own parallel of a world to answer a call to arms there, but a call to arms will not count as visiting that world for We Will Meet Again, Rainbow Bridge, and other dimensional travel purposes.</p>
  <p>A contractor whose retinue maintains a win ratio of at least 90% after at least 20 calls-to-arms will instead have Gold Phantasms. This change has no in-battle effects, but the prestige of success comes with responsibilities: a gold-rated retinue cannot actively refuse a call to arms. This does not include auto-refusals from Do Not Disturb, but keeping that function on for more than two continuous weeks (336 hours) will forfeit your gold rating. You can re-qualify after at least 20 new calls-to-arms, provided your win ratio remains over 90%.</p>
`,
})

invasionPvP.push({
  uid: 'nLyWF',
  title: 'Red Eye Orb',
  image: 'https://i.imgur.com/mavIIuUl.jpg',
  cost: 100,
  category: 'Invasion',
  pvp: true,
  desc: `Hardly different at all from the original items, as they were used in the many parallels of an ashen world, ownership of one of these orbs lets you and a strike force invade another contractor’s world and ruin their hard work.
  <p>To qualify as an invasion target, the enemy contractor must first own a Red Eye Orb of their own. Yes, this means you may find yourself the defender in this scenario. This is your warning. Second, they have visited a parallel of at least one world that you’ve visited. The battle will take place in that parallel. Third, their PvP credit value must be in the same ballpark as your force’s PvP asset value, with the higher of the two no more than 25% more than the lower. Invasion targets are randomly selected by company systems; contractors have no influence on the process.</p>
  <p>An invader’s strike force will appear as Red Phantasms, as explained in the Glossary. All harm or other effects done to the defender’s retinue will be real, however, including PvP Captures; see that section for details. Invaders may retreat at any time, as individuals or a group, though any who do so will suffer the full recuperation period as if they were slain outright.</p>`,
})

invasionPvP.push({
  uid: 'pdsFe',
  title: 'Blue Eye Orb',
  image: 'https://i.imgur.com/PcVWGBPl.png',
  cost: 15,
  category: 'Invasion',
  pvp: true,
  desc: `More similar to the red soapstone or dragon eyes from the many parallels of an ashen world than the original blue eye orb, ownership of this item allows you to specifically invite another contractor to a duel between your two teams, skipping the normal matchmaking process. This otherwise follows the regular Arranged PvP procedures.
  <p>You can only challenge contractors that you’ve met in person. This may happen by any means, including Green Eye Orb use, regular Arranged PvP, or Invasions.
  </p>`,
})
