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
        @pickPerk="pickTalent"
      >
        <template v-if="talent.title === 'Talent Sharing'" #title>
          <Select
            class="text-base inline-block ml-1"
            :options="talentPerks.filter(x=> x.title.includes('Talent')).map(x => ({name:x.title, value:x.title}))"
            @click.stop
          />
        </template>
      </component>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { findIndex, intersection } from 'lodash-es'
import { talents, talentsDesc, PerkFull } from '~/data/talents'
import { useTooltips } from '~/logic/misc'
import { Perk, useStore } from '~/store/store'

import PerkCard from '~/components/PerkCard.vue'

const { allEffects, talentPerks, defensePerks } = useStore()

function isAvailable(tlt: PerkFull): boolean {
  if (!tlt.whitelist) { return true }
  else {
    if (intersection(tlt.whitelist, allEffects.value).length >= (tlt.needed || tlt.whitelist.length))
      return true
    if (tlt.title === 'Inexhaustible'
          && findIndex(talentPerks.value, { title: tlt.whitelist[0] }) !== -1
          && findIndex(defensePerks.value, { title: 'Soul Defense', count: 2 }) !== -1)
      return true
  }

  return false
}

function pickTalent(tlt: PerkFull, saveData: Perk) {
  if (isAvailable(tlt)) {
    const ind = findIndex(talentPerks.value, { title: tlt.title })
    if (ind !== -1) {
      const toDel = talentPerks.value.splice(ind)
      toDel.forEach(x => allEffects.value.splice(allEffects.value.indexOf(x.title), 1))
    }
    else {
      allEffects.value.push(tlt.title)
      talentPerks.value.push(saveData)
    }
  }
}

onMounted(() => useTooltips())

</script>
