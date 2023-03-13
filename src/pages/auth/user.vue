<template>
  <div class="w-full">
    <div class="rounded max-w-screen-md lg:pl-2 p-2 flex flex-col gap-4 w-full text-center">
      {{ user }}
    </div>
  </div>
</template>

<script lang='ts' setup>
import { getUserFromServer, user } from '~/logic/auth/authLogic'

getUserFromServer(user.value.id)
</script>
