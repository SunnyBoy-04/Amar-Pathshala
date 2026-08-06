import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true, // Expose to all network interfaces (0.0.0.0)
    open: true
  },
  preview: {
    port: 3000,
    host: true
  }
})
