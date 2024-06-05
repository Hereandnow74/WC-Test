<template>
  <div class="relative bg-[#d1f5ed] dark:bg-[#1E1E5C] rounded p-2 shadow-lg flex flex-col gap-1 h-full relative">
    <h3 class="text-lg leading-none ">
      <span class="font-semibold">{{ build.title || "No Title" }}</span>
      <span class="text-base dark:text-slate-300 text-slate-700"> by {{ build.name || 'unknown' }}</span>
      <div class="absolute top-7 right-1 flex gap-1 text-base">
        <div v-if="user.id === build.author" class="cursor-pointer hover:text-red-500" @click="deleteBuild">
          <fluent:delete-20-filled />
        </div>
        <ic:outline-save-alt class="cursor-pointer hover:text-orange-500" @click="loadBuild" />
      </div>
    </h3>
    <div class="text-xs text-gray-600 dark:text-gray-400 leading-none flex justify-between">
      {{ new Date(build.createdAt).toLocaleString() }}
    </div>
    <div class="flex flex-col">
      <div class="">
        World:
        <span class="text-orange-700 dark:text-orange-500 text-sm">{{ build.build.startingWorld.worldName }}</span>
        <span v-if="build.build.startingWorld.condition" class="text-red-500"> [{{ build.build.startingWorld.condition }}]</span>
      </div>
      <div class="whitespace-nowrap">
        Danger Rating: <span class="text-orange-700 dark:text-orange-500">{{ build.build.startingWorld.rating }} <span class="text-green-700 dark:text-green-400">[{{ WORLD_RATINGS[build.build.startingWorld.rating].budget }}]</span></span>
      </div>
      <div class="flex gap-x-2 justify-between flex-wrap">
        <div class="whitespace-nowrap">
          Origin: <span class="text-orange-700 dark:text-orange-500">{{ build.originName }}</span>
        </div>
        <div class="whitespace-nowrap">
          Name: <span class="text-orange-700 dark:text-orange-500">{{ build.characterName }}</span>
        </div>
      </div>
      <div>Binding: <span class="text-orange-700 dark:text-orange-500">{{ build.bindingName }}</span></div>
      <div v-if="build.build.companions.length">
        Number of retinue members: <span class="text-orange-700 dark:text-orange-500">{{ build.build.companions.length }}</span>
      </div>
      <div class="flex gap-x-2 flex-wrap">
        <div v-if="build.dlc" class="flex gap-1 items-center text-green-700 dark:text-green-300">
          <ic:baseline-check-box /> Use DLC
        </div>
        <div v-if="build.retinueNotes" class="flex gap-1 items-center text-green-700 dark:text-green-300">
          <ic:baseline-check-box /> Have Retinue Notes
        </div>
        <div v-if="build.loan" class="flex gap-1 items-center text-green-700 dark:text-green-300">
          <ic:baseline-check-box /> Under Loan
        </div>
        <div v-if="build.challenges.length" class="flex gap-1 items-center text-green-700 dark:text-green-300">
          <ic:baseline-check-box /> Use Challenges
        </div>
      </div>
    </div>
    <Foldable v-if="build.desc" title="Description">
      <p class="bg-gray-200 dark:bg-gray-800 mt-1 flex-grow">
        {{ build.desc || "No Description" }}
      </p>
    </Foldable>
    <div v-if="build.tags.length" class="flex gap-1 flex-wrap mt-1 bg-blue-200 dark:bg-blue-900 p-1 rounded justify-center">
      <div v-for="tag in build.tags" :key="tag" class="bg-teal-300 border-teal-500 dark:(bg-teal-800 border-teal-600) rounded border-b-2 border-r-2 px-1 w-max cursor-pointer whitespace-nowrap overflow-hidden overflow-ellipsis">
        {{ tag }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ServerBuild } from 'global'
import type { PropType } from 'vue'
import { WORLD_RATINGS } from '~/data/constants'
import { confirmDialog } from '~/logic/dialog'
import { writeBuildValues } from '~/logic/perksLogic'
import { useUser } from '~/store/user'

const { user, tokens } = useUser()

const props = defineProps({
  build: {
    type: Object as PropType<ServerBuild>,
    default: () => ({}),
  },
})

// const buildTags = computed(() => {
//   const tags = []
//   if (props.build.binding.length) tags.push(props.build.binding[0].type || props.build.binding[0].title)
//   if (props.build.heritage.length) tags.push(props.build.heritage[0].tree || props.build.heritage[0].title)
//   if (props.build.startingOrigin.title) tags.push(`${props.build.startingOrigin.character} ${props.build.startingOrigin.title}`)
//   if (props.build.allEffects.includes('With A Little Help From My Friends(Cooperative)')) tags.push('Cooperative')
//   if (props.build.allEffects.includes('Couple’s Account (Cooperative)')) tags.push('Couples')
//   if (props.build.allEffects.includes('Cash Still Rules')) tags.push('Cash Still Rules')
//   if (props.build.allEffects.includes('Wage Slave')) tags.push('Wage Slave')
//   if (props.build.allEffects.includes('Black-mark')) tags.push('Black-mark')
//   if (props.build.loan.owed > 0) tags.push('Under Loan')
//   if (props.build.companions.some(x => x.image)) tags.push('Custom Images')
//   if (props.build.companions.some(x => x.note)) tags.push('Retinue Notes')
//   if (props.build.activeChallenges.length > 0) tags.push(props.build.activeChallenges[0].title)
//   if (props.build.allEffects.some((x: string) => ALL_DLC_PERK_TITLES.value[x])) tags.push('Use DLC')
//   return tags
// })

async function loadBuild() {
  const confirm = await confirmDialog('This action will load global build and overwrite your current build, proceed?')
  if (confirm)
    writeBuildValues(props.build.build)
}

function deleteBuild() {
  // deleteSaveBuildGlobally(props.build._id)
}

</script>
