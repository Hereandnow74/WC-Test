<template>
  <Modal label="Add New World">
    <div class="relative p-2 flex flex-col gap-2 min-h-0">
      <img ref="testImage" class="absolute h-[1px] w-[1px]" :src="image" alt="" @load="imageLoaded" />
      <div class="flex gap-2">
        <Input v-model.trim="worldName" placeholder="Name of the World" class="w-3/4" :error-message="errors.worldName" />
        <NumberInput
          v-model.number="rating"
          label="Rating"
          :min="1"
          :max="10"
          :error-message="errors.rating"
        />
      </div>
      <Input v-model="image" placeholder="Image URL" :error-message="errors.image" />
      <div v-if="imageErrorMessage" class="text-red-600 dark:text-red-300 text-sm">
        {{ imageErrorMessage }}
      </div>
      <Foldable title="Setting specific rules">
        <span v-if="errors.additional" class="text-xs">{{ errors.additional }}</span>
        <TextArea
          v-model.trim="additional"
          placeholder="See official Setting Specific Rules for examples. Adding a lot of AU stuff here will increase the chance of it not being accepted."
        />
      </Foldable>
      <Foldable title="Conditions" :is-open="isOpen" class="flex flex-col min-h-0">
        <template #buttons>
          <div class="cursor-pointer hover:text-green-500" @click="addCondition">
            <fluent:add-12-filled />
          </div>
        </template>
        <div class="overflow-y-auto flex flex-col gap-3">
          <div v-for="cnd, i in condition" :key="i">
            <div class="flex gap-2">
              <Input
                v-model.trim="cnd.name"
                :placeholder="'Condition #' + i"
                :error-message="errors[`condition[${i}].name`]"
                class="flex-grow"
              />
              <NumberInput
                v-model.number="cnd.rating"
                label="Rating"
                :min="1"
                :max="10"
                :error-message="errors[`condition[${i}].rating`]"
              />
              <div
                class="cursor-pointer inline-block leading-none pt-0.5"
                text="gray-500 dark:gray-300 hover:red-500 xl"
                @click="removeCondition(i)"
              >
                <fluent:delete-20-filled />
              </div>
            </div>
            <Toggle v-model="cnd.official" title="From Unstable spreadsheet" :class="{'dark:text-yellow-300': cnd.official}" label="Is official condition" />
          </div>
          <div v-if="condition.length === 0" class="text-center">
            empty
          </div>
        </div>
      </Foldable>
      <Input v-if="proposeGlobal" v-model.trim="nickname" placeholder="Your nickname" :error-message="errors.nickname" name="login" />
      <div class="flex gap-2">
        <Checkbox v-model="localSave" label="Local save" />
        <Checkbox v-model="proposeGlobal" label="Propose to global" />
        <Button label="Add" class="flex-grow" bg-color="bg-red-700" @click="addWorld" />
      </div>
    </div>
  </Modal>
</template>

<script lang='ts' setup>
import * as zod from 'zod'
import { useForm, useField } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'

import NumberInput from '../basic/NumberInput.vue'
import { useStore } from '~/store/store'
import { proposeWorld, randomString, toggleShowAddWorld } from '~/logic'
import { useSaves } from '~/store/saves'

const props = defineProps({
  editMode: {
    type: Boolean,
    default: false,
  },
  world: {
    type: Object,
    default: () => ({}),
  },
})

const testImage = ref<HTMLImageElement | null>(null)
const imageErrorMessage = ref('')

const isOpen = ref(false)
const localSave = ref(true)
const proposeGlobal = ref(false)
const { localUserWorlds } = useStore()
const { userNickname } = useSaves()

const schema = toFormValidator(
  zod.object({
    worldName: zod.string().nonempty('World name is required'),
    rating: zod.number().min(1, { message: 'Minimum World rating is 1' }).max(10, { message: 'Maximum World level is 10' }),
    image: zod.string().url({ message: 'Must be a valid URL' }).min(1, { message: 'Image is required' }).max(256, { message: 'Maximum length is 256 chars' }),
    additional: zod.string(),
    condition: zod.object({
      name: zod.string().nonempty('Condition is required'),
      rating: zod.number().min(1, { message: 'Minimum World rating is 1' }).max(10, { message: 'Maximum World level is 10' }),
      official: zod.boolean().optional(),
    }).array(),
  }),
)
const { errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    condition: props.world.condition || [],
    rating: props.world.rating || 1,
    worldName: props.world.worldName || '',
    additional: props.world.additional || '',
    image: props.world.image || '',
    nickname: userNickname.value ? userNickname.value : '',
  },
})

console.log(props.world.condition)

const { value: worldName } = useField<string>('worldName')
const { value: rating } = useField<number>('rating')
const { value: additional } = useField<string>('additional')
const { value: image } = useField<string>('image')
const { value: condition } = useField<any[]>('condition')
const { value: nickname } = useField<string>('nickname')

function addCondition() {
  isOpen.value = true
  condition.value.push({
    name: '',
    rating: 1,
  })
}

function removeCondition(index: number) {
  condition.value.splice(index, 1)
}

const addWorld = handleSubmit((values) => {
  const world = { ...values }
  if (!props.editMode)
    world.uid = randomString(6)
  else
    world.uid = props.world.uid

  if (proposeGlobal.value)
    proposeWorld({ ...world, date: new Date().toString() })

  world.uid = randomString(7)
  if (localSave.value) localUserWorlds.value.push(world)
  toggleShowAddWorld()
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
