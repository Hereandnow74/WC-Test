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

export function lazyLoadImg(list: HTMLElement| null) {
  if (list) {
    const options = {
      root: null,
      threshold: 0,
    }
    for (let i = 0; i < list.children.length; i++) {
      const el = list.children[i].querySelector('img')
      if (el) {
        const observer = new IntersectionObserver((entries, observer) => entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.src = el.dataset.src || ''
            observer.unobserve(el)
          }
        }), options)
        observer.observe(el)
      }
    }
  }
}

export function deleteFreebies(freebies: object) {
  const { allForSave, allEffects } = useStore()
  for (const [key, perk] of Object.entries(freebies) as [keyof typeof allForSave, string[]][]) {
    perk.forEach((n: string) => {
      const ind = findIndex(allForSave[key].value, { title: n })
      if (ind !== -1) {
        if (allForSave[key].value[ind].count && allForSave[key].value[ind].count > 1)
          allForSave[key].value[ind].count -= 1
        else
          allForSave[key].value.splice(ind, 1)
        allEffects.value.splice(allEffects.value.indexOf(n), 1)
      }
    })
  }
}

export function addFreebies(freebies: object) {
  const { allForSave, allEffects } = useStore()
  for (const [key, perk] of Object.entries(freebies) as [keyof typeof allForSave, string[]][]) {
    perk.forEach((n: string) => {
      const ind = findIndex(allForSave[key].value, { title: n })
      if (ind === -1) {
        allForSave[key].value.push({ title: n, cost: 0, count: 1 })
        allEffects.value.push(n)
      }
      else {
        if (allForSave[key].value[ind].count)
          allForSave[key].value[ind].count += 1
        else
          allForSave[key].value[ind].cost = 0
      }
    })
  }
}
