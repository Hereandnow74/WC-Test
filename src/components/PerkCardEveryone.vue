<template>
  <div
    :id="perk.title"
    class="p-2 mb-2 inline-block cursor-pointer"
  >
    <h3 class="relative text-xl flex justify-center items-center">
      {{ perk.title }} ({{ countVal }}x)
      <template v-if="isAvailable">
        <NumberInput v-model="countVal" :min="min" :max="max" class="text-base ml-2" />
      </template>
      <slot name="title" />
      <span text="gray-600 dark:gray-400">
        (Cost: {{ perk.cost * countVal || perk.cost }})
      </span>
      <bi:check-lg
        v-if="isActive"
        class="absolute top-1 right-1 text-green-500"
      />
    </h3>
    <div v-if="perk.special" class="mx-2">
      Special: <span class="text-purple-500 dark:text-purple-300">{{ perk.special }}</span>
    </div>
    <Desc :desc="perk.desc" />
    <div v-if="perk.whitelist" class="flex gap-2 mx-2">
      Require:
      <Enum :list="perk.whitelist.map(x => ({title: x}))" />
    </div>
  </div>
</template>

<script lang='ts' setup>

defineProps({
  perk: {
    type: Object,
    default: () => ({}),
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  isAvailable: {
    type: Boolean,
    default: false,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 25,
  },
})

const emit = defineEmits(['pickPerk', 'count'])

const countVal = ref(0)

watch(countVal, () => buyPerk())

function buyPerk() {
  emit('count', countVal.value)
  emit('pickPerk')
}

</script>
