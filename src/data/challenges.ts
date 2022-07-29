import { findIndex, sample, random } from 'lodash-es'
import { WORLD_RATINGS, allWorldsNoCondition } from './constants'
import { addFreebies, deleteFreebies } from '~/logic'
import { useStore } from '~/store/store'

export const challengesDesc = `
<p>Challenges should be picked after you pick the World but before you make any other purchases.
Challenges are not a part of a canon Waifu Catalog so you have more freedom in interpreting them or proposing new ones though 'Propose Perk' button.</p>
<p>You can pick a several challenges at the same time if they don't conflict with each other.</p>
`

const { fullStartingBudget, companions, baseBudget, startingWorld } = useStore()

const employee = { uid: 6666666, name: 'Employee #6.02214076e23', world: 'The Company', tier: 10, priceTier: 0, method: 'unbound' }
let rouletteWatcher = null
const cultFreebies = {
  defensePerks: ['Stress Defense', 'Stress Defense'],
  talentPerks: ['Everlasting Talent'],
  homePerks: ['Pocket Space', 'Pocket Apartment'],
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
      remove: () => baseBudget.value = WORLD_RATINGS[startingWorld.value.rating - 1].budget,
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
    <p>Receive 80% of companion cost for the capture.</p>
    `,
  },
  {
    uid: 'K7Zhp',
    title: 'Strict Travel Mode',
    image: 'https://cdn.discordapp.com/attachments/925963686433132644/993235796368834651/Screenshot_1.jpg',
    dlc: 'Om1cr0n',
    cost: 0,
    desc: `
    <p>Company decided to enforce stricter rules for World Traveling, from now on travel by any other methods other than Company perks will be restricted so that you can only travel to already visited Worlds. If you don't have We Will Meet Again after each jump to a new World, other traveling methods will be disabled completely until you fill the progress bar to the next World by 100%.</p>
    `,
  },
  {
    uid: 'KcxSe',
    title: 'Wild GIRLFRIEND appeared!',
    image: 'https://cdn.discordapp.com/attachments/925963686433132644/993235853142921236/Screenshot_2.jpg',
    dlc: 'Om1cr0n',
    cost: 0,
    desc: `
    <p>All bindings will work only on unconsciousness and defeated by you copanions, binding will happen after 3s of continuous application regardless of previous requirements.</p>
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
    <p>All purchases(except companions) you do will be final you wouldn't be able to return them or buy anything else after chargen so choose carefully.</p>
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
      You have been chosen by the higher ups to try something different. After noting that the Random selection function for the build is never requested it was estimated that absolute randomness is not too appealing, so they will only randomize the world. Your starter world will be entirely random and, in exchange, get a 50% increase to your starter budget (that is your only tip to what world you will be going).
    `,
    effect: {
      set: () => {
        const world = sample(allWorldsNoCondition.value)
        startingWorld.value = { worldName: world.worldName, rating: world.rating }
        if (world.condition) startingWorld.value.condition = world.condition
        baseBudget.value = (WORLD_RATINGS[world.rating - 1]?.budget || 0) * 1.5
      },
      remove: () => baseBudget.value = baseBudget.value / 1.5,
    },
  },
]
