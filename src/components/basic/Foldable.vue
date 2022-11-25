<template>
  <div>
    <div class="flex justify-between border-b border-gray-300 dark:border-gray-200 mb-2 leading-snug">
      <div class="flex gap-2 items-center">
        <h4 class="cursor-pointer" :class="titleStyle" @click="() => toggleFolded()" v-html="title">
        </h4>
        <slot name="buttons" />
      </div>
      <div class="hover:text-blue-500 cursor-pointer select-none" @click="() => toggleFolded()">
        <codicon:fold-up v-if="isFolded" />
        <codicon:fold-down v-else />
      </div>
    </div>
    <slot v-if="isFolded" />
  </div>
</template>

<script lang='ts' setup>

const props = defineProps({
  title: {
    type: String,
    default: 'Title',
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  titleStyle: {
    type: String,
    default: '',
  },
})

const isFolded = ref(props.isOpen)

watch(() => props.isOpen, () => isFolded.value = props.isOpen)

function toggleFolded() {
  isFolded.value = !isFolded.value
}
</script>
