<template>
  <div
    class="rounded cursor-pointer flex-grow text-gray-100 text-shadow flex flex-col gap-1 pb-2"
    border="2 gray-400 hover:orange-600"
    :class="world.worldName === startingWorld.worldName || startingWorld.worldName === 'No World' || !pickAble ?
      WORLD_COLORS[rating - 1] || 'bg-gray-600' : 'bg-gray-600'"
    @click="pickAbleAfter ? pickWorld(world) : null"
  >
    <div v-if="world.image && !settings.hideWorldImg" class="flex-grow relative min-h-[170px]">
      <img
        ref="worldImg"
        class="rounded absolute object-cover h-full w-full object-center"
        :data-src="world.image"
        :alt="world.worldName"
      >
    </div>
    <h3 class="text-xl text-center bg-black bg-opacity-20 flex items-center px-2">
      <span class="font-semibold cursor-help" :title="types[type].title || ''" :class="types[type].color || 'text-gray-100'">{{ world.worldName }}</span>
      <bx:bxs-edit class="ml-auto hover:text-yellow-600" @click.stop="$emit('editWorld', world)" />
      <fluent:delete-20-filled v-if="type === 'local'" class="hover:text-red-500 ml-2" @click.stop="deleteWorld" />
    </h3>
    <div class="flex gap-4 justify-between text-gray-200 px-2">
      <div>
        Rating: <span class="text-amber-200 font-medium">{{ rating }}</span>
        <span v-if="world.q" class="text-red-400 cursor-help font-bold hover:text-red-300" @click.stop="showInfo">?</span>
      </div>
      <router-link v-if="world.targets" :to="`/companions/?world=${world.worldName}`" class="hover:underline" @click.stop>
        Targets: <span class="text-lime-300 font-medium">{{ world.targets }}</span>
      </router-link>
      <div>
        Budget: <span class="text-green-200 font-medium">{{ WORLD_RATINGS[rating]?.budget || 'None' }}</span>
      </div>
    </div>
    <div v-if="world.condition && isArray(world.condition)" class="mx-2 flex gap-2">
      <span class="text-gray-200">Condition:</span>
      <CustomSelect :model-value="condition.name" :list="conditionList(world.condition)" @update:modelValue="changeCondition" @click.stop />
      <!-- <select
        name="condition"
        class="text-gray-800 flex-grow min-w-0 rounded"
        @change="changeCondition"
        @click.stop
      >
        <option value="No condition">
          No condition
        </option>
        <option v-for="cnd in world.condition" :key="cnd.name" :value="cnd.name">
          {{ cnd.name }} ({{ cnd.rating }})
        </option>
      </select> -->
    </div>
    <div v-else-if="world.condition" class="mx-2">
      {{ world.condition }}
    </div>
    <Foldable v-if="world.additional" title="Setting Specific Rules" class="px-2" @click.stop>
      <Desc :desc="world.additional" class="p-1 rounded bg-black bg-opacity-20" />
    </Foldable>
  </div>
</template>

<script lang='ts' setup>
import { findIndex, isArray } from 'lodash-es'
import type { PropType } from 'vue'
import { useWorlds, WORLD_COLORS, WORLD_RATINGS } from '~/data/constants'
import { lazyLoadSingleImg } from '~/logic'
import { confirmDialog } from '~/logic/dialog'
import { World } from '~/store/chargen'
import { useStore } from '~/store/store'

const props = defineProps({
  world: {
    type: Object as PropType<World>,
    default: () => {},
  },
  pickAble: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String as PropType<'canon' | 'user' | 'local'>,
    default: 'canon',
  },
})

const types = {
  canon: {
    color: 'text-yellow-300',
    title: 'World is from official spreadsheet',
  },
  user: {
    color: 'text-gray-200',
    title: 'World was added by user',
  },
  local: {
    color: 'text-blue-200',
    title: 'The world that you added locally',
  },
}

defineEmits(['editWorld'])

const { baseBudget, startingWorld, localUserWorlds, flags, settings } = useStore()

const pickAbleAfter = computed(() => props.pickAble && !flags.value.chargen ? false : props.pickAble)

const condition = reactive({
  name: 'No condition',
  rating: 0,
})

const worldImg = ref<HTMLImageElement | null>(null)

const rating = computed(() => condition.rating || props.world.rating)

function pickWorld(world: World) {
  if (startingWorld.value.worldName === world.worldName
  && (startingWorld.value.condition === condition.name
  || (condition.name === 'No condition' && !startingWorld.value.condition))) {
    startingWorld.value = { worldName: 'No World', rating: 0 }
    baseBudget.value = 0
  }
  else {
    const rating = condition.rating || world.rating
    startingWorld.value = { worldName: world.worldName, rating }
    if (condition.name && condition.name !== 'No condition') startingWorld.value.condition = condition.name
    baseBudget.value = WORLD_RATINGS[rating]?.budget || 0
  }
}

function deleteWorld() {
  if (localUserWorlds.value.includes(props.world))
    localUserWorlds.value.splice(localUserWorlds.value.indexOf(props.world), 1)
}

function changeCondition(name: string) {
  const ind = findIndex(props.world.condition, { name })
  if (ind !== -1) {
    condition.name = name
    condition.rating = props.world.condition[ind].rating
  }
  else {
    condition.name = 'No condition'
    condition.rating = 0
  }
}

function showInfo() {
  confirmDialog('Rating is based on average user submitted rating. If you don\'t agree with it you can make your case over <a href="https://discord.gg/cZf4U5rmPV" target="_blank" rel="noopener noreferrer" class="text-blue-400">Discord</a>', 'info')
}

function conditionList(list: any[]) {
  list = list.map(x => ({ value: x.name, label: `${x.name} (${x.rating})`, style: x.a === 'c' ? 'text-yellow-300' : '' }))
  list.unshift({ value: 'No condition', label: 'No condition' })
  return list
}

onMounted(() => { if (worldImg.value) lazyLoadSingleImg(worldImg.value) })

</script>
