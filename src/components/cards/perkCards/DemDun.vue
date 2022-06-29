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
    return 'TX Ticket'
  if (props.perk.title === 'Demiplane' && findIndex(homePerks.value, { title: 'Dungeons' }) !== -1)
    return 'TX Ticket'
  return props.perk.cost
})

function sendPerk(perk: any, perkToSave: any) {
  const obj = filterObject(perkToSave)
  obj.cost = displayedCost.value === 'TX Ticket' ? 11111 : obj.cost
  emit('pickPerk', perk, obj)
}

</script>
