<template>
  <Modal label="Settings">
    <div class="p-2 overflow-y-auto flex flex-col gap-2 min-h-0 max-h-[85vh]">
      <h3 class="text-lg">
        Layout
      </h3>
      <div>
        <div class="flex justify-between">
          <div>Number of columns for perks</div>
          <Select v-model="settings.columns" :options="['auto', 1, 2, 3, 4, 5]" />
        </div>
      </div>
      <h3 class="text-lg">
        Options
      </h3>
      <div class="flex flex-col gap-2">
        <div class="flex justify-between gap-2 border-b border-gray-500">
          <div>Images for perk's</div>
          <Toggle v-model="settings.perkImages" />
        </div>
        <div class="flex justify-between gap-4 border-b border-gray-500">
          <div>Load NSFW Images for characters by default</div>
          <Toggle v-model="settings.nsfw" />
        </div>
        <div class="flex justify-between gap-4 border-b border-gray-500">
          <div>Turn off World and Companions images</div>
          <Toggle v-model="settings.allImg" />
        </div>
        <div class="flex justify-between gap-4 border-b border-gray-500">
          <div>Turn on the ability to free retinue members</div>
          <Toggle v-model="settings.ableSell" />
        </div>
        <div class="flex justify-between gap-4 border-b border-gray-500">
          <div>Hide descriptions for perks by default</div>
          <Toggle v-model="settings.hideDesc" />
        </div>
      </div>
      <h3 class="text-lg">
        Turn off DLC's
      </h3>
      <div class="flex gap-2 flex-wrap">
        <Toggle
          v-model="settings.allChosenAuthors[0]"
          value="all"
          label="All"
          class="border border-amber-500 rounded p-0.5"
        />
        <Toggle
          v-for="name, i in allDLCAuthors"
          :key="name"
          v-model="settings.allChosenAuthors[i+1]"
          :value="name"
          :label="name"
          class="border border-gray-700 dark:border-gray-400 rounded p-0.5"
        />
      </div>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import {
  DLCgenericPerks, DLChomes, DLCperks, DLCtalents, DLCheritages, DLClureExpansions,
  DLCbindings, DLClures, DLCotherControls, DLCridePerks,
} from '~/data/DLCs'

import { useStore } from '~/store/store'

const { settings } = useStore()

const allDLCAuthors = [DLCgenericPerks, DLChomes, DLCperks, DLCtalents, DLCheritages, DLClureExpansions,
  DLCbindings, DLClures, DLCotherControls, DLCridePerks].reduce((a, dlc) => {
  dlc.forEach((perk) => { if (!a.includes(perk.dlc)) a.push(perk.dlc) })
  return a
}, [] as string[])

</script>
