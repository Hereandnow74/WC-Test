<template>
  <Modal :label="`Choose Element ${current ? '['+current.cost+']' : ''}`">
    <div class="h-[85vh] md:h-3/4 bg-gray-300 dark:bg-gray-600 overflow-y-auto min-h-0 flex flex-col gap-2 scrollbar">
      <div
        v-for="element in shroudElements"
        :key="element.title"
        class="flex flex-col gap-1 m-2 rounded cursor-pointer p-2"
        bg="gray-200 dark:gray-700 hover:(gray-100 dark:gray-800)"
        @click="buyElement(element.title)"
      >
        <h3 class="relative text-lg font-semibold flex gap-1 justify-center">
          {{ element.title }}
          <fa-solid:check v-if="elementBought(element.title)" class="text-green-500 absolute top-1 right-1" />
          <template v-if="element.dlc">
            <span class="text-gray-500">(DLC by {{ element.dlc }})</span>
          </template>
          <template v-if="element.title === 'Custom Element'">
            <Input v-model="custom" placeholder="Element" @click.stop />
          </template>
        </h3>
        <div>
          <span class="px-2 text-orange-500 dark:text-orange-300 font-semibold">Elemental Ability</span>:
          <span>{{ element['Elemental Ability'] }}</span>
        </div>
        <div>
          <span class="px-2 text-orange-500 dark:text-orange-300 font-semibold">Body Effects</span>:
          <span>{{ element['Body Effects'] }}</span>
        </div>
        <div>
          <span class="px-2 text-orange-500 dark:text-orange-300 font-semibold">Streamlined costume features</span>:
          <span>{{ element['Streamlined costume features'] }}</span>
        </div>
        <div>
          <span class="px-2 text-orange-500 dark:text-orange-300 font-semibold">Heavy costume features</span>:
          <span>{{ element['Heavy costume features'] }}</span>
        </div>
        <div>
          <span class="px-2 text-orange-500 dark:text-orange-300 font-semibold">Freebies</span>:
          <span class="font-semibold">{{ element.Freebies }}</span>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { findIndex, isArray, mergeWith, find, remove } from 'lodash-es'
import type { PropType } from 'vue'
import { PerkFull } from 'global'
import { useStore } from '~/store/store'
import { shroudElements } from '~/data/binding'
import { chooseBinding } from '~/logic'

const props = defineProps({
  currentBinding: {
    type: Object as PropType<PerkFull>,
    default: () => ({}),
  },
})

const custom = ref('')

const emit = defineEmits(['close'])

const { binding } = useStore()
const current = computed(() => find(binding.value, { title: props.currentBinding.title }))

function elementBought(title: string) {
  return current.value && current.value.complex ? findIndex(current.value.complex, { flavor: title }) !== -1 : false
}

function close() {
  emit('close')
}

const calcCost = (ln: number) => 54 * ln + (ln / 2) * (10 * 2 + (ln - 1) * 10) || 64

function buyElement(title: string) {
  const saveBin = {}
  if (props.currentBinding.title === 'Elemental Shroud') {
    saveBin.cost = props.currentBinding.cost
    saveBin.title = props.currentBinding.title
    saveBin.complex = [{ flavor: title }]
    saveBin.freebies = { ...props.currentBinding.freebies }
    const i = findIndex(shroudElements, { title })
    mergeWith(saveBin.freebies, shroudElements[i].freebies, (a, b) => { if (isArray(a)) return [...a, ...b] })
    if (custom.value) saveBin.complex = [{ flavor: title, target: custom.value }]
    chooseBinding(props.currentBinding, saveBin)
    close()
  }

  if (props.currentBinding.title === 'Prismatic Shroud') {
    saveBin.title = props.currentBinding.title
    if (current.value && current.value.complex) {
      if (findIndex(current.value.complex, { flavor: title }) === -1) {
        saveBin.complex = [...current.value.complex]
        saveBin.complex.push({ flavor: title })
        if (custom.value)
          saveBin.complex[saveBin.complex.length - 1].target = custom.value
      }
      else {
        saveBin.complex = remove([...current.value.complex], val => val.flavor !== title)
      }
    }
    else {
      saveBin.complex = [{ flavor: title }]
    }
    saveBin.freebies = { ...props.currentBinding.freebies }
    saveBin.complex.forEach((el) => {
      const i = findIndex(shroudElements, { title: el.flavor })
      mergeWith(saveBin.freebies, shroudElements[i].freebies, (a, b) => { if (isArray(a)) return [...a, ...b] })
    })
    saveBin.count = saveBin.complex.length
    saveBin.cost = calcCost(saveBin.count)
    chooseBinding(props.currentBinding, saveBin)
  }
}
</script>
