<template>
  <div>
    <teleport to="nav">
      <div class="flex text-base px-2 justify-center w-full bg-white dark:bg-[#121212] z-20">
        <Navigation
          :items="['bindings', 'lures', 'controls']"
          :titles="['Bindings', 'Lures', 'Other Controls']"
          prefix="bindings"
        />
      </div>
    </teleport>
    <router-view class="mt-4" />
  </div>
</template>

<script lang='ts' setup>

const router = useRouter()
onMounted(() => document.location.pathname === '/bindings' ? router.replace('/bindings/bindings') : null)
</script>
