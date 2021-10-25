<template>
  <div @click.stop>
    <div v-if="list.length" class="">
      [
      <router-link v-for="el, i in listComputed" :key="el" :to="{path: path || '/'+LINKS[el], hash:'#'+el}" :class="color">
        <span v-if="i != 0" class="text-orange-500">, </span>
        <span class="hover:underline">{{ listTitles[i] || el }}</span>
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
  color: {
    type: String,
    default: 'text-blue-600 dark:text-blue-300',
  },
  path: {
    type: String,
    default: '',
  },
})

const listComputed = computed(() => {
  if (props.list.length > 0)
    if (typeof props.list[0] === 'object') return props.list.map(x => x.title)
  return props.list
})

const listTitles = computed(() => {
  if (props.list.length > 0 && props.list[0].title2)
    return props.list.map(x => x.title2)
  if (props.list.length > 0 && typeof props.list[0] === 'object')
    return props.list.map(x => x.title + (x.secondary ? `(${x.secondary})` : '') + (x.count && x.count > 1 ? `(x${x.count})` : ''))
  return []
})
</script>
