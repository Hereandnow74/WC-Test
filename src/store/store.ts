import { findIndex, find } from 'lodash-es'
import { useChallenges } from './challenges'
import { usePlayStore } from './play'
import { useChargenStore } from './chargen'
import { CHAR_COSTS, heritageTiers, WORLD_RATINGS } from '~/data/constants'
import { defenseObject, talentsObject } from '~/data/talents'

const { loan, jumpChain, currentWorld, trHistory } = usePlayStore()

const {
  baseBudget,
  allEffects,
  startingWorld,
  startingOrigin,
  userWorlds,
  localUserWorlds,
  intensities,
  pvpPerks,
  binding,
  luresBought,
  otherPerks,
  heritage,
  ridePerks,
  homePerks,
  talentPerks,
  defensePerks,
  miscPerks,
  waifuPerks,
  genericWaifuPerks,
  companions,
  userCharacters,
  localUserCharacters,
  flags,
  budgetMods,
  allForSave,
  mode,
  params,
  userRides,
  localUserRides,
  fee,
  specificMods,
  patron,
} = useChargenStore()

const csr = computed(() => findIndex(intensities.value, { title: 'Cash Still Rules' }) !== -1)

const baseBudgetAfter = computed(
  () => baseBudget.value + intensities.value.reduce((a, x) => x.intensity > 1 ? a + x.intensity : a, 0),
)

const pvpPerksCost = computed(() => pvpPerks.value.reduce((a, x) => a += x.cost >= 11111 ? 0 : x.cost, 0))

const bindingCost = computed(() => binding.value.reduce((a, x) => a += x.cost >= 11111 ? 0 : x.cost, 0))
const heritageCost = computed(() => heritage.value.reduce((a, x) => a += x.cost >= 11111 ? 0 : x.cost, 0))

const ridePerksCost = computed(() => ridePerks.value.reduce((a, x) => a += x.cost === 11111 ? 0 : x.cost, 0))
const homePerksCost = computed(() => homePerks.value.reduce((a, x) => a += x.cost === 11111 ? 0 : x.cost, 0))
const talentsCost = computed(() => talentPerks.value.reduce((a, x) => a += x.cost === 11111 ? 0 : x.cost, 0))
const defensesCost = computed(() => defensePerks.value.reduce((a, x) => a += x.cost === 11111 ? 0 : x.cost, 0))
const miscPerksCost = computed(() => miscPerks.value.reduce((a, x) => a += x.cost === 11111 ? 0 : x.cost, 0))
const waifuPerksCost = computed(() => waifuPerks.value.reduce((a, x) => a += x.cost === 11111 ? -(x.refund || 0) : x.cost - (x.refund || 0), 0))
const genericWaifuPerksCost = computed(() => genericWaifuPerks.value.reduce((a, x) => a += x.cost === 11111 ? 0 : x.cost, 0))
const luresCost = computed(() => luresBought.value.reduce((a, x) => a += x.cost === 11111 ? 0 : x.cost, 0))
const otherCost = computed(() => otherPerks.value.reduce((a, x) => a += x.cost === 11111 ? 0 : x.cost, 0))

const specificModsCost = computed(() => specificMods.value.reduce((a, x) => a += x.mod, 0))

const companionsCost = computed(() => {
  return companions.value.reduce((a, x) => {
    if (['buy', 'unbound'].includes(x.method) && x.priceTier !== 11)
      return a += CHAR_COSTS[x.priceTier] || 0
    if (x.method === 'yoink' && x.priceTier !== 11) {
      const cost = CHAR_COSTS[x.priceTier] || 0
      const yoinkCost = cost * 0.2 < 1 ? 1 : cost * 0.2
      return a += cost + yoinkCost
    }
    if (x.method === 'used' && x.priceTier !== 11)
      return a += CHAR_COSTS[x.priceTier] || 0
    return a
  }, 0)
})

const { activeChallenges } = useChallenges()

const manualKf = ref(0)
const manualSellKf = ref(0.2)
const manualReturnKf = ref(0.8)

const captureKoeff = computed(() => {
  let kf = 0.6
  if (findIndex(intensities.value, { title: 'Cash Still Rules' }) !== -1) kf = 0.8
  if (findIndex(activeChallenges.value, { title: 'Waifu Manager' }) !== -1) kf = 0.8
  if (findIndex(intensities.value, { title: 'Wage Slave' }) !== -1) kf = 0
  return manualKf.value || kf
})

const companionProfit = computed(() => {
  return captureKoeff.value > 0
    ? companions.value.reduce((a, x) => {
      if (x.method === 'capture' && x.priceTier !== 11) {
        if (x.price === undefined) {
          let captureCost = Math.ceil(CHAR_COSTS[x.priceTier] * captureKoeff.value)
          captureCost = Math.max(1, captureCost)
          return a += captureCost
        }
        else { return a += x.price }
      }
      return a
    }, 0)
    : 0
})

const companionProfitSold = computed(() => {
  return captureKoeff.value > 0
    ? companions.value.reduce((a, x) => {
      if (x.sold && x.tier !== 11 && ['capture'].includes(x.method)) {
        if (x.soldPrice === undefined)
          return a += Math.round(CHAR_COSTS[x.tier] * manualSellKf.value)
        else return a += x.soldPrice
      }
      if (x.sold && x.priceTier !== 11 && ['buy', 'used', 'yoink'].includes(x.method))
        return a += Math.round(CHAR_COSTS[x.priceTier] * manualReturnKf.value)
      return a
    }, 0)
    : 0
})

// Discounts
const maxHeritageDiscount = computed(() => {
  const types = {
    dr: 'Dragon',
    th: 'Transhuman',
    ou: 'Outsider',
  }
  const discount = { archetype: '', value: 0 }
  if (['Substitute', 'Possess'].includes(startingOrigin.value.title) && startingOrigin.value.hr) {
    discount.archetype = types[startingOrigin.value.hr] || ''
    discount.value = CHAR_COSTS[startingOrigin.value.tier] || 0
    if (discount.value === 11111) discount.value = 2000
  }
  return discount
})

const usedHeritageDiscount = computed(() => {
  const hrCost = heritage.value.filter(x => x.tree && x.tree === maxHeritageDiscount.value.archetype)
    .reduce((a, x) => a += x.cost, 0)
  return maxHeritageDiscount.value.value < hrCost * 0.8 ? maxHeritageDiscount.value.value : hrCost * 0.8
})

const talentsDiscount = computed(() => {
  const cost = talentPerks.value.filter(x => x.count && x.count > 1 && !x.complex)
    .reduce((a, x) => a += (x.count - 1) * talentsObject[x.title].cost, 0)
  return cost
})

const defensesDiscount = computed(() => {
  const cost = defensePerks.value.filter(x => x.count && x.count > 2)
    .reduce((a, x) => a += (x.count - 2) * defenseObject[x.title].cost, 0)
  return cost
})

const defenseRetinueDiscount = computed(() => {
  const cost = defensePerks.value.filter(x => x.defDiscount).reduce((a, x) => {
    if (x.count <= 1) {
      switch (x.defDiscount) {
        case 1:
          return a += defenseObject[x.title].cost * 0.4
        case 2:
          return a += defenseObject[x.title].cost * 0.8
        case 3:
          return a += defenseObject[x.title].cost
        default:
          return a += defenseObject[x.title].cost
      }
    }
    else {
      switch (x.defDiscount) {
        case 1:
          return a += defenseObject[x.title].cost * 0.4
        case 2:
          return a += defenseObject[x.title].cost * 0.8
        case 3:
          return a += defenseObject[x.title].cost
        case 4:
          return a += defenseObject[x.title].cost * 1.6
        case 5:
          return a += defenseObject[x.title].cost * 2
      }
    }
    return a
  }, 0)
  return cost
})

const totalDiscount = computed(() => usedHeritageDiscount.value + talentsDiscount.value + defensesDiscount.value + defenseRetinueDiscount.value)

const fullStartingBudget = computed(() => {
  let intensityFlat = 0
  const intenMultiplier = intensities.value
    .reduce((a, x) => x.intensity < 10 ? a += x.intensity : (intensityFlat += x.intensity, a), 0)

  let bd = baseBudget.value
  if (flags.value.danger11Start) bd = 0

  return csr.value ? Math.round((bd + intensityFlat) * (intenMultiplier)) : Math.round((bd + intensityFlat) * (1 + intenMultiplier))
})

const creditLimit = computed(() =>
  Math.max(500,
    WORLD_RATINGS[startingWorld.value.rating - 1].budget,
    jumpChain.value.reduce((a, x) => Math.max(a, WORLD_RATINGS[x.rating - 1].budget), 0),
  ))

const budget = computed(() => {
  const bd = fullStartingBudget.value - startingOrigin.value.cost - pvpPerksCost.value
      - bindingCost.value - heritageCost.value - luresCost.value - ridePerksCost.value - homePerksCost.value
      - talentsCost.value - defensesCost.value - miscPerksCost.value - waifuPerksCost.value
      - genericWaifuPerksCost.value - companionsCost.value - otherCost.value - fee.value
      - budgetMods.value.minus + budgetMods.value.plus + companionProfit.value + companionProfitSold.value
      + usedHeritageDiscount.value + talentsDiscount.value + defensesDiscount.value
      + defenseRetinueDiscount.value + specificModsCost.value + budgetMods.value.sell11 * 2000

  // CSR implementation 2.0
  if (flags.value.chargen && csr.value) {
    if (bd + loan.value.gained < 0) {
      loan.value.gained = Math.min(Math.abs(bd), creditLimit.value)
      loan.value.owed = loan.value.gained
    }
  }

  return bd + loan.value.gained
})

const companionTicketProfit = computed(() => {
  return captureKoeff.value > 0
    ? companions.value.reduce((a, x) => {
      if (x.method === 'capture' && x.priceTier === 11) a += 1
      if (x.sold && x.tier === 11) a += 1
      return a
    }, 0)
    : 0
})

const tier11tickets = computed(() => {
  let ticket = 0
  if (flags.value.danger11Start) ticket += 1

  const bindingCost = binding.value.reduce((a, x) => a += x.cost >= 11111 ? x.cost / 11111 : 0, 0)
  const heritageCost = heritage.value.reduce((a, x) => a += x.cost >= 11111 ? x.cost / 11111 : 0, 0)

  const ridePerksCost = ridePerks.value.reduce((a, x) => a += x.cost === 11111 ? 1 : 0, 0)
  const homePerksCost = homePerks.value.reduce((a, x) => a += x.cost === 11111 ? 1 : 0, 0)
  const talentsCost = talentPerks.value.reduce((a, x) => a += x.cost === 11111 ? 1 : 0, 0)
  const defensesCost = defensePerks.value.reduce((a, x) => a += x.cost === 11111 ? 1 : 0, 0)
  const miscPerksCost = miscPerks.value.reduce((a, x) => a += x.cost === 11111 ? 1 : 0, 0)
  const waifuPerksCost = waifuPerks.value.reduce((a, x) => a += x.cost === 11111 ? 1 : 0, 0)
  const genericWaifuPerksCost = genericWaifuPerks.value.reduce((a, x) => a += x.cost === 11111 ? 1 : 0, 0)
  const luresCost = luresBought.value.reduce((a, x) => a += x.cost === 11111 ? 1 : 0, 0)
  const companionsCost = companions.value.reduce((a, x) => {
    return x.priceTier === 11 && x.method !== 'capture' ? a += 1 : a
  }, 0)

  return ticket - heritageCost - ridePerksCost - homePerksCost - talentsCost - defensesCost - miscPerksCost
    - waifuPerksCost - genericWaifuPerksCost - luresCost - companionsCost - bindingCost
    - budgetMods.value.minus11 + budgetMods.value.plus11 + companionTicketProfit.value - budgetMods.value.sell11
})

const totalCost = computed(() => startingOrigin.value.cost + heritageCost.value + bindingCost.value
+ ridePerksCost.value + homePerksCost.value + talentsCost.value + defensesCost.value + miscPerksCost.value
+ waifuPerksCost.value + genericWaifuPerksCost.value + luresCost.value + companionsCost.value + otherCost.value)

const companionsWithoutSold = computed(() => companions.value.filter(c => !c.sold))
const targetList = computed(() => {
  const comps = companionsWithoutSold.value.map(x => (x.name))
  if (['Substitute', 'Possess'].includes(startingOrigin.value.title))
    comps.unshift(startingOrigin.value.character || 'You')
  else
    comps.unshift('You')
  return comps
})

const yourTier = computed(() => {
  const calcTier = (cost: number) => {
    if (cost >= 11111) return 11
    for (let i = heritageTiers.length - 1; i > 0; i--)
      if (cost >= heritageTiers[i][0]) return heritageTiers[i][1]
    return 0
  }
  const talentsTier4 = findIndex(talentPerks.value, x => ['Template Stacking I', 'Racial Template', 'OC Donut Steel'].includes(x.title)) !== -1 ? 4 : 0
  const talentsTier5 = findIndex(talentPerks.value, x => ['Template Stacking II'].includes(x.title)) !== -1 ? 5 : 0
  let shroudTier = findIndex(binding.value, { title: 'Shroud of Power' }) !== -1 ? 4 : 0
  shroudTier = Math.max(findIndex(binding.value, { title: 'Alterzelu Symbiote' }) !== -1 ? 4 : 0, shroudTier)
  const originTier = startingOrigin.value.tier || 0
  const dragonTier = calcTier(heritage.value.filter(x => x.tree && x.tree === 'Dragon').reduce((a, x) => a += x.cost, 0))
  const transhumanTier = calcTier(heritage.value.filter(x => x.tree && x.tree === 'Transhuman').reduce((a, x) => a += x.cost, 0))
  const outsiderTier = calcTier(heritage.value.filter(x => x.tree && x.tree === 'Outsider').reduce((a, x) => a += x.cost, 0))
  const powerSwap = find(genericWaifuPerks.value, x => x.title === 'Power Swap')
  const yourPowerSwap = powerSwap ? find(powerSwap.complex, x => x.target === 'You') : undefined
  const powerSwapTier = yourPowerSwap ? yourPowerSwap.newTier : 0
  return Math.max(originTier, dragonTier, transhumanTier, outsiderTier, talentsTier4, talentsTier5, shroudTier, powerSwapTier)
})

const companionsUIDs = computed(() => companions.value.reduce((a, c) => (a[c.uid] = true, a), {} as Record<number, boolean>))

const underLoan = computed(() => loan.value.owed > 0)

watch(startingWorld, () => {
  currentWorld.value = startingWorld.value
})

watch(() => jumpChain.value.length, () => {
  if (jumpChain.value.length > 1) {
    if (fee.value)
      fee.value += Math.round(loan.value.owed * 0.1)
    else
      fee.value = Math.round(loan.value.owed * 0.1)
  }
})

// watch(budget, () => {
//   if (csr.value && budget.value < 0) {
//     const need = Math.abs(budget.value)
//     if ((creditLimit.value - loan.value.owed) > need) {
//       loan.value.gained += need
//       loan.value.owed += need
//     }
//   }
// })

const favorites = useStorage<string[]>('favorites', [])

const totalActive = useStorage('ta', 0)

const settings = useStorage('settings', {
  allChosenAuthors: [] as string[],
  nsfw: false,
  perkImages: true,
  columns: 'auto' as number | 'auto',
  hideWorldImg: false,
  allImg: false,
  ableSell: true,
  hideDesc: false,
})

const collapsedDescs = useStorage('collapsedDescs', [])
const collapsedDescsSet = computed(() => new Set(collapsedDescs.value))

export const appName = ref('')

const favoritesObject = computed(() => favorites.value.reduce((a, f) => (a[f] = f, a), {} as Record<string, string>))

export function useStore() {
  return {
    budget,
    baseBudget,
    baseBudgetAfter,
    allEffects,
    startingWorld,
    startingOrigin,
    userWorlds,
    localUserWorlds,
    intensities,
    pvpPerks,
    binding,
    luresBought,
    otherPerks,
    heritage,
    ridePerks,
    homePerks,
    talentPerks,
    defensePerks,
    miscPerks,
    waifuPerks,
    genericWaifuPerks,
    companions,
    userCharacters,
    localUserCharacters,
    flags,
    tier11tickets,
    bindingCost,
    otherCost,
    heritageCost,
    ridePerksCost,
    homePerksCost,
    talentsCost,
    defensesCost,
    miscPerksCost,
    waifuPerksCost,
    genericWaifuPerksCost,
    luresCost,
    companionsCost,
    budgetMods,
    allForSave,
    targetList,
    companionProfit,
    companionProfitSold,
    totalCost,
    mode,
    params,
    userRides,
    localUserRides,
    yourTier,
    companionsUIDs,
    fullStartingBudget,
    fee,
    captureKoeff,
    creditLimit,
    underLoan,
    csr,
    loan,
    trHistory,
    favorites,
    totalActive,
    usedHeritageDiscount,
    maxHeritageDiscount,
    talentsDiscount,
    defensesDiscount,
    defenseRetinueDiscount,
    settings,
    appName,
    totalDiscount,
    companionsWithoutSold,
    specificMods,
    patron,
    collapsedDescs,
    collapsedDescsSet,
    manualKf,
    manualSellKf,
    favoritesObject,
  }
}
