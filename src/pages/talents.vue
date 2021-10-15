<template>
  <div>
    <div class="flex px-2">
      <Navigation
        :items="['ride', 'home', 'talent', 'defense', 'perks', 'specific']"
        :titles="['Ride', 'Home', 'Talents', 'Defense', 'Perks', 'Waifu Perks']"
        prefix="talents"
      />
    </div>
    <router-view />
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
