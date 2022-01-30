<template>
  <div
    class="flex justify-between border border-gray-400 rounded p-1"
    :class="char.sold ? 'text-gray-600': ''"
  >
    <div class="flex gap-2 w-full">
      <img
        v-if="image && !settings.allImg"
        :data-src="image"
        :alt="char.name"
        class="rounded object-cover max-h-[140px] max-w-[90px] object-top"
      >
      <div class="flex flex-col w-full">
        <div class="flex">
          <Input v-if="editMode" v-model="char.name" placeholder="Character name" />
          <router-link v-else :to="`/companions/?name=${char.name}`" class="hover:underline">
            {{ char.name }}<span class="text-gray-500 text-sm"> ({{ methods[char.method] }})</span>
          </router-link>
          <span v-if="char.sold" class="text-red-500 ml-1">SOLD</span>
          <span class="text-gray-500 ml-auto whitespace-nowrap"> Tier: <span class="text-green-500">{{ char.tier }}</span></span>
          <span
            v-if="char.tier !== char.priceTier"
            class="text-gray-500 ml-2 whitespace-nowrap"
          > Original: <span class="text-green-500">{{ char.priceTier }}</span></span>
        </div>
        <span class="text-gray-500">From: <span class="text-gray-400">{{ char.world }}</span></span>
        <div class="flex flex-wrap gap-2 mb-1">
          <NumberInput
            v-if="!char.sold"
            v-model="char.tier"
            theme="dark"
            :max="11"
            label="Tier"
            class="whitespace-nowrap"
          />
          <NumberInput
            v-if="!char.sold && editMode"
            v-model="char.priceTier"
            theme="dark"
            :max="11"
            label="Original Tier"
            class="whitespace-nowrap"
          />
          <Variants
            v-if="!char.sold && char.method !== 'unbound'"
            v-model="char.sex"
            theme="dark"
            label="Sex"
            :list="['F', 'M', 'O']"
          />
          <Variants
            v-if="!char.sold && char.method !== 'unbound'"
            v-model="char.role"
            theme="dark"
            :list="['Member', 'Familiar']"
          />
        </div>

        <div>
          <span
            v-if="talentsList.length > 0"
            class="text-gray-500"
          >Talents:
            <Enum
              color="text-blue-400 hover:text-blue-300"
              class="text-gray-100"
              :list="talentsList"
              path="/talents/talent"
              empty-message="No Talents"
            />
          </span>
          <span
            v-if="perksList.length > 0"
            class="text-gray-500"
          >Perks:
            <Enum
              color="text-blue-400 hover:text-blue-300"
              class="text-gray-100"
              :list="perksList"
              path="/talents/specific"
              empty-message="No Perks"
            />
          </span>
          <span
            v-if="specificList.length > 0"
            class="text-gray-500"
          >Specific:
            <Enum
              color="text-blue-400 hover:text-blue-300"
              class="text-gray-100"
              :list="specificList"
              path="/talents/specific"
              empty-message="No Waifu Perks"
            />
          </span>
        </div>

        <div v-if="!char.sold" class="flex gap-2 mt-auto justify-end">
          <Button
            v-if="flags.chargen"
            label="undo"
            size="Small"
            bg-color="bg-blue-500"
            @click="$emit('undo', char.uid)"
          />
          <Button
            v-if="['capture'].includes(char.method)"
            :label="`sell ${char.tier === 11 ? '1 ticket' : Math.floor(CHAR_COSTS[char.tier - 1] * 0.2) + 'c'}`"
            size="Small"
            bg-color="bg-red-500"
            @click="sellCompanion(char.uid)"
          />
          <Button
            v-if="['buy', 'used', 'yoink'].includes(char.method)"
            :label="`return ${char.priceTier === 11 ? '1 ticket' : Math.round(CHAR_COSTS[char.priceTier - 1] * 0.8) + 'c'}`"
            size="Small"
            bg-color="bg-yellow-600"
            @click="sellCompanion(char.uid)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from '@vue/runtime-core'
import { CHAR_COSTS } from '~/data/constants'
import { SavedChar } from '~/store/chargen'
import { useStore } from '~/store/store'

const props = defineProps({
  char: {
    type: Object as PropType<SavedChar>,
    default: () => {},
  },
  image: {
    type: String,
    default: '',
  },
  editMode: {
    type: Boolean,
    default: false,
  },
  perks: {
    type: Object,
    default: () => ({}),
  },
})

const methods = {
  buy: 'Bought',
  capture: 'Captured',
  used: 'Used',
  yoink: 'Yoinked',
  unbound: 'Unbound',
  steal: 'Stolen',
  you: 'It\'s you',
}

const { flags, settings } = useStore()

const emit = defineEmits(['sell', 'undo'])

const talentsList = computed(() => {
  return props.perks.talents || []
})
const perksList = computed(() => {
  return props.perks.perks || []
})
const specificList = computed(() => {
  return props.perks.specific || []
})

function sellCompanion(uid: number) {
  emit('sell', uid)
}

</script>
