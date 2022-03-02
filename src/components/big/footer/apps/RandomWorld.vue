<template>
  <div class="flex flex-col justify-between h-full p-1">
    <div>
      <div class="py-2 text-center">
        1 out of {{ allWorldsNoCondition.length }}
      </div>
      <WorldCard :world="world" class=" flex-grow-0" />
    </div>
    <div class="flex gap-2 self-center">
      <Button label="Random World" size="Small" @click="getRandomWorld" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { allWorldsNoCondition } from '~/data/constants'
import { randomWorld } from '~/logic'

const world = ref<any>({})

function getRandomWorld() {
  world.value = randomWorld()
}

getRandomWorld()
</script>
