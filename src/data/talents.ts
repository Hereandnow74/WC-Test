export const rideDesc = `You purchase a fully-functional, full-size replica of well-known land, sea, air, and space vehicles from various universes. Land vehicles tend to range from 5 credits to 20, while sea and air vehicles typically cost 20 to 100 credits each. Space vehicles start at 100 credits and only go up from there. Some vehicles have special variants that may cost more or less than the listed price; their prices are noted in their entries. Others have addons that can be purchased and applied to any existing copy of that vehicle, even ones you acquired outside of this catalog. You may purchase as many separate vehicles from the showroom as you can afford.
If you have Exit Stage Left and the portal’s time limit runs out while your vehicle is only part way through, the event horizon will stretch and swallow the rest of it before the portal closes. People touching the vehicle, whose weight is not supported by it, will be left behind, as will all hostiles.`

export interface Ride {
  title: string
  cost: number
  desc?: string
  source?: string
  addons?: (string | number)[][]
  requires?: string
  whitelist?: string[]
  flag?: string
  variants?: (string | number)[][]
  example?: string
}

export interface PerkFull {
  title: string
  cost: number
  desc: string
  whitelist?: string[]
  special?: string
  target?: string
  blacklist?: string[]
  needed?: number
  requires?: string
  multiple?: boolean
  additionalDesc?: string
  flag?: string
  power?: string
  image?: string
  max?: number
  waifu?: string
  anything?: string
  costVariants?: number[]
  freebies?: any
  complex?: string
}

// Environment: Land
// #region ride
export const rides: Ride[] = []

rides.push({
  title: 'Your Own Car From Home',
  source: 'Real Life',
  cost: 1,
  desc: 'Has everything you would normally have in your car.',
})

rides.push({
  title: 'Herbie',
  source: 'Herbie',
  cost: 5,
  desc: 'Turbo Booster, Free Bro Herbie',
})

rides.push({
  title: 'Regalia',
  source: 'Final Fantasy XV',
  cost: 5,
  desc: 'Car from Final Fantasy XV',
  addons: [['Type-D upgrade (off-road) (+5)', 5], ['Type-F upgrade (flight capability, unlimited fuel) (+10)', 10]],
})

rides.push({
  title: 'Molcar',
  source: 'Pui Pui Molcar',
  cost: 5,
  desc: 'half-vehicle half-guinea pig hybrid, very cute',
})

rides.push({
  title: 'Kaneda',
  source: 'Akira',
  cost: 5,
  desc: 'A cherry red beast of a motorcycle made famous from the Anime and Manga Akira. 200 Horsepower engine, electronic anti-lock brakes, and a fancy instrument panel including a built-in computer screen.',
})

// Environment: Sea

rides.push({
  title: 'Nautilus (1865)',
  source: '20,000 Leagues Under the Sea',
  cost: 20,
  desc: '1865 Sci-Fi Electric Submarine',
})

rides.push({
  title: 'Tuatha de Danaan',
  source: 'Full Metal Panic',
  cost: 40,
  desc: 'Submarine-capable assault carrier. Holds 5x M9E Gernsback and 1x ARX-7 Arbalest mecha, 4x FAV-8 Super Harriers, 4x RAH-66 Comanche attack helicopters, and 6x MH-67 Pave Mare transport helicopters.',
  addons: [['Upgrade ARX-7 to ARX-8 Laevatein (+10)', 10]],
})

rides.push({
  title: 'Gargantia Fleet',
  source: 'Gargantia on the Verdurous Planet',
  cost: 50,
  desc: 'Detachable Sub-ships, Orbital Mass Driver, Limited Manufacturing',
  addons: [['Patrol Fleet (+10)', 10]],
})

rides.push({
  title: 'Nautilus',
  source: 'League of Extraordinary Gentlemen(Movie)',
  cost: 50,
  whitelist: ['Science Talent'],
  desc: 'Missiles; Torpedos; Miniature Submarines',
  addons: [['‘Auto-mobile’(+5)', 5]],
})

rides.push({
  title: 'Ulysses',
  source: 'Atlantis: The Lost Empire',
  cost: 50,
  desc: 'Sub-Pods, Cannon Turrets, Torpedos',
})

// Environment: Amphibious

rides.push({
  title: 'Mach 5',
  source: 'Speed Racer',
  cost: 15,
  desc: 'Auto-Jacks, Belt Tires, Cutter Blades, Deflector, Evening Eye, Frogger Mode, Gizmo (Robotic Homing Pigeon)',
  variants: [['Mach 6 (20)', 5]],
})

rides.push({
  title: 'KITT',
  source: 'Knight Rider',
  cost: 20,
  desc: 'Minimal Weaponry, Turbo Booster, crime lab, Free Bro KITT',
})

rides.push({
  title: 'Mobile Construction Vehicle',
  source: 'Command & Conquer',
  cost: 50,
  desc: 'Red Alert 1 Database, Manufacturing',
  addons: [['RA2 Database (+10)', 10], ['RA3 Database (+20)', 20], ['TW1 Database (+10)', 10], ['TW2 Database (+20)', 20], ['TW3 Database (+50)', 50], ['TW4 Database (+100)', 100], ['C&C Generals Database (+10)', 10]],
  variants: [['Crawler version (70)', 20]],
})

rides.push({
  title: 'Mechonis',
  source: 'Xenoblade Chronicles 1',
  cost: 800,
  requires: 'Fiora w/ Waifu Perk Machina or Meyneth',
  desc: 'Mechon life-forms, Monado. Either version of Meyneth may build a new Mechonis on her own even without this purchase, provided she has sufficient time and resources.',
})

rides.push({
  title: 'Armored Command Unit',
  source: 'Supreme Commander',
  cost: 1000,
  desc: 'Aeon or UEF or Cybran Database (pick one), Extreme Manufacturing, Quantum Gate, Infinite Resources',
  addons: [['2nd human faction’s database (+200)', 200], ['Seraphim Database (+500)', 500]],
})

// Environment: Sky

rides.push({
  title: 'Fahrenheit',
  source: 'Final Fantasy X',
  cost: 50,
  desc: 'AAM launchers, laser cannons',
  addons: [['Completed restoration - main cannons can fire more than twice without repairs, automated missile production that only requires feedstock (+20)', 20]],
})

rides.push({
  title: 'Delphinus',
  source: 'Skies of Arcadia',
  cost: 75,
  desc: 'Moonstone cannon',
})

rides.push({
  title: 'Epoch',
  source: 'Chrono Trigger',
  cost: 100,
  desc: 'time drive, little passenger space',
})

rides.push({
  title: 'Monolith',
  source: 'Warhammer 40k',
  cost: 400,
  desc: 'Anti-Gravitic Engines, Necrodermis, Particle Whip, Gauss Flux Arcs (4), Eternity Gate/Portal of Exile. It cannot build new troops, but it can teleport units in through the Gate.',
  variants: [['Doomsday Monolith (500)', 100]],
})

// Environment: Space

rides.push({
  title: 'Bolo',
  source: 'Bolo',
  cost: 100,
  desc: 'HEAVILY Armed, HEAVILY Armored, Landfall-capable',
  addons: [['AI Bro Bolo (+50)', 50]],
})

rides.push({
  title: 'Normandy-class stealth cruiser',
  source: 'Mass Effect',
  cost: 200,
  desc: 'Like Normandy SR-2, have Thanix cannon',
})

rides.push({
  title: 'UNSC Phoenix-class',
  source: 'Halo',
  cost: 400,
  desc: 'Like Spirit of Fire have UNSC Database, Manufacturing, Free Waifu Serina or Isabel',
})

rides.push({
  title: 'Starfleet Constitution-class',
  example: 'Enterprise 1701-null',
  source: 'Star Trek: The Original Series',
  cost: 300,
  desc: 'Federation database and labs, living and diplomatic quarters',
})

rides.push({
  title: 'Starfleet Galaxy-class',
  example: 'Enterprise 1701-D',
  source: 'Star Trek: The Next Generation',
  cost: 400,
  desc: 'Federation database and labs, living and diplomatic quarters',
})

rides.push({
  title: 'Starfleet Sovereign-class',
  example: 'Enterprise 1701-E',
  source: 'Star Trek: The Next Generation movies',
  cost: 440,
  desc: 'Federation database and labs, living and diplomatic quarters',
})

rides.push({
  title: 'Starfleet Odyssey-class',
  example: 'Enterprise 1701-F',
  source: 'Star Trek',
  cost: 500,
  desc: 'Federation database and labs, living and diplomatic quarters',
})

rides.push({
  title: 'Tau’ri BC-304',
  example: 'Daedalus, Odyssey',
  source: 'Stargate SG-1',
  cost: 400,
  desc: 'Asgard hyperdrive (extreme speed), teleporter, and plasma beams, 8 F-302s in each hangar bay',
  addons: [['Asgard computer core (+300)', 300], ['Alternate reality drive (+100)', 100], ['Ancient cloak (+100)', 100], ['Horizon weapons platform (+50)', 50], ['ZPM additional power generation (+100)', 100]],
})

rides.push({
  title: 'Terran Behemoth-class ',
  example: 'Hyperion',
  source: 'Starcraft',
  cost: 400,
  desc: 'Space flight, Terran Database, Armory, Manufacturing, Yamato Cannon',
})

rides.push({
  title: 'Kushan mothership',
  example: 'Pride of Hiigara',
  source: 'Homeworld 2',
  cost: 400,
  desc: 'Kushan database, extreme production, minimal defenses',
})

rides.push({
  title: 'Imperial-II class Star Destroyer',
  source: 'Star Wars',
  cost: 440,
  desc: 'Heavy armour, heavy weapons, tractor beams, powerful hyperdrive (galactic spanning), small craft complement (72 TIE-series fighters, 8 Lambda class shuttles, 15 Delta class troop transports, 6 assault gunboats), Ground force complement (20 AT-ATs, 30 AT-STs, prefab bases, 9700 sets of Stormtrooper/Clonetrooper gear), Imperial industrial database (including designs for advanced TIEs), extensive machine shops and repair bays, droid crew support.',
  variants: [['Executor class Super Star Destroyer (VERY heavy weapons, VERY heavy armour, 144 fighters, ground force complement 38,000 (500 credits)', 60]],
  addons: [['New Republic upgrade: X-Wings and B-Wings, database current to Galactic Alliance period (+10)', 10], ['Stormtrooper/Clonetrooper gear upgraded to Mandolorian grade, Mandalorian forge and database added (+15)', 15]],
})

rides.push({
  title: 'Lantean City-ship',
  example: 'Atlantis',
  source: 'Stargate Atlantis',
  cost: 1500,
  desc: 'Lantean database and labs, drone launchers, puddle-jumper hangars, wormhole drive, ZPM production facility, living quarters',
})

rides.push({
  title: 'Ideon and Solo',
  source: 'Space Runaway Ideon',
  cost: 11111,
  desc: '(Solo): DS Drive, onboard forest. (Ideon): Three-part combining mecha, arbitrarily powerful weapons and defenses, infinite energy.',
})

// Catch-a-Ride Perks

rides.push({
  title: 'Catch-A-Ride Crew Training Program',
  cost: 5,
  requires: 'at least one Replica Showroom vehicle',
  flag: 'hasARide',
  desc: `
<p>We at the company fully realize that, in some cases, you and your waifus may lack the necessary skills needed to properly operate or maintain your chosen ride, which would make using them impractical at best and impossible at worst. To rectify that, for a small fee you can opt to have your newly purchased waifus undergo a 24 hour training course, during which all the skills needed to properly operate, repair, and maintain all your purchased rides will be downloaded into their brains. Delivery of waifus will be delayed until completion of the course</p>
<p>For captured or pre-existing purchased waifus, you can opt to have them undergo an 8-hour training program via a company-approved VR system, during which they will gain the skills needed for proper manning of your rides. Purchase of additional vehicles may require further courses, should the tech bases be significantly different.</p>`,
})

rides.push({
  title: 'Catch-A-Ride Crew Production Program',
  cost: 20,
  whitelist: ['Catch-A-Ride Crew Training Program'],
  desc: `
<p>Your basic manpower problems are over. Now your rides come with a full crew of company-issued clones, Each one is equivalent to a T2 waifu and comes with all the skills needed to properly maintain and repair your ride, while also being capable of rapidly acclimating to any upgrades that may be done. Combat-wise they are equal to the average soldier in a modern professional military and may require further training to be an effective combat force in a given alternate world.</p>
<p>All clones come with a demi-tattoo, establishing them as yours. See the Offspring section below. They will not provide points should a higher binding be applied.</p>
<p>These clones initially lack their own sense of identity, but over time will come to develop their own unique personalities, interests and dislikes, as well deciding names for themselves, if they have not been given one. This process is hastened via interactions with yourself and your waifus, even influencing their own development.</p>
<p>For exceptionally large vehicles, typically those that cost 300 credits or more, this perk will be applied for free. If you have such a vehicle, a clone production facility will be integrated into the ship so you may replace your losses manually. This facility may also be used for other cloning programs if necessary. Otherwise, new replacement crew members will be shipped to you like any other purchased waifu.</p>`,
})
// #endregion

// #region home
export const homeDesc = 'Like all company-supplied powers, the powers granted by these perks cannot be nullified, copied, or stolen.'
export const homes: PerkFull[] = []

homes.push({
  title: 'Pocket Space',
  cost: 5,
  desc: `
<p>You now possess a timeless extradimensional inventory space. This inventory may be accessed via an app on your smart device, Apportation, or certain Heritage perks. Transferring an item into the inventory via the app requires it to be in contact with you before transport. An item pulled from the inventory via the app will be deposited into your hand or within one meter of your position.</p>
<p>Your Inventory has a volume of 1m by 1m by 3m. Living beings may be stored within, but not any resisting or unwilling ones. Stamped or otherwise bound retinue members always count as willing and unresisting. Time does not pass within your Inventory, for good or ill.</p>`,
})

homes.push({
  title: 'Pocket Apartment',
  cost: 20,
  whitelist: ['Pocket Space'],
  desc: `
<p>A 100 sq m extradimensional residence, for when you need a place to crash. It has all the basics: two medium bedrooms, one bathroom, a living area, kitchenette, and closet space. All characters with alternate outfits, shown in any official source, will find them stored in their room or closet.</p>
<p>Access it by plopping a portal onto any reasonably flat surface. Only one portal may exist at a time and you may close it with a thought at any time, whether you’re in or out of the apartment; if you’re inside when the portal is closed, the new exit must be reasonably close to the previous entrance.</p>
<p>Some independent multiverse travelers may enter your universe directly, but only requires dedicated and deliberate effort and a beacon to follow.</p>
<p>Your inventory becomes a sealed vault inside the apartment. You may open the vault while in your Pocket Space, but doing so subjects its contents to the passage of time. If you or a resisting or unwilling subject is inside the vault when it is sealed again, time will continue to pass.</p>`,
})

homes.push({
  title: 'All Roads Lead to Home',
  cost: 10,
  whitelist: ['Pocket Apartment'],
  desc: 'Your purchased and captured retinue members may now create portals to your apartment. Multiple portals are now allowed. Portals will automatically close when not in use, but their locations will be saved into memory for you and your retinue to sense and re-open later.',
})

homes.push({
  title: 'Sweet Home',
  cost: 10,
  whitelist: ['Pocket Apartment'],
  desc: 'Your residence is double the size: 200 sq m, equivalent to a small house. It has a master suite (one large bedroom and one attached large bathroom), three other medium bedrooms, one and a half other bathrooms, a large living area, full-size kitchen with attached eating area, closet spaces, and one each of very large, large, and medium rooms that you can decide how to use: dojo, garage, library, a shared workshop, extra bedrooms, separate dining room, etc. You may also repurpose unneeded bedrooms until they’re filled. You may now make your Pocket Space any clearly delineated space within your Sweet Home, and not simply a physical vault.',
})

homes.push({
  title: 'Grand Manor',
  cost: 20,
  whitelist: ['Sweet Home'],
  desc: 'Your living space is significantly larger, at 1,000 sq m, with every living, training, and workshop area you and your waifus might need. A control room deep in the mansion will allow you to customize the structure however you like. Specialized workshop equipment and exotic resources will only be available if you have someone who knows how to use them, whether that’s a purchased or captured retinue member, your Substitute or Possess target, or by some other means. For safety reasons, all personnel and important items will be ejected from areas undergoing rearrangement.',
})

homes.push({
  title: 'Life’s A Beach',
  cost: 10,
  whitelist: ['Sweet Home'],
  desc: `
<p>Your Sweet Home now has a lawn - 15.2 sq km of it. A control center deep in the apartment will allow you to customize the landscape however you like: the default is a tropical island paradise with a standard equatorial day/night cycle and perfect weather all the time. This is the same control system as what Grand Manor provides. With this perk, your starting position will be within 30 minutes’ walk of the mansion, with a clear view of and path toward your destination so you don’t get lost. However you set the landscape, the edge of your pocket dimension will be selectively-permeable, allowing biome-appropriate wildlife to wander in from worlds that you and your retinue have visited or call home, without any issues from invasive species, implanted transmitters, pollutants, unwanted predators, etc. For safety reasons, all personnel and important items will be ejected from areas undergoing rearrangement.</p>
<p>If you bring a vehicle into the pocket dimension via Rainbow Bridge or some other method, regardless of whether the vehicle was purchased through this catalog, your dimension will have an appropriately-sized garage, dock, or hangar for it. If you have a starship from Catch-a-Ride, Heavenbuilt Proto, or third-party sources, it will be able to enter and land in your pocket universe even without a multiversal drive. Especially large dreadnoughts may require some geographic rearrangement first.</p>`,
})

homes.push({
  title: 'Warehouse District',
  cost: 20,
  whitelist: ['Grand Manor', 'Life’s A Beach'],
  desc: 'The basic Grand Manor offers an automatically replenishing supply of resources for each workshop, but only a limited amount at a time. Each warehouse in this district is 20 m tall and has about 50,000 sq m of floor space, enough to hold… a lot of materials. You can have as many individual warehouses as you have workshops, though this is also capped by your dimension’s physical space. New resources will appear here, in entire pallets at a time. Your retinue members’ workshops will now pull their materials from this central stockpile instead of generating their own.',
})

homes.push({
  title: 'Sweet Home Expansion',
  cost: 50,
  whitelist: ['Life’s A Beach'],
  multiple: true,
  max: 25,
  desc: 'Each purchase of this perk will double the surface area of your personal world. This perk may be purchased up to 25 times, with the final purchase expanding the world into, ultimately, a round planet the size of Earth. Warning: the mansion’s control room can only manage the weather and climate of the core region. Weather patterns in the outer areas will emerge naturally.',
})

homes.push({
  title: 'Pocket Star',
  cost: 11111,
  whitelist: ['Sweet Home Expansion (25x)'],
  desc: 'Your planet is no longer alone in its universe. This expands the pocket space’s radius to the same range as a Transhuman Master Core (~104.45 AU) and places a yellow star at the center with your planet orbiting around it. No additional planets or other features are included in this perk.',
})

homes.push({
  title: 'Niven? Never Heard of Him',
  cost: 1200,
  whitelist: ['Pocket Star'],
  desc: 'Your planet is now a full-size ringworld, a solid mass roughly 1.6 million km across and stretching across the entirety of its 940 million km orbital circumference. Including the inner shade ring, the contained atmosphere, and the regularly-placed stations on the outside of the ring - with their own reversed artificial gravity and access to the inner surface - it’s nearly 30 km thick. Even with significant immigration, a contractor’s ringworld may last millions of years before overpopulation ever becomes an issue.',
})

homes.push({
  title: 'Adjustment Field',
  cost: 200,
  requires: 'Need a sufficiently large Catch-a-Ride Replica',
  whitelist: ['Grand Manor',
    'Dragon Cabin',
    'Incandescent Ascendancy Machine',
    'Branded by Possibility',
    'Heavenbuilt Proto',
  ],
  flag: 'hasARide',
  needed: 1,
  freebies: {
    binding: ['Advanced Tempest Runes (Body)'],
  },
  desc: `
<p>The central console for your mansion now includes the body-modification functions for everyone inside. If you have Basic Tempest Runes, take its expansion Advanced Tempest Runes (Body) for free. If you already have Advanced Tempest Runes (Body) when you buy Adjustment Field, take its expansion Advanced Tempest Runes (Mind) for free. If you already have Advanced Tempest Runes (Mind) when you buy Adjustment Field, you may claim a discount equal to the total value of all Tempest Runes you have already purchased. This perk may also apply to Heritage-granted inner worlds such as the Dragon Cabin, the Biomorph’s creep zone, or the Cybermorph’s digital world.</p>
<p>The Adjustment Field’s modification suite is identical to that of Advanced Tempest Runes (Mind). You can apply separate sets of effects to inhabitants, visitors, and intruders, or more specific categories beyond that, and cycle between them as desired. The Adjustment Field is blocked by both Polymorph and Wyldscape Defense.</p>`,
})

homes.push({
  title: 'Rainbow Bridge',
  cost: 30,
  whitelist: ['All Roads Lead to Home', 'Exit Stage Left', 'Sweet Home'],
  desc: `
<p>A dedicated portal room allows pedestrian or vehicle access to your starting world and anywhere else you travel to. You and your retinue may no longer, and need no longer, create portals manually. Instead, portal sites are procedurally generated in each world, generally appearing near locations that are important or useful to you or your purchased and captured waifus. Portals will activate automatically when approached by a valid user: you, your waifus, and friendlies you invite, and deactivate automatically when not used. You and your retinue can sense the nearest portal’s location even without a map, and more precisely the closer you are to it. This is no replacement for a true map. Neutral, hostile, and uninvited eyes will not notice a portal’s presence, activation, or use, and cannot pass through.</p>
<p>Your first portal will only lead to your starting world. After that, new worlds will slowly unlock according to the same rules as Exit Stage Left. You may also unlock new worlds by either traveling there yourself or capturing a waifu who’s been there personally. All purchased waifus, without the Yoink or Slightly Used perks, have only been to two worlds: the world you bought them in and the factory where they were made. Don’t bother trying to go there. It’s employees-only.</p>`,
})
// #endregion

// #region talents
export const talentsDesc = 'Like all company-supplied powers, the powers granted by these perks cannot be nullified, copied, or stolen. Some of these perks may be partly or entirely redundant, depending on your choice of Origin.'
export const talents: PerkFull[] = []

talents.push({
  title: 'Everlasting Talent',
  cost: 10,
  desc: 'You live. You have weak immortality and eternal youth. If you are older than the peak age for your species (25 years for humans), your body is reset to that point; otherwise you\'ll continue to physically mature to that point but not experience any aging afterwards. This will not interfere with deliberate age-manipulation effects from within your retinue, whether from the company’s transformation suite or third-parties. If your maturation process had been halted by any means, it will now continue until your peak age. The "Fog of Ages," including atrophy of unused skills, will never affect you. This perk will not make you unkillable or grant any form of auto-resurrection. It just means you won’t grow feeble and die of “natural causes,” so don’t try anything foolish. The benefits of this perk will apply to your purchased and captured waifus, but you can disable it for specific individuals if you wish.',
})

talents.push({
  title: 'Body Talent',
  cost: 10,
  desc: `
<p>You lift. Your body is now in perfect fitness and health, with significant muscle growth, within healthy human standards. If your natural height was less, you are now between 170 and 210 cm tall - or will be, if you aren’t yet fully grown. Your clothes are all resized and your muscle memory adjusted to fit. (You may opt out of this height boost.) In the event of a mismatch, your body will change to match your gender identity, reflecting what you might have looked like if you’d been born as such, unless you created or maintained a mismatch with your choice of targets for Substitute or Possess. (You knew what you were getting into when you did that.)</p>
<p>All unwanted pre-existing medical conditions, from skin blemishes and unwanted body hair to chronic disease, missing limbs, detrimental genetic irregularities, and physical transformations are erased. (Cyborgs will find their reproductive system restored and augmentations optimized within their technological base.) This full heal will automatically trigger only once for each member of your retinue, including yourself: when you first purchase Body Talent or when the person joins your retinue, whichever happens second.</p>
<p>You are immune to further minor illnesses, but not diseases or injuries. All healing or medical operations performed on you will complete without complications, residual pain, or unwanted scars.</p>
<p>Additionally, you can rapidly learn any non-supernatural athletic skills you encounter: acrobatics, physical sports, parkour, swimming, etc. Skills directly related to combat fall under Martial Talent instead, while supernatural extensions of skill are affected by Psychic or Soul Talents. This is an experience and skill acquisition multiplier, not a flat improvement, and scales to the strength and skill of your opponents and trainers: the better they are than you, the faster you learn, until you’ve caught up to them.</p>
<p>The individual benefits of this Talent may also apply, at your discretion, to any/all of your purchased and captured waifus. Unwanted conditions are erased according to your wants, not theirs. If you purchased Extra, Substitute, or Possess, this perk will be retroactively applied to your new body, with the exception noted above.</p>`,
})

talents.push({
  title: 'Martial Talent',
  cost: 10,
  desc: 'You fight. You have prodigious martial talent and can rapidly learn any personal, non-supernatural combat skills you encounter, whether melee or ranged. Supernatural extensions of martial skill are instead affected by Psychic or Soul Talents. This is an experience and skill acquisition multiplier, not a flat improvement, and scales to the strength and skill of your opponents and trainers: the better they are than you, the faster you learn, until you’ve caught up to them. This also applies to command ability, not just personal skill. ',
})

talents.push({
  title: 'Wild Talent',
  cost: 5,
  desc: 'You camp. You have a knack for living in the wilderness, with a natural feel for how to identify and make use of edible food, potable water, suitable shelter, animal tracks, etc. You know how to ride a mundane horse. In worlds that don’t use horses, you can quickly adapt your riding methods to whatever appropriate beasts are available.',
})

talents.push({
  title: 'Science Talent',
  cost: 20,
  additionalDesc: `
  To unlock new types of scientific magic beyond "styles anyone can use" and whatever might be unlocked by your Extra, Substitute, or Possess origin, use Added Potential. Advanced Template Stacking (Arcane), or various Heritage perks.
  `,
  desc: 'You know. You can keep up with scientific babble, operate any computer, smart device, or vehicle as if you grew up with it, and rapidly learn any scientific magic you encounter and are capable of using. This is an experience and skill acquisition multiplier, not a flat improvement, and scales to the strength and skill of your opponents and trainers: the better they are than you, the faster you learn, until you’ve caught up to them.',
})

talents.push({
  title: 'Engineering Talent',
  cost: 30,
  whitelist: ['Science Talent'],
  desc: 'Most so-called “mad scientists” are actually mad engineers. You can apply your natural knowledge toward practical purposes, whether personal or large-scale, for peace or war. Different engineering fields require different knowledge bases - just because Science Talent has taught you how one principle works doesn’t mean you can achieve the same result using a principle you haven’t learned yet.',
})

talents.push({
  title: 'Aesthetic Talent',
  cost: 10,
  desc: 'You design. You have a prodigious talent in the visual arts: painting, sculpture, photography, fashion and makeup, etc. This is an experience and skill acquisition multiplier, not a flat improvement, and scales to the skill of your trainers, cohorts, and competition: the better they are than you, the faster you learn, until you’ve caught up to them. The creation of things that have practical purposes is instead covered under Engineering Talent.',
})

talents.push({
  title: 'Communication Talent',
  cost: 10,
  desc: `
<p>You understand. You can read a room, spot deceit or employ your own, know when to speak and when to hold your tongue, and find the right words to say for good or ill. You will neither be That Guy whom women warn their friends about, nor the otaku nerd whose obsessions drive others away. This does not lend any additional power to your words - that’s what Siren’s Song is for - nor will it make you enjoy social interactions for their own sake. It only guarantees knowledge and competence.</p>
<p>Additionally, you are immediately fluent in any spoken language you encounter and will speak it like any native in only a few days, with mastery of the written form taking a week on average; this part always applies to your retinue as well. Finally, you have a prodigious talent for writing, regardless of whether the subject is fiction or nonfiction. Depending on the skill of your trainer, cohorts, and rivals, you can elevate your own skill beyond ordinary human ability, following the same rules as the other Talents.</p>`,
})

talents.push({
  title: 'Performance Talent',
  cost: 10,
  desc: 'You express. You have a prodigious talent in the kinesthetic arts: music, dance, acting, etc. This is an experience and skill acquisition multiplier, not a flat improvement, and scales to the skill of your trainers, cohorts, and competition: the better they are than you, the faster you learn, until you’ve caught up to them. Audiovisual and stage production are instead covered under Engineering Talent.',
})

talents.push({
  title: 'Soul Talent',
  cost: 10,
  additionalDesc: `
  To unlock new types of mystical arts beyond “styles anyone can use* and whatever might be unlocked by your Extra, Substitute, or Possess origin, use Added Potential, Advanced Template Stacking (Enlightened), Advanced Template Stacking (Green), or various Heritage perks.
  `,
  desc: 'You feel. You have prodigious talent for ki arts (aura, chi, Hamon, Phonic Gain, Spiral Power, etc.) and magic and will rapidly learn any such mystical arts you encounter and are capable of using. Unlike the buffs from Heritage or Shroud elements,  this is an experience and skill acquisition multiplier, not a flat improvement. This effect scales to the strength and skill of your opponents and trainers: the better they are than you, the faster you learn, until you’ve caught up to them. This does not apply to scientific forms of magic.',
})

talents.push({
  title: 'Blessed Talent',
  cost: 30,
  whitelist: ['Communication Talent', 'Soul Talent'],
  desc: `
<p>Fortuna and her peers smile upon you. Higher powers, whether they’re deities, demons, or merely greater elementals or other spirits, will warm up to you more quickly than just anyone. Blessings or gifts given to you will be more powerful or useful, and curses or smitings aimed at your enemies will be more effective, scaling to how much the specific higher power likes you compared to who- or whatever you’re calling upon them for.</p>
<p>If you are a god, the use of your own godly powers benefits from Soul Talent instead. In that case, if you also have Talent Sharing for this perk, it will remain useful for anyone in your retinue who calls upon your power.</p>`,
})

talents.push({
  title: 'Psychic Talent',
  cost: 20,
  desc: `
<p>You think. You have prodigious psychic talent and can rapidly learn any psychic abilities you encounter: from the telepathy and telekinesis that are so common in otherwise-hard sci-fi to Academy City esper powers, Biotics, and even the extremes typical of western comic-book psychics. This applies to traditional psychic abilities only: telepathy, telekinesis, remote viewing, astral projection, prescience, pyrokinesis, technopathy, etc., provided their trappings are neither magical nor technological.</p>
<p>Projections such as Stands or Personas are subject to this Talent, not Soul. If you were not already capable of manifesting one, you are now theoretically capable of doing so, provided you have a Stand Arrow, someone who can awaken your Persona, etc. You can only have one such projection; if you already have a Persona when you’re pierced with a Stand Arrow, the Arrow will upgrade the Persona, and vice versa. Wild Cards (typically, those who Substituted or Possessed a Persona protagonist) are subject to their usual limit instead.</p>
<p>This is an experience and skill acquisition multiplier, not a flat improvement, and scales to the strength and skill of your opponents and trainers: the better they are than you, the faster you learn, until you’ve caught up to them.</p>`,
})

talents.push({
  title: 'Covert Talent',
  cost: 10,
  desc: `
<p>You lie, cheat, and steal. You have a prodigious talent for larceny, trespassing, theft, espionage, counterintelligence, and other forms of covert activity, whether it’s performed on a government’s dime or not. You can disappear into any crowd, no matter how sparse. With Engineering Talent, you can learn to hack any device. With Communication or Performance Talents, you can grift the best con artists out of their money. With Aesthetic Talent, you can make perfect forgeries of any artist’s style. Body Talent’s boost to athleticism also synergizes with this perk.</p>
<p>This is an experience and skill acquisition multiplier, not a flat improvement, and scales to the strength and skill of your opponents, rivals, and trainers: the better they are than you, the faster you learn, until you’ve caught up to them.</p>`,
})

talents.push({
  title: 'Talent Sharing',
  cost: 10,
  complex: 'flavor',
  desc: 'The effects of one of your purchased Basic Talents now apply equally to every member of your retinue, as if you had shared them through a Binding or Heritage perk. This must be purchased separately for each valid Talent: Martial, Wild, Science, Engineering, Aesthetic, Communication, Performance, Soul, Blessed, Psychic, Covert, and Sticky Fingers (as “Tantric Talent”). Everlasting and Body are always shareable. This perk is obsoleted by Controls or Heritage perks that share Talents and may be refunded completely after such purchases.',
})

talents.push({
  title: 'Inexhaustible',
  cost: 140,
  whitelist: ['Everlasting Talent', 'Soul Defense (2x)'],
  desc: 'Your inner energies are truly infinite. You will never run out of vital, magical, psychic, or soul power to fuel your abilities with. You can develop your ability to spend more of this reserve at a time with training and Soul Talent. This reserve will automatically be shared with other soul-bonded members of your retinue, whether they’re a host to a Core of a Transhuman with Essence Upload or connected by Conjunction, a familiar bond, or some other means. If you have Essence Reactors, their effective output and storage capacities will be doubled.',
})

talents.push({
  title: 'Template Stacking 0: Added Potential',
  cost: 5,
  complex: 'target_f',
  anything: 'Power Name',
  special: 'Must be repurchased for each use.',
  desc: `
<p>The rules of other worlds often bar just anyone from learning or developing special powers. Travelers often find themselves unable to learn any local abilities, even with the help of Science or Soul Talent, simply because they weren’t born in that world. This perk bypasses this limitation, allowing the person it’s bought for, whether yourself or a retinue member, to develop a single local ability, just like anyone else who would normally do so. “A single ability” can be quite broad, ranging from an X-mutation or Quirk unique to the individual, to Remnant-style Aura or Nasuverse Magecraft. These are all generic abilities, in the context of their home worlds; Tier 11 abilities are not eligible.</p>
<p>Unlike Template Stacking, this perk does not grant practical power immediately: all purchases start from level zero, as it were, and must be trained before they’ll become usable. Self-study can help in some circumstances, but is no substitute for a proper trainer, whether purchased or a local.</p>
<p>Abilities that are generic in their source but are expressed uniquely, such as Sacred Gears, Semblances, Academy City Esper powers, Quirks, or the results of the X-gene, will be unique to you as well. This perk and other Meta-Talents together may generate no more than one of each such power per individual.</p>
<p>If you purchase the same template for any ten of your retinue members including yourself, including through Template Stacking 1 or OC Donut Steel, the rest of your retinue will gain this perk for that specific template for free.</p>
`,
})

talents.push({
  title: 'Template Stacking I',
  cost: 15,
  special: 'Must be repurchased for each use.',
  complex: 'target_f',
  anything: 'Power Name',
  desc: `
<p>Sometimes you want to copy a generic powerset. This perk lets you do just that, for any power short of Tier 11. If you purchase this perk for yourself at chargen, or for a retinue member at the time you purchase them, you get the powerset outright. The exact capabilities at the time of purchase will be scaled to Tier 4, equivalent to the 10 credit version of Extra. Stacked Templates can then be trained higher with the appropriate Basic Talent, regardless of whether the original version is rated at Tiers 4, 5, or 10. You will also receive a skill framework for your purchase, identical in principle to the ones that “early” captures receive to ensure they learn their missing abilities. This applies to technological “abilities” as well.</p>
<p>If you purchase this perk for yourself after chargen, or, for a retinue member, after the time of purchase or capture, you may need to recreate an original user’s empowering event, if there was one. You will not make any mistakes or experience unwanted side-effects in the process. This perk is not necessary for any powers that your purchased or captured retinue members might grant you via surgery, ritual, or other means. Note that some origins suck more than others: speaking Truck-kun’s name into a mirror three times in a row is not recommended.</p>
<p>Racial templates (Kryptonian, Metallic Dragon, Newtype, Saiyan, etc.) can only be stacked in a starting build and will not be equivalent to a Heritage version of that template. Unlike Advanced Tempest Runes (Body), a living, natural example of that template is not necessary. Stacking multiple racial templates together will produce the same diminishing returns as Advanced Tempest Runes (Hybrid). Other powers that are only available to those who were born with them, such as hereditary magic systems, may be acquired through this perk at any time. In that case, there is no empowering event to recreate and thus no requirement for one. Abilities found elsewhere in this catalog are not available through this perk, nor are abilities found only in other CYOAs.</p>
<p>Abilities that are generic in their source but are expressed uniquely, such as Sacred Gears, Semblances, Academy City Esper powers, Quirks, or the results of the X-gene, will be unique to you as well. This perk and OC Donut Steel together may generate no more than one of each such power per individual.</p>
<p>If you purchase the same non-racial template for any ten of your retinue members including yourself, including specific examples of that template through OC Donut Steel, the rest of your retinue may gain this perk for that specific template for free. You can control the specifics through your smart device.</p>`,
})

talents.push({
  title: 'Racial Template',
  cost: 20,
  complex: 'target_f',
  anything: 'Race Name',
  special: 'Chargen only (self). Moment of purchase only (retinue). Must be repurchased for each use.',
  desc: `
  <p>Racial templates (Kryptonian, Metallic Dragon, Newtype, Saiyan, etc.) have additional rules that distinguish them from other kinds. Templates that align with Heritages will not be equivalent to their counterparts. Unlike Advanced Tempest Runes (Body), a living, natural example of that template is not required for your selection with this perk. This perk may not be applied to your captures, nor to purchase Tier 11 racial templates. Your starting version of any racial template will be limited to Tier 4; you can train it up to its natural state in the same ways as other Meta-Talents.</p>
  <p>Purchases of this perk are limited to one per individual and will overwrite the individual’s original race for all purposes. Advanced Tempest Runes (Hybrid) or a geneticist, biomanipulator, or polymorpher of your own are required for creating hybrids.</p>
`,
})

talents.push({
  title: 'OC Donut Steel',
  cost: 20,
  complex: 'target_f',
  anything: 'Character name',
  special: 'Must be repurchased for each, use.',
  desc: `
<p>Sometimes you just want to copy a specific individual’s powerset. This perk lets you do just that, for any individual short of Tier 11. If you purchase this perk for yourself at chargen or for a retinue member at the time you purchase them, you get the power outright. The exact capabilities at the time of purchase will be scaled to Tier 4 and can be trained higher with the appropriate Basic Talent - regardless of whether the original version is rated at Tiers 4, 5, or 10. You will also receive a skill framework for your purchase, identical in principle to the ones that “early” captures receive to ensure they learn their missing abilities. This applies to technological “abilities” as well. For characters that are made from multiple other characters, including the purchasable versions of many Nasuverse Servants in this catalog, each component must be bought separately.</p>
<p>If you purchase this perk for yourself after chargen, or, for a retinue member, after the time of purchase or capture, you may need to recreate the original user’s empowering event, if there was one. You will not make any mistakes or experience unwanted side-effects in the process. This perk is not necessary for any powers that your purchased or captured retinue members might grant you via surgery, ritual, or other means. Note that some origins suck more than others: speaking Truck-kun’s name into a mirror three times in a row is not recommended. Abilities found elsewhere in this catalog are not available through this perk, nor are abilities found only in other CYOAs.</p>
<p>For abilities that are generic in their source but are expressed uniquely, such as Sacred Gears, Semblances, Academy City Esper powers, Quirks, or the results of the X-gene, this perk will grant you the exact individual’s power you seek. This perk and Template Stacking I together may generate no more than one of each such power per individual.</p>`,
})

talents.push({
  title: 'Template Stacking II',
  cost: 20,
  special: 'Must be repurchased for each use.',
  complex: 'target',
  whitelist: [
    'Extra',
    'OC Donut Steel',
    'Template Stacking I'],
  needed: 1,
  desc: 'You or your chosen retinue member’s template is upgraded to a version of the template rated at Tier 5. This is a flat increase to power and skill. As with Template Stacking I, the ability can then be trained higher with the appropriate Basic Talent, regardless of whether the original version is rated at Tier 4, 5, or 10. This perk also grants requisite gear for the chosen template. Advanced functionality beyond Tier 5 capabilities will be locked, at first, and become available with training.',
})

talents.push({
  title: 'Advanced Template Stacking (Arcane)',
  cost: 100,
  complex: 'target',
  whitelist: ['Science Talent', 'Soul Talent'],
  desc: `
<p>The entire spectrum of scientific magic styles is now available to you without further restriction. You must still encounter such styles before you can use them, whether in the field, buying them with OC Donut Steel or Template Stacking, or through the purchase of a retinue member who has one. Additionally, such styles are more effective when you use them and easier to develop. </p>
<p>This perk consolidates all purchases of OC Donut Steel and Template Stacking I that fall under its theme into a single item. Take a refund on all such purchases for the person this is applied to.</p>`,
})

talents.push({
  title: 'Advanced Template Stacking (Enlightened)',
  cost: 100,
  complex: 'target',
  whitelist: ['Psychic Talent', 'Body Talent', 'Martial Talent', 'Soul Talent'],
  needed: 2,
  desc: `
<p>The entire spectrum of ki arts and personal mystical powers are now available to you without further restriction. You must still encounter any such arts and styles before you can use them, whether in the field, buying them with OC Donut Steel or Template Stacking, or through the purchase of a retinue member who has one. Additionally, such arts and styles are more effective and easier to control. This also applies to the inner powers gained from certain Heritages.</p>
<p>This perk consolidates all purchases of OC Donut Steel and Template Stacking I that fall under its theme into a single item. Take a refund on all such purchases for the person this is applied to.</p>`,
})

talents.push({
  title: 'Advanced Template Stacking (Green)',
  cost: 100,
  complex: 'target',
  whitelist: ['Wild Talent', 'Soul Talent'],
  desc: `
<p>The entire spectrum of magical styles that draw mystical power from one’s surroundings are now available to you without further restriction. This includes, but is not limited to, Warhammer’s Winds, a Planeswalker’s Lands, Geomancy, or anything powered by leylines or background magical fields. You must still encounter any such styles before you can use them, whether in the field, buying them with OC Donut Steel or Template Stacking, or through the purchase of a retinue member who has one. Additionally, such arts and styles are more effective and easier to control.</p>
<p>This perk consolidates all purchases of OC Donut Steel and Template Stacking I that fall under its theme into a single item. Take a refund on all such purchases for the person this is applied to.</p>`,
})

export const additionalDefenseDesc = `
<h3 class="text-lf font-semibold text-center">The Outer Shell</h3>
<p>If you or a member of your retinue is a genius loci or otherwise large enough to hold people inside them, their passengers and cargo will be protected by Defense perks as well. This includes vehicles acquired via Waifu Perks or Catch-a-Ride, but does not protect against effects that originate from within the barrier.</p>
`
export const defenceDesc = `
<p>Defense perks protect you and your retinue members, regardless of whether they were purchased or captured, from the relevant effects. All Defenses are purchased in two stages. The first stage, or copy, of a Defense offers resistance to the effects it covers, and the second expands that to total immunity. Both purchases are the same price. The total cost of both copies appears in parentheses. No lasting effect inflicted on you that is covered by an active defense will ever be permanent - everything will wear off over time, depending on circumstance or the effect’s strength.</p>
<p>The descriptions for each Defense represent the starting points for each defense. At the resistance level, exposure to any specific effect will allow you to gradually increase your resistance to it, making that effect weaker, less unreliable, and/or faster to wear off. Immunities are built separately for each specific type of effect, even if they both fall under the same defense - a single toxin or disease, a single method of divination or mind control, etc. At most, resistance to one effect may partially apply to closely related other ones, such as a family of toxins with similar properties, a closely related family of pathogens, or a narrow school of divination or type of mind control method. Building up immunities to every effect can take centuries, for each member of your retinue, and those immunities will not be permanent. The second purchase of a Defense bypasses all of this, giving you blanket immunity to everything it covers..</p>
<p>Each Defense has an associated discount, conditional on the traits of your Origin and retinue members, equal to the list price of the qualifying individual’s effective tier after step 3 and capped at 40% of the list price of each Defense stage. This also applies if you only meet the condition after you started your contract - in which case the discount is always 40% - or a retinue member (purchased or captured) only does so while in your service. One individual can qualify you for multiple discounts.</p>
<p>If you have multiple separate discounts for the same Defense, they’ll stack: three full discounts to the same Defense will make one stage of it free, while a total of five full discounts will make both stages free. If that happens, any extraneous free copies of that Defense from your Controls or Heritage perks will instead discount those perks by the Defense’s full value, up to the standard cap on that kind of discount. If you sell or otherwise lose a retinue member whose presence granted you a discount, you’ll lose the discount as well.</p>`
// #endregion

// #region defenses
export const defenses: PerkFull[] = []

defenses.push({
  title: 'Body Defense',
  special: '<Individual> is known for handling disease, chemical medicine, or poisons.',
  cost: 5,
  whitelist: ['Body Talent'],
  desc: `
<p>You have protection from all diseases, toxins, and targeted radiation. Lethal or crippling afflictions will leave you sick enough to most likely stay in bed, unless you really have to move - because you're attacked, for example. Anything short of that will leave you weakened and uncomfortable, but functional.</p>
<p>Additionally, you get an extra one-time full heal, identical to the one offered by Body Talent, with each purchase of this Defense. These are counted separately for each member of your retinue, including yourself and anyone acquired after the purchase of this Defense. These may be kept for future use.</p>
<p>This perk still does not protect against injury or provide any sort of healing factor; if you want one, you’ll have to find it yourself.</p>`,
})

defenses.push({
  title: 'Wild Defense',
  special: '<Individual> hails from a harsh climate.',
  cost: 5,
  desc: 'You are equally comfortable on a glacier as you are in a sandy desert, steamy jungle, irradiated wasteland, or temperate floodplain. Combined with Body Defense, you are never at risk of suffocation in a gaseous atmosphere. You can dive far deeper than any human, provided you bring an air supply with you. At the base level, survival will not necessarily be pleasant. Non-fatal/crippling injuries (burns, crush or decompression injuries) are a real possibility.',
})

defenses.push({
  title: 'Environmental Defense',
  special: '<Individual> can ignore hazardous environments.',
  cost: 25,
  whitelist: ['Wild Defense'],
  desc: 'Wild Defense’s protections now apply to true extremes. allowing you to enter the oceanic abyss or hard vacuum, or even go sun-diving and live. This also protects against purposeless, degenerative, relatively mundane mutations. This perk does not protect against injuries.',
})

defenses.push({
  title: 'Creature Defense',
  special: '<Individual> is known as a monster-tamer or otherwise being good with animals.',
  cost: 10,
  desc: 'Non-sapient living things - beasts, flora, or fungi - will not attack you without provocation, i.e. coming too close to it, its family, its food, or its territory, or appearing too threatening, such by making sudden moves or loud noises. Wildlife will always attempt to obviously scare you off before attacking, including through speech (for creatures capable of it). Extremely hungry wildlife may still approach or stalk you to size you up, but will not ambush you, and you can scare them off with some effort.',
})

defenses.push({
  title: 'Stress Defense',
  special: '<Individual> is known for keeping a cool head or having great willpower.',
  cost: 5,
  desc: 'Get that dirt off your shoulder. You can act calmly under pressure and are protected from degenerative mental effects.',
})

defenses.push({
  title: 'Addiction Defense',
  special: '<Individual> known for having a material vice.',
  cost: 10,
  whitelist: ['Stress Defense'],
  desc: '“The key word in that sentence is functional!” You can indulge in the joys of life without risking any sort of physiological or psychological dependence. At the resistance level, you will still experience cravings and withdrawal, but in a relatively mild form that you can push through with a bit of effort. This Defense also protects you from the relevant effects of your own lures, notably Faerie Feast and the Tantric Talent form of Sticky Fingers.',
})

defenses.push({
  title: 'Mind Defense',
  special: '<Individual> is known as a psychic or mind-manipulator.',
  cost: 25,
  desc: 'You are protected from all mind control effects from outside of your retinue and unwanted attempts from within. Attempts to influence you will be weaker and you have an easier time noticing them and fighting them off. At least part of your mind will always remain beyond any control, leaving you free to fight your controller from within - creatively reinterpreting orders, temporarily suppressing or weakening their influence, leaving part or all of your body locked in indecisive spasms, or even throwing off their control entirely if what they\'re trying to make you do goes too far against your true self. Successful mind control within your retinue will require your consent, not the victim’s. Friendly psychics may still contact you or your retinue through telepathy.',
})

defenses.push({
  title: 'Possession Defense',
  special: '<Individual> is known for bodyjacking others.',
  cost: 10,
  whitelist: ['Body Defense', 'Mind Defense'],
  needed: 1,
  desc: 'Nobody controls your body except you. You are protected from parasites, spiritual possession, remote body control, and body-swapping shenanigans, whether you’re conscious or not. The same forms of resistance from Mind Defense can manifest with this perk as well.',
})

defenses.push({
  title: 'Soul Defense',
  special: '<Individual> can drain or feed on life, mana, or souls.',
  cost: 25,
  desc: 'You are the master of your soul. You are protected from all vitality-, mana-, and soul-draining effects. At the resistance level, attempts to feed on you will have diminishing returns, leaving your attacker unable to drain you completely. Waifus who feed on souls or lifeforce can get all the nutrition they need from you or your other waifus without causing harm, even from side effects such as loss of fluids. This protects you and your retinue from third parties, but not vice versa. This perk does not reduce the energy use from your own efforts in any way - you want Inexhaustible for that.',
})

defenses.push({
  title: 'Fatality Defense',
  special: '<Individual> is known for inflicting instant death or not dying even when killed.',
  cost: 50,
  whitelist: ['Everlasting Talent'],
  desc: 'Conceptual instant death and other soul-destroying effects may hurt and weaken you, but never kill you. Alternatively, you will be able to cling to life as a disembodied shade until your retinue can produce a replacement body for you to inhabit, or you simply force yourself to resurrect after some time.',
})

defenses.push({
  title: 'Polymorph Defense',
  special: '<Individual> is known for polymorphing others.',
  cost: 50,
  whitelist: ['Body Defense', 'Wyldscape Defense', 'Corruption Defense'],
  needed: 1,
  desc: `
<p>You can resist targeted supernatural transformations. Such attacks will take more effort and tend to remain incomplete and weaken you less than they should unless repeated for long enough. For example, an attempt to turn you into a tiny newt may turn you into a giant newt or a still-functional newt-man. Any loss of strength, durability, or similar traits from transformation will experience diminishing returns.</p>
<p>At the immunity level, If you are transformed in such a way, even before you were protected by this perk, you may easily reverse the effect, entirely or in piecemeal, at will. All detransformations in your retinue will require your consent, not the victim’s. Contagious transformations that you allow will not spread from you or your retinue to third parties unless you choose to let that happen as well.</p>`,
})

defenses.push({
  title: 'Wyldscape Defense',
  special: '<Individual> hails from a region where the local reality is unstable.',
  cost: 50,
  whitelist: ['Environmental Defense', 'Polymorph Defense', 'Corruption Defense'],
  needed: 1,
  desc: `
<p>You can resist ongoing supernatural transformations that just affect anyone who enters the area of effect.  The same forms of resistance from Polymorph Defense can manifest with this perk as well.</p>
<p>At the immunity level, if you are transformed in such a way, even before you were protected by this perk, you may easily reverse the effect, entirely or in piecemeal, at will. All detransformations in your retinue require your consent, not the victim’s. Contagious transformations that you allow will not spread from you or your retinue to third parties unless you choose to let that happen as well.</p>`,
})

defenses.push({
  title: 'Corruption Defense',
  special: '<Individual> is known for forcibly bringing out others’ dark sides.',
  cost: 50,
  whitelist: ['Soul Defense', 'Polymorph Defense', 'Wyldscape Defense'],
  needed: 1,
  desc: 'Metaphysically corruptive effects, whether environmental or targeted in nature, are slower to affect you, with diminishing returns the farther the corruption would take you from your fundamental self. After they wear off, you may choose to retain effects that would normally be permanent (plus any attendant transformations, if you have those defenses) as a sort of superpowered evil side, or a separate alter ego to converse with. These remain fundamentally you, just a different version of you seen through a different lens. Other Defenses such as Body, Stress, Addiction, Mind, and Soul may prove extremely useful, depending on the specifics of such a scenario.',
})

defenses.push({
  title: 'Information Defense',
  special: '<Individual> is known for their ability to read or sense people.',
  cost: 25,
  desc: 'Scouters can’t read your power level. Information about you, from mind-reading, super-analysis, or metaphysical senses will tend to be unclear, incomplete, misleading or even flat-out wrong, or similarly unreliable - the more important any secret of yours is, or the more dangerous to you, the more difficult it will be to perceive, much less perceive accurately. This applies to both attempts from outside of your retinue and unwanted attempts from within, but not Conjunction. You may still allow friendly or neutral third parties to use such abilities on you.',
})

defenses.push({
  title: 'Trace Defense',
  special: '<Individual> is known for using divination or other non-technological remote viewing.',
  cost: 50,
  desc: 'You are the master of your trail. Hostile and neutral remote viewing attempts: precognition, postcognition, scrying, dream visitation, etc. will have a harder time perceiving you. The same forms of resistance from Information Defense can manifest with this perk as well. At the immunity level, supernatural observers might only see a world where you don’t exist. This does not apply to direct naked-eye observation, other forms of mundane (technological) surveillance and analysis, or Dragon Aura’s pull on higher-tier waifus.',
})

defenses.push({
  title: 'Destiny Defense',
  special: '<Individual> is known as a fate- or luck-manipulator.',
  cost: 50,
  desc: `
<p>You are the master of your fate. Attempts to change your fate or luck will be more difficult, less reliable, and weaker than they would normally be - increasingly so the more directly they target you instead of just your surroundings, the more improbable they are, and the more precision they require. Changes that do go through will be more easy to reverse than they would be otherwise.</p>
<p>As with the other Defense perks, you may still experience any beneficial effects of these sorts of manipulation even if you have the second perk for immunity.</p>`,
})

defenses.push({
  title: 'Paradox Defense',
  special: '<Individual> is known as a time-manipulator.',
  cost: 50,
  desc: `
<p>You are the master of your timeline. Temporal slowdowns will have increasingly weaker effects on you the stronger they are - a weak slowing effect will be even weaker, but a stronger one and even a total time-stop will not leave you completely unable to react. You will retain memories of previous timelines, loops, or other resets, even if they are faded or incomplete, and any attempts to spy on or change your timeline will have the same problems mentioned under Information, Trace, and Destiny Defenses. Attempts to erase you entirely will merely leave you weakened, faded, or flickering into and out of existence randomly.</p>
<p>This perk also blocks forced unwanted teleportation, whether that involves sending you somewhere else or sending something into your current position. Resistance to such effects may make the teleport require more effort or send you somewhere inconvenient to both yourself and the teleporter.</p>`,
})
// #endregion

// #region Misc Perks
export const perks: PerkFull[] = []

perks.push({
  title: 'Temporal Calibration',
  cost: 5,
  desc: 'Entering a new world, only to learn that the capture targets are out of your strike zone, can be… inconvenient. With this perk, the ages of any canon characters can be freely adjusted. Any events of canon that would be affected by the altered ages are adjusted as little as possible to keep the same general flow of events, keeping the scenario recognizable even though the participants are possibly decades older or younger. Changes created using this perk, or any perks that have this as a prerequisite, cannot fundamentally shift a setting’s danger rating.​',
})

perks.push({
  title: 'Universal Calibration',
  cost: 20,
  whitelist: ['Temporal Calibration'],
  desc: `
<p>The targeting algorithms for your methods of multiversal travel are biased in your favor. Whether you use the Exit Stage Left or Rainbow Bridge perks, multiversal Heritage abilities, your waifus’ powers, or even local technology, you will usually end up in a place where the population is more… suited to your tastes. All inhabitants will be more attractive to you, personally. This includes and builds upon the effects of Temporal Calibration. Additionally, your sexual fetishes and other preferences will be unusually common on the worlds you visit, with listed capture targets sharing at least some compatible interests… unless that runs counter to your own.</p>
<p>The above standard calibration is a best-guess preset based on your likes. You can fine-tune the specific settings, define and swap among multiple presets, and even reset all conditions to the default, in an app on your smart device. Your currently-chosen calibration, whatever the specifics, will modify every world that you visit for as long as it remains active. This includes worlds that you’ve visited previously: you’re actually entering a parallel worldline that’s identical in every way except for your presence and the effects of the calibration. To visit a previous calibration-worldline, simply exit the world, close the portal if there is one, recalibrate, and re-enter.</p>
<p>Neither your Pocket Apartment nor your vehicles granted by Catch-a-Ride or Heavenbuilt Proto can be affected by recalibration. If left behind in an old worldline when you recalibrate, the vehicles will bounce forward into the new one; if you have Life's a Beach, the vehicles may instead return to their parking/docking/landing site.</p>`,
})

perks.push({
  title: 'Sexual Calibration',
  cost: 2,
  desc: 'The little inconveniences that can make sex less fun no longer apply to you. Your partners will always be as clean as needed and smell just as you like. If you have a refractory period, it is removed. Any unintentional or incidental damage that your sexual sessions might cause simply doesn’t take place. This includes unwanted pregnancy and any complications of pregnancy; note that this perk cannot guarantee a desired pregnancy. Exhaustion will not be an issue for any participant in your sexual sessions until at least you are satisfied. You can extend all of this to your partners as well.',
})

perks.push({
  title: 'Fertility Calibration I',
  cost: 2,
  whitelist: ['Sexual Calibration'],
  desc: 'You now have total control over the chances of pregnancy in any sexual encounter involving you or a member of your harem, even overriding any fertility control your waifus may employ. This perk does not alter the chance of multiple fetuses relative to the chance of just one.',
})

perks.push({
  title: 'Fertility Calibration II',
  cost: 6,
  multiple: true,
  max: 6,
  whitelist: ['Fertility Calibration I'],
  desc: 'You can now ensure that a sexual encounter involving you or a member of your harem results in twins. This perk may be purchased up to six times, with each purchase allowing you to guarantee up to twice as many fetuses: second purchase quadruplets, third purchase octuplets, fourth purchase 16, etc. This perk does not apply to Symbiote larvae or other spawn with a different body structure than yourself.',
})

// Navigation Perks

perks.push({
  title: 'Mapper',
  cost: 10,
  desc: `
<p>This app offers maps of the current world you’re on, with points of interest annotated. No information that could not be discovered by casually asking around is listed, so while a public facing organization like a merchant's guild will be annotated, the local thieves' guild will not. This map will update itself if you discover a point of interest that would normally be left off of the map. You are also able to search for points of interest. Tapping on a point of interest (or the equivalent for your smart device) will bring up a short description of it. You can add any number of your own annotations to the descriptions. Descriptions will update in real time if there are significant changes, such as a store closing.,</p>
<p>If you have Rainbow Bridge, you can toggle to any world you have access to at the current time.</p>`,
})

perks.push({
  title: 'Target Tracker',
  cost: 10,
  whitelist: ['Mapper'],
  desc: 'This app adds the ability to track any mobile target you take a picture of, whether it’s a person, a vehicle, or anything else capable of moving under its own power, appearing as a stylized but recognizable icon of the tracked target. Basic status information will also be displayed if you tap on the icon. You can hide specific icons and cancel tracking of a target at any time. You will need to take a new picture of a target once you cancel tracking if you want to resume. “Missing” familiars of retinue members you’ve captured, who didn’t have their familiars yet when you did so, will automatically be entered into this tracker.',
})

perks.push({
  title: 'Bounty Tracker',
  cost: 50,
  whitelist: ['Target Tracker'],
  desc: 'This app integrates the catalog bounties with the map. Any bounty targets listed in the catalog for the current world can be added as tracked targets. Additionally, for any captures that you acquired “early,” the familiars and standard equipment that they would have if you had purchased them will automatically appear in this app, with different markers than the ones used for new bounties.',
})

// Travel Perks

perks.push({
  title: 'Exit Stage Left',
  cost: 5,
  desc: 'The company app in your smart device has a new feature. Its main display is simply a progress bar that measures everything you do in your current location, whether that’s capturing local waifus, defeating baddies, or otherwise accomplishing story goals. Once the bar is full, a button on the screen will light up that opens a portal to a randomized new world within one danger level of your current one. (If you have Pocket Apartment or We Will Meet Again, the randomizer will choose based on your most recent new world.) These portals are one-way only, and will last no more than two minutes or until you and all of your waifus have passed through, whichever is shorter.  If any of your waifus stay behind, this perk will not help you retrieve them. If your destination world has a lower danger rating than your current one, a second “penalty” bar will appear above the regular progress bar. It must be filled before the regular progress bar will start to move. The larger the gap between the two ratings, the more work you’ll need to do in the new world.',
})

perks.push({
  title: 'We Will Meet Again',
  cost: 15,
  whitelist: ['Exit Stage Left'],
  desc: 'You may freely return to previously-visited worlds using the Exit Stage Left app. All worlds you’ve visited since the start of your journey, including your Pocket Apartment if you have one, will be listed with their danger ratings. (Pocket Apartment does not have a danger rating.) You can sort the list alphabetically, by danger, or by your first or most recent visits. Your return portal will always be within 2 km of its last location, at the least dangerous point in that radius. If you have not purchased Pursued by a Bear, Exit Stage Left’s basic functionality will now display the next world’s danger rating. Time is assumed to pass at the same rate in every world you visit, including your Pocket Apartment, unless you explicitly use magical, technological, or other means of time travel or dilation.',
})

perks.push({
  title: 'Pursued by a Bear',
  cost: 10,
  whitelist: ['Exit Stage Left'],
  desc: 'The Exit Stage Left app now allows you to select your next world. It will offer three worlds to choose from, with their danger ratings clearly displayed. Available danger ratings range from one lower than your most recent new world to four higher. The two you do not choose each time will return for the next selection. If a world goes for three selections without being picked, it will stop appearing for a time, until the randomizer offers it again.',
})

perks.push({
  title: 'The Bigger Fish',
  cost: 30,
  whitelist: ['Pursued by a Bear'],
  desc: 'The Exit Stage Left app now offers seven worlds instead of just three. Destination worlds can now be of any danger rating.',
})

// Miscellaneous Perks

perks.push({
  title: 'Memoria',
  cost: 5,
  whitelist: ['Possess'],
  special: 'Chargen only',
  desc: 'You… actually want the episodic memories and emotional connections of your Possess target? We can do that. The extra data will be downloaded into your Possess target alongside your own personality. As with Extra and Substitute, you can distinguish between your original memories and those of your Possess target without difficulty.',
})

perks.push({
  title: 'Psychic Paper',
  cost: 5,
  desc: 'Exactly like in Doctor Who, this blank white card shows the reader whatever you want them to see. In most practical cases, this will likely be a form of local identification, but that\'s far from the only use. Psychic paper will not work on geniuses or people with feeble imaginations. People with basic psychic training are also immune; powerful psychics can reflect its effect back on the user. Illiterate people can still read psychic paper, provided their civilization has invented writing.',
})

perks.push({
  title: 'Heavenbuilt Proto',
  cost: 11111,
  desc: `
<p>Run the Built in the <a href="https://imgur.com/gallery/dUkFmZF" target="_blank" rel="noopener noreferrer" class="text-red-500 hover:underline">Heavens CYOA</a>, (<a href="https://built-in-the-heavens.neocities.org/"  target="_blank" rel="noopener noreferrer" class="text-red-500 hover:underline">interactive version</a>), ignoring the origins choice and all personal perks. The only allowed complications are the ones that grant followers. These followers will count as their original inspirations: Broken Toy (YorHa A2), Jewelled Collar (Starfire and Blackfire), All According to Plan (Taldeer), Yan Yan Dere Dere (Monika), Forgotten and Lost (Dragon from Worm, in the body of Cibo from Blame!), From Heights Brought Low (Shub-Niggurath), or A Loyal Vizier (Caster Tamamo-no-Mae). These followers cannot be refunded for credits, so you should only take the ones you want. Otherwise, follow its rules as written. You will start aboard your ship, in the same star system as your starting world, unless you also purchased Life’s A Beach. Your ship's AI counts as a purchased waifu of Tier 6. Alternatively, you may plug one of your purchased or captured waifus into your ship to make her a pseudo-AI or shipgirl and take a 50-credit toward future purchases, you monster. All characters with alternate outfits, shown in any official source, will find them stored in their room or closet.,</p>
<p>In addition to the ship’s Tier 11-granted multiversal capability, if you have a time-travel-capable waifu, she'll be able to channel her power through your ship so it can make such journeys too, even if you keep the Heavenbuilt AI as a separate waifu.</p>`,
})

perks.push({
  title: 'Piece of Silver',
  cost: 11111,
  desc: 'Whoever warned you not to pick up loose change was right. You are now partnered with a Denarian fallen angel from the Dresden Files, either Lasciel (“Lash”) or an OC of your (author’s) design. If you have No Bindings or the Stamp, she will be bound to her coin, able to assume a physical form within a 10 meter radius of her coin or you but not able to touch her coin herself: if it moves, so must she. If you have Hotel California and no higher bindings, she will be tied to the building, able to move anywhere inside. If you have a higher binding, that will replace her coin and remove her physical leash completely. Your other purchased and captured waifus can see, hear, feel, etc. the Denarian at all times.',
})

perks.push({
  title: 'Warranty Plan',
  cost: 200,
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
<p>Any purchased or captured retinue member who dies on you will be re-delivered to you at no additional cost. This perk will not help if you die, even if you took the Substitute or Possess origins. The default respawn time for your waifus is 72 hours. Respawned waifus will retain all of their previous incarnation’s memories, including anything related to their previous incarnation’s cause of death, except for some minor trauma reduction. All relevant effects of Lures, Binds, Perks, and waifu perks will be re-applied before shipment. If a member of your retinue was host to a Core from the Transhuman heritage when they died, a new Core will only be implanted before shipment if they’ve benefitted from the third level of Philosopher’s Transmortality Engine. If you have Everlasting Talent, characters whom you’ve blacklisted from it will be considered expendable and their automatic respawn will likewise be disabled; you may still trigger it manually.,</p>
<p>Each amazon you purchase or capture will reduce the respawn timer by 3 hours, to a soft limit of 18 hours. Additional amazons in your retinue after  the first 18 will still decrease the timer, but are subject to diminishing returns. </p>
<p>If a waifu has a soulbound artifact along the lines of an Exaltation or Sacred Gear, an exact duplicate of the artifact will be produced for her specifically, and persist through respawns, and the original one released back into the waifu’s homeworld; you will also benefit from this feature if one of your retinue members resurrects you with their own abilities. If a waifu you’ve Stamped dies (through no fault of your own) before the full tattoo can complete, the company will send you a fresh copy of her, free of charge. This is not affected by the amazon respawn bonus above. If one of your waifus is merely mission-killed in a way that’s prohibitively difficult to undo (petrified, stuck in a black hole, etc.), an option in the company app will let you actually-kill her current body and force a respawn.</p>`,
})

// Generic Waifu Perks
export const genericDesc = `
<p>Upgrades, downgrades, and other premium options for your waifus are available in this and the next section. If your Origin choice is compatible with a Waifu Perk of any kind, you can buy it for yourself, even in a starting build. (If you have Substitute and apply a Waifu Perk to yourself, the perk-modified cost of your target cannot exceed 20% of your intensity-modified budget. This limitation only applies at chargen.) Unlike other purchased abilities, your waifus do not lose access to waifu perks if you die.</p>
<p>If a Waifu Perk is listed with a tier rating, its price will be affected by the No Bindings discount, if you qualify for it. If you already qualify for Mirage Master’s regular discount, it cannot be discounted a second time. Waifu Perks that lack tier ratings are not affected by the No Bindings Discount.</p>
<p>Generic waifu perks may be purchased more than once and applied to any waifu or husbando that qualifies.</p>`
// #endregion

// #region Generic Waifu Perks
export const genericPerks: PerkFull[] = []

genericPerks.push({
  title: 'Yoink',
  cost: 1,
  whitelist: ['Directly in Companions'],
  special: 'Use directly in companions. Cost 20% more. Chargen only. Not available in Gauntlet PvP.',
  desc: 'Your purchased waifu is actually a local capture from your starting world. She is teleported to your starting location and Bound (or not) the same as all the other waifus you purchased. You may purchase this perk once for each purchased waifu who happens to be from your starting world. If you purchase this together with Extra or Substitute, the relevant waifus will all have been brought to your starting location by fate or coincidence, not teleportation. You may not apply this perk to a target valued at more than 20% of your starting budget, after drawbacks, unless otherwise specified.',
})

genericPerks.push({
  title: 'Slightly Used',
  cost: 1,
  special: 'Use directly in companions. Non T11',
  whitelist: ['Directly in Companions'],
  desc: `
<p>This waifu is an original version, captured by a previous contractor and resold to you. All direct effects of previous contractors' controls and perks are removed during reprocessing. This includes Defenses, Talents, and Binding benefits, but not any non-baseline abilities they trained in using their former contractor’s Talents, equipment they wield, or Heritage upgrades applied to them. When you select this perk for a purchase, you will see three options for which specific version of the subject you wish to buy.</p>
<p>Author directions: roll 6 six-sided dice for each option, twice. (Just use an autoroller.) The sum of the first set of rolls determines the subject’s effective tier after step 4: higher rolls mean both higher tiers and higher prices. Compare to the names you recognize in the regular Catalog to determine what kinds of extra abilities or equipment a used purchase has compared to their baseline self. The sum of the second set of rolls determines the subject’s physical, mental, and/or spiritual state after their experiences with their previous owner: higher rolls mean both more trauma and steeper discounts. The full chart is in the Additional Rules section. A used purchase’s extra abilities and/or equipment will be listed in full for the contractor to see, but their current state will not be visible, beyond its effect on their price.</p>
<p>Unlike fresh clones, subjects bought used have been to their homeworlds personally. Most people have others who care about them, who will likely have strong reactions to the sudden return of a missing person…</p>`,
})

genericPerks.push({
  title: 'Canvas',
  cost: 1,
  requires: 'any higher Binding- type control',
  multiple: true,
  max: 10,
  whitelist: ['Hotel California'],
  desc: 'The Stamp’s tattoos are now permanently visible, even after the purchase of higher bindings. This option is purely aesthetic. Once you’ve purchased this perk ten times, it will apply to every member of your retinue.',
})

genericPerks.push({
  title: 'Adoption',
  anything: 'Kid Name',
  complex: 'flavor',
  cost: 1,
  desc: 'You may find yourself adopting a kid - and not just because you killed one parent and captured the other into your retinue. Under normal circumstances, that kid will forever be your familiar, never equal to your true-blooded offspring. This perk will tell our systems to treat them as your descendants and follow the relevant Offspring rules instead.',
})

genericPerks.push({
  title: 'Paper Trail',
  cost: 1,
  target: 'Any',
  complex: 'target',
  max: 10,
  desc: `
<p>In some worlds, anonymity is a danger in and of itself. This perk retroactively modifies all records (paper, digital, and even memories) to create a legal existence for your waifu. Where applicable, the waifu will receive any real documentation she would be expected to have. You may also purchase and apply this perk to yourself; the all-waifus package will always apply it to you. If you chose the Extra or Substitute origins, this perk will not apply to you until you visit your second world. Similarly, this cannot give a captured or Yoinked retinue member a new identity in their own homeworld. Once you’ve purchased this perk ten times, it will apply to every member of your retinue.,</p>
<p>By default, this history is of a middle-class or analogous citizen. If plausible and desired, they will instead be of a social class that can associate with you. Under the same conditions, any powers they have may be documented in a way that best fits your needs. If you have Trace Defense, any attempt at remote viewing where failure or invisibility would itself be a red flag will seemingly succeed, showing either a convincing match to their documented past or a present or future with nothing important to note.</p>`,
})

genericPerks.push({
  title: 'Third-Party Riggings',
  special: 'Requires at least one first - party Azur Lane shipgirl.',
  complex: 'target',
  requires: '(Any Azur Lane collaboration shipgirl)',
  cost: 20,
  desc: `Dead or Alive, Neptunia, Utawarerumono, Hololive, and others have all had guest appearances on the high seas. This perk grants these characters their shipgirl riggings, allowing them to play by those rules instead and making them eligible for Bifurcation and Space Shipgirl below. If a collaboration shipgirl’s tier after step 1a is less than the following, it will be raised to that value.
<ul class="list-disc list-inside">
  <li>T4: 22, 33, Akizuki Ritsuko, Futami Ami, Futami Mami</li>
  <li>T5: All other collaboration shipgirls</li>
  <li>T6: All other collaboration battleships and full aircraft carriers except Fumiruiru</li>
  <li>T7: Minase Iori</li>
</ul>`,
})

genericPerks.push({
  title: 'Retrofit',
  requires: '(Any eligible Azur Lane shipgirl)',
  complex: 'target',
  cost: 0,
  costVariants: [0, 10, 30, 50],
  special: '0(T4 → T4, T5 → T5, T6 → T6), 10(T4 → T5), 30(T5 → T6), or 50(T6 → T7)',
  desc: `Your shipgirl is her post-retrofit version, with updated abilities, hull, and rigging. This perk is free for all eligible shipgirls except the following, whose tiers are changed as a result:
<ul class="list-disc list-inside">
  <li>T4 → T5: Cassin, Downes, Sims, Hammann, Pamiat Merkuria</li>
  <li>T5 → T6: San Diego, Leipzig, Newcastle, Independence</li>
  <li>T6 → T7: Fusou, Yamashiro, Ise, Hyuuga</li>
</ul>`,
})

genericPerks.push({
  title: 'Bifurcation',
  requires: '(Any Azur Lane Shipgirl)',
  complex: 'target',
  cost: 15,
  desc: `
<p>Your chosen Shipgirl’s Wisdom Cube receives a slight boost to its power, allowing her to manifest her rigging and full ship forms simultaneously. This lets her enter the fray personally while still allowing usage of her ship for transport, defense, support, etc., opening up many new tactical options.</p>
<p>There is a price to pay for this convenience. First, the strain of manifesting both her rigging and full ship form at once will reduce the performance of both by approximately 50%. This can be returned to normal levels with appropriate training. Second, while both forms are manifested, any damage the ship form takes will immediately be reflected upon the Shipgirl’s rigging, and vice versa.</p>
<p>Upon ten purchases of this perk, all Shipgirls you may purchase will automatically have this perk applied to them.</p>`,
})

genericPerks.push({
  title: 'Space Shipgirl',
  requires: '(Any Azur Lane shipgirl)',
  complex: 'target',
  cost: 30,
  desc: `
<p>Just as a group of humans once revived the mighty battleship Yamato as a spaceship in order to save humanity, so do the shipgirls under your command gain the ability to traverse the final frontier. The chosen shipgirl’s full-size hull is refurbished to be completely spaceworthy: the insides of the hull are sealed against the vacuum of space, all their armaments are perfectly capable of functioning in space, and even planes from carriers can fly just as well in the vacuum of space as they do in air. If you don’t want a naval-ships-in-space aesthetic, shipgirl hulls are also available in space counterpart culture varieties. For example, Star Trek’s Federation designs are suitable for Eagle Union and Royal Navy, while the Klingon look is appropriate for Sakura Empire and Romulans for Dragon Empery. Further upgrades may be installed if you have another source of space-era technology.</p>
<p>While her rigging is manifested, the shipgirl retains all upgrades made to her armaments. Should you lack Wild Defense, she gains a personal atmospheric bubble that allows her to survive in space for a time.</p>
<p>Upon ten purchases of this perk, all Shipgirls you may purchase will automatically have this perk applied to them.</p>`,
})

genericPerks.push({
  title: 'I\'m on a Boat',
  requires: '(Any Kantai Collection Shipgirl)',
  complex: 'target',
  cost: 10,
  desc: `
<p>Your chosen Shipgirl may now summon her full ship form under her instead of just manifesting her rigging. This lets her carry other members of your retinue around and lets her fairy crew take on human size and be interacted with. Understanding their speech, of course, requires Communication Talent. Additionally, Kancolle Shipgirls with this perk become eligible for Bifurcation and Space Shipgirl.</p>
<p>Upon ten purchases of this perk, all Kancolle Shipgirls you may purchase will automatically have this perk applied to them.</p>`,
})

genericPerks.push({
  title: 'Mirage Master',
  requires: '(Any T1- T3 waifu + any Fire Emblem character rated T6 or below)',
  complex: 'target',
  cost: 50,
  image: 'https://pbs.twimg.com/media/DuZ3wQ_XgAAu09w.jpg',
  desc: `
<p>Your list of Mirage users is no longer limited to canon. If you have a blue-star waifu and any Fire Emblem character rated T6 or below, you may convert the Fire Emblem character into a Mirage who’ll serve as the blue-star waifu’s partner. (Mirages of an unwanted gender may be subject to Rule 63.) The duo now operate on Tokyo Mirage Sessions rules and will, with few exceptions, be stronger than the Fire Emblem waifu on her own.</p>
<p>Most types of enhancement methods for Mirages, however, must be administered by a Fire Emblem divine dragon rated T7 or higher (e.g. Naga, Nagi, Mila) and will not be available otherwise. Tiki has prior experience with this, from the canon events of Tokyo Mirage Sessions, but the others will have to figure it out as they go. If you have an eligible Mirage administrator, the cost of each application of this perk will be discounted to only 20/pair, with the difference refunded back into your account.</p>
<p>Upon ten purchases of this perk, you may apply this perk as many more times as you want at no further cost.</p>`,
})

genericPerks.push({
  title: 'Unison',
  requires: '(Any Pokémon trainer)',
  complex: 'target',
  cost: 40,
  image: 'link',
  desc: 'The enhanced spiritual bond between your Trainer waifu and her mons allows her to blend with one of them, take on its physical traits, and operate as one being, raising her tier at step 6 to the higher of her own or the blended mon’s. Any of her mons are eligible for this, but only one at a time. She will also receive her seventh most iconic or strongest mon from her canon appearances, if she has one, so she can have a full party of six alongside the one she’s blended with.',
})

genericPerks.push({
  title: 'Galactic Presence',
  requires: '(Any Warhammer Fantasy deity)',
  complex: 'target',
  cost: 50,
  desc: 'Malleus and the year 40,000 are both Warhammer, but operate on vastly different scales. This perk pulls one of the Fantasy goddesses up to the same level as her galactic counterpart. It must be purchased separately for each one you have.',
})

genericPerks.push({
  title: 'Four Seasons',
  requires: '(Any female RWBY character of T6 or below)',
  complex: 'target_c',
  multiple: true,
  cost: 20,
  desc: 'Maidenhood is special on Remnant, but not particularly so. Anyone can become one under the right circumstances. By default, this perk may be purchased up to four times, once for each temperate season (Spring, Summer, Fall, Winter). Purchasing this twice for the same character will elevate her to T6, if she isn’t already, and four times to T7. Additional sets of Maiden mantles become available with each member of your retinue, including yourself, whose effective tier after step five is at least T8: one for each T8, two for each T9, five for each T10, and ten for each T11. If one of your waifus is already a Maiden when you capture her, that counts against your total, unless you take a refund for this perk. If this puts you over your cap for a particular mantle, you may not buy any more of that mantle until you’ve raised the cap further.',
})

genericPerks.push({
  title: 'Salvation',
  requires: '(Any Puella Magi)',
  complex: 'target',
  costVariants: [0, 20],
  cost: 0,
  desc: `
<p>When your waifu's soul gem darkens completely, she may choose to manifest her Doppel: a materialization of her witch-self which may take the form of an discrete projection, an extension of her body, or even a partial physical transformation, depending upon the details of her relationship to her witch-self and what it represents. An activated Doppel is extremely powerful in its own right, but draws upon the darkness in its master's soul gem to manifest, quickly and completely purifying its master's gem until she can no longer support it - leaving her Doppel as a briefly activated trump card or a simple magic recharge mechanic unless it's somehow further refined. If you have Inexhaustible, any meguca in your retinue, whom this perk has been applied to, will only benefit from this perk.</p>
<p>If you have Madokami, Akuma Homura, Satomi Touka, Lapin, or any other meguca who is canonically capable of breaking the balance of hope and despair in your retinue, then this perk is free. If you already have this perk when you acquire a relevant waifu, then take a full refund on the value of this perk for as many times as you've purchased it.</p>
<p>Upon ten purchases of this perk, all meguca you may purchase will automatically have this perk applied to them.</p>`,
})

// DLC Generic Perks
export const DLCgenericPerks: PerkFull[] = []

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
  desc: `Perhaps the moment will come when you need to justify the event of their appearance in front of you for a companion. But don't worry! For a very symbolic fee, our company undertakes to play a grandiose theatrical performance, which will surely convince your companion that their appearance next to you is an act of fate!
  <p>It could be anything. Cataclysm, random portal, magical summoning by an evil (or not) sorcerer and their \"salvation by your intervention\". Or maybe they \"died\" and appeared before their \"god\"? Anything! Let your imagination run wild and we'll be happy to make it happen!</p>`,
})
DLCgenericPerks.push({
  title: 'Grail Knowledge',
  dlc: 'KatzSmile',
  cost: 5,
  desc: `Does your companion come from a less developed world than your own? Or perhaps their world is incredibly distant in a philosophical sense? Don't worry, we'll fix it!
  <p>Having acquired this perk once, you can be sure that all your companions will receive all the necessary common knowledge for your world. Including general schooling, hygiene and home appliance skills</p>`,
})
// #endregion

export const DLCperks: PerkFull[] = []
DLCperks.push({
  dlc: 'BenFang322',
  title: 'Appearance Change (Cosmetic)',
  cost: 1,
  desc: 'Because sometimes you just don’t like the way you look, and would rather look different or like someone else instead. Can only be used to change cosmetic aspects of yourself only, and provide’s no practical benefits outside of a different appearance.',
})
