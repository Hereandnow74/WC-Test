<template>
  <nav class="text-xl flex px-2">
    <div class="relative top-1 pr-2 cursor-pointer hover:text-green-500" @click="() => toggleSideMenu()">
      <ci:hamburger />
    </div>
    <Navigation :items="routes" :titles="titles">
      <ModeButton class="hidden absolute lg:block right-0" />
    </Navigation>
    <SideMenu :class="showSideMenu ? 'translate-x-0' : '-translate-x-32'" />
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
