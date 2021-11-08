
<template>
  <div
    class="fixed bottom-0 w-full text-gray-100 transition-transform transform"
    :class="visible ? 'translate-y-0' : 'translate-y-[calc(100%-1.8rem)]'"
    @click="visible = false"
  >
    <div
      class="min-w-[320px] max-w-[440px] h-[568px] md:h-[720px] rounded-3xl mx-auto border relative flex flex-col"
      bg="gray-900"
      border="2 gray-400"

      @click.stop
    >
      <div class="text-center pb-1">
        <span v-if="tier11tickets !== 0" class="mr-2">T11 tickets: {{ tier11tickets }}</span>
        <span>Budget: {{ budget }}</span>
        <span v-if="budget < 0" class="text-red-500 px-2">You are in debt</span>
        <span
          class="absolute inline-block right-4 text-xl cursor-pointer hover:text-green-500"
          @click="() => toggleFull()"
        >
          <ic:round-unfold-more />
        </span>
      </div>
      <div class="flex flex-col border m-1 py-1 border-gray-600 flex-grow rounded-sm bg-gray-800 min-h-0">
        <div class="flex gap-4 mx-2 border-b-1">
          <div
            class="border-t-2 border-green-500 flex-grow rounded-t cursor-pointer flex items-center justify-center"
            :class="activeTab=='Build' ? 'bg-green-600': 'hover:bg-gray-800'"
            @click="activeTab = 'Build'"
          >
            <bx:bx-spreadsheet />Build
          </div>
          <div
            class="border-t-2 border-green-500 flex-grow rounded-t cursor-pointer flex items-center justify-center"
            :class="activeTab=='Spendings' ? 'bg-green-600': 'hover:bg-gray-800'"
            @click="activeTab = 'Spendings'"
          >
            <la:coins />Spendings
          </div>
          <div
            class="border-t-2 border-green-500 flex-grow rounded-t cursor-pointer flex items-center justify-center"
            :class="activeTab=='Manual' ? 'bg-green-600': 'hover:bg-gray-800'"
            @click="activeTab = 'Manual'"
          >
            <fluent:wrench-16-filled />Manual
          </div>
        </div>
        <div v-if="activeTab === 'Build'" class="px-2 flex flex-col gap-2 overflow-y-auto min-h-0 scrollbar">
          <div id="World">
            <h3 class="text-lg text-gray-400">
              World
            </h3>
            <div class="flex flex-wrap whitespace-nowrap gap-2">
              <div class="flex gap-2">
                <span class="text-gray-500 dark:text-gray-400">Name:</span>
                <span>{{ startingWorld.worldName || 'Unknown' }}</span>
              </div>
              <div v-if="startingWorld?.condition?.length" class="flex gap-2">
                <span class="text-gray-500 dark:text-gray-400">Condition:</span>
                <span>{{ isArray(startingWorld.condition) ?
                  startingWorld.condition[0].name : startingWorld.condition }}</span>
              </div>
              <div class="flex gap-2">
                <span class="text-gray-500 dark:text-gray-400">Rating:</span>
                <span>{{ startingWorld.rating || 'Unknown' }}</span>
              </div>
            </div>
          </div>
          <div id="Intensity">
            <h3 class="text-lg text-gray-400">
              Intensity
            </h3>
            <Enum color="text-blue-400 hover:text-blue-300" :list="intensities" path="/intensity" empty-message="PvE Mode" />
          </div>
          <div id="Origin">
            <h3 class="text-lg text-gray-400">
              Origin
            </h3>
            <div v-html="originText || 'No Origin'" />
          </div>
          <div id="Binding & Lure">
            <h3 class="text-lg text-gray-400">
              Binding & Lure
            </h3>
            <div class="">
              <span class="text-gray-300 float-left mr-2">Bindings:</span>
              <Enum color="text-blue-400 hover:text-blue-300" :list="binding" path="/binding" empty-message="" />
              <div v-if="!binding.length">
                <router-link :to="{path: '/binding', hash:'#No Bindings'}">
                  <span class="text-blue-500">No Bindings</span>
                </router-link>
              </div>
            </div>
            <div class="">
              <span class="text-gray-300 float-left mr-2">Lures:</span>
              <Enum color="text-blue-400 hover:text-blue-300" :list="luresBought" path="/binding" empty-message="" />
              <div v-if="!luresBought.length">
                No Lures
              </div>
            </div>
          </div>
          <div id="Heritage">
            <h3 class="text-lg text-gray-400">
              Heritage
            </h3>
            <Enum color="text-blue-400 hover:text-blue-300" :list="heritage" path="/heritage" empty-message="No Heritage" />
          </div>
          <div id="Talents & Perks">
            <h3 class="text-lg text-gray-400">
              Talents & Perks
            </h3>
            <ul>
              <!-- TODO: Display addons and variant  -->
              <li class=" text-gray-300">
                <div class="float-left mr-2">
                  Ride:
                </div>
                <Enum
                  color="text-blue-400 hover:text-blue-300"
                  class="text-gray-200"
                  :list="ridePerks"
                  path="/talents/ride"
                  empty-message="No Ride"
                />
              </li>
              <li class=" text-gray-300">
                <div class="float-left mr-2">
                  Home:
                </div>
                <Enum
                  color="text-blue-400 hover:text-blue-300"
                  class="text-gray-100"
                  :list="homePerks"
                  path="/talents/home"
                  empty-message="No Home"
                />
              </li>
              <li class="text-gray-300">
                <div class="float-left mr-2">
                  Talents:
                </div>
                <Enum
                  color="text-blue-400 hover:text-blue-300"
                  class="text-gray-100"
                  :list="talentPerks"
                  path="/talents/talent"
                  empty-message="No Talents"
                />
              </li>
              <li class="text-gray-300">
                <div class="float-left mr-2">
                  Defenses:
                </div>
                <Enum
                  color="text-blue-400 hover:text-blue-300"
                  class="text-gray-100"
                  :list="defensePerks"
                  path="/talents/defense"
                  empty-message="No Defenses"
                />
              </li>
              <li class="text-gray-300">
                <div class="float-left mr-2">
                  Misc:
                </div>
                <Enum
                  color="text-blue-400 hover:text-blue-300"
                  class="text-gray-100"
                  :list="miscPerks"
                  path="/talents/perks"
                  empty-message="No Misc Perks"
                />
              </li>
              <li class="text-gray-300">
                <div class="float-left mr-2">
                  Generic:
                </div>
                <Enum
                  color="text-blue-400 hover:text-blue-300"
                  class="text-gray-100"
                  :list="genericWaifuPerks"
                  path="/talents/specific"
                  empty-message="No Generic Perks"
                />
              </li>
              <li class="text-gray-300">
                <div class="float-left mr-2">
                  Waifu:
                </div>
                <Enum
                  color="text-blue-400 hover:text-blue-300"
                  class="text-gray-100"
                  :list="waifuPerks"
                  path="/talents/specific"
                  empty-message="No Waifu Perks"
                />
              </li>
            </ul>
          </div>
          <div id="Companions">
            <Foldable title="Companions" class="text-lg text-gray-400" :is-open="true">
              <div class="flex flex-col gap-1 text-gray-200 text-base">
                <div
                  v-for="char in companions"
                  :key="char.uid"
                  class="flex justify-between"
                  :class="char.sold ? 'text-gray-600': ''"
                >
                  <div>
                    <span class="text-gray-500 mr-1">{{ methods[char.method] }}</span>
                    <router-link :to="`/companions/?name=${char.name}`" class="hover:underline">
                      {{ char.name }}
                    </router-link>
                    <span class="text-gray-500"> from </span>{{ char.world }}
                    <span class="text-gray-500"> Tier: </span>
                    <span class="text-green-500">{{ char.tier }}</span>
                    <span v-if="char.sold" class="px-2 text-red-500">SOLD</span>
                  </div>
                  <div v-if="!char.sold">
                    <Button label="sell" size="Small" bg-color="bg-red-500" @click="sellCompanion(char.uid)" />
                  </div>
                </div>
              </div>
            </Foldable>
          </div>
        </div>
        <div v-if="activeTab === 'Spendings'" class="text-gray-300">
          <h3 class="mt-4 text-xl mx-4 text-gray-400">
            Spendings
          </h3>
          <div class="font-semibold flex justify-between mx-4 border-b border-gray-700">
            Origin: <span class="text-orange-500">{{ startingOrigin.cost }}</span>
          </div>
          <div class="font-semibold flex justify-between mx-4 border-b border-gray-700">
            Heritage: <span class="text-orange-500">{{ heritageCost }}</span>
          </div>
          <div class="font-semibold flex justify-between mx-4 border-b border-gray-700">
            Binding: <span class="text-orange-500">{{ bindingCost }}</span>
          </div>
          <div class="font-semibold flex justify-between mx-4 border-b border-gray-700">
            Lures: <span class="text-orange-500">{{ luresCost }}</span>
          </div>
          <div class="font-semibold flex justify-between mx-4 border-b border-gray-700">
            Rides: <span class="text-orange-500">{{ ridePerksCost }}</span>
          </div>
          <div class="font-semibold flex justify-between mx-4 border-b border-gray-700">
            Home: <span class="text-orange-500">{{ homePerksCost }}</span>
          </div>
          <div class="font-semibold flex justify-between mx-4 border-b border-gray-700">
            Talents: <span class="text-orange-500">{{ talentsCost }}</span>
          </div>
          <div class="font-semibold flex justify-between mx-4 border-b border-gray-700">
            Defenses: <span class="text-orange-500">{{ defensesCost }}</span>
          </div>
          <div class="font-semibold flex justify-between mx-4 border-b border-gray-700">
            Misc Perks: <span class="text-orange-500">{{ miscPerksCost }}</span>
          </div>
          <div class="font-semibold flex justify-between mx-4 border-b border-gray-700">
            Waifu Perks: <span class="text-orange-500">{{ waifuPerksCost + genericWaifuPerksCost }}</span>
          </div>
          <div class="font-semibold flex justify-between mx-4 border-b border-gray-700">
            Other Perks Total: <span class="text-green-500">{{ miscPerksCost + waifuPerksCost + genericWaifuPerksCost }}</span>
          </div>
          <div class="font-semibold flex justify-between mx-4 border-b border-gray-700">
            Companions: <span class="text-orange-500">{{ companionsCost }}</span>
          </div>
          <div class="font-semibold flex justify-between mx-4 border-b border-gray-700">
            Total: <span class="text-green-500">{{ totalCost }}</span>
          </div>
          <h3 class="mt-4 text-xl mx-4 text-gray-400">
            Profits
          </h3>
          <div class="font-semibold flex justify-between mx-4 border-b border-gray-700">
            Profit from Capturing: <span class="text-yellow-500">{{ companionProfit }}</span>
          </div>
          <div class="font-semibold flex justify-between mx-4 border-b border-gray-700">
            Profit from Selling: <span class="text-yellow-500">{{ companionProfitSold }}</span>
          </div>
        </div>
        <div v-if="activeTab === 'Manual'" class="text-gray-300 mx-2 mt-2 flex flex-col gap-2">
          <div class="flex justify-between">
            Plus credits
            <Input v-model.number="budgetMods.plus" class="w-24" />
          </div>
          <div class="flex justify-between">
            Minus credits
            <Input v-model.number="budgetMods.minus" class="w-24" />
          </div>
          <div class="flex justify-between">
            Plus T11 tickets
            <NumberInput v-model="budgetMods.plus11" :min="0" class="w-24" />
          </div>
          <div class="flex justify-between">
            Minus T11 tickets
            <NumberInput v-model="budgetMods.minus11" :min="0" class="w-24" />
          </div>
        </div>
      </div>
      <div class="flex h-8 justify-between items-center px-6 mt-auto">
        <div class="w-16 cursor-pointer hover:text-amber-500" title="Clear Build" @click="clearBuild">
          <ant-design:clear-outlined />
        </div>
        <div class="cursor-pointer hover:text-amber-500" @click="toggleFull()">
          <akar-icons:circle />
        </div>
        <div class="flex gap-1">
          <div class="cursor-pointer hover:text-amber-500" title="Save & Load" @click="showSaveLoad = true">
            <fluent:save-24-regular />
          </div>
          <div class="cursor-pointer hover:text-amber-500" title="Share" @click="showShare = true">
            <ant-design:share-alt-outlined />
          </div>
          <div class="cursor-pointer hover:text-amber-500" title="Copy Text of Build" @click="copyText">
            <bx:bx-copy-alt />
          </div>
        </div>
      </div>
    </div>
    <teleport to="#app">
      <SaveLoad v-if="showSaveLoad" class="z-20" @click="showSaveLoad = !showSaveLoad" />
      <Share v-if="showShare" class="z-20" @click="showShare = !showShare" />
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import { findIndex, isArray } from 'lodash-es'
import { Perk, useStore } from '~/store/store'

const activeTab = ref('Build')
const showSaveLoad = ref(false)
const showShare = ref(false)

const {
  budget, startingWorld, startingOrigin, intensities, binding, homePerks, defensePerks,
  companions, heritage, talentPerks, waifuPerks, ridePerks, miscPerks, luresBought, genericWaifuPerks,
  tier11tickets, heritageCost, bindingCost, ridePerksCost, homePerksCost, talentsCost, defensesCost,
  miscPerksCost, waifuPerksCost, genericWaifuPerksCost, luresCost, companionsCost, budgetMods, baseBudget,
  allEffects, flags, companionProfit, companionProfitSold, totalCost,
} = useStore()

const methods = {
  buy: 'Bought',
  capture: 'Captured',
  used: 'Bought slightly used',
  yoink: 'Yoinked',
}

const originText = computed(() => {
  const variants = {
    'Drop-In': 'Dropped-In',
    'Walk-In': 'Walked-In',
    'Extra': `'Extra' with <b>${startingOrigin.value.cost}</b> additional cost`,
    'Substitute': `Substitue as a <b>${startingOrigin.value.character}</b> of T${startingOrigin.value.tier}`,
    'Possess': `Possess a <b>${startingOrigin.value.character}</b> of T${startingOrigin.value.tier}`,
  } as Record<string, string>

  return variants[startingOrigin.value.title]
})

const originTextClean = computed(() => {
  const variants = {
    'Drop-In': 'Dropped-In',
    'Walk-In': 'Walked-In',
    'Extra': `'Extra' with ${startingOrigin.value.cost} additional cost`,
    'Substitute': `Substitue as a ${startingOrigin.value.character} of T${startingOrigin.value.tier}`,
    'Possess': `Possess a ${startingOrigin.value.character} of T${startingOrigin.value.tier}`,
  } as Record<string, string>

  return variants[startingOrigin.value.title]
})

const [visible, toggleFull] = useToggle()

function sellCompanion(uid: number) {
  companions.value[findIndex(companions.value, { uid })].sold = true
}

function clearBuild() {
  baseBudget.value = 55
  startingWorld.value = {
    worldName: 'Current world',
    rating: 2,
  }
  startingOrigin.value = {
    title: '',
    cost: 0,
  }
  intensities.value = []
  binding.value = []
  luresBought.value = []
  heritage.value = []
  ridePerks.value = []
  homePerks.value = []
  talentPerks.value = []
  defensePerks.value = []
  miscPerks.value = []
  genericWaifuPerks.value = []
  waifuPerks.value = []
  companions.value = []
  allEffects.value = []
  flags.value = {
    noBindings: true,
    noHeritage: true,
    danger11Start: false,
    pvpEnabled: false,
    chargen: true,
    skipUsed: undefined,
    hasARide: false,
  }
  budgetMods.value = {
    plus: 0,
    minus: 0,
    plus11: 0,
    minus11: 0,
  }
}

function buildString(title: string, items: Perk[], left: object) {
  let str = `${title}\n`
  items.forEach((x) => {
    left.c -= x.cost
    const count = x.count && x.count > 1 ? ` x${x.count} ` : ''
    let complexFlavor = ''
    let complexCompanion = ''
    let complexBoth = ''
    if (x.complex) {
      if (x.complex[0].flavor && x.complex[0].target)
        complexBoth = `[${x.complex.map(x => `${x.target} has ${x.flavor}`).join(', ')}]`
      if (x.complex[0].flavor)
        complexFlavor = `[${x.complex.map(x => `${x.flavor}`).join(', ')}]`
      if (x.complex[0].target)
        complexCompanion = `[${x.complex.map(x => `${x.target}`).join(', ')}]`
    }
    str += `${x.title}${count}${complexBoth || complexCompanion || complexFlavor} -${x.cost} [${left.c}]\n`
  })
  return str
}

function copyText() {
  const fullCost = { c: baseBudget.value === 11111 ? 0 : baseBudget.value }

  let full = `Starting World: ${startingWorld.value.worldName}\nStarting budget ${fullCost.c}\n\n`

  full += intensities.value.length
    ? `Intensity \n${intensities.value.reduce((a, x) =>
      a += `${x.title} +${baseBudget.value * x.intensity} [${(fullCost.c += x.intensity * baseBudget.value, fullCost.c)}]\n\n`
    , '')}`
    : ''

  fullCost.c -= startingOrigin.value.cost || 0
  full += originTextClean.value ? `${originTextClean.value} -${startingOrigin.value.cost} [${fullCost.c}]\n\n` : ''
  full += heritage.value.length ? `${buildString('Heritage', heritage.value, fullCost)}\n` : ''
  full += binding.value.length ? `${buildString('Bindings', binding.value, fullCost)}\n` : ''
  full += luresBought.value.length ? `${buildString('Lures', luresBought.value, fullCost)}\n` : ''
  full += ridePerks.value.length ? `${buildString('Rides', ridePerks.value, fullCost)}\n` : ''
  full += homePerks.value.length ? `${buildString('Home Perks', homePerks.value, fullCost)}\n` : ''
  full += talentPerks.value.length ? `${buildString('Talents', talentPerks.value, fullCost)}\n` : ''
  full += defensePerks.value.length ? `${buildString('Defenses', defensePerks.value, fullCost)}\n` : ''
  full += miscPerks.value.length ? `${buildString('Misc Perks', miscPerks.value, fullCost)}\n` : ''
  full += genericWaifuPerks.value.length ? `${buildString('Generic Waifu Perks', genericWaifuPerks.value, fullCost)}\n` : ''
  full += waifuPerks.value.length ? `${buildString('Waifu Perks', waifuPerks.value, fullCost)}\n` : ''

  const companionsBought = companions.value.filter(x => x.method !== 'capture')
  const companionsCaptured = companions.value.filter(x => x.method === 'capture')

  full += companionsBought.length
    ? `Companions bought -${companionsCost.value} [${fullCost.c - companionsCost.value}]\n${companionsBought.reduce((a, x) =>
      a += `${x.name}(T${x.tier})[${x.method}] from ${x.world}\n`
    , '')}`
    : ''

  fullCost.c -= companionsCost.value

  full += companionsCaptured.length
    ? `\nCompanions captured +${companionProfit.value} [${fullCost.c + companionProfit.value}]\n${companionsCaptured.reduce((a, x) =>
      a += `${x.name}(T${x.tier}) from ${x.world}\n`
    , '')}`
    : ''

  navigator.clipboard.writeText(full)
}

</script>

<style>
.scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #3b3b3b #858585;
}

.scrollbar::-webkit-scrollbar {
    width: 8px;
}

.scrollbar::-webkit-scrollbar-track {
    background-color: #555555;
    border-radius: 100px;
}

.scrollbar::-webkit-scrollbar-thumb {
    background-color: #242424;
    border-radius: 100px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgb(54, 54, 54);
}
</style>
