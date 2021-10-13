<template>
  <div class="flex flex-col gap-2 pb-8">
    <div
      v-for="waifu in waifu_perks"
      :key="waifu.title"
      class="self-center bg-amber-200 dark:bg-amber-800 p-2 max-w-screen-md"
      @click="pickWaifuPerk(waifu)"
    >
      <img
        v-if="waifu.image !==''"
        class="max-h-[300px] max-w-1/2 object-contain ml-auto inline-block float-right"
        :src="waifu.image"
        :alt="waifu.title"
      >
      <h3 class="text-lg font-bold">
        {{ waifu.title }}
      </h3>
      <div><span class="font-bold">Waifu:</span> {{ waifu.waifu }} from {{ waifu.from }}</div>
      <div class="flex gap-4">
        <span v-if="waifu.cost"><span class="font-bold">Cost:</span> {{ waifu.cost }} </span>
        <span v-if="waifu.discount"><span class="font-bold">Refund:</span> {{ waifu.discount }}</span>
      </div>
      <Desc :desc="waifu.desc" class="p-0" />
    </div>
  </div>
</template>

<script lang='ts' setup>
import { findIndex } from 'lodash-es'
import { waifu_perks, WaifuPerk } from '~/data/waifu_perks'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'

const { waifuPerks, companions } = useStore()

function isAvailable(perk: WaifuPerk): boolean {
  if (findIndex(companions.value, { name: typeof perk.waifu === 'string' ? perk.waifu : perk.waifu[0] }) !== -1)
    return true
  else return false
}

function pickWaifuPerk(perk: WaifuPerk) {
  if (isAvailable(perk)) {
    const ind = findIndex(waifuPerks.value, { title: perk.title })
    if (ind !== -1)
      waifuPerks.value.splice(ind, 1)
    else
      waifuPerks.value.push({ title: perk.title, waifu: perk.waifu, cost: perk.cost })
  }
}

onMounted(() => useTooltips())
</script>
