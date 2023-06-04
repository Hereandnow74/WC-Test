
<template>
  <div
    class="flex flex-col"
    @click.stop
    @mousedown.stop
  >
    <div class="relative pb-1 flex justify-center gap-4">
      <div class="flex gap-2 absolute left-4 top-1">
        <fluent:phone-tablet-20-regular
          v-if="visible && !buildLayout"
          class="h-6 w-6 cursor-pointer hover:text-amber-500"
          @click="orientation = !orientation"
        />
        <fluent:content-view-gallery-20-regular
          v-if="!buildLayout && visible"
          class="h-6 w-6 cursor-pointer hover:text-amber-500"
          @click="changeLayout"
        />
        <bi:phone
          v-if="buildLayout"
          class="h-6 w-6 cursor-pointer hover:text-amber-500"
          @click="changeLayout"
        />
      </div>
      <span class="flex gap-1 items-center cursor-help" title="Intensity">
        <mdi:contract-sign class="text-red-600" />
        <span :class="difficultyRating < 0 ? 'blink' : ''">{{ difficultyRating }}</span>
      </span>
      <span v-if="loan.owed" class="flex gap-1 items-center cursor-help" title="Current loan / maximum loan">
        <mdi:bank class="text-gray-400" />
        {{ loan.owed }} / {{ creditLimit }}
      </span>
      <span class="flex gap-1 items-center cursor-help" title="Your current credits">
        <ph:coins style="color: #ffdb58;" />
        <span :class="budget < 0 ? 'text-red-400' : ''">
          {{ budget }}
        </span>
      </span>
      <span v-if="tier11tickets !== 0" class="flex gap-1 items-center cursor-help" title="Your current IMG tickets">
        <bi:ticket-perforated style="color: #faf0e6;" />
        <span :class="tier11tickets >= 0 ? '' : 'text-red-500'">{{ tier11tickets }}</span>
      </span>
      <span v-if="devotionPoints !== 0" class="flex gap-1 items-center cursor-help" title="Devotion Points">
        <ri:home-heart-line style="color: #EC52C7;" />
        <span :class="devotionPoints >= 0 ? '' : 'text-red-500'">{{ devotionPoints }}</span>
      </span>
      <span
        v-if="!buildLayout"
        class="absolute right-4 text-xl cursor-pointer hover:text-green-500"
        :class="{'shake delay-100': showIntro}"
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
          class="flex-grow rounded-t cursor-pointer flex gap-1 items-center justify-center"
          border="t-2 green-500"
          :class="activeTab === i ? 'bg-green-600': 'hover:text-orange-400'"
          :title="tabTitles[i]"
          @click="activeTab = i"
        >
          <span class="iconify" :data-icon="tabIcons[i]"></span>
          {{ tab }}
        </div>
      </div>
      <transition name="slide" mode="out-in">
        <keep-alive>
          <component :is="tabComponents[activeTab]" />
        </keep-alive>
      </transition>
    </div>
    <SmartMenu v-if="showSmartMenu" ref="smartMenu" class="absolute bottom-9 right-1" />
    <div class="flex h-8 justify-between items-center px-6">
      <div class="cursor-pointer hover:text-amber-500" title="Back" @click="toggleAppMode()">
        <akar-icons:arrow-back-thick v-show="appMode" />
      </div>
      <div class="cursor-pointer hover:text-amber-500" title="Close smartphone" @click="toggleFull()">
        <akar-icons:circle />
      </div>
      <div class="cursor-pointer hover:text-amber-500" title="Menu" @click="toggleSmartMenu()">
        <charm:menu-hamburger />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '~/store/store'
import { activeTab, orientation, appMode, toggleAppMode, toggleSmartMenu, showSmartMenu, showIntro, visible, toggleFull, buildLayout } from '~/logic'

const tabs = ['Build', 'Retinue', 'Apps', 'Spendings', '']
const tabTitles = ['Your Build', 'Your Retinue Members', 'Apps', 'Spending\'s', 'Manual Controls']
const tabIcons = ['bx:bx-spreadsheet', 'bi:people-fill', 'ion:apps-sharp', 'la:coins', 'fluent:wrench-16-filled']

const tabComponents = [
  defineAsyncComponent(() => import('./footer/Build.vue')),
  defineAsyncComponent(() => import('./footer/Companions.vue')),
  defineAsyncComponent(() => import('./footer/Apps.vue')),
  defineAsyncComponent(() => import('./footer/Spendings.vue')),
  defineAsyncComponent(() => import('./footer/Manual.vue')),
]

const smartMenu = ref(null)

onClickOutside(smartMenu, () => showSmartMenu.value = false)

const {
  budget, tier11tickets, loan, creditLimit, settings, devotionPoints, difficultyRating,
} = useStore()

function changeLayout() {
  buildLayout.value = !buildLayout.value
  settings.value.columns = buildLayout.value ? 2 : 'auto'
}

</script>
