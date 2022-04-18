<template>
  <div class="sm:p-2">
    <Desc :desc="talentsDesc" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <div
      class="column-gap pb-8"
      :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
    >
      <PerkCard
        v-for="perk in perks"
        :key="perk.title"
        :perk="perk"
        :saved-perk="allPerks[perk.title]"
        :bg="miscAvailable(perk) ? 'light-blue-200 dark:light-blue-900 hover:(light-blue-100 dark:light-blue-800)'
          : 'gray-200 dark:gray-600'"
        :is-active="!!allPerks[perk.title]"
        @pickPerk="choosePerk"
      ></PerkCard>
    </div>
    <template v-if="perksDLC.length">
      <h2 class="text-2xl text-center">
        DLC Other perks
      </h2>
      <DLCNote />
      <div
        class="column-gap pb-8"
        :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
      >
        <PerkCard
          v-for="perk in perksDLC"
          :key="perk.title"
          :perk="perk"
          :saved-perk="allPerks[perk.title]"
          :bg="miscAvailable(perk) ? 'light-blue-200 dark:light-blue-900 hover:(light-blue-100 dark:light-blue-800)'
            : 'gray-200 dark:gray-600'"
          :is-active="!!allPerks[perk.title]"
          @pickPerk="choosePerk"
        ></PerkCard>
      </div>
    </template>
  </div>
</template>

<script lang='ts' setup>
import { talentsDesc } from '~/data/talents'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'
import { choosePerk, miscAvailable } from '~/logic'
import { DLCperks } from '~/data/DLCs'
import { useFullPerks } from '~/logic/localPerks'

const { miscPerks, settings } = useStore()
const { perks } = useFullPerks()

const allPerks = computed(() => {
  const res: any = {}
  miscPerks.value.forEach(x => res[x.title] = x)
  return res
})

const perksDLC = computed(() => !settings.value.allChosenAuthors[0]
  ? DLCperks.filter(perk => !settings.value.allChosenAuthors.includes(perk.dlc))
  : [])

onMounted(() => useTooltips())

</script>
