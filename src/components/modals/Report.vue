<template>
  <Modal :label="`Report mistakes for ${character.name}`">
    <div class="p-2 flex flex-col gap-2 min-h-0">
      <h3 class="-mb-2 fonst font-semibold text-gray-600 dark:text-gray-400">
        Toggle on what wrong with it:
      </h3>
      <div class="flex flex-wrap gap-2">
        <Toggle v-model="wrongTier" label="Tier" />
        <Toggle v-model="isDuplicate" label="Is Duplicate" />
        <Toggle v-model="wrongName" label="Name" />
        <Toggle v-model="wrongWorld" label="World" />
      </div>
      <div v-if="wrongTier" class="flex flex-col gap-2">
        <div class="flex gap-2 justify-between">
          <div>Current tier: {{ character.tier }}</div>
          <NumberInput
            v-model="tier"
            :min="1"
            :max="11"
            label="Right tier"
            class="whitespace-nowrap"
            :error-message="errors.tier"
          />
        </div>
        <TextArea
          v-model="args"
          rows="3"
          place-holder="Arguments on why tier is incorrect, preferable with examples of similar characters from Official Catalog Spreadsheet (have tag Official WC). "
          :error-message="errors.args"
        />
      </div>
      <div v-if="isDuplicate" class="flex flex-col gap-2">
        <Input v-model="duplicate" placeholder="Name of the duplicate (optional)" label="Duplicate Name" class="flex-grow" :error-message="errors.duplicate" />
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
        <InputWithSearch
          v-model="fixSub"
          placeholder="Correct Sub world name (optional)"
          idd="subSearch"
          :list="allSubs"
          label="Subcategory"
          class="flex-grow"
          :error-message="errors.fixSub"
        />
      </div>
      <div v-if="reportError" class="text-red-600 dark:text-red-300 text-sm">
        {{ reportError }}
      </div>
      <div class="flex gap-2">
        <Input v-model="nickname" placeholder="Your nickname" :error-message="errors.nickname" class="flex-grow" />
        <Button size="Small" label="Send" :disabled="!(wrongTier || wrongName || wrongWorld || isDuplicate)" @click="sendReport" />
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
import { uniq } from 'lodash-es'
import Input from '../basic/Input.vue'
import NumberInput from '../basic/NumberInput.vue'
import { useStore } from '~/store/store'
import { filterObject, proposeCompanion, sendReportToServer, toggleShowAddCharacter, userCharactersShown } from '~/logic'
import { getChars, getUserChars, waifuTags, waifuTagsByTag } from '~/data/constants'

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

const wrongTier = ref(false)
const wrongName = ref(false)
const wrongWorld = ref(false)
const isDuplicate = ref(false)

const reportError = ref('')

const processing = ref(false)
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
      tier: zod.number().min(1, { message: 'Minimum tier is 1' }).max(11, { message: 'Maximum tier is 11' }).refine(val => val !== props.character.tier, { message: 'Should not equal old tier' }),
      args: zod.string().nonempty({ message: 'Arguments are required' }).max(64, { message: 'Maximum length is 64 chars' }),
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
      subWorld: zod.string().max(64, { message: 'Maximum length is 64 chars' }),
    })
  }
  if (isDuplicate.value) {
    obj = obj.extend({
      duplicate: zod.string().max(64, { message: 'Maximum length is 64 chars' }),
    })
  }
  return toFormValidator(obj)
})

const { errors, handleSubmit } = useForm({
  validationSchema: zodObject,
  initialValues: {
    tier: props.character.tier || 1,
  },
})

const { value: tier } = useField<number>('tier')
const { value: nickname } = useField<string>('nickname')
const { value: args } = useField<string>('args')
const { value: fixName } = useField<string>('fixName')
const { value: fixWorld } = useField<string>('fixWorld')
const { value: fixSub } = useField<string>('fixSub')
const { value: duplicate } = useField<string>('duplicate')

const sendReport = handleSubmit((values) => {
  if (!(wrongTier.value || wrongName.value || wrongWorld.value || isDuplicate.value)) {
    reportError.value = 'Don\'t send empty report, baka!'
    setTimeout(() => reportError.value = '', 5000)
    return
  }

  values = filterObject(values)

  sendReportToServer({ ...values, date: new Date().toString(), uid: props.character.uid }, (msg) => {
    submitMessage.value = msg
    setTimeout(() => submitMessage.value = '', 5000)
  })

  console.log(values)
})

</script>
