const canPurchase = ref(true)
const slightlyUsedTierDiscount = ref(0)
const bindingDiscount = ref(1)
const luresDiscount = ref(1)

export function useGlobalSettings() {
  return {
    canPurchase,
    slightlyUsedTierDiscount,
    bindingDiscount,
    luresDiscount,
  }
}
