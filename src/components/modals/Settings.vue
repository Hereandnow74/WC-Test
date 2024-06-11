<template>
  <Modal label="Settings">
    <div class="p-1 overflow-y-auto min-h-0 max-h-[85vh] scrollbar">
      <div class="flex gap-1">
        <div class="border-t border-r border-l dark:border-gray-700 rounded-t-md py-1 px-2 cursor-pointer" :class="tab===0 ? 'bg-gray-200 dark:bg-dark-700': 'bg-gray-300 dark:bg-dark-100'" @click="tab = 0">
          General
        </div>
        <div class="border-t border-r border-l dark:border-gray-700 rounded-t-md py-1 px-2 cursor-pointer" :class="tab===1 ? 'bg-gray-200 dark:bg-dark-700': 'bg-gray-300 dark:bg-dark-100'" @click="tab = 1">
          Mechanics
        </div>
      </div>
      <div v-if="tab===0" class="p-1 bg-gray-200 dark:bg-dark-700 flex flex-col gap-2">
        <h3 class="text-lg text-lime-700 dark:text-lime-400 font-semibold">
          Layout
        </h3>
        <div class="flex flex-col gap-1">
          <div class="flex justify-between">
            <div>Number of columns for perks</div>
            <Select v-model="settings.columns" :options="['auto', 1, 2, 3, 4, 5]" />
          </div>
          <div class="flex justify-between">
            <div>Number of columns for companions (0 = auto)</div>
            <NumberInput v-model="settings.columnsCompanions" :min="0" :max="20" />
          </div>
          <div class="flex justify-between">
            <div class="flex gap-1">
              <div>Text Aligment: </div>
              <div
                class="flex items-center bg-gray-200 dark:bg-gray-700 px-1 rounded cursor-pointer"
                :class="{'border border-green-500': settings.textAlign === 'text-left'}"
                title="Left Alignment"
                @click="settings.textAlign = 'text-left'"
              >
                <clarity:align-left-text-line class="inline-block rounded" />
              </div>
              <div
                class="flex items-center bg-gray-200 dark:bg-gray-700 px-1 rounded cursor-pointer"
                :class="{'border border-green-500': settings.textAlign === 'text-center'}"
                title="Center Alignment"
                @click="settings.textAlign = 'text-center'"
              >
                <clarity:center-text-line class="inline-block rounded" />
              </div>
              <div
                class="flex items-center bg-gray-200 dark:bg-gray-700 px-1 rounded cursor-pointer"
                :class="{'border border-green-500': settings.textAlign === 'text-right'}"
                title="Right Alignment"
                @click="settings.textAlign = 'text-right'"
              >
                <clarity:align-right-text-line class="inline-block rounded" />
              </div>
              <div
                class="flex items-center bg-gray-200 dark:bg-gray-700 px-1 rounded cursor-pointer"
                :class="{'border border-green-500': settings.textAlign === 'text-justify'}"
                title="Even Alignment"
                @click="settings.textAlign = 'text-justify'"
              >
                <clarity:justify-text-line class="inline-block rounded" />
              </div>
            </div>
            <NumberInput v-model.number="settings.fontSize" :min="0" class="whitespace-nowrap" label="Font Size (0 is default)" />
          </div>
        </div>
        <h3 class="text-lg text-lime-700 dark:text-lime-400 font-semibold">
          Options
        </h3>
        <div class="flex flex-col gap-2">
          <div class="flex justify-between gap-2 border-b border-gray-500 border-dotted">
            <div>Hide images for <b>Perks</b></div>
            <Toggle :value="!settings.perkImages" @click="settings.perkImages = !settings.perkImages || false" />
          </div>
          <div class="flex justify-between gap-4 border-b border-gray-500 border-dotted">
            <div>Hide images for <b>Worlds</b></div>
            <Toggle v-model="settings.hideWorldImg" />
          </div>
          <div class="flex justify-between gap-4 border-b border-gray-500 border-dotted">
            <div>Hide images for <b>Companions / Waifu perks</b> </div>
            <Toggle v-model="settings.allImg" />
          </div>
          <div class="flex justify-between gap-4 border-b border-gray-500 border-dotted">
            <div>Load <b>NSFW</b> Images for characters by default</div>
            <Toggle v-model="settings.nsfw" />
          </div>
          <div class="flex justify-between gap-4 border-b border-gray-500 border-dotted">
            <div>Hide <b>descriptions for perks</b> by default</div>
            <Toggle v-model="settings.hideDesc" />
          </div>
          <div class="flex justify-between gap-4 border-b border-gray-500 border-dotted">
            <div>Turn on the ability to <b>free</b> retinue members (<b>Not Official</b>)</div>
            <Toggle v-model="settings.ableSell" />
          </div>
          <div class="flex justify-between gap-4 border-b border-gray-500 border-dotted">
            <div>Use manual defense <b>rebates</b> calculation</div>
            <Toggle v-model="settings.rebates" />
          </div>
          <div class="flex justify-between gap-4 border-b border-gray-500 border-dotted">
            <div>Hide <b>notification</b> messages by default</div>
            <Toggle v-model="settings.notification" />
          </div>
        </div>
        <h3 class="text-lg text-lime-700 dark:text-lime-400 font-semibold">
          Turn off DLC's by author
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
            :class="[nicknames.includes(name) ? 'text-red-600 dark:text-red-400 font-semibold' : '']"
            :title="nicknames.includes(name) ? 'Patron' : ''"
          />
        </div>
        <h3 class="text-lg text-lime-700 dark:text-lime-400 font-semibold">
          Show these DLC perks regardless of above settings
        </h3>
        <div class="flex gap-2 flex-wrap">
          <Toggle
            v-model="settings.allDLCTypes[0]"
            value="swp"
            label="Specific Waifu Perks"
            class="border border-amber-500 rounded p-0.5"
          />
          <Toggle
            v-model="settings.allDLCTypes[1]"
            value="heritage"
            label="Heritages"
            class="border border-amber-500 rounded p-0.5"
          />
        </div>
      </div>
      <div v-if="tab===1" class="p-1 bg-gray-200 dark:bg-dark-700 flex flex-col gap-2">
        <h3 class="text-lg text-lime-700 dark:text-lime-400 font-semibold w-full">
          Coefficients
        </h3>
        <div class="flex flex-col gap-1">
          <div class="flex justify-between gap-4">
            <div>Capture coefficient (0 means it turned off, current = {{ captureKoeff }})</div>
            <Input v-model.number="manualKf" class="w-12" />
          </div>
          <div class="flex justify-between gap-4">
            <div>Sell coefficient (0 means it turned off, current = {{ sellKoeff }})</div>
            <Input v-model.number="manualSellKf" class="w-12" />
          </div>
          <div class="flex justify-between gap-4">
            <div>Return coefficient (0 means it turned off, current = {{ returnKoeff }})</div>
            <Input v-model.number="manualReturnKf" class="w-12" />
          </div>
        </div>
        <div v-if="manualKf || manualSellKf || manualReturnKf" class="text-red-700 dark:text-red-400">
          Remember that changing any of these values will make your Build illegal.
        </div>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { nicknames } from '~/data/constants'
import {
  DLCgenericPerks, DLChomes, DLCperks, DLCtalents, DLCheritages, DLClureExpansions,
  DLCbindings, DLClures, DLCotherControls, DLCridePerks,
} from '~/data/DLCs'
import { fullHeritagesDLC } from '~/data/heritageDLC'

import { useStore } from '~/store/store'

const { settings, manualKf, manualReturnKf, manualSellKf, sellKoeff, captureKoeff, returnKoeff } = useStore()

const allDLCAuthors = [DLCgenericPerks, DLChomes, DLCperks, DLCtalents, DLCheritages, DLClureExpansions,
  DLCbindings, DLClures, DLCotherControls, DLCridePerks, fullHeritagesDLC].reduce((a, dlc) => {
  dlc.forEach((perk) => { if (!a.includes(perk.dlc)) a.push(perk.dlc) })
  return a
}, [] as string[])

const tab = ref(0)

</script>
