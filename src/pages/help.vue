<template>
  <div class="flex w-full">
    <div class="text max-w-screen-md lg:pl-0 mt-4">
      <div class="bg-blue-gray-200 dark:bg-blue-gray-800 p-2">
        <h4 class="text-center text-2xl text-amber-800 dark:text-amber-300">
          FAQ
        </h4>
        <ul class="list-inside ml-8 flex flex-col gap-2">
          <li>
            <h6 class="text-lg font-semibold text-green-800 dark:text-green-200">
              How to add a character?
            </h6>
            <div>You can add new character by pressing <span class="text-violet-800 dark:text-violet-200">"Add Character"</span> button on <span class="text-violet-800 dark:text-violet-200">"Companions page"</span>, by clicking on <span class="text-violet-800 dark:text-violet-200">"Propose to global"</span> checkbox you can send your character for review. If your submitted character is up to standard it will be added to global database for everyone to see.</div>
          </li>
          <li>
            <h6 class="text-lg font-semibold text-green-800 dark:text-green-200">
              How to edit an existing character?
            </h6>
            <div>You can edit character by hovering over <span class="text-violet-800 dark:text-violet-200">"!"</span> symbol right from the character name and clicking <span class="text-violet-800 dark:text-violet-200">"Edit"</span> in the menu that will appear. By clicking on <span class="text-violet-800 dark:text-violet-200">"Propose to global"</span> checkbox you can send your changes for review, although if you are editing for the sake of fixing a error or changing tier, you should use <span class="text-violet-800 dark:text-violet-200">"Report Error"</span> function from the same menu.</div>
          </li>
          <li>
            <h6 class="text-lg font-semibold text-green-800 dark:text-green-200">
              How to change world danger rating?
            </h6>
            <div>
              You can click on a button in top right corner of the world card and adjust the DR, then save changed world locally. Note that proposing world with adjusted DR to global will not amount to anything, as any such submissions get deleted. To change world DR globally you need to provide arguments for the change on <a
                href="https://discord.gg/cZf4U5rmPV"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-500 underline"
              >Discord</a>
            </div>
          </li>
        </ul>
        <h4 class="text-center text-2xl text-amber-800 dark:text-amber-300">
          Keyboard Shortcuts
        </h4>
        <ul class="list-inside list-disc ml-8">
          <li><b>Alt+C</b> - Clear build</li>
          <li><b>Alt+S</b> - Copy build text to clipboard</li>
          <li><b>Alt+D</b> - Copy build image to clipboard</li>
          <li><b>Alt+N</b> - Toggle perk images</li>
          <li><b>Alt+B</b> - Toggle dark/light theme</li>
        </ul>
        <h4 class="text-center text-2xl mt-4 text-amber-800 dark:text-amber-300">
          Extended Companions Search capabilities
        </h4>
        <p>If you want more control in your companion search results, use rules defined below. <b>Note that these features work in "Character name" field, while "World name" supports only "="</b>.</p>
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
