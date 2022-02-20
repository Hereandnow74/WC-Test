<template>
  <Modal label="Filter by Tag">
    <div class="mx-4 flex gap-2">
      <Button size="Small" bg-color="bg-blue-400" label="Toggle all" class="whitespace-nowrap" @click="toggleAll" />
      <div class="text-sm">
        <b>Colored</b> - include; <b>Red</b> - exclude; <b>Gray</b> - doesn't matter.
        <span class="text-blue-900 dark:text-blue-200">Hover over tag to see description (if it has one).</span>
      </div>
    </div>

    <div class="flex flex-wrap gap-1 text-sm justify-center text-white p-2 scrollbar overflow-y-auto min-h-0 max-h-[60vh]">
      <div
        v-for="tag in Object.values(waifuTags).sort((a, b) => a.tag.localeCompare(b.tag))"
        :key="tag.tag"
        class="rounded-md cursor-pointer flex gap-1 p-0.5 select-none"
        :class="tag.color"
        :title="tag.desc ? tag.desc : ''"
        @click="tagToggles[tag.short] = threeToggle(tagToggles[tag.short])"
      >
        <div
          class="rounded p-0.5"
          :class="tagToggles[tag.short] === 1 ? tag.color : tagToggles[tag.short] === 0 ? 'bg-gray-400 text-gray-700' : 'bg-red-500 text-gray-400' "
        >
          {{ tag.tag }}
        </div>
      </div>
    </div>
  </Modal>
</template>

<script lang='ts' setup>
import { waifuTags } from '~/data/constants'
import { tagToggles, threeToggle } from '~/logic'

function toggleAll() {
  const val = threeToggle(tagToggles.F)
  Object.keys(tagToggles).forEach(key => tagToggles[key] = val)
}

</script>
