<template>
  <Modal label="Local Perks Manager">
    <div class="flex flex-col gap-1 overflow-y-auto scrollbar">
      <div class="font-semibold text-green-700 dark:text-green-300 grid grid-cols-10 px-1 even:bg-gray-300 dark:even:bg-warm-gray-700">
        <div class="col-span-6">
          Title
        </div>
        <div class="col-span-3 border-l-2 pl-2 border-gray-700 dark:border-gray-600">
          Category
        </div>
        <div class="border-l-2 pl-2 border-gray-700 dark:border-gray-600">
          Action
        </div>
      </div>
      <div v-for="perk in allLocalPerks" :key="perk.uid" class="grid grid-cols-10 px-1 even:bg-gray-300 dark:even:bg-warm-gray-700">
        <div class="col-span-6">
          {{ perk.title }}
        </div>
        <div class="col-span-3 border-l-2 pl-2 border-gray-700 dark:border-gray-600 overflow-ellipsis whitespace-nowrap overflow-hidden">
          {{ perk.local }}
        </div>
        <div class="flex items-center gap-1 border-l-2 pl-2 border-gray-700 dark:border-gray-600">
          <div title="Edit" @click="sendEdit(perk)">
            <bx:bxs-edit class="icon-text-btn" />
          </div>
          <div title="Edit text" @click="(currentCode = perk,toggleCodeEditor())">
            <fluent:text-edit-style-20-filled class="icon-text-btn" />
          </div>
          <div title="Delete" @click="sendDelete(perk)">
            <fluent:delete-20-filled class="icon-text-btn" />
          </div>
        </div>
      </div>
    </div>
    <CodeEditor v-if="showCodeEditor" :code="currentCode" @click="showCodeEditor = false" />
  </Modal>
</template>

<script lang="ts" setup>
import { concat } from 'lodash-es'
import { localPerks } from '~/logic/localPerks'
import { toggleCodeEditor, showCodeEditor } from '~/logic/toggles'

const allLocalPerks = computed(() => concat(...Object.values(localPerks.value)))

const currentCode = ref({})

const emit = defineEmits(['sendDelete', 'sendEdit'])

function sendDelete(perk: any) {
  emit('sendDelete', perk)
}

function sendEdit(perk: any) {
  emit('sendEdit', perk)
}

</script>
