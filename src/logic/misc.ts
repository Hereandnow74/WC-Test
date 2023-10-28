import Fuse from 'fuse.js'
import { random, groupBy, sampleSize, findIndex, sample, isNumber, xor, compact } from 'lodash-es'
import tippy from 'tippy.js'
import { DBWorld } from 'global'
import { allWorldsNoCondition, ALL_DLC_PERK_TITLES, CHAR_COSTS, getAllChars, shownValue, useAllChars, CHAR_COSTS_FULL } from '../data/constants'

import { useStore } from '../store/store'
import { clearAll, isBuildImage } from '../logic'
import { confirmDialog } from '../logic/dialog'
import { useChallenges } from '../store/challenges'
import { usePlayStore } from '../store/play'

import { TOOLTIPS, LINKS, LINKS_REG, QUERIES } from '~/data/constants'

const { allCharsComp, allCharsObject } = useAllChars()

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
    if (img.src && img.src === img.dataset.src) {
      img.src = img.dataset.src || ''
      return
    }
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

export async function randomChar(maxCost = 0, minCost = 0, gender: 'F' | 'M' | 'O' | null = null) {
  const chars = allCharsComp.value.filter((x) => {
    let res = true
    if (gender) res = x.b && x.b.includes(gender) ? res : false
    if (maxCost) res = (CHAR_COSTS_FULL[x.t]) <= maxCost ? res : false
    if (minCost) res = (CHAR_COSTS_FULL[x.t]) >= minCost ? res : false

    return res
  })
  const randomNumber = random(0, chars.length - 1)
  return chars[randomNumber]
}

export function randomWorld(previous = 0, minus = 11, plus = 11, n = 1, doubles = [] as DBWorld[]) {
  const worlds = allWorldsNoCondition.value.filter((x) => {
    const diff = x.rating - previous
    return diff >= -minus && diff <= plus && findIndex(doubles, { worldName: x.worldName, condition: x.condition }) === -1
  })
  return sampleSize(worlds, n)
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
  if (seconds > 0)
    res += `${Math.round(seconds)}s `
  if (!res.length) res = 'instantly'
  return res
}

export function imageLink(uid: number, link = '') {
  if (!link)
    link = allCharsObject.value[uid]?.i
  if (link) {
    if (link.startsWith('http') || link.startsWith('/')) { return link }
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

// export async function charSearch() {
//   const allChars = await getAllChars()
//   const options = {
//     findAllMatches: true,
//     threshold: 0.5,
//     keys: ['n', 'w'],
//   }

//   const fuse = new Fuse(allChars, options)

//   return fuse
// }

const charSearch = computed(() => {
  const options = {
    findAllMatches: true,
    threshold: 0.3,
    useExtendedSearch: true,
    keys: [{ name: 'n', weight: 2 }, 'w', 't'],
  }

  const fuse = new Fuse(allCharsComp.value, options)

  return fuse
})

export function useCharSearch() {
  return {
    charSearch,
  }
}

const {
  startingWorld, startingOrigin, intensities, binding, homePerks, defensePerks,
  companions, heritage, talentPerks, waifuPerks, ridePerks, miscPerks, luresBought, genericWaifuPerks,
  companionsCost, baseBudget, companionProfit, companionProfitSold, otherPerks, loan, csr,
  usedHeritageDiscount, talentsDiscount, defensesDiscount, defenseRetinueDiscount, patron, specificMods, specificModsCost, missionRewardCredits, pvpPerks, baseBudgetAfter, difficulties, difficultyRating, difficultyAdjustedBudgets,
} = useStore()

const { activeChallenges } = useChallenges()
const { missionRewards } = usePlayStore()

const originTextClean = computed(() => {
  const variants = {
    'Drop-In': 'Dropped-In',
    'Walk-In': `Walked-In as ${startingOrigin.value.character} of T${startingOrigin.value.tier}`,
    'Extra': `'Extra' with ${startingOrigin.value.cost} additional cost`,
    'Substitute': `${startingOrigin.value.character} (Substitute) of T${startingOrigin.value.tier}`,
    'Possess': `${startingOrigin.value.character} (Possess) of T${shownValue[startingOrigin.value.tier || 0]}`,
  } as Record<string, string>

  return variants[startingOrigin.value.title]
})

export async function clearBuild() {
  const res = await confirmDialog('This action will clear your build, proceed?')
  if (!res) return
  clearAll()
}

function squreType(string: string, type = 'text') {
  const color = isNumber(string) ? '#277016' : '#52106e'
  return type === 'text' ? `[${string}]` : `[color=#333333][[color=${color}]${string}[/color]][/color]`
}

function buildString(title: string, items: Perk[], left: object) {
  let str = `${title}\n`
  items.forEach((x) => {
    left.c -= x.cost
    const count = x.count && x.count > 1 ? ` x${x.count} ` : ''
    let complexFlavor = ''
    let complexCompanion = ''
    let complexBoth = ''
    let dlc = ''
    if (ALL_DLC_PERK_TITLES.value[x.title])
      dlc = 'ᵈˡᶜ'
    if (x.complex) {
      if (x.complex[0].flavor && x.complex[0].target) {
        let pw = ''
        if (['Power Swap'].includes(x.title)) pw = ' powers'
        const grouped = groupBy(x.complex, c => c.target)
        complexBoth = squreType(`${Object.entries(grouped)
          .map(x => `${x[0]} ${x[0] === 'You' ? 'have' : 'has'} ${x[1]
            .map(f => f.flavor).join(', ')}${pw}`).join(', ')}`)
      }
      if (x.complex[0].flavor)
        complexFlavor = squreType(`${x.complex.map(x => `${x.flavor}`).join(', ')}`)
      if (x.complex[0].target)
        complexCompanion = squreType(`${x.complex.map(x => `${x.target}`).join(', ')}`)
    }
    str += `${x.title.replace(/ Talent| Defense/, '')}${dlc}${count}${complexBoth || complexCompanion || complexFlavor} ${x.cost ? `-${x.cost}` : 'free'} [${left.c}]\n`
  })
  return str
}

export function numberToSigned(n: number): string {
  return n > 0 ? `+${n}` : `${n}`
}

export function copyText() {
  const fullCost = { c: difficultyAdjustedBudgets.value[startingWorld.value.rating] || 0 }
  if (csr.value) fullCost.c = 0

  let full = `Starting World: ${startingWorld.value.worldName}${startingWorld.value.condition ? ` [${startingWorld.value.condition}]` : ''}\nStarting budget ${fullCost.c}\n\n`

  full += loan.value.gained > 0 ? `Took a loan for ${loan.value.gained} credits\n\n` : ''
  fullCost.c += loan.value.gained

  full += patron.value.length ? `${buildString('Patron', patron.value, fullCost)}\n` : ''

  full += activeChallenges.value.length ? `${buildString('Challenges', activeChallenges.value, fullCost)}\n` : ''

  full += difficulties.value.length
    ? `Intensity [${difficultyRating.value}] \n${difficulties.value.reduce((a, x) => { if (x.cost) fullCost.c -= x.cost; return a += `${x.title} ${x.intensity || ((x.cost || 0) * -1) || 0}\n` }
      , '')}`
    : ''

  full += intensities.value.length
    ? `Mode \n${intensities.value.reduce((a, x) =>
      a += `${x.title} +${x.intensity > 10 ? x.intensity : Math.round(baseBudgetAfter.value * x.intensity)} [${(fullCost.c += x.intensity > 10 ? x.intensity : Math.round(baseBudgetAfter.value * x.intensity), fullCost.c)}]\n\n`
    , '')}`
    : ''

  full += pvpPerks.value.length ? `${buildString('Orbs', pvpPerks.value, fullCost)}\n` : ''

  fullCost.c -= startingOrigin.value.cost || 0
  full += originTextClean.value ? `${originTextClean.value} -${startingOrigin.value.cost} [${fullCost.c}]\n` : ''
  if (startingOrigin.value.swap) {
    fullCost.c -= (startingOrigin.value.swap.cost - startingOrigin.value.swap.refund) || 0
    full += `Power Swap to ${startingOrigin.value.swap.name}(T${startingOrigin.value.swap.tier}) ${startingOrigin.value.swap.cost - startingOrigin.value.swap.refund} [${fullCost.c}]\n`
  }
  if (startingOrigin.value.perk) {
    fullCost.c -= (startingOrigin.value.perk.cost - startingOrigin.value.perk.refund) || 0
    full += `Waifu Perk ${startingOrigin.value.perk.title}(T${startingOrigin.value.perk.tier}) ${startingOrigin.value.perk.cost - startingOrigin.value.perk.refund} [${fullCost.c}]\n`
  }
  if (usedHeritageDiscount.value > 0) {
    fullCost.c += usedHeritageDiscount.value
    full += `Discounted because of your archetype +${usedHeritageDiscount.value} [${fullCost.c}]\n`
  }
  full += '\n'
  full += heritage.value.length ? `${buildString('Heritage', heritage.value, fullCost)}\n` : ''
  full += binding.value.length ? `${buildString('Bindings', binding.value, fullCost)}\n` : ''
  full += luresBought.value.length ? `${buildString('Lures', luresBought.value, fullCost)}\n` : ''
  full += otherPerks.value.length ? `${buildString('Other Controls', otherPerks.value, fullCost)}\n` : ''
  full += ridePerks.value.length ? `${buildString('Rides', ridePerks.value, fullCost)}\n` : ''
  full += homePerks.value.length ? `${buildString('Home Perks', homePerks.value, fullCost)}\n` : ''
  if (talentsDiscount.value > 0) {
    fullCost.c += talentsDiscount.value
    full += `Discounted for duplicate talents +${talentsDiscount.value} [${fullCost.c}]\n`
  }
  full += talentPerks.value.length ? `${buildString('Talents', talentPerks.value, fullCost)}\n` : ''
  if (defensesDiscount.value > 0) {
    fullCost.c += defensesDiscount.value
    full += `Discounted for duplicate defenses +${defensesDiscount.value} [${fullCost.c}]\n`
  }
  full += defensePerks.value.length ? `${buildString('Defenses', defensePerks.value, fullCost)}\n` : ''
  if (defenseRetinueDiscount.value > 0) {
    fullCost.c += defenseRetinueDiscount.value
    full = full.slice(0, -1)
    full += `Defenses discounted for retinue members +${defenseRetinueDiscount.value} [${fullCost.c}]\n\n`
  }
  full += miscPerks.value.length ? `${buildString('Misc Perks', miscPerks.value, fullCost)}\n` : ''
  full += genericWaifuPerks.value.length ? `${buildString('Generic Waifu Perks', genericWaifuPerks.value, fullCost)}\n` : ''
  full += waifuPerks.value.length ? `${buildString('Waifu Perks', waifuPerks.value, fullCost)}\n` : ''

  const companionsBought = companions.value.filter(x => x.method !== 'capture')
  const companionsCaptured = companions.value.filter(x => x.method === 'capture')

  fullCost.c -= companionsCost.value
  full += companionsBought.length
    ? `Companions bought -${companionsCost.value} [${fullCost.c}]\n${companionsBought.reduce((a, x) => {
      a += `${x.name}(T${x.tier})[${x.method}]${x.role && x.role !== 'Companion' ? `{${x.role}}` : ''} from ${x.world}`
      if (x.swap)
        a += ` Power Swapped to ${x.swap.name} of [T${x.swap.tier}]`
      if (x.perk)
        a += ` with Specific Waifu Perk ${x.perk.title} [T${x.perk.tier}]`
      return `${a}\n`
    }
    , '')}`
    : ''

  fullCost.c += companionProfit.value + companionProfitSold.value

  full += companionsCaptured.length
    ? `\nCompanions captured +${companionProfit.value}; sold +${companionProfitSold.value} [${fullCost.c}]\n${companionsCaptured.reduce((a, x) => {
      a += `${x.name}(T${x.tier})${x.role && x.role !== 'Companion' ? `{${x.role}}` : ''} from ${x.world}${x.sold ? ' --SOLD' : ''}`
      if (x.swap)
        a += ` Power Swapped to ${x.swap.name} of [T${x.swap.tier}]`
      if (x.perk)
        a += ` with Specific Waifu Perk ${x.perk.title} [T${x.perk.tier}]`
      return `${a}\n`
    }
    , '')}`
    : ''

  fullCost.c += specificModsCost.value

  full += specificMods.value.length
    ? `\nSpecific credit modifiers ${numberToSigned(specificModsCost.value)} [${fullCost.c}]:\n${specificMods.value.reduce((a, x) => (a += `${x.desc} [${numberToSigned(x.mod)}]\n`, a), '')}`
    : ''

  fullCost.c += missionRewardCredits.value
  const MR = Object.values(missionRewards.value)
  full += MR.length
    ? `\nMission Rewards ${numberToSigned(missionRewardCredits.value)} [${fullCost.c}]:\n${MR.reduce((a, x) =>
      (a += `${x.title} in ${x.location}\n${x.rewards.reduce((a, rw) => a += `  ${rw.type} [${rw.value}];`, '')}`, a), '')}`
    : ''

  navigator.clipboard.writeText(full)
}

export function buildImage() {
  isBuildImage.value = true
}

export function randomString(n = 5): string {
  const chars = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890'
  return new Array(n).fill(0).reduce(a => a += sample(chars), '')
}

export function populateDesc(desc: string) {
  return desc.replace(LINKS_REG,
    (full, ...all) => {
      all = compact(all)
      if (LINKS.value[all[0]] !== undefined) { return `<router-link @click.stop class="dark:text-blue-300 text-blue-600 hover:underline" :to="{ path: '/${LINKS.value[all[0]]}', hash: '#${all[0]}'${QUERIES.value[all[0]] ? `, query: {q: '${QUERIES.value[all[0]]}'}` : ''}}">${full}</router-link>` }
      else {
        return `<span data-tippy-content="${TOOLTIPS[all[0] as keyof typeof TOOLTIPS]}"
        class="text-green-600 dark:text-green-300">${full}</span>`
      }
    })
}
