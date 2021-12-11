<template>
  <div
    class="sm:p-2 mb-2 column-block cursor-pointer"
    @click="chooseChallenge"
  >
    <h3 :id="challenge.title" class="relative flex-wrap flex justify-center items-center text-base sm:text-xl">
      <span class="whitespace-nowrap">{{ challenge.title }}</span>
      <slot name="title" />

      <fa-solid:check
        v-if="isActive"
        class="absolute top-1 right-1 text-green-500"
      />
    </h3>
    <slot name="rules" />
    <div v-if="challenge.special" class="mx-2">
      Special: <span class="text-purple-500 dark:text-purple-300">{{ challenge.special }}</span>
    </div>
    <div>
      <Desc :desc="challenge.desc" />
      <slot name="underDesc" />
    </div>
    <div v-if="challenge.requires" class="mx-2">
      Require: <span class="text-orange-500 dark:text-orange-300">{{ challenge.requires }}</span>
    </div>
    <div v-if="challenge.whitelist" class=" mx-2">
      <span class="whitespace-nowrap float-left mr-2">
        {{ 'Require ' + (challenge.whitelist.length > 1 ? (challenge.needed || ' all')+' of' : '') }}:
      </span>
      <Enum :list="challenge.whitelist" />
    </div>
  </div>
</template>

<script lang='ts' setup>
const props = defineProps({
  challenge: {
    type: Object,
    default: () => ({}),
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  max: {
    type: Number,
    default: 100,
  },
})

const emit = defineEmits(['pickPerk'])

function chooseChallenge() {
  //
}

</script>

<style>
.column-block {
  break-inside: avoid-column;
  page-break-inside: avoid;
}
</style>
