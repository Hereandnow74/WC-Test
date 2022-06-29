<template>
  <div
    class="flex justify-between border-2 border-amber-500 rounded p-1"
  >
    <div class="flex gap-2 w-full">
      <img
        :src="startingOrigin.image || (char.i ? imageLink(char.i, char.u) : '/img/Contractor.jpg')"
        :alt="startingOrigin.character"
        class="rounded object-cover max-h-[140px] max-w-[90px] object-top w-24"
      >
      <div class="flex flex-col w-full">
        <div class="flex">
          <Input v-if="editMode" v-model="startingOrigin.character" placeholder="Your name" />
          <span v-else>
            {{ startingOrigin.character }}
            <span class="text-gray-500 text-sm">
              (It's you <span v-if="startingOrigin.title">as {{ startingOrigin.title }}</span>)
            </span>
          </span>
          <span class="text-gray-500 ml-auto whitespace-nowrap"> Tier: <span class="text-green-500">{{ Math.max(startingOrigin.tier || 1, yourTier) }}</span></span>
        </div>
        <span v-if="startingOrigin.w || char.w" class="text-gray-500">From: <span class="text-gray-400">{{ startingOrigin.w || char.w }}</span></span>
        <div v-if="!infoMode" class="flex gap-2 mb-1 text-sm">
          <NumberInput
            v-model="startingOrigin.tier"
            theme="dark"
            :max="11"
            label="Tier"
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
        <div v-if="editMode">
          <Input v-model="image" class="w-full" placeholder="Your image only from Imgur.com example: https://i.imgur.com/jm8eCCA.png" />
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

const image = ref(startingOrigin.value.image || '')

const char = computed(() => allCharsObject.value[startingOrigin.value.uid] || {})

if (!startingOrigin.value.sex)
  startingOrigin.value.sex = char.value.b ? (char.value.b?.includes('F') ? 'F' : 'M') : 'M'

watch(char, () => char.value.b ? startingOrigin.value.sex = char.value.b.includes('F') ? 'F' : 'M' : null)

watch(image, () => {
  if (image.value.startsWith('https://i.imgur.com/') || /.*\.imagebam\.com.*/.test(image.value))
    startingOrigin.value.image = image.value
})

</script>
