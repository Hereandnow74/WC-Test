<template>
  <div class="rounded p-2 flex flex-col gap-2">
    <Note type="info" title="WIP" class="max-w-[800px] mx-auto my-2">
      <p>This page is in a WIP stage and only shows 15 most recent builds published using a new button in Build tab.</p>
    </Note>
    <div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-1 overflow-y-auto scrollbar w-full">
      <div v-for="build in builds" :key="build.date">
        <BuildCard class="max-w-[390px]" :build="build" />
      </div>
    </div>
    <div class="h-8 w-8">
    </div>
  </div>
</template>

<script lang="ts" setup>

import { getBuildsQuery, toggleShowAddMission } from '~/logic'

const builds = ref([])

const lastSnap = ref(null)

onMounted(() => getBuilds())

function getBuilds() {
  getBuildsQuery((x, last) => {
    builds.value.push(...x)
    if (last)
      lastSnap.value = last
  }, lastSnap.value)
}

</script>
