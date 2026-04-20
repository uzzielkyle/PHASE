<template>
  <div class="relative w-full bg-base-300 p-4 overflow-hidden">
    <div class="pointer-events-none absolute inset-0 opacity-40">
      <div class="moving-lines"></div>
    </div>
    <div class="absolute top-4 left-4 bg-white dark:bg-black border border-neutral py-2 px-4 z-20">
      <div class="text-xs uppercase text-neutral-800 dark:text-neutral-400">
        Live Feed
      </div>
      <div class="text-xs font-bold uppercase text-black dark:text-white">
        {{ isFocused ? activeId : 'Overview' }}
      </div>
    </div>
    <div class="relative z-10 size-full"
      :class="isFocused ? 'flex flex-col gap-4 place-items-center h-full' : 'grid grid-cols-4 gap-4'">
      <template v-if="isFocused">
        <div class="w-[75%] h-[75%]">
          <Viewport :ID="activeId" class="cursor-default" />
        </div>

        <div class="flex items-center justify-between gap-2 text-sm w-full max-w-lg">

          <div class="flex flex-col items-center gap-2">
            <span class="font-semibold">11.95s</span>
            <span class="text-neutral-500 uppercase text-xs fonto-mono">Latency</span>
          </div>

          <div class="flex flex-col items-center gap-2">
            <span class="font-semibold">112.2</span>
            <span class="text-neutral-500 uppercase text-xs">Traffic</span>
          </div>

          <div class="flex flex-col items-center gap-2">
            <span class="font-semibold">112.2mg</span>
            <span class="text-neutral-500 uppercase text-xs">NOx</span>
          </div>

          <div class="flex flex-col items-center gap-3">
            <span class="text-green-300 font-semibold">Rizal Ave.</span>
            <span class="text-neutral-500 text-xs uppercase">Active Map</span>
          </div>

        </div>
      </template>
      <template v-else>
        <Viewport v-for="id in viewports" :key="id" :ID="formatID(id)" @click="handleSelect(id)"
          class="cursor-pointer" />
      </template>
    </div>
  </div>
</template>

<style scoped>
.moving-lines {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.moving-lines::before {
  content: "";
  position: absolute;
  left: 0;
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.4);
  opacity: 50%;
  animation: moveLine 16s linear infinite;
}

@keyframes moveLine {
  0% {
    top: -10%;
  }

  100% {
    top: 110%;
  }
}
</style>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  activeId: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['select'])

const viewports = Array.from({ length: 12 }, (_, i) => i + 1)

const formatID = (id) => `ID_${String(id).padStart(3, '0')}`

const isFocused = computed(() => !!props.activeId)

const displayedViewports = computed(() => {
  if (!props.activeId) return viewports
  return viewports.filter((id) => formatID(id) === props.activeId)
})

const handleSelect = (id) => {
  emit('select', formatID(id))
}
</script>
