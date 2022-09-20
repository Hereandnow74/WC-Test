
<template>
  <div
    class="fixed bottom-0 w-full text-gray-100 transition-transform transform"
    :class="visible ? 'translate-y-0' : 'translate-y-[calc(100%-1.8rem)]'"
    @mousedown="visible = false"
  >
    <Smartphone
      class="min-w-[320px] h-[568px] sm:h-[calc(100vh-3.4rem)] rounded-3xl mx-auto border relative flex flex-col transition-all"
      bg="gray-900"
      border="2 gray-400"
      :class="orientation ? 'max-w-[940px]' : 'max-w-[440px]'"
    />
  </div>
</template>

<script lang="ts" setup>
import { orientation, showSmartMenu, visible } from '~/logic'

const smartMenu = ref(null)

onClickOutside(smartMenu, () => showSmartMenu.value = false)

</script>
