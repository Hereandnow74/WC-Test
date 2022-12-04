<template>
  <div class="relative bg-[#f2eecb] dark:bg-[#1E1E5C] rounded p-2 shadow-lg flex flex-col gap-1">
    <h4 class="text-lg text-center py-1">
      <span v-html="mission.title"></span>
      <span v-if="mission.author" class="text-sm text-gray-500 dark:text-gray-400"> by {{ mission.author }}</span>
    </h4>
    <div title="Edit Mission" class="text-lg hover:text-orange-500 cursor-pointer flex items-center gap-1 absolute top-1 right-1" @click="showEditCompanion">
      <bx:bxs-edit />
    </div>
    <div class="hover:(text-red-400) text-lg cursor-pointer flex items-center gap-1 absolute top-1 left-1" title="Add to Favorites" @click="missionFavoritesSet.has(mission.uid) ? missionFavorites.splice(missionFavorites.indexOf(mission.uid), 1) : missionFavorites.push(mission.uid)">
      <span class="text-red-500">
        <ci:heart-fill
          v-if="missionFavoritesSet.has(mission.uid)"
        />
        <ci:heart-outline v-else />
      </span>
    </div>
    <img
      v-if="mission.image && settings.perkImages"
      ref="imageEl"
      class="max-h-sm object-cover rounded"
      draggable="false"
      :data-src="mission.image"
      alt="mission image"
    >
    <div class="flex gap-2 justify-between px-2 float-right">
      <div v-if="mission.loca === 'Generic'" class="font-semibold">
        <span class=" text-teal-600 dark:text-teal-300">Generic mission</span>
      </div>
      <div v-else class="font-semibold">
        <span class="font-normal text-gray-600 dark:text-gray-300">Location</span>: {{ mission.loca }}
      </div>
      <div class="font-semibold whitespace-nowrap">
        <span class="font-normal text-gray-600 dark:text-gray-300">Scope</span>: {{ mission.scope }}
      </div>
    </div>
    <div v-if="mission.budget" class="text-center text-sm text-amber-800 dark:text-amber-300">
      ( Total cost of your build required to take this mission should be in <span class="text-green-800 dark:text-green-300">{{ Math.floor(mission.budget * 0.8) }}</span> - <span class="text-green-800 dark:text-green-300">{{ Math.floor(mission.budget * 1.2) }}</span> credits range)
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
        Reward
        <span v-if="mission.rewardType">
          [
          <span class="font-semibold text-pink-800 dark:text-pink-300">
            {{ mission.rewardType }}
          </span>
          ]
        </span>:
      </h4>
      <span>{{ mission.reward }}</span>
    </div>
    <div v-if="mission.objectives.length" class="px-2 flex flex-col gap-1">
      <h4 class="text-amber-800 dark:text-amber-300">
        Additional objectives:
      </h4>
      <div v-for="rew in mission.objectives" :key="rew.value" class="p-1 pl-4 bg-blue-200 dark:bg-blue-gray-700 flex flex-col gap-2">
        <div><b>Objective</b>: {{ rew.value }}</div>
        <div>
          <span class="font-semibold text-green-800 dark:text-green-300">
            Reward
            <span v-if="rew.type">
              [
              <span class="font-semibold text-pink-800 dark:text-pink-300">
                {{ rew.type }}
              </span>
              ]
            </span>:
          </span> {{ rew.reward }}
        </div>
      </div>
    </div>
    <Button
      class="text-gray-100 rounded cursor-pointer hover:bg-orange-500 px-2 mt-auto self-center"
      :label="missionRewards[mission.uid] ? 'Edit the rewards': 'Take the Mission'"
      :bg-color="!!missionRewards[mission.uid] ? 'bg-orange-600': 'bg-red-700'"
      icon="charm:swords"
      @click="showTakeMission = true"
    />
    <TakeMission v-if="showTakeMission" :mission="mission" @click="showTakeMission = false" />
    <AddMission v-if="showEditMission" :mission="mission" @click="showEditMission = false" />
  </div>
</template>

<script lang="ts" setup>
import { Mission } from 'global'
import type { PropType } from 'vue'
import { lazyLoadSingleImg } from '~/logic'
import { usePlayStore } from '~/store/play'
import { useSaves } from '~/store/saves'
import { useStore } from '~/store/store'

const { settings } = useStore()
const { missionRewards } = usePlayStore()
const { missionFavorites } = useSaves()

defineProps({
  mission: {
    type: Object as PropType<Mission>,
    default: () => ({}),
  },
})

const imageEl = ref(null)
const showTakeMission = ref(false)
const showEditMission = ref(false)

const missionFavoritesSet = computed(() => new Set(missionFavorites.value))

onMounted(() => { if (imageEl.value) lazyLoadSingleImg(imageEl.value) })

function showEditCompanion() {
  showEditMission.value = true
}

</script>
