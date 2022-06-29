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
      Plus TX tickets
      <NumberInput v-model="budgetMods.plus11" theme="dark" :min="0" class="w-24" />
    </div>
    <div class="flex justify-between">
      Minus TX tickets
      <NumberInput v-model="budgetMods.minus11" theme="dark" :min="0" class="w-24" />
    </div>
    <div class="flex justify-between">
      Sell TX ticket for 2000 credits
      <NumberInput v-model="budgetMods.sell11" theme="dark" :min="0" class="w-24" />
    </div>
    <div class="flex justify-between">
      <span>Fee <span class="text-sm text-gray-400">(forever lost credits from selling perks)</span></span>
      <Input v-model.number="fee" class="w-24" />
    </div>
    <div class="flex flex-col gap-2 text-gray-800 border rounded p-2">
      <h3 class="text-gray-200 flex items-center gap-2 cursor-pointer" @click="specificMods.push({desc: '', mod: 0})">
        Specific credit modifiers <akar-icons:plus class="text-green-500 hover:text-green-300" />
      </h3>
      <div v-for="mod, i in specificMods" :key="i" class="flex gap-2">
        <Input v-model="mod.desc" :placeholder="`Specific modifier #${i+1}`" class="flex-grow" />
        <Input v-model.number="mod.mod" class="w-16" />
        <div class="cursor-pointer text-gray-500 hover:text-red-500 flex gap-2 items-center" title="Share" @click="specificMods.splice(i, 1)">
          <fluent:delete-20-filled />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '~/store/store'

const { budgetMods, specificMods, fee } = useStore()

</script>
