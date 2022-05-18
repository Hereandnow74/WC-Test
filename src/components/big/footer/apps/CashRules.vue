<template>
  <div class="flex flex-col gap-2 p-2 overflow-y-auto scrollbar min-h-0">
    <div v-if="csr || !flags.chargen" class="flex flex-col gap-2">
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
      <div v-if="underLoan" class="flex gap-2">
        <NumberInput v-model="payAmount" label="Return amount" class="whitespace-nowrap" :min="1" :max="loan.owed" />
        <Button label="Pay for a loan" size="Small" @click="payLoan" />
        <Button label="Return all" size="Small" @click="payAll" />
      </div>
      <div>Will pay after next World jump <span class="text-blue-400">{{ Math.round(loan.owed * 0.1) }}</span></div>
      <div v-if="trHistory.length">
        <h3 class="text-lg le">
          Transaction History
        </h3>
        <div class="text-green-300">
          <div v-for="h in trHistory" :key="h">
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
  }
  loanAmount.value = 5
}

function takeMaxLoan() {
  loanAmount.value = creditLimit.value - loan.value.owed
  takeLoan()
}

function payLoan() {
  if (budget.value >= payAmount.value) {
    fee.value += payAmount.value
    loan.value.owed -= payAmount.value
  }
}

function payAll() {
  payAmount.value = Math.min(budget.value, loan.value.owed)
  payLoan()
}

</script>
