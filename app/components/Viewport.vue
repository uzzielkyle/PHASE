<template>
	<div
		class="group relative size-full grid place-items-center rounded border border-base-300 bg-base-100/50 transition-all duration-200 hover:bg-primary/10 hover:border-primary/40"
	>
		<div
			class="absolute top-2 left-2 text-xs font-mono opacity-70 transition-colors group-hover:text-primary z-20"
		>
			{{ ID }}
		</div>

		<!-- Click Overlay: only active if no src or specifically requested -->
		<div v-if="overlay" class="absolute inset-0 z-30 cursor-pointer"></div>

		<div class="size-full overflow-hidden bg-black/40">
			<template v-if="src">
				<div
					v-if="loading"
					class="absolute inset-0 z-10 grid place-items-center bg-base-300/80"
				>
					<span class="loading loading-spinner loading-md text-primary"></span>
				</div>
				<iframe
					:src="src"
					class="w-full h-full border-none"
					@load="loading = false"
				></iframe>
			</template>

			<template v-else-if="$slots.default">
				<slot />
			</template>

			<div
				v-else
				class="w-full h-full flex items-center justify-center text-xs font-mono transition-colors group-hover:text-primary"
			>
				{{ alt || `Node_Stream_${ID}` }}
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
	ID: { type: [String, Number], required: true },
	alt: { type: String, default: "" },
	src: { type: String, default: null },
	overlay: { type: Boolean, default: false },
});

const loading = ref(true);

watch(
	() => props.src,
	() => {
		if (props.src) loading.value = true;
	},
);
</script>
