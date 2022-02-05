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

    <PromoteDialog v-if="(totalActive > 60 * 60 && !promoteShown) || isSupport" />
    <SaveLoad v-if="showSaveLoad" class="z-20" @click="showSaveLoad = !showSaveLoad" />
    <Share v-if="showShare" class="z-20" @click="showShare = !showShare" />
  </main>
</template>

<script lang="ts" setup>
import { useStore } from './store/store'
import { showSideMenu, promoteShown, isSupport, showSaveLoad, showShare } from '~/logic'

const { totalActive } = useStore()
let start = new Date()

const { idle } = useIdle(10000)

watch(idle, () => {
  if (idle.value)
    totalActive.value += Math.round((new Date() - start) / 1000)
  else
    start = new Date()
})
</script>
