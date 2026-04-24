<template>
  <div :class="containerClass">
    <div class="p-3 shrink-0" :class="mode !== 'full' ? 'border-b border-neutral/50' : 'bg-base-200/50'">
      <div class="font-bold text-[10px] uppercase opacity-60" :class="mode === 'full' && 'text-center'">
        System Controls
      </div>
    </div>

    <div class="flex-1" :class="mode === 'full'
      ? 'overflow-hidden flex gap-2 p-2 items-center justify-center bg-base-200/50'
      : 'overflow-y-auto space-y-4 p-4'">

      <div v-if="mode !== 'full'" class="space-y-2">
        <div class="font-bold text-[10px] uppercase opacity-40">Network</div>

        <button class="btn btn-neutral btn-sm btn-block" @click="triggerUpload('network')">
          <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="5" cy="6" r="2" stroke-width="2" />
            <circle cx="19" cy="6" r="2" stroke-width="2" />
            <circle cx="12" cy="18" r="2" stroke-width="2" />
            <path stroke-width="2" stroke-linecap="round" d="M7 6h10M6.5 7.5l4 8M17.5 7.5l-4 8" />
          </svg>
          <span class="ml-2">Upload Network</span>
        </button>
      </div>

      <button v-else class="btn btn-neutral btn-sm" @click="triggerUpload('network')">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="5" cy="6" r="2" stroke-width="2" />
          <circle cx="19" cy="6" r="2" stroke-width="2" />
          <circle cx="12" cy="18" r="2" stroke-width="2" />
          <path stroke-width="2" stroke-linecap="round" d="M7 6h10M6.5 7.5l4 8M17.5 7.5l-4 8" />
        </svg>
      </button>


      <div v-if="mode !== 'full'" class="space-y-2">
        <div class="font-bold text-[10px] uppercase opacity-40">Route</div>

        <button class="btn btn-neutral btn-sm btn-block" @click="triggerUpload('route')">
          <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-width="2" stroke-linecap="round" d="M12 3v18" />
            <path stroke-width="2" stroke-linecap="round" d="M3 12h18" />
            <circle cx="12" cy="12" r="2" stroke-width="2" />
          </svg>
          <span class="ml-2">Upload Route</span>
        </button>
      </div>

      <button v-else class="btn btn-neutral btn-sm" @click="triggerUpload('route')">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-width="2" stroke-linecap="round" d="M12 3v18" />
          <path stroke-width="2" stroke-linecap="round" d="M3 12h18" />
          <circle cx="12" cy="12" r="2" stroke-width="2" />
        </svg>
      </button>


      <div v-if="mode !== 'full'" class="space-y-2">
        <div class="font-bold text-[10px] uppercase opacity-40">Traffic Light</div>

        <button class="btn btn-neutral btn-sm btn-block" @click="triggerUpload('traffic-light')">
          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="9" y="2" width="6" height="20" stroke-width="2" />
            <circle cx="12" cy="7" r="1.2" />
            <circle cx="12" cy="11" r="1.2" />
            <circle cx="12" cy="15" r="1.2" />
          </svg>
          <span class="ml-2">Upload Traffic Light</span>
        </button>
      </div>

      <button v-else class="btn btn-neutral btn-sm" @click="triggerUpload('traffic-light')">
        <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="9" y="2" width="6" height="20" stroke-width="2" />
          <circle cx="12" cy="7" r="1.2" />
          <circle cx="12" cy="11" r="1.2" />
          <circle cx="12" cy="15" r="1.2" />
        </svg>
      </button>

      <input ref="fileInput" type="file" class="hidden" @change="handleFileUpload" />

    </div>

    <div class="bg-base-200/50 shrink-0"
      :class="mode === 'full' ? 'border-none grid place-items-center p-2' : 'border-t border-neutral p-4'">
      <button class="btn btn-block btn-sm" :class="isRunning ? 'btn-error' : 'btn-primary'" @click="toggleSimulation">

        <template v-if="mode === 'full'">

          <svg v-if="isRunning" xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none"
            stroke="currentColor">
            <rect x="6" y="6" width="12" height="12" stroke-width="2" />
          </svg>

          <svg v-else xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none"
            stroke="currentColor">
            <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M5 3l14 9-14 9V3z" />
          </svg>

        </template>

        <template v-else>
          {{ isRunning ? "Stop Simulation" : "Run Simulation" }}
        </template>

      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useSimulation } from "~/composables/useSimulation";
import { useScreenMode } from "~/composables/useScreenMode";

const { mode } = useScreenMode();

const containerClass = computed(() => {
  return mode.value === "full"
    ? "absolute right-6 bottom-6 z-50 w-min"
    : "h-full bg-base-100 flex flex-col overflow-hidden";
});

const { setFile, startGA, stopGA, isRunning } = useSimulation();

const currentUploadType = ref(null);
const fileInput = ref(null);

function triggerUpload(type) {
  currentUploadType.value = type;
  fileInput.value.click();
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const typeMap = {
    network: "network",
    route: "route",
    "traffic-light": "trafficLight",
  };

  setFile(typeMap[currentUploadType.value], file);
  event.target.value = "";
}

const toggleSimulation = () => {
  if (isRunning.value) {
    stopGA();
  } else {
    startGA();
  }
};
</script>
