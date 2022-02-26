<template>
  <div class="sm:p-2 pb-8">
    <h3 class="text-xl text-center mb-2">
      Challenges
    </h3>
    <Desc :desc="challengesDesc" class="mb-4 max-w-4xl mx-auto bg-l bg-violet-200 dark:bg-violet-900" />
    <div class="md:column-count-2 lg:column-count-3 pb-8">
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
  </div>
</template>

<script lang="ts" setup>
import { Challenge } from 'global'
import { findIndex } from 'lodash-es'
import { challenges, challengesDesc } from '~/data/challenges'
import { useChallenges } from '~/store/challenges'

const { activeChallenges } = useChallenges()

const allChallenges = computed(() => activeChallenges.value
  .reduce((a, x) => {
    a[x.title] = x
    return a
  }, {} as Record<string, Challenge>))

function challengeAvailable(challenge: any) {
  return true
}

function pickChallenge(challenge: any) {
  const ind = findIndex(activeChallenges.value, { title: challenge.title })
  if (ind === -1) {
    activeChallenges.value.push({ title: challenge.title, cost: challenge.cost })
    if (challenge.effect) challenge.effect.set()
  }
  else {
    if (challenge.effect) challenge.effect.remove()
    activeChallenges.value.splice(ind, 1)
  }
}

</script>
