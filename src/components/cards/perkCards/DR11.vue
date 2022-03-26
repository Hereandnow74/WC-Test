<template>
  <div
    class="p-1 rounded cursor-pointer column-block mb-2 pb-4 max-w-[600px] relative"
    :bg="intensityAvailable(perk) ? 'blue-100 dark:gray-700 hover:blue-200 dark:hover:gray-800' : 'gray-200 dark:gray-600'"
    @click="startDR11"
  >
    <h3 class="text-xl text-center">
      <span>{{ perk.title }}</span>
    </h3>
    <Desc :desc="perk.desc" />
    <div v-if="perk.special" class="mx-2">
      Special: <span class="text-purple-500 dark:text-purple-300">{{ perk.special }}</span>
    </div>
    <fa-solid:check
      v-if="flags.danger11Start"
      class="absolute right-0 top-0 m-2 text-green-500"
    />
  </div>
</template>

<script lang="ts" setup>
import { findIndex } from 'lodash-es'
import { useStore } from '~/store/store'

import { chooseDefense, chooseTalent, defenseAvailable, intensityAvailable, talentAvailable } from '~/logic/'
import { defenses, talents } from '~/data/talents'

const props = defineProps({
  perk: {
    type: Object,
    default: () => ({}),
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  savedPerk: {
    type: Object,
    default: () => ({}),
  },
})

const { flags, talentPerks, defensePerks } = useStore()
const emit = defineEmits(['chooseIntensity'])

function allTalents() {
  talents.slice(0, 13).forEach((tl) => {
    if (talentAvailable(tl) && findIndex(talentPerks.value, { title: tl.title }) === -1)
      chooseTalent(tl, { title: tl?.title, cost: tl?.cost })
  })
}

function allDefenses() {
  defenses.forEach((def) => {
    if (defenseAvailable(def)) {
      const ind = findIndex(defensePerks.value, { title: def.title })
      if (ind === -1) chooseDefense(def, { title: def?.title, cost: def?.cost * 2, count: 2 })
    }
  })
}

function startDR11() {
  if (intensityAvailable(props.perk)) {
    if (flags.value.danger11Start) {
      flags.value.danger11Start = false
      emit('chooseIntensity', props.perk)
    }
    else {
      flags.value.danger11Start = true
      allTalents()
      allDefenses()
      emit('chooseIntensity', props.perk)
    }
    // flags.value.danger11Start = !flags.value.danger11Start
    // if (allEffects.value.includes(props.perk.title)) { allEffects.value.splice(allEffects.value.indexOf(props.perk.title), 1) }
    // else {
    //   allEffects.value.push(props.perk.title)

    // }
  }
}
</script>
