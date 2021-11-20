<template>
  <div class="p-2 flex flex-col items-center h-full">
    <CompanionCard v-if="char.n" :char="char" :lazy="false" class="flex-grow" />
    <div class="flex gap-2 self-center">
      <Button label="Back" icon="akar-icons:arrow-back-thick" size="Small" @click="toggleAppMode" />
      <Button label="Random character" size="Small" bg-color="bg-orange-400" @click="getRandomChar" />
      <Checkbox v-model="withImg" label="Only with img" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { randomChar, toggleAppMode } from '~/logic'

const char = ref<any>({})
const withImg = ref(true)

function getRandomChar() {
  randomChar(withImg.value).then(x => char.value = x)
}

getRandomChar()
</script>
