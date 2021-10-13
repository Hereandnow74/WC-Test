<template>
  <div class="p-1 flex">
    <button class="icon-btn mx-2 !outline-none" @click="() => toggleDark()">
      <carbon-moon v-if="isDark" />
      <carbon-sun v-else />
    </button>

    <a
      class="icon-btn mr-2 !outline-none"
      href="https://discord.gg/cZf4U5rmPV"
      target="_blank"
      rel="noopener noreferrer"
    >
      <simple-icons:discord />
    </a>
  </div>
</template>

<script lang='ts'>
import { isDark, toggleDark } from '~/logic'

export default defineComponent({
  name: 'ModeButton',

  setup() {
    return {
      isDark,
      toggleDark,
    }
  },
})
</script>
