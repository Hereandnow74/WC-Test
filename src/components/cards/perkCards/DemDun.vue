<template>
  <GenericPerkCard
    v-bind="{perk, isActive, savedPerk}"
    @pickPerk="sendPerk"
  >
    <template #cost>
      (Cost: <span text="green-600 dark:green-300">{{ displayedCost }}</span>)
    </template>
  </GenericPerkCard>
</template>

<script lang='ts' setup>
import { findIndex } from 'lodash-es'
import { filterObject } from '~/logic'
import { useStore } from '~/store/store'

const props = defineProps({
  perk: {
    type: Object,
    default: () => ({}),
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  savedPerk: {
    type: Object,
    default: () => ({}),
  },
  elementList: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['pickPerk'])

const { homePerks } = useStore()

const displayedCost = computed(() => {
  if (props.perk.title === 'Dungeons' && findIndex(homePerks.value, { title: 'Demiplane' }) !== -1)
    return '1 IMG'
  if (props.perk.title === 'Demiplane' && findIndex(homePerks.value, { title: 'Dungeons' }) !== -1)
    return '1 IMG'
  return props.perk.cost
})

function sendPerk(perk: any, perkToSave: any) {
  const obj = filterObject(perkToSave)
  if (displayedCost.value === '1 IMG')
    obj.costT = 1
  emit('pickPerk', perk, obj)
}

</script>
