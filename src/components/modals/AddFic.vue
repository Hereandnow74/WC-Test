<template>
  <Modal label="Propose a Fic" class="!z-30">
    <div class="p-2 flex flex-col gap-2 min-h-0 w-full overflow-y-auto scrollbar">
      <div class="flex gap-2">
        <Input v-model="title" class="flex-grow" placeholder="Fic title" :error-message="errors.title" />
      </div>
      <div class="flex gap-2">
        <Input v-model="author" class="w-1/3" placeholder="Author" :error-message="errors.author" />
        <Input v-model="link" class="flex-grow" placeholder="Fic URL" :error-message="errors.link" />
      </div>
      <div class="flex gap-2 flex-wrap">
        <Input v-model="startingWorld" label="World" class="flex-grow" placeholder="Starting World" :error-message="errors.startingWorld" />
        <Input v-model="length" label="Legnth" class="w-34" placeholder="Length" :error-message="errors.length" />
        <AnythingInput v-model="status" class="w-28" placeholder="Status" :list="statuses" :error-message="errors.status" />
      </div>
      <div v-if="tags.length" class="flex gap-x-3 flex-wrap">
        Tags:
        <span
          v-for="tag, i in tags "
          :key="tag"
          class="text-blue-500 hover:text-red-500 cursor-pointer"
          @click="tags.splice(i, 1)"
        >{{ tag }}</span>
      </div>
      <InputWithSearch
        v-model="tag"
        placeholder="Press enter to add tag"
        :list="tagList"
        @keypress.enter="(e) => {tags.push(e.target.value); tag = ''}"
        @optionClicked="(e) => {tags.push(e); tag = ''}"
      />
      <div v-if="successMessage" class="dark:text-green-400 text-green-900">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="dark:text-red-400 text-red-700">
        {{ errorMessage }}
      </div>
      <div class="flex justify-center gap-2">
        <Button
          :disabled="!buttonActive"
          label="Send"
          size="small"
          class="px-8"
          bg-color="bg-green-700"
          @click="buttonActive ? addPerk() : errorMessage = 'Wait 30s before submitting again.'"
        />
      </div>
    </div>
  </Modal>
</template>

<script lang='ts' setup>
import * as zod from 'zod'
import { useForm, useField } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'

import { proposeFic, toggleAddFic } from '~/logic'

const props = defineProps({
  fic: {
    type: Object,
    default: () => ({}),
  },
})

const statuses = ['Active', 'Completed', 'Hiatus', 'Dropped']
const tagList = ['Harem', 'Transhuman', 'Dragon', 'Outsider', 'Shroud', 'Megapixel', 'Jewelry', 'Symbiote', 'Possess', 'Substitute', 'Walk-In']

const successMessage = ref('')
const errorMessage = ref('')
const buttonActive = ref(true)
const tag = ref('')

const schema = toFormValidator(
  zod.object({
    title: zod.string().max(256, 'Max length 256 chars').nonempty('Title is required'),
    author: zod.string().nonempty('Author is required'),
    link: zod.string().nonempty('Link is required'),
    startingWorld: zod.string().nonempty('Starting World is required'),
    status: zod.string().nonempty('Status is required'),
    length: zod.string(),
    tags: zod.string().array(),
  }),
)

const { errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    title: props.fic.title || '',
    author: props.fic.author || '',
    link: props.fic.link || '',
    startingWorld: props.fic.startingWorld || '',
    status: props.fic.status || '',
    length: props.fic.length || '',
    tags: props.fic.tags || [],
  },
})

const { value: title } = useField<string>('title')
const { value: link } = useField<string>('link')
const { value: author } = useField<string>('author')
const { value: startingWorld } = useField<string>('startingWorld')
const { value: length } = useField<number>('length')
const { value: status } = useField<string>('status')
const { value: tags } = useField<string[]>('tags')

const addPerk = handleSubmit((values) => {
  proposeFic({ ...values, subDate: new Date().toString() }, () => successMessage.value = 'Successfully proposed a fic to the list, wait until I will add it')
  buttonActive.value = false
  setTimeout(() => { buttonActive.value = true; successMessage.value = ''; errorMessage.value = '' }, 30 * 1000)
})

// const copyText = handleSubmit((values) => {
//   navigator.clipboard.writeText(JSON.stringify(values))
//   buttonActive.value = false
//   setTimeout(() => { buttonActive.value = true; successMessage.value = ''; errorMessage.value = '' }, 30 * 1000)
// })

</script>
