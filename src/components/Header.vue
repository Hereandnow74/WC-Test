<template>
  <nav class="text-xl flex px-2">
    <div class="block lg:hidden relative top-1 pr-2 cursor-pointer hover:text-green-500" @click="toggleSidebar">
      <ci:hamburger />
    </div>
    <Navigation :items="routes" :titles="titles">
      <ModeButton class="hidden absolute lg:block right-0" />
    </Navigation>
    <div
      class="fixed left-0 top-0 bottom-0 mt-9 bg-gray-200 dark:bg-gray-700 transition-transform transform"
      :class="showSidebar ? 'translate-x-0' : '-translate-x-32'"
    >
      <ModeButton />
    </div>
  </nav>
</template>

<script lang="ts" setup>
const titles = ['World', 'Intensity', 'Origin', 'Binding & Lure', 'Heritage', 'Talents & Perks', 'Companions']
const routes = ['world', 'intensity', 'origin', 'binding', 'heritage', 'talents', 'companions']

const [showSidebar, toggleSidebar] = useToggle()

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
