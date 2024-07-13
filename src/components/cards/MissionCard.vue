<template>
  <div class="relative bg-[#f2eecb] dark:bg-[#1E1E5C] rounded p-2 shadow-lg flex flex-col gap-1">
    <div class="flex gap-4">
      <div class="hover:(text-red-400) text-lg cursor-pointer flex items-center gap-1" title="Add to Favorites" @click="missionFavoritesSet.has(mission.uid) ? missionFavorites.splice(missionFavorites.indexOf(mission.uid), 1) : missionFavorites.push(mission.uid)">
        <span class="text-red-500">
          <ci:heart-fill
            v-if="missionFavoritesSet.has(mission.uid)"
          />
          <ci:heart-outline v-else />
        </span>
      </div>
      <div v-if="!mission.temprorary" class="flex gap-5 text-lg cursor-pointer flex items-center">
        <span class="hover:text-green-200 flex gap-2 items-center" :title="missionLikes.likesUsers.join(', ')" @click="like">
          <carbon:thumbs-up
            v-if="!missionLikes.likesUsers.includes(user.name)"
          />
          <carbon:thumbs-up-filled v-else />
          {{ missionLikes.likes }}
        </span>
        <span class="hover:text-red-200 flex gap-2 items-center" :title="missionLikes.dislikesUsers.join(', ')" @click="dislike">
          <carbon:thumbs-down
            v-if="!missionLikes.dislikesUsers.includes(user.name)"
          />
          <carbon:thumbs-down-filled v-else />
          {{ missionLikes.dislikes }}
        </span>
      </div>
      <div class="ml-auto flex gap-2">
        <div v-if="mission.temprorary" title="Delete Mission" class="text-lg hover:text-red-500 cursor-pointer flex items-center gap-1" @click="deleteLocal">
          <bx:bxs-trash />
        </div>
        <div title="Edit Mission" class="text-lg hover:text-orange-500 cursor-pointer flex items-center gap-1" @click="showEditCompanion">
          <bx:bxs-edit />
        </div>
      </div>
    </div>
    <h4 class="text-lg text-center py-1">
      <router-link :to="`/missions?q=${mission.uid}`" class="hover:underline">
        <span v-html="mission.title"></span>
      </router-link>
      <span v-if="mission.author" class="text-sm text-gray-500 dark:text-gray-400"> by {{ mission.author }}</span>
    </h4>
    <div class="max-h-sm overflow-hidden relative flex justify-center">
      <img
        v-if="mission.image && settings.perkImages"
        ref="imageEl"
        class="object-cover rounded "
        :class="showImage ? '' : 'filter blur-2xl transition'"
        draggable="false"
        :data-src="mission.image"
        alt="mission image"
      >
      <div v-if="!showImage" class="rounded inset-0 absolute w-1/2 h-12 bg-[rgba(0,0,0,0.4)] color-white cursor-pointer text-center m-auto leading-12" @click="showImage=true">
        Click to show image
      </div>
    </div>
    <div class="flex gap-2 justify-between px-2 float-right">
      <div v-if="mission.loca === 'Generic'" class="font-semibold">
        <span class=" text-teal-600 dark:text-teal-300">Generic mission</span>
      </div>
      <div v-else class="font-semibold">
        <span class="font-normal text-gray-600 dark:text-gray-300">Location</span>: {{ mission.loca }}
      </div>
      <div class="font-semibold whitespace-nowrap">
        <span class="font-normal text-gray-600 dark:text-gray-300">Scope</span>: {{ mission.scope }}
      </div>
    </div>
    <div v-if="mission.budget" data-tippy-content="The sum of the list prices for your retinue’s effective tiers after step 4, plus the combined list prices of your Catch-a-Ride vehicles. Imaginary Tiers are valued according to the exchange rate of their IMG value. If you only bring a limited force into a mission, only they will count towards this." class="text-center text-sm text-amber-800 dark:text-amber-300">
      ( The optimal <span class="text-green-700 dark:text-green-300 underline cursor-pointer">asset value</span> for this mission is in <span class="text-green-800 dark:text-green-300">{{ Math.floor(mission.budget * 0.8) }}</span> - <span class="text-green-800 dark:text-green-300">{{ Math.floor(mission.budget * 1.2) }}</span> credits range)
    </div>
    <div class="px-2" v-html="convertedBBCode.html">
    </div>
    <div v-if="mission.conditions.length" class="px-2 flex flex-col gap-1">
      <h4 class="text-amber-800 dark:text-amber-300">
        Conditions:
      </h4>
      <ul class="list-disc list-inside">
        <li v-for="req in mission.conditions" :key="req.value" class="pl-4 py-0.5">
          {{ req.value }}
        </li>
      </ul>
    </div>
    <div class="px-2">
      <h4 class="text-green-800 dark:text-green-300 float-left pr-2">
        Reward
        <span v-if="mission.rewardType">
          [
          <span class="font-semibold text-pink-800 dark:text-pink-300">
            {{ mission.rewardType }}
          </span>
          ]
        </span>:
      </h4>
      <span>{{ mission.reward }}</span>
    </div>
    <div v-if="mission.objectives.length" class="px-2 flex flex-col gap-1">
      <h4 class="text-amber-800 dark:text-amber-300">
        Additional objectives:
      </h4>
      <div v-for="rew, n in mission.objectives.slice(0, 8)" :key="rew.value" class="p-1 pl-4 bg-blue-200 dark:bg-blue-gray-700 flex flex-col gap-2">
        <!-- <div class="flex gap-2 whitespace-nowrap">
          <label for="">Completed: <input id="" type="checkbox" name=""></label>
          <NumberInput v-if="Math.random() > 0.7" label="Number of times" />
        </div> -->
        <div><b>Objective {{ n + 1 }}</b>: {{ rew.value }}</div>
        <div>
          <span class="font-semibold text-green-800 dark:text-green-300">
            Reward
            <span v-if="rew.type">
              [
              <span class="font-semibold text-pink-800 dark:text-pink-300">
                {{ rew.type }}
              </span>
              ]
            </span>:
          </span> {{ rew.reward }}
        </div>
      </div>
      <div v-if="mission.objectives.length > 8 && !allObjectives" class="rounded w-1/2 h-8 hover:underline color-white cursor-pointer leading-8 flex items-center text-blue-800 dark:text-blue-300" @click="allObjectives = true">
        Show remaining {{ mission.objectives.length - 8 }} objectives
        <ic:baseline-keyboard-double-arrow-down class="w-8" />
      </div>
      <template v-if="allObjectives">
        <div v-for="rew, n in mission.objectives.slice(8)" :key="rew.value" class="p-1 pl-4 bg-blue-200 dark:bg-blue-gray-700 flex flex-col gap-2">
          <!-- <div class="flex gap-2 whitespace-nowrap">
            <label for="">Completed: <input id="" type="checkbox" name=""></label>
            <NumberInput v-if="Math.random() > 0.7" label="Number of times" />
          </div> -->
          <div><b>Objective {{ n + 9 }}</b>: {{ rew.value }}</div>
          <div>
            <span class="font-semibold text-green-800 dark:text-green-300">
              Reward
              <span v-if="rew.type">
                [
                <span class="font-semibold text-pink-800 dark:text-pink-300">
                  {{ rew.type }}
                </span>
                ]
              </span>:
            </span> {{ rew.reward }}
          </div>
        </div>
      </template>
      <div v-if="mission.objectives.length > 8 && allObjectives" class="rounded w-1/2 h-8 hover:underline color-white cursor-pointer text-center leading-8  text-blue-800 dark:text-blue-300 flex items-center" @click="allObjectives = false">
        Hide them again
        <ic:baseline-keyboard-double-arrow-up class="w-8" />
      </div>
    </div>
    <Button
      v-if="!mission.temprorary"
      class="text-gray-100 rounded cursor-pointer hover:bg-orange-500 px-2 mt-auto self-center"
      :label="missionRewards[mission.uid] ? 'Edit the rewards': 'Take the Mission'"
      :bg-color="!!missionRewards[mission.uid] ? 'bg-orange-600': 'bg-red-700'"
      icon="charm:swords"
      @click="showTakeMission = true"
    />
    <Button
      v-if="mission.temprorary"
      label="Submit the Mission"
      class="px-8"
      bg-color="bg-amber-600 mt-4"
      @click="sendMission()"
    />
    <TakeMission v-if="showTakeMission" :mission="mission" @click="showTakeMission = false" />
    <AddMission v-if="showEditMission" :mission="mission" :close-function="() => showEditMission = false" @click="showEditMission = false" />
  </div>
</template>

<script lang="ts" setup>
import { Mission } from 'global'
import type { PropType } from 'vue'
import { lazyLoadSingleImg, useTooltips, proposeMission } from '~/logic'
import { XBBCODE } from '~/logic/bbtohtml'
import { usePlayStore } from '~/store/play'
import { useSaves } from '~/store/saves'
import { useStore } from '~/store/store'
import { likeOrDislikeMission } from '~/logic/server'
import { useUser } from '~/store/user'
import { customDialog } from '~/logic/dialog'

const { settings } = useStore()
const { missionRewards } = usePlayStore()
const { missionFavorites, localMissions } = useSaves()

const props = defineProps({
  mission: {
    type: Object as PropType<Mission>,
    default: () => ({}),
  },
  likes: {
    type: Object as PropType<{ likes: number; dislikes: number; likesUsers: string[]; dislikesUsers: string[] }>,
    default: () => ({ likes: 0, dislikes: 0, likesUsers: [], dislikesUsers: [] }),
  },
})

const imageEl = ref(null)
const showTakeMission = ref(false)
const showEditMission = ref(false)

const showImage = ref(!props.mission.lewd)
const allObjectives = ref(false)
const missionLikes = ref(props.likes)

watch(() => props.likes, (val) => { missionLikes.value = val })

const { user } = useUser()

const missionFavoritesSet = computed(() => new Set(missionFavorites.value))

onMounted(() => { if (imageEl.value) lazyLoadSingleImg(imageEl.value) })

function showEditCompanion() {
  showEditMission.value = true
}

const convertedBBCode = computed(() => {
  return XBBCODE.process({
    text: props.mission.desc,
    convertLineBreaksToBbcode: true,
    removeMisalignedTags: false,
  })
})

onMounted(() => useTooltips())

async function like() {
  const res = await likeOrDislikeMission({ uid: props.mission.uid, like: true, dislike: false, userId: user.value.id })
  if (res && typeof res === 'object')
    missionLikes.value = res
  else
    customDialog(res, ['Ok'])
}

async function dislike() {
  const res = await likeOrDislikeMission({ uid: props.mission.uid, like: false, dislike: true, userId: user.value.id })
  if (res && typeof res === 'object')
    missionLikes.value = res
  else
    customDialog(res, ['Ok'])
}

function sendMission() {
  proposeMission(props.mission, () => customDialog('Mission submitted', ['Ok']))
}

const deleteLocal = () => {
  localMissions.value.splice(localMissions.value.findIndex(m => m.uid === props.mission.uid), 1)
}

</script>
