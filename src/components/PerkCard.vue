<template>
  <div
    :id="perk.title"
    class="p-2 mb-2 inline-block cursor-pointer"
    @click="$emit('pickPerk', perk)"
  >
    <h3 class="relative flex-wrap flex justify-center text-xl">
      <span class="whitespace-nowrap">{{ perk.title }}</span>
      <slot name="title" />
      <span text="gray-500 dark:gray-400" class="whitespace-nowrap">
        (Cost: <span text="green-600 dark:green-300">{{ perk.cost }}</span>)
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
    <div v-if="perk.requires" class="mx-2">
      Require: <span class="text-orange-500 dark:text-orange-300">{{ perk.requires }}</span>
    </div>
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
})

</script>
