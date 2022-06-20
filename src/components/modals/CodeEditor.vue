<template>
  <Modal label="Manual edit of your perk">
    <div class="overflow-y-auto scrollbar p-2">
      <pre class="relative">
        <code v-html="hg" />
        <textarea v-model="codeEdit" class="absolute inset-0 bg-transparent text-transparent caret-white " />
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

const codeEdit = ref(JSON.stringify(props.code, null, 2))

Prism.manual = true

const hg = computed(() => Prism.highlight(codeEdit.value, Prism.languages.json, 'json'))
</script>
