import { Character } from 'global'
import { findIndex, random } from 'lodash-es'
import { CHAR_COSTS, useAllChars } from '../data/constants'
import { useStore } from '../store/store'
import { confirmDialog } from './dialog'
import { SavedChar } from '~/store/chargen'
import { useGlobalSettings } from '~/store/settings'

const {
  companions, fullStartingBudget, csr, baseBudget, flags, companionsUIDs, localUserCharacters,
} = useStore()

const { allCharsObject } = useAllChars()
const { slightlyUsedTierDiscount } = useGlobalSettings()

const priceTier = (t: number): number => flags.value.noBindings && t <= 10 && t !== 1 ? t - 1 : t

export function buyAnyCompanion(uid: number, price = -1, method: SavedChar['method'] = 'buy', randomUid = false) {
  const char = allCharsObject.value[uid]
  if (char) {
    companions.value.push({ uid: char.u, name: char.n, world: char.w, tags: char.b, tier: char.t, priceTier: method === 'capture' ? char.t : priceTier(char.t), method })
    if (price !== -1)
      companions.value[companions.value.length - 1].price = price
    if (randomUid)
      companions.value[companions.value.length - 1].uid = random(0, 999999999)
  }
}

export function removeAnyCompanion(uid: number) {
  const ind = findIndex(companions.value, { uid })
  if (ind !== -1)
    companions.value.splice(ind, 1)
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

export function slightlyCompanion(slightlyUsedData: any, char: Character) {
  const tier = slightlyUsedData.tier
  const pt = priceTier(slightlyUsedData.tier - slightlyUsedData.traumaTier - slightlyUsedTierDiscount.value)
  companions.value.push({ uid: char.uid, name: char.name, world: char.world, tags: char.tags, tier, priceTier: pt, method: 'used' })
}

export function undoBuying(uid: number) {
  companions.value.splice(findIndex(companions.value, { uid }), 1)
}

export function isAlreadyBought(uid: number): boolean {
  return !!companionsUIDs.value[uid]
}

export function deleteLocalCharacter(uid: number) {
  const ind = findIndex(localUserCharacters.value, { uid })
  if (ind !== -1)
    localUserCharacters.value.splice(ind, 1)
}
