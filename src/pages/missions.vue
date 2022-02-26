<template>
  <div class="rounded max-w-screen-md lg:pl-2 p-2">
    <h3 class="text-xl text-center">
      Missions
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
    <div class="flex flex-col gap-4 pb-8">
      <MissionCard v-for="mission in filteredMissions" :key="mission.title" :mission="mission" />
    </div>
    <div class="h-8"></div>
  </div>
</template>

<script lang="ts" setup>
import { groupBy } from 'lodash-es'
import { missions } from '~/data/missions'

const authorOptions = Object.keys(groupBy(missions, 'author'))
const worldOptions = Object.keys(groupBy(missions, 'loca'))
const scopeOptions = ['Quick', 'Standard', 'Grand']

const author = ref('Any')
const world = ref('Any')
const scope = ref('Any')

const filteredMissions = computed(() => missions.filter(mission => (mission.author === author.value || author.value === 'Any') && (mission.loca === world.value || world.value === 'Any') && (mission.scope === scope.value || scope.value === 'Any')))

</script>
