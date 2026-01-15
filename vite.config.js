import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        observation: resolve(__dirname, 'pages/observation.html'),
        notice: resolve(__dirname, 'pages/notice.html'),
        timer: resolve(__dirname, 'pages/timer.html'),
      },
    },
  },
})
