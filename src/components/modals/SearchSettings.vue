<template>
  <Modal label="Search settings">
    <div class="flex flex-col p-1 min-h-0 max-h-[88vh]">
      <div class="flex gap-x-4 gap-y-1 flex-wrap">
        <div class="flex gap-1 flex-wrap">
          Limit Tiers
          <NumberInput v-model="minTier" :min="1" :max="maxTier" />
          -
          <NumberInput v-model="maxTier" :min="minTier" :max="11" />
        </div>
        <Checkbox
          v-if="currentWorld.worldName !== 'No World'"
          v-model="isLimited"
          :label="`Limit to ${currentWorld.worldName}`"
          class="border rounded px-1 border-gray-300 dark:border-gray-500"
        />
        <Button size="Small" label="Import / Export local characters" @click="toggleImpExpChars" />
      </div>
      <div class="flex gap-2 flex-col md:flex-row min-h-0 ">
        <div class="flex flex-col min-h-0">
          <div class="font-semibold flex gap-1">
            All Worlds:
            <Toggle v-model="blackWhiteDisabled" class="ml-auto" label="Turn off" />
            <div>
              Black list
            </div>
            <Toggle v-model="blackWhite" />
            <div>White list</div>
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
          <div v-if="blackWhite" class="font-semibold">
            Allowed Worlds:
          </div>
          <div v-else class="font-semibold">
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
    <ImpExpChars v-if="showImpExpChars" @click="toggleImpExpChars" />
  </Modal>
</template>

<script lang="ts" setup>
import { allCompanionsWorlds } from '~/data/constants'
import { showImpExpChars, toggleImpExpChars, blackWhite, blackWhiteDisabled } from '~/logic'
import { useSettings } from '~/logic/searchSettings'
import { usePlayStore } from '~/store/play'

const { currentWorld } = usePlayStore()
const { minTier, maxTier, blockedWorlds, isLimited } = useSettings()

const worldSearch = ref('')

const allWorldsWithoutBlocked = computed(() => allCompanionsWorlds.value.filter(x => !blockedWorlds.value.includes(x) && x.toLowerCase().includes(worldSearch.value.toLowerCase())).sort((a, b) => a.localeCompare(b)))

</script>
