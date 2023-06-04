<template>
  <Modal label="World Statistic">
    <div class="relative p-2 flex flex-col gap-2 min-h-0 overflow-y-scroll scrollbar">
      <Table :rows="worldData" :headers="['Name', 'Targets', 'Capture Credits', 'Sell Credits', 'Capture+Sell']" />
      <Table :rows="[worldCharsCountByTier]" :headers="['-', 'T1', 'T2', 'T3', 'T4', 'T5','T6', 'T7', 'T8', 'T9', 'T10','TX', 'TY', 'TZ']" />
    </div>
  </Modal>
</template>

<script lang='ts' setup>
import type { PropType } from '@vue/runtime-core'
import { Character } from 'global'
import { CHAR_COSTS, useAllChars } from '~/data/constants'
import { World } from '~/store/chargen'
import { useStore } from '~/store/store'

const props = defineProps({
  world: {
    type: Object as PropType<World>,
    default: () => ({}),
  },
})
const { allChars } = useAllChars()
const { difficultyAdjustedCapture, difficultyAdjustedSell } = useStore()

// const allWorldTargets = computed(() => assign(countBy(allChars.value.map(x => x.w)), countBy(allChars.value.map(x => x.d))))

const worldChars = computed(() => {
  return allChars.value.filter((char) => {
    const allWorldNames = [props.world.worldName, ...props.world.condition?.map(x => x.name) || []]
    return allWorldNames.includes(char.w) || allWorldNames.includes(char.d || '')
  })
})

const worldCharsByCondition = computed(() => {
  return worldChars.value.reduce((a, x) => {
    const conditionsNames = props.world.condition?.map(x => x.name) || []
    const name: string = conditionsNames.includes(x?.d || '') ? x.d : x.w
    if (name) {
      if (a[name])
        a[name].push(x)
      else
        a[name] = [x]
    }
    return a
  }, {} as Record<string, Character[]>)
})

const worldCharsCountByTier = computed(() => {
  const res = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  worldChars.value.forEach(char => res[char.t] += 1)
  return res
})

const totalCapture = computed(() => {
  return worldCharsCountByTier.value.reduce((a, n, i) => a += difficultyAdjustedCapture.value[i] * n, 0)
})

const totalSell = computed(() => {
  return worldCharsCountByTier.value.reduce((a, n, i) => a += difficultyAdjustedSell.value[i] * n, 0)
})

const totalCharCountByTierUnderCondition = computed(() => {
  return Object.keys(worldCharsByCondition.value).reduce((a, x) => {
    const res = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    worldCharsByCondition.value[x].forEach(char => res[char.t] += 1)
    a[x] = res
    return a
  }, {})
})

const totalCaptureByCondition = computed(() => {
  return Object.keys(totalCharCountByTierUnderCondition.value).reduce((a, x) => (a[x] = totalCharCountByTierUnderCondition.value[x].reduce((g, n, i) => g += difficultyAdjustedCapture.value[i] * n, 0), a), {})
})

const totalSellByCondition = computed(() => {
  return Object.keys(totalCharCountByTierUnderCondition.value).reduce((a, x) => (a[x] = totalCharCountByTierUnderCondition.value[x].reduce((g, n, i) => g += difficultyAdjustedSell.value[i] * n, 0), a), {})
})

const worldData = computed(() => {
  const result = []
  result.push([`${props.world.worldName} [Total]`, worldChars.value.length || 0, totalCapture.value, totalSell.value, totalCapture.value + totalSell.value])
  props.world.condition?.forEach(cnd => result.push([cnd.name, (worldCharsByCondition.value[cnd.name] && worldCharsByCondition.value[cnd.name].length) || 0, totalCaptureByCondition.value[cnd.name] || 0, totalSellByCondition.value[cnd.name] || 0, (totalCaptureByCondition.value[cnd.name] || 0) + (totalSellByCondition.value[cnd.name] || 0)]))
  return result
})

</script>
