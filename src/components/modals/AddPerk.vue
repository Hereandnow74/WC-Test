<template>
  <Modal label="Propose a Perk" class="!z-30">
    <div class="p-2 flex flex-col gap-2 min-h-0 w-full">
      <div class="flex gap-2">
        <Input v-model="title" class="flex-grow" placeholder="Perk title" :error-message="errors.title" />
        <Input v-model.number="cost" class="w-24" label="Cost" :error-message="errors.cost" />
        <Input v-model.number="max" class="w-36" label="Max count" :error-message="errors.max" />
      </div>
      <div class="flex gap-2">
        <Input v-model="author" class="w-1/3" placeholder="Author" :error-message="errors.author" />
        <Input v-model="source" class="flex-grow" placeholder="Source link" :error-message="errors.source" />
      </div>

      <TextArea v-model="desc" place-holder="Perk description" :rows="'4'" :error-message="errors.desc" />
      <div class="flex gap-2">
        <AnythingInput v-model="type" class="flex-grow" placeholder="Type" :list="perkCats" :error-message="errors.type" />
        <AnythingInput v-model="subType" placeholder="Sub type" :list="subTypes[type] || []" :error-message="errors.subType" />
      </div>
      <Input v-model="image" placeholder="Image link" :error-message="errors.image" />
      <div v-if="successMessage" class="dark:text-green-400 text-green-900">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="dark:text-red-400 text-red-700">
        {{ errorMessage }}
      </div>
      <div class="flex gap-2">
        <!-- <Checkbox v-model="localSave" label="Local save" /> -->
        <!-- <Checkbox v-model="serverSave" label="Global save" /> -->
        <Button :disabled="!buttonActive" label="Send" class="flex-grow" bg-color="bg-red-700" @click="buttonActive ? addPerk() : errorMessage = 'Wait 30s before submitting again.'" />
      </div>
    </div>
  </Modal>
</template>

<script lang='ts' setup>
import * as zod from 'zod'
import { useForm, useField } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'

import { proposePerk } from '~/logic'

const perkCats = ['Challenge', 'Origin', 'Intensity', 'Binding', 'Lure', 'Other control', 'Heritage', 'Talent',
  'Defense', 'Misc', 'Generic waifu perk', 'Specific waifu perk']
const subTypes = {
  Heritage: ['Dragon', 'Transhuman', 'Outsider'],
  Binding: ['Stamp', 'Jewelry', 'Ritual', 'Shroud', 'Symbiote'],
}

const successMessage = ref('')
const errorMessage = ref('')
const buttonActive = ref(true)

const schema = toFormValidator(
  zod.object({
    title: zod.string().max(128, 'Max length 128 chars').nonempty('Title is required'),
    author: zod.string().nonempty('Author is required'),
    source: zod.string(),
    cost: zod.number().min(0, { message: 'Minimum Cost is 0' }),
    max: zod.number().min(1, { message: 'Minimum count is 1' }),
    type: zod.string().nonempty('Type is required'),
    subType: zod.string(),
    image: zod.string().regex(/[^ \!@\$\^&\(\)\+\=]+(\.png|\.jpeg|\.gif|\.jpg|\.webp)$/, { message: 'Must be a valid image URL in a jpeg/jpg/png/gif/webp format.' }).max(256, { message: 'Maximum length is 256 chars' }).optional().or(zod.literal('')),
    desc: zod.string().max(5000, 'Max length is 5000 chars').nonempty('Description is required'),
  }),
)

const { errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    title: '',
    author: '',
    source: '',
    cost: 0,
    max: 1,
    desc: '',
    type: '',
    subType: '',
    image: '',
  },
})

const { value: title } = useField<string>('title')
const { value: source } = useField<string>('source')
const { value: author } = useField<string>('author')
const { value: cost } = useField<number>('cost')
const { value: max } = useField<number>('max')
const { value: desc } = useField<string>('desc')
const { value: type } = useField<string>('type')
const { value: subType } = useField<string>('subType')
const { value: image } = useField<string>('image')

const addPerk = handleSubmit((values) => {
  proposePerk({ ...values, date: new Date().toString() }, () => successMessage.value = 'Perk was send successfully, await until I\'m review and add it')
  buttonActive.value = false
  setTimeout(() => { buttonActive.value = true; successMessage.value = ''; errorMessage.value = '' }, 30 * 1000)
})

</script>
