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
        Waifu Catalog is a continuous CYOA, which mean that you will not lose the access to it after you made your
        build and can interact with it through your journey. Little official lore exist for it, but it is known that you will work for the <b>Company</b> (actual name is unpronounceable) and that it have very laid back approach in handling you - the <b>Contractor</b>, they will not force
        you into anything (there are debt exception) so you are free to make your own decisions on everything.
      </p>
      <p>The main purpose of the company existence is to provide its <b>clients</b> with waifus and husbandos, you as a contractor would be given tools to make it possible, like <b>mind-control</b> options to capture targets and travel options to visit <b>different worlds</b>.</p>
      <p class="pt-2">
        Links to the original Waifu Catalog - <a class="text-blue-600 font-semibold dark:text-blue-400" href="https://docs.google.com/document/d/1ILzH_MYYTsS40Dx4YnnqbGiFaHiqVRZD-yJBEz4CnEg/edit#" target="_blank" rel="noopener noreferrer">document</a>,<a class="text-blue-600 font-semibold dark:text-blue-400 pl-2" href="https://docs.google.com/spreadsheets/d/e/2PACX-1vRY8R1QpF5c_R3UESoYXYscEVJ2AayfCLJ7QVxU3xjfwqKfZU8HnNVsTKwFOX9J7DX8MPM1tp06el9G/pubhtml#" target="_blank" rel="noopener noreferrer">spreadsheet</a>.
      </p>
      <p class="pt-2 text-lg text-teal-600 dark:text-teal-400">
        The Interactive contain 3 main parts:
      </p>
      <ol class="list-decimal list-inside">
        <li class="font-semibold">
          <span class="font-normal">Menu at the top that you can navigate to see all <b>options</b> that this CYOA has to offer.</span>
        </li>
        <li class="font-semibold">
          <span class="font-normal">Menu at the left have <b>settings</b> (recommended to check), important links, <b>rules</b> and other pages that not necessarily part of the CYOA.</span>
        </li>
        <li class="font-semibold">
          <span class="font-normal">Finally the 'smartphone' shaped section at the bottom will have your <b>build</b> and more stuff to interact with.</span>
        </li>
      </ol>
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
