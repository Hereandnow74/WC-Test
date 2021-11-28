
<template>
  <div
    class="fixed bottom-0 w-full text-gray-100 transition-transform transform"
    :class="visible ? 'translate-y-0' : 'translate-y-[calc(100%-1.8rem)]'"
    @click="visible = false"
  >
    <div
      class="min-w-[320px] h-[568px] sm:h-[calc(100vh-3.4rem)] rounded-3xl mx-auto border relative flex flex-col transition-all"
      bg="gray-900"
      border="2 gray-400"
      :class="orientation ? 'max-w-[940px]' : 'max-w-[440px]'"
      @click.stop
    >
      <div class="text-center relative pb-1">
        <fluent:phone-tablet-20-regular
          v-if="visible"
          class="absolute left-4 top-1 h-6 w-6 cursor-pointer hover:text-amber-500"
          @click="orientation = !orientation"
        />
        <span v-if="tier11tickets !== 0" class="mr-2">T11 tickets: {{ tier11tickets }}</span>
        <span>Budget: {{ budget }}</span>
        <span v-if="budget < 0" class="text-red-500 px-2">You are in debt</span>
        <span
          class="absolute inline-block right-4 text-xl cursor-pointer hover:text-green-500"
          @click="() => toggleFull()"
        >
          <ic:round-unfold-more />
        </span>
      </div>
      <div class="flex flex-col border m-1 py-1 border-gray-600 flex-grow rounded-sm bg-gray-800 min-h-0">
        <div class="flex gap-1 mx-2 border-b-1">
          <div
            v-for="tab, i in tabs"
            :key="tab"
            class="flex-grow rounded-t cursor-pointer flex items-center justify-center"
            border="t-2 green-500"
            :class="activeTab === i ? 'bg-green-600': 'hover:text-orange-400'"
            @click="activeTab = i"
          >
            <span class="iconify" :data-icon="tabIcons[i]"></span>
            {{ tab }}
          </div>
        </div>
        <component :is="tabComponents[activeTab]" />
      </div>
      <div class="flex h-8 justify-between items-center px-6 mt-auto">
        <div class="w-16 cursor-pointer hover:text-amber-500" title="Clear Build" @click="clearBuild">
          <ant-design:clear-outlined />
        </div>
        <div class="cursor-pointer hover:text-amber-500" @click="toggleFull()">
          <akar-icons:circle />
        </div>
        <div class="flex gap-1">
          <div class="cursor-pointer hover:text-amber-500" title="Save & Load" @click="showSaveLoad = true">
            <fluent:save-24-regular />
          </div>
          <div class="cursor-pointer hover:text-amber-500" title="Share" @click="showShare = true">
            <ant-design:share-alt-outlined />
          </div>
          <div class="cursor-pointer hover:text-amber-500" title="Copy Text of Build" @click="copyText">
            <bx:bx-copy-alt />
          </div>
        </div>
      </div>
    </div>
    <teleport to="#app">
      <SaveLoad v-if="showSaveLoad" class="z-20" @click="showSaveLoad = !showSaveLoad" />
      <Share v-if="showShare" class="z-20" @click="showShare = !showShare" />
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import { Perk, useStore } from '~/store/store'
import { activeTab, clearAll, orientation } from '~/logic'
import { confirmDialog } from '~/logic/dialog'

const showSaveLoad = ref(false)
const showShare = ref(false)

const tabs = ['Build', 'Companions', 'Apps', 'Spendings', '']
const tabIcons = ['bx:bx-spreadsheet', 'bx:bx-spreadsheet', 'ion:apps-sharp', 'la:coins', 'fluent:wrench-16-filled']

const tabComponents = [
  defineAsyncComponent(() => import('./footer/Build.vue')),
  defineAsyncComponent(() => import('./footer/Companions.vue')),
  defineAsyncComponent(() => import('./footer/Apps.vue')),
  defineAsyncComponent(() => import('./footer/Spendings.vue')),
  defineAsyncComponent(() => import('./footer/Manual.vue')),
]

const {
  budget, startingWorld, startingOrigin, intensities, binding, homePerks, defensePerks,
  companions, heritage, talentPerks, waifuPerks, ridePerks, miscPerks, luresBought, genericWaifuPerks,
  tier11tickets, companionsCost, baseBudget, companionProfit, companionProfitSold, otherPerks,
} = useStore()

const originTextClean = computed(() => {
  const variants = {
    'Drop-In': 'Dropped-In',
    'Walk-In': 'Walked-In',
    'Extra': `'Extra' with ${startingOrigin.value.cost} additional cost`,
    'Substitute': `Substitue as a ${startingOrigin.value.character} of T${startingOrigin.value.tier}`,
    'Possess': `Possess a ${startingOrigin.value.character} of T${startingOrigin.value.tier}`,
  } as Record<string, string>

  return variants[startingOrigin.value.title]
})

const [visible, toggleFull] = useToggle()

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
      if (x.complex[0].flavor && x.complex[0].target)
        complexBoth = `[${x.complex.map(x => `${x.target} has ${x.flavor}`).join(', ')}]`
      if (x.complex[0].flavor)
        complexFlavor = `[${x.complex.map(x => `${x.flavor}`).join(', ')}]`
      if (x.complex[0].target)
        complexCompanion = `[${x.complex.map(x => `${x.target}`).join(', ')}]`
    }
    str += `${x.title}${count}${complexBoth || complexCompanion || complexFlavor} -${x.cost} [${left.c}]\n`
  })
  return str
}

function copyText() {
  const fullCost = { c: baseBudget.value === 11111 ? 0 : baseBudget.value }

  let full = `Starting World: ${startingWorld.value.worldName}\nStarting budget ${fullCost.c}\n\n`

  full += intensities.value.length
    ? `Intensity \n${intensities.value.reduce((a, x) =>
      a += `${x.title} +${x.intensity > 10 ? x.intensity : baseBudget.value * x.intensity} [${(fullCost.c += x.intensity > 10 ? x.intensity : baseBudget.value * x.intensity, fullCost.c)}]\n\n`
    , '')}`
    : ''

  fullCost.c -= startingOrigin.value.cost || 0
  full += originTextClean.value ? `${originTextClean.value} -${startingOrigin.value.cost} [${fullCost.c}]\n\n` : ''
  full += heritage.value.length ? `${buildString('Heritage', heritage.value, fullCost)}\n` : ''
  full += binding.value.length ? `${buildString('Bindings', binding.value, fullCost)}\n` : ''
  full += luresBought.value.length ? `${buildString('Lures', luresBought.value, fullCost)}\n` : ''
  full += otherPerks.value.length ? `${buildString('Other Controls', otherPerks.value, fullCost)}\n` : ''
  full += ridePerks.value.length ? `${buildString('Rides', ridePerks.value, fullCost)}\n` : ''
  full += homePerks.value.length ? `${buildString('Home Perks', homePerks.value, fullCost)}\n` : ''
  full += talentPerks.value.length ? `${buildString('Talents', talentPerks.value, fullCost)}\n` : ''
  full += defensePerks.value.length ? `${buildString('Defenses', defensePerks.value, fullCost)}\n` : ''
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

<style>
.scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #3b3b3b #858585;
}

.scrollbar::-webkit-scrollbar {
    width: 8px;
}

.scrollbar::-webkit-scrollbar-track {
    background-color: #555555;
    border-radius: 100px;
}

.scrollbar::-webkit-scrollbar-thumb {
    background-color: #242424;
    border-radius: 100px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgb(54, 54, 54);
}
</style>
