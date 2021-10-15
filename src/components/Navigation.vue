<template>
  <nav
    ref="navBar"
    class="flex w-max mx-auto font-semibold overflow-x-auto no-scrollbar"
  >
    <div v-for="navItem, i in titles" :key="navItem" class="whitespace-nowrap">
      <router-link
        class="cursor-pointer hover:text-green-500"
        :class="i <= activeIndex ? 'text-teal-700 dark:text-teal-500': ''"
        :to="links[i]"
        @click="scrollInto(i)"
      >
        {{ navItem }}
      </router-link>
      <span
        v-if="i !== (items.length - 1)"
        class="px-2 top-1 relative"
        :class="i <= activeIndex - 1 ? 'text-teal-600 dark:text-teal-400': ''"
      ><el:arrow-right /></span>
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
    name = arr[arr.length - 1]
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

<style>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
