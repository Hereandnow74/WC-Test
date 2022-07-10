<template>
  <div
    class="sm:p-2 mb-2 column-block cursor-pointer"
    @click="chooseChallenge"
  >
    <img
      v-if="challenge.image && settings.perkImages"
      ref="perkImg"
      class="rounded object-cover object-contain w-full object-center"
      :style="{'height': `${(perkImg?.clientWidth || 576) * 288/576}px`}"
      src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22576%22%20height%3D%22288%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20576%20288%22%20preserveAspectRatio%3D%22none%22%3E%0A%20%20%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%20%20%3Cstyle%20type%3D%22text%2Fcss%22%3E%0A%20%20%20%20%20%20%20%20%20%20%23holder%20text%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20fill%3A%20%23ffffff%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20font-family%3A%20sans-serif%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20font-size%3A%2040px%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20font-weight%3A%20400%3B%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%3C%2Fstyle%3E%0A%20%20%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%20%20%3Cg%20id%3D%22holder%22%3E%0A%20%20%20%20%20%20%20%20%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23cccccc%22%3E%3C%2Frect%3E%0A%20%20%20%20%20%20%20%20%3Cg%3E%0A%20%20%20%20%20%20%20%20%20%20%3Ctext%20text-anchor%3D%22middle%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20dy%3D%22.3em%22%3E576%20x%20288%3C%2Ftext%3E%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3C%2Fsvg%3E"
      :data-src="challenge.image"
      :alt="challenge.title"
    />
    <h3 :id="challenge.title" class="relative flex-wrap flex justify-center items-center text-base sm:text-xl">
      <span class="whitespace-nowrap">{{ challenge.title }}</span>
      <span v-if="challenge.dlc" class="text-sm ml-1" text="gray-500 dark:gray-400" @click.stop>
        <a v-if="challenge.dlclink" :href="challenge.dlclink" target="_blank" rel="noopener noreferrer" class="underline">{{ challenge.dlc }}</a>
        <span v-else>DLC by {{ challenge.dlc }}</span>
      </span>
      <slot name="title" />

      <fa-solid:check
        v-if="isActive"
        class="absolute top-1 right-1 text-green-500"
      />
    </h3>
    <slot name="rules" />
    <div v-if="challenge.special" class="mx-2">
      Special: <span class="text-purple-500 dark:text-purple-300">{{ challenge.special }}</span>
    </div>
    <div>
      <Desc :desc="challenge.desc" />
      <slot name="underDesc" />
    </div>
    <div v-if="challenge.requires" class="mx-2">
      Require: <span class="text-orange-500 dark:text-orange-300">{{ challenge.requires }}</span>
    </div>
    <div v-if="challenge.whitelist" class=" mx-2">
      <span class="whitespace-nowrap float-left mr-2">
        {{ 'Require ' + (challenge.whitelist.length > 1 ? (challenge.needed || ' all')+' of' : '') }}:
      </span>
      <Enum :list="challenge.whitelist" />
    </div>
  </div>
</template>

<script lang='ts' setup>
import { lazyLoadSingleImg } from '~/logic'
import { useStore } from '~/store/store'

const props = defineProps({
  challenge: {
    type: Object,
    default: () => ({}),
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  max: {
    type: Number,
    default: 100,
  },
})

const { settings } = useStore()

const emit = defineEmits(['pickPerk'])

const perkImg = ref<HTMLImageElement | null>(null)

function chooseChallenge() {
  //
}

onMounted(() => { if (perkImg.value) lazyLoadSingleImg(perkImg.value) })
watch(settings.value, () => { if (perkImg.value) lazyLoadSingleImg(perkImg.value) }, { flush: 'post' })

</script>
