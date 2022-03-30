import { usePlayStore } from '~/store/play'
import { useStore } from '~/store/store'

const minTier = ref(1)
const maxTier = ref(11)
const worldName = ref('')
const blockedWorlds = useStorage<string[]>('bl', [])
const isLimited = ref(false)

const worldNameDict = {
  'Xenoblade Chronicles 2': '(Monolith) Xeno-',
  'Xenoblade Chronicles 1': '(Monolith) Xeno-',
  'Overlord (LN)': 'Overlord',
  'Avatar: The Last Airbender': 'Avatar',
  'Avatar: Legend of Korra': 'Avatar',
  'Game of Thrones': 'A Song Of Ice And Fire',
  'Monogatari Series': 'Monogatari',
  'Magi Series': 'Magi',
  'Tales Series': 'Tales of',
  'Prisma Illya': 'Nasuverse',
  'Fate/Extra': 'Nasuverse',
  'Precure': 'Pretty Cure',
} as Record<string, string>

const { startingWorld } = useStore()
const { currentWorld } = usePlayStore()

watch([isLimited, currentWorld], () => {
  if (isLimited.value)
    worldName.value = worldNameDict[currentWorld.value.worldName] || currentWorld.value.worldName || worldNameDict[startingWorld.value.worldName] || startingWorld.value.worldName
  else
    worldName.value = ''
})

export function useSearchSettings() {
  return {
    minTier,
    maxTier,
    worldName,
    blockedWorlds,
    isLimited,
  }
}
