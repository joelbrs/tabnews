import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
