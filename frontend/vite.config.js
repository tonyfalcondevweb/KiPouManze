import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permet d'écouter sur toutes les interfaces
    port: 5173,      // Choisis un port si nécessaire
  },
})
