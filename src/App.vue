<template>
  <main
    class="inset-0 absolute flex flex-col"
    text="gray-700 dark:gray-200"
  >
    <Header />
    <router-view class="flex-grow min-h-0 mt-6 sm:mt-8" />
    <SideApps />
    <Footer />
    <ConfirmDialog class="z-20" />
    <InfoDialog class="z-20" />
  </main>
</template>
