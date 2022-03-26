<template>
  <Modal label="Search settings">
    <div class="flex flex-col p-1 min-h-0 max-h-[88vh]">
      <div class="flex gap-x-4 gap-y-1 flex-wrap">
        <div class="flex gap-1">
          Limit Tiers
          <NumberInput v-model="minTier" :min="1" :max="maxTier" />
          -
          <NumberInput v-model="maxTier" :min="minTier" :max="11" />
        </div>
        <Checkbox
          v-if="startingWorld.worldName !== 'Current world'"
          v-model="isLimited"
          :label="`Limit to ${currentWorld.worldName}`"
          class="border rounded px-1 border-gray-300 dark:border-gray-500"
        />
      </div>
      <div class="flex gap-2 flex-col md:flex-row min-h-0 ">
        <div class="flex flex-col min-h-0">
          <div class="font-semibold">
            All Worlds:
          </div>
          <div class="flex flex-col min-h-0 overflow-y-auto scrollbar border rounded p-1 h-[300px] md:h-full">
            <div
              v-for="world in allWorldsWithoutBlocked"
              :key="world"
              :value="world"
              class="even:bg-warm-gray-700 hover:text-red-500 cursor-pointer"
              @click="blockedWorlds.push(world)"
            >
              {{ world }}
            </div>
          </div>
        </div>
        <div class="flex flex-col min-h-0">
          <div class="font-semibold">
            Blocked Worlds:
          </div>
          <div class="flex flex-col min-h-0 overflow-y-auto scrollbar border rounded p-1 ">
            <div
              v-for="world, i in blockedWorlds"
              :key="world"
              :value="world"
              class="even:bg-warm-gray-700 hover:text-green-500 cursor-pointer"
              @click="blockedWorlds.splice(i, 1)"
            >
              {{ world }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { allCompanionsWorlds } from '~/data/constants'
import { useSearchSettings } from '~/logic/searchSettings'
import { usePlayStore } from '~/store/play'
import { useStore } from '~/store/store'

const worldNameDict = {
  'Xenoblade Chronicles 2': '(Monolith) Xeno-',
  'Xenoblade Chronicles 1': '(Monolith) Xeno-',
  'Overlord (LN)': 'Overlord',
  'Avatar: The Last Airbender': 'Avatar',
  'Avatar: Legend of Korra': 'Avatar',
  'Game of Thrones': 'A Song Of Ice And Fire',
  'Monogatari Series': 'Monogatari',
  'Magi Series': 'Magi',
  'Tales Series': 'Tales of',
  'Prisma Illya': 'Nasuverse',
  'Fate/Extra': 'Nasuverse',
  'Precure': 'Pretty Cure',
} as Record<string, string>

const isLimited = ref(false)

const { startingWorld } = useStore()
const { currentWorld } = usePlayStore()
const { minTier, maxTier, worldName, blockedWorlds } = useSearchSettings()

const allWorldsWithoutBlocked = computed(() => allCompanionsWorlds.value.filter(x => !blockedWorlds.value.includes(x)).sort((a, b) => a.localeCompare(b)))

watch(isLimited, () => {
  if (isLimited.value)
    worldName.value = worldNameDict[currentWorld.value.worldName] || currentWorld.value.worldName || worldNameDict[startingWorld.value.worldName] || startingWorld.value.worldName
  else
    worldName.value = ''
})

</script>
