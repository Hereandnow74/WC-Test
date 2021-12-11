<template>
  <div
    ref="sidemenu"
    class="fixed bottom-0 top-0 left-0 text-lg bg-gray-200 dark:bg-gray-700 flex flex-col gap-2 items-start pt-2
    z-30 border-gray-400 overflow-x-hidden transition-width"
  >
    <button class="icon-btn mx-2 !outline-none hover:text-red-400 self-end" @click="() => toggleSideMenu()">
      <tabler:arrow-bar-to-right v-if="showSideMenu" />
      <tabler:arrow-bar-to-left v-else />
    </button>
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
    <button class="icon-text-btn mx-2 !outline-none whitespace-nowrap" title="Toggle on/off DLCs" @click="() => toggleDLC()">
      <template v-if="isDLC">
        <mdi:puzzle-check-outline /><span>DLC's on</span>
      </template>
      <template v-else>
        <mdi:puzzle-remove-outline /><span>DLC's off</span>
      </template>
    </button>
    <h3 v-if="!showSideMenu" class="mx-2 opacity-50 border-b">
      Actions
    </h3>
    <div v-else class="bg-gray-600 dark:bg-gray-200 rounded my-2 w-5 h-[2px] mx-2"></div>
    <div class="icon-text-btn mx-2 whitespace-nowrap" title="Propose a Perk" @click="() => toggleShowAddPerk()">
      <carbon:add-alt />Add Perk
    </div>
    <div class="icon-text-btn mx-2 whitespace-nowrap" title="Propose a Mission" @click="() => toggleShowAddMission()">
      <fluent:book-question-mark-24-regular />Add Mission
    </div>
    <router-link class="icon-text-btn mx-2 whitespace-nowrap" title="Challenges" to="/challenges">
      <ph:sword />Challenges
    </router-link>
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
    <router-link class="icon-text-btn mx-2" title="Rules" to="/">
      <codicon:book />Rules
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
    <teleport to="#app">
      <component :is="addPerkComponent" v-if="showAddPerk" @click="toggleShowAddPerk" />
      <component :is="addMissionComponent" v-if="showAddMission" @click="toggleShowAddMission" />
    </teleport>
  </div>
</template>

<script lang='ts' setup>
import {
  isDark, toggleDark, toggleSideMenu, showSideMenu, showAddPerk, toggleShowAddPerk, toggleDLC,
  isDLC, showAddMission, toggleShowAddMission,
} from '~/logic'

const sidemenu = ref(null)

const addPerkComponent = computed(() => defineAsyncComponent(() => import('../modals/AddPerk.vue')))
const addMissionComponent = computed(() => defineAsyncComponent(() => import('../modals/AddMission.vue')))

</script>

<style>
.transition-width {
  transition-property: max-width;
  @apply ease-in-out;
  @apply duration-150;
}
</style>
