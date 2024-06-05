<template>
  <Modal label="Slightly used" class="z-20 text-gray-800 dark:text-gray-200" @click="$emit('click')">
    <div class="text lg flex justify-center text-gray-800 dark:text-gray-400 mt-1">
      <div class="border-b-3 border-gray-500 px-4 cursor-pointer hover:text-gray-200" :class="{'border-gray-400 dark:text-gray-200 text-gray-600': startingTab}" @click="startingTab = true">
        Slightly used rolls
      </div>
      <div class="border-b-3 border-gray-500 px-4 cursor-pointer hover:text-gray-200" :class="{'border-gray-400 dark:text-gray-200 text-gray-600': !startingTab}" @click="startingTab = false">
        Trauma tier definitions
      </div>
    </div>
    <div v-if="startingTab" class="min-h-0 overflow-y-auto scrollbar">
      <h3
        class="text-lg text-center text-amber-500 dark:text-amber-400 flex gap-2 justify-center items-center px-2 mt-2"
      >
        <div class="flex gap-2 items-center" title="Information for author" @click="author = !author">
          Slightly used <span class="text-gray-800 dark:text-gray-200 font-semibold">{{ char.name }}</span>
          <akar-icons:eye-open v-if="author" class="cursor-pointer hover:text-green-500" />
          <akar-icons:eye-slashed v-else class="cursor-pointer hover:text-green-500" />
        </div>
        <div title="Reroll (its against the rules)" class="select-none">
          <akar-icons:arrow-cycle class="cursor-pointer text-red-500 hover:text-red-300" @click="rerollConst *= -1" />
        </div>
        <div class="text-gray-800 dark:text-gray-300">
          <Toggle v-model="useOLDSU" label="Use old rules" />
        </div>
      </h3>
      <div class="p-2 text-lg flex flex-col gap-4">
        <div v-if="author && !bought" class="border-2 border-red-500 p-1 rounded text-sm">
          Rolls information are only for the author, contractor only see the cost. If you don't take the deal and close the window, you won't be able to see even the cost as a contractor for 24 hours.
        </div>
        <div v-for="data, i in usedWaifus" :key="data.ability" class="grid grid-cols-[auto,1fr,auto] w-full gap-x-4 items-center transition-opacity duration-300" :class="{'opacity-0': !visibility[i]}">
          <div>Ability roll: <span class="text-green-500">{{ author ? data.ability : '??' }}</span></div>
          <div>Trauma roll: <span class="text-green-500">{{ author ? data.trauma : '??' }}</span></div>
          <Button :disabled="bought" size="Small" bg-color="bg-violet-600 mx-auto my-4  row-span-3" :label="`buy for ${data.cost}`" @click="buyUsed(data, i)" />
          <div class="">
            Ability tier: <span class="text-orange-400">{{ author ? data.tier : '??' }}</span>
          </div>
          <div class="">
            Trauma tier: <span class="text-green-500">-{{ author ? data.traumaTier : '??' }}</span>
          </div>
          <div class="flex gap-2 items-center cursor-help" title="Its just an example, you can ignore it and use your own trauma ideas.">
            Suffers from:
            <span class="text-red-400">{{ author ? traumaReac || data.traumaExample : '??' }}</span>
            <dashicons:update-alt v-if="author && bought" class="hover:text-amber-500 cursor-pointer" @click="() => traumaReac = traumaExamples[data.traumaTier][Math.floor(Math.random() * traumaExamples[data.traumaTier].length)]" />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="min-h-0 overflow-y-auto scrollbar p-1">
      <div class="text-red-500 text-center">
        These definitions are unofficial and exist only to give you an idea on slightly used companions traumas.
      </div>
      <div v-for="def,n in traumaDefinitions" :key="n" class="my-2 p-1 bg-gray-300 dark:bg-gray-700 rounded">
        <h3 class="text-lg text-green-700 dark:text-green-300">
          -T{{ n + 1 }}
        </h3>
        <div>{{ def }}</div>
      </div>
    </div>
  </Modal>
</template>

<script lang='ts' setup>
import { random } from 'lodash-es'
import Toggle from '../basic/Toggle.vue'
import { CHAR_COSTS, CHAR_COSTS_TICKET } from '~/data/constants'
import { useGlobalSettings } from '~/store/settings'

const props = defineProps({
  char: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['buyUsed', 'click'])

const author = ref(false)
const bought = ref(false)
const visibility = ref([true, true, true])

const startingTab = ref(true)
const traumaReac = ref('')

const useOLDSU = ref(false)
const rerollConst = ref(1)

const traumaDefinitions = [
  'The Waifu you gain with this trauma tier suffer from slight trauma, primarily due to their difficult but not horrific experience with their past contractor. This can include minor mental, spiritual or physical defects. Waifu at this trauma tier are of an equal level of a problem as those not bound by any company binding, solved primarily via the copious application of Faerie Feast, Sticky Fingers, or other similar activities. Mind control or selective memory wipeout are viable ways to help a waifu recuperate from any experiences they had with their previous contractors at this level of trauma. Subjects using their powers will not cause any problems for you or your retinue if you can keep them in a good mood.',
  'The Waifu you receive with this trauma tier suffer from effects that time and simple pleasures are no longer able to fix. Said Waifu have most likely had terrible experiences with their previous contractors with severe deep-rooted effects on their psyche that even normal memory wipeout or altering will no longer be able to fully quell. Only the constant application of supernatural mental or spiritual healing effects will have any chance of returning a waifu to their top shape. Subjects can\'t reliably determine how their actions will affect you or your retinue so expect troubles when they will use their powers or are given the freedom to act.',
  'Waifu with this trauma tier are more like living dolls than humans, suffering from full-blown trauma where subjects can\'t do anything by themselves much less reliably control or use powers that require complex thought processes. They most likely had horrific experiences with past contractors, undergoing experiences that had completely broken them both mentally and spiritually. Unless fixed, subjects will most probably only be useful as Deep Weave targets or remote-controlled puppets. Only a full rebuild of a subject\'s personality will be able to restore them to their top form.',
]

const traumaExamples = {
  0: ['No trauma', 'Insignificant trauma'],
  1: ['Muscle Tremors', 'Constant Anxiety', 'Appetite Disturbances', 'Disorientation', 'Numbness/Desensitization', 'Avoidant Behaviours', 'Alcohol Addiction', 'Smoking Addiction', 'Argumentative Behaviour', 'Nightmares/ Sleep Disorder', 'Depression', 'Phobia', 'Persistent Fatigue',
    'Emotional Detachment', 'Cum Addiction', 'Loss of Purpose', 'Excessive guilt', 'Excessive Paranoia',
    'Mute', 'Extreme Submissiveness', 'Excessive Daydreaming', 'Oral Obsession', 'Compulsive Masturbation',
    'Compulsive Liar', 'Ditzy', 'Compulsive Kleptomania', 'Compulsive Shopaholic', 'Compulsive Overeating', 'Severe OCD'],
  2: ['Suicidal Behaviour', 'Intrusive Memories/Flashbacks', 'Completely Apathy', 'Hallucinations',
    'Uncontrollable Fear', 'Depersonalization', 'Mood Swings/Instability', 'Multiple Triggers',
    'Amnesiac', 'Regular Self Harm', 'Time Tracking Difficulty', 'Frequent Seizures', 'Extreme Masochist',
    'Eternal Arousal', 'Extreme Gender Dysphoria', 'Flipped Personality', 'Bimbo Personality', 'Extreme Sadist',
  ],
  3: ['Blank Slate Personality', 'Fleshlight Mentality', 'Manic Behaviour/Psychosis', 'Coma/Vegetable state',
    'Brainwashed Idealization/Fanatical', 'Extreme Multiple Personality Disorder', 'Broodmother Mentality',
    'Drone Mentality', 'Absolute Nymphomania', 'Extreme Petplay Conditioning', 'Extreme Stockholm Syndrome', 'Maniacal  Yandere',
  ],
} as Record<number, string[]>

function whatTrauma(n: number): number {
  if (n < 8) return 0
  if (n >= 9 && n <= 11) return 0
  if (n >= 12 && n <= 14) return 0
  if (n >= 15 && n <= 17) return 0
  if (n >= 18 && n <= 20) return 0
  if (n >= 21 && n <= 23) return 1
  if (n >= 24 && n <= 26) return 1
  if (n >= 27 && n <= 29) return 2
  if (n >= 30 && n <= 32) return 2
  if (n >= 33 && n <= 35) return 3
  return 3
}

function whatTier(n: number): number {
  if (n < 8) return 1
  if (n >= 9 && n <= 11) return 2
  if (n >= 12 && n <= 14) return 3
  if (n >= 15 && n <= 17) return 4
  if (n >= 18 && n <= 20) return 5
  if (n >= 21 && n <= 23) return 6
  if (n >= 24 && n <= 26) return 7
  if (n >= 27 && n <= 29) return 8
  if (n >= 30 && n <= 32) return 9
  if (n >= 33 && n <= 35) return 10
  return 11
}

function oldTier(n: number, tier: number): number {
  const plus = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0],
    [5, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0],
    [6, 5, 4, 3, 2, 1, 0, 0, 0, 0, 0],
    [7, 6, 5, 4, 3, 2, 1, 0, 0, 0, 0],
    [8, 7, 6, 5, 4, 3, 2, 1, 0, 0, 0],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 0],
    [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
  ]
  if (n < 8) return 0
  if (n >= 9 && n <= 11) return plus[1][tier - 1]
  if (n >= 12 && n <= 14) return plus[2][tier - 1]
  if (n >= 15 && n <= 17) return plus[3][tier - 1]
  if (n >= 18 && n <= 20) return plus[4][tier - 1]
  if (n >= 21 && n <= 23) return plus[5][tier - 1]
  if (n >= 24 && n <= 26) return plus[6][tier - 1]
  if (n >= 27 && n <= 29) return plus[7][tier - 1]
  if (n >= 30 && n <= 32) return plus[8][tier - 1]
  if (n >= 33 && n <= 35) return plus[9][tier - 1]
  return plus[10][tier - 1]
}

function slightlyUsed(char: any) {
  const ability = random(1, 6) + random(1, 6) + random(1, 6) + random(1, 6) + random(1, 6) + random(1, 6)
  const trauma = random(1, 6) + random(1, 6) + random(1, 6) + random(1, 6) + random(1, 6) + random(1, 6)
  const traumaTier = whatTrauma(trauma)
  return {
    ability,
    trauma,
    tier: useOLDSU.value ? char.tier + oldTier(ability, char.tier) : whatTier(ability),
    traumaTier,
    traumaExample: traumaExamples[traumaTier][Math.floor(Math.random() * traumaExamples[traumaTier].length)],
  }
}

const { slightlyUsedTierDiscount } = useGlobalSettings()

const usedWaifus = computed(() => {
  let res = []
  res.push(slightlyUsed(props.char))
  res.push(slightlyUsed(props.char))
  res.push(slightlyUsed(props.char))
  rerollConst.value *= -1
  res = res.map(x => ({
    ...x,
    cost: x.tier - x.traumaTier >= 11 ? `${CHAR_COSTS_TICKET[x.tier - x.traumaTier - slightlyUsedTierDiscount.value] || 2} IMG` : CHAR_COSTS[x.tier - x.traumaTier - slightlyUsedTierDiscount.value] || 1,
    effectiveTier: x.tier,
  }))
  return res
})

function buyUsed(data: typeof usedWaifus.value[0], index: number) {
  if (bought.value) return
  visibility.value = visibility.value.map((_, i) => i === index)
  bought.value = true
  author.value = true
  emit('buyUsed', data)
}

</script>
