<template>
  <div class="sm:p-2 pb-8">
    <div class="mb-4 max-w-4xl mx-auto">
      <Desc :desc="desc" class="p-2 bg-violet-200 dark:bg-violet-900" />
    </div>
    <div class="flex gap-x-4 gap-y-2 gap flex-wrap justify-center mb-4">
      <template
        v-for="tree in Object.keys(heritageByTree) as 'Dragon'[]"
        :key="tree"
      >
        <div
          v-if="heritageByTree[tree].length"
          class="px-2 py-1 border-2 rounded cursor-pointer hover:border-orange-400"
          :class="activeTree === tree ? 'border-orange-400': ''"
          @click="activeTree = tree"
        >
          <h3>{{ tree }}</h3>
          <div>Total perks: <span v-if="heritageCounts[tree]">{{ heritageCounts[tree] }} /</span> <span>{{ heritageByTree[tree].length }}</span></div>
        </div>
      </template>
    </div>
    <Note v-if="['Mastermind', 'Psychopomp', 'Wendigo'].includes(activeTree)" class="max-w-4xl mx-auto mb-4" type="warning" title="DLC Heritage">
      <div>This heritage is a DLC, you can leave a feedback for it on <a class="text-blue-500 underline" href="https://discord.gg/cZf4U5rmPV" target="_blank" rel="noopener noreferrer">discord</a></div>
    </Note>
    <div class="hidden column-count-2 column-count-3 column-count-4 column-count-5"></div>
    <div
      class="column-gap pb-8"
      :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
    >
      <PerkCard
        :key="heritages[0].title"
        :class="heritageAvailable(heritages[0]) ? heritageColors[heritages[0].tree]: 'bg-gray-200 dark:bg-gray-600'"
        :perk="heritages[0]"
        :is-active="!!allHeritages[heritages[0].title]"
        :saved-perk="allHeritages[heritages[0].title]"
        :increment="true"
        @pickPerk="chooseHeritage"
      />
      <PerkCard
        v-for="hr in heritageByTree[activeTree]"
        :key="hr.title"
        :class="heritageAvailable(hr) ? heritageColors[hr.tree] || heritageColors['None']: 'bg-gray-200 dark:bg-gray-600'"
        :perk="hr"
        :is-active="!!allHeritages[hr.title]"
        :saved-perk="allHeritages[hr.title]"
        @pickPerk="chooseHeritage"
      >
        <template #title>
          <Select
            v-if="hr.title === 'First Augmentation'"
            v-model="flags.transhumanType"
            :disabled="!!allHeritages[hr.title]"
            :options="['Biomorph', 'Cybermorph', 'Aethermorph']"
            placeholder="Transhuman type"
            class="ml-1 text-base"
            @click.stop
          />
          <AnythingInput
            v-if="['Singularity', 'Ascendant Human'].includes(hr.title)"
            :list="['Biomorph', 'Cybermorph', 'Aethermorph'].filter(x => x !== flags.transhumanType)"
            placeholder="Transhuman type"
            class="ml-1 text-base"
            @update:model-value="pickSingularityType($event, hr)"
            @click.stop
          />
        </template>
        <template #rules>
          <h6 v-if="flags.isTranshuman && hr.tree === 'Transhuman'" class="text-center font-sm text-gray-600 dark:text-gray-400">
            <span> ({{ flags.transhumanType }})</span>
          </h6>
        </template>
        <template #underDesc>
          <Foldable
            v-for="type, key in hr.types"
            :key="key"
            :title="key"
            class="px-2"
            :is-open="flags.transhumanType === key"
            @click.stop
          >
            <Desc :desc="type" class="p-0" />
          </Foldable>
        </template>
      </PerkCard>
    </div>
    <template v-if="heritagesDLC.length">
      <h2 class="text-2xl text-center">
        DLC Heritage Perks
      </h2>
      <DLCNote />
      <div
        class="column-gap pb-8"
        :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
      >
        <PerkCard
          v-for="hr in heritagesDLC"
          :key="hr.title"
          :class="heritageAvailable(hr) ? heritageColors[hr.tree]: 'bg-gray-200 dark:bg-gray-600'"
          :perk="hr"
          :is-active="!!allHeritages[hr.title]"
          :saved-perk="allHeritages[hr.title]"
          @pickPerk="chooseHeritage"
        >
        </PerkCard>
      </div>
    </template>
  </div>
</template>

<script lang='ts' setup>

import { onBeforeRouteUpdate } from 'vue-router'
import { isArray, mergeWith, countBy } from 'lodash-es'
import { PerkFull } from 'global'
import { desc, Heritage } from '~/data/heritage'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'
import Select from '~/components/basic/Select.vue'
import { chooseHeritage, heritageAvailable } from '~/logic'
import { DLCheritages } from '~/data/DLCs'
import { useFullPerks } from '~/logic/localPerks'
import { fullHeritagesDLC } from '~/data/heritageDLC'

const { heritage, flags, settings } = useStore()
const { heritages } = useFullPerks()

const heritageColors = {
  Dragon: 'bg-purple-200 dark:bg-purple-900 hover:(bg-purple-300 dark:bg-purple-800)',
  Transhuman: 'bg-cyan-200 dark:bg-cyan-900 hover:(bg-cyan-300 dark:bg-cyan-800)',
  Outsider: 'bg-fuchsia-200 dark:bg-fuchsia-900 hover:(bg-fuchsia-300 dark:bg-fuchsia-800)',
  None: 'bg-warm-gray-200 dark:bg-warm-gray-800 hover:(bg-warm-gray-100 dark:bg-warm-gray-900)',
}
const activeTree = ref<'Dragon' | 'Transhuman' | 'Outsider'>('Dragon')

const heritagesDLC = computed(() => !settings.value.allChosenAuthors[0]
  ? DLCheritages.filter(perk => !settings.value.allChosenAuthors.includes(perk.dlc))
  : [])

const heritagesDLC2 = computed(() => !settings.value.allChosenAuthors[0] || settings.value.allDLCTypes[1]
  ? fullHeritagesDLC.filter(perk => !settings.value.allChosenAuthors.includes(perk.dlc))
  : [])

const heritageByTree = computed(() => {
  const res = {
    // Dragon: [] as Heritage[],
    // Transhuman: [] as Heritage[],
    // Outsider: [] as Heritage[],
    // Other: [] as Heritage[],
  } as Record<string, PerkFull[]>
  [...heritages.value, ...heritagesDLC2.value].slice(1).forEach(x => x.tree ? res[x.tree] ? res[x.tree].push(x) : res[x.tree] = [x] : res.Other ? res.Other.push(x) : res.Other = [x])
  return res
})

const allHeritages = computed(() => {
  const res: any = {}
  heritage.value.forEach(x => res[x.title] = x)
  return res
})

const heritageCounts = computed(() => countBy(heritage.value, x => x.tree))

const params = useUrlSearchParams('history')

if (params.q) activeTree.value = params.q
else
  Object.entries(heritageCounts.value).forEach((x) => { if (x[1] && x[0] !== 'None') activeTree.value = x[0] })

onMounted(() => useTooltips())

watch(activeTree, useTooltips, { flush: 'post' })

onBeforeRouteUpdate((to, from, next) => {
  if (to.query.q)
    activeTree.value = to.query.q

  nextTick(next)
})

// TODO: Check this code for potential bugs
function pickSingularityType(type: string, perk: any) {
  const allHrWFr = heritages.value.filter(x => x.typeFreebies)
  const fr = {}
  mergeWith(fr, ...allHrWFr.map(x => x.typeFreebies[type]), (a, b) => { if (isArray(a)) return a.concat(b) })
  perk.freebies = fr
}
</script>
