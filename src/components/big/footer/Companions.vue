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
          :edit-mode="isRetinueEdit"
          @sell="sellCompanion"
        />
      </div>
      <div v-if="!companionsData.length" class="text-center">
        No Companions
      </div>
      <div v-if="companionsDataFiltered.length === 0 && companionsData.length" class="text-center">
        No companions matching your <b>filter</b>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { findIndex } from 'lodash-es'
import { DBCharacter } from 'global'
import { CHAR_COSTS, getAllChars } from '~/data/constants'
import { lazyLoadImg, orientation, isRetinueEdit, imageLink } from '~/logic'
import { useStore } from '~/store/store'
import CompanionCardMini from '~/components/CompanionCardMini.vue'

const { companions, underLoan, loan, trHistory } = useStore()

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

const companionsObject = companions.value.reduce((a, x, i) => { a[x.uid] = i; return a }, {} as Record<number, number>)

// const companionImages = ref({} as Record<number, string>)
const allChars = ref<DBCharacter[]>([])

getAllChars().then(chars => allChars.value = chars)

const companionImages = computed(() => {
  const res = {} as Record<number, string>
  allChars.value.forEach((char) => {
    if (companionsObject[char.u] !== undefined)
      res[char.u] = imageLink(char.i, char.u)
  })
  return res
})

watch([companionsDataFiltered, companionImages], () => {
  nextTick(() => lazyLoadImg(waifuList.value))
})

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

</script>
