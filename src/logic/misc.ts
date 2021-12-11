import { random } from 'lodash-es'
import tippy from 'tippy.js'
import { allWorldsNoCondition, CHAR_COSTS, getChars, getUserChars } from '~/data/constatnts'

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

export async function randomChar(withImg: boolean, maxCost = 0, minCost = 0) {
  let chars = Array.prototype.concat(await getChars(), await getUserChars())
  if (withImg) chars = chars.filter(x => x.i && x.i.length)
  if (maxCost) chars = chars.filter(x => (CHAR_COSTS[x.t - 1] || 0) <= maxCost)
  if (minCost) chars = chars.filter(x => (CHAR_COSTS[x.t - 1] || 0) >= minCost)
  const randomNumber = random(0, chars.length)

  return chars[randomNumber]
}

export function randomWorld(previous = 0, minus = 11, plus = 11) {
  const worlds = allWorldsNoCondition.value.filter((x) => {
    const diff = x.rating - previous
    return diff >= -minus && diff <= plus
  })
  return worlds[random(0, worlds.length - 1)]
}
