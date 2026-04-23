import { ref } from "vue";

const lines = ref([]);

export function useTerminal() {
	const addLine = (text, type = "default") => {
		lines.value.push({ id: Date.now() + Math.random(), text, type });
	};

	const clear = () => {
		lines.value = [];
	};

	return { lines, addLine, clear };
}
