<template>
  <div ref="SWPContainer" class="flex flex-col gap-2 pb-8 sm:p-2">
    <Desc :desc="genericDesc" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <div class="flex gap-2 mx-auto">
      <Button size="Small" bg-color="bg-orange-500" label="Propose Waifu Perk" @click="showAddWaifuPerk = true" />
      <Toggle v-model="filterAvailable" label="Show only available ones" />
      <div class="flex items-center gap-1">
        Sort by:
        <div
          class="flex items-center bg-gray-200 dark:bg-gray-700 px-1 rounded cursor-pointer"
          :class="sortAdded ? 'border border-red-500' : ''"
          title="Show new SWP's first"
          @click="sortAdded = !sortAdded"
        >
          <bi:calendar2-date class="inline-block rounded" />
        </div>
      </div>
    </div>
    <div
      ref="specificList"
      class="h-screen grid 4xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-2 pb-8 justify-center overflow-y-auto min-h-0 scrollbar"
      :class="{'!grid-cols-1': buildLayout}"
    >
      <SpecificPerkCard
        v-for="waifu in filterAvailable ? specificPerksFiltered : infiniteSWPs"
        :key="waifu.uid"
        :waifu-perk="waifu"
        :class="filterAvailable && specificPerksFiltered.length === 1 ? 'self-start' : ''"
        @changeModalImage="(img: string) => modalImage = img"
      />
    </div>
    <div v-if="showModal && modalImage" class="fixed inset-0 bg-black bg-opacity-10 flex place-content-center z-50" @click="(showModal = false, modalImage = '')">
      <div class="overflow-auto max-h-screen max-w-screen flex place-content-center items-center">
        <img class="object-contain h-max w-max" :src="modalImage" alt="full image">
      </div>
    </div>
    <div class="h-8"></div>
  </div>
</template>

<script lang='ts' setup>
import { isArray } from 'lodash-es'
import { waifu_perks, DLCwaifu_perks } from '~/data/waifu_perks'
import { genericDesc } from '~/data/talents'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'
import { buildLayout, showAddWaifuPerk } from '~/logic/toggles'
import { localPerks } from '~/logic/localPerks'

const { settings, companionsUIDs, companionsByUID, startingOrigin } = useStore()

const showModal = ref(false)
const specificList = ref<HTMLElement|null>(null)
const SWPContainer = ref<HTMLElement|null>(null)
const modalImage = ref('')

const sortAdded = ref(false)

const filterAvailable = ref(false)

const specificPerksWithDLC = computed(() => !settings.value.allChosenAuthors[0] || settings.value.allDLCTypes[0]
  ? waifu_perks
    .concat(DLCwaifu_perks
      .filter(perk => perk.dlc && !settings.value.allChosenAuthors.includes(perk.dlc)))
  : waifu_perks)

const specificPerksWithLocal = computed(() => specificPerksWithDLC.value.concat(localPerks.value['Specific waifu perk'] || []))

const hash = window.location.hash
if (hash) filterAvailable.value = true
const specificPerksFiltered = computed(() => specificPerksWithLocal.value.filter((perk) => {
  let res = false
  if (hash)
    return perk.title === decodeURIComponent(hash.slice(1))
  if (companionsByUID.value[perk.uid])
    return true
  if (isArray(perk.waifuUID))
    res = perk.waifuUID.some(val => companionsUIDs.value[val] || companionsByUID.value[val] || startingOrigin.value.uid === val || startingOrigin.value.swap?.uid === val || startingOrigin.value.perk?.uid === val)
  return res
}))

onMounted(() => useTooltips())

watch(modalImage, () => showModal.value = true)

const sortedSWPs = computed(() => sortAdded.value ? [...specificPerksWithLocal.value].reverse() : specificPerksWithLocal.value)

const startingSWPCount = 10
const infiniteSWPs = ref(sortedSWPs.value.slice(0, startingSWPCount))
watch(sortedSWPs, () => infiniteSWPs.value = sortedSWPs.value.slice(0, startingSWPCount))

useInfiniteScroll(
  specificList,
  () => {
    infiniteSWPs.value.push(...sortedSWPs.value.slice(infiniteSWPs.value.length, infiniteSWPs.value.length + startingSWPCount))
  },
  { distance: 10 },
)
</script>
