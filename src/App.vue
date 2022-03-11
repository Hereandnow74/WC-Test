<template>
  <main
    class="inset-0 absolute flex flex-col"
    text="gray-700 dark:gray-200"
  >
    <Header />
    <div class="flex w-full min-h-0 justify-center">
      <SideMenu :class="showSideMenu ? 'max-w-0 sm:max-w-9' : 'max-w-[150px] border-r-2'" />
      <router-view class="min-h-0 mt-6 sm:mt-8 w-full flex flex-col items-center" :class="showSideMenu ? 'sm:pl-10' : 'sm:pl-36'" />
    </div>
    <SideApps />
    <Footer />
    <ConfirmDialog class="z-20" />
    <InfoDialog class="z-20" />

    <component :is="PromoteDialog" v-if="(totalActive > 60 * 60 && !promoteShown) || isSupport" />
    <component :is="SaveLoad" v-if="showSaveLoad" class="z-20" @click="showSaveLoad = !showSaveLoad" />
    <component :is="Share" v-if="showShare" class="z-20" @click="showShare = !showShare" />
    <component :is="addPerkComponent" v-if="showAddPerk" @click="toggleShowAddPerk()" />
    <component :is="addMissionComponent" v-if="showAddMission" @click="toggleShowAddMission()" />
    <component :is="settingsComponent" v-if="showSettings" @click="toggleShowSettings()" />
    <BuildImage />
  </main>
</template>

<script lang="ts" setup>
import { union } from 'lodash-es'
import { useStore } from './store/store'
import {
  isSupport, showSaveLoad, showShare, showSideMenu, showAddPerk, toggleShowAddPerk,
  showAddMission, toggleShowAddMission, promoteShown, toggleShowSettings, showSettings, sendStats,
  buildImage, copyText, clearBuild,
} from '~/logic'

const { totalActive } = useStore()

const addPerkComponent = computed(() => defineAsyncComponent(() => import('./components/modals/AddPerk.vue')))
const addMissionComponent = computed(() => defineAsyncComponent(() => import('./components/modals/AddMission.vue')))
const settingsComponent = computed(() => defineAsyncComponent(() => import('./components/modals/Settings.vue')))
const PromoteDialog = computed(() => defineAsyncComponent(() => import('./components/modals/dialogs/PromoteDialog.vue')))
const SaveLoad = computed(() => defineAsyncComponent(() => import('./components/modals/SaveLoad.vue')))
const Share = computed(() => defineAsyncComponent(() => import('./components/modals/Share.vue')))

// Total activity counter
let start = new Date()
const { idle } = useIdle(10000)
watch(idle, () => {
  if (idle.value)
    totalActive.value += Math.round((new Date() - start) / 1000)
  else
    start = new Date()
})

onKeyStroke(['c', 's', 'd'], (e) => {
  if (e.altKey) {
    switch (e.key) {
      case 'c':
        e.preventDefault()
        clearBuild()
        break
      case 's':
        e.preventDefault()
        copyText()
        break
      case 'd':
        console.log('Its a D')
        e.preventDefault()
        buildImage()
        break
    }
  }
})

function randomString(length: number, chars: string) {
  let result = ''
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

function someStats() {
  const uid = window.localStorage.getItem('userId')
  if (!uid) {
    window.localStorage.setItem('userId', randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'))
    const saves = window.localStorage.getItem('saves')
    if (saves) {
      const savesArray = Object.values(JSON.parse(saves))

      const worlds = union(...savesArray.map(x => x.startingWorld.worldName))
      const perks = union(...savesArray.map(x => x.allEffects))
      const companions = union(...savesArray.map(x => x.companions.map(c => c.uid)))
      sendStats({ perks, companions, worlds }, () => {})
    }
  }
}

someStats()
</script>
