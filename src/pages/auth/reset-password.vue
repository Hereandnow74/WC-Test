<template>
  <div class="w-full">
    <div v-if="user.name">
      Logged in as {{ user.name }}
    </div>
    <template v-else>
      <form v-if="!user.name" class="rounded max-w-screen-md lg:pl-2 p-2 flex flex-col gap-4 w-full">
        <h3 class="text-center text-2xl font-semibold">
          New Password
        </h3>
        <Input
          v-model="password"
          type="password"
          name="password"
          autocomplete="current-password"
          class="flex-grow"
          placeholder="New Password*"
          :error-message="errors.password"
        />
        <Input
          v-model="password2"
          type="password"
          name="password2"
          autocomplete="current-password"
          class="flex-grow"
          placeholder="Repeat Password*"
          :error-message="errors.password2"
        />
        <div class="text-gray-500 dark:text-gray-500">
          * - required
        </div>
        <div class="flex gap-2 mx-auto">
          <Button class="px-4" label="Reset Password" bg-color="bg-gray-700 hover:bg-gray-600" @click="sendNewPassword" />
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
import { resetPassword } from '~/logic/server/'
import { useUser } from '~/store/user'

const { user } = useUser()

const successMessage = ref('')
const errorMessage = ref('')
const buttonActive = ref(true)

const schema = toFormValidator(
  zod.object({
    password: zod.string().max(64, 'Max length 64 chars').min(8, 'Minimum password length is 8 symbols'),
    password2: zod.string().max(64, 'Max length 64 chars').min(8, 'Minimum password length is 8 symbols'),
  }).refine(data => data.password === data.password2, {
    message: 'Passwords don\'t match',
    path: ['password2'],
  }),
)

const { errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    password: '',
    password2: '',
  },
})


const params = useUrlSearchParams('history')

const { value: password } = useField<string>('password')
const { value: password2 } = useField<string>('password2')

const sendNewPassword = handleSubmit((values) => {
  if (params.token && !user.value.id) {
    resetPassword(values.password, params.token).then(message => errorMessage.value = message)
    buttonActive.value = false
    setTimeout(() => { buttonActive.value = true; successMessage.value = ''; errorMessage.value = '' }, 30 * 1000)
  }
})

</script>
