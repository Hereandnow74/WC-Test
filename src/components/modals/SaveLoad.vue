<template>
  <Modal label="Save & Load" class="text-gray-800 dark:text-gray-200 z-40">
    <div class="dark:bg-black py-2 flex flex-col min-h-0 max-h-[85vh] md:h-3/4">
      <div class="pb-2 px-4 flex gap-2 justify-between">
        <div class="flex gap-2">
          <Input v-model="filter" placeholder="Filter by name of the save" />
          <Button size="Small" label="Clear" bg-color="bg-red-500" @click="filter = ''" />
        </div>
        <div class="flex gap-4">
          <div title="Save All" class="text-lg">
            <mdi:folder-zip class="hover:text-red-500 cursor-pointer" @click="saveAll()" />
          </div>
          <div title="Delete All" class="text-lg">
            <fluent:delete-20-filled class="hover:text-red-500 cursor-pointer" @click="deleteAll()" />
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-2 pb-4 md:px-2 overflow-y-auto scrollbar">
        <div
          v-for="save in sortedSaveList"
          :key="save.worldName"
          class="bg-gray-300 dark:bg-gray-700 rounded-xl px-2 py-1 flex gap-1 mx-2 shadow-lg "
          border="1 gray-700 dark:gray-300"
        >
          <div class="grid grid-cols-2 flex-grow">
            <h3 class="col-span-2 text-center text-lg">
              {{ save.name }} <span class="text-sm text-gray-500 dark:text-gray-300">
                ({{ useTimeAgo(new Date(save.date)).value }})
              </span>
            </h3>
            <div class="text-gray-600 dark:text-gray-400">
              World: <span class="text-orange-600 dark:text-orange-400">{{ save.worldName }}</span>
            </div>
            <div class="text-gray-600 dark:text-gray-400">
              Danger Rating: <span class="text-green-600 dark:text-green-400">{{ save.rating }}</span>
            </div>
            <div class="text-gray-600 dark:text-gray-400">
              Total cost of build: <span class="text-green-600 dark:text-green-400">{{ save.totalCost }}</span>
            </div>
            <div v-if="save.intensity !== undefined" class="text-gray-600 dark:text-gray-400">
              Intensity: <span class="text-green-600 dark:text-green-400">{{ save.intensity }}</span>
            </div>
          </div>
          <div class="flex flex-col gap-1 justify-between rounded-xl bg-gray-200 dark:bg-gray-800 py-2 px-1">
            <div title="Load">
              <clarity:floppy-outline-alerted class="hover:text-green-500 cursor-pointer" @click="loadBuild(save.uid)" />
            </div>
            <div title="Overwrite">
              <mdi:content-save-cog class="hover:text-green-500 cursor-pointer" @click="rewrite(save.uid, save.name)" />
            </div>
            <div title="Delete">
              <fluent:delete-20-filled class="hover:text-red-500 cursor-pointer" @click="deleteSave(save.uid)" />
            </div>
          </div>
        </div>
      </div>
      <div class="mt-2 px-4 flex gap-2 w-full">
        <Input v-model="name" class="flex-grow" placeholder="Save name" />
        <Button label="Save" size="Small" @click="saveBuild" />
      </div>
      <div class="mx-auto px-4 mt-2 w-max flex gap-2">
        <a ref="saveButton" href="#" @click="saveBuildFile">
          <Button label="Save File" size="Small" bg-color="bg-blue-500" class="h-full" />
        </a>
        <input ref="loadEl" type="file" class="hidden" @change="loadBuildFile" />
        <Button label="Load File" size="Small" bg-color="bg-blue-500" @click="() => loadEl.click()" />
        <Button
          label="Export to Clipboard"
          :icon="copySuccess ? 'fa-solid:check' : ''"
          size="Small"
          bg-color="bg-orange-500"
          @click="exportToClip()"
        />
        <Button label="Import" size="Small" bg-color="bg-orange-500" @click="showImportDialog = true" />
      </div>
    </div>
    <Modal v-if="showImportDialog" label="Save & Load" class="text-gray-800 dark:text-gray-200 z-50" @click="showImportDialog = false">
      <div class="p-1 relative flex flex-col h-[85vh] scrollbar overflow-y-auto">
        <pre class="relative flex-grow p-1">
          <code class="whitespace-pre-wrap" v-html="hg" />
          <textarea v-model="buildData" rows="20" class="p-1 absolute inset-0 bg-transparent text-transparent caret-white" placeholder="Paste build data here" />
        </pre>
        <Button
          label="Load"
          size="Small"
          class="absolute top-2 right-2"
          bg-color="bg-orange-500"
          @click="loadFromText"
        />
      </div>
    </Modal>
  </Modal>
</template>

<script lang='ts' setup>
import { useTimeAgo } from '@vueuse/core'
import { findIndex, random, remove } from 'lodash-es'

import JSZip from 'jszip'
import Prism from 'prismjs'
import Input from '../basic/Input.vue'
import { useSaves } from '~/store/saves'
import { useStore } from '~/store/store'
import { saveObject, writeBuildValues } from '~/logic'

import 'prismjs/components/prism-json'
import { confirmDialog } from '~/logic/dialog'

const { savesList } = useSaves()

const { startingWorld, totalCost, difficultyRating } = useStore()

const name = ref('')
const saveButton = ref<HTMLLinkElement | null>(null)
const loadEl = ref<HTMLElement | null>(null)
const showImportDialog = ref(false)
const buildData = ref('')
const copySuccess = ref(false)
const filter = ref('')

const saves = useStorage<Record<number, any>>('saves', {})

const sortedSaveList = computed(() => {
  return [...savesList.value].reverse().filter(x => x.name.toLowerCase().includes(filter.value.toLowerCase()))
})

function saveBuild() {
  const uid = random(1000000, 9999999)
  savesList.value.push({
    uid,
    name: name.value,
    worldName: startingWorld.value.worldName,
    rating: startingWorld.value.rating,
    totalCost: totalCost.value,
    intensity: difficultyRating.value,
    date: new Date().toString(),
  })
  saves.value[uid] = saveObject.value
}

async function rewrite(uid: number, name: string) {
  if (!(await confirmDialog('This action will overwrite this save. Proceed?'))) return
  const ind = findIndex(savesList.value, { uid })
  if (ind !== -1) {
    savesList.value[ind] = {
      uid,
      name,
      worldName: startingWorld.value.worldName,
      rating: startingWorld.value.rating,
      totalCost: totalCost.value,
      intensity: difficultyRating.value,
      date: new Date().toString(),
    }
    saves.value[uid] = saveObject.value
  }
}

function loadBuild(uid: number) {
  const build = saves.value[uid]
  writeBuildValues(build)
}

function deleteSave(uid: number) {
  remove(savesList.value, { uid })
  delete saves.value[uid]
}

async function deleteAll() {
  if (await confirmDialog('Are you sure you want to delete all saves?')) {
    savesList.value = []
    saves.value = {}
  }
}

// Save all builds to a ZIP file
function saveAll() {
  const zip = new JSZip()
  savesList.value.forEach((save) => {
    zip.file(`${save.name}.json`, JSON.stringify(saves.value[save.uid]))
  })
  zip.generateAsync({ type: 'blob' }).then((content) => {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(content)
    a.download = 'all_saves.zip'
    a.click()
  })
}

function saveBuildFile() {
  const myFile = new Blob([JSON.stringify(saveObject.value)], { type: 'text/plain' })
  if (saveButton.value) {
    saveButton.value.setAttribute('href', window.URL.createObjectURL(myFile))
    saveButton.value.setAttribute('download', `save_${startingWorld.value.worldName}`)
  }
}

function loadBuildFile(event: any) {
  if (event?.target?.files[0]) {
    event.target.files[0].text().then((val) => {
      try {
        const build = JSON.parse(val)
        writeBuildValues(build)
      }
      catch {
        console.error('Error when loading from file')
      }
    })
  }
}

function exportToClip() {
  navigator.clipboard.writeText(JSON.stringify(saveObject.value, null, 2))
  copySuccess.value = true
}

function loadFromText() {
  if (buildData.value) {
    writeBuildValues(JSON.parse(buildData.value))
    buildData.value = ''
  }
  showImportDialog.value = false
}

Prism.manual = true

const hg = computed(() => Prism.highlight(buildData.value, Prism.languages.json, 'json'))

</script>
