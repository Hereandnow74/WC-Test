<template>
  <div class="p-1 flex flex-col gap-1 min-h-0">
    <div class="flex gap-2 justify-between text-sm">
      <Toggle v-model="isRetinueEdit" label="Edit Mode" />
      <div class="flex gap-2">
        <Toggle v-model="filters[0]" label="Bought" />
        <Toggle v-model="filters[1]" label="Captured" />
        <Toggle v-model="filters[2]" label="Sold" />
      </div>
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
        class="grid gap-2 min-h-0"
        :class="orientation ? 'grid-cols-2': 'grid-cols-1'"
      >
        <CompanionCardMini
          v-for="char in companionsDataFiltered"
          :key="char.uid"
          :char="char"
          :image="companionImages[char.uid]"
          :perks="companionsPerksList[char.uid] || {}"
          :edit-mode="isRetinueEdit"
          @sell="sellCompanion"
          @undo="undoBuying"
        />
      </div>
      <div v-if="!companionsData.length" class="text-center">
        No Companions
      </div>
      <div v-if="companionsDataFiltered.length === 0 && companionsData.length" class="text-center">
        No companions matching your <b>filter</b>
      </div>
      <div v-if="companionsDataFiltered.length" class="flex gap-2 justify-end mt-2">
        <Button size="Small" label="Undo All" bg-color="bg-blue-500" @click="undoAll" />
        <Button size="Small" label="Sell All" bg-color="bg-red-500" @click="sellAll" />
        <Button size="Small" label="Return All" bg-color="bg-amber-600" @click="returnAll" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { find, findIndex, isArray } from 'lodash-es'
import { CHAR_COSTS, getAllCharsObject } from '~/data/constants'
import { lazyLoadImg, orientation, isRetinueEdit, imageLink } from '~/logic'
import { useStore } from '~/store/store'
import { waifu_perks, DLCwaifu_perks } from '~/data/waifu_perks'

const { companions, underLoan, loan, trHistory, talentPerks, genericWaifuPerks, waifuPerks, localUserCharacters } = useStore()

const specificPerksWithDLC = waifu_perks.concat(DLCwaifu_perks)

const waifuList = ref(null)
const filters = useStorage('companionFilters', [true, true, true])

const companionsData = computed(() => [...companions.value])

const filteredMethods = computed(() => {
  const methods = ['unbound']
  if (filters.value[0]) methods.push('buy', 'yoink', 'used')
  if (filters.value[1]) methods.push('capture')
  return methods
})
const companionsDataFiltered = computed(() => companionsData.value.filter((nion) => {
  if (filteredMethods.value.includes(nion.method) && !nion.sold) return true
  if (filters.value[2] && nion.sold) return true
  return false
}))

const allCharsObject = ref({})
getAllCharsObject().then(all => allCharsObject.value = all)

const companionImages = computed(() => {
  const res = {} as Record<number, string>
  companions.value.forEach((char) => {
    const charInfo = allCharsObject.value[char.uid]
    if (charInfo !== undefined)
      res[char.uid] = imageLink(charInfo.i, charInfo.u)
  })
  localUserCharacters.value.forEach(char => res[char.uid] = char.image)
  return res
})

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
        if (isArray(sourceWaifuPerk.uid)) {
          if (sourceWaifuPerk.uid.includes(rchar.uid))
            specificList.push({ title: specific.title })
        }
        else {
          if (sourceWaifuPerk.uid === rchar.uid)
            specificList.push({ title: specific.title, tier: sourceWaifuPerk.tier })
        }
      }
    })

    if (talentsList.length || perksList.length || specificList.length)
      charTalents[rchar.uid] = { talents: talentsList, perks: perksList, specific: specificList }
  })

  return charTalents
})

watch([companionsDataFiltered, companionImages], () => {
  lazyLoadImg(waifuList.value)
}, { flush: 'post' })

function sellCompanion(uid: number) {
  const cmp = companions.value[findIndex(companions.value, { uid })]
  let price = 0
  if (underLoan.value) {
    price = Math.round(CHAR_COSTS[cmp.tier - 1] * 0.2)
    const half = Math.round(price / 2)
    if (half <= loan.value.owed) {
      loan.value.owed -= half
      price -= half
      trHistory.value.push(`Sold ${cmp.name} +${half}`)
    }
    else {
      price -= loan.value.owed
      trHistory.value.push(`Sold ${cmp.name} +${loan.value.owed}`)
      loan.value.owed = 0
    }
    cmp.soldPrice = price
  }

  cmp.sold = true
}

function undoBuying(uid: number) {
  companions.value.splice(findIndex(companions.value, { uid }), 1)
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
</script>
