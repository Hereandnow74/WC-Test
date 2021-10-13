
<template>
  <div class="max-w-screen-lg mx-auto mt-4">
    <h3 class="text-xl text-center mb-4">
      Rules
    </h3>
    <Desc class="bg-red-100 dark:bg-gray-800" :desc="startingDesc" />
    <div class="lg:flex my-4 bg-amber-100 dark:bg-gray-800 p-4 gap-4 w-full mx-auto">
      <Table :headers="worldTitles" :rows="worldData" class="" />
      <Table :headers="waifuTitles" :rows="waifuData" class="" />
    </div>
    <Desc class="bg-red-100 dark:bg-gray-800" :desc="pvpRules" />
  </div>
</template>

<script lang="ts">
import { WORLD_RATINGS } from '~/data/constatnts'
import { startingDesc, pvpRules } from '~/data/rules'

export default defineComponent({
  setup() {
    const worldTitles = ['Danger Rating', 'Difficulty Title', 'Budget']
    const worldData = WORLD_RATINGS.map(x => [x.rating, x.title, x.budget])
    worldData.push([11, 'One', 'Tier 11 ticket'])

    const waifuTitles = ['Waifu Tier', 'Cost', 'Steal', 'Capture', 'Capture+Sale', 'Shorthand']
    const waifuData = [
      ['T1', '1', '1', '1', '1', ['★', 'text-blue-600']],
      ['T2', '2', '1', '2', '2', ['★★', 'text-blue-600']],
      ['T3', '5', '1', '3', '4', ['★★★', 'text-blue-600']],
      ['T4', '10', '1', '6', '8', ['★', 'text-red-600']],
      ['T5', '20', '2', '12', '16', ['★★', 'text-red-600']],
      ['T6', '50', '5', '30', '40', ['★★★', 'text-red-600']],
      ['T7', '100', '10', '60', '80', ['★', 'text-gray-400']],
      ['T8', '200', '20', '120', '160', ['★★', 'text-gray-400']],
      ['T9', '500', '50', '300', '400', ['★★★', 'text-gray-400']],
      ['T10', '1000', '100', '600', '800', ['★', 'text-yellow-500']],
      ['T11', 'T11 ticket', 'T11 ticket', 'T11 ticket', '2 T11 tickets'],
    ]
    return {
      startingDesc,
      pvpRules,
      worldTitles,
      worldData,
      waifuTitles,
      waifuData,
    }
  },
})
</script>
