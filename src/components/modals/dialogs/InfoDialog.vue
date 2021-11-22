<template>
  <Modal v-if="showInfo">
    <div>Info</div>
    <Button label="Confirm" @click="ok" />
  </Modal>
</template>

<script lang="ts" setup>
import { useDialogs } from '~/logic/dialog'

const { showInfo, dialogBus } = useDialogs()

function ok() {
  dialogBus.emit('confirm')
  dialogBus.reset()
  showInfo.value = false
}
</script>
