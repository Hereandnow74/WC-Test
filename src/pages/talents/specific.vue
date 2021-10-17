<template>
  <div class="flex flex-col gap-2 pb-8 md:p-2">
    <Desc :desc="genericDesc" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <h3 class="text-xl font-semibold text-center">
      Generic Waifu Perks
    </h3>
    <div class="md:column-count-2 lg:column-count-3">
      <PerkCard
        v-for="perk in genericPerks"
        :key="perk.title"
        :perk="perk"
        :bg="genericIsAvailable(perk) ? 'lime-200 dark:lime-900 hover:(lime-100 dark:lime-800)'
          : 'gray-200 dark:gray-600'"
        :is-available="genericIsAvailable(perk)"
        :is-active="findIndex(genericWaifuPerks, {title: perk.title}) !== -1"
        @pickPerk="pickGenericPerk(perk)"
      ></PerkCard>
    </div>
    <h3 class="text-xl font-semibold text-center">
      Specific Waifu Perks
    </h3>
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
import { genericPerks, genericDesc, Perk } from '~/data/talents'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'

import PerkCard from '~/components/PerkCard.vue'

const { waifuPerks, companions, genericWaifuPerks, allEffects } = useStore()

function isAvailable(perk: WaifuPerk): boolean {
  if (findIndex(companions.value, { name: typeof perk.waifu === 'string' ? perk.waifu : perk.waifu[0] }) !== -1)
    return true
  else return false
}

function genericIsAvailable(perk: Perk): boolean {
  return true
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

function pickGenericPerk(perk: Perk) {
  if (genericIsAvailable(perk)) {
    if (allEffects.value.includes(perk.title)) {
      const heritageToDelete = genericWaifuPerks.value.splice(findIndex(genericWaifuPerks.value, { title: perk.title }))
      heritageToDelete.forEach(x => allEffects.value.splice(allEffects.value.indexOf(x.title), 1))
    }
    else {
      allEffects.value.push(perk.title)
      genericWaifuPerks.value.push({ title: perk.title, waifu: 'any', cost: perk.cost })
    }
  }
}

onMounted(() => useTooltips())
</script>
