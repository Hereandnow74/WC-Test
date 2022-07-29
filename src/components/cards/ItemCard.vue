<template>
  <div
    class="flex flex-col relative rounded-xl"
  >
    <img
      v-if="item.image"
      ref="itemImg"
      class="rounded-xl"
      :src="PLACEHOLDER_IMAGE"
      :data-src="item.image"
      :alt="item.name"
    />
    <div class="rounded-xl cursor-pointer bg-opacity-50 bg-gray-700 absolute top-0 left-0 w-full h-full" />
    <div :id="item.name" class="absolute text-base sm:text-base text-center justify-center bottom-1 w-full">
      {{ item.name }}
    </div>
  </div>
</template>

<script lang='ts' setup>
import { PLACEHOLDER_IMAGE } from '~/data/constants'
import { lazyLoadSingleImg } from '~/logic'

defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
})

const itemImg = ref<HTMLImageElement | null>(null)

onMounted(() => { if (itemImg.value) lazyLoadSingleImg(itemImg.value) })
</script>
