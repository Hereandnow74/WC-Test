
<template>
  <div class="p-2">
    <div class="max-w-4xl md:p-2 mx-auto flex gap-2 items-center">
      <Input
        v-model="search"
        label="Search"
        placeholder="World name"
        class="w-full"
      />
      <clarity:eraser-solid class="icon-btn w-8" @click="search = ''" />
      <span class="hidden md:block pl-4 whitespace-nowrap">Worlds in database: {{ worldsCount }}</span>
      <Button size="Small" label="Add World" class="whitespace-nowrap" @click="() => (editMode = false, toggleShowAddWorld())" />
    </div>
    <Foldable v-if="allUserWorlds.length" class="text-lg mb-2" title="User Worlds">
      <div class="mb-4 flex flex-wrap gap-1 overflow-y-auto">
        <WorldCard v-for="world in allUserWorlds" :key="world.worldName" :world="world" :is-user-world="true" />
      </div>
    </Foldable>
    <Foldable v-if="allUserWorlds.length && worldsFiltered.length" class="text-lg mb-2" title="Canon Worlds" :is-open="true">
      <div class="flex flex-wrap gap-1 overflow-y-auto pb-8">
        <WorldCard
          v-for="world in worldsFiltered"
          :key="world.worldName + (world.condition || 'none')"
          :world="world"
          @edit-world="editWorld"
        />
        <div v-if="!worldsFiltered.length" class="text-center flex-grow">
          <p>No worlds found.</p>
        </div>
      </div>
    </Foldable>
    <AddWorld v-if="showAddWorld" :world="worldToEdit" :edit-mode="editMode" @click="toggleShowAddWorld" />
  </div>
</template>

<script lang="ts">
import Fuse from 'fuse.js'
import worlds from '~/data/worlds.json'
import { useStore } from '~/store/store'
import { toggleShowAddWorld, showAddWorld } from '~/logic'

export default defineComponent({
  setup() {
    const search = ref('')
    const worldsReac = ref(worlds)
    const worldToEdit = ref({})
    const editMode = ref(false)

    const { userWorlds, localUserWorlds } = useStore()

    const options = {
      findAllMatches: true,
      threshold: 0.1,
      keys: ['worldName', 'condition.name'],
    }

    const fuse = new Fuse(worldsReac.value, options)

    const worldsCount = computed(() => worlds.length)
    const allUserWorlds = computed(() => userWorlds.value.concat(localUserWorlds.value))

    const worldsFiltered = computed(() => {
      if (search.value)
        return fuse.search(search.value).map(x => x.item)
      else
        return worldsReac.value
    })

    function editWorld(world: typeof worlds[number]) {
      worldToEdit.value = world
      editMode.value = true
      toggleShowAddWorld()
    }

    return {
      search,
      worldsCount,
      worldsFiltered,
      allUserWorlds,
      worldToEdit,
      editMode,
      editWorld,
      showAddWorld,
      toggleShowAddWorld,
    }
  },
})
</script>
