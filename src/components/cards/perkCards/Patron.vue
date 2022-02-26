<template>
  <GenericPerkCard
    v-bind="{perk, isActive, savedPerk}"
    @pickPerk="sendPerk"
  >
    <template #cost>
      <span></span>
    </template>
  </GenericPerkCard>
</template>

<script lang='ts' setup>
import { filterObject } from '~/logic'

defineProps({
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

function sendPerk(perk: any, perkToSave: any) {
  const obj = filterObject(perkToSave)
  emit('pickPerk', perk, obj)
}

</script>
