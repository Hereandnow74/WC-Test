<template>
  <div class="flex flex-col">
    <Input
      :id="idd"
      v-model="value"
      :placeholder="placeholder"
      :error-message="errorMessage"
    />
    <div ref="listEl" hidden class="z-40">
      <div
        v-for="name in searchResult"
        :key="name.item"
        class="hover:bg-gray-600"
        @click="value = name.item"
      >
        {{ name.item }}
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import Fuse from 'fuse.js'
import tippy from 'tippy.js'

const props = defineProps({
  idd: {
    type: String,
    default: 'search',
  },
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  errorMessage: {
    type: String,
    default: '',
  },
  list: {
    type: Array,
    default: () => [],
  },
})

const options = {
  findAllMatches: true,
  threshold: 0.1,
}
const fuse = new Fuse(props.list, options)
const listEl = ref<HTMLElement|null>(null)
const value = ref(props.modelValue)

const searchResult = computed(() => fuse.search(value.value, { limit: 10 }))

watch(props, () => {
  fuse.setCollection(props.list)
  value.value = props.modelValue
})

let list = null
watch(searchResult, () => {
  if (list) list.destroy()
  if (searchResult.value.length > 0 && listEl.value) {
    listEl.value.hidden = false
    list = tippy(`#${props.idd}`, {
      content: listEl.value,
      allowHTML: true,
      trigger: 'manual',
      arrow: false,
      interactive: true,
    })[0]
    list.show()
  }
})

const emit = defineEmits(['update:modelValue'])

watch(value, () => emit('update:modelValue', value.value))
</script>
