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
import { useStore } from '~/store/store'

const { homePerks } = useStore()

const appsList = [
  { icon: 'bi:globe2', name: 'Exit Stage Left', component: 'ExitStage', color: '#5480fc' },
  { icon: 'cil:cash', name: 'Cash Still Rules / Loans', component: 'CashRules', color: '#5a933d' },
  { icon: 'fluent:book-question-mark-24-regular', name: 'Missions', component: 'Missions', color: '#e3992b' },
  { icon: 'la:dice-d20', name: 'Random Build', component: 'RandomBuild', color: '#c76eff' },
  { icon: 'fa-solid:dice', name: 'Dice Machine', component: 'DiceMachine', color: 'white' },
  { icon: 'gis:search-globe-alt', name: 'Random World', component: 'RandomWorld', color: '#ff8888' },
  { icon: 'fluent:person-question-mark-16-regular', name: 'Random Character', component: 'RandomChar', color: '#f9ec52' },
  { icon: 'bx:bx-spreadsheet', name: 'Global Users Builds', component: 'UserBuilds', color: '#3a64b1' },
  { icon: 'la:dragon', name: 'Dragon Aura Calculator', component: 'DragonAura', color: '#c90000' },
  { icon: 'carbon:circle-packing', name: 'Ritual Circle', component: 'RitualCircle', color: '#b912b4' },
  { icon: 'clarity:note-edit-line', name: 'Notes', component: 'Notes', color: '#e9d385' },
  { icon: 'bx:bx-calculator', name: 'Bulk Capture Calculator', component: 'BulkCapture', color: '#c1c1c1' },
  { icon: 'tabler:shopping-cart-discount', name: 'Discounts', component: 'Discounts', color: '#5a933d' },
]

const apps = computed(() => {
  if (homePerks.value.length)
    appsList.push({ icon: 'bi:box-seam', name: 'Pocket Space', component: 'PocketSpace', color: '#0d6efd' })

  return appsList
})

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
  RitualCircle: defineAsyncComponent(() => import('./apps/RitualCircleApp.vue')),
  BulkCapture: defineAsyncComponent(() => import('./apps/BulkCapture.vue')),
  PocketSpace: defineAsyncComponent(() => import('./apps/PocketSpace.vue')),
  Discounts: defineAsyncComponent(() => import('./apps/Discounts.vue')),
}

const appName = ref('')
const appComponent = computed(() => appComponents[appName.value])

onMounted(() => appMode.value = false)

function pickApp(app: any) {
  toggleAppMode()
  appName.value = app.component
}
</script>
