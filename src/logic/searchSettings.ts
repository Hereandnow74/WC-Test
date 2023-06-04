import { useChargenStore } from '../store/chargen'
import { useStore } from '../store/store'

// Search settings
const minTier = ref(1)
const maxTier = ref(13)
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
const { currentWorld } = useChargenStore()

watch([isLimited, currentWorld], () => {
  if (isLimited.value)
    worldName.value = worldNameDict[currentWorld.value.worldName] || currentWorld.value.worldName || worldNameDict[startingWorld.value.worldName] || startingWorld.value.worldName
  else
    worldName.value = ''
})

// Build image settings
const imageSettings = useStorage('imageSettings', {
  backgroundColor: '#1f2937',
  categoryColor: '#9ca3af',
  perkColor: '#60a5fa',
  numberColor: '#d1d5db',
  showCompanionsImage: true,
  showAvatarImage: true,
  width: 800,
  onlyImages: false,
  retinue: {
    companions: true,
    familiars: true,
    sold: true,
  }
})

if (imageSettings.value.retinue === undefined) {
  imageSettings.value.retinue = {
    companions: true,
    familiars: true,
    sold: true,
  }
}

// Misc settings
const newPrice = ref(false)

export function useSettings() {
  return {
    minTier,
    maxTier,
    worldName,
    blockedWorlds,
    isLimited,
    // Build image settings
    imageSettings,
    // Misc settings
    newPrice,
  }
}
