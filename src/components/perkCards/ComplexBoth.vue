<template>
  <div class="column-block max-w-[600px]">
    <GenericPerkCard
      v-bind="{perk, isActive: perkExist, savedPerk}"
      @pickPerk="sendPerk"
    >
      <template #title>
        <Button label="Buy" bg-color="bg-blue-500" size="Small" class="mx-1" @click.stop="showBuyPerk = true" />
      </template>
      <template #cost>
        (Cost: <span text="green-600 dark:green-300">{{ displayedCost }}</span>)
      </template>
    </GenericPerkCard>
    <Modal v-if="showBuyPerk" @click="showBuyPerk = false">
      <div>
        <div v-for="member in companions" :key="member.uid">
          {{ member }}
        </div>
      </div>
    </Modal>
  </div>
</template>

<script lang='ts' setup>
import { findIndex } from 'lodash-es'
import { filterObject } from '~/logic'
import { useStore } from '~/store/store'

const { companions } = useStore()

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

const complex = reactive({
  flavor: '',
})

const showBuyPerk = ref(false)

const calcCost = (ln: number) => 54 * ln + (ln / 2) * (10 * 2 + (ln - 1) * 10) || 64

const displayedCost = computed(() => {
  const ln = props.savedPerk?.complex?.length || 0
  return calcCost(ln)
})

const perkExist = computed(() => {
  return props.perk.complex ? findIndex(props.savedPerk.complex, filterObject(complex)) !== -1 : props.isActive
})

function sendPerk(perk: any, perkToSave: any) {
  const obj = filterObject(perkToSave)
  const filComplex = filterObject(complex)
  const ind = findIndex(props.savedPerk.complex, filComplex)
  if (ind !== -1)
    obj.complex = [...props.savedPerk.complex.filter((_, i: number) => i !== ind)]
  else
    obj.complex = [...props.savedPerk.complex || [], filComplex]
  obj.count = obj.complex.length || 1
  obj.cost = calcCost(obj.count)

  emit('pickPerk', perk, obj)
}

</script>
