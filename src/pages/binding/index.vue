<template>
  <div class="p-2">
    <p class="p-2 mb-4 max-w-4xl bg-warm-gray-300 dark:bg-warm-gray-800 mx-auto" v-html="desc" />
    <div class="lg:column-count-2">
      <div v-for="binding in bindings" :key="binding.title" class="mb-2 inline-block bg-rose-200 dark:bg-rose-900">
        <h3 class="text-center text-xl">
          {{ binding.title }} <span text="gray-600 dark:gray-400">(Cost: {{ binding.cost }})</span>
        </h3>
        <Desc :desc="binding.desc" />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { desc, bindings } from '~/data/binding'

export default defineComponent({
  setup() {
    return {
      desc,
      bindings,
    }
  },
})
</script>
