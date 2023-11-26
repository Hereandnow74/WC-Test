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

// const alucard = [
//   6429, 8906143, 2907319, 7270332, 3143399, 3227917, 6522249, 8856909,
//   3607109, 3285881, 7897100, 3814554, 5850797, 1376292, 1440159, 2346833,
//   7562989, 7513392, 5439566, 1485017, 9472523, 7099836, 3102363, 6110616,
//   9627135, 3485794, 4626674, 7719973, 3273945, 7289585, 5002087, 4266409,
//   7780062, 8850555, 2516633, 2840952, 442, 3347166, 3624912, 1861507,
//   7457909, 7648590, 2377655, 7626937, 5363069, 7715665, 6517660, 3953483,
//   1252061, 8212596, 8817015, 6270986, 5733, 6756765, 5365387, 8239936,
//   1842854, 9452596, 7762335, 5437408, 5617796, 3940860, 4675275, 7538743,
//   1317864, 6518442, 7740835, 2537044, 1741448, 623, 4745990, 3372479,
//   5067374, 4670124, 9978451, 5539581, 4893297, 6387550, 292, 1183607,
//   2889301, 6830101, 8114553, 8322951, 1788935, 5265237, 5698252, 3470576,
//   3185460, 4825861, 9337185, 8643197, 5161193, 8509059, 4621939, 9618865,
//   6162302, 5221831, 4082696, 8759175, 5958819, 9245364, 7606251, 3770712,
//   1083141, 7438800, 7039425, 7541610, 5267911, 5267793, 2614469, 4714196,
//   6150176, 7977330, 4732, 4691, 2299125, 2015, 2278127, 6666666,
//   8276511, 8894166, 5115435, 7090983, 6286609, 4433819, 8295417, 6640199,
//   1196100, 5559499, 5823434, 6286469, 538, 2277040, 540, 6324,
//   1818, 1819, 1835, 6343, 2182, 8534, 1936, 364,
//   5906, 392, 399, 5473, 12568, 4711233, 10036, 6537,
//   9724, 6577, 479, 13877, 13889, 13897, 530, 9688674,
//   537, 7657143, 542, 544, 5544, 9702, 9719, 1787,
//   9596, 14189, 8706, 8737, 567, 1092, 1106, 576,
//   4100096, 11473, 11525, 5134459, 1023174, 6480893, 8691695, 6383288,
//   1998, 2004, 2011, 2013, 2006, 4660, 2016, 4653,
//   4667, 4655, 4657, 4684, 4696, 4700, 7038168, 6399518,
//   8714851, 4984916, 5398702, 9309592, 9218624, 6426955, 8468376, 6072581,
//   9712791, 2495447, 4382278, 2624914, 9073881, 7576526, 7192846, 2392849,
//   9275691, 4615502, 7817696, 1985096, 7536077, 5069651, 2828556, 9238840,
//   6928636, 3303164, 2166, 2362206, 555, 3768047, 2708437, 3002506,
//   3352870, 332, 6152783, 3690314, 7871489, 7322142, 1122460, 3775501,
//   6733, 7245404, 5782152, 6777258, 2117548, 4247607, 4493713, 1089148,
//   6281652, 4354804, 5752630, 9824440, 6944446, 345, 5637629, 7620227,
//   2862348, 6305890, 3821854, 8926, 9084643, 5576744, 5780997, 5039258,
//   3936299, 3869032, 368, 1962412, 7264078, 8747212, 4157967, 4345701,
//   8836, 5084329, 4863425, 6073187, 5363359, 3646900, 13816, 5274,
//   9038786, 4351547, 7230411, 9671348, 9210334, 2075, 9129196, 4025468,
//   5599309, 9040131, 6023322, 317, 8471927, 4960728, 2251301, 8582042,
//   7388958, 5455302, 3273412, 1236960, 9269538, 3752995, 1113787, 6103424,
//   3852952, 6486971, 3795431, 3991273, 9891892, 5654927, 1817, 4158915,
//   9625947, 8010038, 367, 7761682, 8593481, 5107713, 10578, 2846290,
//   1577589, 5375899, 6298, 5188155, 3334673, 3124884, 9923996, 7328337,
//   1740439, 8100974, 175, 4099420, 6141, 9782448, 6101, 6406,
//   1417873, 3119243, 7699967, 7273881, 3729817, 3221697, 1776, 1062279,
//   7379555, 6837239, 1251668, 2167827, 9637, 4788403, 9424220, 3081471,
//   2373691, 1529229, 5441178, 6428136, 6384410, 6914279, 4990534, 5161823,
//   4818233, 5006666, 5594960, 3258363, 8536593, 4173906, 8420739, 9868,
//   5660177, 13829, 13874, 9762, 13905, 9841, 5270050, 13944,
//   13847, 6178333, 9892, 13852, 9725, 9869, 9893, 2118,
//   9941, 2117, 2598552, 7614903, 2533770, 13931, 9916, 13945,
//   13870, 2082, 2592151, 9827, 1095008, 9831, 2049, 9942,
//   9764, 9752, 5990301, 13912, 2129, 9917, 9897,
// ]

// function toHumanSpreadsheet() {
//   let result = `${'WORLD	SUB WORLD	NAME	TIER	IMAGE URL	OFFICIAL'}\n`
//   result += allCharsComp.value.filter(x => x.b.includes('F')).reduce((a, x) => a += `${`${x.w}	${x.d}	${x.n}	${x.t}	${x.s || ''}	${x.b ? x.b.includes('C') : false}`}\n`, '')
//   navigator.clipboard.writeText(result)
//   confirmDialog('Successfully copied info to clipboard, now you just need to "paste" it to google spreadsheet', 'info')
// }

// function toHumanSpreadsheet() {
//   let result = `${'WORLD	SUB WORLD	NAME	TIER	IMAGE URL	OFFICIAL'}\n`
//   result += alucard.reduce((a, x) => a += allCharsObject.value[x] ? `${`${allCharsObject.value[x].w}	${allCharsObject.value[x].d}	${allCharsObject.value[x].n}	${allCharsObject.value[x].t}	${allCharsObject.value[x].s || ''}`}\n` : '', '')
//   navigator.clipboard.writeText(result)
//   confirmDialog('Successfully copied info to clipboard, now you just need to "paste" it to google spreadsheet', 'info')
// }

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
  const url = spreadURL.value.split('edit#')[0]
  if (url) {
    fetch(`${url}gviz/tq?tqx=out:json&tq&gid=0`)
      .then(response => response.text())
      .then((data) => {
        const dt = JSON.parse(data.substring(47).slice(0, -2))
        if (dt.table && dt.table.rows)
          dt.table.rows.forEach(row => processRow(row.c))
      })
  }
}

</script>
