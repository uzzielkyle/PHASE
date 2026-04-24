<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useSimulation } from "~/composables/useSimulation";
import { useScreenMode } from "~/composables/useScreenMode";

const { mode, toggleMode } = useScreenMode();

const containerClass = computed(() => {
  return mode.value === "full"
    ? "absolute top-0 left-0 w-full z-[75] bg-transparent border-none"
    : "flex justify-between p-4 bg-base-100 border-b border-base-300";
});

const { refreshViewports } = useSimulation();
const time = ref("");
let interval = null;

const updateClock = () => {
  const now = new Date();
  time.value = now.toLocaleTimeString("en-GB", { hour12: false });
};

onMounted(() => {
  updateClock();
  interval = setInterval(updateClock, 1000);
});

onBeforeUnmount(() => {
  if (interval) clearInterval(interval);
});
</script>

<template>
  <div :class="containerClass">
    <template v-if="mode === 'full'">
      <div
        class="absolute top-2 right-0 group flex justify-end w-min p-4 opacity-20 hover:opacity-100 transition-opacity duration-300">
        <button class="btn btn-ghost btn-sm" @click="refreshViewports">
          <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>

        <button class="btn btn-ghost btn-sm" @click="toggleMode">
          <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
          </svg>
        </button>
      </div>
    </template>

    <template v-else>
      <div class="flex items-center gap-2">
        <div class="inline-grid *:[grid-area:1/11]">
          <span class="status status-primary animate-pulse"></span>
        </div>
        <div class="text-sm font-mono font-bold uppercase tracking-tight opacity-90">
          Phase V1.0 - Traffic Optimization Engine
        </div>
      </div>

      <div class="flex items-center gap-4">
        <div class="flex-col items-center text-right">
          <div class="text-[10px] uppercase font-bold opacity-50">
            Parallel Capacity
          </div>
          <div class="text-sm font-bold text-primary">6 Instances Max</div>
        </div>

        <div class="divider divider-horizontal mx-2"></div>

        <button class="btn btn-ghost btn-sm gap-2" @click="refreshViewports">
          <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span class="text-[10px] uppercase font-bold">Refresh Displays</span>
        </button>

        <div class="divider divider-horizontal mx-2"></div>

        <button class="btn btn-ghost btn-sm" @click="toggleMode">
          <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
          </svg>
          <span class="text-[10px] uppercase font-bold">Toggle Mode</span>
        </button>

        <div class="divider divider-horizontal mx-2"></div>
        <div class="font-mono badge badge-neutral text-xs">
          {{ time }}
        </div>
      </div>
    </template>
  </div>
</template>
