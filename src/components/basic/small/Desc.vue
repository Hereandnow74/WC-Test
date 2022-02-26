<template>
  <p class="p-2">
    <component :is="MeAndMy" />
  </p>
</template>

<script lang='ts' setup>
import { TOOLTIPS, TOOLTIPS_REG, LINKS, LINKS_REG, QUERIES } from '~/data/constants'

const props = defineProps({
  desc: {
    type: String,
    default: 'Description',
  },
})

const formattedDesc = computed(() => {
  let desc = props.desc.replace(TOOLTIPS_REG,
    word => `<span data-tippy-content="${TOOLTIPS[word as keyof typeof TOOLTIPS]}"
        class="text-green-600 dark:text-green-300">${word}</span>`,
  )

  desc = desc.replace(LINKS_REG,
    match => `<router-link @click.stop class="dark:text-blue-300 text-blue-600" :to="{ path: '/${LINKS.value[match]}', hash: '#${match}'${QUERIES.value[match] ? `,query: {q: '${QUERIES.value[match]}'}` : ''}}">${match}</router-link>`,
  )

  return desc
})

const MeAndMy = defineComponent({
  template: formattedDesc.value,
})

</script>
