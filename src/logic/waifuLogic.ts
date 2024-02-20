import { Character } from 'global'
import { findIndex, random } from 'lodash-es'
import { CHAR_COSTS, useAllChars } from '../data/constants'
import { useStore } from '../store/store'
import { confirmDialog } from './dialog'
import { useEvents } from './events'
import { imageLink } from './misc'
import { SavedChar } from '~/store/chargen'
import { useGlobalSettings } from '~/store/settings'

const {
  companions, fullStartingBudget, csr, baseBudget, noBindings, companionsUIDs, localUserCharacters, legacyMode,
} = useStore()

const { allCharsObject } = useAllChars()
const { slightlyUsedTierDiscount } = useGlobalSettings()

const priceTier = (t: number): number => noBindings.value && legacyMode.value && t <= 10 && t !== 1 ? t - 1 : t

export function buyAnyCompanion(uid: number, price = -1, method: SavedChar['method'] = 'buy', randomUid = false) {
  const { allEvents } = useEvents()
  const char = allCharsObject.value[uid]
  if (char) {
    companions.value.push({ uid: char.u, name: char.n, world: char.w, tags: char.b, tier: char.t, priceTier: method === 'capture' ? char.t : priceTier(char.t), method, image: imageLink(char.u) })
    if (price !== -1)
      companions.value[companions.value.length - 1].price = price
    if (randomUid)
      companions.value[companions.value.length - 1].uid = random(0, 999999999)

    const messages = {
      buy: 'Bought',
      capture: 'Captured',
      steal: 'Stole',
      yoink: 'Yoinked',
      used: 'Bought used',
      unbound: 'Joined',
    }
    allEvents.emit({ id: Math.floor(Math.random() * 10000), time: Date.now(), message: `<b>${messages[method]}</b>  ${char.n} from ${char.w}`, type: 'success' })
  }
}

export function slightlyCompanion(slightlyUsedData: any, char: Character) {
  const tier = slightlyUsedData.tier
  const pt = priceTier(slightlyUsedData.tier - slightlyUsedData.traumaTier - slightlyUsedTierDiscount.value)
  companions.value.push({ uid: char.uid, name: char.name, world: char.world, tags: char.tags, tier, priceTier: pt, method: 'used' })
}

export function removeAnyCompanion(uid: number) {
  const { allEvents } = useEvents()
  const ind = findIndex(companions.value, { uid })
  if (ind !== -1) {
    allEvents.emit({ id: Math.floor(Math.random() * 10000), time: Date.now(), message: `Removed ${companions.value[ind].name}`, type: 'attention' })
    companions.value.splice(ind, 1)
  }
}

export function captureCompanion(uid: number) {
  buyAnyCompanion(uid, -1, 'capture')
}

export function captureCopyCompanion(uid: number) {
  buyAnyCompanion(uid, 0, 'capture', true)
}

export function yoinkCompanion(uid: number) {
  const char = allCharsObject.value[uid]
  if ((!csr.value && fullStartingBudget.value * 0.2 >= CHAR_COSTS[char.t]) || (csr.value && (baseBudget.value + fullStartingBudget.value) * 0.2 >= CHAR_COSTS[char.t]))
    buyAnyCompanion(uid, -1, 'yoink')

  else
    confirmDialog(`20% of your current budget is <span class='text-green-500'>${fullStartingBudget.value * 0.2}</span> which is less than ${CHAR_COSTS[char.t]} needed to Yoink this character.`, 'info')
}

export function undoBuying(uid: number) {
  const { allEvents } = useEvents()
  const ind = findIndex(companions.value, { uid })
  allEvents.emit({ id: Math.floor(Math.random() * 10000), time: Date.now(), message: `Removed ${companions.value[ind].name}`, type: 'attention' })
  companions.value.splice(ind, 1)
}

export function isAlreadyBought(uid: number): boolean {
  return !!companionsUIDs.value[uid]
}

export function deleteLocalCharacter(uid: number) {
  const { allEvents } = useEvents()
  const ind = findIndex(localUserCharacters.value, { uid })
  if (ind !== -1) {
    allEvents.emit({ id: Math.floor(Math.random() * 10000), time: Date.now(), message: 'Deleted local character', type: 'attention' })
    localUserCharacters.value.splice(ind, 1)
  }
}
