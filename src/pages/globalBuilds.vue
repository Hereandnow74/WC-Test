<template>
  <div class="rounded p-2 flex flex-col gap-2">
    <Note type="info" title="WIP" class="max-w-[800px] mx-auto my-2">
      <p>This page is in a WIP stage.</p>
    </Note>
    <!-- <Button v-if="user.id" label="Save Build in Database" bg-color="bg-gray-800" class="my-4 mx-auto px-8" @click="sendBuildToServer" /> -->
    <div class="flex gap-2 flex-wrap">
      <Input v-model="textSearch" placeholder="Title or description" />
      <Input v-model="authorSearch" placeholder="Author" />
      <CharacterInput placeholder="Retinue" class="max-w-[200px]" @onChar="(val) => arrayInOut(retinueSearch, val.n)" />
      <AnythingInput
        :bought-list="challengesSearch"
        placeholder="Challenges"
        class="max-w-[200px]"
        :list="challenges.map(x => x.title)"
        @update:modelValue="(val) => arrayInOut(challengesSearch, val)"
      />
      <AnythingInput
        :bought-list="intensitySearch"
        placeholder="Intensity"
        class="max-w-[200px]"
        :list="intensity.map(x => x.title)"
        @update:modelValue="(val) => arrayInOut(intensitySearch, val)"
      />
      <AnythingInput
        v-model="bindingSearch"
        :bought-list="bindingSearch"
        placeholder="Binding"
        :list="bindings.filter(x => !x.whitelist).map(x => x.title)"
      />
      <Button label="Search" size="Small" @click="getBuilds" />
      <Button label="Clear" size="Small" @click="clear" />
    </div>
    <div class="overflow-y-auto scrollbar w-full">
      <div class="grid grid-cols-[repeat(auto-fill,minmax(370px,1fr))] gap-2">
        <div v-for="build in builds" :key="build.id">
          <BuildCard2 class="max-w-[440px]" :build="build" />
        </div>
        <div v-if="builds.length === 0" class="text-center">
          No results
        </div>
      </div>
    </div>
    <div class="h-8 w-8">
    </div>
  </div>
</template>

<script lang="ts" setup>

import { ServerBuild } from 'global'
import { getBuildsQuery, saveObject } from '~/logic'
import { useUser } from '~/store/user'
import { createBuildInDB, searchForBuilds } from '~/logic/server/'
import { confirmDialog } from '~/logic/dialog'
import { bindings } from '~/data/binding'
import { challenges } from '~/data/challenges'
import { intensity } from '~/data/intensity'

const { user, tokens } = useUser()

const builds = ref<ServerBuild[]>([])

const textSearch = ref('')
const authorSearch = ref('')
const bindingSearch = ref('')
const retinueSearch = ref([])
const challengesSearch = ref([])
const intensitySearch = ref([])

onMounted(() => getBuilds())

function getBuilds() {
  const options = {
    page: 1,
    limit: 25,
    sortBy: 'createdAt:desc',
  }

  if (textSearch.value) {
    options.title = textSearch.value
    options.desc = textSearch.value
  }

  if (authorSearch.value)
    options.name = authorSearch.value

  if (retinueSearch.value.length)
    options.retinueNames = retinueSearch.value

  if (challengesSearch.value.length)
    options.challenges = challengesSearch.value

  if (intensitySearch.value.length)
    options.intensity = intensitySearch.value

  searchForBuilds(options).then(res => builds.value = res.results)
}

function sendBuildToServer() {
  const build = {
    title: 'Test Build',
    name: user.value.name,
    build: saveObject.value,
    author: user.value.id,
    published: true,
    bindingName: 'None',
    originName: 'None',
    characterName: 'none',
    intensity: [],
    loan: 0,
    creditBalance: 0,
    creditsSpent: 0,
    customImages: false,
    dlc: false,
    retinue: [],
    retinueNotes: false,
    challenges: [],
    tags: [],
    likes: 0,
  }
  createBuildInDB(build).then(msg => confirmDialog(msg, 'info'))
}

function clear() {
  textSearch.value = ''
  authorSearch.value = ''
  bindingSearch.value = ''
  retinueSearch.value = []
  challengesSearch.value = []
  intensitySearch.value = []
}

function arrayInOut(array: any[], value: any) {
  if (array.includes(value))
    array.splice(array.indexOf(value), 1)
  else
    array.push(value)
}

</script>
