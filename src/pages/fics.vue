<template>
  <div class="rounded p-2">
    <div class="flex gap-2 justify-center items-center flex-wrap py-2">
      <Input v-model="search" placeholder="Fic name or author" />
      <clarity:eraser-solid class="icon-btn w-8" @click="clearAndReset" />
      <Select v-model="author" :options="authorOptions" label="Author" class="max-w-48">
        <option value="Any">
          Any
        </option>
      </Select>
      <Select v-model="world" :options="worldOptions" label="World" class="max-w-48">
        <option value="Any">
          Any
        </option>
      </Select>
      <Select v-model="status" :options="statusOptions" label="Status">
        <option value="Any">
          Any
        </option>
      </Select>
      <Button
        class="text-base"
        size="Small"
        icon="fluent:book-question-mark-24-regular"
        label="Propose a fic to the list"
        bg-color="bg-purple-700"
        @click="() => {currentFic = {}; toggleAddFic()}"
      />
    </div>
    <div v-if="filteredTags" class="flex gap-1 flex-wrap font-semibold mb-1 justify-center">
      <div v-for="tag, i in filteredTags" :key="tag" class="bg-teal-300 border-teal-500 dark:(bg-teal-800 border-teal-600) rounded border-b-2 border-r-2  px-1 w-max cursor-pointer" @click="filteredTags.splice(i, 1)">
        {{ tag }}
      </div>
    </div>
    <div class="grid 2xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 gap-4 pb-8 justify-center">
      <div v-for="fic in filteredFics" :key="fic.title" class="bg-amber-100 dark:bg-indigo-900 rounded p-2 relative flex flex-col">
        <a
          :href="fic.link"
          target="_blank"
          rel="noopener noreferrer"
          class="text-lg hover:underline font-semibold pr-6"
        >
          {{ fic.title }}
        </a>
        <div class="flex justify-between text-sm">
          <div @click="author = fic.author">
            by <span class="font-semibold text-violet-600 dark:text-violet-400 hover:underline cursor-pointer">{{ fic.author }}</span>
          </div>
          <div class="flex gap-2">
            <div>Length: <span :class="fic.length ==='unknown' ? 'text-gray-500' : 'text-blue-800 dark:text-blue-300'">{{ fic.length }}</span></div>
            <div>Status: <span :class="fic.status ==='unknown' ? 'text-gray-500' : 'text-amber-800 dark:text-amber-300'">{{ fic.status }}</span></div>
          </div>
        </div>
        <div v-if="fic.tags.length" class="mt-2 flex gap-1 flex-wrap font-semibold justify-center">
          <div v-for="tag in fic.tags" :key="tag" class="bg-teal-300 border-teal-500 dark:(bg-teal-800 border-teal-600) rounded border-b-2 border-r-2  px-1 w-max cursor-pointer" @click="filteredTags.includes(tag) ? null : filteredTags.push(tag)">
            {{ tag }}
          </div>
        </div>
        <div class="mt-auto">
          <div class="flex justify-between text-sm mt-2">
            <div>
              Starting World: <span class="hover:underline cursor-pointer" :class="fic.startingWorld === 'unknown' ? 'text-gray-500' :'font-semibold dark:text-orange-400'" @click="world = fic.startingWorld">{{ fic.startingWorld }}</span>
            </div>
            <div class="text-gray-700 dark:text-green-400">
              Created on: <span>{{ fic.date }}</span>
            </div>
          </div>
        </div>
        <bx:bxs-edit class="absolute top-1 right-1 cursor-pointer hover:text-yellow-600" @click.stop="editFic(fic)" />
      </div>
    </div>
    <div class="h-8"></div>
  </div>
</template>

<script lang="ts" setup>
import { groupBy } from 'lodash-es'
import { toggleAddFic, currentFic } from '~/logic'

interface Fic {
  'length': number | string
  'tags': string[]
  'startingWorld': string
  'status': 'Active' | 'Completed' | 'Hiatus'
  'title': string
  'author': string
  'date': string
  'link': string
}

const fics = ref([] as Fic[])

const statusOptions = ['Active', 'Completed', 'Hiatus', 'Dropped']

const author = ref('Any')
const world = ref('Any')
const status = ref('Any')

const filteredTags = ref([])

const search = ref('')

const authorOptions = computed(() => Object.keys(groupBy(fics.value, 'author')).sort((a, b) => a.localeCompare(b)))
const worldOptions = computed(() => Object.keys(groupBy(fics.value, 'startingWorld')).sort((a, b) => a.localeCompare(b)))

const filteredFics = computed(() => {
  return fics.value.filter(x => (x.title.toLowerCase().includes(search.value.toLowerCase()) || x.author.toLowerCase().includes(search.value.toLowerCase()))
  && (world.value === 'Any'
    ? true
    : x.startingWorld === world.value)
  && (author.value === 'Any'
    ? true
    : x.author === author.value)
  && (status.value === 'Any'
    ? true
    : x.status === status.value)
  && filteredTags.value.every(tag => x.tags.includes(tag)))
})

async function loadFics() {
  fics.value = (await import('~/data/json/fics.json')).default as Fic[]
}

function editFic(fic: any) {
  currentFic.value = fic
  toggleAddFic()
}

function clearAndReset() {
  author.value = 'Any'
  world.value = 'Any'
  status.value = 'Any'
  search.value = ''
}

loadFics()

</script>
