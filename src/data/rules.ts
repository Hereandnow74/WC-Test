export const startingDesc = `Creating Your Build
First, pick a starting world. Depending on that world’s danger rating, measured on a scale from 1 to 10, you’ll be assigned a number of credits with which to make the rest of your purchases. Danger ratings are weighed based on the power of the typical combatants, the average danger level to ordinary people living in that world, and especially the actual cost of what might be needed to survive in that world. Additionally, as you may choose when you enter a world, doing so during an active apocalyptic scenario may raise a world’s rating by one or even two tiers. Specific worlds and their ratings are listed in the second page of the spreadsheet.
Next, modify your starting budget by your intensity multiplier. The base multiplier is 1x. This multiplier is modified using the co-operative and PvP options found in the CYOA Modes section. All changes to the intensity multiplier are additive.
Now that you know your budget, pick an Origin, one Binding-type control, and as many of the Lure-type controls, Perks, and waifus or husbandos as you can afford. The company’s Waifus and Husbandos are all clones manufactured on demand, except where noted. They come packaged with their iconic outfits, personal equipment, and familiars or treasured pets, when appropriate. The largest equipment normally allowed are motorcycles, but there are some rare exceptions. For your own ease of accounting, you may only purchase one copy of any distinct entry at a time. They are sorted into eleven tiers, each of which has a different cost. 
`

export const pvpRules = `
  <h3 class="text-lg">Gauntlet(Continuous PvP)</h3>
  Starting one week into your journey, another contractor will appear in your current world, with their own
  agenda and retinue of waifus and / or husbandos. All opposing contractors will have legal builds. Their budgets
  are equal to your PvP credit value, at chargen or the end of the previous round, plus 1 % of that sum per
  contractor you’ve defeated(non - compounding) and then rounded up to the next whole number.

  In formula form:

    P(1 + E100)
  P = Your PvP credit value
  E = Number of eliminated Contractors

  <p>Each time you defeat or otherwise handle another contractor, you will have seven days to rest before encountering a
  new one, with more experience and skill than the last. Their expenses will be more optimized; their retinue members
  will be more divergent from their canon selves in ability, equipment, and personality; and the more third - party
  resources they’ll have. The qualitative side of this difficulty ramp stops after 50 victories, though your opponents’
  budgets will continue to increase. The rest period between challengers will decrease by 24 hours for every seven wins
  you accumulate, to a minimum of one hour.</p>

  <h3 class="text-lg">NTR is a Trash Fetish(PvP Capturing)</h3>
  <p>If a member of a retinue is captured by an enemy and held in their territory(whether that territory is purchased from the company or acquired locally) for a period of 24 hours, the hostage loses the benefits of Creature, Stress, Mind, Addiction, Wyldscape, and Corruption Defenses until rescued. The timer begins only when the hostage is both defeated and restrained, and it will reset if they are touched by their master or leave enemy territory unrestrained. The timer will pause if they leave while still restrained by the enemy.
  Once the timer has run its course, the kidnapper is free to use any bindings, lures, or third - party mind control methods they have as if the hostage were free. Targets stolen from another contractor are worth 0 capture credits, but may be sold at the usual rate, adjusting for their effective tier after step 4. T11s are an exemption to this and maintain their normal rates for capture and sale. Recapturing one of your own waifus does not grant any credits.
  All of the above applies to both Gauntlet and unregulated PvP.</p>
  
  <h3 class="text-lg">Special Gauntlet Rules</h3>
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

  <h3 class="text-lg">Gauntlet Conditions</h3>
  <p>You may personalize the difficulty of your Gauntlet PvP experience with the following options. Budget increases are
  additive and are determined based on your starting budget, before any purchases, except where noted. If taken with a
  Danger 11 start, the extra funds are calculated relative to a starting budget of 4, 045 and will become available
  immediately after character generation.</p>`
