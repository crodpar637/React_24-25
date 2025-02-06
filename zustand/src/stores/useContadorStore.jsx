import { create } from 'zustand';

/**
 * Zustand store for managing a counter.
 *
 * @typedef {Object} ContadorStore
 * @property {number} count - The current count value.
 * @property {function(): void} increase - Function to increase the count by 1.
 * @property {function(): void} decrease - Function to decrease the count by 1.
 *
 * @returns {ContadorStore} The Zustand store with count, increase, and decrease properties.
 */
const useContadorStore = create((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 }))
}));

export default useContadorStore;
