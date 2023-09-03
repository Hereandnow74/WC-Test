<template>
  <Modal label="Propose a Perk" class="!z-30">
    <div class="p-2 flex flex-col gap-2 min-h-0 w-full">
      <InputWithSearch v-model="title" :list="Object.keys(ALL_PERK_TITLES)" placeholder="Perk title" :error-message="errors.title" />
      {{ ALL_PERK_TITLES[title] }}
      <div class="flex gap-2">
        <Input v-model.number="cost" class="w-24" label="Cost" :error-message="errors.cost" />
        <NumberInput
          v-if="isMultiple"
          v-model.number="count"
          class="whitespace-nowrap"
          label="Count"
          :min="1"
          :max="9999"
          :error-message="errors.count"
        />
      </div>
      <!-- <InputWithSearch
        placeholder="Press enter to add required perk name"
        :list="Object.keys(ALL_PERK_TITLES)"
        @keypress.enter="(e) => requires.push(e.target.value)"
        @optionClicked="(e) => requires.push(e)"
      /> -->
      <div v-if="errorMessage" class="dark:text-red-400 text-red-700">
        {{ errorMessage }}
      </div>
      <Button label="Add Locally" class="flex-grow" bg-color="bg-orange-600" @click="addLocally" />
    </div>
  </Modal>
</template>

<script lang='ts' setup>
import * as zod from 'zod'
import { useForm, useField } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'

import { buyAnyPerk } from '~/logic'
import { ALL_PERK_TITLES } from '~/data/constants'
import { useStore } from '~/store/store'

const { allEffects, startingOrigin } = useStore()

const errorMessage = ref('')
const isMultiple = ref(false)

const schema = toFormValidator(
  zod.object({
    title: zod.string().min(1, 'Title is required').max(128, 'Max length 128 chars'),
    cost: zod.number(),
    count: zod.number().min(1, { message: 'Minimum count is 1' }),
  }),
)

const { errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    title: '',
    cost: 0,
    count: 1,
  },
})

const { value: title } = useField<string>('title')
const { value: cost } = useField<number>('cost')
const { value: count } = useField<number>('count')

watch(title, () => {
  const fullPerk = ALL_PERK_TITLES.value[title.value]
  if (fullPerk) {
    if (fullPerk.multiple || fullPerk.category === 'Defense')
      isMultiple.value = true
  }
})

const addLocally = handleSubmit((values) => {
  const fullPerk = ALL_PERK_TITLES.value[title.value]
  if (fullPerk.category !== 'Origin') { buyAnyPerk(values.title, values.count, values.cost) }
  else {
    allEffects.value.push(fullPerk.title)
    Object.assign(startingOrigin.value, fullPerk)
  }
})

</script>
