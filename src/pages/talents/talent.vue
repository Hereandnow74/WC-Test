<template>
  <div class="md:p-2">
    <Desc :desc="talentsDesc" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <div class="lg:column-count-2">
      <div
        v-for="talent in talents"
        :id="talent.title"
        :key="talent.title"
        class="bg-green-200 dark:bg-green-900 p-2 mb-2 inline-block"
        @click="pickTalent(talent)"
      >
        <h3 class="relative text-center text-xl">
          {{ talent.title }} <span text="gray-600 dark:gray-400">(Cost: {{ talent.cost }})</span>
          <bi:check-lg v-if="findIndex(talentPerks, {title: talent.title}) !== -1" class="absolute top-1 right-1" />
        </h3>
        <Desc :desc="talent.desc" />
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { findIndex, intersection } from 'lodash-es'
import { talents, talentsDesc, Talent } from '~/data/talents'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'

const { allEffects, talentPerks } = useStore()

function isAvailable(tlt: Talent): boolean {
  if (!tlt.whitelist) { return true }
  else {
    if (intersection(tlt.whitelist, allEffects.value).length === tlt?.whitelist?.length)
      return true
  }

  return false
}

function pickTalent(tlt: Talent) {
  if (isAvailable(tlt)) {
    if (allEffects.value.includes(tlt.title)) {
      const heritageToDelete = talentPerks.value.splice(findIndex(talentPerks.value, { title: tlt.title }))
      heritageToDelete.forEach(x => allEffects.value.splice(allEffects.value.indexOf(x.title), 1))
    }
    else {
      allEffects.value.push(tlt.title)
      talentPerks.value.push({ title: tlt.title, cost: tlt.cost })
    }
  }
}

onMounted(() => useTooltips())

</script>
