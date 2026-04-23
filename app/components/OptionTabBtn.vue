<template>
	<div
		:class="[
			'relative cursor-pointer transition-colors flex items-center justify-between py-3 px-4.5 rounded overflow-clip group',
			active ? 'bg-primary/10' : 'hover:bg-base-200',
		]"
	>
		<div
			v-if="active"
			class="absolute left-0 top-0 h-full w-1 bg-primary"
		></div>

		<div class="pl-1">
			<slot />
		</div>

		<div
			class="text-xs opacity-0 translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0"
		>
			{{ status }}
		</div>
	</div>
</template>

<script setup>
defineProps({
	active: { type: Boolean, default: false },
	status: { type: String, default: "LIVE" },
});
</script>
