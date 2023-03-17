<template>
  <Modal label="Filter by Tag" class="bg-warm-gray-800">
    <div class="bg gray-300 dark:bg-warm-gray-800 flex flex-col min-h-0 max-h-[85vh]">
      <div class="mx-4 flex gap-2 flex-wrap">
        <Button
          size="Small"
          bg-color="bg-blue-400"
          label="Clear all"
          class="whitespace-nowrap"
          @click="clearAll"
        />
        <Select v-model="tagCategory" :options="['All', ...tagCategories]" />
        <Toggle v-model="fullTags" label="Full" />
        <Toggle v-model="showOfficial" label="Show users tags" />
        <div class="flex gap-1">
          <div :class="{'font-bold': !andOr}">
            AND
          </div>
          <Toggle v-model="andOr" />
          <div :class="{'font-bold': andOr}">
            OR
          </div>
        </div>
      </div>
      <div v-if="fullTags" class="flex flex-col gap-1 overflow-y-auto scrollbar mx-1 my-2 p-1 border rounded border-gray-500">
        <div
          v-for="tag in allTagsFiltered"
          :key="tag.tag"
          class="flex gap-2 odd:bg-warm-gray-700 items-center"
        >
          <Tag
            :key="tag.tag"
            :tag="tag"
            :on-the-list="true"
            class="whitespace-nowrap"
            @click="tagToggles[tag.short] = threeToggle(tagToggles[tag.short] || 0)"
          />
          <div>
            {{ tag.desc }}
          </div>
        </div>
      </div>
      <div
        v-else
        class="flex flex-wrap gap-1 text-sm justify-center text-white p-2 scrollbar overflow-y-auto min-h-0 max-h-[60vh]"
      >
        <!-- User tags Count : {{ Object.keys(tagsCount).length }}
        Official tags Count : {{ allTagsFiltered.length }} -->
        <template v-if="!showOfficial">
          <Tag
            v-for="tag in allTagsFiltered"
            :key="tag.tag"
            :tag="tag"
            :on-the-list="true"
            @click="tagToggles[tag.short] = threeToggle(tagToggles[tag.short] || 0)"
          />
        </template>
        <!-- .sort((a, b) => a.tag.localeCompare(b.tag)) -->
        <template v-else>
          <Toggle v-model="countSort" label="Sort by Count" />
          <Tag
            v-for="tag in userTagsSorted.map((tag, k )=> (tag.color = (k % 2) === 0 ? 'bg-teal-300 text-black font-semibold' : 'bg-amber-200 text-black font-semibold', tag))"
            :key="tag.tag"
            :tag="tag"
            :on-the-list="true"
            @click="tagToggles[tag.short] = threeToggle(tagToggles[tag.short] || 0)"
          />
        </template>
      </div>
    </div>
  </Modal>
</template>

<script lang='ts' setup>
import { waifuTags, useAllChars, defTags, tagCategories } from '~/data/constants'
import { tagToggles, threeToggle, andOr } from '~/logic'

const { tagsCount } = useAllChars()

const tagCategory = ref('All')
const fullTags = ref(false)
const showOfficial = ref(false)

const countSort = ref(false)

function clearAll() {
  Object.keys(tagToggles.value).forEach(key => tagToggles.value[key] = 0)
}

const allTagsFiltered = computed(() => {
  return Object.values(waifuTags).filter(tag => tagCategory.value !== 'All' ? tag.category === tagCategory.value : true).sort((a, b) => a.tag.localeCompare(b.tag))
})

const userTags = computed(() => Object.keys(tagsCount.value).filter(tag => tag.length > 2).map((tag, k) => ({ tag: `${tag} [${tagsCount.value[tag]}]`, desc: '', short: tag, style: '', color: '' })))

const userTagsSorted = computed(() => {
  if (!countSort.value)
    return [...userTags.value.sort((a, b) => a.tag.localeCompare(b.tag))]
  else
    return [...userTags.value.sort((a, b) => tagsCount.value[b.short] - tagsCount.value[a.short])]
})

</script>
