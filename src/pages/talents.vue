<template>
  <div>
    <div class="flex px-2 fixed top-5 md:top-7 justify-center w-full bg-white dark:bg-[#121212] z-20">
      <Navigation
        :items="['ride', 'home', 'talent', 'defense', 'perks', 'specific']"
        :titles="['Ride', 'Home', 'Talents', 'Defense', 'Perks', 'Waifu Perks']"
        prefix="talents"
      />
    </div>
    <router-view class="mt-4" />
  </div>
</template>

<script lang='ts'>

export default defineComponent({
  setup() {
    const router = useRouter()
    onMounted(() => document.location.pathname === '/talents' ? router.replace('/talents/ride') : null)
  },
})
</script>
