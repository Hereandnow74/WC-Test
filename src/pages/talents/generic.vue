<template>
  <div ref="waifuList" class="flex flex-col gap-2 pb-8 sm:p-2">
    <Desc :desc="genericDesc" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <div
      class="column-gap"
      :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
    >
      <component
        :is="genericPerkComponent(perk.title)"
        v-for="perk in genericPerks"
        :key="perk.title"
        :perk="perk"
        :bg="genericAvailable(perk) ? 'lime-200 dark:lime-900 hover:(lime-100 dark:lime-800)'
          : 'gray-200 dark:gray-600'"
        :saved-perk="allGeneric[perk.title]"
        :is-active="!!allGeneric[perk.title]"
        @pickPerk="chooseGenericPerk"
      ></component>
    </div>
    <template v-if="genericPerksWithDLC.length">
      <h2 class="text-2xl text-center">
        DLC Generic Companion Perks
      </h2>
      <DLCNote />
      <div
        class="column-gap pb-8"
        :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
      >
        <PerkCard
          v-for="perk in genericPerksWithDLC"
          :key="perk.title"
          :perk="perk"
          :bg="genericAvailable(perk) ? 'lime-200 dark:lime-900 hover:(lime-100 dark:lime-800)'
            : 'gray-200 dark:gray-600'"
          :saved-perk="allGeneric[perk.title]"
          :is-active="!!allGeneric[perk.title]"
          @pickPerk="chooseGenericPerk"
        >
        </PerkCard>
      </div>
    </template>
  </div>
</template>

<script lang='ts' setup>
import { genericDesc } from '~/data/talents'
import { lazyLoadImg, useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'

import { chooseGenericPerk, genericAvailable } from '~/logic'
import { DLCgenericPerks } from '~/data/DLCs'
import PerkCard from '~/components/cards/PerkCard.vue'
import FourSeason from '~/components/cards/perkCards/FourSeason.vue'
import PowerSwap from '~/components/cards/perkCards/PowerSwap.vue'
import { useFullPerks } from '~/logic/localPerks'

const { genericWaifuPerks, settings } = useStore()
const { genericPerks } = useFullPerks()

const waifuList = ref<HTMLElement|null>(null)

onMounted(() => lazyLoadImg(waifuList.value))

const allGeneric = computed(() => {
  const res: any = {}
  genericWaifuPerks.value.forEach(x => res[x.title] = x)
  return res
})

const genericPerksWithDLC = computed(() => !settings.value.allChosenAuthors[0]
  ? DLCgenericPerks.filter(perk => !settings.value.allChosenAuthors.includes(perk.dlc))
  : [])

const genericPerkComponent = (title: string) => {
  const cmp = {
    'Four Seasons': FourSeason,
    'Power Swap': PowerSwap,
  }
  return cmp[title as keyof typeof cmp] || PerkCard
}

onMounted(() => useTooltips())
</script>
