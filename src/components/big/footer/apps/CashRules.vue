<template>
  <div class="flex flex-col gap-2 p-2 overflow-y-auto scrollbar min-h-0">
    <div v-if="csr || !flags.chargen || loan.owed || loan.gained" class="flex flex-col gap-2">
      <div>You can take maximum <span class="text-blue-400">{{ creditLimit - loan.owed }}</span> credits loan.</div>
      <div class="flex gap-2">
        <NumberInput
          v-model="loanAmount"
          :increment="5"
          label="Loan amount"
          class="whitespace-nowrap"
          :min="5"
          :max="creditLimit - loan.owed"
        />
        <Button label="Take a loan" size="Small" @click="takeLoan" />
        <Button label="Take max loan" size="Small" @click="takeMaxLoan" />
      </div>
      <div v-if="flags.chargen" class="text-sm text-red-500">
        Returning a loan in chargen stage is not advised and can cause bugs
      </div>
      <div v-if="underLoan" class="flex gap-2">
        <NumberInput v-model="payAmount" label="Return amount" class="whitespace-nowrap" :min="1" :max="loan.owed" />
        <Button label="Pay for a loan" bg-color="bg-amber-500" size="Small" @click="payLoan" />
        <Button label="Return all" bg-color="bg-amber-500" size="Small" @click="payAll" />
      </div>
      <div class="flex gap-1">
        <div>Will pay after 30 day time <span class="text-blue-400">{{ Math.ceil(loan.owed * 0.14) }}</span>(14%)</div>
        <Button label="Pay for 30 days" size="Small" bg-color="bg-red-500" @click="payMonthDue" />
      </div>
      <div v-if="trHistory.length">
        <h3 class="text-lg flex items-center gap-1">
          Transaction History
          <fluent:delete-20-filled
            class="hover:text-red-500 cursor-pointer"
            @click="clearHistory"
          />
        </h3>
        <div class="text-green-300">
          <div v-for="h in trHistory" :key="h" :class="/Took|charged/.test(h) ? 'text-red-300' : 'text-green-300'">
            {{ h }}
          </div>
        </div>
      </div>
    </div>
    <Desc v-else desc="To take a loan you need Cash Still Rules perk or end chargen phase." />
  </div>
</template>

<script lang="ts" setup>
import NumberInput from '~/components/basic/NumberInput.vue'
import { usePlayStore } from '~/store/play'
import { useStore } from '~/store/store'

const { trHistory, loan } = usePlayStore()
const { flags, fee, csr, creditLimit, underLoan, budget } = useStore()

const loanAmount = ref(5)
const payAmount = ref(0)

function takeLoan() {
  if (loanAmount.value <= creditLimit.value - loan.value.owed) {
    loan.value.gained += loanAmount.value
    loan.value.owed += loanAmount.value
    trHistory.value.push(`Took a loan for ${loanAmount.value} credits.`)
  }
  loanAmount.value = 5
}

function takeMaxLoan() {
  loanAmount.value = creditLimit.value - loan.value.owed
  takeLoan()
}

function payLoan() {
  if (payAmount.value > 0 && budget.value >= payAmount.value) {
    fee.value += payAmount.value
    loan.value.owed -= payAmount.value
    trHistory.value.push(`Payed for the loan ${payAmount.value} credits.`)
  }
}

function payAll() {
  payAmount.value = Math.min(budget.value, loan.value.owed)
  payLoan()
}

function payMonthDue() {
  const due = Math.ceil(loan.value.owed * 0.14)
  if (due > budget.value) {
    const tookLoan = Math.min(creditLimit.value - loan.value.owed, due - budget.value)
    loan.value.owed += tookLoan
    loan.value.gained += tookLoan
  }
  fee.value += due
  trHistory.value.push(`${due} credits of interest charged.`)
}

function clearHistory() {
  trHistory.value = []
}

</script>
