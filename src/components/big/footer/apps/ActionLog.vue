<template>
  <div class="p-2 flex flex-col gap-2 h-full">
    <div class="flex flex-col gap-1 overflow-y-auto scrollbar">
      <div
        v-for="event in historyEvents"
        :key="event.id"
        class="w-full p-1 rounded border-1 text-black"
        :style="typeStyles[event.type || 'info']"
      >
        <div v-html="event.message"></div>
        <div class="text-gray-700 text-xs text-right">
          {{ (new Date(event.time)).toLocaleTimeString() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useEvents } from '~/logic/events'

const typeStyles = {
  info: 'color: #01579B; background: linear-gradient(to bottom left, #B3E5FC 40%, #b3cbfc 100%); opacity:0.9;',
  success: 'color: #33691E; background: linear-gradient(to bottom left, #DCEDC8 40%, #c9f0b4 100%); opacity:0.9;',
  warn: 'color: #212121; background: linear-gradient(to bottom left, #FFF9C4 40%, #ffeac4 100%); opacity:0.9;',
  error: 'color: #3b0602; background: linear-gradient(to bottom left, #f0a49e 40%, #d48470 100%); opacity:0.9;',
  attention: 'color: #212121; background: linear-gradient(to bottom left, #FFF8E1 40%, #FFF8E1 100%); opacity:0.9;',
}

const { historyEvents } = useEvents()

</script>
