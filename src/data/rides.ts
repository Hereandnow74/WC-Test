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
  category: 'Land' | 'Sea' | 'Amphibious' | 'Sky' | 'Space'
  size: 'Small' | 'Medium' | 'Large' | 'Gigantic'
}

export interface DLCRide extends Ride {
  dlc?: string
}

// Environment: Land
// #region ride
export const rides: Ride[] = []

rides.push({
  title: 'Your Own Car From Home',
  category: 'Land',
  size: 'Small',
  source: 'Real Life',
  cost: 1,
  desc: 'Has everything you would normally have in your car.',
})

rides.push({
  title: 'Herbie',
  source: 'Herbie',
  category: 'Land',
  size: 'Small',
  cost: 5,
  desc: 'Turbo Booster, Free Bro Herbie',
})

rides.push({
  title: 'Regalia',
  source: 'Final Fantasy XV',
  category: 'Land',
  size: 'Small',
  cost: 5,
  desc: 'Car from Final Fantasy XV',
  addons: [['Type-D upgrade (off-road) (+5)', 5], ['Type-F upgrade (flight capability, unlimited fuel) (+10)', 10]],
})

rides.push({
  title: 'Molcar',
  source: 'Pui Pui Molcar',
  category: 'Land',
  size: 'Small',
  cost: 5,
  desc: 'half-vehicle half-guinea pig hybrid, very cute',
})

rides.push({
  title: 'Kaneda',
  source: 'Akira',
  category: 'Land',
  size: 'Small',
  cost: 5,
  desc: 'A cherry red beast of a motorcycle made famous from the Anime and Manga Akira. 200 Horsepower engine, electronic anti-lock brakes, and a fancy instrument panel including a built-in computer screen.',
})

// Environment: Sea

rides.push({
  title: 'Nautilus (1865)',
  source: '20,000 Leagues Under the Sea',
  category: 'Amphibious',
  size: 'Medium',
  cost: 20,
  desc: '1865 Sci-Fi Electric Submarine',
})

rides.push({
  title: 'Tuatha de Danaan',
  source: 'Full Metal Panic',
  category: 'Amphibious',
  size: 'Medium',
  cost: 40,
  desc: 'Submarine-capable assault carrier. Holds 5x M9E Gernsback and 1x ARX-7 Arbalest mecha, 4x FAV-8 Super Harriers, 4x RAH-66 Comanche attack helicopters, and 6x MH-67 Pave Mare transport helicopters.',
  addons: [['Upgrade ARX-7 to ARX-8 Laevatein (+10)', 10]],
})

rides.push({
  title: 'Gargantia Fleet',
  source: 'Gargantia on the Verdurous Planet',
  category: 'Amphibious',
  size: 'Medium',
  cost: 50,
  desc: 'Detachable Sub-ships, Orbital Mass Driver, Limited Manufacturing',
  addons: [['Patrol Fleet (+10)', 10]],
})

rides.push({
  title: 'Nautilus',
  source: 'League of Extraordinary Gentlemen(Movie)',
  category: 'Amphibious',
  size: 'Medium',
  cost: 50,
  whitelist: ['Science Talent'],
  desc: 'Missiles; Torpedos; Miniature Submarines',
  addons: [['‘Auto-mobile’(+5)', 5]],
})

rides.push({
  title: 'Ulysses',
  source: 'Atlantis: The Lost Empire',
  category: 'Amphibious',
  size: 'Medium',
  cost: 50,
  desc: 'Sub-Pods, Cannon Turrets, Torpedos',
})

// Environment: Amphibious

rides.push({
  title: 'Mach 5',
  source: 'Speed Racer',
  category: 'Amphibious',
  size: 'Small',
  cost: 15,
  desc: 'Auto-Jacks, Belt Tires, Cutter Blades, Deflector, Evening Eye, Frogger Mode, Gizmo (Robotic Homing Pigeon)',
  variants: [['Mach 6 (20)', 5]],
})

rides.push({
  title: 'KITT',
  source: 'Knight Rider',
  category: 'Amphibious',
  size: 'Small',
  cost: 20,
  desc: 'Minimal Weaponry, Turbo Booster, crime lab, Free Bro KITT',
})

rides.push({
  title: 'Mobile Construction Vehicle',
  source: 'Command & Conquer',
  category: 'Amphibious',
  size: 'Medium',
  cost: 50,
  desc: 'Red Alert 1 Database, Manufacturing',
  addons: [['RA2 Database (+10)', 10], ['RA3 Database (+20)', 20], ['TW1 Database (+10)', 10], ['TW2 Database (+20)', 20], ['TW3 Database (+50)', 50], ['TW4 Database (+100)', 100], ['C&C Generals Database (+10)', 10]],
  variants: [['Crawler version (70)', 20]],
})

rides.push({
  title: 'Mechonis',
  source: 'Xenoblade Chronicles 1',
  category: 'Amphibious',
  size: 'Large',
  cost: 800,
  requires: 'Fiora w/ Waifu Perk Machina or Meyneth',
  desc: 'Mechon life-forms, Monado. Either version of Meyneth may build a new Mechonis on her own even without this purchase, provided she has sufficient time and resources.',
})

rides.push({
  title: 'Armored Command Unit',
  source: 'Supreme Commander',
  category: 'Amphibious',
  size: 'Large',
  cost: 1000,
  desc: 'Aeon or UEF or Cybran Database (pick one), Extreme Manufacturing, Quantum Gate, Infinite Resources',
  addons: [['2nd human faction’s database (+200)', 200], ['Seraphim Database (+500)', 500]],
})

// Environment: Sky

rides.push({
  title: 'Fahrenheit',
  source: 'Final Fantasy X',
  category: 'Sky',
  size: 'Medium',
  cost: 50,
  desc: 'AAM launchers, laser cannons',
  addons: [['Completed restoration - main cannons can fire more than twice without repairs, automated missile production that only requires feedstock (+20)', 20]],
})

rides.push({
  title: 'Delphinus',
  source: 'Skies of Arcadia',
  category: 'Sky',
  size: 'Medium',
  cost: 75,
  desc: 'Moonstone cannon',
})

rides.push({
  title: 'Epoch',
  source: 'Chrono Trigger',
  category: 'Sky',
  size: 'Medium',
  cost: 100,
  desc: 'time drive, little passenger space',
})

rides.push({
  title: 'Monolith',
  source: 'Warhammer 40k',
  category: 'Sky',
  size: 'Large',
  cost: 400,
  desc: 'Anti-Gravitic Engines, Necrodermis, Particle Whip, Gauss Flux Arcs (4), Eternity Gate/Portal of Exile. It cannot build new troops, but it can teleport units in through the Gate.',
  variants: [['Doomsday Monolith (500)', 100]],
})

// Environment: Space

rides.push({
  title: 'Bolo',
  source: 'Bolo',
  category: 'Space',
  size: 'Medium',
  cost: 100,
  desc: 'HEAVILY Armed, HEAVILY Armored, Landfall-capable',
  addons: [['AI Bro Bolo (+50)', 50]],
})

rides.push({
  title: 'Normandy-class stealth cruiser',
  source: 'Mass Effect',
  category: 'Space',
  size: 'Large',
  cost: 200,
  desc: 'Like Normandy SR-2, have Thanix cannon',
})

rides.push({
  title: 'UNSC Phoenix-class',
  source: 'Halo',
  category: 'Space',
  size: 'Large',
  cost: 400,
  desc: 'Like Spirit of Fire have UNSC Database, Manufacturing, Free Waifu Serina or Isabel',
})

rides.push({
  title: 'Starfleet Constitution-class',
  example: 'Enterprise 1701-null',
  source: 'Star Trek: The Original Series',
  category: 'Space',
  size: 'Large',
  cost: 300,
  desc: 'Federation database and labs, living and diplomatic quarters',
})

rides.push({
  title: 'Starfleet Galaxy-class',
  example: 'Enterprise 1701-D',
  source: 'Star Trek: The Next Generation',
  category: 'Space',
  size: 'Large',
  cost: 400,
  desc: 'Federation database and labs, living and diplomatic quarters',
})

rides.push({
  title: 'Starfleet Sovereign-class',
  example: 'Enterprise 1701-E',
  source: 'Star Trek: The Next Generation movies',
  category: 'Space',
  size: 'Large',
  cost: 440,
  desc: 'Federation database and labs, living and diplomatic quarters',
})

rides.push({
  title: 'Starfleet Odyssey-class',
  example: 'Enterprise 1701-F',
  source: 'Star Trek',
  category: 'Space',
  size: 'Large',
  cost: 500,
  desc: 'Federation database and labs, living and diplomatic quarters',
})

rides.push({
  title: 'Tau’ri BC-304',
  example: 'Daedalus, Odyssey',
  source: 'Stargate SG-1',
  category: 'Space',
  size: 'Large',
  cost: 400,
  desc: 'Asgard hyperdrive (extreme speed), teleporter, and plasma beams, 8 F-302s in each hangar bay',
  addons: [['Asgard computer core (+300)', 300], ['Alternate reality drive (+100)', 100], ['Ancient cloak (+100)', 100], ['Horizon weapons platform (+50)', 50], ['ZPM additional power generation (+100)', 100]],
})

rides.push({
  title: 'Terran Behemoth-class ',
  example: 'Hyperion',
  source: 'Starcraft',
  category: 'Space',
  size: 'Large',
  cost: 400,
  desc: 'Space flight, Terran Database, Armory, Manufacturing, Yamato Cannon',
})

rides.push({
  title: 'Kushan mothership',
  example: 'Pride of Hiigara',
  source: 'Homeworld 2',
  category: 'Space',
  size: 'Large',
  cost: 400,
  desc: 'Kushan database, extreme production, minimal defenses',
})

rides.push({
  title: 'Imperial-II class Star Destroyer',
  source: 'Star Wars',
  category: 'Space',
  size: 'Large',
  cost: 440,
  desc: 'Heavy armour, heavy weapons, tractor beams, powerful hyperdrive (galactic spanning), small craft complement (72 TIE-series fighters, 8 Lambda class shuttles, 15 Delta class troop transports, 6 assault gunboats), Ground force complement (20 AT-ATs, 30 AT-STs, prefab bases, 9700 sets of Stormtrooper/Clonetrooper gear), Imperial industrial database (including designs for advanced TIEs), extensive machine shops and repair bays, droid crew support.',
  variants: [['Executor class Super Star Destroyer (VERY heavy weapons, VERY heavy armour, 144 fighters, ground force complement 38,000 (500 credits)', 60]],
  addons: [['New Republic upgrade: X-Wings and B-Wings, database current to Galactic Alliance period (+10)', 10], ['Stormtrooper/Clonetrooper gear upgraded to Mandolorian grade, Mandalorian forge and database added (+15)', 15]],
})

rides.push({
  title: 'Lantean City-ship',
  example: 'Atlantis',
  source: 'Stargate Atlantis',
  category: 'Space',
  size: 'Gigantic',
  cost: 1500,
  desc: 'Lantean database and labs, drone launchers, puddle-jumper hangars, wormhole drive, ZPM production facility, living quarters',
})

rides.push({
  title: 'Ideon and Solo',
  source: 'Space Runaway Ideon',
  category: 'Space',
  size: 'Gigantic',
  cost: 11111,
  desc: '(Solo): DS Drive, onboard forest. (Ideon): Three-part combining mecha, arbitrarily powerful weapons and defenses, infinite energy.',
})

export const DLCRides: DLCRide[] = []
// Environment Land
// Environment Sea
// Environment Amphibious
// Environment Sky
DLCRides.push({
  dlc: 'KatzSmile',
  title: 'Bullhead',
  source: 'RWBY',
  category: 'Sky',
  size: 'Medium',
  cost: 15,
  desc: 'A fairly common flying vehicle in Remnant',
  addons: [['Unlimited Fuel (+5)', 5]],
  variants: [['Atlas Manta (+5)', 5]],
})

// Environment: Space

DLCRides.push({
  dlc: 'KatzSmile',
  title: 'Jumpship',
  source: 'Destiny',
  category: 'Space',
  size: 'Medium',
  cost: 25,
  desc: 'Jumpships are a type of transportation used in Destiny to fly throughout the space.',
})

DLCRides.push({
  dlc: 'KatzSmile',
  title: 'M-Class Scout Vessel',
  source: 'Guardians of the Galaxy',
  category: 'Space',
  size: 'Medium',
  cost: 50,
  desc: 'The M-Ships are a class of scout space vessels. Being exceptionally versatile, M-ships serve as capable dogfighters and transport ships, whilst also being very maneuverable, fast, and agile despite what their sizable profile would suggest.',
  addons: [['Unlimited Fuel (+5)', 5], ['Unlimited Ammo (+5)', 5]],
  variants: [['The Milano', 0], ['The Warbird', 0], ['The Benatar', 0], ['The Mandela', 0]],
})

DLCRides.push({
  title: 'Batmobile',
  source: 'Arkham Knight ',
  category: 'Land',
  size: 'Small',
  cost: 20,
  desc: `Is it a tank? Is it a racecar? No its the Batmobile!
  <p>Machine gun, 60mm cannon, rubber shot, afterburner, forensic scanner, emp, hack, missile launcher, grappling line</p>
  `,
})

DLCRides.push({
  title: 'Mantle’s Approach',
  source: 'Halo',
  category: 'Space',
  size: 'Gigantic',
  cost: 1500,
  desc: 'Forerunner database, manufacturing capabilities, slip space drive, Length: 142.7 kilometers (88.7 mi), width: 138.6 kilometers (86.1 mi) wide, height: 371.4 kilometers (230.8 mi), mass of 4.7 quadrillion metric tons, hull: Programmable matter held together by hard light bonds and energy interlocks, cloaking system, torsion fields, Armament: 1 Composer, 1 heavy ion weapon system, 1 stasis tension driver, 40 torsion driver arrays, 1,700 light mass fusillade cannons, 25,000 converging beam cannons, Particle cannon network, Anti-Ship Artillery System[ Z-8250 heavy artillery, Z-8250 light artillery ], complement: 1 Strategos, 25 Princeps, 800 Navarchs, 250,000 Praetorians, 5.5 million Venatores, Over a billion Promethean constructs[ Knights, Watchers, Crawlers], Core seed, command sector, barracks, training grounds, museums, halls of honors',
})
