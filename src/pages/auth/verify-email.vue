<template>
  <div class="w-full">
    <div class="rounded max-w-screen-md lg:pl-2 p-2 flex flex-col gap-4 w-full text-center">
      <div v-if="user.isEmailVerified">
        Email already confirmed
      </div>
      <template v-else>
        <div v-if="statusCode === 204">
          Email confirmed
        </div>
        <div v-if="statusCode !== 204 && statusCode !== 0">
          Something went wrong (or you just send the confirmation twice). Error code: {{ statusCode }}
        </div>
      </template>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { verifyEmail } from '~/logic/server/'
import { useUser } from '~/store/user'

const { user } = useUser()

const statusCode = ref(0)
const token = ref('')

const params = useUrlSearchParams('history')

if (params.token && !user.value.isEmailVerified) {
  token.value = params.token
  verifyEmail(token.value).then(code => statusCode.value = code)
}

</script>
