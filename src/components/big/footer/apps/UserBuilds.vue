<template>
  <div class="flex flex-col gap-2 pb-4 px-2 text-gray-200">
    <div class="flex justify-between">
      <div>Total builds: {{ buildList.length }}</div>
    </div>
    <div
      v-for="save in displayList"
      :key="save.date"
      class="bg-gray-700 rounded-xl p-2 flex gap-1 shadow-lg"
      border="1 gray-300"
    >
      <div class="grid grid-cols-2 flex-grow">
        <h3 class="col-span-2 text-center text-lg">
          {{ save.nickname }} <span class="text-sm text-gray-300">
            ({{ useTimeAgo(save.newDate).value }})
          </span>
        </h3>
        <div class="text-gray-400">
          World: <span class="text-orange-400">{{ save.world }}</span>
        </div>
        <div class="text-gray-400">
          Rating: <span class="text-green-400">{{ save.rating }}</span>
        </div>
        <div class="text-gray-400">
          Perks: <span class="text-green-400">{{ save.totalPerks }}</span>
        </div>
        <div class="text-gray-400">
          Companions: <span class="text-green-400">{{ save.totalCompanions }}</span>
        </div>
      </div>
      <div class="flex flex-col gap-1 justify-between rounded-xl bg-gray-800 py-2 px-1">
        <clarity:floppy-outline-alerted class="hover:text-green-500 cursor-pointer" @click="loadBuild(save.id)" />
        <bx:bx-copy-alt class="hover:text-green-500 cursor-pointer" @click="copyLink(save.id)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTimeAgo } from '@vueuse/core'
import { activeTab, writeBuildValues, getBuild, getBuilds, toggleAppMode } from '~/logic'
import { useSaves } from '~/store/saves'

const { buildList } = useSaves()

if (!buildList.value.length)
  getBuilds(builds => JSON.parse(builds.list).forEach(x => buildList.value.push(x)))

const displayList = computed(() => buildList.value
  .map(x => (x.newDate = new Date(x.date), x))
  .sort((a, b) => b.newDate - a.newDate)
  .slice(0, 100))

function loadBuild(id: string) {
  getBuild(id, writeBuildValues)
  activeTab.value = 0
}

function copyLink(id: string) {
  navigator.clipboard.writeText(`https://waifu-catalog.neocities.org/?load=${id}`)
}
</script>
