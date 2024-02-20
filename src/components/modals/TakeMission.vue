<template>
  <Modal label="Take mission">
    <div class="flex min-h-0 flex-col gap-2 p-2">
      <Input v-model="title" :disabled="!!missionSave" label="Mission name" />
      <Input v-model="location" :disabled="!!missionSave" label="Location" />
      <TextArea v-model="desc" :disabled="!!missionSave" placeholder="Your plans, actions, notes or other things that you want to save" rows="5" />
      <h3 class="flex gap-2 items-center text-lg cursor-pointer" @click="addReward">
        Rewards  <fluent:add-12-filled class="text-green-200 text-green-700 hover:text-green-500" />
      </h3>
      <div class="flex flex-col gap-2 flex-grow min-h-0 overflow-y-auto scrollbar">
        <div v-for="_, i in rewards" :key="i" class="flex gap-2">
          <Select v-model="types[i]" :disabled="!!missionSave" label="Type" placeholder="Reward Type" :options="['Credits', 'TX Tickets', 'Perk', 'Companion', 'Other']" />
          <template v-if="types[i] === 'Perk'">
            <div class="text-red-500 text-xs max-w-40">
              Perk rewards can be buggy, advised to use only for simple perks for now.
            </div>
            <InputWithSearch
              v-model="rewards[i]"
              :disabled="!!missionSave"
              placeholder="Perk name"
              :list="Object.keys(ALL_PERK_TITLES)"
            />
          </template>
          <CharacterInput v-else-if="types[i] === 'Companion'" :idd="`char${i}`" @updateUID="(uid: number) => rewards[i] = uid" />
          <Input v-else v-model="rewards[i]" :disabled="!!missionSave" label="Reward" placeholder="Text or number" />
          <div icon="" size="small" class="hover:text-red-500 cursor-pointer flex items-center" @click="deleteReward(i)">
            <fluent:delete-20-filled />
          </div>
        </div>
      </div>
      <Button v-if="missionSave" class="self-end" size="Small" label="Undo" @click="undoMissionRewards" />
      <Button v-else class="self-end" size="Small" label="Apply" @click="applyMissionRewards" />
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { Mission } from 'global'
import type { PropType } from '@vue/runtime-core'
import TextArea from '../basic/TextArea.vue'
import { usePlayStore } from '~/store/play'
import { ALL_PERK_TITLES } from '~/data/constants'
import { buyAnyPerk, removeAnyPerk } from '~/logic/perksLogic'
import { buyAnyCompanion, removeAnyCompanion } from '~/logic/waifuLogic'

const props = defineProps({
  mission: {
    type: Object as PropType<Mission>,
    default: () => ({}),
  },
})

const { missionRewards } = usePlayStore()

const missionSave = computed(() => missionRewards.value[props.mission.uid])

const title = ref(props.mission.title)
const location = ref(props.mission.loca)
const rewards = ref(missionSave.value ? missionSave.value.rewards.map(x => x.value) : [''])
const types = ref(missionSave.value ? missionSave.value.rewards.map(x => x.type) : ['Other'])
const desc = ref(missionSave.value ? missionSave.value.desc : '')

watch([title, location, rewards, types, desc], () => missionSave.value ? applyMissionRewards() : null)

function applyMissionRewards() {
  missionRewards.value[props.mission.uid] = {
    uid: props.mission.uid,
    title: title.value,
    location: location.value,
    desc: desc.value,
    rewards: rewards.value.map((reward, i) => ({ type: types.value[i], value: reward }), []),
  }
  rewards.value.forEach((reward, i) => {
    if (types.value[i] === 'Perk')
      buyAnyPerk(reward)
    if (types.value[i] === 'Companion')
      buyAnyCompanion(reward, 0, 'capture')
  })
}

function undoMissionRewards() {
  missionRewards.value[props.mission.uid].rewards.forEach((reward, i) => {
    if (reward.type === 'Perk')
      removeAnyPerk('', reward.value)
    if (reward.type === 'Companion')
      removeAnyCompanion(reward.value)
  })
  delete missionRewards.value[props.mission.uid]
}

function addReward() {
  rewards.value.push('')
  types.value.push('Other')
}

function deleteReward(i: number) {
  rewards.value.splice(i, 1)
  types.value.splice(i, 1)
}

</script>
