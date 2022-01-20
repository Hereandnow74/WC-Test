<template>
  <div class="sm:p-2">
    <Desc :desc="homeDesc" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <div
      class="column-gap pb-8"
      :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
    >
      <PerkCard
        v-for="homePerk in homesDLC"
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
import { DLChomes } from '~/data/DLCs'
import { homes, homeDesc } from '~/data/talents'
import { chooseHome, homeAvailable } from '~/logic'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'

const { homePerks, settings } = useStore()

const homesDLC = computed(() => !settings.value.allChosenAuthors[0]
  ? homes
    .concat(DLChomes
      .filter(perk => !settings.value.allChosenAuthors.includes(perk.dlc)))
  : homes)

const allHomes = computed(() => {
  const res: any = {}
  homePerks.value.forEach(x => res[x.title] = x)
  return res
})

onMounted(() => useTooltips())

</script>
