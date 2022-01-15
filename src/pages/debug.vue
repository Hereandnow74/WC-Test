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
  </div>
</template>

<script lang='ts' setup>
import { useStore } from '~/store/store'

const {
  allEffects, intensities, luresBought, binding, flags, allForSave, heritage,
  ridePerks, homePerks, talentPerks, defensePerks, miscPerks, genericWaifuPerks, companions, startingOrigin,
  waifuPerks, baseBudget, startingWorld, budgetMods, otherPerks, fee,
} = useStore()

</script>
