<template>
  <div>
    <teleport to="nav">
      <div class="flex text-base px-2 justify-center w-full bg-white dark:bg-[#121212] z-20">
        <Navigation
          :items="['origin', 'patron']"
          :titles="['Origin', 'Patrons']"
          prefix="origin"
        />
      </div>
    </teleport>
    <router-view />
  </div>
</template>

<script lang='ts' setup>

const router = useRouter()
onMounted(() => document.location.pathname === '/origin' ? router.replace('/origin/origin') : null)
</script>
