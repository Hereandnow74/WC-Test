<template>
  <GenericPerkCard
    v-bind="{perk, isActive: !!savedPerk.title, savedPerk}"
  >
    <template #title>
      <Button label="Buy" bg-color="bg-blue-500" size="Small" class="mx-1" @click.stop="showBuyPerk = true" />
    </template>
    <template #cost>
      (Cost: <span text="green-600 dark:green-300">{{ displayedCost || perk.cost }}</span>)
    </template>
    <template #underDesc>
      <Modal v-if="showBuyPerk" :label="`Total cost: ${displayedCost}`" @click="showBuyPerk = false">
        <Toggle v-if="perk.title === 'Template Stacking I'" v-model="newPrice" class="ml-2" label="Non-exponential price" />
        <div ref="charList" class="min-h-0 overflow-y-auto max-h-[75vh] scrollbar grid md:grid-cols-2 gap-2 p-1">
          <div
            class="flex gap-2 w-full rounded bg-gray-300 dark:bg-gray-800 p-1"
          >
            <img
              :data-src="startingOrigin.image || '/img/Contractor.jpg'"
              alt="Your image"
              class="rounded object-cover w-1/4 object-top"
              @load="setHeight"
            >
            <div class="flex flex-col gap-2 flex-grow">
              <h3 class="flex gap-2 text-sm">
                {{ startingOrigin.character || 'You' }}
                <Button
                  icon="akar-icons:circle-plus"
                  bg-color="bg-green-500"
                  label=""
                  class="self-center"
                  title="Add power"
                  @click="addPower(startingOrigin.character || 'You')"
                />
              </h3>
              <div v-for="power, i in powers[startingOrigin.character || 'You']" :key="i" class="flex gap-2">
                <CharacterInput
                  v-model="powers[startingOrigin.character || 'You'][i]"
                  :idd="'idyou' + i"
                  placeholder="Character / Race / Power name"
                  class="flex-grow"
                  error-message=""
                />
                <Button icon="fluent:delete-20-filled" bg-color="bg-red-500" label="" class="self-center" @click="() => powers[startingOrigin.character || 'You'].splice(i, 1)" />
              </div>
            </div>
          </div>
          <div
            v-for="companion in companionsWithoutSold"
            :key="companion.uid"
            class="flex gap-2 w-full rounded bg-gray-300 dark:bg-gray-800 p-1"
          >
            <img
              v-if="allCharsObject[companion.uid] && !settings.allImg"
              :data-src="imageLink(allCharsObject[companion.uid].i, companion.uid)"
              :alt="companion.name"
              class="rounded object-cover w-1/4 object-top"
              @load="setHeight"
            >
            <div class="flex flex-col gap-2 flex-grow">
              <h3 class="flex gap-2 text-sm">
                {{ companion.name }}
                <span class="text-gray-500">({{ companion.world }})</span>
                <Button
                  icon="akar-icons:circle-plus"
                  bg-color="bg-green-500"
                  label=""
                  class="self-center"
                  title="Add power"
                  @click="addPower(companion.name)"
                />
              </h3>
              <div v-for="power, i in powers[companion.name]" :key="i" class="flex gap-2">
                <CharacterInput
                  v-model="powers[companion.name][i]"
                  :idd="'id'+companion.uid + i"
                  placeholder="Character / Race / Power name"
                  class="flex-grow"
                  error-message=""
                />
                <Button icon="fluent:delete-20-filled" bg-color="bg-red-500" label="" class="self-center" @click="() => powers[companion.name].splice(i, 1)" />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </template>
  </GenericPerkCard>
</template>

<script lang='ts' setup>
import { useAllChars } from '~/data/constants'
import { lazyLoadImg, imageLink } from '~/logic'
import { useSettings } from '~/logic/searchSettings'
import { useStore } from '~/store/store'

const { companionsWithoutSold, settings, startingOrigin } = useStore()
const { newPrice } = useSettings()

const props = defineProps({
  perk: {
    type: Object,
    default: () => ({}),
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  savedPerk: {
    type: Object,
    default: () => ({}),
  },
  elementList: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['pickPerk'])

const powers = reactive<Record<string, string[]>>(props.savedPerk?.complex?.reduce((a, x) => {
  if (a[x.target]) a[x.target].push(x.flavor)
  else a[x.target] = [x.flavor]
  return a
}, {}) || {})

const showBuyPerk = ref(false)
const charList = ref<HTMLElement | null>(null)

const { allCharsObject } = useAllChars()

const fullCount = computed(() => {
  return Object.values(powers).reduce((a, x) => a += x.length, 0)
})

const individualCount = computed(() => Object.values(powers).map(x => x.length))

const displayedCost = computed(() => {
  return !newPrice.value ? individualCount.value.reduce((sum, count) => sum += 20 * ((Math.pow(2, count) - 1) / (2 - 1)), 0) : fullCount.value * props.perk.cost
})

function sendPerk() {
  const obj = {
    title: props.perk.title,
  }

  obj.complex = Object.entries(powers).reduce((a, x) => {
    x[1].forEach(power => a.push({ target: x[0], flavor: power }))
    return a
  }, [] as {target: string; flavor: string}[])

  obj.count = fullCount.value
  obj.cost = displayedCost.value

  emit('pickPerk', props.perk, obj)
}

watch(powers, sendPerk)

function setHeight(event: Event) {
  if (event.target)
    event.target.style['max-height'] = `${event.target.clientWidth * 1.7 || 90}px`
}

function addPower(uid: number) {
  if (powers[uid]) powers[uid].push('')
  else powers[uid] = ['']
}

watch(showBuyPerk, () => lazyLoadImg(charList.value), { flush: 'post' })

</script>
