import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/reset': 'http://localhost:8000',
      '/step': 'http://localhost:8000',
      '/state': 'http://localhost:8000',
      '/tasks': 'http://localhost:8000',
      '/health': 'http://localhost:8000',
      '/schema': 'http://localhost:8000',
      '/metadata': 'http://localhost:8000',
      '/mcp': 'http://localhost:8000',
      '/api': 'http://localhost:8000',
    }
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('recharts')) return 'vendor-charts';
            if (id.includes('@supabase')) return 'vendor-supabase';
            if (id.includes('lucide-react')) return 'vendor-icons';
            if (id.includes('react') || id.includes('react-dom')) return 'vendor-react';
          }
        }
      }
    }
  }
})
