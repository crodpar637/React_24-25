import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set, get) => ({
      user: { role: "None" }, // Estado inicial sin usuario
      setUser: (userData) => set({ user: userData }),
      clearUser: () => set({ user: { role: "None" } }),

      // Métodos de validación
      isLoggedIn: () => get().user?.role && get().user.role !== "None",
      isAdmin: () => get().user?.role === "admin",
      isUser: () => get().user?.role === "user",
    }),
    {
      name: "user-storage", // Clave en sessionStorage
      storage: createJSONStorage(() => sessionStorage), // Para cambiar a sessionStorage
    }
  )
);

export default useUserStore;
