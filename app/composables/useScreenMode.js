import { ref } from "vue";

const mode = ref("grid"); // "grid" | "full"

export function useScreenMode() {
  const setMode = (newMode) => {
    mode.value = newMode;
  };

  const toggleMode = () => {
    mode.value = mode.value === "grid" ? "full" : "grid";
  };

  return {
    mode,
    setMode,
    toggleMode,
  };
}
