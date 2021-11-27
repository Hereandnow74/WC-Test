<template>
  <div class="text-gray-300">
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
      Other Controls: <span class="text-orange-500">{{ otherCost }}</span>
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
      Generic Waifu Perks: <span class="text-orange-500">{{ genericWaifuPerksCost }}</span>
    </div>
    <div class="font-semibold flex justify-between mx-4 border-b border-gray-700">
      Waifu Perks: <span class="text-orange-500">{{ waifuPerksCost }}</span>
    </div>
    <div class="font-semibold flex justify-between mx-4 border-b border-gray-700">
      Other Perks Total: <span class="text-green-500">{{ otherCost + miscPerksCost + waifuPerksCost + genericWaifuPerksCost }}</span>
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
    <div class="font-semibold flex justify-between mx-4 border-b border-gray-700">
      Salary: monthly - <span class="text-yellow-500">10000$</span> bonus for captures
      <span class="text-yellow-500">{{ companionTotalCredits * 100 }}$</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CHAR_COSTS } from '~/data/constatnts'
import { useStore } from '~/store/store'

const {
  startingOrigin, heritageCost, bindingCost, ridePerksCost, homePerksCost, talentsCost, defensesCost,
  miscPerksCost, waifuPerksCost, genericWaifuPerksCost, luresCost, companionsCost, companionProfit,
  companionProfitSold, totalCost, companions, otherCost,
} = useStore()

const companionTotalCredits = computed(() => {
  return companions.value.reduce((a, x) => {
    if (x.method === 'capture') {
      let captureCost = Math.ceil(CHAR_COSTS[x.tier - 1])
      captureCost = captureCost === 11111 ? 2000 : captureCost
      return a += captureCost
    }
    return a
  }, 0)
})

</script>
