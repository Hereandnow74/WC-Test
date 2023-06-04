<template>
  <Modal label="Search settings">
    <div class="flex flex-col gap-1 p-1 min-h-0 max-h-[88vh]">
      <div class="flex gap-2 justify-between border-b border-gray-700 dark:border-gray-400">
        <div class="font-semibold">Include: </div>
        <div class="flex gap-2 flex-wrap text-green-800 dark:text-green-300">
          <Toggle label="Companions" v-model="imageSettings.retinue.companions" />
          <Toggle label="Familiars" v-model="imageSettings.retinue.familiars" />
          <Toggle label="Sold" v-model="imageSettings.retinue.sold" />
        </div>
      </div>
      <div class="flex gap-2 justify-between border-b border-gray-700 dark:border-gray-400">
        <div>Display avatar</div>
        <Toggle v-model="imageSettings.showAvatarImage" />
      </div>
      <div class="flex gap-2 justify-between border-b border-gray-700 dark:border-gray-400">
        <div>Display companions images</div>
        <Toggle v-model="imageSettings.showCompanionsImage" />
      </div>
      <div class="flex gap-2 justify-between border-b border-gray-700 dark:border-gray-400">
        <div>Display only companions</div>
        <Toggle v-model="imageSettings.onlyImages" />
      </div>
      <div class="flex gap-2 justify-between border-b border-gray-700 dark:border-gray-400">
        <div>Output image width</div>
        <Input v-model.number="imageSettings.width" class="w-14" />
      </div>
      <h3 class="text-xl mt-1 font-semibold">
        Colors
      </h3>
      <div class="flex gap-2 justify-between border-b border-gray-700 dark:border-gray-400">
        <div>Background color</div>
        <input v-model="imageSettings.backgroundColor" type="color" class="bg-transparent" />
      </div>
      <div class="flex gap-2 justify-between border-b border-gray-700 dark:border-gray-400">
        <div>Category color</div>
        <input v-model="imageSettings.categoryColor" type="color" class="bg-transparent" />
      </div>
      <div class="flex gap-2 justify-between border-b border-gray-700 dark:border-gray-400">
        <div>Perk name color</div>
        <input v-model="imageSettings.perkColor" type="color" class="bg-transparent" />
      </div>
      <div class="flex gap-2 justify-between border-b border-gray-700 dark:border-gray-400">
        <div>Number color</div>
        <input v-model="imageSettings.numberColor" type="color" class=" bg-transparent" />
      </div>
      <div class="m-1 rounded p-1" :style="{'background-color': imageSettings.backgroundColor}">
        <h3 class="text-lg " :style="{'color': imageSettings.categoryColor}">
          Sample Title
        </h3>
        <Enum
          color=""
          :style="{'color': imageSettings.perkColor}"
          :number-color="imageSettings.numberColor"
          :list="[{title: 'Sample Perk', count: 3, cost: 33}]"
          path="/origin"
          :price-mode="true"
        />
      </div>
      <Button class="self-end mt-1" label="Reset" size="Small" @click="resetColors" />
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import Toggle from '../basic/Toggle.vue'
import { useSettings } from '~/logic/searchSettings'

const { imageSettings } = useSettings()

function resetColors() {
  imageSettings.value.perkColor = '#60a5fa'
  imageSettings.value.numberColor = '#d1d5db'
  imageSettings.value.categoryColor = '#9ca3af'
  imageSettings.value.backgroundColor = '#1f2937'
}

</script>
