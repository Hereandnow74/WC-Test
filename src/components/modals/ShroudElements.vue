<template>
  <Modal label="Choose Element">
    <div class="h-[85vh] md:h-3/4 bg-gray-300 dark:bg-gray-600 overflow-y-auto min-h-0 flex flex-col gap-2">
      <div
        v-for="element in shroudElements"
        :key="element.title"
        class="flex flex-col gap-1 m-2 rounded cursor-pointer p-2"
        bg="gray-200 dark:gray-700 hover:(gray-100 dark:gray-800)"
        @click="emitElement(element.title)"
      >
        <h3 class="relative text-lg font-semibold flex gap-1 justify-center">
          {{ element.title }}
          <fa-solid:check v-if="elementBought(element.title)" class="text-green-500 absolute top-1 right-1" />
          <Input v-if="element.title === 'Custom Element'" v-model="custom" placeholder="Element" @click.stop />
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
import { findIndex } from 'lodash-es'
import { useStore } from '~/store/store'
import { shroudElements } from '~/data/binding'

const custom = ref('')

const emit = defineEmits(['toggleElement'])

const { binding } = useStore()

function elementBought(title: string) {
  return findIndex(binding.value, { anything: title }) !== -1
}

function emitElement(title: string) {
  emit('toggleElement', title, custom.value)
}
</script>
