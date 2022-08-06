<template>
  <div>
    <teleport to="nav">
      <div class="flex text-base px-2 justify-center w-full bg-white dark:bg-[#121212] z-20">
        <Navigation
          :items="['intensity', 'pvp', 'orbs']"
          :titles="['Modes', 'Continuous PvP', 'Invasion PvP']"
          prefix="intensity"
        />
      </div>
    </teleport>
    <router-view class="mt-4" />
  </div>
</template>

<script lang='ts' setup>

const router = useRouter()
onMounted(() => document.location.pathname === '/intensity' ? router.replace('/intensity/intensity') : null)
</script>
