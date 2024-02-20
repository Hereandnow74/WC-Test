<template>
  <div @click.stop>
    <div v-if="list.length" class="">
      [
      <template v-for="el, i in list" :key="el.title || el">
        <router-link
          :to="{path: path || '/'+LINKS[el.title || el], hash:'#'+(el.title || el), query: {q: (QUERIES[el.title || el])}}"
          :class="color"
        >
          <span v-if="i != 0" class="text-orange-500">, </span>
          <span class="hover:underline">{{ (el.title2 || el.title || el).replace(/ Talent| Defense/, '') }}</span>
          <span v-if="ALL_DLC_PERK_TITLES[el.title2 || el.title || el]" class="text-teal-200">ᵈˡᶜ</span>
          <span v-if="el?.anything?.length" class="text-yellow-500">({{ el.anything }})</span>
          <span v-if="el.count && el.count > 1" class="text-gray-300">(<span :style="[numberColor ? {color: numberColor} : {color:'rgba(34, 211, 238)'}]">x{{ el.count }}</span>)</span>
          <span v-if="el?.target?.length || el.waifu" class="text-teal-500">({{ el.target || el.waifu }})</span>
          <span v-if="el.complex && isArray(el.complex) && el.complex.length">
            <template v-if="(el.complex[0].flavor !== undefined && el.complex[0].target !== undefined)">
              <span
                v-for="tf in Object.entries(groupBy(el.complex, c => c.target))"

                :key="tf[0]"
                class="text-violet-400"
              >
                ({{ tf[0] }} <span>{{ tf[0] === 'You' ? 'have' : 'has' }}</span>
                <List :list-key="'flavor'" :list="tf[1]" color="text-green-500" start="" end="" />)
              </span>
            </template>
            <template v-else>
              <List :list-key="'target'" :list="el.complex" color="text-green-500" start="(" end=")" />
              <List :list-key="'flavor'" :list="el.complex" color="text-violet-400" start="{" end="}" />
            </template>
          </span>
          <span v-if="el?.category && displayTitle(el)" class="text-yellow-500">({{ displayTitle(el) }})</span>
        </router-link>
        <span v-if="priceMode && costOrIntensity(el)">[<span :style="[numberColor ? {color: numberColor} : '']" class="text-gray-300">{{ costOrIntensity(el) > 0 ? '+' : '' }}{{ costOrIntensity(el) }}</span>]</span>
        <fluent:delete-20-filled v-if="editMode" class="text-red-400 hover:text-red-500 cursor-pointer inline-block ml-1" @click.stop="deletePerk(el)" />
      </template>
      ]
    </div>
    <div v-if="emptyMessage.length && !list.length">
      {{ emptyMessage }}
    </div>
  </div>
</template>

<script lang='ts' setup>
import { isArray, groupBy } from 'lodash-es'
import type { PropType } from 'vue'
import { ALL_DLC_PERK_TITLES, LINKS, QUERIES } from '~/data/constants'
import { useStore } from '~/store/store'
import { removeAnyPerk } from '~/logic'

const { baseBudget, legacyMode } = useStore()

const props = defineProps({
  list: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  emptyMessage: {
    type: String,
    default: 'Empty',
  },
  color: {
    type: String,
    default: 'text-blue-600 dark:text-blue-300',
  },
  numberColor: {
    type: String,
    default: '',
  },
  path: {
    type: String,
    default: '',
  },
  editMode: {
    type: Boolean,
    default: false,
  },
  priceMode: {
    type: Boolean,
    default: false,
  },
})

const typeTitles = {
  legacy: 'Legacy',
  team: 'Team',
  payment: 'Payment',
  binding: 'Bindings',
  heritage: 'Heritages',
  home: 'Personal World',
  template: 'Template',
  defenses: 'Defenses',
  leveling: 'Leveling',
  worlds: 'Worlds',
  warranty: 'Warranty',
  death: 'Death',
  random: 'Random',
  other: 'Misc',
  dlc: 'DLC',
}

function displayTitle(rule) {
  return typeTitles[rule.type] || typeTitles[rule.type.slice(0, -1)] || typeTitles[rule.type.slice(0, 3)]
}

const costOrIntensity = (el: any) => {
  if (el.cost || el.cost === 0) {
    if (el.cost === 0 && !el.costT)
      return 'free'
    else
      return el.costT ? `${el.costT} IMG` : el.cost * (-1)
  }
  if (el.intensity) {
    if (el.intensity <= 10 && legacyMode.value)
      return el.intensity * baseBudget.value
    else
      return el.intensity
  }
  return false
}

function deletePerk(el: any) {
  removeAnyPerk(el.uid, el.title, 999)
}
</script>
