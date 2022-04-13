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
          v-if="currentWorld.worldName !== 'Current world'"
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
            <Input v-model="worldSearch" placeholder="Type to search world" class="mb-1" />
            <div
              v-for="world in allWorldsWithoutBlocked"
              :key="world"
              :value="world"
              class="even:bg-gray-300 dark:even:bg-warm-gray-700 hover:text-red-500 cursor-pointer"
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

const { currentWorld } = usePlayStore()
const { minTier, maxTier, blockedWorlds, isLimited } = useSearchSettings()

const worldSearch = ref('')

const allWorldsWithoutBlocked = computed(() => allCompanionsWorlds.value.filter(x => !blockedWorlds.value.includes(x) && x.toLowerCase().includes(worldSearch.value.toLowerCase())).sort((a, b) => a.localeCompare(b)))

</script>
