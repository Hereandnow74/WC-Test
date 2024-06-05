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
            <div class="w-1/4">
              <img
                :data-src="startingOrigin.image || '/img/Contractor.jpg'"
                alt="Your image"
                class="rounded object-cover object-top w-full"
                @load="setHeight"
              >
              <div v-if="powers[startingOrigin.uid || 0]?.length && perk.title === 'Template Stacking I'" class="text-center" title="Total count and cost of Templates for a character">
                [<span class="text-orange-800 dark:text-orange-400">{{ powers[startingOrigin.uid || 0].length }}</span>]
                [<span class="text-green-800 dark:text-green-400">
                  {{ (noSkill ? 10 : 20) * ((Math.pow(2, powers[startingOrigin.uid || 0].length) - 1) / (2 - 1)) }}
                </span>]
              </div>
            </div>
            <div class="flex flex-col gap-2 flex-grow">
              <h3 class="flex gap-2 text-sm">
                {{ startingOrigin.character || 'You' }}
                <Button
                  icon="akar-icons:circle-plus"
                  bg-color="bg-green-500"
                  label=""
                  class="self-center"
                  title="Add power"
                  @click="addPower(startingOrigin.uid || 0, startingOrigin.character || 'You')"
                />
              </h3>
              <div v-for="power, i in powers[startingOrigin.uid || 0]" :key="i" class="flex gap-2">
                <CharacterInput
                  v-if="perk.title === 'Template Stacking I'"
                  :model-value="power.flavor"
                  :idd="'idyou' + i"
                  placeholder="Character / Race / Power name"
                  class="flex-grow"
                  error-message=""
                  :max-tier="10"
                  @onChar="(char: DBCharacter) => (power.flavor = `${char.n} (${char.w})`, power.target = startingOrigin.character || 'You', power.uid = startingOrigin.uid || 0)"
                  @update:modelValue="(val) => (power.flavor = val, power.target = startingOrigin.character || 'You', power.uid = startingOrigin.uid || 0)"
                />
                <AnythingInput
                  v-else
                  :model-value="power.flavor"
                  placeholder="Power name"
                  class="flex-grow"
                  error-message=""
                  :max="10"
                  @update:modelValue="(val) => (power.flavor = val, power.target = startingOrigin.character || 'You', power.uid = startingOrigin.uid || 0)"
                />
                <Button icon="fluent:delete-20-filled" bg-color="bg-red-500" label="" class="self-center" @click="() => powers[startingOrigin.uid || 0].splice(i, 1)" />
              </div>
            </div>
          </div>
          <div
            v-for="companion in companionsWithoutSold"
            :key="companion.uid"
            class="flex gap-2 w-full rounded bg-gray-300 dark:bg-gray-800 p-1"
          >
            <div class="w-1/4">
              <img
                v-if="(allCharsObject[companion.originUID || companion.uid] && allCharsObject[companion.originUID || companion.uid].i) || companion.image && !settings.allImg"
                :data-src="companion.image || imageLink(companion.originUID || companion.uid)"
                :alt="companion.name"
                class="rounded object-cover w-full object-top"
                @load="setHeight"
              >
              <div v-if="powers[companion.uid]?.length && perk.title === 'Template Stacking I'" class="text-center" title="Total count and cost of Templates for a character">
                [<span class="text-orange-800 dark:text-orange-400">
                  {{ powers[companion.uid].length }}
                </span>]
                [<span class="text-green-800 dark:text-green-400">
                  {{ (noSkill ? 10 : 20) * ((Math.pow(2, powers[companion.uid].length) - 1) / (2 - 1)) }}
                </span>]
              </div>
            </div>
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
                  @click="addPower(companion.uid, companion.name)"
                />
              </h3>
              <div v-for="power, i in powers[companion.uid]" id="complexPerks" :key="i" class="flex gap-2">
                <CharacterInput
                  v-if="perk.title === 'Template Stacking I'"
                  :model-value="power.flavor"
                  :idd="'id'+companion.uid + i"
                  append-id="complexPerks"
                  placeholder="Character / Race / Power name"
                  class="flex-grow"
                  :max-tier="10"
                  error-message=""
                  @onChar="(char: DBCharacter) => (power.flavor = `${char.n} (${char.w})`, power.target = companion.name, power.uid = companion.uid)"
                  @update:modelValue="(val) => (power.flavor = val, power.target = companion.name, power.uid = companion.uid)"
                />
                <AnythingInput
                  v-else
                  :model-value="power.flavor"
                  placeholder="Power name"
                  class="flex-grow"
                  error-message=""
                  @update:modelValue="(val) => (power.flavor = val, power.target = companion.name, power.uid = companion.uid)"
                />
                <Button icon="fluent:delete-20-filled" bg-color="bg-red-500" label="" class="self-center" @click="() => powers[companion.uid].splice(i, 1)" />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </template>
  </GenericPerkCard>
</template>

<script lang='ts' setup>
import { DBCharacter } from 'global'
import { find } from 'lodash-es'
import { useAllChars } from '~/data/constants'
import { lazyLoadImg, imageLink } from '~/logic'
import { useSettings } from '~/logic/searchSettings'
import { useStore } from '~/store/store'

const { companionsWithoutSold, settings, startingOrigin, difficulties } = useStore()
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
const powers = reactive<Record<string, {target: string; flavor: string; uid: number}[]>>(props.savedPerk?.complex?.reduce((a, x) => {
  // temporary fix to support old saves
  if (!x.uid) {
    x.uid = find(companionsWithoutSold.value, ch => ch.name === x.target)?.uid || startingOrigin.value.uid || 0
    x.uid = x.uid === -1 ? 0 : x.uid
  }
  if (a[x.uid]) a[x.uid].push({ target: x.target || '', uid: x.uid, flavor: x.flavor })
  else a[x.uid] = [{ target: x.target || '', uid: x.uid, flavor: x.flavor }]
  return a
}, {}) || {})

const showBuyPerk = ref(false)
const charList = ref<HTMLElement | null>(null)

const { allCharsObject } = useAllChars()

const fullCount = computed(() => {
  return Object.values(powers).reduce((a, x) => a += x.length, 0)
})

const individualCount = computed(() => Object.values(powers).map(x => x.length))

const noSkill = computed(() => !!difficulties.value.find(x => x.title === 'No Skill Framework'))

const displayedCost = computed(() => {
  return !newPrice.value && props.perk.title === 'Template Stacking I' ? individualCount.value.reduce((sum, count) => sum += (noSkill.value ? 10 : 20) * ((Math.pow(2, count) - 1) / (2 - 1)), 0) : fullCount.value * props.perk.cost
})

function sendPerk() {
  const obj = {
    title: props.perk.title,
  }

  obj.complex = Object.entries(powers).reduce((a, x) => {
    x[1].forEach(power => a.push({ target: power.target, flavor: power.flavor, uid: power.uid }))
    return a
  }, [] as {uid: number; target: string; flavor: string}[])

  obj.count = fullCount.value
  obj.cost = displayedCost.value

  emit('pickPerk', props.perk, obj)
}

watch(powers, sendPerk)

function setHeight(event: Event) {
  if (event.target)
    event.target.style['max-height'] = `${event.target.clientWidth * 1.7 || 90}px`
}

function addPower(uid: number, name: string) {
  if (powers[uid]) powers[uid].push({ target: name, uid, flavor: '' })
  else powers[uid] = [{ target: name, uid, flavor: '' }]
}

watch(showBuyPerk, () => lazyLoadImg(charList.value), { flush: 'post' })

</script>
