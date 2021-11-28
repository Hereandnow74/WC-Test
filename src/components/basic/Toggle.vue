<template>
  <div class="w-8 h-4 cursor-pointer" @click="toggle">
    <div class="h-4 rounded-full w-full relative" :class="value ? 'bg-blue-400' : 'bg-gray-500'">
      <div class="grid grid-cols-2 absolute">
        <div
          class="rounded-full bg-gray-100 h-4 w-4 shadow-inner shadow-black"
          :class="value ? 'col-start-2' : ''"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
})

const value = ref(false)

const emit = defineEmits(['update:modelValue'])

watch(value, () => emit('update:modelValue', value.value))

function toggle() {
  value.value = !value.value
}
</script>
