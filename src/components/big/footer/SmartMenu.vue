<template>
  <div class="flex flex-col gap-1 px-2 py-1 bg-blue-gray-700 border border-gray-600">
    <div
      class="cursor-pointer hover:text-amber-500 flex gap-2 items-center border-b border-gray-600"
      title="Clear Build"
      @click="clearBuild"
    >
      <ant-design:clear-outlined />
      Clear Build
    </div>
    <div
      class="cursor-pointer hover:text-amber-500 flex gap-2 items-center border-b border-gray-600"
      title="Save & Load"
      @click="showSaveLoad = true"
    >
      <fluent:save-24-regular />
      Save & Load
    </div>
    <div
      class="cursor-pointer hover:text-amber-500 flex gap-2 items-center border-b border-gray-600"
      title="Share"
      @click="showShare = true"
    >
      <ant-design:share-alt-outlined />
      Share
    </div>
    <div class="cursor-pointer hover:text-amber-500 flex gap-2 items-center border-b border-gray-600" title="Copy Text of Build" @click="copyText">
      <bx:bx-copy-alt />
      Copy Text of Build
    </div>
    <div class="cursor-pointer flex gap-2 border-gray-600">
      <div class="flex gap-2 items-center hover:text-amber-500" title="Copy Image of Build" @click="buildImage">
        <uil:image-upload />
        Copy Image of Build
      </div>
      <div class="border-l-2 border-gray-500 pl-2 flex items-center hover:text-amber-500" title="Image Settings" @click="showBuildImageSettings = true">
        <bi:gear-fill />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { buildImage, clearBuild, copyText, showShare, showSaveLoad, showBuildImageSettings } from '~/logic'

</script>
