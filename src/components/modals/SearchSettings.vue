<template>
  <Modal label="Search Settings">
    <div class="flex flex-col p-1 min-h-0 max-h-[85vh] md:max-h-[88vh] overflow-y-auto scrollbar">
      <div class="flex gap-x-4 gap-y-1 flex-wrap">
        <div class="flex gap-1 flex-wrap">
          Limit Tiers
          <Tiers v-model.number="minTier" />
          -
          <Tiers v-model.number="maxTier" />
        </div>
        <Checkbox
          v-if="currentWorld.worldName !== 'No World'"
          v-model="isLimited"
          :label="`Limit to ${currentWorld.worldName}`"
          class="border rounded px-1 border-gray-300 dark:border-gray-500"
        />
        <Button size="Small" label="Import / Export" @click="toggleImpExpChars" />
      </div>
      <div class="mt-1 flex gap-2 flex-col md:flex-row">
        <Button label="Export local entries to Spreadsheet" size="small" class="px-2" bg-color="bg-green-900" @click="toSpreadsheet" />
        <Button label="Import entries from Spreadsheet" size="small" class="px-2" bg-color="bg-yellow-700" @click="showSpreadEXP = true" />
      </div>
      <h3 class="text-lg font-semibold mt-2 text-orange-700 dark:text-orange-300">
        Black/White list worlds
      </h3>
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
    <ImpExpChars v-if="showImpExpChars" @click="showImpExpChars = false" />
    <Modal v-if="showSpreadEXP" label="Input URL" @click="showSpreadEXP = false">
      <div class="flex flex-col gap-2 p-2">
        <div class="text-lg text-center">
          Note that for the link to work, you need to enable public access to the spreadsheet.
        </div>
        <Input v-model="spreadURL" placeholder="Paste URL to google spreadsheet here" />
        <Button label="Import" size="small" class="px-2" bg-color="bg-yellow-700" @click="fromSpreadsheet" />
      </div>
    </Modal>
  </Modal>
</template>

<script lang="ts" setup>
import { allCompanionsWorlds, useAllChars } from '~/data/constants'
import { showImpExpChars, toggleImpExpChars, blackWhite, blackWhiteDisabled } from '~/logic'
import { confirmDialog } from '~/logic/dialog'
import { useSettings } from '~/logic/searchSettings'
import { useChargenStore } from '~/store/chargen'
import { useStore } from '~/store/store'

const { currentWorld } = useChargenStore()
const { minTier, maxTier, blockedWorlds, isLimited } = useSettings()
const { localUserCharacters } = useStore()
const { allCharsComp, allCharsObject } = useAllChars()

const worldSearch = ref('')
const spreadURL = ref('')
const showSpreadEXP = ref(false)

const allWorldsWithoutBlocked = computed(() => allCompanionsWorlds.value.filter(x => !blockedWorlds.value.includes(x) && x.toLowerCase().includes(worldSearch.value.toLowerCase())).sort((a, b) => a.localeCompare(b)))

function toSpreadsheet() {
  let result = `${'UID	WORLD	SUB WORLD	NAME	TIER	NICKNAME	IMAGE URL	NSFW IMAGE URL	TAGS'}\n`
  result += localUserCharacters.value.reduce((a, x) => a += `${`${x.uid}	${x.world}	${x.sub}	${x.name}	${x.tier}	${x.nickname}	${x.image || ''}	${x.image_nsfw || ''}	${x.tags}`}\n`, '')
  navigator.clipboard.writeText(result)
  confirmDialog('Successfully copied info to clipboard, now you just need to "paste" it to google spreadsheet', 'info')
}

function processRow(row) {
  try {
    const char = {
      uid: row[0] && row[0].v,
      world: row[1] && row[1].v,
      sub: row[2] && row[2].v,
      name: row[3] && row[3].v,
      tier: row[4] && row[4].v,
      nickname: row[5] && row[5].v,
      image: row[6] && (row[6].v || ''),
      image_nsfw: row[7] && (row[7].v || ''),
      tags: row[8] && row[8].v.split(','),
    }
    localUserCharacters.value.push(char)
  }
  catch (error) {
    console.log('Error with: ', row, error)
  }
}

function fromSpreadsheet() {
  const url = spreadURL.value.match(/https:\/\/docs.google.com\/spreadsheets\/d\/[a-zA-Z0-9-_]+/g)
  if (url) {
    fetch(`${url}/gviz/tq?tqx=out:json&tq&gid=0`)
      .then(response => response.text())
      .then((data) => {
        const dt = JSON.parse(data.substring(47).slice(0, -2))
        if (dt.table && dt.table.rows)
          dt.table.rows.forEach(row => processRow(row.c))
      })
  }
}

</script>
