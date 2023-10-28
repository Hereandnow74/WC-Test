<template>
  <div class="p-2">
    <Desc class="p-2 bg-gray-200 dark:bg-teal-900 max-w-4xl mx-auto" :desc="desc" />
    <div
      class="column-gap mt-4"
      :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'"
    >
      <div
        v-for="item in origin"
        :id="item.title"
        :key="item.title"
        class="bg-light-blue-300 dark:bg-light-blue-900 p-2 column-block max-w-[600px] min-h-[450px]
          mb-2 cursor-pointer border-2 hover:border-orange-400 border-light-blue-900"
        :class="chosenOrigin.title === item.title ? 'filter brightness-110' : ''"
        @click="chooseOrigin(item)"
      >
        <div class="">
          <div class="flex gap-1 items-center flex-wrap">
            <h4 class="text-xl mb-1 mr-auto px-2">
              {{ item.title }}
              <span text="gray-600 dark:gray-400">
                (Cost: {{ chosenOrigin.title === item.title ? chosenOrigin.cost : item.cost }})
              </span>
              <span v-if="item.title === 'Substitute'" class="text-gray-500">[<span class="text-amber-400">Max T{{ maxSubTier }}</span>]</span>
            </h4>
            <div v-if="item.variants && chosenOrigin.title === item.title">
              <label for="variants">Variants:</label>
              <select v-model.number="item.cost" name="variants" class="ml-2 text-gray-700">
                <option v-for="variant in item.variants" :key="variant.title" :value="variant.cost">
                  {{ variant.title }}
                </option>
              </select>
            </div>
            <div v-if="item.character && chosenOrigin.title === item.title" class="flex gap-1">
              <CharacterInput
                :model-value="chosenOrigin.character"
                :error-message="costError"
                :max-tier="10"
                @updateTier="chosenOrigin.tier = $event"
                @onChar="(char: DBCharacter) => {chosenOrigin.uid = char.u; chosenOrigin.character = item.title !== 'Walk-In' ? `You as ${char.n}` : char.n; chosenOrigin.tier = char.t}"
                @update:modelValue="chosenOrigin.character = $event"
              />
              <Tiers
                v-model="chosenOrigin.tier"
                placeholder="Tier"
              />
            </div>
            <div v-if="chosenOrigin.title === item.title && ['Possess', 'Substitute'].includes(item.title)">
              <Select v-model="chosenOrigin.hr" :options="heritageOptions" placeholder="Archetype" />
            </div>
            <div v-if="chosenOrigin.title === item.title">
              <button
                v-if="startingOrigin.title !== item.title"
                class="rounded bg-amber-400 hover:bg-amber-500 text-gray-800 px-1"
                @click="flags.chargen ? pickOrigin() : confirmDialog('Origin can\'t be changed after chargen', 'info')"
              >
                Select
              </button>
              <button
                v-else
                class="rounded bg-red-400 hover:bg-red-500 text-gray-800 px-1"
                @click="flags.chargen ? clearOrigin() : confirmDialog('Origin can\'t be changed after chargen', 'info')"
              >
                Deselect
              </button>
            </div>
            <div v-if="startingOrigin.title === item.title">
              <fa-solid:check class="text-green-500" />
            </div>
          </div>
          <img v-if="!settings.allImg" class="max-h-[400px] w-1/2 object-contain self-center inline-block float-right mt-4 pl-2" :src="item.image" :alt="item.title">
          <Desc class="" :desc="item.desc" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { DBCharacter } from 'global'
import { CHAR_COSTS, CHAR_COSTS_TICKET } from '~/data/constants'
import { desc, origin, Origin } from '~/data/origin'
import { confirmDialog } from '~/logic/dialog'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'

const chosenOrigin = reactive({
  title: '',
  cost: 0,
  character: '',
  hr: '',
  tier: 1,
  uid: -1,
})
const costError = ref('')

const { allEffects, startingOrigin, fullStartingBudget, flags, settings, baseBudget, csr, heritageOptions } = useStore()

onMounted(() => useTooltips())

const maxSubTier = computed(() => {
  if (flags.value.danger11Start) return 6
  const cost = fullStartingBudget.value * 0.2
  for (let i = 0; i < CHAR_COSTS.length; i++) {
    if (cost < CHAR_COSTS[i])
      return i - 1
  }
  return 0
})

watch(chosenOrigin, () => {
  if (['Substitute', 'Possess'].includes(chosenOrigin.title)) {
    chosenOrigin.cost = CHAR_COSTS[chosenOrigin.tier] || 0
    if (chosenOrigin.tier >= 11)
      chosenOrigin.costT = CHAR_COSTS_TICKET[chosenOrigin.tier] || 0
  }
})

function chooseOrigin(item: Origin) {
  chosenOrigin.title = item.title
  chosenOrigin.cost = item.cost
  if (!['Substitute', 'Possess', 'Walk-In'].includes(chosenOrigin.title)) {
    chosenOrigin.character = ''
    chosenOrigin.hr = ''
    chosenOrigin.uid = -1
    chosenOrigin.tier = 1
    if (chosenOrigin.title === 'Extra') {
      if (chosenOrigin.cost > 1)
        chosenOrigin.tier = 4
      if (chosenOrigin.cost > 10)
        chosenOrigin.tier = 7
    }
  }

  if (startingOrigin.value.title === chosenOrigin.title)
    Object.assign(chosenOrigin, startingOrigin.value)
}

function pickOrigin() {
  if (chosenOrigin.title === 'Substitute') {
    if (csr.value && (baseBudget.value + fullStartingBudget.value) * 0.2 < chosenOrigin.cost) {
      costError.value = 'Cost should be less than 20% of your starting budget'
      return
    }
    if ((!csr.value && fullStartingBudget.value * 0.2 < chosenOrigin.cost) && !flags.value.danger11Start) {
      costError.value = 'Cost should be less than 20% of your starting budget'
      return
    }
    if (flags.value.danger11Start && chosenOrigin.tier > 6) {
      costError.value = 'Maximum substitute tier is 6 for DRX start'
      return
    }
  }

  costError.value = ''
  allEffects.value.push(chosenOrigin.title)
  Object.assign(startingOrigin.value, chosenOrigin)
}

function clearOrigin() {
  allEffects.value.splice(allEffects.value.indexOf(startingOrigin.value.title), 1)
  startingOrigin.value = { title: '', cost: 0, tier: 1 }
}

</script>
