<template>
  <div
    class="rounded-md cursor-pointer flex items-center gap-1 select-none px-1"
    :class="[fullTag.color, onTheList ? 'p-0.5' : 'px-1']"
    :style="fullTag.style"
    :title="fullTag.desc ? fullTag.desc : ''"
    @click="link ? router.push(link) : null"
  >
    <div class="rounded flex gap-1">
      {{ fullTag.tag }} <span v-if="count" class="font-bold">[{{ count }}]</span>
    </div>
    <template v-if="onTheList">
      <akar-icons:circle-check v-if="tagToggles[fullTag.short] === 1" />
      <jam:stop-sign v-if="tagToggles[fullTag.short] === -1" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from '@vue/runtime-core'
import { tagToggles } from '~/logic'

const router = useRouter()

const props = defineProps({
  tag: {
    type: Object as PropType<{tag: string; desc: string; short: string; style: string; color: string}>,
    default: () => ({}),
  },
  count: {
    type: Number,
    default: 0,
  },
  onTheList: {
    type: Boolean,
    default: false,
  },
  link: {
    type: [Object, String],
    default: '',
  },
})

const fullTag = computed(() => typeof props.tag.tag === 'string' ? props.tag : { tag: props.tag, desc: '', short: props.tag, color: 'bg-teal-500 text-black' })
</script>
