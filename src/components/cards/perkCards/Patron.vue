<template>
  <GenericPerkCard
    v-bind="{perk, isActive, savedPerk}"
    @pickPerk="sendPerk"
  >
    <template #cost>
      <span></span>
    </template>
    <template #title>
      <Select v-if="perk.title === 'Archdeity of Eternity'" v-model="archChoice" class="ml-2 text-base" :options="['Double', 'Invincibility']" @click.stop>
      </Select>
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

const archChoice = ref('Double')

function sendPerk(perk: any, perkToSave: any) {
  if (perk.title === 'Archdeity of Eternity')
    perkToSave.anything = archChoice.value
  const obj = filterObject(perkToSave)
  emit('pickPerk', perk, obj)
}

</script>
