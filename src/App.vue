<template>
  <main
    class="inset-0 absolute flex flex-col"
    text="gray-700 dark:gray-200"
  >
    <Header />
    <div class="flex w-full min-h-0 justify-center">
      <SideMenu :class="showSideMenu ? 'max-w-0 sm:max-w-9' : 'max-w-[150px] border-r-2'" />
      <router-view class="min-h-0 mt-6 sm:mt-8 w-full" :class="showSideMenu ? 'sm:pl-10' : 'sm:pl-36'" />
    </div>
    <SideApps />
    <Footer />
    <ConfirmDialog class="z-20" />
    <InfoDialog class="z-20" />
  </main>
</template>

<script lang="ts" setup>
import { showSideMenu } from '~/logic'
</script>
