export interface Ride {
  uid: string
  title: string
  image?: string
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
  capacity?: string
}

export interface DLCRide extends Ride {
  dlc?: string
}

// Environment: Land
// #region ride
export const rides: Ride[] = []

rides.push({
  uid: 'y2NUh',
  title: 'Your Own Car From Home',
  category: 'Land',
  size: 'Small',
  source: 'Real Life',
  image: 'https://i.ibb.co/ykxZHwv/Your-Own-Car-From-Home.jpg',
  cost: 1,
  desc: 'Has everything you would normally have in your car.',
})

rides.push({
  uid: 'HpU9y',
  title: 'Herbie',
  source: 'Herbie',
  category: 'Land',
  size: 'Small',
  image: 'https://i.ibb.co/jvwdtcw/Herbie.jpg',
  cost: 5,
  desc: 'Turbo Booster, Free Bro Herbie',
  capacity: '1 driver, 3 passengers',
})

rides.push({
  uid: 'vchfG',
  title: 'Regalia',
  source: 'Final Fantasy XV',
  category: 'Land',
  size: 'Small',
  image: 'https://i.ibb.co/b5fB4CM/Regalia.jpg',
  cost: 5,
  desc: 'Car from Final Fantasy XV',
  addons: [['Type-D upgrade (off-road)', 5], ['Type-F upgrade (flight capability, unlimited fuel)', 10]],
  capacity: '1 driver, 3 passengers',
})

rides.push({
  uid: 'RHQKv',
  title: 'Molcar',
  source: 'Pui Pui Molcar',
  category: 'Land',
  size: 'Small',
  image: 'https://i.ibb.co/sC2QMMr/Molcar.jpg',
  cost: 5,
  desc: 'half-vehicle half-guinea pig hybrid, very cute',
  capacity: '1 driver, 1 passenger',
})

rides.push({
  uid: 'iuKHT',
  title: 'Kaneda’s Bike',
  source: 'Akira',
  category: 'Land',
  size: 'Small',
  image: 'https://i.ibb.co/wWLfTdb/Kaneda.jpg',
  cost: 5,
  desc: 'A cherry red beast of a motorcycle made famous from the Anime and Manga Akira. 200 Horsepower engine, electronic anti-lock brakes, and a fancy instrument panel including a built-in computer screen.',
  capacity: '1 driver, 1 passenger',
})

// Environment: Sea

rides.push({
  uid: 'ARcn2',
  title: 'Nautilus (1865)',
  source: '20,000 Leagues Under the Sea',
  category: 'Sea',
  size: 'Medium',
  image: 'https://i.ibb.co/mzj6gL4/Nautilus.jpg',
  cost: 20,
  desc: '1865 Sci-Fi Electric Submarine',
  capacity: '~30 crew',
})

rides.push({
  uid: 'ARcno',
  title: 'Going Merry',
  source: ' One Piece',
  category: 'Sea',
  size: 'Medium',
  image: '',
  cost: 20,
  desc: 'A ship',
  addons: [['Klabautermann Awakening', 5]],
  capacity: '?? crew',
})
rides.push({
  uid: 'ARcnq',
  title: 'Thousand Sunny',
  source: ' One Piece',
  category: 'Sea',
  size: 'Medium',
  image: '',
  cost: 50,
  desc: 'Notable Features: Adam-wood hull, Training Room, Workshop, Library, Aquarium Bar, Soda-powered, Gao-Canon, Coup De Burst',
  addons: [['Pop-Green Garden', 20], ['Full Smallcraft Contingent', 10], ['Emperor Penguin Mode', 10], ['Klabautermann Awakening', 5]],
  variants: [['Pre-Timeskip', 0], ['Post-Timeskip', 0]],
  capacity: '?? crew',
})

rides.push({
  uid: 'RC9WK',
  title: 'Tuatha de Danaan',
  source: 'Full Metal Panic',
  category: 'Sea',
  size: 'Medium',
  image: 'https://i.ibb.co/2q9g4ZJ/Tuatha-De-Danaan.jpg',
  cost: 40,
  desc: 'Submarine-capable assault carrier. Holds 5x M9E Gernsback and 1x ARX-7 Arbalest mecha, 4x FAV-8 Super Harriers, 4x RAH-66 Comanche attack helicopters, and 6x MH-67 Pave Mare transport helicopters.',
  addons: [['Upgrade ARX-7 to ARX-8 Laevatein', 10]],
  capacity: '~50 crew',
})

rides.push({
  uid: 'TRKef',
  title: 'Gargantia Fleet',
  source: 'Gargantia on the Verdurous Planet',
  category: 'Sea',
  size: 'Large',
  image: 'https://i.ibb.co/Hhj1NCN/Gargantia-Fleet.jpg',
  cost: 50,
  desc: 'Detachable Sub-ships, Orbital Mass Driver, Limited Manufacturing',
  addons: [['Patrol Fleet', 10]],
})

rides.push({
  uid: 'NSNlf',
  title: 'Nautilus',
  source: 'League of Extraordinary Gentlemen(Movie)',
  category: 'Sea',
  size: 'Medium',
  image: 'https://i.ibb.co/2KNq6vH/Nautilus-Movie.jpg',
  cost: 50,
  whitelist: ['Science Talent'],
  desc: 'Missiles; Torpedos; Miniature Submarines',
  addons: [['‘Auto-mobile’', 5]],
  capacity: '~20 crew',
})

rides.push({
  uid: 'plfvV',
  title: 'Ulysses',
  source: 'Atlantis: The Lost Empire',
  category: 'Sea',
  size: 'Medium',
  image: 'https://i.ibb.co/c2Qtgzj/Ulysses.jpg',
  cost: 50,
  desc: 'Sub-Pods, Cannon Turrets, Torpedos',
  capacity: '201 crew and passengers',
})

// Environment: Amphibious

rides.push({
  uid: 'AvP8r',
  title: 'Mach 5',
  source: 'Speed Racer',
  category: 'Amphibious',
  size: 'Small',
  image: 'https://i.ibb.co/0KQdDvt/Mach5.jpg',
  cost: 15,
  desc: 'Auto-Jacks, Belt Tires, Cutter Blades, Deflector, Evening Eye, Frogger Mode, Gizmo (Robotic Homing Pigeon)',
  variants: [['Mach 6 (20)', 5]],
  capacity: '1 driver, 1 passenger',
})

rides.push({
  uid: 'Sk0oK',
  title: 'KITT',
  source: 'Knight Rider',
  category: 'Amphibious',
  size: 'Small',
  image: 'https://i.ibb.co/wLJb2Zw/KITT.jpg',
  cost: 20,
  desc: 'Minimal Weaponry, Turbo Booster, crime lab, Free Bro KITT',
  capacity: '1 driver, 3 passengers',
})

rides.push({
  uid: 'BjqT7',
  title: 'Mobile Construction Vehicle',
  source: 'Command & Conquer',
  category: 'Amphibious',
  size: 'Medium',
  image: 'https://i.ibb.co/94fY7cB/MCV.jpg',
  cost: 50,
  desc: 'Red Alert 1 Database, Manufacturing',
  addons: [['RA2 Database', 10], ['RA3 Database', 20], ['TW1 Database', 10], ['TW2 Database', 20], ['TW3 Database', 50], ['TW4 Database', 100], ['C&C Generals Database', 10]],
  variants: [['Crawler version (70)', 20]],
  capacity: '3 crew',
})

rides.push({
  uid: 'wadxa',
  title: 'Mechonis',
  source: 'Xenoblade Chronicles 1',
  category: 'Amphibious',
  size: 'Gigantic',
  image: 'https://i.ibb.co/wSQyrGT/Mechonis.jpg',
  cost: 800,
  requires: 'Fiora w/ Waifu Perk Machina or Meyneth',
  desc: 'Mechon life-forms, Monado. Either version of Meyneth may build a new Mechonis on her own even without this purchase, provided she has sufficient time and resources.',
})

rides.push({
  uid: 'rr5Xj',
  title: 'Armored Command Unit',
  source: 'Supreme Commander',
  category: 'Amphibious',
  size: 'Medium',
  image: 'https://i.ibb.co/gvJFtmK/Armored-Command-Unit.jpg',
  cost: 1000,
  desc: 'Aeon or UEF or Cybran Database (pick one), Extreme Manufacturing, Quantum Gate, Infinite Resources',
  addons: [['2nd human faction’s database', 200], ['Seraphim Database', 500]],
  capacity: '1 Pilot',
})

// Environment: Sky

rides.push({
  uid: 't1jk4',
  title: 'YorHa Flight Unit',
  source: 'Nier: Automata',
  category: 'Sky',
  size: 'Small',
  image: '',
  cost: 20,
  desc: 'Personal mini-mecha with exposed cockpit and minimal storage capacity. Ranged and melee weapon mounts available.',
  requires: 'Any YorHa android',
})

rides.push({
  uid: 't1jk9',
  title: 'Fahrenheit',
  source: 'Final Fantasy X',
  category: 'Sky',
  size: 'Medium',
  image: 'https://i.ibb.co/6ncdTTv/Fahrenheit.jpg',
  cost: 50,
  desc: 'AAM launchers, laser cannons',
  addons: [['Completed restoration - main cannons can fire more than twice without repairs, automated missile production that only requires feedstock', 20]],
})

rides.push({
  uid: 'm2mQh',
  title: 'Delphinus',
  source: 'Skies of Arcadia',
  category: 'Sky',
  size: 'Medium',
  image: 'https://i.ibb.co/m54N0Kh/Delphinus.jpg',
  cost: 75,
  desc: 'Moonstone cannon',
  capacity: '>4 crew',
})

rides.push({
  uid: 'ICBZ6',
  title: 'Epoch',
  source: 'Chrono Trigger',
  category: 'Sky',
  size: 'Small',
  image: 'https://i.ibb.co/tP34MMs/Epoch.jpg',
  cost: 100,
  desc: 'time drive, little passenger space',
  capacity: '1 driver, 2 passengers',
})

rides.push({
  uid: 'b6Vyj',
  title: 'Black Ark',
  source: 'Warhammer Fantasy',
  category: 'Sea',
  size: 'Large',
  image: '',
  cost: 150,
  desc: 'a floating fortress-city, warded by sorcery and capable of containing an entire army, as well as a port to be a mobile harbor.',
  addons: [['Sorceress Cabin & Spire of Sorcery', 25], ['Monster Hold & Dragon Tower', 50], ['War Galley', 20]],
})

rides.push({
  uid: 'b6Vyb',
  title: 'Monolith',
  source: 'Warhammer 40k',
  category: 'Sky',
  size: 'Medium',
  image: 'https://i.ibb.co/qdt9bQK/Monolith.jpg',
  cost: 400,
  desc: 'Anti-Gravitic Engines, Necrodermis, Particle Whip, Gauss Flux Arcs (4), Eternity Gate/Portal of Exile. It cannot build new troops, but it can teleport units in through the Gate.',
  variants: [['Doomsday Monolith (500)', 100]],
})

// Environment: Space
rides.push({
  uid: 'fIygl',
  title: 'Bolo',
  source: 'Bolo',
  category: 'Space',
  size: 'Medium',
  image: 'https://i.ibb.co/hYTyGSX/Bolo.jpg',
  cost: 100,
  desc: 'HEAVILY Armed, HEAVILY Armored, Landfall-capable',
  addons: [['AI Bro Bolo', 50]],
  capacity: '1 skeleton crew, ? full compliment',
})

rides.push({
  uid: 'PjOdL',
  title: 'Normandy-class stealth cruiser',
  source: 'Mass Effect',
  category: 'Space',
  size: 'Medium',
  image: 'https://i.ibb.co/1TybF8J/Normandy.jpg',
  cost: 200,
  desc: 'Like Normandy SR-2, have Thanix cannon',
  capacity: '20 skeleton crew, 70 full compliment',
})

rides.push({
  uid: 'OftL5',
  title: 'UNSC Phoenix-class',
  source: 'Halo',
  category: 'Space',
  size: 'Large',
  image: 'https://i.ibb.co/N9xCWDV/UNSCPhoenix-Class.jpg',
  cost: 400,
  desc: 'Like Spirit of Fire have UNSC Database, Manufacturing, Free Waifu Serina or Isabel',
  capacity: '11,000 crew',
})

rides.push({
  uid: 'RxZFf',
  title: 'Starfleet Constitution-class',
  example: 'Enterprise 1701-null',
  source: 'Star Trek: The Original Series',
  category: 'Space',
  size: 'Medium',
  image: 'https://i.ibb.co/ctNSrNN/Starfleet-Constitution-Class.jpg',
  cost: 300,
  desc: 'Federation database and labs, living and diplomatic quarters',
  capacity: '430 crew',
})

rides.push({
  uid: 'lPq6Z',
  title: 'Starfleet Galaxy-class',
  example: 'Enterprise 1701-D',
  source: 'Star Trek: The Next Generation',
  category: 'Space',
  size: 'Large',
  image: 'https://i.ibb.co/ThmQdPd/Starfleet-Galaxy-Class.jpg',
  cost: 400,
  desc: 'Federation database and labs, living and diplomatic quarters',
  capacity: '1,000 skeleton crew, 15,000 full compliment',
})

rides.push({
  uid: 'DmBCq',
  title: 'Starfleet Sovereign-class',
  example: 'Enterprise 1701-E',
  source: 'Star Trek: The Next Generation movies',
  category: 'Space',
  size: 'Large',
  image: 'https://i.ibb.co/TH0GQ04/Starfleet-Sovereign-Class.jpg',
  cost: 440,
  desc: 'Federation database and labs, living and diplomatic quarters',
  capacity: '~800 crew',
})

rides.push({
  uid: 'zMsgZ',
  title: 'Starfleet Odyssey-class',
  example: 'Enterprise 1701-F',
  source: 'Star Trek',
  category: 'Space',
  size: 'Large',
  image: 'https://i.ibb.co/MVhkyzG/Starfleet-Odyssey-Class.jpg',
  cost: 500,
  desc: 'Federation database and labs, living and diplomatic quarters',
  capacity: '1,600 skeleton crew, 2,500 full compliment',
})

rides.push({
  uid: 'JxDts',
  title: 'Tau’ri BC-304',
  example: 'Daedalus, Odyssey',
  source: 'Stargate SG-1',
  category: 'Space',
  size: 'Medium',
  image: 'https://i.ibb.co/Q8P1dMf/Tauri-BC304.jpg',
  cost: 400,
  desc: 'Asgard hyperdrive (extreme speed), teleporter, and plasma beams, 8 F-302s in each hangar bay',
  addons: [['Asgard computer core', 300], ['Alternate reality drive', 100], ['Ancient cloak', 100], ['Horizon weapons platform', 50], ['ZPM additional power generation', 100]],
  capacity: '4 skeleton crew, 200 full compliment',
})

rides.push({
  uid: 'EhGjf',
  title: 'Terran Behemoth-class ',
  example: 'Hyperion',
  source: 'Starcraft',
  category: 'Space',
  size: 'Large',
  image: 'https://i.ibb.co/cr6VXvR/Terran-Behemoth-Class.jpg',
  cost: 400,
  desc: 'Space flight, Terran Database, Armory, Manufacturing, Yamato Cannon',
  capacity: '6,000 to 8000 crew',
})

rides.push({
  uid: '4cIvY',
  title: 'Kushan mothership',
  example: 'Pride of Hiigara',
  source: 'Homeworld 2',
  category: 'Space',
  size: 'Large',
  image: 'https://i.ibb.co/QXVz3JP/Kushan-Mothership.jpg',
  cost: 400,
  desc: 'Kushan database, extreme production, minimal defenses',
  capacity: '50,000 crew',
})

rides.push({
  uid: 'Tg7hW',
  title: 'Imperial-II class Star Destroyer',
  source: 'Star Wars',
  category: 'Space',
  size: 'Large',
  image: 'https://i.ibb.co/3cFNRyb/Imperial-IIClass-Star-Destroyer.jpg',
  cost: 440,
  desc: 'Heavy armour, heavy weapons, tractor beams, powerful hyperdrive (galactic spanning), small craft complement (72 TIE-series fighters, 8 Lambda class shuttles, 15 Delta class troop transports, 6 assault gunboats), Ground force complement (20 AT-ATs, 30 AT-STs, prefab bases, 9700 sets of Stormtrooper/Clonetrooper gear), Imperial industrial database (including designs for advanced TIEs), extensive machine shops and repair bays, droid crew support.',
  variants: [['Executor class Super Star Destroyer (VERY heavy weapons, VERY heavy armour, 144 fighters, ground force complement 38,000 (500 credits)', 60]],
  addons: [['New Republic upgrade: X-Wings and B-Wings, database current to Galactic Alliance period', 10], ['Stormtrooper/Clonetrooper gear upgraded to Mandolorian grade, Mandalorian forge and database added', 15]],
  capacity: '50,000 officers and crew',
})

rides.push({
  uid: 'A3iYW',
  title: 'Lantean City-ship',
  example: 'Atlantis',
  source: 'Stargate Atlantis',
  category: 'Space',
  size: 'Gigantic',
  image: 'https://i.ibb.co/37HPRbv/Lantean-City-Ship.jpg',
  cost: 1500,
  desc: 'Lantean database and labs, drone launchers, puddle-jumper hangars, wormhole drive, ZPM production facility, living quarters',
  capacity: '1 skeleton crew, 100,000 full compliment, 750,000 passengers',
})

rides.push({
  uid: 'YfRLS',
  title: 'Ideon and Solo',
  source: 'Space Runaway Ideon',
  category: 'Space',
  size: 'Medium',
  image: 'https://i.ibb.co/BcRqzgZ/Ideon-And-Solo.jpg',
  cost: 0,
  costT: 1,
  desc: '(Solo): DS Drive, onboard forest. (Ideon): Three-part combining mecha, arbitrarily powerful weapons and defenses, infinite energy.',
  capacity: '3 mech pilots, ? crew',
})

export const DLCRides: DLCRide[] = []
// Environment Land
// Environment Sea
// Environment Amphibious
// Environment Sky
DLCRides.push({
  uid: 'q5YPq',
  dlc: 'KatzSmile',
  title: 'Bullhead',
  image: 'https://i.ibb.co/G0zK8mh/Bullhead.jpg',
  source: 'RWBY',
  category: 'Sky',
  size: 'Medium',
  cost: 15,
  desc: 'A fairly common flying vehicle in Remnant',
  addons: [['Unlimited Fuel', 5]],
  variants: [['Atlas Manta', 5]],
})

// Environment: Space

DLCRides.push({
  uid: 'BG3pQ',
  dlc: 'KatzSmile',
  title: 'Jumpship',
  image: 'https://i.ibb.co/yQR7MKv/Jumpship.jpg',
  source: 'Destiny',
  category: 'Space',
  size: 'Medium',
  cost: 25,
  desc: 'Jumpships are a type of transportation used in Destiny to fly throughout the space.',
})

DLCRides.push({
  uid: 'PvzQL',
  dlc: 'KatzSmile',
  title: 'A-Team Van',
  image: 'https://i.ibb.co/PWPjNKR/ATeamVan.jpg',
  source: 'A-Team',
  category: 'Land',
  size: 'Small',
  capacity: '1 driver, 7 passengers',
  cost: 5,
  desc: 'Iconic van from A-Team action TV-series',
})

DLCRides.push({
  uid: 'DhB0Z',
  dlc: 'KatzSmile',
  title: 'M-Class Scout Vessel',
  image: 'https://i.ibb.co/th7wZbY/MClass-Scout-Vessel.jpg',
  source: 'Guardians of the Galaxy',
  category: 'Space',
  size: 'Medium',
  cost: 100,
  desc: 'The M-Ships are a class of scout space vessels. Being exceptionally versatile, M-ships serve as capable dogfighters and transport ships, whilst also being very maneuverable, fast, and agile despite what their sizable profile would suggest.',
  addons: [['Unlimited Fuel', 5], ['Unlimited Ammo', 5]],
  variants: [['The Milano', 0], ['The Warbird', 0], ['The Benatar', 0], ['The Mandela', 0]],
})

DLCRides.push({
  uid: 'dw1Py',
  title: 'Batmobile',
  source: 'Arkham Knight',
  image: 'https://i.ibb.co/4sQZvVH/Batmobile.jpg',
  category: 'Land',
  size: 'Small',
  cost: 20,
  desc: `Is it a tank? Is it a racecar? No its the Batmobile!
  <p>Machine gun, 60mm cannon, rubber shot, afterburner, forensic scanner, emp, hack, missile launcher, grappling line</p>
  `,
})

DLCRides.push({
  uid: 'kFNfa',
  title: 'Mantle’s Approach',
  image: 'https://i.ibb.co/HKC86zK/Mantles-Approach.jpg',
  source: 'Halo',
  category: 'Space',
  size: 'Gigantic',
  cost: 1500,
  desc: 'Forerunner database, manufacturing capabilities, slip space drive, Length: 142.7 kilometers (88.7 mi), width: 138.6 kilometers (86.1 mi) wide, height: 371.4 kilometers (230.8 mi), mass of 4.7 quadrillion metric tons, hull: Programmable matter held together by hard light bonds and energy interlocks, cloaking system, torsion fields, Armament: 1 Composer, 1 heavy ion weapon system, 1 stasis tension driver, 40 torsion driver arrays, 1,700 light mass fusillade cannons, 25,000 converging beam cannons, Particle cannon network, Anti-Ship Artillery System[ Z-8250 heavy artillery, Z-8250 light artillery ], complement: 1 Strategos, 25 Princeps, 800 Navarchs, 250,000 Praetorians, 5.5 million Venatores, Over a billion Promethean constructs[ Knights, Watchers, Crawlers], Core seed, command sector, barracks, training grounds, museums, halls of honors',
})

DLCRides.push({
  uid: 'jerNB',
  title: 'M.S. Prima Vista',
  image: 'https://i.ibb.co/jWc0S8Y/MSPrima-Vista.jpg',
  source: 'Final Fantasy IX',
  category: 'Sky',
  size: 'Medium',
  cost: 50,
  addons: [
    ['Fantasy Conversion now runs on it\'s own mana/non mechanical', 10],
    ['Self Repair', 20],
    ['Generates it\'s own supplies for crew', 50],
  ],
  desc: 'The M.S. Prima Vista is a luxury liner with theater used by the Tantalus Theater Troupe in Final Fantasy IX. It runs off a veil energy propulsion system and was built in Zebolt Shipyards in Lindblum.',
})

DLCRides.push({
  uid: 'ktwdG',
  title: 'Starfleet Invincible-class',
  image: 'https://i.ibb.co/VMNNHrs/Starfleet-Invincible-Class.jpg',
  source: 'Star Trek Vanguard Universe',
  category: 'Space',
  size: 'Large',
  cost: 500,
  desc: `The Invincible-class is the single largest multi-mission combat-equipped starship ever constructed by Starfleet. She is designed as the ultimate in front line explorers. She is classified as a Fleet Carrier-Command Battleship. Invincible-class ships combine the roles of battleship and fighter carrier, having a massive offensive capability in terms of on-board weapons and huge complement of tactical fighters.
  <p>At 1,607.2 meters in length, 764.4 meters across, and 305.76 meters high, it is the largest starship class ever built by Starfleet.
  Capacity 4000 crew Full complement 24 Century Federation database and labs, living and diplomatic quarters.</p>`,
  addons: [
    ['Full Smart V.I. Automation', 5],
    ['Quantum Commutations', 5],
    ['Self Repair', 10],
    ['Supply Generation', 10],
    ['Manufacturing Capability', 20],
    ['32nd Century Unredacted Federation Database', 20],
    ['Temporal displacement', 50],
    ['Self Upgrade', 50],
    ['Perfected Omniversal Spore Dive', 150],
  ],
})

DLCRides.push({
  uid: 'hjQna',
  title: 'Venator-class Star Destroyer',
  image: 'https://i.ibb.co/ngLcBvT/Venator-Class-Star-Destroyer2.jpg',
  source: 'Star Wars',
  category: 'Space',
  size: 'Large',
  cost: 400,
  addons: [
  ],
  capacity: '7,400 crew and 2000 troops',
  desc: 'The Venator-class Star Destroyer, also known as the Venator-class Destroyer, Republic attack cruiser, and later Imperial attack cruiser, was one of the capital ships used extensively by the Galactic Republic during the later parts of the Clone Wars, as well as by the Galactic Empire. It was designed and constructed by Kuat Drive Yards and Allanteen Six shipyards.',
})

DLCRides.push({
  uid: 'omlkP',
  title: 'Fury-class Imperial interceptor',
  image: 'https://i.ibb.co/SQXJ686/Fury-Class-Imperial-Interceptor.jpg',
  source: 'Star Wars',
  category: 'Space',
  size: 'Medium',
  cost: 150,
  capacity: '2 skeleton crew, 15 passengers',
  addons: [],
  desc: 'The Fury-class Imperial Interceptor was a starship used by the reconstituted Sith Empire during the Great Galactic War and its resultant Cold War.',
})

DLCRides.push({
  uid: 'vsFGE',
  title: 'X-70B Phantom-class',
  image: 'https://i.ibb.co/QPVtTn1/X70-BPhantom.jpg',
  source: 'Star Wars',
  category: 'Space',
  size: 'Medium',
  cost: 150,
  capacity: '2 skeleton crew, 30 passengers',
  addons: [
  ],
  desc: 'The X-70B Phantom-class was a starship of the reconstituted Sith Empire used by Imperial Intelligence.',
})
