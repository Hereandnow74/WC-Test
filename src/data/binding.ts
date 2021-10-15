export const desc = `<p>All bindings ensure a waifu's loyalty, friendship, and romantic and sexual interest in you,
    and nudge them in that direction toward your other waifus. Bonds between your waifus grow more quickly with
    increased interaction, but will not override familial relationships without significant pressure. Waifu obedience
    is not absolute: in general, they put the spirit of your orders over the letter. Strong-willed waifus may elect
    to ignore disliked orders and follow their own initiative; more often, a competent waifu whose moral alignment
    conflicts with an order’s means or ends will raise an objection and the two of you will have to argue it out.
    Bound waifus are also somewhat more likely, depending on their moral alignments, to consider “Just bind her
    and make her one of us” a valid solution to any problem involving a waifu candidate. Even the purest-hearted
    waifus can find themselves seduced by the power to turn any enemy into a friend.</p>
    <p>All bindings work equally well regardless of the user’s or target’s sex, gender, or orientation.
    If you change your binding method, any expansion you bought for the old one will be refunded at the standard rate.
    Like all company-supplied powers, bindings cannot be nullified, copied, or stolen.</p>
    <p>For safety reasons, all purchased waifus are bound with one of the Stamp’s tattoos before delivery, unless you opt
    out of having any bindings. <b>You can have no more than one binding method at any time.</b> When you buy a new binding
    method, your previous one will be automatically refunded and disappear from existence; any unique mental effects
    and most physical effects will fade over the next few days. Long-term conditioning from the Choker is an exception,
    as are the Stamp’s tattoos. The latter will merely become dormant (invisible and inert) while any higher binding
    is applied. If a waifu was never Stamped, whether by you or before delivery, the use of any higher binding
    method will also give her a dormant tattoo; this is what marks her as one of your captures. Dormant tattoos
    turn active when higher bindings are removed. If you have any binding, but capture a waifu using only Lures,
    the Stamp’s effects will apply regardless and her full tattoo will appear immediately.</p>`

export interface Binding {
  title: string
  effect?: string
  desc: string
  cost: number
  whitelist?: string[]
  type?: string
}

export const bindings: Binding[] = []

bindings.push({
  title: 'Company Stamp',
  cost: 0,
  desc: `This permanent magical tattoo instills only the mental effects common to all bindings. To capture targets, you may apply this tattoo using a thumb-sized ink stamp. You can only have one stamp at a time, and only you and your retinue members can perceive the stamp when it’s not in use. The inked part, on one end, contains the tattoo’s core, a circular design that serves as your emblem.
Stamping requires 3 seconds of sustained contact with the target’s skin, from the stamper’s perception, to start the tattoo-creation process. You must apply enough pressure to make the ink transfer properly. The most popular stamping sites are typically the pubic region, lower back, or back of the neck. Newly-applied tattoos require 72 hours to ramp up to their full effect, from the perception of the person stamped.
During the ramp-up period, additional ink will fill itself in around your emblem to form a much more elaborate design, about the size of the waifu’s palm, that represents her history and personality. Captured waifus and people they know will not notice a tattoo-in-progress until it completes itself, at which point they’ll rationalize away its sudden appearance. If a tattoo’s location is ever damaged or severed, its effects will continue and it will reappear when the skin is regenerated or the body part replaced.
Stamped targets only count as captured at the end of this period, when the tattoo completes. Completed tattoos are always perceptible. A stamp’s location on a target’s body may be repositioned after the fact through the company app; a generated 3D model of the target serves as a reference.
The stamp never runs out of ink and cannot be used accidentally. If you are stamped, by yourself or another, it will only have cosmetic effects. If one of your waifus marks a new girl with it, the new girl will feel its effects as if you had used it on her yourself. The anti-loss, -theft, and -destruction measures on the company’s smart device also apply to this stamp.`,
})

bindings.push({
  title: 'Megapixel',
  cost: 150,
  whitelist: ['Company Stamp'],
  desc: 'Favored by stalkers everywhere, your stamp is now a digital app for your smart device. Just take a photo of the target waifu, rotate, zoom, and pan around a generated 3D model of her until you’ve found the right place for your tattoo, and apply the tattoo remotely. The same 72-hour waiting period and all of the related rules apply for the camera app as they do for the stamp. This is a company app and benefits from all such protections.',
})

bindings.push({
  title: 'Tempest Jewelry',
  cost: 10,
  desc: `Magitech chokers, bracelets, or anklets that enforce absolute obedience. Items are available in ruby, orange topaz, citrine, emerald, sapphire, amethyst, alexandrite, and clear and black diamond varieties. Bands may be leather, silk, or metal. This binding will be applied to purchased waifus before delivery. You receive one new choker each day, up to a limit in reserve of 5 plus the number of items currently worn by yourself or members of your retinue.
Wearers’ libido is highly enhanced, as is submissiveness to both their masters and any more dominant members of the same retinue. Obedience is rewarded through pleasure. Several options are available for punishing disobedience, including inducement of emotional numbness or preventing a wearer from experiencing release for a set time. You are your own master and not subject to any unwanted side-effects of your own equipment.
When a choker's (bracelets, anklets) latch is first closed around a wearer, the latch disappears and manual removal becomes impossible as the choker automatically activates. Active chokers are indestructible and may not otherwise be warped away. If a wearer dematerializes, swaps bodies, or otherwise transforms away from a standard humanoid height and build, the choker will disappear with, into, or otherwise follow the wearer for the duration.
Removal of a wearer's own choker becomes unthinkable after one full week (168 hours), via a gradual process of rationalization, physical comfort, the automatic reward and punishment system, and, in extreme circumstances, short-term memory loss. Captures are finalized at this point if no other effort is spent. The process can be accelerated to as few as three days (72 hours), however, if the wearer loses all will to resist. Removing a choker from a subject before that point will stop their capture process, voiding all progress. Any punishment system you program for jewelry wearers will start working from the moment the latch is first closed, not just when the capture is finalized. If you (the contractor) wear a choker, you may deactivate and remove your choker at any time.
You may deactivate any of your retinue's jewelry through the associated software, installed as an app on your smart device. The latch will reappear and may then be undone (and the item removed) normally. Your retinue may use other app features added by expansion perks, but cannot perceive the deactivation option. (They may still use it if directly ordered.) This app will uninstall itself if you trade in the Jewelry for a more advanced Binding. This is company software and benefits from all such protections.
`,
})

bindings.push({
  title: 'Basic Tempest Runes',
  cost: 10,
  whitelist: ['Tempest Jewelry'],
  desc: `Tempest Chokers (bracelets, anklets) now have a built-in translator function, giving their wearers the ability to speak any language you also speak, plus the standard and/or trade languages of any place they visit. This knowledge persists after they leave the area where the language is spoken. The chokers also gain a communications and monitoring system, allowing you to track their locations and vitals and speak with them (and them with each other) remotely from any distance, even between different multiverses. These comms are not telepathic and will not work without actual speech or third-party thought-to-comms devices.
Additionally, the chokers may now apply temporary disguises to their wearers, shifting their apparent race (human, kitsune, vulcan, etc.) and phenotype to blend in better with the local populace. The chokers cannot emulate abilities that the wearer cannot perform normally. These disguises are not customizable and simply reflect what the wearer would look like if they were born as that race. You may only save one disguise at a time into each wearer’s profile.`,
})

bindings.push({
  title: 'Advanced Tempest Runes (Body)',
  cost: 20,
  whitelist: ['Basic Tempest Runes'],
  desc: `Tempest Chokers (bracelets, anklets) may now apply direct physical transformations to their wearers. Take Body Talent for free. Every valid physical parameter for a member of the wearer's race (human, kitsune, vulcan, etc.) may be altered, from age, height, and gender to attention span, muscle density, and sexual characteristics. This also applies to you, if you wear a choker, and wearers who have not yet been fully captured. A wearer's race may also be changed, but only if you already have a natural example of the target race in your retinue. (“Natural example” does not include examples created through Extra or Template Stacking.) This perk cannot emulate the effects of party-wide Heritage perks such as Dragon Thrall. The disguises created by this perk’s prerequisite may now be customized.
The jewelry app now includes configuration pages for every wearer of an active choker. Parameters may be adjusted here, mostly using sliders from 0% (typically the minimum value for a healthy human) to 100%. (Transformation speed and duration are also parameters.) A choker’s central gem will visibly glow while a transformation progresses, more brightly if the transformation is faster or more intense. 100% for hair length stretches to the upper calves; for breasts are the size of the woman’s head; for the belly is equivalent to a full-term pregnancy, and for hips/ass makes each buttock the size of a volleyball.
You may save an unlimited number of presets for each wearer and switch between them at any time. If a wearer has a defined alternate form (not a generalized shapeshifter), all of their forms will automatically be saved as presets. Any number of disguises made by this perk’s prerequisite may now be saved as presets. "Exactly how the wearer appeared when the choker (bracelet, anklet) was first worn" is always available as a default preset. Any changes made to this preset will instead output an otherwise-identical copy as a new preset. Deactivating a choker will restore the wearer to their original appearance unless you desire otherwise.
Any sufficiently-disabling transformation that is applied to you will have an automatic time limit of 48 hours so you don’t get stuck. If you return to that same transformation within 10 minutes, the time limit will be doubled each time until your streak ends. You may set a shorter limit if you like.`,
})

bindings.push({
  title: 'Advanced Tempest Runes (Mind)',
  cost: 10,
  whitelist: ['Advanced Tempest Runes (Body)'],
  desc: 'Mental transformations for all retinue members are now unlocked in the jewelry app. In addition to libido and submissiveness, attention span and intelligence may also be altered, as well as hobbies, likes and dislikes, fetishes, personality traits, memories, fashion preferences, etc. This is extremely useful for anyone who wants to fine-tune their close harem or play around with individual members’ roles. Your retinue members cannot modify their own orders or apply mental transformations to your profile without express permission. These functions otherwise work the same as their physical counterparts.',
})

bindings.push({
  title: 'Advanced Tempest Runes (Hybrid)',
  cost: 20,
  whitelist: ['Advanced Tempest Runes (Body)'],
  desc: 'You can now alter the members of your retinue into hybrid races (human, kitsune, vulcan, etc.), limited by the natural examples of such races that you have in your retinue. There is no theoretical limit on how many races you can hybridize into one individual. However, the result having all of the strengths of both sides and none of their weaknesses is only guaranteed when there are only two donor races present. More complex combinations are increasingly unreliable. The effects of party-wide Heritage perks such as Dragon Thrall do not count against this limit.',
})

bindings.push({
  title: 'Absolute Order',
  cost: 40,
  whitelist: ['Tempest Jewelry'],
  desc: `Disobedience is no longer allowed. Captured jewelry wearers will perform any intentional, direct order you give them, within the realm of physical or mental possibility. Orders do not need to be consciously possible. Will-saves, intelligence-saves, or reinterpretations are not allowed. Even if a wearer wants to resist, their body or mind will perform as ordered regardless. Unlike other controls, this enforces your exact words, not your intent: “Do X” and “Make and follow a plan to do X” can have vastly different results.
If you have Advanced Tempest Runes (Body), the limits of its body modification are vastly raised. The more often and determinedly any wearer resists your orders, the higher the upper limit for all wearers’ parameters (and the lower limit for certain parameters such as height) will increase (or decrease for the lower limits). This limit’s increase has no hard cap, only a soft cap from your retinue’s ability to maintain resistance to your orders. This applies even if the wearer is not yet fully captured.
If you have Advanced Tempest Runes (Mind), standing orders may be edited, deleted, or copy-pasted to new subjects quickly, cleanly, and across any distance. This also applies to the issuing of new orders.`,
})

bindings.push({
  title: 'Additional Stock',
  cost: 5,
  whitelist: ['Tempest Jewelry'],
  desc: 'You receive an additional Tempest item each day. Your reserve cap increases by 5. This may be repurchased for the same effect any number of times.',
})

bindings.push({
  title: 'Jewels of Discord',
  cost: 25,
  whitelist: ['Tempest Jewelry'],
  desc: `Tempest items can now adjust their appearance to better match the rest of the wearer’s clothing. Anyone attempting to remove one, other than you and retinue members you order to do so, will fail to do so, then miss the fact that it’s still there afterwards. This applies to both used and unused chokers (bracelets, anklets).
With unused chokers (bracelets, anklets) only, you may reverse this effect and make the item unusually interesting to potential targets. This applies to all potential targets who see it in person and may spark fights over the item. When a potential target touches the item, they will be overcome with an urge to wear it. This effect lasts 48 hours or until the item is worn, whichever comes first. It becomes stronger on increasingly higher-tiered targets than lower tiers. but has no noticeable effect on Tier 11s. This effect may only be applied to one item at a time. Potential targets affected by this attractor, who fail to wear the specific choker themselves, will remain affected after it finds a wearer and transfer their desire to future chokers (with this effect active) they see without any cognitive dissonance.`,
})

bindings.push({
  title: 'Aggressive Initiations',
  cost: 20,
  whitelist: ['Tempest Jewelry'],
  desc: 'The minimum time required to confirm a target’s capture is removed. A subject’s capture may now be greatly accelerated through sexual submission to yourself or more dominant members of your retinue. The more and stronger orgasms the subject experiences at their dominator’s hand, the faster the capture will progress. Transformations from Advanced Runes (Body) and (Mind) also benefit from this perk, regardless of the subject’s capture state.',
})

bindings.push({
  title: 'Ritual Circle',
  cost: 30,
  desc: `An app on your company-granted smart device that will allow you to design special runic circles for binding your waifus. Some assembly is required.
Your circles may be drawn in any material: chalk, ink, carvings, sticks on the ground, blood, or even light. The circle's area of effect may either be a sphere, which the circle rings, or a cylinder reaching out twice as high as its diameter in one direction. The target must remain within the circle for the time required. If they leave the area of effect before the binding is complete, its progress will stop and begin to reverse. If they are not brought back within the area of effect within 24 hours, progress is reset. The circle only affects those with the parameters set upon its design, whether that's an individual or category. Binding circles will always exclude you and your retinue members who are already bound through a circle, even when set to "Affect all."
Once bound via a circle, a targeted waifu is put into a hypnotic trance. While in this trance, you may command them freely and implant suggestions. You may also switch them back to their original personality (after the generic effects for all bindings), via an activation phrase or action, or return them into their hypnotic trance for additional orders.
When designing a circle, you spend points to determine its quality. By default, you have 6 points to spend as desired. Additional points may be acquired via an expansion perk. After inputting the targeting and quality parameters, wait for the company app to provide details on how to draw the circle. It should only take a few minutes. More powerful circles require more detailed inscriptions and designs to create. You may save designs for future use. The chart and notes on its use are found in the Additional Notes section.
If the circle is damaged or interrupted for more than a minute, the circle will fail and progress will be lost.`,
})

bindings.push({
  title: 'Greater Bandwidth',
  cost: 5,
  whitelist: ['Ritual Circle'],
  desc: 'By purchasing more runtime space on our servers, you have an additional point to spend while designing circles. This perk may be purchased up to 18 times, with the price increasing by 5 each time, for a total of 855 credits.',
})

bindings.push({
  title: 'Transformation Circle I',
  cost: 20,
  whitelist: ['Ritual Circle'],
  desc: `An additional function has been unlocked for your circle designs. These functions are identical to the modification suite of Advanced Tempest Runes (Body), with the addition of being able to change the target’s clothing as well. These changes cannot be made on the fly with the company app, but may be cancelled at any time. After cancelling a transformation, it must be reapplied manually. Body Talent is not part of the modification suite and thus not included.
Transformations are not instant. Their speed is dependent on the number of points invested in the Requirement parameter, set upon design of the circle. Instead of a Tier parameter, you can set the transformation’s duration. When that time runs out, the transformation will automatically revert over the course of the next minute. The different values for “Effect” [duration] are found with the rest of the Ritual Circle chart in the Additional Notes section.`,
})

bindings.push({
  title: 'Transformation Circle II',
  cost: 20,
  whitelist: ['Transformation Circle I'],
  desc: 'Your transformation circle now has additional functionality, equivalent to the modification suite of Advanced Tempest Runes (Mind), and may even turn targets into inanimate objects. Awareness is optional during such a state.',
})

bindings.push({
  title: 'Teleportation Circle',
  cost: 25,
  whitelist: ['Ritual Circle'],
  desc: `This enables two new types of circles, depending on the new Network parameter. Without any points in Network, the resulting circle will be one-way only, sending you to a set destination given the provided time invested to activate it.
With at least one point in Network, you may connect multiple circles together. These circles will always connect to one another no matter where they are drawn, but may only connect to others in their network. Attempting to establish a circle beyond the limits of a network causes all of the circles to fizzle and fail, their structures rendered unusable until corrected. When using a circle within a network, you may always choose which other circle is targeted when teleporting. Teleportation circles may only be activated by you and your circle-bound retinue members.`,
})

bindings.push({
  title: 'Portal Runes',
  cost: 10,
  whitelist: ['Teleportation Circle'],
  desc: 'You may now set a duration for your teleportation circles, turning them into portals. This effect’s duration works the same as that of Transformation Circles. Anyone can walk through an active portal, but they are only obvious to you, your circle-bound retinue members, and waifus of the parameter-set Tier or above.',
})

bindings.push({
  title: 'Geometric Magic',
  cost: 5,
  whitelist: ['Ritual Circle'],
  desc: 'This service upgrade package lets you use triangles! And squares. And pentagons! And any crazy shape your brain can come up with. You are no longer limited to circles and may make walls, lines, rooms, and other shapes with the designs. The effect must originate at some point along the designs, and may affect a volume of space no greater than that of the parameter-determined cylinder or sphere.',
})

bindings.push({
  title: 'Destruction Circle',
  cost: 5,
  whitelist: ['Ritual Circle'],
  desc: 'You gain an additional setting on which to design your circles. You may, instead of setting them to bind targets, set them to destroy things of the selected parameters within them. You may set the parameters to "Anything without a will" to avoid destroying potential capture targets, alternatively you may set it to All to create a general destruction spell circle to end particularly stubborn problems. Requirement determines how long it takes to completely destroy the targeted items within the area of effect.',
})

bindings.push({
  title: 'Warding Circle',
  cost: 5,
  whitelist: ['Ritual Circle'],
  desc: 'You gain an additional setting on which to design your circles. Warding Circles instead prevent the passage of things with the selected parameters from crossing their borders, for a period of time determined by the investment in Effect. The level of being this may affect is set by the Tier. Beings affected by the circle cannot directly interact with the circle. For best results, place your warding circle inside a binding circle, not the other way around.',
})

bindings.push({
  title: 'Ritual Anchor',
  cost: 15,
  whitelist: ['Ritual Circle'],
  desc: `Instead of having to draw a circle, you are able to inscribe runes upon an item. The item acts as the center of the circle for the sphere as an ambient field, or may be at any designated point within the cylinder setting. More powerful circles require larger anchors. A circle with 6 points or less spent on it can be infused into something the size of a marble (10mm). Something the size of a heart or baseball could handle 12 points. Something the size of a basketball or head could handle 18, and a torso or beachball could handle 24.
Objects infused with Teleport Circles transport those that touch them. Objects infused with Destruction Circles are not damaged by the effect, even if they are within the radius.`,
})

export const incarnationDesc = `Binding incantations are simple, but require an entity with Will to speak them. The app provides an easy pronunciation guide. With constant incantation, chanting cannot stop for more than one minute or the circle will fail and all progress lost. An activation incantation takes ten minutes, at which point the circle will remain active for 1.5x the Requirement for binding. Extended Duration increases the time the circle remains active to 15x the Requirement, but requires an activation chant of one-tenth the Requirement or one hour, whichever is shorter. Indefinite Duration further increases the time the circle remains active, with no further effect on chant length. With App Trigger, the circle may be remotely activated or deactivated via your company smart device.
 Affected waifu tiers are mostly self-explanatory. By default, an activated circle is obvious to waifus in the intended tier or above. A basic circle, with 0 points invested in Tier, glows brightly while active, but with one point is just lines on the ground, but still feels magically active. 2 points makes it more subtle, so that only silver-star waifus or higher can detect it. The higher the investment, the harder it is for the circle to be detected while active and the greater the maximum tier of people that it can affect.
Effect [duration] is only relevant for certain specialty circles. The standard binding circle’s effect is as permanent as any other non-Tempest binding. Network is only relevant for Teleportation Circles and not usable unless you can create them.`

bindings.push({
  title: 'Alterzelu Symbiote',
  cost: 100,
  desc: `Build your own swarm using this engineered species of alien symbiotes. You and all bound retinue members benefit from Everlasting. Body, Martial, and Wild Talents. (Take these four perks for free. If you have Talent Sharing (Martial) or Talent Sharing (Wild), take a full refund for them as applicable.) Take one copy each of Body, Wild, and Environmental Defenses for free as well.
Alterzelu hosts can, at will, form an environmentally-sealed suit of bio-armor, with Gigeresque black chitin aesthetics, a retractable helmet, sharp claws, and a long tail for combat and maneuverability. This includes you. Existing enchanted gear or otherwise super outfits, such as Life Fibers, power armor, or magical girl uniforms, will be integrated into this bio-armor. This does not apply to gear that is held rather than worn. Hosts also gain superhuman senses, strength, agility, and durability; this is enough to push any blue-star waifu up to Tier 4 or any copper-star waifu up one tier, but is not a significant gain for higher tiers.
One single waifu in your initial purchase will be the queen to your king. You and her both will already be merged with your symbiotes when you arrive in your first world. Symbiosis alters the target’s mind, making her see you as either her mate or king, whose orders are to be obeyed and whose survival is paramount to the species. If you are naturally female or Possessed or Substituted a female vessel, you may act as your own queen, with no need for a king - just consorts at most. A lone female in an otherwise all-male swarm will always be the queen, while an all-male swarm will have to externalize its egg production by some means. If your queen is part of a set that can only be purchased together, the actual queen is the most dominant one according to their natural personalities; if the members of the set are truly co-equal, then they’ll serve as co-equal queens.
Alternative Symbiote Theming: Xenomorphs aren’t for everyone, and that’s okay. If your chosen queen is canonically associated with metaphysical corruption or purification, or are known for polymorphing others or spawning or controlling large numbers of mooks, all stages of the symbiote life cycle will follow their aesthetic and theming instead in all stages of the symbiote life cycle: egg, larva, or bonded host. Such queens include (but are not limited to) Salem, Madokami, most versions of Circe, and the subjects of certain waifu perks.
All symbiote hosts besides yourself will see the queen as the first among them, regardless of previous relationships, and arrange themselves into a pyramidal hierarchy beneath her. Symbiote hosts’ personalities are otherwise unchanged.
Symbiote: Eggs
A set of black eggs appear scattered around your starting location or safe-house, one for each of your purchased waifus. Each one contains an alien symbiote guided by your mental commands, which will instinctively attack and merge with their targets in a sexual manner. In addition to their basic effects, the default binding tattoos will prevent purchased waifus from lethally harming your symbiote larvae. Waifus captured in other ways will usually accept the symbiote outright if they know you want them to. if you do not purchase any waifus in your starting build, you will start with no more than five larvae. The first target to fall victim to one of your symbiotes or be transformed by any other symbiote-related binding method will automatically become your queen.
Additional eggs, and thus larvae, come from your queen. First, you must fertilize your queen in the traditional human fashion. If you have Fertility Calibration, you may choose between egg production, live humanoid births - see the Offspring section under Additional Rules - and contraception. Results will be random otherwise. In an all-yuri swarm, a symbiote host’s tail may act as a phallus substitute for this purpose, provided it isn’t the queen’s own tail. Either way, the queen will produce one egg, about the size of an ostrich’s, every two days, for the next four weeks. Symbiote eggs will hatch after two weeks of incubation, depending on ambient temperature: warmer is faster, up to a limit.
Symbiote: Larvae and Capturing
 By default, symbiote larvae are obligate carnivores and may require up to five days to feed and grow large enough to take hosts. Your first larvae, however, will hatch fully-grown. Larvae are comparable in size and intelligence to a small dog or wild cat, such as a beagle or lynx. Larvae are not truly sapient, living only to merge with a future host. However, they are somewhat intelligent and capable of using tactics and trickery to more effectively attack more dangerous targets.
Larvae are perfectly concealed until they initiate a capture. They cannot be fought off by any target of effective tier (after step 6) 5 or below. When a larva strikes, it will latch onto the target’s back, aligning its spine with hers before penetrating her with its tail and engulfing her head with its own. It pumps a transformative fluid into her from both ends, merging their bodies together into a more idealized, sexual form. The normally-phallic tip of a larva’s tail can invert itself for use against male targets.
Against all targets, this initial transformation causes significant increases in muscle definition, particularly in the arms, abdominals, glutes, and legs. For female targets, it also causes severe non-muscular growth of the breasts, rear and thighs. Against male targets, it instead has a greater effect on muscles, including the pectorals, and adds to penis size and girth. Regardless of gender, the target sizes for any trait are roughly 100% on the scales defined in Advanced Tempest Runes (Body), with up to 20% error for any direction. If desired, symbiote masters may subject themselves to the same growth, according to their gender, as their swarm members. This must be manually triggered with the aid of a larva or swarm member. This growth may be re-triggered for any swarm member in the same way, at any time.
This initial growth is not optional, but may recede after the fact at a rate of 3 percentage points every 5 hours. The full extent of this recession, if any, depends on practical concerns and your personal preference.The initial transformation will also induce a surge of lust that will only fade when satisfied by you or another symbiote host whose lust surge has previously been satisfied. Capture credits are rewarded once this lust has faded.
As an alternative, even without any spare larvae, you and your queen may also convert a target in person by transmitting the same transformative fluid from her mouth or tail. This trades speed and immediate effect for subtlety; you or your queen can let your tail out without the rest of the armor, make out or have sex with the conversion target, and then leave before the real transformation begins.`,
})

bindings.push({
  title: 'Universal Bus',
  type: 'Expansion',
  cost: 50,
  whitelist: ['Alterzelu Symbiote'],
  desc: `Symbiote larvae may now target digital entities. A larva changes the shape of its “tongue”  to interface with any external computer port, then projects itself into a representation of virtual space. (If a virtual space already exists, the larva will simply enter that instead.) Once there, it may stalk and convert the locals as normal. Software AI or brain uploads that do not have physical bodies will manifest into one at the real-world location of the larva, skipping to the penultimate stage of the normal process.
End-users of consumer VR products are also vulnerable. Their physical bodies will be transformed on-site; they may stay logged in and convert others or log out and search for their new master’s physical location on their own time. The conversion will disable any anti-logout prevention or punishment systems. Existing symbiote hosts may also log in; their powers and transformative fluid will function in digital worlds as well.`,
})

bindings.push({
  title: 'Second-Generation Symbiote',
  type: 'Expansion',
  cost: 30,
  whitelist: ['Alterzelu Symbiote'],
  desc: 'This adds a number of upgrades to the symbiote’s functionality. You and all waifus benefit from Psychic Talent, as if you had purchased Basic Talent Sharing (Psychic). (Take Psychic Talent for free. If you already have Basic Talent Sharing (Psychic), take a full refund for it.) The lowest tier of targets that can fight off a symbiote larva will increase by 1 for each effective tier after step 6) that the queen is above 7: Tier 6 targets can no longer fight off a Tier 8 queen’s larvae, while only Tier 10 and 11 targets can fight off larvae produced by a Tier 11 queen. On the target side, use their effective tier after step 6, but skip steps 4 and 5. Finally, symbiote larvae now emit a weak psychic field that reduces a target’s willingness to resist future attacks every time she fights one off. This reduction stacks indefinitely until she finally gives in.',
})

bindings.push({
  title: 'Third-Generation Symbiote',
  type: 'Expansion',
  cost: 60,
  whitelist: ['Second Generation'],
  desc: `One of our lab’s attempts to hybridize our symbiotes with wild shoggoths has borne fruit. (All interns involved in the incident have been safely restored from backups.) This upgrade allows your symbiote hosts, including yourself, to melt into a semisolid amoeboid form for better infiltration, whether by flowing through vents, along a ceiling or wall, or hitching a ride on a person. Symbiote hosts obey conservation of mass in their slime forms and must remain contiguous. The form may be maintained indefinitely and they otherwise have full control over the form's shape, texture, and coloration. Symbiote hosts that have innate supernatural abilities of biological or genetic origin (ex. X-gene, Quirks, hereditary magic potential, alien racial abilities, etc.) retain them in their slime form. If they have enough room, they may revert to their original or symbiote forms at will, and may also assume a solid "armor" form around another similarly-sized being.
By doing so, a symbiote host who comes into contact with a capture target can bind them on their own, without aid from a larva. The slime form flows under the target's clothes and equipment, fully encasing them and keeping them compliant with sexual stimulation while injecting symbiote transformative fluid into blood vessels close to the skin and pumping into the digestive or (for female targets) reproductive systems. In this state, the slime form can also mentally converse with the target and speak with their voice, use their slime body as natural weapons, etc., until the target is converted (captured and symbiote-bound). This conversion method obeys the same timeframe and interruption rules as a full-cocoon Shroud binding and may be hastened with all-the-way-through penetration. This will allow symbiote transformative fluid to be absorbed by every part of the target’s digestive system at once. After conversion, the two may separate to reveal the new capture's symbiote form with the same body growth as the other types of symbiote capture. Additional sex is not needed to confim a capture that used this method. Finally, a slime-form may overload their wearer's mind by spiking their libido and sensitivity. This also overloads their own mind, cannot be undone manually, and will only reverse itself when the duo are fully satisfied.
If more than one member of your symbiote swarm has entered their slime form, they can combine into a larger slime with one body, two minds, and one will. swarm members may freely enter and exit such fusions without any negative side-effects. If any members of such a fusion have innate biological or genetic abilities, this will catalyze the appearance of those in the others. The specific expressions of these gifts will not always be consistent between subjects. For example, a Quirk user in such a fusion would cause others in it to gain Quirks of their own, and not necessarily similar ones. This feature cannot copy Heritage powers.`,
})

bindings.push({
  title: 'Shroud of Power',
  cost: 80,
  desc: `You gain a semi-sapient cape of solidified magic that acts as an extension of your will. It shifts and transforms at a thought, even unconscious ones. By draping it over or wrapping up a waifu with it, you are able to infuse your target with your will and bind them to it.
This cape is subject to the same protections as the company smart device. It can shift its form and texture into a wide variety of shapes and imitate any other outfit, ropes, tendrils, hands, blades, and similar forms. The constructs of the Shroud may have the textures and forms of textiles like leathers, latex, or other forms of clothing. The shroud is extremely durable and capable of significant amounts of strength and speed, and you gain a form of tactile feedback from it.
To capture a target, you or your Shroud must maintain contact with them or one of their projections until you’ve infused enough of your will, whether through the target wearing an outfit your Shroud has been transformed into, being cocooned by your Shroud’s constructs, or similar. As a general rule, the more of your Shroud is focused on, inside of, or otherwise in contact with your target, the less time it takes. The greater the power, will, or resistance your target has, the longer it will take. With the entirety of your Shroud around a target, even if they put their all into the struggle, it will usually take less than a minute for a blue-star subject, under ten minutes for a copper-star subject, an hour for a silver-star subject, three hours for a gold-star subject, and 12 hours for a T11 subject. Lesser amounts of your Shroud in contact with a target, or only intermittent contact, will extend the time required, up to years. If a target has an already-existing mental or spiritual connection to other bodies or people, the shroud can follow that connection to bind everyone on it at once. Examples of this include the Misaka Network, divine avatars or those who’ve taken mortal hosts, and multi-summon Servants like Gemini, Valkyrie, or Anne and Mary. Mere followers or even clerics of a god do not count.
With only the basic Shroud, however, the bind can fail to take in subjects that are T5 or higher. This happens when the subject’s effective tier after step 6 is more than one higher than your own, skipping steps 4 and 5 for the target but not you. In this event, which will occur regardless of the subject’s consent and even if the subject was a purchase, the bind will appear to succeed, only to break after a short time. Consenting subjects whose bindings fail will be marked with a stamp tattoo like any unbound capture so you can try again later, while non-consenting subjects will break free completely, denying you their capture credits until a successful attempt is made. If a subject who is already shroud-bound becomes strong enough to rise past this limit while in your service, their binding will not break. This does not include the upgrades from capturing a character “early.”
Other factors can reduce the required time. Examples include the number of orifices your Shroud has penetrated, any of your essence/fluids you have inside her, or if she’s unconscious, been recently defeated by you or your retinue, having sex with your or your retinue, or consenting to the bind. As a general rule, each additional factor reduces the time required to complete the infusion by half. A willing and aware (but not necessarily informed or ‘unassisted’ consent) target can make the process functionally instantaneous regardless of their personal power.
Once completely infused, the waifu becomes one of your Shroud-bound. A newly Shroud-bound waifu’s clothes and makeup are absorbed into a cloak of her own, subordinate to your Shroud, and replaced with a new thematic style in line with your tastes and the personal mark of your stamp. Existing enchanted gear or otherwise super outfits, such as Life Fibers, power armor, or magical girl uniforms, will be integrated into this cloak, as will any upgrades added after the fact. This does not apply to gear that is held rather than worn.
A Shroud-bound waifu will always consider her cloak her most comfortable outfit, but she may still dismiss it and wear normal outfits at any time. Both of you will be able to manipulate this outfit much like you can your Shroud, though your will supersedes hers in such manners. These powers are innate abilities, granted by the Shroud, and do not require any magical talent. Altogether, this is enough to push any blue-star retinue member up to Tier 4 or any copper-star up one tier, but is not a significant gain for higher tiers. Your own rating immediately increases to Tier 4, if it wasn’t already, and can increase further with training.
Until she is bound, your accumulated will within her will slowly dissipate whenever she loses contact with your Shroud. It takes approximately a month for the process to completely reset for a waifu who’s just short of being fully captured. Shroud-bound do not count as your Shroud for the purposes of binding new targets. Direct contact with one will, however, delay the fading of any will you've already built up within her.
Once Shroud-bound, a new capture gains an unconscious awareness of your activity and needs. They may even respond to orders you haven’t consciously given yet. They will greatly struggle to go against your direct orders, and even the strongest willed waifus will be unable to go against your intent once bound. Additionally, the infusion will shift Shroud-bound waifus’ figures to your tastes.`,
})

bindings.push({
  title: 'Three-Piece Suit',
  cost: 15,
  whitelist: ['Shroud of Power'],
  desc: `Your Shroud may now be split and sectioned off, such that you functionally have multiple Shrouds. You could give a target an article of clothing to wear while still retaining the power of your personal Shroud. If your Shroud is elemental, you may separate one portion of it without worrying about it dissolving. This can only be created from yourself or extant manifestations of your Shroud.
These always retain the standard company protections on devices and may be recalled at any time. You may control these pieces separated from yourself, but must be directly aware of them in some manner, such as a line of sight or more exotic senses. You do not receive the tactile feedback from separated pieces as you do with your primary Shroud.
This Perk may be repurchased multiple times. With the ninth purchase, your Shroud will develop to the point that you may separate as many portions from it as you would like.`,
})

bindings.push({
  title: 'Elemental Shroud (___________)',
  cost: 96,
  whitelist: ['Shroud of Power'],
  desc: `Congratulations! Your Shroud has been upgraded to the elemental manifestation type! Choose one element for your personal Shroud from the list in the Additional Rules section. (Your retinues’ cloaks are not affected.) No longer purely physical, the Shroud is an elemental manifestation of your will, granting you a noticeable buff to your affinity with that element, as well as allowing you to generate and control significant amounts of it. The cap on the effective tier of subjects you can successfully bind is raised by one.
Your Shroud’s manifestation is always intense and obvious, such as a black void for Fearful Shrouds, burning flames or magma for a Volcanic Shroud, or a seemingly star-filled cosmos for the Void Shroud. As an extension of your will, it will only harm that which you wish it to harm. You may take control of a natural manifestation of your element by mixing in some of your Shroud into it. Manifestations of the element with a will of their own must be infused with your will the same way a waifu must. However, a willing manifestation may allow you to manipulate them, such as using a Cyber Shroud to repair a willing gynoid. Willful manifestations must either be bound like any other capture or released when you have no further need of their substance.
These elemental shapes and tendrils must be contiguous with you or each other. Portions of Shroud that lose contact begin to dissipate, generally within ten to thirty seconds. Your waifus, their Cloaks, and waifus in multiple bodies all count as “you” for the purposes of Shroud sustenance. As an example, you can create a ring with the Xeric Shroud that would quickly crumble into nothingness if it left your body, but it would not if one of your waifus wore it.
Your Shroud can only be damaged by things which could feasibly harm the element itself, such as water affecting the Volcanic Shroud while physical strikes cannot, or gravitational effects damaging the Void Shroud. Even non-physical elements such as light and shadow are capable of becoming tangible, such as by becoming the physical cloak once more, though by doing so they can be damaged by physical forces.
Finally, you get the Body and Soul Talents for free. Each specific element, additionally, provides additional free Talents and/or single copies of free Defenses. These can ignore prerequisites.`,
})

bindings.push({
  title: 'Prismatic Shroud (___________)',
  cost: 0,
  whitelist: ['Elemental Shroud'],
  desc: `Choose an additional element for your Shroud. It may now express either of these elements or themes, but only one at a time. True mergers of multiple elements are not possible, but practice will let you rapidly switch between them and keep the previous element’s manifestations active for longer afterwards. Doing so with directly-conflicting elements, such as the Volcanic and Boreal or Primal and Burial Shrouds, requires much more practice.
This expansion may be repurchased as many times as desired, until all listed Shrouds are acquired. Each purchase costs 54 credits, plus 10 credits for each element you already have, including the element from Elemental Shroud.`,
})

bindings.push({
  title: 'Complementary Colors',
  cost: 25,
  whitelist: ['Elemental Shroud'],
  desc: `Select a member of your retinue. They are now shroud-bound, bypassing the tier limit, with a cloak that has elemental properties much like your own. Unless you deign to allow them an element you personally possess, one will be extrapolated from their current affinities and hypothetical developmental trajectories. Your waifus may have unique elements not found on the standard list, whether hybridized from standard elements or entirely new. If you buy this perk for a waifu when you purchase her, she will be shroud-bound before delivery, bypassing the tier limit.
In this way, your waifu will gain all the benefits like your own Elemental Shroud, that is, aesthetic harmonization for their constructs and cloak, an affinity for the element in other power systems, and the ability to generate and control said element. Unlike you, retinue members may only have a single element. This increases the Shroud tier boost for your retinue members to +3 for blue-stars, +2 for copper, and +1 for silver. Your retinue members who benefit from this perk do not receive the free Talents or Defenses that you get from Elemental Shroud or each particular element.
Additionally, with the first purchase of this perk, you can project your own Shroud through shroud-bound members of your retinue. This bypasses the usual limitation against your retinue members binding others using your shroud, but requires a powerful multitasking ability or extreme amount of practice to do so effectively.
Once you’ve purchased this perk ten times, all new shroud-bound waifus will automatically receive an Element without any further purchases. The cap on the effective tier of subjects you can successfully bind will be raised by one. Additionally, all new purchased waifus will be shroud-bound before delivery. This removes the shroud-binding tier limit for all purchases and consenting captures. If you buy ten copies of this perk in your starting build, this will apply to all waifus purchased at that time as well.`,
})

bindings.push({
  title: 'Grand Tapestry',
  cost: 100,
  whitelist: ['Complementary Colors', 'Conjunction'],
  desc: `You and your waifus with elemental shrouds are now able to access each other’s elements through the sympathetic bond your Shroud represents. On a basic level, drawing on another’s Element allows you to generate and manipulate things within their purview as if the element was your own, complete with aesthetic palette swaps and altered material profiles as appropriate.
Affinities granted by someone else’s element, however, are capped by the intimacy - or at least, the intensity - of one’s relationship with them, which can complicate attempts to squeeze waifus for power. Conversely, maximizing social links through careful harem management (or blunt mind control) will allow even diametrically opposed and incompatible themes to be reconciled and harmonized with each other as one through the strength of shared affinities. These bonds also support your ability to bind more powerful subjects, raising the cap on the effective tier of subjects you can successfully bind by one.
Take Psychic Talent for free. Shroud-bound retinue members will benefit from the effects of it and all other Basic Talents you have that do not otherwise apply to your retinue, whether you have Talent Sharing or not. (Take a full refund on all previous purchases of Talent Sharing. Those purchases will continue to apply to non-shroud retinue members.)
Skill at manipulating constructs and phenomena is tracked separately and individually for each theme. Juggling and utilizing multiple themes at once is also a skill to be mastered.`,
})

bindings.push({
  title: 'Elemental Loom',
  cost: 50,
  whitelist: ['Elemental Shroud'],
  desc: `Your Shroud has been upgraded into a gaseous aura and its manifestations no longer need to be obvious and intense. A Volcanic Shroud no longer needs to create flames, but instead be a temperature change; the Primal Shroud can create and manipulate bacteria and viruses, the Cyber Shroud can affect purely digital code, etc.
You gain an additional sense related to the element(s) of your Shroud within your aura, though reading and understanding it will take practice. The Cyber Shroud may let you access wifi and bluetooth devices, or you can feel spatial distortion with the Void. You may infuse yourself with your element, increasing your strength, speed, and durability significantly.
While the rules for contiguous manifestation are still in effect, the Shroud does not need to have the same intensity across the entirety of it. As long as you are able to understand how your element can be expressed in non-obvious ways in the air around you, such as changing a room’s humidity or brightness or creating slight spatial distortions, you will be able to manifest intense examples of your element in apparent midair around you.
To reiterate, with an intense manifestation of your Shroud enveloping a target, no matter how hard they resist, binding them will generally take a minute, ten minutes, an hour, three hours, and twelve hours for a blue-star, copper-star, silver-star, gold-star, and T11 waifu respectively. Waifus within your ambient aura are still in contact with your Shroud and may still be bound by it, but the process will take much longer. If a waifu is exposed only to these milder effects, binding a member of each category will generally take hours, days, weeks, months, and years, respectively.`,
})

bindings.push({
  title: 'Deep Weave',
  cost: 25,
  whitelist: ['Elemental Loom'],
  desc: `Your Shroud is no longer merely an extension of your will, but part of your being. You are able to transform portions of yourself into your element(s) and heal or recharge yourself by absorbing manifestations of said element that you didn't create. If you had not already been capable of flight with your Shroud, you are now capable of such.
Once again, controlling an elemental manifestation that has a will of its own involves usurping said will with your own like any other sapient target. Individuals absorbed in such a manner, such as a gynoid via the Cyber Shroud, or a normal human via the Primal Shroud, may be bound like anyone else, recreated and released from your service, or their form stolen. This process is instant if performed on a shroud-bound retinue member. This process is based on the Possess Origin. New skills, traits, and abilities gained via this method are added to your true form as if you had Possessed the character. You also gain the target’s episodic memory, as if you had Substituted into them.
Manifestations whose forms were stolen count as captured, but you do not get a credit reward for doing so. You may still sell a stolen form to the company afterward like any other target for 20% of the list price for the target’s effective tier after step 4, rounded up to the nearest whole number. This will remove the form from your library.`,
})

export const lureDesc = 'Lure-type controls are more subtle than bindings, but cannot directly capture targets. All lures work equally well on male, female, and other targets, and instead only obey the user’s orientation. You may purchase any number of lures. Like all company-supplied powers, lures cannot be nullified, copied, or stolen.'

export interface Lure {
  title: string
  cost: number
  desc: string
  special?: string
  whitelist?: string[]
  image?: string
}

export const lures: Lure[] = []

lures.push({
  title: 'Sticky Fingers',
  cost: 5,
  desc: 'You know all the points that make a waifu melt. You can play her like a piano. Your very touch is electrifying. You are also a sexual savant. Keep a waifu on the edge long enough, and she’ll promise anything to make it stop. With your skills, she’ll be sure to keep that promise. This lure cannot affect targets who lack a sense of touch.',
})

lures.push({
  title: 'Faerie Feast',
  cost: 10,
  desc: `Your cooking is supernaturally good, capable of making miracles from the worst ingredients. Just one taste is enough to hook a waifu for life - assuming, of course, that she can taste. Even if she doesn't like you, she'll be unable to imagine a world where she can't eat your cooking every day, and stay with you for that alone. Over time, you can leverage this dependence into obedience through simple operant conditioning and, in turn, create real affection by enforcing faked affection.
The quality of your ingredients doesn’t matter, but they must be real ingredients. This lure will not let you cook without the proper tools, unless you have an adequate substitute. This lure also covers drink-mixing, butchery, and chemical food processing, but does not help with gardening, farming, animal husbandry, fishing, etc. - that’s biology, not chemistry. If you want to use this lure’s gifts as a professional skill, you can dial your ability down to world-class-chef levels, enough to ensure great business (and plenty of repeat customers) without tripping any "this food might be literally addictive" alarms.
This lure cannot affect targets who lack a sense of taste.`,
})

lures.push({
  title: 'Don’t Stand So Close to Me',
  cost: 15,
  desc: `Hot for Teacher. Targets that either teach you or are taught by you, no matter the subject, will start to fall for you. They’ll find themselves thinking about the subject matter, about your instruction, about the next lesson, and you yourself will worm your way to the forefront of their thoughts, even as worrying about their next lesson, getting good grades, or encouraging learning twists itself into a more romantic or sexual nature.
The longer, more personal, and more intense the instruction, the greater the effect. Students already interested in the subject matter are particularly susceptible. This perk is optimized for 1 on 1 instruction.`,
})

lures.push({
  title: 'Arlo',
  cost: 15,
  special: 'at least one retinue member whose apparent age is younger than yourself.',
  desc: `The sight of a cute kid calling a new haremette “mama” has real power. Select a retinue member whose apparent age is younger than yourself to act as bait and approach the target together. This need not be the same individual every time. The bait acts as your child or younger sibling, playing the target’s parental/nurturing instincts against them by signaling that you have a need for a caretaker in your household - and the bait would prefer that caretaker to be the candidate right in front of them. This lure is stronger if:
The target has stronger parental/nurturing instincts.
The bait is your direct descendant or younger relative, or registered as adopted through our systems.
The bait is cuter or more vulnerable - or at least appears so.
The bait’s apparent age is sufficiently younger than the target’s real age.
This lure will not affect targets whose race (human, kitsune, vulcan, etc.) is naturally incapable of having children.`,
})

lures.push({
  title: 'Alluring Whisper',
  cost: 20,
  desc: 'Your voice is supernaturally alluring. Merely whisper in a target’s ear, and her heart (and panties) will turn to goo. Better results will come with vocal training and improved phrasing. (You can also use this perk to become an ASMR superstar. We won’t judge.) Beings with sufficient willpower can resist or even block this lure. It will never affect someone who lacks a sense of hearing.',
})

lures.push({
  title: 'Love Spot',
  cost: 20,
  desc: `Just like Diarmuid's in Fate/Zero: you gain a mole under one of your eyes that fascinates any woman who sees it and makes them infatuated with you on the... spot. If you already have a mole in such a location, you don't get a second one. If you’d rather not have a beauty mark, this lure can be re-fluffed to make any one body part supernaturally alluring. The charm effect relies on line-of-sight: it may be blocked by covering up the alluring asset, but not turned off. The effect intensifies with exposure.
This lure may be reduced or nullified if the target has enough magic resistance. It will never affect targets who lack a sense of sight.`,
})

lures.push({
  title: 'Potpourri',
  cost: 20,
  desc: `Your sense of smell is more acute than most, detecting and cataloging scents and their origin, and studying others to see their reactions to them. You have also gained some control over how you smell, letting you manipulate others on a level that most would never notice and the rest might just think unusual. From the scent of roses to call up some passion in a romance, to that of freshly baked cookies to aid in relaxing others, you have figured out how to use those scents to alter their emotions, often convincing them to let their guard down or spark conflicts between others. This also allows you to pick up on pheromonal cues and scent based languages/markings, if you have some experience with them. You can also choose to "tune out" specific scents after some experience.
This perk cannot affect targets who lack a sense of smell.`,
})

lures.push({
  title: 'Zenryoku Zenkai',
  cost: 20,
  desc: `Full Power! Total Destruction! Targets you defeat in combat or another contest, whether physical, mental, or social in nature, will fall for you all the harder. You’ll be at the forefront of all their thoughts as their wish to meet you again to even the score twists itself into a more romantic or sexual yearning. The more decisive and dramatic your victory, and the higher the perceived stakes for each of you, the stronger this lure’s effect. Defeating a target in a training spar will have only negligible results, but stopping a villainess in a life-or-death battle for the fate of a universe will add her to your harem practically the moment she wakes up.
This lure is optimized for symmetric 1v1 duels in the target’s specialty field. The contest must be initiated or otherwise freely accepted by the target, even implicitly. This lure drops in effectiveness the more you rely on equal teammates; in contests of leadership ability, from team sports to military command, any unit who follows your instructions or plans will not count as a teammate. If your target catches you cheating in a match that has strict rules, this lure will not apply to the result even if you nominally win. If you catch your opponent cheating in such a match, this lure will still apply to the result even if you nominally lose.`,
})

// If you ever trade in a lure, any expansion you bought for it will be refunded automatically at the standard rate. Like all company-supplied powers, the powers granted by these perks cannot be nullified, copied, or stolen.

lures.push({
  title: 'Sticky Fingers: Brown Sugar',
  cost: 15,
  whitelist: ['Sticky Fingers'],
  desc: 'A natural aphrodisiac flows through your veins, further enhancing any sexual experience in which your fluids are involved. You are immune to this aphrodisiac even without Body Defense. Additionally, if you have male genitalia, you can secrete a natural lubricant from it when aroused. This aphrodisiac will be included in that as well.',
})

lures.push({
  title: 'Faerie Feast: Master Chef',
  cost: 10,
  whitelist: ['Faerie Feast'],
  desc: 'When you are in charge of, or at a minimum supervising, the staff of a cooking facility, the benefits of your Faerie Feast perk will apply to the end product as though you had personally produced any food cooked there. If the staff primarily consists of your waifus, you don’t even need to be present, provided they follow a specific menu and set of guidelines that you’ve instructed them in. These guidelines can include extraneous non-food related steps. This does not apply to industrial-scale food production or ingredients that are not themselves edible.',
})

lures.push({
  title: 'Faerie Feast: The Secret Ingredient is Love',
  cost: 5,
  whitelist: ['Master Chef'],
  desc: 'Members of your retinue that are already skilled at cooking no longer need your guidance to benefit from Faerie Feast, provided at least part of the meal is intended for consumption by you or other members of your retinue.',
})

lures.push({
  title: 'Alluring Whisper: Siren’s Song',
  cost: 80,
  whitelist: ['Alluring Whisper'],
  desc: 'Your voice is supernaturally compelling. As an active effect, you can empower your words to give specific commands to individuals, or rally a crowd with a song. Additionally, take Performance Talent for free. Beings with sufficient willpower can resist or even block this lure. It will never affect someone who lacks a sense of hearing.',
})

export const lureExpansionDesc = 'These perks are either expansions to multiple Bindings or serve as alternative methods to capturing or controlling your retinue. Like all company-supplied powers, the powers granted by these perks cannot be nullified, copied, or stolen.'

export const lureExpansions: Lure[] = []

lureExpansions.push({
  title: 'Conjunction',
  cost: 25,
  whitelist: ['Second-Generation Symbiote', 'Complementary Colors'],
  desc: `In addition to its other effects, the Binding method you use now adds its subjects to an empathic and telepathic group mind centered on yourself. This group mind operates on two levels: the higher, active, level allows everyone connected to participate in the telepathic equivalent of a chatroom, regardless of distance or barriers, such that you could even communicate between different multiverses. Your retinue members may actively share and experience each others’ senses through this network. The deeper, passive, level gives your waifus a full awareness of your activity and needs, such that they may even respond to orders that you haven't consciously given yet.
This is only a group mind, not a hive mind. You and all your waifus retain your full individuality within the network and have no risk of forgetting whose life is whose. Any morality shifts that your waifus may develop are simply the result of close mental proximity to, and enforced empathy for, people with vastly different backgrounds and life experiences than their own.
If you have the Symbiote, higher-ranked hosts in the swarm’s hierarchy will have more privilege in this network than lower-ranked hosts. As the person at the top of the hierarchy, you can demand access to the sensory feeds of anyone in the network and receive it without question. If you have the Shroud, your ability to read the minds of your waifus and access their senses is not so intuitive - at least not with this perk alone.
Additionally, retinue members bound through the method you used to unlock this expansion, whose powers rely on a background magic field and are operating outside of one will no longer be hampered when outside your presence. With this perk, they are always in your presence, no matter the distance.`,
})

lureExpansions.push({
  title: 'Apportation',
  cost: 25,
  whitelist: ['Basic Tempest Runes', 'Shroud of Power'],
  desc: `You and the retinue members you’ve bound, through the method you used to unlock this expansion, are now capable of teleporting yourselves, or anything in hand, to anyone else within your retinue as a whole with a few moments’ concentration. Doing this without some method of advance warning may be ill-advised. If you have Pocket Apartment or higher, you may teleport objects into appropriate spaces in the apartment instead of dropping directly in on someone else. If you have All Roads Lead To Home or Rainbow Bridge, you and your waifus may always teleport into the apartment instead of opening portals therein. If you do so personally and then try to open a portal out, you must still place the exit reasonably close to your previous outside-world location.
Teleporting something you have in hand does not require ownership, but certain conceptual limitations and the time required to initiate and complete the teleportation prevent this ability from being used as an attack or defense vector. You can’t strip your enemies of their Infinity+1 armor by grabbing hold of them, let alone telefrag people, nor shunt incoming bullets into a containment unit back at home.
A person or item held by your or a retinue member’s telekinesis, Shroud, or insides (or some other method) may be teleported as if it’s literally in hand. Merely encompassing it with subtle manifestations of the Shroud (as enabled by Elemental Loom) doesn’t count. The Tempest Jewelry version of this perk uses the jewelry pieces themselves as beacons and cannot work through any deactivated pieces.`,
})

lureExpansions.push({
  title: 'Hotel California',
  cost: 20,
  desc: `This seemingly-innocuous entertainment or hospitality venue uses a legitimate business of your choice as a cover for mind control. Options include, but are not limited to, a pub, restaurant, amusement park, music venue, circus, casino, and luxury resort. Strip clubs in particular are a perennial favorite. Most customers are only compelled to spend more and bring their friends when they come back, but a very different fate is in store for those you select as capture targets. As they spend time within your walls, they’ll be beautified according to a blend of your standards and the establishment’s overt purpose.
After some time, your staff will offer each of your targets the chance to experience your business from the other side by helping out with a short performance, or other task, that lasts no more than ten minutes. The building’s compulsion will make them agree; a skill download during the run-up time will more than compensate for any lack of experience or talent. As they do their task, they’ll be further transformed to match your chosen theme and become yours when they’re done. Waifus acquired in this way are considered captured like anyone else.
Themes can be changed at any time, but require you to have at least three purchased or captured waifus who already fit that theme pre-transformation. If you want a robots theme, you need at least three cyborgs, gynoids, or software AIs; if you want maids, you need at least three actual maids or characters who dressed as maids at least once in canon or official art.
The actual building exists in a secure dimensional space. Its front entrance uses applied quantum uncertainty to open in random-but-fateful locations throughout the multiverse. Customers will always return to the same universe they came from and won’t notice anything strange about any customers from other worlds that they may encounter within. A side door allows you and your waifus access to your local universe.
You are immune to your own building’s effects, but will be required to experience every one of your employee’s jobs firsthand at least once. (Temporary genderbending and other transformations will be provided if necessary.) Your employees are immune to repeat or any further transformations, unless you reassign them to other positions or choose a new theme, in which case they’ll be changed to fit their new role.
If you have the Alterzelu Symbiote, any of your employees who are both not bonded with a symbiote and are alone in an employees-only room for more than a few minutes risk getting attacked by a stray larval symbiote. Your waifus who are already bonded with one will not help the newbies until it’s over.`,
})

lureExpansions.push({
  title: 'Command Seals',
  cost: 5,
  special: 'At least one Nasuverse Servant',
  desc: `These sets of three Command Seals each will appear somewhere on your body, forming an abstract design unique to you. Each Command Seal allows you to give one unbreakable order to a Servant under your control, along with a power boost for the duration of the order. The more specific the order and the shorter its duration, the stronger the boost and according compulsion, and vice versa. General orders with indefinite durations can, eventually, be ignored, but a specific command with an instant duration will offer the Servant no chance to resist. One spent Command Seal will regenerate every 24 hours. You may have as many sets of seals as you have purchased or captured Servants, counting only the characters denoted as Servants in this CYOA. The first set of seals is free.
If you purchase or capture an eligible Master from a published Fate/ work, and have at least one Servant per Master, you can delegate a single Servant to each. Canon Master-Servant pairs take priority. Delegate Masters' Command Seals are free and regenerate independently at the same rate as yours, but still count against your total and cannot be directly used by you. If you ever find yourself in an actual Holy Grail War, and all of your Command Seals are delegated, you will still have an inert set of Seals that may be used to summon, or contract with, a Servant locally. A locally summoned or contracted Servant will not be bound unless you apply a Binding-type control.
Each Ruler-class Servant you summon may carry six additional sets of Seals on their body. These extra Seals must be paid for, regenerate independently from any others, and may be used by yourself or any delegate Master.`,
})

lureExpansions.push({
  title: 'Command Seals: General Seals',
  cost: 10,
  special: 'Retroactively removes the previous control’s Nasuverse Servant requirement.',
  whitelist: ['Command Seals'],
  desc: 'Command Seals may now be used on any purchased or captured waifu, not just Servants. Your Command Seals purchase limit now counts all non-canon Servants of any tier and all non-Servant retinue members of tier 6 or higher, in addition to all Servants. This ignores all effective tier changes after step 4.',
})

lureExpansions.push({
  title: 'Divine Marking',
  cost: 20,
  special: 'At least one deity from the Danmachi setting',
  image: 'https://static.wikia.nocookie.net/powerlisting/images/5/5d/Danmachi_Gods_Falna_Blessings.png/revision/latest?cb=20190707034500',
  desc: 'A deity in your service who grants or updates a Falna, including non-Danmachi deities who’ve learned how to do so, are considered to be applying a Stamp to the Falna’s holder, even if you lack that binding. The Falna itself will seem no different than normal. This Falna-Stamp requires the normal three-day period to fully bind the recipient.',
})

lureExpansions.push({
  title: 'Space Truckin’',
  cost: 100,
  special: `At least one of each of the following:
    <ul class="list-disc list-inside">
      <li>Land vehicle purchased or registered through Catch-a-Ride</li>
      <li>Retinue member who is a deity or capable of true resurrection</li>
    </ul>`,
  image: 'https://i.imgur.com/cNBAVke.png',
  desc: `The legendary Truck-kun is your vehicle. When you or one of your retinue members drives a land vehicle that’s been registered with us as yours, anyone you run over with it will be captured, as if by the Stamp, and sent to a random world that you do not already have access to. Your target must actually die from the impact, but not necessarily immediately. The capture will fail if the target evades your vehicle or survives the impact. The maximum number of active isekai victims you can manage simultaneously scales with the number and tier of deities in your retinue after step 5, as shown in the chart. Your total cap is the sum of the individual caps of each deity in your retinue.
Worlds your isekai targets are sent to will not become accessible to the rest of your retinue through Exit Stage Left or other company perks until the target completes a local storyline (charges Exit Stage Left to completion). This will count as you charging Exit Stage Left yourself. If the target dies before they can do so and you have Warranty Plan, they will respawn in your demiplane (if you have one) or otherwise near you, where they can be bound through your other means. If you have We Will Meet Again or Rainbow Bridge, they can then return to the world they were sent to, with any reinforcements or other support you choose to give them. Neither successful nor failed isekais are “active” and will not continue to count against your cap above.`,
})

lureExpansions.push({
  title: 'Space Truckin’: Highway Star',
  cost: 100,
  whitelist: ['Space Truckin’'],
  desc: 'Active isekai victims from Space Truckin’ will now act as proxies for your own captures. Until the victim completes a local storyline or dies in the process, sincere love confessions delivered to them will bind the confessor to you just as one that you received directly. Your isekai victim will also experience the full benefits of your Lures and Lure Expansions for this duration, as if they were you.',
})
