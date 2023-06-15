<template>
  <Modal label="Add New Character">
    <div class="max-h-[90vh] flex relative max-w-screen-sm min-h-0">
      <img ref="testImage" class="absolute h-[1px] w-[1px]" :src="image" alt="" @load="imageLoaded">
      <div class="flex flex-col p-2 gap-2 min-h-0 overflow-y-auto scrollbar">
        <Note type="warning" title="Rules">
          Before adding characters to global - read <b>rules</b> first! If you think your character have <b>only a small chance</b> of passing, just keep it local.
          <Button label="Rules" size="Small" bg-color="bg-red-500" @click="showRules = true" />
        </Note>
        <div class="flex gap-2">
          <Input v-model.trim="name" placeholder="Name" class="flex-grow" :error-message="errors.name" />
          <Tiers v-model="tier" label="Tier" :max="11" :error-message="errors.tier" />
        </div>
        <div class="flex gap-2 items-center">
          <InputWithSearch
            v-model.trim="world"
            idd="worldSearch"
            :list="allWorldNames"
            placeholder="World Name"
            class="flex-grow"
            :error-message="errors.world"
          />
          <InputWithSearch
            v-model.trim="sub"
            idd="subSearch"
            :list="allSubs"
            placeholder="Sub-category"
            class="flex-grow"
            :error-message="errors.sub"
          />
          <div v-if="editMode && sub" class="cursor-pointer hover:text-red-500" title="Delete Sub-category from global" @click="sub = 'Will be deleted.'">
            <fluent:delete-20-filled />
          </div>
        </div>
        <Input v-model="image" placeholder="Image URL" :error-message="errors.image" />
        <div v-if="imageErrorMessage" class="text-red-600 dark:text-red-300 text-sm">
          {{ imageErrorMessage }}
        </div>
        <div v-if="image_nsfw" class="text-orange-600 dark:text-orange-300 text-sm">
          No pornographic images please, ideally image should have only submitted character without any extras.
        </div>
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
        <Input v-if="serverSave" v-model.trim="nickname" placeholder="Your nickname" :error-message="errors.nickname" name="login" />
        <div v-if="tierError" class="text-red-400 font-semibold">
          {{ tierError }}
        </div>
        <div v-if="processing" class="font-semibold">
          Processing <eos-icons:bubble-loading />
        </div>
        <div v-if="submitMessage" class="font-semibold">
          {{ submitMessage }}
        </div>
        <div class="flex justify-between flex-wrap">
          <div class="flex gap-2">
            <Checkbox v-model="localSave" label="Local save" />
            <Checkbox v-model="serverSave" label="Propose to global" />
            <Checkbox v-if="editMode" v-model="oldEntry" :label="`Keep old UID[${character.uid}]`" title="Keep UID so if there is a Waifu Perk for them, it will still work" />
          </div>
          <Button
            :disabled="!!submitMessage || !!processing"
            label="Add character"
            class="self-center"
            bg-color="bg-lime-600"
            @click="!!submitMessage || !!processing? null : addCharacter()"
          />
        </div>
      </div>
      <CompanionCard
        v-if="name"
        class="hidden xl:block absolute h-[530px] -top-18 w-[284px] left-[calc(100%+0.5rem)]"
        :char="companion"
        :lazy="false"
      />
      <CharacterRules v-if="showRules" @click="showRules = false" />
    </div>
  </Modal>
</template>

<script lang='ts' setup>
import * as zod from 'zod'
import { useForm, useField } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'
import { difference, random } from 'lodash-es'
import { useStore } from '~/store/store'
import { proposeCompanion, toggleShowAddCharacter, userCharactersShown } from '~/logic'
import { useWorlds, waifuTagsByTag, defTags } from '~/data/constants'
import { useSaves } from '~/store/saves'

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

const testImage = ref<HTMLImageElement | null>(null)
const imageErrorMessage = ref('')

const { userNickname } = useSaves()

const localSave = ref(true)
const serverSave = ref(false)
const oldEntry = ref(false)
const sex = ref(props?.character?.tags?.[0] || 'F')

const tierError = ref('')
const tierConfirm = ref(false)
const processing = ref(false)
const submitMessage = ref('')

const showRules = ref(false)

const { userCharacters, localUserCharacters } = useStore()
const { allWorldNames, allSubs } = useWorlds()

const zodObject = zod.object({
  name: zod.string().nonempty('Character name is required').max(64, { message: 'Maximum length is 64 chars' }),
  world: zod.string().nonempty('World name is required').max(64, { message: 'Maximum length is 64 chars' }),
  sub: zod.string().nonempty('World name is required').max(64, { message: 'Maximum length is 64 chars' }).optional().or(zod.literal('')),
  tier: zod.number().min(1, { message: 'Minimum tier is 1' }).max(13, { message: 'Maximum tier is TZ' }),
  image: zod.string().regex(/[^ \!@\$\^&\(\)\+\=]+(\.png|\.jpeg|\.gif|\.jpg|\.webp)$/, { message: 'Must be a valid image URL in a jpeg/jpg/png/gif/webp format.' }).max(256, { message: 'Maximum length is 256 chars' }),
  image_nsfw: zod.string().regex(/[^ \!@\$\^&\(\)\+\=]+(\.png|\.jpeg|\.gif|\.jpg|\.webp)$/, { message: 'Must be a valid image URL in a jpeg/jpg/png/gif/webp format.' }).max(256, { message: 'Maximum length is 256 chars' }).optional().or(zod.literal('')),
  tags: zod.string().max(24, { message: 'Max tag length is 24 chars' }).nonempty('No empty tags').array().refine(tagsArr => difference(tagsArr, defTags).length <= 10, { message: 'Maximum 10 tags' }),
})

const zodGlobal = zodObject.extend({ nickname: zod.string().nonempty('Nickname is required') })

const schema = computed(() => serverSave.value ? toFormValidator(zodGlobal) : toFormValidator(zodObject))
console.log(props.character)

const { errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    tier: props.editMode ? props.character.tier || 1 : 1,
    world: props.editMode ? props.character.world || '' : '',
    sub: props.editMode ? props.character.sub || '' : '',
    name: props.editMode ? props.character.name || '' : '',
    image: props.editMode ? props.character.sourceImage || props.character.image || '' : '',
    image_nsfw: props.editMode ? props.character.image_nsfw || '' : '',
    tags: props.editMode ? props.character.tags || [] : [],
    nickname: userNickname.value ? userNickname.value : '',
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

const companion = computed(() => {
  return {
    name: name.value,
    world: world.value,
    sub: sub.value,
    tier: tier.value,
    image: image.value,
    image_nsfw: image_nsfw.value,
    tags: tags.value,
    nickname: nickname.value,
  }
})

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
  values.tags = values.tags.map((x: string) => waifuTagsByTag[x] ? waifuTagsByTag[x].short : x)
  values.uid = props.editMode && oldEntry.value ? props.character.uid || random(10000000, 99999999) : random(10000000, 99999999)
  if (serverSave.value) {
    values.uid = props.character.uid || random(10000000, 99999999)
    processing.value = true
    userNickname.value = values.nickname
    const seed = window.localStorage.getItem('seed')
    proposeCompanion({ ...values, date: new Date().toString(), seed }, (msg) => {
      processing.value = false
      submitMessage.value = msg
      setTimeout(() => submitMessage.value = '', 5000)
    })
  }

  if (localSave.value) {
    localUserCharacters.value.push(values)
    userCharactersShown.value = true
  }
  else { userCharacters.value.push(values) }

  if (!serverSave.value)
    toggleShowAddCharacter()
})

function imageLoaded() {
  if (testImage.value) {
    if (testImage.value.naturalHeight && testImage.value.naturalHeight < 380)
      imageErrorMessage.value = 'Chosen image is of bad quality, there is a high chance it will not be accepted'
    else
      imageErrorMessage.value = ''
  }
}

</script>
