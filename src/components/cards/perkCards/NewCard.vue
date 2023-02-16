<template>
  <div
    class="sm:p-2 mb-2 column-block cursor-pointer max-w-[600px]"
    @click="sendPerk"
  >
    <img
      v-if="perk.image && settings.perkImages"
      ref="perkImg"
      class="rounded object-cover object-contain h-full w-full object-top"
      :src="PLACEHOLDER_IMAGE"
      :data-src="perk.image"
      :alt="perk.title"
    />
    <h3 :id="perk.title" class="relative flex-wrap flex justify-center items-center text-base sm:text-xl">
      <span class="whitespace-nowrap">{{ perk.title }}</span>
      <span v-if="perk.dlc" class="text-sm ml-1" text="gray-500 dark:gray-400" @click.stop>
        <a v-if="perk.dlclink" :href="perk.dlclink" target="_blank" rel="noopener noreferrer" class="underline">DLC by {{ perk.dlc }}</a>
        <span v-else>DLC by {{ perk.dlc }}</span>
      </span>
      <slot name="title" />
      <span text="gray-500 dark:gray-400" class="whitespace-nowrap">
        <slot name="cost">
          (Cost: <span text="green-600 dark:green-300">{{ displayedCost }}</span>)
        </slot>
      </span>
      <fa-solid:check
        v-if="isActive"
        class="absolute top-1 right-1 text-green-500"
      />
    </h3>
    <slot name="rules" />
    <div v-if="perk.special" class="mx-2">
      Special: <span class="text-purple-500 dark:text-purple-300">{{ perk.special }}</span>
    </div>
    <div>
      <slot name="beforeDesc" />
      <Desc v-if="(!settings.hideDesc && !collapsedDescsSet.has(perk.uid)) || expand" :desc="perk.desc" />
      <div v-else class="text-center hover:underline cursor-pointer text-gray-700 dark:text-gray-300 flex items-center justify-center" @click.stop="expand = true">
        Expand description <entypo:triangle-down />
      </div>
      <slot name="underDesc" />
    </div>
    <div v-if="perk.requires" class="mx-2">
      Require: <span class="text-orange-500 dark:text-orange-300">{{ perk.requires }}</span>
    </div>
    <div v-if="perk.whitelist" class=" mx-2">
      <span class="whitespace-nowrap float-left mr-2">
        {{ 'Require ' + (perk.whitelist.length > 1 ? (perk.needed || ' all')+' of' : '') }}:
      </span>
      <Enum :list="perk.whitelist" />
    </div>
    <bi:arrows-collapse class="absolute z-10 top-1 left-1 w-4 h-4 hover:text-lime-500" @click.stop="collapse" />
  </div>
</template>

<script lang='ts' setup>
import { Perk, DLCPerk } from 'global'
import type { PropType } from '@vue/runtime-core'
import { filterObject, lazyLoadSingleImg, newPerkAction } from '~/logic'
import { useStore } from '~/store/store'
import { PLACEHOLDER_IMAGE } from '~/data/constants'

const props = defineProps({
  perk: {
    type: Object as PropType<DLCPerk>,
    default: () => ({}),
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  savedPerk: {
    type: Object as PropType<Perk>,
    default: () => ({}),
  },
})

const expand = ref(false)

const perkImg = ref<HTMLImageElement | null>(null)
const { settings, collapsedDescs, collapsedDescsSet } = useStore()

const perkToSave = reactive({
  title: props.perk.title,
  cost: props.perk.cost,
  costT: props.perk.costT,
  freebies: { ...props.perk.freebies } || undefined,
})

const displayedCost = computed(() => {
  return props.perk.costT ? `${perkToSave.costT} IMG` : perkToSave.cost
})

function sendPerk() {
  const obj = filterObject(perkToSave)
  newPerkAction(props.perk, obj)
}

onMounted(() => { if (perkImg.value) lazyLoadSingleImg(perkImg.value) })
watch(settings.value, () => { if (perkImg.value) lazyLoadSingleImg(perkImg.value) }, { flush: 'post' })

function collapse() {
  if (expand.value) {
    expand.value = false
    return
  }
  if (collapsedDescsSet.value.has(props.perk.uid))
    collapsedDescs.value.splice(collapsedDescs.value.indexOf(props.perk.uid), 1)
  else
    collapsedDescs.value.push(props.perk.uid)
}
</script>
