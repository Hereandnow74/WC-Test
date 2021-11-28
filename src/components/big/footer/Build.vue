<template>
  <div class="px-2 flex flex-col gap-2 overflow-y-auto min-h-0 scrollbar relative">
    <Toggle v-model="editMode" class="absolute right-2 top-1" />
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
          path="/binding"
          empty-message=""
          :edit-mode="editMode"
          @deletePerk="(el: any) => chooseBinding(el, el)"
        />
        <div v-if="!binding.length">
          <router-link :to="{path: '/binding', hash:'#No Bindings'}">
            <span class="text-blue-500">No Bindings</span>
          </router-link>
        </div>
      </div>
      <div>
        <span class="text-gray-300 float-left mr-2">Lures:</span>
        <Enum
          color="text-blue-400 hover:text-blue-300"
          :list="luresBought"
          path="/binding"
          empty-message="No Lures"
          :edit-mode="editMode"
          @deletePerk="(el: any) => chooseLure(el)"
        />
      </div>
      <div>
        <span class="text-gray-300 float-left mr-2">Other Controls:</span>
        <Enum
          color="text-blue-400 hover:text-blue-300"
          :list="otherPerks"
          path="/binding"
          empty-message="No Other Controls"
          :edit-mode="editMode"
          @deletePerk="(el: any) => chooseOther(el, el)"
        />
      </div>
    </div>
    <div id="Heritage">
      <h3 class="text-lg text-gray-400">
        Heritage
      </h3>
      <Enum
        color="text-blue-400 hover:text-blue-300"
        :list="heritage"
        path="/heritage"
        empty-message="No Heritage"
        :edit-mode="editMode"
        @deletePerk="(el: any) => chooseHeritage(el, el)"
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
            @deletePerk="(el: any) => chooseRide(el, el)"
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
            @deletePerk="(el: any) => chooseHome(el, el)"
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
            @deletePerk="(el: any) => chooseTalent(el, el)"
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
            @deletePerk="(el: any) => chooseDefense(el, el)"
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
            @deletePerk="(el: any) => choosePerk(el, el)"
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
            :edit-mode="editMode"
            @deletePerk="(el: any) => chooseGenericPerk(el, el)"
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
            :edit-mode="editMode"
            @deletePerk="(el: any) => chooseWaifuPerk(el)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { isArray } from 'lodash-es'
import { useStore } from '~/store/store'
import {
  chooseBinding, chooseDefense, chooseGenericPerk, chooseHeritage, chooseHome,
  chooseLure, chooseOther, choosePerk, chooseRide, chooseTalent, chooseWaifuPerk,
} from '~/logic'

const {
  startingWorld, startingOrigin, intensities, binding, homePerks, defensePerks,
  heritage, talentPerks, waifuPerks, ridePerks, miscPerks, luresBought, genericWaifuPerks,
  otherPerks,
} = useStore()

const editMode = ref(false)

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

</script>
