<template>
  <div class="px-2 flex flex-col gap-2 overflow-y-auto min-h-0 scrollbar">
    <Foldable title="Starting Build" class="text-lg text-gray-400 mt-1" :is-open="true">
      <div id="World" class="text-gray-200">
        <h3 class="text-lg text-gray-400">
          World
        </h3>
        <div class="flex flex-wrap whitespace-nowrap gap-2">
          <div class="flex gap-2">
            <span class="text-gray-500 dark:text-gray-400">Name:</span>
            <span>{{ startingWorld.worldName || 'Unknown' }}</span>
          </div>
          <div v-if="startingWorld?.condition?.length" class="flex gap-2">
            <span class="text-gray-500 dark:text-gray-400">Condition:</span>
            <span>{{ isArray(startingWorld.condition) ?
              startingWorld.condition[0].name : startingWorld.condition }}</span>
          </div>
          <div class="flex gap-2">
            <span class="text-gray-500 dark:text-gray-400">Rating:</span>
            <span>{{ startingWorld.rating || 'Unknown' }}</span>
          </div>
        </div>
      </div>
      <div id="Intensity">
        <h3 class="text-lg text-gray-400">
          Intensity
        </h3>
        <Enum color="text-blue-400 hover:text-blue-300" :list="intensities" path="/intensity" empty-message="PvE Mode" />
      </div>
      <div id="Origin">
        <h3 class="text-lg text-gray-400">
          Origin
        </h3>
        <div v-html="originText || 'No Origin'" />
      </div>
      <div id="Binding & Lure">
        <h3 class="text-lg text-gray-400">
          Binding & Lure
        </h3>
        <div class="">
          <span class="text-gray-300 float-left mr-2">Bindings:</span>
          <Enum color="text-blue-400 hover:text-blue-300" :list="binding" path="/binding" empty-message="" />
          <div v-if="!binding.length">
            <router-link :to="{path: '/binding', hash:'#No Bindings'}">
              <span class="text-blue-500">No Bindings</span>
            </router-link>
          </div>
        </div>
        <div class="">
          <span class="text-gray-300 float-left mr-2">Lures:</span>
          <Enum color="text-blue-400 hover:text-blue-300" :list="luresBought" path="/binding" empty-message="" />
          <div v-if="!luresBought.length">
            No Lures
          </div>
        </div>
      </div>
      <div id="Heritage">
        <h3 class="text-lg text-gray-400">
          Heritage
        </h3>
        <Enum color="text-blue-400 hover:text-blue-300" :list="heritage" path="/heritage" empty-message="No Heritage" />
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
              path="/talents/specific"
              empty-message="No Generic Perks"
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
              path="/talents/specific"
              empty-message="No Waifu Perks"
            />
          </li>
        </ul>
      </div>
    </Foldable>
    <div id="Companions">
      <Foldable title="Companions" class="text-lg text-gray-400" :is-open="true">
        <div class="flex flex-col gap-1 text-gray-200 text-base">
          <div
            v-for="char in companions"
            :key="char.uid"
            class="flex justify-between"
            :class="char.sold ? 'text-gray-600': ''"
          >
            <div>
              <span class="text-gray-500 mr-1">{{ methods[char.method] }}</span>
              <router-link :to="`/companions/?name=${char.name}`" class="hover:underline">
                {{ char.name }}
              </router-link>
              <span class="text-gray-500"> from </span>{{ char.world }}
              <span class="text-gray-500"> Tier: </span>
              <span class="text-green-500">{{ char.tier }}</span>
              <span v-if="char.sold" class="px-2 text-red-500">SOLD</span>
            </div>
            <div v-if="!char.sold">
              <Button label="sell" size="Small" bg-color="bg-red-500" @click="sellCompanion(char.uid)" />
            </div>
          </div>
        </div>
      </Foldable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { findIndex, isArray } from 'lodash-es'
import { useStore } from '~/store/store'

const {
  startingWorld, startingOrigin, intensities, binding, homePerks, defensePerks,
  companions, heritage, talentPerks, waifuPerks, ridePerks, miscPerks, luresBought, genericWaifuPerks,
} = useStore()

const methods = {
  buy: 'Bought',
  capture: 'Captured',
  used: 'Bought slightly used',
  yoink: 'Yoinked',
}

const originText = computed(() => {
  const variants = {
    'Drop-In': 'Dropped-In',
    'Walk-In': 'Walked-In',
    'Extra': `'Extra' with <b>${startingOrigin.value.cost}</b> additional cost`,
    'Substitute': `Substitue as a <b>${startingOrigin.value.character}</b> of T${startingOrigin.value.tier}`,
    'Possess': `Possess a <b>${startingOrigin.value.character}</b> of T${startingOrigin.value.tier}`,
  } as Record<string, string>

  return variants[startingOrigin.value.title]
})

function sellCompanion(uid: number) {
  companions.value[findIndex(companions.value, { uid })].sold = true
}

</script>
