<template>
  <div class="p-2 flex flex-col gap-2 h-full">
    <div class="self-center">
      Your personal Pocket Space.
    </div>
    <div class="grid grid-cols-4 p-4 gap-2">
      <div
        v-for="item in items"
        :key="item.name"
        class="flex flex-col justify-center items-center rounded-xl bg-black bg-opacity-20 p-1 cursor-pointer hover:bg-gray-700"
      >
        <span class="iconify w-16 h-16" :style="`color:${item.color}`" :data-icon="item.icon"></span>
        <div class="text-center text-sm text-gray-200">
          {{ item.name }}
        </div>
      </div>
    </div>
    <Button label="Back" icon="akar-icons:arrow-back-thick" size="Small" class="self-center" @click="toggleAppMode" />
  </div>
</template>

<script lang="ts" setup>
import { findIndex } from 'lodash-es'
import { toggleAppMode } from '~/logic'
import { useStore } from '~/store/store'

const { ridePerks, homePerks } = useStore()

const items = computed(() => {
  const itemsList = [{ icon: 'la:boxes', name: 'Inventory', color: '#735145' }]

  ridePerks.value.forEach((ride) => {
    if (ride.title.indexOf('Catch-A-Ride') !== 0)
      itemsList.push({ icon: 'la:truck-pickup', name: ride.title, color: '#0d6efd' })
  })

  if (findIndex(homePerks.value, { title: 'Armory' }) !== -1)
    itemsList.push({ icon: 'mdi:shield-sword-outline', name: 'Armory', color: '#1769aa' })

  if (findIndex(homePerks.value, { title: 'Grand Manor' }) !== -1)
    itemsList.push({ icon: 'emojione:house', name: 'Grand Manor', color: '#945800' })

  else if (findIndex(homePerks.value, { title: 'Sweet Home' }) !== -1)
    itemsList.push({ icon: 'noto:house-with-garden', name: 'Sweet Home', color: '#945800' })

  else if (findIndex(homePerks.value, { title: 'Pocket Apartment' }) !== -1)
    itemsList.push({ icon: 'fontisto:room', name: 'Pocket Apartment', color: '#945800' })

  if (findIndex(homePerks.value, { title: 'Warehouse District' }) !== -1)
    itemsList.push({ icon: 'fa-solid:warehouse', name: 'Warehouse District', color: '#5480fc' })

  if (findIndex(homePerks.value, { title: 'Rainbow Bridge' }) !== -1)
    itemsList.push({ icon: 'cib:arch-linux', name: 'Rainbow Bridge', color: '#5480fc' })

  if (findIndex(homePerks.value, { title: 'Pocket Star' }) !== -1)
    itemsList.push({ icon: 'noto:sunrise-over-mountains', name: 'Pocket Star', color: '#ffed00' })

  if (findIndex(homePerks.value, { title: 'Niven? Never Heard of Him' }) !== -1)
    itemsList.push({ icon: 'openmoji:ringed-planet', name: 'Ring World', color: '#dc3545' })

  else if (findIndex(homePerks.value, { title: 'Sweet Home Expansion', count: 25 }) !== -1)
    itemsList.push({ icon: 'flat-ui:earth', name: 'Pocket Planet', color: '#dc3545' })

  else if (findIndex(homePerks.value, { title: 'Life’s A Beach' }) !== -1)
    itemsList.push({ icon: 'noto:beach-with-umbrella', name: 'Pocket Island', color: '#dc3545' })

  return itemsList
})

</script>
