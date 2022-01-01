<template>
  <Modal label="Add New Character">
    <div class="p-2 flex flex-col gap-2 min-h-0 max-w-screen-sm">
      <div class="p-1 rounded border-2 border-green-500 mb-2">
        If you don't know what Tier assign to a Character check out
        <router-link :to="{path:'/', hash:'#pandora'}" class="text-blue-500 hover:underline">
          this
        </router-link>
      </div>
      <div class="p-1 rounded border-2 border-green-500 mb-2">
        <span>If you want to add NSFW image there is a list of sites that were confirmed to work:</span>
        <span class="text-blue-600 dark:text-blue-200 underline">
          <a class="ml-2" href="https://danbooru.donmai.us/" target="_blank" rel="noopener noreferrer">Danbooru</a>
          <a class="ml-2" href="http://www.hentai-foundry.com/" target="_blank" rel="noopener noreferrer">Hentai-Foundry</a>
          <a class="ml-2" href="https://e621.net/" target="_blank" rel="noopener noreferrer">e621</a>
          <a class="ml-2" href="https://safebooru.org/" target="_blank" rel="noopener noreferrer">Safebooru</a>
          <a class="ml-2" href="http://paheal.net" target="_blank" rel="noopener noreferrer">Paheal</a>
          <a class="ml-2" href="https://www.furaffinity.net/" target="_blank" rel="noopener noreferrer">Furaffinity</a>
          <a class="ml-2" href="https://www.reddit.com/" target="_blank" rel="noopener noreferrer">Reddit</a>
          <a class="ml-2" href="https://imgur.com" target="_blank" rel="noopener noreferrer">Imgur</a>
        </span>
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
      <TagInput
        v-model="tags"
        placeholder="Tags - press Enter to add"
        :error-message="errors.tags"
      />
      <Input v-if="serverSave" v-model="nickname" placeholder="Your nickname" :error-message="errors.nickname" name="login" />
      <div v-if="tierError" class="text-red-400 font-semibold">
        {{ tierError }}
      </div>
      <div v-if="processing" class="font-semibold">
        Processing <eos-icons:bubble-loading />
      </div>
      <div v-if="submitMessage" class="font-semibold">
        {{ submitMessage }}
      </div>
      <div class="flex gap-2">
        <Checkbox v-model="localSave" label="Local save" />
        <Checkbox v-model="serverSave" label="Propose to global" />
        <Button
          :disabled="!!submitMessage || !!processing"
          label="Add"
          class="flex-grow"
          bg-color="bg-blue-700"
          @click="!!submitMessage || !!processing? null : addCharacter()"
        />
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
import { getChars, getUserChars, waifuTags, waifuTagsByTag } from '~/data/constatnts'

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
const processing = ref(false)
const submitMessage = ref('')

const { userCharacters, localUserCharacters } = useStore()

const zodObject = zod.object({
  name: zod.string().nonempty('Character name is required').max(64, { message: 'Maximum length is 64 chars' }),
  world: zod.string().nonempty('World name is required').max(64, { message: 'Maximum length is 64 chars' }),
  sub: zod.string().nonempty('World name is required').max(64, { message: 'Maximum length is 64 chars' }).optional().or(zod.literal('')),
  tier: zod.number().min(1, { message: 'Minimum tier is 1' }).max(11, { message: 'Maximum tier is 11' }),
  image: zod.string().regex(/[^ \!@\$\^&\(\)\+\=]+(\.png|\.jpeg|\.gif|\.jpg|\.webp)$/, { message: 'Must be a valid image URL in a jpeg/jpg/png/gif/webp format.' }).max(256, { message: 'Maximum length is 256 chars' }),
  image_nsfw: zod.string().regex(/[^ \!@\$\^&\(\)\+\=]+(\.png|\.jpeg|\.gif|\.jpg|\.webp)$/, { message: 'Must be a valid image URL in a jpeg/jpg/png/gif/webp format.' }).max(256, { message: 'Maximum length is 256 chars' }).optional().or(zod.literal('')),
  tags: zod.string().max(24, { message: 'Max tag length is 24 chars' }).nonempty('No empty tags').array().max(10, { message: 'Maximum 10 tags' }),
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
    tags: props.character.tags || [],
  },
})

const { value: name } = useField<string>('name')
const { value: world } = useField<string>('world')
const { value: sub } = useField<string>('sub')
const { value: tier } = useField<number>('tier')
const { value: image } = useField<string>('image')
const { value: image_nsfw } = useField<string>('image_nsfw')
const { value: tags } = useField<string[]>('tags')
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

  if (!values.tags.includes(sex.value))
    values.tags.push(sex.value)
  values.tags = values.tags.map(x => waifuTagsByTag[x] ? waifuTagsByTag[x].short : x)
  values.uid = props.character.uid || random(10000000, 99999999)
  if (serverSave.value) {
    processing.value = true
    proposeCompanion({ ...values, date: new Date().toString() }, (msg) => {
      processing.value = false
      submitMessage.value = msg
      setTimeout(() => submitMessage.value = '', 5000)
    })
  }

  if (localSave.value)
    localUserCharacters.value.push(values)
  else
    userCharacters.value.push(values)
})

</script>
