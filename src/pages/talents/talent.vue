<template>
  <div class="md:p-2">
    <Desc :desc="talentsDesc" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <div class="md:column-count-2 lg:column-count-3 pb-8">
      <component
        :is="PerkCard"
        v-for="talent in talents"
        :key="talent.title"
        :perk="talent"
        :bg="isAvailable(talent) ? 'green-200 dark:green-900 hover:(green-100 dark:green-800)'
          : 'gray-200 dark:gray-600'"
        :is-available="isAvailable(talent)"
        :is-active="findIndex(talentPerks, {title: talent.title}) !== -1"
        @pickPerk="pickTalent(talent)"
      >
        <template v-if="talent.title === 'Talent Sharing'" #title>
          <Select class="inline-block" :options="talentPerks.map(x => ({name:x.title, value:x.title}))" @click.stop />
        </template>
        <template v-else-if="['OC Donut Steel', 'Template Stacking I', 'Template Stacking II'].includes(talent.title)" #title>
          <Input placeholder="Power name" class="inline-block w-32 text-base" @click.stop />
          <Select placeholder="For whom" class="inline-block text-base" :options="targetList" @click.stop />
        </template>
        <template v-else-if="['Advanced Template Stacking (Arcane)', 'Advanced Template Stacking (Enlightened)', 'Advanced Template Stacking (Green)'].includes(talent.title)" #title>
          <Select placeholder="For whom" class="inline-block text-base" :options="targetList" @click.stop />
        </template>
      </component>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { findIndex, intersection } from 'lodash-es'
import { talents, talentsDesc, Talent } from '~/data/talents'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'

import PerkCard from '~/components/PerkCard.vue'

const targetList = ref([{ name: 'You', value: 'You' }])

const { allEffects, talentPerks, companions } = useStore()

companions.value.forEach(x => targetList.value.push({ name: x.name, value: x.name }))

function isAvailable(tlt: Talent): boolean {
  if (!tlt.whitelist) { return true }
  else {
    if (intersection(tlt.whitelist, allEffects.value).length >= (tlt.needed || tlt.whitelist.length))
      return true
  }

  return false
}

function pickTalent(tlt: Talent) {
  if (isAvailable(tlt)) {
    if (allEffects.value.includes(tlt.title)) {
      const heritageToDelete = talentPerks.value.splice(findIndex(talentPerks.value, { title: tlt.title }))
      heritageToDelete.forEach(x => allEffects.value.splice(allEffects.value.indexOf(x.title), 1))
    }
    else {
      allEffects.value.push(tlt.title)
      talentPerks.value.push({ title: tlt.title, cost: tlt.cost })
    }
  }
}

onMounted(() => useTooltips())

</script>
