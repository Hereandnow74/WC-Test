
<template>
  <div
    class="fixed bottom-0 w-full text-gray-100 transition-transform transform"
    :class="visible ? 'translate-y-0' : 'translate-y-[calc(100%-1.8rem)]'"
    @click="visible = false"
  >
    <div
      class="min-w-[320px] h-[568px] sm:h-[calc(100vh-3.4rem)] rounded-3xl mx-auto border relative flex flex-col transition-all"
      bg="gray-900"
      border="2 gray-400"
      :class="orientation ? 'max-w-[940px]' : 'max-w-[440px]'"
      @click.stop
    >
      <div class="text-center relative pb-1">
        <fluent:phone-tablet-20-regular
          v-if="visible"
          class="absolute left-4 top-1 h-6 w-6 cursor-pointer hover:text-amber-500"
          @click="orientation = !orientation"
        />
        <span v-if="tier11tickets !== 0" class="mr-2">T11 tickets: {{ tier11tickets }}</span>
        <span v-if="loan.owed" class="mr-2">Owed: {{ loan.owed }}</span>
        <span>Budget: {{ budget }}</span>
        <span v-if="budget < 0" class="text-red-500 px-2">You are in debt</span>
        <span
          class="absolute inline-block right-4 text-xl cursor-pointer hover:text-green-500"
          @click="() => toggleFull()"
        >
          <ic:round-unfold-more />
        </span>
      </div>
      <div class="flex flex-col border m-1 py-1 border-gray-600 flex-grow rounded-sm bg-gray-800 min-h-0 overflow-x-hidden">
        <div class="flex gap-1 mx-2 border-b-1">
          <div
            v-for="tab, i in tabs"
            :key="tab"
            class="flex-grow rounded-t cursor-pointer flex items-center justify-center"
            border="t-2 green-500"
            :class="activeTab === i ? 'bg-green-600': 'hover:text-orange-400'"
            @click="activeTab = i"
          >
            <span class="iconify" :data-icon="tabIcons[i]"></span>
            {{ tab }}
          </div>
        </div>
        <transition v-if="visible" name="slide" mode="out-in">
          <keep-alive>
            <component :is="tabComponents[activeTab]" />
          </keep-alive>
        </transition>
      </div>
      <div class="flex h-8 justify-between items-center px-6 mt-auto">
        <div class="w-16 cursor-pointer hover:text-amber-500" title="Back" @click="toggleAppMode()">
          <akar-icons:arrow-back-thick v-show="appMode" />
        </div>
        <div class="cursor-pointer hover:text-amber-500" @click="toggleFull()">
          <akar-icons:circle />
        </div>
        <div class="w-16">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '~/store/store'
import { activeTab, orientation, appMode, toggleAppMode } from '~/logic'

const tabs = ['Build', 'Retinue', 'Apps', 'Spendings', '']
const tabIcons = ['bx:bx-spreadsheet', 'bx:bx-spreadsheet', 'ion:apps-sharp', 'la:coins', 'fluent:wrench-16-filled']

const tabComponents = [
  defineAsyncComponent(() => import('./footer/Build.vue')),
  defineAsyncComponent(() => import('./footer/Companions.vue')),
  defineAsyncComponent(() => import('./footer/Apps.vue')),
  defineAsyncComponent(() => import('./footer/Spendings.vue')),
  defineAsyncComponent(() => import('./footer/Manual.vue')),
]

const {
  budget, tier11tickets, loan,
} = useStore()

const [visible, toggleFull] = useToggle()

</script>

<style>

.slide-leave-active,
.slide-enter-active {
  @apply transition-transform;
  @apply ease-in-out;
  @apply duration-300;
}
.slide-enter-from {
  transform: translateX(-100%);
}
.slide-leave-to {
  transform: translateX(100%);
}
</style>
