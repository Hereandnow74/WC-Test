const canPurchase = ref(true)

export function useGlobalSettings() {
  return {
    canPurchase,
  }
}
