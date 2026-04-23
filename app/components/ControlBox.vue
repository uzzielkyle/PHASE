<template>
	<div class="h-full bg-base-100 flex flex-col overflow-hidden">
		<div class="p-3 shrink-0 border-b border-neutral/50">
			<div class="font-bold text-[10px] uppercase opacity-60">
				System Controls
			</div>
		</div>

		<div class="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
			<div class="space-y-2">
				<div class="font-bold text-[10px] uppercase opacity-40">Network</div>
				<button
					class="btn btn-neutral btn-sm btn-block"
					@click="triggerUpload('network')"
				>
					Upload Network
				</button>
			</div>

			<div class="space-y-2">
				<div class="font-bold text-[10px] uppercase opacity-40">Route</div>
				<button
					class="btn btn-neutral btn-sm btn-block"
					@click="triggerUpload('route')"
				>
					Upload Route
				</button>
			</div>

			<div class="space-y-2">
				<div class="font-bold text-[10px] uppercase opacity-40">
					Traffic Light
				</div>
				<button
					class="btn btn-neutral btn-sm btn-block"
					@click="triggerUpload('traffic-light')"
				>
					Upload Traffic Light
				</button>
			</div>

			<input
				ref="fileInput"
				type="file"
				class="hidden"
				@change="handleFileUpload"
			/>
		</div>

		<div class="p-4 bg-base-200/50 border-t border-neutral shrink-0">
			<button
				class="btn btn-block"
				:class="isRunning ? 'btn-error' : 'btn-primary'"
				@click="toggleSimulation"
			>
				{{ isRunning ? "Stop Simulation" : "Run Simulation" }}
			</button>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { useSimulation } from "~/composables/useSimulation";

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
