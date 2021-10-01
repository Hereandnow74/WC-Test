<template>
  <p class="" v-html="formattedDesc" />
</template>

<script lang='ts'>
import { TOOLTIPS, TOOLTIPS_REG } from '~/data/constatnts'

export default defineComponent({
  name: 'Desc',
  props: {
    desc: {
      type: String,
      default: 'Description',
    },
  },

  setup(props) {
    const formattedDesc = computed(() => props.desc.replace(TOOLTIPS_REG,
      word => `<span data-tippy-content="${TOOLTIPS[word as keyof typeof TOOLTIPS]}"
        class="text-blue-500">${word}</span>`,
    ))

    return {
      formattedDesc,
    }
  },
})
</script>
