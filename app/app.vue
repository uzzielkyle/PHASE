<template>
  <div class="h-dvh w-full p-4">
    <div
      class="h-full w-full border border-neutral bg-base-200 grid grid-rows-[auto_1fr] grid-cols-[300px_1fr_300px] rounded-box shadow-2xl">
      <TopBar class="col-span-3" />

      <SideBarL :activeId="activeId" @select="handleSelect" />

      <div class="grid grid-rows-[2fr_1fr]">
        <MainView :activeId="activeId" @select="handleSelect" />
        <div class="grid grid-cols-[2fr_1fr]">
          <Terminal />
          <ControlBox />
        </div>
      </div>

      <SideBarR />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeId = ref(null)

const handleSelect = (id) => {
  activeId.value = id
}
</script>
