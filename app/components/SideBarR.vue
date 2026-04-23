<template>
	<div class="h-full border-l border-base-300 bg-base-100/50 overflow-y-auto">
		<div class="p-4 space-y-6">
			<div>
				<div class="font-bold uppercase text-[10px] opacity-60">
					Global Statistics
				</div>
				<div class="mt-4 space-y-4">
					<div class="grid grid-cols-2 gap-4">
						<div class="border border-base-300 rounded p-3 bg-base-200">
							<div class="text-[10px] uppercase opacity-50">Generation</div>
							<div class="text-xl font-bold font-mono">{{ generation }}</div>
						</div>
						<div class="border border-base-300 rounded p-3 bg-base-200">
							<div class="text-[10px] uppercase opacity-50">Best Fitness</div>
							<div class="text-xl font-bold font-mono text-primary">
								{{ isFinite(bestFitness) ? bestFitness.toFixed(4) : "0.0000" }}
							</div>
						</div>
					</div>

					<div
						class="border border-base-300 rounded p-4 bg-base-200/50 space-y-2"
					>
						<div class="text-xs flex justify-between">
							<div class="opacity-70">Total Simulations:</div>
							<div class="font-bold">{{ totalSimulations }}</div>
						</div>
						<div class="text-xs flex justify-between">
							<div class="opacity-70">Active Slots:</div>
							<div class="text-primary font-bold">{{ activeSlotsCount }}/6</div>
						</div>
					</div>
				</div>
			</div>

			<div class="">
				<div>
					<span class="font-bold uppercase text-[10px] opacity-60"
						>Fitness Convergence</span
					>
				</div>

				<div class="mt-2 h-64 bg-base-300/30 rounded p-2">
					<canvas id="fitnessChart"></canvas>
				</div>
			</div>

			<div class="space-y-4">
				<div>
					<span class="font-bold uppercase text-[10px] opacity-60"
						>Engine Parameters</span
					>
				</div>

				<div class="grid grid-cols-1 gap-2">
					<div
						class="flex justify-between items-center text-xs p-2 bg-base-200 rounded border border-base-300"
					>
						<span class="opacity-70">Pool Size (HOF)</span>
						<span class="font-mono font-bold">{{ poolSize }}</span>
					</div>
					<div
						class="flex justify-between items-center text-xs p-2 bg-base-200 rounded border border-base-300"
					>
						<span class="opacity-70">Mutation Rate</span>
						<span class="font-mono font-bold"
							>{{ (mutationRate * 100).toFixed(0) }}%</span
						>
					</div>
					<div
						class="flex justify-between items-center text-xs p-2 bg-base-200 rounded border border-base-300"
					>
						<span class="opacity-70">Stagger Delay</span>
						<span class="font-mono font-bold">1000ms</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, watch, computed } from "vue";
import Chart from "chart.js/auto";
import { useSimulation } from "~/composables/useSimulation";

const {
	generation,
	bestFitness,
	slots,
	totalSimulations,
	poolSize,
	mutationRate,
} = useSimulation();

const activeSlotsCount = computed(
	() => slots.value.filter((s) => s.active).length,
);

let chart = null;
const fitnessHistory = [];

onMounted(() => {
	const ctx = document.getElementById("fitnessChart");

	chart = new Chart(ctx, {
		type: "line",
		data: {
			labels: [],
			datasets: [
				{
					label: "Best Fitness",
					data: fitnessHistory,
					borderColor: "#60a5fa",
					backgroundColor: "rgba(96,165,250,0.2)",
					tension: 0.3,
					fill: true,
					pointRadius: 2,
				},
			],
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: { legend: { display: false } },
			scales: {
				x: { ticks: { display: false }, grid: { display: false } },
				y: { beginAtZero: true, grid: { color: "rgba(255,255,255,0.1)" } },
			},
		},
	});
});

watch(bestFitness, (newVal) => {
	if (chart && isFinite(newVal)) {
		fitnessHistory.push(newVal);
		chart.data.labels.push(`G${generation.value}`);
		chart.update();
	}
});
</script>
