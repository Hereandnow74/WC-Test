<template>
  <div>
    <div id="tags" class="relative border-t border-gray-700 dark:border-gray-400 rounded">
      <ul
        ref="tagsUl"
        class="flex flex-wrap gap-1 py-1 items-center no-scrollbar overflow-x-auto overflow-y-hidden"
      >
        <li
          v-for="tag, index in tags"
          :key="tag"
          class="px-1 rounded whitespace-nowrap flex items-center gap-1 text-white"
          :class="waifuTags[tag] ? waifuTags[tag].color : 'text-white bg-gray-600'"
          :style="waifuTags[tag] ? waifuTags[tag].style : ''"
        >
          {{ waifuTags[tag] ? waifuTags[tag].tag : tag }}
          <button class="border-none outline-none bg-none text-sm flex text-white hover:text-red-400" @click="removeTag(index)">
            <eva:close-fill />
          </button>
        </li>
      </ul>
      <input
        v-model="newTag"
        type="text"
        class="w-full px-1 text-gray-800 rounded border-gray-700 rounded border"
        :placeholder="placeholder"
        @keydown.enter="addTag(newTag)"
      />
      <div id="tagslist" ref="listEl" hidden class="scrollbar overflow-y-auto max-h-[300px]">
        <div
          v-for="option in searchResult"
          :key="option.item.tag"
          class="hover:bg-gray-600 cursor-pointer border-b border-gray-600 pb-1 px-1"
          @click="addTag(option.item.tag)"
        >
          <span class="font-semibold pr-2">{{ option.item.tag }}</span>
          <span v-if="option.item.desc" class="text-gray-300">{{ option.item.desc }}</span>
        </div>
      </div>
    </div>
    <div v-if="errorMessage" class="text-sm text-red-400">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import Fuse from 'fuse.js'
import tippy from 'tippy.js'
import { waifuTagsByTag, waifuTags } from '~/data/constants'

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
  useExtendedSearch: true,
}
const fuse = new Fuse(Object.values(waifuTags), options)
const listEl = ref<HTMLElement|null>(null)

const searchResult = computed(() => newTag.value ? fuse.search(newTag.value || '!^xxx') : fuse.search('!^xxx').sort((a, b) => a.item.tag.localeCompare(b.item.tag)))

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
      placement: 'top-start',
      appendTo: () => document.body,
    })[0]
    list.show()
  }
})

onMounted(onTagsChange)
watch(tags, () => nextTick(onTagsChange), { deep: true })

function addTag(tag: string) {
  if (!tag) return
  tag = tag.trim()
  tag = waifuTagsByTag[tag] ? waifuTagsByTag[tag].short : tag
  if (!tags.value.includes(tag))
    tags.value.push(tag)
  newTag.value = ''
}

function removeTag(index: number) {
  tags.value.splice(index, 1)
}
</script>
