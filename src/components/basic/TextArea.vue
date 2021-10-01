<template>
  <label v-if="label" :for="label">{{ label }}</label>
  <textarea
    :id="label"
    :name="label"
    cols="30"
    rows="10"
    :value="modelValue"
    class="w-full text-gray-800 p-1"
    :placeholder="placeHolder"
    @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
  ></textarea>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TextArea',

  props: {
    modelValue: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeHolder: {
      type: String,
      default: 'Type here',
    },
  },
  emits: ['update:modelValue'],
})
</script>
