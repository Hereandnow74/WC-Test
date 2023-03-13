<template>
  <div class="w-full">
    <div v-if="errorMessage === 'Success'">
      Confirmation message was send to your email
    </div>
    <template v-else>
      <form v-if="!user.name" class="rounded max-w-screen-md lg:pl-2 p-2 flex flex-col gap-4 w-full">
        <h3 class="text-center text-2xl font-semibold">
          Register
        </h3>
        <Input v-model="name" class="flex-grow" placeholder="Nickname*" :error-message="errors.name" />
        <Input
          v-model="password"
          type="password"
          class="flex-grow"
          placeholder="Password*"
          :error-message="errors.password"
        />
        <Input
          v-model="password2"
          type="password"
          class="flex-grow"
          placeholder="Confirm Password*"
          :error-message="errors.password2"
        />
        <Input v-model="email" class="flex-grow" placeholder="Email*" :error-message="errors.email" />
        <div class="text-gray-500 dark:text-gray-500">
          * - required
        </div>
        <Button label="Register" bg-color="bg-gray-700 hover:bg-gray-600" @click="register" />
        <div class="text-red-700 dark:text-red-500">
          {{ errorMessage }}
        </div>
      </form>
      <div v-else>
        You already registered as {{ user.name }}
      </div>
    </template>
  </div>
</template>

<script lang='ts' setup>
import * as zod from 'zod'
import { useForm, useField } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'
import { postRegisterInfoToEndpoint, user } from '~/logic/auth/authLogic'

const successMessage = ref('')
const errorMessage = ref('')
const buttonActive = ref(true)

const schema = toFormValidator(
  zod.object({
    name: zod.string().max(64, 'Max length 64 chars').min(2, 'name is required (minimum length is 2)'),
    password: zod.string().max(64, 'Max length 64 chars').min(8, 'Minimum password length is 8 symbols'),
    password2: zod.string().max(64, 'Max length 64 chars').min(8, 'Minimum password length is 8 symbols'),
    email: zod.string().email({ message: 'Need to be a valid Email' }).max(128, 'Max length 128 chars').min(5, 'Email is required'),
  }).refine(data => data.password === data.password2, {
    message: 'Passwords don\'t match',
    path: ['password2'],
  }),
)

const { errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    password: '',
    password2: '',
    email: '',
  },
})

const { value: name } = useField<string>('name')
const { value: password } = useField<string>('password')
const { value: password2 } = useField<string>('password2')
const { value: email } = useField<string>('email')

const register = handleSubmit((values) => {
  // TODO: Add favorites here
  const whatSendToServer = {
    name: values.name,
    password: values.password,
    email: values.email,
  }
  postRegisterInfoToEndpoint(whatSendToServer).then(message => errorMessage.value = message)
  buttonActive.value = false
  setTimeout(() => { buttonActive.value = true; successMessage.value = ''; errorMessage.value = '' }, 30 * 1000)
})

</script>
