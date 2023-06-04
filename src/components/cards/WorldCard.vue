<template>
  <div
    class="rounded cursor-pointer flex-grow text-gray-100 text-shadow flex flex-col gap-1 pb-2"
    border="2 gray-400 hover:orange-600"
    :class="world.worldName === startingWorld.worldName || startingWorld.worldName === 'No World' || !pickAble ?
      WORLD_COLORS[rating - 1] || 'bg-gray-600' : 'bg-gray-600'"
    @click="pickAbleAfter ? pickWorld(world) : null"
  >
    <div v-if="world.image && !settings.hideWorldImg" class="flex-grow relative">
      <img
        ref="worldImg"
        class="rounded absolute object-cover h-full w-full object-center"
        :data-src="world.image"
        :alt="world.worldName"
        :src="PLACEHOLDER_NO_IMAGE"
      >
      <div class="absolute top-1 right-0.5 cursor-pointer flex items-center gap-1 text-lg leading-none" @click.stop="likeWorld">
        <span class="text-red-500 hover:text-red-400 flex items-center gap-0.5 text-shadow-border">
          <!-- <span v-if="worldLikes" class="font-semibold">{{ worldLikes }}</span> -->
          <ci:heart-fill
            v-if="favoriteWorldsObject[world.uid]"
            class="filter drop-shadow"
          />
          <ci:heart-outline v-else class="filter drop-shadow" />
        </span>
      </div>
    </div>
    <h3 class="text-xl text-center bg-black bg-opacity-20 flex items-center px-2">
      <span class="font-semibold cursor-help" :title="options.title" :class="options.color || 'text-gray-100'">{{ world.worldName }}</span>
      <span class="ml-auto inline-flex gap-0.5">
        <ic:outline-info v-if="targets" class="hover:text-green-400" @click.stop="$emit('showWorldInfo', world)" />
        <bx:bxs-edit class="hover:text-yellow-600" @click.stop="$emit('editWorld', world)" />
        <fluent:delete-20-filled v-if="!world.uid || world.uid.length === 7" class="hover:text-red-500" @click.stop="deleteWorld" />
      </span>
    </h3>
    <div class="flex gap-4 justify-between text-gray-200 px-2">
      <div>
        Rating: <span class="text-amber-200 font-medium">{{ rating }}</span>
        <span v-if="world.q" class="text-red-400 cursor-help font-bold hover:text-red-300" @click.stop="showInfo">?</span>
      </div>
      <router-link v-if="targets" :to="`/companions/?world=${world.worldName}`" class="hover:underline" @click.stop>
        Targets: <span class="text-lime-300 font-medium">{{ targets }}</span>
      </router-link>
      <div>
        Budget: <span class="text-green-200 font-medium">{{ difficultyAdjustedBudgets[rating] || 'None' }}</span>
      </div>
    </div>
    <div v-if="world.condition && isArray(world.condition)" class="mx-2 flex gap-2">
      <span class="text-gray-200">Condition:</span>
      <CustomSelect :model-value="condition.name" :list="conditionList(world.condition)" @update:modelValue="changeCondition" @click.stop />
    </div>
    <div v-else-if="world.condition" class="mx-2">
      {{ world.condition }}
    </div>
    <Foldable v-if="world.additional" v-auto-animate title="Setting Specific Rules" class="px-2 overflow-y-auto scrollbar" @click.stop>
      <Desc :desc="world.additional" class="p-1 rounded bg-black bg-opacity-20" />
    </Foldable>
  </div>
</template>

<script lang='ts' setup>
import { DBWorld } from 'global'
import { findIndex, isArray } from 'lodash-es'
import type { PropType } from 'vue'
import { WORLD_COLORS, WORLD_RATINGS, PLACEHOLDER_NO_IMAGE } from '~/data/constants'
import { lazyLoadSingleImg } from '~/logic'
import { confirmDialog } from '~/logic/dialog'
import { useGlobalSettings } from '~/store/settings'
import { useStore } from '~/store/store'

const props = defineProps({
  world: {
    type: Object as PropType<DBWorld>,
    default: () => {},
  },
  targets: {
    type: Number,
    default: 0,
  },
  pickAble: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String as PropType<'canon' | 'user' | 'local'>,
    default: 'canon',
  },
  min: {
    type: Number,
    default: 1,
  },
  max: {
    type: Number,
    default: 10,
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
    color: 'text-blue-300',
    title: 'The world that you added locally',
  },
}

const options = computed(() => {
  if (props.world.uid && props.world.uid.length === 5)
    return { title: types.canon.title, color: types.canon.color }
  if (props.world.uid && props.world.uid.length === 6)
    return { title: types.user.title, color: types.user.color }
  if (props.world.uid && props.world.uid.length === 7)
    return { title: types.local.title, color: types.local.color }
  return { title: '', color: '' }
})

defineEmits(['editWorld', 'showWorldInfo'])

const { baseBudget, startingWorld, localUserWorlds, flags, settings, difficultyAdjustedBudgets } = useStore()

const { favoriteWorlds, favoriteWorldsObject } = useGlobalSettings()

const pickAbleAfter = computed(() => props.pickAble && !flags.value.chargen ? false : props.pickAble)

const condition = reactive({
  name: 'No condition',
  rating: 0,
})

if ((props.min !== 1 || props.max !== 10) && props.world.condition?.length) {
  const conditions = props.world.condition.filter(cnd => cnd.rating >= props.min && cnd.rating <= props.max)
  if (conditions.length) {
    condition.name = conditions[0].name
    condition.rating = conditions[0].rating
  }
}
watch([() => props.min, () => props.max], () => {
  if ((props.min !== 1 || props.max !== 10) && props.world.condition?.length) {
    const conditions = props.world.condition.filter(cnd => cnd.rating >= props.min && cnd.rating <= props.max)
    if (conditions.length) {
      condition.name = conditions[0].name
      condition.rating = conditions[0].rating
    }
  }
  if ((props.min === 1 && props.max === 10) && props.world.condition?.length && condition.name !== 'No condition') {
    condition.name = 'No condition'
    condition.rating = 0
  }
})

const worldImg = ref<HTMLImageElement | null>(null)

const rating = computed(() => condition.rating || props.world.rating)

function pickWorld(world: DBWorld) {
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
  list = list.map(x => ({ value: x.name, label: `${x.name} (${x.rating})`, style: x.official ? 'text-yellow-300' : '' }))
  list.unshift({ value: 'No condition', label: 'No condition' })
  return list
}

function likeWorld() {
  if (favoriteWorldsObject.value[props.world.uid] !== undefined)
    favoriteWorlds.value.splice(favoriteWorlds.value.indexOf(props.world.uid), 1)
    // if (likes.value[props.world.uid] && user.value.id) {
    //   likes.value[props.world.uid] -= 1
    //   updateUserLikes(false, { characterUid: props.world.uid, liked: false })
    // }

  else
    favoriteWorlds.value.push(props.world.uid)
    // if (user.value.id) {
    //   if (likes.value[props.world.uid] !== undefined) {
    //     likes.value[props.world.uid] += 1
    //     updateUserLikes(false, { characterUid: props.world.uid, liked: true })
    //   }
    //   else {
    //     likes.value[props.world.uid] = 1
    //     updateUserLikes(false, { characterUid: props.world.uid, liked: true })
    //   }
    // }
}

onMounted(() => { if (worldImg.value) lazyLoadSingleImg(worldImg.value) })

</script>
