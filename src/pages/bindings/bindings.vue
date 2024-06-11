<template>
  <div class="sm:p-2">
    <Desc class="p-2 mb-4 max-w-4xl bg-warm-gray-200 dark:bg-warm-gray-800 mx-auto" :desc="desc" />
    <div class="flex flex-wrap gap-x-4 gap-y-2 justify-center mb-4">
      <template
        v-for="type in Object.keys(bindingByType)"
        :key="type"
      >
        <div
          v-if="bindingByType[type].length"
          class="px-2 py-1 border-2 rounded cursor-pointer hover:border-orange-400"
          :class="[activeType === type ? 'border-orange-400': '', bindingCounts[type] ? 'border-green-600': '']"
          @click="activeType = type"
        >
          <h3 class="font-semibold">
            {{ type }}
          </h3>
          <div class="text-gray-700 dark:text-gray-300">
            Total perks: <span v-if="bindingCounts[type]" class="text-blue-700 dark:text-blue-300">{{ bindingCounts[type] }} /</span> <span class="text-blue-700 dark:text-blue-300">{{ bindingByType[type].length }}</span>
          </div>
        </div>
      </template>
    </div>

    <Desc v-if="activeType === 'Tantric Arts'" class="p-2 mb-4 max-w-4xl bg-warm-gray-200 dark:bg-warm-gray-800 mx-auto" :desc="tantricDesc" />

    <div v-if="!legacyMode && !noBindings && binding.length" class="w-max mx-auto mb-2 flex gap-2">
      You currently have [<strong>{{ binding[0].title }}</strong>] <Button size="Small" bg-color="bg-red-600" label="Delete" @click="sellAllBindings" />
    </div>

    <div
      class="column-gap"
      :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
    >
      <div
        v-if="legacyMode"
        id="No Bindings"
        class="mb-2 p-2 bg-light-400 dark:bg-rose-900 column-block max-w-[600px] hover:(yellow-100 dark:bg-rose-800) cursor-pointer"
        @click="sellAllBindings"
      >
        <img
          v-if="settings.perkImages"
          ref="rideImg"
          class="rounded"
          src="https://i.ibb.co/gvcTLF5/No-Bindings.jpg"
          alt="No Bindings Img"
        >
        <h3 class="text-center text-xl px-2 relative">
          <span>No Bindings</span>
          <fa-solid:check v-if="noBindings" class="text-green-500 absolute top-1 right-1" />
        </h3>
        <Desc
          desc="None of your companions or familiars will be affected by any of the effects common to all company bindings. This is your warning.
          <p>If you purchase and use a real binding method later, the discount will disappear and you will go into debt. You do not need to bind your previously- purchased companions immediately.</p>
          <p>Capturing any companion without bindings will award you the standard capture value of her original tier, before this option’s purchase discount. It will also give her a dormant tattoo, which you can activate at any time by using the Stamp (should you purchase it) or removing a higher Binding. If you instead switch to this option after already having bound companions, the basic effects common to all bindings will persist in your companions or familiars until interactions or events change their minds naturally.</p>
          <p>This option does not affect the price of Substitute, Possess, or Power Swap.</p>"
        />
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
          class: bindingAvailable(bnd) ? 'bg-light-500 dark:bg-rose-900 hover:(bg-yellow-100 dark:bg-rose-800)'
            : 'bg-gray-200 dark:bg-gray-600',
          isActive: !!allBindings[bnd.title],
          savedPerk: allBindings[bnd.title],
          ...generateProps(bnd)
        }"
        @pickPerk="(a,b) => ['Elemental Shroud', 'Prismatic Shroud'].includes(bnd.title) ? null : chooseBinding(a,b)"
      >
        <template v-if="['Elemental Shroud', 'Prismatic Shroud'].includes(bnd.title)" #title>
          <Button size="Small" label="element" class="mx-1" @click.stop="chooseElement(bnd)" />
        </template>
      </component>
    </div>
    <template v-if="bindingsDLC.length">
      <h2 class="text-lg text-center">
        DLC Perks
      </h2>
      <DLCNote />
      <PerkCard
        v-for="bnd in bindingsDLC"
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
      </PerkCard>
    </template>
    <ShroudElements v-if="showElements" :current-binding="currentBinding" @click="showElements = false" @close="showElements = false" />
    <div class="h-8"></div>
  </div>
</template>

<script lang='ts' setup>
import { onBeforeRouteUpdate } from 'vue-router'
import { PerkFull } from 'global'
import { countBy } from 'lodash-es'
import { desc, symbioteRules, tantricDesc } from '~/data/binding'
import { useTooltips } from '~/logic/misc'
import { bindingAvailable, chooseBinding, deletePerk } from '~/logic'
import { useStore } from '~/store/store'
import { DLCbindings } from '~/data/DLCs'
import PerkCard from '~/components/cards/PerkCard.vue'
import GenericPerkCard from '~/components/cards/perkCards/GenericPerkCard.vue'
import { useFullPerks } from '~/logic/localPerks'
import { confirmDialog } from '~/logic/dialog'

const { binding, settings, legacyMode, noBindings } = useStore()
const [showElements] = useToggle()

const currentBinding = ref<PerkFull|null>(null)

const { bindings } = useFullPerks()

const bindingCard = (bnd: PerkFull) => {
  let generic = null
  if (!bnd.multiple && !bnd.waifu && !bnd.complex && bnd.element)
    generic = GenericPerkCard
  return generic || PerkCard
}

const bindingsDLC = computed(() => !settings.value.allChosenAuthors[0]
  ? DLCbindings.filter(perk => !settings.value.allChosenAuthors.includes(perk.dlc))
  : [])

const bindingByType = computed(() => {
  const res = { } as Record<string, PerkFull[]>

  bindings.value
    .forEach(x => x.type ? res[x.type] ? res[x.type].push(x) : res[x.type] = [x] : res.Other ? res.Other.push(x) : res.Other = [x])
  return res
})

const bindingCounts = computed(() => countBy(binding.value, x => x.type))

const activeType = ref<keyof typeof bindingByType.value>('Stamp')

onMounted(() => useTooltips())
watch(activeType, useTooltips, { flush: 'post' })

const params = useUrlSearchParams('history')

if (params.q) activeType.value = `${params.q}` as keyof typeof bindingByType.value

onBeforeRouteUpdate((to, from, next) => {
  if (to.query.q)
    activeType.value = `${to.query.q}`as keyof typeof bindingByType.value

  setTimeout(next, 1)
})

const allBindings = computed(() => {
  const res: any = {}
  binding.value.forEach(x => res[x.title] = x)
  return res
})

function chooseElement(bnd: PerkFull) {
  showElements.value = true
  currentBinding.value = bnd
}

function generateProps(perk: PerkFull) {
  const props = {}
  if (perk.increment) props.increment = !!perk.increment
  // if (perk.title === 'Prismatic Shroud') props.elementList = shroudElements.map(x => ({ flavor: x.title }))
  return props
}

async function sellAllBindings() {
  if (await confirmDialog('This action will return all currently purchased binding perks, proceed?', 'confirm'))
    deletePerk(binding.value, () => false)
    // binding.value.splice(0)
}
</script>
