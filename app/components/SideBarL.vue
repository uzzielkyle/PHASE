<template>
	<div class="border-r border-base-300 bg-base-100/50 h-full">
		<div
			class="bg-base-200 border-b border-base-300 flex py-4 px-8 justify-between items-center gap-8"
		>
			<div class="font-bold text-[10px] uppercase opacity-60">
				Simulation Slots
			</div>
			<div class="text-xs font-bold text-primary">6 items</div>
		</div>
		<div class="p-4">
			<OptionTabBtn status="" :active="!activeId" @click="select(null)">
				<div class="flex items-center gap-2 text-sm">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="size-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 7h7v-7h-7v7z"
						/>
					</svg>
					<span class="font-bold uppercase text-[10px]">Matrix Overview</span>
				</div>
			</OptionTabBtn>

			<div class="mt-4 space-y-1.5">
				<OptionTabBtn
					v-for="slot in slots"
					:key="slot.id"
					:active="activeId === formatID(slot.id)"
					:status="slot.active ? 'BUSY' : slot.metrics ? 'DONE' : 'IDLE'"
					@click="select(formatID(slot.id))"
				>
					<div class="flex items-center gap-2 text-xs">
						<span
							class="status status-sm"
							:class="
								slot.active
									? 'status-primary'
									: slot.metrics
										? 'status-success'
										: 'status-neutral'
							"
						></span>
						<span class="font-bold font-mono">{{ formatID(slot.id) }}</span>
					</div>
				</OptionTabBtn>
			</div>
		</div>
	</div>
</template>

<script setup>
import OptionTabBtn from "./OptionTabBtn.vue";
import { useSimulation } from "~/composables/useSimulation";

const { slots } = useSimulation();

const props = defineProps({ activeId: String });

const emit = defineEmits(["select"]);

const formatID = (id) => `ID_${String(id).padStart(3, "0")}`;

const select = (id) => {
	emit("select", id);
};
</script>
