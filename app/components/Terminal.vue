<template>
	<div
		class="h-full flex flex-col overflow-hidden bg-base-200 border-r border-base-300"
	>
		<div
			class="flex justify-between py-2 px-4 border-b border-base-300 shrink-0 bg-base-100"
		>
			<div class="text-[10px] font-bold uppercase opacity-60">
				Execution Stream
			</div>
			<div class="text-[10px] font-bold flex gap-2 items-center">
				<div class="status status-success status-xs"></div>
				<div class="opacity-70">Ready</div>
			</div>
		</div>

		<div
			ref="scrollContainer"
			class="flex-1 overflow-y-auto p-4 space-y-1 font-mono text-xs bg-base-300/50"
		>
			<TerminalLine v-for="line in lines" :key="line.id" :line="line" />
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref, watch, nextTick } from "vue";
import TerminalLine from "@/components/TerminalLine.vue";
import { useTerminal } from "@/composables/useTerminal";

const { lines, addLine } = useTerminal();
const scrollContainer = ref(null);

onMounted(() => {
	addLine("Initializing GA Environment...");
	addLine("Parallel Slots Ready (1-6).", "success");
});

watch(
	lines,
	async () => {
		await nextTick();
		if (scrollContainer.value) {
			scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
		}
	},
	{ deep: true },
);
</script>
