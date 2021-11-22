<template>
  <Modal v-if="showInfo" label="Confirm ?">
    <div class="text-lg p-2">
      {{ dialogMessage }}
    </div>
    <div class="flex justify-center gap-4 p-2">
      <Button label="Cancel" bg-color="bg-gray-500" @click="cancel" />
      <Button label="Confirm" @click="confirm" />
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { useDialogs } from '~/logic/dialog'

const { showInfo, dialogBus, dialogMessage } = useDialogs()

function confirm() {
  dialogBus.emit('confirm')
  dialogBus.reset()
  showInfo.value = false
}

function cancel() {
  dialogBus.emit('cancel')
  dialogBus.reset()
  showInfo.value = false
}
</script>
