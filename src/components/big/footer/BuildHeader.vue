<template>
  <div class="flex justify-between items-center px-2 bg-blue-gray-900 mt-1 -mb-1 -mx-2">
    <div class="w-16 cursor-pointer hover:text-amber-500 flex items-center" title="Clear Build" @click="clearBuild">
      <ant-design:clear-outlined />
    </div>
    <div>
      Total cost: {{ totalCost - totalDiscount }}
    </div>
    <div class="flex gap-1">
      <div class="cursor-pointer hover:text-amber-500 flex items-center" title="Save & Load" @click="showSaveLoad = true">
        <fluent:save-24-regular />
      </div>
      <div class="cursor-pointer hover:text-amber-500 flex items-center" title="Share" @click="showShare = true">
        <ant-design:share-alt-outlined />
      </div>
      <div class="cursor-pointer hover:text-amber-500 flex items-center" title="Copy Text of Build" @click="copyText">
        <bx:bx-copy-alt />
      </div>
    </div>
  </div>
  <teleport to="#app">
    <SaveLoad v-if="showSaveLoad" class="z-20" @click="showSaveLoad = !showSaveLoad" />
    <Share v-if="showShare" class="z-20" @click="showShare = !showShare" />
  </teleport>
</template>

<script lang="ts" setup>
import { groupBy } from 'lodash-es'
import { useStore } from '~/store/store'
import { clearAll } from '~/logic'
import { confirmDialog } from '~/logic/dialog'
import { useChallenges } from '~/store/challenges'
import { Perk } from '~/store/chargen'

const {
  startingWorld, startingOrigin, intensities, binding, homePerks, defensePerks,
  companions, heritage, talentPerks, waifuPerks, ridePerks, miscPerks, luresBought, genericWaifuPerks,
  companionsCost, baseBudget, companionProfit, companionProfitSold, otherPerks, loan, csr,
  usedHeritageDiscount, talentsDiscount, defensesDiscount, defenseRetinueDiscount, totalCost, totalDiscount,
} = useStore()

const { activeChallenges } = useChallenges()

const showSaveLoad = ref(false)
const showShare = ref(false)

const originTextClean = computed(() => {
  const variants = {
    'Drop-In': 'Dropped-In',
    'Walk-In': `Walked-In as ${startingOrigin.value.character} of T${startingOrigin.value.tier}`,
    'Extra': `'Extra' with ${startingOrigin.value.cost} additional cost`,
    'Substitute': `Substitue as a ${startingOrigin.value.character} of T${startingOrigin.value.tier}`,
    'Possess': `Possess a ${startingOrigin.value.character} of T${startingOrigin.value.tier}`,
  } as Record<string, string>

  return variants[startingOrigin.value.title]
})

async function clearBuild() {
  const res = await confirmDialog('This action will clear your build, proceed?')
  if (!res) return
  clearAll()
}

function buildString(title: string, items: Perk[], left: object) {
  let str = `${title}\n`
  items.forEach((x) => {
    left.c -= x.cost
    const count = x.count && x.count > 1 ? ` x${x.count} ` : ''
    let complexFlavor = ''
    let complexCompanion = ''
    let complexBoth = ''
    if (x.complex) {
      if (x.complex[0].flavor && x.complex[0].target) {
        let pw = ''
        if (x.title === 'OC Donut Steel') pw = ' powers'
        const grouped = groupBy(x.complex, c => c.target)
        complexBoth = `[${Object.entries(grouped)
          .map(x => `${x[0]} has ${x[1]
            .map(f => f.flavor).join(', ')}${pw}`).join(', ')}]`
      }
      if (x.complex[0].flavor)
        complexFlavor = `[${x.complex.map(x => `${x.flavor}`).join(', ')}]`
      if (x.complex[0].target)
        complexCompanion = `[${x.complex.map(x => `${x.target}`).join(', ')}]`
    }
    str += `${x.title}${count}${complexBoth || complexCompanion || complexFlavor} ${x.cost ? `-${x.cost}` : 'free'} [${left.c}]\n`
  })
  return str
}

function copyText() {
  const fullCost = { c: baseBudget.value === 11111 ? 0 : baseBudget.value }
  if (csr.value) fullCost.c = 0

  let full = `Starting World: ${startingWorld.value.worldName}\nStarting budget ${fullCost.c}\n\n`

  full += loan.value.gained > 0 ? `Took a loan for ${loan.value.gained} credits\n\n` : ''
  fullCost.c += loan.value.gained

  full += activeChallenges.value.length ? `${buildString('Challenges', activeChallenges.value, fullCost)}\n` : ''

  full += intensities.value.length
    ? `Intensity \n${intensities.value.reduce((a, x) =>
      a += `${x.title} +${x.intensity > 10 ? x.intensity : baseBudget.value * x.intensity} [${(fullCost.c += x.intensity > 10 ? x.intensity : baseBudget.value * x.intensity, fullCost.c)}]\n\n`
    , '')}`
    : ''
  fullCost.c -= startingOrigin.value.cost || 0
  full += originTextClean.value ? `${originTextClean.value} -${startingOrigin.value.cost} [${fullCost.c}]\n\n` : ''
  if (usedHeritageDiscount.value > 0) {
    fullCost.c += usedHeritageDiscount.value
    full += `Discounted because of your origin archetype +${usedHeritageDiscount.value} [${fullCost.c}]\n`
  }
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
    ? `Companions bought -${companionsCost.value} [${fullCost.c}]\n${companionsBought.reduce((a, x) =>
      a += `${x.name}(T${x.tier})[${x.method}] from ${x.world}\n`
    , '')}`
    : ''

  fullCost.c += companionProfit.value + companionProfitSold.value

  full += companionsCaptured.length
    ? `\nCompanions captured +${companionProfit.value} [${fullCost.c}]\n${companionsCaptured.reduce((a, x) =>
      a += `${x.name}(T${x.tier}) from ${x.world}${x.sold ? ' --SOLD' : ''}\n`
    , '')}`
    : ''

  navigator.clipboard.writeText(full)
}
</script>
