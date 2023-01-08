<template>
  <div class="max-w-screen-md lg:pl-0 flex flex-col gap-4">
    <Button size="small" bg-color="bg-orange-500" label="LOGIN" class="px-4" @click="signIn" />
    {{ isAuthenticated }}
  </div>
</template>

<script lang='ts' setup>
import { useAuth } from '@vueuse/firebase/useAuth'
import { auth, signIn } from '~/logic'

signIn()

const { isAuthenticated } = useAuth(auth)

</script>
