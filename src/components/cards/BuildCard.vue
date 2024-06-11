<template>
  <div class="relative bg-[#f2eecb] dark:bg-[#1E1E5C] rounded p-2 shadow-lg flex flex-col gap-1 h-full relative">
    <h3 class="text-lg leading-none ">
      {{ build.title || "No Title" }}
      <span class="text-base dark:text-slate-400 text-slate-700">by {{ build.nickname || 'unknown' }}</span>
      <div v-if="isAuthenticated" class="absolute top-1 right-1 cursor-pointer hover:text-red-500" @click="deleteBuild">
        <fluent:delete-20-filled />
      </div>
      <ic:outline-save-alt class="absolute cursor-pointer top-7 right-1 text-green-500 hover:text-orange-500 text-lg" @click="loadBuild" />
    </h3>
    <div class="text-xs text-gray-600 dark:text-gray-400 leading-none flex justify-between">
      {{ new Date(build.date).toLocaleString() }}
    </div>
    <p v-if="build.desc.trim()" class="bg-gray-300 dark:bg-gray-800 mt-1 flex-grow p-1">
      {{ build.desc }}
    </p>
    <div class="flex gap-2 justify-between mt-auto">
      <div>
        World:
        <span class="text-orange-500">{{ build.startingWorld.worldName }}</span>
        <span v-if="build.startingWorld.condition" class="text-red-500"> [{{ build.startingWorld.condition }}]</span>
      </div>
      <div class="whitespace-nowrap">
        Rating: <span class="text-orange-500">{{ build.startingWorld.rating }}</span>
      </div>
    </div>
    <div class="flex gap-2 justify-between">
      <div>Perks Count: <span class="text-orange-500">{{ build.allEffects.length }}</span></div>
      <div>Companions: <span class="text-orange-500">{{ build.companions.length }}</span></div>
    </div>
    <div class="flex gap-1 flex-wrap mt-1 bg-blue-200 dark:bg-blue-900 p-1 rounded justify-center">
      <div v-for="tag in buildTags.sort((a,b) => a.length - b.length)" :key="tag" :title="tag" class="bg-teal-300 border-teal-500 dark:(bg-teal-800 border-teal-600) rounded border-b-2 border-r-2  px-1 w-max cursor-pointer whitespace-nowrap overflow-hidden overflow-ellipsis">
        {{ tag.replace('You as ', '') }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuth } from '@vueuse/firebase/useAuth'
import type { PropType } from 'vue'
import { ALL_DLC_PERK_TITLES } from '~/data/constants'
import { auth, deleteSaveBuildGlobally } from '~/logic'
import { confirmDialog } from '~/logic/dialog'
import { writeBuildValues } from '~/logic/perksLogic'

const { isAuthenticated } = useAuth(auth)

const props = defineProps({
  build: {
    type: Object as PropType<Build>,
    default: () => ({}),
  },
  buildId: {
    type: String,
    default: '',
  },
})

const buildTags = computed(() => {
  const tags = []
  if (props.build.binding.length) tags.push(props.build.binding[0].type || props.build.binding[0].title)
  if (props.build.heritage.length) tags.push(props.build.heritage[0].tree || props.build.heritage[0].title)
  if (props.build.startingOrigin.title) tags.push(`${props.build.startingOrigin.character} ${props.build.startingOrigin.title}`)
  if (props.build.allEffects.includes('With A Little Help From My Friends(Cooperative)')) tags.push('Cooperative')
  if (props.build.allEffects.includes('Couple’s Account (Cooperative)')) tags.push('Couples')
  if (props.build.allEffects.includes('Cash Still Rules')) tags.push('Cash Still Rules')
  if (props.build.allEffects.includes('Wage Slave')) tags.push('Wage Slave')
  if (props.build.allEffects.includes('Black-mark')) tags.push('Black-mark')
  if (props.build.allEffects.includes('Legacy Difficulty')) tags.push('Legacy')
  if (props.build.loan.owed > 0) tags.push('Under Loan')
  if (props.build.companions.some(x => x.image)) tags.push('Custom Images')
  if (props.build.companions.some(x => x.note)) tags.push('Retinue Notes')
  if (props.build.activeChallenges.length > 0) tags.push(props.build.activeChallenges[0].title)
  if (props.build.allEffects.some((x: string) => ALL_DLC_PERK_TITLES.value[x])) tags.push('Use DLC')
  if (props.build.waifuPerks.length) tags.push('Use Waifu Perks')
  return tags
})

async function loadBuild() {
  const confirm = await confirmDialog('This action will load global build and overwrite your current build, proceed?')
  if (confirm)
    writeBuildValues(props.build)
}

function deleteBuild() {
  deleteSaveBuildGlobally(props.buildId)
}

</script>
