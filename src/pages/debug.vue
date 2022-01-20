<template>
  <div class="max-w-screen-md lg:pl-0 flex flex-col gap-4">
    <div>{{ allEffects }}</div>
    <div>{{ intensities }}</div>
    <div>{{ luresBought }}</div>
    <div>{{ binding }}</div>
    <div>{{ flags }}</div>
    <div>{{ heritage }}</div>
    <div>{{ ridePerks }}</div>
    <div>{{ homePerks }}</div>
    <h3>TALENTS</h3>
    <div>{{ talentPerks }}</div>
    <h3>DEFENSES</h3>
    <div>{{ defensePerks }}</div>
    <div>{{ miscPerks }}</div>
    <div>{{ genericWaifuPerks }}</div>
    <div>{{ companions }}</div>
    <div>{{ startingOrigin }}</div>
    <div>{{ waifuPerks }}</div>
    <div>{{ baseBudget }}</div>
    <div>{{ startingWorld }}</div>
    <div>{{ budgetMods }}</div>
    <div>{{ otherPerks }}</div>
    <div>{{ fee }}</div>

    <div class="flex flex-wrap gap-2  pb-8">
      {{ fullStartingBudget }} - {{ startingOrigin.cost }}
      - {{ bindingCost }} - {{ heritageCost }} - {{ luresCost }} - {{ ridePerksCost }} - {{ homePerksCost }}
      - {{ talentsCost }} - {{ defensesCost }} - {{ miscPerksCost }} - {{ waifuPerksCost }}
      - {{ genericWaifuPerksCost }} - {{ companionsCost }} - {{ otherCost }} - {{ fee }}
      - {{ budgetMods.minus }} + {{ budgetMods.plus }} + {{ companionProfit }} + {{ companionProfitSold }}
      loans: {{ loan.gained }} + {{ usedHeritageDiscount }} + {{ talentsDiscount }} + {{ defensesDiscount }}
      + {{ defenseRetinueDiscount }}
    </div>
  </div>
</template>

<script lang='ts' setup>
import { useStore } from '~/store/store'

const {
  allEffects, intensities, luresBought, binding, flags, heritage,
  ridePerks, homePerks, talentPerks, defensePerks, miscPerks, genericWaifuPerks, companions, startingOrigin,
  waifuPerks, baseBudget, startingWorld, budgetMods, otherPerks, fee,
  baseBudgetAfter,
  userWorlds,
  localUserWorlds,
  userCharacters,
  localUserCharacters,
  tier11tickets,
  bindingCost,
  otherCost,
  heritageCost,
  ridePerksCost,
  homePerksCost,
  talentsCost,
  defensesCost,
  miscPerksCost,
  waifuPerksCost,
  genericWaifuPerksCost,
  luresCost,
  companionsCost,
  allForSave,
  targetList,
  companionProfit,
  companionProfitSold,
  totalCost,
  mode,
  params,
  userRides,
  localUserRides,
  yourTier,
  companionsUIDs,
  fullStartingBudget,
  captureKoeff,
  creditLimit,
  underLoan,
  csr,
  loan,
  trHistory,
  favorites,
  totalActive,
  usedHeritageDiscount,
  talentsDiscount,
  defensesDiscount,
  defenseRetinueDiscount,
} = useStore()

</script>
