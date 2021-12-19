<template>
  <div class="flex flex-col gap-2 p-2 overflow-y-auto scrollbar min-h-0">
    <div>Under construction</div>
    <div v-if="csr || !flags.chargen" class="flex flex-col gap-2">
      <div>You can take maximum <span>{{ creditLimit - loan.owed }}</span> credits loan.</div>
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
      </div>
      <div v-if="underLoan" class="flex gap-2">
        <NumberInput v-model="payAmount" label="Return amount" class="whitespace-nowrap" :min="1" :max="loan.owed" />
        <Button label="Pay for a loan" size="Small" @click="payLoan" />
      </div>
      <div>Will pay after next World jump {{ Math.round(loan.owed * 0.1) }}</div>
      <div>
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
    <Button label="Back" icon="akar-icons:arrow-back-thick" size="Small" @click="toggleAppMode" />
  </div>
</template>

<script lang="ts" setup>
import { toggleAppMode } from '~/logic'
import NumberInput from '~/components/basic/NumberInput.vue'
import { usePlayStore } from '~/store/play'
import { useStore } from '~/store/store'

const { trHistory, loan } = usePlayStore()
const { flags, fee, csr, creditLimit, underLoan } = useStore()

const loanAmount = ref(5)
const payAmount = ref(0)

function takeLoan() {
  if (loanAmount.value <= creditLimit.value - loan.value.owed) {
    loan.value.gained += loanAmount.value
    loan.value.owed += loanAmount.value
  }
  loanAmount.value = 5
}

function payLoan() {
  fee.value += payAmount.value
  loan.value.owed -= payAmount.value
}

</script>
