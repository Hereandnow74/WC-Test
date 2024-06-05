<template>
  <div
    class="flex justify-between border-2 border-amber-500 rounded p-1"
  >
    <div class="flex gap-2 w-full">
      <img
        :src="startingOrigin.image || (char.i ? imageLink(char.u) : '/img/Contractor.jpg')"
        :alt="startingOrigin.character"
        class="rounded object-cover max-h-[140px] max-w-[90px] object-top w-24"
      >
      <div class="flex flex-col w-full">
        <div class="flex">
          <Input v-if="editMode" v-model="startingOrigin.name" placeholder="Your name" />
          <span v-else>
            {{ startingOrigin.name || startingOrigin.character }}
            <span class="text-gray-500 text-sm">
              (<span v-if="startingOrigin.title">{{ startingOrigin.title }}</span>)
            </span>
          </span>
          <span class="text-gray-500 ml-auto whitespace-nowrap"> Tier: <span class="text-green-500"><TierDisplay :tier="Math.max(startingOrigin.tier || 1, yourTier)" /></span></span>
        </div>
        <Input v-if="editMode" v-model="startingOrigin.character" class="mt-1" placeholder="Your possess name" />
        <span v-if="startingOrigin.w || char.w" class="text-gray-500">From: <span class="text-gray-400">{{ startingOrigin.w || char.w }} <span v-if="char.d">(<span class="text-gray-300">{{ char.d }}</span>)</span> </span></span>
        <div v-if="!infoMode" class="flex gap-2 mb-1 text-sm">
          <Tiers
            v-model="startingOrigin.tier"
            :dark="true"
            class="whitespace-nowrap"
          />
          <div v-if="flags.chargen && ['Substitute', 'Walk-In'].includes(startingOrigin.title) && noUC">
            Sex: {{ startingOrigin.sex }}
          </div>
          <Variants
            v-else
            v-model="startingOrigin.sex"
            theme="dark"
            label="Sex"
            :list="['F', 'M', 'O']"
          />
        </div>
        <div
          v-if="startingOrigin.swap"
          class="text-gray-400"
        >
          Power Swap to: <span class="text-gray-200">{{ startingOrigin.swap.name }}</span> [<span class="text-green-400">T{{ startingOrigin.swap.tier }}</span>]
        </div>
        <div
          v-if="startingOrigin.perk"
          class="text-gray-400"
        >
          Specific Waifu Perk: <span class="text-gray-200">{{ startingOrigin.perk.title }}</span> [<span class="text-green-400">T{{ startingOrigin.perk.tier }}</span>]
        </div>
        <div v-if="editMode">
          <Input v-model="startingOrigin.image" class="w-full" placeholder="Direct link to an image" />
          <Input v-model="startingOrigin.w" class="w-full mt-1" placeholder="Place you're from" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { findIndex } from 'lodash-es'
import { useAllChars } from '~/data/constants'
import { imageLink } from '~/logic'
import { useStore } from '~/store/store'

defineProps({
  editMode: {
    type: Boolean,
    default: false,
  },
  infoMode: {
    type: Boolean,
    default: false,
  },
})
const { flags, startingOrigin, miscPerks, yourTier } = useStore()

const noUC = computed(() => findIndex(miscPerks.value, { title: 'Universal Calibration' }) === -1)

const { allCharsObject } = useAllChars()

const char = computed(() => allCharsObject.value[startingOrigin.value.uid] || {})

if (!startingOrigin.value.sex)
  startingOrigin.value.sex = char.value.b ? (char.value.b?.includes('F') ? 'F' : 'M') : 'M'

watch(char, () => char.value.b ? startingOrigin.value.sex = char.value.b.includes('F') ? 'F' : 'M' : null)

</script>
