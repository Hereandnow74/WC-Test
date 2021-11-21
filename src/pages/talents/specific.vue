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
        :saved-perk="allGeneric[perk.title]"
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
      border="2 gray-800"
      :class="{'hover:border-amber-400': isAvailable(waifu)}"
      @click="pickWaifuPerk(waifu)"
    >
      <img
        v-if="waifu.image !==''"
        class="max-h-[300px] max-w-1/2 object-contain ml-auto pl-1 inline-block float-right"
        :data-src="waifu.image"
        :alt="waifu.title"
      />
      <img
        v-if="waifu.image_2"
        class="max-h-[300px] max-w-1/2 object-contain ml-auto pl-1 inline-block float-right"
        :src="waifu.image_2"
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
      <div>
        <span class="font-bold">Waifu: </span>
        <span v-if="isArray(waifu.waifu)" class="inline-flex gap-2 text-blue-600 dark:text-blue-200">
          <router-link v-for="wf in waifu.waifu" :key="wf" :to="`/companions/?name=${wf}`" class="hover:underline">
            {{ wf }}
          </router-link>
        </span>
        <router-link v-else :to="`/companions/?name=${waifu.waifu}`" class="hover:underline text-blue-600 dark:text-blue-200">
          {{ waifu.waifu }}
        </router-link>
        from {{ waifu.from }}
      </div>
      <div class="flex gap-4">
        <span v-if="waifu.cost"><span class="font-bold">Cost:</span> {{ waifu.cost===11111 ? 'Tier 11 ticket' : waifu.cost }} </span>
        <span v-if="waifu.discount"><span class="font-bold">Refund:</span> {{ waifu.discount }}</span>
        <span v-if="waifu.tier"><span class="font-bold">Become:</span> T{{ waifu.tier }}</span>
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
import { findIndex, intersection, isArray, intersectionWith } from 'lodash-es'
import { waifu_perks, WaifuPerk } from '~/data/waifu_perks'
import { genericPerks, genericDesc, PerkFull } from '~/data/talents'
import { lazyLoadImg, useTooltips } from '~/logic/misc'
import { Perk, useStore } from '~/store/store'

import PerkCard from '~/components/PerkCard.vue'
import { pickSimplePerk } from '~/logic'

const { waifuPerks, companions, genericWaifuPerks, allEffects, flags, startingOrigin } = useStore()

const gachaTable = [
  [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000],
  [1, 2, 7, 15, 34, 96, 210, 454, 1251, 2677],
]

const showModal = ref(false)
const waifuList = ref<HTMLElement|null>(null)
const modalImage = ref('')

onMounted(() => lazyLoadImg(waifuList.value))

const allGeneric = computed(() => {
  const res: any = {}
  genericWaifuPerks.value.forEach(x => res[x.title] = x)
  return res
})

function isAvailable(perk: WaifuPerk): boolean {
  if (isArray(perk.uid)) {
    if (intersectionWith(companions.value, perk.uid, (a, b) => a.uid === b).length)
      return true
  }
  else {
    if (findIndex(companions.value, { uid: perk.uid }) !== -1)
      return true
  }
  if (startingOrigin.value.character) {
    const name = startingOrigin.value.character.split(' ')[0]
    if (isArray(perk.waifu))
      return perk.waifu.join('').includes(name)
    else return perk.waifu.includes(name)
  }

  return false
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
  pickSimplePerk(perk, saveData, genericIsAvailable, genericWaifuPerks.value)
}

onMounted(() => useTooltips())
</script>
