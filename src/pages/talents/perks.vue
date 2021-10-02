<template>
  <div class="">
    <Desc :desc="talents.genericDesc" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <div class="column-count-2">
      <div
        v-for="perk in talents.perks"
        :key="perk.title"
        class="bg-light-blue-200 dark:bg-light-blue-900 p-2 mb-2 inline-block"
      >
        <h3 class="text-center text-xl">
          {{ perk.title }} <span text="gray-600 dark:gray-400">(Cost: {{ perk.cost }})</span>
        </h3>
        <Desc :desc="perk.desc" />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import * as talents from '~/data/talents'
import { useTooltips } from '~/logic/misc'

export default defineComponent({
  setup() {
    onMounted(() => useTooltips())
    return {
      talents,
    }
  },
})
</script>
