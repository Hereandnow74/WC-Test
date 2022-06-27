<template>
  <div class="rounded p-2 flex flex-col gap-2">
    <h3 class="text-center flex gap-2 flex-wrap">
      <Button
        :class="page === 0 ? 'bg-blue-800': ''"
        class="bg-purple-700 text-gray-100 rounded cursor-pointer hover:bg-purple-800 px-2"
        label="User submitted Missions"
        icon="carbon:user-avatar-filled-alt"
        @click="page = 0"
      />
      <Button
        :class="page === 1 ? 'bg-blue-800': ''"
        class="bg-purple-700 text-gray-100 rounded cursor-pointer hover:bg-purple-800 px-2"
        label="Generated Missions"
        icon="icon-park-solid:robot-one"
        @click="page = 1"
      />
      <Button
        :class="page === 2 ? 'bg-blue-800': ''"
        class="bg-purple-700 text-gray-100 rounded cursor-pointer hover:bg-purple-800 px-2"
        label="3 random missions"
        icon="bi:patch-question-fill"
        @click="page = 2"
      />
      <Button
        class="text-base"
        icon="fluent:book-question-mark-24-regular"
        label="Propose a Mission"
        bg-color="bg-amber-600"
        @click="() => toggleShowAddMission()"
      />
    </h3>
    <div v-if="page === 0" class="flex gap-2 justify-center flex-wrap">
      <div>
        <Select v-model="author" :options="authorOptions" label="Author" />
      </div>
      <div>
        <Select v-model="world" :options="worldOptions" label="World" class="max-w-68" />
      </div>
      <div>
        <Select v-model="scope" :options="scopeOptions" label="Scope" />
      </div>
      <Button v-if="Object.values(missionRewards).length" size="Small" label="Delete all rewards" bg-color="bg-red-600" @click="missionRewards = {}" />
    </div>
    <Note v-if="page === 1" type="warning" title="Work in progress">
      This section is in WIP stage, you can suggest simple missions/conditions/objectives for random mission generation on Discord
    </Note>
    <div class="grid 2xl:grid-cols-3 lg:grid-cols-2 gap-4 pb-8 justify-center">
      <MissionCard v-for="mission in displayedMissions" :key="mission.title" class="max-w-[600px]" :mission="mission" />
    </div>
    <div class="h-8"></div>
  </div>
</template>

<script lang="ts" setup>
import { Mission } from 'global'
import { groupBy, sample } from 'lodash-es'

import { toggleShowAddMission } from '~/logic'
import { MissionGenerator } from '~/logic/missionsGen'
import { usePlayStore } from '~/store/play'

const { currentWorld, missionRewards } = usePlayStore()
const missions = ref<Mission[]>([])

async function getMissions() {
  missions.value = (await import('~/data/missions.json')).default
}

getMissions()

const authorOptions = computed(() => {
  const authors = Object.keys(groupBy(missions.value, 'author')).sort((a, b) => a.localeCompare(b))
  authors.unshift('Any')
  return authors
})
const worldOptions = computed(() => Object.keys(groupBy(missions.value, 'loca')).sort((a, b) => a.localeCompare(b)))
const scopeOptions = ['Any', 'Quick', 'Standard', 'Grand']

const author = ref('Any')
const world = ref('Any')
const scope = ref('Any')

const page = ref(0)

const filteredMissions = computed(() => missions.value.filter(mission => (mission.author === author.value || author.value === 'Any') && (mission.loca === world.value || world.value === 'Any') && (mission.scope === scope.value || scope.value === 'Any')))

const gen = new MissionGenerator()
const gen2 = new MissionGenerator()
const generatedMissions = computed(() => {
  const arr = []
  for (let i = 0; i < 10; i++)
    arr.push(gen.generateRandom().getObject())
  return arr
})

const threeMission = computed(() => [sample(missions.value), sample(missions.value), gen2.generateRandom(currentWorld.value.worldName).getObject()])

const displayedMissions = computed(() => {
  switch (page.value) {
    case 0:
      return filteredMissions.value
    case 1:
      return generatedMissions.value
    case 2:
      return threeMission.value
  }
})

</script>
