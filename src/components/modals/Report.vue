<template>
  <Modal :label="`Report errors for ${character.name}`">
    <div class="p-2 flex flex-col gap-2 min-h-0 overflow-y-auto max-h-[85vh] max-w-screen-md">
      <h3 class="-mb-2 fonst font-semibold text-gray-600 dark:text-gray-400">
        Toggle on what wrong with it:
      </h3>
      <div class="flex flex-wrap gap-2">
        <Toggle v-model="wrongTier" label="Tier" />
        <Toggle v-model="wrongTags" label="Tags" />
        <Toggle v-model="isDuplicate" label="Is Duplicate" />
        <Toggle v-model="wrongName" label="Name" />
        <Toggle v-model="wrongWorld" label="World" />
        <Toggle v-model="wrongImage" label="Image" />
      </div>
      <div v-if="wrongTier" class="flex flex-col gap-2">
        <Note v-if="character.tags.includes('C')" title="Official WC" type="error">
          Only acceptable argument for characters with Official WC tag is - "tier was changed in official spreadsheet", if not send your arguments to SwiftRosenthal on QQ or Discord.
        </Note>
        <div class="flex gap-2 justify-between">
          <div>Current tier: {{ character.tier }}</div>
          <Tiers
            v-model="tier"
            label="Correct tier"
            class="whitespace-nowrap"
            :error-message="errors.tier"
          />
        </div>
        <TextArea
          v-model="args"
          rows="3"
          placeholder="Arguments on why tier is incorrect, preferable with examples of similar characters from Official Catalog Spreadsheet (have tag Official WC). "
          :error-message="errors.args"
        />
      </div>
      <TagInput
        v-if="wrongTags"
        v-model="tags"
        placeholder="Tags - press Enter to add"
        :error-message="errors.tags"
      />
      <div v-if="isDuplicate" class="flex flex-col gap-2">
        <Input v-model="duplicate" placeholder="Name of the duplicate or reason for deletion" label="Duplicate Name" class="flex-grow" :error-message="errors.duplicate" />
      </div>
      <div v-if="wrongName" class="flex flex-col gap-2">
        <Input v-model="fixName" placeholder="Correct name" :label="`Name [${character.name}]`" class="flex-grow" :error-message="errors.fixName" />
      </div>
      <div v-if="wrongWorld" class="flex flex-col gap-2">
        <InputWithSearch
          v-model="fixWorld"
          idd="worldSearch"
          :list="allWorlds"
          placeholder="Correct World name"
          label="World name"
          class="flex-grow"
          :error-message="errors.fixWorld"
        />
        <div class="flex gap-2 items-center">
          <InputWithSearch
            v-model="fixSub"
            placeholder="Correct Sub world name (optional)"
            idd="subSearch"
            :list="allSubs"
            label="Subcategory"
            class="flex-grow"
            :error-message="errors.fixSub"
          />
          <div v-if="character.sub" class="cursor-pointer hover:text-red-500" title="Delete Sub-category from global" @click="fixSub = 'Will be deleted.'">
            <fluent:delete-20-filled />
          </div>
        </div>
      </div>
      <div v-if="wrongImage" class="flex flex-col gap-2">
        <Input v-if="!onlyNSFW" v-model="image" placeholder="Image URL" class="flex-grow" :error-message="errors.image" />
        <div class="flex gap-2">
          <Toggle v-model="onlyNSFW" label="Only NSFW" />
          <Input v-model="nsfwImage" placeholder="NSFW Image URL" class="flex-grow" :error-message="errors.nsfwImage" />
        </div>
        <div class="flex gap-1">
          <img v-show="image" :src="image" alt="image" class="object-contain h-[150px] w-full object-top">
          <img v-show="nsfwImage" :src="nsfwImage" alt="nsfw image" class="object-contain h-[150px] w-full object-top">
        </div>
      </div>
      <div v-if="reportError" class="text-red-600 dark:text-red-300 text-sm">
        {{ reportError }}
      </div>
      <div class="flex gap-2">
        <Input v-model="nickname" placeholder="Your nickname" :error-message="errors.nickname" class="flex-grow" />
        <Button size="Small" label="Send" :disabled="!(wrongTier || wrongName || wrongWorld || isDuplicate || wrongImage || wrongTags)" @click="sendReport" />
      </div>
      <div v-if="submitMessage" class="text-green-600 dark:text-green-300 text-sm">
        {{ submitMessage }}
      </div>
    </div>
  </Modal>
</template>

<script lang='ts' setup>
import * as zod from 'zod'
import { useForm, useField } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'
import { difference, uniq } from 'lodash-es'
import Input from '../basic/Input.vue'
import NumberInput from '../basic/NumberInput.vue'
import { filterObject, sendReportToServer } from '~/logic'
import { getChars, getUserChars, waifuTagsByTag, defTags } from '~/data/constants'
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

const { userNickname } = useSaves()

const wrongTier = ref(false)
const wrongTags = ref(false)
const wrongName = ref(false)
const wrongWorld = ref(false)
const isDuplicate = ref(false)
const wrongImage = ref(false)

const onlyNSFW = ref(false)

const reportError = ref('')

const submitMessage = ref('')

const chars = ref<any[]>([])

getChars().then(x => chars.value.push(...x))
getUserChars().then(x => chars.value.push(...x))

const allWorlds = computed(() => uniq(chars.value.map(x => x.w)))
const allSubs = computed(() => uniq(chars.value.filter(x => x.d).map(x => x.d)))

const zodObject = computed(() => {
  let obj = zod.object({ nickname: zod.string().nonempty('Nickname is required') })
  if (wrongTier.value) {
    obj = obj.extend({
      tier: zod.number().min(1, { message: 'Minimum tier is 1' }).max(13, { message: 'Maximum tier is TZ' }).refine(val => val !== props.character.tier, { message: 'Should not equal old tier' }),
      args: zod.string().nonempty({ message: 'Arguments are required' }).max(256, { message: 'Maximum length is 256 chars' }),
    })
  }
  if (wrongName.value) {
    obj = obj.extend({
      fixName: zod.string().nonempty('Character name is required').max(64, { message: 'Maximum length is 64 chars' }),
    })
  }
  if (wrongWorld.value) {
    obj = obj.extend({
      fixWorld: zod.string().nonempty('World name is required').max(64, { message: 'Maximum length is 64 chars' }),
      fixSub: zod.optional(zod.string().max(64, { message: 'Maximum length is 64 chars' })),
    })
  }
  if (isDuplicate.value) {
    obj = obj.extend({
      duplicate: zod.string().max(64, { message: 'Maximum length is 64 chars' }),
    })
  }
  if (wrongImage.value) {
    obj = obj.extend({
      nsfwImage: zod.string().regex(/[^ \!@\$\^&\(\)\+\=]+(\.png|\.jpeg|\.gif|\.jpg|\.webp)$/, { message: 'Must be a valid image URL in a jpeg/jpg/png/gif/webp format.' }).max(256, { message: 'Maximum length is 256 chars' }).optional().or(zod.literal('')),
    })
    if (!onlyNSFW.value) {
      obj = obj.extend({
        image: zod.string().regex(/[^ \!@\$\^&\(\)\+\=]+(\.png|\.jpeg|\.gif|\.jpg|\.webp)$/, { message: 'Must be a valid image URL in a jpeg/jpg/png/gif/webp format.' }).max(256, { message: 'Maximum length is 256 chars' }),
      })
    }
  }
  if (wrongTags.value) {
    obj = obj.extend({
      tags: zod.string().max(24, { message: 'Max tag length is 24 chars' }).nonempty('No empty tags').array().refine(tagsArr => difference(tagsArr, defTags).length <= 10, { message: 'Maximum 10 tags' }),
    })
  }
  return toFormValidator(obj)
})

const { errors, handleSubmit } = useForm({
  validationSchema: zodObject,
  initialValues: {
    tier: props.character.tier || 1,
    tags: props.character.tags,
    nickname: userNickname.value ? userNickname.value : '',
  },
})

const { value: tier } = useField<number>('tier')
const { value: nickname } = useField<string>('nickname')
const { value: args } = useField<string>('args')
const { value: fixName } = useField<string>('fixName')
const { value: fixWorld } = useField<string>('fixWorld')
const { value: fixSub } = useField<string>('fixSub')
const { value: duplicate } = useField<string>('duplicate')
const { value: image } = useField<string>('image')
const { value: nsfwImage } = useField<string>('nsfwImage')
const { value: tags } = useField<string[]>('tags')

const sendReport = handleSubmit((values) => {
  if (!(wrongTier.value || wrongName.value || wrongWorld.value || isDuplicate.value || wrongImage.value || wrongTags.value)) {
    reportError.value = 'Don\'t send empty report, baka!'
    setTimeout(() => reportError.value = '', 5000)
    return
  }
  if (values.tag)
    values.tags = values.tags.map(x => waifuTagsByTag[x] ? waifuTagsByTag[x].short : x)
  if (!wrongTags.value)
    delete values.tags
  if (!wrongTier.value)
    delete values.tier
  values = filterObject(values)
  userNickname.value = values.nickname
  const seed = window.localStorage.getItem('seed')
  sendReportToServer({ ...values, date: new Date().toString(), uid: props.character.uid, seed }, (msg) => {
    submitMessage.value = msg
    setTimeout(() => submitMessage.value = '', 5000)
  })
})

</script>
