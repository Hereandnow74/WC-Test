<template>
  <div ref="introEl" class="fixed inset-0 flex items-center justify-center">
    <div
      class="relative p-2 bg-gray-100 dark:bg-gray-800 max-h-[85vh] border-4 rounded border-teal-400 scrollbar overflow-y-auto max-w-[800px]"
      :class="showSideMenu ? 'sm:ml-10' : 'ml-36'"
    >
      <h1 class="text-lg font-semibold text-center py-2">
        Waifu Catalog <span class="text-teal-600 dark:text-teal-400">(by SwiftRosenthal)</span> Interactive v{{ VERSION }} <span class="text-teal-600 dark:text-teal-400">(by Om1cr0n)</span>
      </h1>
      <p>
        The Company, whose true name is an info hazard to mortal minds, is an omniversal organisation with the primary mission to supply clients with <b>waifu</b> and <b>husbando</b> from an infinite number of realities. Contractors are provided with the option to travel to <b>different worlds</b> and are given various tools and perks, including <b>mind control</b> options to capture targets they encounter.
      </p>
      <p class="mt-2">
        The Company is known for its laid-back approach when handling contractors and will therefore not interfere in any of their decisions, nor attempt to force them into anything they do not choose to accept of their own volition.
      </p>
      <p class="pt-2 text-lg text-teal-600 dark:text-teal-400">
        The Interactive Waifu Catalog contains three main parts:
      </p>
      <ol class="list-decimal list-inside">
        <li class="font-semibold">
          <span class="font-normal">The menu at the top that you can navigate to see all the <b>options</b> that this CYOA has to offer.</span>
        </li>
        <li class="font-semibold">
          <span class="font-normal">The menu on the left contains the CYOA <b>settings</b>, essential links, <b>rules</b>, and other pages that are not necessarily part of the CYOA.</span>
        </li>
        <li class="font-semibold">
          <span class="font-normal">The ‘smartphone’ shaped interface at the bottom where you can access your <b>build</b>, as well as additional ‘apps’ for you to interact with.</span>
        </li>
      </ol>
      <p class="mt-2">
        Note that the Waifu Catalog is a continuous CYOA which means that you will not lose access to your build after its initial creation, and can instead interact with it throughout your journey.
      </p>
      <p class="pt-2">
        Links to the original Waifu Catalog - <a class="text-blue-600 font-semibold dark:text-blue-400" href="https://docs.google.com/document/d/1ILzH_MYYTsS40Dx4YnnqbGiFaHiqVRZD-yJBEz4CnEg/edit#" target="_blank" rel="noopener noreferrer">document</a>,<a class="text-blue-600 font-semibold dark:text-blue-400 pl-2" href="https://docs.google.com/spreadsheets/d/1TZhqe4x8DrDq-uB_E7c73DJnv5ouIOx1W7Aj96ut63Q/edit" target="_blank" rel="noopener noreferrer">spreadsheet</a>.
      </p>
      <h2 class="text-lg font-semibold text-center text-red-500 dark:text-red-400 py-2">
        By continuing you confirm that you are 18+ years old.
      </h2>
      <div class="absolute top-1 right-1 cursor-pointer hover:text-red-500 text-xl transition-colors text-xl leading-none">
        <eva:close-fill />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { VERSION } from '~/data/constants'
import { showSideMenu } from '~/logic/toggles'

const introEl = ref<HTMLElement | null>(null)

const oldSidebar = showSideMenu.value

onMounted(() => {
  if (introEl.value && introEl.value.clientWidth > 800)
    showSideMenu.value = false
})

onUnmounted(() => {
  showSideMenu.value = oldSidebar
})
</script>
