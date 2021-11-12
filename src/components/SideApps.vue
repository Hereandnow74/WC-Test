<template>
  <div class="fixed right-0 top-1/2">
    <div
      v-if="flags.danger11Start"
      class="rounded-l-lg bg-gray-200 dark:bg-gray-800 flex items-center"
      border="l-2 t-2 b-2 gray-400 dark:gray-600 hover:green-500"
    >
      <div
        v-if="showDanger11"
        class="min-w-[320px] sm:w-max h-max bg-warm-gray-800 text-gray-100 cursor-pointer rounded-l p-1"
        @click="showDanger11 = !showDanger11"
      >
        <div>
          T11 Waifu or Husbando -
          <Valid :condition="tier11Companion" />
        </div>
        <div>
          Any origin no more than T6 -
          <Valid :condition="originT6" />
        </div>
        <div>A single Binding-type control (the basic binding only) - <Valid :condition="singleBinding" /></div>
        <div>As many official Lures as desired - the basic Lures only - <Valid :condition="simpleLures" /></div>
        <div>All official Basic Talents and both purchases of all official Defenses - <Valid :condition="basicTalents" /></div>
        <div>A 400-credit budget for your Heritage. [{{ heritageCost }}] - <Valid :condition="heritageLimit" /></div>
        <div>A 545-credit budget for Catch-a-Ride. [{{ ridePerksCost }}] - <Valid :condition="rideLimit" /></div>
        <div>A 500-credit budget for Demiplanes & Dungeons. [{{ homePerksCost }}] - <Valid :condition="homeLimit" /></div>
        <div>
          A single 600-credit budget for all other official perks found in this catalog. - [{{ miscPerksCost + waifuPerksCost + genericWaifuPerksCost }}]
          <Valid :condition="otherLimit" />
        </div>
        <div>{{ startingOrigin }}</div>
      </div>
      <emojione-monotone:skull
        v-else
        class="h-8 w-8 cursor-pointer"
        :class="allConditions ? 'text-green-500' : 'text-red-500'"
        @click="showDanger11 = !showDanger11"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '~/store/store'

const {
  flags, heritageCost, ridePerksCost, homePerksCost, miscPerksCost, waifuPerksCost,
  genericWaifuPerksCost, companions, startingOrigin, binding, luresBought, talentPerks,
} = useStore()

const tier11Companion = computed(() => companions.value.length === 1 && companions.value[0].tier === 11)
const originT6 = computed(() => startingOrigin.value.title.length > 0 && (!startingOrigin.value.tier || startingOrigin.value.tier < 7))
const singleBinding = computed(() => binding.value.length === 1)

const simpleLures = computed(() => luresBought.value.filter(x => x.title.includes(':')).length === 0)
const basicTalents = computed(() => talentPerks.value.filter(x => x.title.includes('Advanced') || x.complex).length === 0)

const heritageLimit = computed(() => heritageCost.value <= 400)
const rideLimit = computed(() => ridePerksCost.value <= 545)
const homeLimit = computed(() => homePerksCost.value <= 500)
const otherLimit = computed(() => miscPerksCost.value + waifuPerksCost.value + genericWaifuPerksCost.value <= 600)

const allConditions = computed(() => tier11Companion.value && originT6.value && simpleLures.value
 && basicTalents.value && heritageLimit.value && rideLimit.value && homeLimit.value && otherLimit.value)

const showDanger11 = ref(false)
</script>
