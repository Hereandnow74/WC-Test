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
        Limit to DR <NumberInput v-model="DRLimit" :min="0" :max="10" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { allWorldsNoCondition } from '~/data/constants'
import { randomWorld } from '~/logic'

const world = ref<any>({})
const DRLimit = ref(0)

function getRandomWorld() {
  const limitTo = DRLimit.value > 0 ? DRLimit.value : 0
  const mp = limitTo === 0 ? 11 : 0
  world.value = randomWorld(limitTo, mp, mp)[0]
}

getRandomWorld()
</script>
