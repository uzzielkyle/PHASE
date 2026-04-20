<template>
  <div class="flex justify-between p-4">
    <div class="flex items-center gap-2">
      <div class="inline-grid *:[grid-area:1/11]">
        <span class="status status-primary animate-pulse"></span>
      </div>
      <div class="text-sm font-mono font-bold">Proportional_Heuristic_for_Adjusting_Signal_Efficiency_V1.0</div>
    </div>

    <div class="flex items-center">
      <div class="flex-col items-center text-right">
        <div class="text-xs">Parallel Capacity:</div>
        <div class="text-sm text-blue-400">16 Instances Max</div>
      </div>
      <div class="divider divider-horizontal"></div>
      <div class="flex items-center gap-4">
        <div class="flex-col items-end text-right">
          <div class="text-xs">System Load:</div>
          <div class="text-sm text-green-300">37.5%</div>
        </div>

        <div class="font-mono badge badge-lg badge-ghost text-xs">
          {{ time }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { time: "" };
  },
  mounted() {
    this.updateClock();
    this.interval = setInterval(this.updateClock, 1000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  methods: {
    updateClock() {
      const now = new Date();
      this.time = now.toLocaleTimeString("en-GB", { hour12: false });
    },
  },
};
</script>
