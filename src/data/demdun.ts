import { PerkFull } from 'global'

export const homeDesc = 'Like all company-supplied powers, the powers granted by these perks cannot be nullified, copied, or stolen.'
export const homes: PerkFull[] = []

homes.push({
  uid: 'Qvzbi',
  title: 'Pocket Space',
  category: 'Home',
  image: 'https://i.ibb.co/9q6bnnd/Pocket-Space.jpg',
  cost: 5,
  desc: `
<p>You now possess a timeless extradimensional inventory space. This inventory may be accessed via an app on your smart device, Apportation, or certain Heritage perks. Transferring an item into the inventory via the app requires it to be in contact with you before transport. An item pulled from the inventory via the app will be deposited into your hand or within one meter of your position.</p>
<p>Your Inventory has a volume of 1m by 1m by 3m. Living beings may be stored within, but not any resisting or unwilling ones. Stamped or otherwise bound retinue members always count as willing and unresisting. Time does not pass within your Inventory, for good or ill.</p>`,
})

homes.push({
  uid: 'azTUM',
  title: 'Pocket Apartment',
  category: 'Home',
  image: 'https://i.ibb.co/DCWhpf4/Pocket-Apartment.jpg',
  cost: 10,
  multiple: true,
  max: 2,
  whitelist: ['Pocket Space'],
  desc: `
<p>A 75 sq m extradimensional residence, for when you need a place to crash. It has all the basics: two medium bedrooms, one bathroom, a living area, kitchenette, and closet space. All characters with alternate outfits, shown in any official source, will find them stored in their room or closet. This includes phone, TV, internet, and other network access to any worlds visited after, but not before, chargen. Be careful not to mix up separate networks; URLs may not lead to the same place from one world to the next.</p>
<p>You may access your apartment through portals. These are procedurally generated in each world, generally appearing near locations that are important or useful to you or your purchased and captured waifus. Portals must be on reasonably flat surfaces.</p>
<p>Portals will activate automatically when approached by a valid user. At first, this will only be you. Your subjects can only enter or exit your apartment if they can travel within a local multiverse (bypassing the door entirely) or you hold the door open for them. Only one portal may open at a time and it will automatically close when not in use.</p>
<p>Valid users can sense the nearest portal’s location even without a map, and more precisely the closer you are to it. This is no replacement for a true map. Neutral, hostile, and uninvited eyes will not notice a portal’s presence, activation, or use, and cannot pass through.
Independent multiverse travelers who are not your subjects may also enter your universe directly, provided they spend dedicated and deliberate effort and have a beacon to follow.</p>
<p>Your inventory becomes a sealed vault inside the apartment. You may open the vault while in your Pocket Space, but doing so subjects its contents to the passage of time. If you or a resisting or unwilling subject is inside the vault when it is sealed again, time will continue to pass.</p>
<p>A second purchase of this perk will double the floor area to 150 sq m. Whether the additional space is a loft, basement, or just a larger main level is your choice.</p>
`,
})

homes.push({
  uid: 'Ib9ix',
  title: 'All Roads Lead to Home',
  category: 'Home',
  image: 'https://i.ibb.co/vXfKMBb/All-Roads-Lead-To-Home.jpg',
  cost: 10,
  needed: 1,
  whitelist: ['Pocket Apartment', 'Nomad'],
  desc: 'Your purchased and captured retinue members are now valid users for your apartment’s portals, with all of the same benefits as you. You may now keep multiple portals open simultaneously, though the basic apartment only has so much room to fit them.',
})

homes.push({
  uid: 'wOfcl',
  title: 'Sweet Home',
  category: 'Home',
  image: 'https://images2.imgbox.com/d8/da/Dn7cBAnd_o.jpg',
  cost: 20,
  multiple: true,
  max: 2,
  whitelist: [{ title: 'Pocket Apartment', count: 2 }],
  desc: `Your residence’s floor space is doubled again. It now measures 300 sq m, equivalent to a large house. This includes a master suite (one large bedroom, with one each attached large bathroom and walk-in closet), three other medium bedrooms with their own closets, two and a half other bathrooms, a large living area, full-size kitchen with attached eating area, closet spaces, and one each of very large, large, and medium rooms that you can decide how to use: dojo, garage, library, a shared workshop, extra bedrooms, separate dining room, etc. You may also repurpose unneeded bedrooms until they’re filled.
  <p>Your property now sits on a plot of land. The total area is one hectare (not necessarily an exact square), with the ground extending down 10 meters and the sky going up 20 meters.</p>
  <p>You may now make your Pocket Space any clearly delineated space within your Sweet Home, and not simply a physical vault.</p>
  <p>A second purchase of this perk will double all stated measurements: 600 sq m interior floor space, 2 hectares area, 20 vertical meters of ground, and 40 vertical meters of sky. The number and size of rooms within your Home will increase accordingly.</p>
  `,
})

homes.push({
  uid: 'j719h',
  title: 'Grand Manor',
  category: 'Home',
  image: 'https://i.imgur.com/p9F3bsKl.jpg',
  cost: 30,
  multiple: true,
  max: 2,
  whitelist: [{ title: 'Sweet Home', count: 2 }],
  desc: `Your living space is significantly larger. It now has 1,200 sq m of floor space, with every living, training, and workshop area you and your waifus might need. If you do not have Life’s a Beach, your property’s land area will also increase, to 20 hectares.
  <p>A control room deep in the mansion now allows you to customize the structure however you like. Specialized workshop equipment and exotic resources will only be available if you have someone who knows how to use them, whether that’s a purchased or captured retinue member, your Substitute or Possess target, or by some other means. For safety reasons, all personnel and important items will be ejected from areas undergoing rearrangement.</p>
  <p>A second purchase of this perk will double the interior and exterior measurements again: 2,400 sq m floor space inside, 40 hectares outside.</p>
  `,
})

homes.push({
  uid: 'I9fbi',
  title: 'Life’s A Beach',
  category: 'Home',
  image: 'https://images2.imgbox.com/49/be/ChYPsVe5_o.jpeg',
  cost: 10,
  whitelist: [{ title: 'Sweet Home', count: 2 }],
  desc: `
<p>Your Sweet Home’s lawn is significantly larger, now measuring 15.2 sq km across, with 24 vertical meters of ground and 48 vertical meters of sky. A control center deep in the apartment will allow you to customize the landscape however you like: the default is a tropical island paradise with a standard equatorial day/night cycle and perfect weather all the time. This is the same control system as what Grand Manor provides. If you have either rank of that perk, you can use the control room to add new wings and other features to the manor, within the 20 (40) hectares of manor lands and the vertical clearance offered by this perk and Sweet Home Expansion.</p>
<p>However you set the landscape, the edge of your pocket dimension will be selectively-permeable, allowing biome-appropriate wildlife to wander in from worlds that you and your retinue have visited or call home, without any issues from invasive species, implanted transmitters, pollutants, unwanted predators, etc. For safety reasons, all personnel and important items will be ejected from areas undergoing rearrangement.</p>
<p>If you bring a vehicle into the pocket dimension via Rainbow Bridge or some other method, regardless of whether the vehicle was purchased through this catalog, your dimension will have an appropriately-sized garage, dock, or hangar for it. If you have a starship from Catch-a-Ride, Heavenbuilt Proto, or third-party sources, it will be able to enter and land in your pocket universe even without a multiversal drive. Especially large dreadnoughts may require some geographic rearrangement first.</p>
`,
})

homes.push({
  uid: 'iSYqE',
  title: 'Warehouse District',
  category: 'Home',
  image: 'https://images2.imgbox.com/af/fe/hwYgHsU2_o.jpeg',
  cost: 100,
  whitelist: [{ title: 'Grand Manor', count: 2 }, 'Life’s A Beach'],
  desc: 'The basic Grand Manor offers an automatically replenishing supply of resources for each workshop, but only a limited amount at a time. Each warehouse in this district is 20 m tall and has about 50,000 sq m of floor space, enough to hold… a lot of materials. You can have as many individual warehouses as you have workshops, though this is also capped by your dimension’s physical space. New resources will appear here, in entire pallets at a time. Your retinue members’ workshops will now pull their materials from this central stockpile instead of generating their own. You may also define empty warehouses as sections of your Pocket Space.',
})

homes.push({
  uid: 'ULpFY',
  title: 'Sweet Home Expansion',
  category: 'Home',
  image: 'https://i.imgur.com/rZaspySl.jpg',
  cost: 50,
  whitelist: ['Life’s A Beach'],
  multiple: true,
  max: 25,
  desc: 'Each purchase of this perk will double the surface area of your personal world. This perk may be purchased up to 25 times, with the final purchase expanding the world into, ultimately, a round planet the size of Earth, including 12,740 vertical km of atmosphere and low to medium orbit. Warning: the mansion’s control room can only manage the core region. Terrain, weather, and climate outside the core region will auto-generate and buildings there must be constructed manually.',
})

homes.push({
  uid: 'hXd1v',
  title: 'Pocket Star',
  category: 'Home',
  image: 'https://i.imgur.com/7KyS9yAl.jpg',
  cost: 0,
  costT: 1,
  whitelist: [{ title: 'Sweet Home Expansion', count: 25 }],
  desc: 'Your planet is no longer alone in its universe. This expands your personal realm’s radius to roughly 104.45 AU and places a yellow star at the center, with your planet orbiting around it. No additional planets or other features are included in this perk.',
})

homes.push({
  uid: 'hXd12',
  title: 'Pocket Rocks',
  category: 'Home',
  image: 'https://i.imgur.com/OOFKHINl.jpg',
  cost: 500,
  whitelist: ['Pocket Star'],
  desc: `
  <p>Your planet is no longer alone in its system. This perk will add new rocky planets to your personal solar system. This will be a random number between 1 and 4, inclusive. These planets will obey geophysics and climatology; rocky planets outside of a circumstellar habitable zone will likely need significant terraforming for general use.</p>
  <p>Each of these planets will have a random number of moons from 0 to 2, inclusive. One of these moons, if present, may instead be a ring system.</p>
  <p>If you have Pocket Star II: Voyages, a significant fraction of generated stars will also have rocky planets. This will be a random value between 5% and 40% and may change with additional repurchases of that perk.</p>
  `,
})

homes.push({
  uid: 'hXd13',
  title: 'Pocket Gas',
  category: 'Home',
  image: 'https://i.imgur.com/ETLuPZwl.jpg',
  cost: 1250,
  whitelist: ['Pocket Star'],
  desc: `
  <p>This perk will add giant planets to your personal solar system. This includes traditional gas giants like Jupiter, ice giants like Neptune, and massive solid planets, typically Chthonian planets that were once gas or ice giants but lost their atmospheres. This will be a random number between 1 and 5, inclusive. These planets will obey geophysics and climatology; giant planets are of course uninhabitable in the traditional sense and will need significant investment for general use.</p>
  <p>Each of these planets will have a random number of moons, from 10 to 200, inclusive, and will always have ring systems. Some of these moons will have a safe level of gravity for inhabitation, but may still require terraforming if located outside of a circumstellar habitable zone.</p>
  <p>If you have Pocket Star II: Voyages, a significant fraction of generated stars will also have giant planets. This will be a random value between 20% and 80% and may change with additional repurchases of that perk.</p>
  `,
})

homes.push({
  uid: 'hXd15',
  title: 'Pocket Space Dust',
  category: 'Home',
  image: 'https://i.imgur.com/CeCkBarl.jpg',
  cost: 250,
  whitelist: ['Pocket Star'],
  desc: `
  <p>This perk will add asteroids, meteoroids, comets, dwarf planets, Kuiper Belt objects, an Oort cloud, space dust, and other minor features to your personal solar system. These rocks add aesthetic character to a system and often have economic value to boot. Your core system will always gain 1 full asteroid belt and 1 Oort cloud. We don’t keep track of how many Kuiper Belt objects and other minor rocks are present in any individual system.</p>
  <p>If you have Pocket Gas, the giant planets may have groups of Trojan and Hilda asteroids sharing their orbits. If so, the vast majority of such asteroids will be tied to a single giant planet.</p>
  <p>If you have Pocket Star II: Voyages, every star will have at least some of these features. In particular, a random value between 10% and 60% of generated stars will have asteroid belts.</p>
  `,
})

homes.push({
  uid: 'hXd16',
  title: 'Pocket Star II: Voyages',
  category: 'Home',
  image: 'https://i.imgur.com/ytszVhll.jpg',
  cost: 0,
  costT: 1,
  multiple: true,
  max: 35,
  increment: true,
  whitelist: ['Pocket Star'],
  desc: `
  <p>Your star is no longer alone in its universe. The first purchase of this perk expands your personal realm’s radius to 1 LY, but will not necessarily add any additional stars. With each repurchase of this perk, the radius will double, and the space will be populated by new stars, nebulae, clusters, black holes, galaxies, quasars, and other features. These are all procedurally generated and obey astrophysics; no two personal realms are the same. With only this perk and Pocket Rocks or Pocket Gas, complex life can develop in other planetary systems, but it will not be sapient and will not award credits on capture or sale.</p>
  <p>This perk may be purchased up to 35 times. Each new repurchase will cost 1 more IMG than the last, up to a limit of 35. The final purchase will result in a personal realm with a radius of over 17 billion LY.</p>
  `,
})

homes.push({
  uid: '3BOS6',
  title: 'Niven? Never Heard of Him',
  category: 'Home',
  image: 'https://i.imgur.com/B2CnKKJl.jpg',
  cost: 1200,
  whitelist: ['Pocket Star'],
  desc: 'Your planet is now a full-size ringworld, a solid mass roughly 1.6 million km across and stretching across the entirety of its 940 million km orbital circumference. Including the inner shade ring, the contained atmosphere, and the regularly-placed stations on the outside of the ring - with their own reversed artificial gravity and access to the inner surface - it’s nearly 30 km thick. Even with significant immigration, a contractor’s ringworld may last millions of years before overpopulation ever becomes an issue.',
})

homes.push({
  uid: '0QDNJ',
  title: 'Rainbow Bridge',
  category: 'Home',
  image: 'https://i.imgur.com/RKhSxyE.jpg',
  cost: 30,
  needed: 3,
  whitelist: ['All Roads Lead to Home', 'We Will Meet Again', 'Sweet Home', 'Nomad'],
  desc: `
<p>A dedicated portal room allows pedestrian or vehicle access to your starting world and anywhere else you travel to. You may now freely create temporary portals back to your personal world. These portals are less stable than the generated ones and will disappear after a single round trip. Like the generated portals, these must be placed on a reasonably flat surface. They have all of the same protections described in Pocket Apartment. Only one of these temporary portals may exist at a time. If you place a second portal without using up the first (e.g. by exiting your personal world to a permanent portal), the first will disappear. New worlds after your first will slowly unlock according to the same rules as Exit Stage Left and the other perks in this chain.</p>`,
})

export const demdunDesc = `
<h3 class="text-xl">Advanced Perks: Demiplane or Dungeon?</h3>
<p>You may take one of two directions with your pocket space, opening it up to other realities or further concentrating its power on itself. You may initially only choose one of either Demiplane or Dungeon. Upon doing so, the cost of the other perk becomes 1 IMG.</p>
<p>By further concentrating the power of the space upon itself and making it your own Demiplane, you increase its defenses and your control over its space. If you instead expand it out to other realities, you are better able to shape its physical form and bring it into a world as a Dungeon. In both cases, you may make any decisions about your Sweet Home’s layout, design, and rules via your Company provided Smart Device. Any changes take a week to fully settle into place, no matter how small or grand. Unwanted teleportation into, out of, or from point to point within your owned space(s) is nearly impossible for people not part of your retinue.</p>
<p>There are two major mechanics that are involved with the two upgrade paths, Laws and Retinue Devotion, mostly correlating to Demiplanes and Dungeons respectively.</p>
`

export const laws = `
<h3 class="text-xl">Mechanic: Laws</h3>
<p>Laws are forbidden actions that automatically apply effects on those that violate them. By default, all are equal under the eye of your Laws, and they apply equally to all beings within your Jurisdiction except the Contractor. You can set all conditions in an app on your smart device.</p>
<p>Laws are made up of three main components: the Infraction, the Severity, and the Consequence. An Infraction is the specific action of breaking a specific Law. The Consequence is the effect inflicted upon the Offender. The Severity is the degree of the effect inflicted. Laws can only be made regarding or related to things within a Contractor’s Jurisdiction.</p>
<p><b>A Contractor has Jurisdiction within Company provided spaces (Pocket Apartment and its upgrades, Dragon Cabin, space claimed by Alterzelu Creep, etc), meaning Laws only function (and apply their Consequences) within those areas.</b> A Contractor does not have a default set of Laws or actions they can make Laws about, but the default Consequence that all Contractors have access to is to affect an Offender's libido, arousal, or sensitivity.</p>
<p>Consequences operate similarly to adjustment sliders provided via Tempest Jewelry, Operating on a scale of 0% - 100%. Unlike that binding’s Runes, Consequences cap at 500%. You may cap the effect for either specific laws or offenders in general lower than the maximum. Past 300%, most changes become extremely debilitating: examples include breasts the size of their torso or submissiveness to the point of bowing and begging forgiveness for tiny offenses. Offenders that are not applicable targets (such as being featureless geometric robots or formless AIs) instead have a ‘failure’ slider, that upon being filled causes the Offender to break down, fail, or otherwise be rendered inoperable.</p>
<p>While a single action may break multiple laws, and thus suffer multiple Consequences at once, a specific Law will only apply once per Infraction. A continuous violation (such as flying in a no-flying zone) will apply its Consequences once per hour. A Law’s Consequences may adjust multiple ‘sliders’ that the Contractor has access to at once, but only adjust each one up to the maximum severity of the infraction. Any particular Law will have a maximum severity any Consequences it causes can be, though you may set laws to have smaller effects as desired. By default, these changes fade over time while outside your controlled spaces at a rate of 1% per day.</p>
<p>A Minor infraction may instill changes up to ~1% per infraction. Major infractions may instill up to ~5% changes per; Severe infractions up to ~10%, and Extreme infractions up to ~25%.</p>
<p>For example, the Consequence for assaulting the Contractor in their Demiplane could be the standard, provided weakening effect from Demiplanes, or instead it could increase the Offender’s arousal, or, if the Contractor possessed Laws of the Jungle it could instead increase the target’s breast size, or all of the above at once, adjusting each slider up to 25%.</p>
<p>There is no hard limit to the number of Laws you can have active in your Jurisdiction, though the Company does not recommend having more than 100 without significant mental upgrades on the Contractor’s part or a dedicated waifu to manage the Laws.</p>
<p>The Company App comes with several preset ‘punishment states’ that offenders can be transformed towards, though these may be customized and new templates added. These include Nymphomaniac, Gyaru, Femboy, Bimbo, and Himbo.</p>
`

export const demiplane: PerkFull[] = []

demiplane.push({
  uid: '9ZpfV',
  title: 'Demiplane',
  category: 'Home',
  image: 'https://i.imgur.com/zh6xOUal.jpg',
  cost: 15,
  needed: 1,
  whitelist: ['Sweet Home', 'Nomad'],
  desc: `
  By locking away your Sweet Home and transforming it into a proper Home Demiplane, you gain greater control and safety within it. You may now specifically invite third parties into your demiplane, even if they are otherwise neutral or hostile. Invited parties have the same privileges as any other valid user as described in Pocket Apartment. You may control this whitelist from the company app.
  <p>While within your Domain, you and your retinue heal and recover faster, require less sustenance, and your abilities are more effective. You may also eject anyone in your Demiplane as if you had pushed them out through a portal to their home reality.</p>
  <p>Attacking you, your waifus, or your allies within your Demiplane is an Extreme Infraction, and the Consequence saps strength from the offender. Every 100% change reduces the offender’s effective tier by 1.</p>
  <p>Finally, the severity of all Infractions within your Demiplane are increased by one step, from Minor to Major, from Major to Severe and so on.</p>
  `,
})

demiplane.push({
  uid: 'fUz2p',
  title: 'Persistent Corruption',
  category: 'Home',
  image: 'https://images2.imgbox.com/be/22/Jb69iLtE_o.png',
  cost: 10,
  whitelist: ['Demiplane', 'Dungeon'],
  needed: 1,
  desc: `
  Changes caused by your Laws are permanent and do not fade over time outside of your Domains unless specifically allowed to do so via the Company App.
  `,
})

demiplane.push({
  uid: 'df2Ac',
  title: 'Rewards and Lobbying',
  category: 'Home',
  image: 'https://images2.imgbox.com/64/d9/GcuGYbQg_o.png',
  cost: 50,
  whitelist: ['Demiplane'],
  desc: `
  Consequence Templates may now grant Talents or Perks which you already possess. These gradually ramp up in power as the infractions stack until maxed out at 100%, which grants full access to the Company Talent or Perk.
  <p>While referred to as ‘Infractions’, nothing prevents a Law from being keyed to someone donating money to you, and the Consequence being to provide a portion of the Everlasting Talent to them. Even without this perk, nothing requires the effects of laws to be seen as a punishment from the ‘offender's’ perspective, such as someone paying money to have their breast size increased.</p>
  `,
})

demiplane.push({
  uid: '9Mbit',
  title: 'Laws of Man',
  category: 'Home',
  image: 'https://images2.imgbox.com/e9/eb/uaSRivWU_o.png',
  cost: 25,
  whitelist: ['Demiplane'],
  desc: `
  This perk adds any actions that affect sapient individuals or their property to your personal Jurisdiction, and adds pain and discomfort to the Consequences you may inflict. At 100% pain, a target will feel pain equivalent to a broken femur or bone marrow injection. It also enables restitution or the ability to pay a ‘blood price’. An Offender may make efforts to seek penance for any infractions committed, and will know instinctively what the proscribed action to remove their punishment is. By default, this is to accept the advances of the sapient individual affected by their actions.
  <p>These can only punish undertaken actions, not require them. These rules are universal, but may be conditional, such as ‘stealing is only okay on Tuesdays’, or ‘Combat is only acceptable in designated spaces.’
  </p>
  <p>Typical Laws include “Don’t attack the Contractor,” “Don’t steal from the Contractor,” “Don’t harm the Retinue,” and “Don’t damage the Contractor’s property.”</p>
  <p>Laws of Man are at most Major Infractions.</p>
  `,
})

demiplane.push({
  uid: '08TGD',
  title: 'Laws of the Jungle',
  category: 'Home',
  image: 'https://images2.imgbox.com/dc/e1/kCx676Dx_o.png',
  cost: 25,
  multiple: true,
  max: 2,
  needed: 2,
  whitelist: ['Demiplane', 'Life’s A Beach', 'Nomad'],
  desc: `
  This perk adds any actions undertaken by or that directly relate to or affect non-sapient flora and fauna to your Jurisdiction, and adds the ability to modify the same traits as Advanced Runes: Body to your available Consequences. Additionally, this allows you to set the weather patterns in areas you control, as well as the general nature of the ecology.
  <p>Non-sapients brought into your Domain or that are controlled, tamed, or guided by others feel compulsions to follow through with the laws set out. If they are made to do otherwise, infractions apply to both the creature as well as the master of the creature.
  </p>
  <p>The Flora and Fauna in an area may be modified gradually by these laws, taking on fantastical shapes, up to T4 or the most powerful native variant, whichever is higher. A repurchase of this Law increases that limit to T7.</p>
  <p>Typical Laws include “Don’t attack the Contractor,” “Capture Intruders,” and “Don’t steal from the Contractor,” “Don’t resist the Contractors Advances.”
  </p>
  <p>Laws of the Jungle are at most Major Infractions.</p>
  `,
})

demiplane.push({
  uid: '7CBFi',
  title: 'Laws of Science',
  category: 'Home',
  image: 'https://i.imgur.com/Sn5Ky1el.jpg',
  cost: 50,
  whitelist: ['Demiplane'],
  desc: `
  This perk adds any actions, equipment, or skills that would fall under the Engineering or Science Talents to your Jurisdiction, and your potential Consequences now include mechanical failure chances, increased scientific magic failure chances, or changes that Advanced Runes: Hybrid could implement, provided any racial template abilities would fall under the purview of Engineering or Science Talents.
  <p>While in an area governed by these Laws, forbidden equipment, technology, or ‘tech levels’ will quickly begin to misfire, and eventually entirely fail. People attempting to use them will also suffer a minor Infraction.</p>
  <p>Laws of Science are at most Major Infractions.</p>
  `,
})

demiplane.push({
  uid: 'ZE5qW',
  title: 'Laws of Magic',
  category: 'Home',
  image: 'https://images2.imgbox.com/df/1e/143e1aIS_o.png',
  cost: 50,
  whitelist: ['Demiplane'],
  desc: `
  This perk adds any actions, equipment, or skills that would fall under the Soul or Blessed Talents to your Jurisdiction, and your Consequences can now affect things like mana regen, mana capacity, chakra, current mana, spell slots, and similar things related to magic, or changes that Advanced Runes: Hybrid could implement, provided any racial template abilities would fall under the purview of Soul or Blessed Talents.
  <p>While in an area governed by these Laws, forbidden equipment or magic can have increased difficulty and energy costs.</p>
  <p>Laws of Magic are at most Major Infractions.</p>
  `,
})

demiplane.push({
  uid: 'NEQDt',
  title: 'Laws of Cognition',
  category: 'Home',
  image: 'https://i.imgur.com/PowHjfGl.jpg',
  cost: 50,
  whitelist: ['Demiplane'],
  desc: `
  This perk adds any actions, pieces of equipment, or skills that would fall under the Psychic Talent to your Jurisdiction, and adds the ability to modify the same traits as Advanced Runes: Mind to your available Consequences, as well as changes that Advanced Runes: Hybrid could implement, provided any racial templates abilities would fall under the purview of the Psychic Talent.
  <p>While in an area governed by these Laws, forbidden pieces of equipment or psionics will begin to have increased difficulty and energy costs.</p>
  <p>Laws of Cognition are at most Major Infractions.</p>
  `,
})

demiplane.push({
  uid: 'hcBKY',
  title: 'Tax Laws',
  category: 'Home',
  image: 'https://images2.imgbox.com/06/2f/zajJfJTk_o.png',
  cost: 50,
  whitelist: ['Laws of Man', 'Laws of the Jungle', 'Laws of Science', 'Laws of Magic', 'Laws of Cognition'],
  needed: 1,
  desc: `
  While most Laws only allow actions to be prohibited, this allows actions to be required within the jurisdiction of the corresponding Law.
  <p>Additionally, there may be requirements set out for the usage of equipment or their power sources, such as all gynoids requiring semen as fuel, or all magic requiring the user to have had sex within the past day.</p>
  <p>High tier targets may power their way through this effect, but at significantly increased cost and effort.</p>
  `,
})

demiplane.push({
  uid: 'cOdVH',
  title: 'Laws of Reality',
  category: 'Home',
  image: 'https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/LR0yu.jpg',
  cost: 200,
  whitelist: ['Laws of Man', 'Laws of the Jungle', 'Laws of Science', 'Laws of Magic', 'Laws of Cognition'],
  desc: `
  This perk adds the laws of gravity, distance, temperature, inertia, mana and/or psi density, and similar fundamental concepts to your Jurisdiction. Much like with the weather or non-sapient flora and fauna in Laws of the Jungle, you may freely set these traits within your spaces, and Infractions come from interfering with those Laws.
  <p>This allows for floating islands, corridors that loop upon themselves if you’re not holding the proper key, and even areas of accelerated time.</p>
  <p>You have the mass/energy of a G-type main-sequence star to work with, though you may take material from other realities to add to this. For safety reasons, you and your retinue will be locked out of areas that would not be survivable for a human without explicit intent and confirmation of entry. Additionally, for your safety, Time cannot be turned off, only either accelerated or slowed down, to a maximum factor of 500.</p>
  <p>Careful, fine manipulation of rules can allow for a wide number of effects such as absurdly sized insertions without harm, an effect similar to the hyperbolic time chamber, intimacy taking no objective time no matter how much relative time is experienced, sex empowering an individual for a period of time, sex causing an energy transfer from one gender to another, and more. If you desire a specific rule, you may put in a ticket for a custom request at our Help Desk, whose expert post-singularity consciousnesses will provide these settings within one week.</p>
  <p>People adjusting or altering the local factors without permission are subject to Severe Infractions.</p>
  `,
})

export const devotion = `
<h3 class="text-xl">Mechanic: Retinue Devotion</h3>
<p>By devoting a significant amount of their power and time to something, a retinue member (waifu, husbando, or familiar) can increase the power, output, or scope of various Company products. The measure of power this provides is measured in Devotion Points, and while Devoted, a retinue member provides points equal to the purchase value for their effective Tier (after Step 3) under the standard rules. These points are used to acquire bonuses based on the perk they are interacting with. </p>
<p>For example: A T7 retinue member would provide 100 points while Devoted to a Dungeon. These points could be used to purchase 3 additional floors (30 points) and 700 sq meters of floor space per floor (70 points).</p>
<p>Additional retinue members can almost always be Devoted to a task, site, or company perk that provides such functionality. The points they provide are pooled and only associated with the one task or site they are Devoted to. If the source of the points is removed (such as the retinue member’s death or reassignment), some of the things purchased will begin to fail, collapse, dissolve, or otherwise cease to apply over 24 hours. Which things are lost first are selected via the Company app.</p>
<p>For example: Ten T2 retinue members are Devoted to a Dungeon, for 20 points. Another layer (10 points), 50 sq. meters of floor space per layer (5 points), and 5 T1 traps (5 points) are purchased. If 3 of the retinue members were reassigned to a different Dungeon, the contractor would have to choose which 6 points of functions would be given up.</p>
<p>A Devoted retinue member must stay close to the object of their Devotion, and spend significant amounts of their time and energy attending to it. The further away they get from their object of devotion, the weaker they become. Even being on the other side of a small city from their object of devotion reduces their power and effectiveness by an entire tier. Being on separate planes of existence or different worlds can render weaker copper star retinue members unconscious until returned to their object of devotion or reassigned.</p>
<p>Changes to assignment of a retinue member’s Devotion, or if they’re Devoted to anything at all, are managed via the Company app and take 24 hours to apply.</p>

`

export const dungeon: PerkFull[] = []

dungeon.push({
  uid: 'g4ekX',
  title: 'Dungeons',
  category: 'Home',
  image: 'https://images2.imgbox.com/c5/20/bHUZMTBg_o.png',
  cost: 15,
  whitelist: ['Sweet Home'],
  desc: `
  By opening up your pocket dimension up to other realities, you are able to create bases of power. Your Sweet Home is now a Home Dungeon, and you may create additional World Dungeons. Dungeon structures are nearly indestructible, able to withstand T6 efforts indefinitely. T7-10 efforts will, at a baseline, find it difficult to breach.
  <p>You may now Devote retinue members to a Dungeon. The points gained may be used to do any of the following:</p>
  <ul class="list-inside list-disc">
  <li><b>Create Portal</b> - You may create and sustain a portal to a reality. The cost to create the portal is 1 point for a DR 1 world, 2 for a DR 2, 5 for a DR 3, 10 for a DR 4, 20 for a DR 5, 50 for a DR 6, and so on. These costs are such that a retinue member can sustain a single portal to a world with a DR matching their Tier. This may be a reality you already have access to or a random new reality of the targeted DR. For safety reasons, portals turn off instantly when they lose power. Anyone may perceive and use these portals.</li>
  <li><b>Increase Size</b> - Increase the size of the Dungeon by 10 sq meters per point spent</li>
  <li><b>Increase Depth</b> - The dungeon either excavates or builds another floor for every 10 points spent. Every floor has the same amount of floorspace as the original layer, but do not need to share a layout, only have a connection between them.</li>
  <li><b>Traps</b> - Automatic defenses built into the Dungeon itself that target outsiders. Traps that threaten blue-star (T1-3) targets cost 5 points. Those that can threaten copper-star (T4-6) targets cost 25 points. Those that threaten silver-star (T7-9) targets cost 250 points. Those that can threaten gold-star (T10) targets cost 1000 points. While default traps are purely physical and non-lethal, traps may be designed based on the special abilities of any retinue member Devoted to the Dungeon.</li>
  </ul>
  <p>Using a sustained portal as the initial anchor point, you may Devote retinue members to a new Dungeon in another world.</p>
  <p>A World Dungeon must be an enclosed, contiguous structure, and has several aesthetic presets and default layouts available in the Company App. New structures may be generated, excavated, subsumed from existing ones, or otherwise acquired. A Dungeon does not need to encompass the entirety of a structure, but any layout modifications must maintain connection to existing, unclaimed sections of a structure.</p>
  <p>Each Dungeon has its own point-pool, and World Dungeons do not have a base size like your Home Dungeon. Each Dungeons’s theme and layout is controlled separately, though you may use provided templates or create your own to copy and paste.</p>
  `,
})

dungeon.push({
  uid: 'fTj4M',
  title: 'Spawning Room: Breeding Pits',
  category: 'Home',
  image: 'https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/2iKcL.jpg',
  cost: 50,
  whitelist: ['Dungeons'],
  desc: `
  Devotion Points may now be spent to purchase respawning minions or monsters. Their DP costs are equal to the cost to buy a waifu of the same Tier. These monsters heal or respawn over the course of 24 hours if they are damaged or killed.
  <p>A Dungeon can also create creatures that are capable of utilizing your chosen Binding to Capture targets, such as respawning Symbiote Larvae, androids capable of deploying Tempest Jewelry, or entities made of fragments of your Shroud. This increases their DP cost by half over what their Tier would normally cost.</p>
  <p>Symbiote Larvae and Tantric Arts ‘magi’ or sustained, self-aware magic patterns must be at least Tier 5, but Tempest Jewelry and Shroud based Creatures are at least Tier 6. Despite the Company R&D’s best efforts, creating self-sustained, self-usable Stamps remains out of reach, and there exists no Stamp-based creature. You must possess a Binding for a Dungeon creature to utilize it.</p>
  `,
})

dungeon.push({
  uid: 'IiGRZ',
  title: 'Commerce Room: Hotel California',
  category: 'Home',
  image: 'https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/d28ib.jpg',
  cost: 20,
  whitelist: ['Dungeons'],
  desc: `
  Devotion points may now be spent to provide services and encourage the use of it for commerce. This better enables the Dungeon to act as a place of commerce, such as hospitality, restaurants, storefronts, brothels, strip clubs, or other such things.
  <p>You may spend DP equal to the purchase cost of a waifu to encourage targets up to that tier that enter a Dungeon to partake of its services, to look upon it positively, to return to the venue, and to bring others to it. This is an encouragement, not a compulsion.</p>
  <p>Additionally, potential capture targets are encouraged to put themselves or others present they have clear and significant authority over (such as children, spouses, or prisoners) on the metaphorical table as a potential bargaining chip. This includes things such as offering sexual acts as a substitute for payment, washing the metaphorical dishes, or a period of service, and they may also attempt to convince friends, family, or subordinates to act as additional collateral. Unless otherwise enticed to do so (such as by Lures), a potential target will only do so when unable to pay normally, but is compelled to follow through with these acts should they offer.</p>
  <p>By default, no one finds this offer or following through with it strange or shocking. It's entirely natural for the capture target to deepthroat the manager to pay off her tab. There's nothing weird about a high end adventurer paying for her new armor by spending time as a public use hole in the shop. You may deactivate this effect for non-capture targets, waifus, or otherwise exclude individuals from this effect via the company app.</p>
  <p>Subjects sold to the establishment are Captured as if they had made a love confession.</p>
  `,
})

dungeon.push({
  uid: 'TERdJ',
  title: 'Broadcast Room: Eye of Sauron',
  category: 'Home',
  image: 'https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/YW8UH.jpg',
  cost: 25,
  whitelist: ['Dungeons'],
  desc: `
  Devotion points may now be spent to provide scrying and surveillance in and around a Dungeon, though your accuracy and ability to project your abilities drops off with distance from the Dungeon. Practice extends the effectiveness of your ability projection, though it takes time to develop.
  <p>An initial investment of 2 DP allows you to scry any point within the associated Dungeon via the Company App or 3rd party abilities.</p>
  <p>For an additional 3 DP you may also scry anywhere that has a direct line of sight to your Dungeon.</p>
  <p>You may spend 5 DP to scry anywhere within a 1 kilometer radius of the Dungeon Instance. Every additional 5 DP you spend doubles the distance which you may scry.</p>
  <p>By spending 25 DP, scrying within or from that Dungeon instance now pierces any illusions, deceptions, or obstructions.</p>
  <p>For 50 DP, you may project non-physical abilities via your scrying, such as telepathy, casting spells, or using your Shroud. When it matters, the focal point of your scrying is “you” and is the origin of these powers.</p>
  `,
})

dungeon.push({
  uid: 'RvTrj',
  title: 'Lure Room: My Precious',
  category: 'Home',
  image: 'https://images2.imgbox.com/24/c7/6X60ZOYA_o.png',
  cost: 25,
  whitelist: ['Dungeons'],
  desc: `
  Devotion points may now be spent to draw people towards a Dungeon. The lure criterion can be as broad or specific as desired, such as ‘people carrying a kind of item,’ ‘People with dreams of being heroes,’ or similar categories. The more specific the criteria, the more powerful the effect, which is at its strongest at a focal point in the Dungeon and weakens with distance. It starts at the level of curiosity for anyone made aware of it, causing desirable rumors to pop up about it within range of the effect. While within the area of effect, the more someone learns about the Dungeon, the more intense the effect becomes. The more a person's theme, desires, goals, or history align with the theme of the Dungeon, the more intensely they are drawn. The less they align, the weaker the effect. A Dungeon may have more than one kind of Lure active at a time.
  <p>Once a person reaches the Dungeon and acquires the target of their desire, the effect ceases to compel them, though they may be drawn back in by renewed curiosity, new treasures, or if the original point of interest was a consumable.</p>
  <p>Starting at 5 DP, the effect will reach out to blue-star beings within several kilometers of the Dungeon Instance, and will cap out at a level of interest where the average person may spend money or take time out of their day to come to the Dungeon Instance, but wouldn't take significant risks or break societal norms to do so.</p>
  <p>Further DP may be spent to increase the Tier of targets it may draw in. Up to copper-star (T4-6) targets may be lured by spending 25 DP. Drawing up to silver-star (T7-9) targets costs 250 DP. And finally, drawing gold-star (T10) targets cost 1000 points.</p>
  <p>You may spend 5 DP to extend the effect to all nearby settlements or cities. An additional 5 DP to extend it to the entire region (such as a county, city state, or fiefdom of a noble). Another 5 DP will increase the range to that of the entire country or the rough equivalent in appropriate settings. An additional 5 DP will increase it to that of an entire continent or similar scale region on a planet. A further 10 DP from there will extend its range to the entire planet. And a final purchase of 20 DP (for a total of 50 DP) will eliminate range as a component. Anyone in the same local universe as the dungeon instance that hears the rumors will be affected. </p>
  <p>By spending DP, you may also increase the maximum intensity of the compulsion. For 25 DP, the compulsion can become strong enough that the average person would spend a significant portion of their income to at least visit the location, or bend some laws or rules in order to reach it, but only if they were reasonably certain they wouldn't get caught. An additional 50 DP increases the cap such that they may take meaningful risk at getting caught breaking the law in order to reach it. A final upgrade at 75 DP will cap out the compulsion at where an average person will actually take serious risks in order to reach it, such as trying to get across a short tightrope without training or to murder another person.</p>
  `,
})
