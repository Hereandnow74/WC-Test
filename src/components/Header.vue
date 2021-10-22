<template>
  <nav class="text-xl flex px-2">
    <div class="relative top-1 pr-2 cursor-pointer hover:text-green-500" @click="() => toggleSideMenu()">
      <ci:hamburger />
    </div>
    <Navigation :items="routes" :titles="titles" :level="1" class="text-base md:text-xl">
      <ModeButton class="hidden fixed lg:block right-0 z-20" />
    </Navigation>
    <SideMenu :class="showSideMenu ? 'translate-x-0' : '-translate-x-36'" />
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
