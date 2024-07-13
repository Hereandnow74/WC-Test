import { PerkFull } from 'global'

export const rideDesc = `You purchase a fully-functional, full-size replica of well-known land, sea, air, and space vehicles from various universes. Land vehicles tend to range from 5 credits to 20, while sea and air vehicles typically cost 20 to 100 credits each. Space vehicles start at 100 credits and only go up from there. Some vehicles have special variants that may cost more or less than the listed price; their prices are noted in their entries. Others have add-ons that can be purchased and applied to any existing copy of that vehicle, even ones you acquired outside of this catalog. You may purchase as many separate vehicles from the showroom as you can afford, this includes multiple copies of the same vehicle.
<p>If you have Exit Stage Left and the portal’s time limit runs out while your vehicle is only part way through, the event horizon will stretch and swallow the rest of it before the portal closes. People touching the vehicle, whose weight is not supported by it, will be left behind, as will all hostiles.</p>
<p>Local vehicles may also be registered as yours, though they aren’t worth capture credits. You or a subject must be the last person to physically possess the vehicle. Our store app will then have a list of all such eligible vehicles and the options to register any or all of them. Our systems treat all registered vehicles identically to ones that you purchased from us.</p>
`

// Catch-a-Ride Perks
export const ridePerksFull = [] as PerkFull[]

ridePerksFull.push({
  uid: 'tJzJ5',
  title: 'Catch-A-Ride Crew Training Program',
  category: 'RidePerk',
  image: 'https://i.ibb.co/F3vk1fs/Catch-ARide-Crew-Training-Program.jpg',
  cost: 5,
  requires: 'at least one registered vehicle',
  flag: 'hasARide',
  desc: `
<p>We at the company fully realize that, in some cases, you and your waifus may lack the necessary skills needed to properly operate or maintain your chosen ride, which would make using them impractical at best and impossible at worst. To rectify that, for a small fee you can opt to have your newly purchased waifus undergo a 24 hour training course, during which all the skills needed to properly operate, repair, and maintain all your registered rides will be downloaded into their brains. Delivery of waifus will be delayed until completion of the course. For rides that are unusable without a particular genetic key, such as the Lantean City-ship, that key will be spliced into your crew and treated the same as any other skill.</p>
<p>For captured or pre-existing purchased waifus, you can opt to have them undergo an 8-hour training program via a company-approved VR system, during which they will gain the skills needed for proper manning of your rides. Purchase of additional vehicles may require further courses, should the tech bases be significantly different.</p>`,
})

ridePerksFull.push({
  uid: '2nFRE',
  title: 'Catch-A-Ride Crew Production Program',
  category: 'RidePerk',
  image: 'https://i.ibb.co/YkcBWLM/Catch-ARide-Crew-Production-Program.jpg',
  cost: 20,
  whitelist: ['Catch-A-Ride Crew Training Program'],
  desc: `
<p>Your basic manpower problems are over. Now your rides come with a full crew of company-issued clones, Each one is equivalent to a T2 waifu and comes with all the skills needed to properly maintain and repair your ride, while also being capable of rapidly acclimating to any upgrades that may be done. Combat-wise they are equal to the average soldier in a modern professional military and may require further training to be an effective combat force in a given alternate world.</p>
<p>All clones come with a demi-tattoo, establishing them as yours. See the Offspring section for details. They will not provide points should a higher binding be applied.</p>
<p>These clones initially lack their own sense of identity, but over time will come to develop their own unique personalities, interests and dislikes, as well deciding names for themselves, if they have not been given one. This process is hastened via interactions with yourself and your waifus, even influencing their own development.</p>
<p>For exceptionally large vehicles, typically those that cost 300 credits or more, this perk will be applied for free. If you have such a vehicle, a clone production facility will be integrated into the ship so you may replace your losses manually. This facility may also be used for other cloning programs if necessary. Otherwise, new replacement crew members will be shipped to you like any other purchased waifu.</p>`,
})
// #endregion

// #region talents
export const talentsDesc = `Like all company-supplied powers, the powers granted by these perks cannot be nullified, copied, or stolen. Some of these perks may be partly or entirely redundant, depending on your choice of Origin.
<p>Aside from Body Tune-Up and Everlasting and Blessed Talents, all Basic Talents are experience and skill acquisition multipliers, not flat improvements, and scale to the strength and skill of your opponents, rivals, and trainers: the better they are than you, the faster you learn, until you’ve caught up to them.</p>
<p>This rubberbanding effect also lifts any skill caps that may otherwise apply, first raising the cap to the skill level of the person you’re learning from - whether their role is intentional or not. With Talent Sharing, Co-op, PvP, or other situations where the person you’re learning from also has the same Basic Talent, the rubberbanding will benefit both of you at once, completely removing any skill cap for as long as the competition, spar, etc. continues.</p>
`
export const talents: PerkFull[] = []

talents.push({
  uid: '1t7o3',
  title: 'Body Tune-Up',
  category: 'Talent',
  image: 'https://i.imgur.com/X8P3N1ll.jpg',
  cost: 5,
  desc: `
<p>You lift. Your body is now in perfect fitness and health, with significant muscle growth, within healthy standards for your species. For most humanoids, if your natural height was less, you are now between 170 and 210 cm tall - or will be, if you aren’t yet fully grown. Your clothes are all resized and your muscle memory adjusted to fit. (You may opt out of this height boost.)</p>
<p>In the event of a mismatch, your body will change to match your gender identity, reflecting what you might have looked like if you’d been born as such, unless you created or maintained a mismatch with your choice of targets for Substitute or Possess. You knew what you were getting into when you did that.</p>
<p>All unwanted pre-existing medical conditions, from skin blemishes and unwanted body hair to chronic disease, missing limbs, detrimental genetic irregularities, and physical transformations are erased. (Cyborgs will find their reproductive system restored and augmentations optimized within their technological base.) This full heal will automatically trigger only once for each member of your retinue, including yourself: when you first purchase this perk or when the person joins your retinue, whichever happens second. You are immune to further minor illnesses, but not diseases or injuries. All healing or medical operations performed on you will complete without complications, residual pain, or unwanted scars.</p>
<p>The individual benefits of this Talent may also apply, at your discretion, to any/all of your purchased and captured subjects. Unwanted conditions are erased according to your wants, not theirs. If you purchased Extra, Substitute, or Possess, this perk will be retroactively applied to your new body, with the exception noted above.</p>
`,
})

talents.push({
  uid: 'nvlMp',
  title: 'Everlasting Talent',
  category: 'Talent',
  image: 'https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/yUENx.jpg',
  cost: 10,
  desc: `You live. You have weak immortality and eternal youth. If you are older than the peak age for your species (25 years for humans), your body is reset to that point; otherwise you'll continue to physically mature to that point but not experience any aging afterwards. This will not interfere with deliberate age-manipulation effects from within your retinue, whether from the company’s transformation suite or third-parties. If your maturation process had been halted by any means, it will now continue until your peak age. The "Fog of Ages," including atrophy of unused skills, will never affect you.
  <p>This perk will not make you unkillable or grant any form of auto-resurrection. It just means you won’t grow feeble and die of “natural causes,” so don’t try anything foolish. The benefits of this perk will always apply to your purchased and captured subjects, but you can disable it for specific individuals if you wish.</p>
  `,
})

talents.push({
  uid: 'qcpHF',
  title: 'Athletic Talent',
  category: 'Talent',
  image: 'https://fictionhorizon.com/wp-content/uploads/2021/12/Captain-Tsubasa-2018-1024x576.jpg',
  cost: 5,
  desc: `You can rapidly learn any non-supernatural athletic skills you encounter: acrobatics, physical sports, parkour, swimming, etc. Skills directly related to combat fall under Martial Talent instead, while supernatural extensions of skill are affected by Psychic, Soul, or other Basic Talents.
  `,
})

talents.push({
  uid: '1ycSB',
  title: 'Martial Talent',
  category: 'Talent',
  image: 'https://i.imgur.com/URtTDfml.jpg',
  cost: 10,
  desc: 'You fight. You have prodigious martial talent and can rapidly learn any personal, non-supernatural combat skills you encounter, whether melee or ranged. Supernatural extensions of martial skill are instead affected by Psychic, Soul, Science, or Land Talents. This Talent applies to both command ability and personal skill. ',
})

talents.push({
  uid: '5uqEL',
  title: 'Wild Talent',
  category: 'Talent',
  image: 'https://i.imgur.com/kFodAsxl.jpg',
  cost: 5,
  desc: 'You camp. You have a knack for living in the wilderness, with a natural feel for how to identify and make use of edible food, potable water, suitable shelter, animal tracks, etc. You know how to ride a mundane horse. In worlds that don’t use horses, you can quickly adapt your riding methods to whatever appropriate beasts are available.',
})

talents.push({
  uid: '4XdSq',
  title: 'Science Talent',
  category: 'Talent',
  image: 'https://i.ibb.co/2snqdq0/Science-Talent.jpg',
  cost: 20,
  additionalDesc: `
  To unlock new types of scientific magic beyond “styles anyone can use” and whatever might be unlocked by your Extra, Substitute, or Possess origin, use Added Potential or various Heritage perks.
  `,
  desc: `You know. You can keep up with scientific babble, operate any computer, smart device, or vehicle as if you grew up with it, and rapidly learn any scientific magic you encounter and are capable of using.
  <p>Many magical styles benefit from both Science and Soul Talents. In these cases, Science Talent helps you build skill and finesse, for improved spell complexity.</p>`,
})

talents.push({
  uid: 'g4t2B',
  title: 'Engineering Talent',
  category: 'Talent',
  image: 'https://i.imgur.com/lnDfQaIl.jpg',
  cost: 30,
  whitelist: ['Science Talent'],
  desc: 'Most so-called “mad scientists” are actually mad engineers. You can apply your natural knowledge toward practical purposes, whether personal or large-scale, for peace or war. Different engineering fields require different knowledge bases - just because Science Talent has taught you how one principle works doesn’t mean you can achieve the same result using a principle you haven’t learned yet.',
})

talents.push({
  uid: 'WSEsZ',
  title: 'Aesthetic Talent',
  category: 'Talent',
  image: 'https://i.ibb.co/G9WtDSk/Aesthetic-Talent.jpg',
  cost: 10,
  desc: 'You design. You have a prodigious talent in the visual arts: painting, sculpture, photography, fashion and makeup, etc. The creation of things that have practical purposes is instead covered under Engineering Talent.',
})

talents.push({
  uid: 'UPYkI',
  title: 'Communication Talent',
  category: 'Talent',
  image: 'https://i.imgur.com/ZE9EoQLl.jpg',
  cost: 10,
  desc: `
<p>You understand. You can read a room, spot deceit or employ your own, know when to speak and when to hold your tongue, and find the right words to say for good or ill. You will neither be That Guy whom women warn their friends about, nor the otaku nerd whose obsessions drive others away. This does not lend any additional power to your words - that’s what Siren’s Song is for - nor will it make you enjoy social interactions for their own sake. It only guarantees knowledge and competence.</p>
<p>Additionally, you are immediately fluent in any spoken language you encounter and will speak it like any native in only a few days, with mastery of the written form taking a week on average; this part always applies to your retinue as well. Finally, you have a prodigious talent for writing, regardless of whether the subject is fiction or nonfiction.</p>`,
})

talents.push({
  uid: 'qOpbF',
  title: 'Performance Talent',
  category: 'Talent',
  image: 'https://i.imgur.com/WBtHYg9l.jpg',
  cost: 10,
  desc: 'You express. You have a prodigious talent in the kinesthetic arts: music, dance, acting, etc. Audiovisual and stage production are instead covered under Engineering Talent.',
})

talents.push({
  uid: 'hQCaw',
  title: 'Soul Talent',
  category: 'Talent',
  image: 'https://i.ibb.co/MsvBc4N/Soul-Talent.jpg',
  cost: 10,
  additionalDesc: `
  To unlock new types of personal mystical arts beyond “styles anyone can use” and whatever might be unlocked by your Extra, Substitute, or Possess origin, use Added Potential or various Heritages.
  `,
  desc: `You feel. You have prodigious talent for ki arts (aura, chi, Hamon, Phonic Gain, Spiral Power, etc.) and magic, and will rapidly learn any such personal mystical arts you encounter and are capable of using.This does not apply to purely scientific forms of magic.
  <p>Many magical styles benefit from both Soul and Science Talents. In these cases, Soul Talent improves your improvisation ability and raw power.</p>`,
})

talents.push({
  uid: 'dAx79',
  title: 'Blessed Talent',
  category: 'Talent',
  image: 'https://i.ibb.co/3RR4NXR/Blessed-Talent.jpg',
  cost: 30,
  whitelist: ['Communication Talent', 'Soul Talent'],
  desc: `
<p>Fortuna and her peers smile upon you. Higher powers, whether they’re deities, demons, or merely greater elementals or other spirits, will warm up to you more quickly than just anyone. Blessings or gifts given to you will be more powerful or useful, and curses or smitings aimed at your enemies will be more effective, scaling to how much the specific higher power likes you compared to who- or whatever you’re calling upon them for.</p>
<p>If you are a god, the use of your own godly powers benefits from Soul Talent instead. In that case, if you also have Talent Sharing for this perk, it will remain useful for anyone in your retinue who calls upon your power.</p>`,
})

talents.push({
  uid: 'PGFje',
  title: 'Land Talent',
  category: 'Talent',
  image: 'https://i.imgur.com/TgUMw3Sl.jpg',
  cost: 30,
  whitelist: ['Wild Talent', 'Soul Talent'],
  additionalDesc: `
  To unlock new types of ambient mystical arts beyond “styles anyone can use” and whatever might be unlocked by your Extra, Substitute, or Possess origin, use Added Potential or various Heritages.
  `,
  desc: `
<p>You are one with the environment. You have additional prowess with magical styles that draw mystical power from one’s surroundings. This includes, but is not limited to, Warhammer’s Winds, a Planeswalker’s Lands, Geomancy, or anything powered by leylines or background magical fields. These arts and styles are more effective and easier to control.</p>
<p>Your green thumb also extends to agriculture, mining, and other forms of resource gathering.</p>`,
})

talents.push({
  uid: 'OQ6SY',
  title: 'Psychic Talent',
  category: 'Talent',
  image: 'https://i.imgur.com/Fv6o73rl.jpg',
  cost: 20,
  additionalDesc: `
  To unlock new types of ambient mystical arts beyond “styles anyone can use” and whatever might be unlocked by your Extra, Substitute, or Possess origin, use Added Potential or various Heritages.
  `,
  desc: `
<p>You think. You have prodigious psychic talent and can rapidly learn any psychic techniques you encounter: from the telepathy and telekinesis that are so common in otherwise-hard sci-fi to the extremes typical of western comic-book psychics. This applies to any supernatural ability with neither magical nor technological trappings, or is not otherwise covered by Science, Engineering, Soul, Blessed, or Land Talents. If an ability requires a specific organic component, such as Element Zero nodes, you must still acquire it by other means.</p>
<p>Unlike techniques, psychic powers such as To Aru Espers, Quirks, or the results of the X-Gene are distinct to the individual and cannot be copied directly. When this talent pings off of such a power, it instead helps you develop your own.</p>
<p>Projections such as Stands or Personas are subject to this Talent, not Soul. If you were not already capable of manifesting one, you are now theoretically capable of doing so, provided you have a Stand Arrow, someone who can awaken your Persona, etc. You can only have one such projection; if you already have a Persona when you’re pierced with a Stand Arrow, the Arrow will upgrade the Persona, and vice versa. Wild Cards (typically, those who Substituted or Possessed a Persona protagonist) are subject to their usual limit instead.</p>
`,
})

talents.push({
  uid: 'oScLP',
  title: 'Covert Talent',
  category: 'Talent',
  image: 'https://i.imgur.com/T1iNQX9l.jpg',
  cost: 10,
  desc: `
<p>You lie, cheat, and steal. You have a prodigious talent for larceny, trespassing, theft, espionage, counterintelligence, and other forms of covert activity, whether it’s performed on a government’s dime or not. You can disappear into any crowd, no matter how sparse.</p>
<p>This synergizes with many other Talents. For example, with Engineering Talent, you can learn to hack any device. With Communication or Performance Talents, you can grift the best con artists out of their money. With Aesthetic Talent, you can make perfect forgeries of any artist’s style. Body Tune-Up’s boost to athleticism also synergizes with this perk.</p>`,
})

talents.push({
  uid: 'oScLb',
  title: 'Administrative Talent',
  category: 'Talent',
  image: 'https://i.imgur.com/us3Mjlwl.jpg',
  cost: 10,
  desc: `
<p>You work the red tape. You have a prodigious talent for organization, logistics, and bureaucracy, using the available levers to smooth activities you favor and throw up obstacles for those you don’t. This applies to any form of administration, whether commercial, industrial, political, religious, educational, military, or criminal, and synergizes with many other Basic Talents, including Martial, Communication, Performance, Blessed, and Covert.</p>`,
})

talents.push({
  uid: 'xhM0D',
  title: 'Talent Sharing',
  category: 'Talent',
  image: 'https://i.ibb.co/C55Bgxn/Talent-Sharing.jpg',
  cost: 10,
  complex: 'flavor',
  desc: 'The effects of one of your purchased Basic Talents now apply equally to every member of your retinue, as if you had shared them through a Binding or Heritage perk. This must be purchased separately for each valid Talent: Athletic, Martial, Wild, Science, Engineering, Aesthetic, Communication, Performance, Soul, Blessed, Land, Psychic, Covert, Administrative, and Sticky Fingers (as “Tantric Talent”). Body Tune-Up and Everlasting Talent are always shareable. This perk is obsoleted by Controls or Heritage perks that share Basic Talents and may be refunded completely after such purchases.',
})

talents.push({
  uid: 'v4vTF',
  title: 'Inexhaustible',
  category: 'Talent',
  image: 'https://images2.imgbox.com/fa/e7/zYsq4729_o.jpeg',
  cost: 140,
  whitelist: ['Everlasting Talent', 'Drain Defense (2x)'],
  desc: 'You will never run out of inner mystical energies - vital, magical, psychic, or soul power - to fuel your abilities with. This perk does not help you use an ability that requires more energy than your reserve - that can be developed over time with training and Soul Talent - but any abilities below that threshold can be used freely. The benefits of this perk will automatically be shared with any of your subjects who are soul-bound to you, whether they’re connected by Conjunction, a familiar bond, or some other means. If you have Evolutionary Engine Array, the engines’ effective output and storage capacities will be doubled.',
})

talents.push({
  uid: 'Lg121',
  title: 'Added Potential',
  category: 'Talent',
  image: 'https://i.imgur.com/9JOv9lQl.jpg',
  cost: 5,
  complex: 'target_f',
  anything: 'Power Name',
  special: 'Must be repurchased for each use.',
  desc: `
<p>The rules of other worlds often bar just anyone from learning or developing special powers. Travelers often find themselves unable to learn any local abilities, even with the help of Science or Soul Talent, simply because they weren’t born in that world. This perk bypasses that limitation for any single ability local to any world that you or any subject have visited, or that you or any subject has, allowing the person it’s bought for, whether yourself or a subject, to develop it just like anyone else who would normally do so. “A single ability” can be quite broad, ranging from an X-mutation or Quirk unique to the individual, to Nasuverse Magecraft or Halkegenian Four Elements Magic. These are all generic abilities, in the context of their home worlds. Imaginary Tier abilities are not eligible.</p>
<p>Unlike Template Stacking I, this perk does not grant practical power immediately: all purchases start from level zero, as it were, and must be trained before they’ll become usable. Self-study can help in some circumstances, but is no substitute for a proper trainer, whether purchased or a local. Neither this perk, nor any perks that follow from it, will grant episodic memories or emotional connections of a life in the applied template’s source world.</p>
<p>Abilities that are generic in their source but are expressed uniquely, such as Sacred Gears, Semblances, Academy City Esper powers, Quirks, or the results of the X-gene, will be unique to you as well. You may not use company means to acquire more than one of each type of ability at a time.</p>
<p>If you purchase the same Potential for any ten individuals in your retinue, including through Power Swap or Template Stacking 1, the rest of your retinue will gain this perk for that specific template for free.</p>
`,
})

talents.push({
  uid: '1ujTI',
  title: 'Template Stacking I',
  category: 'Talent',
  image: 'https://i.ibb.co/rww384y/Template-Stacking-I.jpg',
  cost: 20,
  special: 'Doubles in cost for each application of this perk to the same individual. Must be repurchased for each use.',
  complex: 'target_f',
  anything: 'Power Name',
  desc: `
<p>Sometimes you just want to copy a powerset, either a generic one or a specific character’s. This perk lets you do just that. Only Imaginary Tier abilities, abilities that originated in other CYOAs, and abilities found elsewhere in this catalog, including the loadouts of other contractors, are not eligible. The exact capabilities at the time of purchase will be scaled to Tier 4. This perk is not necessary for any abilities that your subjects might grant you via surgery, ritual, or other means. Templates for characters who are only purchasable in sets must be bought separately. Templates for alternative versions of the same character must also be bought separately, unless otherwise specified. Characters who are represented as Specific Waifu Perks may be purchased as templates for individuals who are not eligible for the actual perks, whether natively or with Power Swap, and follow any mutual exclusivity rules stated in the perk descriptions.</p>
<p>All templates come with a skill framework, identical in principle to the ones that “early” captures receive to ensure they learn their missing abilities. This applies to technological abilities as well. Iconic equipment is included with this perk, but may see its parameters and functionality locked until you’re capable of using it safely or have trained enough with the more basic features.</p>
<p>After the skill framework runs out and you’ve achieved the typical heights of the template, the appropriate Basic Talent will let you continue to train beyond that point, as described in the opening of that section. Any familiars that would normally come with a template (i.e. are included with a purchase or Power Swap) must be purchased, captured or otherwise spawned separately.</p>
<p>For racial templates (Kryptonian, Metallic Dragon, Newtype, Saiyan, etc.), unlike Advanced Runes: Body, a living, natural example of that template is not required for your selection with this perk. Racial templates otherwise follow the same rules as in that perk.</p>
<p>Other powers that are only available to those who were born with them, such as hereditary magic systems, may be acquired through this perk at any time, just as with Added Potential.</p>
<p>Abilities that are generic in their source but are expressed uniquely, such as Sacred Gears, Semblances, Academy City Esper powers, Quirks, or the results of the X-gene, can be unique to you or copied from a specific character. You may not use company means to acquire more than one of each type of ability at a time.</p>`,
})

// talents.push({
//   uid: 'GSoHy',
//   title: 'Racial Template',
//   category: 'Talent',
//   image: 'https://i.ibb.co/yPfLWJJ/Racial-Template.jpg',
//   cost: 20,
//   complex: 'target_f',
//   anything: 'Race Name',
//   special: 'Chargen only (self). Moment of purchase only (retinue). Must be repurchased for each use.',
//   desc: `
//   <p>Racial templates (Kryptonian, Metallic Dragon, Newtype, Saiyan, etc.) have additional rules that distinguish them from other kinds. Templates that align with Heritages will not be equivalent to their counterparts. Unlike Advanced Runes: Body, a living, natural example of that template is not required for your selection with this perk. This perk may not be applied to your captures, nor to purchase Tier X racial templates. Your starting version of any racial template will be limited to Tier 4; you can train it up to its natural state in the same ways as other Meta-Talents.</p>
//   <p>Purchases of this perk are limited to one per individual and will overwrite the individual’s original race for all purposes. Advanced Runes: Hybrid or a geneticist, biomanipulator, or polymorpher of your own are required for creating hybrids.</p>
// `,
// })

// talents.push({
//   uid: 'Elihn',
//   title: 'OC Donut Steel',
//   category: 'Talent',
//   image: 'https://i.ibb.co/QDM4L0b/OCDonut-Steel.jpg',
//   cost: 20,
//   complex: 'target_f',
//   anything: 'Character name',
//   special: 'Must be repurchased for each, use.',
//   desc: `
// <p>Sometimes you just want to copy a specific individual’s powerset. This perk lets you do just that, for any individual short of Tier X. If you purchase this perk for yourself at chargen or for a retinue member at the time you purchase them, you get the power outright. The exact capabilities at the time of purchase will be scaled to Tier 4. As with Template Stacking I, abilities purchased using this perk can be trained higher in two ways. First, you will receive a skill framework for your purchase, identical in principle to the ones that “early” captures receive to ensure they learn their missing abilities. This applies to technological “abilities” as well: any iconic equipment included with this perk may see its parameters and functionality locked until you’re capable of using it safely or have trained enough with the more basic features. After the skill framework runs out and you’ve achieved the typical heights of the template, you can continue to train it beyond that level with the appropriate Basic Talent, regardless of whether the original version is rated at Tiers 4, 5, or 10.</p>
// <p> For characters that are made from multiple other characters, including the purchasable versions of many Nasuverse Servants in this catalog, each component must be bought separately. This perk does not grant racial abilities; that feature is restricted to Racial Template instead.</p>
// <p>If you purchase this perk for yourself after chargen, or, for a retinue member, after the time of purchase or capture, you may need to recreate the original user’s empowering event, if there was one. You will not make any mistakes or experience unwanted side-effects in the process. This perk is not necessary for any powers that your purchased or captured retinue members might grant you via surgery, ritual, or other means. Note that some origins suck more than others: speaking Truck-kun’s name into a mirror three times in a row is not recommended. Abilities found elsewhere in this catalog are not available through this perk, nor are abilities that originated in other CYOAs.</p>
// <p>For abilities that are generic in their source but are expressed uniquely, such as Sacred Gears, Semblances, Academy City Esper powers, Quirks, or the results of the X-gene, this perk will grant you the exact individual’s power you seek. This perk and Template Stacking I together may generate no more than one of each such power per individual.</p>`,
// })

talents.push({
  uid: '38YzF',
  title: 'Template Stacking II',
  category: 'Talent',
  image: 'https://i.imgur.com/9g24ZVHl.jpg',
  cost: 20,
  special: 'Must be repurchased for each use.',
  complex: 'target',
  whitelist: [
    'Extra',
    'Template Stacking I'],
  needed: 1,
  desc: 'You or your subject’s template is upgraded to a version of the template rated at Tier 5. This is a flat increase to starting power, skill, and gear functionality.',
})

export const additionalDefenseDesc = `
<h3 class="text-lf font-semibold text-center">The Outer Shell</h3>
<p>If you or a member of your retinue is a genius loci or otherwise large enough to hold people inside them, their passengers and cargo will be protected by Defense perks as well. This includes vehicles acquired via Waifu Perks or Catch-a-Ride, but does not protect against effects that originate from within the barrier.</p>
`
export const authorNote = `
<h3 class="text-lf font-semibold text-center">Authors Note</h3>
<p>Don’t let perfect protection get in the way of a good story. All quantitative specifics for each defense are left purposely vague so you can interpret them according to your needs.</p>
`
export const defenceDesc = `
<p>Defense perks protect you and your retinue members, regardless of whether they were purchased or captured, from the relevant effects. All Defenses are purchased in two stages. The first stage, or copy, of a Defense offers resistance to the effects it covers, and the second expands that to total immunity. Both purchases are the same price. The total cost of both copies appears in parentheses. No lasting effect inflicted on you that is covered by an active defense will ever be permanent - everything will wear off over time, depending on circumstance or the effect’s strength.</p>
<p>The descriptions for each Defense represent the starting points for each defense. At the resistance level, exposure to any specific effect allows you to gradually increase your resistance to it, making that effect weaker, less unreliable, and/or faster to wear off. Immunities are built separately for each specific type of effect, even if they both fall under the same defense - a single poison or disease, a single method of divination or mind control, etc. At most, resistance to one effect may partially apply to closely related other ones, such as a family of poisons with similar properties, a closely related family of pathogens, or a narrow school of divination or type of mind control method. Building up immunities to every effect can take centuries, for each member of your retinue, and those immunities will not be permanent. The second purchase of a Defense bypasses all of this, giving you blanket immunity to everything it covers.</p>
<p>Each Defense has an associated rebate, conditional on the traits of your Origin and retinue members, equal to the list price of the qualifying individual’s effective tier after step 1a and capped at 40% of the list price of each Defense stage. This is a canonicity factor and thus affected by Power Swap. Walk-in Origins are an exception, as they paid nothing to be themselves. One individual can qualify you for multiple rebates, but no individual may be applied to the same rebate twice. The sum of all rebates from the same individual is capped to the list price of the individual’s effective tier after step 1a. Rebate calculations ignore all modifiers to a retinue member after step 1a in their effective tier calculation.</p>
<p>If you have multiple separate rebates for the same Defense, they’ll stack: three full rebates to the same Defense will make one stage of it free and then reduce the second stage (if applicable) by 20%, while a total of five full rebates will make both stages free. If that happens, any extraneous free copies of that Defense from your Controls or Heritage perks will instead discount those perks by the Defense’s full value, up to the standard cap on that kind of discount. If you sell or otherwise lose a retinue member whose presence granted you a rebate, you’ll lose the rebate as well.</p>`
// #endregion

// #region defenses
export const defenses: PerkFull[] = []

defenses.push({
  uid: 'aWQ6N',
  title: 'Body Defense',
  category: 'Defense',
  special: '<Individual> is known for working with diseases, chemical medicine, or poisons.',
  image: 'https://i.imgur.com/aUwzOfwl.jpg',
  cost: 5,
  whitelist: ['Body Tune-Up'],
  desc: `
<p>You have protection from all diseases, poisons, and targeted radiation. Lethal or crippling afflictions will leave you sick enough to most likely stay in bed, unless you really have to move - because you're attacked, for example. Anything short of that will leave you weakened and uncomfortable, but functional.</p>
<p>Additionally, you get an extra one-time full heal, identical to the one offered by Body Tune-Up, with the first purchase of each level of this Defense. These are counted separately for each member of your retinue, including yourself and anyone acquired after the purchase of this Defense. These may be kept for future use.</p>
<p>This perk still does not protect against injury or provide any sort of healing factor; if you want one, you’ll have to find it yourself.</p>`,
})

defenses.push({
  uid: 'b4EJO',
  title: 'Wild Defense',
  category: 'Defense',
  special: '<Individual> hails from a harsh climate.',
  image: 'https://i.ibb.co/8BZQpfP/Wild-Defense.jpg',
  cost: 5,
  desc: 'You are equally comfortable on a glacier as you are in a sandy desert, steamy jungle, irradiated wasteland, or temperate floodplain. Combined with Body Defense, you are never at risk of suffocation in a gaseous atmosphere. You can dive far deeper than any human, provided you bring an air supply with you. At the base level, survival will not necessarily be pleasant. Non-fatal/crippling injuries (burns, crush or decompression injuries) are a real possibility.',
})

defenses.push({
  uid: 'F2dwT',
  title: 'Environmental Defense',
  category: 'Defense',
  special: '<Individual> can ignore hazardous environments.',
  image: 'https://i.imgur.com/6omxcijl.jpg',
  cost: 25,
  whitelist: ['Wild Defense'],
  desc: 'Wild Defense’s protections now apply to true extremes. allowing you to enter the oceanic abyss or hard vacuum, or even go sun-diving and live. This also protects against purposeless, degenerative, relatively mundane mutations. This perk does not protect against injuries.',
})

defenses.push({
  uid: 'qPMGm',
  title: 'Creature Defense',
  category: 'Defense',
  special: '<Individual> is known as a monster-tamer or otherwise being good with animals.',
  image: 'https://i.imgur.com/nxP4RkYl.jpg',
  cost: 10,
  desc: 'Non-sapient living things - beasts, flora, or fungi - will not attack you without provocation, i.e. coming too close to it, its family, its food, or its territory, or appearing too threatening, such by making sudden moves or loud noises. Wildlife will always attempt to obviously scare you off before attacking. Extremely hungry wildlife may still approach or stalk you to size you up, but will not ambush you, and you can scare them off with some effort.',
})

defenses.push({
  uid: 'GGsAU',
  title: 'Stress Defense',
  category: 'Defense',
  special: '<Individual> is known for keeping a cool head or having great willpower.',
  image: 'https://i.imgur.com/BUPHYJml.jpg',
  cost: 5,
  desc: 'Get that dirt off your shoulder. You can act calmly under pressure and are protected from degenerative mental effects.',
})

defenses.push({
  uid: 'm0vMX',
  title: 'Addiction Defense',
  category: 'Defense',
  special: '<Individual> known for having a material vice.',
  image: 'https://i.imgur.com/NaYs4nnl.jpg',
  cost: 10,
  whitelist: ['Stress Defense'],
  desc: '“The key word in that sentence is functional!” You can indulge in the joys of life without risking any sort of physiological or psychological dependence. At the resistance level, you will still experience cravings and withdrawal, but in a relatively mild form that you can push through with a bit of effort. This Defense also protects you from the relevant effects of your own lures, notably Faerie Feast and the Tantric Talent form of Sticky Fingers.',
})

defenses.push({
  uid: 'Y0qpD',
  title: 'Mind Defense',
  category: 'Defense',
  special: '<Individual> is known as a psychic or mind-manipulator.',
  image: 'https://i.imgur.com/nM4ZQmul.jpg',
  cost: 25,
  desc: 'You are protected from all mind control effects from outside of your retinue and unwanted attempts from within. Attempts to influence you will be weaker and you have an easier time noticing them and fighting them off. At least part of your mind will always remain beyond any control, leaving you free to fight your controller from within - creatively reinterpreting orders, temporarily suppressing or weakening their influence, leaving part or all of your body locked in indecisive spasms, or even throwing off their control entirely if what they\'re trying to make you do goes too far against your true self. Successful mind control within your retinue will require your consent, not the victim’s. Friendly psychics may still contact you or your retinue through telepathy.',
})

defenses.push({
  uid: '6lvj3',
  title: 'Possession Defense',
  category: 'Defense',
  special: '<Individual> is known for bodyjacking others.',
  image: 'https://i.imgur.com/uYKZg6Hl.jpg',
  cost: 10,
  whitelist: ['Body Defense', 'Mind Defense'],
  needed: 1,
  desc: 'Nobody controls your body except you. You are protected from parasites, spiritual possession, remote body control, and body-swapping shenanigans, whether you’re conscious or not. The same forms of resistance from Mind Defense can manifest with this perk as well.',
})

defenses.push({
  uid: 'l1Zz7',
  title: 'Drain Defense',
  category: 'Defense',
  special: '<Individual> can drain or feed on life, mana, or souls.',
  image: 'https://i.imgur.com/XMwNgsN.png',
  cost: 25,
  desc: 'You are the master of your soul. You are protected from all vitality-, mana-, and soul-draining effects. At the resistance level, attempts to feed on you will have diminishing returns, leaving your attacker unable to drain you completely. Waifus who feed on souls or lifeforce can get all the nutrition they need from you or your other waifus without causing harm, even from side effects such as loss of fluids. This protects you and your retinue from third parties, but not vice versa. This perk does not reduce the energy use from your own efforts in any way - you want Inexhaustible for that.',
})

defenses.push({
  uid: '2DooX',
  title: 'Fatality Defense',
  category: 'Defense',
  special: '<Individual> is known for inflicting instant death or not dying even when killed.',
  image: 'https://i.imgur.com/8BcXFkrl.png',
  cost: 50,
  whitelist: ['Everlasting Talent'],
  desc: 'Conceptual instant death and other soul-destroying effects may hurt and weaken you, but never kill you. Alternatively, you will be able to cling to life as a disembodied shade until your retinue can produce a replacement body for you to inhabit, or you simply force yourself to resurrect after some time.',
})

defenses.push({
  uid: 'zp1JD',
  title: 'Polymorph Defense',
  category: 'Defense',
  special: '<Individual> is known for polymorphing others.',
  image: 'https://i.imgur.com/pfd5Qonl.jpg',
  cost: 50,
  whitelist: ['Body Defense', 'Wyldscape Defense', 'Corruption Defense'],
  needed: 1,
  desc: `
<p>You can resist targeted supernatural transformations. Such attacks will take more effort and tend to remain incomplete and weaken you less than they should unless repeated for long enough. For example, an attempt to turn you into a tiny newt may turn you into a giant newt or a still-functional newt-man. Any loss of strength, durability, or similar traits from transformation will experience diminishing returns.</p>
<p>At the immunity level, If you are transformed in such a way, even before you were protected by this perk, you may easily reverse the effect, entirely or in piecemeal, at will. All detransformations in your retinue will require your consent, not the victim’s. Contagious transformations that you allow will not spread from you or your retinue to third parties unless you choose to let that happen as well.</p>`,
})

defenses.push({
  uid: '8ZlJ6',
  title: 'Wyldscape Defense',
  category: 'Defense',
  special: '<Individual> hails from a region where the local reality is unstable.',
  image: 'https://i.imgur.com/7J66Bitl.jpg',
  cost: 50,
  whitelist: ['Environmental Defense', 'Polymorph Defense', 'Corruption Defense'],
  needed: 1,
  desc: `
<p>You can resist ongoing supernatural transformations that just affect anyone who enters the area of effect.  The same forms of resistance from Polymorph Defense can manifest with this perk as well.</p>
<p>At the immunity level, if you are transformed in such a way, even before you were protected by this perk, you may easily reverse the effect, entirely or in piecemeal, at will. All detransformations in your retinue require your consent, not the victim’s. Contagious transformations that you allow will not spread from you or your retinue to third parties unless you choose to let that happen as well.</p>`,
})

defenses.push({
  uid: 'APuY1',
  title: 'Corruption Defense',
  category: 'Defense',
  special: '<Individual> is known for forcibly bringing out others’ dark sides.',
  image: 'https://i.imgur.com/NzbaAPT.jpg',
  cost: 50,
  whitelist: ['Mind Defense', 'Polymorph Defense', 'Wyldscape Defense'],
  needed: 1,
  desc: 'Metaphysically corruptive effects, whether environmental or targeted in nature, are slower to affect you, with diminishing returns the farther the corruption would take you from your fundamental self. After they wear off, you may choose to retain effects that would normally be permanent (plus any attendant transformations, if you have those defenses) as a sort of superpowered evil side, or a separate alter ego to converse with. These remain fundamentally you, just a different version of you seen through a different lens. Other Defenses such as Body, Stress, Addiction, Mind, and Drain may prove extremely useful, depending on the specifics of such a scenario.',
})

defenses.push({
  uid: 'iQJdn',
  title: 'Information Defense',
  category: 'Defense',
  special: '<Individual> is known for their ability to read or sense people.',
  image: 'https://i.ibb.co/pyMQQ2h/Information-Defense.jpg',
  cost: 25,
  desc: 'Scouters can’t read your power level. Information about you, from mind-reading, super-analysis, or metaphysical senses will tend to be unclear, incomplete, misleading or even flat-out wrong, or similarly unreliable - the more important any secret of yours is, or the more dangerous to you, the more difficult it will be to perceive, much less perceive accurately. This applies to both attempts from outside of your retinue and unwanted attempts from within, but not Conjunction. You may still allow friendly or neutral third parties to use such abilities on you.',
})

defenses.push({
  uid: 'xKBxa',
  title: 'Trace Defense',
  category: 'Defense',
  special: '<Individual> is known for using divination or other non-technological remote viewing.',
  image: 'https://i.ibb.co/QnTvtNz/Trace-Defense.jpg',
  cost: 50,
  desc: 'You are the master of your trail. Hostile and neutral remote viewing attempts: precognition, postcognition, scrying, dream visitation, etc. will have a harder time perceiving you. The same forms of resistance from Information Defense can manifest with this perk as well. At the immunity level, supernatural observers might only see a world where you don’t exist. This does not apply to direct naked-eye observation, other forms of mundane (technological) surveillance and analysis, or Dragon Aura’s pull on higher-tier waifus.',
})

defenses.push({
  uid: '5riTA',
  title: 'Destiny Defense',
  category: 'Defense',
  special: '<Individual> is known as a fate- or luck-manipulator.',
  image: 'https://i.ibb.co/JpqTDcM/Destiny-Defense.jpg',
  cost: 50,
  desc: `
<p>You are the master of your fate. Attempts to change your fate or luck will be more difficult, less reliable, and weaker than they would normally be - increasingly so the more directly they target you instead of just your surroundings, the more improbable they are, and the more precision they require. Changes that do go through will be more easy to reverse than they would be otherwise.</p>
<p>As with the other Defense perks, you may still experience any beneficial effects of these sorts of manipulation even if you have the second perk for immunity.</p>`,
})

defenses.push({
  uid: 'djI69',
  title: 'Paradox Defense',
  category: 'Defense',
  special: '<Individual> is known as a time-manipulator.',
  image: 'https://i.imgur.com/Wklr4B8l.jpg',
  cost: 50,
  desc: `
<p>You are the master of your timeline. Temporal slowdowns will have increasingly weaker effects on you the stronger they are - a weak slowing effect will be even weaker, but a stronger one and even a total time-stop will not leave you completely unable to react. You will retain memories of previous timelines, loops, or other resets, even if they are faded or incomplete, and any attempts to spy on or change your timeline will have the same problems mentioned under Information, Trace, and Destiny Defenses. Attempts to erase you entirely will merely leave you weakened, faded, or flickering into and out of existence randomly.</p>
<p>This perk also blocks forced unwanted teleportation, whether that involves sending you somewhere else or sending something into your current position. Resistance to such effects may make the teleport require more effort or send you somewhere inconvenient to both yourself and the teleporter.</p>`,
})
// #endregion

// #region Misc Perks
export const perks: PerkFull[] = []

// perks.push({
//   title: 'Temporal Calibration',
//   image: 'https://i.ibb.co/BCBHDkS/Temporal-Calibration.jpg',
//   cost: 5,
//   desc: 'Entering a new world, only to learn that the capture targets are out of your strike zone, can be… inconvenient. With this perk, the ages of any canon characters can be freely adjusted. Any events of canon that would be affected by the altered ages are adjusted as little as possible to keep the same general flow of events, keeping the scenario recognizable even though the participants are possibly decades older or younger. Changes created using this perk, or any perks that have this as a prerequisite, cannot fundamentally shift a setting’s danger rating.',
// })

// perks.push({
//   title: 'Universal Calibration',
//   image: 'https://i.ibb.co/B2Z3rv4/Universal-Calibration.jpg',
//   cost: 20,
//   whitelist: ['Temporal Calibration'],
//   desc: `
// <p>The targeting algorithms for your methods of multiversal travel are biased in your favor. Whether you use the Exit Stage Left or Rainbow Bridge perks, multiversal Heritage abilities, your waifus’ powers, or even local technology, you will usually end up in a place where the population is more… suited to your tastes. All inhabitants will be more attractive to you, personally. This includes and builds upon the effects of Temporal Calibration. Additionally, your sexual fetishes and other preferences will be unusually common on the worlds you visit, with listed capture targets sharing at least some compatible interests… unless that runs counter to your own.</p>
// <p>The above standard calibration is a best-guess preset based on your likes. You can fine-tune the specific settings, define and swap among multiple presets, and even reset all conditions to the default, in an app on your smart device. Your currently-chosen calibration, whatever the specifics, will modify every world that you visit for as long as it remains active. This includes worlds that you’ve visited previously: you’re actually entering a parallel worldline that’s identical in every way except for your presence and the effects of the calibration. To visit a previous calibration-worldline, simply exit the world, close the portal if there is one, recalibrate, and re-enter.</p>
// <p>Neither your Pocket Apartment nor your vehicles granted by Catch-a-Ride or Heavenbuilt Proto can be affected by recalibration. If left behind in an old worldline when you recalibrate, the vehicles will bounce forward into the new one; if you have Life's a Beach, the vehicles may instead return to their parking/docking/landing site.</p>`,
// })

perks.push({
  uid: 'ZVCai',
  title: 'Universal Calibration',
  category: 'Misc',
  image: 'https://i.imgur.com/EWG1gya.png',
  cost: 10,
  desc: `
<p>You now have limited access to our advanced targeting algorithm when you use perks that allow you to visit new worlds. This includes the selection of your starting world, the use of Exit Stage Left, and Heritage travel perks such as Dragon Break and “The Day You Almost Caught-”.​</p>
<p>We take your personal preferences into account, allowing you to visit a specific timeline with local capture targets that are within your strike zone regarding age, sex, sexuality and attractiveness. Our system prioritizes capture targets, but many changes will necessarily filter out into the general population as well.</p>
<p>The canon timeline will be preserved as much as possible, to maintain the same general flow of events and ensure that key events are recognizable, even though the participants are possibly decades older or younger. This perk cannot fundamentally shift a setting’s danger rating or make individual targets higher or lower tier.</p>
`,
})

perks.push({
  uid: 'ZVCao',
  title: 'Universal Calibration II',
  category: 'Misc',
  image: '',
  cost: 20,
  whitelist: ['Universal Calibration'],
  desc: `
<p>You have greater access to our advanced targeting algorithms when using travel perks to visit new worlds. We take your personal preferences into account, even more than with the prerequisite to this perk!​</p>
<p>You can now request a number of specific divergences equal to the highest tier subject in your retinue, to a maximum of 10. We honor every request to at least some degree, but certain requests might have unexpected side effects. The more audacious the request, the more inspired the result can be. Some requests can change the danger rating of the world, influencing your starting budget when used during chargen.​</p>
<p>If you’re having trouble deciding, or are feeling lucky, you can instead allow your subconscious to fill in the details, with no strict limit on the number of changes. The results of this can be wildly unpredictable, but are unlikely to affect the danger rating of your starting world.​</p>
<p>You can search for crossover worlds, combining the characters, locations, and events from each component world. The type of crossover world is hard to predict. It could result in a blended fusion world, with multiple characters of the same archetype from the component worlds merged together; different regions that each contained everything relevant in their entire worlds now existing separately in the same world; separate worlds connected by stable portals; or something else entirely.​</p>
<p>Crossover worlds usually have a danger rating equal to the highest of all component worlds. Multiple local threats focusing on each other instead of the general populace can, rarely, result in a lower danger rating than the general rule, but never by more than one tick.​</p>
`,
})

perks.push({
  uid: '1MpQL',
  title: 'Meta Shift',
  category: 'Misc',
  image: 'https://i.ibb.co/vv1g4Sq/Meta-Shift.jpg',
  cost: 15,
  whitelist: ['Universal Calibration II'],
  desc: `
<p>An unwitting anime protagonist once stumbled into a portal to the “Real World,” discovered an anime convention after being mistaken for a cosplayer, and brought back (hentai) doujins as proof of her experiences. The next time she opened one of the doujin volumes, however, she saw only blank pages, as her world mistook the stories within for anecdotes that hadn’t occurred yet and integrated them into its common sense. She remained the only one in her world who was aware that it wasn’t always as erotic as it quickly became.</p>
<p>This perk allows you to do just that, via a special app in your company smart device. Any physical copy of merchandise or doujin material may be permanently sacrificed through this app, in an inherently destructive process. A material’s effectiveness scales with its artistic quality, with no requirement that it be purchased. Materials that anyone in your retinue created yourselves, even with Aesthetic or Communication Talents, work just fine. Materials sacrificed must have been created in other worlds, including your Demiplane or Dungeon. Multiple sacrifices may be applied to the same world, whether simultaneously or successively, but each sacrifice may only affect a single world. If you sacrifice material while anyone in your retinue is within the target world, the changes will proliferate over the course of the next week (168 hours). Otherwise, the changes will have already taken full effect the next time anyone in your retinue visits.</p>
<p>Contractors and their subjects, including their Demiplanes, Dungeons, and registered Catch-a-Ride vehicles including Heavenbuilt Proto, may, by the contractor’s choice, be directly affected by these alterations. By default, they will be aware that any differences created are not the standard way of things, but must discover the exact nature of the changes themselves. Cheat-sheets detailing these alterations, beyond the general theme, are not available.</p>
<p>Alternatively, every member of the contractor’s retinue who calls the altered world home may be affected, all of the contractor’s subjects, or the contractor as well. The contractor may also choose to only accept physical changes to their retinue, limit mental changes to common knowledge and episodic memories of any altered pasts, or accept all changes. As with Advanced Tempest Runes, any sufficiently-disabling effect on the contractor will have an automatic time limit of 48 hours so they don’t get stuck. If they return to that same transformation within 10 minutes, the time limit will be doubled each time until their streak ends. The contractor may set a shorter limit if they like.</p>
<p>Potential reality alterations include, but are not limited to: hentaification of a wholesome setting and vice versa, common fashions, aesthetic eras, large-scale genre rewrites, and fusing the target setting with the specific one represented by the sacrificed material (if one exists). This perk, and any that follow from it, follow a karmic balance of sorts: it will not cleanly resolve any problem in a world without introducing at least the same number or degree of new ones.</p>
<p>A fusion setting will have the highest danger rating of all components, but will not add any actual characters from the material’s setting. Instead, the target setting’s locals will be matched to their closest equivalents and their roles and abilities changed to fit, while still remaining recognizable as themselves; this can affect their individual tier ratings. The one exception to this is for worlds with many alternative continuities, where members of a common cast are present in some continuities but not others. This most frequently occurs in the western superhero genre, but is not limited to such. This perk can spawn in missing cast members with no penalty other than the karmic balance.</p>`,
})

perks.push({
  uid: 'pE8KJ',
  title: 'Meta Shift II',
  category: 'Misc',
  image: 'https://i.ibb.co/QQ1W0FX/Meta-Shift-II.jpg',
  cost: 10,
  whitelist: ['Meta Shift'],
  desc: `
<p>The results of Meta Shift are vastly expanded. Sacrifices previously made may now be copied and pasted to affect other worlds, without an additional copy of the material. You may now remove a particular sacrifice’s impact on a target world. This will not return the material, but the effect may be re-applied to the same world (or a different one) at a later time. Removed effects have the same cooldown and conditions as new effects.</p>
<p>You may also apply different sacrifices or combinations of such to different parallels of the same target world. These may be accessed separately via Exit Stage Left or Rainbow Bridge perks, multiversal Heritage abilities, your waifus’ powers, or even local technology.</p>
<p>Additionally, the app will now include detailed cheat-sheets for each world’s changes. Any modifications you make to these lists will be reflected in the target world. This is far more intricate and precise than just using raw sacrifice results, but may be overly daunting to the average contractor.</p>`,
})

perks.push({
  uid: 'QdLMY',
  title: 'Blank Slate',
  category: 'Misc',
  image: 'https://i.ibb.co/fGnn30j/Blank-Slate.jpg',
  cost: 75,
  whitelist: ['Meta Shift II', 'We Will Meet Again'],
  desc: `
<p>The Meta Shift app can now generate a fresh parallel of any world you’ve visited at any time. You can apply or remove sacrifice results to these new parallels just like anywhere else.</p>`,
})

perks.push({
  uid: 'KV8cc',
  title: 'Sexual Calibration',
  category: 'Misc',
  image: 'https://i.ibb.co/K7gQYm0/Sexual-Calibration.jpg',
  cost: 2,
  desc: 'The little inconveniences that can make sex less fun no longer apply to you. Your partners will always be as clean as needed and smell just as you like. If you have a refractory period, it is removed. Any unintentional or incidental damage that your sexual sessions might cause simply doesn’t take place. This includes unwanted pregnancy and any complications of pregnancy; note that this perk cannot guarantee a desired pregnancy. Exhaustion will not be an issue for any participant in your sexual sessions until at least you are satisfied. You can extend all of this to your partners as well.',
})

perks.push({
  uid: 'xeouX',
  title: 'Fertility Calibration I',
  category: 'Misc',
  image: 'https://i.ibb.co/G2WTbBZ/Fertility-Calibration-I.jpg',
  cost: 2,
  whitelist: ['Sexual Calibration'],
  desc: 'You now have total control over the chances of pregnancy in any sexual encounter involving you or a member of your harem, even overriding any fertility control your waifus may employ. This perk does not alter the chance of multiple fetuses relative to the chance of just one.',
})

perks.push({
  uid: 'E3Enf',
  title: 'Fertility Calibration II',
  category: 'Misc',
  image: 'https://i.ibb.co/yPWN4MX/Fertility-Calibration-II.jpg',
  cost: 6,
  multiple: true,
  max: 8,
  whitelist: ['Fertility Calibration I'],
  desc: `You can now ensure that a sexual encounter involving anyone in your retinue will result in twins. This perk may be purchased up to eight times, with each purchase allowing you to guarantee up to twice as many fetuses: second purchase quadruplets, third purchase octuplets, fourth purchase 16, etc. This perk does not apply to Symbiote larvae or other spawn with a different body structure than yourself.
  <p>A sufficiently large pregnant belly will count as an opponent for the purpose of Athletic Talent.</p>`,
})

// Navigation Perks

perks.push({
  uid: 'msjnG',
  title: 'Mapper',
  category: 'Misc',
  image: 'https://i.ibb.co/F8wy1xx/Mapper.jpg',
  cost: 10,
  desc: `
<p>This app offers maps of the current world you’re on, with points of interest annotated. No information that could not be discovered by casually asking around is listed, so while a public facing organization like a merchant's guild will be annotated, the local thieves' guild will not. This map will update itself if you discover a point of interest that would normally be left off of the map. You are also able to search for points of interest. Tapping on a point of interest (or the equivalent for your smart device) will bring up a short description of it. You can add any number of your own annotations to the descriptions. Descriptions will update in real time if there are significant changes, such as a store closing.,</p>
<p>If you have Rainbow Bridge, you can toggle to any world you have access to at the current time.</p>`,
})

perks.push({
  uid: 'H2VdK',
  title: 'Target Tracker',
  category: 'Misc',
  image: 'https://i.ibb.co/2jSnGdg/Target-Tracker.jpg',
  cost: 10,
  whitelist: ['Mapper'],
  desc: 'This app adds the ability to track any mobile target you take a picture of, whether it’s a person, a vehicle, or anything else capable of moving under its own power, appearing as a stylized but recognizable icon of the tracked target. Basic status information will also be displayed if you tap on the icon. You can hide specific icons and cancel tracking of a target at any time. You will need to take a new picture of a target once you cancel tracking if you want to resume. “Missing” familiars of retinue members you’ve captured, who didn’t have their familiars yet when you did so, will automatically be entered into this tracker.',
})

perks.push({
  uid: 'B5bIp',
  title: 'Bounty Tracker',
  category: 'Misc',
  image: 'https://i.ibb.co/41KHd9r/Bounty-Tracker.jpg',
  cost: 50,
  whitelist: ['Target Tracker'],
  desc: 'This app integrates the catalog bounties with the map. Any bounty targets listed in the catalog for the current world can be added as tracked targets. Additionally, for any captures that you acquired “early,” the familiars and standard equipment that they would have if you had purchased them will automatically appear in this app, with different markers than the ones used for new bounties.',
})

// Travel Perks

perks.push({
  uid: 'kiLqi',
  title: 'Exit Stage Left',
  category: 'Misc',
  image: 'https://i.ibb.co/1rgFZ61/Exit-Stage-Left.jpg',
  cost: 5,
  desc: `The company app in your smart device has a new feature. Its main display is simply a progress bar that measures everything you and your subjects do in each world you visit, whether that’s capturing local waifus, defeating baddies, or otherwise accomplishing story goals. Once a world’s bar is full, a button on the screen will light up that opens a portal to a randomized new world within one danger level of that world. (If you have Pocket Apartment or We Will Meet Again, you can easily progress multiple worlds in parallel.) If you purchase this perk after chargen, it will still count everything your retinue has done in each world visited since the start of your contract.
  <p>These portals are one-way only and will last no more than two minutes or until you and all of your waifus have passed through, whichever is shorter. This includes any vehicles your group is using. If any of your waifus stay behind, this perk will not help you retrieve them.</p>
  <p>If your destination world has a lower danger rating than the world that you unlocked it in, a second “penalty” bar will appear above the regular progress bar. It must be filled before the regular progress bar will start to move. The larger the gap between the two ratings, the more work you’ll need to do in the new world.</p>`,
})

perks.push({
  uid: '5Bdq7',
  title: 'We Will Meet Again',
  category: 'Misc',
  image: 'https://i.ibb.co/DD836zP/We-Will-Meet-Again.jpg',
  cost: 15,
  whitelist: ['Exit Stage Left'],
  desc: `You may freely return to previously-visited worlds using the Exit Stage Left app. All worlds you’ve visited since the start of your journey, including your Pocket Apartment if you have one, will be listed with their danger ratings. (Pocket Apartment does not have a danger rating.) You can sort the list alphabetically, by danger, or by your first or most recent visits. Your return portal will always be within 2 km of its last location, at the least dangerous point in that radius. If you have not purchased Pursued by a Bear, Exit Stage Left’s basic functionality will now display the next world’s danger rating. Time is assumed to pass at the same rate in every world you visit, including your Pocket Apartment, unless you explicitly use magical, technological, or other means of time travel or dilation.
  <p>This perk also enables travel to any world that any of your subjects have visited personally, even if you haven’t been there yourself. This often occurs when subjects have their own method of multiversal travel, or were stolen subjects in PvP or purchased Slightly Used. For inter-contractor safety, the latter two cases will not permit travel to the exact parallels that their previous owners captured, sent, or brought them to. Instead, they will unlock new instances of each world visited. After the previous owner sells a subject, we take a snapshot of the world as it is the next time that none of the previous retinue are present in that world, then copy that state to create a new instance for your use. Without Slightly Used or Yoink, all purchased subjects have only been to two worlds: the world you bought them in and the factory where they were made. Don’t bother trying to go there. It’s employees-only.</p>
  `,
})

perks.push({
  uid: 'GTKzW',
  title: 'Pursued by a Bear',
  category: 'Misc',
  image: 'https://i.ibb.co/jTRQG0k/Pursued-By-ABear.jpg',
  cost: 40,
  whitelist: ['Exit Stage Left'],
  desc: 'The Exit Stage Left app now allows you to select your next world. It will offer seven worlds to choose from, with their danger ratings clearly displayed. Worlds may have any danger rating. In addition to choosing a world, you can also save an option for later or reject one outright. Rejected world choices will not appear for the next selection. Saved choices will continue to appear until you choose them. Choices that you don’t go to, save, or reject will return for up to three selections including the first. After the third miss, it will stop appearing for a time, until the randomizer offers it again. Rejected worlds will never reappear, unless you remove them from the app’s list of rejected worlds.',
})

// perks.push({
//   title: 'The Bigger Fish',
//   image: 'https://i.ibb.co/brRnwYD/The-Bigger-Fish.jpg',
//   cost: 30,
//   whitelist: ['Pursued by a Bear'],
//   desc: 'The Exit Stage Left app now offers seven worlds instead of just three. Destination worlds can now be of any danger rating.',
// })

// Miscellaneous Perks

perks.push({
  uid: 'LlFi4',
  title: 'Memoria',
  category: 'Misc',
  image: 'https://i.ibb.co/TYv7sc9/Memoria.jpg',
  cost: 5,
  whitelist: ['Possess'],
  special: 'Chargen only',
  chargen: true,
  desc: 'You… actually want the episodic memories and emotional connections of your Possess target? We can do that. The extra data will be downloaded into your Possess target alongside your own personality. As with Extra and Substitute, you can distinguish between your original memories and those of your Possess target without difficulty.',
})

perks.push({
  uid: '3SEKz',
  title: 'Psychic Paper',
  category: 'Misc',
  image: 'https://i.ibb.co/VStW4pq/Psychic-Paper.jpg',
  cost: 5,
  desc: 'Exactly like in Doctor Who, this blank white card shows the reader whatever you want them to see. In most practical cases, this will likely be a form of local identification, but that\'s far from the only use. Psychic paper will not work on geniuses or people with feeble imaginations. People with basic psychic training are also immune; powerful psychics can reflect its effect back on the user. Illiterate people can still read psychic paper, provided their civilization has invented writing.',
})

perks.push({
  uid: '0WR5N',
  title: 'Heavenbuilt Proto',
  category: 'Misc',
  image: 'https://i.ibb.co/28vbybD/Heavenbuilt-Proto.jpg',
  cost: 0,
  costT: 2,
  desc: `
<p>Run the Built in the <a href="https://imgur.com/gallery/dUkFmZF" target="_blank" rel="noopener noreferrer" class="text-red-500 hover:underline">Heavens CYOA</a>, (<a href="https://built-in-the-heavens.neocities.org/"  target="_blank" rel="noopener noreferrer" class="text-red-500 hover:underline">interactive version</a>), ignoring the origins choice and all personal perks. The only allowed complications are the ones that grant followers. These followers will count as their original inspirations: Broken Toy (YorHa A2), Jewelled Collar (Starfire and Blackfire), All According to Plan (Taldeer), Yan Yan Dere Dere (Just Monika), Forgotten and Lost (Dragon from Worm, in the body of Cibo from Blame!) or A Loyal Vizier (Caster Tamamo-no-Mae). From Heights Brought Low (Shub-Niggurath) must be purchased separately. These followers cannot be refunded for credits, so you should only take the ones you want. Otherwise, follow its rules as written.</p>
<p>You will start aboard your ship, in the same star system as your starting world, unless you also purchased Life’s A Beach. Your ship's AI counts as a purchased waifu of Tier 6. Alternatively, you may plug one of your purchased or captured waifus into your ship to make her a pseudo-AI or shipgirl and take a 50-credit toward future purchases, you monster. All characters with alternate outfits, shown in any official source, will find them stored in their room or closet.</p>
<p>In addition to the ship’s Imaginary Tier-granted multiversal capability, if you have a subject capable of time-travel, they'll be able to channel their power through your ship so it can make such journeys too, even if you keep the Heavenbuilt AI as a separate subject.</p>
`,
})

perks.push({
  uid: 'aB6sr',
  title: 'Piece of Silver',
  category: 'Misc',
  image: 'https://i.ibb.co/QjWz9fg/Piece-Of-Silver.jpg',
  cost: 0,
  costT: 2,
  desc: 'Whoever warned you not to pick up loose change was right. You are now partnered with a Denarian fallen angel from the Dresden Files, either Lasciel (“Lash”) or an OC of your (author’s) design. If you have No Bindings or the Stamp, she will be bound to her coin, able to assume a physical form within a 10 meter radius of her coin or you but not able to touch her coin herself: if it moves, so must she. If you have at least a company-provided personal space, such as Dragon Cabin, Pocket Apartment, or a registered Catch-a-Ride vehicle, she will be able to move anywhere inside. If you have a higher binding, that will replace her coin and remove her physical leash completely. Your other purchased and captured waifus can see, hear, feel, etc. the Denarian at all times.',
})

perks.push({
  uid: '4qh4k',
  title: 'Warranty Plan',
  category: 'Misc',
  image: 'https://i.ibb.co/Mp0vpwj/Warranty-Plan.jpg',
  cost: 160,
  additionalDesc: `
  For the purpose of this perk, an "amazon" is:
<ul class="list-upper-alpha list-inside">
  <li>A waifu who identifies as an Amazon.</li>
  <li>A female warrior from a female-dominated warrior society.</li>
  <li>A female warrior from a gender-equal primitive society.</li>
  <li>A warrior in an all-female military unit.</li>
  <li>A warrior from a monogender-female species.</li>
  Soldiers do not count for conditions B, C, D or E. Neither do female warriors, rulers, or outlaws from male-dominated societies. Body type does not matter.
</ul>
  `,
  desc: `
<p>Any purchased or captured subject who dies on you will be re-delivered to you at no additional cost. This perk will not help if you die, even if you took the Substitute or Possess origins. The default respawn time for your subjects is 90 days (2160 hours). Respawned subjects will retain all of their previous incarnation’s memories, including anything related to their previous incarnation’s cause of death, except for some minor trauma reduction. All relevant effects of Lures, Binds, Perks, and waifu perks will be re-applied before shipment. If you have Everlasting Talent, characters whom you’ve blacklisted from it will be considered expendable and their automatic respawn will likewise be disabled; you may still trigger it manually.</p>
<p>Each amazon you purchase or capture will reduce the respawn timer by 1 day (24 hours), to a soft limit of 60 days. Additional amazons in your retinue after the first 30 will still decrease the timer, but are subject to Diminishing Returns. See the appropriate section in Additional Rules for details.</p>
<p>If a subject has a soulbound artifact along the lines of an Exaltation or Sacred Gear, an exact duplicate of the artifact will be produced for her specifically, and persist through respawns, while the original one released back into the waifu’s homeworld. You will also benefit from this feature, if one of your subjects resurrects you with their own abilities.</p>
<p>If a subject you’ve Stamped dies before the full tattoo can complete, the company will send you a fresh copy, free of charge. This is not affected by the amazon respawn bonus above. This death must occur through no fault of your own: any intentionality to the individual’s death on your part, including both deliberate action and knowing inaction, but not unintended consequences from deliberate action, will void that individual’s warranty.</p>
<p>If one of your subjects is merely mission-killed in a way that’s prohibitively difficult to undo (petrified, stuck in a black hole, etc.), an option in the company app will let you actually-kill their current body and force a respawn.</p>
`,
})

const warranty2 = { ...(perks.find(p => p.uid === '4qh4k')), uid: '4qh5k', cost: 40, complex: 'target' }
perks.push(warranty2)

perks.push({
  uid: '4qh4k',
  title: 'Express Delivery',
  category: 'Misc',
  image: 'https://i.imgur.com/b519IuD.jpg',
  cost: 640,
  desc: `
<p>You are now on the priority list for warranty resurrections. The default respawn time for your subjects is now only 72 hours. Each amazon you purchase or capture will reduce the timer by 1 hour, to a soft limit of 48 hours. Additional amazons in your retinue after the first 24 will still decrease the timer, but are subject to Diminishing Returns.</p>
`,
  whitelist: ['Warranty Plan'],
})

perks.push({
  uid: 'hrfse',
  title: 'Green Eye Orb',
  image: 'https://i.imgur.com/3l6m9ccl.jpg',
  cost: 10,
  category: 'Invasion',
  desc: `This is your invitation to any one of the company’s exclusive clubs for contractors. You can bring up to three members of your retinue to eat, drink, game, make new friends and rivals, and do business with other contractors and retinues at these neutral grounds. Both indoor and outdoor environments and services are available.
  <p>Conflict between contractors, including poaching each others’ retinues, is actively prevented in real time via <b>Demiplane Laws</b>. Note that the company does not enforce fairness in trades between contractors, so take care to watch your own back.</p>`,
})

// Generic Waifu Perks
export const genericDesc = `
<p>Upgrades, downgrades, and other premium options for your waifus are available in this and the next section. If your Origin choice is compatible with a Waifu Perk of any kind, you can buy it for yourself, even in a starting build. (If you have Substitute and apply a Waifu Perk to yourself, the perk-modified cost of your target cannot exceed 20% of your intensity-adjusted budget. This limitation only applies at chargen.) Unlike other purchased abilities, your waifus do not lose access to waifu perks if you die.</p>
<p>Generic waifu perks may be purchased more than once and applied to any waifu or husbando that qualifies. Specific waifu perks, however, may only be purchased once unless stated otherwise, even if multiple waifus qualify. If you give a subject their associated perk using in-universe means - “earning” the perk - you’ll earn the full capture value for the new tier, according to your intensity. This includes IMG as appropriate. All specific waifu perks are sorted by source medium.</p>`
// #endregion

// #region Generic Waifu Perks
export const genericPerks: PerkFull[] = []

genericPerks.push({
  uid: 'rOhim',
  title: 'Yoink',
  category: 'Generic',
  image: 'https://i.ibb.co/PTSQp4F/Yoink.jpg',
  cost: 1,
  whitelist: ['Directly in Companions'],
  special: 'Use directly in companions. Cost 20% more. Chargen only. Not available in Gauntlet PvP.',
  desc: `Your purchased subject is actually a local capture from your starting world. They are teleported to your starting location and Bound (or not) the same as all the other subjects you purchased. You may purchase this perk once for each purchased subject who happens to be from your starting world. You may not apply this perk to dead targets, or any valued at more than 20% of your intensity- adjusted starting budget, after accounting for any waifu perks applied at chargen (excluding Power Swap). Note that weaponized use of this perk can potentially lower a world’s Danger Rating and, in turn, your starting budget.
  <p>If you are a Drop-in or Walk-in and start in a new world, individuals from your homeworld may be dragged along and inducted into your retinue using this perk. If you purchase this together with Extra or Substitute, the relevant subjects will all have been brought to your starting location by fate or coincidence, not teleportation.</p>
  `,
})

genericPerks.push({
  uid: 'rUWf6',
  title: 'Slightly Used',
  category: 'Generic',
  image: 'https://images2.imgbox.com/72/42/QM0xwaAr_o.png',
  cost: 1,
  special: 'Use directly in companions.',
  whitelist: ['Directly in Companions'],
  desc: `
<p>This waifu is an original version, captured by a previous contractor and resold to you. All direct effects of previous contractors' controls and perks are removed during reprocessing. This includes Defenses, Talents, and Binding benefits, but not any non-baseline abilities they trained in using their former contractor’s Talents, equipment they wield, or Heritage upgrades applied to them. When you select this perk for a purchase, you will see three options for which specific version of the subject you wish to buy.</p>
<p>Author directions: roll 6 six-sided dice for each option, twice. (Just use an autoroller.) The sum of the first set of rolls determines the subject’s effective tier after step 3: higher rolls mean both higher tiers and higher prices. Compare to the names you recognize in the regular Catalog to determine what kinds of extra abilities or equipment a used purchase has compared to their baseline self. The sum of the second set of rolls determines the subject’s physical, mental, and/or spiritual state after their experiences with their previous owner: higher rolls mean both more trauma and steeper discounts. The full chart is in the Additional Rules section. A used purchase’s extra abilities and/or equipment will be listed in full for the contractor to see, but their current state will not be visible, beyond its effect on their price.</p>
<p>Unlike fresh clones, subjects bought used have been to their homeworlds personally. Most people have others who care about them, who will likely have strong reactions to the sudden return of a missing person…</p>`,
})

genericPerks.push({
  uid: 'CYLBN',
  title: 'Canvas',
  category: 'Generic',
  image: 'https://i.ibb.co/Xjpv07P/Canvas.jpg',
  cost: 1,
  requires: 'any higher Binding- type control',
  multiple: true,
  max: 10,
  whitelist: ['Tempest Jewelry', 'Shroud of Power', 'Alterzelu Symbiote', 'Hypnosis App', 'Tantric Arts'],
  needed: 1,
  desc: 'The Stamp’s tattoos are now permanently visible, even after the purchase of higher bindings. This option is purely aesthetic. Once you’ve purchased this perk ten times, it will apply to every member of your retinue.',
})

genericPerks.push({
  uid: 'NkvEg',
  title: 'Adoption',
  category: 'Generic',
  anything: 'Kid Name',
  complex: 'flavor',
  image: 'https://images2.imgbox.com/bb/99/VjEw3SDu_o.png',
  cost: 1,
  desc: 'You may find yourself adopting a kid - and not just because you killed one parent and captured the other into your retinue. Under normal circumstances, that kid will forever be your familiar, never equal to your true-blooded offspring. This perk will tell our systems to treat them as your descendants and follow the relevant Offspring rules instead.',
})

genericPerks.push({
  uid: 'FJABm',
  title: 'Paper Trail',
  category: 'Generic',
  image: 'https://images2.imgbox.com/91/f5/VRMMxZZx_o.png',
  cost: 1,
  target: 'Any',
  complex: 'target',
  max: 10,
  desc: `
<p>In some worlds, anonymity is a danger in and of itself. This perk retroactively modifies all records (paper, digital, and even memories) to create a legal existence for your waifu. Where applicable, the waifu will receive any real documentation she would be expected to have. This perk will not actually make your backstory true, no matter how many locals believe it. You may also purchase and apply this perk to yourself; the all-waifus package will always apply it to you. If you chose the Extra or Substitute origins, this perk will not apply to you until you visit your second world. Similarly, this cannot give a captured or Yoinked retinue member a new identity in their own homeworld. Once you’ve purchased this perk ten times, it will apply to every member of your retinue.</p>
<p>By default, this history is of a middle-class or analogous citizen. If plausible and desired, they will instead be of a social class that can associate with you. Under the same conditions, any powers they have may be documented in a way that best fits your needs. If you have Trace Defense, any attempt at remote viewing where failure or invisibility would itself be a red flag will seemingly succeed, showing either a convincing match to their documented past or a present or future with nothing important to note.</p>`,
})

genericPerks.push({
  uid: 'I7GFa',
  title: 'Power Swap',
  category: 'Generic',
  image: 'https://i.ibb.co/F6NjTfp/Power-Swap.jpg',
  cost: 0,
  desc: `
  <p><b>Cost</b>: Find the purchase price for the subject’s tier at step 1a and the purchase price of the tier of the power’s original owner, then take the difference. Swapping out a Tier 4’s power for a Tier 10’s thus costs 990 credits, while a Tier 5 for a Tier 5 costs 0 and a Tier 6 for a Tier 2 gives you a refund of 48 credits. Only Purchased subjects refund credits if reduced to a lower tier by this perk. Captured subjects grant capture credits, and do not have a refund value.</p>
  <br>
  <p>This perk replaces your subject’s original powers and skills, including both their original gear and the results of additional training with the appropriate Basic Talent, with a copy of someone else’s. This changes their tier at step 1a and ignores all powers that are counted in steps 0, 1b, or 2+. The results of any additional training with the original power, through Basic Talents or otherwise, are saved to a backup, should you ever want to switch back. If you purchase this perk for yourself, it will replace any powers gained from your Origin, if applicable, or previous uses of this perk. Knowledge is a power. Communication Talent will ensure that basic language skills are not lost, only added.</p>
  <p>Like Template Stacking, this perk does not accept abilities found elsewhere in this catalog or abilities that originated in other CYOAs. All other powers are still allowed, including both “no powers” and Imaginary Tier powers (assuming that you have enough IMG). It’s all the same skill download at our cloning facilities. Unlike Template Stacking, this is the full power, not nerfed down to Tier 4. Subjects whom this perk is purchased for will count as “canon” users of the new power, for all perks and rules that consider canonicity, instead of their original one.</p>
  <p>If you purchase this perk for yourself at chargen or a purchased subject when they’re purchased, the effects are immediate. If you purchase this perk at a later date, or for a captured subject, the person will lack an original power for one week (168 hours) before the new power manifests. This perk cannot be repurchased for that person during that time. If you have Warranty Plan, a subject that this perk is applied to will vanish immediately. Their respawn time, with the new power, will be seven days or your retinue’s standard Warranty Plan respawn, whichever is less.</p>
`,
})

genericPerks.push({
  uid: 'dmynt',
  title: 'Third-Party Riggings',
  category: 'Generic',
  special: 'Requires at least one first - party Azur Lane shipgirl.',
  complex: 'target',
  requires: 'Any Azur Lane collaboration shipgirl',
  image: 'https://i.ibb.co/6y1sh85/Third-Party-Riggings.jpg',
  cost: 20,
  desc: `Dead or Alive, Neptunia, Utawarerumono, Hololive, and others have all had guest appearances on the high seas. This perk grants these characters their shipgirl riggings, allowing them to play by those rules instead and making them eligible for Bifurcation and Space Shipgirl below. If a collaboration shipgirl’s tier after step 1a is less than the following, it will be raised to that value.
<ul class="list-disc list-inside">
  <li>22, 33, Akizuki Ritsuko, Futami Ami, Futami Mami, Minato Aqua</li>
  <li>T5: Marie Rose, Misaki, Miura Azusa, Namiko, Minami Yume, HDN Neptune, Noire, Blanc, Black Heart, White Heart, Kuon, Nekone, Rurutie, Uruuru, Saraana, Kisuna AI, Elegant Kizuna AI, Natsuiro Matsuri, Nakiri Ayame</li>
  <li>T6: Honoka, Kasumi, Nagisa, Nyotengu, Monica, Amami Haruka, Takarada Rikka, Shinjo Akane, Hass, Mujina, Vert, Purple Heart, Greet Heart, Fumiruiru, Shirakami Fubuki, Murasaki Shion, Ookami Mio</li>
  <li>T7: Kisaragi Chihaya, Minase Iori, Asukagawa Chise, Anniversary Kizuna AI, Super Gamer Kizuna AI, Tokino Sora</li>
</ul>`,
})

genericPerks.push({
  uid: 'piGae',
  title: 'Retrofit',
  category: 'Generic',
  requires: 'Any eligible Azur Lane shipgirl',
  complex: 'target',
  image: 'https://i.ibb.co/H26yFLZ/Retrofit.jpg',
  cost: 0,
  costVariants: [0, 10, 30, 50],
  special: '0(T4 → T4, T5 → T5, T6 → T6), 10(T4 → T5), 30(T5 → T6), 50(T6 → T7)',
  desc: `Your shipgirl is her post-retrofit version, with updated abilities, hull, and rigging. This perk is free for all eligible shipgirls except the following, whose tiers are changed as a result:
<ul class="list-disc list-inside">
  <li>T4 → T5: Pamiat Merkuria, Curacoa, Curlew</li>
  <li>T5 → T6: Bogue, Langley, Ranger, Emile Bertin, Leander, Achilles, Ajax, London, York, Exeter, Hermes, Isuzu, Kinu, Mogami, Shouhou, Jintsuu</li>
  <li>T6 → T7: Warspite, Ark Royal, Souryuu, Hiryuu</li>
</ul>`,
})

genericPerks.push({
  uid: 'qJBhY',
  title: 'Bifurcation',
  category: 'Generic',
  requires: 'Any Azur Lane Shipgirl',
  complex: 'target',
  image: 'https://i.ibb.co/zQWtns3/Bifurcation.jpg',
  cost: 15,
  desc: `
<p>Your chosen Shipgirl’s Wisdom Cube receives a slight boost to its power, allowing her to manifest her rigging and full ship forms simultaneously. This lets her enter the fray personally while still allowing usage of her ship for transport, defense, support, etc., opening up many new tactical options.</p>
<p>There is a price to pay for this convenience. First, the strain of manifesting both her rigging and full ship form at once will reduce the performance of both by approximately 50%. This can be returned to normal levels with appropriate training. Second, while both forms are manifested, any damage the ship form takes will immediately be reflected upon the Shipgirl’s rigging, and vice versa.</p>
<p>Upon ten purchases of this perk, all Shipgirls you may purchase will automatically have this perk applied to them.</p>`,
})

genericPerks.push({
  uid: 'rRNoF',
  title: 'Space Shipgirl',
  category: 'Generic',
  requires: 'Any Azur Lane shipgirl',
  complex: 'target',
  image: 'https://images2.imgbox.com/f3/f6/o8rXjFvc_o.png',
  cost: 30,
  desc: `
<p>Just as a group of humans once revived the mighty battleship Yamato as a spaceship in order to save humanity, so do the shipgirls under your command gain the ability to traverse the final frontier. The chosen shipgirl’s full-size hull is refurbished to be completely spaceworthy: the insides of the hull are sealed against the vacuum of space, all their armaments are perfectly capable of functioning in space, and even planes from carriers can fly just as well in the vacuum of space as they do in air. If you don’t want a naval-ships-in-space aesthetic, shipgirl hulls are also available in space counterpart culture varieties. For example, Star Trek’s Federation designs are suitable for Eagle Union and Royal Navy, while the Klingon look is appropriate for Sakura Empire and Romulans for Dragon Empery. Further upgrades may be installed if you have another source of space-era technology.</p>
<p>While her rigging is manifested, the shipgirl retains all upgrades made to her armaments. Should you lack Wild Defense, she gains a personal atmospheric bubble that allows her to survive in space for a time.</p>
<p>Upon ten purchases of this perk, all Shipgirls you may purchase will automatically have this perk applied to them.</p>`,
})

genericPerks.push({
  uid: 'yib6z',
  title: 'I\'m on a Boat',
  category: 'Generic',
  requires: 'Any Kantai Collection Shipgirl',
  complex: 'target',
  image: 'https://i.ibb.co/ssVPcG3/Im-On-ABoat.jpg',
  cost: 10,
  desc: `
<p>Your chosen Shipgirl may now summon her full ship form under her instead of just manifesting her rigging. This lets her carry other members of your retinue around and lets her fairy crew take on human size and be interacted with. Understanding their speech, of course, requires Communication Talent. Additionally, Kancolle Shipgirls with this perk become eligible for Bifurcation and Space Shipgirl.</p>
<p>Upon ten purchases of this perk, all Kancolle Shipgirls you may purchase will automatically have this perk applied to them.</p>`,
})

genericPerks.push({
  uid: 'KfjKL',
  title: 'Heart of Light',
  category: 'Generic',
  requires: 'Any Non-Evil waifu from Disney or Square-Enix',
  complex: 'target',
  image: 'https://wallpapers.com/images/hd/disney-princesses-with-vanellope-qoundwr88ga1bash.jpg',
  cost: 10,
  desc: `
  Your chosen Disney or Square-Enix Waifu has now become a Princess of Heart, giving them a Heart of Pure Light. They're now protected from Corruption, even if you lack Corruption Defense, and can sense and push away corruptive forces, with their abilities growing stronger the more of them gathered in one place. Purchasing this perk will elevate the character to Tier 4, if she wasn't already. Repurchases for the same character would do nothing and thus are not allowed.
  <p>By default, you can only have 7 Princesses of Heart. Additional sets of 7 Princess Titles become available with each member of your retinue, including yourself, whose effective tier after step five is at least T8: one for each T8, two for each T9, five for each T10, and ten for each TΧ. If one of your Waifus is already a Princess of Heart when you capture her, that counts against your total, unless you take a refund for this perk. If this puts you over your cap for Titles, you must refund the perk.</p>`,
})

genericPerks.push({
  uid: 'kgjKf',
  title: 'Blade of Endings',
  category: 'Generic',
  requires: 'Any Keyblade wielder',
  complex: 'target',
  image: 'https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/zaP5b.jpg',
  cost: 1000,
  desc: `
  The Origin of Keyblades, the Ⲭ-Blade is the companion to the True Kingdom Hearts, and the only blade which can open its door. With this perk, your Keyblade wielding character (yourself included, if you have a Keyblade) can now summon the legendary blade itself. With it, you can call upon both its powers and the powers of Kingdom Hearts itself by summoning it. 
  <p>You may only have one Ⲭ-Blade at a time, whether or not this perk is applied. It can be passed around your various Keyblade Wielders, but only the one whom this perk is applied to can summon or unsummon the blade at will. You can change which Keyblade Wielder in your Retinue (yourself included if you have a Keyblade) this perk is applied to in your Company App, but you must wait one week (168 hours) after purchasing or after changing targets before you can do so (again).</p>`,
})

genericPerks.push({
  uid: 'hkEPg',
  title: 'Mirage Master',
  category: 'Generic',
  requires: 'Any T1- T3 waifu + any Fire Emblem character rated T6 or below',
  complex: 'target',
  cost: 50,
  image: 'https://i.ibb.co/XbXqB6y/Mirage-Master.jpg',
  desc: `
<p>Your list of Mirage users is no longer limited to canon. If you have a blue-star waifu and any Fire Emblem character rated T6 or below, you may convert the Fire Emblem character into a Mirage who’ll serve as the blue-star waifu’s partner. (Mirages of an unwanted gender may be subject to Rule 63.) The duo now operate on Tokyo Mirage Sessions rules and will, with few exceptions, be stronger than the Fire Emblem waifu on her own.</p>
<p>Most types of enhancement methods for Mirages, however, must be administered by a Fire Emblem divine dragon rated T7 or higher (e.g. Naga, Nagi, Mila) and will not be available otherwise. Tiki has prior experience with this, from the canon events of Tokyo Mirage Sessions, but the others will have to figure it out as they go. If you have an eligible Mirage administrator, the cost of each application of this perk will be discounted to only 20/pair, with the difference refunded back into your account.</p>
<p>Upon ten purchases of this perk, you may apply this perk as many more times as you want at no further cost.</p>`,
})

genericPerks.push({
  uid: 'hndM0',
  title: 'Unison',
  category: 'Generic',
  requires: 'Any Pokémon trainer',
  complex: 'target',
  cost: 40,
  image: 'https://images2.imgbox.com/cf/ea/fSpLFBjA_o.png',
  desc: 'The enhanced spiritual bond between your Trainer waifu and her mons allows her to blend with one of them, take on its physical traits, and operate as one being, raising her tier at step 5 to the higher of her own or the blended mon’s. Any of her mons are eligible for this, but only one at a time. She will also receive her seventh most iconic or strongest mon from her canon appearances, if she has one, so she can have a full party of six alongside the one she’s blended with.',
})

genericPerks.push({
  uid: '8Kgf8',
  title: 'Spiritual Inversion',
  category: 'Generic',
  requires: 'Any Date A Live spirit',
  complex: 'target',
  cost: 40,
  image: 'https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/L1ex5.jpg',
  desc: 'The Spirit can now enter her Inverse Form, greatly increasing her strength and changing her Angel into a Demon King. The Spirit will remain in full control of herself. This perk may be applied to any Spirit from Date A Live, including those who lack a canonical Inverse Form or aren’t listed in the catalog as Spirits. This perk is free if you capture the Spirit while she’s in her Inverse Form, or if she unlocks it herself by force.',
})

genericPerks.push({
  uid: '1rWq8',
  title: 'Galactic Presence',
  category: 'Generic',
  requires: 'Any Warhammer Fantasy deity',
  complex: 'target',
  image: 'https://i.ibb.co/wJPQ4wt/Galactic-Presence.jpg',
  cost: 500,
  desc: 'Malleus and the year 40,000 are both Warhammer, but operate on vastly different scales. This perk pulls one of the Fantasy goddesses up to the same level as her galactic counterpart. It must be purchased separately for each one you have.',
})

genericPerks.push({
  uid: '1rWq2',
  title: 'Enemy Within',
  category: 'Generic',
  requires: 'Must have visited any Marvel world or have a subject from one.',
  complex: 'target',
  image: 'https://images2.imgbox.com/63/da/IBI2ZWJ8_o.jpg',
  cost: 100,
  desc: `
  <p>Your chosen retinue member is now the host to a Klyntar, the slime-like symbiont race of which Venom is the most famous member. This will raise any blue- or copper-star subject to T7 and a T7 to T8. It will also noticeably strengthen any host who started at T8 or higher, but not enough to increase their tier.</p>
  <p>Klyntar hosts experience enhanced physical abilities, regeneration, and shapeshifting (just the Klyntar suit itself), as well as a limited ability to mimic any ability covered by Psychic Talent - provided the Klyntar keeps an appropriate biological sample. Klyntar tend to grow attached to specific biological samples and will maintain long-term possession of only one such sample at a time.</p>
  <p>This perk may be used to purchase a specific Klyntar for the chosen retinue member or to spawn an original, generic member of that race for your retinue’s use. As this is a purchase, you will not receive capture credits for binding a Klyntar spawned by this perk.</p>
  `,
})

genericPerks.push({
  uid: 'Pqi8M',
  title: 'Four Seasons',
  category: 'Generic',
  requires: 'Any female user of RWBY Aura',
  complex: 'target_c',
  multiple: true,
  image: 'https://i.ibb.co/1QhZdpg/Four-Seasons.jpg',
  cost: 20,
  desc: `Maidenhood is special on Remnant, but not particularly so. Anyone can become one under the right circumstances. By default, this perk may be purchased up to four times, once for each temperate season (Spring, Summer, Fall, Winter). Purchasing this once will elevate a character to T6, if she isn’t already. Repurchases for the same character are allowed, but only one for each season and will not affect a tier further.
  <p>Additional sets of Maiden mantles become available with each member of your retinue, including yourself, whose effective tier after step 4a is at least T8: one for each T8, two for each T9, five for each T10, ten for each TX, twenty for each TY, and fifty for each TZ. If one of your waifus is already a Maiden when you capture her, that counts against your total, unless you take a refund for this perk. If this puts you over your cap for a particular mantle, you may not buy any more of that mantle until you’ve raised the cap further.</p>
  `,
})

genericPerks.push({
  uid: '2kSwK',
  title: 'Salvation',
  category: 'Generic',
  requires: 'Any Puella Magi',
  complex: 'target',
  costVariants: [20, 0],
  image: 'https://i.ibb.co/CK7zwYY/Salvation.jpg',
  cost: 20,
  desc: `
<p>When your waifu's soul gem darkens completely, she may choose to manifest her Doppel: a materialization of her witch-self which may take the form of an discrete projection, an extension of her body, or even a partial physical transformation, depending upon the details of her relationship to her witch-self and what it represents. An activated Doppel is extremely powerful in its own right, but draws upon the darkness in its master's soul gem to manifest, quickly and completely purifying its master's gem until she can no longer support it - leaving her Doppel as a briefly activated trump card or a simple magic recharge mechanic unless it's somehow further refined. If you have Inexhaustible, any meguca in your retinue, whom this perk has been applied to, will only benefit from this perk.</p>
<p>If you have Madokami, Akuma Homura, Satomi Touka, Lapin, or any other meguca who is canonically capable of breaking the balance of hope and despair in your retinue, then this perk is free. If you already have this perk when you acquire a relevant waifu, then take a full refund on the value of this perk for as many times as you've purchased it. Upon ten purchases of this perk, all meguca you may purchase will automatically have this perk applied to them.</p>`,
})

genericPerks.push({
  uid: 'lgk5f',
  title: 'Mamonomorphosis (Papillon)',
  category: 'Generic',
  requires: 'any Monster Girl Encyclopedia Greenworm',
  complex: 'target',
  image: 'https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/RTVzw.jpg',
  cost: 5,
  desc: `
<p>The Greenworm’s youthful appearance comes from her nature as the larval forms of Papillon, a butterfly mamono. This perk skips the natural maturation process, immediately converting the target Greenworm into a Papillon. All Greenworms qualify for this perk, whether they’re naturally- born or converted from another race by natural means, Power Swap, or Template Stacking.</p>`,
})

genericPerks.push({
  uid: 'aoqp9',
  title: 'Mamonomorphosis (Succubus)',
  category: 'Generic',
  requires: 'any Monster Girl Encyclopedia Lesser Succubus',
  complex: 'target',
  image: 'https://images2.imgbox.com/35/1d/aQquQKpJ_o.png',
  cost: 40,
  desc: `
<p>Any Lesser Succubus will eventually mature into the full-blooded variant with enough time and sexual energy intake. This perk skips the natural maturation process, immediately converting the target into a full Succubus. All Lesser Succubi qualify for this perk, whether they’re naturally-born or converted from another race by natural means, Power Swap, or Template Stacking.</p>`,
})

genericPerks.push({
  uid: 'qsmot',
  title: 'Lilithspawn',
  category: 'Generic',
  requires: 'any Monster Girl Encyclopedia Mamono, except for Lilims and the Demon Lord',
  complex: 'target',
  image: 'https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/LWSUk.jpg',
  cost: 200,
  desc: `
  The iconic Lilims are all Succubi, but the term simply applies to any daughter of the Demon Lord. In theory, any mamono, of any breed, could be elevated to the role. The Queen of Hearts is a Lilim Alice, for example.
  <p>This perk augments your mamono into a Lilim, granting her the associated prowess and magical power of a T8. All Lilims, even artificial mamono created by Template Stacking before they received this perk, qualify for special Alterzelu Symbiote theming.</p>`,
})

export const talentsObject = talents.reduce((a, x) => { a[x.title] = x; return a }, {} as Record<string, PerkFull>)
export const defenseObject = defenses.reduce((a, x) => { a[x.title] = x; return a }, {} as Record<string, PerkFull>)
