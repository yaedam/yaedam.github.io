import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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
