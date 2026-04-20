<script setup>
import { onMounted } from 'vue'
import TerminalLine from '@/components/TerminalLine.vue'
import { useTerminal } from '@/composables/useTerminal'

const { lines, addLine } = useTerminal()

onMounted(() => {
  addLine('Initializing viewports...')
  addLine('Viewports ready.', 'success')
})
</script>

<template>
  <div class="size-full flex flex-col flex-1">
    <div class="flex justify-between bg-base-100 py-3 px-4">
      <div class="text-xs font-bold uppercase">
        Execution Stream
      </div>
      <div class="text-xs font-thin flex gap-2 items-center">
        <div class="status status-success status-sm"></div>
        <div>Ready</div>
      </div>
    </div>

    <div class="flex flex-col flex-1 bg-base-300 p-4 gap-2 overflow-auto">
      <TerminalLine v-for="line in lines" :key="line.id" :line="line" />
    </div>
  </div>
</template>
