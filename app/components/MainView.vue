<script setup>
import { computed } from "vue";
import { useSimulation } from "~/composables/useSimulation";
import { useScreenMode } from "~/composables/useScreenMode"

const { mode } = useScreenMode();
const containerClass = computed(() => {
  return mode.value === "full"
    ? "absolute inset-0 z-50"
    : "relative w-full";
});

const getViewportClass = (id) => {
  const isActive = props.activeId === formatID(id);

  if (!isFocused.value) {
    return "cursor-pointer border-base-300 hover:border-primary/50 transition-all hover:scale-[1.02] hover:shadow-xl";
  }

  return isActive
    ? [
      "transition-all duration-300 h-full",
      mode.value === "full"
        ? "w-full"
        : "w-full max-w-5xl"
    ]
    : "hidden"; // hide non-active viewports
};

const metricsClass = computed(() => {
  return isFocused.value
    ? "absolute bottom-4 flex items-center justify-between gap-2 text-sm w-full max-w-lg bg-base-100/50 p-4 rounded-lg border border-base-300 shadow-xl transition-all duration-300 opacity-100"
    : "hidden";
});

const props = defineProps({ activeId: { type: String, default: null } });

const { slots } = useSimulation();

const emit = defineEmits(["select"]);

const viewports = Array.from({ length: 6 }, (_, i) => i + 1);

const formatID = (id) => `ID_${String(id).padStart(3, "0")}`;

const isFocused = computed(() => !!props.activeId);

const handleSelect = (id) => {
  emit("select", id ? formatID(id) : null);
};

const getSlotSrc = (id) => {
  const slot = slots.value.find((s) => s.id === id);
  return slot?.viewer_url;
};

const activeMetrics = computed(() => {
  if (!props.activeId) return null;
  const idNum = parseInt(props.activeId.replace("ID_", ""));
  const slot = slots.value.find((s) => s.id === idNum);
  return slot?.metrics;
});
</script>

<template>
  <div :class="[
    containerClass,
    'bg-base-300 p-4 overflow-hidden'
  ]">
    <div class="pointer-events-none absolute inset-0 opacity-40">
      <div class="moving-lines"></div>
    </div>

    <div class="absolute top-4 left-4 flex gap-2 z-20">
      <div class="bg-base-100 border border-base-300 py-2 px-4 shadow-lg rounded-sm">
        <div class="text-[10px] uppercase opacity-50 font-bold">Live Feed</div>
        <div class="text-xs font-bold uppercase text-primary">
          {{ isFocused ? activeId : "Matrix Overview" }}
        </div>
      </div>

      <button v-if="isFocused" class="btn btn-square btn-sm btn-neutral border-base-300 shadow-lg"
        @click="handleSelect(null)">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div class="relative z-10 size-full transition-all duration-300" :class="isFocused
      ? 'flex flex-col gap-4 items-center justify-center'
      : 'grid grid-cols-3 grid-rows-2 gap-4'">
      <Viewport v-for="id in viewports" :key="id" :ID="formatID(id)" :src="getSlotSrc(id)" :overlay="!isFocused"
        @click="!isFocused && handleSelect(id)" :class="getViewportClass(id)" />
      <div :class="metricsClass">
        <div class="flex flex-col items-center gap-2">
          <span class="font-bold text-lg font-mono">{{ activeMetrics?.avg_delay?.toFixed(2) || "0.00" }}s</span>
          <span class="text-neutral-content/60 uppercase text-[10px] font-bold">Delay</span>
        </div>

        <div class="flex flex-col items-center gap-2">
          <span class="font-bold text-lg font-mono">{{
            activeMetrics?.vehicle_count || "0"
          }}</span>
          <span class="text-neutral-content/60 uppercase text-[10px] font-bold">Vehicles</span>
        </div>

        <div class="flex flex-col items-center gap-2">
          <span class="font-bold text-lg font-mono">{{ activeMetrics?.total_nox_mg?.toFixed(1) || "0.0" }}mg</span>
          <span class="text-neutral-content/60 uppercase text-[10px] font-bold">NOx</span>
        </div>

        <div class="flex flex-col items-center gap-3">
          <span class="text-success font-bold">Active Slot</span>
          <span class="text-neutral-content/60 text-[10px] font-bold uppercase">Sim Status</span>
        </div>
      </div>
    </div>
  </div>
</template>
