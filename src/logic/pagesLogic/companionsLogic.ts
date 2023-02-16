import Fuse from 'fuse.js'
import { useAllChars } from '~/data/constants'

const { allCharsComp: allChars } = useAllChars()

const options = {
  findAllMatches: true,
  useExtendedSearch: true,
  threshold: 0.4,
  ignoreLocation: true,
  keys: [{ name: 'n', weight: 1.1 }, 'w', 'b', 'i', 'd', 'in', 'u', 'k'],
}

const options2 = {
  useExtendedSearch: true,
  findAllMatches: true,
  threshold: 0.4,
  keys: ['n', 'w', 'b', 'i', 'd', 'in', 'u', 'k'],
  shouldSort: false,
}

const fuse = computed(() => new Fuse(allChars.value, options))
const fuseNoSort = computed(() => new Fuse(allChars.value, options2))

export function useCompanionsLogic() {
  return {
    fuse,
    fuseNoSort,
  }
}
