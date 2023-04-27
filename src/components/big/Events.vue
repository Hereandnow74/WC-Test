<template>
  <div v-show="activeEvents.length" v-auto-animate class="fixed top-1 right-1 z-50 flex flex-col gap-1">
    <div
      v-for="event in activeEvents"
      :key="event.id"
      class="w-78 p-1 rounded border-1 text-black"
      :style="typeStyles[event.type || 'info']"
      @click="hideEvent(event)"
      v-html="event.message"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { useEvents } from '~/logic/events'

const { activeEvents } = useEvents()

const typeStyles = {
  info: 'color: #01579B; background: linear-gradient(to bottom left, #B3E5FC 40%, #b3cbfc 100%); opacity:0.9;',
  success: 'color: #33691E; background: linear-gradient(to bottom left, #DCEDC8 40%, #c9f0b4 100%); opacity:0.9;',
  warn: 'color: #212121; background: linear-gradient(to bottom left, #FFF9C4 40%, #ffeac4 100%); opacity:0.9;',
  error: 'color: #3b0602; background: linear-gradient(to bottom left, #f0a49e 40%, #d48470 100%); opacity:0.9;',
  attention: 'color: #212121; background: linear-gradient(to bottom left, #FFF8E1 40%, #FFF8E1 100%); opacity:0.9;',
}

function hideEvent(event: any) {
  activeEvents.value.splice(activeEvents.value.indexOf(event), 1)
}
</script>
