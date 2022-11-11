<template>
  <Modal label="Import / Export local characters">
    <div class="overflow-y-auto scrollbar p-2">
      <TextArea v-model="charData" placeholder="Paste character data here" />
      <div class="text-center font-semibold">
        {{ message }}
      </div>
      <div class="flex gap-2 justify-end">
        <Button size="Small" label="Import" @click="importChars()" />
        <Button size="Small" label="Export" @click="exportChars()" />
      </div>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { isArray } from 'lodash-es'
import { useStore } from '~/store/store'

const charData = ref('')
const message = ref('')

const { localUserCharacters } = useStore()

function importChars() {
  const chars = JSON.parse(charData.value)
  if (isArray(chars)) {
    localUserCharacters.value.push(...chars)
    message.value = 'Successfully imported characters'
  }
}

function exportChars() {
  navigator.clipboard.writeText(JSON.stringify(localUserCharacters.value, null, 2))
  message.value = 'Copied character data to clipboard'
}
</script>
