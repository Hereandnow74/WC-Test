<template>
  <div>
    <teleport to="nav">
      <div class="flex text-base px-2 justify-center w-full bg-white dark:bg-[#121212] z-20">
        <Navigation
          :items="['ride', 'home', 'talent', 'defense', 'perks', 'specific']"
          :titles="['Ride', 'Home', 'Talents', 'Defense', 'Perks', 'Waifu Perks']"
          prefix="talents"
        />
      </div>
    </teleport>
    <router-view class="mt-4" />
  </div>
</template>

<script lang='ts' setup>

const router = useRouter()
onMounted(() => document.location.pathname === '/talents' ? router.replace('/talents/ride') : null)
</script>
