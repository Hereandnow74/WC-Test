<template>
  <p class="p-2">
    <component :is="MeAndMy" />
  </p>
</template>

<script lang='ts'>
import { TOOLTIPS, TOOLTIPS_REG, LINKS, LINKS_REG } from '~/data/constatnts'

export default defineComponent({
  name: 'Desc',
  props: {
    desc: {
      type: String,
      default: 'Description',
    },
  },

  setup(props) {
    const formattedDesc = computed(() => {
      let desc = props.desc.replace(TOOLTIPS_REG,
        word => `<span data-tippy-content="${TOOLTIPS[word as keyof typeof TOOLTIPS]}"
        class="text-green-500">${word}</span>`,
      )

      desc = desc.replace(LINKS_REG,
        match => `<router-link class="text-blue-500" :to="{ path: '/${LINKS.value[match]}', hash: '#${match}' }">${match}</router-link>`,
      )

      return desc
    })

    const MeAndMy = defineComponent({
      template: formattedDesc.value,
    })

    return {
      formattedDesc,
      MeAndMy,
    }
  },
})
</script>
