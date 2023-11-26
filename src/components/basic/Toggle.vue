<template>
  <div class="flex items-center gap-1" @click="toggle">
    <div v-if="label">
      {{ label }}
    </div>
    <div class="w-8 h-4 cursor-pointer">
      <div class="h-4 rounded-full w-full relative transition-colors duration-300" :class="vl ? 'bg-blue-400' : 'bg-gray-500'">
        <div class="grid grid-cols-2 absolute">
          <div
            class="rounded-full border border-gray-500 bg-gray-100 hover:bg-gray-300 h-4 w-4"
            :class="{'col-start-2': vl}"
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
    type: Boolean || String,
    default: false,
  },
})

const vl = ref(props.modelValue || props.value === true ? true : props.modelValue)
const text = ref(props.value)

const emit = defineEmits(['update:modelValue'])

watch(vl, () => emit('update:modelValue', text.value || vl.value))
watch(() => props.modelValue, () => vl.value = props.modelValue)
watch(() => props.value, () => vl.value = props.value)

function toggle() {
  vl.value = !vl.value
  text.value = vl.value ? props.value : false
}
</script>
