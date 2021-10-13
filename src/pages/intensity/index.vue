<template>
  <div class="p-2">
    <Desc class="p-2 max-w-screen-md mx-auto dark:bg-gray-800 bg-blue-gray-300 rounded" :desc="desc" />
    <div class="mt-4 pb-8 sm:column-count-2 lg:column-count-3">
      <div
        v-for="rule in intensity"
        :id="rule.title"
        :key="rule.title"
        class="p-1 rounded cursor-pointer relative mb-2 inline-block pb-4"
        :bg="requirementsMet(rule) ? 'blue-100 dark:gray-700 hover:blue-200 dark:hover:gray-800' : 'gray-300 dark:gray-600'"
        @click="choose(rule)"
      >
        <h3 class="text-xl text-center">
          {{ rule.title }}
        </h3>
        <div v-if="rule.intensity" class="px-2">
          Bonus for intensity: {{ rule.intensity <= 1 ? baseBudgetAfter * rule.intensity : rule.intensity }}
        </div>
        <Desc :desc="rule.desc" />
        <div v-if="rule.special" class="px-2">
          Special: {{ rule.special }}
        </div>
        <div v-if="rule.requires" class="px-2">
          Req: {{ rule.requires }}
        </div>
        <bi:check-lg
          v-if="allEffects.includes(rule.title)"
          class="absolute right-0 top-0 m-2 text-green-500"
        />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { findIndex, intersection } from 'lodash-es'
import { desc, intensity, Intensity } from '~/data/intensity'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'

export default defineComponent({
  setup() {
    const { allEffects, intensities, baseBudgetAfter } = useStore()

    function choose(rule: Intensity) {
      if (allEffects.value.includes(rule.title)) {
        const start = findIndex(intensities.value, { title: rule.title })
        const end = intensities.value.length - start
        allEffects.value.splice(allEffects.value.indexOf(rule.title), end)
        intensities.value.splice(start)
      }
      else {
        if (requirementsMet(rule)) {
          allEffects.value.push(rule.title)
          intensities.value.push({ title: rule.title, intensity: rule.intensity })
        }
      }
    }

    function requirementsMet(rule: Intensity): boolean {
      if (intersection(rule.blacklist, allEffects.value).length) return false
      if (intersection(rule.whitelist, allEffects.value).length !== (rule.needed || rule.whitelist?.length || 0)) return false
      return true
    }

    onMounted(() => {
      useTooltips()
    })

    return {
      desc,
      intensity,
      allEffects,
      baseBudgetAfter,
      requirementsMet,
      choose,
    }
  },
})
</script>
