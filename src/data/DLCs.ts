import { PerkFull } from './talents'

interface DLCPerk extends PerkFull {
  dlc: string
  dlclink?: string
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
  dlc: 'KatzSmile',
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
  dlc: 'Despin',
  title: 'I Want Out',
  cost: 20,
  desc: `
  A portal opens to a new world of your choice. The portal is one-way only, and will last no more than two minutes or until you and all of your retinue have passed through, whichever is shorter. If any of your retinue stay behind, this perk will not help you retrieve them. 
  <p>If you have a Loan, use of this perk triggers an interest payment.</p>
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
  dlc: 'Despin',
  title: 'Emergency Exit',
  cost: 100,
  desc: `
  When you would receive a killing blow, you are teleported to your Pocket Apartment instead. The Company is not responsible for the consequences if you are teleported while in a world that doesn't have teleportation.
  `,
  whitelist: ['Pocket Apartment'],
})

DLChomes.push({
  dlc: 'KatzSmile',
  title: 'Stay in touch',
  cost: 5,
  desc: 'High speed internet service covering any and all dimensions no matter the location, magic ward, or jamming technology. A modem-router and replacements are provided for free.',
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
  dlc: 'KatzSmile',
  title: 'Armory',
  cost: 10,
  desc: 'A room-or pocket-dimensional space similar to the Pocket Space perk full of weapons, armor, and ammunition becomes available to you with this upgrade. It holds a wide variety of standard and specialized equipment from both your new world and your old one. This does include equipment that would normally only be available to special forces, but does not include custom-made or heavily customized variants on weapons. Weapons you or your companions acquire in the field can be sent to this armory with a few seconds of concentration, and each of you can choose up to ten pieces of equipment - such as a gun, a shield, or a full set of armor - to be able to equip or return at will. The armory will automatically repair and maintain weapons stored within it. This doesn\'t work for fully destroyed artifact items unless you help supply the magical oomph.',
  whitelist: ['Sweet Home'],
})

// DLC talents
export const DLCtalents: DLCPerk[] = []

DLCtalents.push({
  dlc: 'Despin',
  title: 'Presence',
  cost: 30,
  desc: `
  Through a mix of perception alteration and minor reality alteration, the world itself seems to aid you in presenting the bearing you intend. From making you seem supernaturally beautiful, always being seen or recorded from a flattering angle and lighting, your dramatic declarations echoing even on an open field, etc. At your discretion, this perk can also allow situational coincidences such as relevant music to start playing or lightning to strike dramatically behind you as you cackle.
  `,
  whitelist: ['Communication Talent'],
})

// DLC Lures
export const DLClureExpansions: DLCPerk[] = []

DLClureExpansions.push({
  dlc: 'Cyan-Rozen',
  title: 'Sticky Fingers: Alter-Flavor',
  cost: 30,
  whitelist: ['Sticky Fingers: Brown Sugar'],
  desc: 'You are now able to change to flavor of all of your bodily fluids(Ex..Chocolate,Cookies,vanilla,any flavored ice-cream,lemon,apples,liquor/beer....etc) this change is instant with just a thought. Additionally this perk synergies with both Faerie Feast and Sticky Fingers: Brown Sugar.',
})
