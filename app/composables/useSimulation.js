import { ref, computed } from "vue";
import { useTerminal } from "./useTerminal";

const slots = ref(
	Array.from({ length: 6 }, (_, i) => ({
		id: i + 1,
		active: false,
		viewer_url: null,
		metrics: null,
	})),
);

const isRunning = ref(false);
const totalSimulations = ref(0);
const generation = computed(() => Math.floor(totalSimulations.value / 6));

// GA State: Store evaluated individuals { fitness, individual }
const hallOfFame = ref([]);
const bestFitness = ref(Infinity);

// Files stored in memory
const files = ref({
	network: null,
	route: null,
	trafficLight: null,
	trafficLightContent: null,
});

export function useSimulation() {
	const { addLine } = useTerminal();

	const setFile = (type, file) => {
		files.value[type] = file;
		addLine(`File uploaded: ${type} (${file.name})`, "success");
	};

	const parseTLLogic = (xmlString) => {
		const parser = new DOMParser();
		const xmlDoc = parser.parseFromString(xmlString, "text/xml");
		const phases = xmlDoc.getElementsByTagName("phase");
		return Array.from(phases).map((p) => parseInt(p.getAttribute("duration")));
	};

	const generateXML = (durations) => {
		if (!files.value.trafficLightContent) return null;
		const parser = new DOMParser();
		const xmlDoc = parser.parseFromString(
			files.value.trafficLightContent,
			"text/xml",
		);
		const phases = xmlDoc.getElementsByTagName("phase");
		durations.forEach((d, i) => {
			if (phases[i]) phases[i].setAttribute("duration", d.toString());
		});
		return new XMLSerializer().serializeToString(xmlDoc);
	};

	const breedIndividual = () => {
		// If we don't have enough data yet, create a random variation of the original
		if (hallOfFame.value.length < 6) {
			const original = parseTLLogic(files.value.trafficLightContent);
			return original.map((d) =>
				Math.max(1, d + Math.floor(Math.random() * 10 - 5)),
			);
		}

		// Select two parents from top 25% of hallOfFame (lowest fitness is better)
		const sorted = [...hallOfFame.value].sort((a, b) => a.fitness - b.fitness);
		const topPool = sorted.slice(0, Math.ceil(sorted.length * 0.25));

		const parentA =
			topPool[Math.floor(Math.random() * topPool.length)].individual;
		const parentB =
			topPool[Math.floor(Math.random() * topPool.length)].individual;

		// Crossover
		const child = parentA.map((val, i) =>
			Math.random() > 0.5 ? val : parentB[i],
		);

		// Mutation
		return child.map((val) => {
			if (Math.random() < 0.1) {
				return Math.max(1, val + Math.floor(Math.random() * 10 - 5));
			}
			return val;
		});
	};

	const runSlot = async (slotId) => {
		if (!isRunning.value) return;

		const individual = breedIndividual();
		const addFileXML = generateXML(individual);
		if (!addFileXML) return;

		const addFileBlob = new Blob([addFileXML], { type: "text/xml" });
		const formData = new FormData();
		formData.append("net_file", files.value.network);
		formData.append("rou_file", files.value.route);
		formData.append("add_file", addFileBlob, "optimized.add.xml");

		const slotIndex = slotId - 1;
		try {
			slots.value[slotIndex].active = true;
			// Predict URL
			slots.value[slotIndex].viewer_url =
				`http://127.0.0.1:${6000 + slotId}/vnc.html?autoconnect=true&resize=scale`;

			const response = await fetch(`http://127.0.0.1:8000/simulate/${slotId}`, {
				method: "POST",
				body: formData,
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.detail || data.error || `HTTP ${response.status}`);
			}

			slots.value[slotIndex].metrics = data.metrics;

			const fitness = data.metrics?.avg_delay ?? 999.99;
			hallOfFame.value.push({ fitness, individual });
			totalSimulations.value++;

			if (fitness < bestFitness.value) {
				bestFitness.value = fitness;
				addLine(
					`New best fitness: ${fitness.toFixed(4)} (Slot ${slotId})`,
					"success",
				);
			}

			// If we are still running, immediately start the next simulation in this slot
			if (isRunning.value) {
				runSlot(slotId);
			}
		} catch (err) {
			addLine(`Slot ${slotId} failed: ${err.message}`, "error");
			slots.value[slotIndex].active = false;
			// Retry after a delay
			setTimeout(() => {
				if (isRunning.value) runSlot(slotId);
			}, 5000);
		}
	};

	const startGA = async () => {
		if (
			!files.value.network ||
			!files.value.route ||
			!files.value.trafficLight
		) {
			addLine("Missing required files!", "error");
			return;
		}

		const text = await files.value.trafficLight.text();
		files.value.trafficLightContent = text;

		isRunning.value = true;
		addLine("Starting Asynchronous GA Engine...", "info");
		addLine("Utilizing all 6 slots with staggered initialization.", "info");

		// Start all slots with a stagger to avoid race conditions
		for (let i = 1; i <= 6; i++) {
			if (!isRunning.value) break;
			runSlot(i);
			// 1 second stagger between slot starts
			await new Promise((resolve) => setTimeout(resolve, 1000));
		}
	};

	const stopGA = () => {
		isRunning.value = false;
		addLine("Simulation stopping... Active tasks will finish.", "info");
		// Reset active status for slots
		slots.value.forEach((s) => (s.active = false));
	};

	const refreshViewports = () => {
		slots.value.forEach((slot) => {
			const url = slot.viewer_url;
			if (url) {
				slot.viewer_url = null;
				// Trigger a re-render
				setTimeout(() => {
					slot.viewer_url = url;
				}, 10);
			}
		});
		addLine("Refreshing displays...", "info");
	};

	return {
		slots,
		isRunning,
		generation,
		bestFitness,
		totalSimulations,
		poolSize: computed(() => hallOfFame.value.length),
		mutationRate: ref(0.1),
		setFile,
		startGA,
		stopGA,
		refreshViewports,
	};
}
