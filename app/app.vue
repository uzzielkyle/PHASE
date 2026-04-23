<template>
	<div class="h-dvh w-full p-4 bg-base-300">
		<div
			class="h-full w-full border border-base-300 bg-base-100 grid grid-rows-[auto_1fr] grid-cols-[300px_1fr_300px] rounded-box shadow-2xl overflow-hidden"
		>
			<TopBar class="col-span-3" />

			<SideBarL :active-id="activeId" @select="handleSelect" />

			<div class="grid grid-rows-[2fr_1fr] overflow-hidden">
				<MainView :active-id="activeId" @select="handleSelect" />
				<div
					class="grid grid-cols-[2fr_1fr] overflow-hidden border-t border-base-300"
				>
					<Terminal />
					<ControlBox class="border-l border-base-300" />
				</div>
			</div>

			<SideBarR />
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";

const activeId = ref(null);

const handleSelect = (id) => {
	activeId.value = id;
};
</script>
