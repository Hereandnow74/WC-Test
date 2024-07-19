<template>
  <div id="build" class="mt-18 top-0 left-36 absolute flex flex-col gap-2 text-gray-200 p-1 border rounded border-orange-500" :style="[{'background-color': imageSettings.backgroundColor}, {width: `${imageSettings.width}px`}]">
    <template v-if="!imageSettings.onlyImages">
      <div class="grid grid-cols-2 gap-x-2">
        <YourCardMini
          v-if="imageSettings.showAvatarImage"
          class="bg-gray-800"
          :info-mode="true"
        />
        <div>
          <h3 class="text-lg relative" :style="{'color': imageSettings.categoryColor}">
            World
          </h3>
          <div class="flex flex-wrap gap-2" :style="{'color': imageSettings.numberColor}">
            <div class="flex gap-2">
              <span :style="{'color': imageSettings.categoryColor}">Name:</span>
              <span>{{ startingWorld.worldName || 'Unknown' }}</span>
            </div>
            <div v-if="startingWorld?.condition?.length" class="flex gap-2">
              <span :style="{'color': imageSettings.categoryColor}">Condition:</span>
              <span>{{ startingWorld.condition }}</span>
            </div>
            <div class="flex gap-2">
              <span :style="{'color': imageSettings.categoryColor}">Rating:</span>
              <span>{{ startingWorld.rating || 'Unknown' }}</span>
              <span>({{ difficultyAdjustedBudgets[startingWorld.rating] }})</span>
            </div>
          </div>
        </div>
        <div v-if="patron.length" id="patron">
          <h3 class="text-lg " :style="{'color': imageSettings.categoryColor}">
            Patron
          </h3>
          <Enum :number-color="imageSettings.numberColor" color="" :style="{'color': imageSettings.perkColor}" :list="patron" path="/origin" />
        </div>
        <div v-if="activeChallenges.length" id="Challenges">
          <h3 class="text-lg" :style="{'color': imageSettings.categoryColor}">
            Challenges
          </h3>
          <Enum :number-color="imageSettings.numberColor" color="" :style="{'color': imageSettings.perkColor}" :list="activeChallenges" path="/challenges" />
        </div>
        <div v-if="difficulties.length">
          <h3 class="text-lg" :style="{'color': imageSettings.categoryColor}">
            Intensity [<span :style="{'color': imageSettings.numberColor}">{{ difficultyRating }}</span>]
          </h3>
          <Enum
            :number-color="imageSettings.numberColor"
            color=""
            :style="{'color': imageSettings.perkColor}"
            :list="difficulties"
            empty-message="Default Intensity"
            :price-mode="true"
          />
        </div>
        <div v-if="intensities.length">
          <h3 class="text-lg" :style="{'color': imageSettings.categoryColor}">
            Mode
          </h3>
          <Enum
            :number-color="imageSettings.numberColor"
            color=""
            :style="{'color': imageSettings.perkColor}"
            :list="intensities"
            empty-message="PvE Mode"
            :price-mode="true"
          />
        </div>
        <div v-if="pvpPerks.length" id="Orbs">
          <h3 class="text-lg" :style="{'color': imageSettings.categoryColor}">
            Orbs
          </h3>
          <Enum
            :number-color="imageSettings.numberColor"
            color=""
            :style="{'color': imageSettings.perkColor}"
            :list="pvpPerks"
            path="/intensity"
            empty-message=""
            :price-mode="true"
          />
        </div>
        <div id="Origin">
          <h3 class="text-lg" :style="{'color': imageSettings.categoryColor}">
            Origin
          </h3>
          <div class="text-blue-400" v-html="originText || 'No Origin'" />
        </div>
      </div>
      <div v-if="binding.length">
        <span class="float-left mr-2" :style="{'color': imageSettings.categoryColor}">Bindings:</span>
        <Enum
          :number-color="imageSettings.numberColor"
          color=""
          :style="{'color': imageSettings.perkColor}"
          :list="binding"
          empty-message=""
          :price-mode="true"
        />
      </div>
      <div v-if="luresBought.length">
        <span class=" float-left mr-2" :style="{'color': imageSettings.categoryColor}">Lures:</span>
        <Enum
          :number-color="imageSettings.numberColor"
          color=""
          :style="{'color': imageSettings.perkColor}"
          :list="luresBought"
          empty-message="No Lures"
          :price-mode="true"
        />
      </div>
      <div v-if="otherPerks.length">
        <span class=" float-left mr-2" :style="{'color': imageSettings.categoryColor}">Other Controls:</span>
        <Enum
          :number-color="imageSettings.numberColor"
          color=""
          :style="{'color': imageSettings.perkColor}"
          :list="otherPerks"
          empty-message="No Other Controls"
          :price-mode="true"
        />
      </div>
      <div v-if="heritage.length" id="Heritage">
        <h3 class="text-lg" :style="{'color': imageSettings.categoryColor}">
          Heritage <span v-if="yourTier > 0" class="font-semibold">( Your tier - <span class="text-orange-300">T<TierDisplay :tier="yourTier" /></span> )</span>
        </h3>
        <Enum
          :number-color="imageSettings.numberColor"
          color=""
          :style="{'color': imageSettings.perkColor}"
          :list="heritage"
          path="/heritage"
          empty-message="No Heritage"
          :price-mode="true"
        />
      </div>
      <div v-if="ridePerks.length" class="">
        <div class="float-left mr-2" :style="{'color': imageSettings.categoryColor}">
          Ride:
        </div>
        <Enum
          :number-color="imageSettings.numberColor"
          color=""
          :style="{'color': imageSettings.perkColor}"
          :list="ridePerks"
          path="/talents/ride"
          empty-message="No Ride"
          :price-mode="true"
        />
      </div>
      <div v-if="homePerks.length" class=" ">
        <div class="float-left mr-2" :style="{'color': imageSettings.categoryColor}">
          Home:
        </div>
        <Enum
          :number-color="imageSettings.numberColor"
          color=""
          :style="{'color': imageSettings.perkColor}"
          :list="homePerks"
          path="/talents/home"
          empty-message="No Home"
          :price-mode="true"
        />
      </div>
      <div v-if="talentPerks.length" class="">
        <div class="float-left mr-2" :style="{'color': imageSettings.categoryColor}">
          Talents:
        </div>
        <Enum
          :number-color="imageSettings.numberColor"
          color=""
          :style="{'color': imageSettings.perkColor}"
          :list="talentPerks"
          path="/talents/talent"
          empty-message="No Talents"
          :price-mode="true"
        />
      </div>
      <div v-if="defensePerks.length" class="">
        <div class="float-left mr-2" :style="{'color': imageSettings.categoryColor}">
          Defenses:
        </div>
        <Enum
          :number-color="imageSettings.numberColor"
          color=""
          :style="{'color': imageSettings.perkColor}"
          :list="defensePerks"
          path="/talents/defense"
          empty-message="No Defenses"
          :price-mode="true"
        />
      </div>
      <div v-if="miscPerks.length" class="">
        <div class="float-left mr-2" :style="{'color': imageSettings.categoryColor}">
          Misc:
        </div>
        <Enum
          :number-color="imageSettings.numberColor"
          color=""
          :style="{'color': imageSettings.perkColor}"
          :list="miscPerks"
          path="/talents/perks"
          empty-message="No Misc Perks"
          :price-mode="true"
        />
      </div>
      <div v-if="genericWaifuPerks.length" class="">
        <div class="float-left mr-2" :style="{'color': imageSettings.categoryColor}">
          Generic:
        </div>
        <Enum
          :number-color="imageSettings.numberColor"
          color=""
          :style="{'color': imageSettings.perkColor}"
          :list="genericWaifuPerks"
          path="/talents/specific"
          empty-message="No Generic Perks"
          :price-mode="true"
        />
      </div>
      <div v-if="waifuPerks.length" class="">
        <div class="float-left mr-2" :style="{'color': imageSettings.categoryColor}">
          Waifu:
        </div>
        <Enum
          :number-color="imageSettings.numberColor"
          color=""
          :style="{'color': imageSettings.perkColor}"
          :list="waifuPerks"
          path="/talents/specific"
          empty-message="No Waifu Perks"
          :price-mode="true"
        />
      </div>
      <div v-if="specificMods.length" class="">
        <div class="float-left mr-2" :style="{'color': imageSettings.categoryColor}">
          Specific Credit Modifiers:
        </div>
        <span v-for="mod,i in specificMods" :key="mod.desc" class="ml-2" :style="{'color': imageSettings.perkColor}">
          <span>{{ mod.desc }}</span>
          <span>[<span :style="{'color': imageSettings.numberColor}">{{ numberToSigned(mod.mod) }}</span>]<span v-if="i !== specificMods.length -1" class="text-orange-500">,</span></span>
        </span>
      </div>
    </template>
    <div class="flex flex-wrap gap-1 justify-between mt-2">
      <CompanionCardMiniInfo
        v-for="cmp in filteredRetinue"
        :key="cmp.uid"
        :char="cmp"
        :show-image="imageSettings.showCompanionsImage"
        :image="companionImages[cmp.uid]"
        class="min-w-[300px] max-w-[390px] flex-grow"
      />
    </div>
    <div v-if="!imageSettings.onlyImages" class="flex gap-2 pb-1" :style="{'color': imageSettings.perkColor}">
      <span v-if="!legacyMode">Intensity: <span class="font-semibold" :style="{'color': imageSettings.numberColor}">{{ difficultyRating }} </span></span>
      <span>Total cost: <span class="font-semibold" :style="{'color': imageSettings.numberColor}">{{ totalCost }} </span></span>
      <span v-if="loan.gained">Loan: <span class="font-semibold" :style="{'color': imageSettings.numberColor}">{{ loan.gained }}</span></span>
      <span>Total discount: <span class="font-semibold" :style="{'color': imageSettings.numberColor}">
        {{ totalDiscount }} </span></span>
      <span>Remaining credits: <span class="font-semibold" :style="{'color': imageSettings.numberColor}">{{ budget }}</span></span>
      <div class="text-gray-500 self-end pb-1 text-xs ml-auto">
        Generated by Waifu Catalog Interactive
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import html2canvas from 'html2canvas'
import { useAllChars } from '~/data/constants'
import { waifuPerksObject } from '~/data/waifu_perks'
import { imageLink, isBuildImage, numberToSigned } from '~/logic'
import { confirmDialog, customDialog } from '~/logic/dialog'
import { useSettings } from '~/logic/searchSettings'
import { useChallenges } from '~/store/challenges'
import { useStore } from '~/store/store'

const {
  startingWorld, startingOrigin, intensities, binding, homePerks, defensePerks,
  companions, heritage, talentPerks, waifuPerks, ridePerks, miscPerks, luresBought, genericWaifuPerks,
  otherPerks, patron, pvpPerks, yourTier, baseBudget, budget, totalCost,
  totalDiscount, specificMods, loan, difficulties, legacyMode, difficultyRating, difficultyAdjustedBudgets,
} = useStore()

const { activeChallenges } = useChallenges()

const { allCharsObject } = useAllChars()

const { imageSettings } = useSettings()

const archetype = {
  dr: 'Dragon',
  th: 'Transhuman',
  ou: 'Outsider',
  pi: 'Pirate',
}

const originText = computed(() => {
  const variants = {
    'Drop-In': 'Dropped-In',
    'Walk-In': `Walked-In as <b>${startingOrigin.value.character}</b> of T${startingOrigin.value.tier}${startingOrigin.value.hr ? ` [<span class="text-gray-400">${archetype[startingOrigin.value.hr]}</span>]` : ''}`,
    'Extra': `'Extra' with <b>${startingOrigin.value.cost}</b> additional cost`,
    'Substitute': `Substitute as a <b>${startingOrigin.value.character}</b> of T${startingOrigin.value.tier}${startingOrigin.value.hr ? ` [<span class="text-gray-400">${archetype[startingOrigin.value.hr]}</span>]` : ''}`,
    'Possess': `Possess a <b>${startingOrigin.value.character}</b> of T${startingOrigin.value.tier}${startingOrigin.value.hr ? ` [<span class="text-gray-400">${archetype[startingOrigin.value.hr]}</span>]` : ''}`,
  } as Record<string, string>

  return variants[startingOrigin.value.title]
})

const companionImages = computed(() => {
  const res = {} as Record<number, string>
  companions.value.forEach((char) => {
    const charInfo = allCharsObject.value[char.originUID || char.uid]
    if (charInfo !== undefined)
      res[char.uid] = char.perk && waifuPerksObject[char.perk.uid] ? waifuPerksObject[char.perk.uid].image || '' : (char.image || imageLink(charInfo.u))
  })
  return res
})

const filteredRetinue = computed(() => {
  return companions.value
    .filter(cmp => !imageSettings.value.retinue.companions ? cmp.sold || (cmp.role && cmp.role !== 'Companion') : true)
    .filter(cmp => !imageSettings.value.retinue.familiars ? cmp.role !== 'Familiar' : true)
    .filter(cmp => !imageSettings.value.retinue.sold ? !cmp.sold : true)
})

function createImage() {
  const buildEl = document.getElementById('build')
  if (buildEl) {
    html2canvas(buildEl, { imageTimeout: 15000, useCORS: true }).then(async(canvas) => {
      const answer = await customDialog('Image successfully created, what do you want to do with it?', ['Copy to Clipboard', 'Save'])
      if (answer === 'Copy to Clipboard') {
        canvas.toBlob((blob) => {
          if (blob) {
            try {
              const item = new ClipboardItem({ 'image/png': blob })
              navigator.clipboard.write([item])
              confirmDialog('Image copied successfully.', 'info')
            }
            catch (error) {
              confirmDialog('Your browser don\'t support <b>clipboardItem</b>, you can google how to turn it on. Solution for Firefox: go to <b>about:config</b> (write it where you write urls) -> search for <b>clipboardItem</b> -> set dom.events.asyncClipboard.clipboardItem to <b>true</b>', 'info')
            }
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
    })
  }
  isBuildImage.value = false
}

// watch(companionImages, () => {
//   createImage()
// }, { flush: 'post' })

onMounted(() => {
  createImage()
})

</script>
