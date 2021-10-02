<template>
  <main
    class="inset-0 absolute flex flex-col"
    text="gray-700 dark:gray-200"
  >
    <Header />
    <router-view class="flex-grow min-h-0" />
    <Footer />
  </main>
</template>
