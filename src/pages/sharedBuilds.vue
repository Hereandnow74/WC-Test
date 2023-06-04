<template>
  <div class="rounded p-2 flex flex-col gap-2">
    <Note type="info" title="WIP" class="max-w-[800px] mx-auto my-2">
      <p>This page is in a WIP stage.</p>
    </Note>
    <router-link to="/globalBuilds" class="text-red-800 dark:text-red-400 underline hover:text-red-600">
      This page soon will be replaced by this one.
    </router-link>
    <div class="overflow-y-auto scrollbar w-full">
      <div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-1">
        <div v-for="build in builds" :key="build[0]">
          <BuildCard class="max-w-[390px]" :build="build[1]" :build-id="build[0]" />
        </div>
      </div>
      <Button v-if="thereIsMore" label="Load More" bg-color="bg-gray-800" class="my-4 mx-auto px-8" @click="getBuilds" />
    </div>
    <div class="h-8 w-8">
    </div>
  </div>
</template>

<script lang="ts" setup>

import { getBuildsQuery, toggleShowAddMission } from '~/logic'

const builds = ref([])

const lastSnap = ref(null)
const thereIsMore = ref(true)

onMounted(() => getBuilds())

function getBuilds() {
  getBuildsQuery((x, last) => {
    if (!x || x.length === 0 || x.length < 15)
      thereIsMore.value = false
    builds.value.push(...x)
    if (last)
      lastSnap.value = last
  }, lastSnap.value)
}

</script>
