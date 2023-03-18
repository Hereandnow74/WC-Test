<template>
  <div class="w-full">
    <div class="rounded max-w-screen-md lg:pl-2 p-2 flex flex-col gap-4 w-full">
      <div v-if="user.id" class="flex flex-col gap-1">
        <div class="font-semibold">
          Name: <span class="text-blue-800 dark:text-orange-300">{{ user.name }}</span>
        </div>
        <div class="font-semibold">
          Number of likes: <span class="text-blue-800 dark:text-orange-300">{{ user.likedCharacters.length }}</span>
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
import { getUserFromServer, rebaseCharactersToServer, getCharactersFromServer, getLikesByUid, logoutFromServer, recalculateLikesOnServer } from '~/logic/auth/authLogic'
import { useUser } from '~/store/user'

const { user, tokens } = useUser()

if (user.value.id)
  getUserFromServer(user.value.id)

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
  getLikesByUid().then(x => console.log(x))
}

function recalculateLikes() {
  recalculateLikesOnServer()
}
</script>
