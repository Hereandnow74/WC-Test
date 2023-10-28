[33mcommit 5917c442673e7a8a2212f38c3fe9eb7f5ddcac06[m
Author: Alex A <sanekenator@gmail.com>
Date:   Sun Feb 20 09:18:42 2022 +0600

    New infinite scroll, DR11 intensity

[1mdiff --git a/src/components/perkCards/DR11.vue b/src/components/perkCards/DR11.vue[m
[1mnew file mode 100644[m
[1mindex 0000000..82dfc47[m
[1m--- /dev/null[m
[1m+++ b/src/components/perkCards/DR11.vue[m
[36m@@ -0,0 +1,72 @@[m
[32m+[m[32m<template>[m
[32m+[m[32m  <div[m
[32m+[m[32m    class="p-1 rounded cursor-pointer column-block mb-2 pb-4 max-w-[600px] relative"[m
[32m+[m[32m    :bg="intensityAvailable(perk) ? 'blue-100 dark:gray-700 hover:blue-200 dark:hover:gray-800' : 'gray-200 dark:gray-600'"[m
[32m+[m[32m    @click="startDR11"[m
[32m+[m[32m  >[m
[32m+[m[32m    <h3 class="text-xl text-center">[m
[32m+[m[32m      <span>{{ perk.title }}</span>[m
[32m+[m[32m    </h3>[m
[32m+[m[32m    <Desc :desc="perk.desc" />[m
[32m+[m[32m    <div v-if="perk.special" class="mx-2">[m
[32m+[m[32m      Special: <span class="text-purple-500 dark:text-purple-300">{{ perk.special }}</span>[m
[32m+[m[32m    </div>[m
[32m+[m[32m    <fa-solid:check[m
[32m+[m[32m      v-if="flags.danger11Start"[m
[32m+[m[32m      class="absolute right-0 top-0 m-2 text-green-500"[m
[32m+[m[32m    />[m
[32m+[m[32m  </div>[m
[32m+[m[32m</template>[m
[32m+[m
[32m+[m[32m<script lang="ts" setup>[m
[32m+[m[32mimport { findIndex } from 'lodash-es'[m
[32m+[m[32mimport { useStore } from '~/store/store'[m
[32m+[m
[32m+[m[32mimport { chooseDefense, chooseTalent, defenseAvailable, intensityAvailable, talentAvailable } from '~/logic/'[m
[32m+[m[32mimport { defenses, talents } from '~/data/talents'[m
[32m+[m
[32m+[m[32mconst props = defineProps({[m
[32m+[m[32m  perk: {[m
[32m+[m[32m    type: Object,[m
[32m+[m[32m    default: () => ({}),[m
[32m+[m[32m  },[m
[32m+[m[32m  isActive: {[m
[32m+[m[32m    type: Boolean,[m
[32m+[m[32m    default: false,[m
[32m+[m[32m  },[m
[32m+[m[32m  savedPerk: {[m
[32m+[m[32m    type: Object,[m
[32m+[m[32m    default: () => ({}),[m
[32m+[m[32m  },[m
[32m+[m[32m})[m
[32m+[m
[32m+[m[32mconst { flags, allEffects, talentPerks, defensePerks } = useStore()[m
[32m+[m
[32m+[m[32mfunction allTalents() {[m
[32m+[m[32m  talents.slice(0, 13).forEach((tl) => {[m
[32m+[m[32m    if (talentAvailable(tl) && findIndex(talentPerks.value, { title: tl.title }) === -1)[m
[32m+[m[32m      chooseTalent(tl, { title: tl?.title, cost: tl?.cost })[m
[32m+[m[32m  })[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mfunction allDefenses() {[m
[32m+[m[32m  defenses.forEach((def) => {[m
[32m+[m[32m    if (defenseAvailable(def)) {[m
[32m+[m[32m      const ind = findIndex(defensePerks.value, { title: def.title })[m
[32m+[m[32m      if (ind === -1) chooseDefense(def, { title: def?.title, cost: def?.cost * 2, count: 2 })[m
[32m+[m[32m    }[m
[32m+[m[32m  })[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mfunction startDR11() {[m
[32m+[m[32m  if (intensityAvailable(props.perk)) {[m
[32m+[m[32m    flags.value.danger11Start = !flags.value.danger11Start[m
[32m+[m[32m    if (allEffects.value.includes(props.perk.title)) { allEffects.value.splice(allEffects.value.indexOf(props.perk.title), 1) }[m
[32m+[m[32m    else {[m
[32m+[m[32m      allEffects.value.push(props.perk.title)[m
[32m+[m[32m      allTalents()[m
[32m+[m[32m      allDefenses()[m
[32m+[m[32m    }[m
[32m+[m[32m  }[m
[32m+[m[32m}[m
[32m+[m[32m</script>[m
