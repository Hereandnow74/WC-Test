
<template>
  <div
    class="fixed bottom-0 w-full text-gray-100 transition-transform transform"
    :class="visible ? 'translate-y-0' : 'translate-y-[calc(100%-1.8rem)]'"
    :style="[visible ? '' : 'pointer-events: none']"
    @mousedown="visible = false"
  >
    <Smartphone
      class="min-w-[320px] h-[568px] sm:h-[calc(100vh-3.4rem)] rounded-3xl mx-auto border relative flex flex-col transition-all pointer-events-auto"
      bg="gray-900"
      border="2 gray-400"
      :class="orientation ? 'max-w-[940px]' : 'max-w-[440px]'"
    />
    <!-- :style="visible ? `background: url('/img/giphy3.gif') repeat;` : ''" -->
    <!-- pointer-events-none -->
    <!-- <div v-if="visible" class="hidden md:block absolute bottom-0.5 right-8  w-16 cursor-pointer z-60" @mousedown.stop @click="playAudio('https://www.myinstants.com/media/sounds/merry-christmas_8GIggbm.mp3')">
      <img src="https://media.tenor.com/1cUMUU2xtgcAAAAi/padoru.gif" alt="padoru">
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { orientation, showSmartMenu, visible } from '~/logic'

const smartMenu = ref(null)

onClickOutside(smartMenu, () => showSmartMenu.value = false)

function playAudio(url) {
  new Audio(url).play()
}

</script>
