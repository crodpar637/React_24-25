import { create } from "zustand";
import { persist , createJSONStorage } from "zustand/middleware";


const useUserStore = create(
  
    persist(
      (set) => ({
        user: { rol: "None"}, // Estado inicial sin usuario
        setUser: (userData) => set({ user: userData }),
        clearUser: () => set({ user: { rol: "None"} }),
      }),
      {
        name: "user-storage", // Clave en sessionStorage
        storage: createJSONStorage(() => sessionStorage),  // Para cambiar a sessionStorage
      }
    )
  
);

export default useUserStore;