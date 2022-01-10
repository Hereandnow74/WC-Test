
<template>
  <div class="max-w-screen-lg lg:pl-0 flex flex-col gap-4 mt-4 mb-8">
    <h1 id="rules" class="text-xl font-bold text-center mt-4">
      Rules
    </h1>
    <div class="flex flex-col mx-2">
      <h3 class="text-xl font-semibold">
        Rules Index
      </h3>
      <router-link to="/help" class="text-green-600 dark:text-green-400 hover:underline text-lg w-max">
        Help
      </router-link>
      <router-link to="/everything" class="text-green-600 dark:text-green-400 hover:underline text-lg w-max">
        List of Everything
      </router-link>
      <router-link :to="{path: '/', hash:'#pandora'}" class="text-amber-600 dark:text-amber-400 hover:underline text-lg w-max">
        Pandora’s Alternate Tier Ranks
      </router-link>
      <router-link
        v-for="rule in rulesList"
        :key="rule.title"
        :to="{path: '/', hash:'#'+rule.title}"
        class="text-blue-600 dark:text-blue-400 hover:underline sm:text-lg w-max"
      >
        {{ rule.title2 }}
      </router-link>
    </div>
    <Desc id="starting" class="bg-warm-gray-200 dark:bg-gray-800" :desc="startingDesc" />
    <div class="lg:flex bg-amber-100 dark:bg-gray-800 p-1 md:p-4 gap-4 w-full mx-auto">
      <Table :headers="worldTitles" :rows="worldData" class="text-sm md:text-base" />
      <Table :headers="waifuTitles" :rows="waifuData" class="text-sm md:text-base w-min flex-grow" />
    </div>
    <div id="pandora" class="bg-amber-100 dark:bg-gray-800 p-1 md:p-4 w-full mx-auto">
      <h3 class="sm:text-lg text-center mb-2">
        Pandora’s Alternate Tier Ranks (by <a class="text-blue-500 hover:underline" href="https://forum.questionablequesting.com/threads/r34-economy-cyoa-thread.11289/page-63%23post-3167059&sa=D&source=editors&ust=1636169921608000&usg=AOvVaw3lNgOZSmmHTK3NPa9X_SOQ" target="_blank" rel="noopener noreferrer">Pandora12</a>)
      </h3>
      <Table :headers="pandoraTitles" :rows="pandoraData" class="text-sm md:text-base w-full flex-grow text-black" />
    </div>
    <div>
      <Desc :desc="effectiveTiers" class="bg-amber-200 text-gray-800 sm:w-1/2 sm:float-right mt-8 mx-2 border-3 border-gray-900" />
      <Desc id="captures" :desc="captures" class="bg-warm-gray-200 dark:bg-gray-800" />
    </div>
    <Desc id="familiar" :desc="familiars" class="bg-warm-gray-200 dark:bg-gray-800" />
    <Desc id="purchases" :desc="purchases" class="bg-warm-gray-200 dark:bg-gray-800" />
    <Desc id="sales" :desc="sales" class="bg-warm-gray-200 dark:bg-gray-800" />
    <Desc id="waifu11" :desc="waifu11" class="bg-warm-gray-200 dark:bg-gray-800" />
    <Desc id="danger11" :desc="danger11" class="bg-warm-gray-200 dark:bg-gray-800" />
    <div>
      <Desc :desc="creditValue" class="bg-amber-200 text-gray-800 md:w-1/2 lg:w-1/3 sm:float-right mt-8 mx-2 border-3 border-gray-900" />
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
    <div class="">
      <Table :headers="powerHeaders" :rows="powerTier" class="float-right m-4" />
      <Desc id="arranged" :desc="arranged" class="bg-warm-gray-200 dark:bg-gray-800" />
    </div>
    <div>
      <Desc :desc="assetValue" class="bg-amber-200 text-gray-800 sm:w-1/2 sm:float-right mt-8 mx-2 border-3 border-gray-900" />
      <Desc id="arrangedConditions" :desc="arrangedConditions" class="bg-warm-gray-200 dark:bg-gray-800" />
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
    <div class="pt-4"></div>
    <ShareLoad />
  </div>
</template>

<script lang="ts" setup>
import { WORLD_RATINGS, rulesList } from '~/data/constants'
import {
  startingDesc, pvpRules, effectiveTiers, captures, familiars, purchases, sales, waifu11,
  danger11, services, salary, helpDesk, loans, missions, refund, arranged, arrangedConditions,
  arrangedSpecial, arrangedTeam, creditValue, assetValue, rip, offspring, nasuDLC,
} from '~/data/rules'

import { useTooltips } from '~/logic/misc'

const worldTitles = ['Danger Rating', 'Difficulty Title', 'Budget']
const worldData = WORLD_RATINGS.slice(0, 10).map(x => [x.rating, x.title, x.budget])
worldData.push([11, 'One', 'Tier 11 ticket'])

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
  ['T11', 'T11 ticket', 'T11 ticket', 'T11 ticket', '2 T11 tickets'],
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
  ['T11', 'Author Tier', 'Characters in this weight class are absolutely Omnipotent and likely Omniscient. They are capable of exerting their will on all of reality and the entire universe (or even the totality of the multiverse) without exception. Destiny/Fate is their play-thing. They cannot be killed/destroyed by any means. Any limits they have are self-imposed.'],
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

onMounted(() => useTooltips())

</script>
