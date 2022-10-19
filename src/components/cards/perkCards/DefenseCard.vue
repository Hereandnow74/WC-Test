<template>
  <GenericPerkCard
    v-bind="{perk, isActive, savedPerk}"
  >
    <template #title>
      <NumberInput
        v-model="perkToSave.count"
        :min="freeCount"
        :max="2"
        class="text-base ml-2"
        @click.stop
      />
      <NumberInput
        v-if="settings.rebates"
        v-model="perkToSave.defDiscount"
        class="mx-1 inline-block text-base"
        label="Discount"
        :min="0"
        :max="5"
        title="Number of qualified retinue members"
        @click.stop
      />
    </template>
    <template #cost>
      <span text="gray-500 dark:gray-400" class="whitespace-nowrap">
        <span>(Cost: </span><span text="green-600 dark:green-300">{{ displayedCost }}</span>
        <span v-if="discountedCost !== displayedCost" text="amber-600 dark:amber-300">
          [{{ discountedCost }}]</span>
        <span>)</span>
      </span>
    </template>
  </GenericPerkCard>
</template>

<script lang='ts' setup>
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
})

const { settings, defenseRetinueDiscountAuto } = useStore()
const emit = defineEmits(['pickPerk'])

const perkToSave = reactive({
  uid: props.perk.uid,
  title: props.perk.title,
  count: props.savedPerk.count || 0,
  defDiscount: props.savedPerk.defDiscount,
})

const displayedCost = computed(() => {
  return Math.max(props.perk.cost, props.perk.cost * perkToSave.count)
})

const freeCount = computed(() => ((props.savedPerk.count || 0) * props.perk.cost - (props.savedPerk.cost || 0)) / props.perk.cost)

const discountedCost = computed(() => {
  if (settings.value.rebates) {
    if (!perkToSave.defDiscount) return
    if (perkToSave.count <= 1) {
      switch (perkToSave.defDiscount) {
        case 1:
          return displayedCost.value * 0.6
        case 2:
          return displayedCost.value * 0.2
        case 3:
          return 0
        default:
          return 0
      }
    }
    else {
      switch (perkToSave.defDiscount) {
        case 1:
          return displayedCost.value * 0.8
        case 2:
          return displayedCost.value * 0.6
        case 3:
          return displayedCost.value * 0.4
        case 4:
          return displayedCost.value * 0.2
        case 5:
          return 0
      }
    }
  }
  else {
    return displayedCost.value - (defenseRetinueDiscountAuto.value[props.perk.title] ? defenseRetinueDiscountAuto.value[props.perk.title].discount : 0)
  }
})

function sendPerk() {
  const obj = filterObject(perkToSave)
  if (props.savedPerk.cost !== displayedCost.value && props.savedPerk.count === obj.count && props.savedPerk.defDiscount === obj.defDiscount)
    return
  obj.cost = displayedCost.value - freeCount.value * props.perk.cost

  if (perkToSave.count === 0)
    obj.count = 0
  emit('pickPerk', props.perk, obj)
}

watch([() => perkToSave.count, () => perkToSave.defDiscount], sendPerk)

</script>
