
<template>
  <div class="flex w-full">
    <div class="lg:pl-0 flex flex-col gap-4 mb-8 mx-auto" :class="[currentWidth]">
      <div class="hidden max-w-screen-lg max-w-screen-xl max-w-screen-sm max-w-screen-md"></div>
      <h1 id="rules" class="text-xl md:text-2xl font-bold text-center mt-4">
        Waifu Catalog <span class="text-gray-600 dark:text-gray-400">(by SwiftRosenthal)</span> Interactive v{{ VERSION }} <span class="text-gray-600 dark:text-gray-400">(by Om1cr0n)</span>
      </h1>
      <div class="flex flex-col px-2 w-full">
        <h3 class="text-xl font-semibold">
          Rules Index
        </h3>
        <router-link
          to="/help"
          class="text-green-600 dark:text-green-400 hover:underline text-lg"
        >
          Help
        </router-link>
        <router-link
          to="/everything"
          class="text-green-600 dark:text-green-400 hover:underline text-lg"
        >
          List of Everything
        </router-link>
        <router-link
          :to="{ path: '/', hash: '#pandora' }"
          class="text-amber-600 dark:text-amber-400 hover:underline text-lg"
        >
          Pandora’s Alternate Tier Ranks / Despin’s Tier Chart
        </router-link>
        <router-link
          v-for="rule in rulesList"
          :key="rule.title"
          :to="{ path: '/', hash: '#' + rule.title }"
          class="text-blue-600 dark:text-blue-400 hover:underline sm:text-lg"
        >
          {{ rule.title2 }}
        </router-link>
      </div>
      <div class="flex w-full -my-3 items-center justify-end">
        <fluent:auto-fit-width-24-filled class="h-8 w-8 bg-gray-300 dark:bg-gray-800 rounded cursor-pointer hover:scale-105 transform" @click="changeWidth" />
      </div>
      <div>
        <Desc
          :desc="glossary"
          class="bg-amber-200 text-gray-800 text-sm md:text-base max-w-[370px] float-right mt-8 mx-2 !p-1 border-3 border-gray-900 indent-xs"
        />
        <Desc id="starting" class="bg-warm-gray-200 dark:bg-gray-800" :desc="startingDesc" />
      </div>
      <div class="lg:flex bg-amber-100 dark:bg-gray-800 p-1 md:p-4 gap-4 w-full mx-auto">
        <Table :headers="worldTitles" :rows="worldData" class="text-sm md:text-base" />
        <Table :headers="waifuTitles" :rows="waifuData" class="text-sm md:text-base w-min flex-grow" />
      </div>
      <div id="pandora" class="bg-amber-100 dark:bg-gray-800 p-1 md:p-4 w-full mx-auto">
        <div class="text-lg text-center mb-2 text-teal-600 dark:text-teal-300">
          These Tier lists are aproximations, official tier list do not exist yet.
        </div>
        <div class="flex w-full pb-2">
          <div
            class="border-l border-t border-r px-4 rounded-t-xl cursor-pointer flex-grow text-center font-bold"
            :class="tiersTab === 0 ? 'bg-amber-500 dark:bg-gray-600' : 'bg-amber-400 dark:bg-gray-700'"
            @click="tiersTab = 0"
          >
            Despin Tier list
          </div>
          <div
            class="border-l border-t border-r px-4 rounded-t-xl cursor-pointer flex-grow text-center font-bold"
            :class="tiersTab === 1 ? 'bg-amber-500 dark:bg-gray-600' : 'bg-amber-400 dark:bg-gray-700'"
            @click="tiersTab = 1"
          >
            Pandora Tier list
          </div>
        </div>
        <h3 v-if="tiersTab === 1" class="sm:text-lg text-center mb-2">
          Pandora’s Alternate Tier Ranks (by
          <a
            class="text-blue-500 hover:underline"
            href="https://forum.questionablequesting.com/threads/r34-economy-cyoa-thread.11289/page-63#post-3167059"
            target="_blank"
            rel="noopener noreferrer"
          >Pandora12</a>)
        </h3>
        <h3 v-else class="sm:text-lg text-center mb-2">
          Despin’s Tier Chart (by
          <a
            class="text-blue-500 hover:underline"
            href="https://docs.google.com/document/d/1-JLmjxufUDBH0uR4_DQOpyYEJ43pPWv37V9YD_wYoZ0/edit#"
            target="_blank"
            rel="noopener noreferrer"
          >Despin</a>)
        </h3>
        <Table
          :headers="pandoraTitles"
          :rows="tiersTab === 1 ? pandoraData : despinData"
          class="text-sm md:text-base w-full flex-grow text-black"
        />
      </div>
      <div>
        <Desc
          :desc="effectiveTiers"
          class="bg-amber-200 text-gray-800 sm:w-1/2 sm:float-right mt-8 mx-2 border-3 border-gray-900"
        />
        <Desc id="captures" :desc="captures" class="bg-warm-gray-200 dark:bg-gray-800" />
      </div>
      <Desc id="familiar" :desc="familiars" class="bg-warm-gray-200 dark:bg-gray-800" />
      <Desc id="purchases" :desc="purchases" class="bg-warm-gray-200 dark:bg-gray-800" />
      <Desc id="sales" :desc="sales" class="bg-warm-gray-200 dark:bg-gray-800" />
      <Desc id="waifu11" :desc="waifu11" class="bg-warm-gray-200 dark:bg-gray-800" />
      <Desc id="danger11" :desc="danger11" class="bg-warm-gray-200 dark:bg-gray-800" />
      <div>
        <!-- <Desc
          :desc="creditValue"
          class="bg-amber-200 text-gray-800 md:w-1/2 lg:w-1/3 sm:float-right mt-8 mx-2 border-3 border-gray-900"
        /> -->
        <Desc id="pvp" class="bg-warm-gray-200 dark:bg-gray-800" :desc="pvpRules" />
      </div>
      <h2 id="services" class="text-xl text-center">
        Company Services
      </h2>
      <Desc id="services" :desc="services" class="bg-warm-gray-200 dark:bg-gray-800" />
      <Desc id="salary" :desc="salary" class="bg-warm-gray-200 dark:bg-gray-800" />
      <Desc id="helpDesk" :desc="helpDesk" class="bg-warm-gray-200 dark:bg-gray-800" />
      <Desc id="Loans and Credit Debt" :desc="loans" class="bg-warm-gray-200 dark:bg-gray-800" />
      <Desc id="Missions" :desc="missions" class="bg-warm-gray-200 dark:bg-gray-800" />
      <Desc id="refund" :desc="refund" class="bg-warm-gray-200 dark:bg-gray-800" />
      <h2 id="arranged" class="text-xl text-center">
        Come Out and Play (Arranged PvP)
      </h2>
      <div class>
        <Table :headers="powerHeaders" :rows="powerTier" class="float-right m-4" />
        <Desc id="arranged" :desc="arranged" class="bg-warm-gray-200 dark:bg-gray-800" />
      </div>
      <div>
        <Desc
          :desc="assetValue"
          class="bg-amber-200 text-gray-800 sm:w-1/2 sm:float-right mt-8 mx-2 border-3 border-gray-900"
        />
        <Desc
          id="arrangedConditions"
          :desc="arrangedConditions"
          class="bg-warm-gray-200 dark:bg-gray-800"
        />
      </div>
      <Desc id="arrangedTeam" :desc="arrangedTeam" class="bg-warm-gray-200 dark:bg-gray-800" />
      <Desc id="arrangedSpecial" :desc="arrangedSpecial" class="bg-warm-gray-200 dark:bg-gray-800" />
      <h2 id="additional" class="text-xl text-center">
        Additional Rules
      </h2>
      <Desc id="RIP" :desc="rip" class="bg-warm-gray-200 dark:bg-gray-800" />
      <Desc id="Offspring" :desc="offspring" class="bg-warm-gray-200 dark:bg-gray-800" />
      <h2 id="additional" class="text-xl text-center">
        Nasuverse DLC rules
      </h2>
      <Desc id="NasuDLC" :desc="nasuDLC" class="bg-warm-gray-200 dark:bg-gray-800" />
      <h2 id="specific" class="text-xl text-center">
        Setting Specific Rules
      </h2>
      <div class="md:column-count-2 column-gap pb-8">
        <div
          v-for="world in worlds.filter(w => w.additional)"
          :key="world.worldName"
          class="mb-2 column-block max-w-[600px] bg-warm-gray-200 dark:bg-gray-800"
        >
          <h3 class="text-center text-lg">
            {{ world.worldName }}
          </h3>
          <Desc :desc="world.additional" />
        </div>
      </div>
      <ShareLoad />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { WORLD_RATINGS, rulesList, useWorlds, VERSION } from '~/data/constants'
import {
  startingDesc, pvpRules, effectiveTiers, captures, familiars, purchases, sales, waifu11,
  danger11, services, salary, helpDesk, loans, missions, refund, arranged, arrangedConditions,
  arrangedSpecial, arrangedTeam, assetValue, rip, offspring, nasuDLC, glossary,
} from '~/data/rules'

import { useTooltips } from '~/logic/misc'

const worldTitles = ['Danger Rating', 'Difficulty Title', 'Budget']
const worldData = WORLD_RATINGS.slice(1, 11).map(x => [x.rating, x.title, x.budget])
worldData.push([11, 'One', 'Tier X ticket'])

const waifuTitles = ['Waifu Tier', 'Cost', 'Steal', 'Capture', 'Capture + Sale', 'Short']
const waifuData = [
  ['T1', '1', '1', '1', '1', ['★', 'text-blue-600']],
  ['T2', '2', '1', '2', '2', ['★★', 'text-blue-600']],
  ['T3', '5', '1', '3', '4', ['★★★', 'text-blue-600']],
  ['T4', '10', '1', '6', '8', ['★', 'text-red-600']],
  ['T5', '20', '2', '12', '16', ['★★', 'text-red-600']],
  ['T6', '50', '5', '30', '40', ['★★★', 'text-red-600']],
  ['T7', '100', '10', '60', '80', ['★', 'text-gray-400']],
  ['T8', '200', '20', '120', '160', ['★★', 'text-gray-400']],
  ['T9', '500', '50', '300', '400', ['★★★', 'text-gray-400']],
  ['T10', '1000', '100', '600', '800', ['★', 'text-yellow-500']],
  ['TX', 'TX ticket', 'TX ticket', 'TX ticket', '2 TX tickets'],
]

const pandoraTitles = ['Waifu Tier', 'Tier Name', 'Tier Meaning']
const pandoraData = [
  ['T1', 'Muggle Tier', 'Completely baseline human, no special abilities or talents to speak of. Normie character.'],
  ['T2', 'Talented Tier', 'Someone who has some fighting skill, or political clout, but not exceptionally so, falling between tiers one and three.'],
  ['T3', 'Badass Normal Tier', 'Peak human. These characters are Made of Iron Badass Normals who can push the upper limits of what a human is capable of. They may have gotten Training from Hell, or are experts at martial arts, Good Old Fisticuffs, Gun Kata, Le Parkour, Improbable Weapon Usage and the like, or is part of the Red Shirt Army. Basically, this is a character anyone could become, bar the setting.'],
  ['T4', 'Abnormal Tier', 'Characters in this weight class have an ability, trait, or talent that is supernatural or superhuman, but are otherwise comparable to normal humans. Their abilities are generally very specific and limited and may be useless in some situations, rendering the characters just as helpless as normal un-powered humans. Usually, characters of this type lack the Required Secondary Powers to optimize or protect themselves from their own powers. Perhaps their only powers are to cancel other powers. Most of the time, their ability is something we can mimic or even surpass using common science or low-grade cybernetics.'],
  ['T5', 'Super Tier', 'Characters in this weight class can no longer be considered normal. Their powers, even if they are limited, may be used in a variety of ways, and tend to have Required Secondary Powers. Most of your run-of-the-mill Super Heroes, Shounen characters, and Mages will likely start here, possibly being pushed higher as they continue their adventures.'],
  ['T6', 'Peak Super Tier', 'Someone who qualifies as a Rank 5 character, but who is especially talented even within that tier. Typically, those who can leverage their powers to affect entire cities or at least large portions of them are at least this level.'],
  ['T7', 'Hyper Tier', 'These characters typically can cause, stop, or reverse large scale disasters, break the laws of or flat out warp physics with their powers. Those who can affect large regions encompassing multiple cities are typically at this tier.'],
  ['T8', 'Ultra Tier', 'These characters have abilities that can affect entire worlds (such as Earth or others comparable to it in size) either positively or negatively, or may even be a manifestation of a planet, with all that implies. Those who can reach into other dimensions go here.'],
  ['T9', 'Demigod Tier', 'These characters are powerful enough to be considered lesser gods, and are nigh-unchallenged in power in their setting.'],
  ['T10', 'God Tier', 'Characters that are this powerful aren\'t so much characters as forces of nature, wielding power beyond observable human science.'],
  ['TX', 'Author Tier', 'Characters in this weight class are absolutely Omnipotent and likely Omniscient. They are capable of exerting their will on all of reality and the entire universe (or even the totality of the multiverse) without exception. Destiny/Fate is their play-thing. They cannot be killed/destroyed by any means. Any limits they have are self-imposed.'],
]

const despinData = [
  ['T1', 'Commoner', 'Has no useful skill, power, or special trait.'],
  ['T2', 'Proficient', `Has a useful skill, power, or special trait.
    A trained fighter, political clout, high intelligence, etc.
    Also includes those with untrained minor powers.
  `],
  ['T3', 'Expert', `Pushes the upper limits of what a human is capable of.
Leader in their field, including mundane combat, political control, genius, etc.
  `],
  ['T4', 'Adventurer', `Has at least one skill, power, or special trait beyond normal human ability.
Abilities may be specific or limited in some way.
Also includes someone with Immortality as a stand-alone power.`],
  ['T5', 'Hero', `Has at least one well-trained, versatile, or useful superhuman ability.
Street level superheroes and shonen characters typically start here, as do
some with a trace of divinity.`],
  ['T6', 'Paragon', `Has at least one skill, power, or special trait beyond normal superhuman ability.
A Dimension Hopper or Resurrector with severe limitations typically starts here.
`],
  ['T7', 'Epic', `Has an ability that can affect a massive area, a useful esoteric effect, or
can destroy a small celestial object.
A God with limitations typically starts here, as does a Person of Mass Destruction.
`],
  ['T8', 'Legendary', `Has an ability that can affect a significant landmass, a powerful esoteric effect,
or can destroy a planet sized object.
An unlimited Dimension Hopper or Resurrector also starts here.
`],
  ['T9', 'Titan', `Has an ability that can affect a planet, a high-end esoteric effect, or can
accurately be described as a Walking Calamity.
`],
  ['T10', 'God', `Has an ability that can casually affect a planet, create a world, or is capable
of the genuinely impossible.
Scales infinitely. Planetary to multiversal influence all fall in this tier.
`],
  ['TX', 'Outsider', `Has broad reality altering capabilities or otherwise possesses an ability that
breaks or bypasses power-scaling entirely, though is not necessarily unkillable
or unstoppable.
A TX retinue member automatically becomes an unlimited Dimension Hopper.
`],
]

const powerHeaders = ['Strength', 'Multiplier']
const powerTier = [
  [1, '*1/3'],
  [2, '*2/5'],
  [3, '*1/2'],
  [4, '*2/3'],
  [5, '*1.0'],
  [6, '*1.5'],
  [7, '*2.0'],
  [8, '*2.5'],
  [9, '*3.0'],
]

const widths = [
  'max-w-full',
  'max-w-screen-lg',
  'max-w-screen-xl',
  'max-w-screen-sm',
  'max-w-screen-md',
]

const tiersTab = ref(0)
const width = useStorage('width', 0)

const { worlds } = useWorlds()

const currentWidth = computed(() => widths[width.value])

function changeWidth() {
  if (width.value !== null && width.value !== undefined)
    width.value += 1
  else
    width.value = 0

  if (width.value >= widths.length) width.value = 0
}

onMounted(() => useTooltips())

</script>
