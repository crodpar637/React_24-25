import { create } from "zustand";
import { persist , createJSONStorage } from "zustand/middleware";


const useUserStore = create(
  
    persist(
      (set) => ({
        user: null, // Estado inicial sin usuario
        setUser: (userData) => set({ user: userData }),
        clearUser: () => set({ user: null }),
      }),
      {
        name: "user-storage", // Clave en sessionStorage
        storage: createJSONStorage(() => sessionStorage),  // Para cambiar a sessionStorage
      }
    )
  
);

export default useUserStore;