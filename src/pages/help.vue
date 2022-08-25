<template>
  <div class="flex w-full">
    <div class="text-lg max-w-screen-md lg:pl-0 mt-4">
      <div class="bg-blue-gray-200 dark:bg-blue-gray-800 p-2">
        <h4 class="text-center text-2xl ">
          Keyboard Shortcuts
        </h4>
        <ul class="list-inside list-disc ml-8">
          <li><b>Alt+C</b> - Clear build</li>
          <li><b>Alt+S</b> - Copy build text to clipboard</li>
          <li><b>Alt+D</b> - Copy build image to clipboard</li>
          <li><b>Alt+N</b> - Toggle perk images</li>
          <li><b>Alt+B</b> - Toggle dark/light theme</li>
        </ul>
        <h4 class="text-center text-2xl mt-4">
          Extended Companions Search capabilities
        </h4>
        <p>If you want more control in your companion search results, use rules defined below.</p>
        <p>You can search only specific fields by using prefixes:</p>
        <ul class="list-inside list-disc ml-8">
          <li><b>@</b> - by user nickname, example: <b>@Om1cr0n</b></li>
          <li><b>#</b> - by character name, example: <b>#Yaoyorozu</b></li>
          <li><b>%</b> - by world, example: <b>%Worm</b></li>
          <li><b>$</b> - by sub-world, example: <b>$Azeroth</b></li>
        </ul>
        <p>White space acts as an <b>AND</b> operator, while a single pipe (|) character acts as an <b>OR</b> operator. To escape white space, use double quote ex. ="scheme language" for exact match.</p>
        <table class="w-full table-auto mb-8 bg-gray-100 dark:bg-gray-700 border-collapse">
          <tr class="border border-gray-800 dark:border-gray-200 font-semibold">
            <td class="border border-gray-800 dark:border-gray-200 px-2">
              Token
            </td>
            <td class="border border-gray-800 dark:border-gray-200 px-2">
              Match type
            </td>
            <td class="border border-gray-800 dark:border-gray-200 px-2">
              Description
            </td>
          </tr>
          <tr v-for="sr in helpsearch" :key="sr[0]" class="border border-gray-800 dark:border-gray-200">
            <td v-for="sh in sr" :key="sh" class="border border-gray-800 dark:border-gray-200 px-2">
              {{ sh }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const helpsearch = [
  ['jscript', 'fuzzy-match', 'Items that fuzzy match jscript'],
  ['=scheme', 'exact-match', 'Items that are scheme'],
  ['\'python', 'include-match', 'Items that include python'],
  ['!ruby', 'inverse-exact-match', 'Items that do not include ruby'],
  ['^java', 'prefix-exact-match', 'Items that start with java'],
  ['!^earlang', 'inverse-prefix-exact-match', 'Items that do not start with earlang'],
  ['.js$', 'suffix-exact-match', 'Items that end with .js'],
  ['!.go$', 'inverse-suffix-exact-match', 'Items that do not end with .go'],
]
</script>
