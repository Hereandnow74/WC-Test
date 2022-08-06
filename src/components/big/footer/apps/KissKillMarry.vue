<template>
  <div class="flex flex-col gap-2 h-full px-2 py-1 overflow-x-hidden">
    <div class="grid grid-cols-3 gap-1 text-xs flex-grow grid-rows-[1fr,max-content]">
      <CompanionCard :char="waifu1" :show-tags="false" :show-tiers="false" font-size="text-xs" :class="orientation ? 'h-full' : 'h-3/5'" />
      <CompanionCard :char="waifu2" :show-tags="false" :show-tiers="false" font-size="text-xs" :class="orientation ? 'h-full' : 'h-3/5'" />
      <CompanionCard :char="waifu3" :show-tags="false" :show-tiers="false" font-size="text-xs" :class="orientation ? 'h-full' : 'h-3/5'" />
      <div v-for="n in 3" :key="n" class="flex flex-col gap-1">
        <Button
          label="sell"
          size="Small"
          :bg-color="lockedActions.includes('kill') && locking[n] !== 'kill' ? 'bg-gray-500': 'bg-red-500'"
          @click="locking[n] = locking[n] ? null: 'kill'"
        />
        <Button
          label="familiar"
          size="Small"
          :bg-color="lockedActions.includes('kiss') && locking[n] !== 'kiss' ? 'bg-gray-500': 'bg-pink-500'"
          @click="locking[n] = locking[n] ? null: 'kiss'"
        />
        <Button
          label="companion"
          size="Small"
          :bg-color="lockedActions.includes('marry') && locking[n] !== 'marry' ? 'bg-gray-500': 'bg-violet-500'"
          @click="locking[n] = locking[n] ? null: 'marry'"
        />
      </div>
    </div>
    <div class="flex gap-2 justify-end">
      <Button
        v-if="lockedActions.length === 3"
        label="Play again"
        size="Small"
        bg-color="bg-yellow-500"
        @click="generateWaifus"
      />
      <Toggle v-model="onlyF" label="Only Females" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { randomChar, orientation } from '~/logic'

const waifu1 = ref<any>({})
const waifu2 = ref<any>({})
const waifu3 = ref<any>({})

const onlyF = ref(true)

const locking = ref<Record<number, string | null>>({})

const lockedActions = computed(() => Object.values(locking.value).filter(x => x))

function generateWaifus() {
  randomChar(true, 0, 0, onlyF.value ? 'F' : null).then(w => waifu1.value = w)
  randomChar(true, 0, 0, onlyF.value ? 'F' : null).then(w => waifu2.value = w)
  randomChar(true, 0, 0, onlyF.value ? 'F' : null).then(w => waifu3.value = w)
  locking.value = {}
}

generateWaifus()

</script>
