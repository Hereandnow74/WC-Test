<template>
  <Modal label="Add New Character">
    <div class="p-2 flex flex-col gap-2 min-h-0">
      <div class="p-1 rounded border-2 border-green-500 mb-2">
        If you don't know what Tier assign to a Character check out
        <router-link :to="{path:'/', hash:'#pandora'}" class="text-blue-500 hover:underline">
          this
        </router-link>
      </div>
      <div class="flex gap-2">
        <Input v-model="name" placeholder="Name" class="flex-grow" :error-message="errors.name" />
        <NumberInput v-model="tier" label="Tier" :max="11" :error-message="errors.tier" />
      </div>
      <div class="flex gap-2">
        <InputWithSearch
          v-model="world"
          idd="worldSearch"
          :list="allWorlds"
          placeholder="World Name"
          class="flex-grow"
          :error-message="errors.world"
        />
        <InputWithSearch
          v-model="sub"
          idd="subSearch"
          :list="allSubs"
          placeholder="Sub-category"
          class="flex-grow"
          :error-message="errors.sub"
        />
      </div>
      <Input v-model="image" placeholder="Image URL" :error-message="errors.image" />
      <Input v-model="image_nsfw" placeholder="NSFW Image URL" :error-message="errors.image_nsfw" />
      <div class="flex gap-2 items-center">
        <span>Sex: </span>
        <label class="text-pink-500 dark:text-pink-300">Female<input v-model="sex" type="radio" name="gender" value="F" class="ml-2"></label>
        <label class="text-blue-500 dark:text-blue-300">Male<input v-model="sex" type="radio" name="gender" value="M" class="ml-2"></label>
        <label class="text-gray-500 dark:text-gray-300">Other<input v-model="sex" type="radio" name="gender" value="O" class="ml-2"></label>
      </div>
      <Input v-if="serverSave" v-model="nickname" placeholder="Your nickname" :error-message="errors.nickname" name="login" />
      <div v-if="tierError" class="text-red-400 font-semibold">
        {{ tierError }}
      </div>
      <div class="flex gap-2">
        <Checkbox v-model="localSave" label="Local save" />
        <Checkbox v-model="serverSave" label="Propose to global" />
        <Button label="Add" class="flex-grow" bg-color="bg-blue-700" @click="addCharacter" />
      </div>
    </div>
  </Modal>
</template>

<script lang='ts' setup>
import * as zod from 'zod'
import { useForm, useField } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'
import { random, uniq } from 'lodash-es'
import { useStore } from '~/store/store'
import { proposeCompanion, toggleShowAddCharacter } from '~/logic'
import { getChars, getUserChars } from '~/data/constatnts'

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

const chars = ref<any[]>([])

getChars().then(x => chars.value.push(...x))
getUserChars().then(x => chars.value.push(...x))

const localSave = ref(true)
const serverSave = ref(false)
const sex = ref(props?.character?.tags?.[0] || 'F')

const tierError = ref('')
const tierConfirm = ref(false)

const { userCharacters, localUserCharacters } = useStore()

const zodObject = zod.object({
  name: zod.string().nonempty('Character name is required').max(64, { message: 'Maximum length is 64 chars' }),
  world: zod.string().nonempty('World name is required').max(64, { message: 'Maximum length is 64 chars' }),
  sub: zod.string().nonempty('World name is required').max(64, { message: 'Maximum length is 64 chars' }).optional().or(zod.literal('')),
  tier: zod.number().min(1, { message: 'Minimum tier is 1' }).max(11, { message: 'Maximum tier is 11' }),
  image: zod.string().url({ message: 'Must be a valid URL' }).max(256, { message: 'Maximum length is 256 chars' }),
  image_nsfw: zod.string().url({ message: 'Must be a valid URL' }).max(256, { message: 'Maximum length is 256 chars' }).optional().or(zod.literal('')),
})

const zodGlobal = zodObject.extend({ nickname: zod.string().nonempty('Nickname is required') })

const schema = computed(() => serverSave.value ? toFormValidator(zodGlobal) : toFormValidator(zodObject))

const allWorlds = computed(() => uniq(chars.value.map(x => x.w)))
const allSubs = computed(() => uniq(chars.value.filter(x => x.d).map(x => x.d)))

const { errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    tier: props.character.tier || 1,
    world: props.character.world || '',
    sub: props.character.sub || '',
    name: props.character.name || '',
    image: props.character.image || '',
    image_nsfw: props.character.image_nsfw || '',
  },
})

const { value: name } = useField<string>('name')
const { value: world } = useField<string>('world')
const { value: sub } = useField<string>('sub')
const { value: tier } = useField<number>('tier')
const { value: image } = useField<string>('image')
const { value: image_nsfw } = useField<string>('image_nsfw')
const { value: nickname } = useField<string>('nickname')

const addCharacter = handleSubmit((values) => {
  if (values.tier === 1 && !tierConfirm.value) {
    tierError.value = 'Are you sure that Tier=1, if yes click "Add" again'
    tierConfirm.value = true
    return
  }
  if (serverSave.value) {
    if (values.image.includes('wiki') && !tierConfirm.value) {
      tierError.value = 'Do you really want to add a plain image from wiki? If yes click "Add" again'
      tierConfirm.value = true
      return
    }
  }

  tierError.value = ''
  tierConfirm.value = false

  values.tags = [sex.value]
  values.uid = random(10000000, 99999999)
  if (serverSave.value)
    proposeCompanion({ ...values, date: new Date().toString() })

  if (localSave.value)
    localUserCharacters.value.push(values)
  else
    userCharacters.value.push(values)
  toggleShowAddCharacter()
})

</script>
