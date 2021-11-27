<template>
  <Modal label="Save & Load" class="text-gray-800 dark:text-gray-200">
    <div class="dark:bg-black py-4 flex flex-col min-h-0">
      <div class="flex flex-col gap-2 overflow-y-auto pb-4 px-2">
        <div
          v-for="save in savesList"
          :key="save.worldName"
          class="bg-gray-300 dark:bg-gray-700 rounded-xl p-2 flex gap-1 mx-2 shadow-lg"
          border="1 gray-700 dark:gray-300"
        >
          <div class="grid grid-cols-2 flex-grow">
            <h3 class="col-span-2 text-center text-lg">
              {{ save.name }} <span class="text-sm text-gray-500 dark:text-gray-300">
                ({{ useTimeAgo(new Date(save.date)).value }})
              </span>
            </h3>
            <div class="text-gray-600 dark:text-gray-400">
              World: <span class="text-orange-600 dark:text-orange-400">{{ save.worldName }}</span>
            </div>
            <div class="text-gray-600 dark:text-gray-400">
              Rating: <span class="text-green-600 dark:text-green-400">{{ save.rating }}</span>
            </div>
            <div class="text-gray-600 dark:text-gray-400 col-span-2">
              Total cost of build: <span class="text-green-600 dark:text-green-400">{{ save.totalCost }}</span>
            </div>
          </div>
          <div class="flex flex-col gap-1 justify-between rounded-xl bg-gray-200 dark:bg-gray-800 py-2 px-1">
            <clarity:floppy-outline-alerted class="hover:text-green-500 cursor-pointer" @click="loadBuld(save.uid)" />
            <fluent:delete-20-filled class="hover:text-red-500 cursor-pointer" @click="deleteSave(save.uid)" />
          </div>
        </div>
      </div>
      <div class="mx-auto mt-2 w-max flex gap-2">
        <Input v-model="name" placeholder="Save name" />
        <Button label="Save" size="Small" @click="saveBuild" />
      </div>
    </div>
  </Modal>
</template>

<script lang='ts' setup>
import { useTimeAgo } from '@vueuse/core'
import { random } from 'lodash'
import { remove } from 'lodash-es'
import Input from '../basic/Input.vue'
import { useSaves } from '~/store/saves'
import { useStore } from '~/store/store'

const { savesList } = useSaves()

const {
  startingWorld, startingOrigin, intensities, binding, homePerks, defensePerks,
  companions, heritage, talentPerks, waifuPerks, ridePerks, miscPerks, luresBought, genericWaifuPerks,
  budgetMods, baseBudget, allEffects, flags, totalCost, otherPerks,
} = useStore()

const name = ref('')

const saves = useStorage<Record<number, any>>('saves', {})

const save = {
  baseBudget: baseBudget.value,
  startingWorld: startingWorld.value,
  startingOrigin: startingOrigin.value,
  intensities: intensities.value,
  binding: binding.value,
  luresBought: luresBought.value,
  otherPerks: otherPerks.value,
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

function saveBuild() {
  const uid = random(1000000, 9999999)
  savesList.value.push({
    uid,
    name: name.value,
    worldName: startingWorld.value.worldName,
    rating: startingWorld.value.rating,
    totalCost: totalCost.value,
    date: new Date().toString(),
  })
  saves.value[uid] = save
}

function loadBuld(uid: number) {
  const build = saves.value[uid]
  baseBudget.value = build.baseBudget
  startingWorld.value = build.startingWorld
  startingOrigin.value = build.startingOrigin
  intensities.value = build.intensities
  binding.value = build.binding
  otherPerks.value = build.otherPerks
  luresBought.value = build.luresBought
  heritage.value = build.heritage
  ridePerks.value = build.ridePerks
  homePerks.value = build.homePerks
  talentPerks.value = build.talentPerks
  defensePerks.value = build.defensePerks
  miscPerks.value = build.miscPerks
  genericWaifuPerks.value = build.genericWaifuPerks
  waifuPerks.value = build.waifuPerks
  companions.value = build.companions
  allEffects.value = build.allEffects
  flags.value = build.flags
  budgetMods.value = build.budgetMods
}

function deleteSave(uid: number) {
  remove(savesList.value, { uid })
  delete saves.value[uid]
}

</script>
