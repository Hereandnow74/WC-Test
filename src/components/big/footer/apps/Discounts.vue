<template>
  <div class="p-2 flex flex-col gap-2 h-full">
    <p class="border border-gray-600 rounded p-1">
      Listed Discounts applied <b>automatically</b>, this app only show them for you to know which ones got applied.
    </p>
    <div class="flex flex-col gap-2">
      <div>
        {{ maxHeritageDiscount.archetype }} heritage max discount:
        <span class="text-amber-500 text-lg">{{ maxHeritageDiscount.value }}</span> used:
        <span class="text-green-500 text-lg">{{ usedHeritageDiscount }}</span>
      </div>
      <div>
        Talents freebies discount: <span class="text-green-500 text-lg">{{ talentsDiscount }}</span>
      </div>
      <div>
        Defenses freebies discount: <span class="text-green-500 text-lg">{{ defensesDiscount }}</span>
      </div>
      <div>
        Defenses discount from your retinue: <span class="text-green-500 text-lg">{{ defenseRetinueDiscount }}</span>
        <div v-if="defenseRetinueDiscountAuto">
          <div v-for="defense, key in defenseRetinueDiscountAuto" :key="key" class="mb-1">
            <div class="fond-semibold text-gray-400">
              {{ key }}
              <span>[<span class="text-green-400">-{{ defense.discount }}</span>]</span>
            </div>
            <div class="flex gap-x-2 whitespace-nowrap flex-wrap">
              <div v-for="char in defense.charNames" :key="char" class="odd:text-orange-300 even:text-purple-300">
                {{ char }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '~/store/store'

const {
  maxHeritageDiscount, usedHeritageDiscount, talentsDiscount, defensesDiscount,
  defenseRetinueDiscount, defenseRetinueDiscountAuto,
} = useStore()

</script>
