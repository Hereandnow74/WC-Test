<template>
  <div
    :id="waifuPerk.title"
    class="relative p-2 max-w-screen-md cursor-pointer"
    bg="amber-200 dark:amber-800"
    border="3 gray-700"
    :class="{'!border-green-600 !hover:border-amber-400': specificAvailable(waifuPerk)}"
    @click="pickWaifuPerk"
  >
    <img
      v-if="waifuPerk.image !=='' && !settings.allImg"
      class="h-[300px] max-w-1/2 object-contain ml-auto pl-1 inline-block float-right"
      :data-src="waifuPerk.image"
      :alt="waifuPerk.title"
    />
    <img
      v-if="waifuPerk.image_2 && !settings.allImg"
      class="h-[300px] max-w-1/2 object-contain ml-auto pl-1 inline-block float-right"
      :src="waifuPerk.image_2"
      :alt="waifuPerk.title"
    />
    <icon-park-outline:full-screen-one
      v-if="waifuPerk.image !==''"
      class="absolute z-10 top-3 right-3 text-gray-200 hover:text-blue-400 cursor-pointer mix-blend-difference"
      @click.stop="() => emit('changeModalImage', waifuPerk.image)"
    />
    <table v-if="waifuPerk.title === 'Lord Camelot'" class="float-right m-2">
      <thead>
        <th class="pr-4 border-2 border-gray-700">
          Credits Paid
        </th>
        <th class="pr-4 border-2 border-gray-700">
          Saint Quartz
        </th>
      </thead>
      <tr v-for="n in 10" :key="n">
        <td class="border-2 border-gray-700">
          {{ gachaTable[0][n - 1] }}
        </td>
        <td class="border-2 border-gray-700">
          {{ gachaTable[1][n - 1] }}
        </td>
      </tr>
    </table>
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
        v-if="waifuList.length"
        v-model="chosenWaifu"
        :options="waifuList"
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
    </h3>
    <div>
      <span class="font-bold">Waifu: </span>
      <span v-if="isArray(waifuPerk.waifu)" class="inline-flex gap-2 text-blue-600 dark:text-blue-200">
        <router-link v-for="wf in waifuPerk.waifu" :key="wf" :to="`/companions/?name=${wf}`" class="hover:underline">
          {{ wf }}
        </router-link>
      </span>
      <router-link v-else :to="`/companions/?name=${waifuPerk.waifu}`" class="hover:underline text-blue-600 dark:text-blue-200">
        {{ waifuPerk.waifu }}
      </router-link>
      from <span class="dark:text-violet-200 text-violet-900">{{ waifuPerk.from }}</span>
    </div>
    <div class="flex gap-4">
      <span v-if="waifuPerk.cost"><span class="font-bold">Cost:</span> {{ waifuPerk.cost===11111 ? 'Tier 11 ticket' : waifuPerk.cost }} </span>
      <span v-if="waifuPerk.discount"><span class="font-bold">Refund:</span> {{ waifuPerk.discount }}</span>
      <span v-if="waifuPerk.tier"><span class="font-bold">Become:</span> T{{ waifuPerk.tier }}</span>
    </div>
    <Desc :desc="waifuPerk.desc" class="p-0" />
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { findIndex, isArray } from 'lodash-es'
import { WaifuPerk } from '~/data/waifu_perks'
import { chooseWaifuPerk, specificAvailable } from '~/logic'
import { useStore } from '~/store/store'
import { useAllChars } from '~/data/constants'

const props = defineProps({
  waifuPerk: {
    type: Object as PropType<WaifuPerk>,
    default: () => ({}),
  },
})

const { allCharsObject } = useAllChars()

const chosenWaifu = ref('')

const emit = defineEmits(['changeModalImage'])

const gachaTable = [
  [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000],
  [1, 2, 7, 15, 34, 96, 210, 454, 1251, 2677],
]

const { settings, waifuPerks, companionsUIDs } = useStore()

const waifuList = computed(() => {
  let res = []
  if (isArray(props.waifuPerk.waifu)) {
    res = props.waifuPerk.waifu.filter((_, i) => companionsUIDs.value[props.waifuPerk.uid[i]])
    chosenWaifu.value = res[0]
  }
  return res
})

function pickWaifuPerk() {
  chooseWaifuPerk(props.waifuPerk, { title: props.waifuPerk.title, waifu: chosenWaifu.value, cost: props.waifuPerk.cost || 0, refund: props.waifuPerk.discount || 0 })
}

</script>
