<template>
  <div class="py-3 px-4 size-full space-y-4">
    <div class="space-y-2">
      <div class="font-bold text-xs uppercase opacity-60">Intersection Map</div>

      <div class="grid grid-cols-2 gap-2">
        <button class="btn" :class="selectedMap === 'psu' ? 'btn-secondary' : 'btn-neutral'"
          @click="selectedMap = 'psu'">
          PSU Tiniguiban
        </button>

        <button class="btn" :class="selectedMap === 'rizal' ? 'btn-secondary' : 'btn-neutral'"
          @click="selectedMap = 'rizal'">
          Rizal Avenue
        </button>
      </div>
    </div>

    <div class="space-y-2">
      <div class="font-bold text-xs uppercase opacity-60">Configuration Files</div>
      <div class="grid grid-cols-4 gap-2">
        <button class="btn btn-neutral" @click="triggerUpload('original')">Original</button>
        <button class="btn btn-neutral" @click="triggerUpload('pso')">PSO</button>
        <button class="btn btn-neutral" @click="triggerUpload('wm')">WM</button>
        <button class="btn btn-neutral" @click="triggerUpload('gawm')">GA-WM</button>

        <input ref="fileInput" type="file" class="hidden" @change="handleFileUpload" />
      </div>
    </div>

    <div class="space-y-2">
      <div class="font-bold text-xs uppercase opacity-60">Algorithm Protocol</div>
      <div class="grid grid-cols-4 gap-2">

        <button class="btn" :class="isSelected('original') ? 'btn-secondary' : 'btn-neutral'"
          @click="toggleProtocol('original')">
          Original
        </button>

        <button class="btn" :class="isSelected('pso') ? 'btn-secondary' : 'btn-neutral'" @click="toggleProtocol('pso')">
          PSO
        </button>

        <button class="btn" :class="isSelected('wm') ? 'btn-secondary' : 'btn-neutral'" @click="toggleProtocol('wm')">
          WM
        </button>

        <button class="btn" :class="isSelected('gawm') ? 'btn-secondary' : 'btn-neutral'"
          @click="toggleProtocol('gawm')">
          GA-WM
        </button>

      </div>
    </div>

    <button class="btn btn-primary btn-block">Run Simulation</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedMap = ref('psu')
const selectedProtocols = ref([])
const currentUploadType = ref(null)
const fileInput = ref(null)

function isSelected(type) {
  return selectedProtocols.value.includes(type)
}

function toggleProtocol(type) {
  if (isSelected(type)) {
    selectedProtocols.value = selectedProtocols.value.filter(p => p !== type)
  } else {
    selectedProtocols.value.push(type)
  }
}

function triggerUpload(type) {
  currentUploadType.value = type
  fileInput.value.click()
}

function handleFileUpload(event) {
  const file = event.target.files[0]
  if (!file) return

  console.log('Uploaded for:', currentUploadType.value, file)
  event.target.value = ''
}
</script>
