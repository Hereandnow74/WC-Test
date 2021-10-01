<template>
  <div class="p-2">
    <p class="p-2 bg-gray-200 dark:bg-teal-900 max-w-4xl mx-auto">
      {{ desc }}
    </p>
    <div class="flex flex-wrap justify-between mt-4">
      <div
        v-for="item in origin"
        :key="item.title"
        class="bg-light-blue-300 dark:bg-light-blue-900 p-2 md:w-[calc(50%-0.5rem)] xl:w-[calc(33%-0.5rem)] mb-4"
      >
        <div class="">
          <h4 class="text-xl text-center mb-1">
            {{ item.title }} <span text="gray-600 dark:gray-400">(Cost: {{ item.cost }})</span>
          </h4>
          <img class="max-h-[400px] w-1/2 object-contain self-center inline-block float-right" :src="item.image" :alt="item.title">
          <p class="">
            {{ item.desc }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { desc, origin } from '~/data/origin'

export default defineComponent({
  setup() {
    return {
      desc,
      origin,
    }
  },
})
</script>
