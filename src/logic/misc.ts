import Fuse from 'fuse.js'
import { random } from 'lodash-es'
import tippy from 'tippy.js'
import { allWorldsNoCondition, CHAR_COSTS, getAllChars, getChars, getUserChars } from '~/data/constants'

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
export function lazyLoadSingleImg(img: HTMLImageElement) {
  if (img) {
    const options = {
      root: null,
      threshold: 0,
    }
    const observer = new IntersectionObserver((entries, observer) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        img.src = img.dataset.src || ''
        observer.unobserve(img)
      }
    }), options)
    observer.observe(img)
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

export function toReadableTime(seconds: number) {
  let res = ''
  if (seconds >= 31536000) {
    const years = ~~(seconds / 31536000)
    res += `${years}Y  `
    seconds -= years * 31536000
  }
  if (seconds >= 2592000) {
    const months = ~~(seconds / 2592000)
    res += `${months}M  `
    seconds -= months * 2592000
  }
  if (seconds >= 86400) {
    const days = ~~(seconds / 86400)
    res += `${days}d `
    seconds -= days * 86400
  }
  if (seconds >= 3600) {
    const hours = ~~(seconds / 3600)
    res += `${hours}h `
    seconds -= hours * 3600
  }
  if (seconds >= 60) {
    const minutes = ~~(seconds / 60)
    res += `${minutes}m `
    seconds -= minutes * 60
  }
  if (seconds)
    res += `${seconds}s `
  if (!res.length) res = 'instantly'
  return res
}

export function imageLink(link: string, uid: number) {
  if (link) {
    if (link.startsWith('http')) { return link }
    else {
      if (uid > 100000)
        return `https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/${link}`
      else
      if (link.startsWith('[n]'))
        return `https://cdn.statically.io/gh/Om1cr0n/cat_thumb/main/docs/thumbs/${link.slice(3)}`
      return `https://cdn.statically.io/gh/klassekatze/waifucatimg/master/imagecache_thumb/${link}`
    }
  }
  return link
}

export async function charSearch() {
  const allChars = await getAllChars()
  const options = {
    findAllMatches: true,
    threshold: 0.1,
    keys: ['n', 'w'],
  }

  const fuse = new Fuse(allChars, options)

  return fuse
}
