<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" @mousedown.left="$emit('click', $event)">
    <div
      class="max-w-screen-sm min-w-[320px] md:max-h-2/3 shadow bg-gray-100 dark:bg-warm-gray-700
     self-center flex flex-col"
      @click.stop
      @mousedown.stop
    >
      <div class="flex bg-gray-200 dark:bg-warm-gray-800">
        <p class="flex-grow text-center select-none">
          {{ label }}
        </p>
        <div
          class="inline-block cursor-pointer hover:text-red-500 transition-colors text-xl leading-none"
          @click="$emit('click', $event)"
        >
          <eva:close-fill />
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<script lang='ts'>
export default defineComponent({
  name: 'Modal',

  props: {
    label: {
      type: String,
      default: 'Modal Window',
    },
  },
  emits: ['click'],
})
</script>
