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
      Plus IMG tickets
      <NumberInput v-model="budgetMods.plus11" theme="dark" :min="0" class="w-24" />
    </div>
    <div class="flex justify-between">
      Minus IMG tickets
      <NumberInput v-model="budgetMods.minus11" theme="dark" :min="0" class="w-24" />
    </div>
    <div class="flex justify-between">
      Sell IMG ticket for 1000 credits
      <NumberInput v-model="budgetMods.sell11" theme="dark" :min="0" class="w-24" />
    </div>
    <div class="flex justify-between">
      <span>Fee <span class="text-sm text-gray-400">(forever lost credits from selling perks and loan repayment)</span></span>
      <Input v-model.number="fee" class="w-24" />
    </div>
    <!-- <Button label="Buy any perk" bg-color="bg-true-gray-800" @click="showBuyAnyPerk = true" /> -->
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
    <Button label="Delete all local characters" bg-color="bg-true-gray-800" class="px-4 mx-auto" @click="deleteLocal" />
    <BuyAnyPerk v-if="showBuyAnyPerk" @click="showBuyAnyPerk = false" />
  </div>
</template>

<script lang="ts" setup>
import { confirmDialog } from '~/logic/dialog'
import { useStore } from '~/store/store'

const showBuyAnyPerk = ref(false)

const { budgetMods, specificMods, fee, localUserCharacters } = useStore()

async function deleteLocal() {
  const confirm = await confirmDialog('Are you sure you want to delete all local characters?')
  if (confirm)
    localUserCharacters.value = []
}

watch([() => budgetMods.value.plus, () => budgetMods.value.minus], () => {
  if (budgetMods.value.plus === '')
    budgetMods.value.plus = 0
  if (budgetMods.value.minus === '')
    budgetMods.value.minus = 0
})

</script>
