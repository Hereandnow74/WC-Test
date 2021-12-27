<template>
  <Modal label="Propose a Mission" class="!z-30">
    <div class="p-2 flex flex-col gap-2 min-h-0 w-full overflow-y-auto scrollbar">
      <div class="flex gap-2">
        <Input v-model="title" class="flex-grow" placeholder="Mission title" :error-message="errors.title" />
      </div>
      <div class="flex gap-2">
        <Input v-model="author" class="w-1/3" placeholder="Author" :error-message="errors.author" />
        <Input v-model="source" class="flex-grow" placeholder="Source link" :error-message="errors.source" />
      </div>
      <div class="flex gap-2">
        <Input v-model="loca" class="flex-grow" placeholder="World/Location" :error-message="errors.loca" />
        <AnythingInput v-model="scope" class="w-28" placeholder="Scope" :list="scopes" :error-message="errors.scope" />
      </div>
      <div class="min-h-max">
        <TextArea v-model="desc" place-holder="Mission description" :rows="'4'" :error-message="errors.desc" />
      </div>
      <h3 class="flex gap-4 items-center cursor-pointer" @click="requirements.push({value: ''})">
        Requirements  <fluent:add-12-filled class="hover:text-green-500" />
      </h3>
      <div class="flex flex-col gap-2">
        <div
          v-for="requirement, i in requirements"
          :key="requirement"
          class="flex gap-1"
        >
          <Input
            v-model="requirement.value"
            class="flex-grow"
            :placeholder="`Requirement #${i + 1}`"
            :error-message="errors.requirements"
          />
          <fluent:delete-20-filled class="text-red-500 hover:text-red-400 cursor-pointer" @click="requirements.splice(i, 1)" />
        </div>
      </div>
      <h3 class="flex gap-4 items-center cursor-pointer" @click="rewards.push({value: ''})">
        Rewards  <fluent:add-12-filled class="hover:text-green-500" />
      </h3>
      <div class="flex flex-col gap-2">
        <div
          v-for="reward, i in rewards"
          :key="reward"
          class="flex gap-1"
        >
          <Input
            v-model="reward.value"
            class="flex-grow"
            :placeholder="`Requirement #${i + 1}`"
            :error-message="errors.rewards"
          />
          <fluent:delete-20-filled class="text-red-500 hover:text-red-400 cursor-pointer" @click="rewards.splice(i, 1)" />
        </div>
      </div>
      <Input v-model="image" placeholder="Image link" :error-message="errors.image" />
      <div v-if="successMessage" class="dark:text-green-400 text-green-900">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="dark:text-red-400 text-red-700">
        {{ errorMessage }}
      </div>
      <div class="flex gap-2">
        <Button :disabled="!buttonActive" label="Send" class="flex-grow" bg-color="bg-red-700" @click="buttonActive ? addPerk() : errorMessage = 'Wait 30s before submitting again.'" />
      </div>
    </div>
  </Modal>
</template>

<script lang='ts' setup>
import * as zod from 'zod'
import { useForm, useField } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'

import { proposeMission } from '~/logic'

const scopes = ['Quick', 'Standard', 'Grand']

const successMessage = ref('')
const errorMessage = ref('')
const buttonActive = ref(true)

const schema = toFormValidator(
  zod.object({
    title: zod.string().max(128, 'Max length 128 chars').nonempty('Title is required'),
    author: zod.string().nonempty('Author is required'),
    source: zod.string(),
    loca: zod.string().nonempty('Location is required'),
    scope: zod.string().nonempty('Scope is required'),
    requirements: zod.object({ value: zod.string() }).array(),
    rewards: zod.object({ value: zod.string() }).array(),
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
    desc: '',
    loca: '',
    scope: '',
    requirements: [],
    rewards: [],
    image: '',
  },
})

const { value: title } = useField<string>('title')
const { value: source } = useField<string>('source')
const { value: author } = useField<string>('author')
const { value: desc } = useField<string>('desc')
const { value: loca } = useField<string>('loca')
const { value: scope } = useField<string>('scope')
const { value: requirements } = useField<any[]>('requirements')
const { value: rewards } = useField<any[]>('rewards')
const { value: image } = useField<string>('image')

const addPerk = handleSubmit((values) => {
  proposeMission({ ...values, date: new Date().toString() }, () => successMessage.value = 'Mission was send successfully, await until I review and add it')
  buttonActive.value = false
  setTimeout(() => { buttonActive.value = true; successMessage.value = ''; errorMessage.value = '' }, 30 * 1000)
})

</script>
