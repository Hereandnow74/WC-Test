<template>
  <div class="text-gray-300 mx-2 mt-2 flex flex-col gap-2">
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
</template>

<script lang="ts" setup>
import { useStore } from '~/store/store'

const { budgetMods } = useStore()

</script>
