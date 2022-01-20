<template>
  <div class="sm:p-2">
    <Desc class="max-w-screen-md mx-auto dark:bg-gray-800 bg-blue-gray-300 rounded" :desc="desc" />
    <div
      class="mt-4 pb-8 column-gap"
      :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
    >
      <div
        v-for="rule in intensity"
        :id="rule.title"
        :key="rule.title"
        class="p-1 rounded cursor-pointer column-block mb-2 pb-4 max-w-[600px] relative"
        :bg="intensityAvailable(rule) ? 'blue-100 dark:gray-700 hover:blue-200 dark:hover:gray-800' : 'gray-200 dark:gray-600'"
        @click="chooseIntensityCoop(rule)"
      >
        <h3 class="text-xl text-center">
          {{ rule.title }}
          <span v-if="rule.pvp" class="text-base">(
            <router-link
              :to="{path: '/', hash:'#pvp'}"
              class="text-blue-700 dark:text-blue-300"
              @click.stop
            >
              PvP
            </router-link>)
          </span>
        </h3>
        <div v-if="rule.intensity" class="px-2 flex gap-2">
          Bonus:
          <span
            v-if="rule.intensity < 1"
            text="green-600 dark:green-300"
          >{{ Math.round(baseBudgetAfter * (rule.title === 'With A Little Help From My Friends(Cooperative)'
            ? coopIntensity : rule.intensity)) }}
            ({{ Math.round((rule.title === 'With A Little Help From My Friends(Cooperative)'
              ? coopIntensity : rule.intensity) * 100) }}%)
          </span>
          <span v-else text="green-600 dark:green-300">{{ rule.intensity }}</span>
          credits.
          <NumberInput
            v-if="rule.title === 'With A Little Help From My Friends(Cooperative)'"
            v-model="coopCount"
            class="inline"
            :min="0"
            @click.stop
          />
        </div>
        <Desc :desc="rule.desc" />
        <div v-if="rule.special" class="px-2">
          Special: {{ rule.special }}
        </div>
        <div v-if="rule.whitelist" class="px-2 flex gap-2">
          Requires:
          <Enum :list="rule.whitelist" path="/intensity" />
        </div>
        <fa-solid:check
          v-if="allEffects.includes(rule.title)"
          class="absolute right-0 top-0 m-2 text-green-500"
        />
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { desc, intensity } from '~/data/intensity'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'

import { chooseIntensity, intensityAvailable } from '~/logic/'

const coopCount = ref(0)
const coopIntensity = computed(() => coopCount.value * 0.2)

const { allEffects, baseBudgetAfter, settings } = useStore()

onMounted(() => {
  useTooltips()
})

const chooseIntensityCoop = val => chooseIntensity(val, coopIntensity.value, coopCount.value)

</script>
