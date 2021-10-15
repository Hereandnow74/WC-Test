import { findIndex } from 'lodash-es'
import tippy from 'tippy.js'
import { useStore } from '~/store/store'

export const useTooltips = () => tippy('[data-tippy-content]', {
  animation: false,
  aria: {
    content: null,
    expanded: false,
  },
})

export function genericChoose<T>(lure: T, isAllowed: (lure: T) => boolean, arr: any[]) {
  const { allEffects } = useStore()
  if (isAllowed(lure)) {
    const ind = findIndex(arr, { title: lure.title })
    if (ind === -1) {
      allEffects.value.push(lure.title)
      arr.push({ title: lure.title, cost: lure.cost })
    }
    else {
      const del = arr.splice(ind)
      del.forEach(x => allEffects.value.splice(allEffects.value.indexOf(x.title), 1))
    }
  }
}
