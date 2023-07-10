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
      <div class="flex gap-1">
        Limit DR from <NumberInput v-model="minDR" :min="0" :max="10" />
        to <NumberInput v-model="maxDR" :min="0" :max="10" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { allWorldsNoCondition } from '~/data/constants'
import { randomWorld } from '~/logic'

const world = ref<any>({})
const minDR = ref(0)
const maxDR = ref(10)

function getRandomWorld() {
  const rolledWorld = randomWorld(minDR.value, 0, maxDR.value - minDR.value)[0]
  if (rolledWorld)
    world.value = rolledWorld
  else
    world.value = { worldName: 'Nothing Found', rating: 0 }
}

getRandomWorld()
</script>
