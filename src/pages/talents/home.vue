<template>
  <div class="sm:p-2">
    <Desc :desc="homeDesc" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <div
      class="column-gap pb-8"
      :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
    >
      <PerkCard
        v-for="homePerk in homes"
        :key="homePerk.title"
        :perk="homePerk"
        :bg="homeAvailable(homePerk) ? 'yellow-200 dark:emerald-900 hover:(yellow-100 dark:emerald-800)'
          : 'gray-200 dark:gray-600'"
        :is-active="!!allHomes[homePerk.title]"
        :saved-perk="allHomes[homePerk.title]"
        @pickPerk="chooseHome"
      >
        <template v-if="homePerk.title === 'Sweet Home Expansion'" #title="titleProps">
          [<span class="text-violet-700 dark:text-violet-400">
            {{ (15.2 * Math.pow(2, titleProps.count || 0)).toLocaleString() }} km<sup>2</sup>
          </span>]
        </template>
      </PerkCard>
    </div>
    <template v-if="homesDLC.length">
      <h2 class="text-2xl text-center">
        DLC Home perks
      </h2>
      <DLCNote />
      <div
        class="column-gap pb-8"
        :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
      >
        <PerkCard
          v-for="homePerk in homesDLC"
          :key="homePerk.title"
          :perk="homePerk"
          :bg="homeAvailable(homePerk) ? 'yellow-200 dark:emerald-900 hover:(yellow-100 dark:emerald-800)'
            : 'gray-200 dark:gray-600'"
          :is-active="!!allHomes[homePerk.title]"
          :saved-perk="allHomes[homePerk.title]"
          @pickPerk="chooseHome"
        >
        </PerkCard>
      </div>
    </template>
    <h2 class="text-2xl text-center">
      Demiplane & Dungeons perks
    </h2>
    <Desc :desc="demdunDesc" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <Desc :desc="laws" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <div
      class="column-gap pb-8"
      :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
    >
      <component
        :is="homePerk.title === 'Demiplane' ? DemDun : PerkCard"
        v-for="homePerk in demiplane"
        :key="homePerk.title"
        :perk="homePerk"
        :bg="homeAvailable(homePerk) ? 'yellow-200 dark:emerald-900 hover:(yellow-100 dark:emerald-800)'
          : 'gray-200 dark:gray-600'"
        :is-active="!!allHomes[homePerk.title]"
        :saved-perk="allHomes[homePerk.title]"
        @pickPerk="chooseHome"
      >
      </component>
    </div>
    <Desc id="devotion" :desc="devotion" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <div
      class="column-gap pb-8"
      :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
    >
      <component
        :is="homePerk.title === 'Dungeons' ? DemDun : GenericPerkCard"
        v-for="homePerk in dungeon"
        :key="homePerk.title"
        :perk="homePerk"
        :bg="homeAvailable(homePerk) ? 'yellow-200 dark:emerald-900 hover:(yellow-100 dark:emerald-800)'
          : 'gray-200 dark:gray-600'"
        :is-active="!!allHomes[homePerk.title]"
        :saved-perk="allHomes[homePerk.title]"
        @pickPerk="chooseHome"
      >
        <template v-if="homePerk.title === 'Broadcast Room: Eye of Sauron'" #underDesc>
          <div class="flex gap-2 items-center pl-2">
            <span>Devotion</span>
            <NumberInput v-model="scryDevotion" :min="0" :max="5000" :increment="5" @click.stop />
            <span class="text-lg text-green-500 break-all">{{ Math.pow(2, Math.floor(scryDevotion / 5)).toLocaleString() }} km.</span>
          </div>
        </template>
      </component>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { DLChomes } from '~/data/DLCs'
import { homeDesc, demdunDesc, laws, dungeon, demiplane, devotion } from '~/data/demdun'
import { chooseHome, homeAvailable } from '~/logic'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'
import DemDun from '~/components/cards/perkCards/DemDun.vue'
import GenericPerkCard from '~/components/cards/perkCards/GenericPerkCard.vue'
import PerkCard from '~/components/cards/PerkCard.vue'
import { useFullPerks } from '~/logic/localPerks'

const { homePerks, settings } = useStore()
const { homes } = useFullPerks()

const scryDevotion = ref(0)

const homesDLC = computed(() => !settings.value.allChosenAuthors[0]
  ? DLChomes.filter(perk => !settings.value.allChosenAuthors.includes(perk.dlc))
  : [])

const allHomes = computed(() => {
  const res: any = {}
  homePerks.value.forEach(x => res[x.title] = x)
  return res
})

onMounted(() => useTooltips())

</script>
