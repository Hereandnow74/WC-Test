<template>
  <div class="w-full">
    <div class="rounded lg:pl-2 p-2 flex flex-col gap-4 w-full">
      <div v-if="user.id" class="flex flex-col gap-1 max-w-screen-md mx-auto">
        <div class="font-semibold flex gap-4">
          Name: <span class="text-blue-800 dark:text-orange-300">{{ user.name }}</span>
          <div title="Role determines your rights, note that to get a User role you need to confirm your email.">
            Role: <span class="text-green-800 dark:text-green-300">{{ user.role }}</span>
          </div>
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
            v-model="confirm"
            type="password"
            autocomplete="new-password"
            class="flex-grow"
            placeholder="Confirm Password*"
            :error-message="errors.confirm"
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

      <div v-if="user.id" class="max-w-screen-md mx-auto">
        <h3 class="text-gray-600 dark:text-gray-400 text-lg">
          Actions:
        </h3>
        <div class="flex gap-2 flex-wrap">
          <Button bg-color="bg-red-600" label="Logout" @click="logout" />
          <Button v-if="user.role === 'admin'" label="Rebase" @click="rebase" />
          <Button v-if="!user.isEmailVerified && !isEmailSent" label="Send Verification Email" @click="sendEmail" />
          <Button v-if="user.role === 'admin'" label="Get Likes" @click="getLikes" />
          <Button v-if="user.role === 'admin'" label="Get Chars" @click="getChars" />
          <!-- <Button v-if="user.role === 'admin'" label="Rebase builds" @click="rebaseBuilds" /> -->
          <Button v-if="user.role === 'admin'" label="Recalculate Likes" @click="recalculateLikes" />
        </div>
      </div>

      <div v-if="user.id && yourBuilds.length" class="w-full">
        <h3 class="text-gray-600 dark:text-gray-400 text-lg">
          Your Builds:
        </h3>
        <div class="grid grid-cols-1 4xl:grid-cols-6 5xl:grid-cols-7 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2 h-full min-h-0 overflow-y-auto scrollbar">
          <BuildCard2 v-for="build in yourBuilds" :key="build.id" class="max-w-[440px]" :build="build" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import * as zod from 'zod'
import { useForm, useField } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'
import { ServerBuild } from 'global'
import { getUserFromServer, rebaseCharactersToServer, getCharactersFromServer, logoutFromServer, recalculateLikesOnServer, updateUserInfo, sendVerificationEmail, createBuildInDB, getAllYourBuilds } from '~/logic/server/'
import { useUser } from '~/store/user'
import { confirmDialog } from '~/logic/dialog'

const errorMessage = ref('')
const buttonActive = ref(true)

const { user, tokens } = useUser()

if (user.value.id)
  getUserFromServer(user.value.id)

const schema = toFormValidator(
  zod.object({
    password: zod.string().max(64, 'Max length 64 chars').min(8, 'Minimum password length is 8 symbols'),
    confirm: zod.string().max(64, 'Max length 64 chars').min(8, 'Minimum password length is 8 symbols'),
  })
    .refine(data => data.password === data.confirm, {
      message: 'Passwords don\'t match',
      path: ['confirm'],
    }),
)

const { errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    password: '',
    confirm: '',
  },
})

const { value: password } = useField<string>('password')
const { value: confirm } = useField<string>('confirm')

const yourBuilds = ref<ServerBuild[]>([])
// getAllYourBuilds().then(res => yourBuilds.value = res)

const changePassword = handleSubmit((values) => {
  // if (values.password !== values.confirm) {
  //   errorMessage.value = 'Passwords don\'t match'
  //   return
  // }
  const whatSendToServer = {
    password: values.password,
  }
  updateUserInfo(false, whatSendToServer).then(message => errorMessage.value = message)
  buttonActive.value = false
  setTimeout(() => { buttonActive.value = true; errorMessage.value = '' }, 30 * 1000)
})

function logout() {
  logoutFromServer(tokens.value.refresh.token)
}

function rebase() {
  rebaseCharactersToServer().then(msg => confirmDialog(msg, 'info'))
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

const isEmailSent = useStorage('ices', false)
function sendEmail() {
  isEmailSent.value = true
  sendVerificationEmail().then(msg => confirmDialog(msg, 'info'))
}

// const buildTags = computed(() => {
//   const tags = []
//   if (props.build.binding.length) tags.push(props.build.binding[0].type || props.build.binding[0].title)
//   if (props.build.heritage.length) tags.push(props.build.heritage[0].tree || props.build.heritage[0].title)
//   if (props.build.startingOrigin.title) tags.push(`${props.build.startingOrigin.character} ${props.build.startingOrigin.title}`)
//   if (props.build.allEffects.includes('With A Little Help From My Friends(Cooperative)')) tags.push('Cooperative')
//   if (props.build.allEffects.includes('Couple’s Account (Cooperative)')) tags.push('Couples')
//   if (props.build.allEffects.includes('Cash Still Rules')) tags.push('Cash Still Rules')
//   if (props.build.allEffects.includes('Wage Slave')) tags.push('Wage Slave')
//   if (props.build.allEffects.includes('Black-mark')) tags.push('Black-mark')
//   if (props.build.loan.owed > 0) tags.push('Under Loan')
//   if (props.build.companions.some(x => x.image)) tags.push('Custom Images')
//   if (props.build.companions.some(x => x.note)) tags.push('Retinue Notes')
//   if (props.build.activeChallenges.length > 0) tags.push(props.build.activeChallenges[0].title)
//   if (props.build.allEffects.some((x: string) => ALL_DLC_PERK_TITLES.value[x])) tags.push('Use DLC')
//   return tags
// })
// function rebaseBuilds() {
//   getAllBuilds((data) => {
//     data.forEach((build) => {
//       const finalBuild = {
//         title: build.title,
//         name: build.nickname,
//         build,
//         author: user.value.id,
//         desc: build.desc.replaceAll('\\n', '<br>'),
//         published: true,
//         bindingName: (build.binding.length) ? build.binding[0].type || build.binding[0].title : 'None',
//         originName: (build.startingOrigin.title) ? build.startingOrigin.title : 'None',
//         characterName: (build.startingOrigin.character) ? build.startingOrigin.character : 'None',
//         intensity: build.intensities.map(x => x.title),
//         loan: !!build.loan.owed,
//         creditBalance: 0,
//         creditsSpent: 0,
//         customImages: false,
//         dlc: false,
//         retinue: build.companions.map(char => ({ name: char.name, tier: char.tier, tags: char.tags || [], state: char.role || 'Companion' })),
//         retinueNotes: false,
//         challenges: build.activeChallenges.map(x => x.title),
//         tags: [],
//         likes: 0,
//       }
//       createBuildInDB(finalBuild).then(msg => confirmDialog(msg, 'info'))
//     })
//   })
// }
</script>
