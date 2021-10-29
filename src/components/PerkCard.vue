<template>
  <div
    :id="perk.title"
    class="sm:p-2 mb-2 inline-block cursor-pointer"
    @click="sendPerk"
  >
    <h3 class="relative flex-wrap flex justify-center items-center text-xl">
      <span class="whitespace-nowrap">{{ perk.title }}</span>
      <Select
        v-if="targetAble || perk.target !== undefined || perk.waifu !== undefined"
        v-model="perkToSave.target"
        placeholder="For whom"
        class="inline-block text-base ml-2"
        :options="perk.waifu ? targetWaifuList: targetList"
        @click.stop
      />
      <Input
        v-if="perk.anything !== undefined"
        v-model="perkToSave.anything"
        :placeholder="perk.anything"
        class="text-base mx-1 w-42"
      />
      <NumberInput
        v-if="isMultiple || perk.multiple"
        v-model="perkToSave.count"
        :min="0"
        :max="perk.max || max || 100"
        class="text-base ml-2"
      />
      <slot name="title" />
      <Select
        v-if="perk.costVariants"
        v-model.number="cost"
        :options="perk.costVariants"
        class="mx-1 inline-block text-base"
        @click.stop
      />
      <span text="gray-500 dark:gray-400" class="whitespace-nowrap">
        (Cost: <span text="green-600 dark:green-300">{{ displayedCost }}</span>)
      </span>
      <fa-solid:check
        v-if="isActive"
        class="absolute top-1 right-1 text-green-500"
      />
    </h3>
    <slot name="rules" />
    <div v-if="perk.special" class="mx-2">
      Special: <span class="text-purple-500 dark:text-purple-300">{{ perk.special }}</span>
    </div>
    <div>
      <Desc
        v-if="perk.additionalDesc"
        :desc="perk.additionalDesc"
        class="bg-amber-200 text-gray-800 text-sm md:text-base w-3/5 float-right mt-8 mx-2 border-3 border-gray-900"
      />
      <Table
        v-if="perk.table"
        :headers="perk.table[0]"
        :rows="perk.table.slice(1)"
        class="sm:float-right sm:mt-4"
      />
      <Desc :desc="perk.desc" />
    </div>
    <div v-if="perk.requires" class="mx-2">
      Require: <span class="text-orange-500 dark:text-orange-300">{{ perk.requires }}</span>
    </div>
    <div v-if="perk.whitelist" class=" mx-2">
      <span class="whitespace-nowrap float-left mr-2">
        {{ 'Require ' + (perk.whitelist.length > 1 ? (perk.needed || ' all')+' of' : '') }}:
      </span>
      <Enum :list="perk.whitelist" />
    </div>
  </div>
</template>

<script lang='ts' setup>import Select from './basic/Select.vue'
import { useStore } from '~/store/store'

const props = defineProps({
  perk: {
    type: Object,
    default: () => ({}),
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  isAvailable: {
    type: Boolean,
    default: false,
  },
  isMultiple: {
    type: Boolean,
    default: false,
  },
  calculatedCost: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  increment: {
    type: Boolean,
    default: false,
  },
  targetAble: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['pickPerk'])

const { targetList, targetWaifuList } = useStore()
const cost = ref(0)

const perkToSave = reactive({
  title: props.perk.title,
  count: 0,
  cost: computed(() => {
    let cs = props.calculatedCost || cost.value || props.perk.cost
    if (props.increment)
      cs = (perkToSave.count / 2) * (cs * 2 + (perkToSave.count - 1) * cs)
    else
      cs = perkToSave.count ? cs * perkToSave.count : cs
    return cs
  }),
  target: undefined,
  anything: undefined,
  freebies: props.perk.freebies,
})

const displayedCost = computed(() => {
  return perkToSave.cost === 11111 ? 'Tier 11 ticket' : perkToSave.cost
})

function filterObject(obj: any) {
  const ret: any = {}
  Object.keys(obj)
    .forEach((key) => {
      if (obj[key] !== undefined) {
        if (obj[key].value)
          ret[key] = obj[key].value
        else
          ret[key] = obj[key]
      }
    })
  return ret
}

function sendPerk() {
  emit('pickPerk', props.perk, filterObject(perkToSave))
}
</script>
