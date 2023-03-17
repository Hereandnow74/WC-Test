<template>
  <div class="p-1 no-scrollbar h-full bg-gray-900">
    <div>
      <!-- <AppHeader
        :items="appliedPerks"
        appname="Pocket Space"
        class="bg-gray-700"
        size="Big"
        fontsize="x-large"
      /> -->
      <div v-if="items" id="psApp" class="h-full overflow-y-auto scrollbar bg-gray-900 mt-1">
        <div
          class="flex flex-col justify-center items-center p-1"
        >
          <div class="relative" style="margin:0 auto;">
            <img
              class="rounded-3xl"
              :src="area[0].image"
              :title="area[0].name"
              :alt="area[0].name"
            />
            <div class="rounded-3xl cursor-pointer bg-opacity-50 bg-gray-700 absolute top-0 left-0 w-full h-full" />
            <p :id="area[0].name" class="absolute text-base sm:text-xl left-2 top-1 mt-2">
              {{ area[0].name }}
              <span
                class="flex"
              >
                <span
                  class="sm:text-base"
                >
                  Size: {{ landSize[0].size }}<sup>2</sup> {{ landSize[0].units }}
                </span>
              </span>
            </p>
            <span class="iconify w-16 h-16 absolute right-2 top-0 pt-4" :style="`color:#feb103;`" :data-icon="`twemoji:sun`"></span>

            <div
              id="retinueCount"
              class="absolute flex bottom-0 left-2 mb-2"
            >
              <div
                alt="Number of residents"
                title="Number of residents"
                class="flex p-1"
              >
                <span class="iconify" :style="`font-size:x-large`" :data-icon="`codicon:person`"></span>
                <span
                  class="sm:text-base"
                >
                  {{ iRetinueNumber }} resident{{ iRetinueNumber > 1 ? 's' : '' }}
                </span>
              </div>
            </div>

            <div
              v-if="appliedPerks.length"
              class="absolute flex bottom-0 right-2 mb-2"
            >
              <div
                v-for="aPerk in appliedPerks"
                :key="aPerk.title"
                :alt="aPerk.title"
                :title="aPerk.title"
                class="flex p-1"
              >
                <span class="iconify" :style="`font-size:x-large`" :data-icon="aPerk.icon"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="font-semibold flex justify-between mx-4 border-b border-gray-700">
          Structures
        </div>
        <div
          class="grid p-1 gap-1 bg-gray-900"
          :class="orientation ? 'grid-cols-4' : 'grid-cols-2'"
        >
          <ItemCard
            v-for="item in items.structures"
            :key="item.name"
            :item="item"
            class="mx-auto"
          />
        </div>
        <template v-if="items.rides.length && iWorldSize > 0">
          <div
            class="font-semibold flex justify-between mx-4 border-b border-gray-700"
          >
            Vehicles
          </div>
          <div
            class="grid p-1 gap-1 bg-gray-900"
            :class="orientation ? 'grid-cols-4' : 'grid-cols-2'"
          >
            <ItemCard
              v-for="rideItem in items.rides"
              :key="rideItem.name"
              :item="rideItem"
              class="mx-auto"
            />
          </div>
        </template>
        <template v-if="items.stellar.length">
          <div
            class="font-semibold flex justify-between mx-4 border-b border-gray-700"
          >
            Stellar Bodies
          </div>
          <div
            class="grid p-1 gap-1 bg-gray-900"
            :class="orientation ? 'grid-cols-4' : 'grid-cols-2'"
          >
            <ItemCard
              v-for="stellarItem in items.stellar"
              :key="stellarItem.name"
              :item="stellarItem"
              class="mx-auto"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { find } from 'lodash-es'
import { orientation } from '~/logic'
import { useStore } from '~/store/store'
import { rides, DLCRides } from '~/data/rides'
import { homes } from '~/data/demdun'
import { DLChomes } from '~/data/DLCs'

const { ridePerks, userRides, localUserRides, homePerks, companions } = useStore()

const area = ref([{ icon: 'ph:cube-thin', name: 'Pocket Space', color: '#dc3545', image: 'https://i.ibb.co/pwsdXJ2/White-Room.jpg' }])
const landSize = ref([{ size: '3', units: 'm' }])
const iRetinueNumber = ref(1)
const iHouseSize = ref(0)
const iWorldSize = ref(0)

const rideCategoryIcons = {
  Land: 'la:truck-pickup',
  Sea: 'la:ship',
  Amphibious: 'carbon:plane-sea',
  Sky: 'la:plane',
  Space: 'la:space-shuttle',
}

const allRides = computed(() => Array.prototype.concat(userRides.value, localUserRides.value, rides, DLCRides))
const allHomes = computed(() => Array.prototype.concat(homes, DLChomes))

const appliedPerks = computed(() => {
  const ap = []
  homePerks.value.forEach((home) => {
    switch (home.title) {
      case 'Stay in touch':
        ap.push({ title: 'No-Limits™ - Interdimensional Internet Connection', icon: 'ic:sharp-wifi' })
        break
      case 'Home Security':
        ap.push({ title: 'Home Security © Despin Inc. A patended pocket dimension firewall warding system.', icon: 'healthicons:virus-shield' })
        break
      case 'Adjustment Field':
        ap.push({ title: 'Adjustment Field rules is in effect.', icon: 'carbon:operations-field' })
        break
    }
  })
  return ap
})

const items = computed(() => {
  const structuresList = []
  const ridesList = []
  const stellarList = []

  let house = []
  let hangarSize = 0
  let dockSize = 0
  let garageSize = 0

  iRetinueNumber.value = companions.value.length + 1

  ridePerks.value.forEach((ride) => {
    if (ride.title.indexOf('Catch-A-Ride') !== 0) {
      const sourceRide = find(allRides.value, tride => tride.title === ride.title)

      let itemSize = 0
      if (sourceRide) {
        if (!sourceRide.category) sourceRide.category = 'Land'

        switch (sourceRide.size) {
          case 'Small':
            itemSize = 1
            break
          case 'Medium':
            itemSize = 10
            break
          case 'Large':
            itemSize = 20
            break
          case 'Gigantic':
            itemSize = 50
            break
          default:
        }

        switch (sourceRide.category) {
          case 'Land':
            garageSize = itemSize + garageSize
            break
          case 'Sea':
          case 'Amphibious':
            dockSize = itemSize + dockSize
            break
          case 'Sky':
          case 'Space':
            hangarSize = itemSize + hangarSize
            break
          default:
        }
        ridesList.push({ icon: rideCategoryIcons[sourceRide.category], name: ride.title, color: '#0d6efd', image: sourceRide.image })
      }
    }
  })

  structuresList.push({ icon: 'la:boxes', name: 'Storage', color: '#735145', image: 'https://i.ibb.co/MVcBy82/Pocket-Storage.jpg' })

  const addonsList = []

  homePerks.value.forEach((homePerk) => {
    const sourceHome = find(allHomes.value, thome => thome.title === homePerk.title)
    switch (homePerk.title) {
      case 'Grand Manor':
        if (iHouseSize.value < 3) {
          iHouseSize.value = 3
          house = [{ icon: 'emojione:house', name: sourceHome.title, color: '#945800', image: sourceHome.image }]
        }
        landSize.value = [{ size: '1000', units: 'm' }]
        break
      case 'Sweet Home':
        if (iHouseSize.value < 2) {
          iHouseSize.value = 2
          house = [{ icon: 'noto:house-with-garden', name: sourceHome.title, color: '#945800', image: sourceHome.image }]
        }
        landSize.value = [{ size: '200', units: 'm' }]
        break
      case 'Pocket Apartment':
        if (iHouseSize.value < 1) {
          iHouseSize.value = 1
          house = [{ icon: 'fontisto:room', name: sourceHome.title, color: '#945800', image: sourceHome.image }]
        }
        landSize.value = [{ size: '100', units: 'm' }]
        break
      case 'Niven? Never Heard of Him':
        if (iWorldSize.value > 0) {
          iWorldSize.value = 3
          area.value = [{ icon: 'openmoji:ringed-planet', name: 'Ring World', color: '#dc3545', image: sourceHome.image }]
        }
        landSize.value = [{ size: '1.5 trillion', units: 'km' }]
        break
      case 'Sweet Home Expansion':
        if (iWorldSize.value > 0 && homePerk.count === 25) {
          iWorldSize.value = 2
          area.value = [{ icon: 'flat-ui:earth', name: 'Planet', color: '#dc3545', image: sourceHome.image }]
        }
        landSize.value = [{ size: `${15.2 * Math.pow(2, homePerk.count)}`, units: 'km' }]
        break
      case 'Life’s A Beach':
        iWorldSize.value = 1
        area.value = [{ icon: 'noto:beach-with-umbrella', name: 'Island', color: '#dc3545', image: sourceHome.image }]
        landSize.value = [{ size: '15.2', units: 'km' }]
        break
      case 'Armory':
        addonsList.push({ icon: 'mdi:shield-sword-outline', name: 'Armory', color: '#1769aa', image: 'https://i.ibb.co/JRCDgFk/Armory.jpg' })
        break
      case 'Holodeck':
        addonsList.push({ icon: 'mdi:hololens', name: 'Holodeck', color: '#1769aa', image: 'https://i.ibb.co/9TJRHQr/Holodeck.jpg' })
        break
      case 'Warehouse District':
        addonsList.push({ icon: 'fa-solid:warehouse', name: 'Warehouses', color: '#5480fc', image: sourceHome.image })
        break
      case 'Rainbow Bridge':
        addonsList.push({ icon: 'cib:arch-linux', name: 'Rainbow Bridge', color: '#5480fc', image: sourceHome.image })
        break
      case 'Pocket Star':
        stellarList.push({ icon: 'noto:sunrise-over-mountains', name: sourceHome.title, color: '#ffed00', image: sourceHome.image })
        break
      default:
    }
  })

  if (iWorldSize.value === 0 && house.length > 0) area.value.push(...house)
  if (iWorldSize.value > 0) structuresList.push(...house)

  switch (true) {
    case (iWorldSize.value > 0 && garageSize > 0 && garageSize < 3):
      structuresList.push({ icon: 'teenyicons:garage-solid', name: 'Garage', color: '#ffed00', image: 'https://i.ibb.co/xKbWw91/Garage0.jpg' })
      break
    case (iWorldSize.value > 0 && garageSize > 0 && garageSize < 12):
      structuresList.push({ icon: 'teenyicons:garage-solid', name: 'Spacious Garage', color: '#ffed00', image: 'https://i.ibb.co/dDCxgVP/Garage1.jpg' })
      break
    case (iWorldSize.value > 0 && garageSize > 0 && garageSize < 48):
      structuresList.push({ icon: 'teenyicons:garage-solid', name: 'Supersize Garage', color: '#ffed00', image: 'https://i.ibb.co/ZxsgGCT/Garage2.jpg' })
      break
    default:
      break
  }

  switch (true) {
    case (iWorldSize.value > 0 && hangarSize > 0 && hangarSize < 20):
      structuresList.push({ icon: 'teenyicons:garage-solid', name: 'Hangar', color: '#ffed00', image: 'https://i.ibb.co/nsK59Ng/Hangar0-New.jpg' })
      break
    case (iWorldSize.value > 0 && hangarSize > 0 && hangarSize < 50):
      structuresList.push({ icon: 'teenyicons:garage-solid', name: 'Space Port', color: '#ffed00', image: 'https://i.ibb.co/b2MPxpw/Hangar2.jpg' })
      break
    default:
      break
  }

  switch (true) {
    case (iWorldSize.value > 0 && dockSize > 0 && dockSize < 20):
      structuresList.push({ icon: 'teenyicons:garage-solid', name: 'Docks', color: '#ffed00', image: 'https://i.ibb.co/cctD00h/Dock1.jpg' })
      break
    case (iWorldSize.value > 0 && dockSize > 0 && dockSize < 50):
      structuresList.push({ icon: 'teenyicons:garage-solid', name: 'Naval Port', color: '#ffed00', image: 'https://i.ibb.co/YBy3PgF/Dock2.jpg' })
      break
    default:
      break
  }

  if (addonsList.length > 0) structuresList.push(...addonsList)

  return { structures: structuresList, rides: ridesList, stellar: stellarList }
})

</script>
