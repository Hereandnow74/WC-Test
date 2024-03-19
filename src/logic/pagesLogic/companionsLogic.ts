import Fuse from 'fuse.js'
import { useAllChars } from '../../data/constants'

const { allCharsComp: allChars } = useAllChars()

const options = {
  findAllMatches: true,
  useExtendedSearch: true,
  threshold: 0.4,
  ignoreLocation: true,
  keys: [{ name: 'n', weight: 1.1 }, { name: 'w', weight: 1.5 }, 'b', 'i', 'd', 'in', 'u', 'k', 'c'],
}

const options2 = {
  useExtendedSearch: true,
  findAllMatches: true,
  threshold: 0.4,
  keys: ['n', 'w', 'b', 'i', 'd', 'in', 'u', 'k', 'c'],
  shouldSort: false,
}

const fuse = computed(() => new Fuse(allChars.value, options))
const fuseNoSort = computed(() => new Fuse(allChars.value, options2))
// console.log(allChars.value.sort((a, b) => b.n.length - a.n.length).slice(0, 100).map(x => x.n))

export function useCompanionsLogic() {
  return {
    fuse,
    fuseNoSort,
  }
}
