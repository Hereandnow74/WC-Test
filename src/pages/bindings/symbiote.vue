<template>
  <div class="sm:p-2">
    <div class="mb-4 max-w-4xl mx-auto">
      <Desc :desc="alternativeTheming" class="bg-amber-200 text-gray-800 text-sm md:text-base w-3/5 float-right mt-8 mx-2 border-3 border-gray-900" />
      <Desc class="p-2 mb-4 max-w-4xl bg-warm-gray-200 dark:bg-warm-gray-800 mx-auto" :desc="symbioteQueen" />
    </div>

    <Desc class="p-2 mx-auto mb-4 max-w-4xl bg-warm-gray-200 dark:bg-warm-gray-800" :desc="expansions" />
    <div v-if="!legacyMode && !noBindings" class="w-max mx-auto mb-2 flex gap-2">
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
      <PerkCard
        v-for="bnd in symbioteBinding"
        :key="bnd.title"
        v-bind="{
          perk: bnd,
          class: symbioteAvailable(bnd) ? 'bg-light-500 dark:bg-rose-900 hover:(bg-yellow-100 dark:bg-rose-800)'
            : 'bg-gray-200 dark:bg-gray-600',
          isActive: !!allBindings[bnd.title],
          savedPerk: allBindings[bnd.title],
        }"
        @pickPerk="(...args) => chooseBinding(...args, symbioteAvailable)"
      />
    </div>

    <Desc class="p-2 mx-auto my-4 max-w-4xl bg-warm-gray-200 dark:bg-warm-gray-800" :desc="phasesDesc" />
    <div
      class="column-gap"
      :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
    >
      <PerkCard
        v-for="bnd in phases"
        :key="bnd.title"
        v-bind="{
          perk: bnd,
          class: symbioteAvailable(bnd) ? 'bg-light-500 dark:bg-rose-900 hover:(bg-yellow-100 dark:bg-rose-800)'
            : 'bg-gray-200 dark:bg-gray-600',
          isActive: !!allBindings[bnd.title],
          savedPerk: allBindings[bnd.title],
        }"
        @pickPerk="(...args) => chooseBinding(...args, symbioteAvailable)"
      />
    </div>

    <Desc class="p-2 mx-auto my-4 max-w-4xl bg-warm-gray-200 dark:bg-warm-gray-800" :desc="symbioteStructures" />
    <Desc class="p-2 mx-auto my-4 max-w-4xl bg-warm-gray-200 dark:bg-warm-gray-800" :desc="creep" />
    <div
      class="column-gap"
      :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
    >
      <SymbioteBuildingCard
        v-for="bnd in symBuildings"
        :key="bnd.uid"
        v-bind="{
          perk: bnd,
          class: symbioteAvailable(bnd) ? 'bg-light-500 dark:bg-rose-900 hover:(bg-yellow-100 dark:bg-rose-800)'
            : 'bg-gray-200 dark:bg-gray-600',
          isActive: !!allBindings[bnd.title],
          savedPerk: allBindings[bnd.title],
        }"
        @pickPerk="(perk, saveData) => chooseBinding(perk, saveData, symbioteAvailable)"
      />
    </div>

    <Desc class="p-2 mx-auto my-4 max-w-4xl bg-warm-gray-200 dark:bg-warm-gray-800" :desc="symbioteUnits" />
    <div
      class="column-gap"
      :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
    >
      <GenericPerkCard
        v-for="bnd in synUnits"
        :key="bnd.uid"
        v-bind="{
          perk: bnd,
          class: symbioteAvailable(bnd) ? 'bg-light-500 dark:bg-rose-900 hover:(bg-yellow-100 dark:bg-rose-800)'
            : 'bg-gray-200 dark:bg-gray-600',
          isActive: !!allBindings[bnd.title],
          savedPerk: allBindings[bnd.title],
        }"
        @pickPerk="(...args) => chooseBinding(...args, symbioteAvailable)"
      />
    </div>
    <div class="h-8"></div>
  </div>
</template>

<script lang='ts' setup>
import { useTooltips } from '~/logic/misc'
import { symbioteAvailable, chooseBinding, deletePerk } from '~/logic'
import { useStore } from '~/store/store'
import { confirmDialog } from '~/logic/dialog'
import { symbioteQueen, symbioteUnits, alternativeTheming, symbioteBinding, symBuildings, synUnits, expansions, symbioteStructures, creep, phasesDesc, phases } from '~/data/symbiote'

const { binding, settings, legacyMode, noBindings } = useStore()

onMounted(() => useTooltips())

const allBindings = computed(() => {
  const res: any = {}
  binding.value.forEach(x => res[x.title] = x)
  return res
})

async function sellAllBindings() {
  if (await confirmDialog('This action will return all currently purchased binding perks, proceed?', 'confirm'))
    deletePerk(binding.value, () => false)
    // binding.value.splice(0)
}
</script>
