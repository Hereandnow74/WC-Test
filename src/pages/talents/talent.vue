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
        :is-active="!!allTalents[talent.title]"
        :saved-perk="allTalents[talent.title]"
        :flavor-list="talent.title === 'Talent Sharing' ? talentsList : []"
        @pickPerk="pickTalent"
      >
        <!-- <template v-if="talent.title === 'Talent Sharing'" #title>
          <Select
            class="text-base inline-block ml-1"
            :options="talentPerks.filter(x=> x.title.includes('Talent')).map(x => ({label:x.title, value:x.title}))"
            @click.stop
          />
        </template> -->
      </component>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { findIndex, intersection } from 'lodash-es'
import { talents, talentsDesc, PerkFull } from '~/data/talents'
import { pickSimplePerk, useTooltips } from '~/logic/misc'
import { Perk, useStore } from '~/store/store'

import PerkCard from '~/components/PerkCard.vue'

const { allEffects, talentPerks, defensePerks } = useStore()

const allTalents = computed(() => {
  const res: any = {}
  talentPerks.value.forEach(x => res[x.title] = x)
  return res
})

const talentsList = computed(() => {
  const shareable = ['Martial Talent', 'Wild Talent', 'Science Talent', 'Engineering Talent', 'Aesthetic Talent',
    'Communication Talent', 'Performance Talent', 'Soul Talent', 'Blessed Talent', 'Psychic Talent',
    'Covert Talent', 'Sticky Fingers']
  return intersection(allEffects.value, shareable).map(x => ({ flavor: x }))
})

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
  pickSimplePerk(tlt, saveData, isAvailable, talentPerks.value)
  // if (isAvailable(tlt)) {
  //   const ind = findIndex(talentPerks.value, { title: tlt.title })
  //   if (ind !== -1) {
  //     const toDel = talentPerks.value.splice(ind)
  //     toDel.forEach(x => allEffects.value.splice(allEffects.value.indexOf(x.title), 1))
  //   }
  //   else {
  //     allEffects.value.push(tlt.title)
  //     talentPerks.value.push(saveData)
  //   }
  // }
}

onMounted(() => useTooltips())

</script>
