<template>
  <Modal label="Publish your build" class="text-gray-800 dark:text-gray-200">
    <div class="dark:bg-gray-700 p-2 flex flex-col gap-2 min-h-0">
      <Input v-model="title" placeholder="Title or name for your build" />
      <TextArea v-model="desc" placeholder="Description for your build" />
      <div class="mt-2 w-full flex gap-2 justify-between">
        <Toggle v-model="privateBuild" label="Keep build private" />
        <Button :disabled="isDone" label="Publish" size="Small" @click="isDone ? null : shareBuild()" />
      </div>
      <div v-if="isDone">
        <span v-if="generating">Publishing <eos-icons:bubble-loading /></span>
        <div v-else class="px-2">
          Success! <router-link class="text-blue-500 hover:underline" :to="'/globalBuilds'">
            Go to Builds page
          </router-link>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script lang='ts' setup>
import { ALL_DLC_PERK_TITLES } from '~/data/constants'
import Input from '../basic/Input.vue'
import { saveObject } from '~/logic'
import { confirmDialog } from '~/logic/dialog'
import { useUser } from '~/store/user'
import { createBuildInDB } from '~/logic/server/'
import { useStore } from '~/store/store'

const { user } = useUser()
const { budget, totalCost } = useStore()

const title = ref('')
const desc = ref('')
const generating = ref(false)
const isDone = ref(false)
const privateBuild = ref(false)

const buildTags = computed(() => {
  const tags: string[] = []
  // if (saveObject.value.allEffects.includes('With A Little Help From My Friends(Cooperative)')) tags.push('Cooperative')
  // if (saveObject.value.allEffects.includes('Couple’s Account (Cooperative)')) tags.push('Couples')
  // if (saveObject.value.allEffects.includes('Cash Still Rules')) tags.push('Cash Still Rules')
  // if (saveObject.value.allEffects.includes('Wage Slave')) tags.push('Wage Slave')
  // if (saveObject.value.allEffects.includes('Black-mark')) tags.push('Black-mark')
  return tags
})

function saveBuild() {
  const finalBuild = {
    title: title.value,
    name: user.value.name,
    build: saveObject.value,
    author: user.value.id,
    desc: desc.value,
    published: !privateBuild.value,
    bindingName: (saveObject.value.binding.length) ? saveObject.value.binding[0].type || saveObject.value.binding[0].title : 'None',
    originName: (saveObject.value.startingOrigin.title) ? saveObject.value.startingOrigin.title : 'None',
    characterName: (saveObject.value.startingOrigin.character) ? saveObject.value.startingOrigin.character : 'None',
    intensity: saveObject.value.intensities.map(x => x.title),
    loan: saveObject.value.loan.owed > 0,
    creditBalance: budget.value,
    creditsSpent: totalCost.value,
    customImages: saveObject.value.companions.some(x => x.image),
    dlc: saveObject.value.allEffects.some((x: string) => ALL_DLC_PERK_TITLES.value[x]),
    retinue: saveObject.value.companions.map(char => ({ name: char.name, tier: char.tier, tags: char.tags || [], state: char.role || 'Companion' })),
    retinueNotes: saveObject.value.companions.some(x => x.note),
    challenges: saveObject.value.activeChallenges.map(x => x.title),
    tags: buildTags.value,
    likes: 0,
  }
  createBuildInDB(finalBuild).then(msg => {generating.value = false; confirmDialog(msg, 'info');})
}

async function shareBuild() {
  if (user.value.role === 'guest' && !privateBuild.value) {  
    await confirmDialog('As a guest you only allowed to keep your build private, to post it globally confirm your Email', 'info')
    return
  }
  if (title.value.length <= 2) return
  isDone.value = true
  generating.value = true
  saveBuild()
}

</script>
