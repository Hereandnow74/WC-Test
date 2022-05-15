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
      <Input v-model.number="budget" class="" placeholder="Estimated required budget to qualify for this mission" :error-message="errors.budget" />
      <div class="flex gap-2">
        <InputWithSearch
          v-model.trim="loca"
          idd="worldSearch"
          :list="allWorldNames"
          placeholder="World Name"
          class="flex-grow"
          :error-message="errors.loca"
        />
        <AnythingInput v-model="scope" class="w-28" placeholder="Scope" :list="scopes" :error-message="errors.scope" />
      </div>
      <div class="min-h-max">
        <TextArea v-model="desc" placeholder="Mission description" :rows="'4'" :error-message="errors.desc" />
      </div>
      <div class="flex flex-col gap-2">
        <Input
          v-model="reward"
          class="flex-grow"
          placeholder="Main reward"
          :error-message="errors.reward"
        />
      </div>
      <h3 class="flex gap-2 items-center cursor-pointer" @click="conditions.push({value: ''})">
        Conditions
        <span class="text-sm text-gray-500 dark:text-gray-300">(like - stealth/no kill/tier limit/do it yourself/XX perk disabled/etc.)</span>
        <fluent:add-12-filled class="text-green-200 hover:text-green-500" />
      </h3>
      <div class="flex flex-col gap-2">
        <div
          v-for="condition, i in conditions"
          :key="condition"
          class="flex gap-1"
        >
          <Input
            v-model="condition.value"
            class="flex-grow"
            :placeholder="`Condition #${i + 1}`"
            :error-message="errors.conditions"
          />
          <fluent:delete-20-filled class="text-red-500 hover:text-red-400 cursor-pointer" @click="conditions.splice(i, 1)" />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <h3 class="flex gap-4 items-center cursor-pointer" @click="objectives.push({value: '', reward: ''})">
          Additional objectives  <fluent:add-12-filled class="text-green-200 hover:text-green-500" />
        </h3>
        <div
          v-for="requirement, i in objectives"
          :key="requirement"
          class="flex gap-1 items-center"
        >
          <div class="flex flex-col gap-2 flex-grow">
            <Input
              v-model="requirement.value"
              :placeholder="`Requirement #${i + 1}`"
              :error-message="errors.objectives"
            />
            <Input
              v-model="requirement.reward"
              :placeholder="`Bonus reward (optional) #${i + 1}`"
              :error-message="errors.objectives"
            />
          </div>
          <fluent:delete-20-filled class="text-red-500 hover:text-red-400 cursor-pointer" @click="objectives.splice(i, 1)" />
        </div>
      </div>
      <Input v-model="image" placeholder="Image link" :error-message="errors.image" />
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
        <!-- <Button label="Copy" class="flex-grow" bg-color="bg-red-700" @click="copyText()" /> -->
      </div>
    </div>
  </Modal>
</template>

<script lang='ts' setup>
import * as zod from 'zod'
import { useForm, useField } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'

import { proposeMission } from '~/logic'
import { useWorlds } from '~/data/constants'

const scopes = ['Quick', 'Standard', 'Grand']

const successMessage = ref('')
const errorMessage = ref('')
const buttonActive = ref(true)

const { allWorldNames } = useWorlds()

const schema = toFormValidator(
  zod.object({
    title: zod.string().max(128, 'Max length 128 chars').nonempty('Title is required'),
    author: zod.string().nonempty('Author is required'),
    source: zod.string(),
    budget: zod.number().min(0, 'Min 0 credits').max(2000, 'Max 2000 credits'),
    loca: zod.string().nonempty('Location is required'),
    scope: zod.string().nonempty('Scope is required'),
    conditions: zod.object({ value: zod.string() }).array(),
    objectives: zod.object({ value: zod.string(), reward: zod.string() }).array(),
    reward: zod.string().nonempty('Reward is required'),
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
    budget: '',
    desc: '',
    loca: '',
    scope: '',
    conditions: [
      { value: '' },
    ],
    objectives: [],
    reward: '',
    image: '',
  },
})

const { value: title } = useField<string>('title')
const { value: source } = useField<string>('source')
const { value: author } = useField<string>('author')
const { value: desc } = useField<string>('desc')
const { value: budget } = useField<number>('budget')
const { value: loca } = useField<string>('loca')
const { value: scope } = useField<string>('scope')
const { value: conditions } = useField<any[]>('conditions')
const { value: objectives } = useField<any[]>('objectives')
const { value: reward } = useField<any[]>('reward')
const { value: image } = useField<string>('image')

const addPerk = handleSubmit((values) => {
  proposeMission({ ...values, date: new Date().toString() }, () => successMessage.value = 'Mission was send successfully, await until I review and add it')
  buttonActive.value = false
  setTimeout(() => { buttonActive.value = true; successMessage.value = ''; errorMessage.value = '' }, 30 * 1000)
})

</script>
