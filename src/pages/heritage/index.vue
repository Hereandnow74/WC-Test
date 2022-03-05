<template>
  <div class="sm:p-2 pb-8">
    <div class="mb-4 max-w-4xl mx-auto">
      <Table
        :headers="['&sum;', 'Tier']"
        :rows="heritageTiers"
        class="float-right m-2 mt-4"
      />
      <Desc :desc="desc" class="p-2 bg-violet-200 dark:bg-violet-900" />
    </div>
    <div class="flex gap-x-4 gap-y-2 gap flex-wrap justify-center mb-4">
      <div
        v-for="tree in Object.keys(heritageByTree) as 'Dragon'[]"
        :key="tree"
        class="px-2 py-1 border-2 rounded cursor-pointer hover:border-orange-400"
        :class="activeTree === tree ? 'border-orange-400': ''"
        @click="activeTree = tree"
      >
        <h3>{{ tree }}</h3>
        <div>Total perks: <span v-if="heritageCounts[tree]">{{ heritageCounts[tree] }} /</span> <span>{{ heritageByTree[tree].length }}</span></div>
      </div>
    </div>
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
        :class="heritageAvailable(hr) ? heritageColors[hr.tree]: 'bg-gray-200 dark:bg-gray-600'"
        :perk="hr"
        :is-active="!!allHeritages[hr.title]"
        :saved-perk="allHeritages[hr.title]"
        @pickPerk="chooseHeritage"
      >
        <template #title>
          <Select
            v-if="hr.title === 'First Augmentation'"
            v-model="flags.transhumanType"
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
          <h6 v-if="hr.tree !== 'None'" class="text-center font-sm text-gray-600 dark:text-gray-400">
            (<span>{{ hr.tree }}</span>
            <span v-if="flags.isTranshuman && hr.tree === 'Transhuman'"> - {{ flags.transhumanType }}</span>)
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
  </div>
</template>

<script lang='ts' setup>

import { onBeforeRouteUpdate } from 'vue-router'
import { isArray, mergeWith, countBy } from 'lodash-es'
import { desc, heritages, Heritage } from '~/data/heritage'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'
import Select from '~/components/basic/Select.vue'
import { chooseHeritage, heritageAvailable } from '~/logic'
import { heritageTiers } from '~/data/constants'
import { DLCheritages } from '~/data/DLCs'

const { heritage, flags, settings } = useStore()

// const availableClasses = 'cursor-pointer'
const heritageColors = {
  Dragon: 'bg-purple-200 dark:bg-purple-900 hover:(bg-purple-300 dark:bg-purple-800)',
  Transhuman: 'bg-cyan-200 dark:bg-cyan-900 hover:(bg-cyan-300 dark:bg-cyan-800)',
  Outsider: 'bg-fuchsia-200 dark:bg-fuchsia-900 hover:(bg-fuchsia-300 dark:bg-fuchsia-800)',
  None: 'bg-warm-gray-200 dark:bg-warm-gray-700 hover:(bg-warm-gray-100 dark:bg-warm-gray-800)',
}
const activeTree = ref<'Dragon' | 'Transhuman' | 'Outsider'>('Dragon')

const heritagesDLC = computed(() => !settings.value.allChosenAuthors[0]
  ? heritages
    .concat(DLCheritages
      .filter(perk => !settings.value.allChosenAuthors.includes(perk.dlc)))
  : heritages)

const heritageByTree = computed(() => {
  const res = {
    Dragon: [] as Heritage[],
    Transhuman: [] as Heritage[],
    Outsider: [] as Heritage[],
  }
  heritagesDLC.value.forEach(x => x.tree !== 'None' ? res[x.tree].push(x) : null)
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
  Object.entries(heritageCounts.value).forEach((x) => { if (x[1]) activeTree.value = x[0] })

onMounted(() => useTooltips())

watch(activeTree, useTooltips, { flush: 'p' })

onBeforeRouteUpdate((to, from, next) => {
  if (to.query.q)
    activeTree.value = to.query.q

  nextTick(next)
})

function pickSingularityType(type: string, perk: any) {
  const allHrWFr = heritages.filter(x => x.typeFreebies)
  const fr = {}
  mergeWith(fr, ...allHrWFr.map(x => x.typeFreebies[type]), (a, b) => { if (isArray(a)) return a.concat(b) })
  perk.freebies = fr
}
</script>
