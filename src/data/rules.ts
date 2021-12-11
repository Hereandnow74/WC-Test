export const startingDesc = `<h3 class="font-bold text-lg">Creating Your Build</h3>
<p>First, pick a starting world. Depending on that world’s danger rating, measured on a scale from 1 to 10, you’ll be assigned a number of credits with which to make the rest of your purchases. Danger ratings are weighed based on the power of the typical combatants, the average danger level to ordinary people living in that world, and especially the actual cost of what might be needed to survive in that world. Additionally, as you may choose when you enter a world, doing so during an active apocalyptic scenario may raise a world’s rating by one or even two tiers. Specific worlds and their ratings are listed <router-link class='text-blue-500' to='/world'>here</router-link>.</p>
<p>Next, modify your starting budget by your intensity multiplier. The base multiplier is 1x. This multiplier is modified using the co-operative and PvP options found in the CYOA Modes section. All changes to the intensity multiplier are additive.</p>
<p>Now that you know your budget, pick an Origin, one Binding-type control, and as many of the Lure-type controls, Perks, and waifus or husbandos as you can afford. The company’s Waifus and Husbandos are all clones manufactured on demand, except where noted. They come packaged with their iconic outfits, personal equipment, and familiars or treasured pets, when appropriate. The largest equipment normally allowed are motorcycles, but there are some rare exceptions. For your own ease of accounting, you may only purchase one copy of any distinct entry at a time. They are sorted into eleven tiers, each of which has a different cost. </p>
`

export const captures = `<h3 class="font-bold text-lg">Extending Your Build: Captures</h3>
<p>Additional waifus or husbandos may be acquired by “capturing” them in their homeworlds. This is typically achieved by using a Binding-type or certain Other Controls, or when a target gives you a sincere confession of love - usually romantic, but false positives occasionally happen and trigger a capture that isn’t entirely merited. This love may be assisted by any means, including the use of Lure-type controls or third-party mind control.</p>
<p>Capturing a Tier 1-10 target adds 60% of the list price for their effective tier after step 1a to your account, rounded up to the nearest whole number. Capture credits are not granted for local versions of targets that you’ve purchased or alternate versions that you’ve already captured once, unless they’re a unique entry in the lists proper or as a waifu perk.</p>
<p>If you capture a character “early,” before they’ve achieved the potential reflected in the version available for purchase, you will still receive their full capture value. As compensation for the subject’s relative weakness, we at the company will download the missing abilities and a framework for the missing skills into your capture target at no charge. You’ll have to find any missing equipment or familiars and provide the subject with the training needed to master their new power on your own time.</p>
<p>Subjects not named on any list may also be captured for credits, provided they have at least two of the following in their original canon: name, personality/backstory, abilities/skills/powers, and appearance/design. As an author, you must rate these characters’ tiers yourself. Individuals who fail this test are worth 0 (zero) credits.</p>
<p>For any member of your retinue whose powers come from an external, (semi-)sapient source, their connection will be severed at the moment of capture and those powers replicated as innate abilities. If they have powers that rely on a background magical field, the connection to you will act as an adapter in worlds with a different field. In worlds or regions that lack any such field, their powers will still be usable, but at a reduced capacity when outside of your presence. All retinue members whose power comes with a crippling, categorical weakness, such as vampires, Kryptonians, or Devil Fruit users, will be no more affected by that weakness than an ordinary human. Both of these processes have already been applied to all purchased retinue members, regardless of whether or not they’re bound. The latter will also apply to you, if you accept such a power.</p>
`

export const effectiveTiers = `<h3 class="font-bold">Effective Tiers</h3>
  <p>A person's tier can be affected by outside sources - whether that means you, another Contractor, or some other quirk of fate. To calculate a person's effective tier, follow these steps:</p>
  <ul>
    <li>1.  Waifu’s unmodified tier. This is the number given in her Catalog entry.</li>
    <li>a.  Apply any waifu perks.</li>
    <li>2.  Apply any permanent bonuses from Heritage perks.</li>
    <li>3.  Account for any abilities or skills that the individual waifu has that are not present in the standard model.</li>
    <li>4.  Account for any special or empowering equipment that the individual has.</li>
    <li>5.  Apply any effects from Binding-type controls.</li>
    <li>6.  Apply any conditional or other temporary effects from Heritage perks or personal abilities.</li>
  </ul>
  <p>Many individuals' powers rely on henshin devices or other special equipment that they can be easily separated from and reduced to, usually, only T1-T3. These items are accounted for in their listed tiers, but not included in their effective tier calculations until step 4.</p>`

export const familiars = `<h3 class="font-bold text-lg">Familiars</h3>
<p>Broadly speaking, a familiar is any individual in your retinue that isn’t a member of your harem proper. This can include beloved pets, support staff, adopted children, people important to your harem that you aren’t interested in maintaining an emotional and sexual relationship with, or more traditional magical beasts such as Pokémon or magical girl mascots. Many purchasable waifus are packaged with their familiars and specified as such in the setting-specific rules; this is by no means a comprehensive list. Some familiars named in the setting-specific rules are humanoid or even present in the catalog listing as waifus or husbandos. Humanoid familiars are worth capture credits; if you capture their master first, you’ll get the familiar too and receive the full value for both.</p>
<p>Familiars can be captured using local familiar-bonding methods, such as rituals or Pokéballs, or Binding-type or Other controls like anyone else, and are not subject to the romantic or sexual interest that your Bindings instill in your waifus or husbandos. If a humanoid familiar is bound to you by local methods, they will count as captured for all purposes. No special methods are needed to distinguish a waifu/husbando binding from a familiar binding; intent is enough.</p>
`

export const purchases = `<h3 class="font-bold text-lg">Extending Your Build: Purchases</h3>
<p>No matter your choices, you will receive one and only one complimentary smart device of your choice, preloaded with the company’s shopping app so you can manage your purchases and trade-ins on the go. This app’s listings include descriptions of each listed character, including all major ability and skill tags and a short summary of their personality, so you know exactly what you’re paying for. Rule 63 variants are available for every character at no extra cost.</p>
<p>You and your waifus are the only ones who can perceive or use any company app, but only you can make any transactions through this one. This device cannot be hacked. If this device is ever broken, it will repair itself completely the next time it isn’t observed.  If this device is ever more than 10m away from you or any of your waifus for more than 15 minutes, it will teleport into your pocket. If the local space is too warped for that distance to be accurate, you may also recall it manually; the same principle applies in digital worlds, even if you have a physical body “outside” in meatspace. If one of your waifus is using this device for any purpose and you ask for it back, she'll hand it over immediately without question.</p>
<p>Some Controls and Heritage perks include free copies of lesser perks, primarily Talents and Defenses. If you’ve already purchased a perk before getting a free copy, you may take a discount on the new purchase equal to the free perk’s value. The total of all discounts applied to a single perk, unless it’s a Talent or Defense, is capped at -80% of the list price, with the post-discount price rounded up to the nearest whole number.</p>
`

export const sales = `<h3 class="font-bold text-lg">Extending Your Build: Sales</h3>
<p>If you only wanted a capture for their credit value, you may ship them to us at the company for 20% of the list price for their effective tier after step 4, again rounded up to the nearest whole number. A target’s capture and sale values combined cannot be higher than the list price for their effective tier after step 4. Humanoid familiars gained for free from an Origin choice will not count for capture credits; their sale value is still 20% of the list price for their effective tier after step 4, rounded up to the nearest whole number. If a subject’s capture value is zero, their sale value will also be zero. Selling a subject only takes a single button press in the company app on your smart device. We’ll reprocess the captures and send them where they need to go. Otherwise, captures are yours to keep.</p>
`

export const waifu11 = `<h3 class="font-bold text-lg">These Waifus Go Up to 11</h3>
<p>Tier 11 waifus are not bought with standard credits. They instead require a special ticket, only available for starting builds on Danger 11. If you choose this instead, ignore the entire list of regular waifus. Instead, go to the Tier 11 list on the fifth page of the spreadsheet and spend your special ticket on one and only one of the waifus there. You must spend this starting ticket on a Tier 11 waifu or husbando. Tier 11 waifus that are listed as Perks or Waifu Perks have further details in the appropriate section below. Heritage and other Perks that cost a T11 ticket cannot be purchased in a starting build.</p>
<p>Captured Tier 11 waifus may be shipped back to the company for an additional ticket, on top of the reward for capturing one in the first place. If, after your starting build, you ever find yourself with a spare Tier 11 ticket and nobody you want to buy with it, you may exchange it for 2000 credits. This cannot be undone.</p>
<p>All Tier 11 waifus are freely capable of multiversal travel, even if they showed no such abilities or explicitly could not in their original canons.</p>
`

export const danger11 = `<h3 class="font-bold text-lg">Danger Rating 11 Build Rules</h3>
<p>When creating a Danger Rating 11 build, ignore the basic build creation rules found above. You will instead start with the following:</p>
<ul class="list-disc list-inside">
  <li>One T11 ticket. You must spend this on a waifu or husbando.</li>
  <li>Any Origin, free of charge. Substitute and Possess are limited to T6 and below.</li>
  <li>A single Binding-type control -the basic binding only.</li>
  <li>As many official Lures as desired - the basic Lures only</li>
  <li>All official Basic Talents and both purchases of all official Defenses</li>
  <li>A 400-credit budget for your Heritage.</li>
  <li>A 545-credit budget for Catch-a-Ride.</li>
  <li>A 500-credit budget for Demiplanes & Dungeons.</li>
  <li>A single 600-credit budget for all other official perks found in this catalog.</li>
</ul>
Once your build is finalized, any leftover credits will carry forward to your regular account. This remainder may not be accessed before seven days (168 hours) have passed and may be used for any purpose. You may start in any world you like, regardless of the above Danger restrictions. If you start in your waifu’s homeworld, Yoink will automatically be applied at no cost. Go anywhere you want, follow the special rules, and have fun.
`

export const creditValue = `
<h3 class="font-bold text-lg">PvP Credit Value</h3>
<p>This is the sum of the list prices for you and your retinue’s effective tiers after step 5, plus the combined list prices of your Controls, Catch-a-Ride vehicles, Talents & Defenses, and Demiplanes & Dungeons perks. Tier 11s are valued at their tickets' exchange rate of 2000 credits.</p>
`
export const pvpRules = `
  <h3 class="font-bold text-lg">Gauntlet(Continuous PvP)</h3>
  Starting one week into your journey, another contractor will appear in your current world, with their own
  agenda and retinue of waifus and / or husbandos. All opposing contractors will have legal builds. Their budgets
  are equal to your PvP credit value, at chargen or the end of the previous round, plus 1 % of that sum per
  contractor you’ve defeated(non - compounding) and then rounded up to the next whole number.

  <div class="my-4">
    <p>In formula form:</p>
      <code class="text-xl ml-4">P * (1 + E / 100)</code>
    <p>P = Your PvP credit value</p>
    <p>E = Number of eliminated Contractors</p>
  </div>

  <p>Each time you defeat or otherwise handle another contractor, you will have seven days to rest before encountering a
  new one, with more experience and skill than the last. Their expenses will be more optimized; their retinue members
  will be more divergent from their canon selves in ability, equipment, and personality; and the more third - party
  resources they’ll have. The qualitative side of this difficulty ramp stops after 50 victories, though your opponents’
  budgets will continue to increase. The rest period between challengers will decrease by 24 hours for every seven wins
  you accumulate, to a minimum of one hour.</p>

  <h3 class="font-bold text-lg">NTR is a Trash Fetish(PvP Capturing)</h3>
  <p>If a member of a retinue is captured by an enemy and held in their territory(whether that territory is purchased from the company or acquired locally) for a period of 24 hours, the hostage loses the benefits of Creature, Stress, Mind, Addiction, Wyldscape, and Corruption Defenses until rescued. The timer begins only when the hostage is both defeated and restrained, and it will reset if they are touched by their master or leave enemy territory unrestrained. The timer will pause if they leave while still restrained by the enemy.
  Once the timer has run its course, the kidnapper is free to use any bindings, lures, or third - party mind control methods they have as if the hostage were free. Targets stolen from another contractor are worth 0 capture credits, but may be sold at the usual rate, adjusting for their effective tier after step 4. T11s are an exemption to this and maintain their normal rates for capture and sale. Recapturing one of your own waifus does not grant any credits.
  All of the above applies to both Gauntlet and unregulated PvP.</p>
  
  <h3 class="font-bold text-lg">Special Gauntlet Rules</h3>
  <p>Yoink and Substitute are not available in Gauntlet PvP. Unlike in other modes, a new Gauntlet participant’s starting
  world is hidden from them. The client still chooses their starting world’s danger rating, but the master of their
  story chooses which world within that danger rating the client begins in.</p>
  To better facilitate meaningful conflict, the following debuffs of other perks are in place for any interactions
  between you(and your retinue) and your opponent(and their retinue). These debuffs do not apply to interactions
  between yourself and natives of your current universe or contractors encountered outside of PvP matches.
  If you have a Pocket Apartment or higher, the location is integrated into the local environment for as long as
  you’re connected to that world. The locals will not notice its appearance or disappearance. Conjunction, Apportation,
  and Warranty Plan’s killswitch are all disabled while on your opponent’s home turf. Body, Wild, and Soul Defense are
  disabled for PvP encounters as well.
  <p>Warranty Plan’s resurrections will not occur until the current match ends. At that point, the winner may pay to
  respawn any slain members of their opponent’s retinue into their own for the purchase price equal to that of the
  member’s effective tier up to step 4. You may also revive slain opponents into your retinue for free, with a one - 
  time genderbend for each if your orientation demands it. These two opportunities are lost if not used. Defeated
  opponents otherwise function identically to your other retinue members. They keep their heritages, but their binding
  methods are replaced by yours.</p>

  <h3 class="font-bold text-lg">Gauntlet Conditions</h3>
  <p>You may personalize the difficulty of your Gauntlet PvP experience with the following options. Budget increases are
  additive and are determined based on your starting budget, before any purchases, except where noted. If taken with a
  Danger 11 start, the extra funds are calculated relative to a starting budget of 4, 045 and will become available
  immediately after character generation.</p>`

export const services = `<h3 class="font-bold text-lg">Clientele</h3>
<p>We the company do actually have regular clients. Clients use their own local currency to buy clones made from the waifus, husbandos, familiars, and other retinue members Contractors pick up in their operations. These products are stamped with company tattoos keyed to their new owners. A Contractor encountering a Client and their purchase during the course of their operations is rare, but not unheard-of.</p>
`

export const salary = `<h3 class="font-bold text-lg">Contractor Salary</h3>
<p>As one of our contractors, you are entitled to a monthly salary of 10,000 USD or the equivalent in your homeland’s currency. This will be deposited directly into your smart device’s account, so you can convert it to the local money systems of the worlds you visit. On-the-spot fabrication of physical currency or coinage is included at no extra cost.</p>
<p>Bonus pay is also available for each month. This is valued at the sum of the list prices of all captures you’ve made for that month, including earned waifu perks. Tier 11 characters count as 2000 credits. For this purpose only, 1 credit is equal to 100 USD.</p>
`

export const helpDesk = `<h3 class="font-bold text-lg">Help Desk Hotline</h3>
<p>If you, a contractor, have questions about any company function, perk, a retinue member’s capabilities, or even is just in a bind locally and doesn’t know what to do next, you need only call the Help Desk and ask. Trained operators are standing by at all times to hear you out. A dedicated app on your smart device allows you to access this free service with just a single tap. Just give a detailed description of your current situation and how it relates to your question, and the operator will answer and (if you’re in a bind) offer some possible solutions. A direct scan of your last seven days of activity will be made - ignoring your <b>Information</b> and <b>Trace Defenses</b> - for our records and to help our operators understand the full context, but don’t worry. Your information is strictly confidential. Not even our operators will remember your situation between the end of one call and the start of the next.</p>
`

export const loans = `<h3 class="font-bold text-lg">Loans and Credit Debt</h3>
<p>You can take loans from the company at any time after chargen. These are available in 5-credit increments, to a maximum of 500 or the budget of the highest Danger Rating world you’ve visited, whichever is greater. You may occasionally find yourself in debt with us for other reasons - for example, the starting budget from Cash Still Rules counts against this limit. No matter the source, half of all credits you gain while in debt will immediately go toward paying it off. The other half will go toward your account, though you may make additional payments at any time. All debt is treated as a single value. Interest will be charged at 10% of that value, compounding each time you enter a new world through Exit Stage Left or Rainbow Bridge, not counting mission rewards. All interest is immediately deducted from your credit balance; this may put you into debt as well.</p>
<p>While your account balance is zero or below, you may not make any additional purchases. You may not enter <b>Arranged PvP</b>. Any or all of your Controls and Perks may be disabled, up to and including the basic loyalty effects common to all Bindings. You may be assigned mandatory missions and face additional penalties for failure. All such penalties will only last until the debt is paid off in full.</p>
`

export const missions = `<h3 class="font-bold text-lg">Missions</h3>
<p>Contractors who wish to take a more active role in company operations may accept special missions that serve its interests. These are strictly optional and may be found in an app on the smart device. Up to three missions will be available at any time, outside of an active Gauntlet or arranged PvP match. A contractor may only accept one at a time. Missions not accepted will not remain indefinitely; the options you turned down when you accepted one mission will not necessarily still be there when you finish.</p>
<p>All missions have a <b>scope</b>, a <b>location</b>, an <b>objective</b>, a <b>reward</b>, and at least one <b>condition</b>. Many missions will have additional objectives nested within them that can variously point toward the overall mission’s next steps or add additional complications with bonus rewards. The mission app’s GUI does not distinguish between a helpful nested objective and a bonus one. Missions can range from somewhat challenging to very, but all missions offered to a contractor can be completed by that contractor and/or their retinue. Some additional purchases may be required or recommended for a given mission, but not anything beyond the contractor’s budget at the time the mission is offered, plus the estimated value of all required nested objectives. Failing a mission means you lose out on the reward, in addition to any casualties your retinue took in the process.</p>
<p>Scope is an estimate of how much time and effort a mission will take and comes in three broad categories. Quick missions are simple milk runs that can be completed in a single chapter or short story arc (no more than 20,000 words). Standard-length missions are significantly more complex, with a small number of Quick objectives contained within them, and may demand up to 250,000 words to be told properly. Grand missions are the stuff of epic sagas, with a large number of Quick and Standard-length objectives.</p>
<p>A mission’s location may be in any world. If you do not have access to that world, its dimensional coordinates and/or transportation there will be provided for you. Quick missions will always be in a world that you can already access.</p>
<p>Mission objectives vary widely. Sample objectives include:</p>
<ul class="list-disc list-inside ml-2">
  <li>Capture  &lt;target&gt;.</li>
  <li>Capture all canon love interests of &lt;character&gt;. Let &lt;character&gt; know you’ve enslaved them.</li>
  <li>Help &lt;faction&gt; achieve &lt;goal&gt;.</li>
  <li>Defeat &lt;individual/entity/faction&gt; in &lt;conflict type&gt;.</li>
  <li>Your retinue is an antagonist faction. Defeat &lt;setting’s heroes&gt;.</li>
  <li>Find and obtain &lt;object&gt;.</li>
  <li>Defeat &lt;threat&gt;.</li>
  <li>Resettle &lt;population&gt; to a suitable new home.</li>
  <li>Defend &lt;subject&gt; against &lt;threat(s)&gt;.</li>
</ul>

<p>Conditions are added complications that apply to a mission and all nested objectives within it. Nested objectives may have their own conditions as well. Sample conditions include:</p>
<ul class="list-disc list-inside ml-2">
  <li>Leave no trace. No captures, no kills, and no detection allowed.</li>
  <li>No personal involvement. Your retinue must do everything.</li>
  <li>If you want it done right, do it yourself. Your retinue can’t help.</li>
  <li>Forage: Only local captures may help.</li>
  <li>&lt;Company function or perk&gt; is disabled.</li>
  <li>Nerf: All retinue members limited to &lt;tier value&gt; while in &lt;mission setting>.</li>
  <li>Inside Context: Use only powers/technology native to &lt;mission setting>.</li>
  <li>Time Limit, hard: “&lt;Mission&gt; must be completed within &lt;time&gt;.”</li>
  <li>Time Limit, specific: “&lt;Mission&gt; must complete at &lt;time&gt;,”</li>
  <li>Time Limit, soft: “You must complete &lt;mission&gt; before &lt;competition&gt;.”</li>
  <li>Surprise: At least one additional complication may arise part-way through.</li>
</ul>

<p>Mission rewards come in two parts. First, completing a Standard or Grand mission in a world you already have access to will always, immediately, open a new one through the Rainbow Bridge or Exit Stage Left systems. Second is the choice between a raw credit value and a specific item in the catalog, whether a waifu, perk, or what-have-you. The item prize is typically valued around 20-30% higher than the credits, and always in the +15% to +50% range. This second reward is highly variable, dependent on not just the difficulty of the mission (as modified by conditions) but a contractor’s speed and technique. A mission’s scope is highly correlated to its difficulty, while some objectives are naturally harder, and thus more rewarding, than others.</p>
`

export const refund = `<h3 class="font-bold text-lg">Refund and Return Policy</h3>
<p>Any purchased waifu or husbando may be returned for any reason. If you return her within two weeks (336 hours) of purchase, you will be refunded their full purchase price at their effective tier after step 1a. If you return a waifu or husbando after that point, or return any Control, Perk, or non-Tier 11 Waifu Perk, you’ll only receive 80% of the price for their effective tier after step 1a. If you use Evolutionary Engine Array or other means to copy the purchase’s abilities, or otherwise bought that person with the intent of returning them after a task or time, that’s treated as a rental and capped at the same 80% as the previous. For ease of calculation, all refunds from Tier 11 Waifu Perks are 100%. Heritages, and chargen T11s, are non-refundable. If you return a Control or Perk that gives other items for free, but wish to keep the packaged items, their list prices will be deducted from the standard refund value.</p>
`

export const arranged = `<p>Smaller-scale PvP matchmaking is available for contractors who don’t wish to get involved with a career-defining project on the scale of the Gauntlet. This is accessible through a specialized app on your smart device, provided you are not currently participating in PvP and are not in debt..</p>
<p>Contractors choose their desired match settings themselves, that is, the desired number, strength, and experience/ruthlessness/skill of their opponents, and the environment that the match will be fought in. “Random” options are available for each opponent’s skill and strength, as well as the environment. (Note to authors: it’s not actually random on your end.)</p>
<p>Up to twelve contractors may participate in an arranged match, including yourself. No replacements will enter after the match starts.</p>
<p>Opponent skill is sorted into three broad categories: Casual, Average, and Hardcore. Each of these correlates to one of the opponent types in continuous PvP: Negotiable, Rival, and Enemy, respectively.</p>
<p>Strength values are measured on a scale from 1 to 9, as shown in the table to the right. These multipliers are applied to your PvP credit value, with the result rounded to the nearest multiple of 5, to approximate the designated opponent’s budget. Both strength and skill are determined separately for each opponent.</p>
<p>Arranged PvP matches take place in pocket dimensions similar to a contractor’s Demiplane. Any biome for this may be chosen as a preference, whether a cityscape, forest, plain, desert, ocean, mountain range, or even a colonized asteroid or other space setting. The size of an arranged match’s arena and number of usable structures scales to the number of participants, so that every contractor has a starting home turf, all spaced roughly equally far apart from each other. Sufficiently large arenas are likely to have multiple biomes, to accommodate the many contractors’ varying preferences.</p>
`

export const assetValue = `
<h3 class="font-bold text-lg">PvP Asset Value</h3>
This is the sum of the list prices for you and your retinue’s effective tiers after step 5, plus the combined list prices of your Catch-a-Ride vehicles.
`
export const arrangedConditions = `<h3 class="font-bold text-lg">Arranged Match Wagers, Victory Conditions, and Risk</h3>
<p>Each participant in an arranged match wagers a percent of their PvP credit value upon entering a match. Casual opponents will wager 5%, Average opponents 10%, and Hardcore opponents 15%, all arounded to the nearest multiple of 5. Player contractors are assumed to be Average and thus wager 10%. This is taken out of their accounts when the match starts.</p>
<p>The default victory method in arranged matches is regicide: defeat (capture or kill) all opposing contractors. Their retinues are only a concern as far as they can protect their contractor and will be ejected from the arena. Other styles are also available, including but not limited to:</p>
<ul class="list-disc list-inside">
  <li>Domination: A retinue loses when &lt;% between 66 and 90&gt; of its PvP asset value is defeated.</li>
  <li>King of the Hill: capture and hold &lt;territory&gt;.</li>
  <li>Capture the Flag: capture and hold &lt;people or items&gt;.</li>
  <li>Race: Be the first to complete &lt;mission&gt;.</li>
  <li>Assassin: can only attack &lt;participant&gt; until the target is defeated, then you get a new target. Participants’ targets are hidden from each other. Can still defend against others.</li>
  <li>Mission competitions. Normal credit pay becomes points instead. Winner is the retinue with the most points after the final round.</li>
  <li>Shooting Gallery: Waves of enemy mooks descend on the participants’ positions. Has Limited (winning retinue has the highest score after a set number of rounds) and Survival (winning retinue is the last one standing) variations.</li>
  <li>Presentation: Can be applied to any other ruleset. Points are awarded to each retinue based on style, with a bonus for winning the match according to the normal rules.</li>
</ul>
<p>Defeated participants in an arranged match are merely ejected from the arena, losing only the credits they wagered. All harm or enslavement done to a contractor or their retinue is reversed upon ejection, to up and including death. </p>
`

export const arrangedTeam = `<h3 class="font-bold text-lg">Arranged Team Matches and Prizes</h3>
<p>Team play is compatible with arranged PvP as well. A team only loses when all of its members are defeated. Unlike in continuous PvP, arranged teams do not necessarily have equal strength or skill.</p>
<p>The total of all of a match’s wagers is awarded to the winning contractor. A winning team splits the pot evenly, regardless of how many of them remained active to the end. The match’s winner(s) may keep a clone of any one member of their opponents’ retinues that the winner or winner’s retinue defeated during the match - no more than one from each opponent, to each winner. Retinue members that are sold as pairs or trios count as one for this purpose, and only one member of the set needs to be defeated in such cases. Alternatively, a winner may decline all cloned retinue members for a match in favor of the Heritage of an opponent that they or their retinue defeated personally. This grants the winner the root Heritage perk only, bypassing Ancestral Diversity.</p>
`
export const arrangedSpecial = `<h3 class="font-bold text-lg">Special Arranged Match Rules</h3>
<p>All special capture rules for Gauntlet and unregulated PvP (NTR Is a Trash Fetish) remain true for arranged matches, with one exception: selling an opponent’s retinue member that you captured will merely eject them from the match, with no budgetary effect. All purchases from the company’s store app are blocked during arranged matches. Conjunction and Apportation are disabled while on your opponent’s home turf. Body, Wild, and Soul Defense are disabled for the duration of the match, as is Warranty Plan.</p>
`

export const rip = `<h3 class="font-bold text-lg">R.I.P.</h3>
<p>In the event that something so unfortunate happens as your death, your retinue will have three days (72 hours) to revive you before they gain their freedom. During this period, the functions on your smart device that are normally limited to just you are now available to every retinue member who isn’t a familiar. This includes loans. A special list will also appear in the shopping app that features every waifu capable of resurrection. This ruleset will not trigger if you have an automatic resurrection system in place for yourself, even if that process takes longer than 72 hours.</p>
<p>Freed retinue members will retain any waifu perks applied to them, shared Heritage perks, the results of cross-training beyond their canon abilities... everything up to step 4 on the effective tier calculations. Any retinue member or purchased or registered Catch-a-Ride vehicle that is still inside your former Demiplane or Dungeon will be ejected into the last world they, personally, visited, as the pocket dimension ceases to exist.</p>
`

export const offspring = `<h3 class="font-bold text-lg">Offspring</h3>
<p>All of your descendants are members of your retinue from birth and benefit from all of your perks that apply to all retinue members. They will all have a simpler version of the stamp’s tattoo, a demi-tattoo, ensuring good behavior (according to your and their other parent’s standards) and loyalty to your family, without the other mental effects. Children of your Extra or Substitute target that you capture are counted as descendants, even if they were already born when you took over. Capture credits are not awarded, however, for any descendant of yours, who was born or even conceived after your entrance, or anyone born into your retinue.</p>
<p>If you have <b>No Bindings</b>: Your descendants will not have any bindings, not even the demi-tattoo. You and their mother(s) will have to raise them the hard way.</p>
<p>If you’ve used <b>Advanced Tempest Runes (Hybridization)</b>: Hybrids created with this perk will breed true.</p>
<p>If you have the <b>Symbiote - live births</b>: You may also produce regular humanoid babies - symbiote hybrids with your race (human, kitsune, vulcan, etc.) and the other parent’s - with any member of your swarm. Your descendants will all have the demi-tattoo until puberty, when their symbiote abilities come in.</p>
<p>If you have a <b>Shroud</b>: Your descendants will develop shrouds of their own at puberty, with the specific theme dependent on their personality and interests. They will benefit from all of your perks that apply to your whole retinue, just like their parents, and may form their own retinues centered on themselves. If you have Complementary Colors, any of their ancestors who have a Cloak in your network can keep track of them through a unique Shroud connection. You and any of their ancestors who have a Shroud will not have any direct influence over them beyond the Stamp’s demi-tattoo. Their parents who are not connected by a Shroud or Cloak will not have any direct influence at all.</p>
<p>If you have <b>Lures</b>: Your descendants are immune to your lures. Food from Faerie Feast will still taste wonderful, but the addictive qualities won’t work on them.</p>
<p>If you have <b>Hotel California</b>: The company suggests abiding by all local laws and barring your descendants from sex work or serving alcohol until they’re of age.</p>
<p>If you have <b>Dragon Scale</b>: Your children will all be dragons as well, with their dragon abilities coming in at puberty and their elements dependent on their personalities and themes. Later generations may hybridize with whatever local races they encounter.</p>
<p>If you are a <b>Transhuman</b>: We at the company never quite figured out how reproduction works for you. Your biological creations, any AIs you construct, or soul hierarchy are sort of like children</p>
`
export const nasuDLC = `
<h3 class="font-bold text-lg">Pseudo-Servants and Other Alternates</h3>
<p>The following pairs are mutually exclusive at chargen: Saint Kiara and Devil Kiara; Nero and Nero Alter; Medea and Medea Lily; Medusa and Gorgon. If you buy a Pseudo-Servant waifu perk at any time after you purchased or captured them, the Servant’s memories and personality will seamlessly integrate into the host’s, in much the same way as the Memoria perk or Extra and Substitute origins.</p>
<p>Not mutually exclusive: Kama and BB with any Sakura and each other; Ereshkigal and Space Ishtar with any Rin and each other; Scáthach and Skadi; Carmilla and Elizabeth Bathory.</p>
<h3 class="font-bold text-lg">Command Seals</h3>
<p>The following female characters count as valid Masters: Tohsaka Rin, Matou Rin, Dark Rin, Matou Sakura, Tohsaka Sakura, Dark Sakura, Beast Rin, Beast Sakura, mainline Illya, Luvia Edelfelt, Bazette, Caren, Kaleido Ruby, Kaleido Sapphire, Sola-Ui, Irisviel, Hakuno, Devil Kiara, Kohaku, Prisma Illya, Miyu, Angelica, Lancelot Sakura, Celenike, Fiore, Reika, Jean, Sakura Edelfelt, Prelati, Tiné, Tsubaki, Ayaka, Manaka, Reines, Yvette, Hishiri, Ritsuka, Yu, Ophelia, and Erice. Pseudo-Servants and Demi-Servants are Servants, not Masters.</p>
<h3 class="font-bold text-lg">Alternate Classes and Outfits</h3>
<p>All Servants with Summer, Santa, or Halloween forms can use the associated skills and NPs at will. The same applies to Atalanta’s, Boudica’s, Da Vinci’s, Medusa’s, Nero’s, Nobunaga’s, and Mysterious Heroine X Alter’s alternate classes, except for Avenger Gorgon. When copying a Servant’s power through OC Donut Steel or Template Stacking, alternate classes must still be purchased individually.</p>
<h3 class="font-bold text-lg">Alter Egos</h3>
<p>BB has lost her connection to Nyarlathotep. Purchasing Amaterasu gives you all of the Tamamo Nine as well: Caster Tamamo, Tamamo Cat, Tamamo Vitch, and six others that have not yet appeared in canon. If you have already bought at least one of the Tamamo Nine at the time of purchasing Amaterasu, all credits that you paid for those nine will be refunded. If you instead capture Amaterasu, you will get any applicable refunds for purchased members of the Tamamo Nine and may purchase any missing ones for free. This is not automatic, in case you wish to capture the full set instead. (Treasured Beast Koyanskaya must be purchased or ascended separately.) Purchased or captured versions of any Tamamo will remain themselves as they grow more tails, not becoming Amaterasu even if they have a full set of nine. BB may instead spawn new copies of her Alter Egos if you do not already have them; any that she spawns will not count for capture or sale credits.</p>
<h3 class="font-bold text-lg">Servants</h3>
<p>Captured Servants are no longer connected to the Throne of Heroes and will not affect their greater Heroic Spirits. All Servants exist in a quantum state where they are both fully incarnated and able to enter Spirit Form. Servants benefit from their homeland bonus in any version of their homeland, whether the past, their own time, the present, or the future. This does not include unrelated counterpart cultures and replaces the general background magical field rule. The body-modification suite is capable of changing Servants who have Golden Rule (Body), Divine Core of the Goddess, and other such skills.</p>
<p><b>Saber</b>: Empyreal Eye overuse may cause Musashi to travel between worlds and eras on her own; if that happens and you have Rainbow Bridge, the portal room will connect to her new location as if it were intentional. She can learn to control this ability with practice. Artoria Alter has Cavall the 2nd as a familiar. Nero Claudius may access her Saber Venus form if you also have Altera. If you purchase Dioscuri, Castor or Pollux will be genderswapped so the two are identical twins once more, according to your orientation, or neither (or both) if you’re bi. Okita’s summer cyborgization cured her tuberculosis in canon; it remains cured here even if she only uses her Saber abilities.</p>
<p><b>Archer</b>: The true love condition for Tomoe Gozen’s NP is transferred to you. Artemis has the mascot version of Orion as a familiar. Ishtar has Gugalanna Lily as a familiar.</p>
<p><b>Lancer</b>: Artoria Lancer (not Alter) benefits from Goddess Rhongomyniad’s added power; the two will be treated as the same person. Purchased versions of Gareth have the memories of her fairy self from Lostbelt 6, in addition to her PHH version.</p>
<p><b>Rider</b>: Sakamoto Ryouma has Oryou as a humanoid familiar; if you already have Oryou when you buy Ryouma, you’ll be refunded her full cost. Saint Martha has her dragon Tarrasque as a familiar. Nero Alter has Beast VI as a familiar. Habetrot will not be harmed by touching advanced technology, including her Black Barrel; purchased versions of her will have her memories from both Pan-Human History and Lostbelt 6.</p>
<p><b>Assassin</b>: Hundred Faces Hassan’s main body is the adult female one. Carmilla’s Femme Fatale (False) does not affect her feelings toward you. Shuten Douji and Ibuki Douji are separate beings. Ibuki may be brought forth if you involve yourself in the events of Lostbelt 5.5, but the two oni are otherwise purchased and captured separately. Tamamo Vitch’s Independent Manifestation is limited to one local multiverse at a time.</p>
<p><b>Avenger</b>: Space Ishtar (Ishtar Astoreth) can split off Astoreth and Space Ishtar/Rin into their own bodies, at will, and re-combine with them on contact.</p>
<p><b>Ruler</b>: The Morgan le Fay of Pan-Human History has three distinct selves: her human aspect, Morgan, and her fairy aspect, Viviane, alongside her aspect as the inheritor of Britain’s mystics, Morgan le Fay. She can split off Morgan and Viviane into their own bodies, at will, and re-combine with them on contact.</p>
<p><b>Alter Ego</b>: Kingprotea can control her size, all the way down to regular human height or the smallest you’ve been since the start of your journey, whichever is smaller.</p>
<p><b>Foreigner</b>: Katsushika Oui has Tokitarou as a familiar; he’ll remain in the mental backseat while the two are fused.</p>
`
