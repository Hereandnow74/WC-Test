<template>
  <div>
    <div class="flex justify-between border-b border-gray-300 dark:border-gray-200 mb-2 leading-snug">
      <div class="flex gap-2">
        <h4 class="">
          {{ title }}
        </h4>
        <slot name="buttons" />
      </div>
      <div class="hover:text-blue-500 cursor-pointer" @click="() => toggleFolded()">
        <codicon:fold-up v-if="isFolded" />
        <codicon:fold-down v-else />
      </div>
    </div>
    <slot v-if="isFolded" />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Name',

  props: {
    title: {
      type: String,
      default: 'Title',
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const isFolded = ref(false)

    watch(() => props.isOpen, () => isFolded.value = props.isOpen)

    function toggleFolded() {
      isFolded.value = !isFolded.value
    }

    return {
      isFolded,
      toggleFolded,
    }
  },
})
</script>
