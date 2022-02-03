<template>
  <div>
    <div class="text-center">
      Plot progress
    </div>
    <div class="flex gap-1 overflow-hidden">
      <Button
        ref="minusButton"
        label=""
        icon="akar-icons:minus"
        bg-color="bg-transparent hover:(bg-opacity-10 bg-white)"
        class="!text-red-500"
      />
      <ProgressBar class="w-full" :percent="progress" />
      <Button
        ref="plusButton"
        label=""
        icon="akar-icons:plus"
        bg-color="bg-transparent hover:(bg-opacity-10 bg-white)"
        class="!text-green-500"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['update:modelValue'])

const progress = ref(props.modelValue)
const plusButton = ref(null)
const minusButton = ref(null)

const { pressed: plusPressed } = useMousePressed({ target: plusButton })
const { pressed: minusPressed } = useMousePressed({ target: minusButton })

watch(progress, () => emit('update:modelValue', progress.value))

let timer: any = null
watch(plusPressed, () => {
  if (plusPressed.value) timer = setInterval(() => progress.value += 1, 15)
  else
    clearInterval(timer)
})

watch(minusPressed, () => {
  if (minusPressed.value) timer = setInterval(() => progress.value -= 1, 15)
  else
    clearInterval(timer)
})
</script>
