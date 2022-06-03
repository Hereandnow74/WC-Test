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
        <div class="text-sm">
          <span
            class="text-blue-900 dark:text-blue-200"
          >Hover over tag to see description (if it has one).</span>
        </div>
        <Toggle v-model="onlyDefense" label="Only defense discount tags" />
        <Toggle v-model="fullTags" label="Full" />
      </div>
      <div v-if="fullTags" class="flex flex-col gap-1 overflow-y-auto scrollbar mx-1 my-2 p-1 border rounded border-gray-500">
        <div
          v-for="tag in allTagsFiltered"
          :key="tag.tag"
          class="flex gap-2 odd:bg-warm-gray-700"
        >
          <div class="flex">
            <div
              class="rounded-md cursor-pointer flex items-center gap-1 select-none p-0.5 px-1 whitespace-nowrap self-center"
              :class="tag.color"
              :title="tag.desc ? tag.desc : ''"
              @click="tagToggles[tag.short] = threeToggle(tagToggles[tag.short])"
            >
              <div class="rounded flex gap-1">
                {{ tag.tag }}
              </div>
              <!-- <span v-if="tagToggles[tag.short] !== 0" :key="tagToggles[tag.short]" class="iconify" :data-icon="tagToggles[tag.short] === 1 ? 'akar-icons:circle-check' : 'ant-design:stop-outlined'"></span> -->
              <akar-icons:circle-check v-if="tagToggles[tag.short] === 1" />
              <jam:stop-sign v-if="tagToggles[tag.short] === -1" />
            </div>
          </div>
          <div>
            {{ tag.desc }}
          </div>
        </div>
      </div>
      <div
        v-else
        class="flex flex-wrap gap-1 text-sm justify-center text-white p-2 scrollbar overflow-y-auto min-h-0 max-h-[60vh]"
      >
        <div
          v-for="tag in allTagsFiltered"
          :key="tag.tag"
          class="rounded-md cursor-pointer flex items-center gap-1 select-none p-0.5 px-1"
          :class="tag.color"
          :title="tag.desc ? tag.desc : ''"
          @click="tagToggles[tag.short] = threeToggle(tagToggles[tag.short])"
        >
          <div class="rounded flex gap-1">
            {{ tag.tag }}
          </div>
          <!-- <span v-if="tagToggles[tag.short] !== 0" :key="tagToggles[tag.short]" class="iconify" :data-icon="tagToggles[tag.short] === 1 ? 'akar-icons:circle-check' : 'ant-design:stop-outlined'"></span> -->
          <akar-icons:circle-check v-if="tagToggles[tag.short] === 1" />
          <jam:stop-sign v-if="tagToggles[tag.short] === -1" />
        </div>
      </div>
    </div>
  </Modal>
</template>

<script lang='ts' setup>
import { waifuTags } from '~/data/constants'
import { tagToggles, threeToggle } from '~/logic'

const onlyDefense = ref(false)
const fullTags = ref(false)

function toggleAll() {
  const val = threeToggle(tagToggles.F)
  Object.keys(tagToggles).forEach(key => tagToggles[key] = val)
}

const defTags = [
  'Sturdy',
  'Harsh',
  'from',
  'Monster Tamer',
  'Cool',
  'Materialist',
  'Psychic',
  'Mind Powers',
  'Bodyjack',
  'Drain HP/MP/SP',
  'Instant Death',
  'Immortality',
  'Polymorph',
  'Unstable Reality',
  'Corrupting',
  'Social',
  'Divination',
  'Fate manipulation',
  'Luck manipulation',
  'Time manipulation',
]

const allTagsFiltered = computed(() => {
  return Object.values(waifuTags).filter(tag => onlyDefense.value ? defTags.includes(tag.tag) : true).sort((a, b) => a.tag.localeCompare(b.tag))
})

</script>
