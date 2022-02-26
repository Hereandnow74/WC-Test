<template>
  <div class="bg-[#E3DDBC] dark:bg-[#1E1E5C] rounded p-2 shadow-lg">
    <h4 class="text-lg text-center py-1">
      {{ mission.title }}
      <span class="text-sm text-gray-500 dark:text-gray-400">by {{ mission.author }}</span>
    </h4>
    <div class="flex justify-between px-2">
      <div class="font-semibold">
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

const props = defineProps({
  mission: {
    type: Object as PropType<Mission>,
    default: () => ({}),
  },
})

</script>
