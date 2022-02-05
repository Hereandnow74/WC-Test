<template>
  <div class="flex justify-center bg-blue-gray-900 mt-1 -mb-1 -mx-2">
    <div>
      Total cost: {{ totalCost - totalDiscount }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '~/store/store'

const {
  totalCost, totalDiscount,
} = useStore()

</script>
