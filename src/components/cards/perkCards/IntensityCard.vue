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
      :style="{'height': `${(perkImg?.clientWidth || 576) * 288/576}px`}"
      src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22576%22%20height%3D%22288%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20576%20288%22%20preserveAspectRatio%3D%22none%22%3E%0A%20%20%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%20%20%3Cstyle%20type%3D%22text%2Fcss%22%3E%0A%20%20%20%20%20%20%20%20%20%20%23holder%20text%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20fill%3A%20%23ffffff%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20font-family%3A%20sans-serif%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20font-size%3A%2040px%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20font-weight%3A%20400%3B%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%3C%2Fstyle%3E%0A%20%20%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%20%20%3Cg%20id%3D%22holder%22%3E%0A%20%20%20%20%20%20%20%20%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23cccccc%22%3E%3C%2Frect%3E%0A%20%20%20%20%20%20%20%20%3Cg%3E%0A%20%20%20%20%20%20%20%20%20%20%3Ctext%20text-anchor%3D%22middle%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20dy%3D%22.3em%22%3E576%20x%20288%3C%2Ftext%3E%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C%2Fsvg%3E"
      :data-src="perk.image"
      :alt="perk.title"
    />
    <h3 class="relative text-xl text-center">
      <span>{{ perk.title }}</span>
      <span v-if="perk.dlc" class="text-sm ml-1" text="gray-500 dark:gray-400" @click.stop>
        <a v-if="perk.dlclink" :href="perk.dlclink" target="_blank" rel="noopener noreferrer" class="underline">{{ perk.dlc }}</a>
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
        v-if="perk.intensity < 1"
        text="green-600 dark:green-300"
      >{{ Math.round(baseBudgetAfter * (perk.title === 'With A Little Help From My Friends(Cooperative)'
        ? coopIntensity : perk.intensity)) }}
        ({{ Math.round((perk.title === 'With A Little Help From My Friends(Cooperative)'
          ? coopIntensity : perk.intensity) * 100) }}%)
      </span>
      <span v-else text="green-600 dark:green-300">{{ perk.intensity }}</span>
      credits.
      <NumberInput
        v-if="perk.title === 'With A Little Help From My Friends(Cooperative)'"
        v-model="coopCount"
        class="inline"
        :min="1"
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
      <Enum :list="perk.whitelist" path="/intensity" />
    </div>
  </div>
</template>

<script lang="ts" setup>
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
const coopIntensity = computed(() => coopCount.value * 0.2)

const { baseBudgetAfter, settings } = useStore()

function chooseIntensity(val: any) {
  emit('chooseIntensity', val, coopIntensity.value, coopCount.value)
}

onMounted(() => { if (perkImg.value) lazyLoadSingleImg(perkImg.value) })
watch(settings.value, () => { if (perkImg.value) lazyLoadSingleImg(perkImg.value) }, { flush: 'post' })
</script>
