<template>
  <div class="">
    <Desc :desc="homeDesc" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <div class="md:column-count-2 lg:column-count-3 pb-8">
      <div
        v-for="homePerk in homes"
        :id="homePerk.title"
        :key="homePerk.title"
        class="bg-yellow-200 dark:bg-yellow-900 p-2 mb-2 inline-block"
        @click="pickHome(homePerk)"
      >
        <h3 class="relative text-center text-xl">
          {{ homePerk.title }} <span text="gray-600 dark:gray-400">(Cost: {{ homePerk.cost }})</span>
          <bi:check-lg v-if="findIndex(homePerks, {title: homePerk.title}) !== -1" class="absolute top-1 right-1" />
        </h3>
        <Desc :desc="homePerk.desc" />
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { findIndex, intersection } from 'lodash-es'
import { homes, homeDesc, HomePerk } from '~/data/talents'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'

const { allEffects, homePerks } = useStore()

function isAvailable(home: HomePerk): boolean {
  if (!home.whitelist) { return true }
  else {
    if (intersection(home.whitelist, allEffects.value).length === home?.whitelist?.length)
      return true
  }

  return true
}

function pickHome(home: HomePerk) {
  if (isAvailable(home)) {
    if (allEffects.value.includes(home.title)) {
      const heritageToDelete = homePerks.value.splice(findIndex(homePerks.value, { title: home.title }))
      heritageToDelete.forEach(x => allEffects.value.splice(allEffects.value.indexOf(x.title), 1))
    }
    else {
      allEffects.value.push(home.title)
      homePerks.value.push({ title: home.title, cost: home.cost })
    }
  }
}

onMounted(() => useTooltips())

</script>
