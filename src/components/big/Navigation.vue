<template>
  <nav
    ref="navBar"
    class="flex mx-auto font-semibold overflow-x-auto no-scrollbar select-none"
  >
    <div v-for="navItem, i in titles" :key="navItem" class="whitespace-nowrap">
      <router-link
        class="cursor-pointer hover:text-green-500 flex items-center"
        :class="i <= activeIndex ? 'text-teal-700 dark:text-teal-500': ''"
        :to="links[i]"
        @click="scrollInto(i)"
      >
        <span>{{ navItem }}</span>
        <el:arrow-right
          v-if="i !== (items.length - 1)"
          class="w-[3ch]"
          :class="i <= activeIndex - 1 ? 'text-teal-600 dark:text-teal-400': 'text-gray-800 dark:text-gray-200'"
        />
      </router-link>
    </div>
    <slot />
  </nav>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

const props = defineProps({
  items: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  titles: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  prefix: {
    type: String,
    default: '',
  },
  level: {
    type: Number,
    default: 0,
  },
})

const navBar = ref(null as any)
const activeIndex = ref(0)

// const loc = useBrowserLocation()

onMounted(() => {
  const arr = document.location.pathname?.split('/') || []
  let name = ''
  if (arr.length > 2)
    name = arr[arr.length - 1 - props.level]
  else
    name = props.items[0]
  const ind = props.items.indexOf(name)
  if (ind !== -1) {
    if (navBar.value) scrollInto(ind)
    activeIndex.value = ind
  }
})

const links = computed(() => {
  return props.items.map(x => props.prefix.length > 0 ? `/${props.prefix}/${x}` : `/${x}`)
})

function scrollInto(index: number) {
  (navBar.value as HTMLElement).children[index].scrollIntoView({ block: 'center', inline: 'center' })
  activeIndex.value = index
}
</script>
