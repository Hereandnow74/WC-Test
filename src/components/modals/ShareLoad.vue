<template>
  <Modal v-if="mode === 'remote'" label="Load build" @click="mode = 'done'">
    <div class="p-2 text-center">
      <div v-if="loading">
        Loading build <eos-icons:bubble-loading />
      </div>
      <div v-else>
        <div>Successfully Loaded</div>
        <div>Build made by: <span class="font-bold">{{ madeBy }}</span></div>
      </div>
      <div v-if="errorMessage">
        {{ errorMessage }}
      </div>
      {{ loadBuild() }}
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { getBuild } from '~/logic'
import { useStore } from '~/store/store'

const {
  mode, params, startingWorld, startingOrigin, intensities, binding, homePerks, defensePerks,
  companions, heritage, talentPerks, waifuPerks, ridePerks, miscPerks, luresBought, genericWaifuPerks,
  budgetMods, baseBudget, allEffects, flags,
} = useStore()

const loading = ref(true)
const errorMessage = ref('')
const madeBy = ref('')

function assignData(data: any) {
  startingWorld.value = data.startingWorld
  startingOrigin.value = data.startingOrigin
  intensities.value = data.intensities
  binding.value = data.binding
  homePerks.value = data.homePerks
  defensePerks.value = data.defensePerks
  companions.value = data.companions
  heritage.value = data.heritage
  talentPerks.value = data.talentPerks
  waifuPerks.value = data.waifuPerks
  ridePerks.value = data.ridePerks
  miscPerks.value = data.miscPerks
  luresBought.value = data.luresBought
  genericWaifuPerks.value = data.genericWaifuPerks
  budgetMods.value = data.budgetMods
  baseBudget.value = data.baseBudget
  allEffects.value = data.allEffects
  flags.value = data.flags
  madeBy.value = data.nickname
}

function loadBuild() {
  getBuild(params.load, (data) => {
    if (data)
      assignData(data)
    else
      errorMessage.value = 'Problem with loading build'
    loading.value = false
  })
}

</script>
