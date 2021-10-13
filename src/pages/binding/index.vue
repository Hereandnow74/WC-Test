<template>
  <div class="p-2">
    <Desc class="p-2 mb-4 max-w-4xl bg-warm-gray-300 dark:bg-warm-gray-800 mx-auto" :desc="desc" />
    <div class="md:column-count-2 lg:column-count-3">
      <div
        id="No Bindings"
        class="mb-2 pb-2 inline-block bg-rose-200 dark:bg-rose-900"
        :class="flags.noBindings ? 'filter hover:hue-rotate-15 cursor-pointer': 'dark:bg-gray-600'"
      >
        <h3 class="text-center text-xl flex justify-between px-2 items-center">
          <span>No Bindings</span>
          <bi:check-lg v-if="flags.noBindings" />
        </h3>
        <Desc desc="None of your waifus will be affected by any of the effects common to all company bindings. This is your warning. If you purchase and use a real binding method later, the discount will disappear and you will go into debt. You do not need to bind your previously-purchased waifus immediately. Capturing any waifu without bindings will award you the standard capture value of her original tier, before this option’s purchase discount. It will also give her a dormant tattoo, which you can activate at any time by using the Stamp (should you purchase it) or removing a higher Binding. If you instead switch to this option after already having bound waifus, the basic effects common to all bindings will persist in your retinue members until interactions or events change their minds naturally." />
        <div class="text-yellow-500 dark:text-yellow-200 px-2">
          All waifus of tiers 2-10 are discounted by one full rank.
        </div>
      </div>
      <div
        v-for="binding in bindings"
        :id="binding.title"
        :key="binding.title"
        class="mb-2 pb-2 inline-block bg-rose-200 dark:bg-rose-900 "
        :class="isAllowed(binding) ? 'filter hover:hue-rotate-15 cursor-pointer': 'dark:bg-gray-600'"
        @click="choose(binding)"
      >
        <h3 class="text-center text-xl flex justify-between px-2 items-center">
          <span>{{ binding.title }} <span text="gray-600 dark:gray-400">(Cost: {{ binding.cost }})</span></span>
          <bi:check-lg v-if="allEffects.includes(binding.title)" />
        </h3>
        <Desc :desc="binding.desc" />
        <div v-if="binding.effect" class="text-yellow-300 px-2">
          Effect: {{ binding.effect }}
        </div>
        <div v-if="binding.type" class="text-red-300 px-2">
          Type: {{ binding.type }}
        </div>
        <div v-if="binding.whitelist" class="text-green-300 px-2" @click.stop>
          Requires: [
          <router-link
            v-for="item in binding.whitelist"
            :key="item"
            class="text-blue-400"
            :to="{path: '/binding', hash: `#${item}`}"
          >
            {{ item }},
          </router-link>
          ]
        </div>
      </div>
    </div>
    <h3 class="text-2xl text-center">
      Lures
    </h3>
    <Desc :desc="lureDesc" class="bg-gray-600 max-w-screen-md my-4 mx-auto" />
    <div class="md:column-count-2 lg:column-count-3">
      <div
        v-for="lure in lures"
        :id="lure.title"
        :key="lure.title"
        class="mb-2 pb-2 inline-block bg-rose-200 dark:bg-rose-900 "
        :class="isAllowed(lure) ? 'filter hover:hue-rotate-15 cursor-pointer': 'dark:bg-gray-600'"
        @click="choose(lure)"
      >
        <h3 class="text-center text-xl flex justify-between px-2 items-center">
          <span>{{ lure.title }} <span text="gray-600 dark:gray-400">(Cost: {{ lure.cost }})</span></span>
          <bi:check-lg v-if="allEffects.includes(lure.title)" />
        </h3>
        <Desc :desc="lure.desc" />
        <div v-if="lure.whitelist" class="text-green-300 px-2" @click.stop>
          Requires: [
          <router-link
            v-for="item in lure.whitelist"
            :key="item"
            class="text-blue-400"
            :to="{path: '/binding', hash: `#${item}`}"
          >
            {{ item }},
          </router-link>
          ]
        </div>
      </div>
    </div>
    <h3 class="text-2xl text-center">
      Lure Expansions
    </h3>
    <Desc :desc="lureExpansionDesc" class="bg-gray-600 max-w-screen-md my-4 mx-auto" />
    <div class="md:column-count-2 lg:column-count-3">
      <div
        v-for="lure in lureExpansions"
        :id="lure.title"
        :key="lure.title"
        class="mb-2 pb-2 inline-block bg-rose-200 dark:bg-rose-900 "
        :class="isAllowed(lure) ? 'filter hover:hue-rotate-15 cursor-pointer': 'dark:bg-gray-600'"
        @click="choose(lure)"
      >
        <h3 class="text-center text-xl flex justify-between px-2 items-center">
          <span>{{ lure.title }} <span text="gray-600 dark:gray-400">(Cost: {{ lure.cost }})</span></span>
          <bi:check-lg v-if="allEffects.includes(lure.title)" />
        </h3>
        <Desc :desc="lure.desc" />
        <div v-if="lure.whitelist" class="text-green-300 px-2" @click.stop>
          Requires: [
          <router-link
            v-for="item in lure.whitelist"
            :key="item"
            class="text-blue-400"
            :to="{path: '/binding', hash: `#${item}`}"
          >
            {{ item }},
          </router-link>
          ]
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { findIndex, intersection } from 'lodash-es'
import { desc, bindings, Binding, lureDesc, lures, lureExpansionDesc, lureExpansions } from '~/data/binding'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'

const { allEffects, binding, flags } = useStore()

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
</script>
