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
      src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22576%22%20height%3D%22288%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20576%20288%22%20preserveAspectRatio%3D%22none%22%3E%0A%20%20%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%20%20%3Cstyle%20type%3D%22text%2Fcss%22%3E%0A%20%20%20%20%20%20%20%20%20%20%23holder%20text%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20fill%3A%20%23ffffff%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20font-family%3A%20sans-serif%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20font-size%3A%2040px%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20font-weight%3A%20400%3B%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%3C%2Fstyle%3E%0A%20%20%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%20%20%3Cg%20id%3D%22holder%22%3E%0A%20%20%20%20%20%20%20%20%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23cccccc%22%3E%3C%2Frect%3E%0A%20%20%20%20%20%20%20%20%3Cg%3E%0A%20%20%20%20%20%20%20%20%20%20%3Ctext%20text-anchor%3D%22middle%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20dy%3D%22.3em%22%3E576%20x%20288%3C%2Ftext%3E%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C%2Fsvg%3E"
      :data-src="perk.image"
      :alt="perk.title"
    />
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

import { chooseDefense, chooseTalent, defenseAvailable, intensityAvailable, lazyLoadSingleImg, talentAvailable } from '~/logic/'
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

const { flags, talentPerks, defensePerks, settings } = useStore()
const emit = defineEmits(['chooseIntensity'])

const perkImg = ref<HTMLImageElement | null>(null)

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

onMounted(() => { if (perkImg.value) lazyLoadSingleImg(perkImg.value) })
watch(settings.value, () => { if (perkImg.value) lazyLoadSingleImg(perkImg.value) }, { flush: 'post' })
</script>
