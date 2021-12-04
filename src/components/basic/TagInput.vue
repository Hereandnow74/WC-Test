<template>
  <div>
    <div class="relative border border-gray-700 rounded">
      <input
        id="tags"
        v-model="newTag"
        type="text"
        class="w-full p-1 text-gray-800 rounded"
        :style="{ 'padding-left': `${paddingLeft}px` }"
        :placeholder="placeholder"
        @keydown.enter="addTag(newTag)"
        @keydown.delete="newTag.length || removeTag(tags.length - 1)"
      />
      <div id="tagslist" ref="listEl" hidden>
        <div
          v-for="option in searchResult"
          :key="option.item.tag"
          class="hover:bg-gray-600 cursor-pointer"
          @click="addTag(option.item.tag)"
        >
          {{ option.item.tag }}
          <span v-if="option.item.desc" class="text-gray-300">{{ option.item.desc }}</span>
        </div>
      </div>
      <ul
        ref="tagsUl"
        class="flex gap-1 items-center absolute top-0 bottom-0 left-1 max-w-[75%] no-scrollbar overflow-x-auto overflow-y-hidden"
      >
        <li
          v-for="tag, index in tags"
          :key="tag"
          class="px-1 rounded text-white bg-gray-600 whitespace-nowrap flex items-center gap-1"
        >
          {{ waifuTags[tag] ? waifuTags[tag].tag : tag }}
          <button class="border-none outline-none bg-none text-sm flex text-white hover:text-red-400" @click="removeTag(index)">
            <eva:close-fill />
          </button>
        </li>
      </ul>
    </div>
    <div v-if="errorMessage" class="text-sm text-red-400">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import Fuse from 'fuse.js'
import tippy from 'tippy.js'
import { waifuTagsByTag, waifuTags } from '~/data/constatnts'

const props = defineProps({
  placeholder: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
  errorMessage: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const tags = ref<string[]>(props.modelValue || [])
const newTag = ref('')
const paddingLeft = ref(8)
const tagsUl = ref(null)

function onTagsChange() {
  const extraCushion = 8
  paddingLeft.value = tagsUl.value.clientWidth + extraCushion
  tagsUl.value.scrollTo(tagsUl.value.scrollWidth, 0)
  emit('update:modelValue', tags.value)
}

const options = {
  findAllMatches: true,
  threshold: 0.1,
  keys: ['tag', 'desc'],
}
const fuse = new Fuse(Object.values(waifuTags), options)
const listEl = ref<HTMLElement|null>(null)

const searchResult = computed(() => fuse.search(newTag.value, { limit: 10 }))

let list = null
watch(searchResult, () => {
  if (list) list.destroy()
  if (searchResult.value.length > 0 && listEl.value) {
    listEl.value.hidden = false
    list = tippy('#tags', {
      content: listEl.value,
      allowHTML: true,
      trigger: 'manual',
      arrow: false,
      interactive: true,
      placement: 'auto-start',
    })[0]
    list.show()
  }
})

onMounted(onTagsChange)
watch(tags, () => nextTick(onTagsChange), { deep: true })

function addTag(tag: string) {
  if (!tag) return
  if (tags.value.includes(tag)) return
  tags.value.push(tag)
  newTag.value = ''
}

function removeTag(index: number) {
  tags.value.splice(index, 1)
}
</script>
