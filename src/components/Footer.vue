
<template>
  <div class="fixed bottom-0 w-full">
    <div
      class="min-w-[350px] max-w-[440px] rounded-t-3xl mx-auto text-center border relative transition-all"
      bg="dark:gray-900 green-300"
      :class="visible ? 'h-[720px]': 'h-6'"
    >
      <div>
        Budget: {{ budget }}
        <span
          class="absolute inline-block right-4 text-xl cursor-pointer hover:text-green-500"
          @click="toggleFull"
        >
          <ic:round-unfold-more />
        </span>
      </div>
      <div>
        {{ startingWorld }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '~/store/store'

const { budget, startingWorld } = useStore()

const [visible, toggleFull] = useToggle()
</script>
