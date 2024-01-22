<template>
  <div class="px-2 flex flex-col gap-2 overflow-y-auto min-h-0 scrollbar relative">
    <BuildHeader />
    <div id="World" class="text-gray-200">
      <h3 class="text-lg relative text-gray-400">
        World
        <div class="absolute right-2 top-1 flex gap-2">
          <Toggle v-model="priceMode" title="Show prices" />
          <Toggle v-model="editMode" title="Toggle manual remove mode" />
        </div>
      </h3>
      <div class="flex flex-wrap whitespace-nowrap gap-2">
        <div class="flex gap-2">
          <span class="text-gray-300">Name:</span>
          <span>{{ startingWorld.worldName || 'Unknown' }}</span>
        </div>
        <div v-if="startingWorld.condition" class="flex gap-2">
          <span class="text-gray-300">Condition:</span>
          <span class="whitespace-normal">{{ startingWorld.condition }}</span>
        </div>
        <div class="flex gap-2">
          <span class="text-gray-300">Rating:</span>
          <span class="text-teal-300 font-semibold">{{ startingWorld.rating || 'Unknown' }}
            <span class="text-blue-300 font-semibold">({{ difficultyAdjustedBudgets[startingWorld.rating] || 0 }})</span>
          </span>
        </div>
      </div>
    </div>
    <div v-if="patron.length" id="patron">
      <h3 class="text-lg text-gray-400">
        Patron
      </h3>
      <Enum color="text-blue-400 hover:text-blue-300" :list="patron" path="/origin" />
    </div>
    <div v-if="activeChallenges.length" id="Challenges">
      <h3 class="text-lg text-gray-400">
        Challenges
      </h3>
      <Enum color="text-blue-400 hover:text-blue-300" :list="activeChallenges" path="/challenges" />
    </div>
    <div id="Difficulty">
      <h3 class="text-lg text-gray-400">
        Difficulty
      </h3>
      <Enum
        color="text-blue-400 hover:text-blue-300"
        :list="difficulties"
        :edit-mode="editMode"
        :price-mode="priceMode"
        empty-message="Default Intensity"
      />
    </div>
    <div v-if="intensities.length" id="Intensity">
      <h3 class="text-lg text-gray-400">
        Intensity
      </h3>
      <Enum
        color="text-blue-400 hover:text-blue-300"
        :list="intensities"
        :edit-mode="editMode"
        :price-mode="priceMode"
        empty-message="PvE Mode"
      />
    </div>
    <div v-if="pvpPerks.length" id="Orbs">
      <h3 class="text-lg text-gray-400">
        Orbs
      </h3>
      <Enum
        color="text-blue-400 hover:text-blue-300"
        :list="pvpPerks"
        :edit-mode="editMode"
        :price-mode="priceMode"
        path="/intensity"
        empty-message=""
      />
    </div>
    <div id="Origin">
      <h3 class="text-lg text-gray-400">
        Origin
      </h3>
      <div class="text-gray-200" v-html="originText || 'No Origin'" />
    </div>
    <div id="Binding & Lure">
      <h3 class="text-lg text-gray-400">
        Binding & Lure
      </h3>
      <div>
        <span class="text-gray-300 float-left mr-2">Bindings:</span>
        <Enum
          color="text-blue-400 hover:text-blue-300"
          :list="binding"
          empty-message=""
          :edit-mode="editMode"
          :price-mode="priceMode"
        />
        <div v-if="!binding.length">
          <router-link :to="{path: '/bindings/bindings', hash:'#No Bindings'}">
            <span class="text-blue-500">No Bindings</span>
          </router-link>
        </div>
      </div>
      <div>
        <span class="text-gray-300 float-left mr-2">Lures:</span>
        <Enum
          color="text-blue-400 hover:text-blue-300"
          :list="luresBought"
          empty-message="No Lures"
          :edit-mode="editMode"
          :price-mode="priceMode"
        />
      </div>
      <div>
        <span class="text-gray-300 float-left mr-2">Other Controls:</span>
        <Enum
          color="text-blue-400 hover:text-blue-300"
          :list="otherPerks"
          empty-message="No Other Controls"
          :edit-mode="editMode"
          :price-mode="priceMode"
        />
      </div>
    </div>
    <div id="Heritage">
      <h3 class="text-lg text-gray-400">
        Heritage <span v-if="yourTier > 0" class="font-semibold">( Your tier - <span class="text-orange-300">T<TierDisplay :tier="yourTier" /></span> )</span>
      </h3>
      <Enum
        color="text-blue-400 hover:text-blue-300"
        :list="heritage"
        path="/heritage"
        empty-message="No Heritage"
        :edit-mode="editMode"
        :price-mode="priceMode"
      />
    </div>
    <div id="Talents & Perks">
      <h3 class="text-lg text-gray-400">
        Talents & Perks
      </h3>
      <ul>
        <!-- TODO: Display addons and variant  -->
        <li class=" text-gray-300">
          <div class="float-left mr-2">
            Ride:
          </div>
          <Enum
            color="text-blue-400 hover:text-blue-300"
            class="text-gray-200"
            :list="ridePerks"
            path="/talents/ride"
            empty-message="No Ride"
            :edit-mode="editMode"
            :price-mode="priceMode"
          />
        </li>
        <li class=" text-gray-300">
          <div class="float-left mr-2">
            Home:
          </div>
          <Enum
            color="text-blue-400 hover:text-blue-300"
            class="text-gray-100"
            :list="homePerks"
            path="/talents/home"
            empty-message="No Home"
            :edit-mode="editMode"
            :price-mode="priceMode"
          />
        </li>
        <li class="text-gray-300">
          <div class="float-left mr-2">
            Talents:
          </div>
          <Enum
            color="text-blue-400 hover:text-blue-300"
            class="text-gray-100"
            :list="talentPerks"
            path="/talents/talent"
            empty-message="No Talents"
            :edit-mode="editMode"
            :price-mode="priceMode"
          />
        </li>
        <li class="text-gray-300">
          <div class="float-left mr-2">
            Defenses:
          </div>
          <Enum
            color="text-blue-400 hover:text-blue-300"
            class="text-gray-100"
            :list="defensePerks"
            path="/talents/defense"
            empty-message="No Defenses"
            :edit-mode="editMode"
            :price-mode="priceMode"
          />
        </li>
        <li class="text-gray-300">
          <div class="float-left mr-2">
            Misc:
          </div>
          <Enum
            color="text-blue-400 hover:text-blue-300"
            class="text-gray-100"
            :list="miscPerks"
            path="/talents/perks"
            empty-message="No Misc Perks"
            :edit-mode="editMode"
            :price-mode="priceMode"
          />
        </li>
        <li class="text-gray-300">
          <div class="float-left mr-2">
            Generic:
          </div>
          <Enum
            color="text-blue-400 hover:text-blue-300"
            class="text-gray-100"
            :list="genericWaifuPerks"
            empty-message="No Generic Perks"
            :edit-mode="editMode"
            :price-mode="priceMode"
          />
        </li>
        <li class="text-gray-300">
          <div class="float-left mr-2">
            Waifu:
          </div>
          <Enum
            color="text-blue-400 hover:text-blue-300"
            class="text-gray-100"
            :list="waifuPerks"
            empty-message="No Waifu Perks"
            :edit-mode="editMode"
            :price-mode="priceMode"
          />
        </li>
      </ul>
    </div>
    <div class="flex gap-2 py-2 justify-between">
      <!-- <Button
        v-if="user.id"
        label="Save to Account / Publish Build"
        size="Small"
        bg-color="bg-teal-600"
        class="self-start"
        @click="publishBuildOnServer"
      /> -->
      <Button
        label="Publish Build"
        size="Small"
        bg-color="bg-purple-500"
        class="self-start"
        @click="publishBuild"
      />
      <Button
        v-if="flags.chargen"
        label="Finish Build"
        size="Small"
        bg-color="bg-red-500"
        class="self-end"
        @click="finishBuild"
      />
      <Button
        v-else
        label="Return to Chargen"
        size="Small"
        bg-color="bg-gray-600"
        class="self-end"
        @click="returnToChargen"
      />
    </div>
    <PublishBuild v-if="showPublish" @click="showPublish = false" />
    <PublishBuildOnServer v-if="showPublishOnServer" @click="showPublishOnServer = false" />
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '~/store/store'

import { useChallenges } from '~/store/challenges'
import { confirmDialog } from '~/logic/dialog'
import { shownValue } from '~/data/constants'

const {
  startingWorld, startingOrigin, intensities, binding, homePerks, defensePerks,
  heritage, talentPerks, waifuPerks, ridePerks, miscPerks, luresBought, genericWaifuPerks,
  otherPerks, yourTier, flags, pvpPerks, patron, difficulties, difficultyAdjustedBudgets, heritageOptions,
} = useStore()

const { activeChallenges } = useChallenges()

const editMode = ref(false)
const priceMode = ref(false)
const showPublish = ref(false)
const showPublishOnServer = ref(false)

const archetype = heritageOptions.value.reduce((acc, cur) => {
  acc[cur.value] = cur.label
  return acc
}, {} as Record<string, string>)

const originText = computed(() => {
  const variants = {
    'Drop-In': 'Dropped-In',
    'Walk-In': `Walked-In as <b>${startingOrigin.value.character}</b> of T${startingOrigin.value.tier}${startingOrigin.value.hr ? ` [<span class="text-gray-400">${archetype[startingOrigin.value.hr]}</span>]` : ''}`,
    'Extra': `'Extra' with <b>${startingOrigin.value.cost}</b> additional cost`,
    'Substitute': `<b>${startingOrigin.value.character}</b> (Substitute) of T${startingOrigin.value.tier}${startingOrigin.value.hr ? ` [<span class="text-gray-400">${archetype[startingOrigin.value.hr]}</span>]` : ''}`,
    'Possess': `<b>${startingOrigin.value.character}</b> (Possess) of T${shownValue[startingOrigin.value.tier || 0]}${startingOrigin.value.hr ? ` [<span class="text-gray-400">${archetype[startingOrigin.value.hr]}</span>]` : ''}`,
  } as Record<string, string>

  return variants[startingOrigin.value.title]
})

async function finishBuild() {
  const confirm = await confirmDialog('This action will lock all \'chargen\' perks and if you return any of your chosen perks/companions you will only receive 80% of their cost back.')
  if (confirm)
    flags.value.chargen = false
}

async function publishBuild() {
  showPublish.value = true
}
async function publishBuildOnServer() {
  showPublishOnServer.value = true
}

async function returnToChargen() {
  const confirm = await confirmDialog('This is Interactive only feature you can\'t return to character generation by the catalog rules.')
  if (confirm)
    flags.value.chargen = true
}

</script>
