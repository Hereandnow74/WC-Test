const showInfo = ref(false)
const showConfirm = ref(false)
const showCustom = ref(false)

const dialogMessage = ref('')
const dialogActions = ref([])

const dialogBus = useEventBus<string>('')

export function confirmDialog(msg: string, type: 'info' | 'confirm' = 'confirm') {
  dialogMessage.value = msg
  return new Promise<boolean>((resolve, reject) => {
    if (type === 'confirm')
      showConfirm.value = true
    else
      showInfo.value = true
    dialogBus.on(val => val === 'confirm' ? resolve(true) : resolve(false))
  })
}

export function customDialog(msg: string, actions: any[]) {
  dialogMessage.value = msg
  dialogActions.value = actions
  return new Promise<string>((resolve, reject) => {
    showCustom.value = true
    dialogBus.on(val => resolve(val))
  })
}

export function useDialogs() {
  return {
    showInfo,
    showConfirm,
    dialogBus,
    dialogMessage,
    showCustom,
    dialogActions,
  }
}
