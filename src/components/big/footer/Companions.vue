<template>
  <div class="p-1 flex flex-col gap-1 min-h-0">
    <div class="flex gap-2 justify-between text-sm bg-gray-700 px-2 rounded-xl p-0.5">
      <Toggle v-model="isRetinueEdit" label="Edit Mode" />
      <div class="flex gap-2">
        <Toggle v-model="filters[0]" label="Bought" />
        <Toggle v-model="filters[1]" label="Captured" />
        <Toggle v-model="filters[2]" label="Sold" />
      </div>
    </div>
    <div class="flex gap-2 select-none text-sm bg-gray-700 px-2 rounded-xl p-0.5 mb-1">
      <div class="flex gap-1">
        By name
        <div
          class="flex items-center bg-gray-700 px-1 rounded cursor-pointer"
          :class="sortAlpha !== 0 ? 'border border-green-500' : ''"
          title="Sort by Name"
          @click="toggleAlpha()"
        >
          <fa-solid:sort-alpha-down v-if="sortAlpha === 1" class="inline-block rounded" />
          <fa-solid:sort-alpha-up v-else class="inline-block rounded" />
        </div>
      </div>
      <div class="flex gap-1">
        By world
        <div
          class="flex items-center bg-gray-700 px-1 rounded cursor-pointer"
          :class="sortAlphaWorld !== 0 ? 'border border-green-500' : ''"
          title="Sort by World name"
          @click="toggleAlphaWorld()"
        >
          <fa-solid:sort-alpha-down v-if="sortAlpha === 1" class="inline-block rounded" />
          <fa-solid:sort-alpha-up v-else class="inline-block rounded" />
        </div>
      </div>
      <div class="flex gap-1">
        By tier
        <div
          class="flex items-center bg-gray-200 dark:bg-gray-700 px-1 rounded cursor-pointer"
          :class="sortRating !== 0 ? 'border border-green-500' : ''"
          title="Sort by Tier"
          @click="toggleRating()"
        >
          <fa-solid:sort-numeric-down v-if="sortRating === 1" class="inline-block rounded" />
          <fa-solid:sort-numeric-up v-else class="inline-block rounded" />
        </div>
      </div>
      <Variants v-model="roleFilter" :list="['All', 'Companion', 'Familiar', 'Devotee', 'Offspring', 'Dead', 'Traded Away']" theme="dark" />
    </div>
    <div
      class="overflow-y-auto min-h-0 scrollbar"
    >
      <YourCardMini
        :edit-mode="isRetinueEdit"
        class="mb-2"
      />
      <div
        ref="waifuList"
        v-auto-animate
        class="grid gap-2 min-h-0 waifulist"
        :class="orientation ? 'grid-cols-2': 'grid-cols-1'"
      >
        <component
          :is="char.spouse ? CoupleCardMini : CompanionCardMini"
          v-for="char, i in companionsDataChunks[currentPage]"
          :key="char.uid"
          :char="char"
          :perks="companionsPerksList[char.uid] || {}"
          :edit-mode="isRetinueEdit"
          :index="(currentPage) * 50 + i + 1"
          class="packItem"
          @sell="sellCompanion"
          @undo="undoBuying"
          @undoSell="undoSelling"
          @free="freeCompanion"
        />
      </div>
      <div v-if="!companionsData.length" class="text-center">
        No Companions
      </div>
      <div v-if="companionsDataFiltered.length === 0 && companionsData.length" class="text-center">
        No companions matching your <b>filter</b>
      </div>
      <div v-if="companionsDataChunks.length > 1" class="flex gap-2 justify-between py-2 px-1">
        <div class="flex gap-1">
          <Button v-show="currentPage > 1" label="First" bg-color="bg-teal-500" size="Small" @click="currentPage = 0" />
          <Button v-show="currentPage > 0" label="Previous" size="Small" @click="currentPage -= 1" />
        </div>
        <div>Pages {{ currentPage + 1 }} out of {{ companionsDataChunks.length }}</div>
        <div class="flex gap-1">
          <Button v-show="currentPage < companionsDataChunks.length - 1" label="Next" size="Small" @click="currentPage += 1" />
          <Button v-show="currentPage !== companionsDataChunks.length - 1" label="Last" bg-color="bg-teal-500" size="Small" @click="currentPage = companionsDataChunks.length - 1" />
        </div>
      </div>
      <div v-if="companionsDataFiltered.length" class="flex gap-2 justify-center mt-2 px-2">
        <Button size="Small" label="Undo All" bg-color="bg-blue-500" @click="undoAll" />
        <Button size="Small" label="Sell All" bg-color="bg-red-500" @click="sellAll" />
        <Button size="Small" label="Return All" bg-color="bg-amber-600" @click="returnAll" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { find, findIndex, isArray, chunk } from 'lodash-es'
// import { useAllChars } from '~/data/constants'
import { lazyLoadImg, orientation, isRetinueEdit, threeToggle } from '~/logic'
import { useStore } from '~/store/store'
import { waifu_perks, DLCwaifu_perks } from '~/data/waifu_perks'
import { confirmDialog } from '~/logic/dialog'
import CompanionCardMini from '~/components/cards/CompanionCardMini.vue'
import CoupleCardMini from '~/components/cards/CoupleCardMini.vue'

const { companions, talentPerks, genericWaifuPerks, waifuPerks, isCouple } = useStore()

const specificPerksWithDLC = waifu_perks.concat(DLCwaifu_perks)

const waifuList = ref(null)
const filters = useStorage('companionFilters', [true, true, true])
const roleFilter = ref('All')

const sortRating = ref(0)
const sortAlpha = ref(0)
const sortAlphaWorld = ref(0)

const currentPage = ref(0)

const companionsData = computed(() => [...companions.value])

const filteredMethods = computed(() => {
  const methods = ['unbound']
  if (filters.value[0]) methods.push('buy', 'yoink', 'used')
  if (filters.value[1]) methods.push('capture')
  return methods
})

const companionsDataFiltered = computed(() => companionsData.value.filter((nion) => {
  if (roleFilter.value !== 'All' && !nion.sold) return (nion.role === roleFilter.value || (!nion.role && roleFilter.value === 'Companion')) && filteredMethods.value.includes(nion.method)
  if (filteredMethods.value.includes(nion.method) && !nion.sold) return true
  if (filters.value[2] && nion.sold && roleFilter.value === 'All') return true
  return false
}))

const companionsDataSorted = computed(() => {
  return [...companionsDataFiltered.value].sort((a, b) => sortAlpha.value !== 0
    ? a.name.localeCompare(b.name) * sortAlpha.value
    : 0
|| sortRating.value !== 0
      ? (a.tier - b.tier) * sortRating.value
      : 0
|| sortAlphaWorld.value !== 0
        ? a.world.localeCompare(b.world) * sortAlphaWorld.value
        : 0)
})

const companionsDataChunks = computed(() => chunk(companionsDataSorted.value, 50))
watch(companionsDataChunks, () => { if (companionsDataChunks.value.length === 1) currentPage.value = 0 })

// const { allCharsObject } = useAllChars()

// const companionImages = computed(() => {
//   const res = {} as Record<number, string>
//   companions.value.forEach((char) => {
//     const charInfo = allCharsObject.value[char.uid]
//     if (charInfo !== undefined)
//       res[char.uid] = imageLink(charInfo.i, charInfo.u)
//   })
//   return res
// })

// Code by KatzSmile
const companionsPerksList = computed(() => {
  const charTalents = {} as Record<number, any>

  companions.value.forEach((rchar) => {
    const talentsList = [] as any
    const perksList = [] as any
    const specificList = [] as any

    talentPerks.value.forEach((talent) => {
      if (talent.complex && isArray(talent.complex) && talent.complex.length) {
        if (talent.complex[0].target) {
          const filteredTalents = talent.complex.filter(tarc => tarc.target === rchar.name)
          if (filteredTalents.length)
            talentsList.push({ title: talent.title, complex: filteredTalents })
        }
      }
    })

    genericWaifuPerks.value.forEach((perk) => {
      if (perk.complex && isArray(perk.complex) && perk.complex.length) {
        if (perk.complex[0].target) {
          const filteredPerks = perk.complex.filter(perkc => perkc.target === rchar.name)
          if (filteredPerks.length)
            perksList.push({ title: perk.title, complex: filteredPerks })
        }
      }
    })

    waifuPerks.value.forEach((specific) => {
      const sourceWaifuPerk = find(specificPerksWithDLC, specPerk => specPerk.title === specific.title)
      if (sourceWaifuPerk) {
        if (isArray(sourceWaifuPerk.waifuUID)) {
          if (sourceWaifuPerk.waifuUID.includes(rchar.uid))
            specificList.push({ title: specific.title, tier: sourceWaifuPerk.tier })
        }
      }
    })

    if (talentsList.length || perksList.length || specificList.length)
      charTalents[rchar.uid] = { talents: talentsList, perks: perksList, specific: specificList }
  })

  return charTalents
})

watch([companionsDataSorted, currentPage, waifuList], () => {
  lazyLoadImg(waifuList.value)
}, { flush: 'post' })

// onMounted(() => lazyLoadImg(waifuList.value))

function sellCompanion(uid: number) {
  const cmp = companions.value[findIndex(companions.value, { uid })]
  cmp.sold = true
}

async function freeCompanion(uid: number) {
  const res = await confirmDialog(`
  <div>When you release a retinue member you will lose gained credits for the capture, or not get your credits back if you bough them. You will not be able to capture them again, so think twice before doing it.</div>
  <div class="dark:text-amber-400 text-amber-600 text-xl">This is not an official catalog function. Use only if you aware of consequences.</div>
  `)
  if (!res) return
  const cmp = companions.value[findIndex(companions.value, { uid })]
  cmp.priceTier = 0
  cmp.method = 'unbound'
}

function undoBuying(uid: number) {
  companions.value.splice(findIndex(companions.value, { uid }), 1)
}

function undoSelling(uid: number) {
  const cmp = companions.value[findIndex(companions.value, { uid })]
  cmp.sold = false
}

function sellAll() {
  companions.value.filter(cmp => cmp.method === 'capture').forEach(cmp => sellCompanion(cmp.uid))
}

function returnAll() {
  companions.value.filter(cmp => cmp.method === 'buy').forEach(cmp => sellCompanion(cmp.uid))
}

function undoAll() {
  companions.value = []
}

function toggleRating() {
  sortRating.value = threeToggle(sortRating.value)
}

function toggleAlpha() {
  sortAlpha.value = threeToggle(sortAlpha.value)
}

function toggleAlphaWorld() {
  sortAlphaWorld.value = threeToggle(sortAlphaWorld.value)
}

</script>
