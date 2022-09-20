<template>
  <div
    class="flex justify-between border-2 border-amber-500 rounded p-1"
  >
    <div class="flex gap-2 w-full">
      <img
        :src="coupleOrigin.image || (char.i ? imageLink(char.i, char.u) : '/img/Contractor.jpg')"
        :alt="coupleOrigin.character"
        class="rounded object-cover max-h-[140px] max-w-[90px] object-top w-24"
      >
      <div class="flex flex-col w-full">
        <div class="flex">
          <Input v-if="editMode" v-model="coupleOrigin.character" placeholder="Your name" />
          <span v-else>
            {{ coupleOrigin.character }}
            <span class="text-gray-500 text-sm">
              (It's your spouse<span v-if="coupleOrigin.title"> as {{ coupleOrigin.title }}</span>)
            </span>
          </span>
          <span class="text-gray-500 ml-auto whitespace-nowrap"> Tier: <span class="text-green-500">{{ coupleOrigin.tier || 1 }}</span></span>
        </div>
        <span v-if="coupleOrigin.w || char.w" class="text-gray-500">From: <span class="text-gray-400">{{ coupleOrigin.w || char.w }}</span></span>
        <div v-if="!infoMode" class="flex gap-2 mb-1 text-sm">
          <NumberInput
            v-model="coupleOrigin.tier"
            theme="dark"
            :max="11"
            label="T"
            :label-inside="true"
            class="whitespace-nowrap"
          />
          <div v-if="flags.chargen && ['Substitute', 'Walk-In'].includes(coupleOrigin.title) && noUC">
            Sex: {{ coupleOrigin.sex }}
          </div>
          <Variants
            v-else
            v-model="coupleOrigin.sex"
            theme="dark"
            label="Sex"
            :list="['F', 'M', 'O']"
          />
        </div>
        <div v-if="editMode">
          <Input v-model="image" class="w-full" placeholder="Your image only from Imgur.com example: https://i.imgur.com/jm8eCCA.png" />
          <Input v-model="coupleOrigin.w" class="w-full mt-1" placeholder="Place you're from" />
          <div class="flex gap-1">
            <Select v-model="coupleOrigin.o" :options="['Extra', 'Substitute', 'Possess']" class="w-full flex-grow mt-1" placeholder="Origin" />
            <Input placeholder="Target Name" />
            <Input placeholder="Cost" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { findIndex } from 'lodash-es'
import Input from '../basic/Input.vue'
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
const { flags, miscPerks, yourTier, coupleOrigin } = useStore()

const noUC = computed(() => findIndex(miscPerks.value, { title: 'Universal Calibration' }) === -1)

const { allCharsObject } = useAllChars()

const image = ref(coupleOrigin.value.image || '')

const char = computed(() => allCharsObject.value[coupleOrigin.value.uid] || {})

if (!coupleOrigin.value.sex)
  coupleOrigin.value.sex = char.value.b ? (char.value.b?.includes('F') ? 'F' : 'M') : 'M'

watch(char, () => char.value.b ? coupleOrigin.value.sex = char.value.b.includes('F') ? 'F' : 'M' : null)

watch(image, () => {
  if (image.value.startsWith('https://i.imgur.com/') || /.*\.imagebam\.com.*/.test(image.value))
    coupleOrigin.value.image = image.value
})

</script>
