<template>
  <div
    class="p-1 rounded cursor-pointer column-block mb-2 pb-4 max-w-[600px] relative"
    :bg="intensityAvailable(perk) ? 'blue-100 dark:gray-700 hover:blue-200 dark:hover:gray-800' : 'gray-200 dark:gray-600'"
    @click="chooseIntensity(perk)"
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
      <span v-if="perk.pvp" class="text-base">(
        <router-link
          :to="{path: '/', hash:'#pvp'}"
          class="text-blue-700 dark:text-blue-300"
          @click.stop
        >
          PvP
        </router-link>)
      </span>
      <fa-solid:check
        v-if="isActive"
        class="absolute right-1 top-1 text-green-500"
      />
    </h3>
    <div v-if="perk.intensity" class="px-2 flex gap-2">
      Bonus:
      <span
        v-if="perk.intensity < 10"
        text="green-600 dark:green-300"
      >{{ Math.round(baseBudgetAfter * perk.intensity) }}
        ({{ Math.round(perk.intensity * 100) }}%)
      </span>
      <span v-else text="green-600 dark:green-300">{{ perk.intensity }}</span>
      credits.
      <NumberInput
        v-if="perk.title === 'With A Little Help From My Friends(Cooperative)'"
        v-model="coopCount"
        class="inline"
        :min="1"
        :max="Infinity"
        @click.stop
      />
    </div>
    <Desc :desc="perk.desc" />
    <div v-if="perk.special" class="mx-2">
      Special: <span class="text-purple-500 dark:text-purple-300">{{ perk.special }}</span>
    </div>
    <div v-if="perk.blacklist" class="px-2 flex gap-2">
      Mutually exclusive with:
      <Enum :list="perk.blacklist" />
    </div>
    <div v-if="perk.whitelist" class="px-2 flex gap-2">
      Requires:
      <Enum :list="perk.whitelist" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PLACEHOLDER_IMAGE } from '~/data/constants'
import { useStore } from '~/store/store'

import { intensityAvailable, lazyLoadSingleImg } from '~/logic/'

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

const emit = defineEmits(['chooseIntensity'])

const coopCount = ref(1)
const perkImg = ref<HTMLImageElement | null>(null)

const { baseBudgetAfter, settings } = useStore()

function chooseIntensity(val: any) {
  emit('chooseIntensity', val, -0.2, coopCount.value)
}

onMounted(() => { if (perkImg.value) lazyLoadSingleImg(perkImg.value) })
watch(settings.value, () => { if (perkImg.value) lazyLoadSingleImg(perkImg.value) }, { flush: 'post' })
</script>
