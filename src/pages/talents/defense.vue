<template>
  <div class="sm:p-2">
    <div class="mb-4 max-w-4xl mx-auto">
      <Desc :desc="additionalDefenseDesc" class="bg-amber-200 text-gray-800 text-sm md:text-base w-3/5 float-right mt-8 mx-2 border-3 border-gray-900" />
      <Desc :desc="authorNote" class="bg-amber-200 text-gray-800 text-sm md:text-base w-3/5 float-right mt-8 mx-2 border-3 border-gray-900" />
      <Desc :desc="defenceDesc" class="p-2 bg-violet-200 dark:bg-violet-900" />
    </div>
    <div
      class="column-gap pb-8"
      :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
    >
      <DefenseCard
        v-for="defense in defenses"
        :key="defense.title"
        :perk="defense"
        :bg="defenseAvailable(defense) ? 'rose-200 dark:rose-900 hover:(rose-100 dark:rose-800)'
          : 'gray-200 dark:gray-600'"
        :is-active="!!allDefenses[defense.title]"
        :saved-perk="allDefenses[defense.title]"
        @pickPerk="chooseDefense"
      >
      </DefenseCard>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { defenceDesc, additionalDefenseDesc, authorNote } from '~/data/talents'
import { chooseDefense, defenseAvailable } from '~/logic'
import { useFullPerks } from '~/logic/localPerks'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'

const { defensePerks, settings, defenseRetinueDiscountAuto } = useStore()
const { defenses } = useFullPerks()

const allDefenses = computed(() => {
  const res: any = {}
  defensePerks.value.forEach(x => res[x.title] = x)
  return res
})

// const availability = ref({})
// const checkAvailability = () => availability.value = defenses.reduce((a, x) => (a[x.uid] = defenseAvailable(x), a), {})
// checkAvailability()
// watch(allEffects, checkAvailability)

onMounted(() => useTooltips())

</script>
