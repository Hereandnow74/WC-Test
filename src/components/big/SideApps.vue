<template>
  <div class="fixed right-0 top-1/2">
    <div
      v-if="flags.danger11Start"
    >
      <div
        v-if="showDanger11"
        class="-mt-1/2 sm:mt-0 min-w-[320px] h-max bg-warm-gray-800 text-gray-100 cursor-pointer rounded-l p-1 border-l-2 border-t-2 border-b-2 border-gray-400"
        @click="showDanger11 = !showDanger11"
      >
        <Note type="warning">
          DRX helper is in a WIP stage and can show wrong values.
        </Note>
        <div>
          IMG Companion -
          <Valid :condition="tier11Companion" />
        </div>
        <div>
          Any origin no more than T6 -
          <Valid :condition="originT6" />
        </div>
        <div>A single Binding-type control (the basic binding only) - <Valid :condition="singleBinding" /></div>
        <div>As many official Lures as desired - the basic Lures only - <Valid :condition="simpleLures" /></div>
        <div>All official Basic Talents and both purchases of all official Defenses - <Valid :condition="basicTalents" /></div>
        <div>A 400-credit budget for your Heritage. [<span class="text-red-500">{{ heritageCost }}</span>] - <Valid :condition="heritageLimit" /></div>
        <div>A 545-credit budget for Catch-a-Ride. [<span class="text-red-500">{{ ridePerksCost }}</span>] - <Valid :condition="rideLimit" /></div>
        <div>A 500-credit budget for Demiplanes & Dungeons. [<span class="text-red-500">{{ homePerksCost }}</span>] - <Valid :condition="homeLimit" /></div>
        <div>
          A single 600-credit budget for all other official perks found in this catalog. - [<span class="text-red-500">{{ otherCost }}</span>]
          <Valid :condition="otherLimit" />
        </div>
        <div>Leftover credits (will became available after 168 hours): <span class="text-amber-500">{{ leftovers }}</span></div>
      </div>
      <div
        v-else
        class="rounded-l-lg bg-gray-200 dark:bg-gray-800 flex items-center"
        border="l-2 t-2 b-2 gray-400 dark:gray-600 hover:green-500"
      >
        <emojione-monotone:skull
          class="h-8 w-8 cursor-pointer"
          :class="allConditions ? 'text-green-500' : 'text-red-500'"
          @click="showDanger11 = !showDanger11"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '~/store/store'

const {
  flags, heritageCost, ridePerksCost, homePerksCost, miscPerksCost, waifuPerksCost,
  genericWaifuPerksCost, companions, startingOrigin, binding, luresBought, talentPerks, bindingCost, otherCost,
} = useStore()

const tier11Companion = computed(() => companions.value.length === 1 && companions.value[0].tier >= 11 && companions.value[0].tier < 13)
const originT6 = computed(() => startingOrigin.value.title.length > 0 && (!startingOrigin.value.tier || startingOrigin.value.tier < 7))
const singleBinding = computed(() => binding.value.length >= 1)

const simpleLures = computed(() => luresBought.value.filter(x => x.title.includes(':')).length === 0)
const basicTalents = computed(() => talentPerks.value.filter(x => x.title.includes('Advanced') || x.complex).length === 0)

const heritageLimit = computed(() => heritageCost.value <= 400)
const rideLimit = computed(() => ridePerksCost.value <= 545)
const homeLimit = computed(() => homePerksCost.value <= 500)
const credits600 = computed(() => miscPerksCost.value + waifuPerksCost.value + genericWaifuPerksCost.value + bindingCost.value - (binding.value?.[0]?.cost || 0) + otherCost.value)
const otherLimit = computed(() => credits600.value <= 600)

const allConditions = computed(() => tier11Companion.value && originT6.value && simpleLures.value
 && basicTalents.value && heritageLimit.value && rideLimit.value && homeLimit.value && otherLimit.value)

const leftovers = computed(() => 400 + 545 + 500 + 600 - heritageCost.value - ridePerksCost.value - homePerksCost.value - credits600.value)

const showDanger11 = ref(false)
</script>
