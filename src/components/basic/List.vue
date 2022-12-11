<template>
  <span v-if="list.length && list[0][listKey]">
    <span class="text-gray-100">{{ start }}</span>
    <span v-for="el, i in list" :key="i" :class="color">
      <span v-if="i != 0" class="text-orange-500">, </span>
      {{ el[listKey].replace(/ Talent| Defense/, '') }}
    </span>
    <span class="text-gray-100 ml-1"> {{ end }}</span>
  </span>
</template>

<script lang='ts' setup>
import type { PropType } from 'vue'

defineProps({
  list: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  color: {
    type: String,
    default: 'text-blue-600 dark:text-blue-300',
  },
  start: {
    type: String,
    default: '[',
  },
  end: {
    type: String,
    default: ']',
  },
  listKey: {
    type: String,
    default: '',
  },
})

</script>
