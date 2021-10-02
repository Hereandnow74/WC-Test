<template>
  <div class="p-1 flex">
    <button class="icon-btn mx-2 !outline-none" @click="toggleDark">
      <carbon-moon v-if="isDark" />
      <carbon-sun v-else />
    </button>

    <a class="icon-btn mx-2" rel="noreferrer" href="https://gitlab.com/omicr0n/waifu-catalog" target="_blank" title="GitLab">
      <ph:gitlab-logo-duotone />
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
