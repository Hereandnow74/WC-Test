<script lang='ts'>

import tippy from 'tippy.js'

export default defineComponent({
  name: 'Tooltip',
  setup() {
    onMounted(() => tippy('[data-tippy-content]', {
      animation: false,
      aria: {
        content: null,
        expanded: false,
      },
    }))
  },
})
</script>
