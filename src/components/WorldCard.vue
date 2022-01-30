<template>
  <div
    class="rounded cursor-pointer flex-grow text-gray-100 text-shadow flex flex-col gap-1"
    border="2 gray-400 hover:orange-600"
    :class="world.worldName === startingWorld.worldName || startingWorld.worldName === 'Current world' || !pickAble ?
      WORLD_COLORS[world.rating - 1] || 'bg-gray-600' : 'bg-gray-600'"
    @click="pickAbleAfter ? pickWorld(world) : null"
  >
    <div v-if="world.image && !settings.allImg" class="flex-grow relative min-h-[170px]">
      <img
        ref="worldImg"
        class="rounded absolute object-cover h-full w-full object-center"
        :data-src="world.image"
        :alt="world.worldName"
      >
    </div>
    <h3 class="text-xl text-center bg-black bg-opacity-10 flex items-center px-2">
      <span class="font-semibold">{{ world.worldName }}</span>
      <bx:bxs-edit class="ml-auto hover:text-yellow-600" @click="$emit('editWorld', world)" />
      <fluent:delete-20-filled v-if="isUserWorld" class="hover:text-red-500 ml-2" @click="deleteWorld" />
    </h3>
    <div class="flex gap-4 justify-between text-gray-200 px-2">
      <div>
        Rating: <span class="text-amber-200 font-medium">{{ world.rating || 'Unknown' }}</span>
        <span v-if="world.q" class="text-red-400 cursor-help font-bold hover:text-red-300" @click.stop="showInfo">?</span>
      </div>
      <div>
        Budget: <span class="text-green-200 font-medium">{{ WORLD_RATINGS[world.rating - 1]?.budget || 'None' }}</span>
      </div>
    </div>
    <template v-if="world.condition">
      <div v-if="typeof world.condition === 'object' && world.condition.length" class="px-2">
        <span class="text-gray-200 mr-2">Condition:</span>
        <select
          id="condition"
          name="condition"
          class="text-gray-800 w-40 rounded"
          value="No condition"
          @change="changeCondition"
          @click.stop
        >
          <option value="No condition">
            No condition
          </option>
          <option v-for="cnd in world.condition" :key="cnd.name" :value="cnd.name">
            {{ cnd.name }} ({{ cnd.rating }})
          </option>
        </select>
      </div>
      <div v-else-if="world.condition.length" class="px-2">
        <span class="text-gray-200 mr-2">Condition:</span> {{ world.condition }}
      </div>
    </template>
    <Foldable v-if="world.additional" title="Setting Specific Rules" class="px-2 pb-2" @click.stop>
      <Desc :desc="world.additional" class="p-1 rounded bg-black bg-opacity-20" />
    </Foldable>
  </div>
</template>

<script lang='ts' setup>
import { findIndex } from 'lodash-es'
import type { PropType } from 'vue'
import { WORLD_COLORS, WORLD_RATINGS } from '~/data/constants'
import { lazyLoadSingleImg } from '~/logic'
import { confirmDialog } from '~/logic/dialog'
import { World } from '~/store/chargen'
import { useStore } from '~/store/store'

const props = defineProps({
  world: {
    type: Object as PropType<World>,
    default: () => {},
  },
  isUserWorld: {
    type: Boolean,
    default: false,
  },
  pickAble: {
    type: Boolean,
    default: true,
  },
})

defineEmits(['editWorld'])

const { baseBudget, startingWorld, localUserWorlds, flags, settings } = useStore()

const pickAbleAfter = computed(() => props.pickAble && !flags.value.chargen ? false : props.pickAble)

const condition = reactive({
  name: undefined,
  rating: 0,
})

const baseDR = props.world.rating

const worldImg = ref<HTMLImageElement | null>(null)

function pickWorld(world: World) {
  if (startingWorld.value.worldName === world.worldName && startingWorld.value.condition === condition.name) {
    startingWorld.value = { worldName: 'Current world', rating: 2 }
    baseBudget.value = 55
  }
  else {
    const rating = condition.rating || world.rating
    startingWorld.value = { worldName: world.worldName, rating }
    if (condition.name) startingWorld.value.condition = condition.name
    baseBudget.value = WORLD_RATINGS[world.rating - 1]?.budget || 0
  }
}

function deleteWorld() {
  if (localUserWorlds.value.includes(props.world))
    localUserWorlds.value.splice(localUserWorlds.value.indexOf(props.world), 1)
}

function changeCondition(event: any) {
  const name = event.target.value
  const ind = findIndex(props.world.condition, { name })
  if (ind !== -1) {
    condition.name = name
    condition.rating = props.world.condition[ind].rating
    props.world.rating = condition.rating
  }
  else {
    props.world.rating = baseDR
    condition.name = undefined
  }
}

function showInfo() {
  confirmDialog('Rating is based on average user submitted rating. If you don\'t agree with it you can make your case over <a href="https://discord.gg/cZf4U5rmPV" target="_blank" rel="noopener noreferrer" class="text-blue-400">Discord</a>', 'info')
}

onMounted(() => { if (worldImg.value) lazyLoadSingleImg(worldImg.value) })

</script>
