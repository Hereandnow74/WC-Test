import { useStore } from '~/store/store'

interface InteractiveEvent {
  time: number
  message: string
  id: number
  delay?: number
  type?: 'success' | 'warn' | 'error' | 'info' | 'attention'
}

const allEvents = useEventBus<InteractiveEvent>('events')
const activeEvents = ref<InteractiveEvent[]>([])
const historyEvents = ref<InteractiveEvent[]>([])

function listener(event: InteractiveEvent) {
  const { width } = useWindowSize()
  const { settings } = useStore()
  if (width.value >= 600) {
    if (!settings.value.notification)
      activeEvents.value.push(event)
    historyEvents.value.push(event)
    setTimeout(() => activeEvents.value.includes(event) ? activeEvents.value.splice(activeEvents.value.indexOf(event), 1) : null, event.delay || 5000)
  }
}

allEvents.on(listener)

// setInterval(() => allEvents.emit({ id: Math.floor(Math.random() * 10000), time: Date.now(), message: '<b>Text</b>  Success message', type: 'success' }), 4500)
// setInterval(() => allEvents.emit({ id: Math.floor(Math.random() * 10000), time: Date.now(), message: 'Warning Message 2', type: 'warn' }), 4000)
// setInterval(() => allEvents.emit({ id: Math.floor(Math.random() * 10000), time: Date.now(), message: 'Attention Message 3', type: 'attention' }), 4000)
// setInterval(() => allEvents.emit({ id: Math.floor(Math.random() * 10000), time: Date.now(), message: 'Error Message 4', type: 'error' }), 4000)
// setInterval(() => allEvents.emit({ id: Math.floor(Math.random() * 10000), time: Date.now(), message: 'Some very long notification about how you are such an awesome person', type: 'info' }), 3500)

export function useEvents() {
  return {
    activeEvents,
    allEvents,
    historyEvents,
  }
}
