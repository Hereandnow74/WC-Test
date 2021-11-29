<template>
  <div
    class="p-1 grid gap-2 overflow-y-auto min-h-0 scrollbar"
    :class="orientation ? 'grid-cols-2': 'grid-cols-1'"
  >
    <div
      v-for="char in companionsData"
      :key="char.uid"
      class="flex justify-between border border-gray-400 rounded p-1"
      :class="char.sold ? 'text-gray-600': ''"
    >
      <div class="flex gap-2 w-full">
        <img
          v-if="char.image"
          :src="char.image"
          :alt="char.name"
          class="rounded object-cover max-h-[140px] max-w-[90px] object-top"
        >
        <div class="flex flex-col w-full">
          <div class="flex">
            <router-link :to="`/companions/?name=${char.name}`" class="hover:underline">
              {{ char.name }}<span class="text-gray-500 text-sm"> ({{ methods[char.method] }})</span>
            </router-link>
            <span v-if="char.sold" class="text-red-500 ml-1">SOLD</span>
            <span class="text-gray-500 ml-auto whitespace-nowrap"> Tier: <span class="text-green-500">{{ char.tier }}</span></span>
            <span
              v-if="char.tier !== char.priceTier"
              class="text-gray-500 ml-2"
            > Price Tier: <span class="text-green-500">{{ char.priceTier }}</span></span>
          </div>
          <span class="text-gray-500">From: <span class="text-gray-400">{{ char.world }}</span></span>
          <NumberInput v-if="!char.sold" v-model="char.tier" :max="11" label="Change tier" class="whitespace-nowrap" />
          <div v-if="!char.sold" class="flex gap-2 mt-auto justify-end">
            <Button
              v-if="['capture', 'yoink'].includes(char.method)"
              :label="`sell ${char.tier === 11 ? '1 ticket' : Math.floor(CHAR_COSTS[char.tier - 1] * 0.2) + 'c'}`"
              size="Small"
              bg-color="bg-red-500"
              @click="sellCompanion(char.uid)"
            />
            <Button
              v-if="['buy', 'used'].includes(char.method)"
              :label="`return ${char.tier === 11 ? '1 ticket' : Math.round(CHAR_COSTS[char.priceTier - 1] * 0.8) + 'c'}`"
              size="Small"
              bg-color="bg-yellow-600"
              @click="sellCompanion(char.uid)"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="!companionsData.length">
      No Companions
    </div>
  </div>
</template>

<script lang="ts" setup>
import { findIndex } from 'lodash-es'
import { CHAR_COSTS, getChars, getUserChars } from '~/data/constatnts'
import { orientation } from '~/logic'
import { useStore } from '~/store/store'

const { companions } = useStore()

const allChars = ref([])
const companionsData = computed(() => [...companions.value])
const companionsObject = companions.value.reduce((a, x, i) => (a[x.uid] = i, a), {})

getChars().then(chars => allChars.value.push(...chars))
getUserChars().then(chars => allChars.value.push(...chars))

watchEffect(() => {
  allChars.value.forEach((char) => {
    if (companionsObject[char.u] !== undefined && companionsData.value[companionsObject[char.u]])
      companionsData.value[companionsObject[char.u]].image = imageLink(char.i, char.u)
  })
})

function imageLink(link: string, uid: number) {
  if (link) {
    if (link.startsWith('http')) { return link }
    else {
      if (uid > 100000)
        return `https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/${link}`
      return `https://cdn.statically.io/gh/klassekatze/waifucatimg/master/imagecache_thumb/${link}`
    }
  }
  return link
}

const methods = {
  buy: 'Bought',
  capture: 'Captured',
  used: 'Used',
  yoink: 'Yoinked',
}

function sellCompanion(uid: number) {
  companions.value[findIndex(companions.value, { uid })].sold = true
}

</script>
