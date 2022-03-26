<template>
  <Modal label="Save & Load" class="text-gray-800 dark:text-gray-200 z-40">
    <div class="dark:bg-black py-2 flex flex-col min-h-0 max-h-[85vh] md:h-3/4">
      <div class="pb-2 px-4 flex gap-2">
        <Input v-model="filter" placeholder="Filter by name of the save" />
        <Button size="Small" label="Clear" bg-color="bg-red-500" @click="filter = ''" />
      </div>
      <div class="flex flex-col gap-2 pb-4 md:px-2 overflow-y-auto">
        <div
          v-for="save in sortedSaveList"
          :key="save.worldName"
          class="bg-gray-300 dark:bg-gray-700 rounded-xl p-2 flex gap-1 mx-2 shadow-lg "
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
              Rating: <span class="text-green-600 dark:text-green-400">{{ save.rating }}</span>
            </div>
            <div class="text-gray-600 dark:text-gray-400 col-span-2">
              Total cost of build: <span class="text-green-600 dark:text-green-400">{{ save.totalCost }}</span>
            </div>
          </div>
          <div class="flex flex-col gap-1 justify-between rounded-xl bg-gray-200 dark:bg-gray-800 py-2 px-1">
            <clarity:floppy-outline-alerted class="hover:text-green-500 cursor-pointer" @click="loadBuild(save.uid)" />
            <fluent:delete-20-filled class="hover:text-red-500 cursor-pointer" @click="deleteSave(save.uid)" />
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
      <div class="p-1 relative">
        <textarea v-model="buildData" rows="10" class="w-full border rounded text-gray-800 p-1 min-w-screen-sm" placeholder="Paste build data here" />
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
import { random } from 'lodash'
import { remove } from 'lodash-es'
import Input from '../basic/Input.vue'
import { useSaves } from '~/store/saves'
import { useStore } from '~/store/store'
import { getSaveObject, writeBuildValues } from '~/logic'

const { savesList } = useSaves()

const { startingWorld, totalCost } = useStore()

const name = ref('')
const saveButton = ref<HTMLLinkElement>(null)
const loadEl = ref<HTMLElement>(null)
const showImportDialog = ref(false)
const buildData = ref('')
const copySuccess = ref(false)
const filter = ref('')

const saves = useStorage<Record<number, any>>('saves', {})

const save = getSaveObject()

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
    date: new Date().toString(),
  })
  saves.value[uid] = save
}

function loadBuild(uid: number) {
  const build = saves.value[uid]
  writeBuildValues(build)
}

function deleteSave(uid: number) {
  remove(savesList.value, { uid })
  delete saves.value[uid]
}

function saveBuildFile() {
  const myFile = new Blob([JSON.stringify(save)], { type: 'text/plain' })
  saveButton.value.setAttribute('href', window.URL.createObjectURL(myFile))
  saveButton.value.setAttribute('download', `save_${startingWorld.value.worldName}`)
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
  navigator.clipboard.writeText(JSON.stringify(save))
  copySuccess.value = true
}

function loadFromText() {
  if (buildData.value) {
    writeBuildValues(JSON.parse(buildData.value))
    buildData.value = ''
  }
  showImportDialog.value = false
}

</script>
