<template>
  <div
    class="text-xs font-mono font-thin"
    :class="colorClass"
  >
    {{ line.text }}
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  line: {
    type: Object,
    required: true
  }
})

const colorClass = computed(() => {
  switch (props.line.type) {
    case 'success':
      return 'text-success'
    case 'error':
      return 'text-error'
    case 'warning':
      return 'text-warning'
    default:
      return ''
  }
})
</script>
