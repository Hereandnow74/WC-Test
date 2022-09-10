<template>
  <div class="max-w-screen-md mt-8 lg:pl-0 pb-8 text-lg">
    <div class="bg-green-100 dark:bg-green-900 p-4 shadow-lg rounded dark:shadow-gray-800 flex flex-col gap-4">
      <h3 class="text-2xl text-center">
        About Page
      </h3>
      <div>
        Time I spend on Interactive Waifu Catalog so far -
        <span class="text-amber-500">more than a 1000</span> hours in
        <span class="text-amber-500">almost a year</span>.
      </div>
      <div>
        If you found some bugs, have any questions about Interactive, suggestions, collaborations or you want to hire me
        for any similar project feel free to write me on
        <a
          href="https://discord.gg/cZf4U5rmPV"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-500 underline"
        >Discord</a> nickname <span class="font-bold">om1cr0n#2971</span>
      </div>
      <div>
        If you like the job I done so far and want to support my work on this project and any and all similar
        projects that I can do in the future you can do so via
        <a
          href="https://www.patreon.com/interactiveapps"
          target="_blank"
          rel="noopener noreferrer"
          class="text-red-500 underline"
        >Patreon</a>.
        Be aware that I'm only done the <b>Interactive</b>, so if You like the Catalog itself support it's author
        <a
          href="https://forum.questionablequesting.com/members/swiftrosenthal.1795/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-500 underline"
        >SwiftRosenthal</a> instead.
      </div>
      <div>
        <h4 class="text-2xl text-center">
          Top 20 users by submitted characters
        </h4>
        <div class="flex flex-wrap gap-x-2 justify-center">
          <div v-for="user in topUsers.slice(0, 20)" :key="user[0]" class="text-semibold">
            {{ user[0] }}(<span class="text-amber-500">{{ user[1] }}</span>)
          </div>
          <div><span class="text-blue-500">{{ topUsers.length - 20 }}</span> others...</div>
        </div>
      </div>
      <div>
        <h4 class="text-2xl flex items-center justify-center">
          Supporters <ci:heart-fill class="text-red-500" />
        </h4>
        <div class="flex flex-wrap gap-2 justify-center text-semibold">
          <span class="bg-gray-200 dark:bg-gray-700  px-1 rounded flex items-center gap-1">{{ nicknames[0] }}<pepicons:crown class="text-amber-400" /></span>
          <span class="bg-gray-200 dark:bg-gray-700  px-1 rounded flex items-center gap-1">{{ nicknames[1] }}<pepicons:crown class="text-gray-400" /></span>
          <span class="bg-gray-200 dark:bg-gray-700  px-1 rounded flex items-center gap-1">{{ nicknames[2] }}<pepicons:crown class="text-red-400" /></span>

          <span v-for="nick in nicknames.slice(3)" :key="nick" class="bg-gray-200 dark:bg-gray-700  px-1 rounded">{{ nick }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { countBy } from 'lodash-es'
import { getUserChars } from '~/data/constants'

const topUsers = ref<[string, number][]>([])

const nicknames = [
  'Definitely not Dio',
  'Darin E.',
  'cameron ngo',
  'Despin',
  'Templar9999',
  'Cyrus',
  'Alex W.',
  'TaiGambol',
  'Bryce C.',
  'Bobnewland',
  'BenFang322',
  'Jason C.',
  'Cole',
  'KatzSmile',
  'Just_A_Knight',
  'Kevin S.',
  'Beatrix',
  'Zerlestes',
]

getUserChars().then(x => Object.entries(countBy(x, c => c.k))
  .filter(x => x[0] !== 'undefined')
  .sort((a, b) => b[1] - a[1])
  .forEach(x => topUsers.value.push(x)))

</script>
