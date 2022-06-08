<template>
  <nav class="fixed flex justify-center flex-col w-full z-20 pl-10 pr-2 top-0 bg-white dark:bg-[#121212]">
    <div class="flex justify-center w-full">
      <Navigation :items="routes" :titles="titles" :level="1" class="text-base md:text-xl" />
    </div>
    <div
      class="sm:hidden cursor-pointer hover:text-green-500 absolute left-1 top-0 z-30 "
      @click="() => showSideMenu = !showSideMenu"
    >
      <ci:hamburger class="w-6 h-6" :class="{'shake delay-75': showIntro}" />
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { showSideMenu, showIntro } from '~/logic'

const titles = ['World', 'Intensity', 'Origin', 'Binding & Lure', 'Heritage', 'Talents & Perks', 'Companions']
const routes = ['world', 'intensity', 'origin', 'bindings', 'heritage', 'talents', 'companions']

</script>
