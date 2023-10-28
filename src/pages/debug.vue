<template>
  <div class="max-w-screen-md lg:pl-0 flex flex-col gap-4">
    <!-- <div class="flex gap-2">
      <Button label="Check Worlds" size="Small" @click="getAllDiscord" />
      <Button label="Copy To" size="Small" @click="copyWorldsTo" />
    </div> -->

    <h3>All effects</h3>
    <div>{{ allEffects }}</div>
    <h3>intensities</h3>
    <div>{{ intensities }}</div>
    <h3>luresBought</h3>
    <div>{{ luresBought }}</div>
    <h3>binding</h3>
    <div>{{ binding }}</div>
    <h3>flags</h3>
    <div>{{ flags }}</div>
    <h3>heritage</h3>
    <div>{{ heritage }}</div>
    <h3>ridePerks</h3>
    <div>{{ ridePerks }}</div>
    <h3>homePerks</h3>
    <div>{{ homePerks }}</div>
    <h3>TALENTS</h3>
    <div>{{ talentPerks }}</div>
    <h3>DEFENSES</h3>
    <div>{{ defensePerks }}</div>
    <h3>miscPerks</h3>
    <div>{{ miscPerks }}</div>
    <h3>genericWaifuPerks</h3>
    <div>{{ genericWaifuPerks }}</div>
    <h3>companions</h3>
    <div>{{ companions }}</div>
    <h3>startingOrigin</h3>
    <div>{{ startingOrigin }}</div>
    <h3>waifuPerks</h3>
    <div>{{ waifuPerks }}</div>
    <h3>baseBudget</h3>
    <div>{{ baseBudget }}</div>
    <h3>startingWorld</h3>
    <div>{{ startingWorld }}</div>
    <h3>budgetMods</h3>
    <div>{{ budgetMods }}</div>
    <h3>otherPerks</h3>
    <div>{{ otherPerks }}</div>
    <h3>fee</h3>
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

// import { getAllDiscord, copyWorldsTo } from '~/data/constants'

const {
  allEffects, intensities, luresBought, binding, flags, heritage,
  ridePerks, homePerks, talentPerks, defensePerks, miscPerks, genericWaifuPerks, companions, startingOrigin,
  waifuPerks, baseBudget, startingWorld, budgetMods, otherPerks, fee,
  baseBudgetAfter,
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
  totalActive,
  usedHeritageDiscount,
  talentsDiscount,
  defensesDiscount,
  defenseRetinueDiscount,
} = useStore()

</script>
