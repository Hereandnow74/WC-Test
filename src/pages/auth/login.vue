<template>
  <div class="w-full">
    <div v-if="user.name">
      Logged in as {{ user.name }}
    </div>
    <template v-else>
      <form v-if="!user.name" class="rounded max-w-screen-md lg:pl-2 p-2 flex flex-col gap-4 w-full">
        <h3 class="text-center text-2xl font-semibold">
          Login
        </h3>
        <Input
          v-model="email"
          name="email"
          autocomplete="email"
          class="flex-grow"
          placeholder="Email*"
          :error-message="errors.email"
        />
        <Input
          v-model="password"
          type="password"
          name="password"
          autocomplete="current-password"
          class="flex-grow"
          placeholder="Password*"
          :error-message="errors.password"
        />
        <div class="text-gray-500 dark:text-gray-500">
          * - required
        </div>
        <div class="flex gap-2 mx-auto">
          <router-link class="icon-text-btn mx-2" title="Forgot Password?" to="/auth/forgot">
            Forgot Password?
          </router-link>
          <router-link class="icon-text-btn mx-4 font-semibold text-lg" title="Register" to="/auth/register">
            Register
          </router-link>
          <Button class="px-4" label="Login" bg-color="bg-gray-700 hover:bg-gray-600" @click="login" />
        </div>
        <div class="text-red-700 dark:text-red-500">
          {{ errorMessage }}
        </div>
      </form>
    </template>
  </div>
</template>

<script lang='ts' setup>
import * as zod from 'zod'
import { useForm, useField } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'
import { loginToServer } from '~/logic/server/'
import { useUser } from '~/store/user'

const { user } = useUser()

const successMessage = ref('')
const errorMessage = ref('')
const buttonActive = ref(true)

const schema = toFormValidator(
  zod.object({
    password: zod.string().max(64, 'Max length 64 chars').min(8, 'Minimum password length is 8 symbols'),
    email: zod.string().email({ message: 'Need to be a valid Email' }).max(128, 'Max length 128 chars').min(5, 'Email is required'),
  }),
)

const { errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    password: '',
    email: '',
  },
})

const { value: password } = useField<string>('password')
const { value: email } = useField<string>('email')

const login = handleSubmit((values) => {
  loginToServer(values).then(message => errorMessage.value = message)
  buttonActive.value = false
  setTimeout(() => { buttonActive.value = true; successMessage.value = ''; errorMessage.value = '' }, 30 * 1000)
})

</script>
