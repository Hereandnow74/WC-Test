<template>
  <div class="sm:p-2">
    <Desc :desc="otherDesc" class="bg-gray-200 dark:bg-gray-600 max-w-screen-md my-4 mx-auto" />
    <div
      class="column-gap pb-8"
      :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
    >
      <PerkCard
        v-for="other in spaceTruck"
        :key="other.title"
        :perk="other"
        :bg="lureAvailable(other) ? 'pink-100 dark:pink-900 hover:(pink-200 dark:rose-800)'
          : 'gray-200 dark:gray-600'"
        :is-active="!!allOther[other.title]"
        @pickPerk="chooseOther"
      >
      </PerkCard>
    </div>
  </div>
</template>

<script lang='ts' setup>
import {
  otherDesc,
} from '~/data/binding'
import { useTooltips } from '~/logic/misc'
import { lureAvailable, chooseOther } from '~/logic'
import { useStore } from '~/store/store'
import { useFullPerks } from '~/logic/localPerks'

const { otherPerks, settings } = useStore()
const { otherControls } = useFullPerks()

const spaceTruck = computed(() => otherControls.value.filter(perk => perk.type === 'space'))

onMounted(() => useTooltips())

const allOther = computed(() => {
  const res: any = {}
  otherPerks.value.forEach(x => res[x.title] = x)
  return res
})

</script>
