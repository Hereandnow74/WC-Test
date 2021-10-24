<template>
  <div class="p-2">
    <Desc class="p-2 bg-gray-200 dark:bg-teal-900 max-w-4xl mx-auto" :desc="desc" />
    <div class="flex flex-wrap justify-between mt-4">
      <div
        v-for="item in origin"
        :id="item.title"
        :key="item.title"
        class="bg-light-blue-300 dark:bg-light-blue-900 p-2 md:w-[calc(50%-0.5rem)] xl:w-[calc(33%-0.5rem)]
          mb-4 cursor-pointer border-2 hover:border-orange-400 border-light-blue-900"
        :class="choosedOrigin.title === item.title ? 'filter brightness-110' : ''"
        @click="chooseOrigin(item)"
      >
        <div class="">
          <div class="flex gap-1 items-center">
            <h4 class="text-xl mb-1 mr-auto px-2">
              {{ item.title }}
              <span text="gray-600 dark:gray-400">
                (Cost: {{ choosedOrigin.title === item.title ? choosedOrigin.cost : item.cost }})
              </span>
            </h4>
            <div v-if="item.variants && choosedOrigin.title === item.title">
              <label for="variants">Variants:</label>
              <select v-model.number="item.cost" name="variants" class="ml-2 text-gray-700">
                <option value="0">
                  None
                </option>
                <option v-for="variant in item.variants" :key="variant.title" :value="variant.cost">
                  {{ variant.title }}
                </option>
              </select>
            </div>
            <div v-if="item.character && choosedOrigin.title === item.title" class="flex gap-1">
              <CharacterInput
                v-model="choosedOrigin.character"
                :error-message="costError"
                @updateTier="choosedOrigin.tier = $event"
              />
              <Input
                v-model="choosedOrigin.tier"
                class="w-12"
                placeholder="Tier"
              />
            </div>
            <div v-if="choosedOrigin.title === item.title">
              <button
                v-if="startingOrigin.title !== item.title"
                class="rounded bg-amber-400 hover:bg-amber-500 text-gray-800 px-1"
                @click="pickOrigin"
              >
                Select
              </button>
              <button
                v-else
                class="rounded bg-red-400 hover:bg-red-500 text-gray-800 px-1"
                @click="startingOrigin = {title:'', cost: 0}"
              >
                Deselect
              </button>
            </div>
            <div v-if="startingOrigin.title === item.title">
              <fa-solid:check class="text-green-500" />
            </div>
          </div>
          <img class="max-h-[400px] w-1/2 object-contain self-center inline-block float-right mt-4" :src="item.image" :alt="item.title">
          <Desc class="" :desc="item.desc" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { CHAR_COSTS } from '~/data/constatnts'
import { desc, origin, Origin } from '~/data/origin'
import { useTooltips } from '~/logic/misc'
import { useStore } from '~/store/store'

export default defineComponent({
  setup() {
    const choosedOrigin = reactive({
      title: '',
      cost: 0,
      character: '',
      tier: 1,
    })
    const costError = ref('')

    const { allEffects, startingOrigin, baseBudget } = useStore()

    onMounted(() => useTooltips())

    watch(choosedOrigin, () => {
      if (['Substitute', 'Possess'].includes(choosedOrigin.title))
        choosedOrigin.cost = CHAR_COSTS[choosedOrigin.tier - 1] || 0
    })

    function chooseOrigin(item: Origin) {
      choosedOrigin.title = item.title
      choosedOrigin.cost = item.cost

      if (startingOrigin.value.title === choosedOrigin.title)
        Object.assign(choosedOrigin, startingOrigin.value)
    }

    function pickOrigin() {
      if (choosedOrigin.title === 'Substitute' && choosedOrigin.cost > baseBudget.value * 0.2) {
        costError.value = 'Cost should be less than 20% of your starting budget'
      }
      else {
        costError.value = ''
        allEffects.value.push(choosedOrigin.title)
        Object.assign(startingOrigin.value, choosedOrigin)
      }
    }

    return {
      desc,
      origin,
      costError,
      chooseOrigin,
      choosedOrigin,
      startingOrigin,
      pickOrigin,
    }
  },
})
</script>
