<template>
  <!-- :class="{'border-3 sm:p-[0.3em] border-green-500 rounded-sm': perkExist}" -->
  <div
    class="sm:p-2 mb-2 column-block cursor-pointer max-w-[600px] relative"
    @click="sendPerk"
  >
    <img
      v-if="perk.image && settings.perkImages"
      ref="perkImg"
      class="rounded object-cover object-contain w-full object-center"
      :style="{'aspect-ratio': `2/1`}"
      :src="PLACEHOLDER_IMAGE"
      :data-src="perk.image"
      :alt="perk.title"
    />
    <h3 :id="perk.title" class="relative flex-wrap flex justify-center items-center text-base sm:text-xl">
      <span class="whitespace-nowrap">{{ perk.title }}</span>
      <span v-if="perk.dlc" class="text-sm ml-1" text="gray-700 dark:amber-400" @click.stop>
        <a v-if="perk.dlclink" :href="perk.dlclink" target="_blank" rel="noopener noreferrer" class="underline">DLC by {{ perk.dlc }}</a>
        <span v-else>DLC by {{ perk.dlc }}</span>
      </span>
      <span v-if="savedPerk.anything">({{ savedPerk.anything }})</span>
      <TargetInput
        v-if="complexFields.target"
        placeholder="For whom"
        class="text-base ml-2 w-42"
        :bought-list="savedPerk.complex"
        :do-not-close-list="true"
        @click.stop
        @targetChange="changeTarget"
      />
      <AnythingInput
        v-if="complexFields.flavor"
        v-model="complex.flavor"
        :list="flavorList.length ? flavorList : savedPerk.complex"
        :bought-list="savedPerk.complex"
        :placeholder="perk.anything"
        class="text-base mx-1 w-42"
        :do-not-close-list="true"
        @clickedOnChoice="(val) => (complex.flavor = val, sendPerk())"
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
      <slot name="title" :count="perkToSave.count" />
      <Select
        v-if="perk.costVariants"
        v-model.number="cost"
        :options="perk.costVariants"
        class="mx-1 inline-block text-base"
        @click.stop
      />
      <span v-if="displayedCost !== 0" text="gray-500 dark:gray-400" class="whitespace-nowrap">
        (Cost: <span text="green-600 dark:green-300">{{ displayedCost }}
        </span>)
        <!-- Free:<span class="text-amber-500">{{ freebieCosts }}</span> -->
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
    <div class="relative">
      <Desc
        v-if="perk.additionalDesc && (!settings.hideDesc && !collapsedDescsSet.has(perk.uid))"
        :desc="perk.additionalDesc"
        class="bg-amber-200 text-gray-800 text-sm md:text-base w-3/5 float-right mt-8 mx-2 border-3 border-gray-900"
      />
      <Table
        v-if="perk.table && !settings.hideDesc"
        :headers="perk.table[0]"
        :rows="perk.table.slice(1)"
        class="sm:float-right sm:mt-4 ml-2"
      />
      <Desc v-if="(!settings.hideDesc && !collapsedDescsSet.has(perk.uid)) || expand" :desc="perk.desc" />
      <div v-else class="text-center hover:underline cursor-pointer text-gray-700 dark:text-gray-300 flex items-center justify-center" @click.stop="expand = true">
        Expand description <entypo:triangle-down />
      </div>
      <slot name="underDesc" />
      <bi:arrows-collapse class="absolute top-3 -left-1 w-4 h-4 hover:text-lime-500" @click.stop="collapse" />
    </div>
    <div v-if="perk.requires" class="mx-2">
      Require: <span class="text-orange-500 dark:text-orange-300">{{ perk.requires }}</span>
    </div>
    <div v-if="perk.whitelist" class="mx-2">
      <span class="whitespace-nowrap float-left mr-2">
        {{ 'Require ' + (perk.whitelist.length > 1 ? (perk.needed || ' all')+' of' : '') }}:
      </span>
      <Enum :list="perk.whitelist" />
    </div>
    <fluent:delete-20-filled v-if="perk.local" class="absolute top-1 left-1 w-4 h-4 hover:text-red-500 mix-blend-difference" @click.stop="deleteLocal" />
  </div>
</template>

<script lang='ts' setup>
import { findIndex } from 'lodash-es'
import { useStore } from '~/store/store'
import { filterObject, lazyLoadSingleImg } from '~/logic'
import { localPerks } from '~/logic/localPerks'
import { PLACEHOLDER_IMAGE } from '~/data/constants'
import { defenseObject, talentsObject } from '~/data/talents'

const props = defineProps({
  perk: {
    type: Object,
    default: () => ({}),
  },
  isActive: {
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
  flavorList: {
    type: Array,
    default: () => [],
  },
  savedPerk: {
    type: Object,
    default: () => ({}),
  },
})

const expand = ref(false)

const emit = defineEmits(['pickPerk'])

const { targetList, settings, collapsedDescs, collapsedDescsSet } = useStore()
const cost = ref(props.perk.cost)
const perkImg = ref<HTMLImageElement | null>(null)
// const count = ref(props.savedPerk.count - (props.savedPerk?.target?.length || 0) - (props.savedPerk?.anything?.length) || 0)

const complexFields = {
  uid: ['target', 'target_f', 'target_c'].includes(props.perk.complex),
  target: ['target', 'target_f', 'target_c'].includes(props.perk.complex),
  flavor: ['flavor', 'target_f'].includes(props.perk.complex),
  count: ['target_c'].includes(props.perk.complex),
}

const complex = reactive({
  uid: 0,
  target: '',
  flavor: '',
  count: 0,
  cost: props.perk.cost,
})

// There a bug somewhere in this approach, need to clear all data before it can be used when buy/modify/sell/buy scenario
const perkToSave = reactive({
  uid: props.perk.uid,
  title: props.perk.title,
  count: props.savedPerk.count || 1,
  cost: computed(() => {
    let cs = cost.value
    let countMod = 0
    if (props.perk.title === 'Command Seals') countMod = 1
    if (props.increment || props.perk.increment) cs = (perkToSave.count / 2) * (cs * 2 + (perkToSave.count - 1) * cs)
    else
      cs = (perkToSave.count && props.perk.multiple) ? (cs * (Math.min(perkToSave.count, props.perk.max || Infinity) - countMod)) : cs
    return cs
  }),
  costT: computed(() => {
    let cs = props.perk.costT
    if (props.increment || props.perk.increment) cs = (perkToSave.count / 2) * (cs * 2 + (perkToSave.count - 1) * cs)
    return cs
  }),
  target: '',
  anything: '',
  freebies: props.perk.freebies ? { ...props.perk.freebies } : undefined,
})

const displayedCost = computed(() => {
  return props.perk.costT ? `${perkToSave.costT || 1} IMG` : perkToSave.cost
})

const freebieCosts = computed(() => {
  let totalCost = 0
  if (props.perk.freebies && props.perk.freebies.talentPerks)
    totalCost += props.perk.freebies.talentPerks.reduce((a, x) => a += x.count * talentsObject[x.title].cost, 0)
  if (props.perk.freebies && props.perk.freebies.defensePerks)
    totalCost += props.perk.freebies.defensePerks.reduce((a, x) => a += x.count * defenseObject[x.title].cost, 0)
  return totalCost
})

function changeTarget(target: {uid: number; name: string}) {
  complex.uid = target.uid
  complex.target = target.name
  sendPerk()
}

// watch(() => complex.flavor, () => sendPerk())

function sendPerk() {
  const obj = filterObject(perkToSave)
  if (props.perk.complex && (complex.count || complex.flavor || complex.target)) {
    if (props.savedPerk.complex) {
      const filComplex = filterObject(complex)
      const ind = findIndex(props.savedPerk.complex, filComplex)
      if (ind !== -1)
        obj.complex = [...props.savedPerk.complex.filter((_, i: number) => i !== ind)]
      else
        obj.complex = [...props.savedPerk.complex, filComplex]
    }
    else {
      obj.complex = [filterObject(complex)]
    }
    if (complexFields.count) {
      if (obj.complex[obj.complex.length - 1])
        obj.complex[obj.complex.length - 1].count = perkToSave.count
      obj.count = obj.complex.reduce((a, x) => a += x.count, 0)
    }
    else {
      obj.count = obj.complex.length
      perkToSave.count = obj.count
    }
    obj.cost = cost.value * Math.min(obj.count, props.perk.max || Infinity)
    // A clutch for Talent Sharing bug
    if (obj.uid === 'xhM0D')
      obj.cost = obj.complex.reduce((a, x) => a += x.cost !== undefined ? x.cost : cost.value, 0)
  }
  // Set count to 0 to delete perk if clicked twice
  if (props.savedPerk.count === obj.count && obj.count > 0)
    obj.count = 0
  emit('pickPerk', props.perk, obj)
}

const perkExist = computed(() => {
  const c = { target: complex.target, flavor: complex.flavor }
  if (complex.uid)
    c.uid = complex.uid
  return props.savedPerk.complex ? findIndex(props.savedPerk.complex, filterObject(c)) !== -1 : props.isActive
})

onMounted(() => { if (perkImg.value) lazyLoadSingleImg(perkImg.value) })
watch(settings.value, () => { if (perkImg.value) lazyLoadSingleImg(perkImg.value) }, { flush: 'post' })
// watch(() => complex.target, sendPerk)

function collapse() {
  if (expand.value) {
    expand.value = false
    return
  }
  if (collapsedDescsSet.value.has(props.perk.uid))
    collapsedDescs.value.splice(collapsedDescs.value.indexOf(props.perk.uid), 1)
  else
    collapsedDescs.value.push(props.perk.uid)
}

function deleteLocal() {
  const ind = findIndex(localPerks.value[props.perk.local], { title: props.perk.title })
  localPerks.value[props.perk.local].splice(ind, 1)
}
</script>
