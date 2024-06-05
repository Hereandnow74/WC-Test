interface SaveListItem {
  uid: number
  name: string
  worldName: string
  rating: number
  intensity: number
  totalCost: number
  date: string
}

const savesList = useStorage<SaveListItem[]>('savesList', [])

const buildList = ref([])
const userNickname = useStorage('nickname', '')

const missionFavorites = useStorage<string[]>('missionFavorites', [])
const localMissions = useStorage('localMissions', [])

export function useSaves() {
  return {
    savesList,
    buildList,
    userNickname,
    missionFavorites,
    localMissions,
  }
}
