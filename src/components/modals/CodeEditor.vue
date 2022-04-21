<template>
  <Modal label="Manual edit of your perk">
    <div class="overflow-y-auto scrollbar p-2">
      <pre>
        <code v-html="hg" />
      </pre>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import Prism from 'prismjs'
import 'prismjs/components/prism-json'

const props = defineProps({
  code: {
    type: Object,
    default: () => ({}),
  },
})

Prism.manual = true

const hg = Prism.highlight(JSON.stringify(props.code, null, 2), Prism.languages.json, 'json')
</script>
