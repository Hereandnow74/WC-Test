import { findIndex, intersection, intersectionWith, isArray, isEmpty, isObject, mergeWith, remove, sample, uniqBy } from 'lodash-es'
import { Binding, shroudElements } from '~/data/binding'
import { Heritage } from '~/data/heritage'
import { Intensity } from '~/data/intensity'
import { genericPerks, PerkFull } from '~/data/talents'
import { WaifuPerk } from '~/data/waifu_perks'
import { useChallenges } from '~/store/challenges'
import { usePlayStore } from '~/store/play'
import { Perk } from '~/store/chargen'
import { useStore } from '~/store/store'
import { ALL_PERK_TITLES, LINKS_REG } from '~/data/constants'

const {
  allEffects, intensities, luresBought, binding, flags, allForSave, heritage,
  ridePerks, homePerks, talentPerks, defensePerks, miscPerks, genericWaifuPerks, companions, startingOrigin,
  waifuPerks, baseBudget, startingWorld, budgetMods, otherPerks, fee,
} = useStore()

const { currentWorld, jumpChain, rdnWorld, loan, trHistory } = usePlayStore()

const { activeChallenges } = useChallenges()

// General functions
export function deleteFreebies(freebies: object) {
  for (const [key, perk] of Object.entries(freebies) as [keyof typeof allForSave, string[]][]) {
    perk.forEach((n: string) => {
      const ind = findIndex(allForSave[key].value, { title: n })
      if (ind !== -1) {
        if (allForSave[key].value[ind].count && allForSave[key].value[ind].count > 1) {
          allForSave[key].value[ind].count -= 1
        }
        else {
          allForSave[key].value.splice(ind, 1)
          allEffects.value.splice(allEffects.value.indexOf(n), 1)
        }
      }
    })
  }
}

export function addFreebies(freebies: object) {
  for (const [key, perk] of Object.entries(freebies) as [keyof typeof allForSave, string[]][]) {
    perk.forEach((title: string) => {
      const ind = findIndex(allForSave[key].value, { title })
      if (ind === -1) {
        allForSave[key].value.push({ title, cost: 0, count: 1 })
        allEffects.value.push(title)
      }
      else {
        if (allForSave[key].value[ind].count)
          allForSave[key].value[ind].count += 1
        else
          allForSave[key].value[ind].count = 2
        // What if cost already 0
        // if (allForSave[key].value[ind].cost === 0)
        //   allForSave[key].value[ind].count = 1
        // else
        //   allForSave[key].value[ind].cost = 0
      }
    })
  }
}

function deletePerk(perkList: Perk[], checkFunc: (arg: any) => boolean) {
  const toDel = []
  for (let i = 0; i < perkList.length; i++) {
    const origPerk = ALL_PERK_TITLES.value[perkList[i].title]
    if (!checkFunc(origPerk)) {
      toDel.push(perkList[i].title)
      if (!flags.value.chargen && perkList[i].cost < 11111) fee.value += Math.round(perkList[i].cost * 0.2) || 0
      if (perkList[i].freebies) deleteFreebies(perkList[i].freebies)
      if (origPerk.typeFreebies)
        deleteFreebies(origPerk.typeFreebies[flags.value.transhumanType])
    }
  }
  if (toDel.length) {
    remove(perkList, x => toDel.includes(x.title))
    remove(allEffects.value, x => toDel.includes(x))
    deletePerk(perkList, checkFunc)
  }
}

export function pickSimplePerk(perk: PerkFull, saveData: Perk, isAvailable: (arg: any) => boolean, perks: Perk[]) {
  if (isAvailable(perk)) {
    const ind = findIndex(perks, { title: perk.title })
    if (ind !== -1) {
      if ((saveData.complex && saveData.complex.length > 0) || (saveData.count && saveData.count > 0)) {
        perks[ind] = saveData
      }
      else {
        const toDel = perks.splice(ind, 1)
        allEffects.value.splice(allEffects.value.indexOf(toDel[0].title), 1)
        if (!flags.value.chargen && toDel[0].cost < 11111) fee.value += Math.round(toDel[0].cost * 0.2) || 0
        deletePerk(perks, isAvailable)
      }
    }
    else {
      allEffects.value.push(perk.title)
      perks.push(saveData)
    }
  }
}

export function simpleIsAvailable(perk: PerkFull) {
  if (!perk.whitelist) return true
  if (perk.whitelist && intersection(allEffects.value, perk.whitelist).length >= (perk.needed || perk.whitelist.length))
    return true
  return false
}

// Intensity
export function chooseIntensity(rule: Intensity, coopIntensity: number, coopCount: number) {
  const ind = findIndex(intensities.value, { title: rule.title })
  if (ind !== -1) {
    const toDel = intensities.value.splice(ind, 1)[0]
    if (!flags.value.chargen && toDel.cost < 11111) fee.value += Math.round(toDel.cost * 0.2) || 0
    allEffects.value.splice(allEffects.value.indexOf(toDel.title), 1)
    deletePerk(intensities.value, intensityAvailable)
  }
  else {
    if (intensityAvailable(rule)) {
      allEffects.value.push(rule.title)
      const inten = rule.title === 'With A Little Help From My Friends(Cooperative)' ? coopIntensity : rule.intensity
      intensities.value.push({ title: rule.title, intensity: inten, count: rule.title === 'With A Little Help From My Friends(Cooperative)' ? coopCount : 0 })
    }
  }
}

export function intensityAvailable(rule: Intensity): boolean {
  if (rule.chargen && !flags.value.chargen) return false
  if (intersection(rule.blacklist, allEffects.value).length) return false
  if (intersection(rule.whitelist, allEffects.value).length !== (rule.needed || rule.whitelist?.length || 0)) return false
  return true
}

// Bindings
export function chooseBinding(bin: Binding, saveData: Perk) {
  if (!bindingAvailable(bin)) return

  const freebies = {}
  if (bin.complex) {
    mergeWith(freebies,
      ...shroudElements.filter(x => findIndex(saveData.complex, { flavor: x.title }) !== -1).map(x => x.freebies),
      (a, b) => { if (isArray(a)) return a.concat(b) })
  }

  const ind = findIndex(binding.value, { title: bin.title })
  if (ind !== -1) {
    if (binding.value[ind].count !== saveData.count && saveData.count > 0) {
      if (bin.complex) {
        deleteFreebies(binding.value[ind].freebies)
        saveData.freebies = freebies
        addFreebies(saveData.freebies)
      }
      binding.value[ind] = saveData
    }
    else {
      const toDel = binding.value.splice(ind, 1)[0]
      if (toDel.freebies) deleteFreebies(toDel.freebies)
      if (!flags.value.chargen && toDel.cost < 11111) fee.value += Math.round(toDel.cost * 0.2) || 0
      allEffects.value.splice(allEffects.value.indexOf(toDel.title), 1)
      deletePerk(binding.value, bindingAvailable)
      if (binding.value.length === 0) flags.value.noBindings = true
    }
  }
  else {
    const anything = bin.element
    if (bin.element) {
      const i = findIndex(shroudElements, { title: bin.element })
      if (saveData.freebies)
        mergeWith(saveData.freebies, shroudElements[i].freebies, (a, b) => { if (isArray(a)) return a.concat(b) })
      else
        saveData.freebies = shroudElements[i].freebies
    }
    allEffects.value.push(bin.title)
    if (bin.complex) saveData.freebies = freebies
    if (saveData.freebies) addFreebies(saveData.freebies)
    binding.value.push({ anything, ...saveData })
    flags.value.noBindings = false
  }
}

export function bindingAvailable(bin: Binding): boolean {
  if (flags.value.noBindings) {
    if (bin.whitelist) return false
    return true
  }
  else {
    if (bin.blacklist && findIndex(binding.value, { title: bin.blacklist[0] }) !== -1)
      return false
    if (!bin.whitelist && findIndex(binding.value, { title: 'Additional Binding' }) !== -1)
      return true
    if (bin.whitelist && intersection(allEffects.value, bin.whitelist).length === (bin.needed || bin.whitelist.length))
      return true
    if (findIndex(binding.value, { title: bin.title }) !== -1)
      return true
  }
  return false
}

// Lures
export function chooseLure(lure: Binding) {
  const { allEffects } = useStore()
  if (lureAvailable(lure)) {
    const ind = findIndex(luresBought.value, { title: lure.title })
    if (ind === -1) {
      allEffects.value.push(lure.title)
      luresBought.value.push({ title: lure.title, cost: lure.cost })
      if (lure.freebies) addFreebies(lure.freebies)
    }
    else {
      const toDel = luresBought.value.splice(ind, 1)[0]
      if (!flags.value.chargen && toDel.cost < 11111) fee.value += Math.round(toDel.cost * 0.2) || 0
      allEffects.value.splice(allEffects.value.indexOf(toDel.title), 1)
      deletePerk(luresBought.value, lureAvailable)
      if (lure.freebies) deleteFreebies(lure.freebies)
    }
  }
}

export function chooseOther(other: Binding, saveData: Perk) {
  pickSimplePerk(other, saveData, lureAvailable, otherPerks.value)
}

export function lureAvailable(lure: Binding): boolean {
  if (lure.title === 'Strange Kind of Woman') {
    const truck = findIndex(otherPerks.value, { title: 'Space Truckin’' }) !== -1
    const tenPaper = findIndex(genericWaifuPerks.value, x => x.title === 'Paper Trail' && x.count && x.count >= 10) !== -1
    return truck && tenPaper
  }
  return simpleIsAvailable(lure)
}

// Heritages
const heritageTrees = computed(() => uniqBy(heritage.value, 'tree').map(x => x.tree).filter(x => x !== 'None'))

export function heritageAvailable(hr: Heritage): boolean {
  if ((heritageTrees.value.length === 0 || hr.title === 'Ancestral Diversity') && !hr.whitelist) { return true }
  else {
    if (heritageTrees.value.includes(hr.tree))
      return simpleIsAvailable(hr)
    const ind = findIndex(heritage.value, { title: 'Ancestral Diversity' })
    if (ind !== -1 && heritage.value[ind].count >= heritageTrees.value.length)
      return simpleIsAvailable(hr)
  }
  return false
}

export function chooseHeritage(hr: Heritage, saveData: Perk) {
  if (heritageAvailable(hr)) {
    if (['Dragon God', 'Philosopher’s Transmortality Engine'].includes(saveData.title)) {
      if (saveData.title === 'Philosopher’s Transmortality Engine')
        saveData.tree = 'Transhuman'
      pickSimplePerk(hr, saveData, heritageAvailable, heritage.value)
      return
    }

    const ind = findIndex(heritage.value, { title: hr.title })
    if (ind !== -1) {
      if (hr.typeFreebies)
        deleteFreebies(hr.typeFreebies[flags.value.transhumanType])
      if (hr.title === 'First Augmentation') {
        flags.value.isTranshuman = false
        flags.value.transhumanType = undefined
      }
      const toDel = heritage.value.splice(ind, 1)[0]
      if (toDel.freebies) deleteFreebies(toDel.freebies)
      if (!flags.value.chargen && toDel.cost < 11111) fee.value += Math.round(toDel.cost * 0.2) || 0
      allEffects.value.splice(allEffects.value.indexOf(toDel.title), 1)
      deletePerk(heritage.value, heritageAvailable)
    }
    else {
      if (saveData.cost === 0) return
      if (hr.title === 'First Augmentation') {
        flags.value.isTranshuman = true
        flags.value.transhumanType = flags.value.transhumanType || sample(['Biomorph', 'Cybermorph', 'Aethermorph'])
        saveData.complex = [{ flavor: flags.value.transhumanType }]
      }
      if (hr.typeFreebies)
        addFreebies(hr.typeFreebies[flags.value.transhumanType])
      allEffects.value.push(hr.title)
      if (hr.tree) saveData.tree = hr.tree
      heritage.value.push(saveData)
      if (hr.freebies) addFreebies(hr.freebies)
    }
  }
}

// Rides

export function rideAvailable(perk: Ride): boolean {
  if (perk.whitelist) {
    if (intersection(perk.whitelist, allEffects.value).length !== perk.whitelist.length)
      return false
  }
  if (perk.flag) return flags.value[perk.flag]
  return true
}

export function chooseRide(ride: Ride, selectedRide: Ride) {
  if (rideAvailable(ride)) {
    const ind = findIndex(ridePerks.value, { title: selectedRide.title })
    if (ind === -1) {
      ridePerks.value.push({ ...selectedRide })
      flags.value.hasARide = true
    }
    else {
      const del = ridePerks.value.splice(ind, 1)
      if (!flags.value.chargen && del[0].cost < 11111) fee.value += Math.round(del[0].cost * 0.2) || 0
      flags.value.hasARide = !!ridePerks.value.length
    }
  }
}

// Home Perks
export function homeAvailable(home: PerkFull): boolean {
  if (home.whitelist) {
    // TODO: Do it better
    if (home.whitelist[0].match(/\(\d+x\)/) && findIndex(homePerks.value, { count: 25 }) !== -1)
      return true
    if (intersection(home.whitelist, allEffects.value).length >= (home.needed || home.whitelist.length))
      return true
    if (home.flag) return flags.value[home.flag]
    return false
  }
  return true
}

export function chooseHome(home: PerkFull, saveData: Perk) {
  pickSimplePerk(home, saveData, homeAvailable, homePerks.value)
}

// Talents
export function talentAvailable(tlt: PerkFull): boolean {
  if (!tlt.whitelist) { return true }
  else {
    if (intersection(tlt.whitelist, allEffects.value).length >= (tlt.needed || tlt.whitelist.length))
      return true
    if (tlt.title === 'Inexhaustible'
          && findIndex(talentPerks.value, { title: tlt.whitelist[0] }) !== -1
          && findIndex(defensePerks.value, x => x.title === 'Soul Defense' && x.count && x.count >= 2) !== -1)
      return true
  }

  return false
}

export function chooseTalent(tlt: PerkFull, saveData: Perk) {
  pickSimplePerk(tlt, saveData, talentAvailable, talentPerks.value)
}

// Defense
export function defenseAvailable(def: PerkFull): boolean {
  return simpleIsAvailable(def)
}

export function chooseDefense(def: PerkFull, saveData: Perk) {
  pickSimplePerk(def, saveData, defenseAvailable, defensePerks.value)
}

// Misc Perks
export function miscAvailable(perk: PerkFull): boolean {
  if (perk.chargen && !flags.value.chargen) return false
  return simpleIsAvailable(perk)
}

export function choosePerk(perk: PerkFull, saveData: Perk) {
  pickSimplePerk(perk, saveData, miscAvailable, miscPerks.value)
}

// Generic Waifu Perks
export function genericAvailable(perk: PerkFull): boolean {
  if (!perk.whitelist) { return true }
  else {
    if (intersection(perk.whitelist, allEffects.value).length >= (perk.needed || perk.whitelist.length)) {
      if (perk.title === 'Canvas')
        return !flags.value.noBindings
      return true
    }
  }

  return false
}

export function chooseGenericPerk(perk: PerkFull, saveData: Perk) {
  pickSimplePerk(perk, saveData, genericAvailable, genericWaifuPerks.value)
}

// Specific Waifu Perks
export function specificAvailable(perk: WaifuPerk): boolean {
  if (isArray(perk.uid)) {
    if (intersectionWith(companions.value, perk.uid, (a, b) => a.uid === b).length
        || perk.uid.includes(startingOrigin.value.uid))
      return true
  }
  else {
    if (findIndex(companions.value, { uid: perk.uid }) !== -1 || startingOrigin.value.uid === perk.uid)
      return true
  }
  if (startingOrigin.value.character) {
    const name = startingOrigin.value.character.split(' ')[0]
    if (isArray(perk.waifu))
      return perk.waifu.join('').includes(name)
    else return perk.waifu.includes(name)
  }

  return false
}

export function chooseWaifuPerk(perk: WaifuPerk) {
  if (specificAvailable(perk)) {
    const ind = findIndex(waifuPerks.value, { title: perk.title })
    if (ind !== -1) {
      const toDel = waifuPerks.value.splice(ind, 1)
      if (!flags.value.chargen && toDel[0].cost < 11111) fee.value += Math.round(toDel[0].cost * 0.2) || 0
    }
    else {
      waifuPerks.value.push(
        { title: perk.title, waifu: isArray(perk.waifu) ? perk.waifu[0] : perk.waifu, cost: perk.cost || 0, refund: perk.discount || 0 })
    }
  }
}

export function clearAll() {
  baseBudget.value = 55
  startingWorld.value = {
    worldName: 'Current world',
    rating: 2,
  }
  startingOrigin.value = {
    title: '',
    cost: 0,
  }
  intensities.value = []
  binding.value = []
  luresBought.value = []
  otherPerks.value = []
  heritage.value = []
  ridePerks.value = []
  homePerks.value = []
  talentPerks.value = []
  defensePerks.value = []
  miscPerks.value = []
  genericWaifuPerks.value = []
  waifuPerks.value = []
  companions.value = []
  allEffects.value = []
  flags.value = {
    noBindings: true,
    noHeritage: true,
    danger11Start: false,
    pvpEnabled: false,
    chargen: true,
    skipUsed: undefined,
    hasARide: false,
    isTranshuman: false,
    transhumanType: undefined,
  }
  budgetMods.value = {
    plus: 0,
    minus: 0,
    plus11: 0,
    minus11: 0,
  }
  jumpChain.value = []
  currentWorld.value = startingWorld.value
  rdnWorld.value = []
  activeChallenges.value = []
  loan.value = { owed: 0, gained: 0 }
  trHistory.value = []
  fee.value = 0
}

export function assignBuildData(data: any) {
  startingWorld.value = data.startingWorld
  startingOrigin.value = data.startingOrigin
  intensities.value = data.intensities
  binding.value = data.binding
  homePerks.value = data.homePerks
  defensePerks.value = data.defensePerks
  companions.value = data.companions
  heritage.value = data.heritage
  talentPerks.value = data.talentPerks
  waifuPerks.value = data.waifuPerks
  ridePerks.value = data.ridePerks
  miscPerks.value = data.miscPerks
  luresBought.value = data.luresBought
  genericWaifuPerks.value = data.genericWaifuPerks
  budgetMods.value = data.budgetMods
  baseBudget.value = data.baseBudget
  allEffects.value = data.allEffects
  flags.value = data.flags
}

export function filterObject(obj: any) {
  const ret: any = {}
  Object.keys(obj)
    .forEach((key) => {
      if (obj[key] !== undefined && obj[key] !== '') {
        if (isObject(obj[key]) && isEmpty(obj[key])) return
        if (key === 'defDiscount' && obj[key] === 0) return
        if (obj[key].value)
          ret[key] = obj[key].value
        else
          ret[key] = JSON.parse(JSON.stringify(obj[key]))
      }
    })
  return ret
}
