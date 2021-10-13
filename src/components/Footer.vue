
<template>
  <div class="fixed bottom-0 w-full" @click="visible = false">
    <div
      class="min-w-[320px] max-w-[440px] rounded-t-3xl mx-auto border relative transition-all"
      bg="dark:gray-900 green-300"
      :class="visible ? 'h-[568px] lg:h-[720px]': 'h-6'"
      @click.stop
    >
      <div class="text-center">
        <span>Budget: {{ budget }}</span>
        <span v-if="budget < 0" class="text-red-500 px-2">You are in debt</span>
        <span
          class="absolute inline-block right-4 text-xl cursor-pointer hover:text-green-500"
          @click="() => toggleFull()"
        >
          <ic:round-unfold-more />
        </span>
      </div>
      <div class="p-2 flex flex-col gap-2">
        <div id="World">
          <h3 class="text-lg text-gray-400">
            World
          </h3>
          <div class="flex gap-2">
            <div class="flex gap-2">
              <span class="text-gray-500 dark:text-gray-400">Name:</span>
              <span>{{ startingWorld.worldName || 'Unknown' }}</span>
            </div>
            <div v-if="startingWorld.condition" class="flex gap-2">
              <span class="text-gray-500 dark:text-gray-400">Condition:</span>
              <span>{{ startingWorld.condition?.length ?
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
          <Enum :list="intensities" path="/intensity" empty-message="PvE Mode" />
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
          <Enum :list="binding" path="/binding" empty-message="" />
          <div v-if="!binding.length">
            <router-link :to="{path: '/binding', hash:'#No Bindings'}">
              <span class="text-blue-500">No Bindings</span>
            </router-link>
          </div>
        </div>
        <div id="Heritage">
          <h3 class="text-lg text-gray-400">
            Heritage
          </h3>
          <Enum :list="heritage" path="/heritage" empty-message="No Heritage" />
        </div>
        <div id="Talents & Perks">
          <h3 class="text-lg text-gray-400">
            Talents & Perks
          </h3>
          <ul>
            <li class="flex gap-2 text-gray-300">
              Ride: <Enum
                class="text-gray-200"
                :list="ridePerks"
                path="/talents/ride"
                empty-message="No Ride"
              />
            </li>
            <li class="flex gap-2 text-gray-300">
              Home: <Enum
                class="text-gray-100"
                :list="homePerks"
                path="/talents/home"
                empty-message="No Home"
              />
            </li>
            <li class="flex gap-2 text-gray-300">
              Talents: <Enum
                class="text-gray-100"
                :list="talentPerks"
                path="/talents/talent"
                empty-message="No Talents"
              />
            </li>
            <li class="flex gap-2 text-gray-300">
              Defenses: <Enum
                class="text-gray-100"
                :list="defensePerks"
                path="/talents/defense"
                empty-message="No Defenses"
              />
            </li>
            <li class="flex gap-2 text-gray-300">
              Misc: <Enum
                class="text-gray-100"
                :list="miscPerks"
                path="/talents/perks"
                empty-message="No Misc Perks"
              />
            </li>
            <li class="flex gap-2 text-gray-300">
              Waifu: <Enum
                class="text-gray-100"
                :list="waifuPerks"
                path="/talents/specific"
                empty-message="No Waifu Perks"
              />
            </li>
          </ul>
        </div>
        <div id="Companions">
          <Foldable title="Companions" class="text-lg text-gray-400" :is-open="true">
            <div class="flex flex-col gap-1 text-gray-200 text-base">
              <div v-for="char in companions" :key="char.uid" class="flex justify-between">
                <div>
                  {{ char.name }}
                  <span class="text-gray-500"> from </span>{{ char.world }}
                  <span class="text-gray-500"> Tier: </span>
                  <span class="text-green-500">{{ char.tier }}</span>
                </div>
                <div>
                  <Button label="sell" size="Small" bg-color="bg-orange-500" @click="sellCompanion(char.uid, char.tier)" />
                </div>
              </div>
            </div>
          </Foldable>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { findIndex } from 'lodash'
import { useStore } from '~/store/store'

const {
  budget, startingWorld, startingOrigin, intensities, binding, homePerks, defensePerks,
  companions, heritage, talentPerks, waifuPerks, ridePerks, miscPerks,
} = useStore()

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

// const intensityText = computed(() => {
//   if (intensities.value.length === 0) return 'Base Intensity'
//   else return `[${intensities.value.map(x => x.title).join(', ')}]`
// })

const [visible, toggleFull] = useToggle()

function sellCompanion(uid: number, tier: number) {
  // companions.value.splice(findIndex(companions.value, { uid }), 1)
}

</script>
