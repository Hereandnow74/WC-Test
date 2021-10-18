<template>
  <div class="p-2">
    <h3 id="bindings" class="text-2xl text-center">
      Bindings <router-link
        :to="{path:'/binding', hash:'#lures'}"
        class="text-base text-gray-600 dark:text-gray-400"
      >
        (go to Lures)
      </router-link>
    </h3>
    <Desc class="p-2 mb-4 max-w-4xl bg-warm-gray-200 dark:bg-warm-gray-800 mx-auto" :desc="desc" />
    <div class="md:column-count-2 lg:column-count-3">
      <div
        id="No Bindings"
        class="mb-2 pb-2 inline-block bg-light-400 dark:bg-rose-900"
        :class="flags.noBindings ? 'filter hover:(bg-light-700 dark:bg-rose-700) cursor-pointer': 'dark:bg-gray-600'"
      >
        <h3 class="text-center text-xl flex justify-between px-2 items-center">
          <span>No Bindings</span>
          <bi:check-lg v-if="flags.noBindings" class="text-green-500" />
        </h3>
        <Desc desc="None of your waifus will be affected by any of the effects common to all company bindings. This is your warning. If you purchase and use a real binding method later, the discount will disappear and you will go into debt. You do not need to bind your previously-purchased waifus immediately. Capturing any waifu without bindings will award you the standard capture value of her original tier, before this option’s purchase discount. It will also give her a dormant tattoo, which you can activate at any time by using the Stamp (should you purchase it) or removing a higher Binding. If you instead switch to this option after already having bound waifus, the basic effects common to all bindings will persist in your retinue members until interactions or events change their minds naturally." />
        <div class="text-violet-700 dark:text-yellow-200 px-2">
          All waifus of tiers 2-10 are discounted by one full rank.
        </div>
      </div>
      <PerkCard
        v-for="bnd in bindings"
        :key="bnd.title"
        :perk="bnd"
        :bg="isAllowed(bnd) ? 'light-400 dark:rose-900 hover:(yellow-100 dark:rose-800)'
          : 'gray-200 dark:gray-600'"
        :is-available="isAllowed(bnd)"
        :is-active="findIndex(binding, {title: bnd.title}) !== -1"
        @pickPerk="choose"
      >
      </PerkCard>
    </div>
    <h3 id="lures" class="text-2xl text-center">
      Lures <router-link
        :to="{path:'/binding', hash:'#expansions'}"
        class="text-base text-blue-600 dark:text-blue-400"
      >
        (go to Expansions)
      </router-link>
    </h3>
    <Desc :desc="lureDesc" class="bg-gray-200 dark:bg-gray-600 max-w-screen-md my-4 mx-auto" />
    <div class="md:column-count-2 lg:column-count-3">
      <PerkCard
        v-for="bnd in lures"
        :key="bnd.title"
        :perk="bnd"
        :bg="isLureAllowed(bnd) ? 'pink-100 dark:pink-900 hover:(pink-200 dark:rose-800)'
          : 'gray-200 dark:gray-600'"
        :is-available="isLureAllowed(bnd)"
        :is-active="findIndex(luresBought, {title: bnd.title}) !== -1"
        @pickPerk="chooseLure"
      >
      </PerkCard>
    </div>
    <h3 id="expansions" class="text-2xl text-center">
      Lure Expansions  <router-link
        :to="{path:'/binding', hash:'#bindings'}"
        class="text-base text-blue-600 dark:text-blue-400"
      >
        (go to Bindings)
      </router-link>
    </h3>
    <Desc :desc="lureExpansionDesc" class="bg-gray-200 dark:bg-gray-600 max-w-screen-md my-4 mx-auto" />
    <div class="md:column-count-2 lg:column-count-3">
      <PerkCard
        v-for="bnd in lureExpansions"
        :key="bnd.title"
        :perk="bnd"
        :bg="isLureAllowed(bnd) ? 'pink-100 dark:pink-900 hover:(pink-200 dark:rose-800)'
          : 'gray-200 dark:gray-600'"
        :is-available="isLureAllowed(bnd)"
        :is-active="findIndex(luresBought, {title: bnd.title}) !== -1"
        @pickPerk="chooseLure"
      >
      </PerkCard>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { findIndex, intersection } from 'lodash-es'
import { desc, bindings, Binding, lureDesc, lures, lureExpansionDesc, lureExpansions, Lure } from '~/data/binding'
import { genericChoose, useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'
import PerkCard from '~/components/PerkCard.vue'

const { allEffects, binding, luresBought, flags } = useStore()

onMounted(() => useTooltips())

function choose(bin: Binding) {
  if (!isAllowed(bin)) return

  if (allEffects.value.includes(bin.title)) {
    const del = binding.value.splice(findIndex(binding.value, { title: bin.title }))
    del.forEach(x => allEffects.value.splice(allEffects.value.indexOf(x.title), 1))
    if (binding.value.length === 0) flags.noBindings = true
  }
  else {
    binding.value.push({ title: bin.title, cost: bin.cost })
    allEffects.value.push(bin.title)
    flags.noBindings = false
  }
}

function isAllowed(bin: Binding): boolean {
  if (flags.noBindings) {
    if (bin.whitelist) return false
    return true
  }
  else {
    if (bin.whitelist && intersection(allEffects.value, bin.whitelist).length === bin.whitelist.length)
      return true
    if (allEffects.value.includes(bin.title))
      return true
  }
  return false
}

function isLureAllowed(lure: Lure): boolean {
  if (lure.whitelist)
    return intersection(lure.whitelist, allEffects.value).length >= 1
  return true
}

function chooseLure(lure: Lure) {
  genericChoose(lure, isLureAllowed, luresBought.value)
}
</script>
