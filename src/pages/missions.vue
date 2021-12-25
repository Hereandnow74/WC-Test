<template>
  <div class="rounded max-w-screen-md lg:pl-2 p-2">
    <h3 class="text-xl text-center">
      Missons
    </h3>
    <div class="flex flex-col gap-4 pl-8">
      <div v-for="mission in missions" :key="mission.title" class="bg-yellow-100 dark:bg-gray-900 rounded p-2">
        <h4 class="text-lg">
          {{ mission.title }} by {{ mission.author }}
        </h4>
        <div class="flex justify-between">
          <div>Location: {{ mission.loca }}</div>
          <div>Scope: {{ mission.scope }}</div>
        </div>
        <Desc :desc="mission.desc" />
        Requirements:
        <div v-for="req in mission.requirements" :key="req.value" class="pl-4">
          {{ req.value }}
        </div>
        Rewards:
        <div v-for="rew in mission.rewards" :key="rew.value" class="pl-4">
          {{ rew.value }}
        </div>
      </div>
    </div>
    <div class="h-8"></div>
  </div>
</template>

<script lang="ts" setup>
import { missions } from '~/data/missions'
</script>
