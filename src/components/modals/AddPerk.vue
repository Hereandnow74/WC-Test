<template>
  <Modal label="Propose a Perk" class="!z-30">
    <div class="p-2 flex flex-col gap-2 min-h-0 w-full">
      <div class="flex gap-2">
        <Input v-model="title" class="flex-grow" placeholder="Perk title" :error-message="errors.title" />
        <Input v-model.number="cost" class="w-24" label="Cost" :error-message="errors.cost" />
        <NumberInput
          v-model.number="max"
          class="whitespace-nowrap"
          label="Max count"
          :min="1"
          :max="99"
          :error-message="errors.max"
        />
      </div>
      <div class="flex gap-2">
        <Input v-model="author" class="w-1/3" placeholder="Author" :error-message="errors.author" />
        <Input v-model="source" class="flex-grow" placeholder="Source link" :error-message="errors.source" />
      </div>
      <Input v-model="special" class="flex-grow" placeholder="Special requirements / effects" :error-message="errors.special" />
      <TextArea v-model="desc" placeholder="Perk description" :rows="'4'" :error-message="errors.desc" />
      <div class="flex gap-2">
        <AnythingInput v-model="type" class="flex-grow" placeholder="Type" :list="perkCats" :error-message="errors.type" />
        <AnythingInput v-model="subType" placeholder="Sub type" :list="subTypes[type] || []" :error-message="errors.subType" />
      </div>
      <div v-if="requires.length" class="flex gap-x-3 flex-wrap">
        Requires:
        <span
          v-for="title, i in requires "
          :key="title"
          class="text-blue-500 hover:text-red-500 cursor-pointer"
          @click="requires.splice(i, 1)"
        >{{ title }}</span>
      </div>
      <InputWithSearch
        placeholder="Press enter to add required perk name"
        :list="Object.keys(ALL_PERK_TITLES)"
        @keypress.enter="(e) => requires.push(e.target.value)"
        @optionClicked="(e) => requires.push(e)"
      />
      <Input v-model="image" placeholder="Image link" :error-message="errors.image" />
      <div v-if="successMessage" class="dark:text-green-400 text-green-900">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="dark:text-red-400 text-red-700">
        {{ errorMessage }}
      </div>
      <div class="flex gap-2">
        <Button v-if="localPerksExist" icon="fa-solid:clipboard-list" title="Local Perks Manager" bg-color="bg-blue-600" @click="togglePerksManager" />
        <Button label="Add Locally" class="flex-grow" bg-color="bg-orange-600" @click="addLocally" />
        <Button :disabled="!buttonActive" label="Send" class="flex-grow" bg-color="bg-red-700" @click="buttonActive ? addPerk() : errorMessage = 'Wait 30s before submitting again.'" />
      </div>
      <div class="hidden xl:block absolute h-[100vh] left-[calc(100%+0.5rem)]">
        <PerkCard
          class="bg-gray-200 min-w-[400px] max-w-[600px] dark:bg-gray-700 flex-grow"
          :perk="submittedPerk"
        />
      </div>
    </div>
    <LocalPerksManager v-if="showPerksManager" @click="showPerksManager = false" @sendDelete="deletePerk" @sendEdit="editPerk" />
  </Modal>
</template>

<script lang='ts' setup>
import * as zod from 'zod'
import { useForm, useField } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'

import { findIndex } from 'lodash-es'
import { proposePerk, randomString, showAddPerk, togglePerksManager, showPerksManager } from '~/logic'
import { ALL_PERK_TITLES } from '~/data/constants'
import { localPerks } from '~/logic/localPerks'

const perkCats = ['Challenge', 'Origin', 'Intensity', 'Binding', 'Lure', 'Other control', 'Heritage', 'Demiplane & Dungeons', 'Talent', 'Defense', 'Other', 'Generic waifu perk', 'Specific waifu perk']
const subTypes = {
  Heritage: ['Dragon', 'Transhuman', 'Outsider'],
  Binding: ['Stamp', 'Jewelry', 'Shroud', 'Symbiote'],
}

const successMessage = ref('')
const errorMessage = ref('')
const buttonActive = ref(true)

const schema = toFormValidator(
  zod.object({
    title: zod.string().max(128, 'Max length 128 chars').nonempty('Title is required'),
    author: zod.string().nonempty('Author is required'),
    source: zod.string(),
    special: zod.string(),
    requires: zod.string().array(),
    cost: zod.number(),
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
    special: '',
    requires: [],
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
const { value: special } = useField<string>('special')
const { value: requires } = useField<string[]>('requires')

const submittedPerk = computed(() => {
  return {
    uid: randomString(),
    title: title.value,
    dlc: author.value,
    cost: cost.value,
    desc: desc.value,
    image: image.value,
    whitelist: requires.value,
    special: special.value,
    local: type.value,
  }
})

const localPerksExist = computed(() => Object.values(localPerks.value).some(x => x.length))

const addPerk = handleSubmit((values) => {
  proposePerk({ ...values, date: new Date().toString() }, () => successMessage.value = 'Perk was sent successfully, await until I review and add it')
  buttonActive.value = false
  setTimeout(() => { buttonActive.value = true; successMessage.value = ''; errorMessage.value = '' }, 30 * 1000)
})

function addLocally() {
  if (['Binding', 'Lure', 'Other control', 'Heritage', 'Demiplane & Dungeons', 'Talent', 'Other', 'Generic waifu perk'].includes(type.value)) {
    if (!localPerks.value[type.value]) localPerks.value[type.value] = []
    localPerks.value[type.value].push(submittedPerk.value)
    showAddPerk.value = false
  }
  else {
    errorMessage.value = 'Adding perk of this category not supported yet.'
    setTimeout(() => { errorMessage.value = '' }, 30 * 1000)
  }
}

function deletePerk(perk: any) {
  localPerks.value[perk.local].splice(findIndex(localPerks.value[perk.local], { uid: perk.uid }), 1)
}

function editPerk(perk: any) {
  title.value = perk.title
  cost.value = perk.cost
  desc.value = perk.desc
  author.value = perk.dlc
  type.value = perk.local
  subType.value = perk.subType
  image.value = perk.image
  special.value = perk.special
  requires.value = perk.whitelist
  togglePerksManager()
}

</script>
