<template>
  <div>
    <teleport to="nav">
      <div class="flex text-base px-2 justify-center w-full bg-white dark:bg-[#121212] z-20">
        <Navigation
          :items="['ride', 'home', 'talent', 'defense', 'perks', 'generic', 'specific']"
          :titles="['Rides', 'Demiplane & Dungeons', 'Talents', 'Defenses', 'Other', 'Generic', 'Specific']"
          prefix="talents"
        />
      </div>
    </teleport>
    <router-view />
  </div>
</template>

<script lang='ts' setup>

const router = useRouter()
onMounted(() => document.location.pathname === '/talents' ? router.replace('/talents/ride') : null)
</script>
