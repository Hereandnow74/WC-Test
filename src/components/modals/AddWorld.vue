<template>
  <Modal label="Add New World">
    <div class="p-2 flex flex-col gap-2 min-h-0">
      <div class="flex gap-2">
        <Input v-model="worldName" placeholder="Name of the World" class="w-3/4" :error-message="errors.worldName" />
        <Input v-model.number="rating" label="Rating" class="w-24" :error-message="errors.rating" />
      </div>
      <Input v-model="image" placeholder="Image URL" :error-message="errors.image" />
      <Foldable title="Setting specifing rules">
        <span v-if="errors.additional" class="text-xs">{{ errors.additional }}</span>
        <TextArea
          v-model="additional"
          place-holder="Some specific change in the wolrd so it would fit the Company theme more."
        />
      </Foldable>
      <Foldable title="Conditions" :is-open="isOpen">
        <template #buttons>
          <div class="cursor-pointer hover:text-green-500" @click="addCondition">
            <fluent:add-12-filled />
          </div>
        </template>
        <div class="overflow-y-auto flex flex-col gap-2">
          <div v-for="condition, i in condition" :key="i" class="flex gap-2">
            <Input
              v-model="condition.name"
              :placeholder="'Condition #' + i"
              :error-message="errors[`condition[${i}].name`]"
            />
            <Input
              v-model.number="condition.rating"
              label="Rating"
              class="w-24 text-center"
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
          <div v-if="condition.length === 0" class="text-center">
            empty
          </div>
        </div>
      </Foldable>
      <div class="flex gap-2">
        <Checkbox v-model="localSave" label="Local save" />
        <Checkbox label="Propose to global" />
        <Button label="Add" class="flex-grow" bg-color="bg-red-700" @click="addWorld" />
      </div>
    </div>
  </Modal>
</template>

<script lang='ts'>
import * as zod from 'zod'
import { useForm, useField } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'
import { useStore } from '~/store/store'
import { toggleShowAddWorld } from '~/logic'

export default defineComponent({
  name: 'AddWorld',
  props: {
    editMode: {
      type: Boolean,
      default: false,
    },
    world: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props) {
    const isOpen = ref(false)
    const localSave = ref(true)
    const { userWorlds, localUserWorlds } = useStore()

    const schema = toFormValidator(
      zod.object({
        worldName: zod.string().nonempty('World name is required'),
        rating: zod.number().min(1, { message: 'Minimum World rating is 1' }).max(11, { message: 'Maximum World level is 11' }),
        image: zod.string().url({ message: 'Must be a valid URL' }).optional().or(zod.literal('')),
        additional: zod.string(),
        condition: zod.object({
          name: zod.string().nonempty('Condition is required'),
          rating: zod.number().min(1, { message: 'Minimum World rating is 1' }).max(11, { message: 'Maximum World level is 11' }),
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
      },
    })

    const { value: worldName } = useField<string>('worldName')
    const { value: rating } = useField<number>('rating')
    const { value: additional } = useField<string>('additional')
    const { value: image } = useField<string>('image')
    const { value: condition } = useField<any[]>('condition')

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
      if (props.editMode) values.worldName = `${values.worldName} (AU)`
      if (localSave.value) localUserWorlds.value.push(values)
      else userWorlds.value.push(values)
      toggleShowAddWorld()
    })

    return {
      worldName,
      rating,
      additional,
      image,
      condition,
      errors,
      addWorld,
      addCondition,
      removeCondition,
      isOpen,
      localSave,
    }
  },
})
</script>
