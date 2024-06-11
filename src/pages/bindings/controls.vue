<template>
  <div class="sm:p-2">
    <Desc :desc="otherDesc" class="bg-gray-200 dark:bg-gray-600 max-w-screen-md my-4 mx-auto" />
    <div
      class="column-gap pb-8"
      :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
    >
      <PerkCard
        v-for="other in withoutSpaceTruck"
        :key="other.uid"
        :perk="other"
        :bg="lureAvailable(other) ? 'pink-100 dark:pink-900 hover:(pink-200 dark:rose-800)'
          : 'gray-200 dark:gray-600'"
        :is-active="!!allOther[other.title]"
        @pickPerk="chooseOther"
      >
      </PerkCard>
    </div>
    <template v-if="otherDLC.length">
      <h2 class="text-2xl text-center">
        DLC Other Controls
      </h2>
      <DLCNote />
      <div
        class="column-gap pb-8"
        :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
      >
        <PerkCard
          v-for="other in otherDLC"
          :key="other.uid"
          :perk="other"
          :bg="lureAvailable(other) ? 'pink-100 dark:pink-900 hover:(pink-200 dark:rose-800)'
            : 'gray-200 dark:gray-600'"
          :is-active="!!allOther[other.title]"
          @pickPerk="chooseOther"
        >
        </PerkCard>
      </div>
    </template>
  </div>
</template>

<script lang='ts' setup>
import {
  otherDesc,
} from '~/data/binding'
import { useTooltips } from '~/logic/misc'
import { lureAvailable, chooseOther } from '~/logic'
import { useStore } from '~/store/store'
import { DLCotherControls } from '~/data/DLCs'
import { useFullPerks } from '~/logic/localPerks'

const { otherPerks, settings } = useStore()
const { otherControls } = useFullPerks()

const withoutSpaceTruck = computed(() => otherControls.value.filter(perk => perk.type !== 'space'))

const otherDLC = computed(() => !settings.value.allChosenAuthors[0]
  ? DLCotherControls.filter(perk => !settings.value.allChosenAuthors.includes(perk.dlc))
  : [])

onMounted(() => useTooltips())

const allOther = computed(() => {
  const res: any = {}
  otherPerks.value.forEach(x => res[x.title] = x)
  return res
})

</script>
