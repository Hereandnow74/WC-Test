<template>
  <div class="p-2 flex flex-col gap-2 h-full">
    <div>Place where you can keep some notes for your builds.</div>
    <div class="flex gap-2">
      <AnythingInput v-model="note" :list="Object.keys(notes)" class="flex-grow w-full" placeholder="Note name" />
      <Button size="Small" label="delete" bg-color="bg-red-500" @click="deleteNote" />
    </div>
    <textarea
      v-model="notes[note]"
      :rows="5"
      class="w-full h-full text-gray-800 rounded p-1"
      placeholder="Note text"
    />
    <Button label="Back" icon="akar-icons:arrow-back-thick" size="Small" class="self-center" @click="toggleAppMode" />
  </div>
</template>

<script lang="ts" setup>
import { toggleAppMode } from '~/logic'
import AnythingInput from '~/components/small/AnythingInput.vue'

const notes = useStorage<Record<string, string>>('notes', {})
const note = ref('note1')

function deleteNote() {
  if (notes.value[note.value])
    delete notes.value[note.value]
}
</script>
