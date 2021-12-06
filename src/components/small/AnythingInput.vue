<template>
  <div class="flex flex-col">
    <div class="flex items-center rounded border border-gray-700 bg-white" @click="showTippy">
      <input
        id="anything"
        ref="tippyEl"
        v-model="value"
        type="text"
        :placeholder="placeholder"
        class="rounded-l text-gray-800 px-2 w-full"
        outline="none active:none"
        autocomplete="off"
      />
      <div class="flex items-center hover:bg-gray-200 text-gray-800">
        <bx:bxs-chevron-up v-if="tippyShown" />
        <bx:bxs-chevron-down v-else />
      </div>
      <div ref="listEl" hidden>
        <div
          v-for="item in list"
          :key="item"
          class="hover:bg-gray-200 cursor-pointer px-2 text-base flex gap-4 justify-between w-full"
          @click="chooseItem(item.flavor || item)"
        >
          {{ item.flavor || item }}
          <fa-solid:check v-if="findIndex(boughtList, (item.flavor ? { flavor: item.flavor } : { target: item })) !== -1" class="text-green-500" />
        </div>
      </div>
    </div>
    <div v-if="errorMessage" class="text-sm text-red-600 dark:text-red-300">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script lang='ts' setup>
import type { PropType } from '@vue/runtime-core'
import { findIndex } from 'lodash'
import tippy from 'tippy.js'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  errorMessage: {
    type: String,
    default: '',
  },
  list: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  boughtList: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['update:modelValue'])

const listEl = ref<HTMLElement|null>(null)
const tippyEl = ref<Element|null>(null)

const tippyShown = ref(false)

let tippyInst: any = null

onMounted(() => {
  if (!tippyEl.value) return
  tippyInst = tippy(tippyEl.value, {
    content: listEl.value,
    allowHTML: true,
    trigger: 'manual',
    arrow: false,
    interactive: true,
    offset: [0, 0],
    placement: 'bottom-start',
    theme: 'light',
  })
})

function showTippy() {
  if (listEl.value && props.list.length) {
    if (tippyShown.value) {
      tippyShown.value = false
      listEl.value.hidden = true
      tippyInst.hide()
    }
    else {
      tippyShown.value = true
      listEl.value.hidden = false
      tippyInst.show()
    }
  }
}

const value = ref('')

watch(value, () => emit('update:modelValue', value.value))

function chooseItem(item: string) {
  value.value = item
}

</script>

<style>
.tippy-box[data-theme~='light'] {
  @apply bg-white;
  @apply text-gray-800;
  @apply rounded-none rounded-b;
}
</style>
