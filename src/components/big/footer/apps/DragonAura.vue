<template>
  <div class="flex flex-col gap-2 h-full p-2 scrollbar overflow-y-auto">
    <Desc
      class="p-0"
      :desc="'If you think calculating Dragon Aura actual effect is too difficult, use this simple calculator! Just choose the target Aura Tier and see how much time would it take for them to be overcome with lust and come running into your hands.'"
    />
    <NumberInput v-model="auraTier" :min="4" :max="50" label="Target Aura Tier" class="whitespace-nowrap" />

    <Table :headers="['Time', 'Distance', 'Example']" :rows="auraData" class="text-sm font-semibold" />
  </div>
</template>

<script lang="ts" setup>
import { toReadableTime } from '~/logic'

const max = 67108864
const auraTier = ref(4)
const auraData = ref([
  [0, '<50 m', 'Same building'],
  [0, '<500 m', 'Same neighborhood'],
  [0, '<5 km', 'Same city'],
  [0, '<50 km', 'Same metropolis'],
  [0, '<500 km', 'Same region'],
  [0, '<5 Mn', 'Same continent'],
  [0, '<50 Mn', 'Same planet'],
  [0, '<500 Mn', 'Same planetary orbit (small)'],
  [0, '<5 Gm', 'Same planetary orbit (medium) '],
  [0, '<0.334 AU', 'Same planetary orbit (distant) '],
  [0, '<3.34 AU', 'Solar system (inner planets) '],
  [0, '<33.423 AU', 'Solar system (outer planets) '],
  [0, '<334.229 AU', 'Kuiper Belt'],
  [0, '<3342.29 AU', 'Oort Cloud (inner) '],
  [0, '<0.528 LY', 'Interstellar space '],
  [0, '<5.285 LY', 'Neighboring stars'],
  [0, '<50.285 LY', 'Same star cluster'],
  [0, '<500.285 LY', 'Same galaxy (very small)'],
  [0, '<5 KLY', 'Same galaxy (small)'],
])

watchEffect(() => {
  auraData.value.forEach((x, i) => {
    x[0] = toReadableTime((max / Math.pow(2, auraTier.value - 4)) / Math.pow(2, -i))
  })
})

</script>
