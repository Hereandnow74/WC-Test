<template>
  <nav class="text-xl flex px-2">
    <div
      ref="navBar"
      class="flex w-max mx-auto font-semibold overflow-x-auto no-scrollbar"
    >
      <div v-for="navItem, i in navItems" :key="navItem" class="whitespace-nowrap">
        <span
          class="cursor-pointer hover:text-green-500"
          :class="i <= activeIndex ? 'text-teal-700 dark:text-teal-500': ''"
          @click="go(i)"
        >{{ navItem }}</span>
        <span
          v-if="i !== (navItems.length - 1)"
          class="px-2"
          :class="i <= activeIndex - 1 ? 'text-teal-600 dark:text-teal-400': ''"
        ><el:arrow-right class="top-1 relative" /></span>
      </div>
    </div>
    <div class="right-0 absolute p-1 hidden lg:block">
      <button class="icon-btn mx-2 !outline-none" @click="toggleDark">
        <carbon-moon v-if="isDark" />
        <carbon-sun v-else />
      </button>

      <a class="icon-btn mx-2" rel="noreferrer" href="https://github.com/antfu/vitesse-lite" target="_blank" title="GitHub">
        <carbon-logo-github />
      </a>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { isDark, toggleDark } from '~/logic'

const router = useRouter()
const location = useBrowserLocation()

const navBar = ref(null)

const navItems = ['World', 'Intensity', 'Origin', 'Binding & Lure', 'Heritage', 'Talents', 'Perks', 'Companions']
const routes = ['world', 'intensity', 'origin', 'binding', 'heritage', 'talents', 'perks', 'companions']
const activeIndex = ref(0)

onMounted(() => {
  const name = location.value.pathname?.split('/')[1]
  const ind = routes.indexOf(name)
  if (ind !== -1) scrollInto(ind)
})

function scrollInto(index: number) {
  navBar.value.children[index].scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
  activeIndex.value = index
}

function go(index: number) {
  scrollInto(index)
  router.push(routes[index])
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
