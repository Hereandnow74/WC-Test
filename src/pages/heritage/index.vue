<template>
  <div class="md:p-2 pb-8">
    <Desc :desc="desc" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <div class="md:column-count-2 lg:column-count-3">
      <div
        v-for="heritage in heritages"
        :id="heritage.title"
        :key="heritage.title"
        class="p-2 mb-2 inline-block"
        :class="isAvailable(heritage) ? heritageColors[heritage.tree]: 'bg-gray-200 dark:bg-gray-600'"
        @click="pickHeritage(heritage)"
      >
        <h3 class="text-center text-xl relative">
          {{ heritage.title }} <span text="gray-600 dark:gray-400">(Cost: {{ heritage.cost }})</span>
          <bi:check-lg
            v-if="allEffects.includes(heritage.title)"
            class="absolute right-1 top-1 text-green-500"
          />
        </h3>
        <h6 v-if="heritage.tree !== 'None'" class="text-center font-sm text-gray-600 dark:text-gray-400">
          ({{ heritage.tree }})
        </h6>
        <Desc :desc="heritage.desc" />
        <div v-if="heritage.whitelist">
          Requirements: [
          <router-link
            v-for="title in heritage.whitelist"
            :key="title"
            :to="{ path: `/${LINKS[title]}`, hash: `#${title}` }"
            class="dark:text-blue-300 text-blue-600"
          >
            {{ title }},
          </router-link>
          ]
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { findIndex, intersection } from 'lodash'
import { desc, heritages, Heritage } from '~/data/heritage'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'
import { LINKS } from '~/data/constatnts'

const { heritage, allEffects, flags } = useStore()
onMounted(() => useTooltips())

const availableClasses = 'cursor-pointer'
const heritageColors = {
  Dragon: `bg-purple-200 dark:bg-purple-900 ${availableClasses}`,
  Transhuman: `bg-cyan-200 dark:bg-cyan-900 ${availableClasses}`,
  Outsider: `bg-fuchsia-200 dark:bg-fuchsia-900 ${availableClasses}`,
  None: `bg-warm-gray-200 dark:bg-warm-gray-700 ${availableClasses}`,
}

function isAvailable(hr: Heritage): boolean {
  if (flags.noHeritage && !hr.whitelist) { return true }
  else {
    if (intersection(hr.whitelist, allEffects.value).length === hr?.whitelist?.length)
      return true
  }

  return false
}

function pickHeritage(hr: Heritage) {
  if (isAvailable(hr)) {
    if (allEffects.value.includes(hr.title)) {
      const heritageToDelete = heritage.value.splice(findIndex(heritage.value, { title: hr.title }))
      heritageToDelete.forEach(x => allEffects.value.splice(allEffects.value.indexOf(x.title), 1))
    }
    else {
      allEffects.value.push(hr.title)
      heritage.value.push({ title: hr.title, cost: hr.cost, tree: hr.tree })
    }
  }
}

</script>
