<template>
  <div class="">
    <Desc :desc="talents.homeDesc" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <div class="lg:column-count-2 pb-8">
      <div
        v-for="homePerk in talents.homePerks"
        :id="homePerk.title"
        :key="homePerk.title"
        class="bg-yellow-200 dark:bg-yellow-900 p-2 mb-2 inline-block"
      >
        <h3 class="text-center text-xl">
          {{ homePerk.title }} <span text="gray-600 dark:gray-400">(Cost: {{ homePerk.cost }})</span>
        </h3>
        <Desc :desc="homePerk.desc" />
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
