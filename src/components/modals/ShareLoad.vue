<template>
  <Modal v-if="mode === 'remote'" label="Load build" @click="mode = 'done'">
    <div class="p-2 text-center">
      <div v-if="loading">
        Loading build <eos-icons:bubble-loading />
      </div>
      <div v-else>
        <div>Successfully Loaded</div>
        <div>Build made by: <span class="font-bold">{{ madeBy }}</span></div>
      </div>
      <div v-if="errorMessage">
        {{ errorMessage }}
      </div>
      {{ loadBuild() }}
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { writeBuildValues, getBuild } from '~/logic'
import { useStore } from '~/store/store'

const { mode, params } = useStore()

const loading = ref(true)
const errorMessage = ref('')
const madeBy = ref('')

function loadBuild() {
  getBuild(params.load, (data) => {
    if (data) {
      writeBuildValues(data)
      madeBy.value = data.nickname
    }
    else { errorMessage.value = 'Problem with loading build' }
    loading.value = false
  })
}

</script>
