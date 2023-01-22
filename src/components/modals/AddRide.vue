<template>
  <Modal label="Create New Ride">
    <div class="p-2 flex flex-col gap-2 min-h-0">
      <Input v-model="title" placeholder="Ride Name" :error-message="errors.title" />
      <div class="flex gap-2">
        <Input v-model="source" placeholder="Origin" class="w-3/4" :error-message="errors.source" />
        <Input v-model.number="cost" label="Cost" class="w-24" :error-message="errors.rating" />
      </div>
      <div class="flex gap-2">
        <Select
          v-model="size"
          placeholder="Size"
          class="w-2/4"
          :error-message="errors.size"
          :options="['Small', 'Medium', 'Large', 'Gigantic']"
        />
        <Select
          v-model="category"
          placeholder="Category"
          class="w-2/4"
          :error-message="errors.category"
          :options="['Land', 'Sea', 'Amphibious', 'Sky', 'Space']"
        />
      </div>
      <TextArea v-model="desc" placeholder="Ride description" :rows="'2'" :error-message="errors.desc" />
      <Input v-model="image" placeholder="Image URL" :error-message="errors.image" />
      <Foldable title="Addons" :is-open="isAddonOpen" class="flex flex-col min-h-0">
        <template #buttons>
          <div class="cursor-pointer hover:text-green-500" @click="addAddon">
            <fluent:add-12-filled />
          </div>
        </template>
        <div class="overflow-y-auto flex flex-col gap-2">
          <div v-for="addon, i in addons" :key="i" class="flex gap-2">
            <Input
              v-model="addon.addon"
              :placeholder="'Addon #' + i"
              :error-message="errors[`addons[${i}].addon`]"
            />
            <Input
              v-model.number="addon.cost"
              label="Cost"
              class="w-24 text-center"
              :error-message="errors[`addons[${i}].cost`]"
            />
            <div
              class="cursor-pointer inline-block leading-none pt-0.5"
              text="gray-500 dark:gray-300 hover:red-500 xl"
              @click="removeAddon(i)"
            >
              <fluent:delete-20-filled />
            </div>
          </div>
          <div v-if="addons.length === 0" class="text-center">
            empty
          </div>
        </div>
      </Foldable>
      <Foldable title="Variants" :is-open="isVariantOpen" class="flex flex-col min-h-0">
        <template #buttons>
          <div class="cursor-pointer hover:text-green-500" @click="addVariant">
            <fluent:add-12-filled />
          </div>
        </template>
        <div class="overflow-y-auto flex flex-col gap-2">
          <div v-for="variant, i in variants" :key="i" class="flex gap-2">
            <Input
              v-model="variant.variant"
              :placeholder="'Variant #' + i"
              :error-message="errors[`variants[${i}].variant`]"
            />
            <Input
              v-model.number="variant.cost"
              label="Cost"
              class="w-24 text-center"
              :error-message="errors[`variants[${i}].cost`]"
            />
            <div
              class="cursor-pointer inline-block leading-none pt-0.5"
              text="gray-500 dark:gray-300 hover:red-500 xl"
              @click="removeVariant(i)"
            >
              <fluent:delete-20-filled />
            </div>
          </div>
          <div v-if="variants.length === 0" class="text-center">
            empty
          </div>
        </div>
      </Foldable>
      <div v-if="serverSave" class="p-1 rounded border-2 border-red-500">
        Adding rides to global are not in the current plans, you can still add them so if I change my mind your work won't be lost.
      </div>
      <div class="flex gap-2">
        <Checkbox v-model="localSave" label="Local save" />
        <Checkbox v-model="serverSave" label="Global save" />
        <Button label="Add" class="flex-grow" bg-color="bg-red-700" @click="addWorld" />
      </div>
    </div>
  </Modal>
</template>

<script lang='ts' setup>
import * as zod from 'zod'
import { useForm, useField } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'

import { useStore } from '~/store/store'
import { proposeRide, toggleShowAddRide } from '~/logic'

const props = defineProps({
  ride: {
    type: Object,
    default: () => ({}),
  },
})

const isAddonOpen = ref(false)
const isVariantOpen = ref(false)
const localSave = ref(true)
const serverSave = ref(false)
const { userRides, localUserRides } = useStore()

const schema = toFormValidator(
  zod.object({
    title: zod.string().nonempty('Ride name is required'),
    source: zod.string().nonempty('Origin world name is required'),
    category: zod.string().nonempty('Category is required'),
    size: zod.string().nonempty('Size is required'),
    cost: zod.number().min(0, { message: 'Minimum Cost is 0' }),
    desc: zod.string().nonempty('Description is required'),
    image: zod.string(),
    addons: zod.object({
      addon: zod.string().nonempty('Addon name is required'),
      cost: zod.number().min(0, { message: 'Minimum Cost is 0' }),
    }).array(),
    variants: zod.object({
      variant: zod.string().nonempty('Variant name is required'),
      cost: zod.number().min(0, { message: 'Minimum Cost is 0' }),
    }).array(),
  }),
)

const { errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    title: props.ride.title || '',
    source: props.ride.source || '',
    cost: props.ride.cost || 0,
    desc: props.ride.desc || '',
    image: '',
    addons: [],
    variants: [],
  },
})

const { value: title } = useField<string>('title')
const { value: image } = useField<string>('image')
const { value: source } = useField<string>('source')
const { value: category } = useField<string>('category')
const { value: size } = useField<string>('size')
const { value: cost } = useField<number>('cost')
const { value: desc } = useField<string>('desc')
const { value: addons } = useField<any[]>('addons')
const { value: variants } = useField<any[]>('variants')

function addAddon() {
  isAddonOpen.value = true
  addons.value.push({
    addon: '',
    cost: 0,
  })
}

function addVariant() {
  isVariantOpen.value = true
  variants.value.push({
    variant: '',
    cost: 0,
  })
}

function removeAddon(index: number) {
  addons.value.splice(index, 1)
}

function removeVariant(index: number) {
  variants.value.splice(index, 1)
}

const addWorld = handleSubmit((values) => {
  if (values.addons.length)
    values.addons = values.addons.map(x => [x.addon, x.cost])
  else
    delete values.addons
  if (values.variants.length)
    values.variants = values.variants.map(x => [x.variant, x.cost])
  else
    delete values.variants

  if (serverSave.value)
    proposeRide({ ...values, date: new Date().toString() })

  if (localSave.value) localUserRides.value.push(values)
  else userRides.value.push(values)
  toggleShowAddRide()
})

</script>
