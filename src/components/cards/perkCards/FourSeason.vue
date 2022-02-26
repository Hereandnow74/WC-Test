<template>
  <GenericPerkCard
    v-bind="{perk, isActive: perkExist, savedPerk}"
    @pickPerk="sendPerk"
  >
    <template #title>
      <AnythingInput
        v-model="complex.target"
        placeholder="For whom"
        class="text-base ml-2 w-42"
        :list="targetList"
        :bought-list="savedPerk.complex"
        @click.stop
      />
      <NumberInput
        v-if="perk.multiple"
        v-model="complex.count"
        :min="1"
        :max="perk.max || 100"
        class="text-base ml-2"
        @click.stop
      />
    </template>
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

const { targetList } = useStore()

const complex = reactive({
  target: '',
  count: 1,
})

watch(complex, () => {
  const ind = findIndex(props.savedPerk.complex, filterObject({ target: complex.target }))
  if (ind !== -1) complex.count = props.savedPerk.complex[ind].count
})

const perkExist = computed(() => {
  return props.perk.complex ? findIndex(props.savedPerk.complex, filterObject(complex)) !== -1 : props.isActive
})

const displayedCost = computed(() => {
  const ln = (props.savedPerk?.count || 0) + complex.count - (perkExist.value ? complex.count : 0)
  return (ln * props.perk.cost) || props.perk.cost
})

function sendPerk(perk: any, perkToSave: any) {
  const obj = filterObject(perkToSave)
  const filComplex = filterObject(complex)

  // If complex is empty or count is 0 do nothing
  if (!filComplex.target || filComplex.count <= 0) return

  const ind = findIndex(props.savedPerk.complex, filComplex)
  if (ind !== -1)
    obj.complex = [...props.savedPerk.complex.filter((_, i: number) => i !== ind)]
  else
    obj.complex = [...props.savedPerk.complex || [], filComplex]
  obj.count = obj.complex.reduce((a, x) => a += x.count, 0) || 0
  obj.cost = obj.count * props.perk.cost

  emit('pickPerk', perk, obj)
}

</script>
