import { DLCPerk } from 'global'

// DLC Generic Perks
export const DLCgenericPerks: DLCPerk[] = []

DLCgenericPerks.push({
  uid: 'yqayv',
  title: 'Big Entrance',
  dlc: 'KatzSmile',
  category: 'Generic',
  image: 'https://i.ibb.co/P1d7W9G/Big-Entrance.jpg',
  special: 'Must be repurchased for each use.',
  complex: 'target',
  cost: 10,
  desc: `Perhaps the moment will come when you need to justify the event of their appearance in front of you for a new companion. Or maybe your appearance in the new world should be memorable, or maybe you want make an appearance like an epic hero in front of local residents or characters? But don't worry! For a very symbolic fee, our company undertakes to play a grandiose theatrical performance, which will surely convince your new companion or locals that you or them being here is an act of fate!
  <p>It could be anything. Cataclysm, random portal, magical summoning by an evil (or not) sorcerer and their "salvation by your intervention". Or maybe they "died" and appeared before their "god"? Anything! Let your imagination run wild and we'll be happy to make it happen!</p>
  <p>The company is not responsible for all possible consequences of these events. Our persuasion methods may not work for T8+ companions and characters. </p>
  `,

})
DLCgenericPerks.push({
  uid: 'K7CyL',
  title: 'Grail Knowledge',
  category: 'Generic',
  dlc: 'KatzSmile',
  image: 'https://i.ibb.co/rdzSLf2/Grail-Knowledge.jpg',
  complex: 'target',
  cost: 1,
  max: 5,
  desc: `Does your companion come from a less developed world than your own? Or perhaps their world is incredibly distant in a philosophical sense? Don't worry, we'll fix it!
  <p>Having acquired this perk, you can be sure that your companion will receive all the necessary common knowledge for your world. Including general schooling, hygiene and home appliance skills</p>
  <p>If bougth for 5 times, you will have the ability to give this perk to any member of your retinue at no cost.</p>
  `,
})
DLCgenericPerks.push({
  uid: 'fJRGz',
  dlc: 'Despin',
  category: 'Generic',
  dlclink: 'https://docs.google.com/document/d/1-JLmjxufUDBH0uR4_DQOpyYEJ43pPWv37V9YD_wYoZ0/edit#',
  title: 'HUD',
  image: 'https://i.ibb.co/B4X2RBm/HUD.jpg',
  cost: 10,
  max: 10,
  complex: 'target',
  desc: `Your Smart Device is now part of you and accessible with a thought via a customizable HUD. You are still able to summon a device for waifus to interact with should you wish. You can customize the display at any time.
  <p>If you purchase this perk for any ten of your retinue members, including yourself, the rest of your retinue may gain this perk for free.</p>
    `,
})

DLCgenericPerks.push({
  uid: 'S84Eb',
  dlc: 'Despin',
  category: 'Generic',
  dlclink: 'https://docs.google.com/document/d/1-JLmjxufUDBH0uR4_DQOpyYEJ43pPWv37V9YD_wYoZ0/edit#',
  title: 'Toggle',
  image: 'https://i.ibb.co/tmwDN2Q/Toggle.jpg',
  cost: 20,
  max: 10,
  complex: 'target',
  desc: `You can use your HUD to adjust absolutely any and all abilities, perks, skills, traits, etc. that you have, from this CYOA or 3rd party sources, from 0-100%. This perk does not allow you to raise any ability or parameter above 100%, even if something else is reduced or turned off. 
  <p>  The Contractor can access the abilities of all subjects that have a copy of this perk and has final say, even including the ability to disable subjects’ perks or alter the enforced loyalty of a Binding. Once you’ve purchased this perk ten times, it will apply to every member of your retinue.</p>
  <p>Uses of this perk include: Reduce super senses. Turn off Shroud shifting due to unconscious desires. Limit yourself and a Saiyan sparring partner to T6 to not need to worry about the planet if you lose control. Turn off out of context abilities to play at being a local. Turn off the retinue's powers on board game night, and reduce card counters' memory to even the playing field.</p>
    `,
  needed: 1,
  whitelist: ['HUD', 'First Augmentation'],
})

DLCgenericPerks.push({
  uid: 't7wLC',
  dlc: 'VermontCheese',
  category: 'Generic',
  title: 'Anthropize',
  image: 'https://i.ibb.co/dmjb47Z/Anthropize.jpg',
  cost: 10,
  max: 10,
  complex: 'target',
  desc: `Got a waifu that you just can’t touch, some sort of giant monster, or not quite flesh and blood? Well with this perk, let all your worries slip away. AI’s gain a physical body they can summon at will, giant monsters gain a human-ish. Think cat-girl level humanization. They don’t loose their powers, but they can now fit in your living room. Same thing with robots and the like. They’ll get a human-ish form with some robot bits somewhere, but now instead of only being able to cuddle cold hard metal at night, you get a nice warm human lookin kind of thing. All anthropized forms can be swapped out at will by the waifu this is applied to. 10 purchases for your retinue will let you apply this to any waifu you have in your retinue.
     `,
})

DLCgenericPerks.push({
  uid: 'EsNrD',
  dlc: 'Despin',
  category: 'Generic',
  dlclink: 'https://docs.google.com/document/d/1-JLmjxufUDBH0uR4_DQOpyYEJ43pPWv37V9YD_wYoZ0/edit#',
  title: 'Native Merger',
  image: 'https://i.ibb.co/KLWT9jH/Native-Merger.jpg',
  cost: 1,
  costVariants: [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000],
  complex: 'target',
  desc: `It is possible to later visit a world containing a version of a waifu previously purchased. This perk merges your waifu with the local version, as if they had Substituted into them. If you have Adjustment Field or similar, both forms become available as preset options.
  <p>Cost is based on target tier:</p>
  <div class="flex flex-wrap gap-4">
    <div v-for="cost, i in [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000]">
      T{{i + 1}}: {{cost}}
    </div>
  </div>
  `,
})

DLCgenericPerks.push({
  uid: 'bq0Nc',
  dlc: 'Despin',
  category: 'Generic',
  dlclink: 'https://docs.google.com/document/d/1-JLmjxufUDBH0uR4_DQOpyYEJ43pPWv37V9YD_wYoZ0/edit#',
  title: 'Open Rolls',
  image: 'https://i.ibb.co/Gt62FNJ/Open-Rolls.jpg',
  cost: 5,
  desc: `When looking for a Slightly Used companion, the contractor can now see the Ability Rolls and Trauma Rolls for all candidates. However, candidates are now only a T10 on an Ability Roll of 36, not TX.
  `,
})

DLCgenericPerks.push({
  uid: 'k9k4T',
  dlc: 'KatzSmile',
  category: 'Generic',
  title: 'Worlds Apart',
  image: 'https://i.ibb.co/5BpzVhw/Worlds-Apart.jpg',
  requires: '(Any Yoinked companion)',
  complex: 'target',
  special: 'Chargen only. Not available in Gauntlet PvP.',
  cost: 20,
  desc: `Sometimes your potential companion is separated from you by an interdimensional veil. But the use of this perk will allow you to overcome all unthinkable boundaries and deliver them to you.
  `,
})

DLCgenericPerks.push({
  uid: 'lfkIs',
  dlc: 'the_taken',
  category: 'Generic',
  title: 'Henshin Impact',
  image: 'https://cdn.discordapp.com/attachments/925963686433132644/993467031489884201/5558331.webp',
  requires: 'The companion must be a trained pilot of a vehicle that at its core is a scaled up version of themselves, even if only marginally. This is usually some form of mecha, even mass produced models.',
  complex: 'target',
  special: '',
  cost: 20,
  desc: `The companion gains the ability to manifest a suit of armour that resembles one of the mecha's they are trained to pilot, with equipment and power output scaled down.
  <p>Manifesting the armour is often called a transformation sequence. It normally only takes a few seconds, but with practice manifestation time can be shortened, extended as a form of expressive performance, or even only partially completed.</p>
  <p>Upgrades and adjustments to the armour is possible, but requires the armour to be manifested during the process. The storage space the armour resides in when not deployed is otherwise inaccessible.
  If you own the vehicle you can quickly train your companion in its use through the Company's Catch-a-Ride Crew Training Program. </p>
  <p>You can also modify the vehicle itself as normal and those changes will appear on the armour the next time it is manifested.</p>
  `,
})

DLCgenericPerks.push({
  uid: 'soiFT',
  dlc: 'Despin',
  title: 'Immutable Self',
  image: 'https://luke-15.org/wp-content/uploads/2013/02/closedminded.jpg',
  cost: 10,
  complex: 'target',
  max: 10,
  desc: 'Whether it’s from Substitute, Deep Weave, mind reading, consumption, or any other company-provided or third-party methods, ending up with multiple voices in your head is actually not uncommon for Contractors. The sanctity of your psyche is now guaranteed, and you will always remain yourself. No personality bleed will ever occur unless you intentionally incorporate it. If you have Stress Defense, you also get trauma reduction, such that even if you have perfect memory, you can absorb the most tortured of beings without a bother. Finally, you now keep your original mundane knowledge and skills through use of Power Swap. Once you’ve purchased this perk ten times, it will apply to every member of your retinue.',
  category: 'Generic',
  whitelist: [
    'Mind Defense',
  ],
})

// Misc DLC Perks

export const DLCperks: DLCPerk[] = []

DLCperks.push({
  uid: 'hRlCG',
  dlc: 'Despin',
  category: 'Misc Perk',
  dlclink: 'https://docs.google.com/document/d/1-JLmjxufUDBH0uR4_DQOpyYEJ43pPWv37V9YD_wYoZ0/edit#',
  title: 'Presentation',
  image: 'https://cdn.discordapp.com/attachments/925963686433132644/1035675422098202744/Screenshot_1.jpg',
  cost: 30,
  desc: `
  Through a mix of perception alteration and minor reality alteration, the world itself seems to aid you in presenting the bearing you intend. From making you seem supernaturally beautiful, always being seen or recorded from a flattering angle and lighting, your dramatic declarations echoing even on an open field, etc. At your discretion, this perk can also allow situational coincidences such as relevant music to start playing or lightning to strike dramatically behind you as you cackle.
  `,
  whitelist: ['Communication Talent'],
})

// DLCperks.push({
//   uid: 'GsCat',
//   dlc: 'CelestialDragon DLC',
//   category: 'Misc Perk',
//   dlclink: 'https://docs.google.com/spreadsheets/d/1FM6PNbDEyZV4T4rVLWjPYBc3O0jmmwd1obkFD7jLDt8/edit?usp=sharing',
//   title: 'Returning Home',
//   image: 'https://i.ibb.co/prHZrjj/Returning-Home.jpg',
//   cost: 0,
//   desc: 'At the end of your first world, or after you complete the mission or at your own discretion you can return home with all the powers, perks and waifus that you obtained. Able to go back and forth between worlds at any time. The time on Earth will not have moved since you left and you can change how fast or slow (or at all) Earths time and the other worlds time flow.',
//   whitelist: ['Exit Stage Left'],
// })

DLCperks.push({
  uid: 'jcBEK',
  dlc: 'BenFang322',
  title: 'Appearance Change',
  category: 'Misc Perk',
  image: 'https://i.ibb.co/1zKj6dB/Appearance-Change.jpg',
  cost: 1,
  desc: `
  Because sometimes you just don’t like the way you look, and would rather look different or like someone else instead. Can only be used to change cosmetic aspects of yourself only, and provide’s no practical benefits outside of a different appearance.
  <p>If purchased at Chargen alongside Extra, your new appearance will be how your Extra’d self always looked so as to avoid accidentally changing your new identity a second time.</p>
  `,
})

DLCperks.push({
  uid: 'V7siL',
  dlc: 'windshadow21',
  title: 'Normalcy',
  category: 'Misc Perk',
  image: 'https://i.ibb.co/crcCGfs/Normalcy.jpg',
  cost: 10,
  desc: `
  Generally people - much like in your old world - would be a bit confused by a single person, having a very 'consenting' group of Companions. With this, everyone will just assume that the things you and your Companions do are normal, if you don't stretch it too much.
  `,
  whitelist: ['Sexual Calibration'],
})

DLCperks.push({
  uid: 'te1Zv',
  dlc: 'GForce1000',
  category: 'Misc Perk',
  dlclink: 'https://imgur.com/gallery/suU1RXx',
  title: 'Time-Savers',
  image: 'https://i.ibb.co/s6b25Kb/Time-Savers.jpg',
  cost: 2,
  costVariants: [2, 10],
  desc: `
  You humans have to do so much useless stuff that just wastes the day away in order to simply function. No more! Your body is now self cleaning, meaning you'll almost always stay sparkly, well groomed, and smelling great. All of your hair and nails will eternally be at your desired length. You'll be able to fall asleep within a few minutes of trying to, and you'll only need six hours to feel completely rested and rejuvenated. Finally you'll never have to excrete any sort of waste ever again. It says here that all of these can be turned down or off whenever you like, but come on? What possible reason would someone want to be able to, lets say, go to the bathroom if you never need to again? ...It's a fetish thing, isn't it?
  <p>For 10 credits you will get the version that is applied to a whole retinue, with the ability to turn it off for individuals or entire groups, such as familiars.</p>
  `,
})

DLCperks.push({
  uid: '3EnoU',
  dlc: 'Despin',
  category: 'Misc Perk',
  dlclink: 'https://docs.google.com/document/d/1-JLmjxufUDBH0uR4_DQOpyYEJ43pPWv37V9YD_wYoZ0/edit#',
  title: 'I Want Out',
  image: 'https://i.ibb.co/02cZWg7/IWantOut.jpg',
  cost: 20,
  desc: `
  A portal opens to a new world of your choice. The portal is one-way only, and will last no more than two minutes or until you and all of your retinue have passed through, whichever is shorter. If any of your retinue stay behind, this perk will not help you retrieve them. 
  `,
})

DLCperks.push({
  uid: 'tG4yC',
  dlc: 'Despin',
  category: 'Misc Perk',
  dlclink: 'https://docs.google.com/document/d/1-JLmjxufUDBH0uR4_DQOpyYEJ43pPWv37V9YD_wYoZ0/edit#',
  title: 'Trajectory. Agreement.',
  image: 'https://i.ibb.co/gF2MNTH/Trajectory-Agreement.jpg',
  cost: 200,
  desc: `
  <p>You are capable of Unrestricted Multiversal Travel. </p>
  <p>Space and time open before you, allowing travel to anywhere and anywhen. This grants you the ability to transport yourself, others, and objects near you to the location and time of your choice. Planetary range is a trivial effort. You can also access all other worlds, universes, and multiverses at will. The form this travel takes, such as teleportation, portals, or something else, can be chosen by the contractor when this perk is purchased. </p>
  `,
})

DLCperks.push({
  uid: 'sEFxf',
  dlc: 'Merior',
  category: 'Misc Perk',
  dlclink: 'https://docs.google.com/document/d/1j9emHb4IWvOTnp13RASTAuINAFuKDMSSQyQ-7ta9sjA/edit#',
  title: 'Gone And Forgotten',
  image: 'https://cdn.discordapp.com/attachments/925963686433132644/1048205426077995088/Screenshot_2.jpg',
  cost: 10,
  desc: `When you sell a waifu to the Company all traces of them begin to vanish. Others will not notice the waifu's absence and, over the course of a year and a day, memories and physical evidence will change to match that the waifu had never existed at all.
  <p>At the moment of each sale may opt to have your memories, your other waifus memories, the sold waifu's name on the Company's list of purchasable waifus, and/or any evidence stored in your Sweet Home to be unaffected.</p>
  `,
})

DLCperks.push({
  uid: 'eIljw',
  dlc: 'Merior',
  category: 'Misc Perk',
  dlclink: 'https://docs.google.com/document/d/1j9emHb4IWvOTnp13RASTAuINAFuKDMSSQyQ-7ta9sjA/edit#',
  title: 'Pavlov\'s Bell',
  image: 'https://i.ibb.co/St7W2s8/Pavlov-SBell.jpg',
  cost: 10,
  desc: `A new app installed on your Company device can directly inflict sensation you wish on your waifu's at the touch of a button. The default settings are a sourceless pleasure or pain of any desired intensity but more complex sensations, lack of sensation, or sequences are possible.
  <p>As a safeguard against abuse, your waifu's cannot perceive any options which induce sensations on herself personally nor act to prevent you from using the app upon her or others. If combined with the Target Tracker perk, then a waifu's activities and condition can be programmed to trigger specific sensations.</p>
  `,
})

DLCperks.push({
  uid: 'bqgqk',
  dlc: 'Mortaegus’s Mod',
  category: 'Misc Perk',
  dlclink: 'https://forum.questionablequesting.com/threads/r34-economy-cyoa-thread.11289/page-568#post-3866836',
  title: 'Patron Income',
  image: 'https://i.ibb.co/LPWzYnn/Patron-Income.jpg',
  cost: 1000,
  multiple: true,
  max: 99,
  increment: true,
  desc: 'You now receive an allotment of one point for every three days, which you may spend on anything that points can purchase from the waifu catalogue; this perk can be taken multiple times and its effects stack additively, but each additional purchase costs one thousand more than the previous purchase, so while the first only costs one-thousand points, the second will cost two-thousand points, the third will cost three-thousand points, the fourth will cost four-thousand points, and so on and so on; one instance can be purchased in exchange for a IMG ticket',
})

DLCperks.push({
  uid: 'zB0Rf',
  dlc: 'Mortaegus’s Mod',
  category: 'Misc Perk',
  dlclink: 'https://forum.questionablequesting.com/threads/r34-economy-cyoa-thread.11289/page-568#post-3866836',
  title: 'Abandoned Assets',
  image: 'https://i.ibb.co/CtDmMtR/Abandoned-Assets.jpg',
  cost: 10,
  costVariants: [10, 100, 1000],
  multiple: true,
  desc: `You will find that your new world has a number of previously bound waifus who for some reason or another have been left to their own devices; perhaps they were accidentally misplaced in transition, or maybe their contractor had a sudden case of extremely violent death, or maybe they were deliberately abandoned; either way, something somehow resulted in their arrival in your new world, and they are now your problem; they know that they were intended to be kept as slaves by a master, and will be especially distrustful of anyone who approaches them, so attempting to capture them will be difficult at best and dangerous at worst; while they will have arrived together, they may or may not stay together, and they also may seek out local assistance or proactively take measures to evade being captured.
  <p>Cost depends on number and tier of potential companions: T1-T4 [10]; T1-T7[100]; T1-T10[1000]</p>
  <p>Total sum of the companion's cost's can't be less than double the amount payed.</p>
  `,
})

DLCperks.push({
  uid: 'kHybZ',
  dlc: 'Bluesnowman',
  category: 'Misc Perk',
  title: 'Memorabilia',
  image: 'https://i.ibb.co/0GX1NqX/Memorabilia.jpg',
  cost: 5,
  multiple: true,
  max: 3,
  desc: `You can take all the stuff you owned in your birth world, example includes - your notes / phone / computer / things of sentimental value, the amount of the stuff is limited to the things you can carry with you in a backpack. Your smartphone and computer will have a snapshot of your world internet, regardless their technical capability for it. If you have a Sweet Home or it's upgrades one of the room of your house will be filled with your possessions instead.
  <p>With a second  purchase the company will bring along any pets you had even if they no longer alive, they will get the Everlasting Talent for free.</p>
  <p>The third purchase gives you an ability to change your pet species, limited to one time for each. This has no affect for a pet strength at the start, but can be trained up, the same as Added Potential. Examples of available species include: dragonling; kelpie; hippogriff; yeti; etc.</p>
  `,
})

DLCperks.push({
  uid: 'opART',
  dlc: 'Bluesnowman',
  category: 'Misc Perk',
  title: 'Let Them Know',
  image: 'https://i.ibb.co/p4x5Mnn/Let-Them-Know.jpg',
  cost: 10,
  desc: `Sometimes you want to let the people of a setting know just how things might turn out had you not interfered, either before or after the the fact. With this perk it can be done in a way of your preference, be it sudden revelation, TV show, or just unquestionable confidence in your words.
  <p>Future events that may be shown by this perk need to be known by you or you need to have the ability to learn about them.</p>
  <p>This perk will work regardless of an chosen origin and will show the timeline where you or any interference your actions are caused did not exist.</p>
  `,
})

DLCperks.push({
  uid: 'JhATq',
  dlc: 'Despin',
  category: 'Misc Perk',
  dlclink: 'https://docs.google.com/document/d/1-JLmjxufUDBH0uR4_DQOpyYEJ43pPWv37V9YD_wYoZ0/edit#',
  title: 'Amazon-free Warranty',
  image: 'https://i.ibb.co/yn9FF3j/Amazon-Free-Warranty.jpg',
  cost: 200,
  desc: `Amazon tracking can be incredibly inconvenient. Who knows when your delivery will actually arrive? Instead of masses of Amazons to reduce Warranty Plan’s timer, this perk directly shortens the respawn timer for your subjects to 5 minutes.
  `,
  whitelist: ['Express Delivery'],
})

DLCperks.push({
  uid: 'nsoJf',
  dlc: 'Sleepy Fluffball™',
  category: 'Misc Perk',
  title: 'Designer Babies',
  image: 'https://cdn.discordapp.com/attachments/925963686433132644/993465150302593175/maxresdefault_1.jpg',
  cost: 8,
  multiple: true,
  max: 3,
  desc: `For those who want to be able to change anything about your children to perfection. All changes only go into effect before birth. First purchase lets you control the gender of your children. Second purchase lets you control their racial ratios for hybridization, which follows the general rules regarding hybrid creation and requires any races used to be in either parent's collection of races. Third lets you control their appearance, and add or remove traits that are related. If you have Fertility Calibration II, this perk works on a case-by-case basis.
  `,
  whitelist: ['Fertility Calibration I'],
})

DLCperks.push({
  uid: 'KGkrd',
  dlc: 'Ruaron',
  title: 'Knowledge Base Upload',
  category: 'Misc Perk',
  image: 'https://cdn.discordapp.com/attachments/925963686433132644/995755374349144134/dragon-s-crown-fantasy-art-person-reading-wallpaper-preview.jpg',
  cost: 5,
  costVariants: [5, 10, 20],
  special: '1st stage: 5 credits; 2nd stage: 10 credits; 3rd stage: 20 credits.',
  desc: `So you ended up in your favorite world, but it turns out that your mortal memory isn't perfect, you even can't tell what questions Snape asked Potter in the first lesson or where the Dragon Balls are. But worry not, using the most advanced methods of copying memory, we have collected for you, a mental base on the desired worlds. This includes the official source (so-called 'canon') and wikipedia pages.

  <p>Is this not enough for you? Then buy it again and you will get knowledge of the most popular fanfics and even author's personal notes. Buying a third time will make your knowledge base updated every time you visit a new world.</p>
  
  <p>Extra data that will be downloaded into your memory will be just pure knowledge, with no emotional strings attached, and you can distinguish between your original memories and those we are adding.</p>
  `,
})

// DLC home perks

export const DLChomes: DLCPerk[] = []

DLChomes.push({
  uid: 'kTjFA',
  dlc: 'Despin',
  dlclink: 'https://docs.google.com/document/d/1-JLmjxufUDBH0uR4_DQOpyYEJ43pPWv37V9YD_wYoZ0/edit#',
  title: 'Creature Feature',
  category: 'Home',
  image: 'https://i.ibb.co/9Y746Qf/Creature-Feature-I.jpg',
  cost: 500,
  desc: `From your control center, you can select any wildlife you have encountered to populate your Demiplane. Binding wildlife from your Demiplane as a Familiar does not provide credits.
    `,
  whitelist: ['Laws of the Jungle'],
})

DLChomes.push({
  uid: 'T7TG1',
  dlc: 'Despin',
  dlclink: 'https://docs.google.com/document/d/1-JLmjxufUDBH0uR4_DQOpyYEJ43pPWv37V9YD_wYoZ0/edit#',
  title: 'A God Am I',
  category: 'Home',
  image: 'https://cdn.discordapp.com/attachments/925963686433132644/1020819161846390944/Image.png',
  cost: 0,
  costT: 2,
  desc: `From your control center, you can create life to populate your Demiplane. Binding creatures from your Demiplane does not provide credits.
  <p>If you aren’t already, you become a TX yourself.</p>
    `,
  whitelist: ['Creature Feature'],
})

DLChomes.push({
  uid: 'mOIQR',
  dlc: 'DaemonOrk',
  title: 'God of Time',
  category: 'Home',
  image: 'https://i.ibb.co/TBmfsyQ/God-Of-Time.jpg',
  cost: 0,
  costT: 1,
  desc: `You can already create life, but now you want to add some randomness to it. So long as neither you or your retinue members are inside, time can now be sped up within your demiplane up to 1 million times. Allowing things to evolve naturally.
    `,
  whitelist: ['A God Am I'],
})

DLChomes.push({
  uid: '4ed0g',
  dlc: 'Despin',
  dlclink: 'https://docs.google.com/document/d/1-JLmjxufUDBH0uR4_DQOpyYEJ43pPWv37V9YD_wYoZ0/edit#',
  title: 'Control Center App',
  category: 'Home',
  image: 'https://i.ibb.co/qkygJxz/Control-Center-App.jpg',
  cost: 10,
  needed: 1,
  desc: 'The control center provided by Grand Manor/Life’s A Beach is now an app on your smart device.',
  whitelist: ['Grand Manor', 'Life’s A Beach'],
})

DLChomes.push({
  uid: 'BxyZw',
  dlc: 'KatzSmile',
  title: 'Stay in touch',
  category: 'Home',
  image: 'https://i.ibb.co/k5pzxb7/Stay-In-Touch.jpg',
  cost: 5,
  desc: 'High speed internet service covering any and all dimensions no matter the location, magic ward, or jamming technology. A modem-router and replacements are provided for free.',
  whitelist: ['Pocket Apartment'],
})

DLChomes.push({
  uid: 'whxCA',
  dlc: 'KatzSmile',
  title: 'My House, My Rules!',
  category: 'Home',
  image: 'https://i.ibb.co/g9bQhR5/My-House-My-Rules.jpg',
  special: 'Will not work on anyone with mental defences and T8+ characters.',
  cost: 10,
  desc: 'Do you have your own home or maybe the island you own legally? Do you want to have a little more control over everything that happens inside? Want to ban Hawaiian shirts? Make pineapple pizza illegal? Or maybe obscene curses harm your mental well-being? Or maybe everyone should wear crocs with white socks? Now it is possible! You can now set your own rules of conduct here. Just read them out loud and any of your companions, guests or visitors will be compelled to follow them and find them reasonable. It effect does not count as mind control and all possible side-effects from it will be rationalized as unimportant when they leave area of effect.',
  whitelist: ['Pocket Apartment'],
})

DLChomes.push({
  uid: 'smb9b',
  dlc: 'GForce1000',
  title: 'Armory',
  category: 'Home',
  image: 'https://i.ibb.co/HtCJ5bW/Armory2.jpg',
  cost: 10,
  desc: 'A room-or pocket-dimensional space similar to the Pocket Space perk full of weapons, armor, and ammunition becomes available to you with this upgrade. It holds a wide variety of standard and specialized equipment from both your new world and your old one. This does include equipment that would normally only be available to special forces, but does not include custom-made or heavily customized variants on weapons. Weapons you or your companions acquire in the field can be sent to this armory with a few seconds of concentration, and each of you can choose up to ten pieces of equipment - such as a gun, a shield, or a full set of armor - to be able to equip or return at will. The armory will automatically repair and maintain weapons stored within it. This doesn\'t work for fully destroyed artifact items unless you help supply the magical oomph.',
  whitelist: ['Sweet Home'],
})

DLChomes.push({
  uid: 'pftN2',
  dlc: 'Despin',
  category: 'Home',
  dlclink: 'https://docs.google.com/document/d/1-JLmjxufUDBH0uR4_DQOpyYEJ43pPWv37V9YD_wYoZ0/edit#',
  title: 'Home Security',
  image: 'https://i.ibb.co/rtt8nK0/Security.jpg',
  cost: 0,
  desc: 'The portals to access your Pocket Apartment, and any perks that follow from it, can not be perceived or entered by anything you do not allow, including creatures, contaminants, and remote viewing.',
  whitelist: ['Pocket Apartment'],
})

DLChomes.push({
  uid: 'pftNh',
  dlc: 'ProtagNeptune',
  category: 'Home',
  title: 'The House on The Homeworld',
  image: 'https://i.imgur.com/TJHUNSFl.png',
  cost: 600,
  desc: 'Your homeworld, the Planet Earth with the Moon, will be brought into your dimension immediately after purchase. We hope you won\'t mind the probable unrest of the human population on your homeworld when they inevitably realize that the stars in the sky have changed, with an unknown planet or ringworld of your personal realm.',
  whitelist: ['Pocket Star'],
})

// DLC talents
export const DLCtalents: DLCPerk[] = []

DLCtalents.push({
  uid: 'AOY9D',
  dlc: 'Doomsought',
  category: 'Home',
  dlclink: 'https://forum.questionablequesting.com/threads/r34-economy-cyoa-thread.11289/page-879#post-4440542',
  title: 'Money Talent',
  image: 'https://i.ibb.co/RSXnxTf/Money-Talent.jpg',
  cost: 10,
  desc: `
  You are extremely talented at making money. You can smell opportunity and feel the flow of the market in your bones. As long as you actually put effort into it you can go from being broke to being a millionaire in a few months.
  <p>Can be shared</p>
  `,
})

DLCtalents.push({
  uid: 'l6MHt',
  dlc: 'Merior',
  category: 'Home',
  dlclink: 'https://docs.google.com/document/d/1j9emHb4IWvOTnp13RASTAuINAFuKDMSSQyQ-7ta9sjA/edit#',
  title: 'Educational Talent',
  image: 'https://i.ibb.co/PQFmfzc/Educational-Talent.jpg',
  cost: 5,
  desc: `You teach. You pass on information, you instruct, and you guide the learning process even with skills that you do not directly possess. Your descriptions and directions are never less clear than you desire and those you give them to will retain the information easily. You can even act as the best possible practice partner so long as you have a vague idea of the role and are physically capable of what is required.
  <p>Your students cannot learn anything from you that they would be otherwise incapable of picking up given sufficient time and effort. You simply reduce the requirements for both to a tiny fraction of what would otherwise be needed.</p>
  `,
})

DLCtalents.push({
  uid: 'vW82l',
  dlc: 'Merior',
  dlclink: 'https://docs.google.com/document/d/1j9emHb4IWvOTnp13RASTAuINAFuKDMSSQyQ-7ta9sjA/edit#',
  title: 'Inculcation Talent',
  category: 'Home',
  image: 'https://i.ibb.co/5sHG1yX/Inculcation-Talent.jpg',
  cost: 10,
  desc: `You remold. You can progressively change other people's habits, preferences, reflexes, and even more fundamental parts of who they are given time. You do so through social pressure and psychological tricks, even against their will or without their awareness, but supernatural power and the ability to blatantly reward or punish speeds your efforts tremendously. You could use this to help overcome addictions, remove bad habits, become a life coach, or simply be a world-class slave trainer.
  <p>
  Given enough time, and a victim who cannot or does not escape your regular interactions, you can continue to gain leverage over their psyche until even an iron-clad will bends. However, this would take years of casual daily interaction... or days or weeks of your entire attention while they were utterly at your mercy.
  </p>
  `,
  whitelist: ['Communication Talent'],
})

// DLC Lures
export const DLClures: DLCPerk[] = []

DLClures.push({
  uid: 'ugDHv',
  dlc: 'Merior',
  dlclink: 'https://docs.google.com/document/d/1j9emHb4IWvOTnp13RASTAuINAFuKDMSSQyQ-7ta9sjA/edit#',
  image: 'https://i.ibb.co/sFDhQBX/Fools-Gold.jpg',
  category: 'Lure',
  title: 'Fools Gold',
  cost: 10,
  desc: 'Waifus who are motivated by gaining money, for whatever reason, and who have unwillingly been rendered poor are more attracted to you. This attraction is based upon the signs of wealth, conspicuous consumption, and casual spending that they become aware of as shown by you and your waifus.',
})

DLClures.push({
  uid: '2YzxQ',
  dlc: 'Merior',
  dlclink: 'https://docs.google.com/document/d/1j9emHb4IWvOTnp13RASTAuINAFuKDMSSQyQ-7ta9sjA/edit#',
  image: 'https://i.ibb.co/2sVT2BZ/Stud-Service.jpg',
  title: 'Stud Service',
  category: 'Lure',
  cost: 10,
  desc: `You are prime breeding stock, able to sire the best children feasible given a compatible partner, which is something that potential partners sense... and like. The more proof of your fertility, virility, or the quality of your offspring that a potential waifu witnesses the more the image of submissively being bred by you infects and inflames their fantasies. Those who have had offspring, or who are \'hearing their biological clock ticking\', are particularly susceptible.
  <p>With practice, you can influence your offspring at conception to possess or lack traits which it would be possible for them to inherit.</p>
  `,
})

DLClures.push({
  uid: 'tKqnC',
  dlc: 'Trismegistus',
  title: 'Hypnos',
  category: 'Lure',
  image: 'https://i.ibb.co/YhdvLmP/Hypnos.jpg',
  cost: 15,
  desc: `You can fall asleep at will and enter the dreams of anyone you have seen in the past day. You may mentally check if a valid target is sleeping at any time. You control the events within the dream save for the targets mind, body, and actions. The dream will substantially influence their thoughts for several days, more if they genuinely connect with the experience. You may have the  dreamer remember their dream to whatever degree you desire.
  `,
})

DLClures.push({
  uid: 'nuDNs',
  dlc: 'Trismegistus',
  title: 'Red Chains of Fate',
  category: 'Lure',
  image: 'https://cdn.discordapp.com/attachments/925963686433132644/992740655958863912/Screenshot_2.jpg',
  cost: 5,
  costVariants: [5, 15],
  desc: `You have a sense for those who would be amenable to binding and the type of relationships you desire. This effect is overlaid on your other senses, making them "pop" out when you are aware of them in any way.

  <p>For an additional 10 credits, you can exert influence on those this perk makes you aware of. Doing so draws them to you like a moth to a flame or driftwood flowing with the currents. They will think of you more often and in positive contexts, and will be drawn towards your location.</p>
  `,
})

// Other Controls
export const DLCotherControls: DLCPerk[] = []

DLCotherControls.push({
  uid: 'Uvc6m',
  dlc: 'Merior',
  dlclink: 'https://docs.google.com/document/d/1j9emHb4IWvOTnp13RASTAuINAFuKDMSSQyQ-7ta9sjA/edit#',
  title: 'Nine Tenths Law',
  category: 'Lure',
  image: 'https://i.ibb.co/xDXVkB2/Nine-Tenths-Law.jpg',
  cost: 5,
  desc: 'Any individual who you manage to keep imprisoned for three days straight becomes yours. Any means of imprisonment, from holding them trapped in a magic circle to keeping them handcuffed next to you, is valid and you may use multiple means or shift between them as needed. However the victim must be aware of their confinement and any time spent unnaturally insensate (unconscious, drugged asleep, frozen in time, etc) does not count towards the total period of confinement.',
})

DLCotherControls.push({
  uid: 'YzNrj',
  dlc: 'Merior',
  dlclink: 'https://docs.google.com/document/d/1j9emHb4IWvOTnp13RASTAuINAFuKDMSSQyQ-7ta9sjA/edit#',
  title: 'Signed and Sealed',
  category: 'Lure',
  image: 'https://i.ibb.co/bj4f3kZ/Signed-And-Sealed.jpg',
  cost: 10,
  desc: `There are more formal approaches to gaining a waifu than a love confession. Taking this perk grants you skill in writing contracts and allows you to include binding terms about her behavior and actions. Once the other party signs the contract freely and the relevant conditions have been met they will be forced to comply with the terms: be that anything from telling you a secret to becoming your slave. Company lawyers will assess the strictness and duration of contracts to determine if this will be considered a 'capture'.
  <p>If you have taken No Bindings then the contract is only compulsive if the potential waifu understands the clauses explaining what she is agreeing to do and under what circumstances. In this case she must have signed the contract without coercion, but it is not required that she believed the contract was actually valid and binding.</p>
  `,
})

DLCotherControls.push({
  uid: 'ExW28',
  dlc: 'Merior',
  dlclink: 'https://docs.google.com/document/d/1j9emHb4IWvOTnp13RASTAuINAFuKDMSSQyQ-7ta9sjA/edit#',
  title: 'Letter of the Law',
  category: 'Lure',
  image: 'https://i.ibb.co/7pRQbCb/Letter-Of-The-Law.jpg',
  cost: 10,
  desc: `The law is on your side. If a contract you draft using the Signed and Sealed perk is otherwise legal then the compulsive terms are seen as legal and her compliance expected if signed. If you have a binding other than No Bindings then your contracts can compel an individual when it is signed by a parent, spouse, or anyone who could enter a contract on their behalf.
  `,
  whitelist: ['Signed and Sealed'],
})

DLCotherControls.push({
  uid: 'iCmw0',
  dlc: 'Merior',
  dlclink: 'https://docs.google.com/document/d/1j9emHb4IWvOTnp13RASTAuINAFuKDMSSQyQ-7ta9sjA/edit#',
  title: 'Needful Things',
  legacy: true,
  category: 'Lure',
  image: 'https://i.ibb.co/q0vxrBD/Needful-Things.jpg',
  cost: 20,
  needed: 1,
  desc: `The items, good, and/or services provided by your business are simply better than they otherwise would be and certainly seem more appealing. This enhancement is inversely proportional to the original quality, turning poor goods into average ones but will improve top-of-the-line products only fractionally. It will always make what you offer at least appear to have an edge over products of similar quality from elsewhere.
  <p>This enhanced appeal raises the likelihood that appropriate forms of theft (including defaulting on loans, shoplifting, or 'dining-and-dashing') takes place, but that can be a benefit. Anyone who commits such an act, and those who knowingly benefit from it such as consuming stolen food, are considered to have agreed to 'experience' the business per Hotel California and become similarly captured.</p>
  `,
  whitelist: ['Hotel California', 'Commerce Room: Hotel California'],
})

DLCotherControls.push({
  uid: 'gqjwm',
  dlc: 'Trismegistus',
  title: 'Social Club',
  category: 'Lure',
  image: 'https://i.ibb.co/g39rTxW/Social-Club.jpg',
  cost: 10,
  desc: `You possess a dream realm you can control as you do with your target's dreams. Within this realm you and your retinue's minds are present, even when awake and without impacting your ability to function. You can control how aware each mind is of the dream realm, such as making them aware of the sensations they feel in the dream, but not what's causing them, or making someone think the dream is the real world, you could even mix the two worlds in their minds, making elements of the dream world overlap with the waking world. No one else can enter this realm. 
  <p>You can also bring sleeping members of your retinue into the dreams of your targets.</p>
  `,
  whitelist: ['Hypnos'],
})

DLCotherControls.push({
  uid: 'gqjwm',
  dlc: 'Skelethin',
  dlclink: 'https://docs.google.com/document/d/1HGcpJGpGbLCeA3VO8LFrQjxQqkYANdeoWbCKlCOnK0A/edit',
  title: 'Grail System',
  category: 'Other Controls',
  image: 'https://cdn.discordapp.com/attachments/925963686433132644/1015233924701626419/maxresdefault_1.webp',
  cost: 50,
  desc: `You become the center of a Holy Grail system. This creates an additional binding between you and your entire retinue similar to that between Master and Servant in a Holy Grail War. This system allows for optional adjustments to the general binding granting the ability to lower compulsions up to half of their original strength. 
  <p>Those bound to your Grail can materialize and dematerialize one set of armor and weapons at will. This equipment must be provided, and does not come with this feature. The weapons and armor may be summoned as individual pieces, or as a set. Any worn outfit will immediately be dismissed when armor is summoned, and will return in its previous state when the armor is dismissed. A “Set” of armor and/or weapons can be created by being equipped whilst going through a short ritual with a duration of at least 60 seconds. Any changes to a set must be made via the same process. Consumables that are part of a “Set” are not renewed and are consumed as usual.</p>
  <p>In addition, those affected by this binding become empowered, gaining increased vitality and inner mystical energy regeneration (Magical, Psychic, or Soul). Procedures like Mana Transfer Rituals can boost this even further, allowing one to literally fuck a waifu into perfect health. As a side effect of this increase in power, all those bound also gain superhuman senses, strength, agility, and durability; this is enough to push any blue-star subject up to Tier 4 or any copper-star up one tier, but is not a significant gain for higher tiers. This boost explicitly does not stack, only use the largest boost at Step 5.</p>
  <p>As an additional binding effect, this allows a Command Seal to be used to cut the remaining binding time in half of any target of your current Tier or lower that you are in physical contact with. Multiple seals used for this effect are always treated as being used sequentially. This does not affect any target of a higher Tier than yourself, and Imaginary tier targets are immune.</p>
  `,
  whitelist: ['Command Seals: General Seals'],
})

DLCotherControls.push({
  uid: 'ko94c',
  dlc: 'Skelethin',
  dlclink: 'https://docs.google.com/document/d/1HGcpJGpGbLCeA3VO8LFrQjxQqkYANdeoWbCKlCOnK0A/edit',
  title: 'Class Cards',
  category: 'Other Controls',
  image: 'https://i.imgur.com/Th3cqup.jpg',
  multiple: true,
  max: 16,
  cost: 10,
  desc: `This gives access to the Servant Class Card system. Each class provides a set of skills that are innate to that class, as well as minor boosts to related abilities. These boosts are relative to base status, but not enough to be noticeable on a Tier level. Each Class must be purchased separately. An additional purchase for each Class must be made for it to also work on Familiars or lower. Each Class may be applied an unlimited number of times, and only the most recent Class Card effect applies. 
  <p>Class Cards Available:</p>
  <ul>
    <li class="list-inside list-disc">
    <b>Saber</b>: This class boosts the agility and power of melee warriors armed with swords, or sword-like objects. It grants the special ability of Magic Resistance, providing immunity  to low tier (4 tiers or lower than current tier) mystical abilities (those generally covered by Soul, Psychic, or Science Talents). It also grants the Riding Skill, though notably weaker than the Rider class as it only works on mundane-level mounts.
    </li>
    <li class="list-inside list-disc">
    <b>Lancer</b>: This class boosts agility and skill with long-range melee weapons, such as spears, lances, etc. It grants the special ability Deflect Projectiles, increasing your chances to deflect or dodge ranged attacks.
    </li>
    <li class="list-inside list-disc">
    <b>Archer</b>: This class boosts proficiency with projectiles and has the special ability Eagle Eye which grants the ability to boost all of the user's senses while also granting a zoom-like enhancement to sight.
    </li>
    <li class="list-inside list-disc">
    <b>Rider</b>: This class places an emphasis upon speed and powerful mounts, enhanced further by the special skill of Riding, which allows one to fully utilize the abilities of their mount (anything from horses to mechanical vehicles to divine or supernatural creatures)  even without training.
    </li>
    <li class="list-inside list-disc">
    <b>Caster</b>: This class boosts proficiency in all mystical abilities (those generally covered by Soul, Psychic, or Science Talents) and has the special ability Territory Creation, which allows one to alter and adjust space around oneself to enhance one's own mystical abilities.
    </li>
    <li class="list-inside list-disc">
    <b>Assassin</b>: This class boosts proficiency in assassination, stealth, and most things covered by the Covert Talent. It grants the special ability of Presence Concealment, which  significantly enhances one’s ability to remain undetected.
    </li>
    <li class="list-inside list-disc">
    <b>Berserker</b>: This class grants one the use of the special ability Mad Enhancement, which trades consciousness (i.e. sanity), for a larger general power boost.
    </li>
    <li class="list-inside list-disc">
    <b>Shielder</b>: This class primarily boosts defensive techniques and shields. It grants the special ability Defense Field which grants a defensive aura that allows one to alter and adjust space around oneself to enhance protection for oneself and nearby allies.
    </li>
  </ul>
  `,
  whitelist: ['Grail System'],
})
DLCotherControls.push({
  uid: 'gqjwm',
  dlc: 'Skelethin',
  dlclink: 'https://docs.google.com/document/d/1HGcpJGpGbLCeA3VO8LFrQjxQqkYANdeoWbCKlCOnK0A/edit',
  title: 'Demi-Servant',
  category: 'Other Controls',
  image: 'https://i.imgur.com/KRm5O9J.jpg',
  cost: 120,
  freebies: {
    talentPerks: [{ title: 'Body Tune-Up', cost: 0, count: 1 }, { title: 'Martial Talent', cost: 0, count: 1 }, { title: 'Science Talent', cost: 0, count: 1 }, { title: 'Soul Talent', cost: 0, count: 1 }, { title: 'Talent Sharing', cost: 0, complex: [{ flavor: 'Martial Talent', cost: 0 }], count: 1 }, { title: 'Talent Sharing', cost: 0, complex: [{ flavor: 'Soul Talent', cost: 0 }], count: 1 }, { title: 'Talent Sharing', cost: 0, complex: [{ flavor: 'Science Talent', cost: 0 }], count: 1 }],
    defensePerks: [{ title: 'Wild Defense', cost: 0, count: 1 }, { title: 'Body Defense', cost: 0, count: 1 }],
  },
  desc: `All those synced to the Grail System get further boosted to be fully on the level of at least a Low Class Servant. You and your retinue gain the Body Tune-Up, Martial, Science, and Soul Talents. (Take these four perks, plus Talent Sharing (Martial), Talent Sharing (Science) and Talent Sharing (Soul), for free.) You also gain Body, and Wild Defenses for free as well. 
  <p>Each member may permanently gain the effect of a Class Card they have access to. Unlike Class Cards however, this is a fixed choice, and must be in theme with that companion’s personality, skill, and current affinities. Those who would otherwise qualify for multiple classes may decide to switch classes via a ritual that requires being without a class for more than 24 hours, after which a new class may be selected.</p>
  <p>Reaching the level of a Demi-Servant further enhances the senses, strength, agility, and durability of a companion, boosting their tier by  +3 for Blue-stars, +2 for Copper-star, and +1 for Silver-stars. This replaces Grail System’s boost, and explicitly does not stack with boosts from other binding methods. Only use the largest Step 5 boost. In addition, the Tier for which you may use a Command Seal to halve the time to complete the binding of a waifu increases by 1. IMG tier targets remain immune to this effect.</p>
  <p>Class Cards may still be used on companions with a chosen Demi-Servant class, and will add the Class Card enhancements and special skill to those granted by becoming a Demi-Servant. This explicitly allows a companion to either have a dual class effect, or double the strength of the current  one.</p>
  `,
  whitelist: ['Class Cards'],
})
DLCotherControls.push({
  uid: 'gqjwm',
  dlc: 'Skelethin',
  dlclink: 'https://docs.google.com/document/d/1HGcpJGpGbLCeA3VO8LFrQjxQqkYANdeoWbCKlCOnK0A/edit',
  title: 'True Name',
  category: 'Other Controls',
  image: 'https://i.imgur.com/TBgSpYq.jpg',
  cost: 25,
  multiple: true,
  max: 10,
  desc: `Select a member of your retinue that can equip a Class Card. They now have access to a Noble Phantasm, the crystallization of a key part of their history, personality, skill, and abilities that would be part of their Legend as if they were a character from myth. This Noble Phantasm is unique to themselves, where even companions that are copies of the same target will produce different results. Its activation provides a conceptual effect in theme with the personality, skill, current affinities, and hypothetical development trajectories (Legend and projected Legend) of the member in question. The exact conditions to set up, initiate, or otherwise invoke the Noble Phantasm are unique to each companion. They are most commonly invoked through either a short aria or by invoking its True Name. 
  <p>This perk can also upgrade an item or effect that is intrinsically part of that member's Legend to Noble Phantasm status, including all the boosts associated with it (Immunity to mundane breakage, conceptual protections in theme of the item, etc). The form that the Noble Phantasm takes is frequently physical weaponry (e.g. swords, spears, bows) or support items (e.g. shields, rings, crowns). They can also be abstractions such as unique, often magical and/or supernatural abilities, unique or perhaps conceptual means of attack, curses, and even changes to the surrounding environments' physical or supernatural properties. This becomes their Primary Noble Phantasm, and they its owner.</p>
  <p>The power of a Noble Phantasm generally starts at roughly for the owner’s current Tier. As it is part of a still Living Legend, the power can be raised higher. Unlike most abilities, training does nothing to a Noble Phantasm’s power, only one's skill in wielding it . Its power is instead related to the story of its wielder, and deeds they accomplish using the Noble Phantasm.</p>
  <p>The expressed power of an invoked Noble Phantasm is such that an “average” release is directly comparable to a fully powered, fully charged similar effect as used by an average person of equivalent Tier, without the need for any charge or preparation. Secondary effects tied to a person’s story may manifest as secondary Phantasms, whose power is always at least a full tier weaker than their owner. A high level Noble Phantasm is equivalent to someone at the peak of the current tier, whilst the absolute most powerful can manifest power 1 tier higher than the owner’s current Tier. This explicitly does not allow a T10 to wield IMG tier level power.</p>
  <p>Invoking a Noble Phantasm drains the user of energy relative to the Tier and power of the effect invoked. Treat standard tier effects as roughly half the total energy capacity of a normal member of that Tier. Each increase in effective tier requires roughly 75% more energy/power than the previous, and each decrease in Tier cuts the energy cost by half. This cost can knock out or even kill the user if they do not have enough energy/mana/vitality when it is Invoked.</p>
  <p>This Perk may be purchased multiple times, with a limit of 1 per person. Once you have purchased this perk 10 times, all additional Demi-Servants that qualify automatically gain this perk without further purchase.</p>
  `,
  whitelist: ['Demi-Servant'],
})
DLCotherControls.push({
  uid: 'gqjwm',
  dlc: 'Skelethin',
  dlclink: 'https://docs.google.com/document/d/1HGcpJGpGbLCeA3VO8LFrQjxQqkYANdeoWbCKlCOnK0A/edit',
  title: 'Ruler',
  category: 'Other Controls',
  image: 'https://i.imgur.com/jXrYMw9.jpg',
  cost: 40,
  desc: `You can now designate a waifu as a Ruler-class Demi-Servant. This is not available to anyone under a lesser level of binding than Companion. This means that other retinue members such as familiars are unable to receive this perk. 
  <p>Ruler class grants a significant boost to all of a companions abilities, making them stronger than any other class of servant, as well providing them with the ability to use Command Seals on other Servants and Demi-Servants. This boost on its own is not enough to boost a tier of a companion. Unlike a normal class, Ruler-class explicitly allows this to combine with boosts from other sources to upgrade a Tier, provided a Companion is already at the peak of their current Tier. This explicitly does not provide enough for a T10 to upgrade to IMG Tier.</p>
  <p>A Ruler-class may carry six additional sets of Seals on their body. These extra Seals are granted free as part of this perk, do not count towards the general command seal limit, regenerate independently from any others, and may have active charges transferred to you, or other retinue members that have Command Seals.</p>
  <p>You may only purchase this upgrade once per 14 non-Ruler Demi-Servant Companion-tier retinue members you have. Canon Ruler class servants count as regular servants for this limit.</p>
  <p>This perk also grants access to the Conjunction Perk. For Conjuction’s effects, treat Rulers as a secondary hub of the mental network. Rulers also have higher authority access to the network, allowing them limited access to the minds and senses of waifus in the network. With only this perk for access, reading a waifu’s mind or senses is not very intuitive, with ease and quality of access highly dependent on how close of a bond you have with that specific waifu.</p>
  `,
  whitelist: ['Demi-Servant'],
})
DLCotherControls.push({
  uid: 'gqjwm',
  dlc: 'Skelethin',
  dlclink: 'https://docs.google.com/document/d/1HGcpJGpGbLCeA3VO8LFrQjxQqkYANdeoWbCKlCOnK0A/edit',
  title: 'Saint Graph Library',
  category: 'Other Controls',
  image: 'https://i.imgur.com/WEoBkBu.jpg',
  cost: 50,
  desc: `This perk provides an easy way to switch between Classes as a Demi-Servant. A Demi-Servant may save their current class configuration as a Saint Graph, a metaphysical template that stores abilities and memories of that Demi-Servant. Switching classes using  Saint Graphs requires directly accessing a Saint Graph Library in which the Demi-Servant has already saved a copy of the Saint Graph they wish to switch to. If the companion does not have any saved Saint Graphs of the class they wish to switch to, they must first switch to that class normally to be able to save that class configuration as a Saint Graph for future use. 
  <p>The Saint Graph Library itself exists to hold these imprints separate from any Throne of Heroes. Its primary form exists as a large server-sized device placed in a secure pocket space, or other location if you do not have one. Secondary form is that of a high tech briefcase. Saved Graphs may also be accessed via an app on the Company provided phone.</p>
  <p>If you already possess Warranty Plan, this provides an additional way to restore anyone under a Warranty plan by resummoning them via a saved Graph. This method treats the delay for a revival by summoning as the cooldown from Warranty Plan or 24 hours, whichever is lower.  This requires direct access to the Saint Graph Library the information is stored in, and a summoning circle.</p>
  <p>If a waifu is mission-killed in such a way that Warranty Plan could be activated to force a respawn, you can instead instantly resummon said companion through a Saint Graph.</p>
  `,
  whitelist: ['Demi-Servant'],
})

// Lure Expansions
export const DLClureExpansions: DLCPerk[] = []

DLClureExpansions.push({
  uid: 'Iimw9',
  dlc: 'Cyan-Rozen',
  title: 'Sticky Fingers: Alter-Flavor',
  category: 'Lure',
  image: 'https://i.ibb.co/GW0hX61/Sticky-Fingers-Alter-Flavor.jpg',
  cost: 10,
  whitelist: ['Sticky Fingers: Brown Sugar'],
  desc: 'You are now able to change to flavor of all of your bodily fluids(Ex..Chocolate,Cookies,vanilla,any flavored ice-cream,lemon,apples,liquor/beer....etc) this change is instant with just a thought. Additionally this perk synergies with both Faerie Feast and Sticky Fingers: Brown Sugar.',
})

DLClureExpansions.push({
  uid: 'quujp',
  dlc: 'Trismegistus',
  title: 'Maestro',
  category: 'Lure',
  image: 'https://i.ibb.co/8582cS9/Maestro.jpg',
  cost: 10,
  desc: `You may now influence the dreamer themselves, altering their mind and body within the dream to fit whatever role you grant them. This does not drastically change how much the dream influences them in the following days, but does allow for much more control over the experience. You may also alter the rate at which time passes in the dreams relative to real time, up to an 8:1 ratio.
  `,
  whitelist: ['Hypnos'],
})

DLClureExpansions.push({
  uid: 'nuDNq',
  dlc: 'DepressedAlucard',
  title: 'Arlo: Fluff is Life',
  category: 'Lure',
  image: 'https://i.imgur.com/0SwOqDtl.jpg',
  cost: 10,
  desc: `Sometimes a target is not interested in taking the bait. Maybe the waifu does not care for kids, or perhaps they are of a race incapable of having children. Where children do not work, a cute pet might. You are now able to make use of your beastly familiars as an alternative bait to draw in waifu. The effectiveness of this bait depends on the personality of the subject in question, where some waifu might be strongly drawn to a fluffy cat and others to a monstrous leviathan.
  `,
  whitelist: ['Arlo'],
})

DLClureExpansions.push({
  uid: 'nuDNn',
  dlc: 'DepressedAlucard',
  title: 'Lovespot: Signature Clothing',
  category: 'Lure',
  image: 'https://i.imgur.com/bTro7eTl.jpg',
  cost: 30,
  desc: `Sometimes, a individual is remembered not by their voice, nor their face but one particular article of clothing or accessory that stood out amongst the others. It could be a ring that they wore everyday and never bothered to take off, or a bright red coat easily spotted from far away. You may now choose to make one such article or accessory act as a love spot that catches the eyes of the target, drawing their attention and luring them in. Only an article that has been worn for a minimal duration of a month may be chosen to act as a love spot. You may choose to switch what article of clothing or accessory is used to another at any moment provided it meets the established requirements. Only one article of clothing or accessory can be made into a love spot at a time.
  `,
  whitelist: ['Love Spot'],
})

// DLC Heritages
export const DLCheritages: DLCPerk[] = []

DLCheritages.push({
  uid: 'TuIs2',
  dlc: 'Cyan-Rozen',
  title: 'Ascendant Human',
  image: 'https://i.ibb.co/dKWV6K9/Ascendant-Human.jpg',
  tree: 'Transhuman',
  category: 'Heritage',
  type: 'Self',
  cost: 0,
  costT: 4,
  whitelist: ['Singularity'],
  desc: 'Surpassing limitations is the very nature of transhumanism. You now can unlock the third Transhuman type. All Transhuman perks treat you as having all three types. When the aesthetics of three Transhuman types conflict, you may determine which one takes precedent.',
})

DLCheritages.push({
  uid: 'rBXUp',
  dlc: 'DaemonOrk',
  title: 'Dragon God',
  category: 'Heritage',
  image: 'https://i.ibb.co/TWBQrSn/Dragon-God.jpg',
  tree: 'Dragon',
  type: 'Self',
  complex: 'flavor',
  anything: 'Element',
  cost: 0,
  costT: 1,
  increment: true,
  whitelist: ['Elder Dragon'],
  desc: 'The dragon has ascended, as the elements bend to its might. There are so many left to discover, so why stop at just three? You may now pick an additional element per purchase of this perk. The price of this perk will increase by one ticket each time.',
})

DLCheritages.push({
  uid: 'rBXgh',
  dlc: 'DepressedAlucard',
  dlclink: 'https://docs.google.com/document/d/18LaGf5cy9hDA7ZAInhxVJoTocWfeLo0PI_msQsFu76Q/edit',
  title: 'Pillar of Reality',
  category: 'Heritage',
  image: 'https://i.imgur.com/plNzoTml.jpg',
  tree: 'Outsider',
  type: 'Self',
  complex: 'flavor',
  anything: 'Element',
  cost: 0,
  costT: 1,
  increment: true,
  whitelist: ['An Answer To Reason'],
  desc: 'As the presence of an Outsider grows, all of reality shudders. One aspect of it may no longer be sufficient to contain the spread of your reach. You may now select an additional Omen and associated Element with each purchase of this perk. You may choose which Omen will herald your approach, and may make use of several if you so desire. The price of this perk will increase by one ticket each time.',
})

// DLC Bindings
export const DLCbindings: DLCPerk[] = []

DLCbindings.push({
  uid: 'mU9YC',
  dlc: 'Despin',
  dlclink: 'https://docs.google.com/document/d/1-JLmjxufUDBH0uR4_DQOpyYEJ43pPWv37V9YD_wYoZ0/edit#',
  image: 'https://i.ibb.co/QfStyFN/Additional-Binding.jpg',
  title: 'Additional Binding',
  category: 'Binding',
  cost: 0,
  costT: 1,
  multiple: true,
  increment: true,
  desc: `
  You are no longer limited to a single Binding. You may now purchase an additional Binding and expansions. You must still spend the credits as normal. This perk may be purchased multiple times. Its price will increase by 1 ticket each time. You are able to decide what purchased binding effects, including mental, are applied to any or all of your retinue. For example, you could Bind someone with the Shroud, then use Third-Generation Symbiote to share access to the Symbiote’s bio-armor as well. 
  `,
  needed: 1,
  whitelist: ['Company Stamp', 'Tempest Jewelry', 'Ritual Circle', 'Alterzelu Symbiote', 'Shroud of Power', 'Hypnosis App', 'Tantric Arts'],
})

DLCbindings.push({
  uid: 'iH67D',
  dlc: 'Zenaku82',
  title: 'Triggered',
  category: 'Binding',
  image: 'https://i.ibb.co/nsCCxBx/Triggered.jpg',
  type: 'Jewelry',
  cost: 5,
  desc: `
  Tempest Chokers (Bracelets, anklets) are now programmable! You can now set up scripts for each of your companions, for each transformation. Even copy them over between companions.
  <p>These scripts allow you to automate any transformations the Chokers (bracelets, anklets) provide. Make a companion's breasts grow whenever she hears a specific phrase. Turn another into a bimbo whenever she chews a piece of gum. Or have one hulk out when they get angry. The choices are only limited by your existing transformation options.</p>
  <p>As well, for vocal commands, there is an option to set it to only work with a specific voice print. That way, you can choose who can and cannot trigger the change</p>
  `,
  whitelist: ['Advanced Tempest Runes (Mind)'],
})

// DLC Ride Perks

export const DLCridePerks: DLCPerk[] = []

DLCridePerks.push({
  uid: 'cSEJx',
  dlc: 'KatzSmile',
  title: 'Catch-A-Ride Custom Crew',
  category: 'RidePerk',
  image: 'https://i.ibb.co/VH89J0p/Catch-ARide-Custom-Crew.jpg',
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
  uid: 'R52oX',
  dlc: 'KatzSmile',
  image: 'https://i.ibb.co/qChNXY6/Catch-ARide-Crew-Tier-Upgrade.jpg',
  title: 'Catch-A-Ride Crew Tier Upgrade',
  category: 'RidePerk',
  cost: 40,
  desc: `
  <p>Perhaps you are not satisfied with the current power level of your crew.</p>
  <p>This purchase will let you fix that.</p>
  <p>One purchase and under your command now a crew equal to the T3 companions</p>
  `,
  whitelist: ['Catch-A-Ride Crew Production Program'],
})

DLCridePerks.push({
  uid: 'qbHdP',
  dlc: 'Despin',
  dlclink: 'https://docs.google.com/document/d/1-JLmjxufUDBH0uR4_DQOpyYEJ43pPWv37V9YD_wYoZ0/edit#',
  title: 'Catch a Ride Plus',
  category: 'RidePerk',
  image: 'https://i.ibb.co/ccb78tJ/Catch-ARide-Plus.jpg',
  cost: 50,
  special: 'Applies to all vehicles registered in the Catch a Ride App, up to the size category paid for.',
  costVariants: [50, 100, 200, 500],
  desc: `
  Cost: Small 50, Medium 100, Large 200, Gigantic 500.
  A contractor generally does not want to deal with vehicle upkeep and supplies. This perk provides unlimited fuel, ammunition, and maintenance to all covered vehicles. Also, a covered vehicle will quickly self-repair, as long as it has not been completely destroyed. 
  `,
})

DLCridePerks.push({
  uid: 'tnzQS',
  dlc: 'Despin',
  dlclink: 'https://docs.google.com/document/d/1-JLmjxufUDBH0uR4_DQOpyYEJ43pPWv37V9YD_wYoZ0/edit#',
  title: 'Extended Warranty',
  category: 'RidePerk',
  image: 'https://i.ibb.co/gtzX0N0/Extended-Warranty.jpg',
  cost: 100,
  desc: `
  Your Warranty now also covers any destroyed vehicles that you have registered in the Catch a Ride App. A destroyed vehicle will be re-delivered to you in 72 hours. If you have the Amazon-free Warranty DLC perk, that respawn timer will be applied to your vehicles as well. Respawned vehicles only come with their normal stores, and do not respawn any other items that were carried. Any subjects that die with a vehicle respawn per Warranty Plan. Any non-retinue fatalities are dead.
  <p>If one of your vehicles is mission-killed in a way that’s prohibitively difficult to undo (stuck in a black hole and such), an option in the company app will let you destroy it and force a respawn.</p>
  `,
  whitelist: ['Warranty Plan'],
})

export const DLCintensity: DLCPerk[] = []

DLCintensity.push({
  uid: 'otaEJ',
  dlc: 'Om1cr0n',
  title: 'Black-mark',
  image: 'https://i.ibb.co/sVcGpmn/Black-Mark.jpg',
  intensity: 0.8,
  special: 'Chargen only. May not be taken on DR11.',
  chargen: true,
  blacklist: ['Wage Slave', 'Fight For Your Right', 'One In Ten', 'Power Trip'],
  desc: 'You\'re blacklisted from using any of Company services after chargen, no new perks, no buying companions or rides - nothing. If you become qualified for new discounts after chargen by capturing new companions freed credits would stay dead on your account with no ability to spend them. Missions that give perks or tickets as a reward are still available, but you would not be able to receive those rewards. Help-desk is not available for you either instead you get limited ability to interpret vague rules in your favor.',
})
