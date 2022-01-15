<template>
  <div class="p-2 flex flex-col gap-2 h-full">
    <p class="border border-gray-600 rounded p-1">
      Listed Discounts applied <b>automatically</b> this app only show them for you to know which ones got applied.
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
      </div>
    </div>
    <Button label="Back" icon="akar-icons:arrow-back-thick" size="Small" class="self-center" @click="toggleAppMode" />
  </div>
</template>

<script lang="ts" setup>
import { toggleAppMode } from '~/logic'
import { useStore } from '~/store/store'

const {
  maxHeritageDiscount, usedHeritageDiscount, talentsDiscount, defensesDiscount,
  defenseRetinueDiscount,
} = useStore()

</script>
