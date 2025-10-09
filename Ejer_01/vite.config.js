import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',   // escucha en todas las interfaces
    port: 5173,
    strictPort: true,  // no cambia el puerto si está ocupado
  },
})
