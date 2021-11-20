import { findIndex, intersection, isArray, mergeWith } from 'lodash-es'
import { Binding, shroudElements } from '~/data/binding'
import { Heritage } from '~/data/heritage'
import { Intensity } from '~/data/intensity'
import { PerkFull, Ride } from '~/data/talents'
import { Perk, useStore } from '~/store/store'

const {
  allEffects, intensities, luresBought, binding, flags, allForSave, heritage,
  ridePerks, homePerks, talentPerks, defensePerks, miscPerks,
} = useStore()

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
        // What if cost already 0
        if (allForSave[key].value[ind].cost === 0)
          allForSave[key].value[ind].count = 1
        else
          allForSave[key].value[ind].cost = 0
      }
    })
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
        const toDel = perks.splice(ind)
        toDel.forEach(x => allEffects.value.splice(allEffects.value.indexOf(x.title), 1))
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
  if (perk.whitelist && intersection(allEffects.value, perk.whitelist).length === (perk.needed || perk.whitelist.length))
    return true
  return false
}

// Intensity
export function chooseIntensity(rule: Intensity, coopIntensity: number, coopCount: number) {
  const ind = findIndex(intensities.value, { title: rule.title })
  if (ind !== -1) {
    const toDel = intensities.value.splice(ind)
    toDel.forEach(x => allEffects.value.splice(allEffects.value.indexOf(x.title), 1))
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
        if (saveData.complex.length > 1) saveData.cost += 10 * (saveData.complex.length)
        saveData.freebies = freebies
        addFreebies(saveData.freebies)
      }
      binding.value[ind] = saveData
    }
    else {
      const toDel = binding.value.splice(ind)
      toDel.forEach((x) => {
        if (x.freebies) deleteFreebies(x.freebies)
        allEffects.value.splice(allEffects.value.indexOf(x.title), 1)
      })
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
    }
    else {
      const del = luresBought.value.splice(ind)
      del.forEach(x => allEffects.value.splice(allEffects.value.indexOf(x.title), 1))
    }
  }
}

export function lureAvailable(lure: Binding): boolean {
  return simpleIsAvailable(lure)
}

// Heritages
export function heritageAvailable(hr: Heritage): boolean {
  if (flags.value.noHeritage && !hr.whitelist) return true
  else
    return simpleIsAvailable(hr)
}

export function chooseHeritage(hr: Heritage, saveData: Perk) {
  if (heritageAvailable(hr)) {
    const ind = findIndex(heritage.value, { title: hr.title })
    if (ind !== -1) {
      if (hr.typeFreebies)
        deleteFreebies(hr.typeFreebies[flags.value.transhumanType])
      if (hr.title === 'First Augmentation') {
        flags.value.isTranshuman = false
        flags.value.transhumanType = undefined
      }
      const toDel = heritage.value.splice(ind)
      toDel.forEach((x) => {
        if (x.freebies) deleteFreebies(x.freebies)
        allEffects.value.splice(allEffects.value.indexOf(x.title), 1)
      })
    }
    else {
      if (hr.title === 'First Augmentation') {
        flags.value.isTranshuman = true
        flags.value.transhumanType = flags.value.transhumanType || 'Biomorph'
        saveData.anything = flags.value.transhumanType
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
      allEffects.value.push(selectedRide.title)
      ridePerks.value.push({ ...selectedRide })
      flags.value.hasARide = true
    }
    else {
      const del = ridePerks.value.splice(ind, 1)
      allEffects.value.splice(allEffects.value.indexOf(del[0].title), 1)
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

export function talentAvailable(tlt: PerkFull): boolean {
  if (!tlt.whitelist) { return true }
  else {
    if (intersection(tlt.whitelist, allEffects.value).length >= (tlt.needed || tlt.whitelist.length))
      return true
    if (tlt.title === 'Inexhaustible'
          && findIndex(talentPerks.value, { title: tlt.whitelist[0] }) !== -1
          && findIndex(defensePerks.value, { title: 'Soul Defense', count: 2 }) !== -1)
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
  return simpleIsAvailable(perk)
}

export function choosePerk(perk: PerkFull, saveData: Perk) {
  pickSimplePerk(perk, saveData, miscAvailable, miscPerks.value)
  // if (isAvailable(perk)) {
  //   const ind = findIndex(miscPerks.value, { title: perk.title })
  //   if (ind !== -1) {
  //     if (miscPerks.value[ind].count !== saveData.count && saveData.count > 0) {
  //       miscPerks.value[ind].count = saveData.count
  //       miscPerks.value[ind].cost = perk.cost * saveData.count
  //     }
  //     else {
  //       const toDel = miscPerks.value.splice(findIndex(miscPerks.value, { title: perk.title }))
  //       toDel.forEach(x => allEffects.value.splice(allEffects.value.indexOf(x.title), 1))
  //     }
  //   }
  //   else {
  //     allEffects.value.push(perk.title)
  //     miscPerks.value.push(saveData)
  //   }
  // }
}
