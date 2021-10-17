<template>
  <div @click.stop>
    <div v-if="list.length" class="">
      [
      <router-link v-for="el, i in list" :key="el.title" :to="{path: '/'+LINKS[el.title], hash:'#'+el.title}">
        <span v-if="i != 0">, </span><span class="text-blue-600 dark:text-blue-300">{{ el.title }}</span>
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
import { LINKS } from '~/data/constatnts'

defineProps({
  list: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  emptyMessage: {
    type: String,
    default: 'Empty',
  },
  // path: {
  //   type: String,
  //   default: '/',
  // },
})
</script>
