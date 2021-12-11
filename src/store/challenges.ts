interface Challenge {
  title: string
  cost: number
}

const activeChallenges = useStorage<Challenge[]>('activeChallenges', [])

export function useChallenges() {
  return {
    activeChallenges,
  }
}
