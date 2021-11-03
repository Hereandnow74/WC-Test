<template>
  <div ref="waifuList" class="flex flex-col gap-2 pb-8 md:p-2">
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
        @pickPerk="pickGenericPerk"
      ></PerkCard>
    </div>
    <h3 class="text-xl font-semibold text-center">
      Specific Waifu Perks
    </h3>
    <div
      v-for="waifu in waifu_perks"
      :id="waifu.title"
      :key="waifu.title"
      class="relative self-center p-2 max-w-screen-md cursor-pointer"
      bg="amber-200 dark:amber-800"
      border="2 hover:amber-400 gray-800"
      @click="pickWaifuPerk(waifu)"
    >
      <img
        v-if="waifu.image !==''"
        class="max-h-[300px] max-w-1/2 object-contain ml-auto pl-1 inline-block float-right"
        :data-src="waifu.image"
        :alt="waifu.title"
      />
      <icon-park-outline:full-screen-one
        v-if="waifu.image !==''"
        class="absolute z-10 top-3 right-3 text-gray-200 hover:text-blue-400 cursor-pointer mix-blend-difference"
        @click.stop="() => (showModal = true, modalImage=waifu.image)"
      />
      <table v-if="waifu.title === 'Lord Camelot'" class="float-right m-2">
        <thead>
          <th class="pr-4 border-2 border-gray-700">
            Credits Paid
          </th>
          <th class="pr-4 border-2 border-gray-700">
            Saint Quartz
          </th>
        </thead>
        <tr v-for="n in 10" :key="n">
          <td class="border-2 border-gray-700">
            {{ gachaTable[0][n - 1] }}
          </td>
          <td class="border-2 border-gray-700">
            {{ gachaTable[1][n - 1] }}
          </td>
        </tr>
      </table>
      <h3 class="text-lg font-bold relative">
        {{ waifu.title }}
        <fa-solid:check
          v-if="findIndex(waifuPerks, { title: waifu.title }) !== -1"
          class="inline text-green-500"
        />
      </h3>
      <div><span class="font-bold">Waifu:</span> {{ waifu.waifu }} from {{ waifu.from }}</div>
      <div class="flex gap-4">
        <span v-if="waifu.cost"><span class="font-bold">Cost:</span> {{ waifu.cost===11111 ? 'Tier 11 ticket' : waifu.cost }} </span>
        <span v-if="waifu.discount"><span class="font-bold">Refund:</span> {{ waifu.discount }}</span>
      </div>
      <Desc :desc="waifu.desc" class="p-0" />
    </div>
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-10 flex place-content-center" @click="showModal = false">
      <div class="overflow-auto max-h-screen max-w-screen flex place-content-center">
        <img class="object-none" :src="modalImage" alt="full image">
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { findIndex, intersection } from 'lodash-es'
import { waifu_perks, WaifuPerk } from '~/data/waifu_perks'
import { genericPerks, genericDesc, PerkFull } from '~/data/talents'
import { lazyLoadImg, useTooltips } from '~/logic/misc'
import { Perk, useStore } from '~/store/store'

import PerkCard from '~/components/PerkCard.vue'

const { waifuPerks, companions, genericWaifuPerks, allEffects, flags } = useStore()

const gachaTable = [
  [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000],
  [1, 2, 7, 15, 34, 96, 210, 454, 1251, 2677],
]

const showModal = ref(false)
const waifuList = ref<HTMLElement|null>(null)
const modalImage = ref('')

onMounted(() => lazyLoadImg(waifuList.value))

function isAvailable(perk: WaifuPerk): boolean {
  if (findIndex(companions.value, { name: typeof perk.waifu === 'string' ? perk.waifu : perk.waifu[0] }) !== -1)
    return true
  else return true
}

function genericIsAvailable(perk: PerkFull): boolean {
  if (!perk.whitelist) { return true }
  else {
    if (intersection(perk.whitelist, allEffects.value).length >= (perk.needed || perk.whitelist.length)) {
      if (perk.title === 'Canvas')
        return !flags.value.noBindings
      return true
    }
  }

  return false
}

function pickWaifuPerk(perk: WaifuPerk) {
  if (isAvailable(perk)) {
    const ind = findIndex(waifuPerks.value, { title: perk.title })
    if (ind !== -1) { waifuPerks.value.splice(ind, 1) }
    else {
      waifuPerks.value.push(
        { title: perk.title, waifu: perk.waifu[0] || perk.waifu, cost: perk.cost || 0, refund: perk.discount || 0 })
    }
  }
}

function pickGenericPerk(perk: PerkFull, saveData: Perk) {
  if (genericIsAvailable(perk)) {
    const ind = findIndex(genericWaifuPerks.value, { title: perk.title })
    if (ind !== -1) {
      if (saveData.count !== 0) {
        genericWaifuPerks.value[ind].count = saveData.count
        genericWaifuPerks.value[ind].cost = saveData.cost
      }
      else {
        const toDel = genericWaifuPerks.value.splice(ind)
        toDel.forEach(x => allEffects.value.splice(allEffects.value.indexOf(x.title), 1))
      }
    }
    else {
      allEffects.value.push(perk.title)
      genericWaifuPerks.value.push(saveData)
    }
  }
}

onMounted(() => useTooltips())
</script>
