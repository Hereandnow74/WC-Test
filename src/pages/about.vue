<template>
  <div class="max-w-screen-md mt-2 lg:pl-0 mb-8 text-lg">
    <div class="bg-green-100 dark:bg-green-900 p-4 shadow-md rounded flex flex-col gap-4">
      <h3 class="text-2xl text-center">
        About Page
      </h3>
      <!-- <h6>
        <div class="text-shadow-md text-shadow font-semibold text-center  px-2">
          ( Currently online: <span class="text-blue-700 dark:text-blue-200">{{ currentOnline }}</span> )
        </div>
      </h6> -->
      <div>
        Time I spent on the Interactive Waifu Catalog so far -
        <span class="text-amber-500">more than a 1000</span> hours in
        <span class="text-amber-500">more than two years</span>.
      </div>
      <div>
        If you found some bugs, desire to collaborate, have any questions/suggestions about the Interactive, or want to hire me
        for any similar projects, feel free to message me on
        <a
          href="https://discord.gg/cZf4U5rmPV"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-500 underline text-xl"
        >Discord</a> nickname <span class="font-bold">om1cr0n42</span>. A list of all my projects is available on <a href="https://wormlewdmod.neocities.org/about" class="text-blue-500 underline text-xl" target="_blank" rel="noopener noreferrer">this page</a>.
      </div>
      <div>
        If you like the job I have done so far and want to support my work on this, as well as similar
        projects that I can do in the future, you can do so via my
        <a
          href="https://www.patreon.com/interactiveapps"
          target="_blank"
          rel="noopener noreferrer"
          class="text-red-500 underline"
        >Patreon</a>.
        Be aware that I'm only the creator of the <b>Interactive</b>, so if you like the Waifu Catalog itself, you can support it's author
        <a
          href="https://forum.questionablequesting.com/members/swiftrosenthal.1795/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-500 underline"
        >SwiftRosenthal</a> instead.
      </div>
      <div>
        <h4 class="text-2xl text-center">
          Top users by submitted characters
        </h4>
        <div class="flex flex-wrap gap-x-2 justify-center">
          <div v-for="user in topUsers.slice(0, 20)" :key="user[0]" class="text-semibold">
            {{ user[0] }}(<span class="text-amber-500">{{ user[1] }}</span>)
          </div>
          <div>and <span class="text-blue-500">{{ topUsers.length - 20 }}</span> others...</div>
        </div>
      </div>
      <div>
        <h4 class="text-2xl flex items-center justify-center">
          Supporters <ci:heart-fill class="text-red-500" />
        </h4>
        <div class="flex flex-wrap gap-1 justify-center text-semibold mt-2">
          <span class="bg-gray-200 dark:bg-gray-800  px-2 rounded flex items-center gap-1">{{ nicknames[0] }}<pepicons:crown class="text-amber-400" /></span>
          <span class="bg-gray-200 dark:bg-gray-800  px-2 rounded flex items-center gap-1">{{ nicknames[1] }}<pepicons:crown class="text-gray-400" /></span>
          <span class="bg-gray-200 dark:bg-gray-800  px-2 rounded flex items-center gap-1">{{ nicknames[2] }}<pepicons:crown class="text-red-400" /></span>

          <span v-for="nick in nicknames.slice(3)" :key="nick" class="bg-gray-200 dark:bg-gray-800  px-2 rounded">{{ nick }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { countBy } from 'lodash-es'
import { getUserChars, nicknames } from '~/data/constants'
import { currentOnline } from '~/logic'

const topUsers = ref<[string, number][]>([])

getUserChars().then(x => Object.entries(countBy(x, c => c.k))
  .filter(x => x[0] !== 'undefined')
  .sort((a, b) => b[1] - a[1])
  .forEach(x => topUsers.value.push(x)))

</script>
