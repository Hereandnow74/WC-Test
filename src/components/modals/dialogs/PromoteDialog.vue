<template>
  <Modal label="Support" @click="(promoteShown = true, isSupport = false)">
    <div class="p-2">
      <div class="text-lg my-2">
        I noticed that you like this project of mine, so here is some ways how you can help to make it better!
      </div>
      <ul class="list-disc list-inside">
        <li>
          Add missing <b>Characters</b> or fill missing images/tags for existing ones
        </li>
        <li>Add missing <b>Worlds</b></li>
        <li>Propose new <b>DLC</b> perks from other sources or your original ones.</li>
        <li><b>Share</b> link to this site/tell about it to your friends</li>
        <li>
          Become a
          <a
            href="https://www.patreon.com/interactiveapps"
            target="_blank"
            class="text-red-500 font-bold hover:text-red-600"
            rel="noopener noreferrer"
          >Patron</a>
          <span v-if="paypal" class="px-2 py-1 bg-gray-800 text-gray-100 rounded">alexnkcode@gmail.com</span>.
          Note that I'm the author/maintainer of the site, author of Waifu Catalog CYOA is <a
            href="https://forum.questionablequesting.com/members/swiftrosenthal.1795/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-500 underline font-semibold"
          >SwiftRosenthal</a>
        </li>
      </ul>
      <div class="text-xl text-center">
        Thank you!
      </div>
      <div class="text-center">
        Total time spent on site: <span class="text-2xl">{{ new Date(totalActive * 1000).toISOString().slice(11, 19) }}</span>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { useStore } from '~/store/store'
import { promoteShown, isSupport } from '~/logic/toggles'

const { totalActive } = useStore()

const paypal = ref(false)

onUnmounted(() => promoteShown.value = true)
</script>
