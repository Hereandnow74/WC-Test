import { PerkFull } from './talents'

interface DLCPerk extends PerkFull {
  dlc: string
  dlclink?: string
  increment?: boolean
  tree?: string
  type?: string
}

// DLC Generic Perks
export const DLCgenericPerks: DLCPerk[] = []

DLCgenericPerks.push({
  title: 'Tempering',
  requires: '(Any Monster Hunter monster)',
  dlc: 'DaemonOrk',
  complex: 'target',
  cost: 0,
  costVariants: [0, 10, 30, 50],
  desc: `Your Monster Girl is her Tempered version. It is free the first time for all Monster Girls over tier 7 as it does not increase their Tier.
  <ul class="list-inside list-disc">
  <li>T4 → T5: 10</li>
  <li>T5 → T6: 30</li>
  <li>T6 → T7: 50</li>
  </ul>`,
})

DLCgenericPerks.push({
  title: 'Arch-Tempering',
  requires: '(Any Monster Hunter monster)',
  dlc: 'DaemonOrk',
  complex: 'target',
  cost: 30,
  whitelist: ['Tempering'],
  costVariants: [30, 50, 100, 300],
  desc: `Your Monster Girl is her Arch-Tempered version.
  <ul class="list-inside list-disc">
  <li>T5 → T6: 30</li>
  <li>T6 → T7: 50</li>
  <li>T7 → T8: 100</li>
  <li>T8 → T9: 300</li>
  </ul>`,
})

DLCgenericPerks.push({
  title: 'Big Entrance',
  dlc: 'KatzSmile',
  special: 'Must be repurchased for each use.',
  complex: 'target',
  cost: 10,
  desc: `Perhaps the moment will come when you need to justify the event of their appearance in front of you for a new companion. Or maybe your appearance in the new world should be memorable, or maybe you want make an appearance like an epic hero in front of local residents or characters? But don't worry! For a very symbolic fee, our company undertakes to play a grandiose theatrical performance, which will surely convince your new companion or locals that you or them being here is an act of fate!
  <p>It could be anything. Cataclysm, random portal, magical summoning by an evil (or not) sorcerer and their "salvation by your intervention". Or maybe they "died" and appeared before their "god"? Anything! Let your imagination run wild and we'll be happy to make it happen!</p>
  <p>The company is not responsible for all possible consequences of these events. Our persuasion methods may not work for T8+ companions and characters. </p>
  `,

})
DLCgenericPerks.push({
  title: 'Grail Knowledge',
  dlc: 'KatzSmile',
  complex: 'target',
  cost: 1,
  desc: `Does your companion come from a less developed world than your own? Or perhaps their world is incredibly distant in a philosophical sense? Don't worry, we'll fix it!
  <p>Having acquired this perk, you can be sure that your companion will receive all the necessary common knowledge for your world. Including general schooling, hygiene and home appliance skills</p>
  <p>If bougth for 5 times, you will have the ability to give this perk to any member of your retinue at no cost.</p>
  `,
})
DLCgenericPerks.push({
  dlc: 'DLC by Despin',
  dlclink: 'https://docs.google.com/document/d/1-JLmjxufUDBH0uR4_DQOpyYEJ43pPWv37V9YD_wYoZ0/edit#',
  title: 'HUD',
  cost: 10,
  max: 10,
  complex: 'target',
  desc: `Your Smart Device is now part of you and accessible with a thought via a customizable HUD. You are still able to summon a device for waifus to interact with should you wish. You can customize the display at any time.
  <p>If you purchase this perk for any ten of your retinue members, including yourself, the rest of your retinue may gain this perk for free.</p>
    `,
})

DLCgenericPerks.push({
  dlc: 'DLC by Despin',
  dlclink: 'https://docs.google.com/document/d/1-JLmjxufUDBH0uR4_DQOpyYEJ43pPWv37V9YD_wYoZ0/edit#',
  title: 'Toggle',
  cost: 50,
  max: 10,
  complex: 'target',
  desc: `You can turn your abilities down or off, using your HUD. This can take the form of percentages or numerical sliders, but is not limited to such.
  <p>If you purchase this perk for any ten of your retinue members, including yourself, the rest of your retinue may gain this perk for free.</p>
  <p>Example: Kryptonian, but don't want to hear a world's suffering? Turn that Super Hearing down to 1/1000. Don't want your Shroud to shift or change due to unconscious desires? Off switch!</p>
    `,
  needed: 1,
  whitelist: ['HUD', 'First Augmentation'],
})

DLCgenericPerks.push({
  dlc: 'VermontCheese',
  title: 'Anthropize',
  cost: 10,
  max: 10,
  complex: 'target',
  desc: `Got a waifu that you just can’t touch, some sort of giant monster, or not quite flesh and blood? Well with this perk, let all your worries slip away. AI’s gain a physical body they can summon at will, giant monsters gain a human-ish. Think cat-girl level humanization. They don’t loose their powers, but they can now fit in your living room. Same thing with robots and the like. They’ll get a human-ish form with some robot bits somewhere, but now instead of only being able to cuddle cold hard metal at night, you get a nice warm human lookin kind of thing. All anthropized forms can be swapped out at will by the waifu this is applied to. 10 purchases for your retinue will let you apply this to any waifu you have in your retinue.
     `,
})

DLCgenericPerks.push({
  dlc: 'CelestialDragon DLC',
  dlclink: 'https://docs.google.com/spreadsheets/d/1FM6PNbDEyZV4T4rVLWjPYBc3O0jmmwd1obkFD7jLDt8/edit?usp=sharing',
  title: 'Does it come in Black',
  cost: 1,
  max: 10,
  complex: 'target',
  desc: `This is different from completely original. While the other perk changes appearance, this changes their personality. The only restriction is that they must be from something like a fan-fiction, abridged, future version, alternate timeline etc.
     `,
})

DLCgenericPerks.push({
  dlc: 'DLC by Despin',
  dlclink: 'https://docs.google.com/document/d/1-JLmjxufUDBH0uR4_DQOpyYEJ43pPWv37V9YD_wYoZ0/edit#',
  title: 'Native Merger',
  cost: 1,
  costVariants: [1, 2, 6, 12, 24, 60, 120, 240, 600, 1200],
  complex: 'target',
  desc: `It is possible to later visit a world containing a version of a waifu previously purchased. This perk merges your waifu with the local version, as if they had Substituted into them. If you have Adjustment Field or similar, both forms become available as preset options.
  <p>Cost is based on target tier:</p>
  <div class="flex flex-wrap gap-4">
    <div v-for="cost, i in [1, 2, 6, 12, 24, 60, 120, 240, 600, 1200]">
      T{{i + 1}}: {{cost}}
    </div>
  </div>
  `,
})

DLCgenericPerks.push({
  dlc: 'DLC by Despin',
  dlclink: 'https://docs.google.com/document/d/1-JLmjxufUDBH0uR4_DQOpyYEJ43pPWv37V9YD_wYoZ0/edit#',
  title: 'Open Rolls',
  cost: 5,
  desc: `When looking for a Slightly Used companion, the contractor can now see the Ability Rolls and Trauma Rolls for all candidates. However, candidates are now only a T10 on an Ability Roll of 36, not T11.
  `,
})

DLCgenericPerks.push({
  dlc: 'KatzSmile',
  title: 'Worlds Apart',
  requires: '(Any Yoinked companion)',
  complex: 'target',
  special: 'Chargen only. Not available in Gauntlet PvP.',
  cost: 20,
  desc: `Sometimes your potential companion is separated from you by an interdimensional veil. But the use of this perk will allow you to overcome all unthinkable boundaries and deliver them to you.
  `,
})

// Misc DLC Perks

export const DLCperks: DLCPerk[] = []
DLCperks.push({
  dlc: 'CelestialDragon DLC',
  dlclink: 'https://docs.google.com/spreadsheets/d/1FM6PNbDEyZV4T4rVLWjPYBc3O0jmmwd1obkFD7jLDt8/edit?usp=sharing',
  title: 'Returning Home',
  cost: 0,
  desc: 'At the end of your first world, or after you complete the mission or at your own discretion you can return home with all the powers, perks and waifus that you obtained. Able to go back and forth between worlds at any time. The time on Earth will not have moved since you left and you can change how fast or slow (or at all) Earths time and the other worlds time flow.',
  whitelist: ['Exit Stage Left'],
})

DLCperks.push({
  dlc: 'BenFang322',
  title: 'Appearance Change',
  cost: 1,
  desc: `
  Because sometimes you just don’t like the way you look, and would rather look different or like someone else instead. Can only be used to change cosmetic aspects of yourself only, and provide’s no practical benefits outside of a different appearance.
  <p>If purchased at Chargen alongside Extra, your new appearance will be how your Extra’d self always looked so as to avoid accidentally changing your new identity a second time.</p>
  `,
})

DLCperks.push({
  dlc: 'windshadow21',
  title: 'Normalcy',
  cost: 10,
  desc: `
  Generally people - much like in your old world - would be a bit confused by a single person, having a very 'consenting' group of Companions. With this, everyone will just assume that the things you and your Companions do are normal, if you don't stretch it too much.
  `,
  whitelist: ['Sexual Calibration'],
})

DLCperks.push({
  dlc: 'KatzSmile',
  title: 'Time-Savers',
  cost: 2,
  desc: `
  You humans have to do so much useless stuff that just wastes the day away in order to simply function. No more! Your body is now self cleaning, meaning you'll almost always stay sparkly, well groomed, and smelling great. All of your hair and nails will eternally be at your desired length. You'll be able to fall asleep within a few minutes of trying to, and you'll only need six hours to feel completely rested and rejuvenated. Finally you'll never have to excrete any sort of waste ever again. It says here that all of these can be turned down or off whenever you like, but come on? What possible reason would someone want to be able to, lets say, go to the bathroom if you never need to again? ...It's a fetish thing, isn't it?
  `,
})

DLCperks.push({
  dlc: 'DLC by Despin',
  dlclink: 'https://docs.google.com/document/d/1-JLmjxufUDBH0uR4_DQOpyYEJ43pPWv37V9YD_wYoZ0/edit#',
  title: 'I Want Out',
  cost: 20,
  desc: `
  A portal opens to a new world of your choice. The portal is one-way only, and will last no more than two minutes or until you and all of your retinue have passed through, whichever is shorter. If any of your retinue stay behind, this perk will not help you retrieve them. 
  <p>If you have a Loan, use of this perk triggers an interest payment.</p>
  `,
})

DLCperks.push({
  dlc: 'DLC by Despin',
  dlclink: 'https://docs.google.com/document/d/1-JLmjxufUDBH0uR4_DQOpyYEJ43pPWv37V9YD_wYoZ0/edit#',
  title: 'Trajectory. Agreement.',
  cost: 140,
  desc: `
  You become an unrestricted World Hopper.
  `,
  whitelist: ['The Bigger Fish'],
})

DLCperks.push({
  dlc: 'DLC by Despin',
  dlclink: 'https://docs.google.com/document/d/1-JLmjxufUDBH0uR4_DQOpyYEJ43pPWv37V9YD_wYoZ0/edit#',
  title: 'Express Warranty',
  cost: 1000,
  desc: `
  Any retinue member who dies on you will be re-delivered to you in 5 minutes. This perk will not help if you die, even if you took the Substitute or Possess origins.
  `,
  whitelist: ['Warranty Plan'],
})

DLCperks.push({
  dlc: 'DLC by Merior',
  dlclink: 'https://docs.google.com/document/d/1j9emHb4IWvOTnp13RASTAuINAFuKDMSSQyQ-7ta9sjA/edit#',
  title: 'Gone And Forgotten',
  cost: 10,
  desc: `When you sell a waifu to the Company all traces of them begin to vanish. Others will not notice the waifu's absence and, over the course of a year and a day, memories and physical evidence will change to match that the waifu had never existed at all.
  <p>At the moment of each sale may opt to have your memories, your other waifus memories, the sold waifu's name on the Company's list of purchasable waifus, and/or any evidence stored in your Sweet Home to be unaffected.</p>
  `,
})

DLCperks.push({
  dlc: 'DLC by Merior',
  dlclink: 'https://docs.google.com/document/d/1j9emHb4IWvOTnp13RASTAuINAFuKDMSSQyQ-7ta9sjA/edit#',
  title: 'Pavlov\'s Bell',
  cost: 10,
  desc: `A new app installed on your Company device can directly inflict sensation you wish on your waifu's at the touch of a button. The default settings are a sourceless pleasure or pain of any desired intensity but more complex sensations, lack of sensation, or sequences are possible.
  <p>As a safeguard against abuse, your waifu's cannot perceive any options which induce sensations on herself personally nor act to prevent you from using the app upon her or others. If combined with the Waifu Tracker perk, then a waifu's activities and condition can be programmed to trigger specific sensations.</p>
  `,
})

DLCperks.push({
  dlc: 'PixelGMS',
  title: 'Nice Guy',
  cost: 120,
  desc: 'Everyone will think that you\'re a nice guy. A friendly acquaintance. Even if you stab them in the guts, they wouldn\'t hold it against you. It doesn\'t matter what you do, as long as it\'s not outright murder or torture, people won\'t think badly about it, but some half-assed arguments might be needed to justify your actions. If you start killing or doing something worse to someone they care about more than themselves in front of them then the effect will quickly deteriorate.',
})

DLCperks.push({
  dlc: 'Mortaegus’s Mod',
  dlclink: 'https://forum.questionablequesting.com/threads/r34-economy-cyoa-thread.11289/page-568#post-3866836',
  title: 'Patron Income',
  cost: 1000,
  multiple: true,
  max: 99,
  increment: true,
  desc: 'You now receive an allotment of one point for every three days, which you may spend on anything that points can purchase from the waifu catalogue; this perk can be taken multiple times and its effects stack additively, but each additional purchase costs twice as much as the previous purchase, so while the first only costs one-thousand points, the second will cost two-thousand points, the third will cost three-thousand points, the fourth will cost four-thousand points, and so on and so on; three instances can be purchased in exchange for a tier eleven token',
})

DLCperks.push({
  dlc: 'Mortaegus’s Mod',
  dlclink: 'https://forum.questionablequesting.com/threads/r34-economy-cyoa-thread.11289/page-568#post-3866836',
  title: 'Abandoned Assets',
  cost: 10,
  costVariants: [10, 100, 1000],
  multiple: true,
  desc: `You will find that your new world has a number of previously bound waifus who for some reason or another have been left to their own devices; perhaps they were accidentally misplaced in transition, or maybe their contractor had a sudden case of extremely violent death, or maybe they were deliberately abandoned; either way, something somehow resulted in their arrival in your new world, and they are now your problem; they know that they were intended to be kept as slaves by a master, and will be especially distrustful of anyone who approaches them, so attempting to capture them will be difficult at best and dangerous at worst; while they will have arrived together, they may or may not stay together, and they also may seek out local assistance or proactively take measures to evade being captured.
  <p>Cost depends on number and tier of potential companions: T1-T4 [10]; T1-T7[100]; T1-T10[1000]</p>
  <p>Total sum of the waifus cost's can't be less that a double of the amount payed.</p>
  `,
})

// DLC home perks

export const DLChomes: DLCPerk[] = []

DLChomes.push({
  dlc: 'DLC by Despin',
  dlclink: 'https://docs.google.com/document/d/1-JLmjxufUDBH0uR4_DQOpyYEJ43pPWv37V9YD_wYoZ0/edit#',
  title: 'Creature Feature I',
  cost: 500,
  desc: `From your control center, you can select any non-sapient wildlife you have encountered of T6 or less to populate your Demiplane. Binding wildlife from your Demiplane as a Familiar may be possible, but does not provide credits.
  <p>Examples: Jurassic Park, Star Wars’ Rancor and Krayt Dragon</p>
    `,
  whitelist: ['Life’s A Beach'],
})

DLChomes.push({
  dlc: 'DLC by Despin',
  dlclink: 'https://docs.google.com/document/d/1-JLmjxufUDBH0uR4_DQOpyYEJ43pPWv37V9YD_wYoZ0/edit#',
  title: 'Creature Feature II',
  cost: 11111,
  desc: `From your control center, you can select any wildlife you have encountered to populate your Demiplane. Binding wildlife from your Demiplane as a Familiar may be possible, but does not provide credits.
  <p>Examples: nearly anything from Dungeons & Dragons, Go Go Godzilla!</p>
    `,
  whitelist: ['Creature Feature I'],
})

DLChomes.push({
  dlc: 'DLC by Despin',
  dlclink: 'https://docs.google.com/document/d/1-JLmjxufUDBH0uR4_DQOpyYEJ43pPWv37V9YD_wYoZ0/edit#',
  title: 'A God Am I',
  cost: 11111,
  desc: `From your control center, you can create life to populate your Demiplane. Binding creatures from your Demiplane may be possible, but does not provide credits.
  <p>If you aren’t already, you become a T11 yourself.</p>
    `,
  whitelist: ['Creature Feature II'],
})

DLChomes.push({
  dlc: 'DaemonOrk',
  title: 'God of Time',
  cost: 11111,
  desc: `You can already create life, but now you want to add some randomness to it. So long as neither you or your retinue members are inside, time can now be sped up within your demiplane up to 1 million times. Allowing things to evolve naturally.
    `,
  whitelist: ['A God Am I'],
})

DLChomes.push({
  dlc: 'DLC by Despin',
  dlclink: 'https://docs.google.com/document/d/1-JLmjxufUDBH0uR4_DQOpyYEJ43pPWv37V9YD_wYoZ0/edit#',
  title: 'Control Center App',
  cost: 10,
  needed: 1,
  desc: 'The control center provided by Grand Manor/Life’s A Beach is now an app on your smart device.',
  whitelist: ['Grand Manor', 'Life’s A Beach'],
})

DLChomes.push({
  dlc: 'KatzSmile',
  title: 'Stay in touch',
  cost: 5,
  desc: 'High speed internet service covering any and all dimensions no matter the location, magic ward, or jamming technology. A modem-router and replacements are provided for free.',
  whitelist: ['Pocket Apartment'],
})

DLChomes.push({
  dlc: 'KatzSmile',
  title: 'My House, My Rules!',
  special: 'Will not work on anyone with mental defences and T8+ characters.',
  cost: 10,
  desc: 'Do you have your own home or maybe the island you own legally? Do you want to have a little more control over everything that happens inside? Want to ban Hawaiian shirts? Make pineapple pizza illegal? Or maybe obscene curses harm your mental well-being? Or maybe everyone should wear crocs with white socks? Now it is possible! You can now set your own rules of conduct here. Just read them out loud and any of your companions, guests or visitors will be compelled to follow them and find them reasonable. It effect does not count as mind control and all possible side-effects from it will be rationalized as unimportant when they leave area of effect.',
  whitelist: ['Pocket Apartment'],
})

DLChomes.push({
  dlc: 'GForce1000',
  title: 'Armory',
  cost: 10,
  desc: 'A room-or pocket-dimensional space similar to the Pocket Space perk full of weapons, armor, and ammunition becomes available to you with this upgrade. It holds a wide variety of standard and specialized equipment from both your new world and your old one. This does include equipment that would normally only be available to special forces, but does not include custom-made or heavily customized variants on weapons. Weapons you or your companions acquire in the field can be sent to this armory with a few seconds of concentration, and each of you can choose up to ten pieces of equipment - such as a gun, a shield, or a full set of armor - to be able to equip or return at will. The armory will automatically repair and maintain weapons stored within it. This doesn\'t work for fully destroyed artifact items unless you help supply the magical oomph.',
  whitelist: ['Sweet Home'],
})

// DLC talents
export const DLCtalents: DLCPerk[] = []

DLCtalents.push({
  dlc: 'DLC by Despin',
  dlclink: 'https://docs.google.com/document/d/1-JLmjxufUDBH0uR4_DQOpyYEJ43pPWv37V9YD_wYoZ0/edit#',
  title: 'Presence',
  cost: 30,
  desc: `
  Through a mix of perception alteration and minor reality alteration, the world itself seems to aid you in presenting the bearing you intend. From making you seem supernaturally beautiful, always being seen or recorded from a flattering angle and lighting, your dramatic declarations echoing even on an open field, etc. At your discretion, this perk can also allow situational coincidences such as relevant music to start playing or lightning to strike dramatically behind you as you cackle.
  `,
  whitelist: ['Communication Talent'],
})

DLCtalents.push({
  dlc: 'Doomsought',
  title: 'Money Talent',
  cost: 10,
  desc: `
  You are extremely talented at making money. You can smell opportunity and feel the flow of the market in your bones. As long as you actually put effort into it you can go from being broke to being a millionaire in a few months.
  <p>Can be shared</p>
  `,
})

DLCtalents.push({
  dlc: 'DLC by Merior',
  dlclink: 'https://docs.google.com/document/d/1j9emHb4IWvOTnp13RASTAuINAFuKDMSSQyQ-7ta9sjA/edit#',
  title: 'Educational Talent',
  cost: 5,
  desc: `You teach. You pass on information, you instruct, and you guide the learning process even with skills that you do not directly possess. Your descriptions and directions are never less clear than you desire and those you give them to will retain the information easily. You can even act as the best possible practice partner so long as you have a vague idea of the role and are physically capable of what is required.
  <p>Your students cannot learn anything from you that they would be otherwise incapable of picking up given sufficient time and effort. You simply reduce the requirements for both to a tiny fraction of what would otherwise be needed.</p>
  `,
})

DLCtalents.push({
  dlc: 'DLC by Merior',
  dlclink: 'https://docs.google.com/document/d/1j9emHb4IWvOTnp13RASTAuINAFuKDMSSQyQ-7ta9sjA/edit#',
  title: 'Inculcation Talent',
  cost: 10,
  desc: `You remold. You can progressively change other people's habits, preferences, reflexes, and even more fundamental parts of who they are given time. You do so through social pressure and psychological tricks, even against their will or without their awareness, but supernatural power and the ability to blatantly reward or punish speeds your efforts tremendously. You could use this to help overcome addictions, remove bad habits, become a life coach, or simply be a world-class slave trainer..
  `,
  whitelist: ['Communication Talent'],
})

// DLC Lures
export const DLClures: DLCPerk[] = []

DLClures.push({
  dlc: 'DLC by Merior',
  dlclink: 'https://docs.google.com/document/d/1j9emHb4IWvOTnp13RASTAuINAFuKDMSSQyQ-7ta9sjA/edit#',
  title: 'Fools Gold',
  cost: 10,
  desc: 'Waifus who are motivated by gaining money, for whatever reason, and who have unwillingly been rendered poor are more attracted to you. This attraction is based upon the signs of wealth, conspicuous consumption, and casual spending that they become aware of as shown by you and your waifus.',
})

DLClures.push({
  dlc: 'DLC by Merior',
  dlclink: 'https://docs.google.com/document/d/1j9emHb4IWvOTnp13RASTAuINAFuKDMSSQyQ-7ta9sjA/edit#',
  title: 'Nine Tenths Law',
  cost: 5,
  desc: 'Any individual who you manage to keep imprisoned for three days straight becomes yours. Any means of imprisonment, from holding them trapped in a magic circle to keeping them handcuffed next to you, is valid and you may use multiple means or shift between them as needed. However the victim must be aware of their confinement and any time spent unnaturally insensate (unconscious, drugged asleep, frozen in time, etc) does not count towards the total period of confinement.',
})

DLClures.push({
  dlc: 'DLC by Merior',
  dlclink: 'https://docs.google.com/document/d/1j9emHb4IWvOTnp13RASTAuINAFuKDMSSQyQ-7ta9sjA/edit#',
  title: 'Stud Service',
  cost: 10,
  desc: `You are prime breeding stock, able to sire the best children feasible given a compatible partner, which is something that potential partners sense... and like. The more proof of your fertility, virility, or the quality of your offspring that a potential waifu witnesses the more the image of submissively being bred by you infects and inflames their fantasies. Those who have had offspring, or who are \'hearing their biological clock ticking\', are particularly susceptible.
  <p>With practice, you can influence your offspring at conception to possess or lack traits which it would be possible for them to inherit.</p>
  `,
})

// Other Controls
export const DLCotherControls: DLCPerk[] = []

DLCotherControls.push({
  dlc: 'DLC by Merior',
  dlclink: 'https://docs.google.com/document/d/1j9emHb4IWvOTnp13RASTAuINAFuKDMSSQyQ-7ta9sjA/edit#',
  title: 'Signed and Sealed',
  cost: 10,
  desc: `There are more formal approaches to gaining a waifu than a love confession. Taking this perk grants you skill in writing contracts and allows you to include binding terms about her behavior and actions. Once the other party signs the contract freely and the relevant conditions have been met they will be forced to comply with the terms: be that anything from telling you a secret to becoming your slave. Company lawyers will assess the strictness and duration of contracts to determine if this will be considered a 'capture'.
  <p>If you have taken No Bindings then the contract is only compulsive if the potential waifu understands the clauses explaining what she is agreeing to do and under what circumstances. In this case she must have signed the contract without coercion, but it is not required that she believed the contract was actually valid and binding.</p>
  `,
})

DLCotherControls.push({
  dlc: 'DLC by Merior',
  dlclink: 'https://docs.google.com/document/d/1j9emHb4IWvOTnp13RASTAuINAFuKDMSSQyQ-7ta9sjA/edit#',
  title: 'Letter of the Law',
  cost: 10,
  desc: `The law is on your side. If a contract you draft using the Signed and Sealed perk is otherwise legal then the compulsive terms are seen as legal and her compliance expected if signed. If you have a binding other than No Bindings then your contracts can compel an individual when it is signed by a parent, spouse, or anyone who could enter a contract on their behalf.
  `,
  whitelist: ['Signed and Sealed'],
})

DLCotherControls.push({
  dlc: 'DLC by Merior',
  dlclink: 'https://docs.google.com/document/d/1j9emHb4IWvOTnp13RASTAuINAFuKDMSSQyQ-7ta9sjA/edit#',
  title: 'Needful Things',
  cost: 20,
  desc: `The items, good, and/or services provided by your business are simply better than they otherwise would be and certainly seem more appealing. This enhancement is inversely proportional to the original quality, turning poor goods into average ones but will improve top-of-the-line products only fractionally. It will always make what you offer at least appear to have an edge over products of similar quality from elsewhere.
  <p>This enhanced appeal raises the likelihood that appropriate forms of theft (including defaulting on loans, shoplifting, or 'dining-and-dashing') takes place, but that can be a benefit. Anyone who commits such an act, and those who knowingly benefit from it such as consuming stolen food, are considered to have agreed to 'experience' the business per Hotel California and become similarly captured.</p>
  `,
  whitelist: ['Hotel California'],
})

DLCotherControls.push({
  dlc: 'gunmetalblue',
  title: 'To The Victor Goes The Spoils',
  cost: 100,
  desc: `Any capture target killed by you or your retinue is automatically captured. You may choose to sell them to the company at standard rate or return them to life with Warranty Plan.
  `,
  whitelist: ['Zenryoku Zenkai', 'Warranty Plan'],
})

// Lure Expansions
export const DLClureExpansions: DLCPerk[] = []

DLClureExpansions.push({
  dlc: 'Cyan-Rozen',
  title: 'Sticky Fingers: Alter-Flavor',
  cost: 30,
  whitelist: ['Sticky Fingers: Brown Sugar'],
  desc: 'You are now able to change to flavor of all of your bodily fluids(Ex..Chocolate,Cookies,vanilla,any flavored ice-cream,lemon,apples,liquor/beer....etc) this change is instant with just a thought. Additionally this perk synergies with both Faerie Feast and Sticky Fingers: Brown Sugar.',
})

// DLC Heritages
export const DLCheritages: DLCPerk[] = []

DLCheritages.push({
  dlc: 'Cyan-Rozen',
  title: 'Ascendant Human',
  tree: 'Transhuman',
  type: 'Self',
  cost: 22222,
  whitelist: ['Singularity'],
  desc: 'Surpassing limitations is the very nature of transhumanism. You now can unlock the third Transhuman type. All Transhuman perks treat you as having all three types. When the aesthetics of three Transhuman types conflict, you may determine which one takes precedent.',
})

DLCheritages.push({
  dlc: 'DaemonOrk',
  title: 'Dragon God',
  tree: 'Dragon',
  type: 'Self',
  complex: 'flavor',
  anything: 'Element',
  cost: 11111,
  whitelist: ['Double Dragon', 'Dragon Blood', 'Elder Dragon'],
  desc: 'Why stop at just three elements? You may now pick an additional Element per purchase of this Perk.',
})

// DLC Bindings
export const DLCbindings: DLCPerk[] = []

DLCbindings.push({
  dlc: 'DLC by Despin',
  dlclink: 'https://docs.google.com/document/d/1-JLmjxufUDBH0uR4_DQOpyYEJ43pPWv37V9YD_wYoZ0/edit#',
  title: 'Additional Binding',
  cost: 11111,
  multiple: true,
  desc: `
  You are no longer limited to a single Binding. You may now purchase an additional Binding and expansions. You must still spend the credits as normal. This perk may be purchased multiple times. Its price will increase by 1 ticket each time. You are able to decide what purchased binding effects, including mental, are applied to any or all of your retinue. For example, you could Bind someone with the Shroud, then use Third-Generation Symbiote to share access to the Symbiote’s bio-armor as well. 
  `,
  requires: 'at least one Binding',
})

// DLC Ride Perks

export const DLCridePerks: DLCPerk[] = []

DLCridePerks.push({
  dlc: 'KatzSmile',
  title: 'Catch-A-Ride Custom Crew',
  cost: 20,
  desc: `
  <p>Maybe you want your ship's crew to be less... uhm... biological in their nature. Or maybe you want a crew of demi-humans. Or crew of monster-girls.</p>
  <p>This purchase will allow us to please your tastes.</p>
  <p>Instead of a team of clones, the crew of your ship will be customized up to your tastes.</p>
  <p>And accordingly, instead of a clone production facility, we will provide you with an automatic mini-factory for the production of AI-powered machines, summoning room for extra-dimensional creatures, or incubators for exotic organisms.</p>
  <p>Just make a choice.</p>
  `,
  whitelist: ['Catch-A-Ride Crew Production Program'],
})

DLCridePerks.push({
  dlc: 'KatzSmile',
  title: 'Catch-A-Ride Crew Tier Upgrade',
  cost: 40,
  desc: `
  <p>Perhaps you are not satisfied with the current power level of your crew.</p>
  <p>This purchase will let you fix that.</p>
  <p>One purchase and under your command now a crew equal to the T3 companions</p>
  `,
  whitelist: ['Catch-A-Ride Crew Production Program'],
})
