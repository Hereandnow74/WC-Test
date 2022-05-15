<template>
  <Modal v-if="showCustom" label="Action needed" @click="cancel">
    <div class="text-lg p-2" v-html="dialogMessage">
    </div>
    <div class="flex justify-center gap-4 p-2">
      <Button v-for="action in dialogActions" :key="action" :label="action" @click="doAction(action)" />
      <Button label="Cancel" bg-color="bg-gray-500" @click="cancel" />
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { useDialogs } from '~/logic/dialog'

const { showCustom, dialogBus, dialogMessage, dialogActions } = useDialogs()

function doAction(action: string) {
  dialogBus.emit(action)
  dialogBus.reset()
  showCustom.value = false
}

function cancel() {
  dialogBus.emit('reject')
  dialogBus.reset()
  showCustom.value = false
}
</script>
