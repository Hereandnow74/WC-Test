<template>
  <GenericPerkCard
    v-bind="{perk, isActive: !!savedPerk.title, savedPerk}"
  >
    <template #title>
      <Button label="Buy" bg-color="bg-blue-500" size="Small" class="mx-1" @click.stop="showBuyPerk = true" />
    </template>
    <template #cost>
      (Cost: <span text="green-600 dark:green-300">{{ displayedCost }}</span>)
    </template>
    <template #underDesc>
      <Modal v-if="showBuyPerk" :label="`Total cost: ${displayedCost}`" @click="showBuyPerk = false">
        <div ref="charList" class="min-h-0 overflow-y-auto max-h-[75vh] scrollbar grid md:grid-cols-2 gap-2 p-1">
          <div
            class="flex gap-2 w-full min-h-0 rounded bg-gray-300 dark:bg-gray-800 p-1"
          >
            <img
              :data-src="startingOrigin.image || '/img/Contractor.jpg'"
              alt="Your image"
              class="rounded object-cover w-1/4 object-top"
              @load="setHeight"
            >
            <div class="flex flex-col gap-2 flex-grow">
              <h3 class="flex gap-2 text-sm">
                {{ startingOrigin.character || 'You' }}
              </h3>

              <CharacterInput
                v-model="swapPower[startingOrigin.character || 'You'].name"
                idd="idyou"
                placeholder="Character name"
                class="flex-grow"
                error-message=""
                @updateTier="swapPower[startingOrigin.character || 'You'].swap = $event"
              />
              <div class="flex gap-2">
                <NumberInput
                  :model-value="startingOrigin.tier || 1"
                  :min="0"
                  :max="10"
                  label="Tier"
                  class="whitespace-nowrap"
                />
                <NumberInput
                  v-model="swapPower[startingOrigin.character || 'You'].swap"
                  :min="0"
                  :max="10"
                  label="Swap to"
                  class="whitespace-nowrap"
                />
                <Button icon="ant-design:clear-outlined" bg-color="bg-orange-500" label="" class="self-center" @click="() => swapPower[startingOrigin.character || 'You'].swap = 0" />
              </div>
            </div>
          </div>
          <div
            v-for="companion in companionsWithoutSold"
            :key="companion.uid"
            class="flex gap-2 w-full min-h-0 rounded bg-gray-300 dark:bg-gray-800 p-1"
          >
            <img
              v-if="allChars[companion.uid].i && !settings.allImg"
              :data-src="imageLink(allChars[companion.uid].i, companion.uid)"
              :alt="companion.name"
              class="rounded object-cover w-1/4 object-top"
              @load="setHeight"
            >
            <div class="flex flex-col gap-2">
              <h3 class="flex gap-2 text-sm">
                {{ companion.name }}
                <span class="text-gray-500">({{ companion.world }})</span>
              </h3>
              <CharacterInput
                v-model="swapPower[companion.name].name"
                :idd="'id'+companion.uid"
                placeholder="Character name"
                class="flex-grow"
                error-message=""
                @updateTier="swapPower[companion.name].swap = $event"
              />
              <div class="flex gap-2">
                <NumberInput
                  :model-value="companion.tier"
                  :min="0"
                  :max="10"
                  placeholder="Tier"
                />
                <NumberInput
                  v-model="swapPower[companion.name].swap"
                  :min="0"
                  :max="10"
                  placeholder="Tier"
                />
                <Button
                  icon="ant-design:clear-outlined"
                  bg-color="bg-orange-500"
                  label=""
                  title="clear"
                  class="self-center"
                  @click="() => swapPower[companion.name].swap = 0"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </template>
  </GenericPerkCard>
</template>

<script lang='ts' setup>
//                  @updateUID="(uid: number) => swapPower[companion.name].uid = uid"

import { DBCharacter } from 'global'

import { CHAR_COSTS, getAllCharsObject } from '~/data/constants'
import { lazyLoadImg, imageLink } from '~/logic'
import { useStore } from '~/store/store'

const { companionsWithoutSold, settings, startingOrigin } = useStore()

const props = defineProps({
  perk: {
    type: Object,
    default: () => ({}),
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  savedPerk: {
    type: Object,
    default: () => ({}),
  },
  elementList: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['pickPerk'])

// const powers = reactive<Record<string, string[]>>(props.savedPerk?.complex?.reduce((a, x) => {
//   if (a[x.target]) a[x.target].push(x.flavor)
//   else a[x.target] = [x.flavor]
//   return a
// }, {}) || {})

interface CharPower {
  name: string
  tier: number
  swap: number
  cap: boolean
}

const swapPower = reactive<Record<string, CharPower>>(companionsWithoutSold.value.reduce((a, x) => {
  a[x.name] = { name: '', tier: x.tier, swap: 0, cap: x.method === 'capture' }
  return a
}, {}) || {})

swapPower[startingOrigin.value.character || 'You'] = { name: '', tier: startingOrigin.value.tier || 1, swap: 0 }

props.savedPerk?.complex?.forEach((x) => {
  swapPower[x.target].name = x.flavor
})

const showBuyPerk = ref(false)
const charList = ref<HTMLElement | null>(null)

const allChars = ref<Record<number, DBCharacter>>({})
getAllCharsObject().then(chars => allChars.value = chars)

const displayedCost = computed(() => {
  return Object.values(swapPower).reduce((a, x) => {
    // console.log(Math.max(NaN, 0) || 0)
    if (x.cap)
      a += Math.max((CHAR_COSTS[x.swap - 1] - CHAR_COSTS[x.tier - 1]) || 0, 0)
    else
      a += (CHAR_COSTS[x.swap - 1] - CHAR_COSTS[x.tier - 1]) || 0
    return a
  }, 0)
})

function sendPerk() {
  const obj = {
    title: props.perk.title,
  }

  obj.complex = Object.entries(swapPower).filter(x => x[1].swap !== 0).reduce((a, x) => {
    a.push({ target: x[0], flavor: x[1].name })
    return a
  }, [] as {target: string; flavor: string}[])

  obj.count = obj.complex.length
  obj.cost = displayedCost.value

  emit('pickPerk', props.perk, obj)
}

watch(swapPower, sendPerk)

function setHeight(event: Event) {
  event.target.style['max-height'] = `${event.target.clientWidth * 1.7 || 90}px`
}

watch(showBuyPerk, () => lazyLoadImg(charList.value), { flush: 'post' })

</script>
