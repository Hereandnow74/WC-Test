<template>
  <div
    :id="waifuPerk.title"
    class="relative p-2 max-w-screen-md cursor-pointer"
    border="3 gray-700"
    :class="[{'!border-green-600 !hover:border-amber-400': specificAvailable(waifuPerk)}, 'bg-amber-300 dark:(bg-gradient-to-tr to-amber-700 from-yellow-800)']"
    @click="pickWaifuPerk"
  >
    <img
      v-if="waifuPerk.image !=='' && !settings.allImg"
      ref="imageEl"
      class="max-h-[300px] max-w-1/2 object-contain ml-2 inline-block float-right border border-gray-900"
      :src="PLACEHOLDER_IMAGE"
      :data-src="waifuPerk.image"
      :alt="waifuPerk.title"
    />
    <img
      v-if="waifuPerk.image_2 && !settings.allImg"
      ref="imageEl2"
      class="max-h-[300px] max-w-1/2 object-contain ml-2 inline-block float-right border border-gray-900"
      :src="PLACEHOLDER_IMAGE"
      :data-src="waifuPerk.image_2"
      :alt="waifuPerk.title"
    />
    <icon-park-outline:full-screen-one
      v-if="waifuPerk.image !==''"
      class="absolute top-3 right-3 text-gray-200 hover:text-blue-400 cursor-pointer mix-blend-difference"
      @click.stop="() => emit('changeModalImage', waifuPerk.image)"
    />
    <div class="flex justify-between gap-2">
      <h3 class="flex gap-1 flex-wrap text-lg font-bold relative">
        {{ waifuPerk.title }}
        <Select
          v-if="waifuPerk.costVariants"
          v-model.number="waifuPerk.cost"
          :options="waifuPerk.costVariants"
          class="text-base"
          @click.stop
        />
        <Select
          v-if="Object.keys(waifuList).length >= 2"
          v-model="chosenWaifu"
          :options="Object.keys(waifuList)"
          class="text-base"
          @click.stop
        />
        <span v-if="waifuPerk.dlc && !waifuPerk.dlcLink" class="text-sm dark:text-gray-300 text-gray-600">(DLC by <span>{{ waifuPerk.dlc }}</span>)</span>
        <a
          v-if="waifuPerk.dlcLink"
          :href="waifuPerk.dlcLink"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm dark:text-gray-300 text-gray-600"
        >(DLC by {{ waifuPerk.dlc }})</a>
        <fa-solid:check
          v-if="findIndex(waifuPerks, { title: waifuPerk.title }) !== -1"
          class="inline text-green-500"
        />
        <fa-solid:check
          v-if="(companionsByUID[waifuPerk.uid] || startingOrigin.perk?.uid === waifuPerk.uid)"
          class="inline text-green-500"
        />
      </h3>
      <div class="flex gap-2 text-lg">
        <carbon:tag-group class="hover:text-green-500" @click="showTags = !showTags" />
      </div>
    </div>
    <div class="flex flex-col">
      <span class="font-bold">Waifu: </span>
      <span class="inline-flex gap-2 flex-wrap text-blue-600 dark:text-blue-300">
        <span v-for="wf, i in waifuPerk.waifu" :key="wf" class="flex gap-1 items-center">
          <router-link :to="isNumber(waifuPerk.waifuUID[i]) ? `/companions/?name=${wf}` : `#${wf}`" class="hover:underline">
            {{ wf }}
          </router-link>
          <span v-if="isNumber(waifuPerk.waifuUID[i]) && !companionsUIDs[waifuPerk.waifuUID[i]]" title="Buy companion" class="icon-text-btn bg-gray-600 rounded py-0.5 px-1 text-gray-200" @click.stop="buyAnyCompanion(waifuPerk.waifuUID[i])">
            <mdi:cart-variant />
          </span>
        </span>
        <span class="text-gray-800 dark:text-gray-200">from <span class="dark:text-violet-200 text-violet-900">{{ waifuPerk.from }}</span></span>
      </span>
    </div>
    <div class="flex gap-4">
      <span v-if="waifuPerk.costT"><span class="font-bold">IMG Cost:</span> {{ waifuPerk.costT }} </span>
      <span v-if="waifuPerk.cost"><span class="font-bold">Cost:</span> {{ waifuPerk.cost }} </span>
      <span v-if="waifuPerk.discount"><span class="font-bold">Refund:</span> {{ waifuPerk.discount }}</span>
      <span v-if="waifuPerk.tier"><span class="font-bold">Become:</span> T<TierDisplay :tier="waifuPerk.tier" /></span>
    </div>
    <Table
      v-if="waifuPerk.title === 'Lord Camelot'"
      class="float-right m-2"
      :headers="['Credits Paid','Saint Quartz']"
      :rows="gachaTable"
    />
    <template v-if="showTags">
      <div class="flex flex-wrap gap-1 text-sm justify-center text-gray-200 pt-2">
        <Tag
          v-for="tag in swpEntryTags"
          :key="tag.tag"
          :tag="tag"
        />
      </div>
      <div v-if="!swpEntryTags.length" class="text-center">
        No Tags
      </div>
    </template>
    <template v-else>
      <Desc :desc="waifuPerk.desc" class="p-0" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { find, findIndex, isNumber } from 'lodash-es'
import { WaifuPerk } from '~/data/waifu_perks'
import { chooseWaifuPerk, lazyLoadSingleImg, specificAvailable } from '~/logic'
import { useStore } from '~/store/store'
import { CHAR_COSTS, CHAR_COSTS_TICKET, PLACEHOLDER_IMAGE, useAllChars, waifuTags } from '~/data/constants'
import { buyAnyCompanion } from '~/logic/waifuLogic'

const props = defineProps({
  waifuPerk: {
    type: Object as PropType<WaifuPerk>,
    default: () => ({}),
  },
})

const { allCharsComp } = useAllChars()

const chosenWaifu = ref(props.waifuPerk.tier ? props.waifuPerk.waifu[0] : '')
const imageEl = ref<HTMLImageElement | null>(null)
const imageEl2 = ref<HTMLImageElement | null>(null)

const showTags = ref(false)

const emit = defineEmits(['changeModalImage'])

const gachaTable = [
  [1, 1],
  [2, 2],
  [5, 7],
  [10, 15],
  [20, 34],
  [50, 96],
  [100, 210],
  [200, 254],
  [500, 1251],
  [1000, 2677],
]

const { settings, waifuPerks, companionsByUID, companionsUIDs, startingOrigin } = useStore()

const swpEntry = computed(() => {
  return find(allCharsComp.value, { cs: props.waifuPerk.uid })
})

const swpEntryTags = computed(() => {
  if (swpEntry.value)
    return swpEntry.value.b.map(x => waifuTags[x] ? waifuTags[x] : { tag: x, color: 'bg-teal-600', desc: '' })
  else
    return []
})

const waifuList = computed(() => {
  let res = {} as Record<string, number>
  res = props.waifuPerk.waifu.reduce((all, waifu, i) => {
    if (companionsByUID.value[props.waifuPerk.waifuUID[i]] || companionsUIDs.value[props.waifuPerk.waifuUID[i]] || startingOrigin.value.uid === props.waifuPerk.waifuUID[i] || startingOrigin.value?.perk?.uid === props.waifuPerk.waifuUID[i] || startingOrigin.value?.swap?.uid === props.waifuPerk.waifuUID[i])
      all[waifu] = props.waifuPerk.waifuUID[i]
    return all
  }, {} as Record<string, number>)
  chosenWaifu.value = Object.keys(res)[0]
  return res
})

function pickWaifuPerk() {
  const charUID = waifuList.value[chosenWaifu.value]
  if (charUID) {
    // If its a normal perk
    if (!props.waifuPerk.tier) {
      chooseWaifuPerk(props.waifuPerk,
        { uid: props.waifuPerk.uid, title: props.waifuPerk.title, cost: props.waifuPerk.cost })
    }
    // Its a perk that change tier
    else {
      let char = isNumber(charUID) ? companionsUIDs.value[charUID] : companionsByUID.value[charUID]
      if (!char)
        char = startingOrigin.value
      if (char) {
        const tier = char.swap?.tier || char.priceTier || char.tier || 0
        if (char.perk) {
          if (char.perk.uid === props.waifuPerk.uid) { delete char.perk }
          else {
            char.perk = {
              uid: props.waifuPerk.uid,
              charUID: swpEntry.value?.u,
              title: props.waifuPerk.title,
              tier: props.waifuPerk.tier,
              cost: CHAR_COSTS[props.waifuPerk.tier] + (props.waifuPerk.uid === 'oHFJy' ? 20 : 0),
              costT: CHAR_COSTS_TICKET[props.waifuPerk.tier],
              refund: CHAR_COSTS[tier],
            }
          }
        }
        else {
          char.perk = {
            uid: props.waifuPerk.uid,
            charUID: swpEntry.value?.u,
            title: props.waifuPerk.title,
            tier: props.waifuPerk.tier,
            cost: CHAR_COSTS[props.waifuPerk.tier] + (props.waifuPerk.uid === 'oHFJy' ? 20 : 0),
            costT: CHAR_COSTS_TICKET[props.waifuPerk.tier],
            refund: CHAR_COSTS[tier],
          }
        }
      }
    }
  }
  else {
    if (companionsByUID.value[props.waifuPerk.uid])
      delete companionsByUID.value[props.waifuPerk.uid].perk
  }
}

onMounted(() => {
  if (imageEl.value)
    lazyLoadSingleImg(imageEl.value)
  if (imageEl2.value)
    lazyLoadSingleImg(imageEl2.value)
})

</script>
