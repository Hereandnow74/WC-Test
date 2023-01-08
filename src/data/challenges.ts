import { findIndex, sample, random } from 'lodash-es'
import { WORLD_RATINGS, allWorldsNoCondition } from './constants'
import { addFreebies, deleteFreebies } from '~/logic'
import { useStore } from '~/store/store'

export const challengesDesc = `
<p>Challenges should be picked after you pick the World but before you make any other purchases.
Challenges are not a part of a canon Waifu Catalog so you have more freedom in interpreting them or proposing new ones though 'Propose Perk' button.</p>
<p>You can pick a several challenges at the same time if they don't conflict with each other.</p>
`

const { fullStartingBudget, companions, baseBudget, startingWorld, defensePerks } = useStore()
let defenseWatcher = null

const employee = { uid: 6666666, name: 'Employee #6.02214076e23', world: 'The Company', tier: 10, priceTier: 0, method: 'unbound' }
let rouletteWatcher = null
const cultFreebies = {
  defensePerks: [{ title: 'Stress Defense', cost: 0, count: 2 }],
  talentPerks: [{ title: 'Everlasting Talent', cost: 0, count: 1 }],
  homePerks: [{ title: 'Pocket Space', cost: 0, count: 1 }, { title: 'Pocket Apartment', cost: 0, count: 1 }],
}

export const challenges = [
  {
    uid: 'QbKw9',
    title: 'Two Dime',
    image: 'https://cdn.discordapp.com/attachments/925963686433132644/993238534418858094/D4olW79XkAEhgj-.jpg',
    dlc: 'Om1cr0n',
    special: 'DR4 or higher',
    cost: 0,
    desc: `
    <p>Company's newly hired Highly Effective Manager come up with the idea of how to increase the profits, she decided that people that where rejected by Company before should be given a chance to succeed with a modified contract. </p>
    <p>Congratulations you where choosen to become a new contractor of the Company lucky you! You will receive a whole 20 credits to make any purchase you want found in this catalog choose wisely. What do you think it's too little, fret not you will be able to take a loan after you make your first 3 Captures up to 50% of your total spending's, aren't we generous?</p>
    `,
    effect: {
      set: () => baseBudget.value = 20,
      remove: () => baseBudget.value = WORLD_RATINGS[startingWorld.value.rating].budget,
    },
  },
  {
    uid: 'U8fCr',
    title: 'Freedom Anomaly',
    image: 'https://cdn.discordapp.com/attachments/925963686433132644/993238326645629070/HD-wallpaper-break-pretty-sweet-angry-arturia-pendragon-arturia-nice-emotional-anime-beauty-anime-girl-weapon-sword-chain-lovely-excalibur-mad-blonde-sinister-saber-blond-shout-beautiful-break.jpg',
    dlc: 'Om1cr0n',
    cost: 0,
    desc: `
    <p>&#9632;&#9632;&#9632;&#9632;&#9632;&#9632; department of Company found an anomaly in &#9632;&#9632;&#9632;&#9632;&#9632;&#9632;&#9632;&#9632; world and &#9632;&#9632; contractors were already lost, you are tasked to resolve it.</p>
    <p>Anomaly prevents work of any bindings, analyze suggest that someone or something doesn't want people from this world be bound, available information suggest that 'binding by confession' can still be achieved.</p>
    <p>Company deemed this situation &#9632;&#9632;&#9632;&#9632;&#9632;&#9632;&#9632;&#9632; so you will be accompanied by Company employee who's equivalent to T10 companion in power and was tasked to help you get a handle on situation.</p>
    `,
    effect: {
      set: () => companions.value.push(employee),
      remove: () => companions.value.splice(findIndex(companions.value, { uid: 6666666 })),
    },
  },
  {
    uid: 'tW5KX',
    title: 'Waifu Manager',
    image: 'https://cdn.discordapp.com/attachments/925963686433132644/993232597574504488/download.jpg',
    dlc: 'Om1cr0n',
    special: 'DR7 or higher',
    cost: 0,
    desc: `
    <p>While you are prime candidate for becoming a Contractor our automatic &#9632;&#9632;&#9632;&#9632;&#9632;&#9632; marked you as a &#9632;&#9632;&#9632;&#9632;&#9632;&#9632;&#9632;&#9632; all Contactors with this designation have their personal power restricted to that of T4 and this restriction is absolute you will not be able to do anything that will increase your power level more that T4 such as operating Power armor, changing your race, using TX tickets and all other possible methods will simply won't work or their output will be restricted to T4 level.</p>
    <p>Receive 80% of companion cost for the capture, instead of the default 60%.</p>
    `,
  },
  {
    uid: 'K7Zhp',
    title: 'Strict Travel Mode',
    image: 'https://cdn.discordapp.com/attachments/925963686433132644/993235796368834651/Screenshot_1.jpg',
    dlc: 'Om1cr0n',
    cost: 0,
    desc: `
    <p>The Company has decided to enforce stricter rules for world traveling. From now on, multiversal travel by any other means other than the company-provided Exit Stage Left functionality will be restricted.  Travel to worlds apart from those you visited already is forbidden. If you don't have We Will Meet Again after each jump to a new World, other traveling methods will be disabled completely until you fill the Exit Stage Left progress bar to the next World to 100%.</p>
    `,
  },
  {
    uid: 'KcxSe',
    title: 'Wild GIRLFRIEND appeared!',
    image: 'https://cdn.discordapp.com/attachments/925963686433132644/993235853142921236/Screenshot_2.jpg',
    dlc: 'Om1cr0n',
    cost: 0,
    desc: `
    <p>All bindings will work only on unconsciousness and defeated by you characters, binding will happen after 3s of continuous application regardless of previous requirements.</p>
    `,
  },
  {
    uid: 'Z4jXA',
    title: '100,000 years of cultivation',
    image: 'https://cdn.discordapp.com/attachments/925963686433132644/993237709160189952/Screenshot_4.jpg',
    dlc: 'Om1cr0n',
    cost: 0,
    special: 'Chargen only.',
    desc: `
    <p>One of the Top Managers of The Company recently gained a fascination for the cultivation and managed to convince R&D department to create experimental program 'Super Contractors&#8482;' by locking them in a Time Bubble for 100,000 years before they will go to their first World.</p>
    <p>Overseer of the program can issue a missions for contractor to complete, but rewards will be restricted to improving contractor realm/home only.</p>
    <p>You can't have companions, leave or invite anyone inside for the duration of this challenge, but other parts of the Catalog will remain accessible to you. Receive Pocket Space, Pocket Apartment, Everlasting Talent, Stress Defense x2 for free.</p>

    `,
    effect: {
      set: () => addFreebies(cultFreebies),
      remove: () => deleteFreebies(cultFreebies),
    },
  },
  {
    title: 'Russian roulette',
    image: 'https://cdn.discordapp.com/attachments/925963686433132644/993232225531330570/Midari-Ikishima1.jpg',
    dlc: 'Om1cr0n',
    cost: 0,
    desc: `
    <p>After each capture/buy 1/6 rounded of your retinue members have 1/6 chance to get unbound, cleared of all mental effects and gain immunity for lures/bindings for a period of 14 days.</p>
    <p>(Example: if you have 8 members only one will roll the roulette, if you have 10 then two members will be rolling, 14 - three and so on.)</p>
    `,
    effect: {
      set: () => rouletteWatcher = watch(companions, () => {
        const count = Math.round(companions.value.length / 6)
        for (let i = 0; i < count; i++) {
          const waifu = sample(companions.value)
          if (random(1, 6) === 6) waifu.method = 'unbound'
        }
      }, { deep: true }),
      remove: () => rouletteWatcher ? rouletteWatcher() : null,
    },
  },
  {
    uid: 'ZpyEZ',
    dlc: 'KatzSmile',
    title: 'Power Trip',
    image: 'https://cdn.discordapp.com/attachments/925963686433132644/993233703893475520/05d2405d8ecfce5206766d28c6a0f630.jpg',
    special: 'Chargen only. May not be taken on DR11.',
    cost: 0,
    desc: `
    <p>You are incredibly lucky! You receive a unique offer from our company - an exciting journey through the multiverse.</p>
    <p>Only today you can choose any starting world and get +100% to its starting budget!</p>
    <p>But from now on, you will only be a client of our company.</p>
    <p>We are deeply sorry, but you will not be able to sell any targets you have captured. However, you can still participate in arranged PvP matches and complete missions or quests for our company, earning credits for them.</p>
    <p>Also the "Cash Still Rules" perk is no longer available to you. We do not need debtors who cannot pay.</p>
    <p>All purchases you do, except companions, will be final, you wouldn't be able to return them or buy anything else after chargen so choose carefully.</p>
    `,
    effect: {
      set: () => baseBudget.value = baseBudget.value * 2,
      remove: () => baseBudget.value = baseBudget.value / 2,
    },
  },
  {
    uid: 'qldtT',
    dlc: 'Kingcarlos',
    title: 'Good Luck Smiles on the Daring',
    image: 'https://cdn.discordapp.com/attachments/925963686433132644/993233300678246420/12_Universes.webp',
    special: 'Chargen only. May not be taken on DR11.',
    cost: 0,
    desc: `
      You have been chosen by the higher-ups to try something a bit different. The company has noted the long time it takes for contractors to choose their starting world. As this decreases processing efficiency, a new proposition was accepted to have the ■■■■■■■■ department select it at random. Newly accepted contractors will therefore have their starting world left entirely up to chance. In return, the company will provide  50% of the selected world's budget as a bonus.
    `,
    effect: {
      set: () => {
        const world = sample(allWorldsNoCondition.value)
        startingWorld.value = { worldName: world.worldName, rating: world.rating }
        if (world.condition) startingWorld.value.condition = world.condition
        baseBudget.value = (WORLD_RATINGS[world.rating]?.budget || 0) * 1.5
      },
      remove: () => baseBudget.value = baseBudget.value / 1.5,
    },
  },
  {
    uid: 'ZpyEq',
    dlc: 'shifty-sword',
    dlclink: 'https://docs.google.com/document/d/1Dasg0Yq3tgZ9mA6zL3G7_1VdBcq4pW_4qpwGImtXzRc/edit#',
    title: 'Skyblock',
    image: 'https://i.imgur.com/xcZQTi5.png',
    special: 'Chargen only. May not be taken on DR11. Cannot be taken with Wage Slave, Cash Still Rules, or Calming Up',
    cost: 0,
    desc: `
      A hardcore challenge inspired by Minecraft Skyblock mod, in which you start on a piece of land floating in the sky on a empty world.
      Your starting benefits will look like this:
      <ul class="list-disc list-inside">
        <li>0 Credits (On the Interactive you will receive 20 credits, so you can buy your T5 companion.)</li>
        <li>1 Company Stamp</li>
        <li>1 T5 Companion of your choice</li>
        <li>1 Skyblock</li>
      </ul>
      <b>Selecting this challenge will open another section with the full rules.</b>
    `,
    effect: {
      set: () => baseBudget.value = 20,
      remove: () => WORLD_RATINGS[startingWorld.value.rating].budget || 0,
    },
  },
  {
    uid: 'ZpyEq',
    dlc: 'DepressedAlucard',
    dlclink: 'https://docs.google.com/document/d/18LaGf5cy9hDA7ZAInhxVJoTocWfeLo0PI_msQsFu76Q/edit#',
    title: 'Glass Cannon',
    image: 'https://i.imgur.com/QFV6MEdl.jpg',
    special: 'Chargen Only, DR6 or higher, May not be taken on DR11.',
    cost: 0,
    desc: `
    For those who wish to either die as quickly as possible or rise to the greatest of heights, the company offers to forgo any company-provided defenses. No immunities, not even the basic resistances. Even the greatest of Chad's aren’t this suicidal. The only protections you will ever be able to acquire are those you gain along your journey or from the powersets you decide to acquire. As compensation for the <span class="line-through">hell</span> fun you are walking into, receive 80% of your starting world's budget as a bonus.
    `,
    effect: {
      set: () => {
        baseBudget.value = baseBudget.value * 1.8
        defenseWatcher = watch(() => defensePerks.value.length, () => defensePerks.value.length && (defensePerks.value = []))
      },
      remove: () => {
        baseBudget.value = baseBudget.value / 1.8
        if (defenseWatcher) defenseWatcher()
      },
    },
  },
  {
    uid: 'ZpyEq',
    dlc: 'DepressedAlucard',
    dlclink: 'https://docs.google.com/document/d/18LaGf5cy9hDA7ZAInhxVJoTocWfeLo0PI_msQsFu76Q/edit#',
    title: 'Natural Progression',
    image: 'https://i.imgur.com/b3Vnr41l.jpg',
    special: 'Chargen Only.',
    cost: 0,
    desc: `
    Sometimes it's not the final destination but the journey you took to get there that matters. The company has taken heed of the contractors who rush into worlds with their new powers, easily climbing up to the upper echelons of power with minimal effort. It has therefore decided to impose stricter rules on the manner in which contractor progress with their new abilities, in order to encourage a more natural and fluid form of progression.
    <p>All purchased powers and perks will now require actual time and effort to develop or unlock, as everything now starts at a level zero of power. Purchasing a Heritage perk will no longer instantly grant the associated boons, instead bestowing upon the contractor only the potential to eventually unlock said abilities and develop them further with experience, grit, and training. This does not affect static Items such as Psychic Paper and still allows defenses at the second level  to give you their full immunity.</p>
    `,
  },
  {
    uid: 'ZpyEq',
    dlc: 'DepressedAlucard',
    dlclink: 'https://docs.google.com/document/d/18LaGf5cy9hDA7ZAInhxVJoTocWfeLo0PI_msQsFu76Q/edit#',
    title: 'Lost Goods',
    image: 'https://i.imgur.com/r9pZJ5wl.jpg',
    special: 'Chargen Only.',
    cost: 0,
    desc: `
    Sometimes, not even the company manages to keep perfect track of every little detail in its infinite roster of contractors. Unfortunately for you, either due to an error in the system, some interference from the higher-ups, or just poor luck, one tiny little detail in your processing procedure was screwed up. It seems your memories were not carried over.
    <p>Upon your arrival to your chosen world, you will have no idea who, what or where are you. All your knowledge of fictional realities, any knowledge of the perks you have chosen, and why there are cute girls following you has been lost with no chance of recovery. As compensation for this minor error, the company will issue 40% of your starting world's budget as a bonus. </p>
    `,
    effect: {
      set: () => baseBudget.value = baseBudget.value * 1.4,
      remove: () => baseBudget.value = baseBudget.value / 1.4,
    },
  },
  {
    uid: 'ZpyEq',
    dlc: 'DepressedAlucard',
    dlclink: 'https://docs.google.com/document/d/18LaGf5cy9hDA7ZAInhxVJoTocWfeLo0PI_msQsFu76Q/edit#',
    title: 'Frog in a Well',
    image: 'https://i.imgur.com/XyHjUKDl.jpg',
    special: 'Chargen Only.',
    cost: 0,
    desc: `
    It seems that you won’t be getting the omniversal world-hopping adventure you were promised. Your starting world will now be the one and only world you will ever visit. No hopper power, company perk, or waifu will be able to help you leave the world you first chose to appear in unless it's to visit your Demiplane or the Green Eye Orb Markets.
    <p>You are fortunately granted some extra leeway in worlds composed of multiple universes, as in this case you are able to travel between them without any complications. If however, your world canonically does not have any alternate universes or is not part of a multiverse, perks or powers like Blank Slate will not work. Your unfortunate circumstances grant you an extra 20% of your starting world's budget as a bonus from the company.</p>
    `,
    effect: {
      set: () => baseBudget.value = baseBudget.value * 1.2,
      remove: () => baseBudget.value = baseBudget.value / 1.2,
    },
  },
]

export const skyblockRules = `
<h3 class="text-lg font-semibold">Skyblock challenge rules</h3>
<p>You and your chosen companion will start on your Skyblock with a Survival Kit.</p>

<p>The Skyblock is a special Demiplane that is an empty and infinite sky with a singular structure within it. The structure is a 25-meter x 25-meter x 25-meter cube. The bottom half of the structure is solid sandstone and contains no ores, gems, or other materials. The top half consists of normal dirt. It contains enough nutrients to grow crops and is covered in grass except for a small pond that contains clean, drinkable water.</p>

<p>On the surface is also a single tree. This tree produces up to 5 large fruits a day. Each fruit provides enough nourishment to sustain an adult person for one day. These fruits rot 24 hours after being picked unless kept in a cold place, at which point they last for a week instead. Each fruit contains one seed that can be grown into a new tree that will bear fruit at the same rate. From the time of planting, it takes six months for the tree to grow to full maturation and start producing fruit. The tree’s wood is mundane and soft enough that it can be cut using the provided tools.</p>

<p>When you first arrive on the Skyblock you will also find the Survival Kit, a wooden crate that contains a tent for two people, two sleeping bags, an ax, a shovel, a pick ax, a knife, flint & steel, ten emergency meals, and two canteens. Additional or replacement Survival Kits can be purchased for 5 Credits.</p>

<p>Aside from the structure's position being locked into place, the Skyblock follows normal laws of physics. The structure is not indestructible. Additions to the structure are subject to gravity unless some power or other means prevent it. The sky follows a 24-hour night/day cycle, but the climate is always moderate. Any kind of weather can occur including rain, snow, hail, or even tornadoes. You have a guaranteed six months before any dangerous weather effects appear, after which point it is random. </p>

<p>For Catalog purposes, the Skyblock counts as a base Demiplane, but NOT as a Pocket Apartment/Sweet Home/Grand Manor.</p>

<p>On every seventh day, from 00:00 to 23:59, a 2-meter tall 1-meter wide portal will open in the center of the topmost layer of the Skyblock. This portal is large enough to accommodate the passage of a human-sized being. It comes with all Company standard protections and Neutral, hostile, and uninvited eyes will not notice a portal’s presence, activation, or use, and cannot pass through.</p>

<p>The portal will lead to a random world. The maximum DR of the world is equal to the number of months since you have started plus three. For example, in your first month, the maximum DR of the world is 3, in the second month it will be 4, etc etc. This, of course, caps out at DR 10.</p>

<p>You will have access to the world as long as the portal is open. The portal will appear at a random spot, but relevant, spot within the setting and cannot be moved. You will have 24 hours to gather any resources you desire, including Companions. Any members of your Retinue not on your Skyblock when the portal closes will be forcibly pulled back. As a penalty, the next portal will be open for 1 hour less for each Retinue member teleported like this. If that would reduce the timer to below zero, the portal will not open and the remaining penalty time will be taken out of the next portal opening. Timers for penalties and portal schedules can be found on your Company Smart Device.</p>

<p>Capture timers are not reduced. A Stamp will still take 72 hours to capture. In-progress captures do not count as Retinue members and will not be teleported to your Skyblock when the portal closes, nor will they be teleported when they are fully captured. Captures of this nature will add them to your retinue, assign them all the benefits, and grant you Capture Credits, but they will be stranded in their world unless they were brought through the portal before it closed. However, they can be sold remotely even when the portal is closed. If they are not sold, Companions can be collected by purchasing a Visitation Pass for that world or by the portal randomly opening in their world again. In this situation, they will count as Retinue members, and they will be teleported to your Skyblock when the portal closes again.</p>
`

export const skyblockRulesAdditional = `
<h3 class="text-lg font-semibold">Additional Rules</h3>
<ul class="list-decimal list-inside">
  <li>Cannot be taken with Wage Slave, Cash Still Rules, or Calming Up
  </li>
  <li>Pocket Space is purchasable. However, Pocket Home is not.</li>
  <li>The Skyblock is dimension-locked. No dimensional hoppers can teleport out of it while the portal is closed. Their powers function fine outside of the Skyblock, but they are also subject to the rules of the Skyblock and will be forcibly brought back when the portal closes.</li>
  <li>Dimensional transportation, through teleportation, vehicle, or other methods such as Dragon Break, can still be performed from other worlds. This means that while the portal from your Skyblock is open your multiversal travel options are not limited. However, when the portal closes, you will be yanked back to the Skyblock no matter what world you are in</li>
  <li>Exit Stage Left cannot be purchased</li>
  <li>Missions that take you to other worlds will not be offered. However, Quick Missions for worlds that the portal leads to can be accepted while the portal is open. A Mission is considered failed if the portal closes before it is done.</li>
  <li>Art of Domains will still function correctly but claimed areas cannot be linked to the Skyblock in a way that allows for any kind of communication or travel.</li>
  <li>Apportation will not allow teleportation between your Skyblock and a world unless there is a portal open connecting to that world, or a world within the local multiverse of the world the portal is opened to.</li>
  <li>Laws of the Jungle no longer requires Life’s a Beach as a prerequisite</li>
</ul>
`

export const skyblockPerks = [
  {
    uid: 'ZpyEq',
    dlc: 'shifty-sword',
    dlclink: 'https://docs.google.com/document/d/1Dasg0Yq3tgZ9mA6zL3G7_1VdBcq4pW_4qpwGImtXzRc/edit#',
    title: 'Extra Block',
    image: '',
    category: 'Challenge',
    whitelist: ['Skyblock'],
    multiple: true,
    cost: 10,
    desc: `You can purchase an additional block of dirt and stone and place it anywhere you want by using the Catalog app on your Company Smart Device. It does not have to be touching any existing block. This block follows the same rules as the starting block. This perk can be purchased as many times as you wish.
    `,
  },
  {
    uid: 'ZpyEq',
    dlc: 'shifty-sword',
    dlclink: 'https://docs.google.com/document/d/1Dasg0Yq3tgZ9mA6zL3G7_1VdBcq4pW_4qpwGImtXzRc/edit#',
    title: 'Bigger Portal',
    image: '',
    whitelist: ['Skyblock'],
    cost: 15,
    desc: `
    The portal is now five meters tall and three meters wide, allowing for larger beings and vehicles to pass through it.
    `,
  },
  {
    uid: 'ZpyEq',
    dlc: 'shifty-sword',
    dlclink: 'https://docs.google.com/document/d/1Dasg0Yq3tgZ9mA6zL3G7_1VdBcq4pW_4qpwGImtXzRc/edit#',
    title: 'Biggest Portal',
    image: '',
    whitelist: ['Bigger Portal'],
    cost: 30,
    desc: `
    Beings or Vehicles of any size can now pass through the portal. The portal does not increase in size, instead it warps space to allow passage.
    `,
  },
  {
    uid: 'ZpyEq',
    dlc: 'shifty-sword',
    dlclink: 'https://docs.google.com/document/d/1Dasg0Yq3tgZ9mA6zL3G7_1VdBcq4pW_4qpwGImtXzRc/edit#',
    title: 'Move Portal',
    image: '',
    whitelist: ['Skyblock'],
    cost: 5,
    multiple: true,
    desc: `
    Designate a new spot for the portal to appear. This perk must be repurchased each time you wish to move the portal.
    `,
  },
  {
    uid: 'ZpyEq',
    dlc: 'shifty-sword',
    dlclink: 'https://docs.google.com/document/d/1Dasg0Yq3tgZ9mA6zL3G7_1VdBcq4pW_4qpwGImtXzRc/edit#',
    title: 'Pocket Inventory',
    image: '',
    whitelist: ['Pocket Space'],
    cost: 5,
    desc: `
    Items in your Pocket Space can be accessed by thought instead of through an app.
    `,
  },
  {
    uid: 'ZpyEq',
    dlc: 'shifty-sword',
    dlclink: 'https://docs.google.com/document/d/1Dasg0Yq3tgZ9mA6zL3G7_1VdBcq4pW_4qpwGImtXzRc/edit#',
    title: 'Shared Inventory',
    image: '',
    whitelist: ['Pocket Inventory'],
    cost: 15,
    desc: `
    All members of your Retinue can now access your Pocket Inventory.
    `,
  },
  {
    uid: 'ZpyEq',
    dlc: 'shifty-sword',
    dlclink: 'https://docs.google.com/document/d/1Dasg0Yq3tgZ9mA6zL3G7_1VdBcq4pW_4qpwGImtXzRc/edit#',
    title: 'Visitation Pass',
    image: '',
    whitelist: ['Skyblock'],
    cost: 10,
    multiple: true,
    desc: `
    Each time you purchase this perk, you can choose to have the next portal location be a world you’ve already visited. You choose the world when this perk is purchased. This perk can only be purchased if it has not already been purchased for the next portal.
    <p>The cost of this perk is dependent on the Danger Rating of the world and is equal to the rating times 10. For example, a DR1 world would cost 10 Credits and a DR5 world would cost 50 Credits.</p>
    `,
  },
  {
    uid: 'ZpyEq',
    dlc: 'shifty-sword',
    dlclink: 'https://docs.google.com/document/d/1Dasg0Yq3tgZ9mA6zL3G7_1VdBcq4pW_4qpwGImtXzRc/edit#',
    title: 'Escape Clause',
    image: '',
    whitelist: ['Skyblock'],
    cost: 5000,
    desc: `
    As much of a challenge as the Skyblock is, there will inevitably come a time where you have amassed enough resources to trivialize it. As such, this perk allows you to break free from this challenge and become a normal Contractor, should you have the excessive amount of Credits required for it.
    <p>With this purchase, all restrictions specific to this challenge are lifted. You can treat your Skyblock as Sweet Home and Grand Manor for the purposes of purchasing upgrades. Sweet Home Expansion will provide free copies of Extra Block equivalent to the mass of the expansion and the final purchase will turn your Skyblock into a proper planet. If you do not wish it to become a planet, simply keep purchasing Extra Block.</p>
    <p>Additionally, you’ll receive Exit Stage Left, All Roads Lead To Home, We Will Meet Again, and Rainbow Bridge for free. All worlds that your Skyblock portal ever opened to are treated as visited worlds for the purposes of We Will Meet Again and Rainbow Bridge, giving you unlimited access to them. Additionally, a portal will open up, this time without a time limit, to your next Exit Stage Left world.</p>
    `,
  },
]

// {
//   "author": "Darkarma",
//   "image": "https://i.imgur.com/7rWhwFp.png",
//   "reward": "1 Credit earned each day you survive in Skyblock",
//   "objectives": [
//     {
//       "type": "Credits",
//       "reward": "25",
//       "value": "Permanently increase the Danger Rating of the Skyblock to 2. Hostile T2 mobs spawn in complete darkness. Extreme weather occurs more frequently."
//     },
//     {
//       "value": "Permanently increase the Danger Rating of the Skyblock to 3. Hostile T3 mobs spawn in low darkness. Extreme weather occurs more frequently.",
//       "reward": "25",
//       "type": "Credits"
//     },
//     {
//       "type": "Credits",
//       "reward": "25",
//       "value": "Permanently increase the Danger Rating of the Skyblock to 4. Hostile T4 mobs spawn in low darkness, with mild resistance to the sun. Hostile mobs may also spawn with enchanted equipment or supernatural abilities. Extreme weather can no occur rarely in Spring and Fall."
//     },
//     {
//       "value": "Permanently increase the Danger Rating of the Skyblock to 5. Hostile T4 mobs spawn in low darkness in much greater numbers. Full moons cause them to spawn at a T5 rating.",
//       "type": "Credits",
//       "reward": "25"
//     },
//     {
//       "type": "Credits",
//       "value": "Permanently increase the Danger Rating of the Skyblock to 6, 7, 8, 9 or 10. Hostile mobs matching DR -1 rating and spawn in low darkness in much greater numbers. Full moons cause them to spawn at a DR +1 Tier rating. Extremely resistant to sunlight.",
//       "reward": "25 for each increase"
//     },
//     {
//       "value": "Have sex with one of your Waifus for the first time (Repeatable)",
//       "type": "Other",
//       "reward": "One unbreakable/unmoveable Bedrock block, spawn it using your Company Smart Device"
//     }
//   ],
//   "scope": "Standard",
//   "desc": "So the standard Skyblock isn't enough of a challenge? Well here's how we make it more interesting. ",
//   "rewardType": "Credits",
//   "loca": "Skyblock",
//   "conditions": [
//     {
//       "value": "Your Skyblock Demiplane now has a Danger Rating of 1 and has normal full quarter-year-long seasons. Hostile T1 mobs may spawn under the light of a full moon or in complete darkness during a full moon. Extreme weather happens rarely during Summer and Winter. Spring and Fall have peaceful weather patterns."
//     },
//     {
//       "value": "Guaranteed to have one typhoon a year. Damage done based on Skyblock DR, though always recoverable."
//     },
//     {
//       "value": "Capturing Waifus does not award any points. Selling Waifus can only be done via Green Orb, all prices will be below Slightly Used value."
//     },
//     {
//       "value": "Green Orb is only accessible through the Portal, on the standard portal days."
//     },
//     {
//       "value": "Loans are completely disabled."
//     },
//     {
//       "value": "Demiplane enhanced recovery is disabled."
//     }
//   ],
//   "source": "",
//   "budget": 1,
//   "title": "Skyblock, Expanded Ruleset",
//   "uid": "vQgWM"
// },
