<template>
  <div class="p-2 flex flex-col items-center h-full">
    <CompanionCard v-if="char.n" :char="char" :lazy="false" class="flex-grow max-w-[400px]" />
    <div class="flex gap-2 self-center mt-2">
      <Button label="Roll" size="Small" bg-color="bg-orange-500" class="px-2" @click="getRandomChar" />
      <Checkbox v-model="onlyFemale" label="Only female" />
      <NumberInput v-model="minTier" label="From" :min="0" :max="13" />
      <NumberInput v-model="maxTier" label="to" :min="0" :max="13" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { randomChar } from '~/logic'
import NumberInput from '~/components/basic/NumberInput.vue'
import { CHAR_COSTS_FULL } from '~/data/constants'

const char = ref<any>({})
const minTier = ref(0)
const maxTier = ref(13)
const onlyFemale = ref(true)

function getRandomChar() {
  const minCost = CHAR_COSTS_FULL[minTier.value] || 0
  const maxCost = CHAR_COSTS_FULL[maxTier.value] || 10000
  randomChar(maxCost, minCost, onlyFemale.value ? 'F' : null).then(x => char.value = x)
}

getRandomChar()
</script>
