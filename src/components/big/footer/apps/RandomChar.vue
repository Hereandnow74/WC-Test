<template>
  <div class="p-2 flex flex-col items-center h-full">
    <CompanionCard v-if="char.n" :char="char" :lazy="false" class="flex-grow max-w-[400px]" />
    <div class="flex gap-2 self-center mt-2">
      <Button label="Roll" size="Small" bg-color="bg-orange-500" class="px-2" @click="getRandomCharFromServer" />
      <Checkbox v-model="onlyFemale" label="Only female" />
      <NumberInput v-model="minTier" label="Tier" :min="1" :max="13" />
      <NumberInput v-model="maxTier" :min="1" :max="13" />
      <NumberInput v-model="likes" class="ml-2" label="Likes" :min="0" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import NumberInput from '~/components/basic/NumberInput.vue'
import { getRandomCharacters } from '~/logic/server'

const char = ref<any>({})
const minTier = ref(0)
const maxTier = ref(13)
const onlyFemale = ref(true)
const likes = ref(10)

async function getRandomCharFromServer() {
  const request = {}
  if (minTier.value !== 0 || maxTier.value !== 13)
    request.tier = { min: minTier.value, max: maxTier.value }
  if (onlyFemale.value)
    request.tags = ['F']
  if (likes.value)
    request.likes = likes.value

  const serverChar = await getRandomCharacters(request)
  char.value = {
    u: serverChar.uid,
    i: serverChar.image,
    likes: serverChar.likes,
    n: serverChar.name,
    k: serverChar.nickname,
    s: serverChar.sfwImageSource,
    w: serverChar.world,
    d: serverChar.subworld,
    t: serverChar.tier,
    b: serverChar.tags,
  }
}

getRandomCharFromServer()
</script>
