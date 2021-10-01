<template>
  <div class="">
    <h2 class="text-xl text-center">
      Rides
    </h2>
    <Desc :desc="talents.rideDesc" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <div class="flex flex-wrap justify-between">
      <div
        v-for="ride in talents.rides"
        :key="ride.title"
        class="bg-light-200 dark:bg-dark-500 p-2 mb-2 inline-block max-w-min"
      >
        <h3 class="text-center text-xl min-w-48">
          {{ ride.title }} <span text="gray-600 dark:gray-400">(Cost: {{ ride.cost }})</span>
        </h3>
        <div>From: {{ ride.Source }}</div>
        <Desc :desc="ride.desc" />
      </div>
    </div>
    <h2 class="text-xl text-center">
      Home Perks
    </h2>
    <Desc :desc="talents.homeDesc" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <div class="column-count-2">
      <div
        v-for="homePerk in talents.homePerks"
        :key="homePerk.title"
        class="bg-yellow-200 dark:bg-yellow-900 p-2 mb-2 inline-block"
      >
        <h3 class="text-center text-xl">
          {{ homePerk.title }} <span text="gray-600 dark:gray-400">(Cost: {{ homePerk.cost }})</span>
        </h3>
        <Desc :desc="homePerk.desc" />
      </div>
    </div>
    <h2 class="text-xl text-center">
      Talents
    </h2>
    <Desc :desc="talents.talentsDesc" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <div class="column-count-2">
      <div
        v-for="talent in talents.talents"
        :key="talent.title"
        class="bg-green-200 dark:bg-green-900 p-2 mb-2 inline-block"
      >
        <h3 class="text-center text-xl">
          {{ talent.title }} <span text="gray-600 dark:gray-400">(Cost: {{ talent.cost }})</span>
        </h3>
        <Desc :desc="talent.desc" />
      </div>
    </div>
    <h2 class="text-xl text-center">
      Defenses
    </h2>
    <Desc :desc="talents.defenceDesc" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <div class="column-count-2">
      <div
        v-for="defence in talents.defenses"
        :key="defence.title"
        class="bg-rose-200 dark:bg-rose-900 p-2 mb-2 inline-block"
      >
        <h3 class="text-center text-xl">
          {{ defence.title }} <span text="gray-600 dark:gray-400">(Cost: {{ defence.cost }})</span>
        </h3>
        <Desc :desc="defence.desc" />
      </div>
    </div>
    <h2 class="text-xl text-center">
      Perks
    </h2>
    <Desc :desc="talents.genericDesc" class="p-2 mb-4 max-w-4xl mx-auto bg-violet-200 dark:bg-violet-900" />
    <div class="column-count-2">
      <div
        v-for="perk in talents.perks"
        :key="perk.title"
        class="bg-light-blue-200 dark:bg-light-blue-900 p-2 mb-2 inline-block"
      >
        <h3 class="text-center text-xl">
          {{ perk.title }} <span text="gray-600 dark:gray-400">(Cost: {{ perk.cost }})</span>
        </h3>
        <Desc :desc="perk.desc" />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import * as talents from '~/data/talents'

export default defineComponent({
  setup() {
    console.log(talents)
    return {
      talents,
    }
  },
})
</script>
