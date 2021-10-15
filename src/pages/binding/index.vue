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
      <div
        v-for="binding in bindings"
        :id="binding.title"
        :key="binding.title"
        class="mb-2 pb-2 inline-block bg-light-400 dark:bg-rose-900 "
        :class="isAllowed(binding) ? 'filter hover:(bg-light-700 dark:bg-rose-700) cursor-pointer': 'dark:bg-gray-600'"
        @click="choose(binding)"
      >
        <h3 class="text-center text-xl flex justify-between px-2 items-center">
          <span>{{ binding.title }} <span text="gray-600 dark:gray-400">(Cost: {{ binding.cost }})</span></span>
          <bi:check-lg v-if="allEffects.includes(binding.title)" class="text-green-500" />
        </h3>
        <Desc :desc="binding.desc" />
        <div v-if="binding.effect" class="text-yellow-300 px-2">
          Effect: {{ binding.effect }}
        </div>
        <div v-if="binding.type" class="text-red-300 px-2">
          Type: {{ binding.type }}
        </div>
        <div v-if="binding.whitelist" class="flex gap-2 px-2" @click.stop>
          Requires:
          <Enum :list="binding.whitelist.map(x => ({title: x}))" path="/binding" />
        </div>
      </div>
    </div>
    <h3 id="lures" class="text-2xl text-center">
      Lures <router-link
        :to="{path:'/binding', hash:'#expansions'}"
        class="text-base text-gray-600 dark:text-gray-400"
      >
        (go to Expansions)
      </router-link>
    </h3>
    <Desc :desc="lureDesc" class="bg-gray-200 dark:bg-gray-600 max-w-screen-md my-4 mx-auto" />
    <div class="md:column-count-2 lg:column-count-3">
      <div
        v-for="lure in lures"
        :id="lure.title"
        :key="lure.title"
        class="mb-2 pb-2 inline-block bg-pink-100 dark:bg-pink-900 "
        :class="isLureAllowed(lure) ? 'hover:(bg-pink-200 dark:bg-pink-800) cursor-pointer': 'bg-gray-300 dark:bg-gray-600'"
        @click="chooseLure(lure)"
      >
        <h3 class="text-center text-xl flex justify-between px-2 items-center">
          <span>{{ lure.title }} <span text="gray-600 dark:gray-400">(Cost: {{ lure.cost }})</span></span>
          <bi:check-lg v-if="findIndex(luresBought, {title: lure.title}) !== -1" class="text-green-500" />
        </h3>
        <Desc :desc="lure.desc" />
        <div v-if="lure.special" class="p-2">
          Special: <span class="text-yellow-800 dark:text-yellow-200" v-html="lure.special"></span>
        </div>
        <div v-if="lure.whitelist" class="flex gap-2 px-2" @click.stop>
          Requires:
          <Enum :list="lure.whitelist.map(x => ({title: x}))" path="/binding" />
        </div>
      </div>
    </div>
    <h3 id="expansions" class="text-2xl text-center">
      Lure Expansions  <router-link
        :to="{path:'/binding', hash:'#bindings'}"
        class="text-base text-gray-600 dark:text-gray-400"
      >
        (go to Bindings)
      </router-link>
    </h3>
    <Desc :desc="lureExpansionDesc" class="bg-gray-200 dark:bg-gray-600 max-w-screen-md my-4 mx-auto" />
    <div class="md:column-count-2 lg:column-count-3">
      <div
        v-for="lureExp in lureExpansions"
        :id="lureExp.title"
        :key="lureExp.title"
        class="mb-2 pb-2 inline-block bg-rose-100 dark:bg-rose-900 "
        :class="isLureAllowed(lureExp) ? 'hover:(bg-pink-200 dark:bg-pink-800) cursor-pointer': 'bg-gray-300 dark:bg-gray-600'"
        @click="chooseLure(lureExp)"
      >
        <h3 class="text-center text-xl flex justify-between px-2 items-center">
          <span>{{ lureExp.title }} <span text="gray-600 dark:gray-400">(Cost: {{ lureExp.cost }})</span></span>
          <bi:check-lg v-if="findIndex(luresBought, {title: lureExp.title}) !== -1" class="text-green-500" />
        </h3>
        <Desc :desc="lureExp.desc" />
        <div v-if="lureExp.special" class="p-2">
          Special: <span class="text-fuchsia-700 dark:text-yellow-200" v-html="lureExp.special"></span>
        </div>
        <div v-if="lureExp.whitelist" class="flex gap-2 px-2" @click.stop>
          Requires:
          <Enum :list="lureExp.whitelist.map(x => ({title: x}))" path="/binding" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { findIndex, intersection } from 'lodash-es'
import { desc, bindings, Binding, lureDesc, lures, lureExpansionDesc, lureExpansions, Lure } from '~/data/binding'
import { genericChoose, useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'

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
