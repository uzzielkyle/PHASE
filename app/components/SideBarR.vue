<template>
  <div class="p-4">
    <div class="space-y-2">
      <div>
        <span class="font-bold uppercase text-xs">Analytics</span>
      </div>
      <div class="flex gap-2 font-mono">
        <div class="flex-1 border border-neutral rounded p-4 bg-base-100">
          <div class="text-xs">Best Fitness</div>
          <div class="text-base font-bold text-blue-400">0.9316</div>
        </div>
        <div class="flex-1 border border-neutral rounded p-4 bg-base-100">
          <div class="text-xs">Generation</div>
          <div class="text-base font-bold">24</div>
        </div>
      </div>

      <div class="space-y-2">
        <div>
          <span class="font-bold uppercase text-xs">Comparative Metrics</span>
        </div>
        <div class="flex-col space-y-2 font-mono font-thin">
          <div class="flex-1 border border-neutral rounded p-4 bg-base-100">
            <div class="text-xs font-normal opacity-80 mb-2">Population Average</div>
            <div class="text-xs flex justify-between">
              <div>Avg. Delay:</div>
              <div class="text-black dark:text-white">17.56s</div>
            </div>
            <div class="text-xs flex justify-between">
              <div>Avg. Waiting:</div>
              <div class="text-black dark:text-white">13.56s</div>
            </div>
            <div class="text-xs flex justify-between">
              <div>Avg. Stops:</div>
              <div class="text-black dark:text-white">6.9</div>
            </div>

            <hr class="my-2" />
            <div class="text-xs flex justify-between">
              <div>CO/N0x:</div>
              <div class="text-red-400">350.0 / 110.0 mg</div>
            </div>
          </div>

          <div class="relative flex-1 border border-primary/40 rounded p-4 bg-primary/10">
            <div class="absolute top-1.5 right-1.5 badge badge-primary badge-xs uppercase">Top</div>
            <div class="text-xs font-bold text-primary opacity-80 mb-2">Best Performer: ID_012</div>
            <div>
              <div class="text-xs flex justify-between">
                <div>Min. Delay:</div>
                <div>12.32s</div>
              </div>
              <div class="text-xs flex justify-between">
                <div>Min. Duration:</div>
                <div>100.0s</div>
              </div>
              <div class="text-xs flex justify-between">
                <div>Min. Emissions:</div>
                <div>224mg</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="">
        <div>
          <span class="font-bold uppercase text-xs opacity-60">Fitness Convergence</span>
        </div>

        <div class="mt-2 h-80">
          <canvas id="fitnessChart"></canvas>
        </div>
      </div>

      <div>
        <div class="flex justify-between">
          <div class="font-bold uppercase text-xs opacity-60 text-left">Network Stability</div>
          <div class="font-mono font-thin text-xs text-left text-green-300">70%</div>
        </div>
        <progress class="progress progress-success" value="70" max="100"></progress>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Chart from 'chart.js/auto'

onMounted(() => {
  const ctx = document.getElementById('fitnessChart')

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: 24 }, (_, i) => `Gen ${i + 1}`),
      datasets: [
        {
          label: 'Best Fitness',
          data: [
            0.45, 0.52, 0.60, 0.66, 0.70, 0.74,
            0.78, 0.81, 0.84, 0.86, 0.88, 0.89,
            0.90, 0.905, 0.91, 0.915, 0.92,
            0.925, 0.928, 0.929, 0.93, 0.931,
            0.9313, 0.9316
          ],
          borderColor: '#60a5fa',
          backgroundColor: 'rgba(96,165,250,0.2)',
          tension: 0.3,
          fill: true,
          pointRadius: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          ticks: {
            display: false
          },
          grid: {
            display: false
          }
        },
        y: {
          ticks: {
            color: '#9ca3af'
          },
          grid: {
            color: 'rgba(255,255,255,0.05)'
          }
        }
      }
    }
  })
})
</script>
