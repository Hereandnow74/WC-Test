<template>
  <div class="sm:p-2">
    <h3 id="bindings" class="text-2xl text-center">
      Bindings <router-link
        :to="{path:'/binding', hash:'#lures'}"
        class="text-base text-blue-600 dark:text-blue-400  hover:underline"
      >
        (go to Lures)
      </router-link>
    </h3>
    <Desc class="p-2 mb-4 max-w-4xl bg-warm-gray-200 dark:bg-warm-gray-800 mx-auto" :desc="desc" />

    <div class="flex gap-4 mx-auto w-max mb-4">
      <div
        v-for="type in Object.keys(bindingByType)"
        :key="type"
        class="px-2 py-1 border-2 rounded cursor-pointer hover:border-orange-400"
        :class="activeType === type ? 'border-orange-400': ''"
        @click="activeType = type"
      >
        <h3>{{ type }}</h3>
        <div>Total perks: <span>{{ bindingByType[type].length }}</span></div>
      </div>
    </div>

    <div class="md:column-count-2 lg:column-count-3">
      <div

        id="No Bindings"
        class="mb-2 p-2 bg-light-400 dark:bg-rose-900"
        :class="flags.noBindings ? 'hover:(yellow-100 dark:bg-rose-800) cursor-pointer': 'dark:bg-gray-600'"
      >
        <h3 class="text-center text-xl px-2 relative">
          <span>No Bindings</span>
          <fa-solid:check v-if="flags.noBindings" class="text-green-500 absolute top-1 right-1" />
        </h3>
        <Desc desc="None of your waifus will be affected by any of the effects common to all company bindings. This is your warning. If you purchase and use a real binding method later, the discount will disappear and you will go into debt. You do not need to bind your previously-purchased waifus immediately. Capturing any waifu without bindings will award you the standard capture value of her original tier, before this option’s purchase discount. It will also give her a dormant tattoo, which you can activate at any time by using the Stamp (should you purchase it) or removing a higher Binding. If you instead switch to this option after already having bound waifus, the basic effects common to all bindings will persist in your retinue members until interactions or events change their minds naturally." />
        <div class="text-violet-700 dark:text-yellow-200 px-2">
          All waifus of tiers 2-10 are discounted by one full rank.
        </div>
      </div>
      <PerkCard
        v-for="bnd in bindingByType[activeType]"
        :key="bnd.title"
        :perk="bnd"
        :bg="isAllowed(bnd) ? 'light-400 dark:rose-900 hover:(yellow-100 dark:rose-800)'
          : 'gray-200 dark:gray-600'"
        :is-available="isAllowed(bnd)"
        :is-active="!!allBindings[bnd.title]"
        :increment="!!bnd.increment"
        :saved-perk="allBindings[bnd.title]"
        :flavor-list="bnd.title === 'Prismatic Shroud' ? shroudElements.map(x => ({flavor:x.title})) : []"
        @pickPerk="choose"
      >
        <template v-if="['Elemental Shroud'].includes(bnd.title)" #title>
          <Button size="Small" label="element" class="mx-1" @click.stop="chooseElement(bnd)" />
        </template>
        <template v-if="bnd.title" #rules>
          <span v-if="bnd.type === 'Ritual'" class="mx-2" @click.stop="toggleRitual()">Rules: <span class="text-red-500 hover:underline">ritual parameters</span></span>
        </template>
      </PerkCard>
    </div>
    <Desc
      v-if="activeType === 'Symbiote'"
      :desc="symbioteRules"
      class="p-2 my-4 max-w-4xl bg-warm-gray-200 dark:bg-warm-gray-800 mx-auto"
    />

    <h3 id="lures" class="text-2xl text-center">
      Lures <router-link
        :to="{path:'/binding', hash:'#expansions'}"
        class="text-base text-blue-600 dark:text-blue-400 hover:underline"
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
        :to="{path:'/binding', hash:'#other'}"
        class="text-base text-blue-600 dark:text-blue-400 hover:underline"
      >
        (go to Other controls)
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

    <h3 id="other" class="text-2xl text-center">
      Other controls  <router-link
        :to="{path:'/binding', hash:'#bindings'}"
        class="text-base text-blue-600 dark:text-blue-400 hover:underline"
      >
        (go to Bindings)
      </router-link>
    </h3>
    <Desc :desc="otherDesc" class="bg-gray-200 dark:bg-gray-600 max-w-screen-md my-4 mx-auto" />
    <div class="md:column-count-2 lg:column-count-3 pb-8">
      <PerkCard
        v-for="bnd in otherControls"
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

    <Modal v-if="showElements" label="Choose Element" @click="toggleElements">
      <div class="h-full md:h-3/4 bg-gray-300 dark:bg-gray-600 overflow-y-auto min-h-0 flex flex-col gap-2">
        <div
          v-for="element in shroudElements"
          :key="element.title"
          class="flex flex-col gap-1 m-2 rounded cursor-pointer p-2"
          bg="gray-200 dark:gray-700 hover:(gray-100 dark:gray-800)"
          @click="toggleCurrentElement(element.title)"
        >
          <h3 class="relative text-lg font-semibold text-center">
            {{ element.title }}
            <fa-solid:check v-if="elementBought(element.title)" class="text-green-500 absolute top-1 right-1" />
          </h3>
          <div>
            <span class="px-2 text-orange-500 dark:text-orange-300 font-semibold">Elemental Ability</span>:
            <span>{{ element['Elemental Ability'] }}</span>
          </div>
          <div>
            <span class="px-2 text-orange-500 dark:text-orange-300 font-semibold">Body Effects</span>:
            <span>{{ element['Body Effects'] }}</span>
          </div>
          <div>
            <span class="px-2 text-orange-500 dark:text-orange-300 font-semibold">Streamlined costume features</span>:
            <span>{{ element['Streamlined costume features'] }}</span>
          </div>
          <div>
            <span class="px-2 text-orange-500 dark:text-orange-300 font-semibold">Heavy costume features</span>:
            <span>{{ element['Heavy costume features'] }}</span>
          </div>
          <div>
            <span class="px-2 text-orange-500 dark:text-orange-300 font-semibold">Freebies</span>:
            <span>{{ element.Freebies }}</span>
          </div>
        </div>
      </div>
    </Modal>
    <RitualCircle v-if="showRitual" @click="toggleRitual" />
  </div>
</template>

<script lang='ts' setup>
import { findIndex, intersection, isArray, merge, mergeWith } from 'lodash-es'
import { onBeforeRouteUpdate } from 'vue-router'
import {
  desc, bindings, Binding, lureDesc, lures, lureExpansionDesc, lureExpansions, shroudElements,
  otherControls, otherDesc, symbioteRules,
} from '~/data/binding'
import { addFreebies, deleteFreebies, useTooltips } from '~/logic/misc'
import { Perk, useStore } from '~/store/store'
import PerkCard from '~/components/PerkCard.vue'
import RitualCircle from '~/components/RitualCircle.vue'

const { allEffects, binding, luresBought, flags } = useStore()
const [showElements, toggleElements] = useToggle()
const [showRitual, toggleRitual] = useToggle()

const currentBinding = ref<Binding|null>(null)

const activeType = ref('Stamp')

const bindingByType = computed(() => {
  const res = {
    Stamp: [] as Binding[],
    Jewelry: [] as Binding[],
    Ritual: [] as Binding[],
    Symbiote: [] as Binding[],
    Shroud: [] as Binding[],
  }
  bindings.forEach(x => x.type ? res[x.type].push(x) : null)
  return res
})

onMounted(() => useTooltips())

const params = useUrlSearchParams('history')

if (params.q) activeType.value = params.q

onBeforeRouteUpdate((to, from, next) => {
  if (to.query.q)
    activeType.value = to.query.q

  setTimeout(next, 1)
})

const allBindings = computed(() => {
  const res: any = {}
  binding.value.forEach(x => res[x.title] = x)
  return res
})

function elementBought(title: string) {
  return findIndex(binding.value, { anything: title }) !== -1
}

function choose(bin: Binding, saveData: Perk) {
  if (!isAllowed(bin)) return

  const freebies = {}
  if (bin.complex) {
    mergeWith(freebies,
      ...shroudElements.filter(x => findIndex(saveData.complex, { flavor: x.title }) !== -1).map(x => x.freebies),
      (a, b) => { if (isArray(a)) return a.concat(b) })
  }

  const ind = findIndex(binding.value, { title: bin.title })
  if (ind !== -1) {
    if (binding.value[ind].count !== saveData.count && saveData.count > 0) {
      if (bin.complex) {
        deleteFreebies(binding.value[ind].freebies)
        if (saveData.complex.length > 1) saveData.cost += 10 * (saveData.complex.length)
        saveData.freebies = freebies
        addFreebies(saveData.freebies)
      }
      binding.value[ind] = saveData
    }
    else {
      const toDel = binding.value.splice(ind)
      toDel.forEach((x) => {
        if (x.freebies) deleteFreebies(x.freebies)
        allEffects.value.splice(allEffects.value.indexOf(x.title), 1)
      })
      if (binding.value.length === 0) flags.value.noBindings = true
    }
  }
  else {
    const anything = bin.element
    if (bin.element) {
      const i = findIndex(shroudElements, { title: bin.element })
      saveData.freebies = shroudElements[i].freebies
    }
    allEffects.value.push(bin.title)
    if (bin.complex) saveData.freebies = freebies
    if (saveData.freebies) addFreebies(saveData.freebies)
    binding.value.push({ anything, ...saveData })
    flags.value.noBindings = false
  }
}

function isAllowed(bin: Binding): boolean {
  if (flags.value.noBindings) {
    if (bin.whitelist) return false
    return true
  }
  else {
    if (bin.whitelist && intersection(allEffects.value, bin.whitelist).length === (bin.needed || bin.whitelist.length))
      return true
    if (allBindings.value[bin.title])
      return true
  }
  return false
}

function isLureAllowed(lure: Binding): boolean {
  if (lure.whitelist)
    return intersection(lure.whitelist, allEffects.value).length >= 1
  return true
}

function chooseLure(lure: Binding) {
  const { allEffects } = useStore()
  if (isLureAllowed(lure)) {
    const ind = findIndex(luresBought.value, { title: lure.title })
    if (ind === -1) {
      allEffects.value.push(lure.title)
      luresBought.value.push({ title: lure.title, cost: lure.cost })
    }
    else {
      const del = luresBought.value.splice(ind)
      del.forEach(x => allEffects.value.splice(allEffects.value.indexOf(x.title), 1))
    }
  }
}

function chooseElement(bnd: Binding) {
  showElements.value = true
  currentBinding.value = bnd
}

function toggleCurrentElement(title: string) {
  if (currentBinding.value) {
    if (currentBinding.value.element === title)
      currentBinding.value.element = ''
    else
      currentBinding.value.element = title
  }
  toggleElements()
}
</script>
