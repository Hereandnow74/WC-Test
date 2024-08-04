import { sample, random, countBy } from 'lodash-es'
import { addFreebies, deleteFreebies } from '../logic'
import { useStore } from '../store/store'
import { WORLD_RATINGS, allWorldsNoCondition } from './constants'
import { buyAnyCompanion, removeAnyCompanion } from '~/logic/waifuLogic'

export const challengesDesc = `
<p>Challenges should be picked after you pick the World but before you make any other purchases.
Challenges are not a part of a canon Waifu Catalog so you have more freedom in interpreting them or proposing new ones though 'Propose Perk' button or on <a href="https://discord.gg/cZf4U5rmPV" class="text-amber-500 hover:underline">Interactive's Discord server</a>.</p>
<p>You can pick several challenges at the same time if they don't conflict with each other.</p>
`

const { companions, baseBudget, startingWorld, defensePerks } = useStore()

let defenseWatcher = null
let exileWatcher = null
let rouletteWatcher = null

const cultFreebies = {
  defensePerks: [{ title: 'Stress Defense', cost: 0, count: 2 }],
  talentPerks: [{ title: 'Everlasting Talent', cost: 0, count: 1 }],
  homePerks: [{ title: 'Pocket Space', cost: 0, count: 1 }, { title: 'Pocket Apartment', cost: 0, count: 2 }],
}

export const challenges = [
  {
    uid: 'QbKw9',
    title: 'Two Dime',
    image: 'https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/fQYnD.jpg',
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
    image: 'https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/7wgSf.jpg',
    dlc: 'Om1cr0n',
    cost: 0,
    desc: `
    <p>&#9632;&#9632;&#9632;&#9632;&#9632;&#9632; department of Company found an anomaly in &#9632;&#9632;&#9632;&#9632;&#9632;&#9632;&#9632;&#9632; world and &#9632;&#9632; contractors were already lost, you are tasked to resolve it.</p>
    <p>Anomaly prevents work of any bindings, analyze suggest that someone or something doesn't want people from this world be bound, available information suggest that 'binding by confession' can still be achieved.</p>
    <p>Company deemed this situation &#9632;&#9632;&#9632;&#9632;&#9632;&#9632;&#9632;&#9632; so you will be accompanied by Company employee who's equivalent to T10 companion in power and was tasked to help you get a handle on situation.</p>
    `,
    effect: {
      set: () => buyAnyCompanion(6666666, 0, 'unbound'),
      remove: () => removeAnyCompanion(6666666),
    },
  },
  {
    uid: 'tW5KX',
    title: 'Waifu Manager',
    image: 'https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/PUTUh.jpg',
    dlc: 'Om1cr0n',
    special: 'DR7 or higher',
    cost: 0,
    desc: `
    <p>While you are prime candidate for becoming a Contractor our automatic &#9632;&#9632;&#9632;&#9632;&#9632;&#9632; marked you as a &#9632;&#9632;&#9632;&#9632;&#9632;&#9632;&#9632;&#9632; all Contactors with this designation have their personal power restricted to that of T4 and this restriction is absolute you will not be able to do anything that will increase your power level more that T4 such as operating Power armor, changing your race, using IMG tickets and all other possible methods will simply won't work or their output will be restricted to T4 level.</p>
    <p>Receive 80% of companion cost for the capture, instead of the default 60%.</p>
    `,
  },
  {
    uid: 'K7Zhp',
    title: 'Strict Travel Mode',
    image: 'https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/kmKOW.jpg',
    dlc: 'Om1cr0n',
    cost: 0,
    desc: `
    <p>The Company has decided to enforce stricter rules for world traveling. From now on, multiversal travel by any other means other than the company-provided Exit Stage Left functionality will be restricted.  Travel to worlds apart from those you visited already is forbidden. If you don't have We Will Meet Again after each jump to a new World, other traveling methods will be disabled completely until you fill the Exit Stage Left progress bar to the next World to 100%.</p>
    `,
  },
  {
    uid: 'KcxSe',
    title: 'Wild GIRLFRIEND appeared!',
    image: 'https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/Q3saB.jpg',
    dlc: 'Om1cr0n',
    cost: 0,
    desc: `
    <p>All bindings will work only on unconsciousness and defeated by you characters, binding will happen after 3s of continuous application regardless of previous requirements.</p>
    `,
  },
  {
    uid: 'Z4jXA',
    title: '100,000 years of cultivation',
    image: 'https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/wDTsQ.jpg',
    dlc: 'Om1cr0n',
    cost: 0,
    special: 'Chargen only.',
    desc: `
    <p>One of the Top Managers of The Company recently gained a fascination for the cultivation and managed to convince R&D department to create experimental program 'Super Contractors&#8482;' by locking them in a Time Bubble for 100,000 years before they will go to their first World.</p>
    <p>Overseer of the program can issue a missions for contractor to complete, but rewards will be restricted to improving contractor realm/home only.</p>
    <p>You can't have companions, leave or invite anyone inside for the duration of this challenge, but other parts of the Catalog will remain accessible to you. Receive Pocket Space, Pocket Apartment x2, Everlasting Talent, Stress Defense x2 for free.</p>

    `,
    effect: {
      set: () => addFreebies(cultFreebies),
      remove: () => deleteFreebies(cultFreebies),
    },
  },
  {
    title: 'Russian roulette',
    image: 'https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/Cm4wD.jpg',
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
    image: 'https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/uAku1.jpg',
    special: 'Chargen only. May not be taken on DR11.',
    cost: 0,
    bonus: 1,
    blacklist: ['Wage Slave', 'Black-mark', 'Fight For Your Right', 'One In Ten'],
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
    image: 'https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/pW5vO.jpg',
    special: 'Chargen only. May not be taken on DR11.',
    cost: 0,
    bonus: 0.5,
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
      remove: () => baseBudget.value = (WORLD_RATINGS[startingWorld.value.rating]?.budget || 0),
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
    bonus: 0.8,
    desc: `
    For those who wish to either die as quickly as possible or rise to the greatest of heights, the company offers to forgo any company-provided defenses. No immunities, not even the basic resistances. Even the greatest of Chad's aren’t this suicidal. The only protections you will ever be able to acquire are those you gain along your journey or from the powersets you decide to acquire. As compensation for the <span class="line-through">hell</span> fun you are walking into, receive 80% of your starting world's budget as a bonus.
    `,
    effect: {
      set: () => {
        baseBudget.value += (WORLD_RATINGS[startingWorld.value.rating].budget || 0) * 0.8
        defenseWatcher = watch(() => defensePerks.value.length, () => defensePerks.value.length && (defensePerks.value = []))
      },
      remove: () => {
        baseBudget.value -= (WORLD_RATINGS[startingWorld.value.rating].budget || 0) * 0.8
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
    bonus: 0.4,
    desc: `
    Sometimes, not even the company manages to keep perfect track of every little detail in its infinite roster of contractors. Unfortunately for you, either due to an error in the system, some interference from the higher-ups, or just poor luck, one tiny little detail in your processing procedure was screwed up. It seems your memories were not carried over.
    <p>Upon your arrival to your chosen world, you will have no idea who, what or where are you. All your knowledge of fictional realities, any knowledge of the perks you have chosen, and why there are cute girls following you has been lost with no chance of recovery. As compensation for this minor error, the company will issue 40% of your starting world's budget as a bonus. </p>
    `,
    effect: {
      set: () => baseBudget.value += (WORLD_RATINGS[startingWorld.value.rating].budget || 0) * 0.4,
      remove: () => baseBudget.value -= (WORLD_RATINGS[startingWorld.value.rating].budget || 0) * 0.4,
    },
  },
  {
    uid: 'ZpyEq',
    dlc: 'DepressedAlucard',
    dlclink: 'https://docs.google.com/document/d/18LaGf5cy9hDA7ZAInhxVJoTocWfeLo0PI_msQsFu76Q/edit#',
    title: 'Frog in a Well',
    image: 'https://images2.imgbox.com/40/e1/NxkGFaHI_o.png',
    special: 'Chargen Only.',
    cost: 0,
    bonus: 0.2,
    desc: `
    It seems that you won’t be getting the omniversal world-hopping adventure you were promised. Your starting world will now be the one and only world you will ever visit. No hopper power, company perk, or waifu will be able to help you leave the world you first chose to appear in unless it's to visit your Demiplane or the Green Eye Orb Markets.
    <p>You are fortunately granted some extra leeway in worlds composed of multiple universes, as in this case you are able to travel between them without any complications. If however, your world canonically does not have any alternate universes or is not part of a multiverse, perks or powers like Blank Slate will not work. Your unfortunate circumstances grant you an extra 20% of your starting world's budget as a bonus from the company.</p>
    `,
    effect: {
      set: () => baseBudget.value += (WORLD_RATINGS[startingWorld.value.rating].budget || 0) * 0.2,
      remove: () => baseBudget.value -= (WORLD_RATINGS[startingWorld.value.rating].budget || 0) * 0.2,
    },
  },
  {
    uid: 'ZpyEq',
    dlc: 'DepressedAlucard',
    dlclink: 'https://docs.google.com/document/d/18LaGf5cy9hDA7ZAInhxVJoTocWfeLo0PI_msQsFu76Q/edit#',
    title: 'No Continues',
    image: 'https://i.imgur.com/u0mwviV.jpg',
    special: 'Chargen Only.',
    cost: 0,
    bonus: 0.8,
    desc: `
    There will be no second chances. No resurrections, no revival countdown timer, no mechanisms to escape death. When you die, that's it. One death, one slip up, and your service under the company ends permanently. And yet, what better thrill is there in life than knowing it might be your last? To maximize your chances of not dying too quickly, the company is willing to offer you an additional 80% of your world's starting budget. 
    `,
    effect: {
      set: () => baseBudget.value += (WORLD_RATINGS[startingWorld.value.rating].budget || 0) * 0.8,
      remove: () => baseBudget.value -= (WORLD_RATINGS[startingWorld.value.rating].budget || 0) * 0.8,
    },
  },
  {
    uid: 'ZpyEq',
    dlc: 'DepressedAlucard',
    dlclink: 'https://docs.google.com/document/d/18LaGf5cy9hDA7ZAInhxVJoTocWfeLo0PI_msQsFu76Q/edit#',
    title: 'Forgetful Hopper',
    image: 'https://i.imgur.com/CM735ow.jpg',
    special: 'Chargen Only.',
    cost: 0,
    bonus: 0.6,
    desc: `
    For some mysterious reason, perhaps because of your retinue of hot waifu, your brain will fry upon each arrival to a new world, as all knowledge of the world, your retinue, and your powers disappear. Left completely clueless as to what is going on, it will be up to your waifu or yourself to restore that which you have lost. No powers or abilities will help fast-track this process, as only time and care will help you recover. The company recognizes the troubles you will face and provides you with a bonus of 60% of your starting world's budget to prepare. 
    `,
    effect: {
      set: () => baseBudget.value += (WORLD_RATINGS[startingWorld.value.rating].budget || 0) * 0.6,
      remove: () => baseBudget.value -= (WORLD_RATINGS[startingWorld.value.rating].budget || 0) * 0.6,
    },
  },
  {
    uid: 'ZpyEq',
    dlc: 'DepressedAlucard',
    dlclink: 'https://docs.google.com/document/d/18LaGf5cy9hDA7ZAInhxVJoTocWfeLo0PI_msQsFu76Q/edit#',
    title: 'Worthy Opponent',
    image: 'https://i.imgur.com/wFamtCG.jpg',
    cost: 0,
    desc: `
    Someone in the company really must hate you. You must have failed to make a good impression. From now on, whatever world you go to, someone or something will begin to act against you. Perhaps you will know them, perhaps not, but whatever the case, they will be there. Your efforts will be undermined, and the safety of you and your retinue will be at risk as this foe will constantly antagonize you, seeking your end. 
    <p>This will be no simple adversary you can easily capture, no comic book villain or weak rival. Expect to be pushed beyond your capabilities, and that of your retinue as well. Whether you are an ordinary human or an eldritch entity does not matter as your enemy will be just as if not more powerful than you. You will need everything you have, all of your aces, all your tricks, and at times, the strength of the entire world to defeat them. Adversaries do not run from each other, and as such, you too will not be able to leave a world until your nemesis has been defeated. </p>
    `,
  },
  {
    uid: 'ZpyEq',
    dlc: 'DepressedAlucard',
    dlclink: 'https://docs.google.com/document/d/18LaGf5cy9hDA7ZAInhxVJoTocWfeLo0PI_msQsFu76Q/edit#',
    title: 'Insider information',
    image: 'https://i.imgur.com/5OFyYb1.jpg',
    cost: 0,
    desc: `
    You really must have screwed up. There's pretty much no other explanation as to why this would happen. Somehow your opponent knows that which he should not and has information about your status as a contractor and the company as a whole. Expect your opponent to now use this knowledge to his best advantage when preparing his next move against you, either to discover more about you and your retinue or put you down for good. 
    `,
    whitelist: ['Worthy Opponent'],
  },
  {
    uid: 'ZpyEq',
    dlc: 'DepressedAlucard',
    dlclink: 'https://docs.google.com/document/d/18LaGf5cy9hDA7ZAInhxVJoTocWfeLo0PI_msQsFu76Q/edit#',
    title: 'Time Bomb Situation',
    image: 'https://i.imgur.com/SUVHmo3.jpg',
    cost: 0,
    desc: `
    This is getting ridiculous. Whatever you did to deserve this must have been something truly terrible. Your conflict with your opponent now has a time limit during which you must successfully defeat them. Fail to do so and you, your nemesis, and the entire world you are in will be permanently erased from existence. 
    <p>The years you have left before your erasure is calculated by taking the danger rating of your world and setting it as an exponent of 10, before proceeding to divide the result by another ten years. Trying to use the knowledge of the upcoming catastrophe against your nemesis will, unfortunately, prove to be useless, as they would rather die than see you live.  </p>
    `,
    whitelist: ['Worthy Opponent'],
  },
  {
    uid: 'ZpyEq',
    dlc: 'DepressedAlucard',
    dlclink: 'https://docs.google.com/document/d/18LaGf5cy9hDA7ZAInhxVJoTocWfeLo0PI_msQsFu76Q/edit#',
    title: 'Eternal Rivalry',
    image: 'https://i.imgur.com/vaMVLnE.jpg',
    special: 'Chargen Only.',
    cost: 0,
    desc: `
    The company has decided that a competitive environment will lead to greater capture rates amongst contractors. You will enter your starting world with a fellow rival contractor, who has similar to you just begun their adventure. Both of you will be tasked to stop each other's efforts in this and any subsequent world you go to, with a running tally being kept of the winner of each round. 
    <p>A bonus of 5% of the world's budget is given to both the winner and loser of each round unless the winner is already leading in the overall tally. In this case, only the loser of the round receives the bonus. The winner of each round is given the choice to select the next world both contractors will be going to. Directly killing a rival will lead to a round's immediate termination, locking you out of the world and transporting you to the next. The loser of the previous round and any of his retinue members killed during it will be revived for the next. If your current rival dies via a third party, the tally is reset and another contractor of an equal power level to yours will take his place.</p>
    `,
  },
  {
    uid: 'ZpyEq',
    dlc: 'DepressedAlucard',
    dlclink: 'https://docs.google.com/document/d/18LaGf5cy9hDA7ZAInhxVJoTocWfeLo0PI_msQsFu76Q/edit#',
    title: 'Random Encounters',
    image: 'https://i.imgur.com/tHg2brU.jpg',
    cost: 0,
    desc: `
    The Omniverse is a large place, though it can be made a bit smaller. While the company does not typically permit Unregulated PvP with other contractors in the wild, it seems it will now turn a blind eye when it comes to you. You are now many times more likely to encounter other enemy contractors throughout your travels in different worlds. The worst of the worst, these contractors will seek naught but your death and the enslavement of your retinue. Perhaps turning the tables on them will allow you to find a benefit in your new circumstances.
    `,
  },
  {
    uid: 'ZpyEq',
    dlc: 'DepressedAlucard',
    dlclink: 'https://docs.google.com/document/d/18LaGf5cy9hDA7ZAInhxVJoTocWfeLo0PI_msQsFu76Q/edit#',
    title: 'Rebellious Brats',
    image: 'https://i.imgur.com/OZZnWQY.jpg',
    special: 'Chargen Only.',
    cost: 0,
    bonus: 0.1,
    desc: `
    There is beauty in seeing your children follow in your footsteps is there not? Unfortunately for you, it seems that any offspring you might have will one day attempt to take your place, killing you to become contractors in their own right. Whether this is because of bad parenting, teenage rebellion, or inborn issues won't matter, as it will happen and when it does, you best be prepared. Your descendants will also be immune to the effects of any bindings you might possess. Take 10% of your starting world's budget for your troubles. 
    `,
    effect: {
      set: () => baseBudget.value += (WORLD_RATINGS[startingWorld.value.rating].budget || 0) * 0.1,
      remove: () => baseBudget.value -= (WORLD_RATINGS[startingWorld.value.rating].budget || 0) * 0.1,
    },
  },
  {
    uid: 'ZpyEq',
    dlc: 'DepressedAlucard',
    dlclink: 'https://docs.google.com/document/d/18LaGf5cy9hDA7ZAInhxVJoTocWfeLo0PI_msQsFu76Q/edit#',
    title: 'Part-Timer',
    image: 'https://i.imgur.com/Gymb62D.jpg',
    special: 'Chargen Only.',
    cost: 0,
    desc: `
    It seems that you are unable to fully accept your status as a company contractor. This usually happens when you have something strong tying you back to whatever universe you were taken from, preventing you from accepting your new reality. This unfortunately means that you will no longer be able to benefit from being a full-time company contractor and will be assigned to a role as a part-timer with a flexible schedule instead. 
    <p>You will be returned to your home universe, and tasked with choosing three working days per week during which you can travel the omniverse and perform your duties as a contractor. At the end of each day, unless the next is also a working day, you will be transported back to your home universe, stripped of any abilities, items, or companions you have gathered during your adventure. Unless healed, any injuries or conditions accumulated during your adventure will be carried over at the end of a working day. </p>
    `,
  },
  {
    uid: 'ZpyEq',
    dlc: 'DepressedAlucard',
    dlclink: 'https://docs.google.com/document/d/18LaGf5cy9hDA7ZAInhxVJoTocWfeLo0PI_msQsFu76Q/edit#',
    title: 'Just a Dream',
    image: 'https://i.imgur.com/2n3UayU.jpg',
    cost: 0,
    desc: `
    Your ability to handle your new circumstances is even worse than first believed, as you are simply unable to bear the fact that the company is real. You are therefore limited in experiencing your journey as a contractor only as a dream each time your body in your home universe falls asleep. While this, unfortunately, makes you unfit to capture waifu as a traditional contractor, the company still has a use for you, as it has been found that simulated contractor journeys are a viable source of research data to devise new company experiences. 
    `,
    whitelist: ['Part-Timer'],
  },
  {
    uid: 'ZpyEq',
    dlc: 'DepressedAlucard',
    dlclink: 'https://docs.google.com/document/d/18LaGf5cy9hDA7ZAInhxVJoTocWfeLo0PI_msQsFu76Q/edit#',
    title: 'Lucid Reality',
    image: 'https://i.imgur.com/G7Gtlps.jpg',
    cost: 0,
    desc: `
    Your worldview has shattered as you lose the ability to understand what is real and what is not. Are you an ordinary being or a contractor with  powerful abilities and a retinue of beautiful waifu? Is this the world you are walking in that of the mundane or the supernatural? Is your companion an actual living person or just a figment of your imagination? The looming monster about to attack you is not a threat, right? The company can unfortunately no longer do anything for you, as only you are now able to understand what reality you are living in. 
    `,
    whitelist: ['Just a Dream'],
  },
  {
    uid: 'Zgyrq',
    dlc: 'Om1cr0n',
    dlclink: '',
    title: 'Small Team',
    image: 'https://i.imgur.com/uqpekR6l.png',
    cost: 0,
    special: 'Chargen only.',
    desc: `
    Your retinue would be restricted to a maximum of 5 members, excluding you. All other captures or purchases that you will obtain will get the status of 'Exile'. An 'Exile' retinue member do not receive any catalog benefits, such as defenses or talents, or provide any, such as rebates or devotion points.
    <p>You can freely change the status of your companions to 'Exile' and back, provided you stay within the limit, but they will lose any applied to them perks and proficiency with them, and will need to start anew, if you will restore their status.</p>
    <p>Receive 70% of companion cost for the capture, instead of the default 60%.</p>
    `,
    effect: {
      set: () => {
        exileWatcher = watch(() => companions.value.length, () => {
          if (countBy(companions.value, x => x.role !== 'Exile').true > 5)
            companions.value[companions.value.length - 1].role = 'Exile'
        })
      },
      remove: () => {
        if (exileWatcher) exileWatcher()
      },
    },
  },
  {
    uid: 'ZpyEq',
    dlc: 'D',
    title: 'Angry Kaiju from Outer Dimension',
    image: 'https://i.imgur.com/KhRJStQ.png',
    cost: 0,
    desc: `
    There is something wrong with you; for some reason, every time you travel to a new world, regardless of the method used, it will thin the dimensional walls of that place. This thinning will attract the attention of the Kaiju's living in interdimensional space. They will send an attack group scaled to your retinue tiers and they will be especially focused on eliminating you. If you have Trace and Information Defenses, their inconsistent ability to track you will lead them to adopt scorched earth tactics.

    <p>Receive the ability to freely travel the Omniverse, albeit with a cooldown of one week, and after successfully fending off attacks five times, you will be given the coordinates to the location of the Kaiju Queen. If you manage to capture her and keep her in your retinue, you will no longer weaken dimensional walls when you hop worlds.</p>
    `,
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

<p>However, unlike normal Demiplanes, you and your retinue cannot make portals nor teleport yourself into or out of the Skyblock at will. All travel to and from your Skyblock is restricted to a weekly portal that will open up on every seventh day from 00:00 to 23:59. This portal is large enough to accommodate the passage of a human-sized being and will open in the center of the topmost layer of the Skyblock. It comes with all Company standard protections and Neutral, hostile, and uninvited eyes will not notice a portal’s presence, activation, or use, and cannot pass through.</p>

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
  <li>If you die not on your Skyblock while the portal is open, your body(and soul) will be automatically pulled back to the Skyblock when the portal is closed, including any gear you have equipped on you. Normal R.I.P. rules still apply otherwise.</li>
  <li>Red Eye Orb cannot be purchased.</li>
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
    desc: `You can purchase an additional block of dirt and stone and place it anywhere you want by using the Catalog app on your Company Smart Device. It does not have to be touching any existing block. This block follows the same rules as the starting block, but it lacks a Survival Kit, and the tree present on it is a 1-month old sapling of a tree rather than a fully grown tree. This sapling is functionally identical to a planted version of the tree provided on the starting block in that it will be fully grown at six-months and grow up to five fruit that will feed an adult for a day. This perk can be purchased as many times as you wish.
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
    title: 'Storage Area',
    image: '',
    whitelist: ['Pocket Space'],
    cost: 10,
    desc: `
    Similar to Sweet Home, you can now designate an area of your choosing on your Skyblock to act as your Pocket Space area. This space must be a clearly delineated area intended for storage purposes only.
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
    max: 10,
    desc: `
    Each time you purchase this perk, you can choose to have the next portal location be a world you’ve already visited. You choose the world when this perk is purchased. This perk can only be purchased if it has not already been purchased for the next portal.
    <p>The cost of this perk is dependent on the Danger Rating of the world and is equal to the rating times 10. For example, a DR1 world would cost 10 Credits and a DR5 world would cost 50 Credits.</p>
    `,
  },
  {
    uid: 'ZpyEq',
    dlc: 'shifty-sword',
    dlclink: 'https://docs.google.com/document/d/1Dasg0Yq3tgZ9mA6zL3G7_1VdBcq4pW_4qpwGImtXzRc/edit#',
    title: 'Climate Control',
    image: '',
    whitelist: ['Skyblock'],
    cost: 50,
    desc: `
    Purchasing this perk will install an app onto your Company Smart Device that allows you to control the weather and climate of your Skyblock. The controls are intuitive and robust and changes can range from small precise changes affecting an area roughly the same size as your starting block to broad changes that affect the entire Demiplane.
    <p>Weather patterns can be automated, randomized, or set on strict schedules of your choosing. Changes to an area’s base climate take time to come into effect, ranging from just a few hours and up to a week, depending on how much of a difference there is between the previous climate and the new one.</p>
    <p>Weather and climate changes are limited to levels that naturally occur in real life. You cannot control specifics of the designated weather(i.e., you can designate a hurricane to occur in an area and how strong it is, but you cannot specify which way the winds will blow). The weather and climates cannot be magical in nature unless Laws of Magic has been purchased.</p>
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
