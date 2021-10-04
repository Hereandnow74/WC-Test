<template>
  <nav
    ref="navBar"
    class="flex w-max mx-auto font-semibold overflow-x-auto no-scrollbar"
  >
    <div v-for="navItem, i in titles" :key="navItem" class="whitespace-nowrap">
      <span
        class="cursor-pointer hover:text-green-500"
        :class="i <= activeIndex ? 'text-teal-700 dark:text-teal-500': ''"
        @click="go(i)"
      >{{ navItem }}</span>
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
})

const router = useRouter()

const navBar = ref(null as any)
const activeIndex = ref(0)

onMounted(() => {
  const arr = window.location.pathname?.split('/') || []
  const name = arr[arr.length - 1]
  const ind = props.items.indexOf(name)
  if (ind !== -1) scrollInto(ind)
})

function scrollInto(index: number) {
  (navBar.value as HTMLElement).children[index].scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
  activeIndex.value = index
}

function go(index: number) {
  scrollInto(index)
  if (props.prefix.length > 0) router.push(`/${props.prefix}/${props.items[index]}`)
  else router.push(`/${props.items[index]}`)
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
