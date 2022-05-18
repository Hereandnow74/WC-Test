<template>
  <table class="border-collapse bg-amber-200 text-gray-600">
    <thead>
      <th v-for="header in headers" :key="header" class="border border-gray-600 px-2">
        {{ header }}
      </th>
    </thead>
    <tbody>
      <tr v-for="row, i in rows" :key="i" class="odd:(bg-black bg-opacity-5)">
        <td
          v-for="value in row"
          :key="value"
          class="border border-gray-600 px-2"
          :class="typeof value === 'object' ? value[1] : ''"
        >
          {{ typeof value === 'object' ? value[0] : value }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang='ts' setup>
import type { PropType } from '@vue/runtime-core'

defineProps({
  headers: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  rows: {
    type: Array as PropType<string[][]>,
    default: () => [[]],
  },
})

</script>
