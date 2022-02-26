<template>
  <div>
    <label class="flex gap-2">
      <span v-if="label">{{ label }}</span>
      <select
        v-model="model"
        class="rounded text-gray-800 px-2 w-full"
        outline="dark:(none active:none)"
        border="~ gray-800"
        :placeholder="placeholder"
        required
      >
        <option value="" disabled selected hidden>{{ placeholder }}</option>
        <slot></slot>
        <option
          v-for="opt in options"
          :key="opt.label !== undefined ? opt.label : opt"
          :value="opt.value !== undefined ? opt.value : opt"
        >{{ opt.label !== undefined ? opt.label : opt }}</option>
      </select>
    </label>
    <span v-if="errorMessage" class="text-xs text-red-600 dark:text-red-300">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script lang='ts' setup>
const props = defineProps({
  modelValue: {
    type: [String, Number, Array],
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  errorMessage: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
  },
})
const emit = defineEmits(['update:modelValue'])

const model = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
</script>

<style>
select:invalid { color: rgb(134, 133, 133); }
</style>
