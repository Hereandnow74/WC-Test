<template>
  <div class="sm:p-2">
    <Desc :desc="talentsDesc" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <div class="md:column-count-2 lg:column-count-3 pb-8">
      <PerkCard
        v-for="talent in talentsDLC"
        :key="talent.title"
        :perk="talent"
        :bg="talentAvailable(talent) ? 'green-200 dark:green-900 hover:(green-100 dark:green-800)'
          : 'gray-200 dark:gray-600'"
        :is-active="!!allTalents[talent.title]"
        :saved-perk="allTalents[talent.title]"
        :flavor-list="talent.title === 'Talent Sharing' ? talentsList : []"
        @pickPerk="chooseTalent"
      />
    </div>
  </div>
</template>

<script lang='ts' setup>
import { intersection } from 'lodash-es'
import { talents, talentsDesc } from '~/data/talents'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'

import PerkCard from '~/components/PerkCard.vue'
import { chooseTalent, isDLC, talentAvailable } from '~/logic'
import { DLCtalents } from '~/data/DLCs'

const { allEffects, talentPerks } = useStore()

const allTalents = computed(() => {
  const res: any = {}
  talentPerks.value.forEach(x => res[x.title] = x)
  return res
})

const talentsDLC = computed(() => isDLC.value ? talents.concat(DLCtalents) : talents)

const talentsList = computed(() => {
  const shareable = ['Martial Talent', 'Wild Talent', 'Science Talent', 'Engineering Talent', 'Aesthetic Talent',
    'Communication Talent', 'Performance Talent', 'Soul Talent', 'Blessed Talent', 'Psychic Talent',
    'Covert Talent', 'Sticky Fingers']
  return intersection(allEffects.value, shareable).map(x => ({ flavor: x }))
})
onMounted(() => useTooltips())

</script>
