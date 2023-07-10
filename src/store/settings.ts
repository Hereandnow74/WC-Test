import { useUser } from './user'

const canPurchase = ref(true)
const slightlyUsedTierDiscount = ref(0)
const bindingDiscount = ref(1)
const luresDiscount = ref(1)

const favorites = useStorage<number[]>('favorites', [])

const favoritesObject = computed(() => {
  const { user } = useUser()
  if (user.value.likedCharacters && user.value.likedCharacters.length)
    return user.value.likedCharacters.reduce((a, f) => { a[f] = f; return a }, {} as Record<string, number>)
  else
    return favorites.value.reduce((a, f) => { a[f] = f; return a }, {} as Record<string, number>)
})

const favoriteWorlds = useStorage<string[]>('favoriteWorlds', [])
const favoriteWorldsObject = computed(() => favoriteWorlds.value.reduce((a, f) => { a[f] = f; return a }, {} as Record<string, string>))

export function useGlobalSettings() {
  return {
    canPurchase,
    slightlyUsedTierDiscount,
    bindingDiscount,
    luresDiscount,
    favorites,
    favoritesObject,
    favoriteWorlds,
    favoriteWorldsObject,
  }
}
