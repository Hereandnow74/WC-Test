<template>
  <div class="relative bg-[#f2eecb] dark:bg-[#1E1E5C] rounded p-2 shadow-lg flex flex-col gap-1 h-full">
    <h3 class="text-lg leading-none">
      {{ build.title || "No Title" }}
      <span class="text-base dark:text-slate-300 text-slate-700">by {{ build.nickname || 'unknown' }}</span>
    </h3>
    <div class="text-xs text-gray-600 dark:text-gray-400 leading-none flex justify-between">
      {{ new Date(build.date).toLocaleString() }}
      <ic:outline-save-alt class="cursor-pointer hover:text-orange-500" @click="loadBuild" />
    </div>
    <p class="bg-gray-300 dark:bg-gray-800 mt-1 flex-grow">
      {{ build.desc || "No Description" }}
    </p>
    <div class="flex gap-2 justify-between">
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
    <div class="flex gap-1 flex-wrap mt-1 bg-blue-200 dark:bg-blue-900 p-1 rounded">
      <div v-for="tag in buildTags" :key="tag" class="bg-teal-300 border-teal-500 dark:(bg-teal-800 border-teal-600) rounded border-b-2 border-r-2  px-1 w-max cursor-pointer whitespace-nowrap">
        {{ tag }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { confirmDialog } from '~/logic/dialog'
import { writeBuildValues } from '~/logic/perksLogic'
import { useStore } from '~/store/store'

const props = defineProps({
  build: {
    type: Object as PropType<Build>,
    default: () => ({}),
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
  if (props.build.loan.owed > 0) tags.push('Under Loan')
  if (props.build.companions.some(x => x.image)) tags.push('Custom Images')
  if (props.build.activeChallenges.length > 0) tags.push(props.build.activeChallenges[0].title)
  return tags
})

async function loadBuild() {
  const confirm = await confirmDialog('This action will load global build and overwrite your current build, proceed?')
  if (confirm)
    writeBuildValues(props.build)
}

</script>
