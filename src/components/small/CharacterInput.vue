<template>
  <div class="flex flex-col">
    <Input
      id="chars"
      v-model="value"
      placeholder="Char name"
    />
    <div v-if="errorMessage" class="text-sm text-red-600 dark:text-red-300">
      {{ errorMessage }}
    </div>
    <div ref="listEl" hidden>
      <div
        v-for="name in searchResult"
        :key="name.item.u"
        class="hover:bg-gray-600"
        @click="chooseChar(name)"
      >
        {{ name.item.n }} (<span class="text-green-400">T{{ name.item.t }}</span>) (<span class="text-gray-400">{{ name.item.w }}</span>)
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import Fuse from 'fuse.js'
import tippy from 'tippy.js'
import { getChars, getUserChars } from '~/data/constatnts'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  errorMessage: {
    type: String,
    default: 'Error',
  },
})

const allChars: any[] = []
const options = {
  includeScore: true,
  findAllMatches: true,
  threshold: 0.1,
  keys: ['n', 'w'],
}
const fuse = new Fuse(allChars, options)
const listEl = ref<HTMLElement|null>(null)
const value = ref(props.modelValue)

const searchResult = computed(() => fuse.search(value.value, { limit: 10 }))

getChars().then((val) => {
  allChars.push(...val)
  fuse.setCollection(allChars)
})

getUserChars().then((val) => {
  allChars.push(...val)
  fuse.setCollection(allChars)
})

let list = null
watch(searchResult, () => {
  if (list) list.destroy()
  if (searchResult.value.length > 0 && listEl.value) {
    listEl.value.hidden = false
    list = tippy('#chars', {
      content: listEl.value,
      allowHTML: true,
      trigger: 'manual',
      arrow: false,
      interactive: true,
    })[0]
    list.show()
  }
})

const emit = defineEmits(['update:modelValue', 'updateTier', 'updateUID'])

watch(value, () => emit('update:modelValue', value.value))

function chooseChar(char: any) {
  value.value = char.item.n
  emit('updateTier', char.item.t)
  emit('updateUID', char.item.u)
}
</script>
