<template>
  <div class="p-0.5 sm:p-2 w-full">
    <Desc class="max-w-screen-md mx-auto dark:bg-gray-800 bg-blue-gray-300 rounded" :desc="difficultyRules" />

    <h3 class="text-center text-lg font-bold mt-4">
      Values affected by Intensity
    </h3>

    <div class="overflow-x-auto max-w-min mx-auto mb-4">
      <table class="border-collapse w-max bg-amber-200 text-gray-600 min-w-0">
        <thead>
          <th v-for="header in ['', 'Tier 1', 'Tier 2', 'Tier 3', 'Tier 4', 'Tier 5', 'Tier 6', 'Tier 7', 'Tier 8', 'Tier 9', 'Tier 10' ]" :key="header" class="border border-gray-600 px-2 font-bold">
            {{ header }}
          </th>
        </thead>
        <tbody>
          <tr v-for="row in [captureRow, sellRow, captureExtraRow]" :key="row[0]" class="odd:(bg-black bg-opacity-5)">
            <td
              v-for="value in row"
              :key="value"
              class="border border-gray-600 px-2 first:(font-bold)"
              :class="typeof value === 'object' ? value[1] : ''"
            >
              {{ typeof value === 'object' ? value[0] : value }}
            </td>
          </tr>
          <tr class="odd:(bg-black bg-opacity-5)">
            <td
              v-for="value in ['', 'TX', 'TY', 'TZ']"
              :key="value"
              colspan="2"
              class="border border-gray-600 px-2 font-bold"
              :class="typeof value === 'object' ? value[1] : ''"
            >
              {{ typeof value === 'object' ? value[0] : value }}
            </td>
          </tr>
          <tr v-for="row in [combinedIMGCapture, combinedIMGSell]" :key="row[0]" class="odd:(bg-black bg-opacity-5)">
            <td
              v-for="value in row"
              :key="value"
              colspan="2"
              class="border border-gray-600 px-2 first:(font-bold)"
              :class="typeof value === 'object' ? value[1] : ''"
            >
              {{ typeof value === 'object' ? value[0] : value }}
            </td>
          </tr>
          <tr class="odd:(bg-black bg-opacity-5)">
            <td
              v-for="value in ['', 'DR 1', 'DR 2', 'DR 3', 'DR 4', 'DR 5', 'DR 6', 'DR 7', 'DR 8', 'DR 9', 'DR 10']"
              :key="value"
              class="border border-gray-600 px-2 font-bold"
              :class="typeof value === 'object' ? value[1] : ''"
            >
              {{ typeof value === 'object' ? value[0] : value }}
            </td>
          </tr>
          <tr class="odd:(bg-black bg-opacity-5)">
            <td
              v-for="value in worldDifficultyRow"
              :key="value"
              class="border border-gray-600 px-2 first:(font-bold)"
              :class="typeof value === 'object' ? value[1] : ''"
            >
              {{ typeof value === 'object' ? value[0] : value }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3 class="text-2xl font-semibold text-center">
      Quick Intensity Settings
    </h3>
    <div class="flex gap-8 flex-wrap mx-auto md:px-10 justify-center">
      <template v-for="diff, n in difficultySliders" :key="n">
        <Range
          v-if="diff.list.length > 1"
          :title="typeTitles[n]"
          :icon="typeIcons[n]"
          :list="diff.list"
          :titles="diff.titles"
          :type="n"
          @input="(event)=> chooseQuick(event.target.value, diff)"
        />
      </template>
    </div>
    <div class="flex gap-2 justify-center flex-wrap mx-auto md:px-10 my-6 font-semibold">
      <template v-for="diff, n in difficultySliders" :key="n">
        <Toggle
          v-if="diff.list.length === 1"
          :value="allEffects.includes(diff.titles[0])"
          :label="`${diff.titles[0]} [${diff.list[0] > 0 ? '+'+diff.list[0] : diff.list[0]}]`"
          @input="()=> chooseQuick(0, diff)"
          @change="()=> chooseQuick(0, diff)"
          @click="()=> chooseQuick(0, diff)"
        />
      </template>
    </div>
    <div
      class="mt-4 column-gap"
      :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
    >
      <div v-for="rule in difficultyOptions" :key="rule.uid" class="column-block">
        <div v-if="ruleTitle[rule.uid]" class="text-xl text-center font-semibold leading-loose flex gap-4 justify-center items-center my-1 select-none" @click="hideOrShowCategory(rule.type)">
          {{ ruleTitle[rule.uid] }} <span class="text-gray-700 dark:text-gray-500 iconify h-7 w-7 cursor-pointer hover:(text-orange-600 dark:text-orange-400)" :data-icon="!hiddenCategories.includes((rule.type.match(/\d+$/) ? rule.type.slice(0, -1) : rule.type)) ? 'mdi:arrow-collapse-up' : 'mdi:arrow-collapse-down'"></span>
        </div>
        <div v-if="rule.type === 'random1' && !hiddenCategories.includes('random')" class="dark:bg-gray-800 bg-blue-gray-300 rounded p-2 mb-2">
          All randomizer options are mutually compatible. Randomizers that do not affect intensity have a 1% chance of applying to any new world visited (after a contractor’s starting world) even if they are not chosen. This applies separately for each randomizer.
        </div>

        <DifficultyCard
          v-if="!hiddenCategories.includes((rule.type.match(/\d+$/) ? rule.type.slice(0, -1) : rule.type))"
          :id="rule.title"
          :perk="rule"
          :is-active="difficulties.findIndex((x) => x.uid === rule.uid) !== -1"
        />
      </div>
      <div class="text-lg text-center font-semibold leading-loose">
        Utility
      </div>
      <DR11
        :id="drx.title"
        :perk="drx"
        :is-active="allEffects.includes(drx.title)"
        @chooseIntensity="chooseDifficulty"
      />
      <DifficultyCard
        :perk="legacy"
        :is-active="difficulties.findIndex((x) => x.uid === legacy.uid) !== -1"
        :bg="difficultyAvailable(legacy) ? 'blue-100 dark:gray-700 hover:blue-200 dark:hover:gray-800' : 'gray-200 dark:gray-500'"
        @pickPerk="chooseDifficulty(legacy)"
      />
      <PerkCard
        :perk="buybackIntensity"
        :is-active="difficulties.findIndex((x) => x.uid === buybackIntensity.uid) !== -1"
        :bg="difficultyAvailable(buybackIntensity) ? 'blue-100 dark:gray-700 hover:blue-200 dark:hover:gray-800' : 'gray-200 dark:gray-500'"
        @pickPerk="(perk, obj) => pickSimplePerk(buybackIntensity, obj, difficultyAvailable, difficulties)"
      />
      <DifficultyCard
        :perk="customIntensity"
        :is-active="difficulties.findIndex((x) => x.uid === customIntensity.uid) !== -1"
        :bg="difficultyAvailable(customIntensity) ? 'blue-100 dark:gray-700 hover:blue-200 dark:hover:gray-800' : 'gray-200 dark:gray-500'"
        @pickPerk="chooseDifficulty(customIntensity)"
      >
        <template #intensity>
          <NumberInput v-model="customIntensity.intensity" :min="-100" @click.stop />
        </template>
      </DifficultyCard>
    </div>
    <div v-if="!settings.allChosenAuthors[0]">
      <div class="text-2xl text-center my-4">
        DLC Intensities
      </div>
      <Note type="warning" title="Warning" class="max-w-[600px] mx-auto">
        Some of the DLC intensities are considered to be cheats. Use at your own risk.
      </Note>
      <div class="text-lg max-w-[800px] mx-auto flex flex-col gap-1 mt-2">
        <a class="hover:underline text-blue-800 dark:text-blue-400" href="https://docs.google.com/document/d/1lKz-xLdUFiCkG7SPcByqSACnDxRp0cl7mwNHREY4mvU/edit?usp=sharing" target="_blank" rel="noopener noreferrer">Despin Intensity List</a>
        <a class="hover:underline text-blue-800 dark:text-blue-400" href="https://docs.google.com/document/d/1gzg7-xn6pP5TOhQERiChPVtJ4sw02xusIycQvFj7QvE/edit?usp=sharing" target="_blank" rel="noopener noreferrer">Rhivan Intensity List</a>
      </div>
      <div class="bg-gray-300 dark:bg-true-gray-800 rounded max-w-[800px] text-center mx-auto p-2 my-2">
        You can add DLC intensities from the lists above manually by using the form below, just input their title and Intensity modifier, then click add.
      </div>
      <div class="flex gap-2 mx-auto w-max mb-8">
        <Input v-model="customDLCintensity.title" placeholder="Title of Intensity Perk" />
        <Input v-model.number="customDLCintensity.intensity" class="w-28" label="Intensity" />
        <Button size="small" label="Add" class="px-4" bg-color="bg-purple-700" @click="addDLCIntensity" />
      </div>
      <div class="max-w-[800px] flex gap-2 flex-wrap mx-auto mb-8">
        <div v-for="perk in difficulties.filter(perk => perk.type && perk.type.startsWith('dlc'))" :key="perk.uid" class="rounded flex gap-2 px-2 py-1" bg="blue-100 dark:gray-700 hover:blue-200 dark:hover:gray-800">
          <div><b>Title:</b> {{ perk.title }}</div>
          <div><b>Intensity:</b> {{ perk.intensity }}</div>
          <Button size="small" label="Delete" class="px-4" bg-color="bg-red-700" @click="difficulties.splice(findIndex(difficulties, {uid: perk.uid}), 1)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { find, findIndex } from 'lodash-es'
import { difficultyOptions, difficultyRules } from '~/data/difficulty'
import { randomString, useTooltips } from '~/logic/misc'
import { difficultyAvailable, chooseDifficulty, pickSimplePerk } from '~/logic/perksLogic'
import { useStore } from '~/store/store'
import { useDifficulty } from '~/store/difficulty'

const { settings, difficulties, allEffects } = useStore()
const {
  worldDifficultyRow,
  captureRow,
  captureExtraRow,
  sellRow,
  combinedIMGCapture,
  combinedIMGSell,
} = useDifficulty()

const hiddenCategories = useStorage<String[]>('difficultyCategories', [])

let savedType = ''
const typeTitles = {
  legacy: 'Legacy',
  team: 'Team',
  payment: 'Payment',
  binding: 'Bindings',
  heritage: 'Heritages',
  home: 'Personal World',
  template: 'Template',
  defenses: 'Defenses',
  leveling: 'Leveling',
  worlds: 'Worlds',
  warranty: 'Warranty',
  death: 'Death',
  random: 'Random',
  other: 'Misc',
}

const typeIcons = {
  legacy: 'ic:outline-details',
  team: 'ic:outline-group',
  payment: 'ic:outline-credit-card',
  binding: 'game-icons:crossed-chains',
  heritage: 'game-icons:dragon-head',
  home: 'ic:outline-home',
  template: 'ic:baseline-radio-button-unchecked',
  defenses: 'ic:outline-security',
  leveling: 'ic:outline-trending-up',
  worlds: 'ic:outline-public',
  warranty: 'ic:outline-shield',
  death: 'game-icons:tombstone',
  random: 'ic:outline-casino',
  other: 'ic:outline-more-horiz',
}

const customIntensity = reactive({
  uid: '9Vaf1',
  title: 'Custom Intensity',
  image: 'https://i.imgur.com/5BE6VJUl.jpg',
  intensity: 1,
  desc: `An Utility perk to adjust intensity in case you use some DLC or Homebrew options.
  `,
  category: 'difficulty',
  type: 'utility',
})

const customDLCintensity = reactive({
  uid: '',
  title: '',
  image: '',
  intensity: 1,
  desc: '',
  category: 'difficulty',
  type: 'dlc',
})

function addDLCIntensity() {
  customDLCintensity.uid = randomString(5)
  customDLCintensity.type = `dlc${randomString(5)}`
  chooseDifficulty(customDLCintensity)
}

const buybackIntensity = {
  uid: 'Wkf12',
  title: 'Buyback',
  image: 'https://i.imgur.com/jzSX3Dpl.jpg',
  desc: 'Once you’ve been an active contractor for six months (180 days), you will earn the ability to pay off all difficulty settings that add intensity, to a minimum of +0 in each category. This will remove the difficulty effect, without lowering the values of your captures and sales. The fee for this is 500 credits per point of intensity, plus an additional 500 credits per point you’ve previously paid off: 500, 1,000, 1,500, 2,000, etc. If you pay off multiple intensity points at once, each point will be counted separately.',
  category: 'difficulty',
  type: 'utility2',
  intensity: 0,
  cost: 500,
  increment: true,
  multiple: true,
  max: 100,
  min: 1,
}

const drx = {
  uid: 'jUgfe',
  title: 'DRX start',
  image: 'https://i.ibb.co/XVm9GqG/DRX-Start2.jpg',
  intensity: 10,
  special: 'Chargen only',
  chargen: true,
  blacklist: ['Cash Still Rules', 'Wage Slave', 'Couple’s Account (Cooperative)'],
  desc: `Danger Rating 11 build's have special <a @click.stop href="/#danger11" class="text-cyan-500 hover:text-cyan-600 underline">rules</a>
  <p>This perk does not modify starting world in any way all the danger comes from mandatory TX or TY companion of your choice, while Company guarantee that they will not kill you outright, how obedient they are completely depends on chosen companion and your perks.</p>
  `,
}

const legacy = {
  uid: '9VaF7',
  title: 'Legacy Difficulty',
  dlc: 'Om1cr0n',
  image: 'https://i.imgur.com/uTx4YCOl.jpg',
  intensity: 0,
  desc: `Your capture/sale values are set to 60%/20% of the listed price and you get a standard budget, the same as on Intensity 1. <b>Ignore</b> the values displayed by the table above and the rest of this section.
    <p>Legacy refers to previous versions of the Waifu Catalog. If you're unfаmiliar with how they worked, either give them a read or skip using this option.</p>
    `,
  category: 'difficulty',
  type: 'legacy',
  capture: 0.60,
  sell: 0.20,
}

const difficultySliders = computed(() => {
  return difficultyOptions.reduce((a, x) => {
    if (a[x.type]) {
      a[x.type].list.push(x.intensity)
      a[x.type].titles.push(x.title)
      a[x.type].uids.push(x.uid)
    }
    else { a[x.type] = { list: [x.intensity], titles: [x.title], uids: [x.uid] } }
    return a
  }, {} as Record<string, object>)
})

const ruleTitle = computed(() => {
  return difficultyOptions.reduce((a, x) => {
    a[x.uid] = displayTitle(x)
    return a
  }, {} as Record<string, string>)
})

function displayTitle(rule) {
  if (rule.type !== savedType && rule.type.slice(0, -1) !== savedType.slice(0, -1)) {
    savedType = rule.type
    return typeTitles[rule.type] || typeTitles[rule.type.slice(0, -1)]
  }
  else { return '' }
}

onMounted(() => {
  useTooltips()
})

function chooseQuick(value, diff) {
  const difficulty = find(difficultyOptions, { uid: diff.uids[value] })
  if (difficulty)
    chooseDifficulty(difficulty)
}

function hideOrShowCategory(type: string) {
  // If type ends on any number, remove it
  if (type.match(/\d+$/)) type = type.slice(0, -1)
  if (hiddenCategories.value.includes(type)) hiddenCategories.value = hiddenCategories.value.filter(x => x !== type)
  else hiddenCategories.value.push(type)
}

</script>
