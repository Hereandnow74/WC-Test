<template>
  <Modal v-if="showInfo" label="Info" @click="confirm">
    <div class="text-lg p-2" v-html="dialogMessage" />
    <div class="flex justify-center gap-4 p-2">
      <Button label="OK" class="w-24" @click="confirm" />
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
</script>
