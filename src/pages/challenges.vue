<template>
  <div class="sm:p-2 pb-8">
    <h3 class="text-xl text-center mb-2">
      Challenges
    </h3>

    <Note class="my-4 max-w-screen-md mx-auto" type="warning" title="Warning">
      Challenges that give additional credits currently work only when you select "<b>Legacy Difficulty</b>" in Intensity section.
    </Note>

    <Desc :desc="challengesDesc" class="mb-4 max-w-4xl mx-auto bg-l bg-violet-200 dark:bg-violet-900" />
    <div class="pb-8" :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'">
      <ChallengeCard
        v-for="challenge in challenges"
        :key="challenge.title"
        :challenge="challenge"
        :is-active="!!allChallenges[challenge.title]"
        :bg="challengeAvailable(challenge) ? 'light-300 dark:gray-800 hover:(blue-100 dark:blue-900)'
          : 'gray-200 dark:gray-600'"
        @click="pickChallenge(challenge)"
      >
      </ChallengeCard>
    </div>
    <div v-if="findIndex(activeChallenges, (x) => x.title === 'Skyblock') !== -1">
      <Note title="Warning" type="warning" class="max-w-[600px] mx-auto mb-4">
        Interactive does not enforce any of the rules below, so do not cheat. Also you can use <b>Random World</b> app for your random portal rolls.
      </Note>
      <Desc :desc="skyblockRules" class="mb-4 max-w-4xl mx-auto bg-l bg-violet-200 dark:bg-violet-900" />
      <Desc :desc="skyblockRulesAdditional" class="mb-4 max-w-4xl mx-auto bg-l bg-violet-200 dark:bg-violet-900" />
      <div class="pb-8" :class="settings.columns !== 'auto' ? `column-count-${settings.columns}` : 'md:column-count-2 xl:column-count-3 4xl:column-count-4 5xl:column-count-5'">
        <PerkCard
          v-for="challenge in skyblockPerks"
          :key="challenge.title"
          :perk="challenge"
          :is-active="!!allChallenges[challenge.title]"
          :saved-perk="allChallenges[challenge.title]"
          :bg="challengeAvailable(challenge) ? 'light-300 dark:gray-800 hover:(blue-100 dark:blue-900)'
            : 'gray-200 dark:gray-600'"
          @pickPerk="(perk, save) => pickChallenge(save)"
        >
        </PerkCard>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Challenge } from 'global'
import { findIndex, intersection } from 'lodash-es'
import { challenges, challengesDesc, skyblockRules, skyblockRulesAdditional, skyblockPerks } from '~/data/challenges'
import { useChallenges } from '~/store/challenges'
import { useStore } from '~/store/store'

const { settings, allEffects } = useStore()

const { activeChallenges } = useChallenges()

const allChallenges = computed(() => activeChallenges.value
  .reduce((a, x) => {
    a[x.title] = x
    return a
  }, {} as Record<string, Challenge>))

function challengeAvailable(challenge: any) {
  if (intersection(challenge.blacklist, allEffects.value).length) return false
  if (!challenge.whitelist) return true
  if (challenge.title === 'Pocket Inventory' && allEffects.value.includes('Pocket Space')) return true
  if (challenge.whitelist && intersection(activeChallenges.value.map(x => x.title), challenge.whitelist).length >= (challenge.needed || challenge.whitelist.length))
    return true
  return false
}

function pickChallenge(challenge: any) {
  if (!challengeAvailable(challenge)) return
  const ind = findIndex(activeChallenges.value, { title: challenge.title })
  if (ind === -1) {
    allEffects.value.push(challenge.title)
    activeChallenges.value.push({ title: challenge.title, cost: challenge.cost })
    if (challenge.effect) challenge.effect.set()
  }
  else {
    if (challenge.effect) challenge.effect.remove()
    allEffects.value.splice(allEffects.value.indexOf(challenge.title), 1)
    activeChallenges.value.splice(ind, 1)
  }
}

</script>
