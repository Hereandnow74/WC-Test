<template>
  <div class="">
    <Desc :desc="desc" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <div class="column-count-2">
      <div
        v-for="heritage in heritages"
        :id="heritage.title"
        :key="heritage.title"
        class="bg-fuchsia-200 dark:bg-fuchsia-900 p-2 mb-2 inline-block"
      >
        <h3 class="text-center text-xl">
          {{ heritage.title }} <span text="gray-600 dark:gray-400">(Cost: {{ heritage.cost }})</span>
        </h3>
        <Desc :desc="heritage.desc" />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { desc, heritages } from '~/data/heritage'

export default defineComponent({
  setup() {
    return {
      heritages,
      desc,
    }
  },
})
</script>
