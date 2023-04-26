<template>
  <div
    class="sm:p-2 mb-2 column-block cursor-pointer"
    @click="chooseChallenge"
  >
    <img
      v-if="challenge.image && settings.perkImages"
      ref="perkImg"
      class="rounded object-cover object-contain w-full object-center"
      :style="{'aspect-ratio': `2/1`}"
      :src="PLACEHOLDER_IMAGE"
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
    <div v-if="challenge.bonus" class="mx-2">
      Bonus: <span class="text-green-500 dark:text-green-300">{{ `${challenge.bonus * 100}% (${WORLD_RATINGS[startingWorld.rating].budget * challenge.bonus})` }}</span>
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
    <div v-if="challenge.blacklist" class="px-2 flex gap-2">
      Mutually exclusive with:
      <Enum :list="challenge.blacklist" />
    </div>
  </div>
</template>

<script lang='ts' setup>
import { PLACEHOLDER_IMAGE, WORLD_RATINGS } from '~/data/constants'
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

const { settings, startingWorld } = useStore()

const emit = defineEmits(['pickPerk'])

const perkImg = ref<HTMLImageElement | null>(null)

function chooseChallenge() {
  //
}

onMounted(() => { if (perkImg.value) lazyLoadSingleImg(perkImg.value) })
watch(settings.value, () => { if (perkImg.value) lazyLoadSingleImg(perkImg.value) }, { flush: 'post' })

</script>
