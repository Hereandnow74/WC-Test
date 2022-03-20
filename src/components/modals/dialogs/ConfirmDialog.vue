<template>
  <Modal v-if="showConfirm" label="Confirm ?" @click="cancel">
    <div class="text-lg p-2" v-html="dialogMessage">
    </div>
    <div class="flex justify-center gap-4 p-2">
      <Button label="Cancel" bg-color="bg-gray-500" @click="cancel" />
      <Button label="Confirm" @click="confirm" />
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { useDialogs } from '~/logic/dialog'

const { showConfirm, dialogBus, dialogMessage } = useDialogs()

function confirm() {
  dialogBus.emit('confirm')
  dialogBus.reset()
  showConfirm.value = false
}

function cancel() {
  dialogBus.emit('cancel')
  dialogBus.reset()
  showConfirm.value = false
}
</script>
