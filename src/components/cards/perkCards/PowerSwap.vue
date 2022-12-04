<template>
  <GenericPerkCard v-bind="{perk, isActive: !!savedPerk.title, savedPerk}" @pickPerk.stop>
    <template #title>
      <Button label="Buy" bg-color="bg-blue-500" size="Small" class="mx-1" @click.stop="showBuyPerk = true" />
    </template>
    <template #underDesc>
      <Modal v-if="showBuyPerk" label="Power Swap" @click="showBuyPerk = false">
        <div id="powerSwap" ref="charList" class="min-h-0 overflow-y-auto max-h-[75vh] scrollbar grid md:grid-cols-2 gap-2 p-1">
          <div class="flex gap-2 w-full rounded bg-gray-300 dark:bg-gray-800 p-1">
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
                idd="idyou"
                :model-value="startingOrigin.swap?.name"
                placeholder="Character name"
                class="flex-grow"
                error-message=""
                @onChar="buyPowerswapForYou"
              />
              <Select
                v-model="startingOrigin.hr"
                :options="heritageOptions"
                placeholder="Archetype"
              />
              <div class="flex gap-2">
                <div>
                  T{{ startingOrigin.tier || 1 }} <span class="font-bold">-></span> T{{ startingOrigin?.swap?.tier || 0 }} =
                  <span :class="((startingOrigin?.swap?.cost || 0) - (startingOrigin?.swap?.refund || 0)) <= 0 ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'">{{ ((startingOrigin?.swap?.cost || 0) - (startingOrigin?.swap?.refund || 0)) }}</span> credits
                </div>
                <Button
                  icon="ant-design:clear-outlined"
                  bg-color="bg-orange-500"
                  label=""
                  class="self-center"
                  @click="() => delete startingOrigin.swap"
                />
              </div>
            </div>
          </div>
          <div
            v-for="companion in companionsComp"
            :key="companion.uid"
            class="flex gap-2 w-full rounded bg-gray-300 dark:bg-gray-800 p-1"
          >
            <img
              v-if="(allCharsObject[companion.originUID || companion.uid] && allCharsObject[companion.originUID || companion.uid].i) || companion.image && !settings.allImg"
              :data-src="companion.image || imageLink(companion.originUID || companion.uid)"
              :alt="companion.name"
              class="rounded object-cover w-1/4 object-top"
              @load="setHeight"
            >
            <div class="flex flex-col gap-2 w-full">
              <h3 class="flex gap-2 text-sm">
                {{ companion.name }}
                <span v-if="companion.world" class="text-gray-500">({{ companion.world }})</span>
              </h3>
              <CharacterInput
                :model-value="companion.swap?.name"
                :idd="'id'+companion.uid"
                append-id="powerSwap"
                placeholder="Character name"
                class="flex-grow"
                error-message=""
                @onChar="(char: DBCharacter) => buyPowerswap(char, companion)"
              />
              <div class="flex gap-2 justify-between">
                <div>
                  T{{ companion.tier }} <span class="font-bold">-></span> T{{ companion?.swap?.tier || 0 }} =
                  <span
                    :class="((companion?.swap?.cost || 0) - (companion?.swap?.refund || 0)) <= 0 ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'"
                  >{{ ((companion?.swap?.cost || 0) - (companion?.swap?.refund || 0)) }}
                  </span> credits
                </div>
                <Button
                  icon="ant-design:clear-outlined"
                  bg-color="bg-orange-500"
                  label=""
                  title="clear"
                  class="self-center"
                  @click="() => {delete companion.swap}"
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
import { DBCharacter } from 'global'
import { CHAR_COSTS, useAllChars } from '~/data/constants'
import { lazyLoadImg, imageLink } from '~/logic'
import { SavedChar } from '~/store/chargen'
import { useStore } from '~/store/store'

const { companionsComp, settings, startingOrigin } = useStore()

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

const heritageOptions = [
  { label: 'None', value: '' },
  { label: 'Dragon', value: 'dr' },
  { label: 'Transhuman', value: 'th' },
  { label: 'Outsider', value: 'ou' },
]

const showBuyPerk = ref(false)
const charList = ref<HTMLElement | null>(null)

const { allCharsObject } = useAllChars()

function buyPowerswap(char: DBCharacter, companion: SavedChar) {
  companion.swap = {
    tier: char.t,
    uid: char.u,
    name: char.n,
    cost: char.t !== 11 ? CHAR_COSTS[char.t] : 0,
    refund: companion.tier !== 11 ? companion.method !== 'capture' ? CHAR_COSTS[companion.tier] : (char.t >= companion.tier ? CHAR_COSTS[companion.tier] : CHAR_COSTS[char.t]) : 0,
  }
}

function buyPowerswapForYou(char: DBCharacter) {
  startingOrigin.value.swap = {
    tier: char.t,
    uid: char.u,
    name: char.n,
    cost: CHAR_COSTS[char.t],
    refund: CHAR_COSTS[startingOrigin.value.tier || 1],
  }
}

function setHeight(event: Event) {
  event.target.style['max-height'] = `${event.target.clientWidth * 1.7 || 90}px`
}

watch(showBuyPerk, () => lazyLoadImg(charList.value), { flush: 'post' })

</script>
