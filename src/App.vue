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
    <component :is="addFicComponent" v-if="showAddFic" :fic="currentFic" @click="toggleAddFic()" />
    <BuildImage v-if="isBuildImage" />
  </main>
</template>

<script lang="ts" setup>
import { union } from 'lodash-es'
import { useStore } from './store/store'
import {
  isSupport, showSaveLoad, showShare, showSideMenu, showAddPerk, toggleShowAddPerk,
  showAddMission, toggleShowAddMission, promoteShown, toggleShowSettings, showSettings, sendStats,
  buildImage, copyText, clearBuild, isBuildImage, toggleAddFic, showAddFic, currentFic, toggleDark, randomString, sendCount,
} from '~/logic'

const { totalActive, settings, companions, startingWorld, allEffects, ridePerks, waifuPerks } = useStore()

const addPerkComponent = computed(() => defineAsyncComponent(() => import('./components/modals/AddPerk.vue')))
const addMissionComponent = computed(() => defineAsyncComponent(() => import('./components/modals/AddMission.vue')))
const addFicComponent = computed(() => defineAsyncComponent(() => import('./components/modals/AddFic.vue')))
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

onKeyStroke(['c', 's', 'd', 'n', 'b'], (e) => {
  if (e.altKey) {
    switch (e.code) {
      case 'KeyC':
        e.preventDefault()
        clearBuild()
        break
      case 'KeyS':
        e.preventDefault()
        copyText()
        break
      case 'KeyD':
        e.preventDefault()
        buildImage()
        break
      case 'KeyN':
        e.preventDefault()
        settings.value.perkImages = !settings.value.perkImages
        break
      case 'KeyB':
        e.preventDefault()
        toggleDark()
        break
    }
  }
})

function someStats() {
  const uid = window.localStorage.getItem('userId')
  if (!uid) {
    window.localStorage.setItem('userId', randomString(8))
    sendCount()
    window.localStorage.setItem('stage', '1')
  }
  else {
    const stage = window.localStorage.getItem('stage')
    if (!stage) {
      sendCount()
      window.localStorage.setItem('stage', '1')
    }
  }
  stats2()
}

function stats2() {
  const stage = window.localStorage.getItem('stage')
  if (stage && stage === '2') return
  const writeSet = (val: Set<any>) => JSON.stringify([...val])
  const readSet = (val: string) => val ? new Set(JSON.parse(val)) : new Set()
  const capComp = useStorage('capComp', new Set(), undefined, {
    serializer: {
      read: readSet,
      write: writeSet,
    },
  })
  const buyComp = useStorage('buyComp', new Set(), undefined, {
    serializer: {
      read: readSet,
      write: writeSet,
    },
  })
  const otherComp = useStorage('otherComp', new Set(), undefined, {
    serializer: {
      read: readSet,
      write: writeSet,
    },
  })
  const worldsStat = useStorage('worldsStat', new Set(), undefined, {
    serializer: {
      read: readSet,
      write: writeSet,
    },
  })
  const SWP = useStorage('SWP', new Set(), undefined, {
    serializer: {
      read: readSet,
      write: writeSet,
    },
  })
  const ridesStat = useStorage('ridesStat', new Set(), undefined, {
    serializer: {
      read: readSet,
      write: writeSet,
    },
  })
  const perksStat = useStorage('perksStat', new Set(), undefined, {
    serializer: {
      read: readSet,
      write: writeSet,
    },
  })
  watch(() => companions.value.length, (val, old) => {
    if (val > old) {
      const companion = companions.value[companions.value.length - 1]
      if (companion.method === 'capture') capComp.value?.add(companion.uid)
      else if (companion.method === 'buy') buyComp.value?.add(companion.uid)
      else otherComp.value?.add(companion.uid)
    }
  })
  watch(startingWorld, () => {
    const world = `${startingWorld.value.worldName}${startingWorld.value.condition ? ` [${startingWorld.value.condition}]` : ''}`
    worldsStat.value?.add(world)
  })
  watch(() => allEffects.value.length, (val, old) => {
    if (val > old)
      perksStat.value?.add(allEffects.value[allEffects.value.length - 1])
  })
  watch(() => ridePerks.value.length, (val, old) => {
    if (val > old)
      ridesStat.value?.add(ridePerks.value[ridePerks.value.length - 1].title)
  })
  watch(() => waifuPerks.value.length, (val, old) => {
    if (val > old)
      SWP.value?.add(waifuPerks.value[waifuPerks.value.length - 1].title)
  })

  const stopWatch = watch([() => capComp.value.size, () => buyComp.value.size, () => otherComp.value.size, () => worldsStat.value.size, () => SWP.value.size, () => ridesStat.value.size, () => perksStat.value.size], () => {
    if ((capComp.value && capComp.value.size > 100) || (buyComp.value && buyComp.value.size > 100) || (otherComp.value && otherComp.value.size > 100) || (worldsStat.value && worldsStat.value.size > 10) || (SWP.value && SWP.value.size > 20) || (ridesStat.value && ridesStat.value.size > 10) || (perksStat.value && perksStat.value.size > 100)) {
      sendStats({
        captured: [...(capComp.value || [])],
        bought: [...(buyComp.value || [])],
        other: [...(otherComp.value || [])],
        worlds: [...(worldsStat.value || [])],
        swp: [...(SWP.value || [])],
        rides: [...(ridesStat.value || [])],
        perks: [...(perksStat.value || [])],
      }, null)
      window.localStorage.setItem('stage', '2')
      stopWatch()
    }
  })
}

someStats()
</script>
