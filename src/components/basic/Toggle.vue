<template>
  <div class="flex items-center gap-1">
    <div v-if="label">
      {{ label }}
    </div>
    <div class="w-8 h-4 cursor-pointer" @click="toggle">
      <div class="h-4 rounded-full w-full relative transition-colors duration-300" :class="value ? 'bg-blue-400' : 'bg-gray-500'">
        <div class="grid grid-cols-2 absolute">
          <div
            class="rounded-full border border-gray-500 bg-gray-100 hover:bg-gray-300 h-4 w-4"
            :class="value ? 'col-start-2' : ''"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
  value: {
    type: String,
    default: '',
  },
})

const value = ref(props.modelValue)
const text = ref(props.value)

const emit = defineEmits(['update:modelValue'])

watch(value, () => emit('update:modelValue', text.value || value.value))
watch(props, () => value.value = props.modelValue)

function toggle() {
  value.value = !value.value
  text.value = value.value ? props.value : ''
}
</script>
