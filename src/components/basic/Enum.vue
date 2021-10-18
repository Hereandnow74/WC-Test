<template>
  <div @click.stop>
    <div v-if="list.length" class="">
      [
      <router-link v-for="el, i in listComputed" :key="el.title" :to="{path: '/'+LINKS[el], hash:'#'+el}">
        <span v-if="i != 0">, </span><span class="text-blue-600 dark:text-blue-300">{{ el }}</span>
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

const props = defineProps({
  list: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  emptyMessage: {
    type: String,
    default: 'Empty',
  },
})

const listComputed = computed(() => {
  if (props.list.length > 0)
    if (typeof props.list[0] === 'object') return props.list.map(x => x.title)
  return props.list
})
</script>
