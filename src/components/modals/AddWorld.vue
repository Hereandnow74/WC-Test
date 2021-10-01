<template>
  <Modal label="Add New World">
    <div class="p-2 flex flex-col gap-2 min-h-0">
      <div class="flex gap-2">
        <Input v-model="worldName" placeholder="Name of the World" class="w-3/4" :error-message="errors.worldName" />
        <Input v-model.number="rating" label="Rating" class="w-24" :error-message="errors.rating" />
      </div>
      <Input v-model="image" placeholder="Image URL" :error-message="errors.image" />
      <div>
        <div class="flex justify-between border-b border-gray-300 dark:border-gray-200 mb-2 leading-snug">
          <h4 class="">
            Setting specifing rules
          </h4>
          <div class="hover:text-blue-500 cursor-pointer" @click="() => toggleSpecific()">
            <codicon:fold-up v-if="showSpecific" />
            <codicon:fold-down v-else />
          </div>
        </div>
        <span v-if="errors.additional" class="text-xs">{{ errors.additional }}</span>
        <TextArea v-if="showSpecific" v-model="additional" place-holder="Some specific change in the wolrd so it would fit the Company theme more." />
      </div>
      <div class="flex gap-1 border-b border-gray-300 dark:border-gray-200 mb-2 leading-none">
        <h4>
          Conditions
        </h4>
        <div class="hover:text-blue-500 cursor-pointer" @click="addCondition">
          <fluent:add-12-filled />
        </div>
        <div class="hover:text-blue-500 cursor-pointer ml-auto" @click="() => toggleCondition()">
          <codicon:fold-up v-if="showCondition" />
          <codicon:fold-down v-else />
        </div>
      </div>
      <div v-if="showCondition" class="overflow-y-auto flex flex-col gap-2">
        <div v-for="condition, i in conditions" :key="i" class="flex gap-2">
          <Input
            v-model="condition.name"
            :placeholder="'Condition #' + i"
            :error-message="errors[`conditions[${i}].name`]"
          />
          <Input
            v-model.number="condition.rating"
            label="Rating"
            class="w-24 text-center"
            :error-message="errors[`conditions[${i}].rating`]"
          />
          <div
            class="cursor-pointer inline-block leading-none pt-0.5"
            text="gray-500 dark:gray-300 hover:red-500 xl"
            @click="removeCondition(i)"
          >
            <fluent:delete-20-filled />
          </div>
        </div>
        <div v-if="conditions.length === 0" class="text-center">
          empty
        </div>
      </div>
      <div class="flex gap-2">
        <Checkbox label="Local save" />
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

export default defineComponent({
  name: 'AddWorld',

  setup() {
    // interface Condition {
    //   name: string
    //   rating: number
    // }
    // const conditions = ref([] as Condition[])
    const [showSpecific, toggleSpecific] = useToggle()
    const [showCondition, toggleCondition] = useToggle()

    const schema = toFormValidator(
      zod.object({
        worldName: zod.string().nonempty('World name is required'),
        rating: zod.number().min(1, { message: 'Minimum World rating is 1' }).max(10, { message: 'Maximum World level is 10' }),
        image: zod.string().url({ message: 'Must be a valid URL' }),
        additional: zod.string(),
        conditions: zod.object({
          name: zod.string().nonempty('Condition is required'),
          rating: zod.number().min(1, { message: 'Minimum World rating is 1' }).max(10, { message: 'Maximum World level is 10' }),
        }).array(),
      }),
    )

    const { errors, handleSubmit } = useForm({
      validationSchema: schema,
      initialValues: {
        conditions: [],
        rating: 1,
        worldName: '',
        additional: '',
        image: '',
      },
    })

    const { value: worldName } = useField<string>('worldName')
    const { value: rating } = useField<number>('rating')
    const { value: additional } = useField<string>('additional')
    const { value: image } = useField<string>('image')
    const { value: conditions } = useField<any[]>('conditions')

    function addCondition() {
      showCondition.value = true
      conditions.value.push({
        name: '',
        rating: 1,
      })
    }

    function removeCondition(index: number) {
      conditions.value.splice(index, 1)
    }

    const addWorld = handleSubmit(values => console.log(values))

    return {
      worldName,
      rating,
      additional,
      image,
      conditions,
      errors,
      addWorld,
      addCondition,
      removeCondition,
      showSpecific,
      toggleSpecific,
      showCondition,
      toggleCondition,
    }
  },
})
</script>
