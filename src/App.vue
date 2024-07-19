<template>
  <main
    class="inset-0 absolute flex flex-col "
    text="gray-700 dark:gray-200"
  >
    <div class="grid grid-cols-[1fr,auto] grid-rows-[auto,1fr] gap-1 min-h-0 justify-center justify-items-center max-h-screen">
      <Header class="col-span-2" />
      <SideMenu :class="showSideMenu ? 'max-w-0 sm:max-w-9' : 'max-w-[150px] border-r-2'" />
      <router-view class="min-h-0 w-full flex flex-col items-center overflow-y-auto overflow-x-hidden scrollbar" :class="showSideMenu ? 'sm:pl-10' : 'sm:pl-36'" />
      <component :is="Smartphone" v-if="buildLayout" class="w-[450px] bg-gray-800 pt-2 max-h-full min-h-0" />
    </div>
    <!-- <SideApps /> -->
    <Events />
    <component :is="Footer" v-if="!buildLayout" class="z-20" />
    <Search />
    <Intro v-if="showIntro" @click="showIntro = false" />

    <div v-auto-animate class="overflow-hidden">
      <BuyCompanionDialog class="z-50" />
      <component :is="SaveLoad" v-if="showSaveLoad" @click="showSaveLoad = !showSaveLoad" />
      <component :is="BuildImageSettings" v-if="showBuildImageSettings" class="z-20" @click="showBuildImageSettings = !showBuildImageSettings" />
      <component :is="Share" v-if="showShare" class="z-20" @click="showShare = !showShare" />
      <component :is="addPerkComponent" v-if="showAddPerk" @click="toggleShowAddPerk()" />
      <component :is="addWaifuPerkComponent" v-if="showAddWaifuPerk" @click="toggleShowAddWaifuPerk()" />
      <component :is="settingsComponent" v-if="showSettings" @click="toggleShowSettings()" />
      <component :is="addFicComponent" v-if="showAddFic" :fic="currentFic" @click="toggleAddFic()" />
      <BuildImage v-if="isBuildImage" />
    </div>
    <div class="overflow-hidden">
      <ConfirmDialog class="z-50" />
      <InfoDialog class="z-50" />
      <CustomDialog class="z-50" />
    </div>
  </main>
</template>

<script lang="ts" setup>
import { VERSION } from './data/constants'
import { getUserFromServer } from './logic/server'
import { useUser } from './store/user'
import {
  showSaveLoad, showShare, showSideMenu, showAddPerk, toggleShowAddPerk,
  toggleShowSettings, showSettings,
  buildImage, copyText, clearBuild, isBuildImage, toggleAddFic, showAddFic, currentFic, toggleDark, randomString, showIntro, showBuildImageSettings, buildLayout, showAddWaifuPerk, toggleShowAddWaifuPerk, currentOnline,
} from '~/logic'

const Smartphone = computed(() => defineAsyncComponent(() => import('./components/big/Smartphone.vue')))
const Footer = computed(() => defineAsyncComponent(() => import('./components/big/Footer.vue')))

const addPerkComponent = computed(() => defineAsyncComponent(() => import('./components/modals/AddPerk.vue')))
const addWaifuPerkComponent = computed(() => defineAsyncComponent(() => import('./components/modals/AddWaifuPerk.vue')))
const addFicComponent = computed(() => defineAsyncComponent(() => import('./components/modals/AddFic.vue')))
const settingsComponent = computed(() => defineAsyncComponent(() => import('./components/modals/Settings.vue')))
const SaveLoad = computed(() => defineAsyncComponent(() => import('./components/modals/SaveLoad.vue')))
const BuildImageSettings = computed(() => defineAsyncComponent(() => import('./components/modals/BuildImageSettings.vue')))
const Share = computed(() => defineAsyncComponent(() => import('./components/modals/Share.vue')))

// refreshTokens()
const { user } = useUser()
if (user.value.id)
  getUserFromServer(user.value.id)

const intro = window.localStorage.getItem('intro')
if (!intro) {
  showIntro.value = true
  window.localStorage.setItem('intro', VERSION)
}
else {
  if (intro !== VERSION) {
    showIntro.value = true
    window.localStorage.setItem('intro', VERSION)
  }
}

const seed = window.localStorage.getItem('seed')
if (!seed)
  window.localStorage.setItem('seed', randomString(12))

// Total activity counter
// let start = new Date()
// const { idle } = useIdle(10000)
// watch(idle, () => {
//   if (idle.value)
//     totalActive.value += Math.round((new Date() - start) / 1000)
//   else
//     start = new Date()
// })

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
      // case 'KeyN':
      //   e.preventDefault()
      //   settings.value.perkImages = !settings.value.perkImages
      //   break
      case 'KeyB':
        e.preventDefault()
        toggleDark()
        break
    }
  }
})

// const socket = io('https://interactive-apps.net')
// socket.on('onlineUsers', online =>
//   currentOnline.value = online)

// function someStats() {
//   const uid = window.localStorage.getItem('userId')
//   if (!uid) {
//     window.localStorage.setItem('userId', randomString(8))
//     sendCount()
//     window.localStorage.setItem('stage', '1')
//   }
//   else {
//     const stage = window.localStorage.getItem('stage')
//     if (!stage) {
//       sendCount()
//       window.localStorage.setItem('stage', '1')
//     }
//   }
//   stats2()
// }

// function stats2() {
//   const stage = window.localStorage.getItem('stage')
//   if (stage && stage === '2') return
//   const writeSet = (val: Set<any>) => JSON.stringify([...val])
//   const readSet = (val: string) => val ? new Set(JSON.parse(val)) : new Set()
//   const capComp = useStorage('capComp', new Set(), undefined, {
//     serializer: {
//       read: readSet,
//       write: writeSet,
//     },
//   })
//   const buyComp = useStorage('buyComp', new Set(), undefined, {
//     serializer: {
//       read: readSet,
//       write: writeSet,
//     },
//   })
//   const otherComp = useStorage('otherComp', new Set(), undefined, {
//     serializer: {
//       read: readSet,
//       write: writeSet,
//     },
//   })
//   const worldsStat = useStorage('worldsStat', new Set(), undefined, {
//     serializer: {
//       read: readSet,
//       write: writeSet,
//     },
//   })
//   const SWP = useStorage('SWP', new Set(), undefined, {
//     serializer: {
//       read: readSet,
//       write: writeSet,
//     },
//   })
//   const ridesStat = useStorage('ridesStat', new Set(), undefined, {
//     serializer: {
//       read: readSet,
//       write: writeSet,
//     },
//   })
//   const perksStat = useStorage('perksStat', new Set(), undefined, {
//     serializer: {
//       read: readSet,
//       write: writeSet,
//     },
//   })
//   watch(() => companions.value.length, (val, old) => {
//     if (val > old) {
//       const companion = companions.value[companions.value.length - 1]
//       if (companion.method === 'capture') capComp.value?.add(companion.uid)
//       else if (companion.method === 'buy') buyComp.value?.add(companion.uid)
//       else otherComp.value?.add(companion.uid)
//     }
//   })
//   watch(startingWorld, () => {
//     const world = `${startingWorld.value.worldName}${startingWorld.value.condition ? ` [${startingWorld.value.condition}]` : ''}`
//     worldsStat.value?.add(world)
//   })
//   watch(() => allEffects.value.length, (val, old) => {
//     if (val > old)
//       perksStat.value?.add(allEffects.value[allEffects.value.length - 1])
//   })
//   watch(() => ridePerks.value.length, (val, old) => {
//     if (val > old)
//       ridesStat.value?.add(ridePerks.value[ridePerks.value.length - 1].title)
//   })
//   watch(() => waifuPerks.value.length, (val, old) => {
//     if (val > old)
//       SWP.value?.add(waifuPerks.value[waifuPerks.value.length - 1].title)
//   })

//   const stopWatch = watch([() => capComp.value.size, () => buyComp.value.size, () => otherComp.value.size, () => worldsStat.value.size, () => SWP.value.size, () => ridesStat.value.size, () => perksStat.value.size], () => {
//     let threshold = 0
//     if (capComp.value && capComp.value.size > 100) threshold += 1
//     if (buyComp.value && buyComp.value.size > 100) threshold += 1
//     if (otherComp.value && otherComp.value.size > 100) threshold += 1
//     if (worldsStat.value && worldsStat.value.size > 10) threshold += 1
//     if (ridesStat.value && ridesStat.value.size > 10) threshold += 1
//     if (perksStat.value && perksStat.value.size > 100) threshold += 1
//     if (SWP.value && SWP.value.size > 10) threshold += 1
//     if (threshold >= 3) {
//       sendStats({
//         captured: [...(capComp.value || [])],
//         bought: [...(buyComp.value || [])],
//         other: [...(otherComp.value || [])],
//         worlds: [...(worldsStat.value || [])],
//         swp: [...(SWP.value || [])],
//         rides: [...(ridesStat.value || [])],
//         perks: [...(perksStat.value || [])],
//       }, null)
//       window.localStorage.setItem('stage', '2')
//       stopWatch()
//     }
//   })
// }

// someStats()
</script>
