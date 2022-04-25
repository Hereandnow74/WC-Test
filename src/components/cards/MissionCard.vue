<template>
  <div class="bg-[#E3DDBC] dark:bg-[#1E1E5C] rounded p-2 shadow-lg flex flex-col gap-1">
    <h4 class="text-lg text-center py-1">
      {{ mission.title }}
      <span v-if="mission.author" class="text-sm text-gray-500 dark:text-gray-400">by {{ mission.author }}</span>
    </h4>
    <img v-if="mission.image && settings.perkImages" ref="imageEl" class="max-h-sm object-cover" :data-src="mission.image" alt="mission image">
    <div class="flex gap-2 justify-between px-2 float-right">
      <div v-if="mission.loca === 'Generic'" class="font-semibold">
        <span class=" text-teal-600 dark:text-teal-300">Generic mission</span>
      </div>
      <div v-else class="font-semibold">
        <span class="font-normal text-gray-600 dark:text-gray-300">Location</span>: {{ mission.loca }}
      </div>
      <div class="font-semibold">
        <span class="font-normal text-gray-600 dark:text-gray-300">Scope</span>: {{ mission.scope }}
      </div>
    </div>
    <Desc :desc="mission.desc" />
    <div v-if="mission.conditions.length" class="px-2 flex flex-col gap-1">
      <h4 class="text-amber-800 dark:text-amber-300">
        Conditions:
      </h4>
      <ul class="list-disc list-inside">
        <li v-for="req in mission.conditions" :key="req.value" class="pl-4">
          {{ req.value }}
        </li>
      </ul>
    </div>
    <div class="px-2">
      <h4 class="text-green-800 dark:text-green-300 float-left pr-2">
        Reward:
      </h4>
      <span>{{ mission.reward }}</span>
    </div>
    <div v-if="mission.objectives.length" class="px-2 flex flex-col gap-1">
      <h4 class="text-amber-800 dark:text-amber-300">
        Additional objectives:
      </h4>
      <div v-for="rew in mission.objectives" :key="rew.value" class="p-1 pl-4 bg-blue-200 dark:bg-blue-gray-700">
        <div><b>Objective</b>: {{ rew.value }}</div>
        <div>
          <b>Reward</b>: {{ rew.reward }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Mission } from 'global'
import type { PropType } from 'vue'
import { lazyLoadSingleImg } from '~/logic'
import { useStore } from '~/store/store'

const { settings } = useStore()

defineProps({
  mission: {
    type: Object as PropType<Mission>,
    default: () => ({}),
  },
})

const imageEl = ref(null)

onMounted(() => { if (imageEl.value) lazyLoadSingleImg(imageEl.value) })

</script>
