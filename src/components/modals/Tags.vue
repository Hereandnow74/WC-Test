<template>
  <Modal label="Filter by Tag">
    <div class="mx-4 flex gap-2">
      <Toggle v-model="toggleAll" label="Toggle all" class="whitespace-nowrap" />
      <div class="text-sm">
        Filter by tags currently only works by inclusion (if character have any of toggled on tags).
        <span class="text-blue-900 dark:text-blue-200">Hover over tag to see description (if it has one).</span>
      </div>
    </div>

    <div class="flex flex-wrap gap-1 text-sm justify-center text-white p-2 scrollbar overflow-y-auto min-h-0 max-h-[60vh]">
      <div
        v-for="tag in waifuTags"
        :key="tag.tag"
        class="px-1 rounded-md cursor-pointer flex gap-1 p-1"
        :class="tag.color ? tag.color : 'bg-teal-600'"
        :title="tag.desc ? tag.desc : ''"
      >
        <Toggle v-model="tagToggles[tag.short]" />
        {{ tag.tag }}
      </div>
    </div>
  </Modal>
</template>

<script lang='ts' setup>
import Toggle from '../basic/Toggle.vue'
import { waifuTags } from '~/data/constatnts'
import { tagToggles } from '~/logic'

const toggleAll = ref(true)

watch(toggleAll, () => Object.keys(tagToggles).forEach(key => tagToggles[key] = toggleAll.value))

</script>
