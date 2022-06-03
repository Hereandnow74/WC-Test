<template>
  <div class="p-2 flex flex-col gap-2 h-full">
    <h3 class="text-center text-lg">
      Bulk capture calculator
    </h3>
    <p>
      This calculator exist because of the 5% capture credits for T5+ 'extra' characters <router-link class="text-blue-300 underline" to="/#fivepercent">
        rule
      </router-link>
    </p>
    <div class="flex gap-1">
      <Input v-model.number="capturePercent" label="Capture %" />
      <Input v-model.number="sellPercent" label="Sell %" />
      <Input v-model.number="extraPercent" label="Extra %" />
    </div>
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

    <table class="table-fixed w-full border-collapse">
      <thead>
        <th />
        <th class="border border-gray-600">
          Capture
        </th>
        <th class="border border-gray-600">
          Sell
        </th>
        <th class="border border-gray-600">
          Sum
        </th>
      </thead>
      <tbody>
        <tr class="text-center font-semibold">
          <td class="border border-gray-600">
            Credits
          </td>
          <td class="border border-gray-600">
            <span class="text-green-500">{{ totalCapture }}</span>
          </td>
          <td class="border border-gray-600">
            <span class="text-green-500">{{ totalSell }}</span>
          </td>
          <td class="border border-gray-600">
            <span class="text-green-500">{{ totalCapture + totalSell }}</span>
          </td>
        </tr>
        <tr class="text-center font-semibold">
          <td class="border border-gray-600">
            Add To Build
          </td>
          <td class="border border-gray-600">
            <Button size="Small" bg-color="bg-yellow-600" icon="fluent:add-circle-16-regular" class="mx-auto" @click="addMod('capture')" />
          </td>
          <td class="border border-gray-600">
            <Button size="Small" bg-color="bg-yellow-600" icon="fluent:add-circle-16-regular" class="mx-auto" @click="addMod('sell')" />
          </td>
          <td class="border border-gray-600">
            <Button size="Small" bg-color="bg-yellow-600" icon="fluent:add-circle-16-regular" class="mx-auto" @click="addMod('sum')" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { CHAR_COSTS } from '~/data/constants'
import { useStore } from '~/store/store'

const { specificMods } = useStore()

const main = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
const extra = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

const capturePercent = ref(60)
const sellPercent = ref(20)
const extraPercent = ref(5)

const totalCapture = computed(() => main.value.reduce((a, x, i) => a += x * Math.ceil(CHAR_COSTS[i + 1] * (capturePercent.value / 100)), 0)
                                  + extra.value.reduce((a, x, i) => a += x * Math.floor(CHAR_COSTS[i + 1] * (extraPercent.value / 100)), 0))
const totalSell = computed(() => main.value.reduce((a, x, i) => a += x * Math.round(CHAR_COSTS[i + 1] * (sellPercent.value / 100)), 0))

function addMod(type: string) {
  let message = ''
  let mod = 0
  switch (type) {
    case 'capture':
      message = `Gained ${totalCapture.value} credits for the bulk capture.`
      mod = totalCapture.value
      break
    case 'sell':
      message = `Gained ${totalSell.value} credits for the bulk sale.`
      mod = totalSell.value
      break
    case 'sum':
      message = `Gained ${totalSell.value + totalCapture.value} credits for the bulk capture an sale.`
      mod = totalSell.value + totalCapture.value
      break
  }
  if (mod > 0)
    specificMods.value.push({ desc: message, mod })
}

</script>
