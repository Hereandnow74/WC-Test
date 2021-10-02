<template>
  <div>
    <div class="flex px-2">
      <Navigation
        :items="['ride', 'home', 'talent', 'defense', 'perks', 'specific']"
        :titles="['Ride', 'Home', 'Talent', 'Defense', 'Perks', 'Waifu Perks']"
        prefix="talents"
      />
    </div>
    <router-view />
  </div>
</template>

<script lang='ts'>

export default defineComponent({
  setup() {
    // const router = useRouter()
    // router.replace('/talents/ride')
  },
})
</script>
