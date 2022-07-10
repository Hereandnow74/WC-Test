<template>
  <Modal label="Share your build" class="text-gray-800 dark:text-gray-200">
    <div class="dark:bg-gray-700 py-4 flex flex-col min-h-0 px-4">
      <div v-if="!isDone" class="mx-auto mt-2 w-max flex gap-2">
        <Input v-model="name" placeholder="Your nickname" />
        <Button label="Generate link" size="Small" @click="generateLink" />
      </div>
      <div v-else>
        <span v-if="generating">Generating link <eos-icons:bubble-loading /></span>
        <div v-else class="border border-gray-400 dark:border-gray-500 rounded px-2 flex items-center">
          <span>{{ link }}</span> <span class="ml-2 cursor-pointer hover:text-amber-500" title="Copy link" @click="copyLink">
            <bx:bx-copy-alt class="block" />
          </span>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script lang='ts' setup>
import Input from '../basic/Input.vue'
import { saveObject, shareLink } from '~/logic'

const name = ref('')
const link = ref('')
const generating = ref(false)
const isDone = ref(false)

function generateLink() {
  if (name.value.length <= 2) return
  isDone.value = true
  generating.value = true
  const nickname = name.value.length > 40 ? name.value.slice(0, 40) : name.value
  shareLink({ nickname, date: new Date().toString(), ...saveObject.value }, (docRef: any) => {
    link.value = `https://waifu-catalog.neocities.org/?load=${docRef.id}`
    generating.value = false
  })
}

function copyLink() {
  navigator.clipboard.writeText(link.value)
}

</script>
