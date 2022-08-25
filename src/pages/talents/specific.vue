<template>
  <div class="flex flex-col gap-2 pb-8 sm:p-2">
    <Desc :desc="genericDesc" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <div>
      <Toggle v-model="filterAvailable" label="Show only available ones" />
    </div>
    <div
      ref="specificList"
      class="grid 4xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-2 pb-8 justify-center"
      :class="{'!grid-cols-1': buildLayout}"
    >
      <SpecificPerkCard
        v-for="waifu in filterAvailable ? specificPerksFiltered : specificPerksWithDLC"
        :key="waifu.uid"
        :waifu-perk="waifu"
        @changeModalImage="(img: string) => modalImage = img"
      />
    </div>
    <div v-if="showModal && modalImage" class="fixed inset-0 bg-black bg-opacity-10 flex place-content-center z-50" @click="(showModal = false, modalImage = '')">
      <div class="overflow-auto max-h-screen max-w-screen flex place-content-center">
        <img class="object-cover" :src="modalImage" alt="full image">
      </div>
    </div>
    <div class="h-8"></div>
  </div>
</template>

<script lang='ts' setup>
import { isArray } from 'lodash'
import { waifu_perks, DLCwaifu_perks } from '~/data/waifu_perks'
import { genericDesc } from '~/data/talents'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'
import { buildLayout } from '~/logic/toggles'

const { settings, companionsUIDs } = useStore()

const showModal = ref(false)
const specificList = ref<HTMLElement|null>(null)
const modalImage = ref('')

const filterAvailable = ref(false)

const specificPerksWithDLC = computed(() => !settings.value.allChosenAuthors[0]
  ? waifu_perks
    .concat(DLCwaifu_perks
      .filter(perk => perk.dlc && !settings.value.allChosenAuthors.includes(perk.dlc)))
  : waifu_perks)

const specificPerksFiltered = computed(() => specificPerksWithDLC.value.filter((perk) => {
  let res = false
  if (isArray(perk.waifuUID))
    res = perk.waifuUID.some(val => companionsUIDs.value[val])
  else
    res = perk.waifuUID ? companionsUIDs.value[perk.waifuUID] : false
  return res
}))

onMounted(() => useTooltips())

watch(modalImage, () => showModal.value = true)
</script>
