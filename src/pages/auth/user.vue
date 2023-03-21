<template>
  <div class="w-full">
    <div class="rounded max-w-screen-md lg:pl-2 p-2 flex flex-col gap-4 w-full">
      <div v-if="user.id" class="flex flex-col gap-1">
        <div class="font-semibold">
          Name: <span class="text-blue-800 dark:text-orange-300">{{ user.name }}</span>
        </div>
        <div class="font-semibold">
          Email: <span class="text-blue-800 dark:text-orange-300">{{ user.email }}</span>
        </div>
        <div class="font-semibold">
          Number of liked characters: <span class="text-blue-800 dark:text-orange-300">{{ user.likedCharacters.length }}</span>
        </div>
        <div class="my-4 flex flex-col gap-2">
          <Input
            v-model="password"
            type="password"
            name="password"
            autocomplete="new-password"
            class="flex-grow"
            placeholder="Password*"
            :error-message="errors.password"
          />
          <Input
            v-model="password2"
            type="password"
            autocomplete="new-password"
            class="flex-grow"
            placeholder="Confirm Password*"
            :error-message="errors.password2"
          />
          <Button :disabled="!buttonActive" label="Change password" bg-color="bg-orange-600" @click="changePassword" />
          <div class="text-red-700 dark:text-red-500">
            {{ errorMessage }}
          </div>
        </div>
      </div>
      <div v-else class="text-center">
        Not Registered
      </div>

      <template v-if="user.id">
        <Button label="Logout" @click="logout" />
        <Button v-if="user.role === 'admin'" label="Rebase" @click="rebase" />
        <Button v-if="user.role === 'admin'" label="Get Likes" @click="getLikes" />
        <Button v-if="user.role === 'admin'" label="Get Chars" @click="getChars" />
        <Button v-if="user.role === 'admin'" label="Recalculate Likes" @click="recalculateLikes" />
      </template>
    </div>
  </div>
</template>

<script lang='ts' setup>
import * as zod from 'zod'
import { useForm, useField } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'
import { getUserFromServer, rebaseCharactersToServer, getCharactersFromServer, getLikesByUid, logoutFromServer, recalculateLikesOnServer, updateUserInfo } from '~/logic/auth/authLogic'
import { useUser } from '~/store/user'

const errorMessage = ref('')
const buttonActive = ref(true)

const { user, tokens } = useUser()

if (user.value.id)
  getUserFromServer(user.value.id)

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

const { value: password } = useField<string>('password')
const { value: password2 } = useField<string>('password2')

const changePassword = handleSubmit((values) => {
  const whatSendToServer = {
    password: values.password,
  }
  updateUserInfo(false, whatSendToServer).then(message => errorMessage.value = message)
  buttonActive.value = false
  setTimeout(() => { buttonActive.value = true; errorMessage.value = '' }, 30 * 1000)
})

function logout() {
  logoutFromServer(tokens.value.refresh.token)
  user.value = {}
  tokens.value = {}
}

function rebase() {
  rebaseCharactersToServer()
}

function getChars() {
  getCharactersFromServer()
}

function getLikes() {
  // getUserFromServer('6414df646e38005300ee119c').then(x => console.log(x))
}

function recalculateLikes() {
  recalculateLikesOnServer()
}
</script>
