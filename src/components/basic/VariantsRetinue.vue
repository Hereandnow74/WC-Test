<template>
  <Variants v-model="buffer" :label="label" :list="list" :theme="theme" />
</template>

<script lang='ts' setup>
import type { PropType } from '@vue/runtime-core'
import { findIndex } from 'lodash-es'
import { useChallenges } from '~/store/challenges'

const { activeChallenges } = useChallenges()

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  theme: {
    type: String as PropType<'light' | 'dark'>,
    default: 'light',
  },
})

const statuses = ['Companion', 'Familiar', 'Devotee', 'Offspring', 'Dead', 'Traded Away']
const buffer = ref(props.modelValue || 'Companion')
const list = computed(() => findIndex(activeChallenges.value, { title: 'Small Team' }) !== -1 ? [...statuses, 'Exile'] : statuses)

const emit = defineEmits(['update:modelValue'])
watch(buffer, () => emit('update:modelValue', buffer.value))

</script>
