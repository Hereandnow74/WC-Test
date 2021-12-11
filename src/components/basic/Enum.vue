<template>
  <div @click.stop>
    <div v-if="list.length" class="">
      [
      <template v-for="el, i in list" :key="el.title || el">
        <router-link
          :to="{path: path || '/'+LINKS[el.title || el], hash:'#'+(el.title || el), query: {q: (QUERIES[el.title || el])}}"
          :class="color"
        >
          <span v-if="i != 0" class="text-orange-500">, </span>
          <span class="hover:underline">{{ el.title2 || el.title || el }}</span>
          <span v-if="el?.anything?.length">({{ el.anything }})</span>
          <span v-if="el.count && el.count > 1" class="">(x{{ el.count }})</span>
          <span v-if="el?.target?.length || el.waifu" class="">({{ el.target || el.waifu }})</span>
          <span v-if="el.complex && isArray(el.complex)">
            <List :list-key="'target'" :list="el.complex" color="text-green-500" start="(" end=")" />
            <List :list-key="'flavor'" :list="el.complex" color="text-violet-400" start="{" end="}" />
          </span>
        </router-link>
        <span v-if="editMode" class="text-red-400 hover:text-red-500 cursor-pointer" @click.stop="deletePerk(el)"><fluent:delete-20-filled /></span>
      </template>
      ]
    </div>
    <div v-if="emptyMessage.length && !list.length">
      {{ emptyMessage }}
    </div>
  </div>
</template>

<script lang='ts' setup>
import { isArray } from 'lodash'
import type { PropType } from 'vue'
import { LINKS, QUERIES } from '~/data/constatnts'

defineProps({
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
  editMode: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['deletePerk'])

function deletePerk(el: any) {
  emit('deletePerk', el)
}
</script>
