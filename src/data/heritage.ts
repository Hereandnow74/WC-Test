
import { Heritage } from 'global'

export const heritages: Heritage[] = []

export const desc = `
<p>The root choices in this section are mutually exclusive. You don’t have to pick one, but you may not pick more than one without the Ancestral Diversity perk. If you purchase a Heritage Root after chargen, you must first activate it in-character before it will take effect. If your Origin has a matching archetype to a Heritage, you may subtract the list price for their effective tier after step 1a from the Heritage’s price, carrying the remainder forward to later perks in the Heritage’s tree until you run out. Drop-ins and Walk-ins who did not take Power Swap will not benefit from this discount, as they pay nothing to be themselves. Imaginary Tier characters are valued according to the exchange rate of their IMG value. This discount is also subject to the 80% cap. Like all company-supplied powers, the powers granted by these perks cannot be nullified, copied, or stolen.</p>
<p>Heritages modify a contractor’s tier rating at step 1b. Not all Heritage perks have a noticeable effect on a contractor’s tier, or would lift their tier to below what it already is. See the specific perks for details. If you spend IMG on any Heritage’s capstone perk, you will become a TX yourself.
</p>
`

heritages.push({
  uid: 'JrxZe',
  title: 'Ancestral Diversity',
  category: 'Heritage',
  image: 'https://i.imgur.com/ii8uEddl.jpg',
  cost: 1000,
  tree: 'None',
  multiple: true,
  max: 12,
  desc: 'You may now purchase the perks in a second Heritage tree. You must still spend the credits as normal. This perk may be purchased multiple times, once for each Heritage capstone perk you own. Each new heritage after the first, whether opened by this perk or other means, will raise the price of repurchasing this perk by 1000 credits.',
  whitelist: ['Ancestral Diversity Intensity'],
})

heritages.push({
  uid: '2ivtj',
  title: 'Dragon Heart',
  category: 'Heritage',
  image: 'https://images2.imgbox.com/6c/90/VZYjM59p_o.png',
  tree: 'Dragon',
  type: 'Root',
  complex: 'flavor',
  anything: 'Element',
  cost: 80,
  freebies: {
    talentPerks: [{ title: 'Everlasting Talent', cost: 0, count: 1 }, { title: 'Body Tune-Up', cost: 0, count: 1 }, { title: 'Athletic Talent', cost: 0, count: 1 }, { title: 'Martial Talent', cost: 0, count: 1 }, { title: 'Wild Talent', cost: 0, count: 1 }],
    defensePerks: [{ title: 'Body Defense', cost: 0, count: 2 }, { title: 'Wild Defense', cost: 0, count: 2 }],
  },
  desc: `
<p>You have a dragon’s blood. In addition to your basic humanoid form, you can transform into a bipedal dragonoid. (If you lack a humanoid form, one will be provided for you.) This form is roughly 3 m tall, with a bestial head, clawed hands and feet, and separate wings, and maximizes your improved strength and protection at that size without sacrificing any finesse or maneuverability. Its color scheme and aesthetic reflects your elemental affinity, which you must also choose.</p>
<p>Take Body Tune-Up and Everlasting, Athletic, Martial, and Wild Talents, and two copies each of Body Defense and Wild Defense for free. This perk immediately raises a contractor’s effective tier at step 1b to 6.
</p>
<p>Available "elements" include the classical western set (Earth, Fire, Wind/Air, Water, Aether), the classical eastern set (Metal, Wood, Void), chemical elements (Carbon, Mercury, Plutonium…), and those found in modern fantasy (Light, Darkness, Ice, Lightning, Poison…). This element will affect your dragon armor’s design and loadout, including the breath weapon that all dragons have. If you have a Shroud that matches your dragon element, the two bonuses will stack. This affinity is fixed without additional purchases.</p> `,
})

heritages.push({
  uid: 'gkdOF',
  title: 'Dragon Scale',
  image: 'https://i.ibb.co/1RNSC0w/Dragon-Scale.jpg',
  tree: 'Dragon',
  category: 'Heritage',
  type: 'Self',
  cost: 95,
  complex: 'flavor',
  anything: 'Element',
  freebies: {
    talentPerks: [{ title: 'Soul Talent', cost: 0, count: 1 }],
    defensePerks: [{ title: 'Environmental Defense', cost: 0, count: 2 }],
  },
  whitelist: ['Dragon Heart'],
  desc: `
<p>Dragonhood is fully a part of you. You now have a second alt-form, a full-sized quadruped that measures 10 m tall at the shoulder (around 25 m from the nose to the base of the tail). It offers even more physical power than the first form, with a massive buff to your chosen affinity and all the other supernatural abilities you've acquired and trained.</p>
<p>Take Soul Talent and two copies of Environmental Defense for free. This perk immediately raises a contractor’s effective tier at step 1b to 7.</p>
<p>If you flare your power, you’ll trigger a fear reflex in those nearby who can sense it. This will happen automatically whenever you defeat an opponent yourself, or manually for a short time. Some individuals may have… different… reactions to your unleashed aura.</p>
<p>The sizes of your two dragon forms are not set in stone: the more ki, psi, or magic power you have, the larger you can make them. This has no upper limit, but still requires significant time investments, longer than any mortal lifespan. Your dragonoid form can become large enough to wrestle Tengen Toppa Gurren Lagann on an equal footing, and your dragon form can eventually swallow galaxies whole, but it’ll take you billions of years to get there. Before you think of using time magic to accelerate that process, first consider that more people would’ve done it if it was that easy.</p>
<p>When you buy this perk, you get one chance to change your dragon element; use it or lose it. In addition to the mundane choices offered by Dragon Heart, conceptual elements are now available. Literally anything can be a conceptual element, provided you maintain a consistent theme, whether that’s Love, Time, Imagination, a season, Surprise, Heavy Metal, or even Infinity. The more esoteric and exploitable your chosen element, the more time you’ll need to develop and master its full potential. This time starts at tens of years for the basics and can stretch into the millions of years for the truly exotic ideas.</p> `,
})

heritages.push({
  uid: '7Fc4I',
  title: 'Dragon Aura',
  category: 'Heritage',
  image: 'https://i.imgur.com/vz55pURl.jpg',
  tree: 'Dragon',
  type: 'Lure',
  cost: 200,
  freebies: {
    defensePerks: [{ title: 'Stress Defense', cost: 0, count: 2 }, { title: 'Destiny Defense', cost: 0, count: 1 }, { title: 'Destiny Defense', cost: 0, count: 1 }, { title: 'Mind Defense', cost: 0, count: 1 }],
  },
  whitelist: ['Dragon Scale'],
  desc: `
<p>You are a dragon. Dragons are power. Ladies love power. Thus, ladies - rather, anyone compatible with your orientation - love you. Your supernatural aura now tells ki- and magically-sensitive waifus that there's only one person they should be with to have the strongest offspring: you. Take two copies each of Stress Defense and Destiny Defense, and one copy of Mind Defense, for free. Targets of Tiers 1-3 are immune to your aura. For Tier 4 and above, your aura’s effects on uncaptured targets scale with sustained proximity (closer is better), your physical exertion (more is better), ventilation (less is better), and, most importantly, the waifu’s power as measured by her effective tier rating after step 3. Purchased and captured subjects are used to your aura and can ignore its passive effects without effort.</p>
<p>Further conditional modifiers are available for your waifus’ effective tier rating for the purpose of this lure’s compulsion. This “Aura Tier” (for clarity) does not affect the targets’ actual abilities and does not obey the standard tier cap. Characters with serpentine and feline traits get one point added to their Aura Tier; full serpents in humanoid form, actual cat kemonomimi and hybrids, and characters with draconic traits get two points; full dragons (that are sapient) instead get three. Waifus who share a theme with your draconic element get one.  Flaring your aura adds +1 to the Aura Tier of all waifus in the local universe for the duration, overriding the basic fear response. Exposure to any of your other lures will add one Aura Tier each to the affected targets for the following week (168 hours); additional exposure to the same lure, including expansions for that lure, will only reset this timer.</p>
<p>When a target is exposed to your aura for long enough, they will be overcome by lust for you and seek your location like a horny missile. Kidnapping attempts by powerful waifus that this lure turned into temporary yanderes are not unknown, but you should be able to handle it and turn the tables. You are a dragon, after all.</p>
<p>Beings who are not compatible with your orientation can also sense your aura. If you have Zenryoku Zenkai, they will instead see you as a rival or threat, depending on your relative power. Beings who are sufficiently weaker than you will cower and flee. Beings of roughly equal power will feel themselves pulled in to attack you and your subjects, rationalizing your aura’s effect on their thoughts all the way. Beings who are sufficiently stronger than you will dismiss you, as long as you don’t provoke them or close the gap. This functions identically to the aura’s pull on waifus.</p>
<p>The behind - the - scenes mechanics of this perk are described in detail in the Additional Rules section.</p> `,
})

heritages.push({
  uid: 'wx0kI',
  title: 'Dragon Thrall',
  category: 'Heritage',
  image: 'https://i.ibb.co/jR1sk8k/Dragon-Thrall.jpg',
  tree: 'Dragon',
  type: 'Party',
  cost: 150,
  freebies: {
    defensePerks: [{ title: 'Polymorph Defense', cost: 0, count: 1 }, { title: 'Wyldscape Defense', cost: 0, count: 1 }],
  },
  whitelist: ['Dragon Scale'],
  desc: `
<p>Every part of a dragon is infused with the concept of power, including their bodily fluids. Taking in large amounts of your fluids, over long periods of time, will make your waifus more powerful and slowly raise their effective tier. This is calculated after any tier changes from waifu perks, but before cross- training, equipment - including the waifu’s own equipment - or bindings, and only affects the attraction bonus from Dragon Aura until the drinker is captured. Take one copy each of Polymorph Defense and Wyldscape Defense for free.</p>
<p>On a Tier 1 waifu, the first dose(120 mL) will improve her physical fitness by a noticeable, but still mundane, amount and grant her a burst of inspiration that she can funnel into any one field of expertise, elevating her to Tier 2 on the spot. A Tier 2 waifu will experience the same effects for the course of five doses, until she becomes Tier 3.  Over the course of twenty - five doses, a Tier 3 waifu’s skills and fitness will become supernatural enough to qualify her for Tier 4, with the exact manifestation dependent on your element and her personality and themes. Every tier boost after that requires five times as many doses as the one before it.</p>
<p>Waifus of Tier 7 or above cannot be boosted higher with this perk alone. Those whose tiers have been raised to Tier 7 by this perk will instead begin to manifest draconic traits, with the specifics dependent on your element and their personalities and themes. Waifus with pre - existing draconic, serpentine, or feline traits will experience this effect sooner. Waifus with pre existing elements, whether from their own history, an Elemental Shroud, or a previously - applied Heritage perk, will retain those elements and not gain a new one. Costume animal parts are not enough to qualify a waifu for the transformative effect unless they’re worn for significant and ongoing timespans, while permanent augmentations(organic or otherwise) always do. Affected waifus may always shapeshift obvious draconic traits back to their original forms.</p>
<p>PvP note: If another contractor, whether they captured you or you captured them, has used this perk on you often enough to make you manifest draconic traits, take Dragon Heart for free the next time you have an account to access. The remaining Dragon Heritage perks must be bought using your own funds.</p> `,
})

heritages.push({
  uid: 'QlHkg',
  title: 'Dragon Blood',
  category: 'Heritage',
  image: 'https://images2.imgbox.com/a3/76/mG5GaYWD_o.jpeg',
  tree: 'Dragon',
  type: 'Party',
  cost: 150,
  freebies: {
    defensePerks: [{ title: 'Polymorph Defense', cost: 0, count: 1 }, { title: 'Wyldscape Defense', cost: 0, count: 1 }],
  },
  whitelist: ['Dragon Thrall'],
  desc: `
<p>The tier cap on Dragon Thrall is now lifted. Waifus may now be boosted by it all the way to Tier 10.  Further doses after that will strengthen them, but without further tier- ups. Dragon Thrall’s transformative effect now affects all waifus of Tier 7 or higher. Take one copy each of Polymorph Defense and Wyldscape Defense for free.</p>
<p>PvP note: If another contractor, whether they captured you or you captured them, has used this perk on you often enough to make you manifest draconic traits, take Dragon Scale for free the next time you have an account to access. The remaining Dragon Heritage perks must be bought using your own funds.</p> `,
})

heritages.push({
  uid: '3AGji',
  title: 'Treasure Hoard',
  category: 'Heritage',
  image: 'https://images2.imgbox.com/91/1f/bpCfzfFJ_o.jpeg',
  tree: 'Dragon',
  type: 'Other Control',
  cost: 20,
  whitelist: ['Dragon Scale'],
  desc: 'You may now capture a subject by biting them, drawing blood, and swallowing a small amount. The bite itself is important to establish dominance, but where you bite doesn’t matter. The core of a tattoo will appear at that spot, just the same as using the Stamp, and may be moved to a more ideal part of her body using the company app, just like with the stamp. This may be purchased alongside higher bindings or even No Bindings. Again like the stamp, tattoos created by this perk will remain visible until they’re superseded by higher bindings, but only take 5 minutes to settle instead of the full 3 days. ',
})

heritages.push({
  uid: '9fu6L',
  title: 'Dragon Cabin',
  category: 'Heritage',
  image: 'https://i.ibb.co/5BYYqTf/Dragon-Cabin.jpg',
  tree: 'Dragon',
  type: 'Party',
  cost: 30,
  whitelist: ['Dragon Scale'],
  desc: `
<p>Your dragon form now contains a pocket dimension for passengers and cargo, akin to the interior of an airliner, airship, submarine, or spaceship. This dimension is typically accessed via at least one airlock hidden in the abdominals or lower or upper orifices. The dimension still exists while you’re in other forms, but the airlocks do not, trapping anything inside until you change back. Apportation and other methods of dimensional travel are not affected. The size of this cabin grows with your dragon form, but does not perfectly match the torso’s exterior dimensions.</p>
<p>Your interior’s aesthetics may follow any theme you can imagine. You may learn to freely manipulate its layout and furnishings or manifest an avatar inside it; these are easier if you already have experience with similar abilities. Holding any uncaptured subject within this space counts as extremely close contact for the purposes of Dragon Aura. Anyone inside your cabin, including people who are not part of your retinue, will be protected from the outside by your Defenses as if they had them personally.</p> `,
})

heritages.push({
  uid: 'uMDT3',
  title: 'Dragon Bifurcation',
  category: 'Heritage',
  image: 'https://i.ibb.co/rH31fGY/Dragon-Bifurcation.jpg',
  tree: 'Dragon',
  type: 'Self',
  cost: 25,
  whitelist: ['Dragon Cabin'],
  desc: 'Your full-size dragon form now benefits from both the waifu perks I’m on a Boat and Bifurcation: you may manifest an avatar with your normal appearance outside of your full-size dragon form. You can dedicate your full attention to both the full-size dragon form and this avatar simultaneously without issue. It can physically enter your full-size form’s Dragon Cabin and use all of your abilities except transform into a second copy of your full-size dragon form. This counts as a single purchase of both I’m on a Boat and Bifurcation, reducing the number of purchases of those perks needed to reach their price caps by one.',
})

heritages.push({
  uid: 'CYKzi',
  title: 'Dragon Break',
  category: 'Heritage',
  image: 'https://images2.imgbox.com/67/83/REbOrXK9_o.png',
  tree: 'Dragon',
  type: 'Self',
  cost: 50,
  costVariants: [50, 40, 20],
  whitelist: ['Dragon Cabin'],
  desc: 'You no longer need your app to transition between worlds; your nature is enough. You and everything within your cabin dimension will blink out of one world and into your destination. Anyone whose weight is only supported by your exterior may be dragged along as well. This form of D-travel can accurately target any world in a local multiverse and any world previously visited. Traveling to a specific new world, outside of a local multiverse, is far less reliable, but you’ll always end up in a place where you needed to be, even if it isn’t where you wanted to go. It cannot target near-identical parallels of the same worlds without Blank Slate. This perk is discounted by 10 credits if you’ve encountered a world-traveler who is neither one of your subjects nor a company contractor. If one of your subjects can travel between worlds, the discount increases to 30 credits. This discount is not available on DRΧ starts.',
})

heritages.push({
  uid: 'VKWW1',
  title: 'Double Dragon',
  image: 'https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/ZpJjo.jpg',
  tree: 'Dragon',
  category: 'Heritage',
  type: 'Self',
  cost: 200,
  complex: 'flavor',
  anything: 'Element',
  freebies: {
    defensePerks: [{ title: 'Fatality Defense', cost: 0, count: 2 }, { title: 'Corruption Defense', cost: 0, count: 1 }],
  },
  whitelist: ['Dragon Scale'],
  desc: 'You may select a second dragon element. If you switched to a conceptual element with Dragon Scale, you may choose your old element or something new. Your training with one element will not usually carry over to the other, unless your level of understanding allows you to harmonize them as one. This perk also adds +1 effective tier to all waifus in your local universe for the purpose of Dragon Aura and immediately raises a contractor’s effective tier at step 1b to 8. Additionally, take two copies of Fatality Defense and one copy of Corruption Defense for free.',
})

heritages.push({
  uid: 's7dWf',
  title: 'Elder Dragon',
  image: 'https://i.ibb.co/JBVtkRL/Dragon-Elder.jpg',
  tree: 'Dragon',
  category: 'Heritage',
  type: 'Self',
  complex: 'flavor',
  anything: 'Element',
  cost: 0,
  costT: 1,
  whitelist: ['Double Dragon', 'Dragon Thrall', 'Dragon Aura'],
  desc: 'You may select a third dragon element. Your ability to master each of your elements is vastly accelerated: you can achieve the same results in only one- thousandth of the total time. All waifus in your local universe gain another effective tier for the purpose of Dragon Aura. ',
})

// Pirate

heritages.push({
  uid: 's4dWa',
  title: 'Under Jolly Roger',
  image: 'https://i.imgur.com/Ag5kt8Fl.jpg',
  tree: 'Pirate',
  freebies: {
    talentPerks: [{ title: 'Athletic Talent', cost: 0, count: 1 }, { title: 'Martial Talent', cost: 0, count: 1 }, { title: 'Performance Talent', cost: 0, count: 1 }, { title: 'Covert Talent', cost: 0, count: 1 }],
  },
  category: 'Heritage',
  type: 'Root',
  cost: 60,
  additionalDesc: `<h3 class="text-lg font-semibold text-center">Beyond Swashbuckling</h3>
  This heritage is not limited to the aesthetics of Golden Age piracy. Many other outlaw styles are viable, including seedy space gangster, Robin Hood’s Merry Men, Vikings, La Cosa Nostra, leather and spikes apocalypse cult, and free sex anarchist commune. “Booty” can include any valuable goods, including precious metals and jewelry, spices and narcotics, alien contraband, or sapient slaves.
  `,
  desc: `The Black Flag drapes from your shoulders and the thirst for plunder burns in your veins. You gain just a bit of the wild luck of such a rogue, which manifests most when you are at your most daring. The more flamboyant, dramatically, over the top, ridiculously, and/or generally dynamically you perform an action in the presence of non-retinue members, the better you perform the action.
  <p>Take Athletic, Martial, Performance, and Covert Talents for free. This perk immediately raises a contractor’s effective tier at step 1b to 4.</p>
  <p>A Pirate isn’t a Cap’n without their ship. (In the case of broader ‘seas’ like dunes of sand or the vacuum of space, any crewed vehicle will do.) Any purchased, captured, or claimed Catch-A-Ride that you have marked as Brigand, Pirate, or Outlaw vehicle is subject to Company Protections like your Company Smart Device, so long as it retains its markings and is not currently boarded by hostile forces. It may be summoned to you, within any environment it could normally operate in. Finally, appropriately marked Catch-A-Rides may be remote controlled by the Contractor.</p>
  `,
})
heritages.push({
  uid: 's4dWb',
  title: 'Bling, Booty, and Chests',
  image: 'https://i.imgur.com/aXCsFphl.jpg',
  tree: 'Pirate',
  category: 'Heritage',
  type: 'Party',
  cost: 60,
  whitelist: ['Under Jolly Roger', 'Pocket Space'],
  additionalDesc: `<h3 class="text-lg font-semibold text-center">Too Much of a Good Thing?</h3>
  Even at extreme values, growth induced by this perk will never overly encumber your crew. It may serve as an “opponent” for the purposes of Martial, Athletic, or Covert Talents, while the decks and internals of your ships and other company spaces will automatically grow and shrink to accommodate your crew’s proportions. Corridors will always be wide enough for two crew members to walk side by side, while doors will always be just large enough for one crew member to pass through.
  `,
  desc: `
  <p>Your crew thirsts for booty. You and your crew gain an instinctive ability to sense and track down booty and those who have it hidden away. Your smart device now has a Booty Tracker app. It will automatically inventory the value of all owned booty, by storage location and type. The grand total of all booty is also visible, as is, for each ship, the average share of booty aboard that ship per crew member. Crew members who are also subjects will also gain access to a shared booty space, separate from your personal pocket. Its entrances may be intuitively accessed from lower orifices and areas of sufficient cleavage. The booty space has no hard limit on its contents.</p>
  <p>Instead, by designating Shares of plundered booty to each crew member, the total value of all goods currently stored in the booty space, or as cargo aboard your ships and in company-provided spaces, will be represented with increasingly grandiose changes along a set theme. This theme can take a number of forms depending on the Contractor or individual's preferences, but common ones include the manifestation of expensive jewelry, clothing becoming increasingly opulent, gilded piercings, intricate body art, and literal 'asset' expansion such as the breasts, thighs, and ass of women or the torso, muscles, and genitals of men.</p>
  <p>The higher the value of total assets, the more intense these effects become. At the highest levels, after an extremely successful heist or trail of piracy, a crew member who is also your subject may become:
  <ul class="list-inside list-disc">
    <li>fully decked in expensive silks,</li>
    <li>Drastically altered in skin and hair colors,</li>
    <li>Tattooed from head-to-toe,</li>
    <li>Stacked to put an ecchi-character to shame,</li>
    <li>Or bedecked in enough gold to make King Midas drool with envy.</li>
  </ul>
  Through the Booty Tracker app, you may set caps on any or all of these developments. However, as the value of booty per crew member continues to rise beyond the caps, transformational pressure will continue to build.
  </p>
  <p>A cap’n who doesn’t allow the crew to spend their hard-earned loot will see additional booty, beyond the set caps, instead manifest as first discontent and then outright mutinous attitudes. Discontentment may also arise from failure as a pirate: having too little booty for your crew size and the length of your current expedition. Your designated officers will not mutiny, but the number of officers per ship is limited by ship class and size.</p>
  <p>When your ship next enters port, if you have mutinous crew and do not formally end the expedition and then distribute the booty among your crew, some of your crew may desert. Crew who are in your retinue will not leave permanently, but instead live independently until their mood improves and they drift back to rejoin your crew.</p>
  <p>As an alternative to keeping sufficient booty, ending an expedition, or weathering desertion, you may instead correct 💢💢💢 the mutineers’ behavior. This can occur by any means: mundane, sexual, with the use of third-party or company methods, etc. Corrected 💢💢💢 crew are more effective in their roles than mutinous and even satisfied crew, but this status will only last for two weeks (336 hours). If the base conditions for mutiny are not resolved in that time, the mutineers will relapse and require further correction 💢💢💢.</p>
  `,
})
heritages.push({
  uid: 's4dWc',
  title: 'Pirate Armada',
  image: 'https://i.imgur.com/l8km4Wdl.jpg',
  tree: 'Pirate',
  freebies: {
    talentPerks: [{ title: 'Engineering Talent', cost: 0, count: 1 }, { title: 'Talent Sharing', cost: 0, complex: [{ flavor: 'All', cost: 0 }], count: 1 }],
  },
  category: 'Heritage',
  type: 'Party',
  cost: 60,
  whitelist: ['Under Jolly Roger'],
  desc: `
  <p>You may now designate a crew member to be Cap’ns’ of any Catch-A-Ride that you have marked as Brigand, Pirate, or Outlaw vehicle. They now gain the abilities you have, regarding their ride per Under Jolly Roger, such as the designation of Shares for their crew, as well as the control and summoning of the vehicle. Your sub-Cap’ns will not mutiny, nor will their officers, and can establish their own caps and aesthetics for their crews.</p>
  <p>Finally, take Engineering Talent for free, plus Talent Sharing for all basic Talents granted by this Heritage.</p>
  `,
})
heritages.push({
  uid: 's4dWd',
  title: 'And a Bottle of Rum',
  image: 'https://i.imgur.com/S9s49dUl.jpg',
  tree: 'Pirate',
  freebies: {
    defensePerks: [{ title: 'Stress Defense', cost: 0, count: 2 }, { title: 'Addiction Defense', cost: 0, count: 2 }],
  },
  category: 'Heritage',
  type: 'Party',
  cost: 50,
  whitelist: ['Under Jolly Roger'],
  desc: `
  <p>What’s a pirate without a little rum and spice? You can now operate at full capability while under the effects of any intoxicants. Even while crossfaded to oblivion and back, you can fight, fuck, and finangle just as well as you can while stone cold sober. Additionally, alcohol now meets every dietary and health need of your crew. This includes things such as sleep. If someone ingests the body fluids of a crew member, they may experience any or all of the same intoxicant effects as that crew member. Take two levels each of Stress and Addiction Defenses for free.</p>
  <p>Alcohol, drugs, intoxicants, and other mind altering substances created or possessed by your crew now have healing properties and may act as an aphrodisiac. Additionally during the creation process you are able to store objects (such as ships, loot, mana, spells, energy etc) into them such be released after or during use.</p>
  `,
})
heritages.push({
  uid: 's4dWe',
  title: 'Irresistible Booty',
  image: 'https://i.imgur.com/lwQ8psul.jpg',
  tree: 'Pirate',
  freebies: {
    defensePerks: [{ title: 'Trace Defense', cost: 0, count: 1 }],
  },
  category: 'Heritage',
  type: 'Lure',
  cost: 70,
  whitelist: ['Bling, Booty, and Chests'],
  desc: `
  <p>Spending suits you. Shows of wealth, money, and casual spending using booty directly (or from money acquired from selling booty) make you more attractive to waifus that become aware of it. This effect increases with particularly ostentatious and over the top expenditures or objects, against targets that are motivated by money in some way, and to the direct recipient of booty exchanged for goods or services.</p>
  <p>Any Booty that you or your Retinue do not freely and willingly spend or give away remains connected to you and wishes to return, imparting those wishes on those that hold it. The greater the concentration, the greater the connection. The thieves are compelled to seek you out again, and the more booty they acquire the stronger the compulsion. Additionally, take one copy of Trace Defense for free.</p>
  <p>If you have Tortuga, any booty you store in a Safe Haven automatically generates phantom copies of that treasure in an appropriately hidden location. Gold and jewels might be hidden in a chest buried at a beach, particularly valuable drugs might be hidden under the floorboards of an out of the way space, a harem of concubines might create phantom “convents,” and so on. If this phantom treasure is discovered and taken, the taken material will become real - with the original booty disappearing from your Safe Haven - and act as ‘stolen’ treasure for the purposes of this perk.</p>
  `,
})
heritages.push({
  uid: 's4dWf',
  title: 'Release the Kraken',
  image: 'https://i.imgur.com/MeKlMHBl.jpg',
  tree: 'Pirate',
  freebies: {
    defensePerks: [{ title: 'Information Defense', cost: 0, count: 1 }, { title: 'Creature Defense', cost: 0, count: 1 }],
  },
  category: 'Heritage',
  type: 'Self, Party, Lure',
  cost: 100,
  whitelist: ['Bling, Booty, and Chests'],
  desc: `
  <p>There’s always a bigger fish. You and your crew may, with some difficulty depending on the success of your hoarding, stuff any exaggerated proportions (no matter the source) into clothing that should by all rights be too small for it. The appearance of nearly bursting out is optional and will allow a Love Spot on that site to function even through the covering, albeit at a lesser level. Releasing these ‘assets’ significantly amplifies the effects of any Lures on all valid targets that witness it for the next hour.</p>
  <p>Take one copy each of Information Defense and Creature Defense for free. This perk immediately raises a contractor’s effective tier at step 1b to 6.</p>
  <p>Additionally, you may call upon and summon a kaiju-scale creature once every 24 hours. You do not have specific control of the appearance, type, or actions of the creature, though you may set rough guidelines. If you defeat this monster, or any other monster larger than your current Catch-A-Ride, you can integrate it into that vehicle. Only one monster may be integrated into any one vehicle at a time. This affects both the vehicle’s aesthetics and the aesthetics and morphology of its crew, as well as providing minor abilities based on the monster. A sandworm might allow a sailing ship to cross desert sands as naturally as the sea. Individuals that are crew of multiple infused ships may have multiple traits. Once per 24 hours, an integrated monster may be re-released into the world for 1 hour, much like summoning a random kaiju-scale creature. However, while released, the crew loses any abilities related to that monster.</p>
  `,
})
heritages.push({
  uid: 's4dWh',
  title: 'Letter of Marque',
  image: 'https://i.imgur.com/mLPC1zBl.jpg',
  tree: 'Pirate',
  freebies: {
    talentPerks: [{ title: 'Blessed Talent', cost: 0, count: 1 }],
    defensePerks: [{ title: 'Mind Defense', cost: 0, count: 1 }, { title: 'Information Defense', cost: 0, count: 1 }],
  },
  category: 'Heritage',
  type: 'Lure',
  cost: 100,
  whitelist: ['And a Bottle of Rum'],
  desc: `
  <p>You have a natural charm that draws in economic, religious, military, and political leaders as well as the upper echelons of society and their relatives. They will find themselves drawn to you, either for your power or uses in their plans. This effect is primarily based on interaction, and is stronger the more direct the interaction and the higher the status and power of the target. Take Blessed Talent and one copy each of Mind Defense and Information Defense for free.</p>
  <p>You additionally gain the ability to form contracts with rulers, commonly known as Letters of Marque. These letters expect fealty to the ruler commonly as a mercenary, additionally they come with requirements. You will often be required to attack their enemies and to not attack the ruler’s faction. Once you obtain a letter of marque, those who work for, are part of, or merely identify as part of that ruler’s faction will find ways to justify not attacking or prosecuting you. They are more likely to leave you be, as long as you follow through with the requirements of the contract. The more loyal they are to the faction, the stronger the compulsion.</p>
  `,
})
heritages.push({
  uid: 's4dWg',
  title: 'Tortuga',
  image: 'https://i.imgur.com/4A7fjxkl.jpg',
  tree: 'Pirate',
  freebies: {
    talentPerks: [{ title: 'Administrative Talent', cost: 0, count: 1 }, { title: 'Land Talent', cost: 0, count: 1 }],
  },
  category: 'Heritage',
  type: 'Self, Party',
  cost: 50,
  whitelist: ['And a Bottle of Rum', 'Meta Shift'],
  desc: `
  <p>You bring the lawlessness with you. Your crew's actions and expenditures inspire others across the worlds you are in towards depravity. The more successful your raids, the larger your fleets become, the more booty you acquire and spend, the more others seek to emulate your success, and pushing the world towards a form of lawlessness, depravity, or degeneracy of your choosing, even if it is antithetical to the world’s origin.</p>
  <p>Take Administrative and Land Talents for free. This perk immediately raises a contractor’s effective tier at step 1b to 5.</p>
  <p>Purses, blouses, and morals all loosen over time as you spend your (likely) ill-gotten gains in an area. While localized to establishments and areas you and your crew spend money, the effect does spread over time. If you spend all of your booty in a single tavern, by the end of the night the owner would let your crew run a train on his daughter, but if your crew had a night on the town, they might just overlook sexual harassment. This causes a gradual change to the area to make it more accommodating to pirates and outlaws, some common effects are to have chests instead of vaults, coins may go back into fashion, and local fashion trends may become closer to your particular outlaw style.</p>
  <p>Once a polity has been sufficiently affected, such that a wanted criminal may walk around and operate openly without concern about being accosted by the law, it is considered a “Safe Haven”. You may also directly create a Safe Haven if you have political control over an area, though this reduces the effects of spending your money adjusting morals. </p>
  <p>Once you have a Safe Haven, you may store excess booty within or near the Safe Haven. Booty stored in this fashion does not transform you or your crew via Bling, Booty, and Chests. Additionally, deserters who live in a Safe Haven will recover their mood and rejoin your active crew much faster.</p>
  `,
})
heritages.push({
  uid: 's4dWj',
  title: '“The Day You Almost Caught-”',
  image: 'https://i.imgur.com/TNyVQ7cl.jpg',
  tree: 'Pirate',
  freebies: {
    talentPerks: [{ title: 'Soul Talent', cost: 0, count: 1 }],
    defensePerks: [{ title: 'Paradox Defense', cost: 0, count: 1 }, { title: 'Destiny Defense', cost: 0, count: 2 }],
  },
  category: 'Heritage',
  type: 'Party',
  cost: 190,
  whitelist: ['Release the Kraken', 'Letter of Marque'],
  desc: `
  <p>You never know when a pirate or outlaw will show up - or how they’ll get away. When you, your Catch-A-Ride, or an accompanying fleet are meaningfully obscured and unobserved, you are able to use that unobserved uncertainty to teleport. You or your pursuer have no idea where you are, so you could be - and are - anywhere else. Take one copy of Paradox Defense and two copies of Destiny Defense for free.</p>
  <p>Practical use of this perk varies wildly by terrain. In a naval context, this can express itself as a whirlpool or fogbank. With airships, it might be entering a tornado or stormcloud. For a land raider, this might be a sandstorm or blizzard that reduces visibility to zero. These conditions need not be natural. A weather manipulator or large cache of smoke bombs will work just as well as an actual storm.</p>
  <p>In a pinch, you can even employ the Roadrunner Escape Technique: using a painting of a road or passage as a real road or passage, while your pursuer slams into a wall, through the painting canvas and off the cliff it was hiding, etc. However, this technique can only be used once per week and the painting must be prepared in advance.</p>
  <p>Regardless of means, your destination will be safe from further pursuit and the same kind of terrain as where you escaped from, but otherwise random. Safety from local problems at the destination is not guaranteed. If you have any Safe Havens, you may instead guarantee your arrival at one of those locations.</p>
  <p>Using this perk while in any purchased or claimed Catch-A-Ride's that you have marked as Pirate, Outlaw, or Brigand vehicle, you may use this function to travel between worlds, even new ones. However, traveling to a new world is random in its selection.</p>
  `,
})
heritages.push({
  uid: 's4dWk',
  title: 'The Dread Pirate Roberts',
  image: 'https://i.imgur.com/RtJeFMXl.jpg',
  tree: 'Pirate',
  freebies: {
    talentPerks: [{ title: 'Communication Talent', cost: 0, count: 1 }],
    defensePerks: [{ title: 'Fatality Defense', cost: 0, count: 1 }],
  },
  category: 'Heritage',
  type: 'Self, Lure',
  cost: 150,
  whitelist: ['Letter of Marque', 'Irresistible Booty'],
  desc: `
  <p>The ship always needs a Cap’n. Upon being slain, provided you have a crew member who has agreed to carry on your legacy or you were killed with active hostile intent, your legacy, spirit, memories, and self will be passed along. This will preferentially target your designated heir, but you can instead target your killer. If it’s your designated heir, you functionally Substitute into the individual. With a designated heir, this will happen over the course of 24 hours, whereas time to full possession for hostile actors varies, generally taking 168+ hours. If the target is killed prior to your full control, the effect does not activate again.</p>
  <p>Take Communication Talent and one copy of Fatality Defense for free. This perk immediately raises a contractor’s effective tier at step 1b to 6.</p>
  <p>Additionally, your deeds have a way of carving themselves into legend. Even when there would be no survivors, rumors and dark whispers will spread of your savage deeds, each more terrible than the last. Those who hear tales of your exploits may debase themselves in whatever way they believe will have you spare them, and may turn weak in the knees for reasons that have nothing to do with terror. The more immediate your presence and the threat looming over a target, the greater the effect.</p>
  `,
})
heritages.push({
  uid: 's4dWl',
  title: 'Part of the Ship, Part of the Crew',
  image: 'https://i.imgur.com/hCam5m8l.jpg',
  tree: 'Pirate',
  freebies: {
    defensePerks: [{ title: 'Corruption Defense', cost: 0, count: 1 }],
  },
  category: 'Heritage',
  type: 'Other Control',
  cost: 70,
  whitelist: ['Irresistible Booty', 'Tortuga'],
  desc: `
  <p>Everyone has their price: press-ganging, shanghaiing, and contracts are all just ways of finding it. Take one copy of Corruption Defense for free. If an individual is meaningfully overcome and taken onto your ship, they have the beginnings of a demi-tattoo appear on them and are temporarily considered part of that ship’s crew. Until the ship next enters port, the longer they spend contributing to the ship’s functioning, the more appealing they will find the idea of remaining aboard your ship and joining the crew on a permanent basis. This effect caps after roughly two weeks (200 working hours).</p>
  <p>Once your ship arrives in port, you may offer your captive or guest the chance to stay. If the captive has a strong will, emotional connections outside the ship, or a rigid, law-abiding personality, they have a higher chance of refusing the offer. All effects of this perk on the captive will then shatter and you have to start again from the beginning.</p>
  <p>If, instead, the captive has a weak will, thirst for adventure, feelings of being chained by duty and obligations if they return home, or are currently feeling the effects of active Lures, they are more likely to accept the offer and join your crew, at which point they are instantly captured. Alternatively, formal contracts to act as a member of the crew of one of your ships, even by people who were not previously your captives, will also result in instant captures.</p>
  <p>All crew members who are assigned roles on a ship will feel a strong compulsion to play that role. This includes both standard roles, such as quartermaster, shipwright, chef, gunner, or navigator, and entirely fictional ones such as service maid, ship bedwarmer, sea witch, or prow ornament.</p>
  <p>Finally, a crew member may be assigned to become the spirit of a Catch-A-Ride. This acts like Third-Party Riggings and I’m on a Boat for the designated crew member.</p>
  `,
})
heritages.push({
  uid: 's4dWi',
  title: 'Hoist the Colors',
  image: 'https://i.imgur.com/x4ekF7fl.jpg',
  tree: 'Pirate',
  category: 'Heritage',
  type: 'Self',
  cost: 0,
  costT: 1,
  whitelist: ['“The Day You Almost Caught-”', 'The Dread Pirate Roberts', 'Part of the Ship, Part of the Crew'],
  desc: `
  <div class="text-center"><i>
  The king and his men stole the queen from her bed<br>
  And bound her in her bones<br>
  The seas be ours and by the powers<br>
  Where we will, we'll roam<br>
  Yo-ho, all together<br>
  Hoist the colors high<br>
  Heave ho, thieves and beggars<br>
  Never shall we die<br>
  </i></div>
  <br>
  <p>You and your crews gain a variety of benefits. All of your crews and ships may now use the dynamism effect from Under Jolly Roger, and it now works better with strategic-scale actions involving your Armada. Thieves or others affected by your Irresistible Booty will gradually be corrupted into degeneracy and piracy, as if living in Tortuga.</p>
  <p>Mutiny buildup from overcapping on Bling, Booty, and Chests is three times more efficient, allowing your crew to remain content for longer. If or when that fails, corrected crew members will retain that status for three times longer.</p>
  <p>Your integrated monster from Release the Kraken gains a second, much smaller, body that can act as a shoulder mascot for the ship’s captain. The integrated monster now benefits from Bifurcation, allowing the crew and ship to retain the monster’s traits even while the monster is actively summoned. If slain, integrated monsters will respawn during the next full moon, even without Warranty Plan.</p>
  <p>Your pirate reputation will have a greater effect on your interactions with the locals. Similar to Dragon Aura and Zenryoku Zenkai, outlaws of lesser reputation will flock to your crews and seek to join, those of equal reputation will see you as a rival to defeat, and the law - at least, those organizations that active Letters of Marque don’t protect you from - will work ever-harder to crush you under its boot.</p>
  <p>All of your subordinate Cap’ns are now always considered viable transfer targets for The Dread Pirate Roberts. When slain, you may choose which one to incarnate into, or just leave it to chance. Captives under the influence of Part of the Ship, Part of the Crew will reach the cap on the perk’s effect more quickly when they hear and participate in sea shanties.</p>
  <p>Finally, the act of raising your black flag itself can turn the tide in your favor. When hoisted above a population center, the populace will descend into chaos and debauchery, free from all laws - whether natural, mortal, or divine. In battle, hostile forces who witness the raised flag will instead find their effective tiers reduced by 2 for the next hour, to a minimum of 1. This applies at step 5 and will only work once on each individual hostile per encounter. Those of strong will can resist this effect, lowering the debuff to -1.</p>
  `,
})

// Transhuman
heritages.push({
  uid: 'twP3B',
  title: 'First Augmentation',
  category: 'Heritage',
  tree: 'Transhuman',
  image: 'https://images2.imgbox.com/ec/58/yOAMGWHU_o.png',
  type: 'Root',
  cost: 80,
  freebies: {
    talentPerks: [{ title: 'Body Tune-Up', cost: 0, count: 1 }, { title: 'Athletic Talent', cost: 0, count: 1 }],
    defensePerks: [{ title: 'Stress Defense', cost: 0, count: 1 }],
  },
  typeFreebies: {
    Biomorph: {
      talentPerks: [{ title: 'Wild Talent', cost: 0, count: 1 }, { title: 'Psychic Talent', cost: 0, count: 1 }],
      miscPerks: [{ title: 'Sexual Calibration', cost: 0, count: 1 }, { title: 'Fertility Calibration I', cost: 0, count: 1 }],
      defensePerks: [{ title: 'Body Defense', cost: 0, count: 1 }],
    },
    Cybermorph: {
      talentPerks: [{ title: 'Science Talent', cost: 0, count: 1 }, { title: 'Martial Talent', cost: 0, count: 1 }],
    },
    Aethermorph: {
      talentPerks: [{ title: 'Soul Talent', cost: 0, count: 1 }, { title: 'Aesthetic Talent', cost: 0, count: 1 }],
    },
  },
  types: {
    Biomorph: '<p><b>Biomorph</b>: You seek perfection via biological and genetic means. You gain additional organs and cell types, which give you a magnetic sense, expanded visual range, the ability to regrow lost limbs, and  you may reduce the time of pregnancies to one third their normal time. Common forms of integrated weaponry include retractable claws, toxins, and stingers. Your base genetics and body are capable of having any biological system safely integrated into it via surgery or injection. Take Wild Talent, Psychic Talent, Sexual Calibration, Fertility Calibration I, and one copy of Body Defense for free.</p>',
    Cybermorph: '<p><b>Cybermorph</b>: You seek perfection via technological means. Portions of your body have been enhanced by and replaced with cybernetics. You have an integrated GPS, compass, headphones/speakers, an advanced calculator, the ability to access computer systems directly, and are able to repair yourself or create spare parts. Common forms of integrated weaponry include lasers, ballistic guns, monowire blades, deployable missiles, or omnitool attachments. Due to the strong modular framework, you are able to integrate and store technology in your body via surgery or mechanical modifications. Take Science Talent and Martial Talent for free.</p>',
    Aethermorph: '<p><b>Aethermorph</b>: You seek perfection via magical means. Your body has been permanently alchemically and magically enhanced, which grants you a metaphysical Element. You have an intuitive sense for your Element as well as a measure of Authority over it. This could be sensing ambient heat and generating flames for Fire, understanding the quality of the edge and how to sharpen a knife as well as creating supernaturally good swords from pure will for a Sword Element, or knowing whenever people are in love or when things are forbidden, or inspire a measure of shame or affection in people for an Element of Forbidden Love. This may be as specific or broad as desired, though the more specific an Element is, the more focused your Authority. Your soul, qi, and life force are adaptable, acting as a strong foundation to have additional mystical powers, artifacts, modifications, or techniques cultivated from and integrated into them via training, special consumables, or ritual casting. Take Soul Talent and Aesthetic Talent for free.</p>',
  },
  desc: `
<p>You have begun to exceed the limitations of the human form. Select one Transhuman type. For all types, your Smart Device is now part of you and accessible with a thought via a customizable HUD. You are still able to summon a device for waifus to interact with should you wish. Your strength, speed, durability, reaction times and senses have all been improved just beyond human limits, and weaponry based on your Transhuman Type has been integrated into your body. This weaponry has a similar energy content to a ballistic rifle. Additionally, your body is able to store energy beyond its normal limits, as well as discharge it as electricity if you could not already do so. Your body is modified to handle a wide range of further modifications of a type based on the specific form of Transhumanism you select. If you were not already, you are now Tier 5. Take Body Tune-Up, Athletic Talent, and one copy of Stress Defense for free, as well as other perks based on your Transhuman type. Choose your method of escaping human limitations:</p>
`,
})

heritages.push({
  uid: 'u7aSv',
  title: 'Networked Glamour Manipulation',
  category: 'Heritage',
  tree: 'Transhuman',
  image: 'https://images2.imgbox.com/21/39/GKuGC6Tk_o.png',
  type: 'Lure, Other Control',
  cost: 30,
  freebies: {
    talentPerks: [{ title: 'Communication Talent', cost: 0, count: 1 }],
  },
  whitelist: ['First Augmentation'],
  types: {
    Biomorph: '<p><b>Biomorph</b>: Telepathic Network - You can hear surface thoughts of anyone nearby and psionically ‘smell’ their emotional states, and have superhuman empathic and instinctual senses. After you’ve made initial contact with someone’s thoughts, you are able to reach back out to them across any distance. If you possess Potpourri, you are now able to ambiently affect the emotions of anything with a mind nearby. If you possess Love Spot, you are able to manipulate and shift the spot around, and are able to turn it off or use its power to fascinate instead of infatuate. If you possess Zenryoku Zenkai, the effect propagates throughout the entirety of an opposed group, organizations or nations ‘fairly’ conquered fall in love with their conquerors.</p>',
    Cybermorph: '<p><b>Cybermorph</b>: Big Data Prediction - Utilizing powerful machine learning and socially predictive Big Data, you are able to predict the responses of others. The accuracy of these predictions directly correlates to the amount of data you have available about the target individual, group, nation, or demographic. As an active program, you may turn this off as desired. If you possess Alluring Whisper, you may now use it at a normal speaking volume, including subharmonic frequencies that influence the emotional state of those that hear them. Any direct communication from you is capable of carrying the effects of the Lure and any of its upgrades. If you possess Potpourri, you are now able to generate scents that have direct physiological effects such as aerosolized knockout gas or aphrodisiacs. If you possess Space Truckin’, you are able to act as the vehicle for the purposes of sending targets to other worlds.</p>',
    Aethermorph: '<p><b>Aethermorph</b>: Goetic Negotiation - You may now use your Element upon and apply it to the goetia of individuals or organizations they’re connected to. Goetia being a general term for the representations of aspects of the minds of individuals or in the general zeitgeist, encountered most commonly through semi-hallucinatory visions, however different world metaphysics can enable different methods of interaction. Restraining someone’s Goetia of Shame would greatly reduce their inhibitions, stabbing the Goetia of Democracy could influence people of the world to consider Democracy a wounded, failed system, or empower the flames of desire of someone’s Goetia of Passion could inspire lust in them. Killing or otherwise significant effects upon Goetia are rarely permanent, though outright killing a Goetia may mean that its next reincarnation may take a significant amount of time to reform and will likely do so meaningfully changed from its prior incarnation. Goetia are connected via concepts and relationships individuals could have with them, the closer or more important the connection between the person and the concept, the easier it is to find and interact with the associated Goetia. The greater the importance placed upon an aspect and the more will behind it (individual or collective), the more powerful the goetia is and the harder it is to affect. You are able to meditate to commune with your own Goetia, and follow their connections to others. If you possess Love Spot, you are able to make it a radiant effect and choose the emotion or impulse evoked at the time, which can be as complex as a few sentences. Its effect no longer requires vision to affect someone, merely line of sight. Finally, you may also adjust the intensity of your Love Spot effect without covering it, though you may only dial it down significantly, not turn it off entirely. Additionally, you may apply any Lures you possess to any Goetia you interact with.</p>',
  },
  desc: `
  <p>There’s more to exceeding humanity than combat on the battlefield. You have also begun to exceed them in other ways. Take Communication Talent for free.</p>`,
})

heritages.push({
  uid: '83GXs',
  title: 'Philosopher’s Transmortality Engine',
  tree: 'Transhuman',
  category: 'Heritage',
  image: 'https://images2.imgbox.com/cd/be/EZWC9t2T_o.png',
  type: 'Party, Other Control',
  cost: 150,
  whitelist: ['Networked Glamour Manipulation'],
  freebies: {
    defensePerks: [{ title: 'Wyldscape Defense', cost: 0, count: 1 }],
  },
  typeFreebies: {
    Biomorph: {
      talentPerks: [{ title: 'Martial Talent', cost: 0, count: 1 }, { title: 'Talent Sharing', cost: 0, complex: [{ flavor: 'Martial Talent', cost: 0 }], count: 1 }],
    },
    Cybermorph: {
      talentPerks: [{ title: 'Engineering Talent', cost: 0, count: 1 }, { title: 'Talent Sharing', cost: 0, complex: [{ flavor: 'Engineering Talent', cost: 0 }], count: 1 }],
    },
    Aethermorph: {
      talentPerks: [{ title: 'Blessed Talent', cost: 0, count: 1 }, { title: 'Talent Sharing', cost: 0, complex: [{ flavor: 'Blessed Talent', cost: 0 }], count: 1 }],
    },
  },
  types: {
    Biomorph: `<p><b>Biomorph</b>: Psionic Beacon - You are able to act as a beacon of thought and intent, a lighthouse to guide others to a desired state. This radiant power causes the spontaneous generation, development, and growth of psionic abilities in biological or psionic existences exposed to it, and with sufficient time, even genetic based abilities.
    <p>This psionic pressure gives you a general awareness of all surface thoughts within its range, and may be actively expanded, intensified, or deliberately focused via concentration and training. This passive awareness will generally start at your Tier^3 kilometers, and can be used to gauge the feelings of cities or nations, or be more focused to understand individuals in extreme depth, but the passive expansion is easy to notice for psionic entities.</p>
    <p>The more of an emotional connection a target has to you, the faster these abilities are gained, and the higher the maximum Tier of the powers. Additionally, this psionic power may be focused on as desired within your range, increasing the speed and power. Affecting an entire planet will cause psychics to begin to spontaneously appear in populations over the course of years, while focusing your attentions on a single companion will quickly cause her to develop psionic powers.</p> 
    <p>Characters sufficiently devoted to or emotionally attached to you with their own psionic abilities may act as relays for this power.</p> 
    <p>Take Martial Talent for free.</p></p>`,
    Cybermorph: `<p><b>Cybermorph</b>: Memetic Compression - You are able to create compressed memetic thoughtforms, which can convey enormous amounts of information as well as provide extreme inspiration. This can enable individuals to nigh-instantly master scientific forms of magic, new skills, or even develop their own extra-normal paraphysics equipment and systems, colloquially called ‘mad science’.
    <p>A single long word conveying the entire contents of a book, or a single still picture conveying the entire contents, emotional and otherwise, of a movie are common instances. This information is conveyed instantly and is easily remembered by those that it’s intended for.</p>
    <p>The more of these memetic thoughtforms an individual is exposed to, and the longer they ponder them and utilize the information or skills provided by them, the faster their capabilities grow. All of your communications may carry these targeted inspirational memetics at no difficulty.</p>
    <p>These memetic thoughtforms may be replicated by others, but incautious or imprecise replications will corrupt the underlying information.</p> 
    <p>Take Engineering Talent for free.</p></p>`,
    Aethermorph: `<p><b>Aethermorph</b>: Conceptual Infection - You are now able to radiate your power through your Element to empower those that interact with it, ‘causing the generation and development of mystic abilities, alterations, and eventually mutations within those instances and those that interact with them.
    <p>This allows you to exert influence over all instances of your Element in the world(s) you are currently in. This influence may be focused by applying it through a goetic representative of a location, culture, ethnicity, species, or similar. The stronger the conceptual link between the targeted goetia and an individual, the stronger the effect, and vice versa.</p>
    <p>The more an individual interacts with, experiences, contemplates, or is otherwise subjected to your Element, the faster the process, and vice versa.</p>
    <p>You can apply this effect through any goetia under your influence, either via convincing the Goetia to work with you or via applications of your Element. This only applies while you are in the local world. Overlapping goetic authorities of goetia that are under your influence that apply to a single individual stack.</p>
    <p>Take Blessed Talent for free.</p></p>`,
  },
  desc: `
<p>It’s not simply about upgrading your own capacities, it’s also about upgrading the support structures you interact with and rely on.</p>
<p>You are now able to empower individuals with the power of your Heritage, utilizing the power of your knowledge and infrastructure. Though the specific method varies by Transhuman Type, you are now able to increase the power of your companions and slowly raise their effective tier. In all cases, your own personal tier increases the speed at which this strength is gained, and you may set filters to decide which of the applicable targets are affected. While resisting the effects can slow or even halt its progression, an individual that has gained an effective Tier from this perk will have the core of the Stamp appear somewhere upon their body, but the Capture will only be finalized if they actively embrace the source of power.</p>
<p>Abilities and strengths granted by this perk will always follow the general thematics, stylings, and rough trend of the Contractors. In all cases, you may set the broad strokes of and proportions of abilities, alterations, and mutations caused by your conceptual infection.</p>
<p>In addition to the methods unique to each Transhuman Type to enhance the masses, included is an ability to develop a process that applies your own First Augmentation type to others, and even provide modifications that are compatible with the individuals. The difficulty and time required varies based on the resources, technician skill, and related infrastructure available for the Transhuman Type. Most Company provided facilities allow the process to be completed within an hour, but more common times in-situ are over the course of several days. The further removed the process gets from you, the more likely deviations and errors are to occur. Contractors who lack the Ancestral Diversity intensity modifier are not valid targets of this feature.</p>
<p>Take a refund for any Talent Sharing for Talents provided by the appropriate Transhuman Type. Take one copy of Wyldscape Defense for free.</p>
`,
})

heritages.push({
  uid: 'lyv42',
  title: 'Corporeal Transcendence Engineering',
  category: 'Heritage',
  tree: 'Transhuman',
  image: 'https://images2.imgbox.com/db/cf/qIEdjHUk_o.png',
  type: 'Self',
  cost: 100,
  freebies: {
    talentPerks: [{ title: 'Everlasting Talent', cost: 0, count: 1 }],
    defensePerks: [{ title: 'Wild Defense', cost: 0, count: 2 }, { title: 'Environmental Defense', cost: 0, count: 2 }, { title: 'Body Defense', cost: 0, count: 1 }],
  },
  whitelist: ['First Augmentation', 'Pocket Space'],
  types: {
    Biomorph: '<p><b>Biomorph</b>: Guy-what? Your material is psionically fueled adaptive biomass, able to take on any living form such as bone, bark, chitin, cellulose, muscle, neural tissue, mycelium, or organs freely. This material may become psionic or biological structures, and more may be grown given sufficient nutrients, material, and energy. Additional traits may now be gained via consumption of a living thing with the desired traits or via sexual contact. Biomorphs are aligned with both Primal and Jungle Shrouds.</p>',
    Cybermorph: '<p><b>Cybermorph</b>: Transformers in disguise! Your material is hyper adaptive Smart Matter, which is able to become any inorganic material given appropriate blueprints and scans. Any matter may be converted into this smart matter given sufficient time and energy, but this process is very energy and mass intensive. Additional traits may now be acquired via contact and a several second process to reconfigure the body part to integrate the desired technology. Cybermorphs are aligned with Cyber Shrouds.</p>',
    Aethermorph: '<p><b>Aethermorph</b>: Shaza-who? Your material is Patterned Elemental Weave, essentially concentrated and manifested amounts of your Element. You will slowly generate more material over time, but may absorb existing instances of your Element in order to accelerate the process. Your body is capable of becoming entirely your Element, which may mean increased durability, intangibility, or other varying effects depending on your Element, such as making an opponent Love you upon being struck with an Element of Forbidden Love. Mystical artifacts and similar may be integrated into your metaphysical form via training or surgery in order to grant you their powers and capabilities. If you possess Tantric Arts: Arts of Sympathy, you are able to use these to permanently copy a trait from a target, this requires (Effective Tier of the desired trait, 1 by default) Resonance. By default, Aethermorphs are aligned with Burial Shrouds, but other Shrouds may align with specific Elements and also generate material.</p>',
  },
  desc: `
<p>Based on our continued studies of inventory hotswapping, shoggoths, and other amorphous entities we bring you a new breakthrough! Your form is no longer constrained entirely by such petty things as shape, volume, or being contiguous. Your Pocket Space is now functionally infinite, and may store material, modifications, and alternate forms appropriate to your Transhuman type within and via our Company trademarked Transhuman Materials (TMTM) able to ensure compatibility between modifications and swaps.</p>
<p>What this material is and what it can become or be made from depends on your Transhuman Type, and may be used to rapidly swap out modifications, heal, or otherwise switch between saved template forms. Upon initial purchase, a significant amount of material will be deposited in your Pocket Space, as well as a template for a larger combat form to utilize this mass. Any traits removed and not replaced or swapped out with a corresponding one from your pocket space are automatically filled in via your pocket space material unless you designate otherwise. You may also create alternate forms out of the material in your pocket space and swap between them at will.</p>
<p>If you were not already, you are now Tier 6.</p>
<p>Additionally if you possess Alterzelu Symbiote, you are able to act as the “Queen” for purposes of the theming of your Symbiotes, overriding your existing Queen’s themes if desired and able to consume Symbiote biomass to add to your material stores. If you possess an Elemental Shroud and Elemental Loom of the appropriate Element you are able to generate a functionally infinite amount of material. Regardless of your Transhuman Type, take two copies each of Wild Defense and Environmental Defense, and one copy of Body Defense and Everlasting Talent for free.</p>
`,
})

heritages.push({
  uid: 'R6TQB',
  title: 'Evolutionary Engine Array',
  tree: 'Transhuman',
  category: 'Heritage',
  image: 'https://images2.imgbox.com/48/58/SGCTIIh7_o.png',
  type: 'Self',
  cost: 150,
  whitelist: ['Corporeal Transcendence Engineering'],
  freebies: {
    defensePerks: [{ title: 'Wyldscape Defense', cost: 0, count: 1 }],
  },
  typeFreebies: {
    Biomorph: {
      defensePerks: [{ title: 'Trace Defense', cost: 0, count: 1 }],
    },
    Cybermorph: {
      defensePerks: [{ title: 'Corruption Defense', cost: 0, count: 1 }],
    },
    Aethermorph: {
      defensePerks: [{ title: 'Destiny Defense', cost: 0, count: 1 }],
    },
  },
  types: {
    Biomorph: '<p><b>Biomorph</b>: You may create neural clusters that generate enormous amounts of biological and psionic energies. Their output may be increased via metabolizing external energy sources such as sunlight, radiation, or rare materials. These neural clusters may grow on their own provided appropriate hosting and nutrients, and their creation and growth may be accelerated with external input of energy and nutrients. Take Trace Defense for free.</p>',
    Cybermorph: '<p><b>Cybermorph</b>: You may create Fractal Calculation Engines that generate enormous amounts of energies from the very act of calculating, and this energy may be output in any form which the contractor understands well enough to model in significant detail. These metaphorical black boxes may increase their overall energy output based on the amount of distinct data stored within them and additional calculative systems which they are networked with. These engines may be fabricated by sufficiently advanced systems and may act as powerful computational systems. Take Corruption Defense for free.</p>',
    Aethermorph: '<p><b>Aethermorph</b>: You may generate cores, though the specific form of golden, demonic, or elemental cores varies based on the specific internal energies and efforts of the creator, generating enormous amounts of appropriate type of mystical energies. Their growth and refinement may be accelerated via a number of mystical methods, including but not limited to soul consumption, mystically resonant ingredients or processings, sexual congress with powerful beings, and overcoming trials mystically resonant to your Element. They may, instead of increasing in volume, may instead increase their output and storage via refinement. Take Destiny Defense for free.</p>',
  },
  desc: `
<p>Evolution is a power all its own. You may now replicate any gifts, talents, or innate abilities that fall within the purview of your Transhuman type that your waifus - or anyone outside your retinue that you defeat in a confrontation - possess. That does not include talents, perks, or similar available for purchase in this catalog. The expression of these gifts is not necessarily consistent or exact. Abilities associated with each Transhuman type are indicated via the free Talents granted in First Augmentation: Biomorph, genetic and psychic; Cybermorph, technological; Aethermorph, mystical. Additionally, you may convert your transmaterial into any trait or modification you have previously possessed.</p>
<p>If you were not already, you are now Tier 7.</p>
<p>Abilities that are generic in their source but are expressed uniquely, such as Sacred Gears, Noble Phantasms, Quirks, or the results of the X-gene, will be unique to you as well and comparable in power or utility to the strongest version that your waifus (or anyone outside your retinue that you defeated) possess. If that changes, your version will grow to match the new strongest version. This perk may generate no more than one Sacred Gear, Semblance, Quirk, X-mutation, or other such power each, and no more than three Noble Phantasms. This perk may only generate or upgrade one Noble Phantasm at a time.</p>
<p>Additionally, you may now create specialized engines within and from your body, concentrated systems which draw power from interdimensional space, allowing for infinite energy production, though not infinite output or storage. Its shape generally corresponds with the mark that forms the center of your stamp, though the material of its construction depends on your transhuman type. </p>
<p>The smallest form of the engine is the rough volume of a sphere with a radius of 3 cm, their creation being a delicate and time consuming process that  takes a month’s worth of dedicated focus, though this time need not be contiguous. You may create engines unattached to your consciousness, but they take six times as long to create. An appropriate Shroud cuts the time to make an engine in half. Such an engine is capable of generating energy at a level comparable to a nuclear reactor, but its maximum output and storage scales upwards exponentially as its volume increases.</p>
<p>You may detonate the engine, and even the smallest one has the force of a nuclear bomb. (Not recommended for customers that don’t have a way of coming back from the dead!)</p>
<p>Finally, take one copy of Wyldscape Defense for free.</p>
 `,
})

heritages.push({
  uid: 'sGuOe',
  title: 'Essence Upload',
  category: 'Heritage',
  tree: 'Transhuman',
  image: 'https://images2.imgbox.com/aa/07/3K0hyhoZ_o.png',
  type: 'Self',
  cost: 80,
  freebies: {
    defensePerks: [{ title: 'Possession Defense', cost: 0, count: 1 }, { title: 'Polymorph Defense', cost: 0, count: 1 }],
  },
  whitelist: ['First Augmentation'],
  types: {
    Biomorph: `<p><b>Biomorph</b>: You have become a psionic existence capable of transferring to any biological or purely psionic entity whom you are able to make a psionic, telepathic, or direct neural connection to. You are able to project your mind and the origin point of your senses to anywhere within the range of your last body, or within range of a psionic network. 
    <p>If you possess Alterzelu Symbiote, you are explicitly able to jump to any individual in the hive(s) as desired and use the form of a larva to Possess a target.</p></p>`,
    Cybermorph: `<p><b>Cybermorph</b>: You have become a digital existence capable of transferring to any entity or object capable of running DOOM or a human-scale consciousness, provided you are able to make a wireless, hardline, or direct neural connection to them. You are able to move through digital networks. 
    <p>If you possess Hypnosis App you are able to transfer your consciousness to any individual you are able to get to Hypnotic Depth 40+, and may use the cables from Assuming Direct Control to Possess a target. If you possess Tempest Jewelry, you may transfer your mind into individual pieces via contact, and from there into their wearer.</p></p>`,
    Aethermorph: `<p><b>Aethermorph</b>: You have become a mystical existence capable of transferring to any singular object or entity, moving intangibly through conceptual space and links. This is accomplished either via direct proximity, or via connections between people and goetia, or goetia and other conceptually linked goetia, the closer or more significant this connection the easier and faster it is to find and follow. There is no limit on how far you are able to move from your last body, but similar forms of projection may allow others to perceive or interact with your form as if it was physical. In addition to individuals, these minds may be anchored to any distinct object or related collection of objects you own, and you may exert a pseudo-telekinetic control over it regardless of your Element. Objects you possess are capable of movement when they otherwise wouldn’t be, such as a statue moving like a person. Finally, this disembodied form may interact directly with goetia as if you were both physical, your projected form having the strength and ability most closely associated in your mind with ‘yourself’.
    <p>If you possess Tantric Arts: Arts of Sympathy, you are able to use it to transfer your mind to a target upon completion of the ritual. By using an additional 2 Resonance in the Art of Binding over what would be required for a target to Possess them entirely.</p></p>`,
  },
  desc: `
<p>Being constrained to one body is inefficient and limited. Your form is no longer purely physical, though the specifics of your partial transcendence is based on your Transhuman type. If your current body becomes damaged, obsolete, or inconvenient, just switch to a new one. Members of high-risk professions, such as criminals or firewall sentinels, can be killed multiple times on a mission only to be brought back and sent into the field again and again. Take one copy each of Polymorph Defense and Possession Defense for free.</p>
<p>Barriers of the appropriate type may impede your movement and actions in a discorporated state, such as psionic barriers for Biomorph, firewalls for Cybermorph, or mystical wards for Aethermorph. Transferring to a new body leaves your prior form empty. Traits and powers not linked to your body come with you and such powers may be manifested from your consciousness.</p>
<p>Given the combination of certain Bindings and Transhuman types, you may take over new bodies of local Waifu/Husbando candidates. Without synergistic Bindings, attempting to usurp a target with a Will involves a mental battle which can be lost, refusing you entry. Shrouds of the appropriate Element may be used to subsume or ‘infect’ people in a method similar to Capture.</p>
<p>Target’s minds may be destructively subsumed into your own, or you may ‘ride’ along with a willing target, and may trade off control of the form in such a willing partnership. The subsuming process is based on the Possess Origins, and the target is considered captured, though doing so neither grants or costs credits. You also gain the target’s episodic memory, as if you had Substituted into them.</p>
<p>Purchase of this perk provides knowledge as to how to rebuild your “true” body, either via cloning, 5D molecular printing, or leyline restructuring. What the app considers your true body may be updated from your existing body or reverted at any time. Body dysphoria in these new bodies is limited.</p>
`,
})

heritages.push({
  uid: 'RabV5',
  title: 'Multicore Neural Leyline',
  category: 'Heritage',
  tree: 'Transhuman',
  image: 'https://images2.imgbox.com/ee/57/J9kIfirF_o.png',
  type: 'Party',
  cost: 100,
  typeFreebies: {
    Biomorph: {
      defensePerks: [{ title: 'Corruption Defense', cost: 0, count: 1 }],
    },
    Cybermorph: {
      defensePerks: [{ title: 'Information Defense', cost: 0, count: 1 }, { title: 'Possession Defense', cost: 0, count: 1 }, { title: 'Stress Defense', cost: 0, count: 1 }],
    },
    Aethermorph: {
      defensePerks: [{ title: 'Information Defense', cost: 0, count: 1 }, { title: 'Drain Defense', cost: 0, count: 1 }],
    },
  },
  whitelist: ['Essence Upload', 'Pocket Apartment'],
  types: {
    Biomorph: `<p><b>Biomorph</b>: Your soul can now be easily spread out throughout an entire population of a single species, or a single local collection of species within the same Kingdom such as every plant in a forest. Groups of individuals who consider themselves part of a shared culture or organization may count as a single species for the purposes of spreading out your consciousness. Additionally, for these purposes, your entire Alterzelu Symbiote ecosystem counts as a single species.
    <p>Expanding out heavily, you could direct the migration of a species, the rate of growth or distribution of a forest, or determine who the animals of a region allow or attack, but miss a single bird under your control being killed the same way you could miss losing some skin cells.</p>
    <p>Any physical deaths of your retinue or individuals non-destructively hosting your consciousness may instead send their minds and souls to your Pocket Apartment as a mental projection. They may not leave your Pocket Apartment until a new body is provided for them, such as via Corporeal Transcendence Engineering, Dungeon: Spawning Room, or an appropriate Symbiote Structure.</p>
    <p>Finally, take one copy of Corruption Defense for free.</p>
    </p>
    `,
    Cybermorph: `<p><b>Cybermorph</b>: Your soul’s code has become an ever evolving infinite fractal that can infest an entire network and anything connected to that network. Any data  you get access to is permanently included in your code and not just on hardware, unless you specifically delete it.
    <p>Expanding out heavily, you could set the firewalls, censorship methodologies, or interaction protocols for an entire internet, but miss the keystrokes of an individual terminal the same way you don’t notice individual grains of sand beneath your feet.</p>
    <p>Your Pocket Apartment becomes a digital world. If you have Megapixel, individuals you transport are moved to your Pocket Apartment, and all benefits of Megapixel apply to your Pocket Apartment. Additionally, if you possess Dungeons, you may devote retinue members to this digital space in order to expand it, and treat any Dungeons as a transition area between completely corporeal and digital existence.</p>
    <p>If you possess a Cyber Shroud, you may digitize anything that your Shroud envelops, though digitizing targets with a will requires cooperation, unconsciousness, or suffusing them with your own will. Anyone within your digital world is functionally cocooned by your Shroud.</p>
    <p>Take one copy of Information Defense, Possession Defense, and Stress Defense for free.</p>
    </p>
    `,
    Aethermorph: `<p><b>Aethermorph</b>: Your soul’s mystical compatibility and morphology has adapted to allow you to possess even fundamental concepts related to your Element, or a conceptually linked place or group.
    <p>Expanding out heavily, you can apply your Element through anything you’ve possessed and sense any nearby or particularly strong instances of your Element, but miss specific frequent or common instances the same way a single star doesn’t stand out for its particular twinkle in the night sky.</p>
    <p>Any physical deaths of your retinue or individuals non-destructively hosting your consciousness may instead send their minds and souls to your Pocket Apartment as a spiritual projection. They may not leave your Pocket Apartment until a new body is provided for them, such as via Dungeon: Spawning Room or Tantric Arts: Arts of Summoning.</p>
    <p>Finally, take one copy of Drain Defense and Information Defense for free.</p>
    </p> `,
  },
  desc: `
<p>No longer limited to a single item or object, you are now able to possess and infest far more, becoming landscapes themselves and the networks between them.</p>
<p>You are now able to transfer your consciousness to any collection of valid targets for your Transhuman Type, and your singular consciousness will be spread amongst them as a genus loci or hive mind equivalent. The amount of fine control you have over individual bodies that may make up you depends on your calculative power and the amount of focus given to a single form, as well as how many individual instances you are spread out across. Even in unwilling situations, you may non-destructively ride along provided you win the conflict of wills, and non-destructively assume direct control or access their memories in those situations.</p>
<p>Your consciousness may propagate in the same method it could be previously transferred, though you may remove your consciousness from an individual body without any direct connections provided your consciousness is also anchored somewhere else. No matter your Transhuman Type, you may possess or entirely transfer your consciousness into your Demiplane or Dungeon, and your consciousness is spread across all Dungeon instances.</p>
<p>Additionally, your Pocket Plane is now a Jouten, a world-body which is an extension of yourself and has the rest of your Pocket Plane and its structures either within it in a manner similar to Dragon Cabin, on top of it, outside it, or otherwise incorporated into it. The design and aesthetics of this form are up to you, though you will always be able to transfer your consciousness to this body, Favorites include a ‘world turtles’, a flying city, flying islands, miniature planetary constellations. or an elementally representative and mobile terrain feature as an Aethermorph.</p>
<p>Similar to Dragon Cabin, you are able to manifest an avatar within your Jouten while your consciousness resides in your Jouten,  and are able to manifest a smaller version of your ‘true’ body within or on it as per Dragon Cabin. This projection is able to leave your Jouten, but only one instance of this projection may exist at a time. If you have Apportation, you and your retinue no longer need to open a portal to enter or exit your Demiplane. You may freely teleport yourself to and from any point in your Jouten.</p>
<p>Your Jouten is able to enter realities directly, provided you have sufficient space to create an appropriately sized portal. If you were not already, your Jouten may be considered Tier 7.</p>
`,
})

heritages.push({
  uid: 'sj75G',
  title: 'Distributed Intellectual Devotions',
  category: 'Heritage',
  tree: 'Transhuman',
  image: 'https://images2.imgbox.com/33/93/47xrCs1Y_o.png',
  type: 'Self',
  cost: 60,
  freebies: {
    defensePerks: [{ title: 'Mind Defense', cost: 0, count: 1 }],
  },
  typeFreebies: {
    Biomorph: {
      talentPerks: [{ title: 'Science Talent', cost: 0, count: 1 }],
    },
    Cybermorph: {
      talentPerks: [{ title: 'Psychic Talent', cost: 0, count: 1 }],
    },
    Aethermorph: {
      talentPerks: [{ title: 'Psychic Talent', cost: 0, count: 1 }],
    },
  },
  whitelist: ['First Augmentation'],
  types: {
    Biomorph: `<p><b>Biomorph</b>: You are capable of creating small psionic patterns of thought. While monotask, instinct driven minds may be ‘born’ en masse and with little effort, it takes time for them to develop additional skills. A more powerful and developed mind may speed up this process, or minds may be allowed to develop on their own, going from a monotask mind to a human scale consciousness takes about a year. Minds will not grow past their intended purpose. 
    <p>These minds can be anchored into any neural tissue you are connected to, or exist in ambient space near an anchored mind. More complex minds can only be anchored in denser or more complex neural systems, stuffing the entirety of a human-scale consciousness into the brain of a fly generally isn’t feasible at this stage. Alterzelu Symbiote larvae and creatures are always capable of hosting these minds. Things created via Primal or Jungle Shroud are capable of hosting them as well.</p>
    <p>You are more like a corporation or nation unto yourself, while individual minds may act foolishly or against the goals of the whole without oversight, the whole moves in a singular direction. As the overmind of this intelligence, only extreme circumstances would cause significant personality shifts.</p>
    <p>Additionally, you may freely modify your instincts and those of your component minds.</p>
    <p>Finally, take Science Talent for free.</p>
    </p>
    `,
    Cybermorph: `<p><b>Cybermorph</b>: You are capable of creating sapient subroutines. These smaller, specialized copies of your consciousness take very little time to compile. These minds may be specialized and optimized for specific tasks, skills, analysis, or similar. These minds are more capable in their specialty than the original, general mind, but are less capable outside of it. A mind dedicated to optimizing trade routes could rival the best machine learning of logistics companies but barely be able to hold a conversation.</p>
    <p>These minds require hardware or wetware to run on and you must acquire a direct connection to the target to transfer the mind. Complex minds may run on less capable systems, but at a significantly reduced capacity, and vice versa. Tempest Jewelry, VR Helmets, and Cyber Shroud fragments are capable of running these minds. If you possess Hypnosis App, you are able to implant these minds into entranced individuals. The amount of control over these minds increases with their Hypnotic Depth.</p>
    <p>You are more like an entire website, network, or factory unto yourself, unified in purpose with various parts specializing in specific tasks or applications. Something that may be changed piecemeal or entirely rebuilt as necessary.</p>
    <p>Additionally, you are freely and safely able to modify the subroutines, optimizations, and logic of yourself and your component minds.</p>
    <p>Finally, take Psychic Talent for free.</p>
    `,
    Aethermorph: `<p><b>Aethermorph</b>: You are capable of creating two types of minds, daimons and goetic subsets of your Element and mind. In both cases, you may set the level of independence, connection, and shared power and personality between yourself and the mind, from functionally the same mind with a different focus to a functionally independent but subservient spirit. These goetic minds feed back their skills, specializations, and power to the mind that spawned them.</p>
    <p>These minds may be anchored to any entity or object conceptually linked to your Element, and when not anchored are capable of moving through and existing within conceptual space, and perceiving the world around any instance of your Element. Tantric Arts: Summoning used by a physical being is able to create temporary bodies for these minds by ‘summoning’ them. A Burial Shroud or other form of Shroud linked to your Element may also act as hosts for the minds to be anchored in.</p>
    <p>Daimons are static consciousnesses that do not learn or develop their skillsets after creation, and while arbitrarily complex, they cannot deviate or change without intervention from the rest of your mind. Daimons do not take long to create, a daimon whose own effective tier would be 4 or more lower than your own can be created casually, 5 or more can be created en-masse, but a daimon that more closely approaches your own tier in personal power takes longer to create, one nearly equivalent in power would take months of effort. Daimons are comparable to externalized habits or rules, difficult to change, but still a part of you, and share information with the rest of your consciousness as per normal. A Daimon may create other Daimons, but only ones equal or lesser in capability than themselves.</p>
    <p>Goetia operate similarly, but are distinguished by having a subset of your Element and are capable of growth and development. Because of this, they take significantly longer and more effort to create than a Daimon of equivalent power. A Goetia that develops its personal power in excess of its progenitor may actually change your overall Element, and Goetia are capable of creating their own Goetia and Daimons. Goetia can only access their individual elements unless the consciousness that spawned them channels through them, but their progenitor gains the benefits of all its Goetia’s Elements. For example, if your Element is Fire, an immediate Goetia might have an Element of Embers, and one of its Goetia may have an Element of Ashes. In this scenario, you would have an intrinsic Authority and sense for Fire, Embers, and Ashes. Goetia’s elemental affinities stack with those of their progenitors, much like a Dragon’s element will with a Shroud.</p>
    <p>Additional examples include an Element of Fire could create a Goetia of Ash, Cinders, Magma, or Passion, an Element of Sword could create a Goetia of Katanas, Cutting, Smithing, or Knives, an Element of Forbidden Love could create a Goetia of Forbiddance, Taboo, Infatuation, or Deviance.</p>
    <p>While in both cases, creating these minds takes effort and time, Daimons may be created via a wide range of mystically resonant methods, Goetia are usually created via intense meditation on, training with, or otherwise immersing oneself in the Element of the prospective Goetia.</p>
    <p>Finally, take Psychic Talent for free.</p>
 `,
  },
  desc: `
<p>Your mind has begun to expand far beyond what a single consciousness can perform. You may create little ‘spin-off’ minds, additional lines of consciousness that are part of and underneath your primary consciousness. Ideal for Contractors that have a large number of things that need their simultaneous attention.</p>
<p>Different types of Transhumans develop these minds in different ways and have different advantages and predilections. At all times every mind is connected and aware of everything the others are as well as what their thought line or focus is. This is similar to being aware of the color of an object even if you are not consciously thinking about it. This awareness extends across any distance, as these minds are still you no matter how far apart they may seem.</p>
<p>These minds are created on a sliding scale based on the complexity of the mind and its capabilities. Simple consciousnesses that have minimal awareness of your self and their surroundings, and are only capable of a single task are considered “monotask minds.” Additional capabilities such as the ability to learn new skills, making associations between topics, creatively combine learned subjects to each other to make new ones, to apply prior skills to new subjects, complex logical thinking, empathy, social understanding, planning, and similar traits are combined together to make a consciousness on the scale of a human. In all cases these consciousness fragments may be reabsorbed without difficulty.</p>
<p>Only one Mind carries the full effect of your purchased Defenses, all others carry a weaker version. If this primary mind is killed, the full Defenses will be assigned to the next most powerful mind automatically, unless you otherwise designate a backup. You are not considered ‘dead’ until all of your roughly human scale minds are killed.</p>
<p>Finally, you now have eidetic memory and take one copy of Mind Defense for free.</p>
`,
})
heritages.push({
  uid: 's937U',
  title: 'Synaptic Revelation Kernel',
  category: 'Heritage',
  tree: 'Transhuman',
  image: 'https://images2.imgbox.com/1b/28/Mt5lvnUR_o.png',
  type: 'Self',
  cost: 100,
  freebies: {
    defensePerks: [{ title: 'Mind Defense', cost: 0, count: 1 }],
  },
  typeFreebies: {
    Biomorph: {
      talentPerks: [{ title: 'Blessed Talent', cost: 0, count: 1 }],
    },
    Cybermorph: {
      talentPerks: [{ title: 'Aesthetic Talent', cost: 0, count: 1 }, { title: 'Covert Talent', cost: 0, count: 1 }],
    },
    Aethermorph: {
      talentPerks: [{ title: 'Science Talent', cost: 0, count: 1 }],
    },
  },
  whitelist: ['Distributed Intellectual Devotions'],
  types: {
    Biomorph: `<p><b>Biomorph</b>: Your psionic growth may be accelerated by additional or novel neural tissue or psionic inputs. Every mind within the immediate psionic presence of a more powerful mind are all treated as having the mental complexity of that more powerful mind, acting as a tightly woven, singular mind.
    <p>Finally, take Blessed Talent for free.</p>
    </p>
    `,
    Cybermorph: `<p><b>Cybermorph</b>: Your cognitive growth may be accelerated by additional calculative hardware and significant inputs of additional (relevant) data. Every mind in direct contact with another increases their total cognitive capacity as various subroutines and basic functions are optimally distributed amongst the network. The greater the number and/or power of minds in a single network, the greater the boost to their collective capability.
    <p>Finally, take Aesthetic Talent and Covert Talent for free.</p>
    </p>
    `,
    Aethermorph: `<p><b>Aethermorph</b>: Your cognitive growth may be accelerated by the proliferation of your Element in worlds you have access to as well as overcoming appropriate trials that are mystically resonant to the trait being improved. Your Daimons still cannot advance or develop, but may be converted into Goetia. Additionally, you are now able to create Goetia with an Element significantly different or distinct from your own to expand your own Element. You and your Goetia may have up to (Tier) significantly distinct Elements each, totalling up to approximately a paragraph’s worth of description. However, unique Elements more than one step away from a mind have minimal impact on the Elements of their grand-progenitors.
    <p>Finally, take Science Talent for free.</p>
    </p> `,
  },
  desc: `
<p>Your ability to improve your mind has been further expanded. Though the specifics vary based upon your Transhuman type, your mind, ability to enhance it, and ability to create sub-aspects of it have increased.</p>
<p>Your minds are now able to, through focus, effort, and training, to increase their own capabilities, such as increasing the speed of their thought, the number or complexity of objects they are able to hold in their thoughts at a time, how many orders of reactions or responses to a single action they can consider at once, or the speed which they’re able to integrate new information.</p>
<p>While a mind can only develop one aspect of itself at a time and every additional step in one area requires exponentially more time, minds may assist in the development of others. You are able to maintain your individuality within another hivemind, network, soul-sea or equivalent situation, and even suborn one with time. Finally, all Transhuman types take one purchase of Mind Defense.</p>
`,
})

heritages.push({
  uid: 'lOe02',
  title: 'Incandescent Ascendancy Machine',
  category: 'Heritage',
  tree: 'Transhuman',
  image: 'https://images2.imgbox.com/ad/05/lVh9gGQc_o.jpg',
  type: 'Self',
  cost: 150,
  freebies: {
    defensePerks: [{ title: 'Fatality Defense', cost: 0, count: 1 }, { title: 'Paradox Defense', cost: 0, count: 1 }],
  },
  whitelist: ['Philosopher’s Transmortality Engine', 'Evolutionary Engine Array', 'Multicore Neural Leyline', 'Synaptic Revelation Kernel'],
  types: {
    Biomorph: `<p><b>Biomorph</b>: Will makes reality, and your will asserts even in the void. The weight of your existence burrows into the very substrate of the zeitgeist and the psionoscape.</p>
    <p>Any instance of your genetic code may act as an anchor for a mind. This includes any Symbiote ecology or entities or structures generated by Jungle or Primal Shrouds. Your psionic energy may be converted into adaptive biomass and vice versa.</p>
    <p>Any individuals that have been affected by your Philosopher's Transmortality Engine may directly draw upon your power to achieve feats outside of their own capabilities.</p>
    <p>By gathering an amount of Devotion Points equivalent to the starting budget of a universe on Intensity 1, you may reach a critical mass of psionic density, embedding yourself into the universe, anchoring your consciousness into local spacetime and capable of drawing power from it and propagating outwards at light speed.  You are capable of generating Dungeon structures anywhere within your psionic reach by devoting portions of your energy to such, functionally using parts of your tier value as Devotion Points.</p>
    <p>If you possess an appropriate Shroud, any instance of your genetic code, from a spore, to even cells not completely broken down in a creature’s digestive tract count as contact with your Shroud.</p>
    `,
    Cybermorph: `<p><b>Cybermorph</b>: All of reality is information, and you are both author and reader. The distinction between reality and simulation has begun to blur through the sheer weight and density of simulations you are able to bring to bear.</p>
    <p>Any fragment of your fractal code may run on any Turing Complete system, self-propagating and maintaining. This includes any existing instances of Tempest Jewelry, devices running your Hypno App, or devices created by Cyber Shroud.</p>
    <p>Any individual that has been inspired by your Philosopher’s Transmortality Engine may create a sufficient copy of your fractal code to self-propagate and revive you should all other aspects of your consciousness be destroyed.</p>
    <p>Your computational simulations may alter reality itself, the sheer information density capable of digitizing portions of reality and thus claiming it, applying any Demiplane Laws to the space as desired. The volume of space increases and level of digitization increases with your computational power, and requires the ability to simulate all potential actors within the volume of space.</p>
    <p>If you possess an appropriate Shroud, any interaction with technology which has a fragment of your code on it counts as contact with your Shroud.</p>
    `,
    Aethermorph: `<p><b>Aethermorph</b>: Reality is an illusion, and you have awoken beyond it. You have claimed a fundamental aspect of existence as your domain, and from it may reweave the tapestry of concepts that form reality.</p>
    <p>Your Jouten may be expressed in any expression of its Element in universes you have access to. Your Jouten may now also traverse conceptual space, in addition to the extradimensional space it could before. If you possess Tantric Arts, you may teach people rituals to feed power to create or accelerate the development of daimons or goetia, even if all of your minds were otherwise destroyed.</p>
    <p>Any individual that has been affected by your Philosopher’s Transmortality Engine or swears themselves into your service may create additional daimons, or themselves be refined into one of your own Goetia.</p>
    <p>Your transcendent position over normal reality allows you to, with effort and concentration, reweave realities in more complex methods than Universal Calibration or Metashift normally allows, and may create true fusion settings, characters, or abilities from realities, items, and retinue members you have access to.</p>
    <p>If you possess an appropriate Shroud, any interaction with an instance of your Element counts as contact with your Shroud. Sufficiently powerful divinities and other entities with authority over the same element may contest your control or even bar you access to their domains, shielding their followers from this effect.</p>
     `,
  },
  desc: `
<p>Rudimentary creatures of form and flesh, simplistic souls of machine and magic, they touch your mind, fumbling in ignorance, incapable of understanding. There is a realm of existence so far beyond their own that they cannot even imagine it.</p>
<p>You are beyond their comprehension.</p>
<p>You. Are.</p>
<p>You have transcended the mortal understandings of form, calculation, thought, and social networks, and ascended into a proper radiant being of energy and patterns and information.</p>
<p>You no longer need your app to transition between worlds; your nature is enough, your Jouten is able to move freely between realities. You and everything within your Jouten will blink out of one world and into your destination. Anyone whose weight is solely supported by your Jouten may be dragged along as well. This form of D-travel can accurately target any world in a local multiverse and any world previously visited. Traveling to a specific new world, outside of a local multiverse, is far less reliable, but you’ll always end up in a place where you needed to be, even if it isn’t where you wanted to go. It cannot target near-identical parallels of the same worlds without Blank Slate.</p>
<p>You may insert portions of your Jouten into a reality, either as only single limbs or smaller segments of it, as small as your Avatar. You may project one instance of your avatar to every reality you have access to.</p>
<p>If you possess Universal Calibration, Meta Shift 1, and/or Meta Shift 2, you are able to apply changes to settings via the same mechanism as Philosopher’s Transmortality Engine, and as with that perk, may filter whom it applies to.</p>
<p>Utilizing the same methods to generate engines and gather materials for Evolutionary Engine Array and Corporeal Transcendence Engineering, you may increase the size and power of your Jouten as well as the corresponding pocket dimension. Your engines may be of any size, and the time to create these smaller iterations is linearly less than the prior minimum, though the output is significantly reduced.</p>
<p>Take one copy each of Fatality Defense and Paradox Defense for free. If you were not already, you are now Tier 8.</p>
`,
})

heritages.push({
  uid: 'PCUlx',
  title: 'Singularity',
  category: 'Heritage',
  tree: 'Transhuman',
  image: 'https://images2.imgbox.com/c3/82/DSeXjpN3_o.png',
  type: 'Self',
  cost: 0,
  costT: 1,
  whitelist: ['Incandescent Ascendancy Machine'],
  desc: 'Surpassing limitations is the very nature of transhumanism. Choose a second Transhuman Type. All Transhuman perks treat you as having both types. When the aesthetics of two Transhuman types conflict, you may determine which one takes precedent.',
})

heritages.push({
  uid: 'gNYsZ',
  title: 'Lurking On The Threshold',
  category: 'Heritage',
  tree: 'Outsider',
  image: 'https://images2.imgbox.com/f4/10/4wB7sFJa_o.png',
  type: 'Root',
  freebies: {
    talentPerks: [{ title: 'Body Tune-Up', cost: 0, count: 1 }, { title: 'Athletic Talent', cost: 0, count: 1 }],
    defensePerks: [{ title: 'Mind Defense', cost: 0, count: 1 }, { title: 'Wild Defense', cost: 0, count: 1 }, { title: 'Environmental Defense', cost: 0, count: 1 }],
  },
  cost: 100,
  desc: `
<p>The Outsider is a figure of countless contradictions - unknowable by nature yet known to itself, an enemy to the natural order and an agent of a greater symphony. Such paradoxes should define it inexorably out of existence and see it chased to the thresholds of possibility by the power of reason, but now they find a new resolution: a resolution in you. Emerging from the chrysalis and the cage of your former self, you are both well at home in the chaoskampf beyond the symbolic order and transcendent above the petty and limpid hazards of a base reality. Take Body Tune-Up, Athletic Talent, and one copy each of Mind Defense, Wild Defense, and Environmental Defense for free.</p>
<p>Moreover, though you may still be able to pass for your former self for a time, you’ll gradually begin to shed that seeming in favor of your new form, whatever that may be. The gross anatomy and aesthetics of your new form are up to you - though, it will be at least moderately superhuman to start with, it will always be at least moderately inhuman, and its ability to defy the ordinary limits of physiology will scale with your maturity as an Outsider and the depths of your esoteric knowledge. Combat - capable tentacles and buckets of ejaculate are traditional, but only one possible path of many.</p> `,
})

heritages.push({
  uid: '4Fr2Y',
  title: 'I Wear No Mask',
  category: 'Heritage',
  tree: 'Outsider',
  image: 'https://images2.imgbox.com/a7/e7/jSbL455D_o.png',
  type: 'Self',
  cost: 45,
  freebies: {
    talentPerks: [{ title: 'Communication Talent', cost: 0, count: 1 }],
    defensePerks: [{ title: 'Information Defense', cost: 0, count: 1 }],
  },
  whitelist: ['Lurking On The Threshold'],
  desc: `
<p>Eternally slinking in from its revelry at the edge of the known world, the Outsider is well accustomed to the meaningless pretenses of other beings.</p>
<p>You are capable of seamlessly guising yourself to fit expectations and walk among any social order you encounter: not only do you enjoy the benefits of Communication Talent for free as a result of your uncanny insight, but you can change your form and outward appearance almost without limit for purposes of interacting with a social species. Such guises can even warp the aesthetics and manifestations of your non- Outsider abilities to fit a mold, but no ordinary scrutiny will ever see you caught out as the alien that you really are - your new peers will sooner think you a strange cripple or an uncanny superman than a true manifestation of the Other. Take one copy of Information Defense for free.</p>
<p>Though exceedingly flexible and powerful, the veil of this power is borne of your ability to lie with the truth: to present yourself as a known unknown, rather than known or unknowable. You can’t use it to impersonate specific individuals, and any who too closely match the demographic and profile of whatever guise you adorn may be able to recognize that you aren’t truly one of them. How they react to that knowledge is up to them.</p> `,
})

heritages.push({
  uid: '9j3K6',
  title: 'Sanity - Shattering Instruction',
  category: 'Heritage',
  tree: 'Outsider',
  image: 'https://images2.imgbox.com/29/04/TdaV1LUy_o.png',
  type: 'Lure, Party',
  cost: 100,
  freebies: {
    talentPerks: [{ title: 'Talent Sharing', cost: 0, complex: [{ flavor: 'All', cost: 0 }], count: 1 }],
    defensePerks: [{ title: 'Mind Defense', cost: 0, count: 1 }, { title: 'Information Defense', cost: 0, count: 1 }],
  },
  whitelist: ['Lurking On The Threshold'],
  desc: `
<p>An Outsider speaks, and its acolytes tremble without fail before the weight of its words - and yet the horror of a revelation lies not in the contents of its unveiling but in the reminder that the veil was ever able to exist at all. Resolving this paradox requires accepting the power of the Real.</p>
<p>While lesser beings have to warp their devotees into new configurations just to arm and empower those fragile servants, you bring enlightenment alone to those who sit and learn, and enlightenment is all they need: take a free purchase of Talent Sharing for every Talent you possess yourself. Furthermore, those who learn under your tutelage don’t even need to be a member of your retinue in order to enjoy the benefits of your Talent Sharing, and you are always able to teach yourself and others any secret, forbidden, or heretical lore of the world(s) you’re currently inhabiting, regardless of whether you actually know the lore in question. This also extends to lore surrounding your Elements and Omens, if you have them. Additionally, take one copy each of Mind Defense and Information Defense for free.</p>
<p>However, your every instruction serves as an infallible reminder of the mouth which gives it. The more other beings learn from you, and the more important your teachings are to them, the more compelling you become, until you loom in their minds like a source of all truths.</p> `,
})

heritages.push({
  uid: 'QOu5J',
  title: 'Endless Gospels Unspoken',
  category: 'Heritage',
  tree: 'Outsider',
  image: 'https://images2.imgbox.com/cb/f9/g8TCKLUc_o.png',
  type: 'Lure, Party',
  cost: 30,
  whitelist: ['Sanity - Shattering Instruction'],
  desc: `
<p>All words find their limit in the Outsider, for the essence of the Outsider is that which remains when words fail - not a figment of confusion given form, but the chaos that existed before the dawn of reason and which remains yet unbroken beneath the weight of rationale.</p>
<p>Those you teach or instruct on any matter no longer need to be able to understand the ideas you present in order to make use of them as if they did: your wisdom bypasses the bottlenecks of comprehension and metacognition in order to be heard on a far more profound level. This greatly accelerates the learning of your pupils, but it also applies to other nominally language - dependent abilities - allowing you to give complex orders and suggestions to subjects who don’t understand what they’re being compelled to do or if they’re being compelled at all, for example.</p> `,
})

heritages.push({
  uid: 'FsBvs',
  title: 'Beyond The Wall Of Sleep',
  category: 'Heritage',
  tree: 'Outsider',
  image: 'https://images2.imgbox.com/b1/24/EAln3V89_o.png',
  type: 'Lure, Party',
  cost: 100,
  freebies: {
    defensePerks: [{ title: 'Body Defense', cost: 0, count: 1 }, { title: 'Body Defense', cost: 0, count: 1 }, { title: 'Stress Defense', cost: 0, count: 2 }, { title: 'Fatality Defense', cost: 0, count: 1 }],
  },
  whitelist: ['Sanity - Shattering Instruction'],
  additionalDesc: `
  <h3 class="text-lg font-semibold text-center">Keyword: Madness</h3>
  <p>Of the fall to insanity, much is written, but even less is known. If guidelines are desired for the purposes of the Outsider heritage, then the following classes of people may count as mad:</p>
  <ul class="list-disc list-inside">
    <li>Those battered and skewered against the rocks of reality: the deluded, the deranged, the deviant, and more. That such maladies are always relative, for what passions strike a man mad in one world may be necessary and righteous in another, is almost academic - it's not the illness itself but the estrangement that calls out to the Outsider, the experience of being a stranger in a strange land and knowing one belongs to the world of some distant star.</li>
    <li>Those warped and crushed in spirit by the senseless whims of other men: people made strangers to themselves by ongoing supernatural mental influence or twisted into horrifying new shapes by sufficiently comprehensive but ultimately banal evils. Naturally, one's retinue as an Outsider always falls into this category, even in the rare case that those in question would have good reason to contest descriptions of themselves as bent and warped.</li>
    <li>Those turned against their own nature and spurred to writhing futility. This includes all those who are fundamentally tortured by their own existences, no matter if they're pinned beneath the weight of some part of their own being or if they're asphyxiating in the void which is naively called the 'search for meaning'. In their own way, such people are always acutely closer to the undiluted reality that the Outsider inhabits than any other.</li>
  </ul>
  `,
  desc: `
<p>The puissance of dream lies not in its domestication as a mere hallucination, but in the mystery that presides when it is left to run wild - every encounter with the border of consciousness is a journey to the limits of the world, neither memorable nor possible to forget. But the Outsider is of that place, and the Outsider never leaves.</p>
<p>You and all of your pupils now treat all time sleeping, in a trance, or otherwise similarly inactive, as if it were time spent training under your own direct instruction; this requires no amount of mental attention on your part to sustain, and doesn’t strain your students or otherwise detract from the recuperative benefits of rest. In extremis, death - that is, the cessation of existence - always counts as a form of inactivity for purposes of this power.</p>
<p>As with the prerequisite perk, this power isn’t limited to your retinue. In absentia, anyone who wants to learn from you will enjoy your tutelage so long as they’re causally accessible to you; furthermore, the mad may automatically intuit your existence and offers, and you may limit the effects of these perks to those you would like to reach(as an acausal determination).</p>
<p>Finally, take two copies each of Body Defense and Stress Defense and one copy of Fatality Defense for free.</p> `,
})

heritages.push({
  uid: 'aIf8P',
  title: 'Prophet Of Paradox',
  category: 'Heritage',
  tree: 'Outsider',
  image: 'https://images2.imgbox.com/3f/b8/mYEL9x3e_o.png',
  type: 'Self, Lure',
  cost: 145,
  freebies: {
    talentPerks: [{ title: 'Psychic Talent', cost: 0, count: 1 }],
    defensePerks: [{ title: 'Drain Defense', cost: 0, count: 1 }, { title: 'Paradox Defense', cost: 0, count: 1 }],
  },
  whitelist: ['Sanity - Shattering Instruction', 'I Wear No Mask'],
  desc: `
<p>The Other is a projection; the Real, an abstraction. To speak of the Outsider’s absolute existence is to speak of the ineffable, to gesture at shadows - and yet it moves all the same.</p>
<p>Take Psychic Talent and one copy each of Drain Defense and Paradox Defense for free. All time others spend in telepathic or spiritual contact with you now counts, at your discretion, as time spent training under your own direct instruction. Moreover, whenever you show your true form, anyone who makes primary sensory contact with you - that is, anyone who sees or hears you, for humans - also makes telepathic contact with you.</p>
<p>Finally, your total union with the unknowable reveals to you all secrets. You may retroactively spend unused time in order to learn anything you are capable of teaching yourself with Sanity - Shattering Instruction, and you are incapable of being deceived: you recognize all lies, including lies of omission, see through all forms of illusion and disguise, and all of your senses operate through infallible claircognizance.</p> `,
})

heritages.push({
  uid: 'iiYjJ',
  title: 'Everywhere And Nowhere',
  category: 'Heritage',
  tree: 'Outsider',
  image: 'https://images2.imgbox.com/6b/9d/xj3SXzBy_o.png',
  type: 'Self',
  cost: 150,
  complex: 'flavor',
  anything: 'Omen & Element',
  freebies: {
    talentPerks: [{ title: 'Everlasting Talent', cost: 0, count: 1 }],
    defensePerks: [{ title: 'Wild Defense', cost: 0, count: 1 }, { title: 'Wyldscape Defense', cost: 0, count: 1 }],
  },
  whitelist: ['Lurking On The Threshold'],
  desc: `
<p>A procession of signs and symbols marches always in the name of the Outsider’s terror and glory, but they will never be more than the warning signs that precede it.</p>
<p>Your presence is intrinsically heralded by some specific aspect of reality - be it mirrors, particular arrangements of angles, opal gems, or something stranger. All examples of this Omen within the same cosmology as yourself are always considered eligible targets and destinations for any sensory and movement abilities you possess - mundane abilities included - and you can always use your senses as if co - located with your own Omens. The more specific and esoteric your Omen is, the less mental attention and focus it takes to project your awareness through them.</p>
<p>You have some power and control over your Omen. Treat this as an elemental affinity as per Dragon Scale. If your Omen is ineligible or undesirable for implementation as an Element, <b>you may pick a conceptually associated Element instead</b>, and sensibility is not required. Mirrors may open into the depths of your oceans instead of reflecting space; opals may pulse with unearthly color and light instead of manifesting the power of the earth.</p>
<p>Finally, take Everlasting Talent and one copy each of Wild Defense and Wyldscape Defense for free.</p> `,
})

heritages.push({
  uid: 'hBvf6',
  title: 'Elder Sign',
  category: 'Heritage',
  tree: 'Outsider',
  image: 'https://images2.imgbox.com/23/23/MWPwLIBM_o.png',
  type: 'Other Control',
  cost: 30,
  freebies: {
    talentPerks: [{ title: 'Aesthetic Talent', cost: 0, count: 1 }],
  },
  whitelist: ['Everywhere And Nowhere'],
  desc: `
<p>In their ignorance, cargo cults ape the achievements of their betters - but those who fall for such follies are ultimately no more ignorant than any other men. Why should their efforts go unremarked ?</p>
<p>Take Aesthetic Talent for free. Your emblem no longer needs to be applied via your stamp, and it may still be applied to useful effect even if you’ve purchased other Binding methods: any sufficiently accurate recreation of your emblem’s pattern, placed upon a person’s skin, may be used to claim them. Scale doesn’t matter, and all such markings will correct themselves after the normal waiting period.</p>
<p>However, these markings come with major caveats: they’re subject to no anti - memetic screening to keep their presence from being noticed, and they may easily be physically disrupted before their 72 - hour waiting period is over.</p> `,
})

heritages.push({
  uid: 'eLLM1',
  title: 'Branded by Possibility',
  category: 'Heritage',
  tree: 'Outsider',
  image: 'https://images2.imgbox.com/8c/17/6bPvze08_o.png',
  type: 'Self',
  cost: 150,
  freebies: {
    defensePerks: [{ title: 'Destiny Defense', cost: 0, count: 1 }, { title: 'Paradox Defense', cost: 0, count: 1 }],
  },
  whitelist: ['Everywhere And Nowhere'],
  desc: `
<p>Men touch the Outside only when reason fails them - where they are torn bleeding from their illusion of a small, safe, and predictable universe, left scarred for life.</p>
<p>Take Destiny Defense and Paradox Defense for free. The reach of your connection to your Omens now extends seamlessly across any cosmologies you’ve ever inhabited, as if you were a part of all of them at once. Furthermore, if you desire it, any effect or phenomena you create within the domain of your Omen or Element will now last indefinitely until forcibly dispelled, as a lasting distortion to the natural order; all such effects gain an additional resistance to being dispelled proportionate to your maturity as an Outsider and the depths of your esoteric knowledge.</p>
<p>If you have an appropriate Shroud, then you may use a distortion sustained by this perk as an anchor for your will, transforming it into a lasting Shroud manifestation. This eliminates the need to sustain it via your own directed will, but is still subject to other limits. (Three-Piece Suit and Elemental Loom may be helpful.)</p> `,
})

heritages.push({
  uid: 'QgoGO',
  title: 'The Gate And The Key',
  category: 'Heritage',
  tree: 'Outsider',
  image: 'https://images2.imgbox.com/02/c4/mDrsGXxc_o.png',
  type: 'Self',
  cost: 150,
  freebies: {
    talentPerks: [{ title: 'Soul Talent', cost: 0, count: 1 }],
    defensePerks: [{ title: 'Destiny Defense', cost: 0, count: 1 }, { title: 'Wyldscape Defense', cost: 0, count: 1 }],
  },
  whitelist: ['Everywhere And Nowhere', 'I Wear No Mask'],
  desc: `
<p>The Outsider skirts the borders of possibility within society and reality alike, estranged from both of them in equal measure. This is both its greatest power and its greatest weakness.</p>
<p>Your connection to your Omens stretches across all of time and space, and you have become your own reality in every way that matters. It no longer takes you any amount of mental attention to channel your awareness through your Omens, and you may also channel any of your other abilities through your Omens by paying the same cost of focus that you would have previously paid for scrying.</p>
<p>Moreover, your existence is completely severed from dependency, as a being beyond worlds; take Soul Talent and one copy each of Destiny Defense and Wyldscape Defense for free. You can travel freely through the multiverse, and even navigate the time axes as you choose, but you can neither break causality nor enter a world and take it fully into your reach before it has ‘invited’ you in. Such a summoning consists of a critical mass of your Omen, and is always a prolonged and interruptible affair that will be noticed by a world’s inhabitants in advance, but you can send in your own retinue, and make use of your teaching-related Outsider abilities to orchestrate your entrance if need be.</p> `,
})

heritages.push({
  uid: 'r1FCe',
  title: 'An Answer To Reason',
  category: 'Heritage',
  tree: 'Outsider',
  image: 'https://images2.imgbox.com/f7/97/wdoUM16j_o.png',
  type: 'Self',
  cost: 0,
  costT: 1,
  whitelist: ['Prophet Of Paradox', 'The Gate And The Key'],
  desc: `
<p>You are capable of teaching the members of your retinue how to become Outsiders; they gain their own true forms, their own Omens, and their own Elemental affinities in the process, acting with all of your Outsider abilities except for Elder Sign and Endless Gospels Unspoken.</p>
<p>As your Heralds, their teaching effects are extensions of your own authority, and draw their students towards you instead of them; likewise, you may treat your Heralds as if they were your own Omens, and they always count as a critical mass of your own Omen for purposes of summoning you into a world.</p> `,
})
