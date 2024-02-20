<template>
  <div
    class="flex justify-between border-2 border-amber-500 rounded p-1"
  >
    <div class="flex gap-2 w-full">
      <img
        :src="char.image || '/img/Contractor.jpg'"
        :data-src="char.image || '/img/Contractor.jpg'"
        :alt="char.name"
        class="rounded object-cover max-h-[140px] max-w-[90px] object-top w-24"
      >
      <div class="flex flex-col w-full">
        <div class="flex">
          <Input v-if="editMode" v-model="char.name" placeholder="Your name" />
          <span v-else>
            {{ char.name }}
            <span class="text-gray-500 text-sm">
              (It's your SO<span v-if="char.origin"> as {{ char.origin }}</span>)
            </span>
          </span>
          <span class="text-gray-500 ml-auto whitespace-nowrap"> Tier: <span class="text-green-500">{{ char.tier || 1 }}</span></span>
        </div>
        <span v-if="char.world" class="text-gray-500">From: <span class="text-gray-400">{{ char.world }}</span></span>
        <div v-if="!infoMode" class="flex gap-2 mb-1 text-sm">
          <NumberInput
            v-model="char.tier"
            theme="dark"
            :max="11"
            label="T"
            :label-inside="true"
            class="whitespace-nowrap"
          />
          <Variants
            v-model="char.sex"
            theme="dark"
            label="Sex"
            :list="['F', 'M', 'O']"
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
              empty-message="No Waifu Perks"
            />
          </span>
        </div>
        <div v-if="editMode">
          <Input v-model="image" class="w-full" placeholder="Direct image link" />
          <Input v-model="char.world" class="w-full mt-1" placeholder="Place your SO from" />
          <div class="flex gap-1 mt-1">
            <Select v-model="char.origin" :options="startingOrigin.title ==='Walk-In' ? ['Walk-In'] : ['Drop-In', 'Extra', 'Substitute', 'Possess']" placeholder="Origin" />
            <CharacterInput
              v-if="['Substitute', 'Possess'].includes(char.origin)"
              idd="charCard"
              placeholder="Target Name"
              class="flex-grow"
              @updateUID="(uid: number) => char.uid = uid"
              @updateTier="(tier: number) => {char.tier = tier; char.price=CHAR_COSTS[tier]}"
            />
            <Input v-if="['Extra', 'Substitute', 'Possess'].includes(char.origin)" v-model.number="char.price" class="w-28" placeholder="Cost" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import Input from '../basic/Input.vue'
import { CHAR_COSTS, useAllChars } from '~/data/constants'
import { imageLink } from '~/logic'
import { useStore } from '~/store/store'
import { SavedChar } from '~/store/chargen'

const props = defineProps({
  editMode: {
    type: Boolean,
    default: false,
  },
  infoMode: {
    type: Boolean,
    default: false,
  },
  char: {
    type: Object as PropType<SavedChar>,
    default: () => {},
  },
  perks: {
    type: Object,
    default: () => ({}),
  },
})

const { startingOrigin } = useStore()
const { allCharsObject } = useAllChars()

const image = ref(props.char.image || '')

const talentsList = computed(() => {
  return props.perks.talents || []
})
const perksList = computed(() => {
  return props.perks.perks || []
})
const specificList = computed(() => {
  return props.perks.specific || []
})

watch(() => props.char.uid, () => {
  if (props.char.uid !== 777777777) {
    const char = allCharsObject.value[props.char.uid]
    if (char) {
      props.char.image = imageLink(char.u)
      props.char.sex = char.b.includes('F') ? 'F' : 'M'
    }
  }
})

watch(image, () => {
  // test if it's a valid image link
  if (image.value.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg|webp)/g))
    props.char.image = image.value
})

</script>
