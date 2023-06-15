<template>
  <div
    class="p-1 rounded cursor-pointer mb-2 pb-4 max-w-[600px] relative"
    :bg="difficultyAvailable(perk) ? 'blue-100 dark:gray-700 hover:blue-200 dark:hover:gray-800' : 'gray-200 dark:gray-500'"
    @click="chooseDifficulty(perk)"
  >
    <img
      v-if="perk.image && settings.perkImages"
      ref="perkImg"
      class="rounded object-cover object-contain w-full object-center"
      :style="{'aspect-ratio': `2/1`}"
      :src="PLACEHOLDER_IMAGE"
      :data-src="perk.image"
      :alt="perk.title"
    />
    <h3 class="relative text-xl text-center">
      <span>{{ perk.title }}</span>
      <span v-if="perk.dlc" class="text-sm ml-1" text="gray-500 dark:gray-400" @click.stop>
        <a v-if="perk.dlclink" :href="perk.dlclink" target="_blank" rel="noopener noreferrer" class="underline">DLC by {{ perk.dlc }}</a>
        <span v-else>DLC by {{ perk.dlc }}</span>
      </span>
      <fa-solid:check
        v-if="isActive"
        class="absolute right-1 top-1 text-green-500"
      />
    </h3>
    <div class="px-2 flex gap-2">
      <b>Intensity</b>:
      <span text="green-600 dark:green-300">{{ perk.intensity > 0 ? '+' : '' }}{{ perk.intensity }}</span>
      <slot name="intensity" />
    </div>
    <Desc :desc="perk.desc" />
    <div v-if="perk.special" class="mx-2">
      Special: <span class="text-purple-500 dark:text-purple-300">{{ perk.special }}</span>
    </div>
    <div v-if="perk.compatibility" class="px-2 flex gap-2">
      Compatible with:
      <Enum :list="perk.compatibility" />
    </div>
    <div v-if="perk.requires" class="px-2 flex gap-2">
      Requires:
      <Enum :list="perk.requires" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PLACEHOLDER_IMAGE } from '~/data/constants'
import { lazyLoadSingleImg } from '~/logic/misc'
import { difficultyAvailable, chooseDifficulty } from '~/logic/perksLogic'
import { useStore } from '~/store/store'

// import { intensityAvailable, lazyLoadSingleImg } from '~/logic/'

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
})

const perkImg = ref<HTMLImageElement | null>(null)

const { settings } = useStore()

onMounted(() => { if (perkImg.value) lazyLoadSingleImg(perkImg.value) })
watch(settings.value, () => { if (perkImg.value) lazyLoadSingleImg(perkImg.value) }, { flush: 'post' })
</script>
