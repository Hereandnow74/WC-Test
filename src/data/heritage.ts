export interface Heritage {
  title: string
  type?: string
  tree: 'Dragon' | 'Transhuman' | 'Outsider' | 'None'
  cost: number
  whitelist?: string[]
  desc: string
  freebies?: object
  table?: string[][]
  additionalDesc?: string
  costVariants?: number[]
  multiple?: boolean
  max?: number
  typeFreebies?: any
  types?: Record<'Biomorph' | 'Cybermorph' | 'Aethermorph', string>
}

export const heritages: Heritage[] = []

export const desc = `
<p>The root choices in this section are mutually exclusive. You don’t have to pick one, but you may not pick more than one without the Ancestral Diversity perk. If you purchase a Heritage Root after chargen, you must first activate it in-character before it will take effect. If you Substitute into or Possess a character of the same archetype as a Heritage, you may subtract the list price for their effective tier after step 1a from the Heritage’s price, carrying the remainder forward to later perks in the Heritage’s tree until you run out. Tier 11 characters count as 2000 credits for this purpose. This discount is also subject to the 80% cap. Like all company-supplied powers, the powers granted by these perks cannot be nullified, copied, or stolen.</p>
<p>Heritages modify a contractor’s tier rating at step 2. Add up the list prices of every perk you have, separately, for each Heritage you have, then take the highest and compare it to the chart on the right. The largest Σ value that’s still less than your sum determines your tier. If you use a T11 ticket on any Heritage’s capstone perk, you’ll become a T11 yourself.</p>
<p>Heritages marked as under construction already exist in-universe but are not yet ready for inclusion in this file. Fanwank your NPCs responsibly until then.</p>`

heritages.push({
  title: 'Ancestral Diversity',
  cost: 11111,
  tree: 'None',
  multiple: true,
  max: 12,
  desc: 'You may now purchase the perks in a second Heritage tree. You must still spend the credits as normal. This perk may be purchased multiple times. Its price will increase by 1 ticket each time.',
})

heritages.push({
  title: 'Dragon Heart',
  tree: 'Dragon',
  type: 'Root',
  complex: 'flavor',
  anything: 'Element',
  cost: 80,
  freebies: {
    talentPerks: ['Everlasting Talent', 'Body Talent', 'Martial Talent', 'Wild Talent'],
    defensePerks: ['Body Defense', 'Body Defense', 'Wild Defense', 'Wild Defense'],
  },
  desc: `
<p>You have a dragon’s blood. Take Everlasting Talent, Body Talent, Martial Talent, Wild Talent, and two copies each of Body Defense and Wild Defense for free. You can transform into, effectively, a dragon-shaped mecha.  It’s bipedal with wings, roughly 3m tall, and maximizes your improved strength and protection at that size without sacrificing any finesse or maneuverability. Its color scheme is your choice.</p>
<p>You must also choose an elemental affinity. Available "elements" include the classical western set(Earth, Fire, Wind / Air, Water, Aether), the classical eastern set(Metal, Wood, Void), chemical elements(Carbon, Mercury, Plutonium…), and those found in modern fantasy(Light, Darkness, Ice, Lightning, Poison…). This element will affect your dragon armor’s design and loadout, including the breath weapon that all dragons have. If you have a Shroud that matches your dragon element, the two bonuses will stack. This affinity is fixed without additional purchases.</p> `,
})

heritages.push({
  title: 'Dragon Scale',
  tree: 'Dragon',
  type: 'Self',
  cost: 95,
  complex: 'flavor',
  anything: 'Element',
  freebies: {
    talentPerks: ['Soul Talent'],
    defensePerks: ['Environmental Defense', 'Environmental Defense'],
  },
  whitelist: ['Dragon Heart'],
  desc: `
<p>Dragonhood is fully a part of you. Take Soul Talent and two copies of Environmental Defense for free. You now have a second alt- form, a full - sized quadruped that measures 10 m tall at the shoulder(around 25 m from the nose to the base of the tail). It offers even more physical power than the first form, with a massive buff to your chosen affinity and all the other supernatural abilities you've acquired and trained.  If you flare your power, you’ll trigger a fear reflex in those nearby who can sense it.  This will happen automatically whenever you defeat an opponent yourself, or manually for a short time.  Some individuals may have… different… reactions to your unleashed aura.</p>
<p>The sizes of your two dragon forms are not set in stone: the more ki, psi, or magic power you have, the larger you can make them. This has no upper limit, but still requires significant time investments, longer than any mortal lifespan. Your mecha form can become large enough to wrestle Tengen Toppa Gurren Lagann on an equal footing, and your dragon form can eventually swallow galaxies whole, but it’ll take you billions of years to get there. Before you think to use time magic to accelerate that process, first consider that more people would’ve done it if it were that easy.</p>
<p>When you buy this perk, you get one chance to change your dragon element; use it or lose it. In addition to the mundane choices offered by Dragon Heart, conceptual elements are now available. Literally anything can be a conceptual element, provided you maintain a consistent theme, whether that’s Love, Time, Imagination, a season, Surprise, Heavy Metal, or even Infinity. The more esoteric and exploitable your chosen element, the more time you’ll need to develop and master its full potential. This time starts at tens of years for the basics and can stretch into the millions of years for the truly exotic ideas.</p> `,
})

heritages.push({
  title: 'Dragon Aura',
  tree: 'Dragon',
  type: 'Lure',
  cost: 200,
  freebies: {
    defensePerks: ['Stress Defense', 'Stress Defense', 'Destiny Defense', 'Destiny Defense', 'Mind Defense'],
  },
  whitelist: ['Dragon Scale'],
  desc: `
<p>You are a dragon. Dragons are power. Ladies love power. Thus, ladies - rather, anyone compatible with your orientation - love you. Your supernatural aura now tells ki - and magically - sensitive waifus that there's only one person they should bang to have the strongest offspring: you.  Take two copies each of Stress Defense and Destiny Defense, and one copy of Mind Defense, for free.  Targets of Tiers 1-3 are immune to your aura.  For Tier 4 and above, your aura’s effects on uncaptured targets scale with sustained proximity (closer is better), your physical exertion (more is better), ventilation (less is better), and, most importantly, the waifu’s power as measured by her effective tier rating after step 4.  Purchased and captured waifus are used to your aura and can ignore its passive effects without effort.</p>
<p>Further conditional modifiers are available for your waifus’ effective tier rating for the purpose of this lure’s compulsion. Characters with serpentine and feline traits get one point; full serpents in humanoid form, actual cat kemonomimi and hybrids, and characters with draconic traits get two points; full dragons(that are sapient) instead get three. Waifus who share a theme with your draconic element get one. When you flare your aura, one effective tier will be added to all waifus in the local universe for the duration, overriding the basic fear response. These modifiers do not affect the waifus’ actual abilities and thus do not obey the standard tier cap.</p>
<p>When a target is exposed to your aura for long enough, they will be overcome by lust for you and seek your location like a horny missile. Kidnapping attempts by powerful waifus that this lure turned into temporary yanderes are not unknown, but you should be able to handle it and turn the tables. You are a dragon, after all.</p>
<p>The behind - the - scenes mechanics of this perk are described in detail in the Additional Rules section.</p> `,
})

heritages.push({
  title: 'Dragon Thrall',
  tree: 'Dragon',
  type: 'Party',
  cost: 150,
  freebies: {
    defensePerks: ['Polymorph Defense', 'Wyldscape Defense'],
  },
  whitelist: ['Dragon Scale'],
  desc: `
<p>Every part of a dragon is infused with the concept of power, including their bodily fluids. Taking in large amounts of your fluids, over long periods of time, will make your waifus more powerful and slowly raise their effective tier. This is calculated after any tier changes from waifu perks, but before cross- training, equipment - including the waifu’s own equipment - or bindings, and only affects the attraction bonus from Dragon Aura until the drinker is captured. Take one copy each of Polymorph Defense and Wyldscape Defense for free.</p>
<p>On a Tier 1 waifu, the first dose(120 mL) will improve her physical fitness by a noticeable, but still mundane, amount and grant her a burst of inspiration that she can funnel into any one field of expertise, elevating her to Tier 2 on the spot. A Tier 2 waifu will experience the same effects for the course of five doses, until she becomes Tier 3.  Over the course of twenty - five doses, a Tier 3 waifu’s skills and fitness will become supernatural enough to qualify her for Tier 4, with the exact manifestation dependent on your element and her personality and themes. Every tier boost after that requires five times as many doses as the one before it.</p>
<p>Waifus of Tier 7 or above cannot be boosted higher with this perk alone. Those whose tiers have been raised to Tier 7 by this perk will instead begin to manifest draconic traits, with the specifics dependent on your element and their personalities and themes. Waifus with pre - existing draconic, serpentine, or feline traits will experience this effect sooner. Waifus with pre existing elements, whether from their own history, an Elemental Shroud, or a previously - applied Heritage perk, will retain those elements and not gain a new one. Costume animal parts are not enough to qualify a waifu for the transformative effect unless they’re worn for significant and ongoing timespans, while permanent augmentations(organic or otherwise) always do. Affected waifus may always shapeshift obvious draconic traits back to their original forms.</p>
<p>PvP note: If another contractor, whether they captured you or you captured them, has used this perk on you often enough to make you manifest draconic traits, take Dragon Heart for free the next time you have an account to access. The remaining Dragon Heritage perks must be bought using your own funds.</p> `,
})

heritages.push({
  title: 'Dragon Blood',
  tree: 'Dragon',
  type: 'Party',
  cost: 150,
  freebies: {
    defensePerks: ['Polymorph Defense', 'Wyldscape Defense'],
  },
  whitelist: ['Dragon Thrall'],
  desc: `
<p>The tier cap on Dragon Thrall is now lifted. Waifus may now be boosted by it all the way to Tier 10.  Further doses after that will strengthen them, but without further tier- ups. Dragon Thrall’s transformative effect now affects all waifus of Tier 7 or higher. Take one copy each of Polymorph Defense and Wyldscape Defense for free.</p>
<p>PvP note: If another contractor, whether they captured you or you captured them, has used this perk on you often enough to make you manifest draconic traits, take Dragon Scale for free the next time you have an account to access. The remaining Dragon Heritage perks must be bought using your own funds.</p> `,
})

heritages.push({
  title: 'Treasure Hoard',
  tree: 'Dragon',
  type: 'Other Control',
  cost: 20,
  whitelist: ['Dragon Scale'],
  desc: 'You may now capture a subject by biting them, drawing blood, and swallowing a small amount. The bite itself is important to establish dominance, but where you bite doesn’t matter. The core of a tattoo will appear at that spot, just the same as using the Stamp, and may be moved to a more ideal part of her body using the company app, just like with the stamp. This may be purchased alongside higher bindings or even No Bindings. Again like the stamp, tattoos created by this perk will remain visible until they’re superseded by higher bindings, but only take 5 minutes to settle instead of the full 3 days. ',
})

heritages.push({
  title: 'Dragon Cabin',
  tree: 'Dragon',
  type: 'Party',
  cost: 30,
  whitelist: ['Dragon Scale'],
  desc: `
<p>Your full- size dragon form now contains a pocket dimension for passengers and cargo, typically accessed via at least one airlock hidden in the abdominals or lower or upper orifices. This airlock is inaccessible while you’re in your mecha or human - size forms, trapping anything inside until you change back; Apportation and other methods of dimensional travel are not affected. The size of this cabin grows with your full - size body, but does not perfectly match your torso’s exterior dimensions.</p>
<p>You may learn to freely manipulate the walls, floor, and ceiling of the cabin or manifest an avatar inside it; these are easier if you already have experience with similar abilities. Holding a waifu inside this space counts as extremely close contact for the purposes of Dragon Aura. Anyone inside your cabin, including people who are not part of your retinue, will be protected from the outside by your Defenses as if they had them personally.</p> `,
})

heritages.push({
  title: 'Dragon Bifurcation',
  tree: 'Dragon',
  type: 'Self',
  cost: 25,
  whitelist: ['Dragon Cabin'],
  desc: 'Your full- size dragon form now benefits from both the waifu perks I’m on a Boat and Bifurcation: you may manifest an avatar with your normal appearance alongside your full - size dragon form. You can dedicate your full attention to both the full - size dragon form and this avatar simultaneously without issue. It can physically enter your full - size form’s Dragon Cabin and use all of your abilities except transform into a second copy of your full - size dragon form. This counts as a single purchase of both I’m on a Boat and Bifurcation, reducing the number of purchases of those perks needed to reach their price caps by one. ',
})

heritages.push({
  title: 'Dragon Break',
  tree: 'Dragon',
  type: 'Self',
  cost: 50,
  costVariants: [50, 40, 20],
  whitelist: ['Dragon Cabin', 'We Will Meet Again'],
  desc: 'You no longer need your app to transition between worlds; your nature is enough. You and everything you’re carrying will blink out of one world and into your destination. This includes beings riding upon or inside you and is subject to the same limitations as whichever of We Will Meet Again and the associated perks that you’ve purchased. This perk is discounted by 10 credits if you’ve encountered a world- traveler who is neither one of your waifus nor a company contractor. If one of your waifus can travel between worlds, the discount increases to 30 credits. This discount is not available on DR11 starts. ',
})

heritages.push({
  title: 'Double Dragon',
  tree: 'Dragon',
  type: 'Self',
  cost: 200,
  complex: 'flavor',
  anything: 'Element',
  freebies: {
    defensePerks: ['Fatality Defense', 'Fatality Defense', 'Corruption Defense'],
  },
  whitelist: ['Dragon Scale'],
  desc: 'You may select a second dragon element. If you switched to a conceptual element with Dragon Scale, you may choose your old element or something new. Your training with one element will not usually carry over to the other, unless your level of understanding allows you to harmonize them as one. This perk also adds + 1 effective tier to all waifus in your local universe for the purpose of Dragon Aura. Additionally, take two copies of Fatality Defense and one copy of Corruption Defense for free. ',
})

heritages.push({
  title: 'Elder Dragon',
  tree: 'Dragon',
  type: 'Self',
  complex: 'flavor',
  anything: 'Element',
  cost: 11111,
  whitelist: ['Double Dragon', 'Dragon Blood'],
  desc: 'You may select a third dragon element. Your ability to master each of your elements is vastly accelerated: you can achieve the same results in only one- thousandth of the total time. All waifus in your local universe gain another effective tier for the purpose of Dragon Aura. ',
})

heritages.push({
  title: 'First Augmentation',
  tree: 'Transhuman',
  type: 'Root',
  cost: 80,
  freebies: {
    talentPerks: ['Body Talent'],
    defensePerks: ['Stress Defense', 'Stress Defense'],
  },
  typeFreebies: {
    Biomorph: {
      talentPerks: ['Wild Talent', 'Psychic Talent'],
      miscPerks: ['Sexual Calibration', 'Fertility Calibration I'],
      defensePerks: ['Body Defense'],
    },
    Cybermorph: {
      talentPerks: ['Science Talent', 'Martial Talent'],
    },
    Aethermorph: {
      talentPerks: ['Soul Talent', 'Aesthetic Talent'],
    },
  },
  types: {
    Biomorph: '<p><b>Biomorph</b>: You seek perfection via biological and genetic means. You gain additional organs and cell types, which give you a magnetic sense, expanded visual range, the ability to generate neurotoxins of a potency of your choosing, and the ability to regrow lost limbs. Your base genetics and body are capable of having any biological system safely integrated into it via surgery or injection. Take Wild Talent, Psychic Talent, Sexual Calibration, Fertility Calibration I, and one copy of Body Defense for free. You may also reduce the time of pregnancies to one third their normal time.</p>',
    Cybermorph: '<p><b>Cybermorph</b>: You seek perfection via technological means.Portions of your body have been enhanced by and replaced with cybernetics. You have an integrated GPS, compass, headphones/ speakers, an advanced calculator, and the ability to access computer systems directly. Due to the strong modular framework, you are able to integrate and store technology in your body, provided you are able to power it. Take Science Talent and Martial Talent for free.</p>',
    Aethermorph: '<p><b>Aethermorph</b>: You seek perfection via magical means. Your body has been permanently alchemically and magically enhanced, which allows you to perceive, interact with, and astrally project into and travel through higher realms of existence. At its most basic, this allows you to perceive, analyze and interact with magic, enchantments, dreams, and the supernatural in all of its forms, though wards and similar effects may hamper your vision or access. Your adaptable metaphysical structure allows you to integrate any metaphysical, magical, or supernatural elements safely via ritual, potion, or similar methods, integrating them with your astral body. These effects take up conceptual space, and more powerful effects take up more of your metaphysical real estate. A spell to polish things might take up little more than a ring’s worth of space, while a spell that could shatter a city might take up the entirety of your astral form. Additionally, you get Soul Talent and Aesthetic Talent for free.</p>',
  },
  desc: `
<p>You have begun to exceed the limitations of the human form. Select one Transhuman type. For all types, your Smart Device is now part of you and accessible with a thought via a customizable HUD. You are still able to summon a device for waifus to interact with should you wish. Your strength, speed, durability, reaction times and senses have all been improved beyond human limits. Additionally, your body is able to store energy beyond its normal limits, as well as discharge it as electricity if you could not already do so. Your body is modified to handle a wide range of further modifications of a type based on the specific form of Transhumanism you select. Take Body Talent and two copies of Stress Defense for free, as well as other perks based on your Transhuman type. Choose your method of escaping human limitations:</p>
`,
})

heritages.push({
  title: 'Networking',
  tree: 'Transhuman',
  type: 'Lure, Other Control',
  cost: 30,
  freebies: {
    talentPerks: ['Communication Talent'],
  },
  whitelist: ['First Augmentation'],
  types: {
    Biomorph: '<p><b>Biomorph</b>: Anyone you impregnate has the core of a Stamp mark appear over their womb, which finishes developing over the course of the pregnancy. Additionally, should you possess Potpourri, you may now directly affect emotions with your pheromones. Your fluids are also saturated with them. You are able to encourage the specific emotional responses or feelings of those nearby, provided they breathe the same air as you. Your fluids have a similar effect and can work via contact.</p>',
    Cybermorph: '<p><b>Cybermorph</b>: Any digital intelligence, or non- digital intelligence that is directly hooked up to the digital space such as via VR, that accepts a gift from you, no matter how small, has the core of a Stamp mark appear on their forehead, which finishes over the course of one full week(168 hours). Additionally, should you possess Alluring Whisper, you may now use it at a normal speaking volume, including subharmonic frequencies that influence the emotional state of those that hear them. Not all speakers are capable of transmitting these frequencies, and beings with super hearing can tell they exist.</p>',
    Aethermorph: '<p><b>Aethermorph</b>: Anyone that swears themselves to your service has the core of the tattoo appear over their heart(or equivalent) upon confirmation of the oath. Additionally, should you possess Love Spot, you are now capable of flaring your power and inflicting its effects on anyone capable of supernaturally perceiving you, not only via sight. Additionally, depending on your intent, this may impose emotional states in addition to love or lust, such as being intimidating, harmless, or amusing, further enhancing your social capability. Finally, you may also adjust the intensity of your Love Spot effect without covering it, though you may only dial it down significantly, not turn it off entirely.</p>',
  },
  desc: `
<p>There’s more to exceeding humanity than combat on the battlefield. You have also begun to exceed them in other ways. Take Communication Talent for free. Each Transhuman Type also gains a new way to capture targets. These conditions cause a tattoo core to appear somewhere on the waifu, just as if you’d used the Stamp, but may be moved to a more ideal part of her body using the company app. This may be purchased alongside higher bindings or even No Bindings. Like the stamp, tattoos created by this perk will remain visible until they’re superseded by higher bindings.</p>`,
})

heritages.push({
  title: 'Full Conversion',
  tree: 'Transhuman',
  type: 'Self',
  cost: 100,
  freebies: {
    talentPerks: ['Everlasting Talent'],
    defensePerks: ['Wild Defense', 'Wild Defense', 'Environmental Defense', 'Environmental Defense', 'Body Defense'],
  },
  whitelist: ['First Augmentation'],
  types: {
    Biomorph: '<p><b>Biomorph</b>: Guy - what ? Your true form is stored in an extradimensional psionic space. Your integrated weapons may include spines, poisons, claws, acids, or tendrils with stingers. Your instinctual knowledge and intuition have improved enormously, with your instincts bordering on precognitive. You may now safely integrate new biological systems and components by eating them. The more extreme the modification, the greater the amount of material required. If you have the Alterzelu Symbiote, you may now benefit from effects that enhance your larva directly, such as Universal Bus allowing you to directly interface with digital spaces. You may now impregnate waifus other than your Queen with smaller clutches of symbiotes, though these are significantly weaker than those spawned by your Queen.</p>',
    Cybermorph: '<p><b>Cybermorph</b>: Transformers in disguise! Your true form is stored via space folding; the various components expand and bloom into your true form. Your integrated weapons can be lasers, missiles, ballistic weapons, railguns, or monomolecular blades or wires. Your calculative power increases significantly, like that of a super- computer. You may integrate new mechanical systems and components smaller than your current true form with a few moments of contact and transformation as your body reconfigures around and integrates the technology. The larger the piece of technology, the longer this takes. This true form qualifies as a Catch - a - Ride vehicle for the purpose of Space Truckin’.  If you have Tempest Jewelry, you may reshape its pieces into any form desired, provided they retain the central gem and wrap around the target. You may benefit from the effects of the Tempest Jewelry on yourself as if you were wearing it, as well as any upgrades it possesses. This includes, optionally, Absolute Order. Additionally, you may control and restructure your mental landscape as desired, including ‘restore points’ to which your mind will be restored to if you are incapacitated or mentally damaged.</p>',
    Aethermorph: '<p><b>Aethermorph</b>: Shaza - who ? Your true form exists and travels through higher realities, capable of perceiving those realities as well as the more mundane planes simultaneously. It still requires a physical anchor to avoid gradual dissipation and affect the mundane realities, in this case your original body, but it has a greater ability to affect the realms of dreams, souls, and similar higher realities. Your true form may manifest around its material anchor, creating a selectively permeable, physical manifestation of pure magical energy and ectoplasm. You do not get an integrated weapon, though the specifics of your true form are to your whim. Instead, choose an elemental affinity as per Dragon Heart and an accompanying, initially weak, ability related to said Element. Your emotional intelligence is improved considerably, due to your ability to perceive dreams, souls, and similar in astral space and the higher realms. You may now safely integrate new magical systems and components by sewing, embroidering, and weaving the threads of magic into your true form. More powerful or complex magics require more delicate weaving and longer to perform. If you have Ritual Circles, you may generate them via concentration, without the company app, and anywhere you can perceive, including upon or within yourself. You may also inscribe the circles in the astral realms, allowing them to affect coterminous mundane realities at the same time, rendering even the most blatant ones invisible to anyone incapable of perceiving the astral.</p>',
  },
  desc: `
<p>There’s nothing left of your original form left. All of it has been improved or replaced with better forms, with expanded functions. Good job, Theseus! The new you may take any shape within the aesthetics of your Transhuman type, but may not(initially) be more than 5 meters by 3 meters by 3 meters in total. In time, you may modify it further to be any size you are capable of powering. Damage to this form persists until repaired or healed.</p>
<p>You now have perfect memory, and your mind has been actively expanded. Through some function, you are capable of switching between this form and a more human- passing form. Your body now has integrated weapons if it did not before, based on your Transhuman Type.</p>
<p>Regardless of your Transhuman Type, take Everlasting Talent, two copies each of Wild Defense and Environmental Defense, and one copy of Body Defense for free.</p>
`,
})

heritages.push({
  title: 'Essence Reactor',
  tree: 'Transhuman',
  type: 'Self',
  cost: 90,
  freebies: {
    defensePerks: ['Possession Defense', 'Soul Defense'],
  },
  typeFreebies: {
    Biomorph: {
      defensePerks: ['Mind Defense'],
    },
    Cybermorph: {
      defensePerks: ['Information Defense'],
    },
    Aethermorph: {
      defensePerks: ['Soul Defense'],
    },
  },
  whitelist: ['Full Conversion'],
  types: {
    Biomorph: '<p><b>Biomorph</b>: Take one copy of Mind Defense for free, due to the psionic base of the Biomorph Essence Core. You may power any biological system. Additionally, you are able to generate and secrete an extremely nutritious fluid in place of any of your normal fluids, which tends to be far thicker and more viscous than normal, with any flavors you desire. This will fulfill the dietary requirements of anyone that consumes it, no matter how it\'s taken in.</p>',
    Cybermorph: '<p><b>Cybermorph</b>: Take one copy of Information Defense for free, due to the fractal calculative base of the Cybermorph Essence Core. You are able to generate the energy as electrical or thermal, with extremely fine control, able to power any technology you make and maintain contact with indefinitely - provided you don’t overwhelm the output limit.</p>',
    Aethermorph: '<p><b>Aethermorph</b>: Take a second copy of Soul Defense for free, due to the concentrated - lifeforce base of the Aethermorph Essence Core. You are able to substitute for the power requirements of any ritual, spell, or magical artifact, though not more specific key components unrelated to power requirements.</p>',
  },
  desc: `
<p>You now have the power requirements for expanded forms down! You possess an Essence Reactor, a concentrated system which draws power from interdimensional space, allowing for infinite energy production, though not infinite output or storage. Its shape corresponds with your mark that forms the center of your stamp. The reactor must be at least the size of a human heart, and has the output of a nuclear reactor, but its maximum output and storage scales upwards linearly as its volume increases.</p>
<p>You may detonate the reactor, and even the smallest Essence Reactor has the force of a nuclear bomb.  (Not recommended for customers that don’t have a way of coming back from the dead!) If you have multiple bodies or may otherwise switch bodies, you may develop a new Essence Reactor within the new body given a month’s worth of dedicated focus, though this time need not be contiguous. If you have multiple Reactors, only one may be active at a time, due to the psionimagical quantum state exclusion principle of soul - bound bleed - energy - generators.</p>
<p>Even while inactive, Essence Reactors are very efficient matter / antimatter generators, capable of converting matter into either thermal, electrical, or magical energy at a level comparable to the Hoover Dam. Additionally, take one copy each of Possession Defense and Soul Defense for free.</p>
<p>You may create Essence Reactors unattached to your consciousness, but they take six times as long to create. An appropriate Shroud cuts the time to make an Essence Reactor in half.</p>
`,
})

heritages.push({
  title: 'Evolutionary Engine Array',
  tree: 'Transhuman',
  type: 'Self',
  cost: 50,
  whitelist: ['Essence Reactor'],
  desc: `
<p>Though the specifics vary based on your type, your constant drive for growth and perfection has had its limits removed. Your body may replicate any prior upgrades that have been integrated into it. You can swap out even all- encompassing upgrades within moments. Additionally, you can replicate any gifts, talents, or innate abilities that fall within the purview of your Transhuman type that your waifus - or anyone outside your retinue that you defeat in a confrontation - possess. That does not include anything available for purchase in this catalog. The expression of these gifts is not necessarily consistent or exact. Abilities associated with each Transhuman type are indicated via the free Talents granted in First Augmentation: Biomorph, genetic and psychic; Cybermorph, technological; Aethermorph, mystical.</p>
<p>Abilities that are generic in their source but are expressed uniquely, such as Sacred Gears, Noble Phantasms, Quirks, or the results of the X - gene, will be unique to you as well and comparable in power or utility to the strongest version that your waifus(or anyone outside your retinue that you defeated) possess. If that changes, your version will grow to match the new strongest version. This perk may generate no more than one Sacred Gear, Semblance, Quirk, X - mutation, or other such power each, and no more than three Noble Phantasms. This perk may only generate or upgrade one Noble Phantasm at a time.</p>
<p>If you have previously purchased OC Donut Steel or Template Stacking I, take a refund on all copies of it, bought for yourself or your retinue, that fall under this perk’s purview, according to your Transhuman type. You may not make additional purchases of those two perks for abilities matching your Transhuman type.</p> `,
})

heritages.push({
  title: 'Essence Upload',
  tree: 'Transhuman',
  type: 'Self',
  cost: 170,
  freebies: {
    defensePerks: ['Possession Defense', 'Polymorph Defense', 'Wyldscape Defense'],
  },
  typeFreebies: {
    Biomorph: {
      talentPerks: ['Performance Talent'],
    },
    Cybermorph: {
      defensePerks: ['Mind Defense'],
    },
    Aethermorph: {
      defensePerks: ['Information Defense'],
    },
  },
  whitelist: ['Full Conversion'],
  types: {
    Biomorph: `<p><b>Biomorph</b>: Cores are grown within organic living things, in batches of up to a dozen at a time according to the host’s physical size. There is no hard limit on the number of simultaneous batches. Each batch must be implanted somewhere along or within the central nervous system of the body it is within, if the host body has one - this requirement is waived for plants and fungi. If the host dies before the cores within are fully - grown, that batch is lost, but this is otherwise a passive process. The weight of your mind reduces the morph’s instincts when you’re not sleeved within it, with limited higher thought. They’re capable of breeding, sustaining themselves, and small talk, but not much else.  Once they’re fully - grown, extra cores may be safely removed from their hosts at any time. Regardless of your morph, you are able to maintain your individuality within another hivemind, and even suborn one with time. Finally, take Performance Talent for free.</p>
              <p>If you have Alterzelu Symbiotes, your Queen is now able to spawn special, Royal, symbiote larvae. These larvae will cause your target to grow one of your Least Cores within themselves, but are otherwise identical to normal larvae. A Royal Symbiote’s egg takes two weeks to develop. The development of the Least Core takes place over the course of a month after the injection of the transformative fluid.Providing the new host with your fluids, such as by consumption, injection, or submersion, accelerates the process, reducing the time taken to just a week with sufficient amounts. An already - existing symbiote host may be given the royal transformative fluid directly, requiring applications over the course of a month.</p>`,
    Cybermorph: `<p><b>Cybermorph</b>: A freshly made core takes an hour to properly imprint your quantum consciousness state onto it. However, with sufficient infrastructure and materials, you may mass produce the blackboxes without further input from yourself. You must backup and update your memories by joining the network they are on. Morphs must be mechanically or biologically feasible. Unsleeved morphs or hosts remain in a hibernative sleep state when not in use. Finally, regardless of your morph and given enough time, you are capable of freely entering and hacking any digital space to give yourself admin privileges. Additionally, take one copy of Mind Defense for free.</p>
                  <p>If you have Tempest Jewelry, you are able to combine 32 separate pieces to create a special piece that must be at least the size of a helmet. This piece will modify the target over the course of two weeks, developing a Least Core within them.</p>`,
    Aethermorph: `<p><b>Aethermorph</b>: Your true form has finally begun to leave behind your old tethers. Any object may act as a receptacle for your phylactery, and you’ll maintain a pseudo - telekinetic control of it. Objects you possess are capable of movement when they otherwise wouldn’t be, such as a statue moving like a person. Morphs you are not actively possessing are reduced to simple automatons. A living phylactery, such as someone you have safely implanted a core into, retains much of their original personality and cognition, but moves through life like in a trance until directed otherwise by you. No amount of corporeal damage damages your true self, as you exist in astral space. Influencing the corporeal world directly from astral space is difficult. However, entities able to interact with astral space are capable of attacking and harming you there, and death in astral space results in true death regardless of how many phylacteries you possess. You may, upon purchase, change your elemental affinity as per Dragon Scale. Additionally, take one copy of Information Defense for free.</p>
                  <p>If you possess Ritual Circles, you gain a special circle that can convert someone into a living phylactery. Multiply the time Requirement factor of the circle by 3.  Other people may inscribe and activate circles for you, though doing so without your input takes precise instructions and takes ten times longer than doing it yourself.</p>`,
  },
  desc: `
<p>Your form is no longer purely physical, though the specifics of your partial transcendence is based on your Transhuman type. If your current body becomes damaged, obsolete, or inconvenient, just switch to a new one. Members of high- risk professions, such as criminals or firewall sentinels, can be killed multiple times on a mission only to be brought back and sent into the field again and again. Take one copy each of Polymorph Defense, Wyldscape Defense, and Possession Defense for free. Your body is called a sleeve or morph, and the process of changing morphs is resleeving. Resleeving generally takes an hour, during which time both bodies are incapacitated. Only one active instance of your consciousness can exist at a time.</p>
<p>At this stage, a potential morph requires a special anchor to designate it as such, called a core. At this stage you are only capable of utilizing the smallest type of core, a Least Core, which is roughly heart or baseball sized. When purely spherical, it generally ends up between 7 and 10 cm in diameter, though it may be any contiguous shape. Though the specific nature varies based on your Transhuman type and personal aesthetics, it is generally a hyper dense neural cluster for Biomorphs, a blackbox server for Cybermorphs, and a crystalline phylactery for Aethermorphs. Unless otherwise stated, a Least Core takes three months of dedicated work by you to create. Any active core may manifest your true form around or within it, depending on size constraints. Alternatively, the morph may be slowly transformed into your humanoid base or the true form via methods specific to your Transhuman type - generally retroviral elements, gray goo nanites, or raw magical ectoplasmic shaping, respectively.</p>
<p>Purchase of this perk provides knowledge as to how to rebuild your body, either via cloning, 5D molecular printing, or leyline restructuring. All of these processes create a body already in possession of an appropriate core, but are generally expensive and take six months to complete.</p>
<p>Given the combination of certain Bindings and Transhuman types, you may take over new bodies of local Waifu / Husbando candidates, turning them into new potential backup bodies. This process is based on the Possess Origins, and the target is considered captured, though doing so neither grants or costs credits. New skills, traits, and abilities gained via this method are added to your true form as if you had Possessed the character. You also gain the target’s episodic memory, as if you had Substituted into them. If you have the Primal, Cyber, or Burial Shrouds for the respective type, you are now capable of injecting targets with a portion of your Shroud. Unless somehow cured or purged, it will slowly develop into a new core within them. Treat this as the target being cocooned within your Shroud, but triple the time required for a capture. Without these Bindings, you are still capable of implanting a core into a potential waifu or husbando, but doing so entirely overwrites the original person with yourself and does not count as a Capture or Possession any more than raising such a target as a zombie would.</p>
<p>Your retinue is capable of hosting your cores, allowing them to act as relays for your awareness and purely mental abilities. However, sleeving into them destroys their mind. Not recommended without a Warranty Plan!</p>
`,
})

heritages.push({
  title: 'Philosopher’s Transmortality Engine',
  tree: 'Transhuman',
  type: 'Party',
  cost: 0,
  complex: 'target',
  costVariants: [0, 5, 20, 40],
  whitelist: ['Full Conversion'],
  desc: `
<p>As a one- way process, you are able to bring your retinue down the same transhumanism path as you. These upgrades must be done in sequence for a waifu. After spending 120 credits on this perk, you may upgrade your retinue freely yourself without further purchases. Each step in the process takes an hour of effort to accomplish on your own.</p>
<p>If you only have Full Conversion, you can give a waifu the First Augmentation perk for 5 Credits. This is generally a + 2 Tier for blue - star Waifus and a + 1 Tier for copper - star Waifus, but not a significant increase in power beyond that. Retinue members who benefit from this will have full - time access to your company smart device and apps just like you, except for the inability to make transactions, disable their own Tempest Jewelry, or other specific exemptions..</p>
<p>If you have Essence Upload, you can apply the Full Conversion perk to a waifu for 15 Credits, plus the cost of First Augmentation if she doesn’t already have it. This increases the effective tier bonus for blue and copper star waifus by another point, but is only an increase for Silver Star waifus if you provide more specialized and advanced things to upgrade their form with. If you have Evolutionary Engine Array, your waifus at this level or higher will benefit from it as well.</p>
<p>If you have Multicore Neural Leyline, you can apply the Essence Upload perk to a waifu for 20 Credits, plus the costs of First Augmentation and Full Conversion if she doesn’t already have them. Your waifus do not have their own Cores. They instead utilize the same core network as you do, benefitting from them the same way and no longer suffering the drawbacks of hosting a core. They are technically under the umbrella of your hive mind, network, or extended soul network.</p>
<p>PvP note: If another contractor, whether they captured you or you captured them, has used this perk on you, take the appropriate perks for free the next time you have an account to access. The other contractor’s Tranhuman type will stack with your own, if you already have one, or lock you into theirs if you don’t. The remaining Transhuman Heritage perks, including Singularity, must be bought using your own funds.</p> `,
})

heritages.push({
  title: 'Multicore Neural Leyline',
  tree: 'Transhuman',
  type: 'Party',
  cost: 165,
  freebies: {
    defensePerks: ['Trace Defense', 'Destiny Defense', 'Wyldscape Defense'],
  },
  typeFreebies: {
    Biomorph: {
      talentPerks: ['Science Talent', 'Martial Talent'],
    },
    Cybermorph: {
      defensePerks: ['Mind Defense'],
    },
    Aethermorph: {
      talentPerks: ['Psychic Talent', 'Martial Talent'],
      defensePerks: ['Information Defense'],
    },
  },
  whitelist: ['Essence Upload', 'Essence Reactor'],
  table: [
    ['Core Size', 'Mass', 'Core size', 'Range'],
    ['Least', '1x', 'Baseball', '1km'],
    ['Lesser', '10x', 'Beachball', '50km'],
    ['Medium', '100x', 'Grizzly bear', '2,500km'],
    ['Greater', '1,000x', 'London bus', '(8m) 125,000km'],
    ['Grand', '10.000X', 'Large hot-air balloon (25m)', '6,250,000km (-2.09 AU)'],
  ],
  types: {
    Biomorph: `<p><b>Biomorph</b>: Larger cores are grown from Least Cores, and even morphs reduced to instincts may develop and grow into something resembling your true form should you wish. Lesser Cores or larger alleviate the stress of the Least Core on morphs within the larger core’s range. These morphs are not reduced to instincts, and act as part of a hive intelligence: what is ‘you’ is a conglomerate of the various intelligences. You are more like a corporation or nation unto yourself. As the overmind of this intelligence, only extreme circumstances would cause significant personality shifts due to new minds being brought in. You may accelerate the growth of a morph’s core by feeding it your loose(i. e.not in a morph of its own) smaller cores. We do not recommend growing a core larger than the morph it’s inside; the transition is quite painful. If you were not already capable of such, you may now communicate telepathically with things within range of an active core. You possess telekinetic abilities that scale with the number of cores within range. Finally, take the Science and Martial Talents for free.</p>
    <p>Medium Cores and larger will slowly infect the stationary solid matter in their environment with an organic substrate called creep. Creep is not a solid mass; rooms and corridors will naturally form inside it and will not be blocked off by further expansion. Your and your retinue’s things are immune to this. The base values for creep spread rates and range for each core size are all in the chart to the right. If part of a bed of creep is no longer within the limit of any active core’s range, that part of the bed will recede to the new boundary over the course of a week. Neutral and hostile sapient beings in contact with your creep will find their effective tiers reduced by varying amounts according to their tier and the size of the largest core sustaining that bed, to a minimum of Tier 1.  See the chart for specifics. This debuff applies at step 6.</p>
    <p>If you have Alterzelu Symbiotes, you may now directly convert larvae into Least Cores at a 1: 1 ratio. Doing so takes half the time it normally takes to create a core. For every Greater Core you possess, you may have an additional Queen. Support Queens follow the same rules as your first Queen. When you produce your first Grand Core, select one of your existing Queens to become an Empress. You can only do this once, so make it count. Your Empress is capable of producing one Royal larva at a time in only four days and is ranked above all of the support Queens in your swarm’s hierarchy - including your original Queen, if you chose another to be your Empress. If a support Queen qualifies for her own symbiote theme as per the regular rules, but your Empress has already imposed her own theme on the entire swarm, the two themes will hybridize in a natural way, but only in the lesser queen and her subordinates.</p>
    <p>Morphs hosting Medium Cores and larger may act as incubators for your Empress and Support Queens. Each active Medium Core increases the number of eggs your Empress will produce per reproductive cycle by a flat 10x multiplier: 1 every two days for the duration, 10, 20, 30, etc. Greater and Grand Cores count as 10 and 100 Medium Cores each for the purpose of all larva production. Each active Medium Core increases your support Queens’ egg count per cycle by a flat 100 %: 1 every cycle, 2, 3, etc. For regular larva production, your support Queens’ cycles are still two days long within a 28 - day spawning period(14 cycles in a row); for Royal symbiote production, their cycles are still 14 days long(one at a time). Each Grand Core counts as 10 Greater Cores for the purpose of your support queen cap.</p>
    <p>Possession of a Greater Core or larger allows you to melt down and fuse larvae into various forms. You may functionally purchase items from the Catch - a - Ride catalog at a rate of 25 larvae per effective Credit. These vehicles may not have a cost higher than 50 Credits if you have at least one Greater Core or larger, or 100 Credits if you have at least one Grand Core or larger. These are biological entities that approximate the function of the vehicle. More exotic abilities such as time travel are only possible if you’ve encountered an example of such before. These only function within range of an active core.</p>
    <p>If you possess a Primal Shroud, you may convert biomass into a core at a 50: 1 ratio. Additionally, all biomass within range of any core’s effect is considered to be in direct, sustained, contact with you. Finally, if you possess at least one Medium Core or larger, you may instead invest mass into creating vehicles the way that the Alterzelu Symbiote allows. Medium Cores can generate 1 effective credit per day, Greater Cores can generate 5, and Grand Cores can generate 25.  Your credit cap per vehicle is based on your largest core: 25 for Medium, 75 for Greater, and 150 for Grand.</p>
    `,
    Cybermorph: `<p><b>Cybermorph</b>: Larger cores are built from smaller ones, and even Least Cores may be networked together to replicate the effects of their greaters. Every 5 Least Core - equivalents networked together provide enough runtime to run the equivalent to two more instances of your consciousness. This runtime may be partitioned as desired from little more than a VI to hyper - intelligences worth multiple minds. Cores may be networked together, provided one is within range of another or they have direct line of sight. This means that in addition to creating a physical Greater Core, you may also create a temporary Greater Core when enough morphs come together. You may relay your intelligence through any electronic device you have hacked or interface with any technology within range of an active core. Take one copy of Mind Defense for free. You may also partition off runtime to create a digital world. The first instance dedicated to this creates an area of roughly 100 sq m, controllable as per Grand Manor. Every additional instance worth of runtime dedicated to this task doubles the available space.</p>
    <p>If you have Tempest Jewelry, you may create special equipment from them that allows you to digitize physical items or bring them forth from the digital world. Once converted, they no longer count as Tempest Jewelry for the purposes of your stock or capture. Each piece allows for approximately 1 cubic meter of space to be affected at a time. Targets with a will of their own must be willing or unconscious to make the transfer. If you are not currently simulating a digital world, they are simply stored in memory until retrieved.</p>
    <p>Depending on the largest - sized Core you have, you benefit from a multiplier to both your daily restock rate of Tempest Jewelry and your total reserve cap, applied after all additive modifiers from captures and Additional Stock and then rounded up to the nearest whole number. See the table to the right.</p>
    <p>If you possess a Cyber Shroud, you may digitize anything that your Shroud envelops, though digitizing targets with a will requires cooperation, unconsciousness, or suffusing them with your own will. You may also directly replicate the effect of Tempest Jewelry above. Anyone within your digital world is functionally cocooned by your Shroud.</p>
    `,
    Aethermorph: `<p><b>Aethermorph</b>: Your original soul and consciousness has become an Oversoul. By sacrificing a core, you can create component souls or upgrade an existing one to a higher level. There is a soul - stage that corresponds to each stage of cores. Each component soul is an instance of your consciousness, capable of individuality but absolutely obedient and subordinate to the souls above it in the hierarchy. A soul may have seven component souls of a level below, possessing all of their skills and abilities, though this awareness is primarily unconscious.</p>
    <p>The sacrifice of a Least Core creates a T1 Soul, which may, through training and effort, grow to at most a T2. A Lesser Core creates a T3 that may grow to T4. A Medium Core creates a T5 that may grow to T6. A Greater creates a T7 that may grow to T8, and a Grand creates a T9. While their power is reduced, component souls may grow on their own to certain limits. No soul may ever exceed the power of your Oversoul. At any time, any component of your soul may summon another or summon themselves to them.</p>
    <p>You may change your Element a third time. Your component souls will possess smaller sections of your Element. For example, if your Element is Fire, a soul directly beneath your Oversoul might have an Element of Embers, and one of its souls may have an Element of Ashes. Subordinate souls’ elemental affinities stack with those of higher souls, much like a Dragon’s element will with a Shroud.</p>
    <p>The weight of your soul may influence the souls of those nearby. Souls sleeved into a morph may influence those within range of its core whose Tier is lower than their own. The greater the difference in Tier, the greater the control. A T2 within range of a T2 component soul may feel a mild urge or itch to do as you desire without really knowing why, while an Extra in range of a T10 would be irresistibly compelled.</p>
    <p>Finally, take Psychic and Martial Talents for free.</p>
    <p>If you have Ritual Circles, you gain the ability to use them to create places of power. You may now convert objects, structures, and places into phylacteries, provided the entirety of the structure or landmark fits within the circle in at least one dimension. This otherwise works like creating a living phylactery.</p>
    <p>If you have a Burial Shroud, you may replicate the above effect by infusing a portion of your soul into an object or place as if it were a potential waifu or husbando. Treat objects large enough to act as a Least or Lesser Core as blue - star waifus, objects or places that could act as Medium or Greater Cores as copper - stars, and locations that could act as Grand Cores as silver - stars for the purposes of conversion. This ignores the standard scaling for core production. Waifus and followers may also create cores and places of power via rituals that take 100 times longer than it would for you to do so yourself. Finally, any meaningful concentrations of your Element, within range of even an inactive core, count as intense contact with your Shroud. These include a target acting tyrannical when your element is Tyranny, or baking in the heat of a forge if your Element is Fire.</p> `,
  },
  desc: `
<p>You are no longer limited to a single line of consciousness. At this stage, your mind has expanded even further, the specifics of this vary by Transhuman Type. Take one copy each of Trace Defense and Destiny Defense for free.</p>
<p>You may upgrade or combine your Cores into larger, more powerful forms, expanding the limit on the number of active consciousness you have at any moment in time. The effort and mass these possess is measured in Least Cores. Each Core has a range, given in parenthesis.</p>
<p>Unless stated otherwise, larger cores are identical in function to Least Cores. Lesser Cores and larger have an Essence Reactor at their center. Greater Cores and larger allow for additional Essence Reactors to be active at a time: 1 per Greater Core and 10 per Grand Core. If you possess an Elemental Shroud, anything within range of a Greater Core or larger is considered to be in light contact with your Shroud, even if you do not possess Elemental Loom.</p>`,
})

heritages.push({
  title: 'Incandescent Ascendancy Machine',
  tree: 'Transhuman',
  type: 'Self',
  cost: 195,
  freebies: {
    defensePerks: ['Fatality Defense', 'Paradox Defense'],
  },
  typeFreebies: {
    Biomorph: {
      talentPerks: ['Engineering Talent'],
      defensePerks: ['Mind Defense'],
    },
    Cybermorph: {
      talentPerks: ['Engineering Talent', 'Soul Talent'],
      defensePerks: ['Body Defense'],
    },
    Aethermorph: {
      defensePerks: ['Destiny Defense'],
    },
  },
  whitelist: ['Multicore Neural Leyline', 'Pocket Apartment'],
  types: {
    Biomorph: `<p><b>Biomorph</b>: You are purely psionic, anchored to the physical world by your genetic code. Take Engineering Talent and one copy of Mind Defense for free. If a single example of your genetics continues to exist, so too shall your mind persist, though the amount of your consciousness and power that you can bring to bear is limited by the available biomass and neural tissue. All of your cores, even Least Cores, act as individual consciousnesses and relays for your true self, but you are able to guide even the smallest instances of your being even outside of that range. Fine control is limited while outside the range of a core; you can give them goals, but not control specific actions.</p>
    <p>Possession of a Master Core removes the credit cap on vehicles created via Symbiote larvae or your Primal Shroud. Any morph with a Greater Core or higher may now freely draw and dismiss things within it to and from the Pocket Apartment. You may use this material to repair your true form. Master Cores spread creep at a rate of about 36. 169 m per second, up to a limit of 3, 125 km. A Master Core’s presence in a continuous bed of creep will reduce the effective tier of neutral and hostile blue- star sapient beings by 2, copper - stars by 5, silver - stars by 4, gold - stars by 3, and T11s by 2, to a minimum of Tier 1.  This debuff applies at step 6.  Master Cores partially warp reality around themselves. Unless you allow otherwise, any entity within an area equal to the size of your Pocket Apartment(with upgrades) has its effective tier reduced by an additional 1, to a minimum of 1, stacking with the effects of creep. This affects even T11 targets.</p>
    <p>If you have Alterzelu Symbiotes, a capture target who trespasses on your creep risks being encased by creep and pulled into the nearest Medium Core or larger with spare capacity in that network, where they will be pumped full of transformative fluid and captured like anyone else.  Medium Cores can only hold one victim at a time, Greater Cores a few dozen, Grand Cores around a thousand, and Master Cores can hold tens of thousands. Your Medium and larger cores count as you for the purpose of confirming a symbiote capture. Each Master Core counts as 1000 Medium Cores for the purpose of larva production and 100 Greater Cores for the purpose of your support queen cap.</p>
    <p>If you have a Primal Shroud, any instance of your genetic code, from a spore, to even cells not completely broken down in a creature’s digestive tract count as contact with your Shroud.</p>
    `,
    Cybermorph: `<p><b>Cybermorph</b>: Take Engineering Talent, Soul Talent, and a second copy of Body Defense for free. You are purely digital, a fractal code capable of existing on any technology. Even one instance of technology infected by your program is capable of recreating the entirety of your consciousness, though your mind is limited by available hardware. If it can run Doom, it can hold enough of you to count.</p>
    <p>Your Pocket Apartment has become partially digital, acting as a bridge between your digital world and more physical ones. Even if you dedicate none of your runtime to it, your digital world is at least as large as your Pocket Apartment and benefits from any and all upgrades to such. You may alternatively dedicate runtime to accelerating time inside your digital realm relative to the outside world.</p>
    <p>If you have Tempest Jewelry, the restock and reserve multiplier from a Master Core is 50x.</p>
    <p>If you have a Cyber Shroud, any interaction with technology which has a fragment of your code on it counts as contact with your Shroud.</p>
    `,
    Aethermorph: `<p><b>Aethermorph</b>: You have become a living, thinking concept. Take one copy of Destiny Defense for free. Your Oversoul is merged with your Pocket Apartment, becoming the beginnings of a world - body, a Jouten. So long as one phylactery exists, even the destruction of all of your souls in the astral world will not truly kill you, for these items may act as a catalyst to rebuild your soul piece by piece. Your Jouten may act as an afterlife for your waifus and followers should you wish. Unless your waifus are upgraded into Aethermorphs like yourself, or you possess Warranty Plan, they remain dead.</p>
    <p>By sacrificing a Master Core, you are now capable of elevating yourself beyond the limits of an Oversoul, allowing you to make seven more Oversouls below you, seven direct component souls each for them(including any that you already had at that stage), and so on. You may change your Element a final time.</p>
    <p>If you have a Burial Shroud, when creating places of power, targets that are large enough to act as a Master Core take as long as gold - star captures. Additionally, any interaction with an intense example of your Element counts as contact with you, as your soul is one with every such instance of it. This includes things as simple as someone casting a spell if your element is Magic or being outside at night if your element is Stars. Sufficiently powerful divinities and other entities with authority over the same element may contest your control or even bar you access to their domains, shielding their followers from this effect.</p> `,
  },
  desc: `
<p>Rudimentary creatures of form and flesh, simplistic souls of machine and magic, they touch your mind, fumbling in ignorance, incapable of understanding. There is a realm of existence so far beyond their own that they cannot even imagine it.</p>
<p>You are beyond their comprehension.</p>
<p>You. Are.</p>
<p>You have transcended the purely physical and are now a radiant being of energy and patterns and information. Take one copy each of Fatality Defense and Paradox Defense for free. Your upper and lower bounds of consciousness have been expanded. You may now create a Master Core, which requires 100, 000 Least Cores’ worth of effort and mass to create. A Master Core is about the size of a modern zeppelin(75 m) and has a range of 312,500,000 km(~104.45 AU). Each Master Core allows 100 additional Essence Reactors to be active at a time.</p>`,
})

heritages.push({
  title: 'Singularity',
  tree: 'Transhuman',
  type: 'Self',
  cost: 11111,
  whitelist: ['Incandescent Ascendancy Machine'],
  desc: 'Surpassing limitations is the very nature of transhumanism. Choose a second Transhuman Type. All Transhuman perks treat you as having both types. When the aesthetics of two Transhuman types conflict, you may determine which one takes precedent. ',
})

heritages.push({
  title: 'Lurking On The Threshold',
  tree: 'Outsider',
  type: 'Root',
  freebies: {
    talentPerks: ['Body Talent'],
    defensePerks: ['Mind Defense', 'Wild Defense', 'Environmental Defense'],
  },
  cost: 100,
  desc: `
<p>The Outsider is a figure of countless contradictions - unknowable by nature yet known to itself, an enemy to the natural order and an agent of a greater symphony. Such paradoxes should define it inexorably out of existence and see it chased to the thresholds of possibility by the power of reason, but now they find a new resolution: a resolution in you. Emerging from the chrysalis and the cage of your former self, you are both well at home in the chaoskampf beyond the symbolic order and transcendent above the petty and limpid hazards of a base reality. Take Body Talent and one copy each of Mind Defense, Wild Defense, and Environmental Defense for free.</p>
<p>Moreover, though you may still be able to pass for your former self for a time, you’ll gradually begin to shed that seeming in favor of your new form, whatever that may be. The gross anatomy and aesthetics of your new form are up to you - though, it will be at least moderately superhuman to start with, it will always be at least moderately inhuman, and its ability to defy the ordinary limits of physiology will scale with your maturity as an Outsider and the depths of your esoteric knowledge. Combat - capable tentacles and buckets of ejaculate are traditional, but only one possible path of many.</p> `,
})

heritages.push({
  title: 'I Wear No Mask',
  tree: 'Outsider',
  type: 'Self',
  cost: 45,
  freebies: {
    talentPerks: ['Communication Talent'],
    defensePerks: ['Information Defense'],
  },
  whitelist: ['Lurking On The Threshold'],
  desc: `
<p>Eternally slinking in from its revelry at the edge of the known world, the Outsider is well accustomed to the meaningless pretenses of other beings.</p>
<p>You are capable of seamlessly guising yourself to fit expectations and walk among any social order you encounter: not only do you enjoy the benefits of Communication Talent for free as a result of your uncanny insight, but you can change your form and outward appearance almost without limit for purposes of interacting with a social species. Such guises can even warp the aesthetics and manifestations of your non- Outsider abilities to fit a mold, but no ordinary scrutiny will ever see you caught out as the alien that you really are - your new peers will sooner think you a strange cripple or an uncanny superman than a true manifestation of the Other. Take one copy of Information Defense for free.</p>
<p>Though exceedingly flexible and powerful, the veil of this power is borne of your ability to lie with the truth: to present yourself as a known unknown, rather than known or unknowable. You can’t use it to impersonate specific individuals, and any who too closely match the demographic and profile of whatever guise you adorn may be able to recognize that you aren’t truly one of them. How they react to that knowledge is up to them.</p> `,
})

heritages.push({
  title: 'Sanity - Shattering Instruction',
  tree: 'Outsider',
  type: 'Lure, Party',
  cost: 100,
  freebies: {
    talentPerks: ['Talent Sharing(All)'],
    defensePerks: ['Mind Defense', 'Information Defense'],
  },
  whitelist: ['Lurking On The Threshold'],
  desc: `
<p>An Outsider speaks, and its acolytes tremble without fail before the weight of its words - and yet the horror of a revelation lies not in the contents of its unveiling but in the reminder that the veil was ever able to exist at all. Resolving this paradox requires accepting the power of the Real.</p>
<p>While lesser beings have to warp their devotees into new configurations just to arm and empower those fragile servants, you bring enlightenment alone to those who sit and learn, and enlightenment is all they need: take a free purchase of Talent Sharing for free for every Talent you possess yourself. Furthermore, those who learn under your tutelage don’t even need to be a member of your retinue in order to enjoy the benefits of your Talent Sharing, and you are always able to teach yourself and others any secret, forbidden, or heretical lore of the world(s) you’re currently inhabiting, regardless of whether you actually know the lore in question. This also extends to lore surrounding your Elements and Omens, if you have them. Additionally, take one copy each of Mind Defense and Information Defense for free.</p>
<p>However, your every instruction serves as an infallible reminder of the mouth which gives it. The more other beings learn from you, and the more important your teachings are to them, the more compelling you become, until you loom in their minds like a source of all truths.</p> `,
})

heritages.push({
  title: 'Endless Gospels Unspoken',
  tree: 'Outsider',
  type: 'Lure, Party',
  cost: 30,
  whitelist: ['Sanity - Shattering Instruction'],
  desc: `
<p>All words find their limit in the Outsider, for the essence of the Outsider is that which remains when words fail - not a figment of confusion given form, but the chaos that existed before the dawn of reason and which remains yet unbroken beneath the weight of rationale.</p>
<p>Those you teach or instruct on any matter no longer need to be able to understand the ideas you present in order to make use of them as if they did: your wisdom bypasses the bottlenecks of comprehension and metacognition in order to be heard on a far more profound level. This greatly accelerates the learning of your pupils, but it also applies to other nominally language - dependent abilities - allowing you to give complex orders and suggestions to subjects who don’t understand what they’re being compelled to do or if they’re being compelled at all, for example.</p> `,
})

heritages.push({
  title: 'Beyond The Wall Of Sleep',
  tree: 'Outsider',
  type: 'Lure, Party',
  cost: 100,
  freebies: {
    defensePerks: ['Body Defense', 'Body Defense', 'Stress Defense', 'Stress Defense', 'Fatality Defense'],
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
  title: 'Prophet Of Paradox',
  tree: 'Outsider',
  type: 'Self, Lure',
  cost: 145,
  freebies: {
    talentPerks: ['Psychic Talent'],
    defensePerks: ['Soul Defense', 'Paradox Defense'],
  },
  whitelist: ['Sanity - Shattering Instruction', 'I Wear No Mask'],
  desc: `
<p>The Other is a projection; the Real, an abstraction. To speak of the Outsider’s absolute existence is to speak of the ineffable, to gesture at shadows - and yet it moves all the same.</p>
<p>Take Psychic Talent and one copy each of Soul Defense and Paradox Defense for free. All time others spend in telepathic or spiritual contact with you now counts, at your discretion, as time spent training under your own direct instruction. Moreover, whenever you show your true form, anyone who makes primary sensory contact with you - that is, anyone who sees or hears you, for humans - also makes telepathic contact with you.</p>
<p>Finally, your total union with the unknowable reveals to you all secrets. You may retroactively spend unused time in order to learn anything you are capable of teaching yourself with Sanity - Shattering Instruction, and you are incapable of being deceived: you recognize all lies, including lies of omission, see through all forms of illusion and disguise, and all of your senses operate through infallible claircognizance.</p> `,
})

heritages.push({
  title: 'Everywhere And Nowhere',
  tree: 'Outsider',
  type: 'Self',
  cost: 150,
  freebies: {
    talentPerks: ['Everlasting Talent'],
    defensePerks: ['Wild Defense', 'Wyldscape Defense'],
  },
  whitelist: ['Lurking On The Threshold'],
  desc: `
<p>A procession of signs and symbols marches always in the name of the Outsider’s terror and glory, but they will never be more than the warning signs that precede it.</p>
<p>Your presence is intrinsically heralded by some specific aspect of reality - be it mirrors, particular arrangements of angles, opal gems, or something stranger. All examples of this Omen within the same cosmology as yourself are always considered eligible targets and destinations for any sensory and movement abilities you possess - mundane abilities included - and you can always use your senses as if co - located with your own Omens. The more specific and esoteric your Omen is, the less mental attention and focus it takes to project your awareness through them.</p>
<p>You have some power and control over your Omen. Treat this as an elemental affinity as per Dragon Scale. If your Omen is ineligible or undesirable for implementation as an Element, you may pick a conceptually associated Element instead, and sensibility is not required. Mirrors may open into the depths of your oceans instead of reflecting space; opals may pulse with unearthly color and light instead of manifesting the power of the earth.</p>
<p>Finally, take Everlasting Talent and one copy each of Wild Defense and Wyldscape Defense for free.</p> `,
})

heritages.push({
  title: 'Elder Sign',
  tree: 'Outsider',
  type: 'Other Control',
  cost: 30,
  freebies: {
    talentPerks: ['Aesthetic Talent'],
  },
  whitelist: ['Everywhere And Nowhere'],
  desc: `
<p>In their ignorance, cargo cults ape the achievements of their betters - but those who fall for such follies are ultimately no more ignorant than any other men. Why should their efforts go unremarked ?</p>
<p>Take Aesthetic Talent for free. Your emblem no longer needs to be applied via your stamp, and it may still be applied to useful effect even if you’ve purchased other Binding methods: any sufficiently accurate recreation of your emblem’s pattern, placed upon a person’s skin, may be used to claim them. Scale doesn’t matter, and all such markings will correct themselves after the normal waiting period.</p>
<p>However, these markings come with major caveats: they’re subject to no anti - memetic screening to keep their presence from being noticed, and they may easily be physically disrupted before their 72 - hour waiting period is over.</p> `,
})

heritages.push({
  title: 'Branded by Possibility',
  tree: 'Outsider',
  type: 'Self',
  cost: 150,
  freebies: {
    defensePerks: ['Destiny Defense', 'Paradox Defense'],
  },
  whitelist: ['Everywhere And Nowhere'],
  desc: `
<p>Men touch the Outside only when reason fails them - where they are torn bleeding from their illusion of a small, safe, and predictable universe, left scarred for life.</p>
<p>Take Destiny Defense and Paradox Defense for free. The reach of your connection to your Omens now extends seamlessly across any cosmologies you’ve ever inhabited, as if you were a part of all of them at once. Furthermore, if you desire it, any effect or phenomena you create within the domain of your Omen or Element will now last indefinitely until forcibly dispelled, as a lasting distortion to the natural order; all such effects gain an additional resistance to being dispelled proportionate to your maturity as an Outsider and the depths of your esoteric knowledge.</p>
<p>If you have an appropriate Shroud, then you may use a distortion sustained by this perk as an anchor for your will, transforming it into a lasting Shroud manifestation. This eliminates the need to sustain it via your own directed will, but is still subject to other limits.  (Three - Piece Suit and Elemental Loom may be helpful. ) You may also qualify for Adjustment Field with this perk and use it on anyone in contact with one of the lasting distortions you’ve created.</p> `,
})

heritages.push({
  title: 'The Gate And The Key',
  tree: 'Outsider',
  type: 'Self',
  cost: 150,
  freebies: {
    talentPerks: ['Soul Talent'],
    defensePerks: ['Destiny Defense', 'Wyldscape Defense'],
  },
  whitelist: ['Everywhere And Nowhere', 'I Wear No Mask'],
  desc: `
<p>The Outsider skirts the borders of possibility within society and reality alike, estranged from both of them in equal measure. This is both its greatest power and its greatest weakness.</p>
<p>Your connection to your Omens stretches across all of time and space, and you have become your own reality in every way that matters. It no longer takes you any amount of mental attention to channel your awareness through your Omens, and you may also channel any of your other abilities through your Omens by paying the same cost of focus that you would have previously paid for scrying.</p>
<p>Moreover, your existence is completely severed from dependency, as a being beyond worlds; take Soul Talent and one copy each of Destiny Defense and Wyldscape Defense for free. You can travel freely through the multiverse, and even navigate the time axes as you choose, but you can neither break causality nor enter a world and take it fully into your reach before it has ‘invited’ you in. Such a summoning consists of a critical mass of your Omen, and is always a prolonged and interruptible affair that will be noticed by a world’s inhabitants in advance, but you can send in your own retinue and make use of your teaching- related Outsider abilities to orchestrate your entrance if need be.</p> `,
})

heritages.push({
  title: 'An Answer To Reason',
  tree: 'Outsider',
  type: 'Self',
  cost: 11111,
  whitelist: ['Prophet Of Paradox', 'The Gate And The Key'],
  desc: `
<p>You are capable of teaching the members of your retinue how to become Outsiders; they gain their own true forms, their own Omens, and their own Elemental affinities in the process, acting with all of your Outsider abilities except for Elder Sign and Endless Gospels Unspoken.</p>
<p>As your Heralds, their teaching effects are extensions of your own authority, and draw their students towards you instead of them; likewise, you may treat your Heralds as if they were your own Omens, and they always count as a critical mass of your own Omen for purposes of summoning you into a world.</p> `,
})
