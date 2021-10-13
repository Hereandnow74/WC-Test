<template>
  <div>
    <div v-if="list.length" class="">
      [
      <router-link v-for="el, i in list" :key="el.title" :to="{path, hash:'#'+el.title}">
        <span v-if="i != 0">, </span><span class="text-blue-500">{{ el.title }}</span>
      </router-link>
      ]
    </div>
    <div v-if="emptyMessage.length && !list.length">
      {{ emptyMessage }}
    </div>
  </div>
</template>

<script lang='ts' setup>
import type { PropType } from 'vue'

defineProps({
  list: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  emptyMessage: {
    type: String,
    default: 'Empty',
  },
  path: {
    type: String,
    default: '/',
  },
})
</script>
