import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,

    cors: {
      origin: ['http://localhost:8080', 'http://127.0.0.1:8080'],
      credentials: true,
    },

  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
