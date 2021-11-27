<template>
  <div
    ref="sidemenu"
    class="fixed left-0 top-0 bottom-0 bg-gray-200 dark:bg-gray-700 flex flex-col gap-2 items-start pt-2
    transition-transform transform z-10"
  >
    <button class="icon-btn mx-2 !outline-none hover:text-red-400" @click="() => toggleSideMenu()">
      <fa-regular:window-close />
    </button>
    <h3 class="mx-2 opacity-50 border-b">
      Options
    </h3>
    <button class="icon-text-btn mx-2 !outline-none" @click="() => toggleDark()">
      <template v-if="isDark">
        <carbon-moon /><span>Dark</span>
      </template>
      <template v-else>
        <carbon-sun /><span>Light</span>
      </template>
    </button>
    <h3 class="mx-2 opacity-50 border-b">
      Links
    </h3>
    <a
      class="icon-text-btn mx-2"
      rel="noreferrer"
      href="https://gitlab.com/omicr0n/waifu-catalog"
      target="_blank"
      title="GitLab"
    >
      <ph:gitlab-logo-duotone /> GitLab
    </a>
    <a
      class="icon-text-btn mx-2"
      href="https://discord.gg/cZf4U5rmPV"
      target="_blank"
      rel="noopener noreferrer"
    >
      <simple-icons:discord /> Discord
    </a>
    <h3 class="mx-2 opacity-50 border-b">
      Menu
    </h3>
    <router-link class="icon-text-btn mx-2" to="/everything">
      <bi:list-ul />Index
    </router-link>
    <router-link class="icon-text-btn mx-2" to="/">
      <codicon:book />Rules
    </router-link>
    <router-link class="icon-text-btn mx-2" to="/credits">
      <bi:people-fill />Credits
    </router-link>
    <router-link class="icon-text-btn mx-2" to="/about">
      <fa-solid:info-circle />About
    </router-link>
    <router-link class="icon-text-btn mx-2" to="/changelog">
      <entypo:new />Changelog
    </router-link>
    <router-link class="icon-text-btn mx-2" to="/help">
      <bx:bx-help-circle />Help
    </router-link>
  </div>
</template>

<script lang='ts' setup>
import { isDark, toggleDark, toggleSideMenu, showSideMenu } from '~/logic'

const sidemenu = ref(null)

onClickOutside(sidemenu, event => showSideMenu.value = false)
</script>
