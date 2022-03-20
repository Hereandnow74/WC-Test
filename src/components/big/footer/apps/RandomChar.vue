<template>
  <div class="p-2 flex flex-col items-center h-full">
    <CompanionCard v-if="char.n" :char="char" :lazy="false" class="flex-grow" />
    <div class="flex gap-2 self-center">
      <Button label="Random character" size="Small" bg-color="bg-orange-400" @click="getRandomChar" />
      <Checkbox v-model="withImg" label="Only with img" />
      <NumberInput v-model="tier" :min="0" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { randomChar } from '~/logic'
import NumberInput from '~/components/basic/NumberInput.vue'
import { CHAR_COSTS } from '~/data/constants'

const char = ref<any>({})
const tier = ref(0)
const withImg = ref(true)

function getRandomChar() {
  const val = CHAR_COSTS[tier.value] || 0
  randomChar(withImg.value, val, val).then(x => char.value = x)
}

getRandomChar()
</script>
