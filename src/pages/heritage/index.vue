<template>
  <div class="md:p-2 pb-8">
    <div class="mb-4 max-w-4xl mx-auto">
      <Table
        :headers="['&sum;', 'Tier']"
        :rows="[[4, 4], [16, 5], [38, 6], [80, 7], [160, 8], [380, 9], [800, 10]]"
        class="float-right m-2 mt-4"
      />
      <Desc :desc="desc" class="p-2 bg-violet-200 dark:bg-violet-900" />
    </div>
    <div class="flex gap-4 mx-auto w-max mb-4">
      <div
        v-for="tree in Object.keys(heritageByTree) as 'Dragon'[]"
        :key="tree"
        class="px-2 py-1 border-2 rounded cursor-pointer hover:border-orange-400"
        :class="activeTree === tree ? 'border-orange-400': ''"
        @click="activeTree = tree"
      >
        <h3>{{ tree }}</h3>
        <div>Total perks: <span>{{ heritageByTree[tree].length }}</span></div>
      </div>
    </div>
    <div class="md:column-count-2 lg:column-count-3 pb-8">
      <PerkCard
        :key="heritages[0].title"
        :class="isAvailable(heritages[0]) ? heritageColors[heritages[0].tree]: 'bg-gray-200 dark:bg-gray-600'"
        :perk="heritages[0]"
        :is-available="isAvailable(heritages[0])"
        :is-active="!!allHeritages[heritages[0].title]"
        :saved-perk="allHeritages[heritages[0].title]"
        :increment="true"
        @pickPerk="pickHeritage"
      />
      <PerkCard
        v-for="hr in heritageByTree[activeTree]"
        :key="hr.title"
        :class="isAvailable(hr) ? heritageColors[hr.tree]: 'bg-gray-200 dark:bg-gray-600'"
        :perk="hr"
        :is-available="isAvailable(hr)"
        :is-active="!!allHeritages[hr.title]"
        :saved-perk="allHeritages[hr.title]"
        @pickPerk="pickHeritage"
      >
        <template #title>
          <Select
            v-if="hr.title === 'First Augmentation'"
            v-model="flags.transhumanType"
            :options="['Biomorph', 'Cybermorph', 'Aethermorph']"
            placeholder="Transhuman type"
            class="ml-1"
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
import { findIndex, intersection } from 'lodash'
import { onBeforeRouteUpdate } from 'vue-router'
import { desc, heritages, Heritage } from '~/data/heritage'
import { addFreebies, deleteFreebies, useTooltips } from '~/logic/misc'
import { Perk, useStore } from '~/store/store'
import Select from '~/components/basic/Select.vue'

const { heritage, allEffects, flags } = useStore()
onMounted(() => useTooltips())

// const availableClasses = 'cursor-pointer'
const heritageColors = {
  Dragon: 'bg-purple-200 dark:bg-purple-900 hover:(bg-purple-300 dark:bg-purple-800)',
  Transhuman: 'bg-cyan-200 dark:bg-cyan-900 hover:(bg-cyan-300 dark:bg-cyan-800)',
  Outsider: 'bg-fuchsia-200 dark:bg-fuchsia-900 hover:(bg-fuchsia-300 dark:bg-fuchsia-800)',
  None: 'bg-warm-gray-200 dark:bg-warm-gray-700 hover:(bg-warm-gray-100 dark:bg-warm-gray-800)',
}
const activeTree = ref<'Dragon' | 'Transhuman' | 'Outsider'>('Dragon')

const heritageByTree = computed(() => {
  const res = {
    Dragon: [] as Heritage[],
    Transhuman: [] as Heritage[],
    Outsider: [] as Heritage[],
  }
  heritages.forEach(x => x.tree !== 'None' ? res[x.tree].push(x) : null)
  return res
})

const allHeritages = computed(() => {
  const res: any = {}
  heritage.value.forEach(x => res[x.title] = x)
  return res
})

const params = useUrlSearchParams('history')

if (params.q) activeTree.value = params.q

onBeforeRouteUpdate((to, from, next) => {
  if (to.query.q)
    activeTree.value = to.query.q

  nextTick(next)
})

function isAvailable(hr: Heritage): boolean {
  if (flags.value.noHeritage && !hr.whitelist) { return true }
  else {
    if (intersection(hr.whitelist, allEffects.value).length === hr?.whitelist?.length)
      return true
  }

  return false
}

function pickHeritage(hr: Heritage, saveData: Perk) {
  if (isAvailable(hr)) {
    const ind = findIndex(heritage.value, { title: hr.title })
    if (ind !== -1) {
      if (hr.typeFreebies)
        deleteFreebies(hr.typeFreebies[flags.value.transhumanType])
      if (hr.title === 'First Augmentation') {
        flags.value.isTranshuman = false
        flags.value.transhumanType = undefined
      }
      const toDel = heritage.value.splice(ind)
      toDel.forEach((x) => {
        if (x.freebies) deleteFreebies(x.freebies)
        allEffects.value.splice(allEffects.value.indexOf(x.title), 1)
      })
    }
    else {
      if (hr.title === 'First Augmentation') {
        flags.value.isTranshuman = true
        flags.value.transhumanType = flags.value.transhumanType || 'Biomorph'
        saveData.anything = flags.value.transhumanType
      }
      if (hr.typeFreebies)
        addFreebies(hr.typeFreebies[flags.value.transhumanType])
      allEffects.value.push(hr.title)
      heritage.value.push(saveData)
      if (hr.freebies) addFreebies(hr.freebies)
    }
  }
}

</script>
