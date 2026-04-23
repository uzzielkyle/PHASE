<template>
	<div class="flex gap-2 text-[10px] font-mono leading-relaxed group">
		<span class="opacity-30 shrink-0">[{{ timestamp }}]</span>
		<span :class="[colorClass, 'break-all']" class="font-bold">
			<span v-if="line.type === 'error'" class="mr-1">✖</span>
			<span v-if="line.type === 'success'" class="mr-1">✔</span>
			{{ line.text }}
		</span>
	</div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({ line: { type: Object, required: true } });

const timestamp = computed(() => {
	const date = new Date(props.line.id);
	return date.toLocaleTimeString("en-GB", {
		hour12: false,
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
});

const colorClass = computed(() => {
	switch (props.line.type) {
		case "success":
			return "text-success";
		case "error":
			return "text-error bg-error/10 px-1 rounded";
		case "info":
			return "text-info";
		case "warning":
			return "text-warning";
		default:
			return "opacity-80";
	}
});
</script>
