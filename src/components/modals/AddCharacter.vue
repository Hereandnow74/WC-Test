<template>
  <Modal label="Add New Character">
    <div class="p-2 flex flex-col gap-2 min-h-0">
      <div class="p-1 rounded border-2 border-green-500 mb-2">
        If you don't know what Tier assign to a Companion check out
        <router-link :to="{path:'/', hash:'#pandora'}" class="text-blue-500 hover:underline">
          this
        </router-link>
      </div>
      <div class="flex gap-2">
        <Input v-model="name" placeholder="Name" class="w-3/4" :error-message="errors.name" />
        <NumberInput v-model="tier" label="Tier" :max="11" :error-message="errors.tier" />
        <Input v-model="world" placeholder="World Name" class="w-3/4" :error-message="errors.world" />
      </div>
      <Input v-model="image" placeholder="Image URL" :error-message="errors.image" />
      <Input v-model="image_nsfw" placeholder="NSFW Image URL" :error-message="errors.image_nsfw" />
      <div class="flex gap-2 items-center">
        <span>Sex: </span>
        <label class="text-pink-500">Female<input v-model="sex" type="radio" name="gender" value="F" class="ml-2"></label>
        <label class="text-blue-500">Male<input v-model="sex" type="radio" name="gender" value="M" class="ml-2"></label>
        <label class="text-gray-500">Other<input v-model="sex" type="radio" name="gender" value="O" class="ml-2"></label>
      </div>
      <div class="flex gap-2">
        <Checkbox v-model="localSave" label="Local save" />
        <Checkbox v-model="serverSave" label="Propose to global" />
        <Button label="Add" class="flex-grow" bg-color="bg-red-700" @click="addCharacter" />
      </div>
    </div>
  </Modal>
</template>

<script lang='ts' setup>
import * as zod from 'zod'
import { useForm, useField } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'
import { useStore } from '~/store/store'
import { proposeCompanion, toggleShowAddCharacter } from '~/logic'

const props = defineProps({
  editMode: {
    type: Boolean,
    default: false,
  },
  character: {
    type: Object,
    default: () => ({}),
  },
})

const localSave = ref(true)
const serverSave = ref(false)
const sex = ref('F')
const { userCharacters, localUserCharacters } = useStore()

const schema = toFormValidator(
  zod.object({
    name: zod.string().nonempty('Character name is required'),
    world: zod.string().nonempty('World name is required'),
    tier: zod.number().min(1, { message: 'Minimum tier is 1' }).max(11, { message: 'Maximum tier is 11' }),
    image: zod.string().url({ message: 'Must be a valid URL' }).max(256, { message: 'Maximum length is 256 chars' }),
    image_nsfw: zod.string().url({ message: 'Must be a valid URL' }).max(256, { message: 'Maximum length is 256 chars' }).optional().or(zod.literal('')),
  }),
)
const { errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    tier: props.character.tier || 1,
    world: props.character.world || '',
    name: props.character.name || '',
    image: props.character.image || '',
    image_nsfw: props.character.image_nsfw || '',
  },
})

const { value: name } = useField<string>('name')
const { value: world } = useField<string>('world')
const { value: tier } = useField<number>('tier')
const { value: image } = useField<string>('image')
const { value: image_nsfw } = useField<string>('image_nsfw')

const addCharacter = handleSubmit((values) => {
  values.tags = [sex.value]
  if (serverSave.value)
    proposeCompanion({ ...values, date: new Date().toString() })

  if (localSave.value) localUserCharacters.value.push(values)
  else userCharacters.value.push(values)
  toggleShowAddCharacter()
})

</script>
