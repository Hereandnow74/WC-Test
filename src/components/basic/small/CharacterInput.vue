<template>
  <div class="flex flex-col">
    <Input
      :id="idd"
      v-model="value"
      :placeholder="placeholder"
      @click="showTip"
    />
    <div v-if="errorMessage" class="text-sm text-red-600 dark:text-red-300">
      {{ errorMessage }}
    </div>
    <div ref="listEl" hidden>
      <div
        v-for="name in searchResult"
        :key="name.item.u"
        class="hover:bg-gray-600 cursor-pointer"
        @click="chooseChar(name)"
      >
        {{ name.item.n }} (<span class="text-green-400">T<TierDisplay :tier="name.item.t" /></span>) (<span class="text-gray-400">{{ name.item.w }}</span>)
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import tippy from 'tippy.js'
import { useCharSearch } from '~/logic'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  errorMessage: {
    type: String,
    default: '',
  },
  idd: {
    type: String,
    default: 'chars',
  },
  placeholder: {
    type: String,
    default: 'Char Name',
  },
  appendId: {
    type: String,
    default: '',
  },
  minTier: {
    type: Number,
    default: 0,
  },
  maxTier: {
    type: Number,
    default: 0,
  },
})

const listEl = ref<HTMLElement|null>(null)
const value = ref(props.modelValue)
const gotResult = ref(false)
const alreadySent = ref(false)

const searchResult = ref([] as any[])

const { charSearch } = useCharSearch()

const tierQuery = computed(() => (new Array(props.maxTier - props.minTier)).fill(0).map((n, i) => props.minTier + i + 1).join('|='))

watch(value, () => {
  if (charSearch.value && value.value.length <= 10) {
    const options = {
      $and: [
        {
          $or: [
            { n: value.value },
            { w: value.value },
          ],
        },
      ],
    }
    if (tierQuery.value)
      options.$and.push({ t: `=${tierQuery.value}` })

    searchResult.value = charSearch.value.search(options, { limit: 10 })
  }
})

let charTippy = null
function createTippy() {
  listEl.value.hidden = false
  const list = tippy(`#${props.idd}`, {
    content: listEl.value?.innerHTML,
    allowHTML: true,
    trigger: 'manual',
    arrow: false,
    interactive: true,
    placement: 'bottom',
    appendTo: () => props.appendId ? document.getElementById(props.appendId) : document.body,
  })[0]
  return list
}

watch(searchResult, () => {
  if (!charTippy)
    charTippy = createTippy()
  if (searchResult.value.length > 0 && listEl.value && !gotResult.value) {
    charTippy.setContent(listEl.value)
    charTippy.show()
  }
  // else { charTippy.hide() }
  gotResult.value = false
})

const emit = defineEmits(['update:modelValue', 'updateTier', 'updateUID', 'onChar'])

watch(value, () => {
  if (!alreadySent.value)
    emit('update:modelValue', value.value)
  alreadySent.value = false
})

function chooseChar(char: any) {
  gotResult.value = true
  alreadySent.value = true
  if (charTippy) charTippy.hide()
  value.value = char.item.n
  emit('updateTier', char.item.t)
  emit('updateUID', char.item.u)
  emit('onChar', char.item)
}

function showTip() {
  if (charTippy) charTippy.show()
}
</script>
