<template>
  <div id="build" class="mt-18 top-0 left-36 absolute w-[800px] flex flex-col gap-2 bg-gray-800 text-gray-200 p-1 border border-orange-500">
    <div class="grid grid-cols-2 gap-1">
      <div class="text-gray-200">
        <h3 class="text-lg relative text-gray-400">
          World
        </h3>
        <div class="flex flex-wrap whitespace-nowrap gap-2">
          <div class="flex gap-2">
            <span class="text-gray-500 dark:text-gray-400">Name:</span>
            <span>{{ startingWorld.worldName || 'Unknown' }}</span>
          </div>
          <div v-if="startingWorld?.condition?.length" class="flex gap-2">
            <span class="text-gray-500 dark:text-gray-400">Condition:</span>
            <span>{{ startingWorld.condition }}</span>
          </div>
          <div class="flex gap-2">
            <span class="text-gray-500 dark:text-gray-400">Rating:</span>
            <span>{{ startingWorld.rating || 'Unknown' }}</span>
            <span>({{ baseBudget }})</span>
          </div>
        </div>
      </div>
      <div v-if="patron.length" id="patron">
        <h3 class="text-lg text-gray-400">
          Patron
        </h3>
        <Enum color="text-blue-400 hover:text-blue-300" :list="patron" path="/origin" />
      </div>
      <div v-if="activeChallenges.length" id="Challenges">
        <h3 class="text-lg text-gray-400">
          Challenges
        </h3>
        <Enum color="text-blue-400 hover:text-blue-300" :list="activeChallenges" path="/challenges" />
      </div>
      <div v-if="intensities.length">
        <h3 class="text-lg text-gray-400">
          Intensity
        </h3>
        <Enum
          color="text-blue-400 hover:text-blue-300"
          :list="intensities"
          path="/intensity"
          empty-message="PvE Mode"
          :price-mode="true"
        />
      </div>
      <div v-if="pvpPerks.length" id="Orbs">
        <h3 class="text-lg text-gray-400">
          Orbs
        </h3>
        <Enum
          color="text-blue-400 hover:text-blue-300"
          :list="pvpPerks"
          path="/intensity"
          empty-message=""
          :price-mode="true"
        />
      </div>
      <div id="Origin">
        <h3 class="text-lg text-gray-400">
          Origin
        </h3>
        <div class="text-gray-200" v-html="originText || 'No Origin'" />
      </div>
    </div>
    <div v-if="binding.length">
      <span class="text-gray-300 float-left mr-2">Bindings:</span>
      <Enum
        color="text-blue-400 hover:text-blue-300"
        :list="binding"
        empty-message=""
        :price-mode="true"
      />
    </div>
    <div v-if="luresBought.length">
      <span class="text-gray-300 float-left mr-2">Lures:</span>
      <Enum
        color="text-blue-400 hover:text-blue-300"
        :list="luresBought"
        empty-message="No Lures"
        :price-mode="true"
      />
    </div>
    <div v-if="otherPerks.length">
      <span class="text-gray-300 float-left mr-2">Other Controls:</span>
      <Enum
        color="text-blue-400 hover:text-blue-300"
        :list="otherPerks"
        empty-message="No Other Controls"
        :price-mode="true"
      />
    </div>
    <div v-if="heritage.length" id="Heritage">
      <h3 class="text-lg text-gray-400">
        Heritage <span v-if="yourTier > 0" class="font-semibold">( Your tier - <span class="text-orange-300">T{{ yourTier }}</span> )</span>
      </h3>
      <Enum
        color="text-blue-400 hover:text-blue-300"
        :list="heritage"
        path="/heritage"
        empty-message="No Heritage"
        :price-mode="true"
      />
    </div>
    <div v-if="ridePerks.length" class="text-gray-300">
      <div class="float-left mr-2">
        Ride:
      </div>
      <Enum
        color="text-blue-400 hover:text-blue-300"
        class="text-gray-200"
        :list="ridePerks"
        path="/talents/ride"
        empty-message="No Ride"
        :price-mode="true"
      />
    </div>
    <div v-if="homePerks.length" class=" text-gray-300">
      <div class="float-left mr-2">
        Home:
      </div>
      <Enum
        color="text-blue-400 hover:text-blue-300"
        class="text-gray-100"
        :list="homePerks"
        path="/talents/home"
        empty-message="No Home"
        :price-mode="true"
      />
    </div>
    <div v-if="talentPerks.length" class="text-gray-300">
      <div class="float-left mr-2">
        Talents:
      </div>
      <Enum
        color="text-blue-400 hover:text-blue-300"
        class="text-gray-100"
        :list="talentPerks"
        path="/talents/talent"
        empty-message="No Talents"
        :price-mode="true"
      />
    </div>
    <div v-if="defensePerks.length" class="text-gray-300">
      <div class="float-left mr-2">
        Defenses:
      </div>
      <Enum
        color="text-blue-400 hover:text-blue-300"
        class="text-gray-100"
        :list="defensePerks"
        path="/talents/defense"
        empty-message="No Defenses"
        :price-mode="true"
      />
    </div>
    <div v-if="miscPerks.length" class="text-gray-300">
      <div class="float-left mr-2">
        Misc:
      </div>
      <Enum
        color="text-blue-400 hover:text-blue-300"
        class="text-gray-100"
        :list="miscPerks"
        path="/talents/perks"
        empty-message="No Misc Perks"
        :price-mode="true"
      />
    </div>
    <div v-if="genericWaifuPerks.length" class="text-gray-300">
      <div class="float-left mr-2">
        Generic:
      </div>
      <Enum
        color="text-blue-400 hover:text-blue-300"
        class="text-gray-100"
        :list="genericWaifuPerks"
        path="/talents/specific"
        empty-message="No Generic Perks"
        :price-mode="true"
      />
    </div>
    <div v-if="waifuPerks.length" class="text-gray-300">
      <div class="float-left mr-2">
        Waifu:
      </div>
      <Enum
        color="text-blue-400 hover:text-blue-300"
        class="text-gray-100"
        :list="waifuPerks"
        path="/talents/specific"
        empty-message="No Waifu Perks"
        :price-mode="true"
      />
    </div>
    <div class="grid grid-cols-3 gap-1">
      <CompanionCardMiniInfo v-for="cmp in companions" :key="cmp.uid" :char="cmp" :image="companionImages[cmp.uid]" />
    </div>
    <div class="flex gap-2 text-gray-300 pb-1">
      <span>Total cost: <span class="text-gray-100 font-semibold">{{ totalCost }} </span></span>
      <span>Total discount: <span class="text-gray-100 font-semibold">{{ totalDiscount }} </span></span>
      <span>Remaining credits: <span class="text-gray-100 font-semibold">{{ budget }}</span></span>
      <div class="text-gray-500 self-end pb-1 text-xs ml-auto">
        Generated by Waifu Catalog Interactive
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DBCharacter } from 'global'
import html2canvas from 'html2canvas'
import { useAllChars } from '~/data/constants'
import { imageLink, isBuildImage } from '~/logic'
import { customDialog } from '~/logic/dialog'
import { useChallenges } from '~/store/challenges'
import { useStore } from '~/store/store'

const {
  startingWorld, startingOrigin, intensities, binding, homePerks, defensePerks,
  companions, heritage, talentPerks, waifuPerks, ridePerks, miscPerks, luresBought, genericWaifuPerks,
  otherPerks, patron, pvpPerks, yourTier, baseBudget, budget, totalCost,
  totalDiscount,
} = useStore()

const { activeChallenges } = useChallenges()

const { allCharsObject } = useAllChars()

const worldText = computed(() => {
  if (startingOrigin.value.uid) {
    const char = allCharsObject.value[startingOrigin.value.uid]
    if (char)
      return `from <i>${char.w}</i>`
  }
  return ''
})

const originText = computed(() => {
  const variants = {
    'Drop-In': 'Dropped-In',
    'Walk-In': `Walked-In as <b>${startingOrigin.value.character}</b> of T${startingOrigin.value.tier}`,
    'Extra': `'Extra' with <b>${startingOrigin.value.cost}</b> additional cost`,
    'Substitute': `Substitute as a <b>${startingOrigin.value.character}</b> of T${startingOrigin.value.tier}`,
    'Possess': `Possess a <b>${startingOrigin.value.character}</b> of T${startingOrigin.value.tier} ${worldText.value}`,
  } as Record<string, string>

  return variants[startingOrigin.value.title]
})

const companionImages = computed(() => {
  const res = {} as Record<number, string>
  companions.value.forEach((char) => {
    const charInfo = allCharsObject.value[char.uid]
    if (charInfo !== undefined)
      res[char.uid] = imageLink(charInfo.i, charInfo.u)
  })
  return res
})

function createImage() {
  const buildEl = document.getElementById('build')
  if (buildEl) {
    html2canvas(buildEl, { imageTimeout: 15000, useCORS: true }).then(async(canvas) => {
      const answer = await customDialog('Image successfully created, what do you want to do with it?', ['Copy to Clipboard', 'Save'])
      if (answer === 'Copy to Clipboard') {
        canvas.toBlob((blob) => {
          if (blob) {
            const item = new ClipboardItem({ 'image/png': blob })
            navigator.clipboard.write([item])
          }
        })
      }
      if (answer === 'Save') {
        const a = document.createElement('a')
        a.href = canvas.toDataURL()
        a.download = 'build.png'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }
      //
    })
  }
  isBuildImage.value = false
}

watch(companionImages, () => {
  createImage()
}, { flush: 'post' })

onMounted(() => {
  if (companions.value.length === 0)
    createImage()
})

</script>
