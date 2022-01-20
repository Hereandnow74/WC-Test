<template>
  <div class="flex flex-col justify-between h-full p-1">
    <div>
      <div class="py-2 text-center">
        1 out of {{ allWorldsNoCondition.length }}
      </div>
      <WorldCard :world="world" class=" flex-grow-0" />
    </div>
    <div class="flex gap-2 self-center">
      <Button label="Back" icon="akar-icons:arrow-back-thick" size="Small" @click="toggleAppMode" />
      <Button label="Random World" size="Small" @click="getRandomWorld" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import WorldCard from '~/components/WorldCard.vue'
import { allWorldsNoCondition } from '~/data/constants'
import { randomWorld, toggleAppMode } from '~/logic'

const world = ref<any>({})

function getRandomWorld() {
  world.value = randomWorld()
}

getRandomWorld()
</script>
