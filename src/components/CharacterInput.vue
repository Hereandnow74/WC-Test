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
        :key="name.item.uid"
        class="hover:bg-gray-600"
        @click="chooseChar(name)"
      >
        {{ name.item.name }} (<span class="text-green-400">T{{ name.item.tier }}</span>) (<span class="text-gray-400">{{ name.item.world }}</span>)
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import Fuse from 'fuse.js'
import tippy from 'tippy.js'
import { getChars } from '~/data/constatnts'

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
  keys: ['name', 'world'],
}
const fuse = ref(null)
const listEl = ref<HTMLElement|null>(null)
const value = ref(props.modelValue)

const searchResult = computed(() => fuse.value?.search(value.value, { limit: 10 }))

getChars().then((val) => {
  allChars.push(...val)
  fuse.value = new Fuse(allChars, options)
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

const emit = defineEmits(['update:modelValue', 'updateTier'])

watch(value, () => emit('update:modelValue', value.value))

function chooseChar(char: any) {
  value.value = char.item.name
  emit('updateTier', char.item.tier)
}
</script>
