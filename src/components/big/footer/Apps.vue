<template>
  <div v-if="!appMode" class="grid grid-cols-4 p-4 gap-2">
    <div
      v-for="app in apps"
      :key="app.name"
      class="flex flex-col justify-center items-center rounded-xl bg-black bg-opacity-20 p-1 cursor-pointer hover:bg-gray-700"
      @click="pickApp(app)"
    >
      <span class="iconify w-16 h-16" :style="`color:${app.color}`" :data-icon="app.icon"></span>
      <div class="text-center text-sm text-gray-200">
        {{ app.name }}
      </div>
    </div>
  </div>
  <component :is="appComponent" v-else />
</template>

<script lang="ts" setup>
import { appMode, toggleAppMode } from '~/logic'

const apps = [
  { icon: 'bi:globe2', name: 'Exit Stage Left', component: 'ExitStage', color: '#5480fc' },
  { icon: 'cil:cash', name: 'Cash Still Rules', component: 'CashRules', color: '#5a933d' },
  { icon: 'fluent:book-question-mark-24-regular', name: 'Missions', component: 'Missions', color: '#e3992b' },
  { icon: 'la:dice-d20', name: 'Random Build', component: 'RandomBuild', color: '#c76eff' },
  { icon: 'fa-solid:dice', name: 'Dice Machine', component: 'DiceMachine', color: 'white' },
  { icon: 'gis:search-globe-alt', name: 'Random World', component: 'RandomWorld', color: '#ff8888' },
  { icon: 'fluent:person-question-mark-16-regular', name: 'Random Character', component: 'RandomChar', color: '#f9ec52' },
  { icon: 'bx:bx-spreadsheet', name: 'Global Users Builds', component: 'UserBuilds', color: '#3a64b1' },
  { icon: 'la:dragon', name: 'Dragon Aura Calculator', component: 'DragonAura', color: '#c90000' },
  { icon: 'clarity:note-edit-line', name: 'Notes', component: 'Notes', color: '#e9d385' },
]

const appComponents = {
  RandomChar: defineAsyncComponent(() => import('./apps/RandomChar.vue')),
  ExitStage: defineAsyncComponent(() => import('./apps/ExitStage.vue')),
  CashRules: defineAsyncComponent(() => import('./apps/CashRules.vue')),
  Missions: defineAsyncComponent(() => import('./apps/Missions.vue')),
  RandomBuild: defineAsyncComponent(() => import('./apps/RandomBuild.vue')),
  DiceMachine: defineAsyncComponent(() => import('./apps/DiceMachine.vue')),
  RandomWorld: defineAsyncComponent(() => import('./apps/RandomWorld.vue')),
  UserBuilds: defineAsyncComponent(() => import('./apps/UserBuilds.vue')),
  DragonAura: defineAsyncComponent(() => import('./apps/DragonAura.vue')),
  Notes: defineAsyncComponent(() => import('./apps/Notes.vue')),
}

const appName = ref('')
const appComponent = computed(() => appComponents[appName.value])

onMounted(() => appMode.value = false)

function pickApp(app: any) {
  toggleAppMode()
  appName.value = app.component
}
</script>
