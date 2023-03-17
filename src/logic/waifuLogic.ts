import { Character, DBCharacter } from 'global'
import { intersection } from 'lodash-es'
import { CHAR_COSTS } from '../data/constants'
import { useStore } from '../store/store'
import { confirmDialog } from './dialog'

const {
  companions, fullStartingBudget, csr, baseBudget, flags,
} = useStore()

const priceTier = (t: number): number => flags.value.noBindings && t !== 11 && t !== 1 ? t - 1 : t

export function buyCompanion(char: DBCharacter) {
  const sex = (intersection(char.b, ['F', 'M', 'O'])[0] || 'F') as 'F' | 'M' | 'O'
  companions.value.push({ uid: char.u, name: char.n, world: char.w, sex, tier: char.t, priceTier: priceTier(char.t), method: 'buy' })
}

export function captureCompanion(char: Character) {
  // let price = 0
  const sex = (intersection(char.tags, ['F', 'M', 'O'])[0] || 'F') as 'F' | 'M' | 'O'
  companions.value.push({ uid: char.uid, name: char.name, world: char.world, sex, tier: char.tier, priceTier: char.tier, method: 'capture' })
  // if (underLoan.value && char.tier !== 11) {
  //   price = Math.ceil(CHAR_COSTS[char.tier] * captureKoeff.value)
  //   const half = Math.round(price / 2)
  //   if (half <= loan.value.owed) {
  //     loan.value.owed -= half
  //     price -= half
  //     trHistory.value.push(`Captured ${char.name} +${half}`)
  //   }
  //   else {
  //     price -= loan.value.owed
  //     trHistory.value.push(`Captured ${char.name} +${loan.value.owed}`)
  //     loan.value.owed = 0
  //   }
  //   res.price = price
  // }
}

export function yoinkCompanion(char: Character) {
  if ((!csr.value && fullStartingBudget.value * 0.2 >= CHAR_COSTS[char.tier]) || (csr.value && (baseBudget.value + fullStartingBudget.value) * 0.2 >= CHAR_COSTS[char.tier])) {
    const sex = (intersection(char.tags, ['F', 'M', 'O'])[0] || 'F') as 'F' | 'M' | 'O'
    companions.value.push({ uid: char.uid, name: char.name, world: char.world, sex, tier: char.tier, priceTier: priceTier(char.tier), method: 'yoink' })
  }
  else {
    confirmDialog(`20% of your current budget is <span class='text-green-500'>${fullStartingBudget.value * 0.2}</span> which is less than ${CHAR_COSTS[char.tier]} needed to Yoink this character.`, 'info')
  }
}

export function slightlyCompanion(slightlyUsedData: any, char: Character) {
  const tier = slightlyUsedData.tier
  const pt = priceTier(slightlyUsedData.tier - slightlyUsedData.traumaTier)
  const sex = (intersection(char.tags, ['F', 'M', 'O'])[0] || 'F') as 'F' | 'M' | 'O'
  companions.value.push({ uid: char.uid, name: char.name, world: char.world, sex, tier, priceTier: pt, method: 'used' })
}
