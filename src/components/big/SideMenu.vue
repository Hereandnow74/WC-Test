<template>
  <div
    ref="sidemenu"
    class="fixed bottom-0 top-0 left-0 text-lg bg-gray-200 dark:bg-gray-700 flex flex-col gap-2 items-start
     pt-2 z-30 border-gray-400 overflow-x-hidden transition-width overflow-y-auto scrollbar"
  >
    <button
      class="icon-btn mx-2 !outline-none hover:text-red-400 self-end"
      :class="{'shake delay-75': showIntro}"
      @click="() => showSideMenu = !showSideMenu"
    >
      <tabler:arrow-bar-to-right v-if="showSideMenu" />
      <tabler:arrow-bar-to-left v-else />
    </button>
    <h3 v-if="!showSideMenu" class="mx-2 opacity-50 border-b">
      You
    </h3>
    <div v-else class="bg-gray-600 dark:bg-gray-200 rounded my-2 w-5 h-[2px] mx-2"></div>
    <router-link v-if="user && user.name" class="icon-text-btn mx-2" :title="user.name" to="/auth/user">
      <mdi:user />{{ user.name }}
    </router-link>
    <router-link v-else class="icon-text-btn mx-2" title="Login" to="/auth/login">
      <mdi:user />Login
    </router-link>
    <h3 v-if="!showSideMenu" class="mx-2 opacity-50 border-b">
      Options
    </h3>
    <div v-else class="bg-gray-600 dark:bg-gray-200 rounded my-2 w-5 h-[2px] mx-2"></div>
    <button class="icon-text-btn mx-2 !outline-none" title="Toggle dark/light mode" @click="() => toggleDark()">
      <template v-if="isDark">
        <carbon-moon /><span>Dark</span>
      </template>
      <template v-else>
        <carbon-sun /><span>Light</span>
      </template>
    </button>
    <div
      class="icon-text-btn mx-2 whitespace-nowrap"
      :class="{'shake delay-150': showIntro}"
      title="Settings"
      @click="() => toggleShowSettings()"
    >
      <majesticons:cog-line />Settings
    </div>
    <h3 v-if="!showSideMenu" class="mx-2 opacity-50 border-b">
      Actions
    </h3>
    <div v-else class="bg-gray-600 dark:bg-gray-200 rounded my-2 w-5 h-[2px] mx-2"></div>
    <div class="icon-text-btn mx-2 whitespace-nowrap" title="Propose a Perk" @click="() => toggleShowAddPerk()">
      <carbon:add-alt />Add Perk
    </div>
    <h3 v-if="!showSideMenu" class="mx-2 opacity-50 border-b">
      Links
    </h3>
    <div v-else class="bg-gray-600 dark:bg-gray-200 rounded my-2 w-5 h-[2px] mx-2"></div>
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
      title="Discord"
    >
      <simple-icons:discord /> Discord
    </a>
    <a
      class="icon-text-btn mx-2 !text-red-500 !font-bold"
      href="https://www.patreon.com/interactiveapps"
      target="_blank"
      rel="noopener noreferrer"
      title="Patreon"
    >
      <ri:patreon-line /> Patreon
    </a>
    <h3 v-if="!showSideMenu" class="mx-2 opacity-50 border-b">
      Menu
    </h3>
    <div v-else class="bg-gray-600 dark:bg-gray-200 rounded my-2 w-5 h-[2px] mx-2"></div>
    <router-link class="icon-text-btn mx-2" :class="{'shake': showIntro}" title="Rules" to="/">
      <codicon:book />Rules
    </router-link>
    <router-link class="icon-text-btn mx-2" title="Missions" to="/missions">
      <fluent:book-question-mark-24-regular />Missions
    </router-link>
    <router-link class="icon-text-btn mx-2 whitespace-nowrap" title="Challenges" to="/challenges">
      <ph:sword />Challenges
    </router-link>
    <router-link class="icon-text-btn mx-2" title="WC Fics" to="/fics">
      <fa-solid:book />Fanfics
    </router-link>
    <router-link class="icon-text-btn mx-2" title="WC Builds" to="/sharedBuilds">
      <bx:bx-spreadsheet />Builds
    </router-link>
    <router-link class="icon-text-btn mx-2" title="Help" to="/help">
      <bx:bx-help-circle />Help
    </router-link>
    <router-link class="icon-text-btn mx-2" title="Index" to="/everything">
      <bi:list-ul />Index
    </router-link>
    <router-link class="icon-text-btn mx-2" title="Changelog" to="/changelog">
      <entypo:new />Changelog
    </router-link>
    <router-link class="icon-text-btn mx-2" title="Credits" to="/credits">
      <bi:people-fill />Credits
    </router-link>
    <router-link class="icon-text-btn mx-2" title="About" to="/about">
      <fa-solid:info-circle />About
    </router-link>
  </div>
</template>

<script lang='ts' setup>
import {
  isDark, toggleDark, showSideMenu, toggleShowAddPerk,
  toggleShowSettings, showIntro,
} from '~/logic'
import { useUser } from '~/store/user'

const { user } = useUser()

const sidemenu = ref(null)

</script>
