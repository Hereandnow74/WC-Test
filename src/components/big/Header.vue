<template>
  <nav class="text-xl flex justify-between items-center px-2 fixed w-full top-0 bg-white dark:bg-[#121212] z-20">
    <ci:hamburger class="cursor-pointer min-w-6 hover:text-green-500" @click="() => toggleSideMenu()" />

    <Navigation :items="routes" :titles="titles" :level="1" class="text-base md:text-xl">
    </Navigation>
    <ModeButton class="hidden lg:block" />
    <SideMenu :class="showSideMenu ? 'translate-x-0' : '-translate-x-full'" />
  </nav>
</template>

<script lang="ts" setup>
import { showSideMenu, toggleSideMenu } from '~/logic'

const titles = ['World', 'Intensity', 'Origin', 'Binding & Lure', 'Heritage', 'Talents & Perks', 'Companions']
const routes = ['world', 'intensity', 'origin', 'binding', 'heritage', 'talents', 'companions']

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
