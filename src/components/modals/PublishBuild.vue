<template>
  <Modal label="Publish your build" class="text-gray-800 dark:text-gray-200">
    <div class="dark:bg-gray-700 p-2 flex flex-col gap-2 min-h-0">
      <Input v-model="title" placeholder="Title or name for your build" />
      <TextArea v-model="desc" placeholder="Description for your build" />
      <div class="mx-auto mt-2 w-max flex gap-2">
        <Input v-model="userNickname" placeholder="Your nickname" />
        <Button :disabled="isDone" label="Publish" size="Small" @click="isDone ? null : shareBuild()" />
      </div>
      <div v-if="isDone">
        <span v-if="generating">Publishing <eos-icons:bubble-loading /></span>
        <div v-else class="px-2">
          Success! <router-link class="text-blue-500 hover:underline" :to="'/sharedBuilds'">
            Go to Builds page
          </router-link>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script lang='ts' setup>
import Input from '../basic/Input.vue'
import { saveObject, saveBuildGlobally } from '~/logic'
import { confirmDialog } from '~/logic/dialog'
import { useSaves } from '~/store/saves'

const { userNickname } = useSaves()
const title = ref('')
const desc = ref('')
const generating = ref(false)
const isDone = ref(false)

async function shareBuild() {
  const confirm = await confirmDialog('This action will post your build globally and everyone would be able to see it, proceed?')
  if (confirm) {
    if (userNickname.value.length <= 2) return
    if (title.value.length <= 2) return
    isDone.value = true
    generating.value = true
    userNickname.value = userNickname.value.length > 40 ? userNickname.value.slice(0, 40) : userNickname.value
    title.value = title.value.length > 128 ? title.value.slice(0, 128) : title.value
    desc.value = desc.value.length > 1024 ? desc.value.slice(0, 1024) : desc.value
    saveBuildGlobally({ nickname: userNickname.value, date: new Date().getTime(), ...saveObject.value, title: title.value, desc: desc.value }, (docRef: any) => {
      generating.value = false
    })
  }
}

</script>
