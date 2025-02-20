import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    sourcemap: mode === 'development',  // Mantener los sourcemaps en desarrollo
    minify: mode !== 'development',     // Desactivar minificación en desarrollo
    outDir: mode === 'development' ? 'dist-dev' : 'dist',  // Carpeta de salida distinta
  },
  plugins: [react()],
}));
