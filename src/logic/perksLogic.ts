import { differenceBy, find, findIndex, intersection, intersectionWith, isEmpty, isObject, remove, sample, uniqBy, filter } from 'lodash-es'
import { DLCPerk, Freebie, PerkFull } from 'global'
import { Intensity } from '../data/intensity'
import { WaifuPerk } from '../data/waifu_perks'
import { useChallenges } from '../store/challenges'
import { usePlayStore } from '../store/play'
import { useChargenStore } from '../store/chargen'
import { useStore } from '../store/store'
import { ALL_PERK_STORES, ALL_PERK_TITLES } from '../data/constants'
import { useEvents } from './events'
import { patronEffects } from '~/logic/pagesLogic/patronsLogic'

// General functions
export function deleteFreebies(freebies: object) {
  const { allEffects, allForSave } = useStore()
  const { allEvents } = useEvents()
  if (!freebies) return
  for (const [key, perks] of Object.entries(freebies) as [keyof typeof allForSave, Freebie[]][]) {
    perks.forEach((n: Freebie) => {
      const ind = findIndex(allForSave[key].value, { title: n.title })
      if (ind !== -1) {
        if (allForSave[key].value[ind].count && allForSave[key].value[ind].count > n.count) {
          allForSave[key].value[ind].count -= n.count
          if (n.complex && allForSave[key].value[ind].complex)
            allForSave[key].value[ind].complex = differenceBy(allForSave[key].value[ind].complex, n.complex, 'flavor')
        }
        else {
          allForSave[key].value.splice(ind, 1)
          allEffects.value.splice(allEffects.value.indexOf(n.title), 1)
          allEvents.emit({ id: Math.floor(Math.random() * 10000), time: Date.now(), message: `Lost freebie [<b>${n.title}(x${n.count})</b>]`, type: 'attention' })
        }
      }
    })
  }
}

export function addFreebies(freebies: object) {
  const { allEffects, allForSave } = useStore()
  const { allEvents } = useEvents()
  if (!freebies) return
  for (const [key, perk] of Object.entries(freebies) as [keyof typeof allForSave, Freebie[]][]) {
    perk.forEach((freebie: Freebie) => {
      const ind = findIndex(allForSave[key].value, { title: freebie.title })
      if (ind === -1) {
        allForSave[key].value.push(freebie)
        allEffects.value.push(freebie.title)
        allEvents.emit({ id: Math.floor(Math.random() * 10000), time: Date.now(), message: `Got a freebie [<b>${freebie.title}(x${freebie.count})</b>]`, type: 'success' })
      }
      else {
        if (allForSave[key].value[ind].count)
          allForSave[key].value[ind].count += freebie.count
        else
          allForSave[key].value[ind].count = 2
        if (freebie.complex && allForSave[key].value[ind].complex)
          allForSave[key].value[ind].complex = allForSave[key].value[ind].complex.concat(freebie.complex)
      }
    })
  }
}

export function deletePerk(perkList: Perk[], checkFunc: (arg: any) => boolean) {
  const { allEffects, flags, fee } = useStore()
  const toDel = []
  for (let i = 0; i < perkList.length; i++) {
    const origPerk = ALL_PERK_TITLES.value[perkList[i].title]
    if (!checkFunc(origPerk) && !origPerk.chargen) {
      toDel.push(perkList[i].title)
      if (!flags.value.chargen && perkList[i].cost > 0) fee.value += Math.round(perkList[i].cost * 0.2) || 0
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

export function newPerkAction(perk: DLCPerk, saveData: Perk) {
  if (perkAlreadyBough(perk.title, saveData.cost)) {
    deletePerkUniversal(perk.title)
    logPerkDeletion(perk.title, saveData.cost)
  }
  else {
    addPerkUniversal(saveData, perk.category)
    logPerkAddition(perk.title, saveData.cost)
  }
}

function perkAlreadyBough(title: string, cost: number) {
  return false
}
function addPerkUniversal(saveData: Perk, category: string) {
  return false
}
function deletePerkUniversal(title: string) {
  return false
}
function logPerkDeletion(title: string, cost: number) {
  return false
}
function logPerkAddition(title: string, cost: number) {
  return false
}

export function pickSimplePerk(perk: PerkFull, saveData: Perk, isAvailable: (arg: any) => boolean, perks: Perk[]) {
  const { allEffects, flags, fee } = useStore()
  if (isAvailable(perk)) {
    const ind = findIndex(perks, { title: perk.title })
    if (ind !== -1) {
      if ((saveData.complex && saveData.complex.length > 0) || (saveData.count && saveData.count > 0 && perks[ind].count !== saveData.count)) {
        perks[ind] = saveData
        deleteFreebies(perks[ind].freebies)
        addFreebies(saveData.freebies)
      }
      else {
        deleteFreebies(perks[ind].freebies)
        const toDel = perks.splice(ind, 1)
        allEffects.value.splice(allEffects.value.indexOf(toDel[0].title), 1)
        if (!flags.value.chargen && toDel[0].cost > 0) fee.value += Math.round(toDel[0].cost * 0.2) || 0
        deletePerk(perks, isAvailable)
      }
    }
    else if (saveData.count === undefined || (saveData.count !== undefined && saveData.count !== 0)) {
      allEffects.value.push(perk.title)
      perks.push(saveData)
      addFreebies(saveData.freebies)
    }
  }
}

export function simpleIsAvailable(perk: PerkFull) {
  const { allEffects } = useStore()
  if (!perk.whitelist) return true
  if (perk.whitelist && intersection(allEffects.value, perk.whitelist).length >= (perk.needed || perk.whitelist.length))
    return true
  return false
}

// Intensity
export function chooseIntensity(rule: Intensity, coopIntensity = 0, coopCount = 0) {
  const { allEffects, flags, fee, intensities } = useStore()
  const ind = findIndex(intensities.value, { title: rule.title })
  if (ind !== -1) {
    const toDel = intensities.value.splice(ind, 1)[0]
    if (!flags.value.chargen && toDel.cost > 0) fee.value += Math.round(toDel.cost * 0.2) || 0
    allEffects.value.splice(allEffects.value.indexOf(toDel.title), 1)
    deletePerk(intensities.value, intensityAvailable)
  }
  else {
    if (intensityAvailable(rule)) {
      allEffects.value.push(rule.title)
      const perk = {
        uid: rule.uid,
        title: rule.title,
      }
      if (rule.title === 'With A Little Help From My Friends(Cooperative)') {
        perk.intensity = coopIntensity
        perk.count = coopCount
      }
      else if (rule.intensity !== undefined) {
        perk.intensity = rule.intensity
      }
      if (rule.cost)
        perk.cost = rule.cost
      intensities.value.push(perk)
    }
  }
}

export function intensityAvailable(rule: Intensity): boolean {
  const { allEffects, flags } = useStore()
  if (rule.chargen && !flags.value.chargen) return false
  if (intersection(rule.blacklist, allEffects.value).length) return false
  if (intersection(rule.whitelist, allEffects.value).length !== (rule.needed || rule.whitelist?.length || 0))
    return false
  return true
}

// Difficulty
export function chooseDifficulty(rule: Difficulty) {
  const { allEffects, difficulties } = useStore()
  const ind = findIndex(difficulties.value, { uid: rule.uid })
  if (ind !== -1) {
    const toDel = difficulties.value.splice(ind, 1)[0]
    allEffects.value.splice(allEffects.value.indexOf(toDel.title), 1)
    // deletePerk(difficulties.value, difficultyAvailable)
  }
  else {
    const ind = findIndex(difficulties.value, { type: rule.type })
    if (ind !== -1) {
      const toDel = difficulties.value.splice(ind, 1)[0]
      allEffects.value.splice(allEffects.value.indexOf(toDel.title), 1)
    }
    if (difficultyAvailable(rule)) {
      allEffects.value.push(rule.title)
      const perk = {
        uid: rule.uid,
        title: rule.title,
        category: rule.category,
        type: rule.type,
        intensity: rule.intensity,
      }
      difficulties.value.push(perk)
    }
  }
}

export function difficultyAvailable(rule: Difficulty): boolean {
  const { difficulties, allEffects } = useStore()
  // if (rule.compatibility && rule.compatibility.includes(existingPerk.title))
  //   return true
  if (rule.requires && !intersection(allEffects.value, rule.requires).length)
    return false
  for (const existingPerk of difficulties.value) {
    if (rule.compatibility && rule.compatibility.includes(existingPerk.title))
      continue
    if (existingPerk.type === rule.type && existingPerk.uid !== rule.uid)
      return false
  }
  return true
}

// Bindings
export function chooseBinding(bin: PerkFull, saveData: Perk, checkFunc = bindingAvailable) {
  const { allEffects, flags, fee, binding } = useStore()
  if (!checkFunc(bin)) return
  const ind = findIndex(binding.value, { title: bin.title })
  if (ind !== -1) {
    if (binding.value[ind].count !== saveData.count && saveData.count !== 0) {
      if ((bin.complex || saveData.complex) && bin.uid !== 'aTjfr') {
        deleteFreebies(binding.value[ind].freebies)
        addFreebies(saveData.freebies)
      }
      if (bin.type) saveData.type = bin.type
      binding.value[ind] = saveData
    }
    else {
      const toDel = binding.value.splice(ind, 1)[0]
      if (toDel.freebies) deleteFreebies(toDel.freebies)
      if (!flags.value.chargen && toDel.cost > 0) fee.value += Math.round(toDel.cost * 0.2) || 0
      allEffects.value.splice(allEffects.value.indexOf(toDel.title), 1)
      deletePerk(binding.value, checkFunc)
    }
  }
  else {
    if (saveData.count === 0)
      return
    if (findIndex(allEffects.value, bin.title) === -1)
      allEffects.value.push(bin.title)
    if (bin.type) saveData.type = bin.type
    if (saveData.freebies) addFreebies(saveData.freebies)
    binding.value.push(saveData)
  }
}

export function bindingAvailable(bin: PerkFull): boolean {
  const { allEffects, binding, noBindings } = useStore()
  if (noBindings.value && !bin.whitelist) {
    return true
  }
  else {
    if (!bin.whitelist && findIndex(binding.value, { title: bin.title }) !== -1)
      return true
    if (bin.blacklist && findIndex(binding.value, { title: bin.blacklist[0] }) !== -1)
      return false
    if (!bin.whitelist && findIndex(binding.value, { title: 'Additional Binding' }) !== -1)
      return true
    if (bin.whitelist && intersection(allEffects.value, bin.whitelist).length >= (bin.needed || bin.whitelist.length))
      return true
  }
  return false
}

// KYeJi wQZU5 qaVE7 8Q4UU
export function symbioteAvailable(bin: PerkFull): boolean {
  const { allEffects, noBindings, binding } = useStore()
  const larvaCount = binding.value.filter(x => ['KYeJi', 'wQZU5', 'qaVE7', '8Q4UU'].includes(x.uid)).length
  const larvaAvailable = binding.value.filter(x => ['LjU3E', 'EG3MX', 'ys3bz'].includes(x.uid)).length + 1
  if (!bin.whitelist && findIndex(binding.value, { title: bin.title }) !== -1)
    return true
  if (bin.type === 'Larva' && larvaCount < larvaAvailable) { return true }
  else {
    if (bin.type === 'Larva')
      return false
  }
  if (noBindings.value && bin.uid === 'grbul')
    return true
  if (!bin.whitelist && findIndex(binding.value, { uid: 'grbul' }) !== -1)
    return true
  if (!bin.whitelist && findIndex(binding.value, { title: 'Additional Binding' }) !== -1)
    return true
  if (bin.whitelist && intersection(allEffects.value, bin.whitelist).length >= (bin.needed || bin.whitelist.length))
    return true
  return false
}

// Lures
export function chooseLure(lure: PerkFull, saveData: Perk) {
  const { allEffects, flags, fee, luresBought } = useStore()
  if (lureAvailable(lure)) {
    const ind = findIndex(luresBought.value, { title: lure.title })
    if (ind === -1) {
      allEffects.value.push(lure.title)
      luresBought.value.push(saveData)
      if (lure.freebies) addFreebies(lure.freebies)
    }
    else {
      const toDel = luresBought.value.splice(ind, 1)[0]
      if (!flags.value.chargen && toDel.cost > 0) fee.value += Math.round(toDel.cost * 0.2) || 0
      allEffects.value.splice(allEffects.value.indexOf(toDel.title), 1)
      deletePerk(luresBought.value, lureAvailable)
      if (lure.freebies) deleteFreebies(lure.freebies)
    }
  }
}

export function chooseOther(other: PerkFull, saveData: Perk) {
  const { otherPerks } = useStore()
  pickSimplePerk(other, saveData, lureAvailable, otherPerks.value)
}

export function lureAvailable(lure: PerkFull): boolean {
  const { otherPerks, genericWaifuPerks } = useStore()
  if (lure.title === 'Strange Kind of Woman') {
    const truck = findIndex(otherPerks.value, { title: 'Space Truckin’' }) !== -1
    const tenPaper = findIndex(genericWaifuPerks.value, x => x.title === 'Paper Trail' && x.count && x.count >= 10) !== -1
    return truck && tenPaper
  }
  return simpleIsAvailable(lure)
}

// Heritages
const heritageTrees = computed(() => {
  const { heritage } = useStore()
  return uniqBy(heritage.value, 'tree').map(x => x.tree).filter(x => x !== 'None')
})

export function heritageAvailable(hr: Heritage): boolean {
  const { heritage } = useStore()
  if (hr.title === 'Ancestral Diversity')
    return simpleIsAvailable(hr)

  if (heritageTrees.value.length === 0 && !hr.whitelist) {
    return true
  }
  else {
    if (heritageTrees.value.includes(hr.tree))
      return simpleIsAvailable(hr)
    const ind = findIndex(heritage.value, { title: 'Ancestral Diversity' })
    if (ind !== -1 && (heritage.value[ind].count || 1) >= heritageTrees.value.length)
      return simpleIsAvailable(hr)
  }
  return false
}

export function chooseHeritage(hr: Heritage, saveData: Perk) {
  const { allEffects, flags, fee, heritage } = useStore()
  if (heritageAvailable(hr)) {
    if (['Dragon God', 'Pillar of Reality'].includes(saveData.title)) {
      pickSimplePerk(hr, saveData, heritageAvailable, heritage.value)
      return
    }

    const ind = findIndex(heritage.value, { title: hr.title })
    if (ind !== -1) {
      if (hr.typeFreebies)
        deleteFreebies(hr.typeFreebies[flags.value.transhumanType])
      if (hr.title === 'First Augmentation') {
        flags.value.isTranshuman = false
        flags.value.transhumanType = null
      }
      const toDel = heritage.value.splice(ind, 1)[0]
      if (toDel.freebies) deleteFreebies(toDel.freebies)
      if (!flags.value.chargen && toDel.cost > 0) fee.value += Math.round(toDel.cost * 0.2) || 0
      allEffects.value.splice(allEffects.value.indexOf(toDel.title), 1)
      deletePerk(heritage.value, heritageAvailable)
    }
    else {
      if (saveData.cost === 0 && !saveData.costT) return
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
  const { allEffects, flags } = useStore()
  if (perk.whitelist) {
    if (intersection(perk.whitelist, allEffects.value).length !== perk.whitelist.length)
      return false
  }
  if (perk.flag) return flags.value[perk.flag]
  return true
}

export function chooseRide(ride: Ride, selectedRide: Ride) {
  const { flags, fee, ridePerks } = useStore()
  if (rideAvailable(ride)) {
    const ind = findIndex(ridePerks.value, { title: selectedRide.title })
    if (ind === -1) {
      ridePerks.value.push({ ...selectedRide })
      flags.value.hasARide = true
    }
    else {
      if (selectedRide.count !== 0 && ridePerks.value[ind].count !== selectedRide.count) {
        ridePerks.value[ind].count = selectedRide.count
        ridePerks.value[ind].cost = selectedRide.cost
      }
      else {
        const del = ridePerks.value.splice(ind, 1)
        if (!flags.value.chargen && del[0].cost > 0) fee.value += Math.round(del[0].cost * 0.2) || 0
        flags.value.hasARide = !!ridePerks.value.length
      }
    }
  }
}

// Home Perks
export function homeAvailable(home: PerkFull): boolean {
  const { allEffects, flags, homePerks } = useStore()
  if (home.whitelist) {
    if (['Rainbow Bridge', 'All Roads Lead to Home', 'Demiplane', 'Laws of the Jungle'].includes(home.title) && intersection(home.whitelist, allEffects.value).length >= (home.needed || home.whitelist.length))
      return true
    if (filter(home.whitelist, (perk) => {
      const query = perk.title ? { title: perk.title, count: perk.count } : { title: perk }
      return findIndex(homePerks.value, query) !== -1
    }).length >= (home.needed || home.whitelist.length))
      return true
    if (home.flag) return flags.value[home.flag]
    return false
  }
  return true
}

export function chooseHome(home: PerkFull, saveData: Perk) {
  const { homePerks } = useStore()
  pickSimplePerk(home, saveData, homeAvailable, homePerks.value)
}

// Talents
export function talentAvailable(tlt: PerkFull): boolean {
  const { allEffects, talentPerks, defensePerks } = useStore()
  if (!tlt.whitelist) { return true }
  else {
    if (intersection(tlt.whitelist, allEffects.value).length >= (tlt.needed || tlt.whitelist.length))
      return true
    if (tlt.title === 'Inexhaustible'
      && findIndex(talentPerks.value, { title: tlt.whitelist[0] }) !== -1
      && findIndex(defensePerks.value, x => x.title === 'Drain Defense' && x.count && x.count >= 2) !== -1)
      return true
  }

  return false
}

export function chooseTalent(tlt: PerkFull, saveData: Perk) {
  const { talentPerks } = useStore()
  // If talent are from freebies do not allow to sell it
  if (saveData.count === 0 && find(talentPerks.value, { title: saveData.title })?.cost === 0) return
  pickSimplePerk(tlt, saveData, talentAvailable, talentPerks.value)
}

// Defense
export function defenseAvailable(def: PerkFull): boolean {
  return simpleIsAvailable(def)
}

export function chooseDefense(def: PerkFull, saveData: Perk) {
  const { allEffects, flags, fee, defensePerks } = useStore()
  if (defenseAvailable(def)) {
    const ind = findIndex(defensePerks.value, { title: def.title })
    if (ind !== -1) {
      if ((defensePerks.value[ind].count !== saveData.count || saveData.defDiscount !== defensePerks.value[ind].defDiscount) && saveData.count !== 0) {
        defensePerks.value[ind] = saveData
      }
      else {
        const toDel = defensePerks.value.splice(ind, 1)
        allEffects.value.splice(allEffects.value.indexOf(toDel[0].title), 1)
        if (!flags.value.chargen && toDel[0].cost > 0) fee.value += Math.round(toDel[0].cost * 0.2) || 0
        deletePerk(defensePerks.value, defenseAvailable)
      }
    }
    else if (saveData.count === undefined || (saveData.count !== undefined && saveData.count !== 0)) {
      allEffects.value.push(def.title)
      defensePerks.value.push(saveData)
    }
  }
}

// Misc Perks
export function miscAvailable(perk: PerkFull): boolean {
  const { flags } = useStore()
  if (perk.chargen && !flags.value.chargen) return false
  return simpleIsAvailable(perk)
}

export function choosePerk(perk: PerkFull, saveData: Perk) {
  const { miscPerks } = useStore()
  pickSimplePerk(perk, saveData, miscAvailable, miscPerks.value)
}

// Generic Waifu Perks
export function genericAvailable(perk: PerkFull): boolean {
  const { allEffects, noBindings } = useStore()
  if (!perk.whitelist) { return true }
  else {
    if (intersection(perk.whitelist, allEffects.value).length >= (perk.needed || perk.whitelist.length)) {
      if (perk.title === 'Canvas')
        return !noBindings.value
      return true
    }
  }

  return false
}

export function chooseGenericPerk(perk: PerkFull, saveData: Perk) {
  const { genericWaifuPerks } = useStore()
  pickSimplePerk(perk, saveData, genericAvailable, genericWaifuPerks.value)
}

// Specific Waifu Perks
export function specificAvailable(perk: WaifuPerk): boolean {
  const { companions, startingOrigin } = useStore()
  if (intersectionWith(companions.value, perk.waifuUID, (a, b) => {
    if (a.perk)
      return a.perk.uid === b
    if (a.swap)
      return a.swap.uid === b
    else
      return a.uid === b
  }).length
    || perk.waifuUID.includes(startingOrigin.value.uid)
    || perk.waifuUID.includes(startingOrigin.value?.perk?.uid)
    || perk.waifuUID.includes(startingOrigin.value?.swap?.uid))
    return true
  return false
}

export function chooseWaifuPerk(fullPerk: WaifuPerk, perk: Perk) {
  const { waifuPerks, flags, fee } = useStore()
  const ind = findIndex(waifuPerks.value, { uid: perk.uid })
  if (ind !== -1) {
    const toDel = waifuPerks.value.splice(ind, 1)
    if (!flags.value.chargen && toDel[0].cost > 0)
      fee.value += Math.round(toDel[0].cost * 0.2) || 0
  }
  else if (specificAvailable(fullPerk)) {
    waifuPerks.value.push(perk)
  }
}

export function buyAnyPerk(perkName: string, count = 1, cost = 0) {
  const { allEffects } = useStore()
  const fullPerk = ALL_PERK_TITLES.value[perkName]
  const saveStore = ALL_PERK_STORES.value[fullPerk.category as keyof typeof ALL_PERK_STORES]
  const { allEvents } = useEvents()
  if (saveStore) {
    const ind = findIndex(saveStore, { title: perkName })
    if (ind === -1) {
      allEffects.value.push(perkName)
      saveStore.push({ uid: fullPerk.uid, title: perkName, count, cost, tree: fullPerk.tree })
      allEvents.emit({ id: Math.floor(Math.random() * 10000), time: Date.now(), message: `Bought <b>${perkName}</b> for ${cost}c`, type: 'info' })
    }
    else {
      saveStore[ind].count ? saveStore[ind].count += 1 : saveStore[ind].count = 2
    }
  }
  else {
    console.log('Can\'t buy this perk yet')
  }
}

// export function removeAnyPerk(uid: string, perkName: string, count = 1) {
//   const { allEffects } = useStore()
//   const fullPerk = ALL_PERK_TITLES.value[perkName]
//   const saveStore = ALL_PERK_STORES.value[fullPerk.category as keyof typeof ALL_PERK_STORES]
//   const { allEvents } = useEvents()
//   if (saveStore) {
//     const ind = findIndex(saveStore, { title: perkName })
//     if (ind !== -1) {
//       if (saveStore[ind].count && saveStore[ind].count >= count + 1) { saveStore[ind].count -= count }
//       else {
//         allEffects.value.splice(allEffects.value.indexOf(perkName), 1)
//         remove(saveStore, { title: perkName })
//         allEvents.emit({ id: Math.floor(Math.random() * 10000), time: Date.now(), message: `<b>${perkName}</b> got removed`, type: 'warn' })
//       }
//     }
//   }
// }

export function removeAnyPerk(uid: string, perkName: string, count = 1) {
  const { allEffects } = useStore()
  const { allEvents } = useEvents()
  if (!uid) uid = ALL_PERK_TITLES.value[perkName].uid
  if (!uid) {
    console.log('UID not found')
    return
  }
  Object.values(ALL_PERK_STORES.value).forEach((store) => {
    const ind = findIndex(store, { uid })
    if (ind !== -1) {
      if (store[ind].count && store[ind].count >= count + 1) {
        store[ind].count -= count
        allEvents.emit({ id: Math.floor(Math.random() * 10000), time: Date.now(), message: `Subtracted ${count} from <b>${perkName}</b>`, type: 'warn' })
      }
      else {
        allEffects.value.splice(allEffects.value.indexOf(perkName), 1)
        remove(store, { uid })
        allEvents.emit({ id: Math.floor(Math.random() * 10000), time: Date.now(), message: `<b>${perkName}</b> got removed`, type: 'warn' })
      }
    }
    else {
      console.log('Perk not found')
    }
  })
}

export function clearAll() {
  const {
    allEffects, intensities, luresBought, binding, flags, heritage,
    ridePerks, homePerks, talentPerks, defensePerks, miscPerks, genericWaifuPerks, companions, startingOrigin,
    waifuPerks, baseBudget, startingWorld, budgetMods, otherPerks, fee, specificMods, patron, pvpPerks, coupleOrigin, difficulties,
  } = useStore()

  const { jumpChain, rdnWorld, loan, trHistory, missionRewards } = usePlayStore()
  const { currentWorld } = useChargenStore()

  const { activeChallenges } = useChallenges()

  baseBudget.value = 0
  startingWorld.value = {
    worldName: 'No World',
    rating: 0,
  }
  startingOrigin.value = {
    title: '',
    cost: 0,
  }
  coupleOrigin.value = {
    title: '',
    cost: 0,
  }
  intensities.value = []
  difficulties.value = []
  pvpPerks.value = []
  binding.value = [
    { uid: 'XnYV4', title: 'Company Stamp', count: 1, cost: 0, type: 'Stamp' },
  ]
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
  allEffects.value = [
    'Company Stamp',
  ]
  flags.value = {
    noBindings: false,
    noHeritage: true,
    danger11Start: false,
    pvpEnabled: false,
    chargen: true,
    skipUsed: null,
    hasARide: false,
    isTranshuman: false,
    transhumanType: null,
  }
  budgetMods.value = {
    plus: 0,
    minus: 0,
    plus11: 0,
    minus11: 0,
    sell11: 0,
  }
  jumpChain.value = []
  currentWorld.value = startingWorld.value
  rdnWorld.value = []
  activeChallenges.value = []
  loan.value = { owed: 0, gained: 0 }
  trHistory.value = []
  fee.value = 0
  specificMods.value = []
  patron.value = []
  missionRewards.value = {}

  Object.values(patronEffects).forEach((effect) => {
    effect.remove()
  })

  const { allEvents } = useEvents()
  allEvents.emit({ id: Math.floor(Math.random() * 10000), time: Date.now(), message: 'All perks were removed. Added default binding - <b>Company Stamp</b>.', type: 'warn' })
}

export function writeBuildValues(build: any) {
  const {
    allEffects, intensities, luresBought, binding, flags, heritage,
    ridePerks, homePerks, talentPerks, defensePerks, miscPerks, genericWaifuPerks, companions, startingOrigin,
    waifuPerks, baseBudget, startingWorld, budgetMods, otherPerks, fee, specificMods, patron, pvpPerks, coupleOrigin,
    difficulties,
  } = useStore()

  const { jumpChain, loan, missionRewards } = usePlayStore()

  const { activeChallenges } = useChallenges()

  clearAll()
  baseBudget.value = build.baseBudget || 0
  startingWorld.value = build.startingWorld
  startingOrigin.value = build.startingOrigin
  coupleOrigin.value = build.coupleOrigin || {
    title: '',
    cost: 0,
  }
  intensities.value = build.intensities || []
  difficulties.value = build.difficulties || []
  binding.value = build.binding || []
  otherPerks.value = build.otherPerks || []
  luresBought.value = build.luresBought || []
  heritage.value = build.heritage || []
  ridePerks.value = build.ridePerks || []
  homePerks.value = build.homePerks || []
  talentPerks.value = build.talentPerks || []
  defensePerks.value = build.defensePerks || []
  miscPerks.value = build.miscPerks || []
  genericWaifuPerks.value = build.genericWaifuPerks || []
  waifuPerks.value = build.waifuPerks || []
  companions.value = build.companions || []
  allEffects.value = build.allEffects || []
  flags.value = build.flags
  budgetMods.value = build.budgetMods
  activeChallenges.value = build.activeChallenges || []
  loan.value = build.loan || { owed: 0, gained: 0 }
  specificMods.value = build.specificMods || []
  patron.value = build.patron || []
  pvpPerks.value = build.pvpPerks || []
  fee.value = build.fee || 0
  jumpChain.value = build.jumpChain || []
  missionRewards.value = build.missionRewards || {}
  const { allEvents } = useEvents()
  allEvents.emit({ id: Math.floor(Math.random() * 10000), time: Date.now(), message: 'Successfully loaded build', type: 'success' })
}

export const saveObject = computed(() => {
  const {
    allEffects, intensities, luresBought, binding, flags, heritage,
    ridePerks, homePerks, talentPerks, defensePerks, miscPerks, genericWaifuPerks, companions, startingOrigin,
    waifuPerks, baseBudget, startingWorld, budgetMods, otherPerks, fee, specificMods, patron, pvpPerks, coupleOrigin,
    difficulties,
  } = useStore()

  const { jumpChain, loan, missionRewards } = usePlayStore()

  const { activeChallenges } = useChallenges()
  return {
    baseBudget: baseBudget.value,
    startingWorld: startingWorld.value,
    startingOrigin: startingOrigin.value,
    coupleOrigin: coupleOrigin.value,
    intensities: intensities.value,
    difficulties: difficulties.value,
    binding: binding.value,
    luresBought: luresBought.value,
    otherPerks: otherPerks.value,
    heritage: heritage.value,
    ridePerks: ridePerks.value,
    homePerks: homePerks.value,
    talentPerks: talentPerks.value,
    defensePerks: defensePerks.value,
    miscPerks: miscPerks.value,
    genericWaifuPerks: genericWaifuPerks.value,
    waifuPerks: waifuPerks.value,
    companions: companions.value,
    allEffects: allEffects.value,
    flags: flags.value,
    budgetMods: budgetMods.value,
    activeChallenges: activeChallenges.value,
    loan: loan.value,
    specificMods: specificMods.value,
    patron: patron.value,
    pvpPerks: pvpPerks.value,
    fee: fee.value,
    jumpChain: jumpChain.value,
    missionRewards: missionRewards.value,
  }
})

export function filterObject(obj: any) {
  const ret: any = {}
  Object.keys(obj)
    .forEach((key) => {
      if (obj[key] !== undefined && obj[key] !== '') {
        if (key === 'count' && obj[key] === 0) return
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
