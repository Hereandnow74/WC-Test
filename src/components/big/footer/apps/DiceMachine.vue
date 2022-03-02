<template>
  <div class="flex flex-col p-2 gap-2 h-full">
    <div v-for="machine, i in machines" :key="i" class="">
      <div class="flex gap-2">
        <NumberInput v-model="machine.dice" label="Dice" :min="6" />
        <NumberInput v-model="machine.diceCount" label="Number of dices" class="whitespace-nowrap" />
        <Button label="Toss" size="Small" bg-color="bg-amber-600" @click="toss(i)" />
        <Button label="Delete" size="Small" bg-color="ml-auto bg-red-600" @click="removeMachine(i)" />
      </div>
      <div v-if="machine.result.length" class="flex gap-2">
        Results:
        <span v-for="n, j in machine.result" :key="j" class="text-yellow-300">{{ n }}</span>
        <span v-if="machine.result.length > 1">Summ:
          <span class="text-green-300">{{ machine.result.reduce((a, n) => a+n) }}
          </span>
        </span>
      </div>
    </div>
    <Button label="Add" bg-color="bg-blue-600" size="Small" class="self-center" @click="addMachine" />
  </div>
</template>

<script lang="ts" setup>
import { random } from 'lodash-es'

interface Machine {
  dice: number
  diceCount: number
  result: number[]
}

const machines = useStorage<Machine[]>('diceMachines', [
  {
    dice: 6,
    diceCount: 1,
    result: [],
  },
])

function toss(n: number) {
  machines.value[n].result.splice(0)
  for (let i = 0; i < machines.value[n].diceCount; i++)
    machines.value[n].result.push(random(1, machines.value[n].dice))
}

function addMachine() {
  machines.value.push({
    dice: 6,
    diceCount: 1,
    result: [],
  })
}

function removeMachine(i: number) {
  machines.value.splice(i, 1)
}

</script>
