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

export function genericChoose<T>(item: T, isAllowed: (item: T) => boolean, arr: any[]) {
  const { allEffects } = useStore()
  if (isAllowed(item)) {
    const ind = findIndex(arr, { title: item.title })
    if (ind === -1) {
      allEffects.value.push(item.title)
      arr.push({ title: item.title, cost: item.cost })
    }
    else {
      const del = arr.splice(ind)
      del.forEach(x => allEffects.value.splice(allEffects.value.indexOf(x.title), 1))
    }
  }
}

export function addFreebies(list: string[]) {
//
}

export function deleteFreebies(list: string[]) {
//
}
