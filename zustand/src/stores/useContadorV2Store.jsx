import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Zustand store for managing a counter with persistence and devtools support.
 *
 * @typedef {Object} State
 * @property {number} count - The current count value.
 * @property {function(): void} increase - Function to increase the count by 1.
 * @property {function(): void} decrease - Function to decrease the count by 1.
 *
 * @returns {State} The Zustand store state and actions.
 *
 * @example
 * const { count, increase, decrease } = useContadorV2Store();
 * increase(); // Increases the count by 1
 * decrease(); // Decreases the count by 1
 */
const useContadorV2Store = create(
    persist(
      (set) => ({
        count: 0,
        increase: () => set((state) => ({ count: state.count + 1 })),
        decrease: () => set((state) => ({ count: state.count - 1 }))
      }),
      { name: "counter-local-storage" }
    )
);

// 🔄 Escuchar cambios en `localStorage` desde otra pestaña
window.addEventListener("storage", (event) => {
  if (event.key === "counter-local-storage") {
    useContadorV2Store.setState({ count: JSON.parse(event.newValue)?.state?.count || 0 });
  }
});

export default useContadorV2Store;
