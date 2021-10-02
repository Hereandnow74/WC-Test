<template>
  <div class="flex flex-col gap-2 pb-8">
    <div v-for="num in 108" :key="num" class="self-center">
      <img :src="`/img/waifu_perks/specific${num}.png`" alt="">
    </div>
  </div>
</template>

<script lang='ts'>

export default defineComponent({

})
</script>
