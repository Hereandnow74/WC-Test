<template>
  <GenericPerkCard
    v-bind="{perk, isActive, savedPerk}"
    ref="card"
    @pickPerk="sendPerk"
  >
    <template #cost>
      <span></span>
    </template>
    <template #title>
      <Select v-if="perk.title === 'Archdeity of Eternity'" v-model="archChoice" class="ml-2 text-base" :options="['Double', 'Invincibility']" @click.stop>
      </Select>
    </template>
    <template v-if="!isOutside && perk.uid === '2uzzu'" #justDesc>
      <Desc :desc="perk.secondDesc" />
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
const card = ref(null)

const { isOutside } = useMouseInElement(card)
const archChoice = ref('Double')

function sendPerk(perk: any, perkToSave: any) {
  if (perk.title === 'Archdeity of Eternity')
    perkToSave.anything = archChoice.value
  const obj = filterObject(perkToSave)
  emit('pickPerk', perk, obj)
}

</script>
