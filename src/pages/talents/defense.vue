<template>
  <div class="">
    <Desc :desc="talents.defenceDesc" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <div class="lg:column-count-2 pb-8">
      <div
        v-for="defence in talents.defenses"
        :id="defence.title"
        :key="defence.title"
        class="bg-rose-200 dark:bg-rose-900 p-2 mb-2 inline-block"
      >
        <h3 class="text-center text-xl">
          {{ defence.title }} <span text="gray-600 dark:gray-400">(Cost: {{ defence.cost }})</span>
        </h3>
        <Desc :desc="defence.desc" />
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
