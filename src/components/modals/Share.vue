<template>
  <Modal label="Share your build" class="text-gray-800 dark:text-gray-200">
    <div class="dark:bg-gray-700 py-4 flex flex-col min-h-0 px-4">
      <div v-if="!isDone" class="mx-auto mt-2 w-max flex gap-2">
        <Input v-model="name" placeholder="Your nickname" />
        <Button label="Generate link" size="Small" @click="generateLink" />
      </div>
      <div v-else>
        <span v-if="generating">Generating link <eos-icons:bubble-loading /></span>
        <div v-else class="border border-gray-400 dark:border-gray-500 rounded px-2 flex items-center">
          <span>{{ link }}</span> <span class="ml-2 cursor-pointer hover:text-amber-500" title="Copy link" @click="copyLink">
            <bx:bx-copy-alt class="block" />
          </span>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script lang='ts' setup>
import Input from '../basic/Input.vue'
import { useStore } from '~/store/store'
import { shareLink } from '~/logic'

const {
  startingWorld, startingOrigin, intensities, binding, homePerks, defensePerks,
  companions, heritage, talentPerks, waifuPerks, ridePerks, miscPerks, luresBought, genericWaifuPerks,
  budgetMods, baseBudget, allEffects, flags,
} = useStore()

const name = ref('')
const link = ref('https://discord.com/channels/869699052265144330/869700184739823636')
const generating = ref(false)
const isDone = ref(false)

const save = {
  baseBudget: baseBudget.value,
  startingWorld: startingWorld.value,
  startingOrigin: startingOrigin.value,
  intensities: intensities.value,
  binding: binding.value,
  luresBought: luresBought.value,
  heritage: heritage.value,
  ridePerks: ridePerks.value,
  homePerks: homePerks.value,
  talentPerks: talentPerks.value,
  defensePerks: defensePerks.value,
  miscPerks: miscPerks.value,
  genericWaifuPerks: genericWaifuPerks.value,
  waifuPerks: waifuPerks.value,
  companions: companions.value,
  allEffects: allEffects.value,
  flags: flags.value,
  budgetMods: budgetMods.value,
}

function generateLink() {
  if (name.value.length <= 2) return
  isDone.value = true
  generating.value = true
  const nickname = name.value.length > 40 ? name.value.slice(0, 40) : name.value
  shareLink({ nickname, date: new Date().toString(), ...save }, (docRef: any) => {
    link.value = `https://waifu-catalog.neocities.org/?load=${docRef.id}`
    generating.value = false
  })
}

function copyLink() {
  navigator.clipboard.writeText(link.value)
}

</script>
