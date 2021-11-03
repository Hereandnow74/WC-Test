interface SaveListItem {
  uid: number
  name: string
  worldName: string
  rating: number
  totalCost: number
  date: string
}

const savesList = useStorage<SaveListItem[]>('savesList', [])

export function useSaves() {
  return {
    savesList,
  }
}
