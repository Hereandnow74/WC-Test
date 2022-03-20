<template>
  <div class="perspect-[1000px] flex-grow w-full">
    <div v-if="char.n" class="h-full  transform transition-transform duration-[0s] preserve-3d relative ease-in border border-gray-700" :class="isRolling ? 'animate-spin' : ''">
      <CompanionCard
        :font-size="text === 'xs' ? 'text-xs' : 'text-lg'"
        :show-tags="showTags"
        :text="text"
        :char="char"
        :lazy="false"
        class="absolute w-full h-full border border-gray-700 backface-hidden"
      />
      <div class="absolute rounded w-full h-full transition-opacity ease-in duration-75" :class="[isRevealing ? 'opacity-0 !duration-[2s]' : '', tierColor[char.t - 1]]"></div>
      <div class="absolute rounded w-full h-full card-bg backface-hidden transform rotate-y-180">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

defineProps({
  char: {
    type: Object,
    default: () => ({}),
  },
  isRolling: {
    type: Boolean,
    default: false,
  },
  isRevealing: {
    type: Boolean,
    default: false,
  },
  showTags: {
    type: Boolean,
    default: true,
  },
  text: {
    type: String,
    default: 'base',
  },
})

const tierColor = [
  'bg-blue-400',
  'bg-blue-500',
  'bg-blue-600',
  'bg-red-400',
  'bg-red-500',
  'bg-red-600',
  'bg-gray-200',
  'bg-gray-300',
  'bg-gray-400',
  'bg-yellow-500',
  'bg-purple-500',
]

</script>
