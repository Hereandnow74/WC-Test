interface SaveListItem {
  uid: number
  name: string
  worldName: string
  rating: number
  totalCost: number
  date: string
}

const savesList = useStorage<SaveListItem[]>('savesList', [])

const buildList = ref([])
const userNickname = useStorage('nickname', '')

const missionFavorites = useStorage<string[]>('missionFavorites', [])

export function useSaves() {
  return {
    savesList,
    buildList,
    userNickname,
    missionFavorites,
  }
}
