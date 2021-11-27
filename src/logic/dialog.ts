const showInfo = ref(false)
const showConfirm = ref(false)

const dialogMessage = ref('')

const dialogBus = useEventBus<string>('')

export function confirmDialog(msg: string, type: 'info' | 'confirm' = 'confirm') {
  dialogMessage.value = msg
  return new Promise((resolve, reject) => {
    if (type === 'confirm')
      showConfirm.value = true
    else
      showInfo.value = true
    dialogBus.on(val => val === 'confirm' ? resolve(true) : resolve(false))
  })
}

export function useDialogs() {
  return {
    showInfo,
    showConfirm,
    dialogBus,
    dialogMessage,
  }
}
