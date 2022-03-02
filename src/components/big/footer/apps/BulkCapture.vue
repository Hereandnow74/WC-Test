<template>
  <div class="p-2 flex flex-col gap-2 h-full">
    <h3 class="text-center text-lg">
      Bulk capture calculator
    </h3>
    <p>This calculator exist because of the 5% capture credits for T5+ 'extra' characters rule</p>
    <table class="table-fixed w-full">
      <thead>
        <th class="w-1/5">
          Tier
        </th>
        <th class="">
          Main cast
        </th>
        <th class="">
          Extra
        </th>
      </thead>
      <tbody>
        <tr v-for="t in 10" :key="t">
          <td class="text-center">
            T{{ t }}
          </td>
          <td><Input v-model.number="main[t - 1]" :placeholder="`Main T${t} count`" /></td>
          <td><Input v-model.number="extra[t - 1]" :placeholder="`Extra T${t} count`" /></td>
        </tr>
      </tbody>
    </table>
    <div>
      <div>Total Capture reward: <span class="text-green-500 text-lg">{{ totalCapture }}</span></div>
      <div>Total Sell reward: <span class="text-green-500 text-lg">{{ totalSell }}</span></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CHAR_COSTS } from '~/data/constants'

const main = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
const extra = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

const totalCapture = computed(() => main.value.reduce((a, x, i) => a += x * Math.ceil(CHAR_COSTS[i] * 0.6), 0)
                                  + extra.value.reduce((a, x, i) => a += x * Math.floor(CHAR_COSTS[i] * 0.05), 0))
const totalSell = computed(() => main.value.reduce((a, x, i) => a += x * Math.round(CHAR_COSTS[i] * 0.2), 0))

</script>
