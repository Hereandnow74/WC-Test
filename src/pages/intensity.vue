<template>
  <div>
    <teleport to="nav">
      <div class="flex text-base px-2 justify-center w-full bg-white dark:bg-[#121212] z-20">
        <Navigation
          :items="items"
          :titles="titles"
          prefix="intensity"
        />
      </div>
    </teleport>
    <router-view />
  </div>
</template>

<script lang='ts' setup>
import { useStore } from '~/store/store'

const { legacyMode } = useStore()

const router = useRouter()
onMounted(() => document.location.pathname === '/intensity' ? router.replace('/intensity/difficulty') : null)

const items = computed(() => {
  return legacyMode.value ? ['difficulty', 'intensity', 'pvp', 'orbs', 'tournament'] : ['difficulty', 'orbs', 'tournament']
})

const titles = computed(() => {
  return legacyMode.value ? ['Difficulty', 'Modes', 'Continuous PvP', 'Invasion PvP', 'Tournament PvP '] : ['Difficulty', 'Invasion PvP', 'Tournament PvP ']
})

</script>
