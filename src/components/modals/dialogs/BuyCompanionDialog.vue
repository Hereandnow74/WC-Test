<template>
  <Modal v-if="showBuyCharDialog" label="Buy character" @click="cancel">
    <div class="p-2 flex flex-col gap-2">
      {{ dialogMessage }}
      <div class="flex gap-2">
        <CharacterInput :min-tier="0" :max-tier="5" class="flex-grow" placeholder="Character name" @onChar="char => charInfo=char" />
        <Button label="Buy" size="Small" @click="doAction" />
      </div>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { useDialogs } from '~/logic/dialog'
import { buyAnyCompanion } from '~/logic/waifuLogic'

const { showBuyCharDialog, dialogBus, dialogMessage } = useDialogs()

const charInfo = ref({})

function doAction() {
  buyAnyCompanion(charInfo.value.u, 0)
  dialogBus.emit('bought')
  dialogBus.reset()
  showBuyCharDialog.value = false
}

function cancel() {
  dialogBus.emit('reject')
  dialogBus.reset()
  showBuyCharDialog.value = false
}
</script>
