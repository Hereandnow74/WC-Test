<template>
  <div class="p-2">
    <Desc class="p-2 dark:bg-gray-800 bg-blue-gray-300 rounded" :desc="desc" />
    <div class="mt-4 pb-8 lg:column-count-2">
      <div
        v-for="rule in intensity"
        :key="rule.title"
        class="p-1 rounded cursor-pointer relative mb-2 inline-block"
        :bg="requirementsMet(rule) ? 'blue-100 dark:gray-700 hover:blue-200 dark:hover:gray-800' : 'gray-400'"
        @click="choose(rule.title)"
      >
        <h3 class="text-xl text-center">
          {{ rule.title }}
        </h3>
        <Desc :desc="rule.desc" />
        <p v-if="rule.special">
          Special: {{ rule.special }}
        </p>
        <p v-if="rule.requires">
          Req: {{ rule.requires }}
        </p>
        <bi:check-lg
          v-if="allEffects.includes(rule.title)"
          class="absolute right-0 top-0 m-2 text-green-500"
        />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { intersection } from 'lodash-es'
import { desc, intensity } from '~/data/intensity'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'

export default defineComponent({
  setup() {
    const { allEffects } = useStore()

    function choose(title: string) {
      if (allEffects.value.includes(title)) allEffects.value.splice(allEffects.value.indexOf(title), 1)
      else allEffects.value.push(title)
    }

    function requirementsMet(rule: typeof intensity[number]): boolean {
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
      requirementsMet,
      choose,
    }
  },
})
</script>
