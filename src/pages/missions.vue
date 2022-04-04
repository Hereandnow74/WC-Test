<template>
  <div class="rounded p-2">
    <h3 class="text-xl text-center flex gap-2">
      <div
        :class="page === 0 ? 'border-2 border-amber-500': ''"
        class="bg-purple-700 text-gray-100 rounded cursor-pointer hover:bg-purple-800 px-2"
        @click="page = 0"
      >
        User submitted Missions
      </div>
      <div
        :class="page === 1 ? 'border-2 border-amber-500': ''"
        class="bg-purple-700 text-gray-100 rounded cursor-pointer hover:bg-purple-800 px-2"
        @click="page = 1"
      >
        Generated Missions
      </div>
      <Button
        class="text-base"
        size="Small"
        icon="fluent:book-question-mark-24-regular"
        label="Propose a Mission"
        bg-color="bg-purple-700"
        @click="() => toggleShowAddMission()"
      />
    </h3>
    <div class="flex gap-2 justify-center flex-wrap py-2">
      <div>
        <Select v-model="author" :options="authorOptions" label="Author">
          <option value="Any">
            Any
          </option>
        </Select>
      </div>
      <div>
        <Select v-model="world" :options="worldOptions" label="World" class="max-w-68">
          <option value="Any">
            Any
          </option>
        </Select>
      </div>
      <div>
        <Select v-model="scope" :options="scopeOptions" label="Scope">
          <option value="Any">
            Any
          </option>
        </Select>
      </div>
    </div>
    <Note v-if="page === 1" class="mb-2" type="warning" title="Work in progress">
      This section is in WIP stage, you can suggest simple missions/conditions/objectives for random mission generation on Discord
    </Note>
    <div class="grid 2xl:grid-cols-3 lg:grid-cols-2 gap-4 pb-8 justify-center">
      <MissionCard v-for="mission in displayedMissions" :key="mission.title" class="max-w-[600px]" :mission="mission" />
    </div>
    <div class="h-8"></div>
  </div>
</template>

<script lang="ts" setup>
import { groupBy } from 'lodash-es'
import { missions } from '~/data/missions'

import { toggleShowAddMission } from '~/logic'
import { MissionGenerator } from '~/logic/missionsGen'

const authorOptions = Object.keys(groupBy(missions, 'author'))
const worldOptions = Object.keys(groupBy(missions, 'loca'))
const scopeOptions = ['Quick', 'Standard', 'Grand']

const author = ref('Any')
const world = ref('Any')
const scope = ref('Any')

const page = ref(0)

const filteredMissions = computed(() => missions.filter(mission => (mission.author === author.value || author.value === 'Any') && (mission.loca === world.value || world.value === 'Any') && (mission.scope === scope.value || scope.value === 'Any')))

const gen = new MissionGenerator()
const generatedMissions = ref<any[]>([])

gen.prepareGeneration().then((generator) => {
  for (let i = 0; i < 10; i++)
    generatedMissions.value.push(generator.generateRandom().getObject())
})

const displayedMissions = computed(() => page.value === 0 ? filteredMissions.value : generatedMissions.value)

</script>
