<template>
  <Modal label="Filter by Tag" class="bg-warm-gray-800">
    <div class="bg-warm-gray-800 flex flex-col min-h-0 max-h-[85vh]">
      <div class="mx-4 flex gap-2 flex-wrap">
        <Button
          size="Small"
          bg-color="bg-blue-400"
          label="Toggle all"
          class="whitespace-nowrap"
          @click="toggleAll"
        />
        <Toggle v-model="onlyDefense" label="Only defense discount tags" />
        <Toggle v-model="fullTags" label="Full" />
        <Toggle v-model="showOfficial" label="Show users tags" />
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
        <template v-if="!showOfficial">
          <Tag
            v-for="tag in allTagsFiltered"
            :key="tag.tag"
            :tag="tag"
            :on-the-list="true"
            @click="tagToggles[tag.short] = threeToggle(tagToggles[tag.short])"
          />
        </template>

        <template v-else>
          <Tag
            v-for="tag in Object.keys(tagsCount).filter(tag => tag.length > 2).map(tag => ({tag, desc:'', short: tag, style: '', color: 'bg-teal-400 text-black'}))"
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
import { waifuTags, useAllChars, defTags } from '~/data/constants'
import { tagToggles, threeToggle } from '~/logic'

const { tagsCount } = useAllChars()

const onlyDefense = ref(false)
const fullTags = ref(false)
const showOfficial = ref(false)

function toggleAll() {
  const val = threeToggle(tagToggles.F)
  Object.keys(tagToggles).forEach(key => tagToggles[key] = val)
}

const allTagsFiltered = computed(() => {
  return Object.values(waifuTags).filter(tag => onlyDefense.value ? defTags.includes(tag.tag) : true).sort((a, b) => a.tag.localeCompare(b.tag))
})

</script>
