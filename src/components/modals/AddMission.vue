<template>
  <Modal :label="mission ? 'Edit a Mission' : 'Propose a Mission'" class="!z-30">
    <div class="max-h-[90vh] p-2 flex flex-col gap-2 min-h-0 w-full overflow-y-auto scrollbar">
      <div v-if="mission?.uid" class="text-sm font-semibold text-red-700 dark:text-red-400">
        This form is for fixing errors, do not use is to submit new missions.
      </div>
      <div class="flex gap-2">
        <Input v-model.trim="title" class="flex-grow" placeholder="Mission title" :error-message="errors.title" />
      </div>
      <div class="flex gap-2">
        <Input v-model.trim="author" class="w-1/3" placeholder="Author" :error-message="errors.author" />
        <Input v-model="source" class="flex-grow" placeholder="Source link" :error-message="errors.source" />
      </div>
      <Input v-model.number="budget" class="" placeholder="Estimated required budget to qualify for this mission" :error-message="errors.budget" />
      <div class="text-sm font-semibold text-orange-700 dark:text-orange-300">
        If world doesn't matter for your mission, type 'Generic' in world field
      </div>
      <div class="flex gap-2">
        <InputWithSearch
          v-model.trim="loca"
          idd="worldSearch"
          :list="[...allWorldNames, 'Generic']"
          placeholder="World Name"
          class="flex-grow"
          :error-message="errors.loca"
        />
        <AnythingInput v-model="scope" class="w-28" placeholder="Scope" :list="scopes" :error-message="errors.scope" />
      </div>
      <div class="min-h-max">
        <TextArea v-model="desc" placeholder="Mission description" :rows="'4'" :error-message="errors.desc" />
      </div>
      <div class="flex gap-2">
        <Select v-model="rewardType" placeholder="Reward Type" :options="['Credits', 'IMG Tickets', 'Perks', 'Companions', 'Other']" :error-message="errors.rewardType" />
        <NumberInput
          v-if="['Credits', 'IMG Tickets'].includes(rewardType)"
          v-model="reward"
          placeholder="Main reward"
          :error-message="errors.reward"
          :min="0"
          class="flex-grow"
        />
        <Input
          v-else
          v-model.trim="reward"
          placeholder="Main reward"
          :error-message="errors.reward"
          class="flex-grow"
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
            v-model.trim="condition.value"
            class="flex-grow"
            :placeholder="`Condition #${i + 1}`"
            :error-message="errors[`conditions[${i}].value`]"
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
          class="flex gap-1 items-center bg-gray-300 dark:bg-gray-600 p-1 rounded"
        >
          <div class="flex flex-col gap-2 flex-grow">
            <TextArea
              v-model.trim="requirement.value"
              :placeholder="`Requirement #${i + 1}`"
              :rows="'1'"
              :error-message="errors[`objectives[${i}].value`]"
            />
            <div class="flex gap-2">
              <Select
                v-model="requirement.type"
                placeholder="Reward Type"
                :options="['Credits', 'IMG Tickets', 'Perks', 'Companions', 'Other']"
                :error-message="errors[`objectives[${i}].type`]"
              />
              <NumberInput
                v-if="['Credits', 'IMG Tickets'].includes(requirement.type)"
                v-model="requirement.reward"
                :placeholder="`Bonus reward (optional) #${i + 1}`"
                :error-message="errors[`objectives[${i}].reward`]"
                :min="0"
                class="flex-grow"
              />
              <Input
                v-else
                v-model.trim="requirement.reward"
                :placeholder="`Bonus reward (optional) #${i + 1}`"
                :error-message="errors[`objectives[${i}].reward`]"
                class="flex-grow"
              />
            </div>
          </div>
          <fluent:delete-20-filled class="text-red-500 hover:text-red-400 cursor-pointer" @click="objectives.splice(i, 1)" />
        </div>
      </div>
      <div class="flex gap-2 items-center">
        <Input v-model="image" class="flex-grow" placeholder="Image link" :error-message="errors.image" />
        <Toggle v-model="lewd" title="It should not be gross, no lolicon, and use your common sense." class="cursor-help" label="Image is 18+" />
      </div>
      <div v-if="successMessage" class="dark:text-green-400 text-green-900">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="dark:text-red-400 text-red-700">
        {{ errorMessage }}
      </div>
      <div class="flex justify-center gap-2">
        <Button
          :disabled="!buttonActive"
          :label="mission ? 'Send Edited Mission': 'Send'"
          size="small"
          class="px-8"
          bg-color="bg-green-700"
          @click="buttonActive ? addPerk() : errorMessage = 'Wait 30s before submitting again.'"
        />
        <Toggle v-model="temporary" class="cursor-help" label="Do not send to global" title="Mission will be added temporary to missions page, so you will be able to check it out." />
      </div>
    </div>
  </Modal>
</template>

<script lang='ts' setup>
import * as zod from 'zod'
import { useForm, useField } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'

import type { Mission } from 'global'
import type { PropType } from '@vue/runtime-core'
import { proposeMission } from '~/logic'
import { useWorlds } from '~/data/constants'
import { useSaves } from '~/store/saves'

const props = defineProps({
  mission: {
    type: Object as PropType<Mission>,
  },
  missions: {
    type: Array as PropType<Mission[]>,
    default: () => ([]),
  },
})

const scopes = ['Quick', 'Standard', 'Grand']

const successMessage = ref('')
const errorMessage = ref('')
const buttonActive = ref(true)
const temporary = ref(false)

const { allWorldNames } = useWorlds()
const { userNickname } = useSaves()

const schema = toFormValidator(
  zod.object({
    title: zod.string().max(128, 'Max length 128 chars').min(1, 'Title is required'),
    author: zod.string().min(1, 'Author is required'),
    source: zod.string(),
    budget: zod.number().min(0, 'Min 0 credits').max(2000, 'Max 2000 credits'),
    loca: zod.string().min(1, 'Location is required'),
    scope: zod.string().min(1, 'Scope is required'),
    conditions: zod.object({ value: zod.string().min(1, 'Condition should not be empty').max(256, 'Max 256 characters') }).array(),
    objectives: zod.object({
      value: zod.string().min(1, 'Requirement should not be empty').max(256, 'Max 256 characters'),
      reward: zod.string().min(1, 'Reward should not be empty').max(128, 'Max 128 characters').or(zod.number().min(0, 'Min 0 credits').max(20000, 'Max 20000 credits')),
      type: zod.string().min(1, 'Choose a Reward Type'),
    }).array(),
    reward: zod.string().min(1, 'Reward should not be empty').max(256, 'Max 256 characters').or(zod.number().min(0, 'Min 0 credits').max(20000, 'Max 20000 credits')),
    rewardType: zod.string().min(1, 'Reward type is required'),
    image: zod.string().regex(/[^ \!@\$\^&\(\)\+\=]+(\.png|\.jpeg|\.gif|\.jpg|\.webp)$/, { message: 'Must be a valid image URL in a jpeg/jpg/png/gif/webp format.' }).max(256, { message: 'Maximum length is 256 chars' }).optional().or(zod.literal('')),
    lewd: zod.boolean(),
    desc: zod.string().max(5000, 'Max length is 5000 chars').min(1, 'Description is required'),
  }),
)

const { errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    title: props.mission?.title || '',
    author: props.mission?.author ? props.mission.author : (userNickname.value ? userNickname.value : ''),
    source: props.mission?.source || '',
    budget: props.mission?.budget || 0,
    desc: props.mission?.desc || '',
    loca: props.mission?.loca || '',
    scope: props.mission?.scope || 'Standard',
    conditions: props.mission?.conditions || [
      { value: '' },
    ],
    objectives: props.mission?.objectives || [],
    reward: props.mission?.reward || '',
    rewardType: props.mission?.rewardType || '',
    image: props.mission?.image || '',
    lewd: props.mission?.lewd || false,
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
const { value: rewardType } = useField<any[]>('rewardType')
const { value: image } = useField<string>('image')
const { value: lewd } = useField<boolean>('lewd')

const addPerk = handleSubmit((values) => {
  const seed = window.localStorage.getItem('seed')
  const proposal = { ...values, date: new Date().toString(), seed }
  if (props.mission?.uid)
    proposal.uid = props.mission.uid
  if (!temporary.value)
    proposeMission(proposal, () => successMessage.value = 'Mission was send successfully, await until I review and add it')
  props.missions.unshift({ ...proposal, temprorary: true })
  buttonActive.value = false
  setTimeout(() => { buttonActive.value = true; successMessage.value = ''; errorMessage.value = '' }, 30 * 1000)
})

</script>
