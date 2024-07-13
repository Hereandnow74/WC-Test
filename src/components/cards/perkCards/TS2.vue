<template>
  <GenericPerkCard
    v-bind="{perk, isActive: perkExist, savedPerk}"
    @pickPerk="sendPerk"
  >
    <template #title>
      <AnythingInput
        v-model="complex.flavor"
        placeholder="For whom"
        class="text-base ml-2 w-42"
        :list="targetList"
        :bought-list="savedPerk.complex"
        :do-not-close-list="true"
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

const { talentPerks, difficulties } = useStore()

const targetList = computed(() => talentPerks.value
  .filter(x => x.title === 'Template Stacking I')
  .reduce((a, x) => (x.complex ? a.push(...x.complex.map(x => ({ flavor: `${x.target} [${x.flavor}]` }))) : null, a), []))

const complex = reactive({
  flavor: '',
})

const perkExist = computed(() => {
  return props.perk.complex ? findIndex(props.savedPerk.complex, filterObject(complex)) !== -1 : props.isActive
})

const noSkill = computed(() => !!difficulties.value.find(x => x.title === 'No Skill Framework'))

const displayedCost = computed(() => {
  return props.savedPerk.cost || (noSkill.value ? 10 : props.perk.cost)
})

watch(() => complex.flavor, () => sendPerk(props.perk, { title: props.perk.title, cost: props.perk.cost }))

function sendPerk(perk: any, perkToSave: any) {
  const obj = filterObject(perkToSave)
  const filComplex = filterObject(complex)

  // If complex is empty do nothing
  if (!filComplex.flavor) return

  const ind = findIndex(props.savedPerk.complex, filComplex)
  if (ind !== -1)
    obj.complex = [...props.savedPerk.complex.filter((_, i: number) => i !== ind)]
  else
    obj.complex = [...props.savedPerk.complex || [], filComplex]
  obj.count = obj.complex.length || 0
  obj.cost = obj.count * (noSkill.value ? 10 : props.perk.cost)

  emit('pickPerk', perk, obj)
}

</script>
