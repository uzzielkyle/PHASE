<template>
  <div>
    <div class="bg-neutral flex py-4 px-8 justify-between items-center gap-8">
      <div class="font-bold text-sm">
        Active Population
      </div>
      <div class="text-xs text-blue-400">
        12 items
      </div>
    </div>
    <div class="p-4">
      <OptionTabBtn status="" :active="!activeId" @click="select(null)">
        <div class="flex items-center gap-2 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 7h7v-7h-7v7z" />
          </svg>
          <span class="font-bold uppercase">Matrix Overview</span>
        </div>
      </OptionTabBtn>

      <div class="mt-4 space-y-1.5">
        <OptionTabBtn v-for="id in ids" :key="id" :active="activeId === id" status="LIVE" @click="select(id)">
          <div class="flex items-center gap-2 text-xs">
            <span class="status status-neutral status-sm"></span>
            <span class="font-thin font-mono">{{ id }}</span>
          </div>
        </OptionTabBtn>
      </div>
    </div>
  </div>
</template>

<script setup>
import OptionTabBtn from './OptionTabBtn.vue'

const props = defineProps({
  activeId: String
})

const emit = defineEmits(['select'])

const ids = Array.from({ length: 12 }, (_, i) =>
  `ID_${String(i + 1).padStart(3, '0')}`
)

const select = (id) => {
  emit('select', id)
}
</script>
