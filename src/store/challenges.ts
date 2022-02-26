import { Challenge } from 'global'

const activeChallenges = useStorage<Challenge[]>('activeChallenges', [])

export function useChallenges() {
  return {
    activeChallenges,
  }
}
