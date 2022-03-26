const minTier = ref(1)
const maxTier = ref(11)
const worldName = ref('')
const blockedWorlds = useStorage<string[]>('bl', [])

export function useSearchSettings() {
  return {
    minTier,
    maxTier,
    worldName,
    blockedWorlds,
  }
}
