
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
            <div class="flex gap-2">
              <div class="flex gap-2">
                <span class="text-gray-500 dark:text-gray-400">Name:</span>
                <span>{{ startingWorld.worldName || 'Unknown' }}</span>
              </div>
              <div v-if="startingWorld.condition" class="flex gap-2">
                <span class="text-gray-500 dark:text-gray-400">Condition:</span>
                <span>{{ startingWorld.condition?.length ?
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
            <Enum color="text-blue-500 hover:text-blue-400" :list="intensities" path="/intensity" empty-message="PvE Mode" />
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
            <div class="flex gap-1">
              <span class="text-gray-300">Bindings:</span>
              <Enum color="text-blue-400 hover:text-blue-300" :list="binding" path="/binding" empty-message="" />
              <div v-if="!binding.length">
                <router-link :to="{path: '/binding', hash:'#No Bindings'}">
                  <span class="text-blue-500">No Bindings</span>
                </router-link>
              </div>
            </div>
            <div class="flex gap-1">
              <span class="text-gray-300">Lures:</span>
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
              <li class="flex gap-2 text-gray-300">
                Ride: <Enum
                  color="text-blue-400 hover:text-blue-300"
                  class="text-gray-200"
                  :list="ridePerks"
                  path="/talents/ride"
                  empty-message="No Ride"
                />
              </li>
              <li class="flex gap-2 text-gray-300">
                Home: <Enum
                  color="text-blue-400 hover:text-blue-300"
                  class="text-gray-100"
                  :list="homePerks"
                  path="/talents/home"
                  empty-message="No Home"
                />
              </li>
              <li class="flex gap-2 text-gray-300">
                Talents: <Enum
                  color="text-blue-400 hover:text-blue-300"
                  class="text-gray-100"
                  :list="talentPerks"
                  path="/talents/talent"
                  empty-message="No Talents"
                />
              </li>
              <li class="flex gap-2 text-gray-300">
                Defenses: <Enum
                  color="text-blue-400 hover:text-blue-300"
                  class="text-gray-100"
                  :list="defensePerks"
                  path="/talents/defense"
                  empty-message="No Defenses"
                />
              </li>
              <li class="flex gap-2 text-gray-300">
                Misc: <Enum
                  color="text-blue-400 hover:text-blue-300"
                  class="text-gray-100"
                  :list="miscPerks"
                  path="/talents/perks"
                  empty-message="No Misc Perks"
                />
              </li>
              <li class="flex gap-2 text-gray-300">
                Generic: <Enum
                  color="text-blue-400 hover:text-blue-300"
                  class="text-gray-100"
                  :list="genericWaifuPerks"
                  path="/talents/specific"
                  empty-message="No Generic Perks"
                />
              </li>
              <li class="flex gap-2 text-gray-300">
                Waifu: <Enum
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
                <div v-for="char in companions" :key="char.uid" class="flex justify-between">
                  <div>
                    {{ char.name }}
                    <span class="text-gray-500"> from </span>{{ char.world }}
                    <span class="text-gray-500"> Tier: </span>
                    <span class="text-green-500">{{ char.tier }}</span>
                  </div>
                  <div>
                    <Button label="return" size="Small" bg-color="bg-orange-500" @click="sellCompanion(char.uid, char.tier)" />
                  </div>
                </div>
              </div>
            </Foldable>
          </div>
        </div>
        <div v-if="activeTab === 'Spendings'" class="text-gray-300">
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
            Total: <span class="text-green-500">{{ heritageCost + bindingCost + ridePerksCost+homePerksCost+talentsCost+defensesCost+miscPerksCost+waifuPerksCost+genericWaifuPerksCost+luresCost+companionsCost }}</span>
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
      <div class="flex h-8 justify-between mt-auto">
        <div></div>
        <div class="cursor-pointer hover:text-amber-500" @click="toggleFull()">
          <akar-icons:circle />
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { findIndex } from 'lodash-es'
import { useStore } from '~/store/store'

const activeTab = ref('Build')

const {
  budget, startingWorld, startingOrigin, intensities, binding, homePerks, defensePerks,
  companions, heritage, talentPerks, waifuPerks, ridePerks, miscPerks, luresBought, genericWaifuPerks,
  tier11tickets, heritageCost, bindingCost, ridePerksCost, homePerksCost, talentsCost, defensesCost,
  miscPerksCost, waifuPerksCost, genericWaifuPerksCost, luresCost, companionsCost, budgetMods,
} = useStore()

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

// const intensityText = computed(() => {
//   if (intensities.value.length === 0) return 'Base Intensity'
//   else return `[${intensities.value.map(x => x.title).join(', ')}]`
// })

const [visible, toggleFull] = useToggle()

function sellCompanion(uid: number, tier: number) {
  companions.value.splice(findIndex(companions.value, { uid }), 1)
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
