<template>
  <div class="group relative size-full grid place-items-center rounded border border-base-300 bg-base-100/50 transition-all duration-200
           hover:bg-primary/10 hover:border-primary/40">
    <div class="absolute top-2 left-2 text-xs font-mono opacity-70 transition-colors
             group-hover:text-primary">
      {{ ID }}
    </div>

    <div class="size-full">
      <template v-if="$slots.default">
        <slot />
      </template>

      <div v-else class="w-full h-full flex items-center justify-center text-xs font-mono transition-colors
               group-hover:text-primary">
        {{ alt || `Node_Stream_${ID}` }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  ID: {
    type: [String, Number],
    required: true
  },
  alt: {
    type: String,
    default: ''
  }
})
</script>
