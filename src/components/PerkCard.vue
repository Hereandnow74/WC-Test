<template>
  <div
    class="sm:p-2 mb-2 column-block cursor-pointer"
    @click="sendPerk"
  >
    <h3 :id="perk.title" class="relative flex-wrap flex justify-center items-center text-xl">
      <span class="whitespace-nowrap">{{ perk.title }}</span>
      <span v-if="savedPerk.anything">({{ savedPerk.anything }})</span>
      <AnythingInput
        v-if="complexFields.target"
        v-model="complex.target"
        placeholder="For whom"
        class="text-base ml-2 w-42"
        :list="targetList"
        :bought-list="savedPerk.complex"
        @click.stop
      >
      </AnythingInput>
      <AnythingInput
        v-if="complexFields.flavor"
        v-model="complex.flavor"
        :list="flavorList.length ? flavorList : savedPerk.complex"
        :bought-list="savedPerk.complex"
        :placeholder="perk.anything"
        class="text-base mx-1 w-42"
        @click.stop
      />
      <NumberInput
        v-if="isMultiple || perk.multiple"
        v-model="perkToSave.count"
        :min="0"
        :max="perk.max || max || 100"
        class="text-base ml-2"
        @click.stop
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
        v-if="perkExist"
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
      <slot name="underDesc" />
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

<script lang='ts' setup>
import { findIndex, remove, without } from 'lodash-es'
import Select from './basic/Select.vue'
import AnythingInput from './AnythingInput.vue'
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
  flavorList: {
    type: Array,
    default: () => [],
  },
  savedPerk: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['pickPerk'])

const { targetList } = useStore()
const cost = ref(0)
// const count = ref(props.savedPerk.count - (props.savedPerk?.target?.length || 0) - (props.savedPerk?.anything?.length) || 0)

const complexFields = {
  target: ['target', 'target_f', 'target_c'].includes(props.perk.complex),
  flavor: ['flavor', 'target_f'].includes(props.perk.complex),
  count: ['target_c'].includes(props.perk.complex),
}

const complex = reactive({
  target: '',
  flavor: '',
  count: 0,
})

const perkToSave = reactive({
  title: props.perk.title,
  count: props.savedPerk.count || 0,
  cost: computed(() => {
    let cs = cost.value || props.perk.cost
    if (props.increment)
      cs = (perkToSave.count / 2) * (cs * 2 + (perkToSave.count - 1) * cs)
    else
      cs = perkToSave.count ? cs * perkToSave.count : cs
    return cs
  }),
  target: '',
  anything: '',
  freebies: props.perk.freebies,
})

// watch(perkToSave, () => perkToSave.target.length ? perkToSave.count = perkToSave.target.length : null)

// if (props.savedPerk.count) perkToSave.count = props.savedPerk.count

const displayedCost = computed(() => {
  return perkToSave.cost >= 11111 ? `${perkToSave.cost / 11111} T11 ticket` : perkToSave.cost
})

function filterObject(obj: any) {
  const ret: any = {}
  Object.keys(obj)
    .forEach((key) => {
      if ((obj[key] !== undefined && obj[key]) || key === 'cost') {
        if (obj[key].value)
          ret[key] = obj[key].value
        else
          ret[key] = obj[key]
      }
    })
  return ret
}

function sendPerk() {
  const obj = filterObject(perkToSave)
  if (props.perk.complex) {
    if (props.savedPerk.complex) {
      const filComplex = filterObject(complex)
      const ind = findIndex(props.savedPerk.complex, filComplex)
      if (ind !== -1)
        obj.complex = [...props.savedPerk.complex.filter((_, i: number) => i !== ind)]
      else
        obj.complex = [...props.savedPerk.complex, filComplex]
    }
    else { obj.complex = [filterObject(complex)] }
    if (complexFields.count) {
      if (obj.complex[obj.complex.length - 1])
        obj.complex[obj.complex.length - 1].count = perkToSave.count
      obj.count = obj.complex.reduce((a, x) => a += x.count, 0)
    }
    else {
      obj.count = obj.complex.length
      perkToSave.count = obj.count
    }
    obj.cost = (props.perk.cost || cost.value) * obj.count
  }

  emit('pickPerk', props.perk, obj)
}

const perkExist = computed(() => {
  return props.perk.complex ? findIndex(props.savedPerk.complex, filterObject(complex)) !== -1 : !!props.savedPerk.title
})
</script>

<style>
.column-block {
  break-inside: avoid-column;
  page-break-inside: avoid;
}
</style>
