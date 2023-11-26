<template>
  <div
    class="p-1 rounded cursor-pointer column-block mb-2 pb-4 max-w-[600px] relative"
    :bg="intensityAvailable(perk) ? 'blue-100 dark:gray-700 hover:blue-200 dark:hover:gray-800' : 'gray-200 dark:gray-600'"
    @click="startDR11"
  >
    <img
      v-if="perk.image && settings.perkImages"
      ref="perkImg"
      class="rounded object-cover object-contain h-full w-full object-top"
      :src="PLACEHOLDER_IMAGE"
      :data-src="perk.image"
      :alt="perk.title"
    />
    <h3 class="relative text-xl text-center">
      <span>{{ perk.title }}</span>
      <fa-solid:check
        v-if="flags.danger11Start"
        class="absolute right-1 top-1 text-green-500"
      />
    </h3>
    <Desc :desc="perk.desc" />
    <div v-if="perk.special" class="mx-2">
      Special: <span class="text-purple-500 dark:text-purple-300">{{ perk.special }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { findIndex } from 'lodash-es'
import { PLACEHOLDER_IMAGE, WORLD_RATINGS } from '~/data/constants'
import { useStore } from '~/store/store'

import { chooseDefense, chooseTalent, defenseAvailable, intensityAvailable, lazyLoadSingleImg, talentAvailable } from '~/logic/'
import { defenses, talents } from '~/data/talents'
import { useEvents } from '~/logic/events'

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

const { flags, talentPerks, defensePerks, settings, baseBudget, startingWorld } = useStore()
const emit = defineEmits(['chooseIntensity'])

const perkImg = ref<HTMLImageElement | null>(null)

function allTalents(cost = false) {
  talents.slice(0, 16).forEach((tl) => {
    if (talentAvailable(tl) && (findIndex(talentPerks.value, { title: tl.title }) === -1 || cost))
      chooseTalent(tl, { title: tl?.title, cost: cost ? tl?.cost : 0, count: 1 })
  })
}

function allDefenses(cost = false) {
  defenses.forEach((def) => {
    if (defenseAvailable(def)) {
      const ind = findIndex(defensePerks.value, { title: def.title })
      if (ind === -1 || cost) chooseDefense(def, { title: def?.title, cost: cost ? def?.cost * 2 : 0, count: 2 })
    }
  })
}

function startDR11() {
  if (intensityAvailable(props.perk)) {
    const { allEvents } = useEvents()
    if (flags.value.danger11Start) {
      flags.value.danger11Start = false
      allTalents(true)
      allDefenses(true)
      emit('chooseIntensity', props.perk)
      allEvents.emit({ id: Math.floor(Math.random() * 10000), time: Date.now(), message: 'All free talents and defenses removed.', type: 'attention' })
    }
    else {
      flags.value.danger11Start = true
      allTalents()
      allDefenses()
      emit('chooseIntensity', props.perk)
      allEvents.emit({ id: Math.floor(Math.random() * 10000), time: Date.now(), message: 'All talents and defenses added for free.', type: 'success' })
    }
    // flags.value.danger11Start = !flags.value.danger11Start
    // if (allEffects.value.includes(props.perk.title)) { allEffects.value.splice(allEffects.value.indexOf(props.perk.title), 1) }
    // else {
    //   allEffects.value.push(props.perk.title)

    // }
  }
}

onMounted(() => { if (perkImg.value) lazyLoadSingleImg(perkImg.value) })
watch(settings.value, () => { if (perkImg.value) lazyLoadSingleImg(perkImg.value) }, { flush: 'post' })
</script>
