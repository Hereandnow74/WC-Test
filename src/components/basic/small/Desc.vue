<template>
  <p class="p-2" :class="settings.textAlign" :style="[settings.fontSize ? {'font-size': `${settings.fontSize}px`} : '']">
    <component :is="MeAndMy" />
  </p>
</template>

<script lang='ts' setup>
import { compact } from 'lodash-es'
import { TOOLTIPS, LINKS, LINKS_REG, QUERIES } from '~/data/constants'
import { useStore } from '~/store/store'

const props = defineProps({
  desc: {
    type: String,
    default: 'Description',
  },
})

const { settings } = useStore()

const formattedDesc = computed(() => {
  const desc = props.desc.replace(LINKS_REG,
    (full, ...all) => {
      all = compact(all)
      if (LINKS.value[all[0]] !== undefined) { return `<router-link @click.stop class="dark:text-blue-300 text-blue-600 hover:underline" :to="{ path: '/${LINKS.value[all[0]]}', hash: '#${all[0]}'${QUERIES.value[all[0]] ? `, query: {q: '${QUERIES.value[all[0]]}'}` : ''}}">${full}</router-link>` }
      else {
        return `<span data-tippy-content="${TOOLTIPS[all[0] as keyof typeof TOOLTIPS]}"
        class="text-green-600 dark:text-green-300">${full}</span>`
      }
    },
  )
  return desc
})

const MeAndMy = computed(() => defineComponent({
  template: formattedDesc.value,
}))

</script>
