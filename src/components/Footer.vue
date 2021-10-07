
<template>
  <div class="fixed bottom-0 w-full">
    <div
      class="min-w-[350px] max-w-[440px] rounded-t-3xl mx-auto border relative transition-all"
      bg="dark:gray-900 green-300"
      :class="visible ? 'h-[720px]': 'h-6'"
    >
      <div class="text-center">
        Budget: {{ budget }}
        <span
          class="absolute inline-block right-4 text-xl cursor-pointer hover:text-green-500"
          @click="() => toggleFull()"
        >
          <ic:round-unfold-more />
        </span>
      </div>
      <div class="p-2">
        <h3 class="text-lg">
          World
        </h3>
        <div class="flex gap-2">
          <div class="flex gap-2">
            <span class="text-gray-500 dark:text-gray-400">Name:</span>
            <span>{{ startingWorld.worldName }}</span>
          </div>
          <div v-if="startingWorld.condition" class="flex gap-2">
            <span class="text-gray-500 dark:text-gray-400">Condition:</span>
            <span>{{ startingWorld.condition?.length ?
              startingWorld.condition[0].name : startingWorld.condition }}</span>
          </div>
          <div class="flex gap-2">
            <span class="text-gray-500 dark:text-gray-400">Rating:</span>
            <span>{{ startingWorld.rating }}</span>
          </div>
        </div>
        <h3 class="text-lg">
          Origin
        </h3>
        <div v-html="originText" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '~/store/store'

const { budget, startingWorld, startingOrigin } = useStore()

const originText = computed(() => {
  const variants = {
    'Drop-In': 'Dropped-In',
    'Walk-In': 'Walked-In',
    'Extra': `'Extra' with <b>${startingOrigin.value.cost}</b> additional cost`,
    'Substitute': `Substitue as a <b>${startingOrigin.value.character}</b> of T${startingOrigin.value.tier}`,
    'Possess': `Possess a <b>${startingOrigin.value.character}</b> of T${startingOrigin.value.tier}`,
  } as Record<string, string>

  return variants[startingOrigin.value.title]
})

const [visible, toggleFull] = useToggle()
</script>
