<template>
  <div class="sm:p-2">
    <h3 id="bindings" class="text-2xl text-center">
      Bindings <router-link
        :to="{path:'/binding', hash:'#lures'}"
        class="text-base text-blue-600 dark:text-blue-400  hover:underline"
      >
        (go to Lures)
      </router-link>
    </h3>
    <Desc class="p-2 mb-4 max-w-4xl bg-warm-gray-200 dark:bg-warm-gray-800 mx-auto" :desc="desc" />

    <div class="flex flex-wrap gap-x-4 gap-y-2 justify-center mb-4">
      <div
        v-for="type in Object.keys(bindingByType)"
        :key="type"
        class="px-2 py-1 border-2 rounded cursor-pointer hover:border-orange-400"
        :class="activeType === type ? 'border-orange-400': ''"
        @click="activeType = type"
      >
        <h3>{{ type }}</h3>
        <div>Total perks: <span>{{ bindingByType[type].length }}</span></div>
      </div>
    </div>

    <div
      class="column-gap"
      :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
    >
      <div

        id="No Bindings"
        class="mb-2 p-2 bg-light-400 dark:bg-rose-900 column-block max-w-[600px]"
        :class="flags.noBindings ? 'hover:(yellow-100 dark:bg-rose-800) cursor-pointer': 'dark:bg-gray-600'"
      >
        <h3 class="text-center text-xl px-2 relative">
          <span>No Bindings</span>
          <fa-solid:check v-if="flags.noBindings" class="text-green-500 absolute top-1 right-1" />
        </h3>
        <Desc desc="None of your waifus will be affected by any of the effects common to all company bindings. This is your warning. If you purchase and use a real binding method later, the discount will disappear and you will go into debt. You do not need to bind your previously-purchased waifus immediately. Capturing any waifu without bindings will award you the standard capture value of her original tier, before this option’s purchase discount. It will also give her a dormant tattoo, which you can activate at any time by using the Stamp (should you purchase it) or removing a higher Binding. If you instead switch to this option after already having bound waifus, the basic effects common to all bindings will persist in your retinue members until interactions or events change their minds naturally." />
        <div class="text-violet-700 dark:text-yellow-200 px-2">
          All waifus of tiers 2-10 are discounted by one full rank.
        </div>
      </div>
      <component
        :is="bindingCard(bnd)"
        v-for="bnd in bindingByType[activeType]"
        :key="bnd.title"
        v-bind="{
          perk: bnd,
          bg: bindingAvailable(bnd) ? 'light-400 dark:rose-900 hover:(yellow-100 dark:rose-800)'
            : 'gray-200 dark:gray-600',
          isActive: !!allBindings[bnd.title],
          savedPerk: allBindings[bnd.title],
          ...generateProps(bnd)
        }"
        @pickPerk="chooseBinding"
      >
        <template v-if="['Elemental Shroud'].includes(bnd.title)" #title>
          <Button size="Small" label="element" class="mx-1" @click.stop="chooseElement(bnd)" />
        </template>
        <template v-if="bnd.type === 'Ritual'" #rules>
          <span class="mx-2" @click.stop="toggleRitual()">Rules: <span class="text-red-500 hover:underline">ritual parameters</span></span>
        </template>
      </component>
      <PerkCard
        v-if="!settings.allChosenAuthors.includes('DLC by Despin')"
        :key="DLCbindings[0].title"
        :bg="!flags.noBindings ? 'light-400 dark:rose-900 hover:(yellow-100 dark:rose-800)'
          : 'gray-200 dark:gray-600'"
        :perk="DLCbindings[0]"
        :is-active="!!allBindings[DLCbindings[0].title]"
        :saved-perk="allBindings[DLCbindings[0].title]"
        :increment="true"
        @pickPerk="(perk, save) => pickSimplePerk(perk,save, () => true, binding)"
      />
    </div>
    <Desc
      v-if="activeType === 'Symbiote'"
      :desc="symbioteRules"
      class="p-2 my-4 max-w-4xl bg-warm-gray-200 dark:bg-warm-gray-800 mx-auto"
    />

    <h3 id="lures" class="text-2xl text-center">
      Lures <router-link
        :to="{path:'/binding', hash:'#expansions'}"
        class="text-base text-blue-600 dark:text-blue-400 hover:underline"
      >
        (go to Expansions)
      </router-link>
    </h3>
    <Desc :desc="lureDesc" class="bg-gray-200 dark:bg-gray-600 max-w-screen-md my-4 mx-auto" />
    <div
      class="column-gap"
      :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
    >
      <PerkCard
        v-for="lr in luresDLC"
        :key="lr.title"
        :perk="lr"
        :bg="lureAvailable(lr) ? 'pink-100 dark:pink-900 hover:(pink-200 dark:rose-800)'
          : 'gray-200 dark:gray-600'"
        :is-active="!!allLures[lr.title]"
        @pickPerk="chooseLure"
      >
      </PerkCard>
    </div>

    <h3 id="expansions" class="text-2xl text-center">
      Lure Expansions  <router-link
        :to="{path:'/binding', hash:'#other'}"
        class="text-base text-blue-600 dark:text-blue-400 hover:underline"
      >
        (go to Other controls)
      </router-link>
    </h3>
    <Desc :desc="lureExpansionDesc" class="bg-gray-200 dark:bg-gray-600 max-w-screen-md my-4 mx-auto" />
    <div
      class="column-gap"
      :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
    >
      <PerkCard
        v-for="lr in lureExpansionsDLC"
        :key="lr.title"
        :perk="lr"
        :bg="lureAvailable(lr) ? 'pink-100 dark:pink-900 hover:(pink-200 dark:rose-800)'
          : 'gray-200 dark:gray-600'"
        :is-active="!!allLures[lr.title]"
        @pickPerk="chooseLure"
      >
      </PerkCard>
    </div>

    <h3 id="other" class="text-2xl text-center">
      Other controls  <router-link
        :to="{path:'/binding', hash:'#bindings'}"
        class="text-base text-blue-600 dark:text-blue-400 hover:underline"
      >
        (go to Bindings)
      </router-link>
    </h3>
    <Desc :desc="otherDesc" class="bg-gray-200 dark:bg-gray-600 max-w-screen-md my-4 mx-auto" />
    <div
      class="column-gap pb-8"
      :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
    >
      <PerkCard
        v-for="other in otherDLC"
        :key="other.title"
        :perk="other"
        :bg="lureAvailable(other) ? 'pink-100 dark:pink-900 hover:(pink-200 dark:rose-800)'
          : 'gray-200 dark:gray-600'"
        :is-active="!!allOther[other.title]"
        @pickPerk="chooseOther"
      >
      </PerkCard>
    </div>

    <ShroudElements v-if="showElements" @click="toggleElements" @toggleElement="toggleCurrentElement" />
    <RitualCircle v-if="showRitual" @click="toggleRitual" />
  </div>
</template>

<script lang='ts' setup>
import { onBeforeRouteUpdate } from 'vue-router'
import {
  desc, bindings, Binding, lureDesc, lures, lureExpansionDesc, lureExpansions, shroudElements,
  otherControls, otherDesc, symbioteRules,
} from '~/data/binding'
import { useTooltips } from '~/logic/misc'
import { chooseLure, lureAvailable, bindingAvailable, chooseBinding, chooseOther, pickSimplePerk } from '~/logic'
import { useStore } from '~/store/store'
import { DLCbindings, DLClureExpansions, DLClures, DLCotherControls } from '~/data/DLCs'
import PerkCard from '~/components/PerkCard.vue'
import GenericPerkCard from '~/components/perkCards/GenericPerkCard.vue'

const { binding, luresBought, flags, otherPerks, settings } = useStore()
const [showElements, toggleElements] = useToggle()
const [showRitual, toggleRitual] = useToggle()

const currentBinding = ref<Binding|null>(null)

const activeType = ref('Stamp')

const perkCards = {
  'Prismatic Shroud': defineAsyncComponent(() => import('~/components/perkCards/PrismaticShroud.vue')),
} as Record<string, any>

const bindingCard = (bnd: Binding) => {
  let generic = null
  if (!bnd.multiple && !bnd.waifu && !bnd.complex && bnd.element)
    generic = GenericPerkCard
  return perkCards[bnd.title] || generic || PerkCard
}

const bindingsDLC = computed(() => !settings.value.allChosenAuthors[0]
  ? bindings
    .concat(DLCbindings
      .filter(perk => !settings.value.allChosenAuthors.includes(perk.dlc)))
  : bindings)
const lureExpansionsDLC = computed(() => !settings.value.allChosenAuthors[0]
  ? lureExpansions
    .concat(DLClureExpansions
      .filter(perk => !settings.value.allChosenAuthors.includes(perk.dlc)))
  : lureExpansions)
const luresDLC = computed(() => !settings.value.allChosenAuthors[0]
  ? lures
    .concat(DLClures
      .filter(perk => !settings.value.allChosenAuthors.includes(perk.dlc)))
  : lures)
const otherDLC = computed(() => !settings.value.allChosenAuthors[0]
  ? otherControls
    .concat(DLCotherControls
      .filter(perk => !settings.value.allChosenAuthors.includes(perk.dlc)))
  : otherControls)

const bindingByType = computed(() => {
  const res = {
    Stamp: [] as Binding[],
    Jewelry: [] as Binding[],
    Ritual: [] as Binding[],
    Symbiote: [] as Binding[],
    Shroud: [] as Binding[],
  }
  bindingsDLC.value.forEach(x => x.type ? res[x.type].push(x) : null)
  return res
})

onMounted(() => useTooltips())
watch(activeType, () => nextTick(useTooltips))

const params = useUrlSearchParams('history')

if (params.q) activeType.value = `${params.q}`

onBeforeRouteUpdate((to, from, next) => {
  if (to.query.q)
    activeType.value = `${to.query.q}`

  setTimeout(next, 1)
})

const allBindings = computed(() => {
  const res: any = {}
  binding.value.forEach(x => res[x.title] = x)
  return res
})

const allLures = computed(() => {
  const res: any = {}
  luresBought.value.forEach(x => res[x.title] = x)
  return res
})

const allOther = computed(() => {
  const res: any = {}
  otherPerks.value.forEach(x => res[x.title] = x)
  return res
})

function chooseElement(bnd: Binding) {
  showElements.value = true
  currentBinding.value = bnd
}

function toggleCurrentElement(title: string, custom: string) {
  if (currentBinding.value) {
    if (currentBinding.value.element === title)
      currentBinding.value.element = ''
    else
      currentBinding.value.element = title
  }
  const saveBin = { cost: 96, title: 'Elemental Shroud', freebies: { talentPerks: ['Body Talent', 'Soul Talent'] } }
  if (custom) saveBin.target = custom
  chooseBinding(currentBinding.value, saveBin)
  toggleElements()
}

function generateProps(perk: Binding) {
  const props = {}
  if (perk.increment) props.increment = !!perk.increment
  if (perk.title === 'Prismatic Shroud') props.elementList = shroudElements.map(x => ({ flavor: x.title }))
  return props
}
</script>
