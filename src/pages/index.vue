
<template>
  <div class="max-w-screen-lg mx-auto flex flex-col gap-4 mt-4 mb-8">
    <div class="texl-lg font-bold mx-auto bg-red-500 bg-opacity-30 rounded border-3 border-red-500 p-2">
      Waifu Catalog Interactive currently are in a early Alpha stage, so a lot of stuff don't work properly yet.
    </div>
    <h1 id="rules" class="text-xl font-bold text-center">
      Rules
    </h1>
    <div class="flex flex-col ">
      <h3 class="text-xl font-semibold">
        Rules Index
      </h3>
      <router-link to="/everything" class="text-green-600 dark:text-green-400 hover:underline text-lg w-max">
        List of Everything
      </router-link>
      <router-link
        v-for="rule in rulesList"
        :key="rule.title"
        :to="{path: '/', hash:'#'+rule.title}"
        class="text-blue-600 dark:text-blue-400 hover:underline text-lg w-max"
      >
        {{ rule.title2 }}
      </router-link>
    </div>
    <Desc id="starting" class="bg-warm-gray-200 dark:bg-gray-800" :desc="startingDesc" />
    <div class="lg:flex bg-amber-100 dark:bg-gray-800 p-4 gap-4 w-full mx-auto">
      <Table :headers="worldTitles" :rows="worldData" class />
      <Table :headers="waifuTitles" :rows="waifuData" class />
    </div>
    <div>
      <Desc :desc="effectiveTiers" class="bg-amber-200 text-gray-800 max-w-sm float-right mt-8 mx-2 border-3 border-gray-900" />
      <Desc id="captures" :desc="captures" class="bg-warm-gray-200 dark:bg-gray-800" />
    </div>
    <Desc id="familiars" :desc="familiars" class="bg-warm-gray-200 dark:bg-gray-800" />
    <Desc id="purchases" :desc="purchases" class="bg-warm-gray-200 dark:bg-gray-800" />
    <Desc id="sales" :desc="sales" class="bg-warm-gray-200 dark:bg-gray-800" />
    <Desc id="waifu11" :desc="waifu11" class="bg-warm-gray-200 dark:bg-gray-800" />
    <Desc id="danger11" :desc="danger11" class="bg-warm-gray-200 dark:bg-gray-800" />
    <div>
      <Desc :desc="creditValue" class="bg-amber-200 text-gray-800 max-w-sm float-right mt-8 mx-2 border-3 border-gray-900" />
      <Desc id="pvp" class="bg-warm-gray-200 dark:bg-gray-800" :desc="pvpRules" />
    </div>
    <h2 id="services" class="text-xl text-center">
      Company Services
    </h2>
    <Desc id="services" :desc="services" class="bg-warm-gray-200 dark:bg-gray-800" />
    <Desc id="salary" :desc="salary" class="bg-warm-gray-200 dark:bg-gray-800" />
    <Desc id="helpDesk" :desc="helpDesk" class="bg-warm-gray-200 dark:bg-gray-800" />
    <Desc id="loans" :desc="loans" class="bg-warm-gray-200 dark:bg-gray-800" />
    <Desc id="missions" :desc="missions" class="bg-warm-gray-200 dark:bg-gray-800" />
    <Desc id="refund" :desc="refund" class="bg-warm-gray-200 dark:bg-gray-800" />
    <h2 id="arranged" class="text-xl text-center">
      Come Out and Play (Arranged PvP)
    </h2>
    <div class="">
      <Table :headers="powerHeaders" :rows="powerTier" class="float-right m-4" />
      <Desc id="arranged" :desc="arranged" class="bg-warm-gray-200 dark:bg-gray-800" />
    </div>
    <div>
      <Desc :desc="assetValue" class="bg-amber-200 text-gray-800 max-w-sm float-right mt-8 mx-2 border-3 border-gray-900" />
      <Desc id="arrangedConditions" :desc="arrangedConditions" class="bg-warm-gray-200 dark:bg-gray-800" />
    </div>
    <Desc id="arrangedTeam" :desc="arrangedTeam" class="bg-warm-gray-200 dark:bg-gray-800" />
    <Desc id="arrangedSpecial" :desc="arrangedSpecial" class="bg-warm-gray-200 dark:bg-gray-800" />
    <div class="pt-4"></div>
  </div>
</template>

<script lang="ts" setup>
import { WORLD_RATINGS, rulesList } from '~/data/constatnts'
import {
  startingDesc, pvpRules, effectiveTiers, captures, familiars, purchases, sales, waifu11,
  danger11, services, salary, helpDesk, loans, missions, refund, arranged, arrangedConditions,
  arrangedSpecial, arrangedTeam, creditValue, assetValue,
} from '~/data/rules'
import { useTooltips } from '~/logic/misc'

const worldTitles = ['Danger Rating', 'Difficulty Title', 'Budget']
const worldData = WORLD_RATINGS.map(x => [x.rating, x.title, x.budget])
worldData.push([11, 'One', 'Tier 11 ticket'])

const waifuTitles = ['Waifu Tier', 'Cost', 'Steal', 'Capture', 'Capture+Sale', 'Shorthand']
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
