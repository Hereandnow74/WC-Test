import {
  startingDesc, pvpRules, effectiveTiers, captures, familiars, purchases, sales, waifu11,
  danger11, services, salary, helpDesk, loans, missions, refund, arranged, arrangedConditions,
  arrangedSpecial, arrangedTeam, rip, offspring, nasuDLC,
} from '~/data/rules'

import { populateDesc } from '~/logic/misc'

const startingDescCmp = computed(() => populateDesc(startingDesc))
const pvpRulesCmp = computed(() => populateDesc(pvpRules))
const effectiveTiersCmp = computed(() => populateDesc(effectiveTiers))
const capturesCmp = computed(() => populateDesc(captures))
const familiarsCmp = computed(() => populateDesc(familiars))
const purchasesCmp = computed(() => populateDesc(purchases))
const salesCmp = computed(() => populateDesc(sales))
const waifu11Cmp = computed(() => populateDesc(waifu11))
const danger11Cmp = computed(() => populateDesc(danger11))
const servicesCmp = computed(() => populateDesc(services))
const salaryCmp = computed(() => populateDesc(salary))
const helpDeskCmp = computed(() => populateDesc(helpDesk))
const loansCmp = computed(() => populateDesc(loans))
const missionsCmp = computed(() => populateDesc(missions))
const refundCmp = computed(() => populateDesc(refund))
const arrangedCmp = computed(() => populateDesc(arranged))
const arrangedConditionsCmp = computed(() => populateDesc(arrangedConditions))
const arrangedSpecialCmp = computed(() => populateDesc(arrangedSpecial))
const arrangedTeamCmp = computed(() => populateDesc(arrangedTeam))
const ripCmp = computed(() => populateDesc(rip))
const offspringCmp = computed(() => populateDesc(offspring))
const nasuDLCCmp = computed(() => populateDesc(nasuDLC))

export function useDataComputed() {
  return {
    startingDescCmp,
    pvpRulesCmp,
    effectiveTiersCmp,
    capturesCmp,
    familiarsCmp,
    purchasesCmp,
    salesCmp,
    waifu11Cmp,
    danger11Cmp,
    servicesCmp,
    salaryCmp,
    helpDeskCmp,
    loansCmp,
    missionsCmp,
    refundCmp,
    arrangedCmp,
    arrangedConditionsCmp,
    arrangedSpecialCmp,
    arrangedTeamCmp,
    ripCmp,
    offspringCmp,
    nasuDLCCmp,
  }
}
