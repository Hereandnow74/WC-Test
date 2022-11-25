<template>
  <div class="p-1 flex flex-col gap-2 h-full scrollbar overflow-y-auto">
    <div class="flex justify-between">
      <h1 class="text-lg">
        Some settings for your gacha
      </h1>
      <Button size="Small" label="Close" bg-color="bg-red-600" @click="emit('close')" />
    </div>
    <Toggle v-model="gachaSettings.justRandom" label="Ignore chances (behave like Random Character app)" />
    <Toggle v-model="gachaSettings.useWhiltelist" label="Use Whitelist" />
    <div class="flex gap-2 flex-col md:flex-row min-h-0 ">
      <InputWithSearch
        v-model="world"
        :list="allWorldNames"
        placeholder="World Name"
        class="flex-grow"
      />
      <Button size="Small" label="Add to Whitelist" @click="gachaSettings.whitelist.push(world)" />
    </div>
    <div v-if="gachaSettings.whitelist.length" class="flex flex-col gap-1 bg-gray-700 rounded p-1 overflow-y-auto max-h-48 scrollbar">
      <div v-for="w, i in gachaSettings.whitelist" :key="w" class="flex gap-2 justify-between border-b-2 pb-1 border-gray-500">
        <div>{{ w }}</div>
        <Button size="Small" label="Del" bg-color="bg-red-600" @click="gachaSettings.whitelist.splice(i, 1)" />
      </div>
    </div>
    <div class="flex gap-2 flex-col md:flex-row min-h-0 ">
      <TagInput
        v-model="gachaSettings.tagList"
        class="flex-grow"
        placeholder="Tags - press Enter to add"
      />
    </div>
    <div class="dark whitespace-nowrap flex flex-col gap-1">
      <NumberInput v-model="gachaSettings.rollCost" :min="0" type="number" label="Price for 1 roll" />
      <!-- <NumberInput v-model="gachaSettings.tenRollCost" type="number" label="Price for 10 roll" /> -->
      <NumberInput v-model="gachaSettings.minTierForTen" :min="1" :max="11" type="number" label="Guarantee tier for '10 pull'" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useWorlds } from '~/data/constants'
import { usePlayStore } from '~/store/play'

const { allWorldNames } = useWorlds()
const world = ref('')
const tag = ref('')
const { gachaSettings } = usePlayStore()

const emit = defineEmits(['close'])
</script>
