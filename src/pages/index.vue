
<template>
  <div class="flex w-full">
    <div class="lg:pl-0 flex flex-col gap-4 mb-8 mx-auto w-full">
      <div class="flex lg:flex-row flex-col gap-2 w-full">
        <div class="lg:w-1/4 lg:pb-8 relative">
          <div class="flex flex-col px-2 lg:fixed lg:max-w-[290px] overflow-y-auto scrollbar min-h-0 lg:max-h-[calc(100vh-30px)]">
            <h3 class="text-xl font-semibold">
              Table of Contents
            </h3>
            <router-link
              to="/help"
              class="text-green-600 dark:text-green-400 hover:(underline bg-gray-200 dark:bg-gray-800) text-lg"
            >
              Help
            </router-link>
            <router-link
              to="/everything"
              class="text-green-600 dark:text-green-400 hover:(underline bg-gray-200 dark:bg-gray-800) text-lg"
            >
              List of Everything
            </router-link>
            <router-link
              :to="{ path: '/', hash: '#tierlist' }"
              class="text-amber-600 dark:text-amber-400 hover:(underline bg-gray-200 dark:bg-gray-800) text-lg"
            >
              Despin’s Tier Chart
            </router-link>
            <router-link
              v-for="rule in rulesList"
              :key="rule.title"
              :to="{ path: '/', hash: '#' + rule.title }"
              class="text-blue-600 dark:text-blue-400 hover:(underline bg-gray-200 dark:bg-gray-800) sm:text-lg"
            >
              {{ rule.title2 }}
            </router-link>
            <router-link
              :to="{ path: '/talents/home', hash: '#devotion' }"
              class="text-amber-600 dark:text-amber-400 hover:(underline, bg-gray-300, dark:bg-gray-800) text-lg pb-6"
            >
              Mechanic: Retinue Devotion
            </router-link>
          </div>
        </div>
        <div class="lg:w-3/4">
          <div :class="[currentWidth]" class="flex flex-col gap-4">
            <h1 id="rules" class="text-xl md:text-2xl font-bold px-2">
              Waifu Catalog 0.23.05 <span class="text-gray-600 dark:text-gray-400">(by SwiftRosenthal)</span> + DLC Interactive v{{ VERSION }} <span class="text-gray-600 dark:text-gray-400">(by Om1cr0n)</span>
            </h1>
            <h3 class="px-2 text-lg md:text-xl hover:underline text-blue-700 dark:text-light-blue-400">
              <a href="https://docs.google.com/document/d/1v14mjqC4tns0OhKkGE6e2LHXTq4GGQl__L8emB-YvGo/edit" target="_blank" rel="noopener noreferrer">Waifu Catalog 0.23.05 document</a>
            </h3>
            <h3 class="px-2 md:text-lg hover:underline text-blue-700 dark:text-light-blue-400">
              <a href="https://docs.google.com/document/d/1ILzH_MYYTsS40Dx4YnnqbGiFaHiqVRZD-yJBEz4CnEg/edit" target="_blank" rel="noopener noreferrer">Waifu Catalog <b>Unstable</b> version document</a>
            </h3>
            <div class="flex w-full -my-3 items-center justify-end">
              <fluent:auto-fit-width-24-filled class="h-8 w-8 bg-gray-300 dark:bg-gray-800 rounded cursor-pointer hover:scale-105 transform" @click="changeWidth" />
            </div>
            <div class="bg-warm-gray-200 dark:bg-gray-800 w-full">
              <Desc
                :desc="glossary"
                class="bg-amber-200 text-gray-800 text-sm md:text-base max-w-[370px] float-right mt-8 mx-2 !p-1 border-3 border-gray-900 indent-xs"
              />
              <Desc id="starting" :desc="startingDesc" />
              <div class="flex flex-col gap-4 w-full" :class="width < 2 ? 'lg:flex-row' : ''">
                <Desc id="startingWorld" class="lg:w-full" :desc="startingWorld" />
                <div :class="width < 2 ? 'lg:w-3/5': ''">
                  <Desc id="startingBudget" :desc="startingBudget" />
                  <div class="overflow-x-auto max-w-min mx-auto mb-2 px-2">
                    <Table :headers="intensityTableTitles" :rows="intensityTable" class="text-sm md:text-base mb-2 overflow-x-auto min-w-0" />
                  </div>
                </div>
              </div>
            </div>
            <div id="tierlist" class="bg-amber-100 dark:bg-gray-800 p-1 md:p-4 w-full mx-auto">
              <div class="text-xl text-center mb-2 text-teal-600 dark:text-teal-300">
                This tier list is an approximation as an official tier list does not exist yet.
              </div>
              <h3 class="sm:text-lg text-center mb-2">
                Despin and Alucard’s Tier Chart
                (<a
                  class="text-blue-500 hover:underline"
                  href="https://docs.google.com/document/d/1kXgdEuvp30p0pSJYV4IboyhF0lH9rEgXAwc5F7EQ_uQ/edit"
                  target="_blank"
                  rel="noopener noreferrer"
                >link to source</a>)
              </h3>
              <ul class="list-disc list-inside">
                <li>Beings are tiered based on what they can do, regardless of how.</li>
                <li>Tinkers/Power Granters/etc are tiered equal to their results.</li>
                <li>Significant Limits can reduce tier, while ability ease can raise it. Example: frequency, time limit, prep, control, skill, materials, cost, or backlash</li>
                <li>A TX-TZ retinue member automatically becomes an Omniversal Hopper.</li>
              </ul>
              <br>
              <Table
                :rows="despinData"
                class="text-sm md:text-base w-full flex-grow text-black"
              />
            </div>
            <Desc id="device" :desc="yourDevice" class="bg-warm-gray-200 dark:bg-gray-800" />
            <div class="flex flex-col gap-4 w-full" :class="width < 2 ? 'lg:flex-row' : ''">
              <Desc id="purchases" :desc="purchases" class="bg-warm-gray-200 dark:bg-gray-800" :class="width < 2 ? 'lg:w-1/2': ''" />
              <Desc id="familiar" :desc="familiars" class="bg-warm-gray-200 dark:bg-gray-800" :class="width < 2 ? 'lg:w-1/2': ''" />
            </div>
            <div>
              <Desc
                :desc="effectiveTiers"
                class="bg-amber-200 text-gray-800 sm:w-1/2 sm:float-right mt-8 mx-2 border-3 border-gray-900"
              />
              <Desc id="captures" :desc="captures" class="bg-warm-gray-200 dark:bg-gray-800" />
              <Desc id="captures" :desc="captureExtra" class="bg-warm-gray-200 dark:bg-gray-800" />
            </div>
            <Desc id="sales" :desc="sales" class="bg-warm-gray-200 dark:bg-gray-800" />
            <div class="flex flex-col gap-4 w-full" :class="width < 2 ? 'lg:flex-row' : ''">
              <Desc id="waifu11" :desc="waifu11" class="bg-warm-gray-200 dark:bg-gray-800" :class="width < 2 ? 'lg:w-2/5': ''" />
              <Desc id="danger11" :desc="danger11" class="bg-warm-gray-200 dark:bg-gray-800" :class="width < 2 ? 'lg:w-3/5': ''" />
            </div>
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
            <div class="flex flex-col gap-4 w-full" :class="width < 2 ? 'lg:flex-row' : ''">
              <Desc id="salary" :desc="salary" class="bg-warm-gray-200 dark:bg-gray-800" :class="width < 2 ? 'lg:w-1/2': ''" />
              <Desc id="helpDesk" :desc="helpDesk" class="bg-warm-gray-200 dark:bg-gray-800" :class="width < 2 ? 'lg:w-1/2': ''" />
            </div>
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
            <div class="flex flex-col gap-4 w-full" :class="width < 2 ? 'lg:flex-row' : ''">
              <Desc id="arrangedTeam" :desc="arrangedTeam" class="bg-warm-gray-200 dark:bg-gray-800" :class="width < 2 ? 'lg:w-3/5': ''" />
              <Desc id="arrangedSpecial" :desc="arrangedSpecial" class="bg-warm-gray-200 dark:bg-gray-800" :class="width < 2 ? 'lg:w-2/5': ''" />
            </div>
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
          </div>
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
  arrangedSpecial, arrangedTeam, assetValue, rip, offspring, nasuDLC, glossary, intensityTableTitles, intensityTable, yourDevice, captureExtra, startingBudget, startingWorld,
} from '~/data/rules'

import { useTooltips } from '~/logic/misc'

const worldTitles = ['Danger Rating', 'Difficulty Title', 'Budget']
const worldData = WORLD_RATINGS.slice(1, 11).map(x => [x.rating, x.title, x.budget])
worldData.push([11, 'One', '1 TX/TY companion'])

const waifuTitles = ['Waifu Tier', 'Cost', 'Capture', 'Sale', 'Capture + Sale', 'Short']
const waifuData = [
  ['T1', '1', '0', '0', '0', ['★', 'text-blue-600']],
  ['T2', '2', '1', '0', '1', ['★★', 'text-blue-600']],
  ['T3', '5', '3', '1', '4', ['★★★', 'text-blue-600']],
  ['T4', '10', '6', '2', '8', ['★', 'text-red-600']],
  ['T5', '20', '12', '4', '16', ['★★', 'text-red-600']],
  ['T6', '50', '30', '10', '40', ['★★★', 'text-red-600']],
  ['T7', '100', '60', '20', '80', ['★', 'text-gray-400']],
  ['T8', '200', '120', '40', '160', ['★★', 'text-gray-400']],
  ['T9', '500', '300', '100', '400', ['★★★', 'text-gray-400']],
  ['T10', '1000', '600', '200', '800', ['★', 'text-yellow-500']],
  ['TX', '2 IMG', '1 IMG', '400', '1 IMG + 400'],
  ['TY', '5 IMG', '3 IMG', '1 IMG', '4 IMG'],
  ['TZ', '10 IMG', '6 IMG', '2 IMG', '8 IMG'],
]

const despinData = [
  ['T1', 'Has no useful skill, power, or special trait.'],
  ['T2', `Has a useful skill. Most mundane people fall in this tier.
Housewife, teacher, chef, doctor, trained fighter, political proficiency, high intelligence, etc.
  `],
  ['T3', `Pushes the upper limits of mundane skill, or has a minor power, untrained power, or special trait.
Special forces, political expertise, genius, child with magical potential, long lived, etc.
  `],
  ['T4', `Has at least one extraordinary skill/power/special trait.
Ageless Immortality or Charles Atlas Superpowers start here.`],
  ['T5', `Has at least one well-trained/versatile/useful extraordinary ability.
Superheroes and shonen characters often start here, as well as the most Limited Resurrectors.`],
  ['T6', `From this tier on, increase in ability value and scale begin to have more weight. Has at least one skill/power/special trait of notable potency or (to use a Vs term) up to Multi-City Block level.
`],
  ['T7', `Has a useful esoteric effect or is up to Country level in power.
Time Travel and Local/Parallel Dimension Travel start here.
`],
  ['T8', `Possesses a powerful esoteric effect or is up to Continent level. 
Particularly potent or valuable abilities often start here, including Conceptual Immortality, an Omniversal Hopper, or an Unrestricted Resurrector.`],
  ['T9', 'Abilities may be more abstract or conceptual, or up to Planet level. While many deities exist at lower tiers, this is generally the point where beings can start to be considered capital-G Gods.'],
  ['T10', `Has an ability that can affect/influence/manipulate on a planetwide scale, or is capable of the genuinely impossible. Star level or higher, scaling infinitely upwards.
`],
  ['TX', `Not necessarily unkillable or unstoppable, but can somehow break or bypass power-scaling entirely. May act on a universal scale, but can only operate and/or exist within a single universe.
`],
  ['TY', `Able to operate beyond the confines of one universe and may be able to affect multiple universes at once. A being that embodies a multiverse is also typically found here.
`],
  ['TZ', `Operates on an Outerversal or Boundless scale. Able to manipulate multiverses and beyond at their leisure. Traditionally holds near if not absolute power in their narrative, and is often comparable to the author, able to manipulate anything and everything.
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
  'max-w-screen-xl',
  'max-w-screen-lg',
  'max-w-screen-md',
  'max-w-screen-sm',
]

const width = useStorage('width', 1)

const { worlds } = useWorlds()

const currentWidth = computed(() => widths[width.value])

// const sideBarMaxHeight = computed(() => )

function changeWidth() {
  if (width.value !== null && width.value !== undefined)
    width.value += 1
  else
    width.value = 0

  if (width.value >= widths.length) width.value = 0
}

onMounted(() => useTooltips())

</script>
