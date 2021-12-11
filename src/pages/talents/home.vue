<template>
  <div class="sm:p-2">
    <Desc :desc="homeDesc" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <div class="md:column-count-2 lg:column-count-3 pb-8">
      <PerkCard
        v-for="homePerk in homes"
        :key="homePerk.title"
        :perk="homePerk"
        :bg="homeAvailable(homePerk) ? 'yellow-200 dark:yellow-900 hover:(yellow-100 dark:yellow-800)'
          : 'gray-200 dark:gray-600'"
        :is-active="!!allHomes[homePerk.title]"
        :saved-perk="allHomes[homePerk.title]"
        @pickPerk="chooseHome"
      >
        <template v-if="homePerk.title === 'Sweet Home Expansion'" #title>
          [<span class="text-violet-700 dark:text-violet-400">
            {{ 15.2 * Math.pow(2, allHomes?.[homePerk.title]?.count || 0) }}<sup>2</sup> km
          </span>]
        </template>
      </PerkCard>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { homes, homeDesc } from '~/data/talents'
import { chooseHome, homeAvailable } from '~/logic'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'

const { homePerks } = useStore()

const allHomes = computed(() => {
  const res: any = {}
  homePerks.value.forEach(x => res[x.title] = x)
  return res
})

onMounted(() => useTooltips())

</script>
